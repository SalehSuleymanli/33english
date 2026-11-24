import type { Test } from "./types";

const howTo = { en: "Read the text, then answer the questions.", az: "Mətni oxuyun, sonra suallara cavab verin.", ru: "Прочитайте текст и ответьте на вопросы." };

export const READING_BEGINNER: Test[] = [
  {
    id: "rd-b1-my-street",
    kind: "reading",
    level: "beginner",
    title: { en: "My street", az: "Mənim küçəm", ru: "Моя улица" },
    description: { en: "A short description of a street, a family and a morning routine.", az: "Bir küçənin, ailənin və səhər rejiminin qısa təsviri.", ru: "Короткое описание улицы, семьи и утреннего распорядка." },
    minutes: 6,
    timed: false,
    passage: {
      title: "My street",
      paragraphs: [
        "My name is Nigar. I live on a quiet street in Ganja. There are twelve houses on my street, and there is a small shop on the corner. The shop is open every day from eight in the morning to ten at night.",
        "I have a brother and a sister. My brother is a student, and my sister is a nurse. We have a cat. Her name is Mia, and she sleeps all day.",
        "Every morning I get up at seven. I have tea and bread with cheese. Then I walk to work. My office isn't far — it takes ten minutes. I like my street because the people are friendly and there are a lot of trees.",
      ],
    },
    reading: {
      topic: { en: "Everyday life", az: "Gündəlik həyat", ru: "Повседневная жизнь" },
      translation: {
        az: [
          "Mənim adım Nigardır. Gəncədə sakit bir küçədə yaşayıram. Küçəmizdə on iki ev var, tində isə kiçik bir mağaza var. Mağaza hər gün səhər səkkizdən gecə ona qədər açıqdır.",
          "Bir qardaşım və bir bacım var. Qardaşım tələbədir, bacım isə tibb bacısıdır. Bir pişiyimiz var. Onun adı Miadır və bütün günü yatır.",
          "Hər səhər saat yeddidə oyanıram. Çay içirəm, pendirlə çörək yeyirəm. Sonra işə piyada gedirəm. Ofisim uzaq deyil — on dəqiqə çəkir. Küçəmizi sevirəm, çünki insanlar mehribandır və çoxlu ağac var.",
        ],
        ru: [
          "Меня зовут Нигяр. Я живу на тихой улице в Гяндже. На моей улице двенадцать домов, а на углу есть маленький магазин. Магазин открыт каждый день с восьми утра до десяти вечера.",
          "У меня есть брат и сестра. Мой брат — студент, а сестра — медсестра. У нас есть кошка. Её зовут Миа, и она спит весь день.",
          "Каждое утро я встаю в семь. Я пью чай и ем хлеб с сыром. Потом иду на работу пешком. Мой офис недалеко — дорога занимает десять минут. Я люблю свою улицу, потому что люди здесь дружелюбные и много деревьев.",
        ],
      },
      vocab: [
        { en: "quiet", az: "sakit", ru: "тихий" },
        { en: "corner", az: "tin", ru: "угол" },
        { en: "nurse", az: "tibb bacısı", ru: "медсестра" },
        { en: "get up", az: "oyanmaq, durmaq", ru: "вставать" },
        { en: "far", az: "uzaq", ru: "далеко" },
        { en: "it takes ten minutes", az: "on dəqiqə çəkir", ru: "это занимает десять минут" },
        { en: "friendly", az: "mehriban", ru: "дружелюбный" },
      ],
      grammar: [
        { en: "There are twelve houses … there is a small shop", note: { az: "1-ci çərçivə: cəm → there are, tək → there is.", ru: "Рамка 1: множественное → there are, единственное → there is." } },
        { en: "My brother is a student", note: { az: "2-ci çərçivə: be + peşə (a/an ilə).", ru: "Рамка 2: be + профессия (с a/an)." } },
        { en: "I have a brother … We have a cat", note: { az: "5-ci çərçivə: sahiblik.", ru: "Рамка 5: обладание." } },
        { en: "Every morning I get up at seven … she sleeps all day", note: { az: "3-cü çərçivə, Present Simple: vərdişlər; she sleeps (-s).", ru: "Рамка 3, Present Simple: привычки; she sleeps (-s)." } },
      ],
    },
    sections: [
      {
        instructions: howTo,
        questions: [
          { id: "q1", type: "choice", prompt: "How many houses are there on Nigar's street?", options: ["Ten", "Twelve", "Eight", "Seven"], answer: 1, why: { az: "\"There are twelve houses on my street\".", ru: "«There are twelve houses on my street»." } },
          { id: "q2", type: "choice", prompt: "What is Nigar's sister's job?", options: ["Student", "Teacher", "Nurse", "Doctor"], answer: 2, why: { az: "\"my sister is a nurse\".", ru: "«my sister is a nurse»." } },
          { id: "q3", type: "tfng", prompt: "The shop is closed on Sundays.", answer: "F", why: { az: "Mağaza \"every day\" — hər gün açıqdır.", ru: "Магазин открыт «every day» — каждый день." } },
          { id: "q4", type: "tfng", prompt: "Nigar drives to work.", answer: "F", why: { az: "\"Then I walk to work\" — piyada gedir.", ru: "«Then I walk to work» — ходит пешком." } },
          { id: "q5", type: "tfng", prompt: "Nigar's brother studies at a university in Baku.", answer: "NG", why: { az: "Onun tələbə olduğu deyilir, amma harada oxuduğu deyilmir.", ru: "Сказано, что он студент, но не сказано, где он учится." } },
          { id: "q6", type: "short", prompt: "What is the cat's name? (one word)", accept: ["Mia"], maxWords: 1, why: { az: "\"Her name is Mia\".", ru: "«Her name is Mia»." } },
          { id: "q7", type: "short", prompt: "How long does it take Nigar to walk to work? (max 2 words)", accept: ["ten minutes", "10 minutes"], maxWords: 2, why: { az: "\"it takes ten minutes\".", ru: "«it takes ten minutes»." } },
        ],
      },
    ],
  },
  {
    id: "rd-b2-weekend-market",
    kind: "reading",
    level: "beginner",
    title: { en: "A trip to the market", az: "Bazara səfər", ru: "Поход на рынок" },
    description: { en: "A Saturday at a busy food market, with prices and plans.", az: "Qələbəlik ərzaq bazarında bir şənbə günü: qiymətlər və planlar.", ru: "Суббота на оживлённом продуктовом рынке: цены и планы." },
    minutes: 6,
    timed: false,
    passage: {
      title: "A trip to the market",
      paragraphs: [
        "Last Saturday, Elvin and his mother went to the big market in the city centre. There were a lot of people there because the weather was sunny and warm.",
        "They bought tomatoes, cucumbers, apples and fresh herbs. The tomatoes were very cheap — only two manats a kilo. Elvin wanted some cherries, but they were expensive, so they didn't buy them.",
        "After the market, they had lunch at a small café. Elvin ate a plate of qutab, and his mother had soup. Next Saturday they are going to visit his grandmother in the village, and they will take her some fruit from the market.",
      ],
    },
    reading: {
      topic: { en: "Food and shopping", az: "Yemək və alış-veriş", ru: "Еда и покупки" },
      translation: {
        az: [
          "Keçən şənbə Elvin anası ilə şəhər mərkəzindəki böyük bazara getdi. Orada çox adam var idi, çünki hava günəşli və isti idi.",
          "Onlar pomidor, xiyar, alma və təzə göyərti aldılar. Pomidor çox ucuz idi — kilosu cəmi iki manat. Elvin albalı istəyirdi, amma baha idi, ona görə almadılar.",
          "Bazardan sonra kiçik bir kafedə nahar etdilər. Elvin bir boşqab qutab yedi, anası isə şorba içdi. Gələn şənbə onlar kənddə nənəsinə baş çəkəcəklər və ona bazardan meyvə aparacaqlar.",
        ],
        ru: [
          "В прошлую субботу Эльвин с мамой ходили на большой рынок в центре города. Там было много людей, потому что погода была солнечной и тёплой.",
          "Они купили помидоры, огурцы, яблоки и свежую зелень. Помидоры были очень дешёвыми — всего два маната за килограмм. Эльвин хотел черешни, но она была дорогой, поэтому её не купили.",
          "После рынка они пообедали в маленьком кафе. Эльвин съел тарелку кутабов, а мама — суп. В следующую субботу они собираются навестить бабушку в деревне и привезут ей фрукты с рынка.",
        ],
      },
      vocab: [
        { en: "market", az: "bazar", ru: "рынок" },
        { en: "fresh herbs", az: "təzə göyərti", ru: "свежая зелень" },
        { en: "cheap", az: "ucuz", ru: "дешёвый" },
        { en: "expensive", az: "baha", ru: "дорогой" },
        { en: "a kilo", az: "bir kilo", ru: "килограмм" },
        { en: "village", az: "kənd", ru: "деревня" },
      ],
      grammar: [
        { en: "There were a lot of people there", note: { az: "1-ci çərçivə keçmişdə: there were (cəm).", ru: "Рамка 1 в прошлом: there were (мн. число)." } },
        { en: "They bought … they didn't buy them", note: { az: "Past Simple: buy → bought; inkar didn't + V1.", ru: "Past Simple: buy → bought; отрицание didn't + V1." } },
        { en: "The tomatoes were very cheap", note: { az: "2-ci çərçivə keçmişdə: were.", ru: "Рамка 2 в прошлом: were." } },
        { en: "they are going to visit … they will take", note: { az: "Gələcək: plan → going to; sonrakı hərəkət → will.", ru: "Будущее: план → going to; следующее действие → will." } },
      ],
    },
    sections: [
      {
        instructions: howTo,
        questions: [
          { id: "q1", type: "choice", prompt: "Why were there a lot of people at the market?", options: ["It was a holiday.", "The weather was sunny and warm.", "Everything was cheap.", "There was a festival."], answer: 1, why: { az: "\"because the weather was sunny and warm\".", ru: "«because the weather was sunny and warm»." } },
          { id: "q2", type: "choice", prompt: "How much were the tomatoes?", options: ["One manat a kilo", "Two manats a kilo", "Five manats a kilo", "The text doesn't say"], answer: 1, why: { az: "\"only two manats a kilo\".", ru: "«only two manats a kilo»." } },
          { id: "q3", type: "tfng", prompt: "They bought cherries.", answer: "F", why: { az: "\"so they didn't buy them\".", ru: "«so they didn't buy them»." } },
          { id: "q4", type: "tfng", prompt: "Elvin's mother had soup for lunch.", answer: "T", why: { az: "\"his mother had soup\".", ru: "«his mother had soup»." } },
          { id: "q5", type: "tfng", prompt: "Elvin's grandmother is 80 years old.", answer: "NG", why: { az: "Nənənin yaşı deyilmir.", ru: "Возраст бабушки не указан." } },
          { id: "q6", type: "short", prompt: "What did Elvin eat at the café? (one word)", accept: ["qutab", "qutabs"], maxWords: 1, why: { az: "\"Elvin ate a plate of qutab\".", ru: "«Elvin ate a plate of qutab»." } },
          { id: "q7", type: "short", prompt: "Where does Elvin's grandmother live? (max 3 words)", accept: ["in the village", "the village", "village", "in a village"], maxWords: 3, why: { az: "\"visit his grandmother in the village\".", ru: "«visit his grandmother in the village»." } },
        ],
      },
    ],
  },
];
