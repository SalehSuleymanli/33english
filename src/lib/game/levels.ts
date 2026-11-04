/**
 * Level curve — must match public.level_for_xp in the database.
 * XP to go from level L to L+1 = 150 + 75·(L−1). Early levels come quickly,
 * later ones need steady practice rather than one long session.
 */
export function xpToReach(level: number): number {
  const l = Math.max(1, Math.floor(level)) - 1;
  return 150 * l + (75 * l * (l - 1)) / 2;
}

export function levelForXp(xp: number): number {
  let l = 1;
  while (l < 200 && xpToReach(l + 1) <= Math.max(0, xp)) l++;
  return l;
}

export function levelProgress(xp: number) {
  const level = levelForXp(xp);
  const floor = xpToReach(level);
  const ceil = xpToReach(level + 1);
  return { level, into: xp - floor, span: ceil - floor, toNext: ceil - xp, ratio: (xp - floor) / (ceil - floor) };
}

const TITLES: [number, string][] = [
  [1, "Newcomer"],
  [3, "Explorer"],
  [5, "Sentence Builder"],
  [8, "Frame Keeper"],
  [12, "Storyteller"],
  [16, "Conversationalist"],
  [20, "Wordsmith"],
  [25, "Grand Master"],
];

export function levelTitle(level: number): string {
  let t = TITLES[0][1];
  for (const [min, name] of TITLES) if (level >= min) t = name;
  return t;
}
