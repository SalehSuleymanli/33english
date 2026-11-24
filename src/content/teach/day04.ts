import type { Teach } from "./types";

export const TEACH_04: Teach = {
  day: 4,
  summary: {
    az: "Bu dərsdə vəziyyət çərçivəsini keçmişə və gələcəyə keçirirsiniz: was / were və will be. Bununla dünənki və sabahkı vəziyyətləri, doğulduğunuz yeri və tarixi, keçmiş təcrübələri təsvir edə biləcəksiniz.",
    ru: "В этом уроке вы переносите рамку состояния в прошлое и будущее: was / were и will be. Вы сможете описывать вчерашние и завтрашние состояния, место и дату рождения, прошлый опыт.",
  },
  sections: [
    {
      id: "past",
      title: { az: "1. Keçmiş zaman: was və were", ru: "1. Прошедшее время: was и were" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "İndiki zamandakı üç formanın (am, is, are) keçmişdə yalnız iki forması var: was və were. \"Am\" və \"is\" keçmişdə \"was\" olur, \"are\" isə \"were\" olur. Cümlənin quruluşu dəyişmir: mübtəda + was/were + təsvir.",
            ru: "У трёх форм настоящего времени (am, is, are) в прошедшем всего две формы: was и were. «Am» и «is» в прошедшем становятся «was», а «are» — «were». Структура предложения не меняется: подлежащее + was/were + описание.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Mübtəda", ru: "Подлежащее" }, { az: "İndi", ru: "Сейчас" }, { az: "Keçmiş", ru: "Прошлое" }, { az: "Gələcək", ru: "Будущее" }],
          rows: [
            ["I", "am", "was", "will be"],
            ["he / she / it", "is", "was", "will be"],
            ["you / we / they", "are", "were", "will be"],
          ],
        },
        {
          kind: "formula",
          label: { az: "Keçmiş zamanda təsdiq", ru: "Утверждение в прошедшем" },
          parts: [
            { text: "We", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "were", role: "be", note: { az: "Keçmiş zaman: we/you/they ilə were.", ru: "Прошедшее время: с we/you/they — were." } },
            { text: "very tired", role: "complement", note: { az: "Vəziyyət, təsvir.", ru: "Состояние, описание." } },
            { text: "yesterday", role: "time", note: { az: "Keçmiş zaman ifadəsi.", ru: "Выражение прошедшего времени." } },
          ],
          example: "We were very tired yesterday.",
        },
      ],
    },
    {
      id: "past-forms",
      title: { az: "2. Keçmişdə inkar, sual və qısa cavablar", ru: "2. Отрицание, вопрос и краткие ответы в прошедшем" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "I was at home. They were happy."],
            ["−", "I wasn't at home. They weren't happy."],
            ["?", "Was I right? Were they happy?"],
            ["Short answers", "Yes, I was. / No, I wasn't. Yes, they were. / No, they weren't."],
            ["Wh- ?", "Where were you? How was the film? Why was she angry?"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "İnkarda: was not = wasn't, were not = weren't. Sualda was/were mübtədadan əvvələ keçir, eynilə indiki zamandakı kimi. Keçmiş zamanda da \"did\" köməkçi feili \"be\" ilə işlənmir: \"Were you at work?\" düzgündür, \"Did you be at work?\" səhvdir.",
            ru: "В отрицании: was not = wasn't, were not = weren't. В вопросе was/were встают перед подлежащим, как и в настоящем времени. В прошедшем вспомогательный «did» с «be» тоже не используется: «Were you at work?» — правильно, «Did you be at work?» — ошибка.",
          },
        },
        {
          kind: "tip",
          text: {
            az: "\"How was…?\" sualı keçmiş təcrübə haqqında soruşmağın ən təbii yoludur: How was your weekend? How was the trip? How was the exam?",
            ru: "Вопрос «How was…?» — самый естественный способ спросить о прошедшем опыте: How was your weekend? How was the trip? How was the exam?",
          },
        },
      ],
    },
    {
      id: "born",
      title: { az: "3. Xüsusi hal: I was born", ru: "3. Особый случай: I was born" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Doğulmaq ingilis dilində həmişə \"be born\" ilə ifadə olunur və adətən keçmiş zamanda işlənir: \"I was born in 1998\", \"She was born in Shamakhi\". \"I born\" və ya \"I am born\" demək səhvdir. Şəhər və il üçün \"in\", tam tarix üçün \"on\" işlənir: \"on 5 May 1998\".",
            ru: "«Родиться» по-английски всегда «be born», и обычно в прошедшем времени: «I was born in 1998», «She was born in Shamakhi». «I born» или «I am born» — ошибка. С городом и годом — «in», с полной датой — «on»: «on 5 May 1998».",
          },
        },
        {
          kind: "examples",
          items: [
            { en: "Where were you born? — I was born in Sumgait.", az: "Harada doğulmusan? — Sumqayıtda doğulmuşam.", ru: "Где ты родился? — Я родился в Сумгаите." },
            { en: "My grandfather was born in 1950.", az: "Babam 1950-ci ildə doğulub.", ru: "Мой дедушка родился в 1950 году." },
          ],
        },
      ],
    },
    {
      id: "future",
      title: { az: "4. Gələcək zaman: will be", ru: "4. Будущее время: will be" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Gələcəkdə bütün şəxslər üçün eyni forma işlənir: will be. İxtisar: I'll be, you'll be, she'll be, they'll be. İnkar: will not be = won't be. Sual: Will + mübtəda + be …? Qısa cavab: Yes, I will. / No, I won't.",
            ru: "В будущем для всех лиц одна форма: will be. Сокращения: I'll be, you'll be, she'll be, they'll be. Отрицание: will not be = won't be. Вопрос: Will + подлежащее + be …? Краткий ответ: Yes, I will. / No, I won't.",
          },
        },
        {
          kind: "formula",
          label: { az: "Gələcəkdə təsdiq", ru: "Утверждение в будущем" },
          parts: [
            { text: "I", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "will be", role: "be", note: { az: "Gələcək: bütün şəxslər üçün eyni.", ru: "Будущее: одинаково для всех лиц." } },
            { text: "at the office", role: "place", note: { az: "Yer və ya vəziyyət.", ru: "Место или состояние." } },
            { text: "tomorrow", role: "time", note: { az: "Gələcək zaman ifadəsi.", ru: "Выражение будущего времени." } },
          ],
          example: "I will be at the office tomorrow.",
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "She'll be 30 next month. It will be cold tonight."],
            ["−", "I won't be at home. They won't be late."],
            ["?", "Will you be free on Friday? — Yes, I will. / No, I won't."],
            ["going to", "It's going to be a long day. (the signs are already here)"],
          ],
        },
      ],
    },
    {
      id: "time",
      title: { az: "5. Zaman ifadələri", ru: "5. Выражения времени" },
      blocks: [
        {
          kind: "signals",
          words: ["yesterday", "last night", "last summer", "two weeks ago", "in 2015", "at that time", "when I was young", "tomorrow", "next year", "in an hour", "soon", "one day"],
          text: {
            az: "Birinci qrup keçmişi, ikinci qrup gələcəyi göstərir. Zaman ifadəsi adətən cümlənin sonunda gəlir, amma vurğu üçün əvvələ də keçə bilər: \"Yesterday I was ill.\" \"Last\" və \"next\" sözlərindən əvvəl \"in\" və ya \"on\" qoyulmur: \"last week\", \"in last week\" yox.",
            ru: "Первая группа указывает на прошлое, вторая — на будущее. Выражение времени обычно стоит в конце предложения, но для акцента может быть в начале: «Yesterday I was ill.» Перед «last» и «next» не ставят «in» или «on»: «last week», а не «in last week».",
          },
        },
      ],
    },
    {
      id: "compare",
      title: { az: "6. Müqayisə", ru: "6. Сравнение" },
      blocks: [
        {
          kind: "compare",
          items: [
            {
              en: "There was a party. / The party was great.",
              text: {
                az: "There was hadisəni təqdim edir (1-ci çərçivə). \"The party was great\" artıq məlum hadisəni təsvir edir (2-ci çərçivə).",
                ru: "There was вводит событие (рамка 1). «The party was great» описывает уже известное событие (рамка 2).",
              },
            },
            {
              en: "I was tired. / I got tired.",
              text: {
                az: "\"Was tired\" vəziyyətin özüdür (yorğun idim). \"Got tired\" vəziyyətə keçidi bildirir (yoruldum).",
                ru: "«Was tired» — само состояние (я был уставшим). «Got tired» — переход в состояние (я устал).",
              },
            },
            {
              en: "I'll be there at 8. / I'm going to be late.",
              text: {
                az: "\"Will be\" söz vermək, qərar və ya ümumi proqnoz üçün. \"Going to be\" artıq əlamətləri görünən gələcək üçün: tıxacdayam, deməli gecikəcəyəm.",
                ru: "«Will be» — для обещания, решения или общего прогноза. «Going to be» — для будущего, признаки которого уже видны: я в пробке, значит опоздаю.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "examples",
      title: { az: "7. Nümunələr və tərcümələr", ru: "7. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "The weather was terrible last weekend.", az: "Keçən həftə sonu hava dəhşət idi.", ru: "В прошлые выходные погода была ужасная." },
            { en: "Were you at the meeting? — No, I wasn't. I was ill.", az: "İclasda idin? — Yox. Xəstə idim.", ru: "Ты был на совещании? — Нет. Я болел." },
            { en: "My grandparents were teachers.", az: "Babam və nənəm müəllim idilər.", ru: "Мои бабушка и дедушка были учителями." },
            { en: "How was your holiday? — It was amazing.", az: "Tətilin necə keçdi? — Möhtəşəm idi.", ru: "Как прошёл отпуск? — Потрясающе." },
            { en: "The shops weren't open on Sunday.", az: "Bazar günü mağazalar açıq deyildi.", ru: "В воскресенье магазины не работали." },
            { en: "I'll be back in ten minutes.", az: "On dəqiqəyə qayıdacağam.", ru: "Я вернусь через десять минут." },
            { en: "Will it be expensive? — No, it won't.", az: "Baha olacaq? — Yox.", ru: "Это будет дорого? — Нет." },
            { en: "She won't be happy about this.", az: "O, buna sevinməyəcək.", ru: "Она этому не обрадуется." },
            { en: "When I was a child, I was very shy.", az: "Uşaq olanda çox utancaq idim.", ru: "В детстве я был очень застенчивым." },
            { en: "Tomorrow will be a busy day.", az: "Sabah gərgin gün olacaq.", ru: "Завтра будет напряжённый день." },
            { en: "Where were you at 9 o'clock? — I was in the gym.", az: "Saat 9-da harada idin? — İdman zalında idim.", ru: "Где ты был в 9 часов? — В спортзале." },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "8. Tipik səhvlər", ru: "8. Типичные ошибки" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "We was at home.", right: "We were at home.", why: { az: "We, you, they ilə keçmişdə \"were\" işlənir.", ru: "С we, you, they в прошедшем — «were»." } },
            { wrong: "Yesterday I am tired.", right: "Yesterday I was tired.", why: { az: "Zaman ifadəsi keçmişi göstərirsə, feil də keçmiş zamanda olmalıdır.", ru: "Если выражение времени указывает на прошлое, глагол тоже должен быть в прошедшем." } },
            { wrong: "I born in 1995.", right: "I was born in 1995.", why: { az: "\"Doğulmaq\" = be born. \"Was\" mütləqdir.", ru: "«Родиться» = be born. «Was» обязателен." } },
            { wrong: "Did you be at school?", right: "Were you at school?", why: { az: "\"Be\" ilə \"did\" işlənmir.", ru: "С «be» не используется «did»." } },
            { wrong: "I will be go home.", right: "I will go home. / I will be at home.", why: { az: "\"Will be\" vəziyyət üçündür. Hərəkət üçün \"will + feil\" (6-cı gün).", ru: "«Will be» — для состояния. Для действия — «will + глагол» (6-й день)." } },
            { wrong: "Will you are at home?", right: "Will you be at home?", why: { az: "\"Will\"-dən sonra həmişə feilin əsas forması gəlir: be.", ru: "После «will» всегда идёт начальная форма глагола: be." } },
            { wrong: "In last summer I was in Gabala.", right: "Last summer I was in Gabala.", why: { az: "\"Last\" və \"next\" ilə \"in\" işlənmir.", ru: "С «last» и «next» предлог «in» не нужен." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Keçmiş: I/he/she/it → was; you/we/they → were.", ru: "Прошедшее: I/he/she/it → was; you/we/they → were." },
    { az: "Gələcək: hamı üçün will be; inkar won't be.", ru: "Будущее: для всех will be; отрицание won't be." },
    { az: "Sual: Was/Were + mübtəda…? Will + mübtəda + be…? \"Did\" işlənmir.", ru: "Вопрос: Was/Were + подлежащее…? Will + подлежащее + be…? «Did» не используется." },
    { az: "Doğulmaq: I was born in/on …", ru: "Родиться: I was born in/on …" },
  ],
};
