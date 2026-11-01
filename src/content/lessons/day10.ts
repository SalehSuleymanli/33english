import type { Lesson } from "../types";

const day10: Lesson = {
  day: 10,
  stage: "foundation",
  frame: "possession",
  title: "Have and has",
  objective: "Talk about what people have, and tell possession 'have' from helper 'have'.",
  builds_on: "Possession uses do / does / did exactly like the action verbs from Days 5–6. And you'll meet have again on Day 15 — as a helper.",
  outcome: "Order food and ask what a place has.",
  minutes: 20,
  explanation: [
    "**Frame 5: possession** = subject + **have / has** + thing. I **have** a car. She **has** two brothers.",
    "**Has** is for he / she / it. Everyone else uses **have**. Past: **had** for everyone.",
    "Possession have is a normal verb, so questions and negatives use **do / does / did**: **Do** you **have** a pen? She **doesn't have** time. We **didn't have** a car.",
    "British English also says **have got**: I've got a car. Have you got a pen? Both are correct; this course uses do-questions.",
    "Have is also used for some actions (have breakfast, have a shower, have a good time). Those can be continuous: We're **having** lunch. Possession can't: not I'm having a car.",
  ],
  patterns: [
    {
      name: "Positive",
      slots: [
        { label: "Subject", role: "subject", text: "She" },
        { label: "have / has", role: "verb", text: "has" },
        { label: "thing", role: "object", text: "a new phone" },
      ],
    },
    {
      name: "Negative",
      slots: [
        { label: "Subject", role: "subject", text: "We" },
        { label: "don't / doesn't", role: "aux", text: "don't" },
        { label: "have", role: "verb", text: "have" },
        { label: "thing", role: "object", text: "any milk" },
      ],
    },
    {
      name: "Question",
      slots: [
        { label: "Do / Does", role: "aux", text: "Do" },
        { label: "Subject", role: "subject", text: "you" },
        { label: "have", role: "verb", text: "have" },
        { label: "thing", role: "object", text: "a table for two?" },
      ],
    },
  ],
  examples: [
    { en: "I have two sisters and a brother.", note: "I → **have**." },
    { en: "My grandfather has a farm.", note: "He → **has**." },
    { en: "Do you have any vegetarian dishes?", note: "Question with **do**, and **any** for plural." },
    { en: "Sorry, we don't have any tables free.", note: "**Don't have any**." },
    { en: "Does the room have Wi-Fi?", note: "**Does** + subject + **have** (not has)." },
    { en: "When I was young, we didn't have a TV.", note: "Past negative: **didn't have**." },
    { en: "I've got a headache.", note: "British: **have got** = have.", register: "informal" },
    { en: "We're having lunch — can I call you back?", note: "Have lunch = eat → can be continuous." },
  ],
  forms: [
    { label: "I / you / we / they", positive: "They have a dog.", negative: "They don't have a dog.", question: "Do they have a dog?", shortAnswers: "Yes, they do. / No, they don't." },
    { label: "He / she / it", positive: "She has a car.", negative: "She doesn't have a car.", question: "Does she have a car?", shortAnswers: "Yes, she does. / No, she doesn't." },
    { label: "Past (all)", positive: "We had a garden.", negative: "We didn't have a garden.", question: "Did you have a garden?", shortAnswers: "Yes, we did. / No, we didn't." },
  ],
  mistakes: [
    { wrong: "She have a beautiful voice.", right: "She has a beautiful voice.", why: "She → **has**." },
    { wrong: "Does he has a car?", right: "Does he have a car?", why: "After does → **have**." },
    { wrong: "I haven't a car.", right: "I don't have a car.", why: "Modern English: **don't have** (or haven't got)." },
    { wrong: "I am having a car.", right: "I have a car.", why: "Possession is a state → no continuous." },
    { wrong: "There have a lot of people.", right: "There are a lot of people.", why: "Existence is Frame 1 (there is / are), not have." },
  ],
  guided: {
    goal: "Build: Does the hotel have a pool?",
    steps: [
      { label: "Helper", role: "aux", options: ["Has", "Does", "Is"], answer: 1, why: "The hotel = it → **Does**." },
      { label: "Subject", role: "subject", options: ["the hotel", "hotel the", "there the hotel"], answer: 0, why: "Subject after the helper." },
      { label: "Verb", role: "verb", options: ["has", "have", "having"], answer: 1, why: "After does → **have**." },
      { label: "Thing", role: "object", options: ["a pool?", "pool?", "any pool?"], answer: 0, why: "One countable thing → **a pool**." },
    ],
    result: "Does the hotel have a pool?",
  },
  practice: [
    { id: "d10-p01", type: "choice", prompt: "Choose the correct sentence.", options: ["My parents has a small house.", "My parents have a small house.", "My parents are have a small house."], answer: 1, explanation: "Parents = they → **have**.", frame: "possession", skill: "form" },
    { id: "d10-p02", type: "fill", prompt: "Complete with have, has, don't or doesn't.", sentence: "The café ___ have oat milk, sorry.", accept: ["doesn't", "does not"], traps: [{ text: "don't", feedback: "The café = it → doesn't." }, { text: "hasn't", feedback: "Modern English uses doesn't have (or hasn't got)." }], explanation: "It → **doesn't have**.", frame: "possession", skill: "negatives" },
    { id: "d10-p03", type: "fill", prompt: "Complete the question.", sentence: "___ you have a table for four?", accept: ["Do"], traps: [{ text: "Have", feedback: "With have (not have got), questions use Do." }, { text: "Are", feedback: "Possession uses do / does." }], explanation: "**Do** you have…?", frame: "possession", skill: "questions" },
    { id: "d10-p04", type: "transform", prompt: "Make it a question.", source: "She has a driving license.", instruction: "Ask about it.", accept: ["Does she have a driving license?", "Does she have a driving licence?"], traps: [{ text: "Does she has a driving license?", feedback: "After does → have." }], explanation: "**Does** + subject + **have**?", frame: "possession", skill: "questions" },
    { id: "d10-p05", type: "transform", prompt: "Put it in the past.", source: "We don't have enough time.", instruction: "Use yesterday.", accept: ["We didn't have enough time yesterday.", "Yesterday we didn't have enough time.", "Yesterday, we didn't have enough time."], explanation: "don't → **didn't**.", frame: "possession", skill: "tense" },
    { id: "d10-p06", type: "order", prompt: "Make a question.", tiles: ["Do", "you", "have", "any", "questions?"], explanation: "**Do** + you + **have** + any…?", frame: "possession", skill: "questions" },
    { id: "d10-p07", type: "correct", prompt: "Fix the mistake.", wrong: "Does your flat has a balcony?", accept: ["Does your flat have a balcony?", "Does your apartment have a balcony?"], explanation: "After does → **have**.", frame: "possession", skill: "questions" },
    { id: "d10-p08", type: "correct", prompt: "Fix the mistake.", wrong: "I am having two children.", accept: ["I have two children."], alternatives: [{ text: "I've got two children.", note: "Also correct (British English)." }], explanation: "Possession → simple form: **I have**.", frame: "possession", skill: "form" },
    { id: "d10-p09", type: "listen", prompt: "Listen and type.", audioText: "Do you have anything without nuts?", accept: ["Do you have anything without nuts?"], explanation: "Useful question for allergies.", frame: "possession", skill: "listening" },
    { id: "d10-p10", type: "speak", prompt: "Order politely.", target: "Hi, do you have a table for two by the window?", explanation: "Do you have…? is the polite way to ask.", frame: "possession", skill: "speaking" },
    { id: "d10-p11", type: "translate", from: "az", prompt: "Translate into English.", source: "Onun iki qardaşı var.", accept: ["She has two brothers.", "He has two brothers.", "She's got two brothers.", "He's got two brothers."], explanation: "'…var' with a person often = **have / has**.", frame: "possession", skill: "writing" },
  ],
  vocabulary: [
    { term: "a table for two", meaning: "a restaurant table for two people", example: "Do you have a table for two?" },
    { term: "Can I have…?", meaning: "polite way to order", example: "Can I have the soup, please?" },
    { term: "the bill / the check", meaning: "the paper that shows what you pay (UK / US)", example: "Could we have the bill, please?" },
    { term: "be allergic to", meaning: "your body reacts badly to", example: "I'm allergic to nuts." },
    { term: "dish", meaning: "a type of food on a menu", example: "Do you have any vegetarian dishes?" },
    { term: "Have you got…? (UK)", meaning: "Do you have…?", example: "Have you got a pen?" },
  ],
  dialogue: {
    title: "At a restaurant",
    setting: "Ravi and his friend arrive at a busy restaurant.",
    lines: [
      { speaker: "Ravi", line: "Hi. Do you have a table for two?" },
      { speaker: "Waiter", line: "Yes, we have one by the window. Here's the menu." },
      { speaker: "Ravi", line: "Thanks. Do you have any vegetarian dishes? My friend doesn't eat meat." },
      { speaker: "Waiter", line: "We have a mushroom risotto and a vegetable curry." },
      { speaker: "Ravi", line: "Does the curry have nuts? She's allergic." },
      { speaker: "Waiter", line: "No, it doesn't. But I'll check with the chef to be sure." },
    ],
    focus: ["Do you have a table for two?", "Do you have any vegetarian dishes?", "doesn't eat meat", "Does the curry have nuts?", "No, it doesn't."],
  },
  review: [
    { id: "d10-r01", type: "choice", prompt: "Which 'have' is possession?", options: ["I have finished.", "I have a bike.", "I'm having breakfast."], answer: 1, explanation: "I have **a bike** = possession. (Have finished = helper; having breakfast = eating.)", frame: "possession", skill: "meaning" },
    { id: "d10-r02", type: "fill", prompt: "Complete.", sentence: "My brother ___ a new job.", accept: ["has"], traps: [{ text: "have", feedback: "He → has." }], explanation: "He → **has**.", frame: "possession", skill: "form" },
    { id: "d10-r03", type: "transform", prompt: "Make it negative.", source: "The hotel has a gym.", instruction: "Use doesn't.", accept: ["The hotel doesn't have a gym.", "The hotel does not have a gym."], explanation: "**doesn't have**.", frame: "possession", skill: "negatives" },
    { id: "d10-r04", type: "order", prompt: "Put the words in order.", tiles: ["We", "didn't", "have", "a", "car."], explanation: "**didn't have** + thing.", frame: "possession", skill: "word-order" },
    { id: "d10-r05", type: "correct", prompt: "Fix the mistake.", wrong: "She don't have any money.", accept: ["She doesn't have any money.", "She does not have any money."], explanation: "She → **doesn't**.", frame: "possession", skill: "negatives" },
  ],
  labSeeds: ["po-car", "po-brothers"],
};

export default day10;
