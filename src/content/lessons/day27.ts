import type { Lesson } from "../types";

const day27: Lesson = {
  day: 27,
  stage: "communication",
  title: "Although, despite, whether",
  objective: "Contrast and qualify ideas with although, even though, despite, in spite of, whether and not only … but also.",
  builds_on: "These words join two frames — or a frame and a noun — to show contrast or condition. Sections 23, 24 and 26 of your notes (headings only in the original; content authored for this course).",
  outcome: "Disagree politely and give balanced views.",
  minutes: 25,
  explanation: [
    "**although / even though + full sentence** = contrast: **Although** it was raining, we went out. **Even though** is stronger: **Even though** I studied, I failed.",
    "**despite / in spite of + noun or -ing** (no full sentence): **Despite** the rain, we went out. **In spite of** feeling tired, she finished. To use a sentence, add **the fact that**: Despite **the fact that** it was raining…",
    "**whether** = if, when there are two possibilities: I don't know **whether** he'll come (**or not**). **Whether** you like it **or not**, the rules are the rules. Use **whether** (not if) after prepositions: It depends **on whether**…",
    "**according to** = as reported by: **According to** the forecast, it will snow.",
    "**not only … but also** adds a stronger second point: She's **not only** smart **but also** kind. Useful opinion openers: **The thing is…** / **The main question is…** / **I see your point, but…**",
  ],
  patterns: [
    {
      name: "Although + sentence",
      slots: [
        { label: "Although", role: "connector", text: "Although" },
        { label: "sentence", role: "verb", text: "it was expensive," },
        { label: "main sentence", role: "subject", text: "we bought it" },
      ],
    },
    {
      name: "Despite + noun / -ing",
      slots: [
        { label: "Despite", role: "connector", text: "Despite" },
        { label: "noun / -ing", role: "object", text: "the price," },
        { label: "main sentence", role: "subject", text: "we bought it" },
      ],
    },
  ],
  examples: [
    { en: "Although the hotel was old, it was very clean.", note: "**Although** + subject + verb." },
    { en: "Even though she was ill, she came to work.", note: "**Even though** = stronger contrast." },
    { en: "Despite the traffic, we arrived on time.", note: "**Despite** + noun." },
    { en: "In spite of studying hard, he didn't pass.", note: "**In spite of** + -ing." },
    { en: "I'm not sure whether I should accept the offer.", note: "**whether** = if (two options)." },
    { en: "According to the news, the bridge is closed.", note: "**According to** + source." },
    { en: "The plan is not only cheaper but also faster.", note: "**not only … but also**." },
    { en: "I see your point, but the thing is, we don't have the budget.", note: "Polite disagreement." },
  ],
  forms: [],
  mistakes: [
    { wrong: "Despite it was raining, we went out.", right: "Although it was raining, we went out.", why: "Despite + **noun / -ing**. For a sentence, use **although**." },
    { wrong: "Although the rain, we went out.", right: "Despite the rain, we went out.", why: "Although + **sentence**; despite + noun." },
    { wrong: "In spite the rain…", right: "In spite of the rain…", why: "**In spite of** (three words)." },
    { wrong: "Although it was late, but we continued.", right: "Although it was late, we continued.", why: "Use although **or** but, not both." },
    { wrong: "According to me, it's wrong.", right: "In my opinion, it's wrong.", why: "According to = what others say. For yourself: **in my opinion**." },
  ],
  guided: {
    goal: "Build: Despite the bad weather, the event was a success.",
    steps: [
      { label: "Contrast word", role: "connector", options: ["Although", "Despite", "Because"], answer: 1, why: "Followed by a noun phrase → **Despite**." },
      { label: "Noun phrase", role: "object", options: ["the bad weather,", "the weather was bad,", "of the bad weather,"], answer: 0, why: "Despite + **noun** (no of)." },
      { label: "Main sentence", role: "subject", options: ["the event was a success.", "but the event was a success.", "the event a success."], answer: 0, why: "No but — despite already shows contrast." },
    ],
    result: "Despite the bad weather, the event was a success.",
  },
  practice: [
    { id: "d27-p01", type: "choice", prompt: "Choose the correct sentence.", options: ["Despite he was tired, he kept working.", "Although he was tired, he kept working.", "Although being tired, he kept working."], answer: 1, explanation: "**Although** + sentence.", skill: "form" },
    { id: "d27-p02", type: "choice", prompt: "Choose the correct sentence.", options: ["In spite of the noise, I slept well.", "In spite the noise, I slept well.", "Although the noise, I slept well."], answer: 0, explanation: "**In spite of** + noun.", skill: "form" },
    { id: "d27-p03", type: "fill", prompt: "Complete with whether or although.", sentence: "I can't decide ___ to take the job or stay here.", accept: ["whether"], explanation: "Two options → **whether**.", skill: "form" },
    { id: "d27-p04", type: "fill", prompt: "Complete.", sentence: "___ to the report, prices rose by 5%.", accept: ["According"], explanation: "Source → **According to**.", skill: "vocabulary" },
    { id: "d27-p05", type: "transform", prompt: "Rewrite with despite.", source: "Although it was expensive, we bought it.", instruction: "Start with: Despite", accept: ["Despite the price, we bought it.", "Despite the high price, we bought it.", "Despite it being expensive, we bought it.", "Despite being expensive, we bought it.", "Despite the fact that it was expensive, we bought it."], explanation: "Despite + **noun / -ing**.", skill: "form" },
    { id: "d27-p06", type: "transform", prompt: "Combine with not only … but also.", source: "The app is free. It is easy to use.", instruction: "Start with: The app is not only", accept: ["The app is not only free but also easy to use.", "The app is not only free, but also easy to use."], explanation: "**not only** A **but also** B.", skill: "form" },
    { id: "d27-p07", type: "order", prompt: "Put the words in order.", tiles: ["Even", "though", "I", "was", "tired,", "I", "finished", "it."], explanation: "**Even though** + sentence, main sentence.", skill: "word-order" },
    { id: "d27-p08", type: "correct", prompt: "Fix the mistake.", wrong: "Although she was nervous, but she gave a great speech.", accept: ["Although she was nervous, she gave a great speech.", "She was nervous, but she gave a great speech."], explanation: "Use **although** or **but** — not both.", skill: "form" },
    { id: "d27-p09", type: "correct", prompt: "Fix the mistake.", wrong: "Despite of the delay, we enjoyed the trip.", accept: ["Despite the delay, we enjoyed the trip.", "In spite of the delay, we enjoyed the trip."], explanation: "**Despite** (no of) or **in spite of**.", skill: "form" },
    { id: "d27-p10", type: "listen", prompt: "Listen and type.", audioText: "I see your point, but the main question is whether we can afford it.", accept: ["I see your point, but the main question is whether we can afford it.", "I see your point but the main question is whether we can afford it."], explanation: "Polite disagreement + whether.", skill: "listening" },
    { id: "d27-p11", type: "speak", prompt: "Disagree politely.", target: "I see what you mean, but I'm not sure it's the best option.", explanation: "Acknowledge first, then disagree.", skill: "speaking" },
  ],
  vocabulary: [
    { term: "I see your point, but…", meaning: "polite disagreement", example: "I see your point, but it's too risky." },
    { term: "The thing is…", meaning: "introduces the real problem (informal)", example: "The thing is, I don't have time." },
    { term: "The main question is…", meaning: "focuses the discussion", example: "The main question is who will pay." },
    { term: "Even so,…", meaning: "despite that", example: "It's expensive. Even so, I want it." },
    { term: "whether … or not", meaning: "in either case", example: "Whether you agree or not, we have to decide." },
    { term: "to be fair,…", meaning: "considering the other side", example: "To be fair, he did apologize." },
  ],
  dialogue: {
    title: "A team decision",
    setting: "Two colleagues disagree about how to launch a product.",
    lines: [
      { speaker: "Aidan", line: "I think we should launch next month. According to our survey, customers are ready." },
      { speaker: "Fidan", line: "I see your point, but the thing is, the app still has bugs." },
      { speaker: "Aidan", line: "Although there are some bugs, they're small." },
      { speaker: "Fidan", line: "Even so, the main question is whether users will trust us after a bad first week." },
      { speaker: "Aidan", line: "Fair enough. Despite the risk, I still think speed matters." },
      { speaker: "Fidan", line: "Then let's do a small launch. It's not only safer but also cheaper." },
    ],
    focus: ["According to", "I see your point, but", "the thing is", "Although there are", "whether users will trust us", "Despite the risk", "not only safer but also cheaper"],
  },
  review: [
    { id: "d27-r01", type: "choice", prompt: "Which word goes before 'the storm'?", options: ["Although", "Despite", "Even though"], answer: 1, explanation: "Noun → **Despite**.", skill: "form" },
    { id: "d27-r02", type: "fill", prompt: "Complete.", sentence: "___ though it was late, the shop was still open.", accept: ["Even"], explanation: "**Even though**.", skill: "form" },
    { id: "d27-r03", type: "transform", prompt: "Rewrite with although.", source: "Despite the cold, the children played outside.", instruction: "Start with: Although", accept: ["Although it was cold, the children played outside."], explanation: "Although + **sentence**.", skill: "form" },
    { id: "d27-r04", type: "order", prompt: "Put the words in order.", tiles: ["It", "depends", "on", "whether", "it", "rains."], explanation: "After on → **whether**.", skill: "word-order" },
    { id: "d27-r05", type: "correct", prompt: "Fix the mistake.", wrong: "Despite it was hot, he wore a jacket.", accept: ["Although it was hot, he wore a jacket.", "Even though it was hot, he wore a jacket.", "Despite the heat, he wore a jacket."], explanation: "Sentence → **although**; noun → despite.", skill: "form" },
  ],
};

export default day27;
