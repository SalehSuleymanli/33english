/**
 * Grades an exercise from the answer string the lesson player records.
 * Used by the server to re-check a lesson review before awarding XP.
 */
import type { Exercise } from "@/content/types";
import { checkOrder, checkText } from "./check";

/** Returns null for exercises that can't be graded from text (speaking). */
export function gradeExercise(ex: Exercise, answer: string): boolean | null {
  const a = String(answer ?? "").slice(0, 500);
  switch (ex.type) {
    case "choice":
      return a === ex.options[ex.answer];
    case "fill":
    case "transform":
    case "correct":
    case "translate":
    case "listen": {
      const s = checkText(a, ex).status;
      return s === "correct" || s === "alternative";
    }
    case "order": {
      const s = checkOrder(ex.tiles, a.split(" ").filter(Boolean), ex.alsoValid).status;
      return s === "correct" || s === "alternative";
    }
    case "reading": {
      const picked = a.split(",");
      return ex.questions.every((q, i) => Number(picked[i]) === q.answer);
    }
    case "speak":
      return null;
  }
}

/** Score (0–100) for a lesson's review, from {exerciseId: answer}. Missing answers count as wrong. */
export function gradeReview(review: Exercise[], answers: Record<string, string>): { score: number; graded: number; correct: number } {
  let graded = 0;
  let correct = 0;
  for (const ex of review) {
    const g = gradeExercise(ex, answers[ex.id] ?? "");
    if (g === null) continue;
    graded++;
    if (g) correct++;
  }
  return { score: graded ? Math.round((correct / graded) * 100) : 100, graded, correct };
}
