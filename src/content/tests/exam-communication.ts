import type { Test } from "./types";

export const EXAM_COMMUNICATION: Test = {
  id: "exam-communication",
  kind: "exam",
  title: { en: "Communication grammar exam", az: "Ünsiyyət qrammatika imtahanı", ru: "Экзамен «Общение»" },
  description: {
    en: "Days 20–33: feelings, conditionals, used to, preferences, connectors, -ing or to, modal + have + V3, complex passives, reported speech and storytelling.",
    az: "20–33-cü günlər: hisslər, şərt cümlələri, used to, üstünlük, bağlayıcılar, -ing və ya to, modal + have + V3, mürəkkəb passive, dolayı nitq və hekayə.",
    ru: "Дни 20–33: чувства, условные предложения, used to, предпочтения, связки, -ing или to, модальный + have + V3, сложный пассив, косвенная речь и рассказ.",
  },
  minutes: 20,
  timed: true,
  passMark: 70,
  sections: [
    {
      title: "Part 1 — Choose the correct answer",
      questions: [
        { id: "c05", type: "choice", skill: "conditionals", prompt: "If it ___ tomorrow, we'll cancel the picnic.", options: ["will rain", "rains", "rained", "would rain"], answer: 1, why: { az: "If hissəsində will yox → Present Simple.", ru: "В части с if нет will → Present Simple." } },
        { id: "c06", type: "choice", skill: "conditionals", prompt: "If I ___ you, I'd take the job.", options: ["am", "was being", "were", "will be"], answer: 2, why: { az: "Xəyali vəziyyət → If I were you.", ru: "Нереальная ситуация → If I were you." } },
        { id: "c07", type: "choice", skill: "conditionals", prompt: "If we had left earlier, we ___ the train.", options: ["wouldn't miss", "won't miss", "wouldn't have missed", "didn't miss"], answer: 2, why: { az: "Keçmiş xəyali şərt → would have + V3.", ru: "Нереальное прошлое → would have + V3." } },
        { id: "c08", type: "choice", skill: "feelings", prompt: "The lecture was so long that everyone felt ___.", options: ["boring", "bored", "bore", "boredom"], answer: 1, why: { az: "İnsanın hissi → -ed: bored.", ru: "Чувство человека → -ed: bored." } },
        { id: "c09", type: "choice", skill: "connectors", prompt: "___ the heavy traffic, we arrived on time.", options: ["Although", "Despite", "However", "Even though"], answer: 1, why: { az: "İsimdən əvvəl despite; although-dan sonra cümlə gəlir.", ru: "Перед существительным — despite; после although идёт предложение." } },
        { id: "c10", type: "choice", skill: "preferences", prompt: "I'd rather ___ at home tonight.", options: ["stay", "to stay", "staying", "stayed"], answer: 0, why: { az: "Would rather + V1 (to yoxdur).", ru: "Would rather + V1 (без to)." } },
        { id: "c11", type: "choice", skill: "reported", prompt: "She asked me where ___.", options: ["did I live", "I lived", "do I live", "I did live"], answer: 1, why: { az: "Dolayı sualda düz söz sırası, did yoxdur.", ru: "В косвенном вопросе прямой порядок, без did." } },
        { id: "c12", type: "choice", skill: "story", prompt: "When we got to the cinema, the film ___.", options: ["already started", "has already started", "had already started", "was already start"], answer: 2, why: { az: "Daha əvvəl olmuş hadisə → Past Perfect.", ru: "Событие, случившееся раньше → Past Perfect." } },
        { id: "x09", type: "choice", skill: "used-to", prompt: "After a year in London, she ___ driving on the left.", options: ["used to", "is used to", "use to", "was use to"], answer: 1, why: { az: "Öyrəşmiş olmaq → be used to + -ing.", ru: "Быть привыкшим → be used to + -ing." } },
        { id: "x10", type: "choice", skill: "modal-past", prompt: "The lights are off. They ___ gone to bed.", options: ["should have", "must have", "can't have", "would"], answer: 1, why: { az: "Əlamətə əsasən əminlik → must have + V3.", ru: "Уверенность по признакам → must have + V3." } },
        { id: "x11", type: "choice", skill: "modal-past", prompt: "I failed the test. I ___ studied harder.", options: ["must have", "should have", "could", "might"], answer: 1, why: { az: "Peşmanlıq → should have + V3.", ru: "Сожаление → should have + V3." } },
        { id: "x12", type: "choice", skill: "passive", prompt: "The new hospital ___ at the moment.", options: ["is building", "is being built", "has built", "builds"], answer: 1, why: { az: "Prosesdə olan passive → is being + V3.", ru: "Пассив в процессе → is being + V3." } },
      ],
    },
    {
      title: "Part 2 — Complete the sentence",
      questions: [
        { id: "c14", type: "fill", skill: "connectors", prompt: "I'm not sure ___ I should accept the offer. (whether / despite)", accept: ["whether", "if"], why: { az: "İki variant arasında şübhə → whether.", ru: "Сомнение между вариантами → whether." } },
        { id: "c15", type: "fill", skill: "ing-to", prompt: "Would you mind ___ (close) the window?", accept: ["closing"], why: { az: "Mind + -ing.", ru: "Mind + -ing." } },
        { id: "c16", type: "fill", skill: "reported", prompt: "\"I will call you.\" → He said he ___ call me.", accept: ["would"], why: { az: "Said-dən sonra will → would.", ru: "После said: will → would." } },
        { id: "x14", type: "fill", skill: "used-to", prompt: "I ___ (use) to have long hair when I was a student.", accept: ["used"], why: { az: "Keçmiş vərdiş → used to.", ru: "Привычка в прошлом → used to." } },
        { id: "x15", type: "fill", skill: "passive", prompt: "Your parcel ___ (deliver) yet. It's still at the warehouse.", accept: ["hasn't been delivered", "has not been delivered"], why: { az: "Yet + inkar + passive → hasn't been + V3.", ru: "Yet + отрицание + пассив → hasn't been + V3." } },
      ],
    },
    {
      title: "Part 3 — Find and correct the mistake",
      questions: [
        { id: "c18", type: "correct", skill: "preferences", prompt: "Neither of my friends didn't come.", accept: ["Neither of my friends came."], why: { az: "Neither özü inkardır.", ru: "Neither — уже отрицание." } },
        { id: "c19", type: "correct", skill: "feelings", prompt: "I'm interesting in history.", accept: ["I'm interested in history.", "I am interested in history."], why: { az: "Hiss → interested.", ru: "Чувство → interested." } },
      ],
    },
    {
      title: "Part 4 — Rewrite the sentence",
      questions: [
        { id: "c20", type: "transform", skill: "reported", prompt: "\"Please don't be late,\" my boss said to me.", instruction: { en: "Report it: My boss told me…", az: "Dolayı nitqə çevirin: My boss told me…", ru: "Передайте косвенно: My boss told me…" }, accept: ["My boss told me not to be late."], why: { az: "told + şəxs + not to + V1.", ru: "told + человек + not to + V1." } },
        { id: "x20", type: "transform", skill: "modal-past", prompt: "It was a mistake not to bring an umbrella.", instruction: { en: "Start with: I should…", az: "Belə başlayın: I should…", ru: "Начните с: I should…" }, accept: ["I should have brought an umbrella."], why: { az: "Peşmanlıq → should have + V3 (brought).", ru: "Сожаление → should have + V3 (brought)." } },
        { id: "x22", type: "transform", skill: "passive", prompt: "Someone has stolen my bike.", instruction: { en: "Make it passive.", az: "Passive edin.", ru: "Сделайте пассив." }, accept: ["My bike has been stolen."], why: { az: "has been + V3.", ru: "has been + V3." } },
      ],
    },
  ],
};
