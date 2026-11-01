import type { Lesson } from "../types";

const day25: Lesson = {
  day: 25,
  stage: "communication",
  title: "If you come, I'll go",
  objective: "Use first and second conditionals, what if, and my dream is to.",
  builds_on: "Conditionals join two frames with if: a condition and a result. You already know every tense you need. Sections 18–19 of your notes.",
  outcome: "Talk about plans, hypotheses and dreams.",
  minutes: 25,
  explanation: [
    "**First conditional** — a real possibility: **If + present, will + verb**. **If** you **come**, I**'ll go**. (Not: if you will come.)",
    "**Second conditional** — imaginary or unlikely: **If + past, would + verb**. **If** you **came**, I **would go**. **If** I **had** more money, I **would travel**. The past here doesn't mean past time — it means 'not real'.",
    "With be in the second conditional, **were** is used for all persons in careful English: If I **were** you, I'd accept. (If I was… is common in speech.)",
    "The if-clause can go first or second. When it's first, use a comma: If it rains, we'll stay home. / We'll stay home if it rains.",
    "**What if** + past + would = an imaginary question: **What if** I **told** you I **was** a teacher? What **would** you **do**? **My dream is to** + verb: My dream is **to understand** you. My dream is **to be able to** understand you.",
  ],
  patterns: [
    {
      name: "First conditional (real)",
      slots: [
        { label: "If", role: "connector", text: "If" },
        { label: "present", role: "verb", text: "you come," },
        { label: "will + verb", role: "aux", text: "I'll go" },
      ],
    },
    {
      name: "Second conditional (imaginary)",
      slots: [
        { label: "If", role: "connector", text: "If" },
        { label: "past", role: "verb", text: "I had time," },
        { label: "would + verb", role: "modal", text: "I would learn" },
        { label: "object", role: "object", text: "Japanese" },
      ],
    },
  ],
  examples: [
    { en: "If you come, I'll go.", note: "Real possibility (original notes)." },
    { en: "If you came, I would go.", note: "Imaginary (original notes)." },
    { en: "If it rains tomorrow, we'll stay at home.", note: "If + **present** (not will rain)." },
    { en: "If I won the lottery, I'd buy a house by the sea.", note: "Unlikely → **past + would**." },
    { en: "If I were you, I'd talk to her.", note: "Advice: **If I were you**." },
    { en: "What if I told you I was a teacher? What would you do?", note: "Original notes, corrected: **was a** teacher." },
    { en: "My dream is to understand you.", note: "**dream is to** + verb (original notes)." },
    { en: "My dream is to be able to understand you.", note: "**to be able to** + verb (Day 8 + original notes)." },
  ],
  forms: [
    { label: "First conditional", positive: "If you call, I'll answer.", negative: "If you don't call, I won't answer.", question: "What will you do if he calls?" },
    { label: "Second conditional", positive: "If I knew, I'd tell you.", negative: "If I didn't have to work, I'd come.", question: "What would you do if you were rich?" },
  ],
  mistakes: [
    { wrong: "If it will rain, we will stay home.", right: "If it rains, we will stay home.", why: "No **will** after if (first conditional)." },
    { wrong: "If I would have money, I would travel.", right: "If I had money, I would travel.", why: "If + **past**, not would." },
    { wrong: "If I am you, I will accept.", right: "If I were you, I would accept.", why: "Imaginary → **were / would**." },
    { wrong: "What if I tell you I am teacher?", right: "What if I told you I was a teacher?", why: "Imaginary → past; jobs need **a**." },
    { wrong: "My dream is understand you.", right: "My dream is to understand you.", why: "dream is **to** + verb." },
  ],
  guided: {
    goal: "Build: If I had more time, I would learn Japanese.",
    steps: [
      { label: "Condition word", role: "connector", options: ["If", "When", "Because"], answer: 0, why: "Imaginary condition → **If**." },
      { label: "Imaginary condition (past)", role: "verb", options: ["I have more time,", "I had more time,", "I would have more time,"], answer: 1, why: "Second conditional → **past**." },
      { label: "Result", role: "modal", options: ["I will learn", "I would learn", "I learned"], answer: 1, why: "Imaginary result → **would** + verb." },
      { label: "Object", role: "object", options: ["Japanese.", "the Japanese.", "in Japanese."], answer: 0, why: "Languages take no article." },
    ],
    result: "If I had more time, I would learn Japanese.",
  },
  practice: [
    { id: "d25-p01", type: "choice", prompt: "Choose the correct sentence.", options: ["If you will study, you will pass.", "If you study, you will pass.", "If you studied, you will pass."], answer: 1, explanation: "First conditional: if + **present**, **will**.", skill: "form" },
    { id: "d25-p02", type: "choice", prompt: "You don't have a car. You imagine:", options: ["If I have a car, I'll drive to work.", "If I had a car, I'd drive to work.", "If I had a car, I'll drive to work."], answer: 1, explanation: "Not real → **past + would**.", skill: "meaning" },
    { id: "d25-p03", type: "fill", prompt: "Complete with the correct form of be.", sentence: "If I ___ you, I'd take the job.", accept: ["were", "was"], explanation: "**If I were you** (was is common in speech).", skill: "form" },
    { id: "d25-p04", type: "fill", prompt: "Complete (miss).", sentence: "Hurry up! If we don't leave now, we ___ the train.", accept: ["will miss", "'ll miss"], traps: [{ text: "would miss", feedback: "This is a real possibility → will miss." }], explanation: "Real → **will**.", skill: "tense" },
    { id: "d25-p05", type: "transform", prompt: "Make it imaginary.", source: "If I win, I'll buy a boat.", instruction: "Use the second conditional.", accept: ["If I won, I would buy a boat.", "If I won, I'd buy a boat.", "If I won I would buy a boat."], explanation: "win → **won**, will → **would**.", skill: "tense" },
    { id: "d25-p06", type: "transform", prompt: "Say your dream.", source: "I want to speak five languages one day.", instruction: "Start with: My dream is", accept: ["My dream is to speak five languages.", "My dream is to speak five languages one day.", "My dream is to be able to speak five languages."], explanation: "**My dream is to** + verb.", skill: "form" },
    { id: "d25-p07", type: "order", prompt: "Put the words in order.", tiles: ["What", "would", "you", "do", "if", "you", "were", "rich?"], explanation: "What would you do + if + past?", skill: "word-order" },
    { id: "d25-p08", type: "correct", prompt: "Fix the mistake.", wrong: "If it will be sunny, we will go to the beach.", accept: ["If it is sunny, we will go to the beach.", "If it's sunny, we'll go to the beach.", "If it is sunny, we'll go to the beach."], explanation: "No will after **if**.", skill: "form" },
    { id: "d25-p09", type: "correct", prompt: "Fix the mistake.", wrong: "If I would know the answer, I would tell you.", accept: ["If I knew the answer, I would tell you.", "If I knew the answer, I'd tell you."], explanation: "If + **past**.", skill: "form" },
    { id: "d25-p10", type: "listen", prompt: "Listen and type.", audioText: "What if I told you I was a teacher?", accept: ["What if I told you I was a teacher?", "What if I told you I were a teacher?"], explanation: "Imaginary question (original notes).", skill: "listening" },
    { id: "d25-p11", type: "speak", prompt: "Answer the question: What would you do with a free year?", target: "If I had a free year, I would travel around South America.", explanation: "Second conditional.", skill: "speaking" },
    { id: "d25-p12", type: "translate", from: "az", prompt: "Translate into English.", source: "Gəlsən, gedəcəyəm.", accept: ["If you come, I will go.", "If you come, I'll go.", "If you come I will go.", "If you come I'll go."], explanation: "'gəlsən' (real) → **If you come**, will (original notes).", skill: "writing" },
  ],
  vocabulary: [
    { term: "If I were you…", meaning: "advice", example: "If I were you, I'd apologize." },
    { term: "unless", meaning: "if … not", example: "We'll go unless it rains." },
    { term: "as long as", meaning: "only if", example: "You can borrow it as long as you return it." },
    { term: "in case", meaning: "because something might happen", example: "Take an umbrella in case it rains." },
    { term: "I'd love to…", meaning: "I would really like to", example: "I'd love to visit Japan." },
    { term: "one day", meaning: "at some time in the future", example: "One day I'll have my own business." },
  ],
  dialogue: {
    title: "Dreams and plans",
    setting: "Two friends talk late in the evening.",
    lines: [
      { speaker: "Toghrul", line: "What would you do if you didn't have to work?" },
      { speaker: "Selin", line: "If I didn't have to work, I'd travel for a year. My dream is to see Patagonia." },
      { speaker: "Toghrul", line: "Why don't you go next summer?" },
      { speaker: "Selin", line: "If I save enough money, I will. What about you?" },
      { speaker: "Toghrul", line: "My dream is to be able to play the piano." },
      { speaker: "Selin", line: "If I were you, I'd start now. If you practice every day, you'll be good in a year!" },
    ],
    focus: ["What would you do if", "If I didn't have to work, I'd travel", "My dream is to", "If I save enough money, I will", "If I were you", "If you practice every day, you'll"],
  },
  review: [
    { id: "d25-r01", type: "choice", prompt: "Which is a real possibility?", options: ["If I see him, I'll tell him.", "If I saw him, I'd tell him."], answer: 0, explanation: "First conditional = real.", skill: "meaning" },
    { id: "d25-r02", type: "fill", prompt: "Complete (have).", sentence: "If I ___ a dog, I would walk it every morning.", accept: ["had"], traps: [{ text: "have", feedback: "Imaginary → past: had." }, { text: "would have", feedback: "No would after if: had." }], explanation: "If + **past**.", skill: "form" },
    { id: "d25-r03", type: "transform", prompt: "Make a real condition.", source: "You hurry. You catch the bus.", instruction: "Start with: If you hurry,", accept: ["If you hurry, you will catch the bus.", "If you hurry, you'll catch the bus."], explanation: "If + present, **will**.", skill: "form" },
    { id: "d25-r04", type: "order", prompt: "Put the words in order.", tiles: ["My", "dream", "is", "to", "understand", "you."], explanation: "dream is **to** + verb (original notes).", skill: "word-order" },
    { id: "d25-r05", type: "correct", prompt: "Fix the mistake.", wrong: "If he will call, I will answer.", accept: ["If he calls, I will answer.", "If he calls, I'll answer."], explanation: "If + present.", skill: "form" },
  ],
};

export default day25;
