import type { Lesson } from "../types";

const day30: Lesson = {
  day: 30,
  stage: "communication",
  title: "She said that…",
  objective: "Report statements, questions and requests.",
  builds_on: "Reported speech moves frames one step into the past and changes questions back to statement order (Day 13). Requests use ask / tell + person + to (Day 14). Section 31 of your notes (heading only; content authored for this course).",
  outcome: "Pass on messages accurately.",
  minutes: 25,
  explanation: [
    "To report what someone said, use **say** (no person) or **tell + person**: She **said (that)** she was tired. She **told me (that)** she was tired.",
    "When the reporting verb is past, the tense usually moves **one step back**: am / is → **was**, do → **did**, will → **would**, can → **could**, have done → **had done**, did → **had done** (or stays did in speech).",
    "Change pronouns and time words to fit the new situation: 'I'll call you **tomorrow**' → He said **he** would call **me** **the next day**.",
    "Reported **questions** use statement order and no question mark: 'Where do you live?' → She asked me **where I lived**. Yes/no questions use **if / whether**: He asked **if I was** ready.",
    "Reported **requests and orders**: **ask / tell + person + (not) to + verb**: 'Please wait.' → She asked me **to wait**. 'Don't touch it.' → He told us **not to touch** it. If the statement is still true now, you can keep the present: She said she **lives** in Rome.",
  ],
  patterns: [
    {
      name: "Reported statement",
      slots: [
        { label: "Subject", role: "subject", text: "She" },
        { label: "said / told me", role: "verb", text: "told me" },
        { label: "(that)", role: "connector", text: "(that)", optional: true },
        { label: "sentence (one step back)", role: "aux", text: "she was tired" },
      ],
    },
    {
      name: "Reported question",
      slots: [
        { label: "Subject", role: "subject", text: "He" },
        { label: "asked", role: "verb", text: "asked" },
        { label: "if / question word", role: "connector", text: "where" },
        { label: "statement order", role: "aux", text: "I lived" },
      ],
    },
  ],
  examples: [
    { en: "'I'm tired.' → She said she was tired.", note: "am → **was**." },
    { en: "'I'll help you.' → He said he would help me.", note: "will → **would**; you → me." },
    { en: "'I can't come.' → Ali told me he couldn't come.", note: "can't → **couldn't**; **told me**." },
    { en: "'Where do you work?' → She asked me where I worked.", note: "Question → **statement order**." },
    { en: "'Are you ready?' → He asked if I was ready.", note: "Yes/no → **if / whether**." },
    { en: "'Please close the door.' → She asked me to close the door.", note: "Request → **asked + person + to**." },
    { en: "'Don't be late.' → My boss told us not to be late.", note: "Negative order → **not to**." },
    { en: "'I've lost my keys.' → He said he had lost his keys.", note: "have lost → **had lost**." },
  ],
  forms: [
    { label: "Say vs tell", positive: "He said (that) he was busy.", negative: "He said he wasn't busy.", question: "What did he say?" },
    { label: "Tell + person", positive: "He told me (that) he was busy.", negative: "He told me he wasn't busy.", question: "What did he tell you?" },
  ],
  mistakes: [
    { wrong: "She said me that she was tired.", right: "She told me that she was tired. / She said that she was tired.", why: "**say** (no person) or **tell + person**." },
    { wrong: "He asked me where did I live.", right: "He asked me where I lived.", why: "Reported questions use **statement order**." },
    { wrong: "She asked me do I like jazz.", right: "She asked me if I liked jazz.", why: "Yes/no → **if / whether** + statement order." },
    { wrong: "He told me don't worry.", right: "He told me not to worry.", why: "Orders → **not to** + verb." },
    { wrong: "She said she will call tomorrow.", right: "She said she would call the next day.", why: "Past reporting → **would**; adjust time words." },
  ],
  guided: {
    goal: "Report: 'Do you need help?' → She asked if I needed help.",
    steps: [
      { label: "Subject + reporting verb", role: "subject", options: ["She asked", "She said", "She told"], answer: 0, why: "Questions → **asked**." },
      { label: "Yes/no question word", role: "connector", options: ["if", "that", "do"], answer: 0, why: "Yes/no → **if** (or whether)." },
      { label: "Subject (changed)", role: "subject", options: ["I", "you", "she"], answer: 0, why: "'you' (me) → **I** from my point of view." },
      { label: "Verb (one step back)", role: "verb", options: ["needed help.", "need help.", "did need help?"], answer: 0, why: "need → **needed**, statement order." },
    ],
    result: "She asked if I needed help.",
  },
  practice: [
    { id: "d30-p01", type: "choice", prompt: "Choose the correct sentence.", options: ["He said me he was busy.", "He told me he was busy.", "He told he was busy."], answer: 1, explanation: "**told + person**.", skill: "form" },
    { id: "d30-p02", type: "choice", prompt: "'Where is the station?' → He asked…", options: ["where is the station.", "where the station was.", "where was the station?"], answer: 1, explanation: "Statement order: **where the station was**.", skill: "word-order" },
    { id: "d30-p03", type: "fill", prompt: "Complete with said or told.", sentence: "She ___ us that the meeting was cancelled.", accept: ["told"], traps: [{ text: "said", feedback: "With a person (us) → told." }], explanation: "**told** + person.", skill: "vocabulary" },
    { id: "d30-p04", type: "fill", prompt: "Complete (will → ?).", sentence: "'I will be there.' → He said he ___ be there.", accept: ["would"], traps: [{ text: "will", feedback: "Past reporting → would." }], explanation: "will → **would**.", skill: "tense" },
    { id: "d30-p05", type: "transform", prompt: "Report the statement.", source: "Sara: 'I'm moving to Canada.'", instruction: "Start with: Sara said", accept: ["Sara said she was moving to Canada.", "Sara said that she was moving to Canada.", "Sara said she is moving to Canada.", "Sara said that she is moving to Canada."], explanation: "am moving → **was moving** (present also OK if still true).", skill: "tense" },
    { id: "d30-p06", type: "transform", prompt: "Report the question.", source: "Teacher: 'Have you finished?'", instruction: "Start with: The teacher asked us", accept: ["The teacher asked us if we had finished.", "The teacher asked us whether we had finished."], explanation: "**if** + statement order + **had finished**.", skill: "questions" },
    { id: "d30-p07", type: "transform", prompt: "Report the order.", source: "Guard: 'Don't take photos.'", instruction: "Start with: The guard told us", accept: ["The guard told us not to take photos.", "The guard told us not to take pictures."], explanation: "**not to** + verb.", skill: "negatives" },
    { id: "d30-p08", type: "order", prompt: "Put the words in order.", tiles: ["She", "asked", "me", "where", "I", "worked."], explanation: "Statement order after where.", skill: "word-order" },
    { id: "d30-p09", type: "correct", prompt: "Fix the mistake.", wrong: "He asked me what time is it.", accept: ["He asked me what time it was."], explanation: "Statement order + past: **what time it was**.", skill: "word-order" },
    { id: "d30-p10", type: "listen", prompt: "Listen and type.", audioText: "She told me she couldn't come because she was ill.", accept: ["She told me she couldn't come because she was ill.", "She told me that she couldn't come because she was ill."], explanation: "can't → couldn't; am → was.", skill: "listening" },
    { id: "d30-p11", type: "speak", prompt: "Pass on a message.", target: "Your manager called. She said the meeting had been moved to Thursday.", explanation: "has been moved → had been moved.", skill: "speaking" },
  ],
  vocabulary: [
    { term: "pass on a message", meaning: "tell someone what another person said", example: "Can you pass on a message to Ali?" },
    { term: "explain that", meaning: "say why / how", example: "She explained that the bus was late." },
    { term: "promise to", meaning: "say you will definitely do something", example: "He promised to call." },
    { term: "the next day / the day before", meaning: "time words in reported speech", example: "He said he'd come the next day." },
    { term: "apparently", meaning: "according to what I've heard", example: "Apparently, the shop is closing." },
    { term: "mention", meaning: "say briefly", example: "She mentioned that she was tired." },
  ],
  dialogue: {
    title: "A message from the office",
    setting: "Tural missed an important call. His colleague tells him what happened.",
    lines: [
      { speaker: "Tural", line: "Did anyone call while I was out?" },
      { speaker: "Elmira", line: "Yes, Mr. Novak called. He said he had sent the contract." },
      { speaker: "Tural", line: "Great. Did he say anything else?" },
      { speaker: "Elmira", line: "He asked if you could check it today. And he told me not to forget the deadline." },
      { speaker: "Tural", line: "Did he say when the deadline was?" },
      { speaker: "Elmira", line: "He said it was Friday. Apparently, the client wants to sign next week." },
    ],
    focus: ["He said he had sent", "He asked if you could check", "he told me not to forget", "when the deadline was", "Apparently"],
  },
  review: [
    { id: "d30-r01", type: "choice", prompt: "'Can you help me?' → She asked me…", options: ["can I help her.", "if I could help her.", "if could I help her."], answer: 1, explanation: "**if** + statement order + could.", skill: "questions" },
    { id: "d30-r02", type: "fill", prompt: "Complete.", sentence: "'Wait here.' → He told me ___ wait there.", accept: ["to"], explanation: "told + person + **to**.", skill: "form" },
    { id: "d30-r03", type: "transform", prompt: "Report the statement.", source: "Omar: 'I don't like the plan.'", instruction: "Start with: Omar said", accept: ["Omar said he didn't like the plan.", "Omar said that he didn't like the plan."], explanation: "don't → **didn't**.", skill: "tense" },
    { id: "d30-r04", type: "order", prompt: "Put the words in order.", tiles: ["He", "asked", "if", "I", "was", "ready."], explanation: "asked + **if** + statement.", skill: "word-order" },
    { id: "d30-r05", type: "correct", prompt: "Fix the mistake.", wrong: "She said me that she was busy.", accept: ["She told me that she was busy.", "She told me she was busy.", "She said that she was busy.", "She said she was busy."], explanation: "**said** (no me) or **told me**.", skill: "vocabulary" },
  ],
};

export default day30;
