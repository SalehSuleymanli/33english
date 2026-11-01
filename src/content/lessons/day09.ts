import type { Lesson } from "../types";

const day09: Lesson = {
  day: 9,
  stage: "foundation",
  frame: "modals",
  title: "Must, have to, should, might",
  objective: "Express obligation, advice and possibility — and choose the right register.",
  builds_on: "Day 8 introduced the modal frame with can. Today the same frame carries other meanings: rules, advice and possibility.",
  outcome: "Give a friend clear, polite advice.",
  minutes: 25,
  explanation: [
    "**Must** and **have to** = obligation. Must often shows the speaker's own feeling (I **must** call my mom). Have to often shows an outside rule (I **have to** wear a uniform).",
    "Be careful with negatives: **mustn't** = it's not allowed. **don't have to** = it's not necessary. You **mustn't** park here (forbidden). You **don't have to** pay (it's free).",
    "**Have to** is not a true modal: it changes like a normal verb — she **has to**, I **had to**, **do** you **have to**…?, I'll **have to**.",
    "**Should** = advice: You **should** see a doctor. **Shouldn't** = advice against.",
    "**Might / may / could** = possibility: It **might** rain later. Register: **gotta** (= have got to) and **got to** are informal speech — in writing, use have to.",
  ],
  patterns: [
    {
      name: "Advice",
      slots: [
        { label: "Subject", role: "subject", text: "You" },
        { label: "should", role: "modal", text: "should" },
        { label: "base verb", role: "verb", text: "rest" },
      ],
    },
    {
      name: "Rule (have to)",
      slots: [
        { label: "Subject", role: "subject", text: "She" },
        { label: "has to", role: "modal", text: "has to" },
        { label: "base verb", role: "verb", text: "wear" },
        { label: "object", role: "object", text: "a uniform" },
      ],
    },
    {
      name: "No obligation",
      slots: [
        { label: "Subject", role: "subject", text: "You" },
        { label: "don't have to", role: "aux", text: "don't have to" },
        { label: "base verb", role: "verb", text: "pay" },
      ],
    },
  ],
  examples: [
    { en: "You must wear a seat belt.", note: "A strong rule." },
    { en: "I have to get up early tomorrow.", note: "Obligation from my situation (work, a flight…)." },
    { en: "You mustn't smoke in the building.", note: "**Mustn't** = it is forbidden." },
    { en: "You don't have to bring anything.", note: "**Don't have to** = not necessary (but you can)." },
    { en: "Did you have to wait long?", note: "Past of have to: **did… have to / had to**." },
    { en: "You should try the soup — it's great.", note: "Friendly advice." },
    { en: "It might be cold in the mountains.", note: "Possibility." },
    { en: "I've gotta go. See you!", note: "Informal speech only: gotta = have got to.", register: "informal" },
  ],
  forms: [
    { label: "Should (all subjects)", positive: "She should rest.", negative: "She shouldn't work today.", question: "Should I call him?", shortAnswers: "Yes, you should. / No, you shouldn't." },
    { label: "Have to (present)", positive: "He has to work late.", negative: "He doesn't have to work late.", question: "Does he have to work late?", shortAnswers: "Yes, he does. / No, he doesn't." },
    { label: "Have to (past)", positive: "We had to wait.", negative: "We didn't have to wait.", question: "Did you have to wait?", shortAnswers: "Yes, we did. / No, we didn't." },
  ],
  mistakes: [
    { wrong: "You don't have to touch it — it's dangerous!", right: "You mustn't touch it — it's dangerous!", why: "For something forbidden, use **mustn't**. Don't have to = not necessary." },
    { wrong: "She have to leave early.", right: "She has to leave early.", why: "Have to changes: she **has to**." },
    { wrong: "You should to see a doctor.", right: "You should see a doctor.", why: "No **to** after should." },
    { wrong: "Yesterday I must work late.", right: "Yesterday I had to work late.", why: "Must has no past form → **had to**." },
    { wrong: "It mights rain.", right: "It might rain.", why: "Modals never take -s." },
  ],
  guided: {
    goal: "Build: You don't have to come early.",
    steps: [
      { label: "Subject", role: "subject", options: ["You", "Your", "To you"], answer: 0, why: "Start with the person." },
      { label: "Not necessary", role: "aux", options: ["mustn't", "don't have to", "shouldn't to"], answer: 1, why: "Not necessary → **don't have to**. (Mustn't = forbidden.)" },
      { label: "Verb", role: "verb", options: ["come", "coming", "to come"], answer: 0, why: "Base verb after have to." },
      { label: "Rest", role: "time", options: ["early.", "earlier than.", "in early."], answer: 0, why: "Simple adverb." },
    ],
    result: "You don't have to come early.",
  },
  practice: [
    { id: "d09-p01", type: "choice", prompt: "Entry is free. You ___ pay.", options: ["mustn't", "don't have to", "shouldn't"], answer: 1, optionFeedback: { 0: "Mustn't means it is forbidden — but paying isn't forbidden, just unnecessary." }, explanation: "Not necessary → **don't have to**.", frame: "modals", skill: "meaning" },
    { id: "d09-p02", type: "choice", prompt: "It's a hospital. You ___ use your phone in this room.", options: ["mustn't", "don't have to", "might not"], answer: 0, explanation: "Forbidden → **mustn't**.", frame: "modals", skill: "meaning" },
    { id: "d09-p03", type: "fill", prompt: "Complete with the correct form of have to.", sentence: "My sister ___ work on Sundays.", accept: ["has to"], traps: [{ text: "have to", feedback: "She → has to." }, { text: "must to", feedback: "No to after must. Use has to." }], explanation: "She → **has to**.", frame: "modals", skill: "form" },
    { id: "d09-p04", type: "fill", prompt: "Give advice.", sentence: "You look tired. You ___ go to bed early.", accept: ["should"], alternatives: [{ text: "ought to", note: "Also correct — ought to means the same as should, a little more formal." }], explanation: "Advice → **should**.", frame: "modals", skill: "meaning" },
    { id: "d09-p05", type: "transform", prompt: "Put it in the past.", source: "I have to show my passport.", instruction: "Use yesterday.", accept: ["I had to show my passport yesterday.", "Yesterday I had to show my passport."], traps: [{ text: "I must showed my passport yesterday.", feedback: "Must has no past. Use had to + base verb." }], explanation: "have to → **had to**.", frame: "modals", skill: "tense" },
    { id: "d09-p06", type: "transform", prompt: "Make it a question.", source: "We have to book a table.", instruction: "Ask about it.", accept: ["Do we have to book a table?"], explanation: "Have to uses **do** for questions.", frame: "modals", skill: "questions" },
    { id: "d09-p07", type: "order", prompt: "Put the words in order.", tiles: ["It", "might", "snow", "tonight."], explanation: "Subject + **might** + base verb.", frame: "modals", skill: "word-order" },
    { id: "d09-p08", type: "correct", prompt: "Fix the mistake.", wrong: "You should to drink more water.", accept: ["You should drink more water."], explanation: "No **to** after should.", frame: "modals", skill: "form" },
    { id: "d09-p09", type: "correct", prompt: "Fix the mistake.", wrong: "He doesn't has to come.", accept: ["He doesn't have to come.", "He does not have to come."], explanation: "After doesn't → **have** (base form).", frame: "modals", skill: "negatives" },
    { id: "d09-p10", type: "listen", prompt: "Listen and type.", audioText: "You don't have to finish it today.", accept: ["You don't have to finish it today.", "You do not have to finish it today."], explanation: "In fast speech, have to sounds like 'hafta'.", frame: "modals", skill: "listening" },
    { id: "d09-p11", type: "speak", prompt: "Give advice.", target: "You should talk to your manager about it.", explanation: "Should = friendly advice.", frame: "modals", skill: "speaking" },
  ],
  vocabulary: [
    { term: "It's up to you.", meaning: "You decide.", example: "You don't have to come — it's up to you." },
    { term: "If I were you, I'd…", meaning: "a soft way to give advice", example: "If I were you, I'd take the train." },
    { term: "It's not allowed.", meaning: "It's forbidden.", example: "Sorry, photos aren't allowed here." },
    { term: "optional", meaning: "you can choose", example: "The dress code is optional." },
    { term: "might / may", meaning: "possibly", example: "I might be late." },
    { term: "gotta (informal)", meaning: "have (got) to — speech only", example: "I've gotta run!" },
  ],
  dialogue: {
    title: "Advice before an exam",
    setting: "Leyla is nervous about her driving test. Her friend gives advice.",
    lines: [
      { speaker: "Leyla", line: "My driving test is tomorrow. I'm so nervous!" },
      { speaker: "Omar", line: "You should get some sleep tonight. Don't study too late." },
      { speaker: "Leyla", line: "Do I have to bring anything?" },
      { speaker: "Omar", line: "You have to bring your ID. You don't have to bring your own car — they have one." },
      { speaker: "Leyla", line: "What if I make a mistake?" },
      { speaker: "Omar", line: "Small mistakes are OK. But you mustn't forget to check your mirrors. They might fail you for that." },
    ],
    focus: ["You should get some sleep", "Do I have to bring", "You don't have to bring", "you mustn't forget", "They might fail you"],
  },
  review: [
    { id: "d09-r01", type: "choice", prompt: "Which means 'it's not necessary'?", options: ["You mustn't wear a tie.", "You don't have to wear a tie.", "You shouldn't wear a tie."], answer: 1, explanation: "**Don't have to** = not necessary.", frame: "modals", skill: "meaning" },
    { id: "d09-r02", type: "fill", prompt: "Complete (past obligation).", sentence: "The train was cancelled, so we ___ take a taxi.", accept: ["had to"], traps: [{ text: "must", feedback: "Must has no past form → had to." }], explanation: "Past obligation → **had to**.", frame: "modals", skill: "tense" },
    { id: "d09-r03", type: "transform", prompt: "Give advice.", source: "My friend eats too much sugar.", instruction: "Tell him with shouldn't. Start with: You", accept: ["You shouldn't eat so much sugar.", "You shouldn't eat too much sugar.", "You should not eat so much sugar.", "You should not eat too much sugar."], explanation: "**shouldn't** + base verb = advice against something.", frame: "modals", skill: "negatives" },
    { id: "d09-r04", type: "order", prompt: "Make a question.", tiles: ["Does", "she", "have", "to", "work", "today?"], explanation: "**Does** + subject + have to + verb?", frame: "modals", skill: "questions" },
    { id: "d09-r05", type: "correct", prompt: "Fix the mistake.", wrong: "Yesterday I must stay at home.", accept: ["Yesterday I had to stay at home.", "I had to stay at home yesterday."], explanation: "Past → **had to**.", frame: "modals", skill: "tense" },
  ],
  labSeeds: ["ac-clean", "st-ready"],
};

export default day09;
