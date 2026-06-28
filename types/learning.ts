export type LanguageCode = "es" | "fr" | "de" | "ja" | "pt";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
}

export type ActivityType =
  | "vocabulary"
  | "phrase"
  | "listen_and_choose"
  | "translate"
  | "fill_blank"
  | "match_pairs";

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
}

export interface PhraseItem {
  phrase: string;
  translation: string;
  pronunciation: string;
  context: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  correctAnswer: string;
  options?: string[];
  hint?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  order: number;
  title: string;
  description: string;
  xpReward: number;
  estimatedMinutes: number;
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: Activity[];
  goals: string[];
  aiTeacherPrompt: string;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  order: number;
  title: string;
  description: string;
  theme: string;
  lessonIds: string[];
}
