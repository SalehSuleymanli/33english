/**
 * Placement check: 18 multiple-choice questions. A quick estimate of where to
 * start — not an official CEFR or exam-level assessment.
 */
export type PlacementArea = "existence" | "states" | "actions" | "modals" | "possession" | "passive" | "combination" | "communication";
export type PlacementQ = { id: string; area: PlacementArea; q: string; options: string[]; answer: number };

export const PLACEMENT: PlacementQ[] = [
  { id: "pl01", area: "existence", q: "___ three banks on this street.", options: ["There is", "There are", "It has", "They are"], answer: 1 },
  { id: "pl02", area: "existence", q: "___ any milk in the fridge?", options: ["Are there", "Is there", "Has it", "Does there"], answer: 1 },
  { id: "pl03", area: "states", q: "My parents ___ at home yesterday.", options: ["was", "were", "are", "did be"], answer: 1 },
  { id: "pl04", area: "states", q: "Choose the correct question.", options: ["Is she a doctor?", "Does she a doctor?", "She is a doctor?", "Is a doctor she?"], answer: 0 },
  { id: "pl05", area: "actions", q: "My sister ___ in a hospital.", options: ["work", "works", "is work", "working"], answer: 1 },
  { id: "pl06", area: "actions", q: "___ you see the match last night?", options: ["Do", "Were", "Did", "Have"], answer: 2 },
  { id: "pl07", area: "actions", q: "Quiet, please — the baby ___.", options: ["sleeps", "is sleeping", "sleep", "slept"], answer: 1 },
  { id: "pl08", area: "modals", q: "You ___ smoke here. It's not allowed.", options: ["don't have to", "mustn't", "might not", "aren't able"], answer: 1 },
  { id: "pl09", area: "modals", q: "When I was five, I ___ swim.", options: ["can", "could", "can to", "was able"], answer: 1 },
  { id: "pl10", area: "possession", q: "___ you have any brothers or sisters?", options: ["Have", "Are", "Do", "Has"], answer: 2 },
  { id: "pl11", area: "possession", q: "She ___ a car last year.", options: ["has", "didn't have", "doesn't had", "hadn't"], answer: 1 },
  { id: "pl12", area: "passive", q: "This bridge ___ in 1890.", options: ["built", "was built", "is building", "has build"], answer: 1 },
  { id: "pl13", area: "passive", q: "English ___ in many countries.", options: ["speaks", "is spoken", "is speaking", "spoken"], answer: 1 },
  { id: "pl14", area: "combination", q: "I ___ to Japan twice.", options: ["have been", "was been", "have gone to", "am been"], answer: 0 },
  { id: "pl15", area: "combination", q: "Who ___ the window?", options: ["did break", "broke", "breaked", "did broke"], answer: 1 },
  { id: "pl16", area: "combination", q: "I ___ play tennis, but now I don't.", options: ["use to", "am used to", "used to", "was used to"], answer: 2 },
  { id: "pl17", area: "communication", q: "If I ___ more time, I would travel more.", options: ["have", "had", "will have", "would have"], answer: 1 },
  { id: "pl18", area: "communication", q: "The man ___ lives next door is a pilot.", options: ["which", "who", "whom", "whose"], answer: 1 },
];

const FOUNDATION: PlacementArea[] = ["existence", "states", "actions", "modals", "possession", "passive"];

export function scorePlacement(answers: Record<string, number>) {
  const byArea: Record<string, { correct: number; total: number }> = {};
  let score = 0;
  for (const q of PLACEMENT) {
    const a = (byArea[q.area] ??= { correct: 0, total: 0 });
    a.total++;
    if (answers[q.id] === q.answer) {
      a.correct++;
      score++;
    }
  }
  const sum = (areas: PlacementArea[]) => areas.reduce((acc, k) => ({ c: acc.c + (byArea[k]?.correct ?? 0), t: acc.t + (byArea[k]?.total ?? 0) }), { c: 0, t: 0 });
  const f = sum(FOUNDATION);
  const c = sum(["combination", "communication"]);
  let band: "starter" | "builder" | "connector" = "starter";
  let suggestedStartDay = 1;
  if (f.c / f.t >= 0.85) {
    band = "builder";
    suggestedStartDay = 12;
    if (c.c / c.t >= 0.8) {
      band = "connector";
      suggestedStartDay = 22;
    }
  }
  return { score, total: PLACEMENT.length, byArea, band, suggestedStartDay };
}
