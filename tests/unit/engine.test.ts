import { describe, expect, it } from "vitest";
import { build, DEFAULT_OPTIONS, type Options, type Seed } from "@/engine/build";
import { SEEDS, seedById } from "@/engine/seeds";
import { VERBS, regularPast, regularThirdPerson } from "@/engine/lexicon";

const s = (id: string) => seedById(id)!;
const run = (seed: Seed, o: Partial<Options>) => {
  const r = build(seed, { ...DEFAULT_OPTIONS, ...o });
  return r.ok ? r.sentence : `FAIL: ${r.reason}`;
};

describe("Frame 3 · actions (the brief's 'I work' example)", () => {
  const work = s("ac-work");
  it.each([
    [{}, "I work at a bank."],
    [{ polarity: "negative" }, "I do not work at a bank."],
    [{ mood: "question" }, "Do I work at a bank?"],
    [{ time: "past" }, "I worked at a bank."],
    [{ time: "future" }, "I will work at a bank."],
    [{ aspect: "continuous" }, "I am working at a bank."],
    [{ aspect: "perfect" }, "I have worked at a bank."],
    [{ modal: "can" }, "I can work at a bank."],
    [{ time: "past", aspect: "perfectContinuous" }, "I had been working at a bank."],
    [{ polarity: "negative", contract: true }, "I don't work at a bank."],
    [{ aspect: "continuous", contract: true }, "I'm working at a bank."],
    [{ modal: "can", polarity: "negative" }, "I cannot work at a bank."],
    [{ modal: "can", polarity: "negative", contract: true }, "I can't work at a bank."],
    [{ modal: "haveTo", time: "past", mood: "question" }, "Did I have to work at a bank?"],
    [{ modal: "beAbleTo", time: "future" }, "I will be able to work at a bank."],
  ] as [Partial<Options>, string][])("%o → %s", (o, expected) => {
    expect(run(work, o)).toBe(expected);
  });

  it("third person -s and do-support", () => {
    const fix = s("ac-fix");
    expect(run(fix, {})).toBe("My brother fixes cars.");
    expect(run(fix, { mood: "question" })).toBe("Does my brother fix cars?");
    expect(run(fix, { polarity: "negative", contract: true })).toBe("My brother doesn't fix cars.");
    expect(run(fix, { time: "past", polarity: "negative" })).toBe("My brother did not fix cars.");
  });

  it("irregular verbs", () => {
    expect(run(s("ac-write"), { time: "past" })).toBe("Tofig wrote a letter.");
    expect(run(s("ac-write"), { aspect: "perfect", mood: "question" })).toBe("Has Tofig written a letter?");
  });

  it("refuses continuous with state verbs", () => {
    const r = build(s("ac-know"), { ...DEFAULT_OPTIONS, aspect: "continuous" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toMatch(/state/);
  });

  it("refuses perfect continuous with momentary verbs", () => {
    expect(build(s("ac-finish"), { ...DEFAULT_OPTIONS, aspect: "perfectContinuous" }).ok).toBe(false);
  });

  it("negative questions contract", () => {
    expect(run(s("ac-fix"), { mood: "question", polarity: "negative" })).toBe("Doesn't my brother fix cars?");
  });
});

describe("Frame 1 · existence", () => {
  it("agrees with the noun and switches to any", () => {
    const p = s("ex-people");
    expect(run(p, {})).toBe("There are three people outside.");
    expect(run(p, { mood: "question" })).toBe("Are there any people outside?");
    expect(run(p, { time: "past", polarity: "negative" })).toBe("There were not any people outside.");
    expect(run(p, { time: "future" })).toBe("There will be three people outside.");
    expect(run(s("ex-cafe"), { contract: true })).toBe("There's a café near my office.");
    expect(run(s("ex-cafe"), { polarity: "negative", contract: true })).toBe("There isn't a café near my office.");
    expect(run(s("ex-cafe"), { modal: "haveTo" })).toBe("There has to be a café near my office.");
  });
  it("has no continuous", () => {
    expect(build(s("ex-cafe"), { ...DEFAULT_OPTIONS, aspect: "continuous" }).ok).toBe(false);
  });
  it("never writes there're", () => {
    expect(run(s("ex-people"), { contract: true })).toBe("There are three people outside.");
  });
});

describe("Frame 2 · states", () => {
  it("conjugates be", () => {
    expect(run(s("st-ready"), {})).toBe("I am ready.");
    expect(run(s("st-ready"), { contract: true })).toBe("I'm ready.");
    expect(run(s("st-ready"), { polarity: "negative", contract: true })).toBe("I'm not ready.");
    expect(run(s("st-home"), { time: "past", mood: "question" })).toBe("Were they at home?");
    expect(run(s("st-doctor"), { aspect: "perfect" })).toBe("She has been a doctor for ten years.");
    expect(run(s("st-tofig"), { mood: "question" })).toBe("Is Tofig in London?");
    expect(run(s("st-phone"), { mood: "question" })).toBe("Is my phone on the table?");
  });
  it("refuses perfect without a time span", () => {
    expect(build(s("st-ready"), { ...DEFAULT_OPTIONS, aspect: "perfect" }).ok).toBe(false);
  });
});

describe("Frame 4 · modals", () => {
  it("base verb after modals", () => {
    expect(run(s("ac-fix"), { modal: "should" })).toBe("My brother should fix cars.");
    expect(run(s("ac-fix"), { modal: "must", polarity: "negative", contract: true })).toBe("My brother mustn't fix cars.");
    expect(run(s("ac-fix"), { modal: "might", aspect: "perfect" })).toBe("My brother might have fixed cars.");
    expect(run(s("st-ready"), { modal: "should" })).toBe("I should be ready.");
  });
  it("has to / be able to change with the subject and time", () => {
    expect(run(s("ac-fix"), { modal: "haveTo" })).toBe("My brother has to fix cars.");
    expect(run(s("ac-fix"), { modal: "haveTo", polarity: "negative", contract: true })).toBe("My brother doesn't have to fix cars.");
    expect(run(s("ac-fix"), { modal: "beAbleTo", time: "past" })).toBe("My brother was able to fix cars.");
    expect(run(s("ac-fix"), { modal: "beAbleTo", aspect: "perfect" })).toBe("My brother has been able to fix cars.");
  });
  it("can + perfect only in negative statements", () => {
    expect(build(s("ac-fix"), { ...DEFAULT_OPTIONS, modal: "can", aspect: "perfect" }).ok).toBe(false);
    expect(run(s("ac-finish"), { modal: "can", aspect: "perfect", polarity: "negative", contract: true })).toBe("He can't have finished the project.");
  });
  it("blocks unnatural negative questions with might/must", () => {
    expect(build(s("ac-fix"), { ...DEFAULT_OPTIONS, modal: "might", mood: "question", polarity: "negative" }).ok).toBe(false);
  });
});

describe("Frame 5 · possession", () => {
  it("uses do-support and never contracts possession have", () => {
    expect(run(s("po-brothers"), {})).toBe("She has two brothers.");
    expect(run(s("po-brothers"), { mood: "question" })).toBe("Does she have any brothers?");
    expect(run(s("po-car"), { contract: true })).toBe("I have a car.");
    expect(run(s("po-car"), { polarity: "negative", contract: true })).toBe("I don't have a car.");
    expect(run(s("po-car"), { aspect: "perfect", contract: true })).toBe("I've had a car for five years.");
    expect(run(s("po-house"), { time: "past", mood: "question" })).toBe("Did they have a big house?");
  });
  it("refuses continuous and passive", () => {
    expect(build(s("po-car"), { ...DEFAULT_OPTIONS, aspect: "continuous" }).ok).toBe(false);
    expect(build(s("po-car"), { ...DEFAULT_OPTIONS, voice: "passive" }).ok).toBe(false);
  });
});

describe("Frame 6 · passive", () => {
  it("be carries the tense", () => {
    const b = s("ac-build");
    const p = (o: Partial<Options>) => run(b, { voice: "passive", ...o });
    expect(p({})).toBe("Houses are built in this area.");
    expect(p({ time: "past" })).toBe("Houses were built in this area.");
    expect(p({ aspect: "continuous" })).toBe("Houses are being built in this area.");
    expect(p({ aspect: "perfect" })).toBe("Houses have been built in this area.");
    expect(p({ time: "future" })).toBe("Houses will be built in this area.");
    expect(p({ modal: "must" })).toBe("Houses must be built in this area.");
    expect(p({ mood: "question", time: "past" })).toBe("Were houses built in this area?");
    expect(run(s("ac-write"), { voice: "passive", time: "past" })).toBe("A letter was written by Tofig.");
    expect(run(s("ac-steal"), { voice: "passive", time: "past" })).toBe("My bike was stolen.");
    expect(run(s("ac-speak"), { voice: "passive" })).toBe("English is spoken here.");
  });
  it("refuses passive without a natural object", () => {
    const r = build(s("ac-work"), { ...DEFAULT_OPTIONS, voice: "passive" });
    expect(r.ok).toBe(false);
  });
  it("refuses heavy forms", () => {
    expect(build(s("ac-build"), { ...DEFAULT_OPTIONS, voice: "passive", aspect: "perfectContinuous" }).ok).toBe(false);
    expect(build(s("ac-build"), { ...DEFAULT_OPTIONS, voice: "passive", aspect: "continuous", time: "future" }).ok).toBe(false);
  });
});

describe("whole grid sanity", () => {
  const times = ["present", "past", "future"] as const;
  const aspects = ["simple", "continuous", "perfect", "perfectContinuous"] as const;
  const modals = ["none", "can", "could", "should", "must", "might", "may", "would", "haveTo", "beAbleTo"] as const;
  it("every successful sentence is well-formed", () => {
    let count = 0;
    for (const seed of SEEDS)
      for (const voice of ["active", "passive"] as const)
        for (const modal of modals)
          for (const time of times)
            for (const aspect of aspects)
              for (const polarity of ["positive", "negative"] as const)
                for (const mood of ["statement", "question"] as const)
                  for (const contract of [false, true]) {
                    const r = build(seed, { time, aspect, polarity, mood, modal, voice, contract });
                    if (!r.ok) {
                      expect(r.reason.length).toBeGreaterThan(20);
                      continue;
                    }
                    count++;
                    const sen = r.sentence;
                    expect(sen).toMatch(/^[A-Z]/);
                    expect(sen).toMatch(mood === "question" ? /\?$/ : /\.$/);
                    expect(sen).not.toMatch(/\s{2}|\bundefined\b|\bnull\b/);
                    expect(sen.replace(/\bhad had\b/i, "had")).not.toMatch(/\b(\w+) \1\b/i); // "had had" is correct English
                    expect(sen).not.toMatch(/\bthere're\b|\bthere'll\b/i);
                    expect(sen).not.toMatch(/\b(does|did|do|will|can|should|must|might|may|would|could) \w+(s|ed)\b(?<!\b(is|has|was|cars|brothers|houses|reports|phones|bus|English|address))/);
                    if (mood === "question") expect(r.tokens[0].role === "aux" || r.tokens[0].role === "modal" || r.tokens[0].role === "be").toBe(true);
                  }
    expect(count).toBeGreaterThan(2000);
  });
});

describe("lexicon", () => {
  it("regular verbs follow spelling rules (except consonant doubling)", () => {
    for (const v of Object.values(VERBS)) {
      if (!v.regular) continue;
      expect(v.s).toBe(regularThirdPerson(v.base));
      const doubled = v.base + v.base.slice(-1) + "ed";
      expect([regularPast(v.base), doubled]).toContain(v.past);
      expect(v.pp).toBe(v.past);
    }
  });
});
