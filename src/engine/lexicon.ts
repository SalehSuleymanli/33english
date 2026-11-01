/**
 * Curated verb lexicon. All forms are written out explicitly (no guessing),
 * and tests verify the regular ones follow the spelling rules.
 */
export type Verb = {
  base: string;
  s: string; // 3rd person singular present
  past: string;
  pp: string; // past participle (V3)
  ing: string;
  regular: boolean;
  /** State verbs (know, like…) are not normally used in continuous forms. */
  stative?: boolean;
  /** Verbs describing a moment (finish, arrive) sound odd in perfect continuous. */
  momentary?: boolean;
};

const v = (
  base: string,
  s: string,
  past: string,
  pp: string,
  ing: string,
  flags: Partial<Pick<Verb, "stative" | "momentary" | "regular">> = {},
): Verb => ({ base, s, past, pp, ing, regular: flags.regular ?? false, ...flags });

const r = (
  base: string,
  s: string,
  past: string,
  ing: string,
  flags: Partial<Pick<Verb, "stative" | "momentary">> = {},
): Verb => ({ base, s, past, pp: past, ing, regular: true, ...flags });

export const VERBS: Record<string, Verb> = {
  // regular
  work: r("work", "works", "worked", "working"),
  play: r("play", "plays", "played", "playing"),
  live: r("live", "lives", "lived", "living"),
  study: r("study", "studies", "studied", "studying"),
  cook: r("cook", "cooks", "cooked", "cooking"),
  watch: r("watch", "watches", "watched", "watching"),
  finish: r("finish", "finishes", "finished", "finishing", { momentary: true }),
  clean: r("clean", "cleans", "cleaned", "cleaning"),
  open: r("open", "opens", "opened", "opening", { momentary: true }),
  call: r("call", "calls", "called", "calling"),
  visit: r("visit", "visits", "visited", "visiting"),
  help: r("help", "helps", "helped", "helping"),
  travel: r("travel", "travels", "traveled", "traveling"),
  wash: r("wash", "washes", "washed", "washing"),
  paint: r("paint", "paints", "painted", "painting"),
  fix: r("fix", "fixes", "fixed", "fixing"),
  deliver: r("deliver", "delivers", "delivered", "delivering"),
  wait: r("wait", "waits", "waited", "waiting"),
  rain: r("rain", "rains", "rained", "raining"),
  stop: r("stop", "stops", "stopped", "stopping", { momentary: true }),
  plan: r("plan", "plans", "planned", "planning"),
  carry: r("carry", "carries", "carried", "carrying"),
  use: r("use", "uses", "used", "using"),
  like: r("like", "likes", "liked", "liking", { stative: true }),
  want: r("want", "wants", "wanted", "wanting", { stative: true }),
  need: r("need", "needs", "needed", "needing", { stative: true }),
  own: r("own", "owns", "owned", "owning", { stative: true }),
  arrive: r("arrive", "arrives", "arrived", "arriving", { momentary: true }),
  // irregular
  write: v("write", "writes", "wrote", "written", "writing"),
  read: v("read", "reads", "read", "read", "reading"),
  eat: v("eat", "eats", "ate", "eaten", "eating"),
  drink: v("drink", "drinks", "drank", "drunk", "drinking"),
  speak: v("speak", "speaks", "spoke", "spoken", "speaking"),
  learn: r("learn", "learns", "learned", "learning"),
  build: v("build", "builds", "built", "built", "building"),
  send: v("send", "sends", "sent", "sent", "sending"),
  buy: v("buy", "buys", "bought", "bought", "buying"),
  make: v("make", "makes", "made", "made", "making"),
  take: v("take", "takes", "took", "taken", "taking"),
  teach: v("teach", "teaches", "taught", "taught", "teaching"),
  know: v("know", "knows", "knew", "known", "knowing", { stative: true }),
  understand: v("understand", "understands", "understood", "understood", "understanding", {
    stative: true,
  }),
  run: v("run", "runs", "ran", "run", "running"),
  swim: v("swim", "swims", "swam", "swum", "swimming"),
  sing: v("sing", "sings", "sang", "sung", "singing"),
  drive: v("drive", "drives", "drove", "driven", "driving"),
  sell: v("sell", "sells", "sold", "sold", "selling"),
  grow: v("grow", "grows", "grew", "grown", "growing"),
  go: v("go", "goes", "went", "gone", "going"),
  come: v("come", "comes", "came", "come", "coming"),
  see: v("see", "sees", "saw", "seen", "seeing", { stative: true }),
  give: v("give", "gives", "gave", "given", "giving"),
  find: v("find", "finds", "found", "found", "finding", { momentary: true }),
  lose: v("lose", "loses", "lost", "lost", "losing", { momentary: true }),
  win: v("win", "wins", "won", "won", "winning", { momentary: true }),
  meet: v("meet", "meets", "met", "met", "meeting"),
  leave: v("leave", "leaves", "left", "left", "leaving", { momentary: true }),
  begin: v("begin", "begins", "began", "begun", "beginning", { momentary: true }),
  steal: v("steal", "steals", "stole", "stolen", "stealing"),
  have: v("have", "has", "had", "had", "having", { stative: true }),
};

/** Spelling rules for regular verbs — used by tests to validate the lexicon. */
export function regularThirdPerson(base: string): string {
  if (/[^aeiou]y$/.test(base)) return base.slice(0, -1) + "ies";
  if (/(s|sh|ch|x|z|o)$/.test(base)) return base + "es";
  return base + "s";
}

export function regularPast(base: string): string {
  if (base.endsWith("e")) return base + "d";
  if (/[^aeiou]y$/.test(base)) return base.slice(0, -1) + "ied";
  return base + "ed";
}
