import type { Lesson } from "../types";

const day32: Lesson = {
  day: 32,
  stage: "application",
  title: "Exam-ready English",
  objective: "Use the six frames to structure IELTS-style speaking answers and short essays.",
  builds_on: "Exams reward range: using many frames and linking them. Everything from Days 1–31 becomes a toolkit. Section 33 of your notes (heading only; content authored for this course).",
  outcome: "Answer exam-style speaking questions with confidence.",
  minutes: 30,
  explanation: [
    "Exam speaking tests like IELTS score you on **fluency and coherence, vocabulary, grammatical range and accuracy, and pronunciation**. This lesson prepares you for the format — it is not an official IELTS assessment.",
    "**Show range by moving between frames**. One answer can use existence (There are many parks…), states (It's quite busy…), actions (I usually go…), modals (You can…), possession (It has…) and passive (It was built…).",
    "**Extend every answer** with a simple formula: **Answer → Reason → Example → (Contrast)**. 'Yes, I do (answer), because it helps me relax (reason). For example, I go running every Saturday (example). Although it's hard in winter… (contrast).'",
    "For **Part 2** (a 1–2 minute talk), use the cue card as your structure and the story tenses from Day 31. For **Part 3** (discussion), give opinions with In my opinion…, compare with Day 22–23 forms, and speculate with might / could / would.",
    "For **writing**, organize ideas: introduction (rephrase the question + your view), two body paragraphs (one idea each, with an example), conclusion. Use connectors: Firstly, Moreover, However, On the other hand, In conclusion.",
  ],
  patterns: [
    {
      name: "Extended answer",
      slots: [
        { label: "Answer", role: "subject", text: "Yes, I do," },
        { label: "Reason", role: "connector", text: "because it helps me relax." },
        { label: "Example", role: "verb", text: "For example, I run every Saturday." },
        { label: "Contrast", role: "other", text: "Although it's hard in winter…", optional: true },
      ],
    },
    {
      name: "Opinion + speculation",
      slots: [
        { label: "Opinion", role: "connector", text: "In my opinion," },
        { label: "Statement", role: "subject", text: "cities will become greener," },
        { label: "Speculation", role: "modal", text: "although it might take decades." },
      ],
    },
  ],
  examples: [
    { en: "There are several parks near my home, and the biggest one was built in the 1960s.", note: "Frames 1, 2 (superlative) and 6 in one sentence." },
    { en: "I've lived in my hometown since I was born, so I know it very well.", note: "Perfect + result with so." },
    { en: "If I could change one thing, I'd add more public transport.", note: "Second conditional = range." },
    { en: "It's not as crowded as the capital, but it's much more expensive than it used to be.", note: "as … as, comparative, used to." },
    { en: "I'd like to talk about a teacher who had a big influence on me.", note: "Part 2 opening + relative clause." },
    { en: "On the one hand, technology saves time. On the other hand, it can make us less patient.", note: "Balanced Part 3 answer." },
    { en: "In conclusion, although online learning has disadvantages, its benefits are greater.", note: "Essay conclusion." },
    { en: "That's an interesting question — I've never really thought about it before.", note: "Buying time naturally." },
  ],
  forms: [],
  mistakes: [
    { wrong: "Q: Do you like reading? A: Yes.", right: "Yes, I do — especially novels, because they help me switch off. I've just finished a great one.", why: "Always **extend**: answer + reason + example." },
    { wrong: "In my opinion, I think that…", right: "In my opinion, … / I think that…", why: "Choose one opinion phrase — both together repeat the idea." },
    { wrong: "Nowadays, technology is very very important.", right: "Nowadays, technology plays an essential role in our lives.", why: "Show vocabulary range instead of repeating very." },
    { wrong: "Firstly… Secondly… Thirdly… Fourthly…", right: "Firstly… Moreover… However… In conclusion…", why: "Vary connectors; use them to show logic, not just numbers." },
    { wrong: "I am agree with this opinion.", right: "I agree with this opinion.", why: "Frame mixing still costs marks at any level (Day 3!)." },
  ],
  guided: {
    goal: "Build an extended answer: I enjoy cooking because it helps me relax, for example on Sunday evenings.",
    steps: [
      { label: "Answer", role: "subject", options: ["I enjoy cooking", "Yes.", "I am enjoy cooking"], answer: 0, why: "A full answer, not just yes; enjoy + **-ing**." },
      { label: "Reason", role: "connector", options: ["because it helps me relax,", "because of it helps me relax,", "so it helps me relax,"], answer: 0, why: "**because** + sentence." },
      { label: "Example", role: "verb", options: ["for example on Sunday evenings.", "for example in Sunday evenings.", "like example on Sunday evenings."], answer: 0, why: "**for example** + **on** + day." },
    ],
    result: "I enjoy cooking because it helps me relax, for example on Sunday evenings.",
  },
  practice: [
    { id: "d32-p01", type: "choice", prompt: "Which answer would score higher in a speaking test? 'Do you work or study?'", options: ["I work.", "I work as an engineer at a construction company. I've been there for three years, and I really enjoy it because every project is different.", "Work. Engineer."], answer: 1, explanation: "Extended, accurate and varied (as + job, perfect, because).", skill: "speaking" },
    { id: "d32-p02", type: "choice", prompt: "Which connector introduces a contrast?", options: ["Moreover", "However", "For example"], answer: 1, explanation: "**However** = contrast.", skill: "vocabulary" },
    { id: "d32-p03", type: "fill", prompt: "Complete the essay sentence.", sentence: "___ conclusion, the advantages outweigh the disadvantages.", accept: ["In"], explanation: "**In conclusion**.", skill: "writing" },
    { id: "d32-p04", type: "fill", prompt: "Complete with a speculation word.", sentence: "In the future, people ___ work only four days a week.", accept: ["might", "may", "could", "will"], explanation: "Speculation → **might / may / could** (will = more certain).", skill: "meaning" },
    { id: "d32-p05", type: "choice", prompt: "Q: Do you like your hometown? Which answer extends best?", options: ["Yes, I do.", "Yes, I do, because it's quiet and friendly. For example, everyone in my street knows each other.", "Yes, very very much like it."], answer: 1, explanation: "**Answer → reason → example.** Now say your own version aloud.", skill: "speaking" },
    { id: "d32-p06", type: "transform", prompt: "Make the sentence more formal for an essay.", source: "Lots of people think that phones are bad for kids.", instruction: "Start with: Many people", accept: ["Many people believe that phones are harmful for children.", "Many people believe that phones are harmful to children.", "Many people think that phones are bad for children.", "Many people believe that mobile phones are harmful to children."], explanation: "lots of → many; kids → children; bad → harmful.", skill: "writing" },
    { id: "d32-p07", type: "order", prompt: "Put the essay sentence in order.", tiles: ["On", "the", "other", "hand,", "it", "can", "be", "expensive."], explanation: "**On the other hand** + contrast.", skill: "writing" },
    { id: "d32-p08", type: "correct", prompt: "Fix the mistake.", wrong: "In my opinion, I think online classes are useful.", accept: ["In my opinion, online classes are useful.", "I think online classes are useful."], explanation: "One opinion phrase.", skill: "writing" },
    {
      id: "d32-p09",
      type: "reading",
      prompt: "Read the model Part 2 answer and answer.",
      passage: "I'd like to talk about a place I visited that I really enjoyed: Sheki, a small city in the north of Azerbaijan. I went there two years ago with my family. There are beautiful mountains all around it, and the old caravanserai was built hundreds of years ago. What I liked most was the food — we ate piti, a soup that is cooked in small clay pots. If I had more time, I'd go back every year. It's not as famous as Baku, but in my opinion it's even more charming.",
      questions: [
        { q: "How many different frames does the speaker use?", options: ["Only one", "Several — existence, passive, actions, conditionals and comparisons", "Two"], answer: 1, why: "There are… / was built / we ate / If I had… I'd / not as famous as." },
        { q: "What structure does the speaker use for an imaginary situation?", options: ["First conditional", "Second conditional", "Past perfect"], answer: 1, why: "If I had more time, I'd go back." },
      ],
      explanation: "Range of structures is a key part of the grammar score.",
      skill: "reading",
    },
    { id: "d32-p10", type: "listen", prompt: "Listen and type.", audioText: "That's an interesting question. I've never really thought about it before.", accept: ["That's an interesting question. I've never really thought about it before.", "That is an interesting question. I have never really thought about it before."], explanation: "A natural way to buy thinking time.", skill: "listening" },
    { id: "d32-p11", type: "speak", prompt: "Answer: Describe your hometown.", target: "There are a lot of old buildings in my hometown, and it's much quieter than the capital. I've lived there all my life.", explanation: "Three frames, a comparison and the perfect.", skill: "speaking" },
  ],
  vocabulary: [
    { term: "On the one hand… on the other hand…", meaning: "presents two sides", example: "On the one hand it's cheap; on the other hand it's slow." },
    { term: "play an important role in", meaning: "be important for", example: "Technology plays an important role in education." },
    { term: "outweigh", meaning: "be greater than", example: "The benefits outweigh the risks." },
    { term: "to a certain extent", meaning: "partly", example: "I agree to a certain extent." },
    { term: "nowadays", meaning: "in the present time", example: "Nowadays, most people work online." },
    { term: "Let me think…", meaning: "buys time naturally", example: "Let me think… I'd say it was my teacher." },
  ],
  dialogue: {
    title: "Mock speaking test",
    setting: "An examiner asks Part 1 and Part 3 questions.",
    lines: [
      { speaker: "Examiner", line: "Let's talk about your hometown. Where is it?" },
      { speaker: "Candidate", line: "I'm from Ganja. It's the second-largest city in Azerbaijan, and it's famous for its parks." },
      { speaker: "Examiner", line: "Has it changed much in recent years?" },
      { speaker: "Candidate", line: "Yes, quite a lot. Many new buildings have been built, and it's not as quiet as it used to be." },
      { speaker: "Examiner", line: "Do you think cities will become more crowded in the future?" },
      { speaker: "Candidate", line: "That's an interesting question. On the one hand, more people are moving to cities. On the other hand, if remote work grows, people might move back to smaller towns." },
    ],
    focus: ["the second-largest city", "have been built", "not as quiet as it used to be", "That's an interesting question", "On the one hand", "On the other hand", "people might move back"],
  },
  review: [
    { id: "d32-r01", type: "choice", prompt: "Which is the best Part 1 answer to 'Do you like music?'", options: ["Yes.", "Yes, I love it, especially jazz. I've been playing the saxophone since I was twelve.", "Music yes very like."], answer: 1, explanation: "Answer + detail + perfect continuous.", skill: "speaking" },
    { id: "d32-r02", type: "fill", prompt: "Complete.", sentence: "On the ___ hand, it's cheaper to live in a small town.", accept: ["one", "other"], explanation: "On the **one** hand / on the **other** hand.", skill: "writing" },
    { id: "d32-r03", type: "transform", prompt: "Rewrite more formally.", source: "Kids should do more sport.", instruction: "Start with: Children", accept: ["Children should do more sport.", "Children should do more exercise.", "Children should take part in more sport.", "Children should play more sport."], explanation: "kids → **children** in essays.", skill: "writing" },
    { id: "d32-r04", type: "order", prompt: "Put the words in order.", tiles: ["The", "benefits", "outweigh", "the", "drawbacks."], explanation: "outweigh = are greater than.", skill: "writing" },
    { id: "d32-r05", type: "correct", prompt: "Fix the mistake.", wrong: "I am agree with the statement.", accept: ["I agree with the statement."], explanation: "agree is a verb — no am.", skill: "form" },
  ],
};

export default day32;
