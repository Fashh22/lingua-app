import { Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish
  {
    id: "es-unit-1",
    languageCode: "es",
    order: 1,
    title: "Greetings & Basics",
    description: "Learn how to say hello, introduce yourself, and be polite",
    theme: "🙋",
    lessonIds: ["es-1-1", "es-1-2", "es-1-3"],
  },
  {
    id: "es-unit-2",
    languageCode: "es",
    order: 2,
    title: "Numbers & Colors",
    description: "Count and describe the world around you",
    theme: "🔢",
    lessonIds: ["es-2-1", "es-2-2"],
  },

  // French
  {
    id: "fr-unit-1",
    languageCode: "fr",
    order: 1,
    title: "Bonjour! Greetings",
    description: "Learn French greetings and polite expressions",
    theme: "👋",
    lessonIds: ["fr-1-1", "fr-1-2"],
  },

  // Japanese
  {
    id: "ja-unit-1",
    languageCode: "ja",
    order: 1,
    title: "First Words",
    description: "Essential Japanese words and common greetings",
    theme: "🌸",
    lessonIds: ["ja-1-1", "ja-1-2"],
  },
];
