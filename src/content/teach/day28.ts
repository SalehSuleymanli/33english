import type { Teach } from "./types";

export const TEACH_28: Teach = {
  day: 28,
  summary: {
    az: "Bu dərsdə seçim və qarşılıqlı münasibət ifadə edən strukturları öyrənirsiniz: each other / one another, either … or, neither … nor, both … and, prefer və would rather. Bunlar seçim etmək, qərar vermək və fikir bildirmək üçün lazımdır.",
    ru: "В этом уроке вы изучите структуры для выбора и взаимных отношений: each other / one another, either … or, neither … nor, both … and, prefer и would rather. Они нужны, чтобы выбирать, принимать решения и выражать предпочтения.",
  },
  sections: [
    {
      id: "each-other",
      title: { az: "1. Each other / one another: bir-birini", ru: "1. Each other / one another: друг друга" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Each other\" qarşılıqlı hərəkəti bildirir: \"They love each other\" — onlar bir-birini sevirlər. \"One another\" eyni mənadadır, bir az daha rəsmidir və adətən ikidən çox şəxs üçün işlənir. \"Themselves\" ilə qarışdırmayın: \"They looked at each other\" (bir-birinə baxdılar) ≠ \"They looked at themselves\" (hər biri özünə baxdı).",
            ru: "«Each other» выражает взаимное действие: «They love each other» — они любят друг друга. «One another» значит то же, звучит чуть официальнее и обычно для более чем двух людей. Не путайте с «themselves»: «They looked at each other» (посмотрели друг на друга) ≠ «They looked at themselves» (каждый посмотрел на себя).",
          },
        },
      ],
    },
    {
      id: "either",
      title: { az: "2. Both … and, either … or, neither … nor", ru: "2. Both … and, either … or, neither … nor" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["both A and B", "həm A, həm B / и A, и B", "Both my brother and my sister live abroad."],
            ["either A or B", "ya A, ya da B / либо A, либо B", "You can pay either by card or in cash."],
            ["neither A nor B", "nə A, nə də B / ни A, ни B", "Neither my wife nor I like horror films."],
            ["either (of them)", "hər hansı biri (ikidən) / любой из двух", "Either day is fine for me."],
            ["neither (of them)", "heç biri (ikidən) / ни один из двух", "Neither answer is correct."],
            ["not … either", "də … yox / тоже не", "I don't like it either."],
            ["So do I / Neither do I", "mən də / я тоже (не)", "I love tea. — So do I. I don't smoke. — Neither do I."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "\"Neither … nor\" özü inkardır, ona görə feil təsdiq formasında olur: \"Neither of them came\", \"Neither of them didn't come\" yox. Azərbaycan dilində \"nə ... nə də gəlmədi\" deyirik (iki inkar), ingilis dilində isə bu mümkün deyil. Rus dilində də «ни … ни … не пришёл» — eyni səhvin mənbəyi.",
            ru: "«Neither … nor» само является отрицанием, поэтому глагол в утвердительной форме: «Neither of them came», а не «Neither of them didn't come». По-русски мы говорим «ни один из них не пришёл» — с двойным отрицанием, а в английском так нельзя.",
          },
        },
        {
          kind: "formula",
          label: { az: "Neither … nor", ru: "Neither … nor" },
          parts: [
            { text: "Neither", role: "negation", note: { az: "Nə (inkar artıq buradadır).", ru: "Ни (отрицание уже здесь)." } },
            { text: "Ali", role: "subject", note: { az: "Birinci.", ru: "Первый." } },
            { text: "nor", role: "connector", note: { az: "nə də.", ru: "ни." } },
            { text: "Murad", role: "subject", note: { az: "İkinci; feil ona uyğunlaşır.", ru: "Второй; глагол согласуется с ним." } },
            { text: "was there", role: "verb", note: { az: "Feil təsdiqdə!", ru: "Глагол в утвердительной форме!" } },
          ],
          example: "Neither Ali nor Murad was there.",
        },
      ],
    },
    {
      id: "prefer",
      title: { az: "3. Prefer: üstün tutmaq", ru: "3. Prefer: предпочитать" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["prefer A to B (general)", "I prefer tea to coffee."],
            ["prefer -ing to -ing", "I prefer walking to driving."],
            ["prefer to + V1", "I prefer to work in the morning."],
            ["would prefer to + V1 (specific moment)", "I'd prefer to stay home tonight."],
            ["would prefer + noun", "Would you prefer tea or coffee?"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "\"Prefer A to B\" quruluşunda \"than\" deyil, \"to\" işlənir: \"I prefer cats to dogs\". \"Would prefer\" isə konkret vəziyyət üçün nəzakətli seçimdir: \"Would you prefer to sit inside or outside?\"",
            ru: "В «prefer A to B» используется «to», а не «than»: «I prefer cats to dogs». «Would prefer» — вежливый выбор в конкретной ситуации: «Would you prefer to sit inside or outside?»",
          },
        },
      ],
    },
    {
      id: "rather",
      title: { az: "4. Would rather: daha çox istərdim", ru: "4. Would rather: я бы лучше" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Would rather + V1 (than + V1)", ru: "Would rather + V1 (than + V1)" },
          parts: [
            { text: "I", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "'d rather", role: "modal", note: { az: "would rather — modal kimi: \"to\" yoxdur.", ru: "would rather — как модальный: без «to»." } },
            { text: "walk", role: "verb", note: { az: "Feilin sadə forması.", ru: "Начальная форма глагола." } },
            { text: "than take a taxi", role: "other", note: { az: "Müqayisə: than + V1.", ru: "Сравнение: than + V1." } },
          ],
          example: "I'd rather walk than take a taxi.",
        },
        {
          kind: "p",
          text: {
            az: "\"Would rather\" modal feil kimi davranır: ondan sonra \"to\" gəlmir. İnkar: \"I'd rather not\" (istəməzdim) — nəzakətlə imtina etməyin çox təbii yoludur. Başqasının hərəkəti üçün: \"I'd rather you didn't smoke here\" — burada siqaret çəkməməyinizi istərdim (Past Simple ilə!).",
            ru: "«Would rather» ведёт себя как модальный глагол: после него «to» не ставится. Отрицание: «I'd rather not» (я бы не хотел) — очень естественный способ вежливо отказаться. О действии другого человека: «I'd rather you didn't smoke here» — я бы предпочёл, чтобы вы здесь не курили (с Past Simple!).",
          },
        },
        {
          kind: "compare",
          items: [
            { en: "I'd prefer to stay. / I'd rather stay.", text: { az: "Məna eynidir. Prefer-dən sonra \"to\" var, rather-dən sonra yoxdur.", ru: "Смысл одинаковый. После prefer есть «to», после rather — нет." } },
          ],
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
            { en: "We've known each other since childhood.", az: "Bir-birimizi uşaqlıqdan tanıyırıq.", ru: "Мы знаем друг друга с детства." },
            { en: "The players congratulated one another.", az: "Oyunçular bir-birini təbrik etdilər.", ru: "Игроки поздравили друг друга." },
            { en: "Both options are good.", az: "Hər iki variant yaxşıdır.", ru: "Оба варианта хорошие." },
            { en: "We can either eat out or order food.", az: "Ya bayırda yeyə bilərik, ya da yemək sifariş edərik.", ru: "Мы можем либо поесть в ресторане, либо заказать еду." },
            { en: "Neither of my parents speaks English.", az: "Valideynlərimin heç biri ingiliscə danışmır.", ru: "Ни один из моих родителей не говорит по-английски." },
            { en: "I haven't seen it either.", az: "Mən də onu görməmişəm.", ru: "Я тоже этого не видел." },
            { en: "I'm hungry. — So am I.", az: "Acmışam. — Mən də.", ru: "Я голоден. — Я тоже." },
            { en: "I prefer summer to winter.", az: "Yayı qışdan üstün tuturam.", ru: "Я предпочитаю лето зиме." },
            { en: "Would you prefer to meet on Monday or Tuesday?", az: "Bazar ertəsi görüşməyi üstün tutursunuz, yoxsa çərşənbə axşamı?", ru: "Вам удобнее встретиться в понедельник или во вторник?" },
            { en: "I'd rather stay at home tonight.", az: "Bu axşam evdə qalmağı üstün tuturam.", ru: "Сегодня вечером я бы лучше остался дома." },
            { en: "Do you want to come? — I'd rather not, thanks.", az: "Gəlmək istəyirsən? — Yox, sağ ol, istəməzdim.", ru: "Пойдёшь? — Пожалуй, нет, спасибо." },
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
            { wrong: "Neither of them didn't come.", right: "Neither of them came.", why: { az: "Neither özü inkardır; ikinci inkar olmaz.", ru: "Neither уже отрицание; второго не нужно." } },
            { wrong: "I don't like it too.", right: "I don't like it either.", why: { az: "İnkarda \"too\" yox, \"either\".", ru: "В отрицании не «too», а «either»." } },
            { wrong: "I prefer tea than coffee.", right: "I prefer tea to coffee.", why: { az: "Prefer A TO B.", ru: "Prefer A TO B." } },
            { wrong: "I'd rather to stay.", right: "I'd rather stay.", why: { az: "Would rather-dən sonra \"to\" yoxdur.", ru: "После would rather нет «to»." } },
            { wrong: "They helped each others.", right: "They helped each other.", why: { az: "Each other dəyişmir.", ru: "Each other не меняется." } },
            { wrong: "Either you or me are wrong.", right: "Either you or I am wrong.", why: { az: "Feil ikinci hissəyə uyğunlaşır; mübtəda formasında I.", ru: "Глагол согласуется со второй частью; в роли подлежащего — I." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Each other / one another = bir-birini.", ru: "Each other / one another = друг друга." },
    { az: "Both … and, either … or, neither … nor (feil təsdiqdə).", ru: "Both … and, either … or, neither … nor (глагол утвердительный)." },
    { az: "Prefer A to B; would prefer to + V1.", ru: "Prefer A to B; would prefer to + V1." },
    { az: "Would rather + V1 (than + V1); I'd rather not.", ru: "Would rather + V1 (than + V1); I'd rather not." },
  ],
};
