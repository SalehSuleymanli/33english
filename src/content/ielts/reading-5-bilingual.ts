import type { Test } from "../tests/types";

const P = ["A", "B", "C", "D", "E", "F", "G"];

export const IELTS_READING_BILINGUAL: Test = {
  id: "ielts-r5-bilingual",
  kind: "ielts-reading",
  level: "advanced",
  title: { en: "Practice Test 5: The bilingual brain", az: "Məşq testi 5: İkidilli beyin", ru: "Тренировочный тест 5: Двуязычный мозг" },
  description: {
    en: "Linguistics · about 700 words · Yes/No/Not Given, matching information, summary completion, short answers. Difficulty: Band 6.5–7.5.",
    az: "Dilçilik · təxminən 700 söz · Bəli/Xeyr/Verilməyib, məlumatın uyğunlaşdırılması, xülasə tamamlama, qısa cavablar. Çətinlik: Band 6.5–7.5.",
    ru: "Лингвистика · около 700 слов · Yes/No/Not Given, сопоставление информации, завершение резюме, краткие ответы. Сложность: Band 6.5–7.5.",
  },
  minutes: 20,
  timed: true,
  passage: {
    title: "The bilingual brain",
    labels: P,
    paragraphs: [
      "For much of the twentieth century, bringing up a child with two languages was widely regarded as a risk. Teachers and doctors warned parents that children exposed to more than one language would become confused, fall behind at school and perhaps never speak either language well. Some early studies appeared to support these fears, showing that bilingual children scored lower on intelligence tests than their monolingual classmates. Parents were sometimes advised to stop speaking their own language at home altogether, even when they spoke the majority language poorly themselves.",
      "Those studies, however, had serious weaknesses. Many compared children from immigrant families, who were often poorer and were tested in a language they had only recently begun to learn, with children from wealthier native-speaking families. In 1962, a study by Elizabeth Peal and Wallace Lambert in Montreal took these differences into account and reached the opposite conclusion: once social background was controlled for, bilingual children performed as well as or better than monolinguals on a range of tasks. Their bilingual participants were also more flexible on tasks that required thinking about a problem in more than one way. The study was influential because it showed how easily social differences can be mistaken for the effects of language.",
      "Since then, attention has shifted to what bilingualism might do for the brain. Because bilingual people have two languages active in their minds at the same time, they must constantly select one and suppress the other. Some researchers have proposed that this continual practice strengthens executive control — the set of mental skills that allow us to focus attention, ignore distractions and switch between tasks. A number of experiments have found that bilingual children and adults perform faster on tasks that require such skills. Brain-imaging studies have also suggested that bilinguals may differ in areas involved in attention and control, although interpreting such images is far from straightforward.",
      "The most striking claims concern ageing. Several studies in Canada and India reported that bilingual patients developed the symptoms of dementia several years later, on average, than monolingual patients with similar levels of brain damage. Researchers suggested that a lifetime of managing two languages might build a 'cognitive reserve' that helps the brain cope with disease for longer. It is worth stressing that bilingualism did not appear to prevent the disease itself, only to delay its visible effects. These findings attracted wide media attention, and headlines soon claimed that learning a language could protect against dementia — a far stronger statement than the researchers themselves had made.",
      "In recent years, however, the idea of a 'bilingual advantage' has become one of the most debated topics in psychology. Several large studies have failed to find any consistent difference in executive control between bilinguals and monolinguals. Critics argue that positive results are more likely to be published than negative ones, which can create a misleading picture. They also point out that bilinguals differ enormously from one another: someone who learned two languages from birth and uses both every day has a very different experience from someone who studied a second language at school. Others note that many experiments used small samples, sometimes fewer than thirty people, which makes chance results more likely.",
      "My own reading of the evidence is that the strongest claims have been overstated, but that the debate itself has been valuable. It has forced researchers to define bilingualism more carefully and to design better studies. Above all, it has helped to remove the old fear that two languages are harmful. On that point, the evidence is now remarkably consistent: children are perfectly capable of learning two or more languages, and doing so does not damage their development in either.",
      "Whatever its effects on attention, bilingualism offers benefits that need no laboratory to confirm: access to other cultures, literature and people, and often better opportunities in the job market. For countries like Azerbaijan, where many people grow up speaking Azerbaijani and Russian and are now adding English, these practical advantages may matter far more than a few milliseconds on a reaction-time test. Moreover, learning a language as an adult brings its own satisfactions, regardless of whether it changes the structure of the brain.",
    ],
  },
  sections: [
    {
      title: "Questions 1–4: Yes / No / Not Given",
      instructions: {
        en: "Do the statements agree with the views of the writer? Choose YES, NO or NOT GIVEN.",
        az: "Fikirlər müəllifin baxışları ilə üst-üstə düşür? YES, NO və ya NOT GIVEN seçin.",
        ru: "Совпадают ли утверждения с мнением автора? Выберите YES, NO или NOT GIVEN.",
      },
      questions: [
        { id: "q1", type: "tfng", yesNo: true, prompt: "The early studies showing bilingual children were less intelligent were reliable.", answer: "F", why: { az: "\"Those studies, however, had serious weaknesses\".", ru: "«Those studies, however, had serious weaknesses»." } },
        { id: "q2", type: "tfng", yesNo: true, prompt: "Some claims about the benefits of bilingualism have been exaggerated.", answer: "T", why: { az: "\"the strongest claims have been overstated\".", ru: "«the strongest claims have been overstated»." } },
        { id: "q3", type: "tfng", yesNo: true, prompt: "The debate about the bilingual advantage has been a waste of time.", answer: "F", why: { az: "\"the debate itself has been valuable\".", ru: "«the debate itself has been valuable»." } },
        { id: "q4", type: "tfng", yesNo: true, prompt: "Schools in Azerbaijan should teach all subjects in English.", answer: "NG", why: { az: "Müəllif bu barədə fikir bildirmir.", ru: "Автор об этом не высказывается." } },
      ],
    },
    {
      title: "Questions 5–8: Matching information",
      instructions: {
        en: "Which paragraph, A–G, contains the following information?",
        az: "Aşağıdakı məlumat hansı abzasda (A–G) var?",
        ru: "В каком абзаце (A–G) содержится следующая информация?",
      },
      questions: [
        { id: "q5", type: "match", prompt: "a reason why published research may give a false impression", options: P, answer: 4, why: { az: "E: \"positive results are more likely to be published than negative ones\".", ru: "E: «positive results are more likely to be published than negative ones»." } },
        { id: "q6", type: "match", prompt: "a study that corrected for differences in family background", options: P, answer: 1, why: { az: "B: Peal və Lambert (1962) sosial mənşəyi nəzərə aldılar.", ru: "B: Пил и Ламберт (1962) учли социальное происхождение." } },
        { id: "q7", type: "match", prompt: "a description of the skills involved in executive control", options: P, answer: 2, why: { az: "C: diqqəti cəmləmək, yayındırıcıları nəzərə almamaq, tapşırıqlar arasında keçid.", ru: "C: фокусировка внимания, игнорирование помех, переключение между задачами." } },
        { id: "q8", type: "match", prompt: "practical advantages of speaking more than one language", options: P, answer: 6, why: { az: "G: mədəniyyətlərə çıxış, iş imkanları.", ru: "G: доступ к культурам, возможности на рынке труда." } },
      ],
    },
    {
      title: "Questions 9–11: Summary completion",
      instructions: {
        en: "Complete the summary. Use NO MORE THAN TWO WORDS from the passage for each answer.",
        az: "Xülasəni tamamlayın. Hər cavab üçün mətndən İKİ SÖZDƏN ÇOX OLMAYAN ifadə işlədin.",
        ru: "Завершите резюме. Используйте НЕ БОЛЕЕ ДВУХ СЛОВ из текста для каждого ответа.",
      },
      questions: [
        { id: "q9", type: "fill", prompt: "Bilinguals must constantly select one language and ___ the other.", accept: ["suppress"], why: { az: "\"they must constantly select one and suppress the other\".", ru: "«they must constantly select one and suppress the other»." } },
        { id: "q10", type: "fill", prompt: "Studies in Canada and India suggested that bilingualism may delay the symptoms of ___.", accept: ["dementia"], why: { az: "\"developed the symptoms of dementia several years later\".", ru: "«developed the symptoms of dementia several years later»." } },
        { id: "q11", type: "fill", prompt: "Managing two languages over a lifetime might build a cognitive ___.", accept: ["reserve"], why: { az: "\"build a 'cognitive reserve'\".", ru: "«build a 'cognitive reserve'»." } },
      ],
    },
    {
      title: "Questions 12–13: Short-answer questions",
      instructions: {
        en: "Answer the questions. Use NO MORE THAN THREE WORDS AND/OR A NUMBER from the passage.",
        az: "Suallara cavab verin. Mətndən ÜÇ SÖZDƏN VƏ/VƏ YA BİR RƏQƏMDƏN ÇOX OLMAYAN ifadə işlədin.",
        ru: "Ответьте на вопросы. Используйте НЕ БОЛЕЕ ТРЁХ СЛОВ И/ИЛИ ЧИСЛА из текста.",
      },
      questions: [
        { id: "q12", type: "short", prompt: "In which city did Peal and Lambert carry out their study?", accept: ["Montreal", "in Montreal"], maxWords: 3, why: { az: "\"a study by Elizabeth Peal and Wallace Lambert in Montreal\".", ru: "«a study by Elizabeth Peal and Wallace Lambert in Montreal»." } },
        { id: "q13", type: "short", prompt: "In what year was their study published?", accept: ["1962"], maxWords: 1, why: { az: "\"In 1962, a study by …\".", ru: "«In 1962, a study by …»." } },
      ],
    },
  ],
};
