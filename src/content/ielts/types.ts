import type { Loc } from "@/lib/i18n";

export type QA = { q: string; tr: Loc; a: string };

export type IeltsSpeakingTopic = {
  id: string;
  title: Loc & { en: string };
  intro: Loc;
  part1: QA[];
  part2: {
    cue: string; // "Describe a job you would like to do in the future."
    prompts: string[]; // "You should say: …" bullet points
    closing: string; // "and explain why …"
    cueTr: Loc;
    answer: string[]; // paragraphs of a 1–2 minute answer
    translation: { az: string[]; ru: string[] };
    vocab: { en: string; az: string; ru: string }[];
    expressions: { en: string; az: string; ru: string }[];
    grammar: { en: string; note: Loc }[];
  };
  part3: QA[];
};
