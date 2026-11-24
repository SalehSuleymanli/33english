import type { Test } from "./types";

export const EXAM_COMMUNICATION: Test = {
  id: "exam-communication",
  kind: "exam",
  title: { en: "Communication grammar exam", az: "Ünsiyyət qrammatika imtahanı", ru: "Экзамен «Общение»" },
  description: {
    en: "Days 22–33: comparisons, relative clauses, conditionals, feelings, connectors, preferences, reported speech and storytelling.",
    az: "22–33-cü günlər: müqayisə, nisbi cümlələr, şərt cümlələri, hisslər, bağlayıcılar, üstünlük, dolayı nitq və hekayə.",
    ru: "Дни 22–33: сравнения, относительные придаточные, условные предложения, чувства, связки, предпочтения, косвенная речь и рассказ.",
  },
  minutes: 20,
  timed: true,
  passMark: 70,
  sections: [
    {
      title: "Part 1 — Choose the correct answer",
      questions: [
        { id: "c01", type: "choice", skill: "comparatives", prompt: "This is ___ film I've ever seen.", options: ["the worse", "the worst", "worst", "the most bad"], answer: 1, why: { az: "Üstünlük dərəcəsi + ever seen → the worst.", ru: "Превосходная степень + ever seen → the worst." } },
        { id: "c02", type: "choice", skill: "comparatives", prompt: "The train is ___ faster than the bus.", options: ["very", "much", "more", "most"], answer: 1, why: { az: "Müqayisə dərəcəsindən əvvəl much (very yox).", ru: "Перед сравнительной степенью — much (не very)." } },
        { id: "c03", type: "choice", skill: "as-as", prompt: "My new phone isn't ___ my old one.", options: ["as good as", "as better as", "so good like", "good as"], answer: 0, why: { az: "not as + sifət + as.", ru: "not as + прилагательное + as." } },
        { id: "c04", type: "choice", skill: "relative", prompt: "That's the woman ___ son plays for the national team.", options: ["who", "which", "whose", "that"], answer: 2, why: { az: "Sahiblik → whose (kimin oğlu).", ru: "Принадлежность → whose (чей сын)." } },
        { id: "c05", type: "choice", skill: "conditionals", prompt: "If it ___ tomorrow, we'll cancel the picnic.", options: ["will rain", "rains", "rained", "would rain"], answer: 1, why: { az: "If hissəsində will yox → Present Simple.", ru: "В части с if нет will → Present Simple." } },
        { id: "c06", type: "choice", skill: "conditionals", prompt: "If I ___ you, I'd take the job.", options: ["am", "was being", "were", "will be"], answer: 2, why: { az: "Xəyali vəziyyət → If I were you.", ru: "Нереальная ситуация → If I were you." } },
        { id: "c07", type: "choice", skill: "conditionals", prompt: "If we had left earlier, we ___ the train.", options: ["wouldn't miss", "won't miss", "wouldn't have missed", "didn't miss"], answer: 2, why: { az: "Keçmiş xəyali şərt → would have + V3.", ru: "Нереальное прошлое → would have + V3." } },
        { id: "c08", type: "choice", skill: "feelings", prompt: "The lecture was so long that everyone felt ___.", options: ["boring", "bored", "bore", "boredom"], answer: 1, why: { az: "İnsanın hissi → -ed: bored.", ru: "Чувство человека → -ed: bored." } },
        { id: "c09", type: "choice", skill: "connectors", prompt: "___ the heavy traffic, we arrived on time.", options: ["Although", "Despite", "However", "Even though"], answer: 1, why: { az: "İsimdən əvvəl despite; although-dan sonra cümlə gəlir.", ru: "Перед существительным — despite; после although идёт предложение." } },
        { id: "c10", type: "choice", skill: "preferences", prompt: "I'd rather ___ at home tonight.", options: ["stay", "to stay", "staying", "stayed"], answer: 0, why: { az: "Would rather + V1 (to yoxdur).", ru: "Would rather + V1 (без to)." } },
        { id: "c11", type: "choice", skill: "reported", prompt: "She asked me where ___.", options: ["did I live", "I lived", "do I live", "I did live"], answer: 1, why: { az: "Dolayı sualda düz söz sırası, did yoxdur.", ru: "В косвенном вопросе прямой порядок, без did." } },
        { id: "c12", type: "choice", skill: "story", prompt: "When we got to the cinema, the film ___.", options: ["already started", "has already started", "had already started", "was already start"], answer: 2, why: { az: "Daha əvvəl olmuş hadisə → Past Perfect.", ru: "Событие, случившееся раньше → Past Perfect." } },
      ],
    },
    {
      title: "Part 2 — Complete the sentence",
      questions: [
        { id: "c13", type: "fill", skill: "comparatives", prompt: "Baku is ___ (big) city in the Caucasus.", accept: ["the biggest", "the largest"], why: { az: "Üstünlük dərəcəsi: the biggest.", ru: "Превосходная степень: the biggest." } },
        { id: "c14", type: "fill", skill: "connectors", prompt: "I'm not sure ___ I should accept the offer. (whether / despite)", accept: ["whether", "if"], why: { az: "İki variant arasında şübhə → whether.", ru: "Сомнение между вариантами → whether." } },
        { id: "c15", type: "fill", skill: "ing-to", prompt: "Would you mind ___ (close) the window?", accept: ["closing"], why: { az: "Mind + -ing.", ru: "Mind + -ing." } },
        { id: "c16", type: "fill", skill: "reported", prompt: "\"I will call you.\" → He said he ___ call me.", accept: ["would"], why: { az: "Said-dən sonra will → would.", ru: "После said: will → would." } },
      ],
    },
    {
      title: "Part 3 — Find and correct the mistake",
      questions: [
        { id: "c17", type: "correct", skill: "relative", prompt: "The book that I bought it was very expensive.", accept: ["The book that I bought was very expensive.", "The book I bought was very expensive.", "The book which I bought was very expensive."], why: { az: "That artıq it-in yerini tutur; it təkrar olunmur.", ru: "That уже заменяет it; it не повторяется." } },
        { id: "c18", type: "correct", skill: "preferences", prompt: "Neither of my friends didn't come.", accept: ["Neither of my friends came."], why: { az: "Neither özü inkardır.", ru: "Neither — уже отрицание." } },
        { id: "c19", type: "correct", skill: "feelings", prompt: "I'm interesting in history.", accept: ["I'm interested in history.", "I am interested in history."], why: { az: "Hiss → interested.", ru: "Чувство → interested." } },
      ],
    },
    {
      title: "Part 4 — Rewrite the sentence",
      questions: [
        { id: "c20", type: "transform", skill: "reported", prompt: "\"Please don't be late,\" my boss said to me.", instruction: { en: "Report it: My boss told me…", az: "Dolayı nitqə çevirin: My boss told me…", ru: "Передайте косвенно: My boss told me…" }, accept: ["My boss told me not to be late."], why: { az: "told + şəxs + not to + V1.", ru: "told + человек + not to + V1." } },
        { id: "c21", type: "transform", skill: "relative", prompt: "I met a man. He works at NASA.", instruction: { en: "Join with who.", az: "Who ilə birləşdirin.", ru: "Соедините с помощью who." }, accept: ["I met a man who works at NASA."], why: { az: "İsim + who + feil.", ru: "Существительное + who + глагол." } },
        { id: "c22", type: "transform", skill: "as-as", prompt: "Tea is cheaper than coffee.", instruction: { en: "Use: not as … as (start with Coffee)", az: "İşlədin: not as … as (Coffee ilə başlayın)", ru: "Используйте: not as … as (начните с Coffee)" }, accept: ["Coffee isn't as cheap as tea.", "Coffee is not as cheap as tea."], why: { az: "Qəhvə çay qədər ucuz deyil.", ru: "Кофе не такой дешёвый, как чай." } },
      ],
    },
  ],
};
