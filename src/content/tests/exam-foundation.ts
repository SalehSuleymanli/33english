import type { Test } from "./types";

export const EXAM_FOUNDATION: Test = {
  id: "exam-foundation",
  kind: "exam",
  title: { en: "Foundation grammar exam", az: "Təməl qrammatika imtahanı", ru: "Экзамен по базовой грамматике" },
  description: {
    en: "Days 1–10: there is, to be, simple and continuous tenses, modals and have — in the present, past and future. New sentences, not copied from the lessons.",
    az: "1–10-cu günlər: there is, to be, sadə və davamedici zamanlar, modal feillər və have — indiki, keçmiş və gələcək zamanda. Dərslərdən köçürülməmiş yeni cümlələr.",
    ru: "Дни 1–10: there is, to be, простые и длительные времена, модальные глаголы и have — в настоящем, прошедшем и будущем. Новые предложения, не из уроков.",
  },
  minutes: 20,
  timed: true,
  passMark: 70,
  sections: [
    {
      title: "Part 1 — Choose the correct answer",
      instructions: { en: "Choose one answer.", az: "Bir cavab seçin.", ru: "Выберите один ответ." },
      questions: [
        { id: "f01", type: "choice", skill: "existence", prompt: "___ a lot of noise outside. What's happening?", options: ["There are", "There is", "It has", "Is"], answer: 1, why: { az: "Noise sayılmayandır → there is.", ru: "Noise — неисчисляемое → there is." } },
        { id: "f02", type: "choice", skill: "existence", prompt: "Were there ___ problems with the delivery?", options: ["some", "any", "no", "a"], answer: 1, why: { az: "Sualda adətən any işlənir.", ru: "В вопросе обычно используется any." } },
        { id: "f03", type: "choice", skill: "states", prompt: "Neither of my parents ___ at the wedding last Saturday.", options: ["were", "was", "is", "are"], answer: 1, why: { az: "Neither of … tək kimi işlənir; keçmişdə was.", ru: "Neither of … согласуется с единственным числом; в прошлом — was." } },
        { id: "f04", type: "choice", skill: "states", prompt: "\"Are you from Ganja?\" \"No, I ___.\"", options: ["am not", "isn't", "don't", "amn't"], answer: 0, why: { az: "Qısa inkar cavabı: No, I am not (No, I'm not). \"I\" ilə isn't və amn't olmur.", ru: "Краткий отрицательный ответ: No, I am not (No, I'm not). С «I» не бывает isn't и amn't." } },
        { id: "f05", type: "choice", skill: "actions", prompt: "How often ___ your brother visit you?", options: ["do", "does", "is", "has"], answer: 1, why: { az: "Your brother = he → does.", ru: "Your brother = he → does." } },
        { id: "f06", type: "choice", skill: "actions", prompt: "When I got home, my kids ___ cartoons.", options: ["watched", "were watching", "are watching", "watch"], answer: 1, why: { az: "Evə gələndə proses gedirdi → Past Continuous.", ru: "Когда я пришёл, процесс уже шёл → Past Continuous." } },
        { id: "f07", type: "choice", skill: "actions", prompt: "This coffee ___ terrible. I'm not drinking it.", options: ["is tasting", "tastes", "taste", "tasting"], answer: 1, why: { az: "Taste (dad vermək) vəziyyət feilidir → Present Simple.", ru: "Taste (иметь вкус) — глагол состояния → Present Simple." } },
        { id: "f08", type: "choice", skill: "modals", prompt: "You ___ bring food. Lunch is included in the price.", options: ["mustn't", "don't have to", "can't", "shouldn't to"], answer: 1, why: { az: "Lazım deyil (məcburiyyət yoxdur) → don't have to. Mustn't qadağadır.", ru: "Не нужно (нет обязанности) → don't have to. Mustn't — запрет." } },
        { id: "f09", type: "choice", skill: "modals", prompt: "After the operation, she ___ walk for two months.", options: ["couldn't", "can't", "wasn't able", "mustn't"], answer: 0, why: { az: "Keçmişdə bacarmamaq → couldn't (wasn't able TO walk olardı).", ru: "Невозможность в прошлом → couldn't (было бы wasn't able TO walk)." } },
        { id: "f10", type: "choice", skill: "possession", prompt: "We ___ enough chairs for everyone. Can you bring two more?", options: ["haven't", "don't have", "hasn't", "aren't having"], answer: 1, why: { az: "Sahiblik inkarı → don't have.", ru: "Отрицание обладания → don't have." } },
      ],
    },
    {
      title: "Part 2 — Complete the sentence",
      instructions: { en: "Type the missing word or words.", az: "Buraxılmış söz(lər)i yazın.", ru: "Впишите пропущенное слово (слова)." },
      questions: [
        { id: "f13", type: "fill", skill: "existence", prompt: "___ there a pharmacy near the station? (present)", accept: ["Is"], why: { az: "Mövcudluq sualı: Is there…?", ru: "Вопрос о наличии: Is there…?" } },
        { id: "f14", type: "fill", skill: "actions", prompt: "She ___ (not / call) me yesterday.", accept: ["didn't call", "did not call"], why: { az: "Keçmiş inkar: didn't + V1.", ru: "Отрицание в прошлом: didn't + V1." } },
        { id: "f15", type: "fill", skill: "actions", prompt: "Listen! Somebody ___ (knock) at the door.", accept: ["is knocking", "'s knocking"], why: { az: "Listen! → indi baş verir → is + -ing.", ru: "Listen! → происходит сейчас → is + -ing." } },
        { id: "f16", type: "fill", skill: "modals", prompt: "I can't come today, but I ___ (be able to) come tomorrow.", accept: ["will be able to", "'ll be able to"], why: { az: "Gələcək bacarıq: will be able to.", ru: "Умение в будущем: will be able to." } },
      ],
    },
    {
      title: "Part 3 — Find and correct the mistake",
      instructions: { en: "Each sentence has one mistake. Type the whole correct sentence.", az: "Hər cümlədə bir səhv var. Düzgün cümləni tam yazın.", ru: "В каждом предложении одна ошибка. Напишите всё предложение правильно." },
      questions: [
        { id: "f18", type: "correct", skill: "states", prompt: "My brother has 30 years.", accept: ["My brother is 30.", "My brother is 30 years old.", "My brother is thirty.", "My brother is thirty years old."], why: { az: "Yaş be ilə deyilir.", ru: "Возраст выражается через be." } },
        { id: "f19", type: "correct", skill: "existence", prompt: "In our office are two kitchens.", accept: ["There are two kitchens in our office."], why: { az: "Yeni şeyi there are ilə təqdim edin, yeri sona qoyun.", ru: "Новое вводится через there are, место — в конце." } },
        { id: "f20", type: "correct", skill: "actions", prompt: "Does your sister works on Saturdays?", accept: ["Does your sister work on Saturdays?"], why: { az: "Does-dan sonra V1 (-s yox).", ru: "После does — V1 (без -s)." } },
        { id: "f21", type: "correct", skill: "modals", prompt: "You should to drink more water.", accept: ["You should drink more water."], why: { az: "Should-dan sonra to işlənmir.", ru: "После should «to» не ставится." } },
      ],
    },
    {
      title: "Part 4 — Rewrite the sentence",
      questions: [
        { id: "f23", type: "transform", skill: "states", prompt: "The museum is open on Mondays.", instruction: { en: "Make it a question.", az: "Sual qurun.", ru: "Сделайте вопрос." }, accept: ["Is the museum open on Mondays?"], why: { az: "Be önə keçir.", ru: "Be выходит вперёд." } },
        { id: "f24", type: "transform", skill: "actions", prompt: "They take the bus to work.", instruction: { en: "Put it in the past and make it negative.", az: "Keçmiş zamanda inkar edin.", ru: "Поставьте в прошедшее время и сделайте отрицание." }, accept: ["They didn't take the bus to work.", "They did not take the bus to work."], why: { az: "didn't + V1 (take).", ru: "didn't + V1 (take)." } },
      ],
    },
    {
      title: "Part 5 — Put the words in order",
      questions: [
        { id: "f25", type: "order", skill: "actions", tiles: ["usually", "doesn't", "breakfast", "she", "eat"], answer: "she usually doesn't eat breakfast", why: { az: "Tezlik zərfi köməkçidən əvvəl: She usually doesn't eat…", ru: "Наречие частоты перед вспомогательным: She usually doesn't eat…" } },
        { id: "f26", type: "order", skill: "existence", tiles: ["any", "were", "tickets", "there", "left"], answer: "were there any tickets left", why: { az: "Sual: Were there any … ?", ru: "Вопрос: Were there any … ?" } },
      ],
    },
  ],
};
