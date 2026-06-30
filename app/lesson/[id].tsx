import { useUser } from "@clerk/expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
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

// ─── Types ───────────────────────────────────────────────────────────────────

type CallPhase = "connecting" | "joined" | "error" | "ended";
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

function ControlButton({
  icon,
  label,
  active = true,
  endCall = false,
  disabled = false,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  endCall?: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <View style={styles.controlItem}>
      <TouchableOpacity
        style={[
          styles.controlCircle,
          endCall && styles.controlEnd,
          !active && !endCall && styles.controlInactive,
          disabled && styles.controlDisabled,
        ]}
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        {icon}
      </TouchableOpacity>
      <Text style={styles.controlLabel}>{label}</Text>
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
  onEndCall,
  userName,
  userImage,
  screenWidth,
}: {
  lesson: (typeof lessons)[number];
  phase: CallPhase;
  error: string | undefined;
  agentStatus: AgentStatus;
  onEndCall: () => void;
  userName: string;
  userImage?: string;
  screenWidth: number;
}) {
  const { useMicrophoneState, useCallCallingState } = useCallStateHooks();
  const { isMute, microphone } = useMicrophoneState();
  const callingState = useCallCallingState();

  const [cameraActive, setCameraActive] = useState(false);
  const [subtitlesActive, setSubtitlesActive] = useState(false);

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

  const handleMicToggle = useCallback(async () => {
    await microphone.toggle().catch(console.error);
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

      {/* ── CONTROLS ──────────────────────────────────────────────────── */}
      <View style={styles.controlsRow}>
        <ControlButton
          icon={<Ionicons name="videocam" size={22} color="#FFFFFF" />}
          label="Camera"
          active={cameraActive}
          disabled={isConnecting}
          onPress={() => setCameraActive(!cameraActive)}
        />
        <ControlButton
          icon={
            <Ionicons
              name={isMute ? "mic-off" : "mic"}
              size={22}
              color="#FFFFFF"
            />
          }
          label={isMute ? "Unmute" : "Mute"}
          active={!isMute}
          disabled={isConnecting || hasError}
          onPress={handleMicToggle}
        />
        <ControlButton
          icon={
            <MaterialCommunityIcons
              name="translate"
              size={22}
              color="#FFFFFF"
            />
          }
          label="Subtitles"
          active={subtitlesActive}
          disabled={isConnecting}
          onPress={() => setSubtitlesActive(!subtitlesActive)}
        />
        <ControlButton
          icon={
            <Ionicons
              name="call"
              size={22}
              color="#FFFFFF"
              style={styles.hangupIcon}
            />
          }
          label="End Call"
          endCall
          onPress={onEndCall}
        />
      </View>

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
      .then(() => {
        // Audio-only lesson: disable camera
        c.camera.disable().catch(console.error);
        setPhase("joined");
        // Start the Vision Agent (non-blocking)
        void startAgent(callId, lesson, user.id);
      })
      .catch((err: Error) => {
        setError(err?.message ?? "Failed to connect to lesson");
        setPhase("error");
      });

    return () => {
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

        <View style={styles.headerIcons}>
          <View style={styles.iconCircle}>
            <Ionicons name="videocam-outline" size={16} color="#0D132B" />
          </View>
          <View style={styles.iconCircle}>
            <Text style={styles.iconCircleText}>12</Text>
          </View>
          <View style={styles.iconCircle}>
            <Ionicons name="notifications-outline" size={16} color="#0D132B" />
          </View>
        </View>
      </View>

      {/* ── CALL CONTENT ────────────────────────────────────────────────── */}
      {call ? (
        <StreamCall call={call}>
          <LessonCallUI
            lesson={lesson}
            phase={phase}
            error={error}
            agentStatus={agentStatus}
            onEndCall={handleEndCall}
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
  headerIcons: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#0D132B",
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

  // ── Controls
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 8,
    width: "100%",
  },
  controlItem: {
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  controlCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#1C1C1E",
    alignItems: "center",
    justifyContent: "center",
  },
  controlInactive: {
    backgroundColor: "#4B5563",
  },
  controlDisabled: {
    opacity: 0.4,
  },
  controlEnd: {
    backgroundColor: "#EF4444",
  },
  controlLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  hangupIcon: {
    transform: [{ rotate: "135deg" }],
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
