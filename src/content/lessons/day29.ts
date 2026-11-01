import type { Lesson } from "../types";

const day29: Lesson = {
  day: 29,
  stage: "communication",
  title: "About to, out of, so, such",
  objective: "Use be about to, key prepositions, as vs like, so vs such, and -ing vs to.",
  builds_on: "Small words that make big differences, from sections 17, 27 and 30 of your notes. They fit inside every frame you know.",
  outcome: "Handle travel situations with precise small words.",
  minutes: 25,
  explanation: [
    "**be about to + verb** = something will happen very soon: I**'m about to** leave. The plane **is about to** take off. (Original notes: I'm about to do the thing you mentioned.)",
    "**out of** = from inside: Take the phone **out of** the bag. **off** = from the surface: Take the phone **off** the table. Opposites: **into** / **onto**.",
    "Prepositions of time: **at** + clock time (at 6), **on** + day/date (on Monday, on 5 May), **in** + month/year/part of day (in June, in 2024, in the morning). Place: **at** a point (at the gate), **in** an area or container (in the city), **on** a surface or line (on the table, on the train).",
    "**like + noun** = similar to: She sings **like** a professional. **as** + role = in that role: She works **as** a nurse. **so + adjective**: It's **so** hot. **such (a) + adjective + noun**: It's **such a** hot day.",
    "Some verbs take **-ing**: enjoy, finish, avoid, mind, keep. Some take **to**: want, decide, hope, plan, need. A few change meaning: **stop smoking** (quit) vs **stop to smoke** (pause in order to smoke).",
  ],
  patterns: [
    {
      name: "Be about to",
      slots: [
        { label: "Subject", role: "subject", text: "The train" },
        { label: "be", role: "be", text: "is" },
        { label: "about to", role: "modal", text: "about to" },
        { label: "base verb", role: "verb", text: "leave" },
      ],
    },
    {
      name: "Such vs so",
      slots: [
        { label: "It's", role: "subject", text: "It's" },
        { label: "such a", role: "other", text: "such a" },
        { label: "adjective + noun", role: "complement", text: "long flight" },
      ],
    },
  ],
  examples: [
    { en: "I'm about to do the thing you mentioned.", note: "Original notes, corrected: **you mentioned**." },
    { en: "Hurry! The doors are about to close.", note: "Very soon → **about to**." },
    { en: "Take the phone out of the bag.", note: "From inside → **out of** (original notes)." },
    { en: "Take the phone off the table.", note: "From a surface → **off**." },
    { en: "My flight leaves at 6:40 on Friday.", note: "**at** + time, **on** + day." },
    { en: "It was such a long queue that we gave up.", note: "**such a** + adjective + noun." },
    { en: "She speaks English like a native speaker.", note: "**like** + noun = similar to." },
    { en: "I really enjoy travelling, but I hate waiting.", note: "enjoy / hate + **-ing**." },
  ],
  forms: [
    { label: "Be about to", positive: "We're about to start.", negative: "We aren't about to give up.", question: "Is the film about to start?" },
  ],
  mistakes: [
    { wrong: "The phone is inside the bag. Take it off the bag.", right: "The phone is inside the bag. Take it out of the bag.", why: "From inside → **out of**. **Off** is for a surface: off the table." },
    { wrong: "The meeting is in Monday at 9.", right: "The meeting is on Monday at 9.", why: "Days → **on**." },
    { wrong: "It's so a beautiful day.", right: "It's such a beautiful day.", why: "**such a** + adjective + noun; **so** + adjective alone." },
    { wrong: "He works like a teacher.", right: "He works as a teacher.", why: "His job → **as**. (Like a teacher = similar to one.)" },
    { wrong: "I enjoy to travel.", right: "I enjoy travelling.", why: "enjoy + **-ing**." },
  ],
  guided: {
    goal: "Build: The plane is about to take off.",
    steps: [
      { label: "Subject", role: "subject", options: ["The plane", "Plane", "The plane it"], answer: 0, why: "One subject." },
      { label: "Be", role: "be", options: ["is", "does", "will"], answer: 0, why: "be about to → **is**." },
      { label: "Very soon", role: "modal", options: ["about to", "about", "going about"], answer: 0, why: "**about to** + base verb." },
      { label: "Verb", role: "verb", options: ["take off.", "taking off.", "took off."], answer: 0, why: "Base verb." },
    ],
    result: "The plane is about to take off.",
  },
  practice: [
    { id: "d29-p01", type: "choice", prompt: "Choose the correct preposition.", options: ["My birthday is in 12 May.", "My birthday is on 12 May.", "My birthday is at 12 May."], answer: 1, explanation: "Dates → **on**.", skill: "vocabulary" },
    { id: "d29-p02", type: "choice", prompt: "Choose the correct sentence.", options: ["It was so a good film.", "It was such a good film.", "It was such good film."], answer: 1, explanation: "**such a** + adjective + noun.", skill: "form" },
    { id: "d29-p03", type: "fill", prompt: "Complete with out of or off.", sentence: "Please take your shoes ___ the sofa.", accept: ["off"], traps: [{ text: "out of", feedback: "Shoes on the sofa (surface) → off." }], explanation: "From a surface → **off**.", skill: "vocabulary" },
    { id: "d29-p04", type: "fill", prompt: "Complete with as or like.", sentence: "He worked ___ a taxi driver for ten years.", accept: ["as"], traps: [{ text: "like", feedback: "A real job/role → as." }], explanation: "Role → **as**.", skill: "vocabulary" },
    { id: "d29-p05", type: "fill", prompt: "Complete with the correct form of pack.", sentence: "Have you finished ___ yet?", accept: ["packing"], traps: [{ text: "to pack", feedback: "finish + -ing." }], explanation: "finish + **-ing**.", skill: "form" },
    { id: "d29-p06", type: "transform", prompt: "Use be about to.", source: "The shop will close in two minutes.", instruction: "Start with: The shop is", accept: ["The shop is about to close."], explanation: "**is about to** + verb.", skill: "form" },
    { id: "d29-p07", type: "order", prompt: "Put the words in order.", tiles: ["Take", "your", "laptop", "out", "of", "the", "bag."], explanation: "**out of** + container.", skill: "word-order" },
    { id: "d29-p08", type: "correct", prompt: "Fix the mistake.", wrong: "We arrived to the airport at 5.", accept: ["We arrived at the airport at 5.", "We got to the airport at 5."], explanation: "arrive **at** a place (in a city/country).", skill: "vocabulary" },
    { id: "d29-p09", type: "correct", prompt: "Fix the mistake.", wrong: "I decided going to bed early.", accept: ["I decided to go to bed early."], explanation: "decide + **to**.", skill: "form" },
    { id: "d29-p10", type: "listen", prompt: "Listen and type.", audioText: "Boarding is about to begin at gate twelve.", accept: ["Boarding is about to begin at gate twelve.", "Boarding is about to begin at gate 12."], explanation: "Typical airport announcement.", skill: "listening" },
    { id: "d29-p11", type: "speak", prompt: "At the security check.", target: "Do I need to take my laptop out of the bag?", explanation: "out of + container.", skill: "speaking" },
  ],
  vocabulary: [
    { term: "check in", meaning: "register at the airport or hotel", example: "We need to check in two hours early." },
    { term: "take off / land", meaning: "a plane leaves / arrives at the ground", example: "The plane is about to take off." },
    { term: "on board", meaning: "on the plane, train or ship", example: "Food is served on board." },
    { term: "be delayed", meaning: "happen later than planned", example: "Our flight is delayed by an hour." },
    { term: "carry-on / hand luggage", meaning: "a small bag you take on the plane", example: "Is this OK as hand luggage?" },
    { term: "get on / get off", meaning: "enter / leave a bus, train or plane", example: "Get off at the third stop." },
  ],
  dialogue: {
    title: "At the gate",
    setting: "Kamila is running late for her flight.",
    lines: [
      { speaker: "Kamila", line: "Excuse me, is the flight to Rome about to leave?" },
      { speaker: "Agent", line: "Boarding is about to close. Can I see your boarding pass?" },
      { speaker: "Kamila", line: "Sorry, it's in my bag. Let me take it out of the pocket. It's been such a long morning!" },
      { speaker: "Agent", line: "No problem. Your seat is 14C, on the left." },
      { speaker: "Kamila", line: "Do I have to take my coat off before I get on?" },
      { speaker: "Agent", line: "No, you can keep it. Just put it in the overhead locker. Enjoy flying with us!" },
    ],
    focus: ["is the flight to Rome about to leave?", "about to close", "take it out of", "such a long morning", "take my coat off", "Enjoy flying"],
  },
  review: [
    { id: "d29-r01", type: "choice", prompt: "Choose the correct sentence.", options: ["The film is about start.", "The film is about to start.", "The film is about starting."], answer: 1, explanation: "**about to** + base verb.", skill: "form" },
    { id: "d29-r02", type: "fill", prompt: "Complete with at, on or in.", sentence: "I usually go running ___ the morning.", accept: ["in"], explanation: "Part of day → **in** the morning.", skill: "vocabulary" },
    { id: "d29-r03", type: "transform", prompt: "Rewrite with such.", source: "The day was so beautiful.", instruction: "Start with: It was such", accept: ["It was such a beautiful day."], explanation: "**such a** + adjective + noun.", skill: "form" },
    { id: "d29-r04", type: "order", prompt: "Put the words in order.", tiles: ["I", "enjoy", "meeting", "new", "people."], explanation: "enjoy + **-ing**.", skill: "word-order" },
    { id: "d29-r05", type: "correct", prompt: "Fix the mistake.", wrong: "She sings as an angel.", accept: ["She sings like an angel."], explanation: "Similar to → **like**.", skill: "vocabulary" },
  ],
};

export default day29;
