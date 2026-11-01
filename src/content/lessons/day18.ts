import type { Lesson } from "../types";

const day18: Lesson = {
  day: 18,
  stage: "combination",
  title: "Used to, be used to, get used to",
  objective: "Talk about past habits and about getting accustomed to something.",
  builds_on: "Three expressions that look alike but belong to different frames: used to + verb (Frame 3, past), be used to (Frame 2, a state) and get used to (Frame 3, a change). From sections 20–21 of your notes.",
  outcome: "Describe how your life has changed.",
  minutes: 25,
  explanation: [
    "**used to + base verb** = something that was true or happened regularly in the past, but **not now**: I **used to play** tennis (I don't anymore). I **used to have** blonde hair.",
    "Questions and negatives use **did** and **use to** (no d): **Did** you **use to** live here? I **didn't use to** like coffee.",
    "**be used to + noun / -ing** = be accustomed to something; it feels normal (a **state**, Frame 2): I'**m used to** playing football. She **isn't used to** the cold.",
    "**get used to + noun / -ing** = become accustomed — a **process**, a change (Frame 3): I'**m getting used to** my new job. It took me a year to **get used to** driving on the left.",
    "Notice: after be / get used to, the **to** is a preposition, so the verb takes **-ing**: used to **working**, not used to work.",
  ],
  patterns: [
    {
      name: "Past habit",
      slots: [
        { label: "Subject", role: "subject", text: "I" },
        { label: "used to", role: "modal", text: "used to" },
        { label: "base verb", role: "verb", text: "speak" },
        { label: "object", role: "object", text: "Spanish" },
      ],
    },
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
        { label: "noun / -ing", role: "verb", text: "the weather" },
      ],
    },
  ],
  examples: [
    { en: "I used to play tennis.", note: "I played regularly in the past; I don't now." },
    { en: "I used to speak Spanish.", note: "Past ability or habit that's gone." },
    { en: "I used to have blonde hair.", note: "A past state that's changed." },
    { en: "Did you use to live in Ganja?", note: "Question: **did** + **use to** (no d)." },
    { en: "I'm used to playing football.", note: "It's normal for me → be used to + **-ing**." },
    { en: "She isn't used to the cold yet.", note: "Be used to + **noun**." },
    { en: "I'm getting used to playing football.", note: "It's becoming normal → **getting used to**." },
    { en: "You'll get used to it.", note: "A very common, encouraging phrase." },
  ],
  forms: [
    { label: "Used to (past)", positive: "He used to smoke.", negative: "He didn't use to smoke.", question: "Did he use to smoke?", shortAnswers: "Yes, he did. / No, he didn't." },
    { label: "Be used to (state)", positive: "I'm used to the noise.", negative: "I'm not used to the noise.", question: "Are you used to the noise?", shortAnswers: "Yes, I am. / No, I'm not." },
  ],
  mistakes: [
    { wrong: "I use to play tennis when I was young.", right: "I used to play tennis when I was young.", why: "Positive past → **used to** (with d)." },
    { wrong: "Did you used to work here?", right: "Did you use to work here?", why: "After did → **use to** (no d)." },
    { wrong: "I'm used to work at night.", right: "I'm used to working at night.", why: "Be used to + **-ing**." },
    { wrong: "I used to living alone now.", right: "I'm used to living alone now.", why: "For a present state, you need **be**: I'm used to." },
    { wrong: "I am used to play tennis when I was young.", right: "I used to play tennis when I was young.", why: "A past habit → **used to + base verb**, with no be." },
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
    { id: "d18-p01", type: "choice", prompt: "Which means 'I did this in the past, but not now'?", options: ["I'm used to swimming.", "I used to swim.", "I'm getting used to swimming."], answer: 1, explanation: "**used to + base verb** = past habit.", skill: "meaning" },
    { id: "d18-p02", type: "choice", prompt: "You moved to London. Driving on the left feels strange, but it's becoming easier.", options: ["I used to drive on the left.", "I'm getting used to driving on the left.", "I'm used to drive on the left."], answer: 1, explanation: "A process → **getting used to + -ing**.", skill: "meaning" },
    { id: "d18-p03", type: "fill", prompt: "Complete with the correct form of use(d) to.", sentence: "Did you ___ have long hair?", accept: ["use to"], traps: [{ text: "used to", feedback: "After did, drop the d: use to." }], explanation: "did + **use to**.", skill: "form" },
    { id: "d18-p04", type: "fill", prompt: "Complete with the -ing form of get up.", sentence: "I'm a baker, so I'm used to ___ at 4 a.m.", accept: ["getting up"], traps: [{ text: "get up", feedback: "Be used to + -ing: getting up." }], explanation: "be used to + **-ing**.", skill: "form" },
    { id: "d18-p05", type: "transform", prompt: "Use used to.", source: "I played the piano as a child, but I don't now.", instruction: "One sentence with used to.", accept: ["I used to play the piano.", "I used to play the piano as a child."], explanation: "**used to** + base verb.", skill: "tense" },
    { id: "d18-p06", type: "transform", prompt: "Make it negative.", source: "We used to eat meat.", instruction: "Use didn't.", accept: ["We didn't use to eat meat.", "We did not use to eat meat."], alternatives: [{ text: "We never used to eat meat.", note: "Also correct and very common." }], explanation: "**didn't use to** + verb.", skill: "negatives" },
    { id: "d18-p07", type: "order", prompt: "Put the words in order.", tiles: ["You'll", "get", "used", "to", "it."], explanation: "Encouraging phrase: **You'll get used to it**.", skill: "word-order" },
    { id: "d18-p08", type: "correct", prompt: "Fix the mistake.", wrong: "I'm used to work long hours.", accept: ["I'm used to working long hours.", "I am used to working long hours."], explanation: "be used to + **working**.", skill: "form" },
    { id: "d18-p09", type: "correct", prompt: "Fix the mistake.", wrong: "When I was a kid, I use to watch cartoons every morning.", accept: ["When I was a kid, I used to watch cartoons every morning.", "When I was a kid I used to watch cartoons every morning."], explanation: "**used to** (with d).", skill: "tense" },
    { id: "d18-p10", type: "listen", prompt: "Listen and type.", audioText: "I didn't use to like coffee, but now I drink it every day.", accept: ["I didn't use to like coffee, but now I drink it every day.", "I did not use to like coffee, but now I drink it every day."], explanation: "Use to / used to sound the same: 'yoost-tuh'.", skill: "listening" },
    { id: "d18-p11", type: "speak", prompt: "Talk about a change in your life.", target: "I used to live with my parents, but now I live alone.", explanation: "Used to + now = clear contrast.", skill: "speaking" },
    { id: "d18-p12", type: "translate", from: "az", prompt: "Translate into English.", source: "Mən əvvəllər tennis oynayırdım.", accept: ["I used to play tennis."], explanation: "'əvvəllər …-ırdım' → **used to** + verb (from the original notes).", skill: "writing" },
  ],
  vocabulary: [
    { term: "not anymore", meaning: "not now (but in the past, yes)", example: "I used to smoke, but not anymore." },
    { term: "these days", meaning: "now, in general", example: "These days I work from home." },
    { term: "take time to get used to", meaning: "need time to adapt", example: "It takes time to get used to a new city." },
    { term: "feel at home", meaning: "feel comfortable", example: "After a month, I started to feel at home." },
    { term: "miss", meaning: "feel sad because something is gone", example: "I miss the food from home." },
    { term: "adapt", meaning: "change to fit a new situation", example: "Children adapt quickly." },
  ],
  dialogue: {
    title: "Life in a new country",
    setting: "Murad moved to Canada a year ago. His friend from home asks how it's going.",
    lines: [
      { speaker: "Anar", line: "So, how's life in Toronto? Are you used to the cold yet?" },
      { speaker: "Murad", line: "Not really! I'm getting used to it, but January was terrible." },
      { speaker: "Anar", line: "You used to complain when it was 10 degrees here!" },
      { speaker: "Murad", line: "I know. And I didn't use to drink tea, but now I drink it all day to stay warm." },
      { speaker: "Anar", line: "What about work?" },
      { speaker: "Murad", line: "I'm used to the job now. The hardest part was getting used to speaking English all day." },
    ],
    focus: ["Are you used to the cold", "I'm getting used to it", "You used to complain", "I didn't use to drink", "getting used to speaking"],
  },
  review: [
    { id: "d18-r01", type: "choice", prompt: "Choose the correct sentence.", options: ["I'm used to drive on the right.", "I'm used to driving on the right.", "I used to driving on the right."], answer: 1, explanation: "be used to + **-ing**.", skill: "form" },
    { id: "d18-r02", type: "fill", prompt: "Complete.", sentence: "She ___ to live in Paris, but now she lives in Rome.", accept: ["used"], traps: [{ text: "use", feedback: "Positive past → used (with d)." }], explanation: "**used to** = past.", skill: "tense" },
    { id: "d18-r03", type: "transform", prompt: "Make it a question.", source: "You used to play an instrument.", instruction: "Use did.", accept: ["Did you use to play an instrument?"], explanation: "**Did** you **use to**…?", skill: "questions" },
    { id: "d18-r04", type: "order", prompt: "Put the words in order.", tiles: ["He", "isn't", "used", "to", "the", "noise."], explanation: "be used to + noun.", skill: "word-order" },
    { id: "d18-r05", type: "correct", prompt: "Fix the mistake.", wrong: "Did she used to work here?", accept: ["Did she use to work here?"], explanation: "After did → **use to**.", skill: "questions" },
  ],
};

export default day18;
