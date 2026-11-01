import type { Lesson } from "../types";

const day03: Lesson = {
  day: 3,
  stage: "foundation",
  frame: "states",
  title: "I am, you are, she is",
  objective: "Describe people, feelings, jobs and places with am, is and are.",
  builds_on: "You already know is and are from there is / there are. Frame 2 puts a person or thing in front of be to describe it.",
  outcome: "Introduce yourself and ask about someone new.",
  minutes: 20,
  explanation: [
    "**Frame 2: states** describes what someone or something is like, what they are, or where they are. The pattern is **subject + be + description**.",
    "In the present, be has three forms: **I am**, **he / she / it is**, and **you / we / they are**.",
    "After be you can put an adjective (tired), a noun with a / an (a nurse), or a place (at home).",
    "Negative: add **not** after be. Question: put be **before** the subject — Are you ready? Is she at work?",
    "In speech we usually contract: **I'm, you're, she's, it's, we're, they're** — and **isn't, aren't** in negatives.",
  ],
  patterns: [
    {
      name: "Positive",
      slots: [
        { label: "Subject", role: "subject", text: "She" },
        { label: "am / is / are", role: "be", text: "is" },
        { label: "description", role: "complement", text: "a nurse" },
      ],
    },
    {
      name: "Negative",
      slots: [
        { label: "Subject", role: "subject", text: "They" },
        { label: "be", role: "be", text: "are" },
        { label: "not", role: "negation", text: "not" },
        { label: "description", role: "complement", text: "at home" },
      ],
    },
    {
      name: "Question",
      slots: [
        { label: "Am / Is / Are", role: "be", text: "Are" },
        { label: "Subject", role: "subject", text: "you" },
        { label: "description", role: "complement", text: "ready?" },
      ],
    },
  ],
  examples: [
    { en: "I'm a teacher.", note: "Jobs need **a / an**: a teacher, an engineer." },
    { en: "She's from Brazil, but she's in Madrid now.", note: "Be + from (origin), be + in (location)." },
    { en: "We aren't tired. We're hungry.", note: "**Aren't** = are not." },
    { en: "Is your brother married?", note: "Question: **Is** + subject + description." },
    { en: "It's cold today.", note: "Weather uses **it is**." },
    { en: "My parents are very kind.", note: "Two people (my parents) → **are**." },
    { en: "Are you OK? — Yes, I'm fine, thanks.", note: "Short answer: Yes, I am. (Not: Yes, I'm.)" },
    { en: "The keys are on the table.", note: "Be + place: where something is." },
  ],
  forms: [
    { label: "I", positive: "I'm ready.", negative: "I'm not ready.", question: "Am I late?", shortAnswers: "Yes, you are. / No, you aren't." },
    { label: "He / she / it", positive: "She's a doctor.", negative: "She isn't a doctor.", question: "Is she a doctor?", shortAnswers: "Yes, she is. / No, she isn't." },
    { label: "You / we / they", positive: "They're at home.", negative: "They aren't at home.", question: "Are they at home?", shortAnswers: "Yes, they are. / No, they aren't." },
  ],
  mistakes: [
    { wrong: "I am agree with you.", right: "I agree with you.", why: "Agree is a verb, not a description. Don't add be (that's Frame 3)." },
    { wrong: "She is teacher.", right: "She is a teacher.", why: "One person's job needs **a / an**." },
    { wrong: "He have 25 years.", right: "He is 25 (years old).", why: "Age uses **be** in English, not have." },
    { wrong: "You are ready?", right: "Are you ready?", why: "In questions, be comes before the subject." },
    { wrong: "Yes, I'm.", right: "Yes, I am.", why: "Don't contract in short positive answers." },
  ],
  guided: {
    goal: "Build: Is your sister a doctor?",
    steps: [
      { label: "Start the question", role: "be", options: ["Does", "Is", "Are"], answer: 1, why: "Your sister = she → **Is**." },
      { label: "Add the subject", role: "subject", options: ["your sister", "she your sister", "sister"], answer: 0, why: "The subject comes right after be in a question." },
      { label: "Add the description", role: "complement", options: ["doctor?", "a doctor?", "the doctor job?"], answer: 1, why: "Jobs take **a / an**." },
    ],
    result: "Is your sister a doctor?",
  },
  practice: [
    { id: "d03-p01", type: "choice", prompt: "Choose the correct sentence.", options: ["My friends is from Turkey.", "My friends are from Turkey.", "My friends am from Turkey."], answer: 1, explanation: "My friends = they → **are**.", frame: "states", skill: "form" },
    { id: "d03-p02", type: "fill", prompt: "Complete with am, is or are.", sentence: "It ___ very hot in July.", accept: ["is"], explanation: "It → **is**.", frame: "states", skill: "form" },
    { id: "d03-p03", type: "fill", prompt: "Complete with the negative.", sentence: "I'm sorry, Ms. Lopez ___ in the office today.", accept: ["isn't", "is not"], traps: [{ text: "doesn't", feedback: "Frame 2 uses be: is not / isn't." }], explanation: "Negative of is: **isn't**.", frame: "states", skill: "negatives" },
    { id: "d03-p04", type: "order", prompt: "Make a question.", tiles: ["Are", "you", "from", "Canada?"], explanation: "**Be** first, then the subject.", frame: "states", skill: "questions" },
    { id: "d03-p05", type: "transform", prompt: "Make it a question.", source: "She is your manager.", instruction: "Ask about it.", accept: ["Is she your manager?"], explanation: "Swap: **Is she…?**", frame: "states", skill: "questions" },
    { id: "d03-p06", type: "transform", prompt: "Make it negative.", source: "We are ready to start.", instruction: "Use not.", accept: ["We are not ready to start.", "We aren't ready to start.", "We're not ready to start."], explanation: "**are + not**.", frame: "states", skill: "negatives" },
    { id: "d03-p07", type: "correct", prompt: "Fix the mistake.", wrong: "My brother have 30 years.", accept: ["My brother is 30.", "My brother is 30 years old.", "My brother is thirty.", "My brother is thirty years old."], explanation: "Age uses **be**: He's 30.", frame: "states", skill: "form" },
    { id: "d03-p08", type: "correct", prompt: "Fix the mistake.", wrong: "He is engineer.", accept: ["He is an engineer.", "He's an engineer."], explanation: "Jobs take **a / an**. Engineer starts with a vowel sound → **an**.", frame: "states", skill: "form" },
    { id: "d03-p09", type: "listen", prompt: "Listen and type.", audioText: "They aren't at home right now.", accept: ["They aren't at home right now.", "They are not at home right now."], explanation: "**Aren't** sounds like 'arnt'.", frame: "states", skill: "listening" },
    { id: "d03-p10", type: "speak", prompt: "Introduce yourself.", target: "Hi, I'm Sam. I'm from Baku. Nice to meet you.", explanation: "Contractions make introductions sound natural.", frame: "states", skill: "speaking" },
    { id: "d03-p11", type: "translate", from: "az", prompt: "Translate into English.", source: "O, həkimdir.", accept: ["She is a doctor.", "He is a doctor.", "She's a doctor.", "He's a doctor."], explanation: "Azerbaijani 'o' can be **he** or **she**. Jobs need **a**.", frame: "states", skill: "writing" },
  ],
  vocabulary: [
    { term: "Nice to meet you.", meaning: "what you say when you meet someone for the first time", example: "Hi, I'm Ana. — Nice to meet you, Ana." },
    { term: "be from", meaning: "your home country or city", example: "Where are you from?" },
    { term: "be married / single", meaning: "have / not have a husband or wife", example: "Is your brother married?" },
    { term: "be busy", meaning: "have a lot to do", example: "Sorry, I'm busy right now." },
    { term: "be in a hurry", meaning: "need to go quickly", example: "We're in a hurry." },
    { term: "What about you?", meaning: "asks the same question back", example: "I'm a nurse. What about you?" },
  ],
  dialogue: {
    title: "First day at a language school",
    setting: "Two students meet before class.",
    lines: [
      { speaker: "Kenji", line: "Hi! Is this the beginner class?" },
      { speaker: "Ana", line: "Yes, it is. I'm Ana. Are you new?" },
      { speaker: "Kenji", line: "Yes, I'm Kenji. I'm from Osaka. Where are you from?" },
      { speaker: "Ana", line: "I'm from Lisbon. Are you a student at the university?" },
      { speaker: "Kenji", line: "No, I'm not. I'm a chef. What about you?" },
      { speaker: "Ana", line: "I'm a nurse. The teacher isn't here yet — we're early!" },
    ],
    focus: ["Is this the beginner class?", "Are you new?", "Where are you from?", "No, I'm not.", "What about you?"],
  },
  review: [
    { id: "d03-r01", type: "choice", prompt: "Choose the correct question.", options: ["Your parents are at home?", "Are your parents at home?", "Do your parents at home?"], answer: 1, explanation: "Be comes first: **Are** your parents…?", frame: "states", skill: "questions" },
    { id: "d03-r02", type: "fill", prompt: "Complete.", sentence: "I ___ not hungry, thanks.", accept: ["am"], traps: [{ text: "is", feedback: "I always takes am." }, { text: "are", feedback: "I always takes am." }], explanation: "**I am**.", frame: "states", skill: "form" },
    { id: "d03-r03", type: "transform", prompt: "Make it negative.", source: "The museum is open on Mondays.", instruction: "Use not.", accept: ["The museum is not open on Mondays.", "The museum isn't open on Mondays."], explanation: "**is not / isn't**.", frame: "states", skill: "negatives" },
    { id: "d03-r04", type: "order", prompt: "Put the words in order.", tiles: ["My", "sister", "is", "a", "lawyer."], explanation: "Subject + be + description.", frame: "states", skill: "word-order" },
    { id: "d03-r05", type: "correct", prompt: "Fix the mistake.", wrong: "I am agree.", accept: ["I agree."], explanation: "Agree is a verb — no **am**.", frame: "states", skill: "form" },
  ],
  labSeeds: ["st-ready", "st-doctor"],
};

export default day03;
