import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProgressState {
  streak: number;
  dailyXP: number;
  dailyGoalXP: number;
  completedLessons: string[];
  completeLesson: (lessonId: string, xp: number) => void;
  addXP: (xp: number) => void;
  resetDailyXP: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      streak: 12,
      dailyXP: 15,
      dailyGoalXP: 20,
      completedLessons: ["es-1-1"],
      completeLesson: (lessonId, xp) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
          dailyXP: Math.min(state.dailyXP + xp, state.dailyGoalXP),
        })),
      addXP: (xp) =>
        set((state) => ({
          dailyXP: Math.min(state.dailyXP + xp, state.dailyGoalXP),
        })),
      resetDailyXP: () => set({ dailyXP: 0 }),
    }),
    {
      name: "lingua-progress",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        streak: state.streak,
        dailyXP: state.dailyXP,
        dailyGoalXP: state.dailyGoalXP,
        completedLessons: state.completedLessons,
      }),
    }
  )
);
