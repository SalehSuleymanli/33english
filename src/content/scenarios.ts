import "server-only";
import type { Dialogue, FrameId } from "./types";

export type Scenario = {
  id: string;
  title: string;
  summary: string;
  /** The lesson this scenario fits after. Free when this day is free. */
  afterDay: number;
  frames: FrameId[];
  dialogue: Dialogue;
  questions: { q: string; options: string[]; answer: number; why: string }[];
  yourTurn: { prompt: string; target: string }[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "first-meeting",
    title: "Meeting someone new",
    summary: "Introduce yourself, ask where someone is from, and keep the conversation going.",
    afterDay: 3,
    frames: ["states", "actions"],
    dialogue: {
      title: "At a friend's party",
      setting: "Sara is at a friend's birthday party. She doesn't know anyone except the host.",
      lines: [
        { speaker: "Sara", line: "Hi, I'm Sara. I'm a friend of Leyla's." },
        { speaker: "Tom", line: "Nice to meet you, Sara. I'm Tom. Leyla and I work together." },
        { speaker: "Sara", line: "Oh, really? Are you a designer too?" },
        { speaker: "Tom", line: "No, I'm not. I'm in marketing. What about you?" },
        { speaker: "Sara", line: "I'm a nurse. I'm from Baku, but I live here now." },
        { speaker: "Tom", line: "That's great. How long have you been here?" },
        { speaker: "Sara", line: "About two years. It's a nice city, but the winters are cold!" },
      ],
      focus: ["Nice to meet you", "Are you a designer too?", "What about you?", "I'm from"],
    },
    questions: [
      { q: "How does Sara know Leyla?", options: ["They work together.", "They are friends.", "They are sisters."], answer: 1, why: "Sara says: I'm a friend of Leyla's." },
      { q: "What is Tom's job?", options: ["Designer", "Nurse", "Marketing"], answer: 2, why: "He says: I'm in marketing." },
    ],
    yourTurn: [
      { prompt: "Introduce yourself.", target: "Hi, I'm Sara. Nice to meet you." },
      { prompt: "Ask about someone's job.", target: "What do you do?" },
    ],
  },
  {
    id: "directions",
    title: "Asking for directions",
    summary: "Ask where something is and understand simple directions.",
    afterDay: 2,
    frames: ["existence", "states"],
    dialogue: {
      title: "Looking for a pharmacy",
      setting: "Ali is in a new city. He needs a pharmacy and stops a woman on the street.",
      lines: [
        { speaker: "Ali", line: "Excuse me, is there a pharmacy near here?" },
        { speaker: "Woman", line: "Yes, there's one on Station Road. It's about five minutes from here." },
        { speaker: "Ali", line: "How do I get there?" },
        { speaker: "Woman", line: "Go straight, then turn left at the traffic lights. It's next to a bank." },
        { speaker: "Ali", line: "Is it open on Sundays?" },
        { speaker: "Woman", line: "I'm not sure. There was a sign on the door, but I don't remember." },
        { speaker: "Ali", line: "No problem. Thank you so much!" },
      ],
      focus: ["Excuse me, is there", "How do I get there?", "turn left at", "next to"],
    },
    questions: [
      { q: "Where is the pharmacy?", options: ["Next to a bank", "Opposite a bank", "Inside a bank"], answer: 0, why: "It's next to a bank." },
      { q: "When does Ali turn left?", options: ["At the bank", "At the traffic lights", "After five minutes"], answer: 1, why: "Turn left at the traffic lights." },
    ],
    yourTurn: [
      { prompt: "Ask if there is a bank near here.", target: "Excuse me, is there a bank near here?" },
      { prompt: "Ask how to get there.", target: "How do I get there?" },
    ],
  },
  {
    id: "cafe-order",
    title: "Ordering at a café",
    summary: "Order food and drink, ask what there is, and pay.",
    afterDay: 5,
    frames: ["existence", "modals", "possession"],
    dialogue: {
      title: "Breakfast order",
      setting: "Nadia is ordering breakfast at a busy café.",
      lines: [
        { speaker: "Barista", line: "Hi there! What can I get you?" },
        { speaker: "Nadia", line: "Hi. Can I have a large coffee with milk, please?" },
        { speaker: "Barista", line: "Sure. Anything to eat?" },
        { speaker: "Nadia", line: "Are there any vegetarian sandwiches?" },
        { speaker: "Barista", line: "There's a cheese and tomato one, and there's a falafel wrap." },
        { speaker: "Nadia", line: "I'll have the falafel wrap. Is it for here or to go?" },
        { speaker: "Barista", line: "That's my question! For here or to go?" },
        { speaker: "Nadia", line: "Sorry — for here, please. Can I pay by card?" },
        { speaker: "Barista", line: "Of course. That's nine fifty." },
      ],
      focus: ["What can I get you?", "Can I have", "Are there any", "I'll have", "For here or to go?"],
    },
    questions: [
      { q: "What does Nadia order to eat?", options: ["A cheese sandwich", "A falafel wrap", "Nothing"], answer: 1, why: "She says: I'll have the falafel wrap." },
      { q: "Will she eat in the café?", options: ["Yes", "No", "We don't know"], answer: 0, why: "For here = in the café." },
    ],
    yourTurn: [
      { prompt: "Order a drink politely.", target: "Can I have a small tea, please?" },
      { prompt: "Ask what vegetarian food there is.", target: "Are there any vegetarian options?" },
    ],
  },
  {
    id: "routine",
    title: "Talking about your day",
    summary: "Describe your routine and ask about someone else's.",
    afterDay: 5,
    frames: ["actions"],
    dialogue: {
      title: "New colleagues",
      setting: "Two new colleagues talk during their first coffee break.",
      lines: [
        { speaker: "Maya", line: "So, what time do you usually start work?" },
        { speaker: "Daniel", line: "I start at eight. I take the bus, so I leave home at seven." },
        { speaker: "Maya", line: "That's early! Do you have breakfast at home?" },
        { speaker: "Daniel", line: "No, I don't. I usually eat something at my desk." },
        { speaker: "Maya", line: "I go to the gym before work, so I don't start until ten." },
        { speaker: "Daniel", line: "Wow. I don't go to the gym at all. I walk a lot, though." },
      ],
      focus: ["what time do you usually", "Do you have breakfast", "No, I don't", "I don't start until"],
    },
    questions: [
      { q: "How does Daniel get to work?", options: ["He walks.", "He takes the bus.", "He drives."], answer: 1, why: "I take the bus." },
      { q: "Why does Maya start at ten?", options: ["She goes to the gym first.", "She lives far away.", "She has breakfast at home."], answer: 0, why: "I go to the gym before work." },
    ],
    yourTurn: [
      { prompt: "Say what time you start work.", target: "I usually start work at nine." },
      { prompt: "Ask about someone's routine.", target: "What time do you usually get up?" },
    ],
  },
  {
    id: "trip-story",
    title: "Your last trip",
    summary: "Talk about a past trip: where you went, what you did, how it was.",
    afterDay: 6,
    frames: ["actions", "states"],
    dialogue: {
      title: "Back from holiday",
      setting: "Emre is back at work after a trip. His colleague asks about it.",
      lines: [
        { speaker: "Lina", line: "Welcome back! Where did you go?" },
        { speaker: "Emre", line: "I went to Lisbon with my brother. We stayed for five days." },
        { speaker: "Lina", line: "Lovely. What did you do there?" },
        { speaker: "Emre", line: "We walked everywhere and ate a lot of fish. The food was amazing." },
        { speaker: "Lina", line: "Was the weather good?" },
        { speaker: "Emre", line: "It wasn't great on the first day — it rained. But then it was sunny." },
        { speaker: "Lina", line: "Will you go back?" },
        { speaker: "Emre", line: "Definitely. I think we'll go again next year." },
      ],
      focus: ["Where did you go?", "What did you do there?", "Was the weather good?", "we'll go again"],
    },
    questions: [
      { q: "How long did Emre stay in Lisbon?", options: ["Five days", "One week", "Two days"], answer: 0, why: "We stayed for five days." },
      { q: "What happened on the first day?", options: ["It was sunny.", "It rained.", "They lost their bags."], answer: 1, why: "It rained on the first day." },
    ],
    yourTurn: [
      { prompt: "Ask about someone's trip.", target: "Where did you go on holiday?" },
      { prompt: "Say what you did.", target: "We walked a lot and ate amazing food." },
    ],
  },
  {
    id: "experiences",
    title: "Have you ever…?",
    summary: "Share life experiences and ask follow-up questions.",
    afterDay: 15,
    frames: ["actions"],
    dialogue: {
      title: "Getting to know each other",
      setting: "Two classmates chat before a lesson begins.",
      lines: [
        { speaker: "Kenji", line: "Have you ever been to Asia?" },
        { speaker: "Ana", line: "Yes, I have. I went to Vietnam in 2022. Have you ever been to South America?" },
        { speaker: "Kenji", line: "No, I haven't. But I've always wanted to see Peru." },
        { speaker: "Ana", line: "You should! Have you ever tried Peruvian food?" },
        { speaker: "Kenji", line: "I've never tried it. Is it spicy?" },
        { speaker: "Ana", line: "Some of it. I've just found a great Peruvian place near here, actually." },
      ],
      focus: ["Have you ever been to", "Yes, I have.", "No, I haven't.", "I've never tried", "I've just found"],
    },
    questions: [
      { q: "When did Ana go to Vietnam?", options: ["Last month", "In 2022", "She hasn't been there."], answer: 1, why: "A finished time (in 2022) uses the past simple: I went." },
      { q: "Has Kenji been to Peru?", options: ["Yes", "No"], answer: 1, why: "No, I haven't. But I've always wanted to see Peru." },
    ],
    yourTurn: [
      { prompt: "Ask about an experience.", target: "Have you ever been to Japan?" },
      { prompt: "Say you've never done something.", target: "I've never tried sushi." },
    ],
  },
  {
    id: "plans",
    title: "Explaining your plans",
    summary: "Talk about what you're going to do and why.",
    afterDay: 16,
    frames: ["actions", "modals"],
    dialogue: {
      title: "Weekend plans",
      setting: "Two friends make plans by phone.",
      lines: [
        { speaker: "Rosa", line: "What are you doing this weekend?" },
        { speaker: "Farid", line: "I'm going to paint my flat. I've been planning it for months." },
        { speaker: "Rosa", line: "Do you need any help? I'm not doing anything on Saturday." },
        { speaker: "Farid", line: "Really? That would be great. I'm going to start at ten." },
        { speaker: "Rosa", line: "I might be a bit late — my train gets in at ten thirty." },
        { speaker: "Farid", line: "No problem. I'll make lunch for us." },
      ],
      focus: ["What are you doing this weekend?", "I'm going to", "I've been planning", "I might be", "I'll make"],
    },
    questions: [
      { q: "What is Farid going to do?", options: ["Visit Rosa", "Paint his flat", "Take a train"], answer: 1, why: "I'm going to paint my flat." },
      { q: "Why might Rosa be late?", options: ["Her train arrives at 10:30.", "She has work.", "She's busy on Saturday."], answer: 0, why: "My train gets in at ten thirty." },
    ],
    yourTurn: [
      { prompt: "Say what you're going to do.", target: "I'm going to visit my family this weekend." },
      { prompt: "Offer help.", target: "Do you need any help?" },
    ],
  },
  {
    id: "interview",
    title: "A job interview",
    summary: "Answer common interview questions about your experience and skills.",
    afterDay: 19,
    frames: ["actions", "modals", "states"],
    dialogue: {
      title: "Customer service interview",
      setting: "Leyla is interviewing for a customer service role at a travel company.",
      lines: [
        { speaker: "Interviewer", line: "Thanks for coming in. Could you tell me a little about yourself?" },
        { speaker: "Leyla", line: "Of course. I've worked in hotels for four years, mostly at the front desk." },
        { speaker: "Interviewer", line: "Why are you interested in this role?" },
        { speaker: "Leyla", line: "I enjoy helping people, and I'd like to use my languages more. I can speak English, Turkish and Russian." },
        { speaker: "Interviewer", line: "Tell me about a difficult customer." },
        { speaker: "Leyla", line: "A guest was very angry because his room wasn't ready. I listened, apologized, and offered him a free breakfast. He calmed down." },
        { speaker: "Interviewer", line: "Is there anything you'd do differently now?" },
        { speaker: "Leyla", line: "I should have told him about the delay earlier. Now I always update guests before they ask." },
      ],
      focus: ["Could you tell me", "I've worked in", "I'd like to", "I can speak", "I should have told"],
    },
    questions: [
      { q: "How long has Leyla worked in hotels?", options: ["Two years", "Four years", "She doesn't say."], answer: 1, why: "I've worked in hotels for four years." },
      { q: "What would she do differently?", options: ["Give a bigger discount", "Tell the guest earlier", "Call a manager"], answer: 1, why: "I should have told him about the delay earlier." },
    ],
    yourTurn: [
      { prompt: "Describe your experience.", target: "I've worked in sales for three years." },
      { prompt: "Talk about a past mistake you learned from.", target: "I should have asked for help earlier." },
    ],
  },
  {
    id: "workplace",
    title: "Updates at work",
    summary: "Give and ask for updates on tasks — clearly and politely.",
    afterDay: 20,
    frames: ["passive", "actions"],
    dialogue: {
      title: "Monday stand-up",
      setting: "A small team meets for a short Monday update.",
      lines: [
        { speaker: "Manager", line: "Morning, everyone. Where are we with the new website?" },
        { speaker: "Arif", line: "The design has been approved, and the first pages are being built now." },
        { speaker: "Manager", line: "Great. Has the client been told about the delay?" },
        { speaker: "Grace", line: "Not yet. I'll email them today. Should I copy you in?" },
        { speaker: "Manager", line: "Yes, please. And the photos — when will they be ready?" },
        { speaker: "Arif", line: "They were taken on Friday. They'll be edited by Wednesday." },
      ],
      focus: ["has been approved", "are being built", "Has the client been told", "Should I copy you in?", "will be edited"],
    },
    questions: [
      { q: "What is happening right now?", options: ["The design is being approved.", "The first pages are being built.", "The photos are being taken."], answer: 1, why: "The first pages are being built now." },
      { q: "When were the photos taken?", options: ["On Friday", "On Wednesday", "Today"], answer: 0, why: "They were taken on Friday." },
    ],
    yourTurn: [
      { prompt: "Give an update using the passive.", target: "The report has been sent to the client." },
      { prompt: "Ask politely about a task.", target: "When will the photos be ready?" },
    ],
  },
  {
    id: "opinions",
    title: "Sharing an opinion",
    summary: "Give your opinion, compare options and explain why.",
    afterDay: 23,
    frames: ["states"],
    dialogue: {
      title: "City or countryside?",
      setting: "Two friends discuss where to live.",
      lines: [
        { speaker: "Sam", line: "I think living in the city is better than living in the countryside." },
        { speaker: "Aysel", line: "Why do you think so?" },
        { speaker: "Sam", line: "There's more to do, and public transport is much more convenient." },
        { speaker: "Aysel", line: "That's true, but the city isn't as quiet as the countryside. The air is cleaner there too." },
        { speaker: "Sam", line: "Fair point. What's the biggest difference for you?" },
        { speaker: "Aysel", line: "Space. In the countryside, houses are bigger and cheaper. For me, that's the most important thing." },
      ],
      focus: ["I think", "Why do you think so?", "isn't as quiet as", "What's the biggest difference", "the most important thing"],
    },
    questions: [
      { q: "What does Sam prefer?", options: ["The city", "The countryside"], answer: 0, why: "Living in the city is better…" },
      { q: "What matters most to Aysel?", options: ["Transport", "Space", "Things to do"], answer: 1, why: "Space… that's the most important thing." },
    ],
    yourTurn: [
      { prompt: "Give an opinion with a comparison.", target: "I think trains are more comfortable than buses." },
      { prompt: "Ask for someone's reason.", target: "Why do you think so?" },
    ],
  },
  {
    id: "disagree",
    title: "Disagreeing politely",
    summary: "Disagree without sounding rude, and suggest an alternative.",
    afterDay: 27,
    frames: ["modals", "states"],
    dialogue: {
      title: "Planning a team event",
      setting: "Colleagues are choosing a place for the team dinner.",
      lines: [
        { speaker: "Omar", line: "I think we should go to the steak house. Everyone loves it." },
        { speaker: "Julia", line: "I see what you mean, but not everyone eats meat." },
        { speaker: "Omar", line: "They have salads, though." },
        { speaker: "Julia", line: "That's true. Even so, I'm not sure it's the best choice. What about the Lebanese place? It has something for everyone." },
        { speaker: "Omar", line: "Although it's further away, it's a good idea. Let's ask the team." },
        { speaker: "Julia", line: "Great. Whether we go there or not, let's book this week." },
      ],
      focus: ["I see what you mean, but", "I'm not sure", "What about", "Although", "Whether"],
    },
    questions: [
      { q: "Why does Julia disagree?", options: ["The steak house is expensive.", "Not everyone eats meat.", "It's too far."], answer: 1, why: "Not everyone eats meat." },
      { q: "What do they decide?", options: ["To ask the team", "To go to the steak house", "To cancel"], answer: 0, why: "Let's ask the team." },
    ],
    yourTurn: [
      { prompt: "Disagree politely.", target: "I see what you mean, but I'm not sure it's a good idea." },
      { prompt: "Suggest an alternative.", target: "What about trying the Lebanese place?" },
    ],
  },
  {
    id: "airport",
    title: "At the airport",
    summary: "Check in, ask about delays and find your gate.",
    afterDay: 29,
    frames: ["passive", "modals", "existence"],
    dialogue: {
      title: "A delayed flight",
      setting: "Murad is checking in for an international flight.",
      lines: [
        { speaker: "Agent", line: "Good morning. Can I see your passport, please?" },
        { speaker: "Murad", line: "Here you are. Is the flight on time?" },
        { speaker: "Agent", line: "I'm afraid it's been delayed by forty minutes. Boarding is about to start at gate twelve, though." },
        { speaker: "Murad", line: "OK. Can I take this bag on the plane?" },
        { speaker: "Agent", line: "It's a little too big, so it has to be checked in. Please take your laptop out of the bag." },
        { speaker: "Murad", line: "Sure. Is there anywhere I can charge my phone?" },
        { speaker: "Agent", line: "There are charging points next to every gate." },
      ],
      focus: ["Is the flight on time?", "it's been delayed", "is about to start", "too big", "take your laptop out of"],
    },
    questions: [
      { q: "How long is the delay?", options: ["Twenty minutes", "Forty minutes", "One hour"], answer: 1, why: "Delayed by forty minutes." },
      { q: "What must Murad do with his bag?", options: ["Carry it on the plane", "Check it in", "Leave it at the gate"], answer: 1, why: "It has to be checked in." },
    ],
    yourTurn: [
      { prompt: "Ask about the flight.", target: "Excuse me, is the flight on time?" },
      { prompt: "Ask where you can charge your phone.", target: "Is there anywhere I can charge my phone?" },
    ],
  },
  {
    id: "story",
    title: "Telling a story",
    summary: "Tell a short story with a clear order of events.",
    afterDay: 31,
    frames: ["actions"],
    dialogue: {
      title: "A strange morning",
      setting: "Zara tells her friend about something that happened on the way to work.",
      lines: [
        { speaker: "Zara", line: "You won't believe what happened this morning." },
        { speaker: "Ben", line: "What happened?" },
        { speaker: "Zara", line: "I was waiting for the bus when a man ran up to me with my wallet." },
        { speaker: "Ben", line: "Your wallet? Had you dropped it?" },
        { speaker: "Zara", line: "Yes! I'd dropped it at the café. He'd followed me for two streets to give it back." },
        { speaker: "Ben", line: "That's amazing. What did you do?" },
        { speaker: "Zara", line: "First, I thanked him about ten times. Then I bought him a coffee. In the end, I was late for work — but I didn't mind." },
      ],
      focus: ["You won't believe what happened", "I was waiting for the bus when", "I'd dropped it", "First", "Then", "In the end"],
    },
    questions: [
      { q: "Where had Zara dropped her wallet?", options: ["On the bus", "At the café", "At work"], answer: 1, why: "I'd dropped it at the café." },
      { q: "What did she do to thank him?", options: ["She gave him money.", "She bought him a coffee.", "She drove him home."], answer: 1, why: "Then I bought him a coffee." },
    ],
    yourTurn: [
      { prompt: "Start a story.", target: "You won't believe what happened yesterday." },
      { prompt: "Set the scene with the past continuous.", target: "I was walking home when it started to rain." },
    ],
  },
];

export const scenarioById = (id: string) => SCENARIOS.find((s) => s.id === id);
