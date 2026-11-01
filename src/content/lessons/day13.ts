import type { Lesson } from "../types";

const day13: Lesson = {
  day: 13,
  stage: "expansion",
  frame: "actions",
  title: "Who, what, where, why",
  objective: "Ask object questions (What did you do?) and subject questions (Who called?).",
  builds_on: "You can already make yes/no questions in every frame. Today you put a question word in front — and learn the one case where the helper disappears.",
  outcome: "Get the information you need in any conversation.",
  minutes: 25,
  explanation: [
    "Most information questions follow the pattern **question word + helper + subject + verb**: **What did** you **buy**? **Where does** she **work**? **Why are** you **laughing**? This is the yes/no question with a question word in front.",
    "But when the question word **is the subject** — when you're asking *who did* the action — there is **no do / does / did**, and the word order stays like a statement: **Who called?** (not Who did call?). **What happened?** (not What did happen?).",
    "Compare: **Who did you call?** (you called someone — who?) and **Who called you?** (someone called you — who?).",
    "Question words: **what** (thing), **who** (person), **where** (place), **when** (time), **why** (reason), **how** (way), **which** (choice from a group), **whose** (owner), **how much / how many** (amount), **how long / how often** (time span / frequency).",
  ],
  patterns: [
    {
      name: "Object question (with helper)",
      slots: [
        { label: "Question word", role: "question", text: "What" },
        { label: "helper", role: "aux", text: "did" },
        { label: "Subject", role: "subject", text: "you" },
        { label: "base verb", role: "verb", text: "buy?" },
      ],
    },
    {
      name: "Subject question (no helper)",
      slots: [
        { label: "Question word = subject", role: "subject", text: "Who" },
        { label: "verb (statement form)", role: "verb", text: "broke" },
        { label: "object", role: "object", text: "the window?" },
      ],
    },
  ],
  examples: [
    { en: "Where do you live?", note: "Question word + **do** + subject + verb." },
    { en: "What time does the train leave?", note: "**What time** works as one question word." },
    { en: "Why didn't you call me?", note: "Negative questions work too: why + **didn't**." },
    { en: "Who lives in that house?", note: "Who is the subject → **no does**, verb with -s." },
    { en: "What happened to your arm?", note: "What is the subject → **happened**, no did." },
    { en: "Who did you meet at the party?", note: "You met someone → object question → **did**." },
    { en: "How long have you been here?", note: "Question words work with any frame (here: perfect, Day 15)." },
    { en: "Which bus goes to the airport?", note: "Which bus = subject → no does." },
  ],
  forms: [
    { label: "Object vs subject question", positive: "Ali called Sara.", negative: "Who did Ali call? (→ Sara)", question: "Who called Sara? (→ Ali)" },
    { label: "Frame 2 / modal questions", positive: "She is at work. / He can help.", negative: "Where is she? / Who can help?", question: "Why is she at work? / How can he help?" },
  ],
  mistakes: [
    { wrong: "Where you live?", right: "Where do you live?", why: "Action verbs need **do / does / did** after the question word." },
    { wrong: "Who did call you?", right: "Who called you?", why: "Who is the subject → no did." },
    { wrong: "What did happen?", right: "What happened?", why: "What is the subject → no did." },
    { wrong: "What time the film starts?", right: "What time does the film start?", why: "Helper + subject + base verb." },
    { wrong: "Why she is angry?", right: "Why is she angry?", why: "Be moves before the subject in questions." },
  ],
  guided: {
    goal: "Build: Who told you about the job?",
    steps: [
      { label: "Question word (the person who told)", role: "subject", options: ["Who", "Whom", "What"], answer: 0, why: "We ask about the **subject** → Who." },
      { label: "Verb", role: "verb", options: ["did tell", "told", "tell"], answer: 1, why: "Subject question → **no did**, past form: told." },
      { label: "Object", role: "object", options: ["you", "your", "to you"], answer: 0, why: "Tell + person: told **you**." },
      { label: "Topic", role: "object", options: ["about the job?", "for the job?", "the job about?"], answer: 0, why: "Tell someone **about** something." },
    ],
    result: "Who told you about the job?",
  },
  practice: [
    { id: "d13-p01", type: "choice", prompt: "Answer: 'My sister called me.' Which question?", options: ["Who did call you?", "Who called you?", "Who did you call?"], answer: 1, optionFeedback: { 2: "That asks about the person YOU called." }, explanation: "Asking about the subject → **Who called you?**", frame: "actions", skill: "questions" },
    { id: "d13-p02", type: "choice", prompt: "Answer: 'I called my sister.' Which question?", options: ["Who called you?", "Who did you call?", "Who you called?"], answer: 1, explanation: "Asking about the object → **Who did you call?**", frame: "actions", skill: "questions" },
    { id: "d13-p03", type: "fill", prompt: "Complete with do, does or did.", sentence: "How often ___ you go to the gym?", accept: ["do"], explanation: "Present, you → **do**.", frame: "actions", skill: "questions" },
    { id: "d13-p04", type: "fill", prompt: "Complete with one word.", sentence: "___ umbrella is this? — It's mine.", accept: ["Whose"], traps: [{ text: "Who's", feedback: "Who's = who is. For owners, use whose." }], explanation: "Owner → **whose**.", skill: "questions" },
    { id: "d13-p05", type: "transform", prompt: "Ask about the underlined part: She works **in a hospital**.", source: "She works in a hospital.", instruction: "Use where.", accept: ["Where does she work?"], traps: [{ text: "Where she works?", feedback: "Add does: Where does she work?" }], explanation: "**Where does** + she + **work**?", frame: "actions", skill: "questions" },
    { id: "d13-p06", type: "transform", prompt: "Ask who did it.", source: "Somebody ate my sandwich.", instruction: "Use who.", accept: ["Who ate my sandwich?"], traps: [{ text: "Who did eat my sandwich?", feedback: "Who is the subject → no did." }], explanation: "Subject question → **Who ate**…?", frame: "actions", skill: "questions" },
    { id: "d13-p07", type: "order", prompt: "Make a question.", tiles: ["What", "time", "does", "the", "shop", "close?"], explanation: "What time + **does** + subject + base verb?", frame: "actions", skill: "word-order" },
    { id: "d13-p08", type: "correct", prompt: "Fix the mistake.", wrong: "What did happen yesterday?", accept: ["What happened yesterday?"], explanation: "What is the subject → **happened**.", frame: "actions", skill: "questions" },
    { id: "d13-p09", type: "correct", prompt: "Fix the mistake.", wrong: "Why you didn't come?", accept: ["Why didn't you come?", "Why did you not come?"], explanation: "Helper before the subject: **Why didn't you**…?", frame: "actions", skill: "questions" },
    { id: "d13-p10", type: "listen", prompt: "Listen and type.", audioText: "How long does it take to get there?", accept: ["How long does it take to get there?"], explanation: "A very useful question for travel.", frame: "actions", skill: "listening" },
    { id: "d13-p11", type: "speak", prompt: "Ask about a schedule.", target: "Excuse me, what time does the next train leave?", explanation: "What time + does + subject + verb.", frame: "actions", skill: "speaking" },
  ],
  vocabulary: [
    { term: "How long does it take?", meaning: "asks about duration", example: "How long does it take by bus?" },
    { term: "How often…?", meaning: "asks about frequency", example: "How often do you travel?" },
    { term: "What's it like?", meaning: "asks for a description", example: "What's your new job like?" },
    { term: "What for?", meaning: "for what reason (informal)", example: "I need your passport. — What for?" },
    { term: "Which one?", meaning: "asks someone to choose", example: "Which one do you want?" },
    { term: "What do you mean?", meaning: "please explain", example: "Sorry, what do you mean?" },
  ],
  dialogue: {
    title: "At the information desk",
    setting: "Farah has just arrived at a train station in a new city.",
    lines: [
      { speaker: "Farah", line: "Hi. Which train goes to the city center?" },
      { speaker: "Clerk", line: "The blue line. It leaves from platform four." },
      { speaker: "Farah", line: "How often does it run?" },
      { speaker: "Clerk", line: "Every ten minutes during the day." },
      { speaker: "Farah", line: "And how long does it take?" },
      { speaker: "Clerk", line: "About fifteen minutes. Where are you going exactly?" },
      { speaker: "Farah", line: "The Grand Hotel. What's the best stop?" },
      { speaker: "Clerk", line: "Central Square. Who booked your hotel? Some booking sites include a free transfer." },
    ],
    focus: ["Which train goes", "How often does it run?", "how long does it take?", "Where are you going", "Who booked your hotel?"],
  },
  review: [
    { id: "d13-r01", type: "choice", prompt: "Choose the correct question.", options: ["Where does your brother works?", "Where does your brother work?", "Where your brother works?"], answer: 1, explanation: "**does** + base verb.", frame: "actions", skill: "questions" },
    { id: "d13-r02", type: "choice", prompt: "Choose the correct question.", options: ["Who wants coffee?", "Who does want coffee?", "Who want coffee?"], answer: 0, explanation: "Who = subject → **wants** (like he wants).", frame: "actions", skill: "questions" },
    { id: "d13-r03", type: "transform", prompt: "Ask about the reason.", source: "They left early.", instruction: "Use why.", accept: ["Why did they leave early?"], explanation: "**Why did** + they + **leave**?", frame: "actions", skill: "questions" },
    { id: "d13-r04", type: "order", prompt: "Make a question.", tiles: ["Who", "did", "you", "see", "there?"], explanation: "You saw someone → **did**.", frame: "actions", skill: "word-order" },
    { id: "d13-r05", type: "correct", prompt: "Fix the mistake.", wrong: "Who did break the glass?", accept: ["Who broke the glass?"], explanation: "Subject question → **broke**.", frame: "actions", skill: "questions" },
  ],
  labSeeds: ["ac-fix", "ac-send"],
};

export default day13;
