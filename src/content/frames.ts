import type { FrameId, Slot } from "./types";

export type FrameInfo = {
  id: FrameId;
  number: number;
  name: string; // "Existence"
  pattern: string; // "There is / There are"
  question: string; // what this frame answers
  example: string;
  slots: Slot[];
  className: string; // color scope
};

export const FRAMES: FrameInfo[] = [
  {
    id: "existence",
    number: 1,
    name: "Existence",
    pattern: "There is / There are",
    question: "What exists, and where?",
    example: "There are three people outside.",
    slots: [
      { label: "There", role: "there", text: "There" },
      { label: "be", role: "be", text: "are" },
      { label: "thing", role: "object", text: "three people" },
      { label: "place / time", role: "place", text: "outside" },
    ],
    className: "frame-existence",
  },
  {
    id: "states",
    number: 2,
    name: "States",
    pattern: "Subject + be",
    question: "What is someone or something like?",
    example: "She was tired.",
    slots: [
      { label: "Subject", role: "subject", text: "She" },
      { label: "be", role: "be", text: "was" },
      { label: "adjective / noun / place", role: "complement", text: "tired" },
    ],
    className: "frame-states",
  },
  {
    id: "actions",
    number: 3,
    name: "Actions",
    pattern: "Subject + verb",
    question: "What does someone do or what happens?",
    example: "I have finished the report.",
    slots: [
      { label: "Subject", role: "subject", text: "I" },
      { label: "verb (+ helpers)", role: "verb", text: "have finished" },
      { label: "object", role: "object", text: "the report", optional: true },
    ],
    className: "frame-actions",
  },
  {
    id: "modals",
    number: 4,
    name: "Modals",
    pattern: "Subject + modal + base verb",
    question: "Can, should, must, might someone do it?",
    example: "You should leave now.",
    slots: [
      { label: "Subject", role: "subject", text: "You" },
      { label: "modal", role: "modal", text: "should" },
      { label: "base verb", role: "verb", text: "leave" },
      { label: "rest", role: "time", text: "now", optional: true },
    ],
    className: "frame-modals",
  },
  {
    id: "possession",
    number: 5,
    name: "Possession",
    pattern: "Subject + have / has",
    question: "Who has what?",
    example: "She has two brothers.",
    slots: [
      { label: "Subject", role: "subject", text: "She" },
      { label: "have / has", role: "verb", text: "has" },
      { label: "thing", role: "object", text: "two brothers" },
    ],
    className: "frame-possession",
  },
  {
    id: "passive",
    number: 6,
    name: "Passive",
    pattern: "Object + be + past participle",
    question: "What happens to something?",
    example: "The house was built in 1990.",
    slots: [
      { label: "Thing", role: "subject", text: "The house" },
      { label: "be", role: "be", text: "was" },
      { label: "past participle", role: "verb", text: "built" },
      { label: "time / by…", role: "time", text: "in 1990", optional: true },
    ],
    className: "frame-passive",
  },
];

export const frameById = (id: FrameId) => FRAMES.find((f) => f.id === id)!;
export const frameClass = (id?: FrameId) => (id ? frameById(id).className : "frame-none");
