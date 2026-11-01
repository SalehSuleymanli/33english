import type { LessonSummary, Stage } from "./types";

/** How many days are free. Change this one constant to adjust the free tier. */
export const FREE_DAYS = 7;
export const TOTAL_DAYS = 33;

export const STAGES: { id: Stage; name: string; days: [number, number]; summary: string }[] = [
  { id: "foundation", name: "Foundation", days: [1, 11], summary: "Build each of the six frames in every time and form." },
  { id: "checkpoint", name: "Checkpoint", days: [12, 12], summary: "Choose the right frame for any meaning." },
  { id: "expansion", name: "Expansion", days: [13, 14], summary: "Ask any question and link verbs together." },
  { id: "combination", name: "Combination", days: [15, 21], summary: "Perfect, continuous and passive forms working together." },
  { id: "communication", name: "Communication", days: [22, 30], summary: "Compare, describe, connect and report ideas." },
  { id: "application", name: "Application", days: [31, 33], summary: "Tell stories, take exams, and use everything at once." },
];

export const CURRICULUM: LessonSummary[] = [
  { day: 1, stage: "foundation", frame: "existence", title: "There is, there are", objective: "Say what exists in a place right now — and ask and deny it.", outcome: "Describe any room, street or café in simple sentences.", minutes: 20, scenario: "Describing a café" },
  { day: 2, stage: "foundation", frame: "existence", title: "There was, there will be", objective: "Talk about what existed in the past and what will exist, using some, any and no.", outcome: "Ask for and give simple directions.", minutes: 20, scenario: "Asking for directions" },
  { day: 3, stage: "foundation", frame: "states", title: "I am, you are, she is", objective: "Describe people, feelings, jobs and places with am, is and are.", outcome: "Introduce yourself and ask about someone new.", minutes: 20, scenario: "Meeting someone new" },
  { day: 4, stage: "foundation", frame: "states", title: "Was, were, will be", objective: "Describe states in the past and future.", outcome: "Talk about how yesterday was and how tomorrow will be.", minutes: 20, scenario: "Talking about yesterday" },
  { day: 5, stage: "foundation", frame: "actions", title: "I work, she works", objective: "Talk about habits and facts with the present simple, including do and does.", outcome: "Describe your daily routine and ask about others'.", minutes: 25, scenario: "Daily routines" },
  { day: 6, stage: "foundation", frame: "actions", title: "I worked, I will work", objective: "Use the past simple (regular and irregular) and the future with will.", outcome: "Tell a short story about a trip and make plans.", minutes: 25, scenario: "A travel story" },
  { day: 7, stage: "foundation", frame: "actions", title: "Actions in progress", objective: "Use be + -ing for actions happening now, then, or at a future moment.", outcome: "Say what you and others are doing on the phone.", minutes: 25, scenario: "A phone call" },
  { day: 8, stage: "foundation", frame: "modals", title: "Can, could, be able to", objective: "Talk about ability in the present, past and future.", outcome: "Describe your skills in a job conversation.", minutes: 25, scenario: "Talking about skills" },
  { day: 9, stage: "foundation", frame: "modals", title: "Must, have to, should, might", objective: "Express obligation, advice and possibility — and choose the right register.", outcome: "Give a friend clear, polite advice.", minutes: 25, scenario: "Giving advice" },
  { day: 10, stage: "foundation", frame: "possession", title: "Have and has", objective: "Talk about what people have, and tell possession 'have' from helper 'have'.", outcome: "Order food and ask what a place has.", minutes: 20, scenario: "Ordering food" },
  { day: 11, stage: "foundation", frame: "passive", title: "It was built in 1990", objective: "Build passive sentences and know when the passive is the better choice.", outcome: "Describe a city, a product or a process.", minutes: 25, scenario: "Describing your city" },
  { day: 12, stage: "checkpoint", title: "All six frames together", objective: "Pick the right frame for what you want to say, and switch between frames.", outcome: "Handle short mixed conversations without stopping to think about structure.", minutes: 30, scenario: "Mixed mini-conversations" },
  { day: 13, stage: "expansion", frame: "actions", title: "Who, what, where, why", objective: "Ask object questions (What did you do?) and subject questions (Who called?).", outcome: "Get the information you need in any conversation.", minutes: 25, scenario: "Getting information" },
  { day: 14, stage: "expansion", frame: "actions", title: "I want you to come", objective: "Use verb + person + to + verb: want, ask, tell, would like someone to.", outcome: "Make requests and give instructions politely.", minutes: 20, scenario: "Making requests" },
  { day: 15, stage: "combination", frame: "actions", title: "Have you ever…?", objective: "Use the present perfect for experiences and recent results with ever, never, already, yet, since and for.", outcome: "Talk about your life experiences.", minutes: 25, scenario: "Past experiences" },
  { day: 16, stage: "combination", frame: "actions", title: "I've been waiting for an hour", objective: "Use the perfect continuous for activities that have lasted, and going to for plans.", outcome: "Explain what you've been doing and what you're going to do.", minutes: 25, scenario: "Explaining plans" },
  { day: 17, stage: "combination", title: "It's important to listen", objective: "Use it + adjective + to, enough and too, and know how / what to.", outcome: "Give instructions and tips naturally.", minutes: 20, scenario: "Giving tips" },
  { day: 18, stage: "combination", title: "Used to, be used to, get used to", objective: "Talk about past habits and about getting accustomed to something.", outcome: "Describe how your life has changed.", minutes: 25, scenario: "Life changes" },
  { day: 19, stage: "combination", frame: "modals", title: "I should have called", objective: "Use modal + have + past participle for regret, criticism and deduction.", outcome: "Reflect on past decisions, e.g. after an interview.", minutes: 25, scenario: "After a job interview" },
  { day: 20, stage: "combination", frame: "passive", title: "It has been done", objective: "Combine passive with perfect, continuous and modal forms.", outcome: "Give clear updates at work.", minutes: 25, scenario: "Workplace updates" },
  { day: 21, stage: "checkpoint", title: "Combination review", objective: "Transform sentences across everything from Days 13–20.", outcome: "Get through a full workday conversation.", minutes: 30, scenario: "A day at work" },
  { day: 22, stage: "communication", frame: "states", title: "Bigger, better, the best", objective: "Compare with -er / more … than and the -est / the most.", outcome: "Compare options and explain your choice.", minutes: 25, scenario: "Comparing options" },
  { day: 23, stage: "communication", frame: "states", title: "As good as, the difference", objective: "Use as … as, not as … as, and ask what the difference is.", outcome: "Express and support an opinion.", minutes: 20, scenario: "Expressing opinions" },
  { day: 24, stage: "communication", title: "The person who…", objective: "Join ideas with who, which, that and whose.", outcome: "Describe people and things precisely.", minutes: 25, scenario: "Describing people" },
  { day: 25, stage: "communication", title: "If you come, I'll go", objective: "Use first and second conditionals, what if, and my dream is to.", outcome: "Talk about plans, hypotheses and dreams.", minutes: 25, scenario: "Dreams and what-ifs" },
  { day: 26, stage: "communication", frame: "states", title: "How does it feel?", objective: "Describe feelings with feel, it feels … to, and precise emotion words.", outcome: "Share how you feel and respond to others' feelings.", minutes: 20, scenario: "Sharing feelings" },
  { day: 27, stage: "communication", title: "Although, despite, whether", objective: "Contrast and qualify ideas with although, even though, despite, in spite of, whether and not only … but also.", outcome: "Disagree politely and give balanced views.", minutes: 25, scenario: "Disagreeing politely" },
  { day: 28, stage: "communication", title: "Either, neither, I'd rather", objective: "Use each other, either … or, neither … nor, prefer and would rather.", outcome: "Make choices and state preferences.", minutes: 20, scenario: "Making choices" },
  { day: 29, stage: "communication", title: "About to, out of, so, such", objective: "Use be about to, key prepositions, as vs like, so vs such, and -ing vs to.", outcome: "Handle travel situations with precise small words.", minutes: 25, scenario: "Travelling internationally" },
  { day: 30, stage: "communication", title: "She said that…", objective: "Report statements, questions and requests.", outcome: "Pass on messages accurately.", minutes: 25, scenario: "Passing on a message" },
  { day: 31, stage: "application", title: "Telling a story", objective: "Sequence events with first, then, after that, meanwhile, eventually and narrative tenses.", outcome: "Tell a clear, engaging story about something that happened.", minutes: 25, scenario: "Telling a story" },
  { day: 32, stage: "application", title: "Exam-ready English", objective: "Use the six frames to structure IELTS-style speaking answers and short essays.", outcome: "Answer exam-style speaking questions with confidence.", minutes: 30, scenario: "Speaking test practice" },
  { day: 33, stage: "application", title: "Graduation challenge", objective: "Show what you can do across all six frames and their combinations.", outcome: "A record of your demonstrated skills — and a plan for what's next.", minutes: 35, scenario: "Your own story" },
];

export const summaryByDay = (day: number) => CURRICULUM.find((c) => c.day === day);
export const isFreeDay = (day: number) => day >= 1 && day <= FREE_DAYS;
