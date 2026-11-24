/**
 * Shared model for exams, reading tests and Pre-IELTS reading.
 * Question text stays in English; explanations come in Azerbaijani and Russian.
 */
import type { Loc } from "@/lib/i18n";

export type TestLevel = "beginner" | "elementary" | "intermediate" | "upper-intermediate" | "advanced";

type Base = { id: string; why: Loc; skill?: string };

export type TestQ = Base &
  (
    | { type: "choice"; prompt: string; options: string[]; answer: number }
    | { type: "fill"; prompt: string; accept: string[] } // prompt contains ___
    | { type: "correct"; prompt: string; accept: string[] } // prompt = sentence with one mistake
    | { type: "transform"; prompt: string; instruction: Loc & { en: string }; accept: string[] }
    | { type: "order"; tiles: string[]; answer: string }
    | { type: "tfng"; prompt: string; answer: "T" | "F" | "NG"; yesNo?: boolean } // yesNo → labels Yes / No / Not Given
    | { type: "short"; prompt: string; accept: string[]; maxWords?: number } // answer from the text
    | { type: "match"; prompt: string; options: string[]; answer: number } // matching headings / information: choose one option for this item
  );

export type TestSection = {
  title?: string; // e.g. "Questions 1–5: True / False / Not Given"
  instructions?: Loc & { en: string };
  questions: TestQ[];
};

export type Test = {
  id: string;
  kind: "exam" | "reading" | "ielts-reading";
  title: Loc & { en: string };
  description: Loc & { en: string };
  level?: TestLevel;
  minutes: number; // time limit (timed mode) or estimate
  timed: boolean;
  passage?: { title: string; paragraphs: string[]; labels?: string[] }; // labels: A, B, C… for matching tasks
  sections: TestSection[];
  passMark?: number; // percent
  /** Reading texts: topic, full translations (one per paragraph), vocabulary and the grammar used. */
  reading?: {
    topic: Loc & { en: string };
    translation: { az: string[]; ru: string[] };
    vocab: { en: string; az: string; ru: string }[];
    grammar: { en: string; note: Loc }[];
  };
};
