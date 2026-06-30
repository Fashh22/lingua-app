import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

const { width: heroImgW, height: heroImgH } = Image.resolveAssetSource(
  require("@/assets/images/lesson-hero.png"),
);
const HERO_ASPECT_RATIO = heroImgW / heroImgH;

import { LessonCard, LessonStatus } from "@/components/LessonCard";
import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { lessons } from "@/data/lessons";
import { units } from "@/data/units";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useProgressStore } from "@/store/useProgressStore";
import { Lesson } from "@/types/learning";

type TabType = "lessons" | "practice";

// ─── Screen ─────────────────────────────────────────────────────────────────

export default function LearnScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("lessons");
  const { width: screenWidth } = useWindowDimensions();
  const heroHeight = screenWidth / HERO_ASPECT_RATIO;
  const router = useRouter();

  const { selectedLanguage, hasHydrated } = useLanguageStore();
  const { completedLessons } = useProgressStore();

  const language = hasHydrated
    ? languages.find((l) => l.code === selectedLanguage)
    : null;

  const languageUnits = hasHydrated
    ? units
        .filter((u) => u.languageCode === selectedLanguage)
        .sort((a, b) => a.order - b.order)
    : [];

  const allLessons = hasHydrated
    ? languageUnits.flatMap((unit) =>
        unit.lessonIds
          .map((id) => lessons.find((l) => l.id === id))
          .filter((l): l is Lesson => l !== undefined),
      )
    : [];

  const completedCount = hasHydrated
    ? allLessons.filter((l) => completedLessons.includes(l.id)).length
    : 0;

  const firstIncompleteId = allLessons.find(
    (l) => !completedLessons.includes(l.id),
  )?.id;

  const activeUnit =
    languageUnits.find(
      (u) => firstIncompleteId && u.lessonIds.includes(firstIncompleteId),
    ) ?? languageUnits[0];

  const getStatus = (lessonId: string): LessonStatus => {
    if (completedLessons.includes(lessonId)) return "completed";
    if (lessonId === firstIncompleteId) return "in_progress";
    return "locked";
  };

  if (!hasHydrated) {
    return null;
  }

  // ─── Empty state ──────────────────────────────────────────────────────────

  if (!language || allLessons.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.emptyContainer}>
          <Image
            source={images.mascotWelcome}
            style={styles.emptyMascot}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>No lessons yet!</Text>
          <Text style={styles.emptyText}>
            Select a language to start learning.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Main screen ─────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {activeUnit?.title ?? language.name}
          </Text>
          <Text style={styles.headerSubtitle}>
            Unit {activeUnit?.order ?? 1} • {completedCount} /{" "}
            {allLessons.length} lessons
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.bookmarkBtn}>
          <Ionicons name="bookmark" size={26} color="#FF8A00" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── HERO IMAGE ────────────────────────────────────────────────── */}
        <View style={styles.heroContainer}>
          <Image
            source={images.lessonHero}
            style={[
              styles.heroImage,
              { width: screenWidth, height: heroHeight },
            ]}
            resizeMode="stretch"
          />
          {/* Unit theme badge */}
          <View style={styles.unitBadge}>
            <Text style={styles.unitBadgeText}>
              {activeUnit?.theme ?? "📚"}
            </Text>
          </View>
        </View>

        {/* ── TAB SWITCHER ──────────────────────────────────────────────── */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "lessons" && styles.tabActive]}
            onPress={() => setActiveTab("lessons")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "lessons" && styles.tabTextActive,
              ]}
            >
              Lessons
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "practice" && styles.tabActive]}
            onPress={() => setActiveTab("practice")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "practice" && styles.tabTextActive,
              ]}
            >
              Practice
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── LESSONS LIST ──────────────────────────────────────────────── */}
        {activeTab === "lessons" && (
          <View style={styles.lessonList}>
            {allLessons.map((lesson, index) => {
              const status = getStatus(lesson.id);
              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  lessonNumber={index + 1}
                  status={status}
                  onPress={() => {
                    if (status === "locked") return;
                    router.push({
                      pathname: "/lesson/[id]",
                      params: { id: lesson.id },
                    });
                  }}
                />
              );
            })}
          </View>
        )}

        {/* ── PRACTICE TAB PLACEHOLDER ──────────────────────────────────── */}
        {activeTab === "practice" && (
          <View style={styles.practiceContainer}>
            <Text style={styles.practiceEmoji}>🎯</Text>
            <Text style={styles.practiceTitle}>Practice coming soon!</Text>
            <Text style={styles.practiceSubtitle}>
              Complete a few lessons first to unlock practice mode.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { paddingBottom: 40 },

  // ── Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    gap: 12,
  },
  headerContent: { flex: 1 },
  headerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#0D132B",
  },
  headerSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6B7280",
    marginTop: 1,
  },
  bookmarkBtn: {
    padding: 4,
  },

  // ── Hero
  heroContainer: {
    width: "100%",
    backgroundColor: "#C7D2FE",
  },
  heroImage: {
    display: "flex",
  },
  unitBadge: {
    position: "absolute",
    top: 14,
    left: 16,
    backgroundColor: "rgba(255,255,255,0.90)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  unitBadgeText: {
    fontSize: 18,
  },

  // ── Tab Bar
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#6C4EF5",
  },
  tabText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#9CA3AF",
  },
  tabTextActive: {
    fontFamily: "Poppins_600SemiBold",
    color: "#0D132B",
  },

  // ── Lesson List
  lessonList: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 10,
  },

  // ── Practice placeholder
  practiceContainer: {
    paddingTop: 64,
    alignItems: "center",
    paddingHorizontal: 32,
  },
  practiceEmoji: {
    fontSize: 52,
  },
  practiceTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#0D132B",
    marginTop: 14,
    textAlign: "center",
  },
  practiceSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },

  // ── Empty state
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyMascot: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#0D132B",
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },
});
