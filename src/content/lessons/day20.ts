import type { Lesson } from "../types";

const day20: Lesson = {
  day: 20,
  stage: "combination",
  frame: "passive",
  title: "It has been done",
  objective: "Combine passive with perfect, continuous and modal forms.",
  builds_on: "Day 11's passive (be + V3) now combines with every helper you've learned: have been (Day 15), is being (Day 7), must be (Day 9). Section 29 of your notes.",
  outcome: "Give clear updates at work.",
  minutes: 25,
  explanation: [
    "The passive always ends with **be in some form + past participle**. Whatever helper comes first decides the form of be.",
    "Perfect passive: **has / have been + V3** — The report **has been sent**. (Active: Someone has sent the report.)",
    "Continuous passive: **is / are / was being + V3** — The road **is being repaired** (right now).",
    "Modal passive: **modal + be + V3** — This form **must be signed**. The meeting **could be moved**. Past: **should have been + V3** — It **should have been checked**.",
    "Workplace updates love these forms because the task is the topic: The invoices **have been paid**. The office **is being cleaned**. The results **will be published** on Monday.",
  ],
  patterns: [
    {
      name: "Perfect passive",
      slots: [
        { label: "Thing", role: "subject", text: "The report" },
        { label: "has / have been", role: "aux", text: "has been" },
        { label: "V3", role: "verb", text: "sent" },
      ],
    },
    {
      name: "Continuous passive",
      slots: [
        { label: "Thing", role: "subject", text: "The road" },
        { label: "is / are being", role: "aux", text: "is being" },
        { label: "V3", role: "verb", text: "repaired" },
      ],
    },
    {
      name: "Modal passive",
      slots: [
        { label: "Thing", role: "subject", text: "The form" },
        { label: "modal + be", role: "modal", text: "must be" },
        { label: "V3", role: "verb", text: "signed" },
      ],
    },
  ],
  examples: [
    { en: "The tickets have been booked.", note: "Perfect passive: done, and the result matters now." },
    { en: "Has the client been told?", note: "Question: **Has** + thing + **been** + V3?" },
    { en: "Your order is being prepared.", note: "Happening now → **is being** + V3." },
    { en: "The building was being renovated when we visited.", note: "In progress in the past → **was being**." },
    { en: "All forms must be completed in English.", note: "Rule → **must be** + V3." },
    { en: "The meeting might be postponed.", note: "Possibility → **might be** + V3." },
    { en: "This should have been checked before.", note: "Past regret, passive → **should have been** + V3." },
    { en: "The results will have been published by Friday.", note: "Future perfect passive — rare, but useful in formal plans.", register: "formal" },
  ],
  forms: [
    { label: "Perfect passive", positive: "It has been fixed.", negative: "It hasn't been fixed yet.", question: "Has it been fixed?" },
    { label: "Continuous passive", positive: "They're being checked.", negative: "They aren't being checked.", question: "Are they being checked?" },
    { label: "Modal passive", positive: "It can be done.", negative: "It can't be done.", question: "Can it be done today?" },
  ],
  mistakes: [
    { wrong: "The email has sent.", right: "The email has been sent.", why: "The email didn't send anything. Passive needs **been**." },
    { wrong: "The house is repairing.", right: "The house is being repaired.", why: "Continuous passive: **being** + V3." },
    { wrong: "The form must signed.", right: "The form must be signed.", why: "Modal passive: modal + **be** + V3." },
    { wrong: "It should have been check.", right: "It should have been checked.", why: "End with the **V3**." },
    { wrong: "The problem has been solve by our team.", right: "The problem has been solved by our team.", why: "V3 of solve = **solved**." },
  ],
  guided: {
    goal: "Build: The new office is being painted this week.",
    steps: [
      { label: "Thing", role: "subject", options: ["The new office", "They", "Painters"], answer: 0, why: "Passive → start with the thing." },
      { label: "Continuous passive helper", role: "aux", options: ["is being", "is been", "has being"], answer: 0, why: "In progress → **is being**." },
      { label: "V3", role: "verb", options: ["painting", "painted", "paint"], answer: 1, why: "Passive ends with **V3**." },
      { label: "Time", role: "time", options: ["this week.", "in this week.", "at this week."], answer: 0, why: "**this week** (no preposition)." },
    ],
    result: "The new office is being painted this week.",
  },
  practice: [
    { id: "d20-p01", type: "choice", prompt: "Choose the correct update.", options: ["The invoices have paid.", "The invoices have been paid.", "The invoices have being paid."], answer: 1, explanation: "Perfect passive: **have been** + V3.", frame: "passive", skill: "form" },
    { id: "d20-p02", type: "choice", prompt: "Workers are fixing the elevator now. In passive:", options: ["The elevator is fixed.", "The elevator is being fixed.", "The elevator has fixed."], answer: 1, explanation: "Now, in progress → **is being** fixed.", frame: "passive", skill: "tense" },
    { id: "d20-p03", type: "fill", prompt: "Complete with the modal passive.", sentence: "Passports ___ shown at the gate. (must / show)", accept: ["must be"], traps: [{ text: "must", feedback: "Modal passive needs be: must be shown." }], explanation: "**must be** + V3.", frame: "passive", skill: "form" },
    { id: "d20-p04", type: "transform", prompt: "Make it passive.", source: "Someone has stolen my bike.", instruction: "Start with: My bike", accept: ["My bike has been stolen."], explanation: "**has been** + stolen.", frame: "passive", skill: "form" },
    { id: "d20-p05", type: "transform", prompt: "Make it passive.", source: "They are building a new airport.", instruction: "Start with: A new airport", accept: ["A new airport is being built."], explanation: "**is being** + built.", frame: "passive", skill: "form" },
    { id: "d20-p06", type: "transform", prompt: "Make it a question.", source: "The contract has been signed.", instruction: "Ask about it.", accept: ["Has the contract been signed?"], explanation: "**Has** + thing + **been** + V3?", frame: "passive", skill: "questions" },
    { id: "d20-p07", type: "order", prompt: "Put the words in order.", tiles: ["This", "should", "have", "been", "done", "yesterday."], explanation: "**should have been** + V3.", frame: "passive", skill: "word-order" },
    { id: "d20-p08", type: "correct", prompt: "Fix the mistake.", wrong: "Your table is preparing now.", accept: ["Your table is being prepared now."], explanation: "**is being** prepared.", frame: "passive", skill: "form" },
    { id: "d20-p09", type: "correct", prompt: "Fix the mistake.", wrong: "The documents have sent to the bank.", accept: ["The documents have been sent to the bank."], explanation: "Add **been**.", frame: "passive", skill: "form" },
    { id: "d20-p10", type: "listen", prompt: "Listen and type.", audioText: "The problem has been fixed, and the system is being tested now.", accept: ["The problem has been fixed, and the system is being tested now.", "The problem has been fixed and the system is being tested now."], explanation: "Two passive forms in one update.", frame: "passive", skill: "listening" },
    { id: "d20-p11", type: "speak", prompt: "Give a work update.", target: "The slides have been finished, and the report will be sent tomorrow.", explanation: "Perfect passive + future passive.", frame: "passive", skill: "speaking" },
  ],
  vocabulary: [
    { term: "on track", meaning: "progressing as planned", example: "The project is on track." },
    { term: "behind schedule", meaning: "later than planned", example: "We're a week behind schedule." },
    { term: "postpone", meaning: "move to a later time", example: "The meeting has been postponed." },
    { term: "approve", meaning: "officially agree to", example: "The budget has been approved." },
    { term: "copy someone in", meaning: "add someone to an email (cc)", example: "Can you copy me in?" },
    { term: "follow up", meaning: "check or continue later", example: "I'll follow up on Friday." },
  ],
  dialogue: {
    title: "Project update",
    setting: "A project manager checks progress with her team.",
    lines: [
      { speaker: "Manager", line: "Where are we with the new app?" },
      { speaker: "Developer", line: "The login screen has been finished, and the payment page is being tested now." },
      { speaker: "Manager", line: "Has the design been approved by the client?" },
      { speaker: "Designer", line: "Not yet. It should have been approved last week, but they asked for changes." },
      { speaker: "Manager", line: "OK. The launch might be postponed, then." },
      { speaker: "Developer", line: "Maybe not — everything else can be done by Friday." },
    ],
    focus: ["has been finished", "is being tested", "Has the design been approved", "should have been approved", "might be postponed", "can be done"],
  },
  review: [
    { id: "d20-r01", type: "choice", prompt: "Choose the correct sentence.", options: ["The road is repairing.", "The road is being repaired.", "The road is been repaired."], answer: 1, explanation: "**is being** + V3.", frame: "passive", skill: "form" },
    { id: "d20-r02", type: "fill", prompt: "Complete (perfect passive, cancel).", sentence: "Our flight ___.", accept: ["has been cancelled", "has been canceled", "'s been cancelled", "'s been canceled"], explanation: "**has been** cancelled.", frame: "passive", skill: "form" },
    { id: "d20-r03", type: "transform", prompt: "Make it passive.", source: "You can pay the bill online.", instruction: "Start with: The bill", accept: ["The bill can be paid online."], explanation: "**can be** + paid.", frame: "passive", skill: "form" },
    { id: "d20-r04", type: "order", prompt: "Put the words in order.", tiles: ["The", "results", "will", "be", "announced", "tomorrow."], explanation: "**will be** + V3.", frame: "passive", skill: "word-order" },
    { id: "d20-r05", type: "correct", prompt: "Fix the mistake.", wrong: "This form must signed by a manager.", accept: ["This form must be signed by a manager."], explanation: "**must be** signed.", frame: "passive", skill: "form" },
  ],
  labSeeds: ["ac-send", "ac-build"],
};

export default day20;
