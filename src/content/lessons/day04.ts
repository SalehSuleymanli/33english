import type { Lesson } from "../types";

const day04: Lesson = {
  day: 4,
  stage: "foundation",
  frame: "states",
  title: "Was, were, will be",
  objective: "Describe states in the past and future.",
  builds_on: "Day 2 moved there is into the past and future. Frame 2 moves the same way: only be changes, the description stays.",
  outcome: "Talk about how yesterday was and how tomorrow will be.",
  minutes: 20,
  explanation: [
    "Past: **I / he / she / it was**, **you / we / they were**. Future: **will be** for everyone.",
    "Negative: **wasn't, weren't, won't be**. Question: **Was he…? Were you…? Will it be…?**",
    "Time words help the listener: **yesterday, last week, in 2019, two days ago** (past) and **tomorrow, next week, soon, later** (future).",
    "Notice: **I was born** in 1995. In English, born is used with be in the past.",
  ],
  patterns: [
    {
      name: "Past",
      slots: [
        { label: "Subject", role: "subject", text: "The film" },
        { label: "was / were", role: "be", text: "was" },
        { label: "description", role: "complement", text: "boring" },
      ],
    },
    {
      name: "Future",
      slots: [
        { label: "Subject", role: "subject", text: "I" },
        { label: "will be", role: "be", text: "will be" },
        { label: "description", role: "complement", text: "late" },
        { label: "time", role: "time", text: "tomorrow", optional: true },
      ],
    },
    {
      name: "Past question",
      slots: [
        { label: "Was / Were", role: "be", text: "Were" },
        { label: "Subject", role: "subject", text: "you" },
        { label: "description", role: "complement", text: "at work" },
        { label: "time", role: "time", text: "yesterday?" },
      ],
    },
  ],
  examples: [
    { en: "I was tired after the trip.", note: "I → **was**." },
    { en: "We were at the beach all day.", note: "We → **were**." },
    { en: "The tickets weren't expensive.", note: "Tickets (plural) → **weren't**." },
    { en: "Was the hotel nice?", note: "Past question: **Was** + subject." },
    { en: "It will be sunny tomorrow.", note: "Future: **will be**." },
    { en: "Don't worry, it won't be difficult.", note: "**Won't** = will not." },
    { en: "I was born in Tabriz.", note: "Born always takes be: **was / were born**." },
    { en: "Where were you last night?", note: "Question words come first: Where + were + you." },
  ],
  forms: [
    { label: "Past · I / he / she / it", positive: "He was at home.", negative: "He wasn't at home.", question: "Was he at home?", shortAnswers: "Yes, he was. / No, he wasn't." },
    { label: "Past · you / we / they", positive: "You were right.", negative: "You weren't right.", question: "Were you right?", shortAnswers: "Yes, you were. / No, you weren't." },
    { label: "Future", positive: "She'll be happy.", negative: "She won't be happy.", question: "Will she be happy?", shortAnswers: "Yes, she will. / No, she won't." },
  ],
  mistakes: [
    { wrong: "They was very friendly.", right: "They were very friendly.", why: "They → **were**." },
    { wrong: "I born in 1998.", right: "I was born in 1998.", why: "Born needs **was / were**." },
    { wrong: "Tomorrow I will tired.", right: "Tomorrow I will be tired.", why: "After will, you need the verb **be** before an adjective." },
    { wrong: "Did you be at home?", right: "Were you at home?", why: "Be doesn't use did. Move be to the front." },
    { wrong: "The weather was been great.", right: "The weather was great.", why: "One form of be is enough." },
  ],
  guided: {
    goal: "Build: Were you at work yesterday?",
    steps: [
      { label: "Start a past question", role: "be", options: ["Did", "Were", "Was"], answer: 1, why: "You → **were**. Be doesn't use did." },
      { label: "Add the subject", role: "subject", options: ["you", "your", "you are"], answer: 0, why: "Subject after be in questions." },
      { label: "Add the place", role: "complement", options: ["at work", "in work", "to work"], answer: 0, why: "We say **at work** for being there." },
      { label: "Add the time", role: "time", options: ["tomorrow?", "yesterday?", "now?"], answer: 1, why: "Past form → past time word." },
    ],
    result: "Were you at work yesterday?",
  },
  practice: [
    { id: "d04-p01", type: "choice", prompt: "Choose the correct form.", options: ["My parents was in Rome last year.", "My parents were in Rome last year.", "My parents will in Rome last year."], answer: 1, explanation: "Parents = they → **were**.", frame: "states", skill: "tense" },
    { id: "d04-p02", type: "fill", prompt: "Complete with was or were.", sentence: "The exam ___ easier than I expected.", accept: ["was"], traps: [{ text: "were", feedback: "The exam is one thing → was." }], explanation: "One thing → **was**.", frame: "states", skill: "tense" },
    { id: "d04-p03", type: "fill", prompt: "Complete with the future.", sentence: "Don't call at seven — I ___ at the gym.", accept: ["will be", "'ll be"], traps: [{ text: "will", feedback: "You need be before at the gym: will be." }], explanation: "Future state: **will be**.", frame: "states", skill: "tense" },
    { id: "d04-p04", type: "transform", prompt: "Put it in the past.", source: "The shops are closed.", instruction: "Use yesterday.", accept: ["The shops were closed yesterday.", "Yesterday the shops were closed."], explanation: "are → **were**.", frame: "states", skill: "tense" },
    { id: "d04-p05", type: "transform", prompt: "Make it a question.", source: "The concert was good.", instruction: "Ask about it.", accept: ["Was the concert good?"], explanation: "**Was** + subject + description?", frame: "states", skill: "questions" },
    { id: "d04-p06", type: "order", prompt: "Make a sentence.", tiles: ["I", "won't", "be", "late", "again."], explanation: "Subject + **won't be** + description.", frame: "states", skill: "word-order" },
    { id: "d04-p07", type: "correct", prompt: "Fix the mistake.", wrong: "Did you be happy at school?", accept: ["Were you happy at school?"], explanation: "Be makes its own questions: **Were you…?**", frame: "states", skill: "questions" },
    { id: "d04-p08", type: "correct", prompt: "Fix the mistake.", wrong: "I born in a small village.", accept: ["I was born in a small village."], explanation: "**was born**.", frame: "states", skill: "form" },
    { id: "d04-p09", type: "listen", prompt: "Listen and type.", audioText: "It won't be cold tomorrow.", accept: ["It won't be cold tomorrow.", "It will not be cold tomorrow."], explanation: "**Won't** rhymes with don't.", frame: "states", skill: "listening" },
    {
      id: "d04-p10",
      type: "reading",
      prompt: "Read and answer.",
      passage: "Yesterday was a long day. I was at the office from eight until seven, and my boss wasn't happy with our report. The good news? Tomorrow will be easier. The report will be finished, and I'll be free in the afternoon.",
      questions: [
        { q: "Was the boss happy yesterday?", options: ["Yes", "No"], answer: 1, why: "My boss wasn't happy." },
        { q: "When will the writer be free?", options: ["Tomorrow afternoon", "Yesterday evening", "Tomorrow morning"], answer: 0, why: "I'll be free in the afternoon (tomorrow)." },
      ],
      explanation: "Notice how was / wasn't / will be place each idea in time.",
      frame: "states",
      skill: "reading",
    },
    { id: "d04-p11", type: "speak", prompt: "Say it aloud.", target: "Where were you last night?", explanation: "Link the words: 'wherewere you'.", frame: "states", skill: "speaking" },
  ],
  vocabulary: [
    { term: "last night / last week", meaning: "the night / week before this one", example: "Where were you last night?" },
    { term: "two days ago", meaning: "two days before today", example: "I was in London two days ago." },
    { term: "the day after tomorrow", meaning: "in two days", example: "The shop will be closed the day after tomorrow." },
    { term: "exhausted", meaning: "extremely tired", example: "I was exhausted after the flight." },
    { term: "be over", meaning: "be finished", example: "The meeting was over at six." },
    { term: "be worth it", meaning: "be good enough to justify the effort or cost", example: "The trip was expensive, but it was worth it." },
  ],
  dialogue: {
    title: "How was your weekend?",
    setting: "Two colleagues talk on Monday morning.",
    lines: [
      { speaker: "Rita", line: "Hi! How was your weekend?" },
      { speaker: "Arman", line: "It was great, thanks. We were at the lake." },
      { speaker: "Rita", line: "Lovely! Was the weather good?" },
      { speaker: "Arman", line: "It wasn't great on Saturday, but Sunday was perfect. What about you?" },
      { speaker: "Rita", line: "I was at home. I was too tired to go out." },
      { speaker: "Arman", line: "Well, next weekend will be better. It's a long weekend!" },
    ],
    focus: ["How was your weekend?", "We were at the lake", "Was the weather good?", "will be better"],
  },
  review: [
    { id: "d04-r01", type: "choice", prompt: "Choose the correct question.", options: ["Did they be at the party?", "Were they at the party?", "Was they at the party?"], answer: 1, explanation: "They → **were**, at the front.", frame: "states", skill: "questions" },
    { id: "d04-r02", type: "fill", prompt: "Complete.", sentence: "The food ___ very good — I didn't like it.", accept: ["wasn't", "was not"], explanation: "Negative past: **wasn't**.", frame: "states", skill: "negatives" },
    { id: "d04-r03", type: "transform", prompt: "Put it in the future.", source: "The meeting is short.", instruction: "Use will.", accept: ["The meeting will be short."], explanation: "**will be**.", frame: "states", skill: "tense" },
    { id: "d04-r04", type: "order", prompt: "Make a question.", tiles: ["Will", "you", "be", "at", "home", "tonight?"], explanation: "**Will** + subject + **be**…?", frame: "states", skill: "questions" },
    { id: "d04-r05", type: "correct", prompt: "Fix the mistake.", wrong: "We was very happy.", accept: ["We were very happy."], explanation: "We → **were**.", frame: "states", skill: "form" },
  ],
  labSeeds: ["st-home", "st-tired"],
};

export default day04;
