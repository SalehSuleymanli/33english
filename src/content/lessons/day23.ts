import type { Lesson } from "../types";

const day23: Lesson = {
  day: 23,
  stage: "communication",
  title: "What if…? My dream is to…",
  objective: "Ask imaginary and worried what-if questions, and talk about dreams with my dream is to, I'd love to and I dream of.",
  builds_on: "Day 22 gave you the imaginary form: if + past, would + verb. What if uses exactly that form as a question. My dream is to adds to + verb to Frame 2 (subject + be). Section 19 of your notes.",
  outcome: "Talk about your dreams and imagine 'what would happen if…' in a conversation.",
  minutes: 20,
  explanation: [
    "**What if + past … ?** asks about an imaginary situation: **What if** I **told** you I **was** a teacher? What **would** you **do**? The past form means 'imagine' — just like in the second conditional.",
    "**What if + present … ?** is a real worry or a real possibility: **What if** the shop **is** closed? (= Maybe the shop is closed. What will we do then?)",
    "**What if we + past?** is also a soft suggestion: **What if we went** to the cinema tonight? (= Let's go… — but softer.)",
    "**My dream is to + verb**: My dream is **to understand** you. With an ability, use **to be able to**: My dream is **to be able to** understand you. Never: my dream is understand.",
    "Other ways to talk about dreams: **I'd love to** + verb (I'd love to live in Japan), **I dream of** + verb-**ing** (I dream of opening a café), **My dream job is** + noun (My dream job is a pilot).",
  ],
  patterns: [
    {
      name: "What if (imaginary)",
      slots: [
        { label: "What if", role: "question", text: "What if" },
        { label: "subject", role: "subject", text: "I" },
        { label: "past", role: "verb", text: "told" },
        { label: "rest", role: "object", text: "you the truth?" },
      ],
    },
    {
      name: "My dream is to…",
      slots: [
        { label: "Subject", role: "subject", text: "My dream" },
        { label: "be", role: "be", text: "is" },
        { label: "to + verb", role: "verb", text: "to open" },
        { label: "object", role: "object", text: "a café" },
      ],
    },
  ],
  examples: [
    { en: "What if I told you I was a teacher? What would you do?", note: "Original notes, corrected: **told … was a** teacher (imaginary → past)." },
    { en: "What if it rains tomorrow?", note: "Real worry → **present**: What if it **rains**?" },
    { en: "What if we went to the beach this weekend?", note: "Soft suggestion: **What if we** + past." },
    { en: "What would happen if everyone spoke the same language?", note: "Imaginary question with **would** + **if** + past." },
    { en: "My dream is to understand you.", note: "**My dream is to** + verb (original notes)." },
    { en: "My dream is to be able to understand you.", note: "Ability → **to be able to** + verb (Day 8)." },
    { en: "I'd love to work abroad one day.", note: "**I'd love to** + verb = I would really like to." },
    { en: "She dreams of opening her own bakery.", note: "**dream of** + verb-**ing**." },
  ],
  forms: [
    { label: "What if (imaginary)", positive: "What if you won a million dollars?", negative: "What if you didn't have to work?", question: "What would you do if you won?" },
    { label: "Dreams", positive: "My dream is to travel around the world.", negative: "My dream isn't to be rich — it's to be happy.", question: "What is your dream?" },
  ],
  mistakes: [
    { wrong: "My dream is open a café.", right: "My dream is to open a café.", why: "**My dream is to** + verb." },
    { wrong: "What if I tell you I am teacher?", right: "What if I told you I was a teacher?", why: "Imaginary → **past**; jobs need **a**." },
    { wrong: "I dream of to travel.", right: "I dream of travelling.", why: "After **of** use verb-**ing**." },
    { wrong: "My dream is to can speak English.", right: "My dream is to be able to speak English.", why: "No to + can → **to be able to**." },
    { wrong: "What if will the shop be closed?", right: "What if the shop is closed?", why: "After **what if**, statement word order — no will for a real worry." },
  ],
  guided: {
    goal: "Build: What if we moved to another city?",
    steps: [
      { label: "Question words", role: "question", options: ["What if", "What did", "If what"], answer: 0, why: "An imaginary idea or suggestion starts with **What if**." },
      { label: "Subject", role: "subject", options: ["we", "us", "our"], answer: 0, why: "Subject pronoun: **we**." },
      { label: "Verb (imaginary → past)", role: "verb", options: ["move", "moved", "will move"], answer: 1, why: "Imaginary suggestion → **past**: moved." },
      { label: "Rest", role: "object", options: ["to another city?", "another city to?", "in another city to?"], answer: 0, why: "move **to** a place." },
    ],
    result: "What if we moved to another city?",
  },
  practice: [
    { id: "d23-p01", type: "choice", prompt: "Which one is a real worry?", options: ["What if the train is late?", "What if I was a bird?", "What if we lived on the Moon?"], answer: 0, explanation: "Real possibility → **present**: What if the train **is** late?", skill: "meaning" },
    { id: "d23-p02", type: "choice", prompt: "Choose the correct sentence.", options: ["My dream is travel the world.", "My dream is to travel the world.", "My dream is travelling to the world."], answer: 1, explanation: "**My dream is to** + verb.", skill: "form" },
    { id: "d23-p03", type: "fill", prompt: "Complete (tell — imaginary).", sentence: "What if I ___ you a secret?", accept: ["told"], traps: [{ text: "tell", feedback: "Imaginary → past: told." }, { text: "will tell", feedback: "No will after what if: told." }], explanation: "Imaginary → **past**.", skill: "tense" },
    { id: "d23-p04", type: "fill", prompt: "Complete with one word.", sentence: "She dreams ___ becoming a doctor.", accept: ["of"], traps: [{ text: "to", feedback: "dream **of** + -ing." }, { text: "about", feedback: "Dream about is possible, but here we practise dream of." }], explanation: "**dream of** + verb-ing.", skill: "form" },
    { id: "d23-p05", type: "transform", prompt: "Make it a soft suggestion.", source: "Let's order pizza tonight.", instruction: "Start with: What if we", accept: ["What if we ordered pizza tonight?", "What if we ordered pizza tonight"], explanation: "**What if we** + past = soft suggestion.", skill: "form" },
    { id: "d23-p06", type: "transform", prompt: "Say your dream.", source: "I want to speak five languages one day.", instruction: "Start with: My dream is", accept: ["My dream is to speak five languages.", "My dream is to speak five languages one day.", "My dream is to be able to speak five languages.", "My dream is to be able to speak five languages one day."], explanation: "**My dream is to** + verb.", skill: "form" },
    { id: "d23-p07", type: "order", prompt: "Put the words in order.", tiles: ["What", "would", "you", "do", "if", "you", "won?"], explanation: "What would you do + if + past?", skill: "word-order" },
    { id: "d23-p08", type: "correct", prompt: "Fix the mistake.", wrong: "My dream is to can fly a plane.", accept: ["My dream is to be able to fly a plane.", "My dream is to fly a plane."], explanation: "No to + can → **to be able to**.", skill: "form" },
    { id: "d23-p09", type: "correct", prompt: "Fix the mistake.", wrong: "I'd love travel to Japan.", accept: ["I'd love to travel to Japan.", "I would love to travel to Japan."], explanation: "**I'd love to** + verb.", skill: "form" },
    { id: "d23-p10", type: "listen", prompt: "Listen and type.", audioText: "What if I told you I was a teacher?", accept: ["What if I told you I was a teacher?", "What if I told you I were a teacher?"], explanation: "Imaginary question (original notes).", skill: "listening" },
    { id: "d23-p11", type: "speak", prompt: "Answer: What is your dream?", target: "My dream is to be able to speak English fluently.", explanation: "**My dream is to be able to** + verb.", skill: "speaking" },
    { id: "d23-p12", type: "translate", from: "az", prompt: "Translate into English.", source: "Mənim arzum səni başa düşməkdir.", accept: ["My dream is to understand you.", "My dream is to understand you"], explanation: "'arzum … başa düşməkdir' → **My dream is to understand** (original notes).", skill: "writing" },
  ],
  vocabulary: [
    { term: "What if…?", meaning: "imagine that… / maybe… — what then?", example: "What if we missed the last bus?" },
    { term: "my dream is to…", meaning: "the thing I want most is to…", example: "My dream is to live by the sea." },
    { term: "I'd love to…", meaning: "I would really like to", example: "I'd love to visit Iceland." },
    { term: "dream of + -ing", meaning: "hope very much to do", example: "He dreams of playing for a big club." },
    { term: "dream job", meaning: "the perfect job for you", example: "My dream job is a travel writer." },
    { term: "come true", meaning: "become real", example: "I hope your dream comes true." },
  ],
  dialogue: {
    title: "Dreams",
    setting: "Two friends talk on a long train journey.",
    lines: [
      { speaker: "Nigar", line: "Can I ask you something? What's your dream?" },
      { speaker: "Kamal", line: "My dream is to open a small café by the sea. What about you?" },
      { speaker: "Nigar", line: "My dream is to be able to speak five languages. I dream of working for the UN." },
      { speaker: "Kamal", line: "Nice! But what if you had to choose just one language?" },
      { speaker: "Nigar", line: "Then I'd choose Spanish. What if your café wasn't successful?" },
      { speaker: "Kamal", line: "I'd try again! I'd love to see my dream come true." },
    ],
    focus: ["What's your dream?", "My dream is to", "My dream is to be able to", "I dream of working", "what if you had to", "What if your café wasn't", "I'd love to"],
  },
  review: [
    { id: "d23-r01", type: "choice", prompt: "Which sentence is a soft suggestion?", options: ["What if we tried the new restaurant?", "What if the restaurant is full?", "If we try the restaurant, we'll like it."], answer: 0, explanation: "**What if we** + past = suggestion.", skill: "meaning" },
    { id: "d23-r02", type: "fill", prompt: "Complete (be able to).", sentence: "My dream is ___ play the guitar.", accept: ["to be able to"], traps: [{ text: "to can", feedback: "Can has no to-form → to be able to." }], explanation: "**to be able to** + verb.", skill: "form" },
    { id: "d23-r03", type: "order", prompt: "Put the words in order.", tiles: ["My", "dream", "is", "to", "understand", "you."], explanation: "dream is **to** + verb (original notes).", skill: "word-order" },
    { id: "d23-r04", type: "correct", prompt: "Fix the mistake.", wrong: "What if I tell you I am a doctor?", accept: ["What if I told you I was a doctor?", "What if I told you I were a doctor?"], explanation: "Imaginary → **past**.", skill: "tense" },
    { id: "d23-r05", type: "transform", prompt: "Use dream of.", source: "I want to win the championship.", instruction: "Start with: I dream of", accept: ["I dream of winning the championship.", "I dream of winning the championship"], explanation: "**dream of** + verb-ing.", skill: "form" },
  ],
};

export default day23;
