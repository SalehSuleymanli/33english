/**
 * Speaking topics — everyday, friendly prompts in the style of a one-to-two
 * minute talk. Each topic has a natural sample answer and a "grammar-rich"
 * answer that shows the six frames at work, sentence by sentence.
 */
import type { FrameId } from "./types";
import { TOPICS_1 } from "./speaking-1";
import { TOPICS_2 } from "./speaking-2";
import { TOPICS_3 } from "./speaking-3";

export type SpeakingLevel = "Beginner" | "Intermediate" | "Confident";

export type RichSentence = { s: string; tags: { frame: FrameId; phrase: string }[] };

export type SpeakingTopic = {
  id: string;
  title: string;
  category: "People" | "Places" | "Daily life" | "Experiences" | "Future" | "Things I love";
  level: SpeakingLevel;
  minutes: number;
  description: string;
  questions: string[];
  natural: string[];
  rich: RichSentence[];
  vocab: { term: string; meaning: string; example: string }[];
};


export const SPEAKING: SpeakingTopic[] = [...TOPICS_1, ...TOPICS_2, ...TOPICS_3];

export const speakingById = (id: string) => SPEAKING.find((t) => t.id === id);
export const SPEAKING_IDS = SPEAKING.map((t) => t.id);
