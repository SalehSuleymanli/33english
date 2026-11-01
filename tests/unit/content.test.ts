import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { LESSON_LIST } from "@/content/lessons/registry";
import { CURRICULUM } from "@/content/curriculum";
import { equivalent, basicNormalize } from "@/engine/check";
import type { Exercise } from "@/content/types";

const allExercises = LESSON_LIST.flatMap((l) => [...l.practice, ...l.review].map((e) => ({ e, day: l.day })));

describe("curriculum coverage", () => {
  it("has a lesson for every curriculum day, matching titles", () => {
    expect(LESSON_LIST.map((l) => l.day)).toEqual(CURRICULUM.map((c) => c.day));
    for (const l of LESSON_LIST) {
      const c = CURRICULUM.find((x) => x.day === l.day)!;
      expect(l.title, `day ${l.day}`).toBe(c.title);
      expect(l.stage).toBe(c.stage);
      expect(l.frame).toBe(c.frame);
    }
  });
  it("exercise ids are unique and prefixed by day", () => {
    const ids = allExercises.map((x) => x.e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const { e, day } of allExercises) expect(e.id.startsWith(`d${String(day).padStart(2, "0")}-`), e.id).toBe(true);
  });
});

describe.each(LESSON_LIST.map((l) => [l.day, l] as const))("Day %i is complete", (_day, l) => {
  it("has every lesson part", () => {
    expect(l.objective.length).toBeGreaterThan(20);
    expect(l.builds_on.length).toBeGreaterThan(20);
    expect(l.explanation.length).toBeGreaterThanOrEqual(3);
    expect(l.patterns.length).toBeGreaterThanOrEqual(1);
    expect(l.examples.length).toBeGreaterThanOrEqual(6);
    expect(l.mistakes.length).toBeGreaterThanOrEqual(4);
    expect(l.guided.steps.length).toBeGreaterThanOrEqual(3);
    expect(l.practice.length).toBeGreaterThanOrEqual(8);
    expect(new Set(l.practice.map((e) => e.type)).size).toBeGreaterThanOrEqual(4);
    expect(l.vocabulary.length).toBeGreaterThanOrEqual(5);
    expect(l.dialogue.lines.length).toBeGreaterThanOrEqual(5);
    expect(l.review.length).toBeGreaterThanOrEqual(5);
  });
  it("guided build is consistent", () => {
    for (const s of l.guided.steps) {
      expect(s.answer).toBeGreaterThanOrEqual(0);
      expect(s.answer).toBeLessThan(s.options.length);
    }
    const built = l.guided.steps.map((s) => s.options[s.answer]).join(" ");
    expect(basicNormalize(built)).toBe(basicNormalize(l.guided.result));
  });
  it("dialogue focus phrases appear in the dialogue", () => {
    const text = l.dialogue.lines.map((x) => x.line).join(" ").toLowerCase();
    for (const f of l.dialogue.focus) expect(text, f).toContain(f.toLowerCase());
  });
  it("exercises are well-formed", () => {
    for (const e of [...l.practice, ...l.review]) checkExercise(e);
  });
});

function checkExercise(e: Exercise) {
  const id = e.id;
  expect(e.explanation.length, id).toBeGreaterThan(5);
  switch (e.type) {
    case "choice":
      expect(e.options.length, id).toBeGreaterThanOrEqual(2);
      expect(e.answer, id).toBeLessThan(e.options.length);
      expect(new Set(e.options).size, id).toBe(e.options.length);
      break;
    case "order":
      expect(e.tiles.length, id).toBeGreaterThanOrEqual(3);
      break;
    case "reading":
      for (const q of e.questions) expect(q.answer, id).toBeLessThan(q.options.length);
      break;
    case "speak":
      expect(e.target.length, id).toBeGreaterThan(3);
      break;
    default: {
      expect(e.accept.length, id).toBeGreaterThan(0);
      if (e.type === "fill") expect(e.sentence.split("___").length, id).toBe(2);
      // traps and alternatives must not collide with accepted answers
      const wrap = (t: string) => (e.type === "fill" ? e.sentence.replace("___", t) : t);
      for (const t of e.traps ?? []) for (const a of e.accept) expect(equivalent(wrap(t.text), wrap(a)), `${id} trap "${t.text}" equals accepted "${a}"`).toBe(false);
      for (const t of e.alternatives ?? []) for (const a of e.accept) expect(equivalent(wrap(t.text), wrap(a)), `${id} alternative duplicates accepted`).toBe(false);
      if (e.type === "correct") for (const a of e.accept) expect(equivalent(e.wrong, a), `${id} wrong sentence is accepted`).toBe(false);
    }
  }
}

describe("route ids", () => {
  it("proxy scenario ids match the scenario content", async () => {
    const { SCENARIO_IDS } = await import("@/content/ids");
    const { SCENARIOS } = await import("@/content/scenarios");
    expect([...SCENARIO_IDS].sort()).toEqual(SCENARIOS.map((s) => s.id).sort());
  });
});
