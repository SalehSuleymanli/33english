/** Pre-IELTS content: speaking topics and reading tests. */
import type { IeltsSpeakingTopic } from "./types";
import { IELTS_WORK } from "./speaking-work";
import { IELTS_EDUCATION } from "./speaking-education";
import { IELTS_TECHNOLOGY } from "./speaking-technology";
import { IELTS_TRAVEL } from "./speaking-travel";
import { IELTS_HOBBIES } from "./speaking-hobbies";

export const IELTS_SPEAKING: IeltsSpeakingTopic[] = [IELTS_WORK, IELTS_EDUCATION, IELTS_TECHNOLOGY, IELTS_TRAVEL, IELTS_HOBBIES];
export const IELTS_SPEAKING_IDS = IELTS_SPEAKING.map((t) => t.id);
export const ieltsSpeakingById = (id: string) => IELTS_SPEAKING.find((t) => t.id === id);
