import type { FrameId } from "@/content/types";
import type { Seed, Subject } from "./build";

const I: Subject = { text: "I", person: "1s" };
const you: Subject = { text: "you", person: "2" };
const she: Subject = { text: "she", person: "3s" };
const he: Subject = { text: "he", person: "3s" };
const it: Subject = { text: "it", person: "3s" };
const we: Subject = { text: "we", person: "1p" };
const they: Subject = { text: "they", person: "3p" };

/** Curated seeds for the Sentence Lab. Every combination is covered by tests. */
export const SEEDS: Seed[] = [
  /* ---- Frame 1: existence ---- */
  { frame: "existence", id: "ex-cafe", thing: "a café", plural: false, tail: "near my office" },
  { frame: "existence", id: "ex-people", thing: "three people", thingOther: "any people", plural: true, tail: "outside" },
  { frame: "existence", id: "ex-problem", thing: "a problem", plural: false, tail: "with the plan" },
  { frame: "existence", id: "ex-traffic", thing: "a lot of traffic", thingOther: "much traffic", plural: false, tail: "on the bridge" },
  { frame: "existence", id: "ex-reason", thing: "a good reason", plural: false, tail: "to stay" },
  { frame: "existence", id: "ex-chairs", thing: "some free chairs", thingOther: "any free chairs", plural: true, tail: "in the room" },

  /* ---- Frame 2: states ---- */
  { frame: "states", id: "st-ready", subject: I, complement: "ready" },
  { frame: "states", id: "st-doctor", subject: she, complement: "a doctor", perfectTail: "for ten years" },
  { frame: "states", id: "st-home", subject: they, complement: "at home" },
  { frame: "states", id: "st-tired", subject: we, complement: "tired" },
  { frame: "states", id: "st-phone", subject: { text: "my phone", person: "3s" }, complement: "on the table" },
  { frame: "states", id: "st-tofig", subject: { text: "Tofig", person: "3s", proper: true }, complement: "in London", perfectTail: "since March" },
  { frame: "states", id: "st-right", subject: you, complement: "right" },
  { frame: "states", id: "st-friends", subject: they, complement: "friends", perfectTail: "since school" },

  /* ---- Frame 3: actions ---- */
  { frame: "actions", id: "ac-work", subject: I, verb: "work", tail: "at a bank", noPassiveReason: "'Work' here has no object, so there's nothing to become the subject of a passive." },
  {
    frame: "actions", id: "ac-speak", subject: she, verb: "speak", object: "English",
    passive: { subject: { text: "English", person: "3s", proper: true }, tail: "here" },
  },
  {
    frame: "actions", id: "ac-fix", subject: { text: "my brother", person: "3s" }, verb: "fix", object: "cars",
    passive: { subject: { text: "cars", person: "3p" }, tail: "in his garage", agent: "by my brother" },
  },
  {
    frame: "actions", id: "ac-build", subject: they, verb: "build", object: "houses", tail: "in this area",
    passive: { subject: { text: "houses", person: "3p" }, tail: "in this area" },
  },
  {
    frame: "actions", id: "ac-clean", subject: we, verb: "clean", object: "the office", tail: "every Friday",
    passive: { subject: { text: "the office", person: "3s" }, tail: "every Friday" },
  },
  {
    frame: "actions", id: "ac-write", subject: { text: "Tofig", person: "3s", proper: true }, verb: "write", object: "a letter",
    passive: { subject: { text: "a letter", person: "3s" }, agent: "by Tofig" },
  },
  { frame: "actions", id: "ac-know", subject: I, verb: "know", object: "the answer", noPassiveReason: "'The answer is known by me' is grammatical but nobody says it — the passive sounds unnatural here." },
  { frame: "actions", id: "ac-like", subject: she, verb: "like", object: "coffee", noPassiveReason: "'Coffee is liked by her' is unnatural. Passive with 'like' is rare." },
  { frame: "actions", id: "ac-play", subject: they, verb: "play", object: "football", tail: "after school", noPassiveReason: "'Football is played by them' is grammatical but odd — we only say 'Football is played in 200 countries' when the doer is unimportant." },
  { frame: "actions", id: "ac-wait", subject: we, verb: "wait", tail: "for the bus", noPassiveReason: "'Wait for' has no direct object here, so no natural passive." },
  { frame: "actions", id: "ac-rain", subject: it, verb: "rain", noPassiveReason: "Weather verbs have no object, so there is no passive." },
  {
    frame: "actions", id: "ac-send", subject: { text: "the company", person: "3s" }, verb: "send", object: "the reports", tail: "every Monday",
    passive: { subject: { text: "the reports", person: "3p" }, tail: "every Monday" },
  },
  {
    frame: "actions", id: "ac-finish", subject: he, verb: "finish", object: "the project",
    passive: { subject: { text: "the project", person: "3s" } },
  },
  {
    frame: "actions", id: "ac-steal", subject: { text: "someone", person: "3s" }, verb: "steal", object: "my bike",
    passive: { subject: { text: "my bike", person: "3s" } },
  },
  { frame: "actions", id: "ac-learn", subject: you, verb: "learn", object: "English", tail: "online", noPassiveReason: "'English is learned online by you' is unnatural — keep the learner as the subject." },
  {
    frame: "actions", id: "ac-make", subject: { text: "the factory", person: "3s" }, verb: "make", object: "phones",
    passive: { subject: { text: "phones", person: "3p" }, tail: "in this factory" },
  },
  { frame: "actions", id: "ac-swim", subject: { text: "Aylin", person: "3s", proper: true }, verb: "swim", tail: "every morning", noPassiveReason: "'Swim' has no object here, so there is no passive." },
  { frame: "actions", id: "ac-travel", subject: they, verb: "travel", tail: "a lot", noPassiveReason: "'Travel' has no object here, so there is no passive." },

  /* ---- Frame 5: possession ---- */
  { frame: "possession", id: "po-car", subject: I, object: "a car", perfectTail: "for five years" },
  { frame: "possession", id: "po-brothers", subject: she, object: "two brothers", objectOther: "any brothers" },
  { frame: "possession", id: "po-time", subject: you, object: "some time", objectOther: "any time" },
  { frame: "possession", id: "po-house", subject: they, object: "a big house", perfectTail: "since 2015" },
  { frame: "possession", id: "po-camera", subject: { text: "this phone", person: "3s" }, object: "a good camera" },
  { frame: "possession", id: "po-money", subject: we, object: "enough money", objectOther: "enough money" },
];

export const seedById = (id: string) => SEEDS.find((s) => s.id === id);

/** Which seeds each frame tab shows in the Lab. Modals and passive reuse action seeds. */
export function seedsForFrame(frame: FrameId): Seed[] {
  switch (frame) {
    case "existence":
    case "states":
    case "actions":
    case "possession":
      return SEEDS.filter((s) => s.frame === frame);
    case "modals":
      return SEEDS.filter((s) => s.frame === "actions" || s.frame === "states");
    case "passive":
      return SEEDS.filter((s) => s.frame === "actions" && s.passive);
  }
}

export function seedLabel(seed: Seed): string {
  switch (seed.frame) {
    case "existence":
      return `There is/are ${seed.thing} ${seed.tail}`;
    case "states":
      return `${cap(seed.subject.text)} + be + ${seed.complement}`;
    case "possession":
      return `${cap(seed.subject.text)} + have + ${seed.object}`;
    case "actions":
      return [cap(seed.subject.text), seed.verb, seed.object, seed.tail].filter(Boolean).join(" ");
  }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
