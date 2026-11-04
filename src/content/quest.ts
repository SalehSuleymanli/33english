/**
 * Word Quest — an original battle adventure. Cute animal heroes fight the
 * Muddles: little monsters made of jumbled words. Every attack is an English
 * answer, and every world follows the six frames of the 33English method.
 */
import type { FrameId } from "./types";

export type HeroId = "fox" | "turtle" | "owl" | "bunny" | "bear";

export type Hero = {
  id: HeroId;
  name: string;
  species: string;
  hp: number;
  atk: number;
  potions: number;
  shields: number;
  perk: string;
  unlock: string;
  color: string;
};

export const HEROES: Hero[] = [
  { id: "fox", name: "Pip", species: "Fox", hp: 100, atk: 20, potions: 2, shields: 0, perk: "Starts with 2 potions.", unlock: "Ready from the start.", color: "#e8793a" },
  { id: "turtle", name: "Shelly", species: "Turtle", hp: 130, atk: 16, potions: 1, shields: 1, perk: "Tough shell: more health and a shield ready.", unlock: "Beat King Jumble (World 1 boss).", color: "#3f9e6b" },
  { id: "owl", name: "Hoot", species: "Owl", hp: 90, atk: 20, potions: 1, shields: 0, perk: "Wise strikes: +25% damage while on a combo.", unlock: "Solve 5 crosswords.", color: "#8a6bd1" },
  { id: "bunny", name: "Dash", species: "Bunny", hp: 85, atk: 25, potions: 1, shields: 0, perk: "Fast and fierce: the strongest basic attack.", unlock: "Practise 7 days in a row.", color: "#e46d9b" },
  { id: "bear", name: "Bruno", species: "Bear", hp: 125, atk: 24, potions: 1, shields: 1, perk: "Big, brave and balanced — the champion.", unlock: "Beat the Clockwork Gnarl (World 2 boss) and reach level 8.", color: "#a0673f" },
];

export type EnemyArt = "slime" | "sprout" | "king" | "twig" | "moth" | "gnarl" | "golem" | "yeti" | "drake" | "ghost" | "knight" | "muddle";

export type Enemy = { id: string; name: string; hp: number; atk: number; art: EnemyArt; boss?: boolean; taunt: string };

export type QuestionKind = "discover" | "build" | "grammar" | "match" | "fix";

export type World = {
  id: number;
  name: string;
  tagline: string;
  frames: FrameId[];
  wordLevels: (1 | 2 | 3)[];
  mix: Partial<Record<QuestionKind, number>>;
  sky: [string, string];
  ground: string;
  enemies: Enemy[];
  boss: Enemy;
};

export const WORLDS: World[] = [
  {
    id: 1,
    name: "Sunny Meadow",
    tagline: "Frames 1–2 · There is / are · Subject + be",
    frames: ["existence", "states"],
    wordLevels: [1],
    mix: { grammar: 3, build: 2, match: 2, discover: 2, fix: 1 },
    sky: ["#bfe8ff", "#fff3d6"],
    ground: "#8fd16a",
    enemies: [
      { id: "typo-slime", name: "Typo Slime", hp: 40, atk: 12, art: "slime", taunt: "Thre is a slime hear!" },
      { id: "blot-sprout", name: "Blot Sprout", hp: 50, atk: 14, art: "sprout", taunt: "I is very scary!" },
    ],
    boss: { id: "king-jumble", name: "King Jumble", hp: 150, atk: 18, art: "king", boss: true, taunt: "There is no escape — there are only mistakes!" },
  },
  {
    id: 2,
    name: "Whisper Woods",
    tagline: "Frame 3 · Actions in every tense",
    frames: ["actions"],
    wordLevels: [1, 2],
    mix: { build: 3, grammar: 3, fix: 2, match: 1, discover: 1 },
    sky: ["#cfe9d6", "#fdf1dc"],
    ground: "#4f9a5a",
    enemies: [
      { id: "tense-twig", name: "Tense Twig", hp: 55, atk: 15, art: "twig", taunt: "Yesterday I go… I goed… I am going?!" },
      { id: "mixup-moth", name: "Mixup Moth", hp: 60, atk: 16, art: "moth", taunt: "She don't like light. She like it!" },
    ],
    boss: { id: "clockwork-gnarl", name: "Clockwork Gnarl", hp: 190, atk: 20, art: "gnarl", boss: true, taunt: "I have been waiting… for you to fail!" },
  },
  {
    id: 3,
    name: "Crystal Peaks",
    tagline: "Frames 4–5 · Modals · Have / has",
    frames: ["modals", "possession"],
    wordLevels: [2],
    mix: { grammar: 3, fix: 2, build: 2, match: 2, discover: 1 },
    sky: ["#dfe4ff", "#f6eaff"],
    ground: "#a8b6d8",
    enemies: [
      { id: "maybe-golem", name: "Maybe Golem", hp: 65, atk: 17, art: "golem", taunt: "You must to lose. You can won't win!" },
      { id: "grabby-yeti", name: "Grabby Yeti", hp: 70, atk: 18, art: "yeti", taunt: "I has all your words now!" },
    ],
    boss: { id: "drake-of-doubt", name: "Drake of Doubt", hp: 230, atk: 22, art: "drake", boss: true, taunt: "You should have stayed home!" },
  },
  {
    id: 4,
    name: "Shadow Castle",
    tagline: "Frame 6 · The passive · All six frames",
    frames: ["passive", "existence", "states", "actions", "modals", "possession"],
    wordLevels: [2, 3],
    mix: { grammar: 3, fix: 2, build: 2, match: 2, discover: 1 },
    sky: ["#2b2f55", "#5b4a7a"],
    ground: "#463c63",
    enemies: [
      { id: "passive-ghost", name: "Passive Ghost", hp: 75, atk: 19, art: "ghost", taunt: "Mistakes were made… by you!" },
      { id: "blank-knight", name: "Blank Knight", hp: 85, atk: 20, art: "knight", taunt: "___ shall not pass!" },
    ],
    boss: { id: "great-muddle", name: "The Great Muddle", hp: 280, atk: 24, art: "muddle", boss: true, taunt: "Every sentence will be broken by me!" },
  },
];

export const STAGES_PER_WORLD = 5;

export type Stage = { id: string; world: number; n: number; title: string; enemies: Enemy[]; boss: boolean };

export function stageList(): Stage[] {
  return WORLDS.flatMap((w) =>
    Array.from({ length: STAGES_PER_WORLD }, (_, k) => {
      const n = k + 1;
      const boss = n === STAGES_PER_WORLD;
      const [a, b] = w.enemies;
      // gentle ramp: stage 1 = two enemies, 3–4 = three, 5 = boss
      const scale = 1 + (n - 1) * 0.08;
      const s = (e: Enemy) => ({ ...e, hp: Math.round(e.hp * scale), atk: Math.round(e.atk * (1 + (n - 1) * 0.04)) });
      const enemies = boss ? [w.boss] : n <= 2 ? [s(a), s(b)] : [s(a), s(b), s(n === 3 ? a : b)];
      return { id: `w${w.id}-s${n}`, world: w.id, n, title: boss ? w.boss.name : `${w.name} ${n}`, enemies, boss };
    }),
  );
}

export const STAGES = stageList();
export const stageById = (id: string) => STAGES.find((s) => s.id === id);
export const worldById = (id: number) => WORLDS.find((w) => w.id === id)!;

/* ------------------------------------------------------------------ grammar bank */

export type GrammarItem = { frame: FrameId; sentence: string; options: string[]; answer: string; tip: string };

export const GRAMMAR: GrammarItem[] = [
  // existence
  { frame: "existence", sentence: "There ___ two cafés near my office.", options: ["is", "are", "have"], answer: "are", tip: "Two cafés = plural → there are." },
  { frame: "existence", sentence: "There ___ a lot of traffic today.", options: ["is", "are", "has"], answer: "is", tip: "Traffic can't be counted → there is." },
  { frame: "existence", sentence: "___ there a bank near here?", options: ["Is", "Are", "Does"], answer: "Is", tip: "Questions swap the order: Is there…?" },
  { frame: "existence", sentence: "There ___ any milk in the fridge.", options: ["isn't", "aren't", "doesn't"], answer: "isn't", tip: "Milk is uncountable → there isn't any milk." },
  { frame: "existence", sentence: "There ___ a party here last night.", options: ["was", "were", "is"], answer: "was", tip: "One party, in the past → there was." },
  { frame: "existence", sentence: "There ___ a meeting tomorrow at ten.", options: ["will be", "will have", "is be"], answer: "will be", tip: "Future existence → there will be." },
  { frame: "existence", sentence: "Were there ___ people at the concert?", options: ["many", "much", "a"], answer: "many", tip: "People is countable → many." },
  { frame: "existence", sentence: "There is ___ reason to worry.", options: ["no", "not", "any"], answer: "no", tip: "Before a noun, use no (or not a / not any)." },
  // states
  { frame: "states", sentence: "My brother ___ a doctor.", options: ["is", "are", "has"], answer: "is", tip: "He/she/it → is." },
  { frame: "states", sentence: "We ___ tired after the trip.", options: ["were", "was", "are being"], answer: "were", tip: "We, in the past → were." },
  { frame: "states", sentence: "___ you ready?", options: ["Are", "Is", "Do"], answer: "Are", tip: "Questions with be: Are you…?" },
  { frame: "states", sentence: "I ___ hungry, thanks.", options: ["am not", "not am", "don't"], answer: "am not", tip: "Negative: am + not. Never 'I don't hungry'." },
  { frame: "states", sentence: "She ___ in London since March.", options: ["has been", "is", "was been"], answer: "has been", tip: "Since + a start point → present perfect: has been." },
  { frame: "states", sentence: "The children ___ at school right now.", options: ["are", "is", "be"], answer: "are", tip: "Plural subject → are." },
  { frame: "states", sentence: "It ___ very cold tomorrow.", options: ["will be", "will", "is being"], answer: "will be", tip: "Future state → will be." },
  { frame: "states", sentence: "Where ___ your keys yesterday?", options: ["were", "was", "did"], answer: "were", tip: "Keys = plural, past → were." },
  // actions
  { frame: "actions", sentence: "She ___ English every day.", options: ["speaks", "speak", "is speak"], answer: "speaks", tip: "He/she/it in present simple → add -s." },
  { frame: "actions", sentence: "I ___ to the cinema last night.", options: ["went", "go", "goed"], answer: "went", tip: "Go is irregular: go → went." },
  { frame: "actions", sentence: "They ___ dinner when I called.", options: ["were having", "had having", "are having"], answer: "were having", tip: "An action in progress in the past → was/were + -ing." },
  { frame: "actions", sentence: "___ you finish the report?", options: ["Did", "Do you", "Have"], answer: "Did", tip: "Past simple question → Did + subject + base verb." },
  { frame: "actions", sentence: "I have ___ this film twice.", options: ["seen", "saw", "see"], answer: "seen", tip: "Present perfect → have + past participle (seen)." },
  { frame: "actions", sentence: "He ___ coffee. He prefers tea.", options: ["doesn't drink", "don't drink", "not drinks"], answer: "doesn't drink", tip: "He/she/it negative → doesn't + base verb." },
  { frame: "actions", sentence: "Look! It ___.", options: ["is raining", "rains", "rain"], answer: "is raining", tip: "Happening now → am/is/are + -ing." },
  { frame: "actions", sentence: "We have been ___ for an hour.", options: ["waiting", "waited", "wait"], answer: "waiting", tip: "Perfect continuous → have been + -ing." },
  { frame: "actions", sentence: "I ___ you tomorrow.", options: ["will call", "call will", "calling"], answer: "will call", tip: "Future → will + base verb." },
  // modals
  { frame: "modals", sentence: "You ___ wear a seatbelt. It's the law.", options: ["must", "might", "could"], answer: "must", tip: "A strong rule → must." },
  { frame: "modals", sentence: "She can ___ three languages.", options: ["speak", "speaks", "to speak"], answer: "speak", tip: "After a modal → base verb (no -s, no to)." },
  { frame: "modals", sentence: "You ___ see a doctor about that cough.", options: ["should", "must to", "can to"], answer: "should", tip: "Advice → should." },
  { frame: "modals", sentence: "I ___ swim when I was five.", options: ["could", "can", "able"], answer: "could", tip: "Past ability → could." },
  { frame: "modals", sentence: "Take an umbrella. It ___ rain later.", options: ["might", "must", "should to"], answer: "might", tip: "Possibility → might." },
  { frame: "modals", sentence: "Next year I will ___ drive.", options: ["be able to", "can", "could"], answer: "be able to", tip: "Future ability → will be able to (not 'will can')." },
  { frame: "modals", sentence: "Do we ___ bring anything?", options: ["have to", "must", "should to"], answer: "have to", tip: "Questions about obligation → Do we have to…?" },
  { frame: "modals", sentence: "___ I open the window?", options: ["Can", "Do", "Am"], answer: "Can", tip: "Asking permission → Can I…? / May I…?" },
  // possession
  { frame: "possession", sentence: "She ___ two brothers.", options: ["has", "have", "is having"], answer: "has", tip: "He/she/it → has." },
  { frame: "possession", sentence: "___ you have a pen?", options: ["Do", "Have", "Are"], answer: "Do", tip: "Questions with have → Do you have…?" },
  { frame: "possession", sentence: "We ___ have enough time.", options: ["don't", "haven't", "aren't"], answer: "don't", tip: "Negative → don't have (more common than haven't got)." },
  { frame: "possession", sentence: "I ___ a car when I lived in Baku.", options: ["had", "have", "has"], answer: "had", tip: "Past possession → had." },
  { frame: "possession", sentence: "Does he ___ a laptop?", options: ["have", "has", "having"], answer: "have", tip: "After does → base form: have." },
  { frame: "possession", sentence: "They didn't ___ any tickets.", options: ["have", "had", "has"], answer: "have", tip: "After didn't → base form: have." },
  { frame: "possession", sentence: "My flat ___ a big balcony.", options: ["has", "have", "is"], answer: "has", tip: "Things can 'have' features too: the flat has a balcony." },
  // passive
  { frame: "passive", sentence: "English ___ all over the world.", options: ["is spoken", "speaks", "is speaking"], answer: "is spoken", tip: "Passive → be + past participle." },
  { frame: "passive", sentence: "The bridge ___ in 1990.", options: ["was built", "built", "was build"], answer: "was built", tip: "Past passive → was/were + past participle." },
  { frame: "passive", sentence: "The letters ___ every morning.", options: ["are delivered", "is delivered", "deliver"], answer: "are delivered", tip: "Letters = plural → are + delivered." },
  { frame: "passive", sentence: "Your order ___ tomorrow.", options: ["will be sent", "will send", "will sent"], answer: "will be sent", tip: "Future passive → will be + past participle." },
  { frame: "passive", sentence: "The room ___ cleaned yet.", options: ["hasn't been", "didn't", "isn't being"], answer: "hasn't been", tip: "Present perfect passive → has been + participle; yet → negative." },
  { frame: "passive", sentence: "This song was written ___ my sister.", options: ["by", "from", "with"], answer: "by", tip: "The doer in a passive comes after by." },
  { frame: "passive", sentence: "Phones must ___ off during the exam.", options: ["be turned", "turned", "be turn"], answer: "be turned", tip: "Modal passive → modal + be + participle." },
];

export type FixItem = { frame: FrameId; wrong: string; right: string; decoy: string; tip: string };

export const FIXES: FixItem[] = [
  { frame: "existence", wrong: "There is three people outside.", right: "There are three people outside.", decoy: "There have three people outside.", tip: "Plural thing → there are." },
  { frame: "existence", wrong: "Have there a bank near here?", right: "Is there a bank near here?", decoy: "There is a bank near here?", tip: "Existence questions use be: Is there…?" },
  { frame: "existence", wrong: "There is phone on the table.", right: "There is a phone on the table.", decoy: "There are phone on the table.", tip: "One countable thing needs a/an." },
  { frame: "existence", wrong: "It has a café near my office.", right: "There is a café near my office.", decoy: "It is a café near my office.", tip: "English says 'there is', not 'it has', for what exists." },
  { frame: "states", wrong: "I am agree with you.", right: "I agree with you.", decoy: "I am agreeing with you.", tip: "Agree is a verb — no am." },
  { frame: "states", wrong: "She have 25 years old.", right: "She is 25 years old.", decoy: "She has 25 years.", tip: "Age uses be: She is 25." },
  { frame: "states", wrong: "They was very happy.", right: "They were very happy.", decoy: "They is very happy.", tip: "They → were (past)." },
  { frame: "states", wrong: "I don't hungry.", right: "I'm not hungry.", decoy: "I no hungry.", tip: "Negative of be: am not / I'm not." },
  { frame: "actions", wrong: "He don't like coffee.", right: "He doesn't like coffee.", decoy: "He not likes coffee.", tip: "He/she/it → doesn't." },
  { frame: "actions", wrong: "I goed to work yesterday.", right: "I went to work yesterday.", decoy: "I was go to work yesterday.", tip: "Go → went (irregular)." },
  { frame: "actions", wrong: "Did you saw the film?", right: "Did you see the film?", decoy: "Do you saw the film?", tip: "After did → base verb." },
  { frame: "actions", wrong: "I am knowing the answer.", right: "I know the answer.", decoy: "I knowing the answer.", tip: "Know is a state verb — no -ing." },
  { frame: "actions", wrong: "I have seen him yesterday.", right: "I saw him yesterday.", decoy: "I have saw him yesterday.", tip: "Finished time (yesterday) → past simple." },
  { frame: "modals", wrong: "She can speaks French.", right: "She can speak French.", decoy: "She cans speak French.", tip: "Modal + base verb, no -s." },
  { frame: "modals", wrong: "You must to stop here.", right: "You must stop here.", decoy: "You must stopping here.", tip: "No 'to' after must." },
  { frame: "modals", wrong: "I will can help you.", right: "I will be able to help you.", decoy: "I can will help you.", tip: "Two modals can't stand together: will be able to." },
  { frame: "modals", wrong: "You should to rest.", right: "You should rest.", decoy: "You should resting.", tip: "No 'to' after should." },
  { frame: "possession", wrong: "She have a new car.", right: "She has a new car.", decoy: "She is have a new car.", tip: "He/she/it → has." },
  { frame: "possession", wrong: "Have you a pen?", right: "Do you have a pen?", decoy: "Are you have a pen?", tip: "Modern question form: Do you have…?" },
  { frame: "possession", wrong: "He doesn't has time.", right: "He doesn't have time.", decoy: "He don't have time.", tip: "After doesn't → have." },
  { frame: "possession", wrong: "I am having two sisters.", right: "I have two sisters.", decoy: "I has two sisters.", tip: "Have for possession isn't used in -ing form." },
  { frame: "passive", wrong: "The house was build in 1950.", right: "The house was built in 1950.", decoy: "The house built in 1950.", tip: "Passive needs the past participle: built." },
  { frame: "passive", wrong: "English is speak here.", right: "English is spoken here.", decoy: "English speaks here.", tip: "be + past participle: spoken." },
  { frame: "passive", wrong: "The window broke by the ball.", right: "The window was broken by the ball.", decoy: "The window is broke by the ball.", tip: "With 'by + doer', use the passive: was broken." },
  { frame: "passive", wrong: "The cars are wash every day.", right: "The cars are washed every day.", decoy: "The cars washing every day.", tip: "Passive → are + washed." },
];
