import type { Lesson } from "../types";

const day28: Lesson = {
  day: 28,
  stage: "communication",
  title: "Either, neither, I'd rather",
  objective: "Use each other, either … or, neither … nor, prefer and would rather.",
  builds_on: "Small pairing words that sit inside the frames you know. Sections 22 and 25 of your notes (headings only in the original; content authored for this course).",
  outcome: "Make choices and state preferences.",
  minutes: 20,
  explanation: [
    "**each other / one another** = a two-way action: They love **each other** (he loves her and she loves him). **One another** means the same and is slightly more formal; some speakers use it for groups of three or more.",
    "**either … or** = one of two options: We can **either** walk **or** take a taxi. **neither … nor** = not one and not the other: **Neither** Ali **nor** Sara came. (Formal; the verb is positive.)",
    "Short answers: **Me neither / Neither do I** (agreeing with a negative): I don't like coffee. — **Neither do I.** And **So do I** for a positive.",
    "**prefer + noun / -ing + to + noun / -ing**: I **prefer** tea **to** coffee. I **prefer** walk**ing to** driv**ing**. Or **prefer to + verb**: I prefer to stay home.",
    "**would rather + base verb (+ than + base verb)**: I**'d rather stay** home **than go** out. Negative: I**'d rather not** say. Asking: **Would you rather** walk or take the bus?",
  ],
  patterns: [
    {
      name: "Would rather",
      slots: [
        { label: "Subject", role: "subject", text: "I" },
        { label: "'d rather", role: "modal", text: "'d rather" },
        { label: "base verb", role: "verb", text: "stay home" },
        { label: "than + base verb", role: "connector", text: "than go out" },
      ],
    },
    {
      name: "Prefer … to …",
      slots: [
        { label: "Subject", role: "subject", text: "I" },
        { label: "prefer", role: "verb", text: "prefer" },
        { label: "A", role: "object", text: "tea" },
        { label: "to", role: "connector", text: "to" },
        { label: "B", role: "object", text: "coffee" },
      ],
    },
  ],
  examples: [
    { en: "They help each other with homework.", note: "Two-way action → **each other**." },
    { en: "The team members respect one another.", note: "**one another** — same meaning, slightly formal." },
    { en: "You can either call me or send an email.", note: "**either … or** = one of two." },
    { en: "Neither my brother nor my sister lives here.", note: "**neither … nor** = not A and not B." },
    { en: "I don't eat meat. — Neither do I.", note: "Agreeing with a negative." },
    { en: "I prefer trains to planes.", note: "**prefer** A **to** B." },
    { en: "I'd rather walk than take the bus.", note: "**would rather** + base verb + **than** + base verb." },
    { en: "I'd rather not talk about it.", note: "**would rather not** = polite refusal." },
  ],
  forms: [
    { label: "Would rather", positive: "I'd rather stay.", negative: "I'd rather not stay.", question: "Would you rather stay or go?" },
    { label: "Prefer", positive: "She prefers tea.", negative: "She doesn't prefer tea.", question: "Do you prefer tea or coffee?" },
  ],
  mistakes: [
    { wrong: "Ali and Sara love themselves. They're getting married!", right: "Ali and Sara love each other. They're getting married!", why: "A two-way feeling → **each other**. Themselves = each one loves himself or herself." },
    { wrong: "I'd rather to stay home.", right: "I'd rather stay home.", why: "would rather + **base verb** (no to)." },
    { wrong: "I prefer tea than coffee.", right: "I prefer tea to coffee.", why: "prefer A **to** B." },
    { wrong: "Neither Ali nor Sara didn't come.", right: "Neither Ali nor Sara came.", why: "Neither is already negative." },
    { wrong: "I don't like it. — Me too.", right: "I don't like it. — Me neither.", why: "Agreeing with a negative → **me neither / neither do I**." },
  ],
  guided: {
    goal: "Build: I'd rather cook at home than eat out.",
    steps: [
      { label: "Preference", role: "modal", options: ["I'd rather", "I'd prefer", "I rather"], answer: 0, why: "**I'd rather** + base verb." },
      { label: "Base verb", role: "verb", options: ["cook at home", "to cook at home", "cooking at home"], answer: 0, why: "No to after would rather." },
      { label: "Comparison", role: "connector", options: ["than", "to", "then"], answer: 0, why: "would rather … **than**." },
      { label: "Second option", role: "verb", options: ["eat out.", "eating out.", "to eat out."], answer: 0, why: "Base verb again." },
    ],
    result: "I'd rather cook at home than eat out.",
  },
  practice: [
    { id: "d28-p01", type: "choice", prompt: "Choose the correct sentence.", options: ["We text each other every day.", "We text ourselves every day.", "We text us every day."], answer: 0, explanation: "Two-way → **each other**.", skill: "vocabulary" },
    { id: "d28-p02", type: "choice", prompt: "'I can't swim.' You can't either. You say:", options: ["Me too.", "Neither can I.", "So can I."], answer: 1, explanation: "Agreeing with a negative → **Neither can I**.", skill: "meaning" },
    { id: "d28-p03", type: "fill", prompt: "Complete with to or than.", sentence: "I prefer summer ___ winter.", accept: ["to"], traps: [{ text: "than", feedback: "prefer A to B." }], explanation: "prefer A **to** B.", skill: "form" },
    { id: "d28-p04", type: "fill", prompt: "Complete with to or than.", sentence: "I'd rather walk ___ wait for the bus.", accept: ["than"], traps: [{ text: "to", feedback: "would rather A than B." }], explanation: "would rather A **than** B.", skill: "form" },
    { id: "d28-p05", type: "transform", prompt: "Combine with either … or.", source: "We can meet on Monday. We can meet on Tuesday.", instruction: "Start with: We can meet", accept: ["We can meet either on Monday or on Tuesday.", "We can meet on either Monday or Tuesday.", "We can either meet on Monday or on Tuesday.", "We can meet either on Monday or Tuesday."], explanation: "**either** A **or** B.", skill: "form" },
    { id: "d28-p06", type: "transform", prompt: "Combine with neither … nor.", source: "Tofig didn't call. Ahmad didn't call.", instruction: "Start with: Neither", accept: ["Neither Tofig nor Ahmad called."], explanation: "**Neither** A **nor** B + positive verb.", skill: "form" },
    { id: "d28-p07", type: "order", prompt: "Put the words in order.", tiles: ["I'd", "rather", "not", "talk", "about", "it."], explanation: "**would rather not** + verb.", skill: "word-order" },
    { id: "d28-p08", type: "correct", prompt: "Fix the mistake.", wrong: "I'd rather to go by train.", accept: ["I'd rather go by train.", "I would rather go by train."], explanation: "No **to**.", skill: "form" },
    { id: "d28-p09", type: "correct", prompt: "Fix the mistake.", wrong: "She prefers reading than watching TV.", accept: ["She prefers reading to watching TV."], explanation: "prefer A **to** B.", skill: "form" },
    { id: "d28-p10", type: "listen", prompt: "Listen and type.", audioText: "Would you rather live by the sea or in the mountains?", accept: ["Would you rather live by the sea or in the mountains?"], explanation: "A classic conversation question.", skill: "listening" },
    { id: "d28-p11", type: "speak", prompt: "Answer: Would you rather work from home or in an office?", target: "I'd rather work from home, but I prefer meeting people in person.", explanation: "would rather + prefer together.", skill: "speaking" },
  ],
  vocabulary: [
    { term: "either / neither (alone)", meaning: "one of two / not one of two", example: "Which one? — Either is fine." },
    { term: "Me neither.", meaning: "agreeing with a negative (informal)", example: "I'm not hungry. — Me neither." },
    { term: "So do I.", meaning: "agreeing with a positive", example: "I love this song. — So do I." },
    { term: "I don't mind.", meaning: "both options are OK", example: "Tea or coffee? — I don't mind." },
    { term: "It's up to you.", meaning: "you choose", example: "Pizza or sushi? It's up to you." },
    { term: "on second thought", meaning: "after thinking again", example: "On second thought, I'd rather stay." },
  ],
  dialogue: {
    title: "Planning the weekend",
    setting: "A couple decides what to do on Saturday.",
    lines: [
      { speaker: "Eli", line: "We can either go hiking or see a film. Which would you rather do?" },
      { speaker: "Nora", line: "I'd rather go hiking than sit in a cinema all afternoon." },
      { speaker: "Eli", line: "Really? I don't like hiking in the cold." },
      { speaker: "Nora", line: "Neither do I, but the forecast says it'll be warm." },
      { speaker: "Eli", line: "OK. I prefer short walks to long ones, though." },
      { speaker: "Nora", line: "Fine — a short walk, then a film. We'll both be happy, and we won't argue with each other!" },
    ],
    focus: ["either go hiking or see a film", "Which would you rather do?", "I'd rather go hiking than", "Neither do I", "I prefer short walks to long ones", "with each other"],
  },
  review: [
    { id: "d28-r01", type: "choice", prompt: "Choose the correct sentence.", options: ["I prefer coffee than tea.", "I prefer coffee to tea.", "I prefer coffee for tea."], answer: 1, explanation: "prefer A **to** B.", skill: "form" },
    { id: "d28-r02", type: "fill", prompt: "Complete.", sentence: "___ my phone nor my laptop is working.", accept: ["Neither"], explanation: "**Neither** … nor.", skill: "form" },
    { id: "d28-r03", type: "transform", prompt: "Rewrite with would rather.", source: "I prefer to stay in tonight.", instruction: "Start with: I'd rather", accept: ["I'd rather stay in tonight.", "I would rather stay in tonight."], explanation: "**would rather** + base verb.", skill: "form" },
    { id: "d28-r04", type: "order", prompt: "Put the words in order.", tiles: ["They", "don't", "talk", "to", "each", "other."], explanation: "**each other** at the end.", skill: "word-order" },
    { id: "d28-r05", type: "correct", prompt: "Fix the mistake.", wrong: "I don't like horror films. — Me too.", accept: ["I don't like horror films. — Me neither.", "I don't like horror films. — Neither do I."], explanation: "Negative → **Me neither**.", skill: "meaning" },
  ],
};

export default day28;
