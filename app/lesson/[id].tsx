import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { lessons } from "@/data/lessons";
import { getApiBaseUrl } from "@/lib/stream";
import { LanguageCode } from "@/types/learning";

// Lazy-load Stream SDK to support Expo Go (WebRTC requires a dev build)
let _sdk: any = null;
try {
  _sdk = require("@stream-io/video-react-native-sdk");
} catch {
  // Expo Go: Stream features disabled
}

// useCall is in the bindings package (re-exported via the SDK's peer dep)
let _bindings: any = null;
try {
  _bindings = require("@stream-io/video-react-bindings");
} catch {
  // Expo Go fallback
}

const CallingState: Record<string, string> = _sdk?.CallingState ?? {
  LEFT: "left",
  JOINING: "joining",
  RECONNECTING: "reconnecting",
};
const StreamCall: React.ComponentType<any> =
  _sdk?.StreamCall ?? (({ children }: any) => children);
const useCallStateHooks: () => any =
  _sdk?.useCallStateHooks ??
  (() => ({
    useMicrophoneState: () => ({
      isMute: false,
      microphone: { toggle: async () => {} },
    }),
    useCallCallingState: () => "idle",
  }));
const useStreamVideoClient: () => any =
  _sdk?.useStreamVideoClient ?? (() => undefined);

// callManager controls the native audio session (speaker vs earpiece routing)
const callManager: any = _sdk?.callManager ?? null;

const useCall: () => any = _bindings?.useCall ?? (() => undefined);

// ─── Types ───────────────────────────────────────────────────────────────────

type CallPhase = "connecting" | "joined" | "error" | "ended";

type Caption = {
  id: string;
  speaker: "teacher" | "student";
  text: string;
};
type AgentStatus = "idle" | "connecting" | "connected" | "failed";

const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  es: "Spanish",
  fr: "French",
  de: "German",
  ja: "Japanese",
  pt: "Portuguese",
};

function getLessonLanguage(lessonId: string): string {
  const prefix = lessonId.split("-")[0] as LanguageCode;
  return LANGUAGE_NAMES[prefix] ?? "Spanish";
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function AgentStatusBadge({ status }: { status: AgentStatus }) {
  if (status === "idle") return null;

  const config =
    status === "connecting"
      ? { color: "#F59E0B", text: "AI Teacher joining...", spinner: true }
      : status === "connected"
        ? { color: "#21C16B", text: "AI Teacher connected", spinner: false }
        : { color: "#EF4444", text: "AI Teacher unavailable", spinner: false };

  return (
    <View style={styles.agentBadge}>
      {config.spinner ? (
        <ActivityIndicator size={10} color={config.color} />
      ) : (
        <View style={[styles.agentBadgeDot, { backgroundColor: config.color }]} />
      )}
      <Text style={[styles.agentBadgeText, { color: config.color }]}>
        {config.text}
      </Text>
    </View>
  );
}

function FeedbackItem({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={styles.feedbackItem}>
      <Text style={styles.feedbackLabel}>{label}</Text>
      <Text style={[styles.feedbackValue, { color }]}>{value}</Text>
    </View>
  );
}

// ─── Inner call UI (requires StreamCall context) ─────────────────────────────

function LessonCallUI({
  lesson,
  phase,
  error,
  agentStatus,
  userName,
  userImage,
  screenWidth,
}: {
  lesson: (typeof lessons)[number];
  phase: CallPhase;
  error: string | undefined;
  agentStatus: AgentStatus;
  userName: string;
  userImage?: string;
  screenWidth: number;
}) {
  const { useMicrophoneState, useCallCallingState } = useCallStateHooks();
  const { microphone } = useMicrophoneState();
  const callingState = useCallCallingState();
  const call = useCall();

  const [isPressing, setIsPressing] = useState(false);
  const [captions, setCaptions] = useState<Caption[]>([]);

  // Subscribe to custom events from the Vision Agent and collect live captions
  useEffect(() => {
    if (!call) return;
    const off = call.on("custom", (event: any) => {
      const data = event?.custom ?? {};
      if (data.type !== "lingua.caption" || !data.text) return;
      setCaptions((prev) => {
        const entry: Caption = {
          id: `${Date.now()}-${Math.random()}`,
          speaker: data.speaker === "teacher" ? "teacher" : "student",
          text: data.text,
        };
        // Keep the last 4 captions so the panel stays compact
        return [...prev.slice(-3), entry];
      });
    });
    return () => off?.();
  }, [call]);

  const isConnecting =
    phase === "connecting" ||
    callingState === CallingState.JOINING ||
    callingState === CallingState.RECONNECTING;
  const hasError = phase === "error";

  const statusLabel = isConnecting
    ? "Connecting..."
    : hasError
      ? "Connection failed"
      : "Online";
  const dotColor = isConnecting
    ? "#F59E0B"
    : hasError
      ? "#EF4444"
      : "#21C16B";

  const handleMicPressIn = useCallback(async () => {
    setIsPressing(true);
    await microphone.enable().catch(console.error);
  }, [microphone]);

  const handleMicPressOut = useCallback(async () => {
    setIsPressing(false);
    await microphone.disable().catch(console.error);
  }, [microphone]);

  const firstPhrase = lesson.phrases[0];
  const firstVocab = lesson.vocabulary[0];
  const bubblePrimary =
    firstPhrase?.phrase ?? firstVocab?.example ?? "¡Muy bien!";
  const bubbleSecondary =
    firstPhrase?.translation ??
    firstVocab?.exampleTranslation ??
    "That was great!";

  const teacherAreaWidth = screenWidth - 32;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      {/* ── TEACHER VIEW ──────────────────────────────────────────────── */}
      <View style={[styles.teacherArea, { width: teacherAreaWidth }]}>
        {/* AI teacher mascot */}
        <Image
          source={images.mascotWelcome}
          style={styles.mascotImage}
          resizeMode="contain"
        />

        {/* Agent status badge */}
        <AgentStatusBadge status={agentStatus} />

        {/* Speech bubble */}
        <View style={styles.bubble}>
          <View style={styles.bubbleTextWrap}>
            <Text style={styles.bubblePrimaryText}>{bubblePrimary}</Text>
            <Text style={styles.bubbleSecondaryText}>
              {bubbleSecondary} 👏
            </Text>
          </View>
          <Ionicons name="volume-high" size={24} color="#6C4EF5" />
        </View>

        {/* Connecting overlay */}
        {isConnecting && !hasError && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#6C4EF5" />
            <Text style={styles.overlayText}>Connecting to lesson...</Text>
          </View>
        )}

        {/* Error overlay */}
        {hasError && (
          <View style={styles.overlay}>
            <Ionicons name="alert-circle" size={40} color="#EF4444" />
            <Text style={styles.overlayErrorText}>
              {error ?? "Connection failed"}
            </Text>
            <Text style={styles.overlaySubText}>
              Tap End Call to go back
            </Text>
          </View>
        )}
      </View>

      {/* ── USER INFO ─────────────────────────────────────────────────── */}
      <View style={styles.userRow}>
        <View style={styles.userAvatarCircle}>
          {userImage ? (
            <Image
              source={{ uri: userImage }}
              style={styles.userAvatarImage}
            />
          ) : (
            <Ionicons name="person" size={18} color="#6C4EF5" />
          )}
        </View>
        <View>
          <Text style={styles.userNameText} numberOfLines={1}>
            {userName}
          </Text>
          <View style={styles.userStatusRow}>
            <View style={[styles.statusDot, { backgroundColor: dotColor }]} />
            <Text style={[styles.userStatusText, { color: dotColor }]}>
              {statusLabel}
            </Text>
          </View>
        </View>
      </View>

      {/* ── PUSH-TO-TALK ──────────────────────────────────────────────── */}
      <View style={styles.pttContainer}>
        <Pressable
          onPressIn={handleMicPressIn}
          onPressOut={handleMicPressOut}
          disabled={isConnecting || hasError}
          style={[
            styles.pttButton,
            isPressing && styles.pttButtonActive,
            (isConnecting || hasError) && styles.pttButtonDisabled,
          ]}
        >
          <Ionicons
            name={isPressing ? "mic" : "mic-outline"}
            size={36}
            color="#FFFFFF"
          />
        </Pressable>
        <Text style={styles.pttLabel}>
          {isPressing ? "Listening..." : "Hold to speak"}
        </Text>
      </View>

      {/* ── LIVE CAPTIONS ─────────────────────────────────────────────── */}
      {captions.length > 0 && (
        <View style={styles.captionsCard}>
          <View style={styles.captionsHeader}>
            <View style={styles.captionsDot} />
            <Text style={styles.captionsTitle}>Live Captions</Text>
          </View>
          {captions.map((c) => (
            <View key={c.id} style={styles.captionRow}>
              <Text
                style={[
                  styles.captionSpeaker,
                  {
                    color: c.speaker === "teacher" ? "#6C4EF5" : "#0D132B",
                  },
                ]}
              >
                {c.speaker === "teacher" ? "AI Teacher" : "You"}
              </Text>
              <Text style={styles.captionText}>{c.text}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ── FEEDBACK CARD ─────────────────────────────────────────────── */}
      {!hasError && (
        <View style={styles.feedbackCard}>
          <FeedbackItem label="Speaking" value="Excellent" color="#21C16B" />
          <View style={styles.feedbackDivider} />
          <FeedbackItem
            label="Pronunciation"
            value="Great"
            color="#6C4EF5"
          />
          <View style={styles.feedbackDivider} />
          <FeedbackItem label="Grammar" value="Good" color="#6C4EF5" />
        </View>
      )}
    </ScrollView>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const [call, setCall] = useState<any>(undefined);
  const [phase, setPhase] = useState<CallPhase>("connecting");
  const [error, setError] = useState<string | undefined>();
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const agentSessionRef = useRef<string | null>(null);

  const lesson = lessons.find((l) => l.id === id);

  const startAgent = useCallback(
    async (callId: string, lessonData: (typeof lessons)[number], userId: string) => {
      setAgentStatus("connecting");
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/agent-start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callId,
            callType: "audio_room",
            userId,
            language: getLessonLanguage(lessonData.id),
            lessonId: lessonData.id,
            goals: lessonData.goals,
            vocabulary: lessonData.vocabulary.map((v) => ({
              word: v.word,
              translation: v.translation,
            })),
            phrases: lessonData.phrases.map((p) => ({
              phrase: p.phrase,
              translation: p.translation,
            })),
            aiTeacherPrompt: lessonData.aiTeacherPrompt,
          }),
        });
        if (!res.ok) {
          throw new Error(`Agent start failed: ${res.status}`);
        }
        const { sessionId } = (await res.json()) as { sessionId: string };
        agentSessionRef.current = sessionId;
        setAgentStatus("connected");
      } catch (err) {
        console.error("Agent start error:", err);
        setAgentStatus("failed");
      }
    },
    []
  );

  useEffect(() => {
    if (!client || !user || !lesson) return;

    const callId = `lesson-${id}-${user.id}`;
    const c = client.call("audio_room", callId, { reuseInstance: true });
    setCall(c);
    setPhase("connecting");
    setAgentStatus("idle");

    c.join({ create: true })
      .then(async () => {
        // Start native audio session routed to loudspeaker (not earpiece)
        callManager?.start({ audioRole: "communicator", deviceEndpointType: "speaker" });

        // Audio-only lesson: disable camera, start mic muted (PTT pattern)
        await c.camera.disable().catch(console.error);
        await c.microphone.disable().catch(console.error);

        setPhase("joined");
        // Start the Vision Agent (non-blocking)
        void startAgent(callId, lesson, user.id);
      })
      .catch((err: Error) => {
        setError(err?.message ?? "Failed to connect to lesson");
        setPhase("error");
      });

    return () => {
      // Release the native audio session
      callManager?.stop();

      // Stop the agent session (fire-and-forget)
      const sessionId = agentSessionRef.current;
      if (sessionId) {
        agentSessionRef.current = null;
        fetch(`${getApiBaseUrl()}/api/agent-stop`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ callId, sessionId }),
        }).catch(console.error);
      }
      // Leave the Stream call
      if (c.state.callingState !== CallingState.LEFT) {
        c.leave().catch(console.error);
      }
      setCall(undefined);
    };
  }, [client, user?.id, id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEndCall = useCallback(async () => {
    const callId = `lesson-${id}-${user?.id ?? ""}`;

    // Release the native audio session
    callManager?.stop();

    // Stop the agent session
    const sessionId = agentSessionRef.current;
    if (sessionId) {
      agentSessionRef.current = null;
      fetch(`${getApiBaseUrl()}/api/agent-stop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callId, sessionId }),
      }).catch(console.error);
    }

    // Leave the call
    if (call && call.state.callingState !== CallingState.LEFT) {
      await call.leave().catch(console.error);
    }
    setPhase("ended");
    router.back();
  }, [call, id, user?.id, router]);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Lesson not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const userName =
    user?.fullName ??
    user?.primaryEmailAddress?.emailAddress ??
    "Student";
  const userImage = user?.imageUrl;

  const statusLabel =
    phase === "connecting"
      ? "Connecting..."
      : phase === "error"
        ? "Connection failed"
        : "Online";
  const dotColor =
    phase === "connecting"
      ? "#F59E0B"
      : phase === "error"
        ? "#EF4444"
        : "#21C16B";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleEndCall}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={26} color="#0D132B" />
        </TouchableOpacity>

        <View style={styles.headerMid}>
          <Text style={styles.headerTitle}>AI Teacher</Text>
          <View style={styles.onlineRow}>
            <View style={[styles.onlineDot, { backgroundColor: dotColor }]} />
            <Text style={[styles.onlineLabel, { color: dotColor }]}>
              {statusLabel}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleEndCall}
          style={styles.endCallBtn}
          activeOpacity={0.8}
        >
          <Ionicons
            name="call"
            size={18}
            color="#FFFFFF"
            style={styles.hangupIcon}
          />
          <Text style={styles.endCallBtnText}>End</Text>
        </TouchableOpacity>
      </View>

      {/* ── CALL CONTENT ────────────────────────────────────────────────── */}
      {call ? (
        <StreamCall call={call}>
          <LessonCallUI
            lesson={lesson}
            phase={phase}
            error={error}
            agentStatus={agentStatus}
            userName={userName}
            userImage={userImage}
            screenWidth={screenWidth}
          />
        </StreamCall>
      ) : (
        /* Before the call object is created (client/user not ready yet) */
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6C4EF5" />
          <Text style={styles.loadingText}>Preparing lesson...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F2F2F7" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#6B7280",
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 16,
    alignItems: "center",
  },

  // ── Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
    backgroundColor: "#F2F2F7",
  },
  backBtn: { marginRight: 6 },
  headerMid: { flex: 1 },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#0D132B",
    lineHeight: 24,
  },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  onlineLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
  },
  endCallBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EF4444",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  endCallBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },

  // ── Loading (before call object exists)
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  loadingText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#6B7280",
  },

  // ── Teacher area
  teacherArea: {
    height: 420,
    backgroundColor: "#E8E0FF",
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  mascotImage: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 88,
    width: "100%",
    height: 300,
  },

  // ── Agent status badge
  agentBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  agentBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  agentBadgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
  },

  bubble: {
    position: "absolute",
    bottom: 14,
    left: 12,
    right: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bubbleTextWrap: { flex: 1, marginRight: 10 },
  bubblePrimaryText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#0D132B",
  },
  bubbleSecondaryText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#0D132B",
    marginTop: 2,
  },

  // ── Overlays
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(232, 224, 255, 0.88)",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderRadius: 24,
  },
  overlayText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#6C4EF5",
  },
  overlayErrorText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#EF4444",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  overlaySubText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6B7280",
  },

  // ── User info row
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 4,
  },
  userAvatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EDE9FF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  userAvatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userNameText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#0D132B",
    maxWidth: 200,
  },
  userStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  userStatusText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },

  // ── Push-to-talk
  pttContainer: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  pttButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#1C1C1E",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  pttButtonActive: {
    backgroundColor: "#6C4EF5",
    shadowColor: "#6C4EF5",
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  pttButtonDisabled: {
    opacity: 0.4,
  },
  pttLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6B7280",
  },
  hangupIcon: {
    transform: [{ rotate: "135deg" }],
  },

  // ── Live Captions
  captionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: "100%",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  captionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  captionsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#21C16B",
  },
  captionsTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#6B7280",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  captionRow: {
    gap: 2,
  },
  captionSpeaker: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
  },
  captionText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#0D132B",
    lineHeight: 20,
  },

  // ── Feedback
  feedbackCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  feedbackItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  feedbackDivider: {
    width: 1,
    height: 44,
    backgroundColor: "#E5E7EB",
  },
  feedbackLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#0D132B",
  },
  feedbackValue: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
});
