/**
 * Instruction languages. English is what learners study; explanations,
 * instructions and the interface can be shown in Azerbaijani or Russian.
 * The choice is stored as `profile.nativeLanguage` (synced to Supabase as
 * profiles.native_language), so it follows the learner across devices.
 */
export type Lang = "en" | "az" | "ru";

/** Text in the instruction languages. `en` is optional: when missing, English UI falls back to `az`. */
export type Loc = { az: string; ru: string; en?: string };
/** Paragraph lists in the instruction languages. */
export type LocList = { az: string[]; ru: string[]; en?: string[] };

export const LANG_OPTIONS: { code: Lang; label: string; short: string }[] = [
  { code: "az", label: "Azərbaycan dili", short: "AZ" },
  { code: "ru", label: "Русский язык", short: "RU" },
  { code: "en", label: "English", short: "EN" },
];

export const langOf = (nativeLanguage?: string | null): Lang => (nativeLanguage === "az" || nativeLanguage === "ru" ? nativeLanguage : "en");

export function pick(l: Loc, lang: Lang): string {
  if (lang === "en") return l.en ?? l.az;
  return l[lang];
}

export function pickList(l: LocList, lang: Lang): string[] {
  if (lang === "en") return l.en ?? l.az;
  return l[lang];
}

/** A translation of an English example in the chosen language (nothing for English). */
export function gloss(l: { az?: string; ru?: string } | undefined, lang: Lang): string | null {
  if (!l || lang === "en") return null;
  return l[lang] ?? null;
}
