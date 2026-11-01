/**
 * The Structa sentence engine.
 *
 * Builds English sentences for the six frames from curated seeds and
 * transformation options. Every output is deterministic. When a
 * transformation would be unnatural, the engine refuses and explains why
 * instead of producing a doubtful sentence.
 */
import type { FrameId, SlotRole } from "@/content/types";
import { VERBS, type Verb } from "./lexicon";

export type Person = "1s" | "2" | "3s" | "1p" | "3p";
export type Subject = { text: string; person: Person; proper?: boolean };

export type Time = "past" | "present" | "future";
export type Aspect = "simple" | "continuous" | "perfect" | "perfectContinuous";
export type Polarity = "positive" | "negative";
export type Mood = "statement" | "question";
export type PureModal = "can" | "could" | "should" | "must" | "might" | "may" | "would";
export type Modal = "none" | PureModal | "haveTo" | "beAbleTo";
export type Voice = "active" | "passive";

export type Options = {
  time: Time;
  aspect: Aspect;
  polarity: Polarity;
  mood: Mood;
  modal: Modal;
  voice: Voice;
  contract: boolean;
};

export const DEFAULT_OPTIONS: Options = {
  time: "present",
  aspect: "simple",
  polarity: "positive",
  mood: "statement",
  modal: "none",
  voice: "active",
  contract: false,
};

export type Token = { text: string; role: SlotRole; aux?: boolean };

export type BuildOk = {
  ok: true;
  tokens: Token[];
  sentence: string;
  notes: string[];
  timeHint?: string;
};
export type BuildFail = { ok: false; reason: string };
export type BuildResult = BuildOk | BuildFail;

/* ---------------- Seeds ---------------- */

export type ActionSeed = {
  frame: "actions";
  id: string;
  subject: Subject;
  verb: string;
  object?: string;
  tail?: string;
  /** If present, the passive is natural for this sentence. */
  passive?: { subject: Subject; tail?: string; agent?: string };
  /** Why the passive is not offered (shown to the learner). */
  noPassiveReason?: string;
};

export type ExistenceSeed = {
  frame: "existence";
  id: string;
  /** Noun phrase for positive statements: "two cafés". */
  thing: string;
  /** Noun phrase for negatives/questions: "any cafés". Defaults to `thing`. */
  thingOther?: string;
  plural: boolean;
  tail: string;
};

export type StateSeed = {
  frame: "states";
  id: string;
  subject: Subject;
  complement: string;
  /** Added in perfect forms, e.g. "for ten years". Perfect is offered only when set. */
  perfectTail?: string;
};

export type PossessionSeed = {
  frame: "possession";
  id: string;
  subject: Subject;
  object: string;
  objectOther?: string;
  perfectTail?: string;
};

export type Seed = ActionSeed | ExistenceSeed | StateSeed | PossessionSeed;

/* ---------------- Helpers ---------------- */

const PURE_MODALS: PureModal[] = ["can", "could", "should", "must", "might", "may", "would"];
export const isPureModal = (m: Modal): m is PureModal => (PURE_MODALS as string[]).includes(m);

const is3s = (p: Person) => p === "3s";

function beFinite(time: "present" | "past", p: Person): string {
  if (time === "present") return p === "1s" ? "am" : p === "3s" ? "is" : "are";
  return p === "1s" || p === "3s" ? "was" : "were";
}

type Lexeme =
  | { kind: "modal"; word: string }
  | { kind: "be" }
  | { kind: "have"; aux: boolean } // aux = perfect helper; false = lexical have
  | { kind: "verb"; verb: Verb }
  | { kind: "particle"; word: string; role?: SlotRole }; // "to", "able to"

type FormNeeded = "finite" | "base" | "pp" | "ing";

function formOf(lx: Lexeme, need: FormNeeded, time: "present" | "past", p: Person): string {
  switch (lx.kind) {
    case "modal":
      return lx.word;
    case "particle":
      return lx.word;
    case "be":
      if (need === "finite") return beFinite(time, p);
      return need === "base" ? "be" : need === "pp" ? "been" : "being";
    case "have":
      if (need === "finite") return time === "past" ? "had" : is3s(p) ? "has" : "have";
      return need === "base" ? "have" : need === "pp" ? "had" : "having";
    case "verb": {
      const v = lx.verb;
      if (need === "finite") return time === "past" ? v.past : is3s(p) ? v.s : v.base;
      return need === "base" ? v.base : need === "pp" ? v.pp : v.ing;
    }
  }
}

function roleOf(lx: Lexeme, isMain: boolean): SlotRole {
  if (lx.kind === "modal") return "modal";
  if (lx.kind === "particle") return lx.role ?? "modal";
  if (lx.kind === "be") return isMain ? "be" : "aux";
  if (lx.kind === "have") return lx.aux ? "aux" : "verb";
  return "verb";
}

export const TIME_HINTS: Record<string, string> = {
  "present-simple": "every day, usually, often, on Mondays",
  "past-simple": "yesterday, last week, in 2020, two days ago",
  "future-simple": "tomorrow, next week, soon, later",
  "present-continuous": "now, right now, at the moment, today",
  "past-continuous": "at 8 p.m. yesterday, when you called",
  "future-continuous": "at this time tomorrow, all evening",
  "present-perfect": "already, just, yet, ever, never, since 2020, for years",
  "past-perfect": "before, by the time, already",
  "future-perfect": "by Friday, by the end of the year",
  "present-perfectContinuous": "for two hours, since this morning, all day",
  "past-perfectContinuous": "for an hour before…, since…",
  "future-perfectContinuous": "for ten years by next June",
};

/* ---------------- Core ---------------- */

type Core = {
  subject: { text: string; role: SlotRole; person: Person; proper?: boolean };
  main: Lexeme; // the main predicate lexeme
  after: Token[]; // object / complement / tail tokens
  frame: FrameId;
  allowDoSupportForMain: boolean; // lexical verbs & lexical have
};

export function build(seed: Seed, opts: Options): BuildResult {
  const o = { ...opts };
  const notes: string[] = [];

  // ---- frame-specific setup & guards
  let core: Core;

  if (seed.frame === "existence") {
    if (o.voice === "passive") return fail("The passive needs an action with an object. 'There is / There are' only says that something exists.");
    if (o.aspect === "continuous" || o.aspect === "perfectContinuous")
      return fail("'There is' describes existence, which is a state — it has no continuous form. Use the simple form: 'There is…', 'There was…'.");
    if (o.modal === "beAbleTo") return fail("'There' can't be 'able to' do anything. Try 'there might be' or 'there has to be' instead.");
    const other = o.polarity === "negative" || o.mood === "question";
    const np = other ? (seed.thingOther ?? seed.thing) : seed.thing;
    core = {
      subject: { text: "there", role: "there", person: seed.plural ? "3p" : "3s" },
      main: { kind: "be" },
      after: [
        { text: np, role: "object" },
        { text: seed.tail, role: "place" },
      ],
      frame: "existence",
      allowDoSupportForMain: false,
    };
    notes.push(
      seed.plural
        ? "The verb agrees with the thing after it: plural → 'are / were'."
        : "The verb agrees with the thing after it: one thing → 'is / was'.",
    );
    if (other && seed.thingOther && seed.thingOther !== seed.thing)
      notes.push(`In negatives and questions we usually say '${seed.thingOther}' instead of '${seed.thing}'.`);
  } else if (seed.frame === "states") {
    if (o.voice === "passive") return fail("States (be + adjective/noun/place) have no object, so there is no passive.");
    if (o.aspect === "continuous" || o.aspect === "perfectContinuous")
      return fail("'Be' describes a state, so we normally use the simple form ('She is tired'). 'You are being rude' exists, but only for temporary behavior.");
    if (o.aspect === "perfect" && !seed.perfectTail)
      return fail("The perfect needs a time span to sound natural with this sentence (for example 'for ten years'). Try another sentence.");
    if (o.modal === "beAbleTo") return fail("'Be able to be…' is very awkward. Use 'can be' or 'might be' instead.");
    core = {
      subject: { ...seed.subject, role: "subject" },
      main: { kind: "be" },
      after: [{ text: seed.complement, role: "complement" }],
      frame: "states",
      allowDoSupportForMain: false,
    };
    if (o.aspect === "perfect" && seed.perfectTail) core.after.push({ text: seed.perfectTail, role: "time" });
  } else if (seed.frame === "possession") {
    if (o.voice === "passive") return fail("Possession 'have' is not used in the passive ('A car is had by me' is wrong).");
    if (o.aspect === "continuous" || o.aspect === "perfectContinuous")
      return fail("'Have' for possession is a state, so no continuous form: say 'I have a car', not 'I am having a car'. ('We are having lunch' is fine — there 'have' means eat.)");
    if (o.aspect === "perfect" && !seed.perfectTail)
      return fail("The perfect of possession needs a time span, e.g. 'I have had this car for five years'. Try another sentence.");
    const other = o.polarity === "negative" || o.mood === "question";
    core = {
      subject: { ...seed.subject, role: "subject" },
      main: { kind: "have", aux: false },
      after: [{ text: other ? (seed.objectOther ?? seed.object) : seed.object, role: "object" }],
      frame: "possession",
      allowDoSupportForMain: true,
    };
    if (o.aspect === "perfect" && seed.perfectTail) core.after.push({ text: seed.perfectTail, role: "time" });
    notes.push("Possession 'have' is a normal verb: questions and negatives use do / does / did.");
  } else {
    const verb = VERBS[seed.verb];
    if (!verb) return fail(`Unknown verb: ${seed.verb}`);
    if (o.voice === "passive") {
      if (!seed.passive)
        return fail(seed.noPassiveReason ?? "This sentence has no object that can naturally become the subject, so the passive isn't used.");
      if (o.aspect === "perfectContinuous")
        return fail("The perfect continuous passive ('has been being built') is almost never used. Try the perfect: 'has been built'.");
      if (o.aspect === "continuous" && (o.time === "future" || o.modal !== "none"))
        return fail("'Will be being built' is too heavy — English avoids it. Use the present or past continuous passive, or the future simple passive.");
      if (o.modal === "haveTo" || o.modal === "beAbleTo") {
        if (o.aspect !== "simple") return fail("Keep semi-modals in the simple form for the passive: 'It has to be done.'");
      }
      const ps = seed.passive;
      core = {
        subject: { ...ps.subject, role: "subject" },
        main: { kind: "verb", verb },
        after: [],
        frame: "passive",
        allowDoSupportForMain: false,
      };
      if (ps.tail) core.after.push({ text: ps.tail, role: "place" });
      if (ps.agent) core.after.push({ text: ps.agent, role: "other" });
      notes.push(
        ps.agent
          ? "The doer is added with 'by' because it's important here."
          : "The doer is left out — it's obvious or not important. That's the main reason to use the passive.",
      );
    } else {
      if (verb.stative && (o.aspect === "continuous" || o.aspect === "perfectContinuous"))
        return fail(`'${verb.base}' describes a state, not an action, so it isn't normally used in continuous forms. Say '${verb.base}' in the simple form instead.`);
      if (verb.momentary && o.aspect === "perfectContinuous")
        return fail(`'${verb.base}' happens in a moment, so 'have been ${verb.ing}' sounds odd. Use the perfect: 'have ${verb.pp}'.`);
      core = {
        subject: { ...seed.subject, role: "subject" },
        main: { kind: "verb", verb },
        after: [],
        frame: "actions",
        allowDoSupportForMain: true,
      };
      if (seed.object) core.after.push({ text: seed.object, role: "object" });
      if (seed.tail) core.after.push({ text: seed.tail, role: "place" });
    }
  }

  // ---- modal guards
  const m = o.modal;
  if (isPureModal(m)) {
    if (o.aspect === "continuous" && m === "can")
      return fail("'Can be + -ing' is unusual. Use 'can' + base verb ('I can work'), or 'could be working' for a guess.");
    if ((o.aspect === "perfect" || o.aspect === "perfectContinuous") && m === "can" && o.polarity === "positive")
      return fail("'Can have done' is only used in the negative ('She can't have finished'). For a positive guess use 'could have' or 'might have'.");
    if (o.aspect === "perfect" || o.aspect === "perfectContinuous")
      notes.push(`Modal + have + past participle looks back at the past: '${m} have…'.`);
    else notes.push("A modal never changes: no -s, no -ed, and the next verb is always in base form.");
    if (o.mood === "question" && (m === "must" || m === "might"))
      notes.push(`Questions with '${m}' are rare and formal. People usually ask with 'do I have to…?' or 'is it possible that…?'.`);
    if (o.mood === "question" && m === "may" && core.subject.person !== "1s" && core.subject.person !== "1p")
      notes.push("'May' questions are mostly used to ask permission: 'May I…?'.");
  }
  if (o.mood === "question" && o.polarity === "negative" && (m === "might" || m === "may" || m === "must"))
    return fail(`Negative questions with '${m}' sound very formal and unusual. Ask a positive question, or use 'Don't you have to…?' instead of 'mustn't'.`);
  if (m === "can" && (o.aspect === "perfect" || o.aspect === "perfectContinuous") && o.mood === "question")
    return fail("'Can' + have + past participle is only used in negative statements ('She can't have left'). For questions about the past, use 'Could she have left?'.");
  if (m === "beAbleTo" && (o.voice === "passive" || seed.frame === "possession"))
    return fail("'Be able to' is about someone's ability to do an action. It sounds wrong here — try 'can' or 'have to'.");
  if ((m === "haveTo" || m === "beAbleTo") && (o.aspect === "continuous" || o.aspect === "perfectContinuous"))
    return fail(`Keep '${m === "haveTo" ? "have to" : "be able to"}' in simple or perfect forms.`);
  if (m === "haveTo" && o.aspect === "perfect" && seed.frame !== "actions")
    return fail("This combination sounds unnatural. Try 'have to' in the simple form.");

  // ---- build lexeme chain: [operator-ish ...] main
  const chain: Lexeme[] = [];
  const tense: "present" | "past" = o.time === "past" ? "past" : "present";
  if (isPureModal(m)) {
    chain.push({ kind: "modal", word: m });
  } else {
    if (o.time === "future") chain.push({ kind: "modal", word: "will" });
    if (m === "haveTo") {
      // perfect goes before "have to": "I have had to work"
      if (o.aspect === "perfect") chain.push({ kind: "have", aux: true });
      chain.push({ kind: "have", aux: false }, { kind: "particle", word: "to", role: "modal" });
    } else if (m === "beAbleTo") {
      if (o.aspect === "perfect") chain.push({ kind: "have", aux: true });
      chain.push({ kind: "be" }, { kind: "particle", word: "able to", role: "modal" });
    }
  }
  const semi = m === "haveTo" || m === "beAbleTo";
  if (!semi) {
    if (o.aspect === "perfect" || o.aspect === "perfectContinuous") chain.push({ kind: "have", aux: true });
    if (o.aspect === "continuous" || o.aspect === "perfectContinuous") chain.push({ kind: "be" });
  }
  if (o.voice === "passive") chain.push({ kind: "be" });
  chain.push(core.main);

  // ---- assign forms
  const forms: { lx: Lexeme; text: string }[] = [];
  let need: FormNeeded = "finite";
  for (let i = 0; i < chain.length; i++) {
    const lx = chain[i];
    const text = formOf(lx, need, tense, core.subject.person);
    forms.push({ lx, text });
    // what does the next lexeme need?
    if (lx.kind === "particle") need = "base";
    else if (lx.kind === "modal") need = "base";
    else if (lx.kind === "have" && lx.aux) need = "pp";
    else if (lx.kind === "have" && !lx.aux && m === "haveTo" && chain[i + 1]?.kind === "particle") need = "base"; // "to" particle keeps its own text
    else if (lx.kind === "be") {
      const next = chain[i + 1];
      if (next?.kind === "particle") need = "base";
      else if (o.voice === "passive" && i === chain.length - 2) need = "pp";
      else need = "ing";
    }
  }

  // ---- operator & do-support
  const first = forms[0];
  const firstIsOperator =
    first.lx.kind === "modal" || first.lx.kind === "be" || (first.lx.kind === "have" && first.lx.aux);
  const needsOperator = o.polarity === "negative" || o.mood === "question";
  let operator: Token | null = null;
  let rest = forms.map((f, i) => ({
    text: f.text,
    role: roleOf(f.lx, i === forms.length - 1 && core.frame !== "passive"),
    aux: f.lx.kind === "have" ? f.lx.aux : f.lx.kind !== "verb",
  })) as Token[];

  if (needsOperator) {
    if (firstIsOperator) {
      operator = rest[0];
      rest = rest.slice(1);
    } else {
      const doForm = tense === "past" ? "did" : is3s(core.subject.person) ? "does" : "do";
      operator = { text: doForm, role: "aux", aux: true };
      // the first verb returns to base form
      const base = formOf(first.lx, "base", tense, core.subject.person);
      rest[0] = { ...rest[0], text: base };
      notes.push(
        `${o.mood === "question" ? "Questions" : "Negatives"} with a normal verb need '${doForm}'. It carries the ${tense} tense${doForm === "does" ? " and the -s" : ""}, so the verb goes back to base form: '${base}'.`,
      );
    }
  }

  // ---- notes on forms
  addFormNotes(notes, o, core, forms.map((f) => f.text));

  // ---- assemble
  const subjTok: Token = { text: core.subject.text, role: core.subject.role };
  let tokens: Token[] = [];
  const neg: Token = { text: "not", role: "negation" };
  if (o.mood === "question") {
    tokens.push(operator!, subjTok);
    if (o.polarity === "negative") tokens.push(neg);
    tokens.push(...rest, ...core.after);
  } else {
    tokens.push(subjTok);
    if (operator) tokens.push(operator);
    if (o.polarity === "negative") tokens.push(neg);
    tokens.push(...rest, ...core.after);
  }

  // "can not" is written as one word
  if (!o.contract && o.polarity === "negative" && o.mood === "statement") {
    const i = tokens.findIndex((t) => t.role === "modal" && t.text === "can");
    if (i >= 0 && tokens[i + 1]?.role === "negation") tokens.splice(i, 2, { text: "cannot", role: "modal", aux: true });
  }

  // negative questions use contractions ("Doesn't she…?")
  const contract = o.contract || (o.mood === "question" && o.polarity === "negative");
  if (o.mood === "question" && o.polarity === "negative")
    notes.push("Negative questions usually use a contraction ('Isn't it…?', 'Don't you…?'). They show surprise or check something you expect.");
  if (contract) tokens = contractTokens(tokens, o.mood === "question");

  tokens = tokens.filter((t) => t.text.length > 0);
  const sentence = render(tokens, o.mood === "question", core.subject.proper);
  const key = `${isPureModal(m) ? "present" : o.time}-${o.aspect}`;
  return { ok: true, tokens: capitalizeTokens(tokens, core.subject.proper), sentence, notes: dedupe(notes), timeHint: TIME_HINTS[key] };
}

function addFormNotes(notes: string[], o: Options, core: Core, words: string[]) {
  const p = core.subject.person;
  const sing = p === "3s";
  if (o.voice === "passive") {
    notes.push(`Passive = form of 'be' + past participle: '${words.slice(-2).join(" ")}'. The tense lives in 'be'.`);
    return;
  }
  if (o.modal === "haveTo") notes.push("'Have to' means the situation requires it. It changes like a normal verb: has to, had to, will have to.");
  if (o.modal === "beAbleTo") notes.push("'Be able to' works in every tense — useful where 'can' has no form (will be able to, have been able to).");
  if (isPureModal(o.modal)) return;
  if (o.aspect === "simple" && o.time === "present" && core.frame === "actions" && o.polarity === "positive" && o.mood === "statement")
    notes.push(sing ? "Present simple with he / she / it: the verb takes -s." : "Present simple: base form of the verb (no -s except he / she / it).");
  if (o.aspect === "simple" && o.time === "past" && core.main.kind === "verb" && o.polarity === "positive" && o.mood === "statement")
    notes.push(core.main.verb.regular ? "Regular verb: past simple = verb + -ed." : `Irregular verb: the past form must be learned (${core.main.verb.base} → ${core.main.verb.past}).`);
  if (o.time === "future" && o.aspect === "simple") notes.push("Future: will + base verb for every subject.");
  if (o.aspect === "continuous") notes.push("Continuous = be + verb-ing: the action is in progress at that time.");
  if (o.aspect === "perfect") notes.push("Perfect = have / has / had + past participle: connects an earlier event to a later time. Here 'have' is a helper, not possession.");
  if (o.aspect === "perfectContinuous") notes.push("Perfect continuous = have been + verb-ing: an activity that has lasted up to that time.");
}

/* ---------------- Contractions ---------------- */

const SUBJ_PRONOUNS = new Set(["i", "you", "he", "she", "it", "we", "they", "there"]);
const NOT_CONTRACT: Record<string, string> = {
  is: "isn't",
  are: "aren't",
  was: "wasn't",
  were: "weren't",
  do: "don't",
  does: "doesn't",
  did: "didn't",
  will: "won't",
  have: "haven't",
  has: "hasn't",
  had: "hadn't",
  can: "can't",
  could: "couldn't",
  should: "shouldn't",
  must: "mustn't",
  would: "wouldn't",
};

function contractTokens(tokens: Token[], question: boolean): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const next = tokens[i + 1];
    const lower = t.text.toLowerCase();
    // operator + not  (statements: subject op not; questions: op subject not)
    if (!question && next?.role === "negation" && t.aux !== false && NOT_CONTRACT[lower] && !(lower === "have" && t.role === "verb") && !(lower === "has" && t.role === "verb")) {
      out.push({ ...t, text: NOT_CONTRACT[lower] });
      i++;
      continue;
    }
    if (question && i === 0 && tokens[2]?.role === "negation" && NOT_CONTRACT[lower]) {
      out.push({ ...t, text: NOT_CONTRACT[lower] });
      out.push(tokens[1]);
      i += 2;
      continue;
    }
    // subject pronoun + am/is/are/have/has/will/had/would (statements only)
    if (!question && SUBJ_PRONOUNS.has(lower) && (t.role === "subject" || t.role === "there") && next) {
      const n = next.text.toLowerCase();
      const after = tokens[i + 2];
      const negFollows = after?.role === "negation";
      const auxOk = next.aux !== false && next.role !== "verb";
      let suffix: string | null = null;
      if (n === "am") suffix = "'m";
      else if (n === "are" && !negFollows && lower !== "there") suffix = "'re";
      else if (n === "is" && !negFollows) suffix = "'s";
      else if (n === "will" && !negFollows && lower !== "there") suffix = "'ll";
      else if (auxOk && (n === "have") && !negFollows && lower !== "there") suffix = "'ve";
      else if (auxOk && n === "has" && !negFollows) suffix = "'s";
      else if (n === "would" && !negFollows) suffix = "'d";
      if (suffix) {
        out.push({ ...t, text: t.text + suffix });
        i++;
        continue;
      }
    }
    out.push(t);
  }
  return out;
}

/* ---------------- Rendering ---------------- */

function capitalizeTokens(tokens: Token[], proper?: boolean): Token[] {
  return tokens.map((t, i) => {
    if (i === 0) return { ...t, text: t.text.charAt(0).toUpperCase() + t.text.slice(1) };
    if (t.role === "subject" && !proper && !/^I(\b|')/.test(t.text)) return { ...t, text: lowerFirst(t.text) };
    return t;
  });
}

function lowerFirst(s: string) {
  // keep "I" and proper nouns (caller marks proper)
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function render(tokens: Token[], question: boolean, proper?: boolean): string {
  const caps = capitalizeTokens(tokens, proper);
  return caps.map((t) => t.text).join(" ").replace(/\s+/g, " ").trim() + (question ? "?" : ".");
}

function fail(reason: string): BuildFail {
  return { ok: false, reason };
}

function dedupe(a: string[]) {
  return [...new Set(a)];
}

/** Which controls make sense for a seed (used by the Lab UI). */
export function availableControls(seed: Seed) {
  return {
    passive: seed.frame === "actions" ? Boolean(seed.passive) : false,
    perfect:
      seed.frame === "actions" || seed.frame === "existence" ? true : Boolean((seed as StateSeed | PossessionSeed).perfectTail),
    continuous: seed.frame === "actions",
  };
}
