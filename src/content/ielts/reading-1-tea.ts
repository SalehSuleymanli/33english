import type { Test } from "../tests/types";

const P = ["A", "B", "C", "D", "E", "F"];
const HEADINGS = [
  "i. A drink that crossed continents by sea",
  "ii. The legend and the earliest evidence",
  "iii. Why tea prices fell in Europe",
  "iv. A plant that grows in many forms",
  "v. A national habit in the Caucasus",
  "vi. Tea as medicine and ritual in early China",
  "vii. Scientific interest in a familiar drink",
  "viii. The failure of tea farming in Europe",
];

export const IELTS_READING_TEA: Test = {
  id: "ielts-r1-tea",
  kind: "ielts-reading",
  level: "intermediate",
  title: { en: "Practice Test 1: The journey of tea", az: "Məşq testi 1: Çayın səyahəti", ru: "Тренировочный тест 1: Путешествие чая" },
  description: {
    en: "History · about 780 words · Matching headings, True/False/Not Given, sentence completion. Difficulty: Band 5–6.",
    az: "Tarix · təxminən 780 söz · Başlıqların uyğunlaşdırılması, Doğru/Yanlış/Verilməyib, cümlə tamamlama. Çətinlik: Band 5–6.",
    ru: "История · около 780 слов · Сопоставление заголовков, True/False/Not Given, завершение предложений. Сложность: Band 5–6.",
  },
  minutes: 20,
  timed: true,
  passage: {
    title: "The journey of tea",
    labels: P,
    paragraphs: [
      "According to a popular Chinese legend, tea was discovered in 2737 BCE by the emperor Shen Nong, who was boiling water in his garden when a few leaves from a nearby bush blew into the pot. The emperor tasted the result and found it refreshing. Historians treat the story with caution, but archaeological evidence confirms that tea has a very long history: tea leaves found in the tomb of a Chinese emperor who died in 141 BCE are among the oldest physical remains of tea ever discovered. For centuries, tea was pressed into hard cakes for storage and transport, and pieces were broken off and ground into powder before use. These compressed bricks were even used as a kind of currency in remote regions and were exchanged with nomadic peoples for horses. Loose-leaf tea, the form most common today, became popular only much later, during the Ming dynasty.",
      "In its early centuries, tea was valued less as a pleasant drink than as a medicine. Ancient texts recommend it for tiredness, poor eyesight and digestive problems. By the time of the Tang dynasty (618–907 CE), however, tea drinking had become an art. The writer Lu Yu produced 'The Classic of Tea', a detailed guide to growing, preparing and serving it, and Buddhist monks drank tea to stay awake during long hours of meditation, helping to spread the custom to Japan and Korea. Elaborate ceremonies developed in which every movement, from heating the water to pouring it, followed strict rules, and the quality of the water itself was judged as carefully as the leaves.",
      "Tea reached Europe much later. Portuguese and Dutch traders brought small quantities by ship in the early seventeenth century, and the drink became fashionable among the wealthy. In Britain, it was popularised partly by Catherine of Braganza, a Portuguese princess who married King Charles II in 1662 and who was already used to drinking tea at court. For more than a century, however, high taxes kept tea expensive, and a large illegal trade developed. When the British government cut the tax dramatically in 1784, smuggling collapsed almost overnight and tea became an everyday drink for ordinary people.",
      "All true tea comes from a single species, Camellia sinensis, yet the variety of teas is enormous. Green, black, white and oolong teas differ not in the plant but mainly in how the leaves are processed after picking — in particular, how long they are allowed to oxidise, or react with the air. Black tea is fully oxidised, which gives it its dark colour and strong flavour, while green tea is heated soon after picking to prevent oxidation. Soil, altitude and climate also affect the taste, which is why teas from different regions can be so distinct. In the wild, the tea plant can grow into a tree more than ten metres tall, but on plantations it is pruned to waist height so that workers can reach the young leaves. Usually only the top two leaves and a bud are picked, a task that in many countries is still done largely by hand.",
      "In Azerbaijan, tea holds a special place in social life. Although the country began commercial tea production only in the twentieth century, in the humid southern region around Lankaran, tea drinking is far older and deeply rooted. It is traditionally served in pear-shaped glasses called armudu, often with sugar cubes, jam or sweets rather than milk. Tea houses, known as chaykhanas, have long been places where men meet to talk, play backgammon and discuss the news, and offering tea to a guest is considered a basic sign of hospitality. Tea is usually drunk both before and after a meal, and a host who keeps refilling a guest's glass is showing respect. According to tradition, even the way tea is served can carry a message: sweet tea offered during a marriage proposal is said to mean that the answer is yes.",
      "Today, tea is the most widely consumed drink in the world after water, and scientists have become increasingly interested in its effects on health. Tea contains antioxidants known as polyphenols, and some studies have linked regular tea drinking to a lower risk of heart disease. Researchers warn, though, that much of this evidence comes from observational studies, which can show a connection but cannot prove that tea itself is the cause. People who drink a lot of tea may, for example, also have other healthy habits. Tea also contains caffeine, although less than coffee, and an amino acid called L-theanine, which may explain why many drinkers find tea both calming and stimulating. Even so, most researchers agree that tea is best seen as part of a healthy lifestyle rather than as a cure.",
    ],
  },
  sections: [
    {
      title: "Questions 1–5: Matching headings",
      instructions: {
        en: "The passage has six paragraphs, A–F. Choose the correct heading for paragraphs B–F. There are more headings than paragraphs.",
        az: "Mətnin altı abzası var (A–F). B–F abzasları üçün düzgün başlığı seçin. Başlıqlar abzaslardan çoxdur.",
        ru: "В тексте шесть абзацев (A–F). Выберите правильный заголовок для абзацев B–F. Заголовков больше, чем абзацев.",
      },
      questions: [
        { id: "q1", type: "match", prompt: "Paragraph B", options: HEADINGS, answer: 5, why: { az: "B abzası çayın dərman və ritual (rahiblər, meditasiya) kimi rolundan danışır → vi.", ru: "Абзац B — о чае как лекарстве и ритуале (монахи, медитация) → vi." } },
        { id: "q2", type: "match", prompt: "Paragraph C", options: HEADINGS, answer: 0, why: { az: "C: Portuqaliya və Hollandiya tacirləri çayı gəmi ilə Avropaya gətirdilər → i. (iii yalnız abzasın bir hissəsidir.)", ru: "C: португальские и голландские торговцы привезли чай в Европу морем → i. (iii — лишь часть абзаца.)" } },
        { id: "q3", type: "match", prompt: "Paragraph D", options: HEADINGS, answer: 3, why: { az: "D: bütün çaylar bir bitkidən gəlir, amma emal müxtəlif növlər yaradır → iv.", ru: "D: весь чай — из одного растения, но обработка даёт разные виды → iv." } },
        { id: "q4", type: "match", prompt: "Paragraph E", options: HEADINGS, answer: 4, why: { az: "E: Azərbaycanda çay mədəniyyəti → v.", ru: "E: чайная культура в Азербайджане → v." } },
        { id: "q5", type: "match", prompt: "Paragraph F", options: HEADINGS, answer: 6, why: { az: "F: alimlərin çayın sağlamlığa təsirinə marağı → vii.", ru: "F: интерес учёных к влиянию чая на здоровье → vii." } },
      ],
    },
    {
      title: "Questions 6–10: True / False / Not Given",
      instructions: {
        en: "Do the statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN.",
        az: "Fikirlər mətndəki məlumatla üst-üstə düşür? TRUE (doğru), FALSE (yanlış) və ya NOT GIVEN (mətndə yoxdur) seçin.",
        ru: "Согласуются ли утверждения с информацией в тексте? Выберите TRUE, FALSE или NOT GIVEN.",
      },
      questions: [
        { id: "q6", type: "tfng", prompt: "Historians accept the story of Shen Nong as fact.", answer: "F", why: { az: "\"Historians treat the story with caution\" — ehtiyatla yanaşırlar, fakt kimi qəbul etmirlər.", ru: "«Historians treat the story with caution» — относятся осторожно, а не принимают как факт." } },
        { id: "q7", type: "tfng", prompt: "Lu Yu's book included advice on how to serve tea.", answer: "T", why: { az: "\"a detailed guide to growing, preparing and serving it\".", ru: "«a detailed guide to growing, preparing and serving it»." } },
        { id: "q8", type: "tfng", prompt: "Catherine of Braganza introduced tea to Portugal.", answer: "NG", why: { az: "Onun Portuqaliyada artıq çay içdiyi deyilir, amma çayı Portuqaliyaya gətirdiyi deyilmir.", ru: "Сказано, что она уже пила чай, но не что она привезла чай в Португалию." } },
        { id: "q9", type: "tfng", prompt: "Illegal trade in tea decreased sharply after 1784.", answer: "T", why: { az: "\"smuggling collapsed almost overnight\".", ru: "«smuggling collapsed almost overnight»." } },
        { id: "q10", type: "tfng", prompt: "Green tea and black tea come from different plants.", answer: "F", why: { az: "\"All true tea comes from a single species\" — fərq emaldadır.", ru: "«All true tea comes from a single species» — разница в обработке." } },
      ],
    },
    {
      title: "Questions 11–13: Sentence completion",
      instructions: {
        en: "Complete the sentences. Use NO MORE THAN TWO WORDS from the passage for each answer.",
        az: "Cümlələri tamamlayın. Hər cavab üçün mətndən İKİ SÖZDƏN ÇOX OLMAYAN ifadə işlədin.",
        ru: "Завершите предложения. Используйте НЕ БОЛЕЕ ДВУХ СЛОВ из текста для каждого ответа.",
      },
      questions: [
        { id: "q11", type: "fill", prompt: "Black tea gets its dark colour because it is fully ___.", accept: ["oxidised", "oxidized"], why: { az: "\"Black tea is fully oxidised, which gives it its dark colour\".", ru: "«Black tea is fully oxidised, which gives it its dark colour»." } },
        { id: "q12", type: "fill", prompt: "In Azerbaijan, tea is traditionally served in glasses called ___.", accept: ["armudu"], why: { az: "\"pear-shaped glasses called armudu\".", ru: "«pear-shaped glasses called armudu»." } },
        { id: "q13", type: "fill", prompt: "Many studies on tea and health are ___ studies, which cannot prove cause and effect.", accept: ["observational"], why: { az: "\"observational studies, which can show a connection but cannot prove…\".", ru: "«observational studies, which can show a connection but cannot prove…»." } },
      ],
    },
  ],
};
