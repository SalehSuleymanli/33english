import type { Test } from "./types";

export const EXAM_EXPANSION: Test = {
  id: "exam-expansion",
  kind: "exam",
  title: { en: "Expansion grammar exam", az: "Genişlənmə qrammatika imtahanı", ru: "Экзамен «Расширение»" },
  description: {
    en: "Days 11–19: want someone to, comparisons, who / which / that, as … as, it + adjective + to, perfect tenses, question words, going to and the passive.",
    az: "11–19-cu günlər: want someone to, müqayisə, who / which / that, as … as, it + sifət + to, Perfect zamanlar, sual sözləri, going to və passive.",
    ru: "Дни 11–19: want someone to, сравнения, who / which / that, as … as, it + прилагательное + to, времена Perfect, вопросительные слова, going to и пассив.",
  },
  minutes: 20,
  timed: true,
  passMark: 70,
  sections: [
    {
      title: "Part 1 — Choose the correct answer",
      questions: [
        { id: "x01", type: "choice", skill: "questions", prompt: "Who ___ you about the meeting?", options: ["did tell", "told", "did told", "tells did"], answer: 1, why: { az: "Mübtəda sualı: köməkçi yoxdur → Who told…?", ru: "Вопрос к подлежащему: без вспомогательного → Who told…?" } },
        { id: "x02", type: "choice", skill: "questions", prompt: "What ___ you looking for?", options: ["do", "are", "did", "have"], answer: 1, why: { az: "Looking → davamlı → are.", ru: "Looking → длительное → are." } },
        { id: "x03", type: "choice", skill: "want-to", prompt: "My manager wants ___ the report by Friday.", options: ["that I finish", "me finish", "me to finish", "I to finish"], answer: 2, why: { az: "want + şəxs (me) + to + V1.", ru: "want + человек (me) + to + V1." } },
        { id: "x04", type: "choice", skill: "perfect", prompt: "I ___ him since we were at school.", options: ["know", "knew", "have known", "am knowing"], answer: 2, why: { az: "Since + indiyə qədər → Present Perfect; know continuous olmur.", ru: "Since + до сих пор → Present Perfect; know не бывает в Continuous." } },
        { id: "x05", type: "choice", skill: "perfect", prompt: "\"Is Aysel here?\" \"No, she ___ to the bank. She'll be back soon.\"", options: ["has been", "has gone", "went", "goes"], answer: 1, why: { az: "Gedib və hələ oradadır → has gone.", ru: "Ушла и ещё там → has gone." } },
        { id: "x06", type: "choice", skill: "perfect", prompt: "Your eyes are red. ___ you been crying?", options: ["Did", "Are", "Have", "Were"], answer: 2, why: { az: "Görünən nəticə + proses → Present Perfect Continuous: Have you been crying?", ru: "Видимый результат + процесс → Present Perfect Continuous: Have you been crying?" } },
        { id: "x07", type: "choice", skill: "future", prompt: "Look at those dark clouds. It ___ rain.", options: ["will", "is going to", "is raining", "rains"], answer: 1, why: { az: "Əlamətə əsaslanan proqnoz → going to.", ru: "Прогноз по видимым признакам → going to." } },
        { id: "x08", type: "choice", skill: "it-adj", prompt: "The box was too heavy ___.", options: ["for me to lift", "that I lift", "to me lifting", "for lifting me"], answer: 0, why: { az: "too + sifət + for + şəxs + to + V1.", ru: "too + прилагательное + for + человек + to + V1." } },
        { id: "f11", type: "choice", skill: "passive", prompt: "The winners ___ next Monday.", options: ["will announce", "will be announced", "are announcing", "announced"], answer: 1, why: { az: "Qaliblər elan EDİLƏCƏK (onları elan edirlər) → will be + V3.", ru: "Победителей объявят (они — объект) → will be + V3." } },
        { id: "f12", type: "choice", skill: "passive", prompt: "Where ___ this photo taken?", options: ["did", "was", "were", "has"], answer: 1, why: { az: "Keçmiş passive sual: Was + mübtəda + V3?", ru: "Вопрос в прошедшем пассиве: Was + подлежащее + V3?" } },
        { id: "c01", type: "choice", skill: "comparatives", prompt: "This is ___ film I've ever seen.", options: ["the worse", "the worst", "worst", "the most bad"], answer: 1, why: { az: "Üstünlük dərəcəsi + ever seen → the worst.", ru: "Превосходная степень + ever seen → the worst." } },
        { id: "c02", type: "choice", skill: "comparatives", prompt: "The train is ___ faster than the bus.", options: ["very", "much", "more", "most"], answer: 1, why: { az: "Müqayisə dərəcəsindən əvvəl much (very yox).", ru: "Перед сравнительной степенью — much (не very)." } },
        { id: "c03", type: "choice", skill: "as-as", prompt: "My new phone isn't ___ my old one.", options: ["as good as", "as better as", "so good like", "good as"], answer: 0, why: { az: "not as + sifət + as.", ru: "not as + прилагательное + as." } },
        { id: "c04", type: "choice", skill: "relative", prompt: "That's the woman ___ son plays for the national team.", options: ["who", "which", "whose", "that"], answer: 2, why: { az: "Sahiblik → whose (kimin oğlu).", ru: "Принадлежность → whose (чей сын)." } },
      ],
    },
    {
      title: "Part 2 — Complete the sentence",
      questions: [
        { id: "x13", type: "fill", skill: "perfect", prompt: "We ___ (live) in this flat for six years.", accept: ["have lived", "'ve lived", "have been living", "'ve been living"], why: { az: "For + müddət, indiyə qədər → Present Perfect (və ya Continuous).", ru: "For + длительность до сих пор → Present Perfect (или Continuous)." } },
        { id: "x16", type: "fill", skill: "it-adj", prompt: "I don't know ___ to say. (what / how)", accept: ["what"], why: { az: "Nə deməli → what to say.", ru: "Что сказать → what to say." } },
        { id: "f17", type: "fill", skill: "passive", prompt: "Coffee ___ (grow) in Brazil.", accept: ["is grown"], why: { az: "Qəhvəni yetişdirirlər → passive: is grown.", ru: "Кофе выращивают → пассив: is grown." } },
        { id: "c13", type: "fill", skill: "comparatives", prompt: "Baku is ___ (big) city in the Caucasus.", accept: ["the biggest", "the largest"], why: { az: "Üstünlük dərəcəsi: the biggest.", ru: "Превосходная степень: the biggest." } },
      ],
    },
    {
      title: "Part 3 — Find and correct the mistake",
      questions: [
        { id: "x17", type: "correct", skill: "questions", prompt: "Where you did buy that jacket?", accept: ["Where did you buy that jacket?"], why: { az: "Sual sözü + did + mübtəda + V1.", ru: "Вопросительное слово + did + подлежащее + V1." } },
        { id: "x18", type: "correct", skill: "perfect", prompt: "I have seen her last week.", accept: ["I saw her last week."], why: { az: "Last week → Past Simple.", ru: "Last week → Past Simple." } },
        { id: "x19", type: "correct", skill: "want-to", prompt: "The doctor told me don't eat sugar.", accept: ["The doctor told me not to eat sugar."], why: { az: "Tell + şəxs + not to + V1.", ru: "Tell + человек + not to + V1." } },
        { id: "c17", type: "correct", skill: "relative", prompt: "The book that I bought it was very expensive.", accept: ["The book that I bought was very expensive.", "The book I bought was very expensive.", "The book which I bought was very expensive."], why: { az: "That artıq it-in yerini tutur; it təkrar olunmur.", ru: "That уже заменяет it; it не повторяется." } },
      ],
    },
    {
      title: "Part 4 — Rewrite the sentence",
      questions: [
        { id: "x21", type: "transform", skill: "perfect", prompt: "I started learning English two years ago, and I'm still learning it.", instruction: { en: "Use: have been … for", az: "İşlədin: have been … for", ru: "Используйте: have been … for" }, accept: ["I have been learning English for two years.", "I've been learning English for two years."], why: { az: "Müddət + davam → Present Perfect Continuous.", ru: "Длительность + продолжается → Present Perfect Continuous." } },
        { id: "f22", type: "transform", skill: "passive", prompt: "Someone cleans the classrooms every evening.", instruction: { en: "Make it passive.", az: "Passive edin.", ru: "Сделайте пассив." }, accept: ["The classrooms are cleaned every evening."], why: { az: "Obyekt (the classrooms) mübtəda olur; cəm → are cleaned.", ru: "Объект (the classrooms) становится подлежащим; мн. число → are cleaned." } },
        { id: "c21", type: "transform", skill: "relative", prompt: "I met a man. He works at NASA.", instruction: { en: "Join with who.", az: "Who ilə birləşdirin.", ru: "Соедините с помощью who." }, accept: ["I met a man who works at NASA."], why: { az: "İsim + who + feil.", ru: "Существительное + who + глагол." } },
        { id: "c22", type: "transform", skill: "as-as", prompt: "Tea is cheaper than coffee.", instruction: { en: "Use: not as … as (start with Coffee)", az: "İşlədin: not as … as (Coffee ilə başlayın)", ru: "Используйте: not as … as (начните с Coffee)" }, accept: ["Coffee isn't as cheap as tea.", "Coffee is not as cheap as tea."], why: { az: "Qəhvə çay qədər ucuz deyil.", ru: "Кофе не такой дешёвый, как чай." } },
      ],
    },
  ],
};
