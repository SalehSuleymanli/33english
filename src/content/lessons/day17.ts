import type { Lesson } from "../types";

const day17: Lesson = {
  day: 17,
  stage: "combination",
  title: "It's important to listen",
  objective: "Use it + adjective + to, enough and too, and know how / what to.",
  builds_on: "These patterns attach a to + verb to frames you know: Frame 2 (It is important to…), Frame 5 (have enough courage to…) and Frame 3 (know how to…). From section 10 of your original notes.",
  outcome: "Give instructions and tips naturally.",
  minutes: 20,
  explanation: [
    "**It is + adjective + to + verb** is how English gives opinions about actions: **It is important to** sleep well. **It's easy to** get lost here. You can also use **-ing** as the subject: **Sleeping well is important.**",
    "**Enough** = as much as needed. It goes **before a noun** (enough money, enough courage) and **after an adjective** (old enough, fast enough). Then **to + verb**: He doesn't have **enough courage to do** this. She's **old enough to drive**.",
    "**Too** + adjective = more than is good: It's **too cold to swim**. (Too ≠ very: very cold is just a description; too cold means it's a problem.)",
    "**Know how to / know what to / know where to** + verb: I **know how to** play football. I don't **know what to** say.",
    "With a full clause, use **what / how** + subject + verb: I don't know **how he does** it. I'll do **what he says**. **Whatever** = anything at all: I'll do **whatever he says**.",
  ],
  patterns: [
    {
      name: "It + adjective + to",
      slots: [
        { label: "It", role: "subject", text: "It" },
        { label: "be", role: "be", text: "is" },
        { label: "adjective", role: "complement", text: "important" },
        { label: "to + verb", role: "verb", text: "to listen" },
      ],
    },
    {
      name: "Enough … to",
      slots: [
        { label: "Subject", role: "subject", text: "She" },
        { label: "be", role: "be", text: "is" },
        { label: "adjective + enough", role: "complement", text: "old enough" },
        { label: "to + verb", role: "verb", text: "to drive" },
      ],
    },
    {
      name: "Know how / what to",
      slots: [
        { label: "Subject", role: "subject", text: "I" },
        { label: "know", role: "verb", text: "know" },
        { label: "how / what", role: "connector", text: "how" },
        { label: "to + verb", role: "verb", text: "to fix it" },
      ],
    },
  ],
  examples: [
    { en: "It is important to do this. / Doing this is important.", note: "Two ways to say the same thing (original notes)." },
    { en: "It's not easy to find a flat in this city.", note: "**It's not easy to** + verb." },
    { en: "You have to be smart to do this.", note: "**to** + verb = purpose or requirement." },
    { en: "He doesn't have enough courage to do this.", note: "**enough** + noun + **to**." },
    { en: "The coffee is too hot to drink.", note: "**too** + adjective + **to** = it's a problem." },
    { en: "I know what to do. I know how to do this.", note: "**know what / how to** + verb." },
    { en: "I don't know how he does it.", note: "With a subject: **how he does** (statement order!)." },
    { en: "I will do whatever he says.", note: "**Whatever** = anything at all." },
  ],
  forms: [
    { label: "It + adjective + to", positive: "It's easy to learn.", negative: "It isn't easy to learn.", question: "Is it easy to learn?" },
    { label: "Know how to", positive: "I know how to swim.", negative: "I don't know how to swim.", question: "Do you know how to swim?" },
  ],
  mistakes: [
    { wrong: "Is important to sleep well.", right: "It is important to sleep well.", why: "English needs a subject: **It** is important…" },
    { wrong: "She isn't enough old to drive.", right: "She isn't old enough to drive.", why: "**Adjective + enough**." },
    { wrong: "I don't know how does he do it.", right: "I don't know how he does it.", why: "Inside a sentence, use statement order: **how he does**." },
    { wrong: "It's very hot to drink.", right: "It's too hot to drink.", why: "A problem that stops an action → **too**." },
    { wrong: "I know to swim.", right: "I know how to swim.", why: "Skills → **know how to**." },
  ],
  guided: {
    goal: "Build: It's not easy to find a good doctor.",
    steps: [
      { label: "Start", role: "subject", options: ["It's", "Is", "There"], answer: 0, why: "**It** + be — English needs a subject." },
      { label: "Negative + adjective", role: "complement", options: ["not easy", "no easy", "not easily"], answer: 0, why: "Be + **not** + adjective." },
      { label: "to + verb", role: "verb", options: ["find", "to find", "finding"], answer: 1, why: "It's + adjective + **to** + verb." },
      { label: "Object", role: "object", options: ["a good doctor.", "good doctor.", "a doctor good."], answer: 0, why: "Article + adjective + noun." },
    ],
    result: "It's not easy to find a good doctor.",
  },
  practice: [
    { id: "d17-p01", type: "choice", prompt: "Choose the correct sentence.", options: ["Is necessary to book.", "It is necessary to book.", "It is necessary book."], answer: 1, explanation: "**It is** + adjective + **to** + verb.", skill: "form" },
    { id: "d17-p02", type: "choice", prompt: "The bag weighs 30 kg. I can't carry it.", options: ["It's very heavy to carry.", "It's too heavy to carry.", "It's enough heavy to carry."], answer: 1, explanation: "A problem → **too**.", skill: "meaning" },
    { id: "d17-p03", type: "choice", prompt: "Choose the correct sentence.", options: ["We don't have chairs enough for everyone.", "We don't have enough chairs for everyone.", "We don't have enough of chairs for everyone."], answer: 1, explanation: "**enough** goes before a noun: enough chairs.", skill: "form" },
    { id: "d17-p04", type: "fill", prompt: "Complete.", sentence: "I don't know ___ to say. I'm speechless.", accept: ["what"], explanation: "**know what to** + verb.", skill: "form" },
    { id: "d17-p05", type: "transform", prompt: "Rewrite starting with It.", source: "Learning a language takes time.", instruction: "Use: It takes time to…", accept: ["It takes time to learn a language."], explanation: "**It** + verb phrase + **to** + verb.", skill: "form" },
    { id: "d17-p06", type: "transform", prompt: "Combine with enough.", source: "He is tall. He can play basketball.", instruction: "Use: tall enough to", accept: ["He is tall enough to play basketball.", "He's tall enough to play basketball."], explanation: "adjective + **enough to**.", skill: "form" },
    { id: "d17-p07", type: "order", prompt: "Put the words in order.", tiles: ["I", "don't", "know", "how", "he", "does", "it."], explanation: "Inside a sentence: **how he does it** (statement order).", skill: "word-order" },
    { id: "d17-p08", type: "correct", prompt: "Fix the mistake.", wrong: "She isn't enough experienced for this job.", accept: ["She isn't experienced enough for this job.", "She is not experienced enough for this job."], explanation: "**experienced enough**.", skill: "form" },
    { id: "d17-p09", type: "correct", prompt: "Fix the mistake.", wrong: "Can you tell me where is the station?", accept: ["Can you tell me where the station is?"], explanation: "Inside a question: **where the station is**.", skill: "word-order" },
    { id: "d17-p10", type: "listen", prompt: "Listen and type.", audioText: "It's important to drink enough water.", accept: ["It's important to drink enough water.", "It is important to drink enough water."], explanation: "It's important to + verb.", skill: "listening" },
    { id: "d17-p11", type: "speak", prompt: "Give a tip.", target: "It's a good idea to arrive early on the first day.", explanation: "It's a good idea to = friendly advice.", skill: "speaking" },
  ],
  vocabulary: [
    { term: "It's worth + -ing", meaning: "it's good to do", example: "It's worth visiting the old town." },
    { term: "It's a good idea to", meaning: "you should", example: "It's a good idea to book early." },
    { term: "It takes (time) to", meaning: "the time needed", example: "It takes an hour to get there." },
    { term: "whatever", meaning: "anything at all", example: "Order whatever you want." },
    { term: "I have no idea.", meaning: "I don't know at all.", example: "Where is he? — I have no idea." },
    { term: "too … to", meaning: "so much that it's impossible", example: "I'm too tired to cook." },
  ],
  dialogue: {
    title: "Tips for a new runner",
    setting: "Sevda wants to run a 10 km race. She asks her friend, an experienced runner.",
    lines: [
      { speaker: "Sevda", line: "I want to run a 10 km race, but I don't know how to start." },
      { speaker: "Ilkin", line: "It's important to start slowly. Run three times a week, not every day." },
      { speaker: "Sevda", line: "Is it OK to run when it's very hot?" },
      { speaker: "Ilkin", line: "If it's too hot to breathe comfortably, run in the morning instead." },
      { speaker: "Sevda", line: "And how do I know if I'm ready?" },
      { speaker: "Ilkin", line: "When you're fit enough to run 8 km easily, you'll be ready. Just do whatever your body tells you." },
    ],
    focus: ["I don't know how to start", "It's important to start slowly", "too hot to breathe", "fit enough to run", "whatever your body tells you"],
  },
  review: [
    { id: "d17-r01", type: "choice", prompt: "Choose the correct sentence.", options: ["I know how to cook.", "I know cook.", "I know to cooking."], answer: 0, explanation: "**know how to** + verb.", skill: "form" },
    { id: "d17-r02", type: "fill", prompt: "Complete with too or enough.", sentence: "This room is ___ small for a party.", accept: ["too"], traps: [{ text: "enough", feedback: "Enough goes after an adjective (small enough) and means 'sufficient'." }], explanation: "A problem → **too**.", skill: "meaning" },
    { id: "d17-r03", type: "transform", prompt: "Rewrite with It.", source: "Finding parking is difficult here.", instruction: "Start with: It is", accept: ["It is difficult to find parking here.", "It's difficult to find parking here."], explanation: "**It is** difficult **to** find…", skill: "form" },
    { id: "d17-r04", type: "order", prompt: "Put the words in order.", tiles: ["I'll", "do", "whatever", "you", "say."], explanation: "**whatever** + subject + verb.", skill: "word-order" },
    { id: "d17-r05", type: "correct", prompt: "Fix the mistake.", wrong: "Is easy to make mistakes.", accept: ["It is easy to make mistakes.", "It's easy to make mistakes."], explanation: "Add **It**.", skill: "form" },
  ],
};

export default day17;
