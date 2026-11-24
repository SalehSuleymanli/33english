import type { Test } from "./types";

export const EXAM_EXPANSION: Test = {
  id: "exam-expansion",
  kind: "exam",
  title: { en: "Expansion grammar exam", az: "Genişlənmə qrammatika imtahanı", ru: "Экзамен «Расширение»" },
  description: {
    en: "Days 13–21: questions, want someone to, perfect tenses, going to, it + adjective + to, used to, modal + have + V3 and complex passives.",
    az: "13–21-ci günlər: suallar, want someone to, Perfect zamanlar, going to, it + sifət + to, used to, modal + have + V3 və mürəkkəb passive.",
    ru: "Дни 13–21: вопросы, want someone to, времена Perfect, going to, it + прилагательное + to, used to, модальный + have + V3 и сложный пассив.",
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
        { id: "x09", type: "choice", skill: "used-to", prompt: "After a year in London, she ___ driving on the left.", options: ["used to", "is used to", "use to", "was use to"], answer: 1, why: { az: "Öyrəşmiş olmaq → be used to + -ing.", ru: "Быть привыкшим → be used to + -ing." } },
        { id: "x10", type: "choice", skill: "modal-past", prompt: "The lights are off. They ___ gone to bed.", options: ["should have", "must have", "can't have", "would"], answer: 1, why: { az: "Əlamətə əsasən əminlik → must have + V3.", ru: "Уверенность по признакам → must have + V3." } },
        { id: "x11", type: "choice", skill: "modal-past", prompt: "I failed the test. I ___ studied harder.", options: ["must have", "should have", "could", "might"], answer: 1, why: { az: "Peşmanlıq → should have + V3.", ru: "Сожаление → should have + V3." } },
        { id: "x12", type: "choice", skill: "passive", prompt: "The new hospital ___ at the moment.", options: ["is building", "is being built", "has built", "builds"], answer: 1, why: { az: "Prosesdə olan passive → is being + V3.", ru: "Пассив в процессе → is being + V3." } },
      ],
    },
    {
      title: "Part 2 — Complete the sentence",
      questions: [
        { id: "x13", type: "fill", skill: "perfect", prompt: "We ___ (live) in this flat for six years.", accept: ["have lived", "'ve lived", "have been living", "'ve been living"], why: { az: "For + müddət, indiyə qədər → Present Perfect (və ya Continuous).", ru: "For + длительность до сих пор → Present Perfect (или Continuous)." } },
        { id: "x14", type: "fill", skill: "used-to", prompt: "I ___ (use) to have long hair when I was a student.", accept: ["used"], why: { az: "Keçmiş vərdiş → used to.", ru: "Привычка в прошлом → used to." } },
        { id: "x15", type: "fill", skill: "passive", prompt: "Your parcel ___ (deliver) yet. It's still at the warehouse.", accept: ["hasn't been delivered", "has not been delivered"], why: { az: "Yet + inkar + passive → hasn't been + V3.", ru: "Yet + отрицание + пассив → hasn't been + V3." } },
        { id: "x16", type: "fill", skill: "it-adj", prompt: "I don't know ___ to say. (what / how)", accept: ["what"], why: { az: "Nə deməli → what to say.", ru: "Что сказать → what to say." } },
      ],
    },
    {
      title: "Part 3 — Find and correct the mistake",
      questions: [
        { id: "x17", type: "correct", skill: "questions", prompt: "Where you did buy that jacket?", accept: ["Where did you buy that jacket?"], why: { az: "Sual sözü + did + mübtəda + V1.", ru: "Вопросительное слово + did + подлежащее + V1." } },
        { id: "x18", type: "correct", skill: "perfect", prompt: "I have seen her last week.", accept: ["I saw her last week."], why: { az: "Last week → Past Simple.", ru: "Last week → Past Simple." } },
        { id: "x19", type: "correct", skill: "want-to", prompt: "The doctor told me don't eat sugar.", accept: ["The doctor told me not to eat sugar."], why: { az: "Tell + şəxs + not to + V1.", ru: "Tell + человек + not to + V1." } },
      ],
    },
    {
      title: "Part 4 — Rewrite the sentence",
      questions: [
        { id: "x20", type: "transform", skill: "modal-past", prompt: "It was a mistake not to bring an umbrella.", instruction: { en: "Start with: I should…", az: "Belə başlayın: I should…", ru: "Начните с: I should…" }, accept: ["I should have brought an umbrella."], why: { az: "Peşmanlıq → should have + V3 (brought).", ru: "Сожаление → should have + V3 (brought)." } },
        { id: "x21", type: "transform", skill: "perfect", prompt: "I started learning English two years ago, and I'm still learning it.", instruction: { en: "Use: have been … for", az: "İşlədin: have been … for", ru: "Используйте: have been … for" }, accept: ["I have been learning English for two years.", "I've been learning English for two years."], why: { az: "Müddət + davam → Present Perfect Continuous.", ru: "Длительность + продолжается → Present Perfect Continuous." } },
        { id: "x22", type: "transform", skill: "passive", prompt: "Someone has stolen my bike.", instruction: { en: "Make it passive.", az: "Passive edin.", ru: "Сделайте пассив." }, accept: ["My bike has been stolen."], why: { az: "has been + V3.", ru: "has been + V3." } },
      ],
    },
  ],
};
