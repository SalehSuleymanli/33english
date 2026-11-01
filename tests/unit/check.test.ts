import { describe, expect, it } from "vitest";
import { checkOrder, checkText, equivalent, transcriptMatch, wordDiff } from "@/engine/check";
import { buildQueue, schedule } from "@/engine/srs";

describe("answer checker", () => {
  it("ignores case, punctuation, curly quotes and contractions", () => {
    expect(equivalent("i dont work.", "I do not work")).toBe(false); // missing apostrophe is a spelling error
    expect(equivalent("I don’t work", "I do not work.")).toBe(true);
    expect(equivalent("She's been to India", "She has been to India")).toBe(true);
    expect(equivalent("She's ready", "She is ready")).toBe(true);
    expect(equivalent("I can't swim", "I cannot swim")).toBe(true);
    expect(equivalent("We won't go", "We will not go")).toBe(true);
    expect(equivalent("I'd like tea", "I would like tea")).toBe(true);
    expect(equivalent("They travelled a lot", "They traveled a lot")).toBe(true);
  });

  it("distinguishes correct, alternative, trap, close and incorrect", () => {
    const ans = {
      accept: ["There is no reason to stay."],
      alternatives: [{ text: "There isn't any reason to stay.", note: "Also correct: 'not any' = 'no'." }],
      traps: [{ text: "There is not reason to stay.", feedback: "Use 'no' before a noun, or 'not a/any'." }],
    };
    expect(checkText("there is no reason to stay", ans).status).toBe("correct");
    expect(checkText("There isn't any reason to stay.", ans).status).toBe("alternative");
    const trap = checkText("There is not reason to stay", ans);
    expect(trap.status).toBe("incorrect");
    expect(trap.note).toMatch(/no/);
    expect(checkText("There is no reasn to stay", ans).status).toBe("close");
    expect(checkText("Nothing", ans).status).toBe("incorrect");
    expect(checkText("   ", ans).status).toBe("incorrect");
  });

  it("checks word order with alternatives", () => {
    expect(checkOrder(["I", "usually", "work", "late"], ["I", "usually", "work", "late"]).status).toBe("correct");
    expect(checkOrder(["I", "usually", "work", "late"], ["usually", "I", "work", "late"], ["Usually I work late"]).status).toBe("alternative");
    expect(checkOrder(["I", "usually", "work", "late"], ["I", "work", "usually", "late"]).status).toBe("incorrect");
  });

  it("produces a word diff", () => {
    const d = wordDiff("She go to work", "She goes to work.");
    expect(d.filter((p) => p.kind !== "same").map((p) => p.text)).toEqual(["go", "goes"]);
  });

  it("transcript match counts heard words", () => {
    const r = transcriptMatch("there is a cafe near my office", "There is a café near my office.");
    expect(r.ratio).toBeGreaterThan(0.8);
  });
});

describe("Leitner scheduler", () => {
  const now = new Date("2026-01-10T10:00:00");
  const init = { itemId: "d01-e01", kind: "exercise" as const, day: 1 };
  it("wrong answers go to box 1 and are due now", () => {
    const a = schedule(undefined, init, false, now);
    expect(a.box).toBe(1);
    expect(new Date(a.dueAt).getTime()).toBe(now.getTime());
    expect(a.lapses).toBe(1);
  });
  it("correct answers climb boxes with growing intervals", () => {
    let a = schedule(undefined, init, false, now);
    a = schedule(a, init, true, now);
    expect(a.box).toBe(2);
    expect(a.dueAt.slice(0, 10)).toBe(new Date("2026-01-12T00:00:00").toISOString().slice(0, 10));
    for (let k = 0; k < 10; k++) a = schedule(a, init, true, now);
    expect(a.box).toBe(5);
    a = schedule(a, init, false, now);
    expect(a.box).toBe(1);
  });
  it("queue: due only, lowest box first, capped", () => {
    const due = schedule(undefined, init, false, now);
    const later = schedule(undefined, { ...init, itemId: "x" }, true, now);
    const q = buildQueue([later, due], new Date(now.getTime() + 1000));
    expect(q.map((i) => i.itemId)).toEqual(["d01-e01"]);
  });
});
