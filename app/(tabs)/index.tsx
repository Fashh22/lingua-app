import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { units } from "@/data/units";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";

// ─── Static data ────────────────────────────────────────────────────────────

const GREETINGS: Record<string, string> = {
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  ja: "こんにちは",
  pt: "Olá",
};

const TODAY_PLAN = [
  {
    id: "lesson",
    title: "Lesson",
    subtitle: "At the café",
    icon: "book" as const,
    iconBg: "#6C4EF5",
    completed: true,
  },
  {
    id: "conversation",
    title: "AI Conversation",
    subtitle: "Talk about your day",
    icon: "headset" as const,
    iconBg: "#6C4EF5",
    completed: false,
  },
  {
    id: "words",
    title: "New words",
    subtitle: "10 words",
    icon: "chatbubble" as const,
    iconBg: "#EF5A5A",
    completed: false,
  },
];

// ─── Screen ─────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguage } = useLanguageStore();
  const { streak, dailyXP, dailyGoalXP } = useProgressStore();

  const language = languages.find((l) => l.code === selectedLanguage);
  const greeting =
    selectedLanguage && GREETINGS[selectedLanguage]
      ? GREETINGS[selectedLanguage]
      : "Hello";
  const firstName = user?.firstName ?? "Friend";

  const currentUnit = units.find((u) => u.languageCode === selectedLanguage);

  const progressPercent =
    dailyGoalXP > 0 ? (dailyXP / dailyGoalXP) * 100 : 0;

  const flagUrl = language?.flag.replace("16x12", "w80") ?? "";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── HEADER ─────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.flagCircle}>
              {flagUrl ? (
                <Image
                  source={{ uri: flagUrl }}
                  style={styles.flagImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.flagFallback}>🌍</Text>
              )}
            </View>
            <Text style={styles.greetingText}>
              {greeting}, {firstName}! 👋
            </Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.streakRow}>
              <Image
                source={images.streakFire}
                style={styles.fireIcon}
                resizeMode="contain"
              />
              <Text style={styles.streakCount}>{streak}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={24} color="#0D132B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── DAILY GOAL CARD ────────────────────────────────────────── */}
        <View style={styles.goalCard}>
          <View style={styles.goalCardInner}>
            <View style={styles.goalTextBlock}>
              <Text style={styles.goalLabel}>Daily goal</Text>
              <View style={styles.goalXPRow}>
                <Text style={styles.goalXPCurrent}>{dailyXP}</Text>
                <Text style={styles.goalXPTotal}> / {dailyGoalXP} XP</Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressPercent}%` },
                  ]}
                />
              </View>
            </View>
            <Image
              source={images.treasure}
              style={styles.treasureImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* ── CONTINUE LEARNING CARD ─────────────────────────────────── */}
        {language && (
          <View style={styles.continueCard}>
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />

            <View style={styles.continueCardInner}>
              <View style={styles.continueTextBlock}>
                <Text style={styles.continueLabelText}>Continue learning</Text>
                <Text style={styles.continueLanguageText}>
                  {language.name}
                </Text>
                <Text style={styles.continueUnitText}>
                  A1 •{" "}
                  {currentUnit ? `Unit ${currentUnit.order}` : "Unit 1"}
                </Text>
                <TouchableOpacity
                  style={styles.continueBtn}
                  activeOpacity={0.85}
                >
                  <Text style={styles.continueBtnText}>Continue</Text>
                </TouchableOpacity>
              </View>

              <Image
                source={images.palace}
                style={styles.palaceImage}
                resizeMode="contain"
              />
            </View>
          </View>
        )}

        {/* ── TODAY'S PLAN ───────────────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's plan</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.planList}>
            {TODAY_PLAN.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.planItem,
                  index < TODAY_PLAN.length - 1 && styles.planItemBorder,
                ]}
              >
                <View style={styles.planItemLeft}>
                  <View
                    style={[styles.planIconBox, { backgroundColor: item.iconBg }]}
                  >
                    <Ionicons name={item.icon} size={20} color="white" />
                  </View>
                  <View>
                    <Text style={styles.planItemTitle}>{item.title}</Text>
                    <Text style={styles.planItemSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>

                {item.completed ? (
                  <View style={styles.checkDone}>
                    <Ionicons name="checkmark" size={15} color="white" />
                  </View>
                ) : (
                  <View style={styles.checkEmpty} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { paddingBottom: 32 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 16 },

  flagCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#F6F7FB",
    alignItems: "center",
    justifyContent: "center",
  },
  flagImage: { width: "100%", height: "100%" },
  flagFallback: { fontSize: 22 },

  greetingText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#0D132B",
  },

  streakRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  fireIcon: { width: 22, height: 22 },
  streakCount: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#FF8A00",
  },

  // Daily Goal Card
  goalCard: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: "#FFF8EE",
    borderRadius: 20,
    padding: 20,
  },
  goalCardInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  goalTextBlock: { flex: 1 },
  goalLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6B7280",
  },
  goalXPRow: { flexDirection: "row", alignItems: "baseline", marginTop: 2 },
  goalXPCurrent: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#0D132B",
    lineHeight: 40,
  },
  goalXPTotal: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#6B7280",
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#F0E0BC",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 12,
    marginRight: 16,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#FF8A00",
    borderRadius: 4,
  },
  treasureImage: { width: 88, height: 88, marginLeft: 8 },

  // Continue Learning Card
  continueCard: {
    marginHorizontal: 20,
    marginBottom: 28,
    backgroundColor: "#5B47E8",
    borderRadius: 24,
    overflow: "hidden",
    minHeight: 170,
  },
  decorCircle1: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.06)",
    bottom: -60,
    left: -30,
  },
  decorCircle2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -20,
    right: 60,
  },
  continueCardInner: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 22,
    paddingLeft: 22,
    paddingBottom: 0,
  },
  continueTextBlock: { flex: 1, paddingRight: 8, paddingBottom: 22 },
  continueLabelText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.70)",
  },
  continueLanguageText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 26,
    color: "#FFFFFF",
    marginTop: 2,
    lineHeight: 34,
  },
  continueUnitText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    marginTop: 1,
  },
  continueBtn: {
    marginTop: 14,
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 20,
  },
  continueBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#6C4EF5",
  },
  palaceImage: { width: 120, height: 155 },

  // Section
  section: { marginHorizontal: 20, marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 17,
    color: "#0D132B",
  },
  viewAll: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#6C4EF5",
  },

  // Plan list
  planList: { marginTop: 4 },
  planItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  planItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F5",
  },
  planItemLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  planIconBox: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  planItemTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#0D132B",
  },
  planItemSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#6B7280",
    marginTop: 1,
  },
  checkDone: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#6C4EF5",
    alignItems: "center",
    justifyContent: "center",
  },
  checkEmpty: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D1D5DB",
  },
});
