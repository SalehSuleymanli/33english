import type { Teach } from "./types";

export const TEACH_27: Teach = {
  day: 27,
  summary: {
    az: "Bu dərsdə fikirləri qarşılaşdırmaq və dəqiqləşdirmək üçün bağlayıcıları öyrənirsiniz: although, even though, though, despite, in spite of, however, whether, not only … but also, according to, the thing is. Bu sözlər danışığınızı və yazınızı daha məntiqli və yetkin edir.",
    ru: "В этом уроке вы изучите связки для противопоставления и уточнения мыслей: although, even though, though, despite, in spite of, however, whether, not only … but also, according to, the thing is. Они делают вашу речь и письмо логичнее и взрослее.",
  },
  sections: [
    {
      id: "although",
      title: { az: "1. Although / even though + cümlə", ru: "1. Although / even though + предложение" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Although + mübtəda + feil, …", ru: "Although + подлежащее + глагол, …" },
          parts: [
            { text: "Although", role: "connector", note: { az: "Baxmayaraq ki / хотя.", ru: "Хотя / baxmayaraq ki." } },
            { text: "it was raining", role: "verb", note: { az: "Tam cümlə: mübtəda + feil.", ru: "Полное предложение: подлежащее + глагол." } },
            { text: "we went out", role: "verb", note: { az: "Gözlənilməz nəticə.", ru: "Неожиданный результат." } },
          ],
          example: "Although it was raining, we went out.",
        },
        {
          kind: "p",
          text: {
            az: "\"Although\" və \"even though\"-dan sonra tam cümlə (mübtəda + feil) gəlir. \"Even though\" daha güclüdür: \"Even though he's rich, he lives in a small flat.\" \"Though\" danışıq variantıdır və cümlənin sonunda da gələ bilər: \"It was expensive. I bought it, though.\" Diqqət: \"although\" ilə \"but\" eyni cümlədə işlənmir.",
            ru: "После «although» и «even though» идёт полное предложение (подлежащее + глагол). «Even though» звучит сильнее: «Even though he's rich, he lives in a small flat.» «Though» — разговорный вариант, может стоять и в конце: «It was expensive. I bought it, though.» Внимание: «although» и «but» в одном предложении не используются (в отличие от русского «хотя…, но…»).",
          },
        },
      ],
    },
    {
      id: "despite",
      title: { az: "2. Despite / in spite of + isim və ya -ing", ru: "2. Despite / in spite of + существительное или -ing" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Despite\" və \"in spite of\" eyni mənanı verir (\"-a baxmayaraq\"), amma onlardan sonra cümlə deyil, isim və ya -ing forması gəlir: \"Despite the rain…\", \"In spite of being tired…\". Cümlə işlətmək istəsəniz, \"despite the fact that\" deyin. \"Despite of\" səhvdir.",
            ru: "«Despite» и «in spite of» значат одно и то же («несмотря на»), но после них идёт не предложение, а существительное или форма -ing: «Despite the rain…», «In spite of being tired…». Чтобы поставить предложение, говорите «despite the fact that». «Despite of» — ошибка.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Bağlayıcı", ru: "Связка" }, { az: "Sonra nə gəlir", ru: "Что идёт после" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["although / even though", "subject + verb", "Although she was tired, she finished the work."],
            ["despite / in spite of", "noun or -ing", "Despite her tiredness / Despite being tired, she finished."],
            ["despite the fact that", "subject + verb", "Despite the fact that she was tired, she finished."],
            ["however (new sentence)", ", + sentence", "She was tired. However, she finished the work."],
            ["but", "sentence (middle)", "She was tired, but she finished the work."],
          ],
        },
      ],
    },
    {
      id: "whether",
      title: { az: "3. Whether: …-mı, yoxsa …", ru: "3. Whether: ли … или" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Whether\" iki variant arasında seçimi və ya qeyri-müəyyənliyi bildirir: \"I don't know whether he's coming\" — gəlib-gəlməyəcəyini bilmirəm. Rus dilindəki «ли» kimidir. Çox vaxt \"or not\" ilə işlənir: \"whether or not you agree\". \"Whether … or …\" = \"istər … istərsə də\": \"Whether you like it or not, you have to go.\"",
            ru: "«Whether» выражает выбор между двумя вариантами или неопределённость: «I don't know whether he's coming» — не знаю, придёт ли он. Похоже на русское «ли». Часто с «or not»: «whether or not you agree». «Whether … or …» = «нравится или нет», «будь то … или …»: «Whether you like it or not, you have to go.»",
          },
        },
      ],
    },
    {
      id: "others",
      title: { az: "4. Not only … but also, according to, the thing is", ru: "4. Not only … but also, according to, the thing is" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "İfadə", ru: "Выражение" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["not only … but also", "təkcə … deyil, həm də / не только …, но и", "She speaks not only English but also French."],
            ["according to", "… -a görə (mənbə) / согласно, по словам", "According to the forecast, it will snow."],
            ["the thing is (that)", "məsələ burasındadır ki / дело в том, что", "I'd love to come. The thing is, I'm working."],
            ["on the other hand", "digər tərəfdən / с другой стороны", "It's cheap. On the other hand, it's far."],
            ["even if", "hətta … olsa belə / даже если", "I'll go even if it rains."],
            ["unless", "əgər … olmasa / если не", "I won't go unless you come."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "\"According to\" yalnız başqasının fikri və ya mənbə üçündür: \"according to the news\", \"according to my doctor\". Öz fikriniz üçün \"in my opinion\" və ya \"I think\" deyin; \"according to me\" qeyri-təbiidir.",
            ru: "«According to» — только для чужого мнения или источника: «according to the news», «according to my doctor». Для своего мнения — «in my opinion» или «I think»; «according to me» звучит неестественно.",
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
            { en: "Although the hotel was cheap, it was very clean.", az: "Otel ucuz olsa da, çox təmiz idi.", ru: "Хотя отель был дешёвым, он был очень чистым." },
            { en: "Even though I was tired, I couldn't sleep.", az: "Yorğun olsam da, yata bilmədim.", ru: "Хотя я устал, я не мог уснуть." },
            { en: "Despite the traffic, we arrived on time.", az: "Tıxaca baxmayaraq, vaxtında çatdıq.", ru: "Несмотря на пробки, мы приехали вовремя." },
            { en: "In spite of being ill, she went to work.", az: "Xəstə olmasına baxmayaraq, işə getdi.", ru: "Несмотря на болезнь, она пошла на работу." },
            { en: "The plan is good. However, it's too expensive.", az: "Plan yaxşıdır. Lakin çox bahadır.", ru: "План хороший. Однако он слишком дорогой." },
            { en: "I'm not sure whether I should accept the offer.", az: "Təklifi qəbul edib-etməməyimdən əmin deyiləm.", ru: "Я не уверен, стоит ли принимать предложение." },
            { en: "Whether we win or lose, we'll enjoy the game.", az: "Qazansaq da, uduzsaq da, oyundan zövq alacağıq.", ru: "Выиграем мы или проиграем, мы получим удовольствие от игры." },
            { en: "He is not only smart but also very kind.", az: "O, təkcə ağıllı deyil, həm də çox mehribandır.", ru: "Он не только умный, но и очень добрый." },
            { en: "According to the report, prices will rise.", az: "Hesabata görə, qiymətlər qalxacaq.", ru: "Согласно отчёту, цены вырастут." },
            { en: "The thing is, I don't have enough time.", az: "Məsələ burasındadır ki, kifayət qədər vaxtım yoxdur.", ru: "Дело в том, что у меня не хватает времени." },
            { en: "I'll help you even if I'm busy.", az: "Məşğul olsam belə, sənə kömək edəcəyəm.", ru: "Я помогу тебе, даже если буду занят." },
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
            { wrong: "Although it was late, but we continued.", right: "Although it was late, we continued.", why: { az: "Although və but birlikdə işlənmir.", ru: "Although и but вместе не используются (в отличие от «хотя…, но…»)." } },
            { wrong: "Despite it was raining, we went out.", right: "Although it was raining, we went out. / Despite the rain, …", why: { az: "Despite-dən sonra cümlə gəlmir.", ru: "После despite не ставится предложение." } },
            { wrong: "Despite of the rain…", right: "Despite the rain… / In spite of the rain…", why: { az: "Despite \"of\" almır.", ru: "Despite без «of»." } },
            { wrong: "According to me, it's wrong.", right: "In my opinion, it's wrong.", why: { az: "According to — başqasının fikri üçün.", ru: "According to — для чужого мнения." } },
            { wrong: "I don't know if or not he'll come.", right: "I don't know whether or not he'll come.", why: { az: "\"Or not\" birbaşa \"whether\" ilə gəlir.", ru: "«Or not» сразу после «whether»." } },
            { wrong: "She not only speaks English but French.", right: "She speaks not only English but also French.", why: { az: "Not only … but ALSO; hissələr paralel olmalıdır.", ru: "Not only … but ALSO; части должны быть параллельны." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Although / even though + cümlə; despite / in spite of + isim / -ing.", ru: "Although / even though + предложение; despite / in spite of + существительное / -ing." },
    { az: "Although ilə but birlikdə işlənmir. However — yeni cümlənin əvvəlində.", ru: "Although и but не вместе. However — в начале нового предложения." },
    { az: "Whether = …-mı (ли); whether … or … = istər … istərsə də.", ru: "Whether = ли; whether … or … = будь то … или …." },
    { az: "Not only … but also; according to (başqasının fikri); the thing is …", ru: "Not only … but also; according to (чужое мнение); the thing is …" },
  ],
};
