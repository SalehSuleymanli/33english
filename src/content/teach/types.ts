/**
 * Full teaching content for a lesson, written in Azerbaijani and Russian.
 * English (formulas, examples, tables) stays English; the explanation around
 * it is in the learner's explanation language.
 */
import type { Loc } from "@/lib/i18n";
import type { SlotRole } from "../types";

export type TeachExample = { en: string; az: string; ru: string; note?: Loc };

export type TeachBlock =
  /** An explanation paragraph. */
  | { kind: "p"; text: Loc }
  /** A sentence formula; every part is explained. */
  | { kind: "formula"; label: Loc; parts: { text: string; role: SlotRole; note: Loc }[]; example?: string }
  /** A table of English forms. `head` labels the columns in the explanation language. */
  | { kind: "table"; head: Loc[]; rows: string[][]; caption?: Loc }
  /** English examples with translations. */
  | { kind: "examples"; items: TeachExample[] }
  /** Two constructions side by side. */
  | { kind: "compare"; items: { en: string; text: Loc }[] }
  /** Signal words and time expressions. */
  | { kind: "signals"; words: string[]; text: Loc }
  /** Mistakes typical for Azerbaijani and Russian speakers. */
  | { kind: "mistakes"; items: { wrong: string; right: string; why: Loc }[] }
  /** A highlighted rule or tip. */
  | { kind: "tip"; text: Loc };

export type TeachSection = { id: string; title: Loc; blocks: TeachBlock[] };

export type Teach = {
  day: number;
  /** One or two sentences: what this lesson teaches and why it matters. */
  summary: Loc;
  sections: TeachSection[];
  /** Short recap points shown at the end of the explanation. */
  recap: Loc[];
};
