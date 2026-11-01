import type { Lesson } from "../types";

const day05: Lesson = {
  day: 5,
  stage: "foundation",
  frame: "actions",
  title: "I work, she works",
  objective: "Talk about habits and facts with the present simple, including do and does.",
  builds_on: "Frames 1 and 2 used be. Frame 3 is about actions — so we need real verbs, and a helper (do / does) for questions and negatives.",
  outcome: "Describe your daily routine and ask about others'.",
  minutes: 25,
  explanation: [
    "**Frame 3: actions** describes what people do or what happens. The basic pattern is **subject + verb**, often followed by an object or extra information.",
    "The **present simple** is for habits, routines and facts: I **work** in a bank. Water **boils** at 100°C.",
    "With **he / she / it**, add **-s** to the verb: she work**s**, he watch**es**, it stud**ies**.",
    "Questions and negatives need the helper **do / does**. The helper carries the -s, so the main verb goes back to its base form: **Does** she **work**? She **doesn't work**.",
    "Never mix the two frames: not 'I am work'. Use be (Frame 2) for states, and verbs (Frame 3) for actions.",
  ],
  patterns: [
    {
      name: "Positive",
      slots: [
        { label: "Subject", role: "subject", text: "She" },
        { label: "verb (+s)", role: "verb", text: "works" },
        { label: "rest", role: "place", text: "at a bank" },
      ],
    },
    {
      name: "Negative",
      slots: [
        { label: "Subject", role: "subject", text: "He" },
        { label: "doesn't / don't", role: "aux", text: "doesn't" },
        { label: "base verb", role: "verb", text: "drive" },
        { label: "rest", role: "object", text: "to work" },
      ],
    },
    {
      name: "Question",
      slots: [
        { label: "Do / Does", role: "aux", text: "Do" },
        { label: "Subject", role: "subject", text: "you" },
        { label: "base verb", role: "verb", text: "like" },
        { label: "object", role: "object", text: "coffee?" },
      ],
    },
  ],
  examples: [
    { en: "I get up at seven every day.", note: "A routine → present simple." },
    { en: "My sister lives in Berlin.", note: "She → live**s**." },
    { en: "He watches a lot of football.", note: "Verbs ending in -ch, -sh, -s, -x, -o add **-es**." },
    { en: "We don't eat meat.", note: "**Don't** + base verb." },
    { en: "Does your father speak English?", note: "**Does** carries the -s, so: speak (not speaks)." },
    { en: "The shop opens at nine.", note: "Timetables and schedules use the present simple." },
    { en: "I usually walk to work, but I sometimes take the bus.", note: "Frequency words go **before** the main verb." },
    { en: "What do you do? — I'm a designer.", note: "What do you do? = What is your job?" },
  ],
  forms: [
    { label: "I / you / we / they", positive: "They play tennis.", negative: "They don't play tennis.", question: "Do they play tennis?", shortAnswers: "Yes, they do. / No, they don't." },
    { label: "He / she / it", positive: "She plays tennis.", negative: "She doesn't play tennis.", question: "Does she play tennis?", shortAnswers: "Yes, she does. / No, she doesn't." },
  ],
  mistakes: [
    { wrong: "She work in a hospital.", right: "She works in a hospital.", why: "He / she / it → verb + **s**." },
    { wrong: "Does he works here?", right: "Does he work here?", why: "**Does** already has the -s, so the verb stays in base form." },
    { wrong: "I am work every day.", right: "I work every day.", why: "Don't add be to an action verb in the present simple." },
    { wrong: "He don't like fish.", right: "He doesn't like fish.", why: "He / she / it → **doesn't**." },
    { wrong: "I go always to the gym.", right: "I always go to the gym.", why: "Always, usually, often, never go **before** the main verb." },
  ],
  guided: {
    goal: "Build: Does your brother play football?",
    steps: [
      { label: "Choose the helper", role: "aux", options: ["Do", "Does", "Is"], answer: 1, why: "Your brother = he → **Does**." },
      { label: "Add the subject", role: "subject", options: ["your brother", "your brother's", "brother you"], answer: 0, why: "Subject after the helper." },
      { label: "Add the verb", role: "verb", options: ["plays", "play", "playing"], answer: 1, why: "After does → **base form**: play." },
      { label: "Add the object", role: "object", options: ["football?", "the football game sport?", "at football?"], answer: 0, why: "Sports don't take the: play **football**." },
    ],
    result: "Does your brother play football?",
  },
  practice: [
    { id: "d05-p01", type: "choice", prompt: "Choose the correct sentence.", options: ["My mother cook dinner every day.", "My mother cooks dinner every day.", "My mother is cook dinner every day."], answer: 1, explanation: "She → cook**s**.", frame: "actions", skill: "form" },
    { id: "d05-p02", type: "fill", prompt: "Complete with the correct form of watch.", sentence: "He ___ the news every evening.", accept: ["watches"], traps: [{ text: "watchs", feedback: "Verbs ending in -ch add -es: watches." }, { text: "watch", feedback: "He → add -es: watches." }], explanation: "-ch + **es**.", frame: "actions", skill: "form" },
    { id: "d05-p03", type: "fill", prompt: "Complete with do, does, don't or doesn't.", sentence: "___ you work on Saturdays?", accept: ["Do"], traps: [{ text: "Does", feedback: "You → Do." }, { text: "Are", feedback: "Work is an action verb, so the question needs Do." }], explanation: "You → **Do**.", frame: "actions", skill: "questions" },
    { id: "d05-p04", type: "transform", prompt: "Make it negative.", source: "Ali drinks coffee.", instruction: "Use doesn't.", accept: ["Ali doesn't drink coffee.", "Ali does not drink coffee."], traps: [{ text: "Ali doesn't drinks coffee.", feedback: "After doesn't, use the base form: drink." }], explanation: "**doesn't** + base verb.", frame: "actions", skill: "negatives" },
    { id: "d05-p05", type: "transform", prompt: "Make it a question.", source: "They live near the river.", instruction: "Ask about it.", accept: ["Do they live near the river?"], explanation: "**Do** + subject + base verb?", frame: "actions", skill: "questions" },
    { id: "d05-p06", type: "order", prompt: "Put the words in order.", tiles: ["I", "usually", "have", "breakfast", "at", "eight."], alsoValid: ["Usually I have breakfast at eight."], explanation: "Frequency words go before the main verb.", frame: "actions", skill: "word-order" },
    { id: "d05-p07", type: "correct", prompt: "Fix the mistake.", wrong: "Does she speaks French?", accept: ["Does she speak French?"], explanation: "After **does**, base form.", frame: "actions", skill: "questions" },
    { id: "d05-p08", type: "correct", prompt: "Fix the mistake.", wrong: "I am live in Baku.", accept: ["I live in Baku."], explanation: "Live is an action verb — no **am**.", frame: "actions", skill: "form" },
    { id: "d05-p09", type: "listen", prompt: "Listen and type.", audioText: "She doesn't work on Fridays.", accept: ["She doesn't work on Fridays.", "She does not work on Fridays."], explanation: "Listen for the **-z** sound in doesn't.", frame: "actions", skill: "listening" },
    { id: "d05-p10", type: "speak", prompt: "Describe your morning.", target: "I usually get up at seven and have breakfast at home.", explanation: "Present simple for routines.", frame: "actions", skill: "speaking" },
    { id: "d05-p11", type: "translate", from: "az", prompt: "Translate into English.", source: "O, hər gün işə avtobusla gedir.", accept: ["She goes to work by bus every day.", "He goes to work by bus every day.", "Every day she goes to work by bus.", "Every day he goes to work by bus.", "She takes the bus to work every day.", "He takes the bus to work every day."], explanation: "He / she → go**es**. By bus = with the bus.", frame: "actions", skill: "writing" },
  ],
  vocabulary: [
    { term: "get up", meaning: "leave your bed in the morning", example: "I get up at seven." },
    { term: "have breakfast / lunch / dinner", meaning: "eat a meal", example: "We have dinner at eight." },
    { term: "usually / often / sometimes / never", meaning: "how often something happens", example: "I never drink coffee at night." },
    { term: "by bus / car / train", meaning: "how you travel", example: "She goes to work by train." },
    { term: "What do you do?", meaning: "What's your job?", example: "What do you do? — I'm an accountant." },
    { term: "on weekdays / at weekends", meaning: "Monday–Friday / Saturday–Sunday", example: "I don't work at weekends." },
  ],
  dialogue: {
    title: "A typical day",
    setting: "Lina is writing a school project about jobs. She interviews her neighbor, a baker.",
    lines: [
      { speaker: "Lina", line: "What time do you start work?" },
      { speaker: "Hasan", line: "I start at four in the morning. The bread needs time." },
      { speaker: "Lina", line: "Wow! Do you work every day?" },
      { speaker: "Hasan", line: "No, I don't. The bakery closes on Mondays." },
      { speaker: "Lina", line: "Does your wife work there too?" },
      { speaker: "Hasan", line: "Yes, she does. She makes the cakes, and she usually serves the customers." },
      { speaker: "Lina", line: "And what do you do after work?" },
      { speaker: "Hasan", line: "I sleep! I usually go to bed at eight." },
    ],
    focus: ["What time do you start work?", "Do you work every day?", "No, I don't.", "Yes, she does.", "She makes"],
  },
  review: [
    { id: "d05-r01", type: "choice", prompt: "Choose the correct question.", options: ["Does he lives here?", "Do he live here?", "Does he live here?"], answer: 2, explanation: "**Does he live**…?", frame: "actions", skill: "questions" },
    { id: "d05-r02", type: "fill", prompt: "Complete with the correct form of study.", sentence: "My brother ___ medicine.", accept: ["studies"], traps: [{ text: "studys", feedback: "Consonant + y → ies: studies." }], explanation: "y → **ies**.", frame: "actions", skill: "form" },
    { id: "d05-r03", type: "transform", prompt: "Make it negative.", source: "We play cards on Sundays.", instruction: "Use don't.", accept: ["We don't play cards on Sundays.", "We do not play cards on Sundays."], explanation: "**don't** + base verb.", frame: "actions", skill: "negatives" },
    { id: "d05-r04", type: "order", prompt: "Make a question.", tiles: ["Where", "do", "you", "work?"], explanation: "Question word + **do** + subject + verb?", frame: "actions", skill: "questions" },
    { id: "d05-r05", type: "correct", prompt: "Fix the mistake.", wrong: "He don't like tea.", accept: ["He doesn't like tea.", "He does not like tea."], explanation: "He → **doesn't**.", frame: "actions", skill: "negatives" },
  ],
  labSeeds: ["ac-work", "ac-fix"],
};

export default day05;
