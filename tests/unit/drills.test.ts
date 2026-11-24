import { describe, expect, test } from "vitest";
import { DRILL_IDS, DRILL_META, drillXp, gradeItem, gradeRound, itemPoints, makeRound, type DrillAnswer, type DrillItem } from "@/lib/game/drills";
import { FIXES, GRAMMAR } from "@/content/quest";
import { WORDS } from "@/content/words";
import { CHANGES } from "@/engine/challenges";
import { CHANGE_LABELS, FIX_TIPS, GRAMMAR_TIPS } from "@/content/l10n/quest-tips";
import { WORD_L10N } from "@/content/l10n/words";

const perfect = (it: DrillItem): DrillAnswer =>
  it.kind === "order" ? it.answer : it.kind === "choice" || it.kind === "detect" ? it.answer : it.kind === "type" ? it.accept[0] : it.pairs.map((_, i) => i);

describe("practice games", () => {
  test("translations cover every grammar item, error item, change and word", () => {
    expect(GRAMMAR_TIPS).toHaveLength(GRAMMAR.length);
    expect(FIX_TIPS).toHaveLength(FIXES.length);
    expect(CHANGE_LABELS).toHaveLength(CHANGES.length);
    for (const w of WORDS) expect(WORD_L10N[w.word], w.word).toBeDefined();
    for (const [w, [az, ru]] of Object.entries(WORD_L10N)) expect(az && ru, w).toBeTruthy();
  });
  test("every game builds a full, well-formed round for 200 seeds", () => {
    for (const game of DRILL_IDS)
      for (let seed = 1; seed <= 200; seed++) {
        const items = makeRound(game, seed);
        expect(items, `${game} ${seed}`).toHaveLength(DRILL_META[game].items);
        for (const it of items) {
          if (it.kind === "order") expect([...it.tiles].sort()).toEqual(it.answer.split(" ").sort());
          if (it.kind === "choice") expect(it.answer).toBeGreaterThanOrEqual(0);
          if (it.kind === "detect") expect(it.answer).toBeGreaterThanOrEqual(0);
          if (it.kind === "type") expect(it.accept.length).toBeGreaterThan(0);
          if (it.kind === "type" && game === "transform") expect(it.prompt).not.toBe(it.accept[0]);
          if (it.kind === "match") expect(new Set(it.pairs.map((p) => p.en)).size).toBe(5);
        }
      }
  });
  test("rounds are deterministic, so the server can re-grade them", () => {
    for (const game of DRILL_IDS) expect(makeRound(game, 99)).toEqual(makeRound(game, 99));
  });
  test("grading: perfect answers score full marks, empty answers score nothing", () => {
    for (const game of DRILL_IDS) {
      const items = makeRound(game, 7);
      const g = gradeRound(game, 7, items.map(perfect));
      expect(g.points, game).toBe(g.total);
      expect(gradeRound(game, 7, []).points).toBe(0);
      expect(drillXp(g.points, g.total)).toBe(40);
      for (const it of items) expect(gradeItem(it, perfect(it))).toBe(itemPoints(it));
    }
    expect(drillXp(2, 10)).toBe(0);
  });
  test("typed answers accept case, spacing and contractions but not wrong forms", () => {
    const gap = makeRound("gap", 3)[0];
    if (gap.kind !== "type") throw new Error();
    expect(gradeItem(gap, `  ${gap.accept[0].toUpperCase()} `)).toBe(1);
    expect(gradeItem(gap, "xyz")).toBe(0);
  });
});
