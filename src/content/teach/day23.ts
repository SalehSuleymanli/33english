import type { Teach } from "./types";

export const TEACH_23: Teach = {
  day: 23,
  summary: {
    az: "Bu dərsdə bərabərlik və fərq bildirməyi öyrənirsiniz: as … as (eyni dərəcədə), not as … as (o qədər deyil), the same as, similar to, different from, və fərq haqqında soruşmaq: What's the difference between…? What makes it different? Bu strukturlar fikir bildirmək və müqayisə etmək üçün əsasdır.",
    ru: "В этом уроке вы научитесь выражать равенство и различие: as … as (так же), not as … as (не так), the same as, similar to, different from, а также спрашивать о разнице: What's the difference between…? What makes it different? Это основа для выражения мнения и сравнения.",
  },
  sections: [
    {
      id: "as-as",
      title: { az: "1. As … as: bərabərlik", ru: "1. As … as: равенство" },
      blocks: [
        {
          kind: "formula",
          label: { az: "As + sifət + as", ru: "As + прилагательное + as" },
          parts: [
            { text: "My car", role: "subject", note: { az: "Birinci.", ru: "Первый." } },
            { text: "is", role: "be", note: { az: "Feil.", ru: "Глагол." } },
            { text: "as fast as", role: "complement", note: { az: "as + sifətin adi forması + as (-er yox).", ru: "as + обычная форма прилагательного + as (без -er)." } },
            { text: "yours", role: "other", note: { az: "İkinci.", ru: "Второй." } },
          ],
          example: "My car is as fast as yours.",
        },
        {
          kind: "p",
          text: {
            az: "\"As … as\" iki şeyin eyni dərəcədə olduğunu bildirir: \"She's as tall as her mother\" — anası qədər ucadır. Azərbaycan dilində \"... qədər\", rus dilində «такой же …, как» deyirik. Sifət burada adi formadadır: \"as taller as\" səhvdir. Zərflərlə də işlənir: \"He runs as fast as me.\"",
            ru: "«As … as» говорит, что два предмета одинаковы по степени: «She's as tall as her mother» — она такая же высокая, как мама. По-русски — «такой же …, как». Прилагательное здесь в обычной форме: «as taller as» — ошибка. Используется и с наречиями: «He runs as fast as me.»",
          },
        },
      ],
    },
    {
      id: "not-as",
      title: { az: "2. Not as … as: o qədər deyil", ru: "2. Not as … as: не такой … как" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Not as … as\" birinci şeyin daha az olduğunu deyir və müqayisə dərəcəsindən daha yumşaq, nəzakətli səslənir. \"This hotel isn't as good as the last one\" — bu otel əvvəlki qədər yaxşı deyil (yəni daha pisdir, amma bunu yumşaq deyirik). İngilis dilində tənqidi yumşaltmaq üçün çox işlənir.",
            ru: "«Not as … as» говорит, что первое уступает, и звучит мягче и вежливее, чем сравнительная степень. «This hotel isn't as good as the last one» — этот отель не такой хороший, как предыдущий (то есть хуже, но сказано мягко). В английском так часто смягчают критику.",
          },
        },
        {
          kind: "compare",
          items: [
            { en: "Tea isn't as expensive as coffee. = Tea is cheaper than coffee.", text: { az: "Məna eynidir, amma birinci cümlə daha yumşaqdır və diqqəti qəhvənin bahalığına yönəldir.", ru: "Смысл тот же, но первое мягче и фокусирует внимание на дороговизне кофе." } },
          ],
        },
        {
          kind: "table",
          head: [{ az: "İfadə", ru: "Выражение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["as soon as possible", "Please reply as soon as possible."],
            ["as much as / as many as", "Eat as much as you want. Take as many as you need."],
            ["twice as … as", "This flat is twice as big as ours."],
            ["just as … as / nearly as … as", "It's just as good. It's not nearly as hard as I thought."],
          ],
        },
      ],
    },
    {
      id: "same-different",
      title: { az: "3. The same, similar, different, like", ru: "3. The same, similar, different, like" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["the same as", "eyni / такой же, как", "Your phone is the same as mine."],
            ["the same + noun + as", "eyni (nə) / тот же", "We're the same age. She has the same bag as me."],
            ["similar to", "oxşar / похожий на", "Azerbaijani is similar to Turkish."],
            ["different from", "fərqli / отличается от", "Life in the village is different from life in the city."],
            ["like (preposition)", "kimi, bənzər / как, похоже на", "He looks like his father. It tastes like chicken."],
            ["alike", "bir-birinə oxşar / похожи", "The twins look exactly alike."],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "Ön sözlərə diqqət: the same AS, similar TO, different FROM. Rus dilindəki «похож на» və «отличается от» təsiri ilə \"similar with\" və \"different of\" deyilir — bu, səhvdir.",
            ru: "Внимание к предлогам: the same AS, similar TO, different FROM. Под влиянием русского иногда говорят «similar with» или «different of» — это ошибки.",
          },
        },
      ],
    },
    {
      id: "difference",
      title: { az: "4. Fərq haqqında danışmaq", ru: "4. Как говорить о разнице" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Sual / cavab", ru: "Вопрос / ответ" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["What's the difference between A and B?", "What's the difference between 'say' and 'tell'?"],
            ["The difference is that …", "The difference is that 'tell' needs a person after it."],
            ["What makes it different / special?", "What makes your company different from others?"],
            ["The main difference / one difference is …", "The main difference is the price."],
            ["A is …, whereas / while B is …", "Tea is calming, whereas coffee gives you energy."],
            ["Both A and B …", "Both cities are beautiful."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "\"What makes it different?\" sualı iş müsahibələrində, satışda və təqdimatlarda çox işlənir. Cavabı adətən \"What makes it different is …\" və ya \"It's different because …\" ilə başlayır.",
            ru: "Вопрос «What makes it different?» часто звучит на собеседованиях, в продажах и презентациях. Ответ обычно начинается с «What makes it different is …» или «It's different because …».",
          },
        },
      ],
    },
    {
      id: "examples",
      title: { az: "5. Nümunələr və tərcümələr", ru: "5. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "Sheki isn't as big as Baku, but it's very beautiful.", az: "Şəki Bakı qədər böyük deyil, amma çox gözəldir.", ru: "Шеки не такой большой, как Баку, но очень красивый." },
            { en: "My English isn't as good as yours.", az: "Mənim ingiliscəm səninki qədər yaxşı deyil.", ru: "Мой английский не такой хороший, как твой." },
            { en: "The exam was as difficult as we expected.", az: "İmtahan gözlədiyimiz qədər çətin idi.", ru: "Экзамен был таким трудным, как мы и ожидали." },
            { en: "Call me as soon as you arrive.", az: "Çatan kimi mənə zəng et.", ru: "Позвони, как только приедешь." },
            { en: "We have the same taste in music.", az: "Musiqi zövqümüz eynidir.", ru: "У нас одинаковый вкус в музыке." },
            { en: "Your situation is similar to mine.", az: "Sənin vəziyyətin mənimkinə oxşayır.", ru: "Твоя ситуация похожа на мою." },
            { en: "British English is a bit different from American English.", az: "Britaniya ingiliscəsi Amerika ingiliscəsindən bir az fərqlidir.", ru: "Британский английский немного отличается от американского." },
            { en: "You look like your mother.", az: "Anana oxşayırsan.", ru: "Ты похож на маму." },
            { en: "What's the difference between these two models?", az: "Bu iki model arasında fərq nədir?", ru: "В чём разница между этими двумя моделями?" },
            { en: "The difference is that this one has more memory.", az: "Fərq ondadır ki, bunun yaddaşı daha çoxdur.", ru: "Разница в том, что у этой больше памяти." },
            { en: "What makes this restaurant special?", az: "Bu restoranı xüsusi edən nədir?", ru: "Чем особенный этот ресторан?" },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "6. Tipik səhvlər", ru: "6. Типичные ошибки" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "She is as taller as me.", right: "She is as tall as me.", why: { az: "As … as arasında sifətin adi forması.", ru: "Между as … as — обычная форма прилагательного." } },
            { wrong: "It's not so expensive like I thought.", right: "It's not as expensive as I thought.", why: { az: "Müqayisədə ikinci hissə \"as\" ilə.", ru: "Во второй части сравнения — «as»." } },
            { wrong: "My phone is the same like yours.", right: "My phone is the same as yours.", why: { az: "The same AS.", ru: "The same AS." } },
            { wrong: "It is similar with Turkish.", right: "It is similar to Turkish.", why: { az: "Similar TO.", ru: "Similar TO." } },
            { wrong: "It's different of the original.", right: "It's different from the original.", why: { az: "Different FROM.", ru: "Different FROM." } },
            { wrong: "What is the different between them?", right: "What is the difference between them?", why: { az: "Isim lazımdır: difference (different — sifətdir).", ru: "Нужно существительное: difference (different — прилагательное)." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "As + sifət + as = eyni dərəcədə; not as … as = daha az (yumşaq müqayisə).", ru: "As + прилагательное + as = так же; not as … as = менее (мягкое сравнение)." },
    { az: "The same as, similar to, different from — ön sözləri yadda saxlayın.", ru: "The same as, similar to, different from — запомните предлоги." },
    { az: "What's the difference between A and B? — The difference is that …", ru: "What's the difference between A and B? — The difference is that …" },
  ],
};
