import type { Test } from "../tests/types";

const P = ["A", "B", "C", "D", "E", "F"];

export const IELTS_READING_HABITS: Test = {
  id: "ielts-r3-habits",
  kind: "ielts-reading",
  level: "upper-intermediate",
  title: { en: "Practice Test 3: How habits are formed", az: "Məşq testi 3: Vərdişlər necə yaranır", ru: "Тренировочный тест 3: Как формируются привычки" },
  description: {
    en: "Psychology · about 710 words · Matching information, True/False/Not Given, short-answer questions. Difficulty: Band 6–7.",
    az: "Psixologiya · təxminən 710 söz · Məlumatın uyğunlaşdırılması, Doğru/Yanlış/Verilməyib, qısa cavablı suallar. Çətinlik: Band 6–7.",
    ru: "Психология · около 710 слов · Сопоставление информации, True/False/Not Given, вопросы с кратким ответом. Сложность: Band 6–7.",
  },
  minutes: 20,
  timed: true,
  passage: {
    title: "How habits are formed",
    labels: P,
    paragraphs: [
      "Psychologists estimate that a large proportion of our daily behaviour — some researchers suggest around forty per cent — is carried out more or less automatically, out of habit rather than conscious decision. We brush our teeth, take the same route to work and reach for our phones without really thinking about it. This automatic behaviour is not a weakness; it frees the mind to concentrate on new and demanding tasks. Habits are also remarkably durable. People who have not ridden a bicycle for twenty years usually find that they can still do it within minutes, because the skill is stored differently from facts such as names and dates.",
      "Research in the 1990s at the Massachusetts Institute of Technology helped to explain how habits develop in the brain. Scientists placed rats in a simple maze with chocolate at the end and recorded activity in their brains. At first, the rats' brains were highly active throughout the run as they sniffed and explored. After many repetitions, however, activity dropped sharply in the middle of the run and increased only at the beginning and the end. The behaviour had become a 'chunk' controlled largely by a deep part of the brain called the basal ganglia. Interestingly, when the chocolate was removed, the habit did not disappear immediately; the pattern remained stored in the brain and returned quickly if the reward came back.",
      "Building on such findings, writers on habit often describe a three-part loop. First comes a cue, a trigger that tells the brain to start an automatic behaviour; this can be a time of day, a place, an emotion or the presence of other people. Then comes the routine, the behaviour itself. Finally there is a reward, which helps the brain decide whether the loop is worth remembering. Over time, the brain begins to anticipate the reward as soon as it notices the cue, and this anticipation creates a craving that drives the routine. Advertisers have long understood this mechanism. Many successful products, from toothpaste to social media apps, are designed around a clear cue and a satisfying reward, so that using them becomes automatic.",
      "How long does it take for a new habit to form? A popular claim is twenty-one days, but there is little scientific basis for it. In a well-known study published in 2009, researchers at University College London asked ninety-six volunteers to choose a new daily behaviour, such as drinking water after breakfast or running before dinner, and to report each day how automatic it felt. On average it took sixty-six days for the behaviour to reach its maximum level of automaticity, but the range was enormous — from eighteen days to more than two hundred. Missing a single day did not seriously affect the process. Simple behaviours, such as drinking a glass of water, became automatic far more quickly than complex ones, such as doing fifty sit-ups before breakfast.",
      "Because old habits are stored in the brain rather than erased, breaking them is notoriously difficult. Many experts therefore recommend replacing a bad habit rather than simply trying to stop it. A person who snacks when they feel stressed, for example, might keep the same cue and reward — stress and relief — but substitute a different routine, such as a short walk. Changing the environment also helps: if the biscuits are not in the house, the cue is far less likely to lead to the old behaviour. Support from other people can also make a difference: research on groups that help people stop smoking or drinking suggests that belonging to a community makes it easier to believe that change is possible.",
      "Some researchers caution against relying too heavily on the cue–routine–reward model. Human habits, they point out, are shaped by social and economic conditions as well as by individual brains. It is easier to develop the habit of cycling to work in a city with safe cycle lanes, for instance, than in one without them. Lasting change, in this view, depends not only on personal willpower but also on the design of the places where we live and work. Governments sometimes use this insight deliberately, for example by making healthy food the default choice in school canteens or by enrolling employees in pension schemes automatically.",
    ],
  },
  sections: [
    {
      title: "Questions 1–5: Matching information",
      instructions: {
        en: "Which paragraph, A–F, contains the following information? You may use any letter more than once.",
        az: "Aşağıdakı məlumat hansı abzasda (A–F) var? Eyni hərfi bir neçə dəfə seçə bilərsiniz.",
        ru: "В каком абзаце (A–F) содержится следующая информация? Одну букву можно выбрать несколько раз.",
      },
      questions: [
        { id: "q1", type: "match", prompt: "an example of how a city's design can make a good habit easier", options: P, answer: 5, why: { az: "F: təhlükəsiz velosiped yolları olan şəhər nümunəsi. (E-də də mühitdən danışılır, amma orada pis vərdişi pozmaqdan söhbət gedir.)", ru: "F: пример города с безопасными велодорожками. (В E тоже говорится о среде, но там речь о разрыве вредной привычки.)" } },
        { id: "q2", type: "match", prompt: "a description of an experiment with animals", options: P, answer: 1, why: { az: "B: siçovulların labirint təcrübəsi.", ru: "B: эксперимент с крысами в лабиринте." } },
        { id: "q3", type: "match", prompt: "the claim that automatic behaviour has a useful purpose", options: P, answer: 0, why: { az: "A: \"it frees the mind to concentrate on new and demanding tasks\".", ru: "A: «it frees the mind to concentrate on new and demanding tasks»." } },
        { id: "q4", type: "match", prompt: "advice on dealing with an unwanted habit", options: P, answer: 4, why: { az: "E: pis vərdişi əvəz etmək və mühiti dəyişmək tövsiyəsi.", ru: "E: совет заменить вредную привычку и изменить среду." } },
        { id: "q5", type: "match", prompt: "a reference to a widely believed number that lacks evidence", options: P, answer: 3, why: { az: "D: \"A popular claim is twenty-one days, but there is little scientific basis for it\".", ru: "D: «A popular claim is twenty-one days, but there is little scientific basis for it»." } },
      ],
    },
    {
      title: "Questions 6–9: True / False / Not Given",
      instructions: {
        en: "Do the statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN.",
        az: "Fikirlər mətndəki məlumatla üst-üstə düşür? TRUE, FALSE və ya NOT GIVEN seçin.",
        ru: "Согласуются ли утверждения с информацией в тексте? Выберите TRUE, FALSE или NOT GIVEN.",
      },
      questions: [
        { id: "q6", type: "tfng", prompt: "The rats' brain activity stayed high throughout the maze after many repetitions.", answer: "F", why: { az: "Təkrarlardan sonra fəallıq ortada kəskin azaldı.", ru: "После повторений активность в середине резко снизилась." } },
        { id: "q7", type: "tfng", prompt: "In the UCL study, it took most volunteers exactly sixty-six days to form a habit.", answer: "F", why: { az: "66 gün ORTA göstəricidir; diapazon 18 gündən 200-dən çox günə qədər idi.", ru: "66 дней — СРЕДНЕЕ значение; разброс был от 18 до более чем 200 дней." } },
        { id: "q8", type: "tfng", prompt: "Missing one day did not seriously harm habit formation in the UCL study.", answer: "T", why: { az: "\"Missing a single day did not seriously affect the process\".", ru: "«Missing a single day did not seriously affect the process»." } },
        { id: "q9", type: "tfng", prompt: "The volunteers in the UCL study were all university students.", answer: "NG", why: { az: "Könüllülərin kim olduğu deyilmir.", ru: "Кто были добровольцы, не сказано." } },
      ],
    },
    {
      title: "Questions 10–13: Short-answer questions",
      instructions: {
        en: "Answer the questions. Use NO MORE THAN THREE WORDS from the passage for each answer.",
        az: "Suallara cavab verin. Hər cavab üçün mətndən ÜÇ SÖZDƏN ÇOX OLMAYAN ifadə işlədin.",
        ru: "Ответьте на вопросы. Используйте НЕ БОЛЕЕ ТРЁХ СЛОВ из текста для каждого ответа.",
      },
      questions: [
        { id: "q10", type: "short", prompt: "Which part of the brain largely controls habitual 'chunks' of behaviour?", accept: ["the basal ganglia", "basal ganglia"], maxWords: 3, why: { az: "\"a deep part of the brain called the basal ganglia\".", ru: "«a deep part of the brain called the basal ganglia»." } },
        { id: "q11", type: "short", prompt: "What is the first part of the habit loop?", accept: ["a cue", "cue", "the cue"], maxWords: 3, why: { az: "\"First comes a cue\".", ru: "«First comes a cue»." } },
        { id: "q12", type: "short", prompt: "What does anticipation of the reward create?", accept: ["a craving", "craving"], maxWords: 3, why: { az: "\"this anticipation creates a craving\".", ru: "«this anticipation creates a craving»." } },
        { id: "q13", type: "short", prompt: "Apart from willpower, what does lasting change depend on, according to some researchers?", accept: ["the design of the places", "the design of places", "design of the places", "the design of the places where we live and work", "design"], maxWords: 4, why: { az: "\"depends … also on the design of the places where we live and work\".", ru: "«depends … also on the design of the places where we live and work»." } },
      ],
    },
  ],
};
