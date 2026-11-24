import type { Test } from "./types";

export const EXAM_FINAL: Test = {
  id: "exam-final",
  kind: "exam",
  title: { en: "Comprehensive final exam", az: "Yekun imtahan", ru: "Итоговый экзамен" },
  description: {
    en: "All 33 days: every frame, tense and combination, plus a short text. 30 questions, 30 minutes.",
    az: "Bütün 33 gün: hər çərçivə, zaman və birləşmə, üstəgəl qısa mətn. 30 sual, 30 dəqiqə.",
    ru: "Все 33 дня: каждая рамка, время и сочетание, плюс короткий текст. 30 вопросов, 30 минут.",
  },
  minutes: 30,
  timed: true,
  passMark: 70,
  passage: {
    title: "A new start",
    paragraphs: [
      "Rauf moved from Shamakhi to Baku three years ago. At first, he found the city loud and crowded, and he missed the quiet mornings of his hometown. He used to wake up to the sound of birds; now he woke up to car horns.",
      "He had studied accounting at university, but when he arrived, he couldn't find a job in his field. For six months he worked as a waiter in a busy restaurant near the Old City. The work was tiring, but it taught him to talk to all kinds of people — and his English improved because many of the customers were tourists.",
      "One evening, a guest who ran a small travel company asked Rauf if he would like to work for her. Although he had no experience in tourism, she said he was exactly the kind of person she needed: patient, polite and good with numbers. Rauf has been working there ever since. If someone had told him three years ago that he would be planning holidays for people from all over the world, he wouldn't have believed it.",
    ],
  },
  sections: [
    {
      title: "Part 1 — Grammar",
      questions: [
        { id: "z01", type: "choice", skill: "existence", prompt: "___ any good restaurants near your office?", options: ["Is there", "Are there", "Have", "There are"], answer: 1, why: { az: "Cəm + sual → Are there…?", ru: "Множественное + вопрос → Are there…?" } },
        { id: "z02", type: "choice", skill: "states", prompt: "We ___ very tired after the long journey yesterday.", options: ["are", "was", "were", "have been"], answer: 2, why: { az: "We + keçmiş → were.", ru: "We + прошлое → were." } },
        { id: "z03", type: "choice", skill: "actions", prompt: "She ___ to the gym three times a week.", options: ["go", "goes", "is going", "going"], answer: 1, why: { az: "Vərdiş + she → goes.", ru: "Привычка + she → goes." } },
        { id: "z04", type: "choice", skill: "actions", prompt: "I ___ a shower when the phone rang.", options: ["had", "was having", "have had", "am having"], answer: 1, why: { az: "Uzun proses + qısa hadisə → Past Continuous.", ru: "Длительный процесс + короткое событие → Past Continuous." } },
        { id: "z05", type: "choice", skill: "modals", prompt: "Passengers ___ show their passports at the gate.", options: ["must", "should to", "can to", "have"], answer: 0, why: { az: "Qayda → must + V1.", ru: "Правило → must + V1." } },
        { id: "z06", type: "choice", skill: "possession", prompt: "___ your flat have a balcony?", options: ["Has", "Is", "Do", "Does"], answer: 3, why: { az: "Your flat = it → Does … have?", ru: "Your flat = it → Does … have?" } },
        { id: "z07", type: "choice", skill: "passive", prompt: "This church ___ in the 17th century.", options: ["built", "was built", "has built", "is building"], answer: 1, why: { az: "Keçmiş passive → was + V3.", ru: "Пассив в прошлом → was + V3." } },
        { id: "z08", type: "choice", skill: "perfect", prompt: "Have you ___ been to Gabala?", options: ["ever", "yet", "already", "since"], answer: 0, why: { az: "Təcrübə sualı → ever.", ru: "Вопрос об опыте → ever." } },
        { id: "z09", type: "choice", skill: "questions", prompt: "What ___ at the party last night?", options: ["did happen", "happened", "was happened", "happen"], answer: 1, why: { az: "Mübtəda sualı → What happened?", ru: "Вопрос к подлежащему → What happened?" } },
        { id: "z10", type: "choice", skill: "conditionals", prompt: "If I won the lottery, I ___ a house by the sea.", options: ["will buy", "would buy", "bought", "buy"], answer: 1, why: { az: "If + Past → would + V1.", ru: "If + Past → would + V1." } },
        { id: "z11", type: "choice", skill: "relative", prompt: "The restaurant ___ we had dinner was excellent.", options: ["which", "where", "who", "whose"], answer: 1, why: { az: "Yer → where.", ru: "Место → where." } },
        { id: "z12", type: "choice", skill: "connectors", prompt: "___ she was ill, she went to work.", options: ["Despite", "In spite of", "Although", "However"], answer: 2, why: { az: "Tam cümlədən əvvəl although.", ru: "Перед полным предложением — although." } },
        { id: "z13", type: "choice", skill: "reported", prompt: "He told me that he ___ busy.", options: ["is", "was", "will be", "be"], answer: 1, why: { az: "Told + zaman geri: is → was.", ru: "Told + сдвиг времени: is → was." } },
        { id: "z14", type: "choice", skill: "modal-past", prompt: "She isn't answering. She ___ have left her phone at home.", options: ["must", "should", "would", "can"], answer: 0, why: { az: "Məntiqi nəticə → must have + V3.", ru: "Логический вывод → must have + V3." } },
        { id: "z15", type: "choice", skill: "ing-to", prompt: "I've decided ___ a new language.", options: ["learning", "to learn", "learn", "learned"], answer: 1, why: { az: "Decide + to + V1.", ru: "Decide + to + V1." } },
      ],
    },
    {
      title: "Part 2 — Complete and correct",
      questions: [
        { id: "z16", type: "fill", skill: "perfect", prompt: "I ___ (not / finish) my homework yet.", accept: ["haven't finished", "have not finished"], why: { az: "Yet + inkar → haven't + V3.", ru: "Yet + отрицание → haven't + V3." } },
        { id: "z17", type: "fill", skill: "comparatives", prompt: "Today is ___ (hot) than yesterday.", accept: ["hotter"], why: { az: "Qısa sifət + -er; samit ikiləşir: hotter.", ru: "Короткое прилагательное + -er; удвоение: hotter." } },
        { id: "z18", type: "fill", skill: "passive", prompt: "The results ___ (announce) next week.", accept: ["will be announced", "are going to be announced"], why: { az: "Gələcək passive → will be + V3.", ru: "Пассив в будущем → will be + V3." } },
        { id: "z19", type: "correct", skill: "states", prompt: "I am agree with your idea.", accept: ["I agree with your idea."], why: { az: "Agree feildir.", ru: "Agree — глагол." } },
        { id: "z20", type: "correct", skill: "conditionals", prompt: "If it will be sunny, we'll go to the beach.", accept: ["If it is sunny, we'll go to the beach.", "If it's sunny, we'll go to the beach.", "If it is sunny, we will go to the beach.", "If it's sunny, we will go to the beach."], why: { az: "If hissəsində will yoxdur.", ru: "В части с if нет will." } },
        { id: "z21", type: "transform", skill: "want-to", prompt: "\"Can you help me?\" she said to me.", instruction: { en: "Report it: She asked me…", az: "Dolayı nitq: She asked me…", ru: "Косвенная речь: She asked me…" }, accept: ["She asked me to help her.", "She asked me if I could help her."], why: { az: "Xahiş → asked + şəxs + to + V1.", ru: "Просьба → asked + человек + to + V1." } },
      ],
    },
    {
      title: "Part 3 — Reading: A new start",
      instructions: { en: "Read the text, then answer.", az: "Mətni oxuyun, sonra cavab verin.", ru: "Прочитайте текст и ответьте." },
      questions: [
        { id: "z22", type: "tfng", skill: "reading", prompt: "Rauf liked Baku from the first day.", answer: "F", why: { az: "Mətndə: \"At first, he found the city loud and crowded\".", ru: "В тексте: «At first, he found the city loud and crowded»." } },
        { id: "z23", type: "tfng", skill: "reading", prompt: "Rauf studied accounting.", answer: "T", why: { az: "\"He had studied accounting at university\".", ru: "«He had studied accounting at university»." } },
        { id: "z24", type: "tfng", skill: "reading", prompt: "Rauf's parents still live in Shamakhi.", answer: "NG", why: { az: "Mətndə valideynləri haqqında məlumat yoxdur.", ru: "О родителях в тексте ничего не сказано." } },
        { id: "z25", type: "choice", skill: "reading", prompt: "Why did Rauf's English improve at the restaurant?", options: ["He took lessons there.", "Many customers were tourists.", "His manager was English.", "He studied at night."], answer: 1, why: { az: "\"many of the customers were tourists\".", ru: "«many of the customers were tourists»." } },
        { id: "z26", type: "choice", skill: "reading", prompt: "Why did the guest offer Rauf a job?", options: ["He had worked in tourism before.", "He was her relative.", "He was patient, polite and good with numbers.", "He spoke many languages."], answer: 2, why: { az: "\"exactly the kind of person she needed: patient, polite and good with numbers\".", ru: "«exactly the kind of person she needed: patient, polite and good with numbers»." } },
        { id: "z27", type: "short", skill: "reading", prompt: "How long did Rauf work as a waiter? (max 3 words)", accept: ["six months", "for six months", "6 months"], maxWords: 3, why: { az: "\"For six months he worked as a waiter\".", ru: "«For six months he worked as a waiter»." } },
        { id: "z28", type: "short", skill: "reading", prompt: "What kind of company does Rauf work for now? (max 3 words)", accept: ["a travel company", "travel company", "a small travel company", "small travel company"], maxWords: 3, why: { az: "\"a small travel company\".", ru: "«a small travel company»." } },
        { id: "z29", type: "choice", skill: "reading", prompt: "\"He used to wake up to the sound of birds\" means that…", options: ["he still wakes up to birds.", "he woke up to birds in the past, but not now.", "he is getting used to birds.", "he likes birds."], answer: 1, why: { az: "Used to → keçmişdə idi, indi yoxdur.", ru: "Used to → раньше было, теперь нет." } },
        { id: "z30", type: "choice", skill: "reading", prompt: "Which tense is used in \"Rauf has been working there ever since\", and why?", options: ["Past Simple — a finished action", "Present Perfect Continuous — it started in the past and continues now", "Past Perfect — before another past action", "Present Continuous — only today"], answer: 1, why: { az: "Keçmişdə başlayıb indi də davam edir → Present Perfect Continuous.", ru: "Началось в прошлом и продолжается сейчас → Present Perfect Continuous." } },
      ],
    },
  ],
};
