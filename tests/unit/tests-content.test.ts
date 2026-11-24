import { describe, expect, test } from "vitest";
import { ALL_TESTS, READINGS, EXAMS } from "@/content/tests";
import { allQuestions, gradeTest, type TestAnswer } from "@/lib/tests/grade";
import type { TestQ } from "@/content/tests/types";

const perfect = (q: TestQ): TestAnswer => (q.type === "choice" || q.type === "match" ? q.answer : q.type === "tfng" ? q.answer : q.type === "order" ? q.answer : q.accept[0]);

describe("exams and reading tests", () => {
  test("ids are unique, and there are 4 exams and 2 readings per level", () => {
    expect(new Set(ALL_TESTS.map((t) => t.id)).size).toBe(ALL_TESTS.length);
    expect(EXAMS).toHaveLength(4);
    for (const lvl of ["beginner", "elementary", "intermediate", "upper-intermediate", "advanced"]) expect(READINGS.filter((r) => r.level === lvl).length, lvl).toBeGreaterThanOrEqual(2);
  });
  test("every question is well-formed with AZ/RU explanations", () => {
    for (const t of ALL_TESTS) {
      const qs = allQuestions(t);
      expect(new Set(qs.map((q) => q.id)).size, t.id).toBe(qs.length);
      for (const q of qs) {
        expect(q.why.az.trim() && q.why.ru.trim(), `${t.id}/${q.id}`).toBeTruthy();
        if (q.type === "choice" || q.type === "match") expect(q.answer, `${t.id}/${q.id}`).toBeLessThan(q.options.length);
        if (q.type === "fill") expect(q.prompt).toContain("___");
        if (q.type === "order") expect([...q.tiles].sort().join(" ")).toBe(q.answer.split(" ").sort().join(" "));
      }
    }
  });
  test("perfect answers score 100%, blank answers 0%", () => {
    for (const t of ALL_TESTS) {
      const answers = Object.fromEntries(allQuestions(t).map((q) => [q.id, perfect(q)]));
      expect(gradeTest(t, answers).percent, t.id).toBe(100);
      expect(gradeTest(t, {}).percent).toBe(0);
    }
  });
  test("reading texts: translations match paragraph by paragraph; vocabulary and grammar are present", () => {
    for (const r of READINGS) {
      const n = r.passage!.paragraphs.length;
      expect(r.reading!.translation.az, r.id).toHaveLength(n);
      expect(r.reading!.translation.ru, r.id).toHaveLength(n);
      expect(r.reading!.vocab.length).toBeGreaterThanOrEqual(5);
      expect(r.reading!.grammar.length).toBeGreaterThanOrEqual(3);
      const kinds = new Set(allQuestions(r).map((q) => q.type));
      for (const k of ["choice", "tfng", "short"]) expect(kinds.has(k as TestQ["type"]), `${r.id} has ${k}`).toBe(true);
    }
  });
});
