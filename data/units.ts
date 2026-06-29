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
    lessonIds: ["fr-1-1", "fr-1-2", "fr-1-3", "fr-1-4", "fr-1-5", "fr-1-6"],
  },

  // Japanese
  {
    id: "ja-unit-1",
    languageCode: "ja",
    order: 1,
    title: "First Words",
    description: "Essential Japanese words and common greetings",
    theme: "🌸",
    lessonIds: ["ja-1-1", "ja-1-2", "ja-1-3", "ja-1-4", "ja-1-5", "ja-1-6"],
  },

  // German
  {
    id: "de-unit-1",
    languageCode: "de",
    order: 1,
    title: "Grundlagen: Basics",
    description: "Learn German greetings, introductions, and everyday essentials",
    theme: "🇩🇪",
    lessonIds: ["de-1-1", "de-1-2", "de-1-3", "de-1-4", "de-1-5", "de-1-6"],
  },

  // Portuguese
  {
    id: "pt-unit-1",
    languageCode: "pt",
    order: 1,
    title: "Fundamentos: Basics",
    description: "Learn Brazilian Portuguese greetings, introductions, and essentials",
    theme: "🇧🇷",
    lessonIds: ["pt-1-1", "pt-1-2", "pt-1-3", "pt-1-4", "pt-1-5", "pt-1-6"],
  },
];
