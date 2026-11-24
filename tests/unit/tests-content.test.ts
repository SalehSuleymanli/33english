import { describe, expect, test } from "vitest";
import { ALL_TESTS, READINGS, EXAMS, IELTS_READINGS } from "@/content/tests";
import { IELTS_SPEAKING } from "@/content/ielts";
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
  test("Pre-IELTS reading: 5 full tests, 13 questions each, labelled paragraphs, at least 3 question types, long passages", () => {
    expect(IELTS_READINGS).toHaveLength(5);
    const types = new Set<string>();
    for (const t of IELTS_READINGS) {
      const qs = allQuestions(t);
      expect(qs.length, t.id).toBe(13);
      const words = t.passage!.paragraphs.join(" ").split(/\s+/).length;
      expect(words, `${t.id} words`).toBeGreaterThan(650);
      const kinds = new Set(qs.map((q) => (q.type === "tfng" && q.yesNo ? "yn" : q.type)));
      expect(kinds.size, t.id).toBeGreaterThanOrEqual(3);
      kinds.forEach((k) => types.add(k));
      if (qs.some((q) => q.type === "match")) expect(t.passage!.labels?.length).toBe(t.passage!.paragraphs.length);
    }
    for (const k of ["tfng", "yn", "match", "choice", "fill", "short"]) expect(types.has(k), k).toBe(true);
  });
  test("Pre-IELTS speaking: 5 complete topics with Parts 1–3 and translations", () => {
    expect(IELTS_SPEAKING.map((t) => t.id)).toEqual(["work-career", "education-learning", "technology-social-media", "travel-places", "hobbies-sports-free-time"]);
    for (const t of IELTS_SPEAKING) {
      expect(t.part1.length, t.id).toBeGreaterThanOrEqual(5);
      expect(t.part3.length, t.id).toBeGreaterThanOrEqual(5);
      for (const qa of [...t.part1, ...t.part3]) expect(qa.a.split(" ").length, qa.q).toBeGreaterThan(20);
      expect(t.part2.prompts.length).toBeGreaterThanOrEqual(3);
      const words = t.part2.answer.join(" ").split(/\s+/).length;
      expect(words, `${t.id} part 2 words`).toBeGreaterThan(230);
      expect(t.part2.translation.az).toHaveLength(t.part2.answer.length);
      expect(t.part2.translation.ru).toHaveLength(t.part2.answer.length);
      expect(t.part2.vocab.length).toBeGreaterThanOrEqual(6);
      expect(t.part2.expressions.length).toBeGreaterThanOrEqual(4);
      expect(t.part2.grammar.length).toBeGreaterThanOrEqual(4);
    }
  });
});
