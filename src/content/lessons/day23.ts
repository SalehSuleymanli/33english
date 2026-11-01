import type { Lesson } from "../types";

const day23: Lesson = {
  day: 23,
  stage: "communication",
  frame: "states",
  title: "As good as, the difference",
  objective: "Use as … as, not as … as, and ask what the difference is.",
  builds_on: "Day 22 showed differences with -er / more. Today you show equality — and learn to ask about differences and give opinions. Sections 9 and 16 of your notes.",
  outcome: "Express and support an opinion.",
  minutes: 20,
  explanation: [
    "**as + adjective + as** = equal: He is **as smart as** Tofig. The second part can be a person, a thing or a clause: He's **as smart as Tofig thinks**.",
    "**not as … as** = less: The bus is**n't as fast as** the train (= the train is faster). This is often softer and more polite than a comparative.",
    "Make it more precise with **just** (exactly), **almost / nearly**, or **twice / three times**: It's **twice as expensive as** the other one.",
    "To ask about differences: **What's the difference between** A **and** B? / **What makes** A **different**? (Notice: what makes **him** different — object pronoun.)",
    "To give opinions: **I think / I believe / In my opinion** + sentence. Support them with **because**: I think the train is better **because** it's as fast as the plane in total.",
  ],
  patterns: [
    {
      name: "As … as",
      slots: [
        { label: "Subject", role: "subject", text: "He" },
        { label: "be", role: "be", text: "is" },
        { label: "as + adjective + as", role: "complement", text: "as smart as" },
        { label: "other", role: "object", text: "Tofig" },
      ],
    },
    {
      name: "The difference",
      slots: [
        { label: "What is", role: "question", text: "What's" },
        { label: "the difference between", role: "complement", text: "the difference between" },
        { label: "A and B", role: "object", text: "Tofig and Ahmad?" },
      ],
    },
  ],
  examples: [
    { en: "He is as smart as Tofig.", note: "Equal (original notes)." },
    { en: "It is as expensive as a pen.", note: "Original notes, corrected: **a** pen." },
    { en: "The film wasn't as good as the book.", note: "**not as … as** = less good." },
    { en: "My brother is almost as tall as my father.", note: "**almost** = nearly equal." },
    { en: "This flat is twice as big as our old one.", note: "**twice as … as**." },
    { en: "What's the difference between Tofig and Ahmad?", note: "Original notes: asking about the difference." },
    { en: "What makes Ahmad different?", note: "**What makes** + object + adjective." },
    { en: "In my opinion, living alone isn't as easy as it looks.", note: "Opinion + not as … as + clause." },
  ],
  forms: [
    { label: "As … as", positive: "It's as cheap as the other one.", negative: "It isn't as cheap as the other one.", question: "Is it as cheap as the other one?" },
  ],
  mistakes: [
    { wrong: "He is as tall like his brother.", right: "He is as tall as his brother.", why: "**as … as** (not like)." },
    { wrong: "It's as expensive as pen.", right: "It's as expensive as a pen.", why: "Singular countable noun needs **a**." },
    { wrong: "She isn't as older as me.", right: "She isn't as old as me.", why: "Base adjective between as … as (not -er)." },
    { wrong: "What is the difference of A and B?", right: "What is the difference between A and B?", why: "Difference **between** A **and** B." },
    { wrong: "What makes he different?", right: "What makes him different?", why: "Object pronoun after makes: **him**." },
  ],
  guided: {
    goal: "Build: The bus isn't as fast as the train.",
    steps: [
      { label: "Subject", role: "subject", options: ["The bus", "Bus", "The bus it"], answer: 0, why: "One subject with **the**." },
      { label: "Be + not", role: "be", options: ["isn't", "doesn't", "not"], answer: 0, why: "Frame 2 negative → **isn't**." },
      { label: "As … as", role: "complement", options: ["as fast as", "as faster as", "so fast than"], answer: 0, why: "**as** + base adjective + **as**." },
      { label: "Other thing", role: "object", options: ["the train.", "train.", "than the train."], answer: 0, why: "The other thing after as." },
    ],
    result: "The bus isn't as fast as the train.",
  },
  practice: [
    { id: "d23-p01", type: "choice", prompt: "Choose the correct sentence.", options: ["My car is as old like yours.", "My car is as old as yours.", "My car is as older as yours."], answer: 1, explanation: "**as old as**.", frame: "states", skill: "form" },
    { id: "d23-p02", type: "choice", prompt: "'The book isn't as long as the film.' Which is longer?", options: ["The book", "The film", "They're the same."], answer: 1, explanation: "not as long as → the film is **longer**.", frame: "states", skill: "meaning" },
    { id: "d23-p03", type: "fill", prompt: "Complete.", sentence: "What's the difference ___ a lake and a pond?", accept: ["between"], traps: [{ text: "of", feedback: "difference between A and B." }], explanation: "difference **between**.", frame: "states", skill: "form" },
    { id: "d23-p04", type: "fill", prompt: "Complete with a pronoun.", sentence: "What makes ___ so special? (she)", accept: ["her"], traps: [{ text: "she", feedback: "After makes, use the object pronoun: her." }], explanation: "Object → **her**.", frame: "states", skill: "form" },
    { id: "d23-p05", type: "transform", prompt: "Rewrite with not as … as.", source: "London is more expensive than Baku.", instruction: "Start with: Baku isn't", accept: ["Baku isn't as expensive as London.", "Baku is not as expensive as London."], explanation: "**isn't as expensive as**.", frame: "states", skill: "form" },
    { id: "d23-p06", type: "transform", prompt: "Make it twice as.", source: "This bag costs $100. That bag costs $50.", instruction: "Start with: This bag is", accept: ["This bag is twice as expensive as that bag.", "This bag is twice as expensive as that one."], explanation: "**twice as** + adjective + **as**.", frame: "states", skill: "form" },
    { id: "d23-p07", type: "order", prompt: "Put the words in order.", tiles: ["He", "is", "as", "smart", "as", "Tofig", "thinks."], explanation: "as … as + clause (original notes).", frame: "states", skill: "word-order" },
    { id: "d23-p08", type: "correct", prompt: "Fix the mistake.", wrong: "This phone is as good like the expensive one.", accept: ["This phone is as good as the expensive one."], explanation: "**as good as**.", frame: "states", skill: "form" },
    { id: "d23-p09", type: "correct", prompt: "Fix the mistake.", wrong: "My English isn't as better as yours.", accept: ["My English isn't as good as yours.", "My English is not as good as yours."], explanation: "Base adjective: **as good as**.", frame: "states", skill: "form" },
    { id: "d23-p10", type: "listen", prompt: "Listen and type.", audioText: "In my opinion, the second option isn't as risky as the first.", accept: ["In my opinion, the second option isn't as risky as the first.", "In my opinion the second option isn't as risky as the first.", "In my opinion, the second option is not as risky as the first."], explanation: "Opinion + not as … as.", frame: "states", skill: "listening" },
    { id: "d23-p11", type: "speak", prompt: "Give an opinion.", target: "I think working from home is just as productive as working in an office.", explanation: "Opinion + just as … as.", frame: "states", skill: "speaking" },
  ],
  vocabulary: [
    { term: "In my opinion…", meaning: "I think…", example: "In my opinion, it's too expensive." },
    { term: "just as … as", meaning: "exactly as", example: "It's just as good as the original." },
    { term: "not nearly as … as", meaning: "much less", example: "It's not nearly as cold as last year." },
    { term: "similar to", meaning: "almost the same as", example: "Your idea is similar to mine." },
    { term: "on the other hand", meaning: "introduces the opposite view", example: "It's fast. On the other hand, it's expensive." },
    { term: "It depends.", meaning: "The answer changes with the situation.", example: "Which is better? — It depends on your budget." },
  ],
  dialogue: {
    title: "Which city should I live in?",
    setting: "Nigar is choosing between two cities for her studies. She asks her cousin.",
    lines: [
      { speaker: "Nigar", line: "What's the difference between Istanbul and Ankara for students?" },
      { speaker: "Elvin", line: "Ankara isn't as exciting as Istanbul, but it's much quieter." },
      { speaker: "Nigar", line: "Is it as expensive as Istanbul?" },
      { speaker: "Elvin", line: "No, not nearly as expensive. Rent is almost half." },
      { speaker: "Nigar", line: "So what makes Istanbul different?" },
      { speaker: "Elvin", line: "The energy! In my opinion, no city is as interesting as Istanbul. But it depends on what you want." },
    ],
    focus: ["What's the difference between", "isn't as exciting as", "as expensive as", "what makes Istanbul different", "In my opinion", "it depends"],
  },
  review: [
    { id: "d23-r01", type: "choice", prompt: "Choose the correct question.", options: ["What is the difference between tea and coffee?", "What is the difference of tea and coffee?", "What difference tea and coffee?"], answer: 0, explanation: "difference **between** A **and** B.", frame: "states", skill: "questions" },
    { id: "d23-r02", type: "fill", prompt: "Complete.", sentence: "My new job isn't ___ stressful as my old one.", accept: ["as"], explanation: "not **as** … as.", frame: "states", skill: "form" },
    { id: "d23-r03", type: "transform", prompt: "Rewrite with as … as.", source: "Ali and Sara are the same height.", instruction: "Start with: Ali is", accept: ["Ali is as tall as Sara.", "Ali's as tall as Sara."], explanation: "**as tall as**.", frame: "states", skill: "form" },
    { id: "d23-r04", type: "order", prompt: "Put the words in order.", tiles: ["What", "makes", "him", "different?"], explanation: "What makes + object + adjective?", frame: "states", skill: "word-order" },
    { id: "d23-r05", type: "correct", prompt: "Fix the mistake.", wrong: "It's as cheap as bottle of water.", accept: ["It's as cheap as a bottle of water.", "It is as cheap as a bottle of water."], explanation: "**a** bottle.", frame: "states", skill: "form" },
  ],
};

export default day23;
