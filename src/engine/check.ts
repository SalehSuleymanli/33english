/**
 * Answer checking.
 *
 * Distinguishes four outcomes:
 *  - correct:      matches an accepted answer (contractions, case, punctuation,
 *                  US/UK spelling do not matter)
 *  - alternative:  a different but grammatically valid answer, with a note
 *  - close:        differs from the model answer by a word or two — shown as a
 *                  word-level comparison, but NOT counted as correct, because a
 *                  one-letter difference can be a grammar error (gos / goes)
 *  - incorrect:    with targeted feedback when the mistake is a known trap
 */
import type { TextAnswer } from "@/content/types";

export type CheckStatus = "correct" | "alternative" | "close" | "incorrect";
export type DiffPart = { text: string; kind: "same" | "missing" | "extra" };
export type CheckResult = {
  status: CheckStatus;
  model: string;
  note?: string;
  diff?: DiffPart[];
};

const UK_TO_US: Record<string, string> = {
  travelled: "traveled",
  travelling: "traveling",
  traveller: "traveler",
  cancelled: "canceled",
  cancelling: "canceling",
  colour: "color",
  colours: "colors",
  favourite: "favorite",
  centre: "center",
  theatre: "theater",
  neighbour: "neighbor",
  neighbours: "neighbors",
  behaviour: "behavior",
  realise: "realize",
  realised: "realized",
  organise: "organize",
  organised: "organized",
  apologise: "apologize",
  practise: "practice",
  practised: "practiced",
  grey: "gray",
  programme: "program",
  learnt: "learned",
  dreamt: "dreamed",
  metre: "meter",
  litre: "liter",
  jewellery: "jewelry",
  mum: "mom",
  licence: "license",
  defence: "defense",
  humour: "humor",
  honour: "honor",
  flavour: "flavor",
  labour: "labor",
};

const NOT_EXPAND: Record<string, string> = {
  "can't": "can not",
  cannot: "can not",
  "won't": "will not",
  "shan't": "shall not",
  "ain't": "am not",
};

const AMBIGUOUS_S = new Set([
  "he's", "she's", "it's", "there's", "that's", "what's", "who's", "where's", "how's", "here's", "when's", "why's",
]);

/** Basic normalisation: case, quotes, punctuation, whitespace, spelling variants. */
export function basicNormalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/[“”"]/g, "")
    .replace(/—|–/g, " ")
    .replace(/[.,!?;:()]/g, " ")
    .replace(/\s+'(s|re|m|ve|ll|d)\b/g, "'$1") // "it 's" → "it's" (from fill-in gaps)
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((w) => UK_TO_US[w] ?? w)
    .join(" ");
}

/**
 * Expand contractions. Ambiguous ones ('s = is/has, 'd = had/would) produce
 * several variants; we compare sets of variants.
 */
export function variants(s: string): string[] {
  const words = basicNormalize(s).split(" ").filter(Boolean);
  let acc: string[][] = [[]];
  for (const w of words) {
    let opts: string[];
    if (NOT_EXPAND[w]) opts = [NOT_EXPAND[w]];
    else if (w.endsWith("n't")) opts = [w.slice(0, -3) + " not"];
    else if (w.endsWith("'m")) opts = [w.slice(0, -2) + " am"];
    else if (w.endsWith("'re")) opts = [w.slice(0, -3) + " are"];
    else if (w.endsWith("'ve")) opts = [w.slice(0, -3) + " have"];
    else if (w.endsWith("'ll")) opts = [w.slice(0, -3) + " will"];
    else if (w.endsWith("'d")) opts = [w.slice(0, -2) + " would", w.slice(0, -2) + " had"];
    else if (AMBIGUOUS_S.has(w)) opts = [w.slice(0, -2) + " is", w.slice(0, -2) + " has"];
    else opts = [w];
    const next: string[][] = [];
    for (const a of acc) for (const o of opts) next.push([...a, o]);
    acc = next.slice(0, 64); // cap combinatorial growth
  }
  return [...new Set(acc.map((a) => a.join(" ")))];
}

export function equivalent(a: string, b: string): boolean {
  const va = variants(a);
  const vb = new Set(variants(b));
  return va.some((x) => vb.has(x));
}

export function checkText(input: string, answer: TextAnswer): CheckResult {
  const model = answer.accept[0];
  if (!input.trim()) return { status: "incorrect", model, note: "Type an answer first." };

  if (answer.accept.some((a) => equivalent(input, a))) return { status: "correct", model };

  const alt = answer.alternatives?.find((a) => equivalent(input, a.text));
  if (alt) return { status: "alternative", model, note: alt.note };

  const trap = answer.traps?.find((t) => equivalent(input, t.text));
  if (trap) return { status: "incorrect", model, note: trap.feedback, diff: usefulDiff(input, model) };

  // closeness: compare against the nearest accepted answer
  const best = nearest(input, answer.accept);
  const diff = wordDiff(input, best);
  const changed = diff.filter((d) => d.kind !== "same").length;
  const total = best.split(/\s+/).length;
  if (changed <= 2 && total >= 3) return { status: "close", model: best, diff, note: "Almost — compare the highlighted words." };
  return { status: "incorrect", model: best, diff: usefulDiff(input, best) };
}

/** A word diff only helps when the answer is mostly right; otherwise just show the model answer. */
function usefulDiff(input: string, model: string): DiffPart[] | undefined {
  const d = wordDiff(input, model);
  const same = d.filter((p) => p.kind === "same").length;
  const modelWords = d.filter((p) => p.kind !== "extra").length;
  return modelWords && same / modelWords >= 0.5 ? d : undefined;
}

export function checkOrder(tiles: string[], picked: string[], alsoValid: string[] = []): CheckResult {
  const model = tiles.join(" ");
  const attempt = picked.join(" ");
  if (equivalent(attempt, model)) return { status: "correct", model };
  if (alsoValid.some((a) => equivalent(attempt, a))) return { status: "alternative", model, note: "That word order is also correct." };
  return { status: "incorrect", model, diff: usefulDiff(attempt, model) };
}

function nearest(input: string, accepted: string[]): string {
  let best = accepted[0];
  let bestD = Infinity;
  const a = basicNormalize(input);
  for (const c of accepted) {
    const d = levenshtein(a, basicNormalize(c));
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }
  return best;
}

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

/** Word-level diff (LCS) between the learner's answer and the model answer. */
export function wordDiff(input: string, model: string): DiffPart[] {
  const a = basicNormalize(input).split(" ").filter(Boolean);
  const bRaw = model.replace(/[.?!]$/, "").split(/\s+/);
  const b = bRaw.map((w) => basicNormalize(w));
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out: DiffPart[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      out.push({ text: bRaw[j], kind: "same" });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ text: a[i], kind: "extra" });
      i++;
    } else {
      out.push({ text: bRaw[j], kind: "missing" });
      j++;
    }
  }
  while (i < a.length) out.push({ text: a[i++], kind: "extra" });
  while (j < b.length) out.push({ text: bRaw[j++], kind: "missing" });
  return out;
}

/** Speech: compare a recognised transcript with the target words. Not a pronunciation score. */
export function transcriptMatch(transcript: string, target: string) {
  const t = basicNormalize(transcript).split(" ").filter(Boolean);
  const words = basicNormalize(target).split(" ").filter(Boolean);
  const pool = [...t];
  const matched = words.map((w) => {
    const k = pool.indexOf(w);
    if (k >= 0) {
      pool.splice(k, 1);
      return { word: w, heard: true };
    }
    return { word: w, heard: false };
  });
  const ratio = words.length ? matched.filter((m) => m.heard).length / words.length : 0;
  return { matched, ratio };
}
