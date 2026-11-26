import type { Lesson } from "../types";

const day21: Lesson = {
  day: 21,
  stage: "communication",
  title: "I'm about to leave · out of, off",
  objective: "Say what is going to happen in a moment with be about to, and move things with out of, off, into, onto, get in / get on.",
  builds_on: "Be about to is Frame 2 (subject + be) with to + verb attached — like going to on Day 18, but even sooner. Out of and off are small words that fit inside any action from Days 5–7. Section 17 of your notes: to be about to, out of vs off.",
  outcome: "Handle travel moments: boarding, getting off, taking things out of your bag.",
  minutes: 20,
  explanation: [
    "**be about to + base verb** = something will happen very soon — in seconds or minutes: I**'m about to** leave. The plane **is about to** take off. (Original notes: I'm about to do the thing you mentioned.)",
    "In the past, **was about to … when …** = I was going to do it, but something interrupted: I **was about to** call you **when** you called me.",
    "**out of** = from inside a container or space: Take the phone **out of** the bag. **off** = from a surface: Take the phone **off** the table. The opposites: **into** (inside) and **onto** (on a surface).",
    "Transport: cars and taxis → **get in / get out of**. Buses, trains, planes, bikes → **get on / get off**. And **out of** can also mean 'no more left': We've **run out of** milk.",
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
      name: "Out of (from inside)",
      slots: [
        { label: "Verb", role: "verb", text: "Take" },
        { label: "thing", role: "object", text: "the phone" },
        { label: "out of", role: "other", text: "out of" },
        { label: "container", role: "place", text: "the bag" },
      ],
    },
  ],
  examples: [
    { en: "I'm about to do the thing you mentioned.", note: "Original notes, corrected: **you mentioned**." },
    { en: "Hurry! The doors are about to close.", note: "Very soon → **about to**." },
    { en: "I was about to call you when you called me.", note: "Past: **was about to … when …**" },
    { en: "Take the phone out of the bag.", note: "From inside → **out of** (original notes)." },
    { en: "Take the phone off the table.", note: "From a surface → **off** (original notes: off)." },
    { en: "Put the milk into the fridge and the plates onto the shelf.", note: "Opposites: **into** / **onto**." },
    { en: "Get off the bus at the next stop.", note: "Bus, train, plane → **get on / off**." },
    { en: "We've run out of coffee.", note: "**run out of** = there's no more." },
  ],
  forms: [{ label: "Be about to", positive: "We're about to start.", negative: "We aren't about to give up.", question: "Is the film about to start?" }],
  mistakes: [
    { wrong: "The phone is inside the bag. Take it off the bag.", right: "The phone is inside the bag. Take it out of the bag.", why: "From inside → **out of**. **Off** is for a surface: off the table." },
    { wrong: "I'm about to leaving.", right: "I'm about to leave.", why: "**about to** + base verb." },
    { wrong: "Get off the car.", right: "Get out of the car.", why: "Cars and taxis → **get out of**; buses and trains → get off." },
    { wrong: "The train is about to leave tomorrow.", right: "The train leaves tomorrow.", why: "**About to** = in a moment, not tomorrow." },
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
    { id: "d21-p01", type: "choice", prompt: "Your keys are in your pocket. What do you do?", options: ["I take them off my pocket.", "I take them out of my pocket.", "I take them out my pocket of."], answer: 1, explanation: "From inside → **out of**.", skill: "vocabulary" },
    { id: "d21-p02", type: "choice", prompt: "Choose the correct sentence.", options: ["The film is about start.", "The film is about to starting.", "The film is about to start."], answer: 2, explanation: "**about to** + base verb.", skill: "form" },
    { id: "d21-p03", type: "fill", prompt: "Complete with out of or off.", sentence: "Please take your shoes ___ the sofa.", accept: ["off"], traps: [{ text: "out of", feedback: "Shoes on the sofa (surface) → off." }], explanation: "From a surface → **off**.", skill: "vocabulary" },
    { id: "d21-p04", type: "fill", prompt: "Complete with on, off, in or out of.", sentence: "We got ___ the train in Ganja.", accept: ["off"], traps: [{ text: "out of", feedback: "Trains → get on / get off." }], explanation: "Train → **get off**.", skill: "vocabulary" },
    { id: "d21-p05", type: "fill", prompt: "Complete (was about to).", sentence: "I ___ about to go to bed when the phone rang.", accept: ["was"], traps: [{ text: "am", feedback: "It's a past story → was." }], explanation: "Past: **was about to … when …**", skill: "tense" },
    { id: "d21-p06", type: "transform", prompt: "Use be about to.", source: "The shop will close in two minutes.", instruction: "Start with: The shop is", accept: ["The shop is about to close."], explanation: "**is about to** + verb.", skill: "form" },
    { id: "d21-p07", type: "order", prompt: "Put the words in order.", tiles: ["Take", "your", "laptop", "out", "of", "the", "bag."], explanation: "**out of** + container.", skill: "word-order" },
    { id: "d21-p08", type: "correct", prompt: "Fix the mistake.", wrong: "She got off the taxi and paid the driver.", accept: ["She got out of the taxi and paid the driver."], explanation: "Taxis and cars → **get out of**.", skill: "vocabulary" },
    { id: "d21-p09", type: "correct", prompt: "Fix the mistake.", wrong: "Hurry, the bus is about to leaving!", accept: ["Hurry, the bus is about to leave!", "Hurry, the bus is about to leave."], explanation: "**about to** + base verb.", skill: "form" },
    { id: "d21-p10", type: "listen", prompt: "Listen and type.", audioText: "Boarding is about to begin at gate twelve.", accept: ["Boarding is about to begin at gate twelve.", "Boarding is about to begin at gate 12."], explanation: "Typical airport announcement.", skill: "listening" },
    { id: "d21-p11", type: "speak", prompt: "At the security check.", target: "Do I need to take my laptop out of the bag?", explanation: "out of + container.", skill: "speaking" },
    { id: "d21-p12", type: "translate", from: "az", prompt: "Translate into English.", source: "Telefonu çantanın içindən götür.", accept: ["Take the phone out of the bag.", "Take the phone out of your bag.", "Take your phone out of the bag."], explanation: "'içindən' → **out of** (original notes).", skill: "writing" },
  ],
  vocabulary: [
    { term: "take off / land", meaning: "a plane leaves / arrives at the ground", example: "The plane is about to take off." },
    { term: "get on / get off", meaning: "enter / leave a bus, train or plane", example: "Get off at the third stop." },
    { term: "get in / get out of", meaning: "enter / leave a car or taxi", example: "Get in, I'll drive you home." },
    { term: "run out of", meaning: "have no more of something", example: "My phone is about to run out of battery." },
    { term: "on board", meaning: "on the plane, train or ship", example: "Food is served on board." },
    { term: "be delayed", meaning: "happen later than planned", example: "Our flight is delayed by an hour." },
  ],
  dialogue: {
    title: "At the gate",
    setting: "Kamila is running late for her flight.",
    lines: [
      { speaker: "Kamila", line: "Excuse me, is the flight to Rome about to leave?" },
      { speaker: "Agent", line: "Boarding is about to close. Can I see your boarding pass?" },
      { speaker: "Kamila", line: "Sorry, one second. Let me take it out of my bag. I was about to lose it!" },
      { speaker: "Agent", line: "No problem. Your seat is 14C. Please take your bag off the counter." },
      { speaker: "Kamila", line: "Of course. Do we get on the plane here or take a bus?" },
      { speaker: "Agent", line: "You walk straight onto the plane. Have a good flight!" },
    ],
    focus: ["is the flight to Rome about to leave?", "about to close", "take it out of my bag", "I was about to lose it", "take your bag off the counter", "get on the plane", "onto the plane"],
  },
  review: [
    { id: "d21-r01", type: "choice", prompt: "Choose the correct sentence.", options: ["The film is about start.", "The film is about to start.", "The film is about starting."], answer: 1, explanation: "**about to** + base verb.", skill: "form" },
    { id: "d21-r02", type: "fill", prompt: "Complete with out of or off.", sentence: "He took the book ___ the shelf.", accept: ["off"], traps: [{ text: "out of", feedback: "A shelf is a surface → off." }], explanation: "From a surface → **off**.", skill: "vocabulary" },
    { id: "d21-r03", type: "transform", prompt: "Use be about to.", source: "The meeting will start in a minute.", instruction: "Start with: The meeting is", accept: ["The meeting is about to start."], explanation: "**is about to** + verb.", skill: "form" },
    { id: "d21-r04", type: "order", prompt: "Put the words in order.", tiles: ["We've", "run", "out", "of", "milk."], explanation: "**run out of** = no more.", skill: "word-order" },
    { id: "d21-r05", type: "correct", prompt: "Fix the mistake.", wrong: "Take the keys off the box.", accept: ["Take the keys out of the box."], explanation: "From inside a box → **out of**.", skill: "vocabulary" },
  ],
};

export default day21;
