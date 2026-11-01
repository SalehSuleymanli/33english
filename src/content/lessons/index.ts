import "server-only";
/**
 * Lesson content lives on the server. Pages send a lesson to the browser only
 * after checking the learner may access it, so premium content never ships in
 * the public JavaScript bundle.
 */
import type { Exercise, Lesson } from "../types";
import { LESSON_LIST } from "./registry";

const BY_DAY = new Map<number, Lesson>(LESSON_LIST.map((l) => [l.day, l]));
const EXERCISES = new Map<string, { exercise: Exercise; day: number }>();
for (const l of LESSON_LIST) for (const e of [...l.practice, ...l.review]) EXERCISES.set(e.id, { exercise: e, day: l.day });

export const getLesson = (day: number) => BY_DAY.get(day);
export const getExercise = (id: string) => EXERCISES.get(id);
export const availableDays = () => [...BY_DAY.keys()].sort((a, b) => a - b);
