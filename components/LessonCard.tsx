import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";
import { Lesson } from "@/types/learning";

export type LessonStatus = "completed" | "in_progress" | "locked";

interface LessonCardProps {
  lesson: Lesson;
  lessonNumber: number;
  status: LessonStatus;
  onPress: () => void;
}

export function LessonCard({ lesson, lessonNumber, status, onPress }: LessonCardProps) {
  const isCompleted = status === "completed";
  const isInProgress = status === "in_progress";
  const isLocked = status === "locked";

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.card, isInProgress && styles.cardInProgress]}
    >
      <View style={styles.content}>
        <Text style={[styles.lessonLabel, isInProgress && styles.lessonLabelActive]}>
          Lesson {lessonNumber}
        </Text>
        <Text style={[styles.lessonTitle, isLocked && styles.lessonTitleLocked]}>
          {lesson.title}
        </Text>
        {isInProgress && (
          <Text style={styles.inProgressText}>In progress</Text>
        )}
        {isLocked && (
          <Text style={styles.activityCount}>
            0 / {lesson.activities.length} activities
          </Text>
        )}
      </View>

      <View style={styles.indicator}>
        {isCompleted && (
          <View style={styles.completedCircle}>
            <Ionicons name="checkmark" size={20} color="#FFFFFF" />
          </View>
        )}
        {isInProgress && (
          <Image
            source={images.mascotLogo}
            style={styles.inProgressImage}
            resizeMode="contain"
          />
        )}
        {isLocked && (
          <Ionicons name="lock-closed-outline" size={24} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  cardInProgress: {
    backgroundColor: "#F5F3FF",
    borderColor: "#6C4EF5",
    borderWidth: 2,
  },
  content: {
    flex: 1,
    paddingRight: 12,
  },
  lessonLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  lessonLabelActive: {
    fontFamily: "Poppins_600SemiBold",
    color: "#6C4EF5",
  },
  lessonTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#0D132B",
  },
  lessonTitleLocked: {
    fontFamily: "Poppins_500Medium",
    color: "#374151",
  },
  inProgressText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#21C16B",
    marginTop: 3,
  },
  activityCount: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 3,
  },
  indicator: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
  },
  completedCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#21C16B",
    alignItems: "center",
    justifyContent: "center",
  },
  inProgressImage: {
    width: 44,
    height: 44,
  },
});
