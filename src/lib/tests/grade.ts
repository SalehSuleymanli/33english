/** Grades a test the same way in the browser and on the server. */
import type { Test, TestQ } from "@/content/tests/types";
import { checkText, checkOrder } from "@/engine/check";

export type TestAnswer = string | number | null;
export type QResult = { id: string; correct: boolean };

export const allQuestions = (t: Test): TestQ[] => t.sections.flatMap((s) => s.questions);

export function gradeQ(q: TestQ, a: TestAnswer): boolean {
  if (a === null || a === undefined || a === "") return false;
  switch (q.type) {
    case "choice":
    case "match":
      return a === q.answer;
    case "tfng":
      return a === q.answer;
    case "order":
      return typeof a === "string" && checkOrder(q.answer.split(" "), a.split(" ")).status === "correct";
    case "fill":
    case "correct":
    case "transform":
    case "short": {
      if (typeof a !== "string") return false;
      const r = checkText(a, { accept: q.accept });
      return r.status === "correct" || r.status === "alternative";
    }
  }
}

export function gradeTest(t: Test, answers: Record<string, TestAnswer>) {
  const qs = allQuestions(t);
  const results: QResult[] = qs.map((q) => ({ id: q.id, correct: gradeQ(q, answers[q.id] ?? null) }));
  const score = results.filter((r) => r.correct).length;
  const total = qs.length;
  return { score, total, percent: Math.round((score / total) * 100), results };
}

/** A rough IELTS-style band for a 13–14 question practice test. Practice only, never an official score. */
export function practiceBand(percent: number): number {
  const steps: [number, number][] = [[90, 8], [80, 7.5], [70, 7], [60, 6.5], [50, 6], [40, 5.5], [30, 5], [20, 4.5]];
  for (const [p, b] of steps) if (percent >= p) return b;
  return 4;
}
