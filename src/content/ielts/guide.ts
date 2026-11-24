/** How the IELTS Speaking test works — shown on every Pre-IELTS speaking page, in AZ/RU/EN. */
type L = { en: string; az: string; ru: string };

export const SPEAKING_PARTS: { id: "part1" | "part2" | "part3"; name: L; time: L; what: L; tip: L }[] = [
  {
    id: "part1",
    name: { en: "Part 1 — Introduction and interview", az: "1-ci hissə — Tanışlıq və müsahibə", ru: "Часть 1 — Знакомство и интервью" },
    time: { en: "4–5 minutes", az: "4–5 dəqiqə", ru: "4–5 минут" },
    what: {
      en: "The examiner asks short questions about familiar topics: your work or studies, home, hobbies and daily life.",
      az: "İmtahançı tanış mövzularda qısa suallar verir: işiniz və ya təhsiliniz, eviniz, hobbiləriniz və gündəlik həyatınız.",
      ru: "Экзаменатор задаёт короткие вопросы на знакомые темы: работа или учёба, дом, хобби и повседневная жизнь.",
    },
    tip: {
      en: "Answer in 2–3 sentences: a direct answer, a reason and an example. Never answer only 'Yes' or 'No'.",
      az: "2–3 cümlə ilə cavab verin: birbaşa cavab, səbəb və nümunə. Heç vaxt yalnız \"Yes\" və ya \"No\" deməyin.",
      ru: "Отвечайте 2–3 предложениями: прямой ответ, причина и пример. Никогда не отвечайте только «Yes» или «No».",
    },
  },
  {
    id: "part2",
    name: { en: "Part 2 — Individual long turn", az: "2-ci hissə — Fərdi monoloq", ru: "Часть 2 — Монолог" },
    time: { en: "1 minute to prepare, 1–2 minutes to speak", az: "1 dəqiqə hazırlıq, 1–2 dəqiqə danışıq", ru: "1 минута на подготовку, 1–2 минуты на ответ" },
    what: {
      en: "You get a cue card with a topic and points to cover. You have one minute to make notes, then you speak alone for up to two minutes.",
      az: "Sizə mövzu və cavablandırılmalı bəndlər olan kart verilir. Qeyd etmək üçün bir dəqiqəniz var, sonra iki dəqiqəyə qədər tək danışırsınız.",
      ru: "Вы получаете карточку с темой и пунктами. У вас минута на заметки, затем вы говорите самостоятельно до двух минут.",
    },
    tip: {
      en: "Write key words, not sentences. Cover every point in order and spend the most time on the last one, the 'explain why' part.",
      az: "Cümlə yox, açar sözlər yazın. Bütün bəndləri ardıcıllıqla əhatə edin və ən çox vaxtı sonuncuya — \"niyə\" hissəsinə ayırın.",
      ru: "Записывайте ключевые слова, а не предложения. Раскройте все пункты по порядку и больше всего времени уделите последнему — «объясните почему».",
    },
  },
  {
    id: "part3",
    name: { en: "Part 3 — Discussion", az: "3-cü hissə — Müzakirə", ru: "Часть 3 — Обсуждение" },
    time: { en: "4–5 minutes", az: "4–5 dəqiqə", ru: "4–5 минут" },
    what: {
      en: "More abstract questions linked to the Part 2 topic: society, causes and effects, the past and the future.",
      az: "2-ci hissənin mövzusu ilə bağlı daha mücərrəd suallar: cəmiyyət, səbəb və nəticələr, keçmiş və gələcək.",
      ru: "Более абстрактные вопросы по теме части 2: общество, причины и следствия, прошлое и будущее.",
    },
    tip: {
      en: "Give your opinion, support it with a reason and an example, and consider another view. This is where conditionals, comparisons and passives raise your grammar score.",
      az: "Fikrinizi bildirin, onu səbəb və nümunə ilə əsaslandırın və başqa baxış bucağını da nəzərə alın. Şərt cümlələri, müqayisələr və passive qrammatika balınızı məhz burada artırır.",
      ru: "Выскажите мнение, подкрепите его причиной и примером, рассмотрите другую точку зрения. Именно здесь условные предложения, сравнения и пассив повышают балл за грамматику.",
    },
  },
];

export const SPEAKING_CRITERIA: { name: L; what: L }[] = [
  { name: { en: "Fluency and coherence", az: "Səlislik və ardıcıllıq", ru: "Беглость и связность" }, what: { en: "Speaking without long pauses and linking ideas clearly.", az: "Uzun fasilələr olmadan danışmaq və fikirləri aydın bağlamaq.", ru: "Говорить без долгих пауз и ясно связывать мысли." } },
  { name: { en: "Lexical resource", az: "Lüğət ehtiyatı", ru: "Лексический запас" }, what: { en: "Using a range of words and natural expressions.", az: "Müxtəlif sözlərdən və təbii ifadələrdən istifadə etmək.", ru: "Использовать разнообразные слова и естественные выражения." } },
  { name: { en: "Grammatical range and accuracy", az: "Qrammatik müxtəliflik və dəqiqlik", ru: "Грамматическое разнообразие и точность" }, what: { en: "Mixing simple and complex sentences correctly — exactly the 33-day frames.", az: "Sadə və mürəkkəb cümlələri düzgün qarışdırmaq — məhz 33 günlük çərçivələr.", ru: "Правильно сочетать простые и сложные предложения — именно рамки из 33 дней." } },
  { name: { en: "Pronunciation", az: "Tələffüz", ru: "Произношение" }, what: { en: "Being easy to understand, with natural stress and intonation.", az: "Asan başa düşülmək, təbii vurğu və intonasiya.", ru: "Быть понятным, с естественным ударением и интонацией." } },
];
