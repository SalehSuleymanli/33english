import type { Test } from "../tests/types";

const P = ["A", "B", "C", "D", "E", "F"];
const HEADINGS = [
  "i. Two main ways to remove salt",
  "ii. A growing shortage of fresh water",
  "iii. The problem of what is left behind",
  "iv. Why desalination is becoming cheaper",
  "v. Rain as the cheapest alternative",
  "vi. Where the energy comes from matters",
  "vii. A useful tool, but not the only answer",
  "viii. The history of drinking sea water",
];

export const IELTS_READING_WATER: Test = {
  id: "ielts-r4-desalination",
  kind: "ielts-reading",
  level: "upper-intermediate",
  title: { en: "Practice Test 4: Fresh water from the sea", az: "Məşq testi 4: Dənizdən şirin su", ru: "Тренировочный тест 4: Пресная вода из моря" },
  description: {
    en: "Science and technology · about 690 words · Matching headings, multiple choice, sentence completion. Difficulty: Band 6–7.",
    az: "Elm və texnologiya · təxminən 690 söz · Başlıqların uyğunlaşdırılması, çoxseçimli suallar, cümlə tamamlama. Çətinlik: Band 6–7.",
    ru: "Наука и технологии · около 690 слов · Сопоставление заголовков, множественный выбор, завершение предложений. Сложность: Band 6–7.",
  },
  minutes: 20,
  timed: true,
  passage: {
    title: "Fresh water from the sea",
    labels: P,
    paragraphs: [
      "Although more than seventy per cent of the Earth's surface is covered by water, less than one per cent of the planet's water is fresh and easily accessible. As populations grow, cities expand and droughts become more frequent, many regions are already using fresh water faster than nature can replace it. The United Nations estimates that by the middle of this century, billions of people could be living in areas where water is scarce for at least part of the year. Agriculture is by far the largest user, accounting for around seventy per cent of the fresh water taken from rivers and underground sources worldwide, and in many dry regions underground water is being pumped out far faster than rain can refill it.",
      "One response is desalination: removing salt from sea water to make it drinkable. There are two main methods. The older one, thermal distillation, imitates the natural water cycle — sea water is heated until it evaporates, and the vapour is then cooled so that it condenses as fresh water, leaving the salt behind. The newer method, reverse osmosis, pushes sea water at very high pressure through extremely fine membranes that allow water molecules to pass but block salt. Today, reverse osmosis is used in most new plants. Thermal plants are still common in parts of the Middle East, where they are often built next to power stations and use waste heat from electricity generation. Reverse osmosis, however, generally needs less energy, which explains its popularity elsewhere.",
      "For decades, desalination was considered too expensive for all but the richest, driest countries. That has changed significantly. Improvements in membrane technology and in devices that recover energy from the high-pressure water have reduced the energy needed for reverse osmosis by more than half since the 1990s. Larger plants also benefit from economies of scale. As a result, desalinated water, while still more expensive than water from rivers or underground sources, is now within reach for many more countries. There are now more than twenty thousand desalination plants around the world, and some countries, such as Israel, produce a large share of their household water in this way.",
      "Nevertheless, desalination plants still use a great deal of electricity, and the environmental impact depends heavily on how that electricity is generated. A plant powered by oil or gas adds to the greenhouse gas emissions that contribute to climate change — which, ironically, can make droughts worse. For this reason, several new projects, particularly in sunny coastal regions, are being designed to run partly or entirely on solar power. Some designs also adjust their output during the day, producing more water when solar power is plentiful and less at night, so that expensive storage is needed only for a small part of the energy.",
      "A second environmental concern is brine, the highly concentrated salt water that remains after fresh water has been extracted. For every litre of drinking water produced, a plant may generate around one and a half litres of brine, which often also contains chemicals used to clean the equipment. When brine is released back into the sea, it tends to sink and can harm plants and animals on the sea floor. Engineers are experimenting with ways to dilute it more effectively or even to extract useful minerals from it. In some places, brine is pumped through long pipes with many small openings so that it mixes quickly with the surrounding water instead of forming a dense layer on the sea floor.",
      "Most experts agree that desalination should be part of a wider strategy rather than a complete solution. Reducing leaks in old pipes — which in some cities lose a third of their water — and recycling waste water for agriculture and industry are often cheaper ways to increase supply. Desalination is perhaps best seen as an insurance policy: expensive to maintain, but extremely valuable when other sources fail. Changing how water is priced can also encourage households and businesses to use less of it, although such measures are rarely popular with voters, and they must be designed so that poorer families can still afford what they need.",
    ],
  },
  sections: [
    {
      title: "Questions 1–5: Matching headings",
      instructions: {
        en: "Choose the correct heading for paragraphs B–F. There are more headings than paragraphs.",
        az: "B–F abzasları üçün düzgün başlığı seçin. Başlıqlar abzaslardan çoxdur.",
        ru: "Выберите правильный заголовок для абзацев B–F. Заголовков больше, чем абзацев.",
      },
      questions: [
        { id: "q1", type: "match", prompt: "Paragraph B", options: HEADINGS, answer: 0, why: { az: "B: iki əsas üsul — termal distillə və əks osmos → i.", ru: "B: два основных метода — термическая дистилляция и обратный осмос → i." } },
        { id: "q2", type: "match", prompt: "Paragraph C", options: HEADINGS, answer: 3, why: { az: "C: texnologiya təkmilləşdi, enerji yarıdan çox azaldı → daha ucuz → iv.", ru: "C: технология улучшилась, энергия сократилась более чем вдвое → дешевле → iv." } },
        { id: "q3", type: "match", prompt: "Paragraph D", options: HEADINGS, answer: 5, why: { az: "D: təsir elektrik enerjisinin necə istehsal olunmasından asılıdır → vi.", ru: "D: влияние зависит от того, как производится электричество → vi." } },
        { id: "q4", type: "match", prompt: "Paragraph E", options: HEADINGS, answer: 2, why: { az: "E: duzlu qalıq (brine) problemi → iii.", ru: "E: проблема рассола (brine) → iii." } },
        { id: "q5", type: "match", prompt: "Paragraph F", options: HEADINGS, answer: 6, why: { az: "F: \"part of a wider strategy rather than a complete solution\" → vii.", ru: "F: «part of a wider strategy rather than a complete solution» → vii." } },
      ],
    },
    {
      title: "Questions 6–9: Multiple choice",
      instructions: { en: "Choose the correct answer.", az: "Düzgün cavabı seçin.", ru: "Выберите правильный ответ." },
      questions: [
        { id: "q6", type: "choice", prompt: "How does reverse osmosis remove salt?", options: ["By heating sea water until it evaporates", "By pushing water through very fine membranes at high pressure", "By adding chemicals that absorb salt", "By freezing the water"], answer: 1, why: { az: "\"pushes sea water at very high pressure through extremely fine membranes\".", ru: "«pushes sea water at very high pressure through extremely fine membranes»." } },
        { id: "q7", type: "choice", prompt: "Since the 1990s, the energy needed for reverse osmosis has…", options: ["doubled.", "stayed about the same.", "fallen by more than half.", "fallen slightly."], answer: 2, why: { az: "\"reduced the energy needed … by more than half since the 1990s\".", ru: "«reduced the energy needed … by more than half since the 1990s»." } },
        { id: "q8", type: "choice", prompt: "Why does the writer call the use of fossil fuels in desalination 'ironic'?", options: ["Because fossil fuels are cheap", "Because the emissions can contribute to the droughts desalination is meant to solve", "Because solar power is less reliable", "Because oil is also found in the sea"], answer: 1, why: { az: "İstixana qazları iqlim dəyişikliyinə və quraqlığa səbəb ola bilər — duzsuzlaşdırmanın həll etməyə çalışdığı problem.", ru: "Выбросы усиливают изменение климата и засухи — ту самую проблему, которую должна решать опреснение." } },
        { id: "q9", type: "choice", prompt: "According to the final paragraph, which is often a cheaper way to increase water supply?", options: ["Building more desalination plants", "Importing water", "Fixing leaking pipes", "Using more underground water"], answer: 2, why: { az: "\"Reducing leaks in old pipes … are often cheaper ways to increase supply\".", ru: "«Reducing leaks in old pipes … are often cheaper ways to increase supply»." } },
      ],
    },
    {
      title: "Questions 10–13: Sentence completion",
      instructions: {
        en: "Complete the sentences. Use NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.",
        az: "Cümlələri tamamlayın. Mətndən İKİ SÖZDƏN VƏ/VƏ YA BİR RƏQƏMDƏN ÇOX OLMAYAN ifadə işlədin.",
        ru: "Завершите предложения. Используйте НЕ БОЛЕЕ ДВУХ СЛОВ И/ИЛИ ЧИСЛА из текста.",
      },
      questions: [
        { id: "q10", type: "fill", prompt: "Less than ___ per cent of the Earth's water is fresh and easily accessible.", accept: ["one", "1"], why: { az: "\"less than one per cent\".", ru: "«less than one per cent»." } },
        { id: "q11", type: "fill", prompt: "In thermal distillation, the vapour is cooled so that it ___ as fresh water.", accept: ["condenses"], why: { az: "\"the vapour is then cooled so that it condenses as fresh water\".", ru: "«the vapour is then cooled so that it condenses as fresh water»." } },
        { id: "q12", type: "fill", prompt: "The salty water left after desalination is called ___.", accept: ["brine"], why: { az: "\"brine, the highly concentrated salt water that remains\".", ru: "«brine, the highly concentrated salt water that remains»." } },
        { id: "q13", type: "fill", prompt: "The writer compares desalination to an ___.", accept: ["insurance policy"], why: { az: "\"best seen as an insurance policy\".", ru: "«best seen as an insurance policy»." } },
      ],
    },
  ],
};
