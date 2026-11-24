import type { Teach } from "./types";

export const TEACH_17: Teach = {
  day: 17,
  summary: {
    az: "Bu dərsdə fikir və məsləhət bildirmək üçün çox işlək strukturları öyrənirsiniz: It is + sifət + to + feil (It's important to listen), enough və too, know how / what / where to, və whatever, whenever kimi sözlər.",
    ru: "В этом уроке вы изучите очень полезные структуры для выражения мнения и совета: It is + прилагательное + to + глагол (It's important to listen), enough и too, know how / what / where to, а также слова вроде whatever, whenever.",
  },
  sections: [
    {
      id: "it-adj",
      title: { az: "1. It is + sifət + to + feil", ru: "1. It is + прилагательное + to + глагол" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Azərbaycan dilində \"Dinləmək vacibdir\" deyirik, rus dilində «Важно слушать». İngilis dilində \"To listen is important\" qrammatik cəhətdən mümkündür, amma çox ağır səslənir. Təbii yol: cümləni \"It\" ilə başlamaq, hərəkəti isə sona keçirmək: \"It's important to listen.\" Burada \"it\" heç nə demək deyil — sadəcə mübtəda yerini tutur, eynilə \"It's cold\" cümləsindəki kimi.",
            ru: "По-русски мы говорим «Важно слушать». В английском «To listen is important» грамматически возможно, но звучит тяжело. Естественный способ — начать с «It», а действие перенести в конец: «It's important to listen.» Здесь «it» ничего не значит — он просто занимает место подлежащего, как в «It's cold».",
          },
        },
        {
          kind: "formula",
          label: { az: "It + be + sifət + to + feil", ru: "It + be + прилагательное + to + глагол" },
          parts: [
            { text: "It", role: "subject", note: { az: "Formal mübtəda.", ru: "Формальное подлежащее." } },
            { text: "is", role: "be", note: { az: "Zaman: is / was / will be.", ru: "Время: is / was / will be." } },
            { text: "easy", role: "complement", note: { az: "Fikir bildirən sifət.", ru: "Оценочное прилагательное." } },
            { text: "(for me)", role: "other", note: { az: "Kim üçün? (istəyə bağlı)", ru: "Для кого? (необязательно)" } },
            { text: "to find", role: "verb", note: { az: "to + feil: nə etmək?", ru: "to + глагол: что делать?" } },
            { text: "a job here", role: "object", note: { az: "Tamamlıq.", ru: "Дополнение." } },
          ],
          example: "It's easy for me to find a job here.",
        },
        {
          kind: "signals",
          words: ["important", "necessary", "easy", "difficult", "hard", "possible", "impossible", "nice", "good", "dangerous", "expensive", "interesting", "useful", "better"],
          text: {
            az: "Bu sifətlər bu modellə ən çox işlənir. Kimin üçün olduğunu demək istəsəniz \"for + şəxs\" əlavə edin: \"It's hard for my parents to understand.\"",
            ru: "Эти прилагательные чаще всего используются в этой модели. Чтобы сказать, для кого, добавьте «for + человек»: «It's hard for my parents to understand.»",
          },
        },
      ],
    },
    {
      id: "too-enough",
      title: { az: "2. Too və enough", ru: "2. Too и enough" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["too + adjective (+ to)", "həddindən çox / слишком (problem)", "It's too hot to work. The box is too heavy for me to lift."],
            ["adjective + enough (+ to)", "kifayət qədər / достаточно", "She's old enough to drive."],
            ["not + adjective + enough", "kifayət qədər deyil / недостаточно", "The room isn't big enough for six people."],
            ["enough + noun", "kifayət qədər (isim) / достаточно (чего-то)", "We don't have enough time. Is there enough milk?"],
            ["too much / too many + noun", "həddindən çox / слишком много", "There's too much sugar. There are too many cars."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Diqqət yerə: \"enough\" sifətdən SONRA (old enough, big enough), amma isimdən ƏVVƏL gəlir (enough money, enough time). \"Too\" həmişə mənfi mənadadır: nəsə problem yaradır. \"Very\" isə sadəcə \"çox\" deməkdir: \"It's very hot\" (çox istidir) ilə \"It's too hot to sleep\" (yatmaq üçün həddindən artıq istidir) fərqlidir.",
            ru: "Обратите внимание на место: «enough» ставится ПОСЛЕ прилагательного (old enough, big enough), но ПЕРЕД существительным (enough money, enough time). «Too» всегда с отрицательным оттенком: что-то мешает. «Very» просто «очень»: «It's very hot» (очень жарко) и «It's too hot to sleep» (слишком жарко, чтобы спать) — разные вещи.",
          },
        },
      ],
    },
    {
      id: "know-how",
      title: { az: "3. Know how / what / where + to", ru: "3. Know how / what / where + to" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Sual sözü + to + feil qısa və təbii quruluşdur: \"I don't know what to say\" (nə deyəcəyimi bilmirəm). \"Can you show me how to use it?\" (Bundan necə istifadə etməyi göstərə bilərsən?). Bu, uzun budaq cümlələri əvəz edir.",
            ru: "Вопросительное слово + to + глагол — короткая и естественная структура: «I don't know what to say» (не знаю, что сказать). «Can you show me how to use it?» (Покажешь, как этим пользоваться?) Она заменяет длинные придаточные.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["know how to", "Do you know how to cook plov?"],
            ["what to", "I don't know what to wear."],
            ["where to", "Tell me where to put this."],
            ["when to", "She knows when to stop."],
            ["which … to", "I can't decide which phone to buy."],
            ["whether to", "I'm not sure whether to go or not."],
          ],
        },
      ],
    },
    {
      id: "ever",
      title: { az: "4. Whatever, whoever, wherever, whenever", ru: "4. Whatever, whoever, wherever, whenever" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Söz", ru: "Слово" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["whatever", "nə olursa olsun, istənilən şey / что угодно, всё, что", "Do whatever you want."],
            ["whoever", "kim olursa olsun / кто бы ни", "Whoever called, I'm not here."],
            ["wherever", "harada olursa olsun / где бы ни, куда угодно", "Sit wherever you like."],
            ["whenever", "nə vaxt olursa / когда угодно, всякий раз когда", "Call me whenever you need help."],
            ["however", "necə olursa olsun / как бы ни", "However hard it is, don't give up."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Danışıqda tək \"Whatever.\" cavabı \"nə olursa olsun, fərqi yoxdur\" deməkdir və bəzən kobud, laqeyd səslənir. Ehtiyatla işlədin.",
            ru: "В разговоре одиночное «Whatever.» значит «да всё равно» и иногда звучит грубо и пренебрежительно. Используйте осторожно.",
          },
        },
      ],
    },
    {
      id: "compare",
      title: { az: "5. Müqayisə", ru: "5. Сравнение" },
      blocks: [
        {
          kind: "compare",
          items: [
            { en: "It's important to sleep. / Sleep is important.", text: { az: "Hər ikisi düzgündür. Birincidə hərəkət (yatmaq), ikincidə isim (yuxu) vacibdir.", ru: "Оба верны. В первом важно действие (спать), во втором — существительное (сон)." } },
            { en: "There is enough time. / It's early enough.", text: { az: "Enough isimdən əvvəl, sifətdən sonra.", ru: "Enough — перед существительным, после прилагательного." } },
            { en: "I don't know what to do. / I don't know what I should do.", text: { az: "Məna eynidir; \"what to do\" qısa və daha təbiidir.", ru: "Смысл одинаковый; «what to do» короче и естественнее." } },
          ],
        },
      ],
    },
    {
      id: "examples",
      title: { az: "6. Nümunələr və tərcümələr", ru: "6. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "It's important to drink enough water.", az: "Kifayət qədər su içmək vacibdir.", ru: "Важно пить достаточно воды." },
            { en: "It was difficult to find a parking space.", az: "Park yeri tapmaq çətin idi.", ru: "Было трудно найти место для парковки." },
            { en: "It's nice to meet you.", az: "Tanış olmağımıza şadam.", ru: "Приятно познакомиться." },
            { en: "Is it possible to change the date?", az: "Tarixi dəyişmək mümkündür?", ru: "Можно ли изменить дату?" },
            { en: "The coffee is too hot to drink.", az: "Qəhvə içmək üçün çox istidir.", ru: "Кофе слишком горячий, чтобы пить." },
            { en: "He isn't tall enough to play basketball.", az: "Basketbol oynamaq üçün kifayət qədər uca deyil.", ru: "Он недостаточно высокий, чтобы играть в баскетбол." },
            { en: "We don't have enough chairs.", az: "Kifayət qədər stulumuz yoxdur.", ru: "У нас не хватает стульев." },
            { en: "There are too many people here.", az: "Burada həddindən artıq çox adam var.", ru: "Здесь слишком много людей." },
            { en: "Could you tell me how to get to the station?", az: "Stansiyaya necə gedəcəyimi deyə bilərsiniz?", ru: "Не подскажете, как пройти к вокзалу?" },
            { en: "I didn't know what to say.", az: "Nə deyəcəyimi bilmədim.", ru: "Я не знал, что сказать." },
            { en: "You can come whenever you want.", az: "Nə vaxt istəsən gələ bilərsən.", ru: "Можешь приходить, когда захочешь." },
            { en: "Whatever happens, I'll support you.", az: "Nə olursa olsun, sənə dəstək olacağam.", ru: "Что бы ни случилось, я тебя поддержу." },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "7. Tipik səhvlər", ru: "7. Типичные ошибки" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "Is important to listen.", right: "It's important to listen.", why: { az: "Mübtəda \"it\" mütləqdir.", ru: "Подлежащее «it» обязательно." } },
            { wrong: "It's important listen.", right: "It's important to listen.", why: { az: "Sifətdən sonra to + feil.", ru: "После прилагательного — to + глагол." } },
            { wrong: "She is enough old to drive.", right: "She is old enough to drive.", why: { az: "Enough sifətdən sonra gəlir.", ru: "Enough ставится после прилагательного." } },
            { wrong: "I don't have money enough.", right: "I don't have enough money.", why: { az: "Enough isimdən əvvəl gəlir.", ru: "Enough ставится перед существительным." } },
            { wrong: "This bag is too much heavy.", right: "This bag is too heavy.", why: { az: "Sifətlə \"too\", isimlə \"too much/many\".", ru: "С прилагательным — «too», с существительным — «too much/many»." } },
            { wrong: "I don't know what should I do.", right: "I don't know what to do. / … what I should do.", why: { az: "Sual sözündən sonra düz söz sırası və ya \"to + feil\".", ru: "После вопросительного слова — прямой порядок или «to + глагол»." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "It's + sifət + (for someone) + to + feil: It's easy to learn.", ru: "It's + прилагательное + (for someone) + to + глагол: It's easy to learn." },
    { az: "Too + sifət = həddindən çox (problem). Sifət + enough, enough + isim.", ru: "Too + прилагательное = слишком (проблема). Прилагательное + enough, enough + существительное." },
    { az: "Sual sözü + to: how to, what to, where to.", ru: "Вопросительное слово + to: how to, what to, where to." },
    { az: "Whatever, whenever, wherever = nə / nə vaxt / harada olursa olsun.", ru: "Whatever, whenever, wherever = что / когда / где угодно." },
  ],
};
