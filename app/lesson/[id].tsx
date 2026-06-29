import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
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

// ─── Sub-components ──────────────────────────────────────────────────────────

function ControlButton({
  icon,
  label,
  active = true,
  endCall = false,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  endCall?: boolean;
  onPress: () => void;
}) {
  return (
    <View style={styles.controlItem}>
      <TouchableOpacity
        style={[
          styles.controlCircle,
          endCall && styles.controlEnd,
          !active && !endCall && styles.controlInactive,
        ]}
        onPress={onPress}
        activeOpacity={0.8}
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

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();

  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [subtitlesActive, setSubtitlesActive] = useState(false);

  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Lesson not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

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
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={26} color="#0D132B" />
        </TouchableOpacity>

        <View style={styles.headerMid}>
          <Text style={styles.headerTitle}>AI Teacher</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineLabel}>Online</Text>
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

          {/* Speech bubble */}
          <View style={styles.bubble}>
            <View style={styles.bubbleTextWrap}>
              <Text style={styles.bubblePrimaryText}>{bubblePrimary}</Text>
              <Text style={styles.bubbleSecondaryText}>
                {bubbleSecondary} 👏
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="volume-high" size={24} color="#6C4EF5" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── CONTROLS ──────────────────────────────────────────────────── */}
        <View style={styles.controlsRow}>
          <ControlButton
            icon={
              <Ionicons name="videocam" size={22} color="#FFFFFF" />
            }
            label="Camera"
            active={cameraActive}
            onPress={() => setCameraActive(!cameraActive)}
          />
          <ControlButton
            icon={<Ionicons name="mic" size={22} color="#FFFFFF" />}
            label="Mic"
            active={micActive}
            onPress={() => setMicActive(!micActive)}
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
            onPress={() => router.back()}
          />
        </View>

        {/* ── FEEDBACK CARD ─────────────────────────────────────────────── */}
        <View style={styles.feedbackCard}>
          <FeedbackItem label="Speaking" value="Excellent" color="#21C16B" />
          <View style={styles.feedbackDivider} />
          <FeedbackItem label="Pronunciation" value="Great" color="#6C4EF5" />
          <View style={styles.feedbackDivider} />
          <FeedbackItem label="Grammar" value="Good" color="#6C4EF5" />
        </View>
      </ScrollView>
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
    backgroundColor: "#21C16B",
  },
  onlineLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#21C16B",
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
