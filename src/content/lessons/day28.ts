import type { Lesson } from "../types";

const day28: Lesson = {
  day: 28,
  stage: "communication",
  title: "At, on, in · as, like · so, such",
  objective: "Choose the right preposition of time and place, tell as from like and so from such, and know which verbs take -ing or to.",
  builds_on: "Small words that sit inside every frame you know. Day 21 gave you out of and off; today covers the rest of sections 27 and 30 of your notes: prepositions, as / like, so / such, and -ing or to.",
  outcome: "Make travel plans and bookings with precise small words.",
  minutes: 25,
  explanation: [
    "Time: **at** + clock time (at 6, at noon, at night), **on** + day or date (on Monday, on 5 May), **in** + month, year, season or part of the day (in June, in 2024, in the morning).",
    "Place: **at** a point (at the gate, at home, at work), **in** an area or container (in Baku, in the room), **on** a surface or line (on the table, on the wall, on the train). **arrive at** a building / **arrive in** a city or country — never arrive to.",
    "**like + noun** = similar to: She sings **like** a professional. **as + role** = in that role, really: She works **as** a nurse.",
    "**so + adjective**: It's **so** hot. **such (a) + adjective + noun**: It's **such a** hot day. Easy test: a noun after it → **such**.",
    "Some verbs take **-ing**: enjoy, finish, avoid, mind, keep. Some take **to**: want, decide, hope, plan, need. After a preposition always **-ing**: good **at** drawing. A few change meaning: **stop smoking** (quit) vs **stop to smoke** (pause in order to smoke).",
  ],
  patterns: [
    {
      name: "Time preposition",
      slots: [
        { label: "Subject + verb", role: "subject", text: "My flight leaves" },
        { label: "at + time", role: "time", text: "at 6:40" },
        { label: "on + day", role: "time", text: "on Friday" },
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
    { en: "My flight leaves at 6:40 on Friday.", note: "**at** + time, **on** + day." },
    { en: "We arrived in Rome in the morning.", note: "City → **arrive in**; part of the day → **in**." },
    { en: "Meet me at the main entrance.", note: "A point → **at**." },
    { en: "It was such a long queue that we gave up.", note: "**such a** + adjective + noun." },
    { en: "The hotel was so expensive!", note: "**so** + adjective alone." },
    { en: "She speaks English like a native speaker.", note: "**like** + noun = similar to." },
    { en: "He worked as a guide for ten years.", note: "A real job → **as**." },
    { en: "I really enjoy travelling, but I hate waiting.", note: "enjoy / hate + **-ing**." },
  ],
  forms: [
    { label: "So / such", positive: "It was so cold. It was such a cold day.", negative: "It wasn't so bad.", question: "Why was it such a long wait?" },
  ],
  mistakes: [
    { wrong: "The meeting is in Monday at 9.", right: "The meeting is on Monday at 9.", why: "Days → **on**." },
    { wrong: "It's so a beautiful day.", right: "It's such a beautiful day.", why: "**such a** + adjective + noun; **so** + adjective alone." },
    { wrong: "He works like a teacher.", right: "He works as a teacher.", why: "His job → **as**. (Like a teacher = similar to one.)" },
    { wrong: "I enjoy to travel.", right: "I enjoy travelling.", why: "enjoy + **-ing**." },
    { wrong: "We arrived to Baku at night.", right: "We arrived in Baku at night.", why: "arrive **in** a city, **at** a building — never arrive to." },
  ],
  guided: {
    goal: "Build: It was such a long flight.",
    steps: [
      { label: "Subject + be", role: "subject", options: ["It was", "It", "Was it"], answer: 0, why: "Statement: **It was**." },
      { label: "Strong word", role: "other", options: ["such a", "so a", "so"], answer: 0, why: "A noun follows → **such a**." },
      { label: "Adjective", role: "complement", options: ["long", "longly", "length"], answer: 0, why: "Adjective before the noun: **long**." },
      { label: "Noun", role: "object", options: ["flight.", "flying.", "fly."], answer: 0, why: "such a + adjective + **noun**." },
    ],
    result: "It was such a long flight.",
  },
  practice: [
    { id: "d28-p01", type: "choice", prompt: "Choose the correct preposition.", options: ["My birthday is in 12 May.", "My birthday is on 12 May.", "My birthday is at 12 May."], answer: 1, explanation: "Dates → **on**.", skill: "vocabulary" },
    { id: "d28-p02", type: "choice", prompt: "Choose the correct sentence.", options: ["It was so a good film.", "It was such a good film.", "It was such good film."], answer: 1, explanation: "**such a** + adjective + noun.", skill: "form" },
    { id: "d28-p03", type: "fill", prompt: "Complete with at, on or in.", sentence: "The museum opens ___ 10 o'clock.", accept: ["at"], traps: [{ text: "in", feedback: "Clock time → at." }, { text: "on", feedback: "Clock time → at." }], explanation: "Clock time → **at**.", skill: "vocabulary" },
    { id: "d28-p04", type: "fill", prompt: "Complete with as or like.", sentence: "He worked ___ a taxi driver for ten years.", accept: ["as"], traps: [{ text: "like", feedback: "A real job/role → as." }], explanation: "Role → **as**.", skill: "vocabulary" },
    { id: "d28-p05", type: "fill", prompt: "Complete with the correct form of pack.", sentence: "Have you finished ___ yet?", accept: ["packing"], traps: [{ text: "to pack", feedback: "finish + -ing." }], explanation: "finish + **-ing**.", skill: "form" },
    { id: "d28-p06", type: "transform", prompt: "Rewrite with so.", source: "It was such a hot day.", instruction: "Start with: The day was", accept: ["The day was so hot.", "The day was so hot!"], explanation: "No noun after it → **so** + adjective.", skill: "form" },
    { id: "d28-p07", type: "order", prompt: "Put the words in order.", tiles: ["We", "arrived", "in", "London", "on", "Sunday."], explanation: "arrive **in** a city, **on** a day.", skill: "word-order" },
    { id: "d28-p08", type: "correct", prompt: "Fix the mistake.", wrong: "We arrived to the airport at 5.", accept: ["We arrived at the airport at 5.", "We got to the airport at 5."], explanation: "arrive **at** a place (in a city/country).", skill: "vocabulary" },
    { id: "d28-p09", type: "correct", prompt: "Fix the mistake.", wrong: "I decided going to bed early.", accept: ["I decided to go to bed early."], explanation: "decide + **to**.", skill: "form" },
    { id: "d28-p10", type: "listen", prompt: "Listen and type.", audioText: "Our train leaves at nine in the morning on Monday.", accept: ["Our train leaves at nine in the morning on Monday.", "Our train leaves at 9 in the morning on Monday."], explanation: "**at** + time, **in** the morning, **on** + day.", skill: "listening" },
    { id: "d28-p11", type: "speak", prompt: "Book a table by phone.", target: "Can I book a table for two at eight on Saturday?", explanation: "**at** + time, **on** + day.", skill: "speaking" },
    { id: "d28-p12", type: "translate", from: "az", prompt: "Translate into English.", source: "O, müəllim kimi işləyir.", accept: ["She works as a teacher.", "He works as a teacher."], explanation: "Real job → **as** a teacher.", skill: "writing" },
  ],
  vocabulary: [
    { term: "at the weekend / on the weekend", meaning: "Saturday and Sunday (UK / US)", example: "What are you doing at the weekend?" },
    { term: "on time / in time", meaning: "exactly at the planned time / early enough", example: "The train left on time. We arrived just in time." },
    { term: "book", meaning: "reserve a room, table or ticket", example: "I booked a room for three nights." },
    { term: "such a shame", meaning: "how sad / what a pity", example: "It's such a shame you can't come." },
    { term: "look like", meaning: "seem similar to", example: "It looks like rain." },
    { term: "be good at + -ing", meaning: "do something well", example: "She's good at organising trips." },
  ],
  dialogue: {
    title: "Planning a weekend trip",
    setting: "Two colleagues plan a short trip to Sheki.",
    lines: [
      { speaker: "Ali", line: "So, when do we leave? On Friday evening?" },
      { speaker: "Sabina", line: "Yes, the bus leaves at seven, so we'll arrive in Sheki at about midnight." },
      { speaker: "Ali", line: "That's such a long journey! But the hotel looks so nice in the photos." },
      { speaker: "Sabina", line: "It does. My cousin worked there as a manager. He says it's like a small palace." },
      { speaker: "Ali", line: "Great. I've finished booking the tickets. Do you want to visit the old caravanserai?" },
      { speaker: "Sabina", line: "Of course! I really enjoy walking around old places." },
    ],
    focus: ["On Friday evening", "at seven", "arrive in Sheki", "such a long journey", "so nice", "as a manager", "like a small palace", "finished booking", "enjoy walking"],
  },
  review: [
    { id: "d28-r01", type: "choice", prompt: "Choose the correct sentence.", options: ["See you in Monday.", "See you on Monday.", "See you at Monday."], answer: 1, explanation: "Days → **on**.", skill: "vocabulary" },
    { id: "d28-r02", type: "fill", prompt: "Complete with at, on or in.", sentence: "I usually go running ___ the morning.", accept: ["in"], explanation: "Part of day → **in** the morning.", skill: "vocabulary" },
    { id: "d28-r03", type: "transform", prompt: "Rewrite with such.", source: "The day was so beautiful.", instruction: "Start with: It was such", accept: ["It was such a beautiful day."], explanation: "**such a** + adjective + noun.", skill: "form" },
    { id: "d28-r04", type: "order", prompt: "Put the words in order.", tiles: ["I", "enjoy", "meeting", "new", "people."], explanation: "enjoy + **-ing**.", skill: "word-order" },
    { id: "d28-r05", type: "correct", prompt: "Fix the mistake.", wrong: "She sings as an angel.", accept: ["She sings like an angel."], explanation: "Similar to → **like**.", skill: "vocabulary" },
  ],
};

export default day28;
