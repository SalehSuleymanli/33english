import type { Lesson } from "../types";

const day25: Lesson = {
  day: 25,
  stage: "communication",
  frame: "states",
  title: "I'm used to it, I'm getting used to it",
  objective: "Say that something feels normal (be used to) or is becoming normal (get used to), with a noun or verb-ing.",
  builds_on: "Yesterday's used to + verb was about the past. Today the same words join Frame 2 (be used to = a state) and Frame 3 (get used to = a change). Section 21 of your notes: to be used to vs to get used to.",
  outcome: "Explain how you are adapting to a new job, city or habit.",
  minutes: 20,
  explanation: [
    "**be used to + noun / verb-ing** = be accustomed to something; it already feels normal. It's a **state** (Frame 2): I'**m used to** playing football. She **isn't used to** the cold.",
    "**get used to + noun / verb-ing** = become accustomed. It's a **process**, a change (Frame 3): I **get used to** new places quickly. I'**m getting used to** my new job. I **got used to** it.",
    "After be / get used to, **to** is a preposition, so the verb takes **-ing**: used to **working** — never used to work. This is the big difference from Day 24's used to + base verb.",
    "Both work in any tense: I **was used to** the noise. You'**ll get used to** it. Have you **got used to** the new office yet?",
    "Compare (from your notes): I **am used to playing** football (it's normal for me) · I **get used to** playing football (I adapt, simple) · I **am getting used to** playing football (I'm adapting now).",
  ],
  patterns: [
    {
      name: "Be used to (state)",
      slots: [
        { label: "Subject", role: "subject", text: "I" },
        { label: "be", role: "be", text: "am" },
        { label: "used to", role: "complement", text: "used to" },
        { label: "noun / -ing", role: "verb", text: "playing football" },
      ],
    },
    {
      name: "Get used to (change)",
      slots: [
        { label: "Subject", role: "subject", text: "I" },
        { label: "am getting", role: "aux", text: "am getting" },
        { label: "used to", role: "complement", text: "used to" },
        { label: "noun / -ing", role: "object", text: "the weather" },
      ],
    },
  ],
  examples: [
    { en: "I'm used to playing football.", note: "It's normal for me → be used to + **-ing** (original notes)." },
    { en: "I'm getting used to playing football.", note: "It's becoming normal → **getting used to** (original notes)." },
    { en: "She isn't used to the cold yet.", note: "Be used to + **noun**." },
    { en: "Are you used to driving in Baku?", note: "Question: **be** goes first." },
    { en: "It took me a year to get used to driving on the left.", note: "**get used to** = the process took time." },
    { en: "You'll get used to it.", note: "A very common, encouraging phrase." },
    { en: "I was used to the noise, so I slept well.", note: "Past state → **was used to**." },
    { en: "Have you got used to your new office?", note: "Perfect + get used to (Day 16)." },
  ],
  forms: [
    { label: "Be used to (state)", positive: "I'm used to the noise.", negative: "I'm not used to the noise.", question: "Are you used to the noise?", shortAnswers: "Yes, I am. / No, I'm not." },
    { label: "Get used to (change)", positive: "I'm getting used to the food.", negative: "I can't get used to the food.", question: "Are you getting used to the food?", shortAnswers: "Yes, I am. / No, I'm not." },
  ],
  mistakes: [
    { wrong: "I'm used to work at night.", right: "I'm used to working at night.", why: "Be used to + **-ing**." },
    { wrong: "I used to living alone now.", right: "I'm used to living alone now.", why: "For a present state, you need **be**: I'm used to." },
    { wrong: "I can't used to the food.", right: "I can't get used to the food.", why: "A process needs **get**: can't get used to." },
    { wrong: "She is getting used to wake up early.", right: "She is getting used to waking up early.", why: "Get used to + **-ing**." },
  ],
  guided: {
    goal: "Build: I'm getting used to my new job.",
    steps: [
      { label: "Subject + be", role: "subject", options: ["I'm", "I", "I used"], answer: 0, why: "A change in progress needs **be** (+ getting)." },
      { label: "Process", role: "aux", options: ["getting", "get", "got"], answer: 0, why: "In progress → **getting**." },
      { label: "Expression", role: "complement", options: ["used to", "use to", "using to"], answer: 0, why: "Fixed phrase: **used to**." },
      { label: "Noun", role: "object", options: ["my new job.", "work my new job.", "working new job."], answer: 0, why: "Used to + **noun** (or -ing)." },
    ],
    result: "I'm getting used to my new job.",
  },
  practice: [
    { id: "d25-p01", type: "choice", prompt: "You moved to London. Driving on the left feels strange, but it's becoming easier.", options: ["I used to drive on the left.", "I'm getting used to driving on the left.", "I'm used to drive on the left."], answer: 1, explanation: "A process → **getting used to + -ing**.", skill: "meaning" },
    { id: "d25-p02", type: "choice", prompt: "You have worked nights for ten years. It's normal for you.", options: ["I'm used to working nights.", "I used to work nights.", "I'm getting used to work nights."], answer: 0, explanation: "Normal now → **be used to + -ing**.", skill: "meaning" },
    { id: "d25-p03", type: "fill", prompt: "Complete with the -ing form of get up.", sentence: "I'm a baker, so I'm used to ___ at 4 a.m.", accept: ["getting up"], traps: [{ text: "get up", feedback: "Be used to + -ing: getting up." }], explanation: "be used to + **-ing**.", skill: "form" },
    { id: "d25-p04", type: "fill", prompt: "Complete with one word.", sentence: "Don't worry, you'll ___ used to it.", accept: ["get"], traps: [{ text: "be", feedback: "Possible, but here we mean the process: get used to." }], explanation: "Future process → **get** used to.", skill: "form" },
    { id: "d25-p05", type: "transform", prompt: "Make it negative.", source: "He is used to the noise.", instruction: "Use isn't.", accept: ["He isn't used to the noise.", "He is not used to the noise.", "He's not used to the noise."], explanation: "**isn't used to** + noun.", skill: "negatives" },
    { id: "d25-p06", type: "transform", prompt: "Make it a question.", source: "You are getting used to your new school.", instruction: "Start with: Are", accept: ["Are you getting used to your new school?"], explanation: "Be first: **Are** you getting used to…?", skill: "questions" },
    { id: "d25-p07", type: "order", prompt: "Put the words in order.", tiles: ["You'll", "get", "used", "to", "it."], explanation: "Encouraging phrase: **You'll get used to it**.", skill: "word-order" },
    { id: "d25-p08", type: "correct", prompt: "Fix the mistake.", wrong: "I'm used to work long hours.", accept: ["I'm used to working long hours.", "I am used to working long hours."], explanation: "be used to + **working**.", skill: "form" },
    { id: "d25-p09", type: "correct", prompt: "Fix the mistake.", wrong: "I can't used to this weather.", accept: ["I can't get used to this weather.", "I cannot get used to this weather."], explanation: "Process → **get used to**.", skill: "form" },
    { id: "d25-p10", type: "listen", prompt: "Listen and type.", audioText: "It took me a month to get used to the new schedule.", accept: ["It took me a month to get used to the new schedule."], explanation: "**get used to** + noun.", skill: "listening" },
    { id: "d25-p11", type: "speak", prompt: "Talk about something new in your life.", target: "I'm getting used to waking up early for my new job.", explanation: "getting used to + **-ing**.", skill: "speaking" },
    { id: "d25-p12", type: "translate", from: "az", prompt: "Translate into English.", source: "Mən futbol oynamağa öyrəşmişəm.", accept: ["I am used to playing football.", "I'm used to playing football."], explanation: "'öyrəşmişəm' (state) → **be used to** + -ing (original notes).", skill: "writing" },
  ],
  vocabulary: [
    { term: "take time to get used to", meaning: "need time to adapt", example: "It takes time to get used to a new city." },
    { term: "feel at home", meaning: "feel comfortable", example: "After a month, I started to feel at home." },
    { term: "adapt", meaning: "change to fit a new situation", example: "Children adapt quickly." },
    { term: "strange", meaning: "not normal or familiar", example: "Everything felt strange at first." },
    { term: "at first", meaning: "at the beginning", example: "At first it was hard, but now I'm used to it." },
    { term: "settle in", meaning: "start to feel comfortable in a new place", example: "Have you settled in yet?" },
  ],
  dialogue: {
    title: "Life in a new country",
    setting: "Murad moved to Canada a year ago. His friend from home asks how it's going.",
    lines: [
      { speaker: "Anar", line: "So, how's life in Toronto? Are you used to the cold yet?" },
      { speaker: "Murad", line: "Not really! I'm getting used to it, but January was terrible." },
      { speaker: "Anar", line: "And the food? You were never used to eating dinner at six!" },
      { speaker: "Murad", line: "True, at first it felt strange. Now I'm used to it." },
      { speaker: "Anar", line: "What about work?" },
      { speaker: "Murad", line: "I'm used to the job now. The hardest part was getting used to speaking English all day." },
    ],
    focus: ["Are you used to the cold", "I'm getting used to it", "You were never used to eating", "Now I'm used to it", "getting used to speaking"],
  },
  review: [
    { id: "d25-r01", type: "choice", prompt: "Choose the correct sentence.", options: ["I'm used to drive on the right.", "I'm used to driving on the right.", "I used to driving on the right."], answer: 1, explanation: "be used to + **-ing**.", skill: "form" },
    { id: "d25-r02", type: "fill", prompt: "Complete (be).", sentence: "We ___ used to big cities — we grew up in a village.", accept: ["aren't", "are not", "'re not"], traps: [{ text: "didn't", feedback: "Be used to → negative with be: aren't." }], explanation: "Negative state → **aren't used to**.", skill: "negatives" },
    { id: "d25-r03", type: "transform", prompt: "Use get used to.", source: "The new phone feels strange, but slowly it's becoming normal.", instruction: "Start with: I'm getting", accept: ["I'm getting used to the new phone.", "I am getting used to the new phone.", "I'm getting used to my new phone."], explanation: "Process → **getting used to** + noun.", skill: "form" },
    { id: "d25-r04", type: "order", prompt: "Put the words in order.", tiles: ["He", "isn't", "used", "to", "the", "noise."], explanation: "be used to + noun.", skill: "word-order" },
    { id: "d25-r05", type: "correct", prompt: "Fix the mistake.", wrong: "She is getting used to wake up early.", accept: ["She is getting used to waking up early.", "She's getting used to waking up early."], explanation: "get used to + **-ing**.", skill: "form" },
  ],
};

export default day25;
