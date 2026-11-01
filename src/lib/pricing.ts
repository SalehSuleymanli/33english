/**
 * Displayed prices. These are proposals — confirm them before launch, and make
 * sure they match the prices configured in your payment provider.
 */
export const PRICES = {
  currency: "USD",
  monthly: 9.99,
  annual: 59.99, // ≈ 5.00 / month
};

export const PREMIUM_FEATURES = [
  "All 33 days of the course",
  "Days 8–33: modals, possession, passive, perfect forms, conditionals, relative clauses and more",
  "All real-life scenarios",
  "Detailed progress by frame and skill",
  "Future courses and learning paths as they are released",
];

export const FREE_FEATURES = [
  "Days 1–7: the first three frames",
  "The Sentence Lab — all six frames",
  "Placement check",
  "Spaced review and mistake practice",
  "Your word collection and bookmarks",
  "Progress tracking",
];

export const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: PRICES.currency }).format(n);
