import type { Lesson } from "../types";

const day08: Lesson = {
  day: 8,
  stage: "foundation",
  frame: "modals",
  title: "Can, could, be able to",
  objective: "Talk about ability in the present, past and future.",
  builds_on: "Frame 4 adds a modal in front of a base verb. You already know base verbs from do / did / will — modals work the same way.",
  outcome: "Describe your skills in a job conversation.",
  minutes: 25,
  explanation: [
    "**Frame 4: modals** = subject + **modal** + **base verb**. A modal adds meaning: ability, permission, advice, obligation, possibility.",
    "Modals never change: no -s, no -ed, no do / does. She **can** swim (not cans, not can to swim). Negative: **cannot / can't**. Question: **Can** you swim?",
    "**Can** = ability now. **Could** = general ability in the past: When I was five, I **could** read.",
    "Can has no future or perfect form, so we use **be able to**: I **will be able to** drive next year. I **have been able to** relax this week.",
    "For one specific success in the past, use **was / were able to** (or managed to): The exam was hard, but I **was able to** finish it.",
  ],
  patterns: [
    {
      name: "Modal",
      slots: [
        { label: "Subject", role: "subject", text: "She" },
        { label: "can / could", role: "modal", text: "can" },
        { label: "base verb", role: "verb", text: "speak" },
        { label: "rest", role: "object", text: "three languages" },
      ],
    },
    {
      name: "Be able to",
      slots: [
        { label: "Subject", role: "subject", text: "I" },
        { label: "be (any time)", role: "aux", text: "will be" },
        { label: "able to", role: "modal", text: "able to" },
        { label: "base verb", role: "verb", text: "help" },
      ],
    },
    {
      name: "Question",
      slots: [
        { label: "Can / Could", role: "modal", text: "Can" },
        { label: "Subject", role: "subject", text: "you" },
        { label: "base verb", role: "verb", text: "drive?" },
      ],
    },
  ],
  examples: [
    { en: "I can swim, but I can't dive.", note: "**Can't** = cannot." },
    { en: "She can speak Arabic and Turkish.", note: "No -s on can, no -s on speak." },
    { en: "When I was a child, I could climb trees easily.", note: "General past ability → **could**." },
    { en: "Could you help me with this bag?", note: "**Could you…?** is a polite request." },
    { en: "I'll be able to send it tomorrow.", note: "Future ability → **will be able to**." },
    { en: "The road was closed, but we were able to find another way.", note: "One specific past success → **were able to**." },
    { en: "Sorry, I couldn't hear you.", note: "Past negative → **couldn't**." },
    { en: "Are you able to work on weekends?", note: "Formal question, common in job interviews." },
  ],
  forms: [
    { label: "Present", positive: "He can cook.", negative: "He can't cook.", question: "Can he cook?", shortAnswers: "Yes, he can. / No, he can't." },
    { label: "Past", positive: "I could ski at ten.", negative: "I couldn't ski at ten.", question: "Could you ski at ten?", shortAnswers: "Yes, I could. / No, I couldn't." },
    { label: "Future", positive: "We'll be able to come.", negative: "We won't be able to come.", question: "Will you be able to come?", shortAnswers: "Yes, we will. / No, we won't." },
  ],
  mistakes: [
    { wrong: "She cans play the piano.", right: "She can play the piano.", why: "Modals never take -s." },
    { wrong: "I can to speak English.", right: "I can speak English.", why: "No **to** after can." },
    { wrong: "Do you can help me?", right: "Can you help me?", why: "Modals make their own questions — no do." },
    { wrong: "I will can come tomorrow.", right: "I will be able to come tomorrow.", why: "Two modals can't go together. Use **will be able to**." },
    { wrong: "He can speaks German.", right: "He can speak German.", why: "After a modal → base verb." },
  ],
  guided: {
    goal: "Build: Will you be able to come on Friday?",
    steps: [
      { label: "Future helper", role: "aux", options: ["Can", "Will", "Do"], answer: 1, why: "Future question → **Will**." },
      { label: "Subject", role: "subject", options: ["you", "your", "you can"], answer: 0, why: "Subject after the helper." },
      { label: "Ability in the future", role: "modal", options: ["can", "be able to", "able"], answer: 1, why: "After will, use **be able to** (will can is wrong)." },
      { label: "Verb", role: "verb", options: ["come", "coming", "to come"], answer: 0, why: "Base verb after able to." },
      { label: "Time", role: "time", options: ["on Friday?", "in Friday?", "at Friday?"], answer: 0, why: "Days take **on**." },
    ],
    result: "Will you be able to come on Friday?",
  },
  practice: [
    { id: "d08-p01", type: "choice", prompt: "Choose the correct sentence.", options: ["My son cans read.", "My son can read.", "My son can reads."], answer: 1, explanation: "Can + base verb, no -s.", frame: "modals", skill: "form" },
    { id: "d08-p02", type: "fill", prompt: "Complete with can, can't, could or couldn't.", sentence: "It was so dark that I ___ see anything.", accept: ["couldn't", "could not"], traps: [{ text: "can't", feedback: "The story is in the past → couldn't." }], explanation: "Past negative ability → **couldn't**.", frame: "modals", skill: "tense" },
    { id: "d08-p03", type: "fill", prompt: "Complete with the future form.", sentence: "After the course, you ___ write a short email in English.", accept: ["will be able to", "'ll be able to"], traps: [{ text: "will can", feedback: "Two modals can't go together: will be able to." }], explanation: "Future ability → **will be able to**.", frame: "modals", skill: "tense" },
    { id: "d08-p04", type: "transform", prompt: "Make it a question.", source: "You can play the guitar.", instruction: "Ask about it.", accept: ["Can you play the guitar?"], traps: [{ text: "Do you can play the guitar?", feedback: "Modals don't use do: Can you…?" }], explanation: "**Can** + subject + base verb?", frame: "modals", skill: "questions" },
    { id: "d08-p05", type: "transform", prompt: "Make it negative.", source: "We could find a parking space.", instruction: "Use not.", accept: ["We couldn't find a parking space.", "We could not find a parking space."], explanation: "**couldn't** + base verb.", frame: "modals", skill: "negatives" },
    { id: "d08-p06", type: "order", prompt: "Make a polite request.", tiles: ["Could", "you", "open", "the", "window,", "please?"], explanation: "**Could you** + base verb… = polite request.", frame: "modals", skill: "questions" },
    { id: "d08-p07", type: "correct", prompt: "Fix the mistake.", wrong: "I can to drive a truck.", accept: ["I can drive a truck."], explanation: "No **to** after can.", frame: "modals", skill: "form" },
    { id: "d08-p08", type: "correct", prompt: "Fix the mistake.", wrong: "Next year I will can speak Spanish.", accept: ["Next year I will be able to speak Spanish.", "Next year I'll be able to speak Spanish."], explanation: "will can → **will be able to**.", frame: "modals", skill: "tense" },
    { id: "d08-p09", type: "listen", prompt: "Listen and type.", audioText: "I can't come tonight, but I can come tomorrow.", accept: ["I can't come tonight, but I can come tomorrow.", "I cannot come tonight, but I can come tomorrow."], explanation: "Can is usually weak ('kn'); can't is strong and long ('kahnt / kænt').", frame: "modals", skill: "listening" },
    { id: "d08-p10", type: "speak", prompt: "Describe your skills.", target: "I can speak three languages, and I'm able to work under pressure.", explanation: "Useful sentence for interviews.", frame: "modals", skill: "speaking" },
    { id: "d08-p11", type: "translate", from: "az", prompt: "Translate into English.", source: "Uşaq olanda mən üzə bilirdim.", accept: ["When I was a child, I could swim.", "When I was a child I could swim.", "I could swim when I was a child."], explanation: "General past ability → **could**.", frame: "modals", skill: "writing" },
  ],
  vocabulary: [
    { term: "be good at", meaning: "have a skill", example: "She's good at math." },
    { term: "fluent", meaning: "able to speak a language easily", example: "He's fluent in Russian." },
    { term: "Could you…?", meaning: "polite request", example: "Could you repeat that, please?" },
    { term: "manage to", meaning: "succeed in doing something difficult", example: "We managed to catch the last train." },
    { term: "work under pressure", meaning: "work well when it's stressful", example: "I can work under pressure." },
    { term: "I can't hear you.", meaning: "the sound is too quiet or bad", example: "Sorry, I can't hear you. Can you speak louder?" },
  ],
  dialogue: {
    title: "A shop assistant job",
    setting: "Daria is applying for a job in a sports shop.",
    lines: [
      { speaker: "Manager", line: "So, Daria, can you tell me about your skills?" },
      { speaker: "Daria", line: "Sure. I can speak English and Polish, and I can use most cash systems." },
      { speaker: "Manager", line: "Great. Can you work on Saturdays?" },
      { speaker: "Daria", line: "Yes, I can. But I can't work on Sunday mornings — I have classes." },
      { speaker: "Manager", line: "That's fine. Will you be able to start next month?" },
      { speaker: "Daria", line: "Yes. My course ends in two weeks, so I'll be able to start on the first." },
    ],
    focus: ["can you tell me", "I can speak", "Yes, I can.", "I can't work", "Will you be able to start"],
  },
  review: [
    { id: "d08-r01", type: "choice", prompt: "Which sentence is about future ability?", options: ["I could drive.", "I'll be able to drive.", "I can drive."], answer: 1, explanation: "**will be able to** = future.", frame: "modals", skill: "tense" },
    { id: "d08-r02", type: "fill", prompt: "Complete.", sentence: "___ you speak more slowly, please?", accept: ["Could", "Can"], explanation: "Requests: **Could** (more polite) or **Can**.", frame: "modals", skill: "questions" },
    { id: "d08-r03", type: "transform", prompt: "Put it in the past.", source: "I can't sleep because of the noise.", instruction: "Use last night.", accept: ["I couldn't sleep because of the noise last night.", "Last night I couldn't sleep because of the noise.", "Last night, I couldn't sleep because of the noise."], explanation: "can't → **couldn't**.", frame: "modals", skill: "tense" },
    { id: "d08-r04", type: "order", prompt: "Put the words in order.", tiles: ["She", "can", "play", "the", "violin."], explanation: "Subject + **can** + base verb.", frame: "modals", skill: "word-order" },
    { id: "d08-r05", type: "correct", prompt: "Fix the mistake.", wrong: "Do you can swim?", accept: ["Can you swim?"], explanation: "Modals don't use do.", frame: "modals", skill: "questions" },
  ],
  labSeeds: ["ac-swim", "ac-fix"],
};

export default day08;
