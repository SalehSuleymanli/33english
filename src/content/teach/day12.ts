import type { Teach } from "./types";

export const TEACH_12: Teach = {
  day: 12,
  summary: {
    az: "Bu dərsdə müqayisə etməyi öyrənirsiniz: müqayisə dərəcəsi (bigger, more expensive than) və üstünlük dərəcəsi (the biggest, the most expensive). Qiymət, məsafə, keyfiyyət, insanlar — gündəlik həyatda daim nəyisə müqayisə edirik.",
    ru: "В этом уроке вы научитесь сравнивать: сравнительная степень (bigger, more expensive than) и превосходная (the biggest, the most expensive). Цены, расстояния, качество, люди — в жизни мы постоянно что-то сравниваем.",
  },
  sections: [
    {
      id: "formula",
      title: { az: "1. İki dərəcə: müqayisə və üstünlük", ru: "1. Две степени: сравнительная и превосходная" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Müqayisə dərəcəsi", ru: "Сравнительная степень" },
          parts: [
            { text: "My flat", role: "subject", note: { az: "Birinci müqayisə olunan.", ru: "Первый сравниваемый." } },
            { text: "is", role: "be", note: { az: "Feil (adətən be).", ru: "Глагол (обычно be)." } },
            { text: "bigger / more comfortable", role: "complement", note: { az: "Qısa sifət + -er, uzun sifət: more + sifət.", ru: "Короткое прилагательное + -er, длинное: more + прилагательное." } },
            { text: "than yours", role: "other", note: { az: "than + ikinci müqayisə olunan.", ru: "than + второй сравниваемый." } },
          ],
          example: "My flat is bigger than yours.",
        },
        {
          kind: "formula",
          label: { az: "Üstünlük dərəcəsi", ru: "Превосходная степень" },
          parts: [
            { text: "This", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "is", role: "be", note: { az: "Feil.", ru: "Глагол." } },
            { text: "the cheapest / the most popular", role: "complement", note: { az: "the + sifət-est və ya the most + sifət.", ru: "the + прилагательное-est или the most + прилагательное." } },
            { text: "in the city", role: "place", note: { az: "Qrup: in + yer, of + qrup.", ru: "Группа: in + место, of + группа." } },
          ],
          example: "This is the most popular café in the city.",
        },
      ],
    },
    {
      id: "rules",
      title: { az: "2. Düzəlmə qaydaları", ru: "2. Правила образования" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Sifət", ru: "Прилагательное" }, { az: "Müqayisə", ru: "Сравнительная" }, { az: "Üstünlük", ru: "Превосходная" }],
          rows: [
            ["one syllable: cheap, tall", "cheaper, taller", "the cheapest, the tallest"],
            ["ends in -e: nice, large", "nicer, larger", "the nicest, the largest"],
            ["short + consonant: big, hot", "bigger, hotter", "the biggest, the hottest"],
            ["ends in -y: easy, happy", "easier, happier", "the easiest, the happiest"],
            ["2+ syllables: modern, expensive", "more modern, more expensive", "the most modern, the most expensive"],
            ["irregular: good", "better", "the best"],
            ["irregular: bad", "worse", "the worst"],
            ["irregular: far", "farther / further", "the farthest / the furthest"],
            ["much / many", "more", "the most"],
            ["little", "less", "the least"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Qısa sifətlərə -er/-est, uzun sifətlərə more/most. -y ilə bitən iki hecalı sifətlər (easy, busy, funny) qısa kimi davranır: easier, busiest. Ən vacib istisnalar: good → better → the best, bad → worse → the worst. Bunları mütləq əzbərləyin.",
            ru: "Короткие прилагательные — с -er/-est, длинные — с more/most. Двусложные на -y (easy, busy, funny) ведут себя как короткие: easier, busiest. Важнейшие исключения: good → better → the best, bad → worse → the worst. Их нужно выучить обязательно.",
          },
        },
      ],
    },
    {
      id: "modifiers",
      title: { az: "3. Fərqin ölçüsü: much, a bit, far", ru: "3. Размер разницы: much, a bit, far" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Söz", ru: "Слово" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["much / a lot / far", "çox daha / намного", "The train is much faster than the bus."],
            ["a bit / a little / slightly", "bir az / немного", "This one is a bit cheaper."],
            ["even", "hətta daha / ещё (более)", "Today is even hotter than yesterday."],
            ["the … -er, the … -er", "nə qədər …, bir o qədər … / чем …, тем …", "The sooner, the better."],
            ["-er and -er / more and more", "getdikcə / всё более", "It's getting colder and colder."],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "\"Very\" müqayisə dərəcəsi ilə işlənmir: \"very bigger\" yox, \"much bigger\". Bu, Azərbaycan və rus dilində \"çox daha böyük\", «гораздо больше» kimi deyildiyi üçün tipik səhvdir.",
            ru: "«Very» со сравнительной степенью не используется: не «very bigger», а «much bigger». Типичная ошибка, потому что по-русски мы говорим «гораздо/намного больше».",
          },
        },
      ],
    },
    {
      id: "superlative-use",
      title: { az: "4. Üstünlük dərəcəsi və Present Perfect", ru: "4. Превосходная степень и Present Perfect" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Üstünlük dərəcəsi çox vaxt Present Perfect və \"ever\" ilə birləşir: \"This is the best film I've ever seen\" — indiyə qədər gördüyüm ən yaxşı filmdir. \"She's the kindest person I've ever met.\" Bu, təcrübə haqqında danışmağın çox təbii yoludur.",
            ru: "Превосходная степень часто сочетается с Present Perfect и «ever»: «This is the best film I've ever seen» — это лучший фильм, который я когда-либо видел. «She's the kindest person I've ever met.» Это очень естественный способ говорить об опыте.",
          },
        },
        {
          kind: "p",
          text: {
            az: "Üstünlük dərəcəsindən sonra yer üçün \"in\" (the biggest city in the world), qrup üçün \"of\" (the best of all, the oldest of my friends) işlənir. \"The biggest of the world\" səhvdir.",
            ru: "После превосходной степени для места используется «in» (the biggest city in the world), для группы — «of» (the best of all, the oldest of my friends). «The biggest of the world» — ошибка.",
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
            { en: "Baku is bigger than Ganja.", az: "Bakı Gəncədən böyükdür.", ru: "Баку больше Гянджи." },
            { en: "This phone is more expensive, but it's better.", az: "Bu telefon daha bahadır, amma daha yaxşıdır.", ru: "Этот телефон дороже, но лучше." },
            { en: "The weather is worse than yesterday.", az: "Hava dünənkindən pisdir.", ru: "Погода хуже, чем вчера." },
            { en: "My brother is two years older than me.", az: "Qardaşım məndən iki yaş böyükdür.", ru: "Брат на два года старше меня." },
            { en: "Is it much further to the hotel?", az: "Otelə hələ çox yol var?", ru: "До отеля ещё далеко?" },
            { en: "Can you speak a bit louder?", az: "Bir az ucadan danışa bilərsiniz?", ru: "Можете говорить чуть громче?" },
            { en: "Mount Everest is the highest mountain in the world.", az: "Everest dünyanın ən hündür dağıdır.", ru: "Эверест — самая высокая гора в мире." },
            { en: "That was the worst day of my life.", az: "O, həyatımın ən pis günü idi.", ru: "Это был худший день в моей жизни." },
            { en: "Which is the cheapest way to get there?", az: "Ora getməyin ən ucuz yolu hansıdır?", ru: "Какой самый дешёвый способ туда добраться?" },
            { en: "This is the most delicious dolma I've ever eaten.", az: "Bu, indiyə qədər yediyim ən dadlı dolmadır.", ru: "Это самая вкусная долма, которую я когда-либо ел." },
            { en: "The more you practise, the easier it gets.", az: "Nə qədər çox məşq etsən, bir o qədər asanlaşır.", ru: "Чем больше практикуешься, тем легче становится." },
            { en: "Life is getting more and more expensive.", az: "Həyat getdikcə bahalaşır.", ru: "Жизнь становится всё дороже." },
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
            { wrong: "She is more tall than me.", right: "She is taller than me.", why: { az: "Qısa sifət -er alır.", ru: "Короткое прилагательное получает -er." } },
            { wrong: "This is more better.", right: "This is better. / This is much better.", why: { az: "Better artıq müqayisə formasıdır; \"more\" lazım deyil.", ru: "Better — уже сравнительная форма; «more» не нужно." } },
            { wrong: "He is very older than me.", right: "He is much older than me.", why: { az: "Müqayisə dərəcəsi ilə much / a lot / far.", ru: "Со сравнительной степенью — much / a lot / far." } },
            { wrong: "Baku is bigger that Ganja.", right: "Baku is bigger than Ganja.", why: { az: "Müqayisədə \"than\", \"that\" yox.", ru: "В сравнении — «than», а не «that»." } },
            { wrong: "It's the most cheap hotel.", right: "It's the cheapest hotel.", why: { az: "Qısa sifət: the + -est.", ru: "Короткое прилагательное: the + -est." } },
            { wrong: "the best restaurant of the city", right: "the best restaurant in the city", why: { az: "Yer üçün \"in\".", ru: "Для места — «in»." } },
            { wrong: "This is best day.", right: "This is the best day.", why: { az: "Üstünlük dərəcəsində \"the\" mütləqdir.", ru: "В превосходной степени «the» обязателен." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Qısa sifət: -er than / the -est. Uzun sifət: more … than / the most …", ru: "Короткое: -er than / the -est. Длинное: more … than / the most …" },
    { az: "İstisnalar: good–better–the best, bad–worse–the worst, far–further–the furthest.", ru: "Исключения: good–better–the best, bad–worse–the worst, far–further–the furthest." },
    { az: "Fərqin ölçüsü: much / a bit + müqayisə; \"very\" yox.", ru: "Размер разницы: much / a bit + сравнительная; не «very»." },
    { az: "the best … I've ever …; yer üçün in, qrup üçün of.", ru: "the best … I've ever …; для места in, для группы of." },
  ],
};
