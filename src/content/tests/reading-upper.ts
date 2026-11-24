import type { Test } from "./types";

const howTo = { en: "Read the text, then answer the questions.", az: "Mətni oxuyun, sonra suallara cavab verin.", ru: "Прочитайте текст и ответьте на вопросы." };

export const READING_UPPER: Test[] = [
  {
    id: "rd-u1-small-business",
    kind: "reading",
    level: "upper-intermediate",
    title: { en: "From hobby to business", az: "Hobbidən biznesə", ru: "От хобби к бизнесу" },
    description: { en: "How a home baker turned her passion into a company — and what she learned.", az: "Evdə şirniyyat bişirən qadın hobbisini necə şirkətə çevirdi və nə öyrəndi.", ru: "Как домашний кондитер превратила увлечение в компанию — и чему научилась." },
    minutes: 12,
    timed: false,
    passage: {
      title: "From hobby to business",
      paragraphs: [
        "Five years ago, Sabina Mammadova was working as an accountant and baking cakes for friends at the weekend. Today she runs a bakery with eleven employees and supplies desserts to several cafés in Baku. \"I never planned to start a business,\" she admits. \"It started almost by accident.\"",
        "The turning point came when a friend posted a photo of one of Sabina's cakes online. Within a week, strangers were sending her messages asking how much she charged. At first she said no to most orders, because she was afraid that she wouldn't be able to manage both her job and the baking. Eventually, however, she realised that she was spending every evening thinking about recipes rather than spreadsheets.",
        "Leaving a stable salary was the hardest decision of her life. \"If I had known how difficult the first year would be, I might not have done it,\" she laughs. There were months when she barely covered her costs, and she had to learn things that no one had taught her: how to price her products, how to deal with suppliers and how to manage people.",
        "Sabina believes that her background in accounting saved the business. Many small companies fail, she explains, not because their products are bad, but because their owners do not understand their numbers. She checked her income and expenses every week and refused to expand until she was sure she could afford it.",
        "Her advice to anyone who wants to turn a hobby into a business is simple: test the idea before you give up your job. \"Sell to strangers, not just to friends. Friends will always say your cakes are delicious. Strangers will tell you the truth — with their money.\"",
      ],
    },
    reading: {
      topic: { en: "Business", az: "Biznes", ru: "Бизнес" },
      translation: {
        az: [
          "Beş il əvvəl Səbinə Məmmədova mühasib işləyirdi və həftə sonları dostları üçün tort bişirirdi. Bu gün o, on bir işçisi olan çörəkxana idarə edir və Bakıdakı bir neçə kafeyə desert tədarük edir. \"Heç vaxt biznes açmağı planlaşdırmamışdım\", — o etiraf edir. — \"Demək olar ki, təsadüfən başladı.\"",
          "Dönüş nöqtəsi bir dostunun Səbinənin tortlarından birinin şəklini internetdə paylaşması oldu. Bir həftə ərzində tanımadığı insanlar ona qiymət soruşan mesajlar göndərirdi. Əvvəlcə o, sifarişlərin çoxundan imtina edirdi, çünki həm işini, həm də şirniyyat bişirməyi bacara bilməyəcəyindən qorxurdu. Lakin sonda anladı ki, hər axşamını cədvəllər əvəzinə reseptlər haqqında düşünməklə keçirir.",
          "Sabit maaşdan imtina etmək həyatının ən çətin qərarı oldu. \"Birinci ilin nə qədər çətin olacağını bilsəydim, bəlkə də bunu etməzdim\", — deyə gülür. Elə aylar olub ki, xərclərini çətinliklə ödəyib və heç kimin ona öyrətmədiyi şeyləri öyrənməli olub: məhsullarına necə qiymət qoymaq, təchizatçılarla necə işləmək və insanları necə idarə etmək.",
          "Səbinə hesab edir ki, biznesi onun mühasibat təcrübəsi xilas edib. O izah edir ki, bir çox kiçik şirkət məhsulları pis olduğu üçün deyil, sahibləri öz rəqəmlərini başa düşmədiyi üçün batır. O, hər həftə gəlir və xərclərini yoxlayırdı və buna imkanı çatacağından əmin olmayınca genişlənməkdən imtina edirdi.",
          "Hobbisini biznesə çevirmək istəyən hər kəsə məsləhəti sadədir: işinizdən çıxmazdan əvvəl ideyanı sınaqdan keçirin. \"Təkcə dostlara deyil, tanımadığınız insanlara satın. Dostlar həmişə tortunuzun dadlı olduğunu deyəcək. Yad insanlar isə həqiqəti deyəcək — pulları ilə.\"",
        ],
        ru: [
          "Пять лет назад Сабина Мамедова работала бухгалтером и по выходным пекла торты для друзей. Сегодня она руководит пекарней с одиннадцатью сотрудниками и поставляет десерты в несколько кафе Баку. «Я никогда не планировала открывать бизнес, — признаётся она. — Всё началось почти случайно».",
          "Поворотным моментом стало то, что подруга выложила в сеть фото одного из тортов Сабины. Уже через неделю незнакомые люди писали ей, спрашивая цену. Сначала она отказывалась от большинства заказов, потому что боялась, что не сможет совмещать работу и выпечку. Но в конце концов поняла, что каждый вечер думает о рецептах, а не о таблицах.",
          "Отказаться от стабильной зарплаты было самым трудным решением в её жизни. «Если бы я знала, каким тяжёлым будет первый год, возможно, я бы на это не решилась», — смеётся она. Бывали месяцы, когда она едва покрывала расходы, и ей пришлось учиться тому, чему её никто не учил: как назначать цену, как работать с поставщиками и как управлять людьми.",
          "Сабина считает, что бизнес спасло её бухгалтерское прошлое. Многие маленькие компании закрываются, объясняет она, не потому что их продукт плохой, а потому что владельцы не понимают своих цифр. Она каждую неделю проверяла доходы и расходы и отказывалась расширяться, пока не была уверена, что может себе это позволить.",
          "Её совет тем, кто хочет превратить хобби в бизнес, прост: проверьте идею, прежде чем уходить с работы. «Продавайте незнакомым людям, а не только друзьям. Друзья всегда скажут, что ваши торты вкусные. Незнакомцы скажут правду — своими деньгами».",
        ],
      },
      vocab: [
        { en: "supply", az: "tədarük etmək", ru: "поставлять" },
        { en: "turning point", az: "dönüş nöqtəsi", ru: "поворотный момент" },
        { en: "charge (a price)", az: "qiymət istəmək", ru: "брать плату" },
        { en: "stable salary", az: "sabit maaş", ru: "стабильная зарплата" },
        { en: "barely", az: "çətinliklə, güclə", ru: "едва" },
        { en: "supplier", az: "təchizatçı", ru: "поставщик" },
        { en: "income and expenses", az: "gəlir və xərclər", ru: "доходы и расходы" },
        { en: "expand", az: "genişlənmək", ru: "расширяться" },
      ],
      grammar: [
        { en: "If I had known …, I might not have done it", note: { az: "Üçüncü şərt: keçmiş haqqında xəyal (25-ci gün).", ru: "Третий тип условных: воображаемое прошлое (25-й день)." } },
        { en: "she was afraid that she wouldn't be able to manage", note: { az: "Dolayı nitq/fikir: will → would; be able to.", ru: "Косвенная речь/мысль: will → would; be able to." } },
        { en: "things that no one had taught her", note: { az: "Nisbi cümlə + Past Perfect.", ru: "Относительное придаточное + Past Perfect." } },
        { en: "not because their products are bad, but because…", note: { az: "Səbəbləri qarşılaşdırmaq: not because … but because.", ru: "Противопоставление причин: not because … but because." } },
      ],
    },
    sections: [
      {
        instructions: howTo,
        questions: [
          { id: "q1", type: "choice", prompt: "What was Sabina's job before she started the bakery?", options: ["Chef", "Accountant", "Teacher", "Café manager"], answer: 1, why: { az: "\"working as an accountant\".", ru: "«working as an accountant»." } },
          { id: "q2", type: "choice", prompt: "What started the interest in her cakes?", options: ["An advertisement", "A photo posted online by a friend", "A cooking competition", "A café owner"], answer: 1, why: { az: "\"a friend posted a photo … online\".", ru: "«a friend posted a photo … online»." } },
          { id: "q3", type: "tfng", prompt: "At first, Sabina accepted most of the orders.", answer: "F", why: { az: "\"At first she said no to most orders\".", ru: "«At first she said no to most orders»." } },
          { id: "q4", type: "tfng", prompt: "Sabina says she might not have started if she had known how hard the first year would be.", answer: "T", why: { az: "\"If I had known … I might not have done it\".", ru: "«If I had known … I might not have done it»." } },
          { id: "q5", type: "tfng", prompt: "Sabina's bakery now sells cakes abroad.", answer: "NG", why: { az: "Yalnız Bakıdakı kafelərdən danışılır.", ru: "Говорится только о кафе в Баку." } },
          { id: "q6", type: "choice", prompt: "Why, according to Sabina, do many small companies fail?", options: ["Their products are bad.", "Their owners don't understand their numbers.", "They expand too slowly.", "They have too few employees."], answer: 1, why: { az: "\"because their owners do not understand their numbers\".", ru: "«because their owners do not understand their numbers»." } },
          { id: "q7", type: "short", prompt: "How often did Sabina check her income and expenses? (max 2 words)", accept: ["every week", "weekly", "once a week"], maxWords: 3, why: { az: "\"every week\".", ru: "«every week»." } },
          { id: "q8", type: "choice", prompt: "Why does Sabina recommend selling to strangers?", options: ["They pay more.", "They give honest feedback with their money.", "Friends don't buy cakes.", "It's easier to find them online."], answer: 1, why: { az: "\"Strangers will tell you the truth — with their money\".", ru: "«Strangers will tell you the truth — with their money»." } },
        ],
      },
    ],
  },
  {
    id: "rd-u2-bees",
    kind: "reading",
    level: "upper-intermediate",
    title: { en: "Why we need bees", az: "Arılar bizə niyə lazımdır", ru: "Зачем нам пчёлы" },
    description: { en: "Pollinators, the threats they face and what ordinary people can do.", az: "Tozlandırıcılar, onları təhdid edən təhlükələr və adi insanların edə biləcəkləri.", ru: "Опылители, угрозы для них и что могут сделать обычные люди." },
    minutes: 12,
    timed: false,
    passage: {
      title: "Why we need bees",
      paragraphs: [
        "When people think of bees, they usually think of honey. But honey is only a small part of the story. Bees, together with butterflies, birds and other animals, carry pollen from one flower to another. Without this process, which is called pollination, many plants cannot produce fruit or seeds.",
        "It is estimated that around three quarters of the world's main food crops depend, at least partly, on pollinators. Apples, almonds, tomatoes and coffee are just a few examples. If bees disappeared, our supermarkets would not be empty, because crops such as wheat and rice are pollinated by the wind — but our diet would become much poorer and more expensive.",
        "In recent decades, scientists have reported worrying declines in bee populations in many parts of the world. There is no single cause. Pesticides, diseases, climate change and the loss of wild flowers have all been blamed, and in most places these factors work together.",
        "Governments have responded in different ways. Some countries have banned certain pesticides, while others pay farmers to leave strips of wild flowers at the edges of their fields. In cities, rooftop gardens and parks that are cut less often can provide food for pollinators.",
        "Ordinary people can help too. Planting flowers on a balcony, avoiding chemical sprays in the garden and buying honey from local beekeepers are small actions, but if millions of people take them, the effect can be significant.",
      ],
    },
    reading: {
      topic: { en: "Nature and science", az: "Təbiət və elm", ru: "Природа и наука" },
      translation: {
        az: [
          "İnsanlar arılar haqqında düşünəndə adətən bal yada düşür. Amma bal hekayənin yalnız kiçik bir hissəsidir. Arılar kəpənəklər, quşlar və digər heyvanlarla birlikdə tozcuqları bir çiçəkdən digərinə daşıyır. Tozlanma adlanan bu proses olmasa, bir çox bitki meyvə və ya toxum verə bilməz.",
          "Hesablamalara görə, dünyanın əsas ərzaq bitkilərinin təxminən dörddə üçü, heç olmasa qismən, tozlandırıcılardan asılıdır. Alma, badam, pomidor və qəhvə bunun sadəcə bir neçə nümunəsidir. Arılar yox olsaydı, supermarketlərimiz boş qalmazdı, çünki buğda və düyü kimi bitkiləri külək tozlandırır — amma qidamız xeyli kasıb və baha olardı.",
          "Son onilliklərdə alimlər dünyanın bir çox yerində arı populyasiyalarının narahatedici dərəcədə azaldığını bildirirlər. Tək bir səbəb yoxdur. Pestisidlər, xəstəliklər, iqlim dəyişikliyi və yabanı çiçəklərin itməsi — hamısı günahlandırılıb və əksər yerlərdə bu amillər birlikdə təsir göstərir.",
          "Hökumətlər buna müxtəlif cür reaksiya veriblər. Bəzi ölkələr müəyyən pestisidləri qadağan edib, digərləri isə fermerlərə sahələrinin kənarında yabanı çiçək zolaqları saxlamaq üçün pul ödəyir. Şəhərlərdə dam bağları və otu daha az biçilən parklar tozlandırıcılar üçün qida mənbəyi ola bilər.",
          "Adi insanlar da kömək edə bilər. Eyvanda çiçək əkmək, bağda kimyəvi çiləyicilərdən qaçmaq və yerli arıçılardan bal almaq kiçik addımlardır, amma milyonlarla insan bunu etsə, təsiri əhəmiyyətli ola bilər.",
        ],
        ru: [
          "Когда люди думают о пчёлах, они обычно вспоминают мёд. Но мёд — лишь малая часть истории. Пчёлы вместе с бабочками, птицами и другими животными переносят пыльцу с одного цветка на другой. Без этого процесса, который называется опылением, многие растения не могут давать плоды или семена.",
          "По оценкам, около трёх четвертей основных продовольственных культур мира хотя бы частично зависят от опылителей. Яблоки, миндаль, помидоры и кофе — лишь несколько примеров. Если бы пчёлы исчезли, полки супермаркетов не опустели бы, потому что пшеницу и рис опыляет ветер, — но наш рацион стал бы гораздо беднее и дороже.",
          "В последние десятилетия учёные сообщают о тревожном сокращении численности пчёл во многих частях мира. Единственной причины нет. Вину возлагают на пестициды, болезни, изменение климата и исчезновение диких цветов, и в большинстве мест эти факторы действуют вместе.",
          "Правительства реагируют по-разному. Некоторые страны запретили определённые пестициды, а другие платят фермерам за то, чтобы те оставляли полосы диких цветов по краям полей. В городах пищу для опылителей могут дать сады на крышах и парки, которые реже косят.",
          "Помочь могут и обычные люди. Посадить цветы на балконе, не пользоваться химическими опрыскивателями в саду, покупать мёд у местных пчеловодов — это маленькие шаги, но если их сделают миллионы людей, эффект может быть значительным.",
        ],
      },
      vocab: [
        { en: "pollen", az: "tozcuq", ru: "пыльца" },
        { en: "pollination", az: "tozlanma", ru: "опыление" },
        { en: "crop", az: "kənd təsərrüfatı bitkisi", ru: "сельхозкультура" },
        { en: "decline", az: "azalma", ru: "сокращение" },
        { en: "pesticide", az: "pestisid", ru: "пестицид" },
        { en: "be blamed", az: "günahlandırılmaq", ru: "считаться виновным" },
        { en: "beekeeper", az: "arıçı", ru: "пчеловод" },
        { en: "significant", az: "əhəmiyyətli", ru: "значительный" },
      ],
      grammar: [
        { en: "this process, which is called pollination", note: { az: "Vergüllü nisbi cümlə + passive.", ru: "Придаточное с запятыми + пассив." } },
        { en: "It is estimated that…", note: { az: "Akademik passive quruluşu: It is + V3 + that.", ru: "Академическая пассивная конструкция: It is + V3 + that." } },
        { en: "If bees disappeared, our supermarkets would not be empty", note: { az: "İkinci şərt: xəyali vəziyyət.", ru: "Второй тип условных: воображаемая ситуация." } },
        { en: "have all been blamed", note: { az: "Present Perfect Passive.", ru: "Present Perfect Passive." } },
      ],
    },
    sections: [
      {
        instructions: howTo,
        questions: [
          { id: "q1", type: "choice", prompt: "What is pollination?", options: ["Making honey", "Carrying pollen from flower to flower", "Growing wheat", "Protecting flowers from insects"], answer: 1, why: { az: "\"carry pollen from one flower to another … called pollination\".", ru: "«carry pollen from one flower to another … called pollination»." } },
          { id: "q2", type: "short", prompt: "What fraction of the main food crops depend partly on pollinators? (max 3 words)", accept: ["three quarters", "around three quarters", "about three quarters", "3/4"], maxWords: 3, why: { az: "\"around three quarters\".", ru: "«around three quarters»." } },
          { id: "q3", type: "tfng", prompt: "Without bees, supermarkets would be completely empty.", answer: "F", why: { az: "\"our supermarkets would not be empty\".", ru: "«our supermarkets would not be empty»." } },
          { id: "q4", type: "tfng", prompt: "Wheat and rice are pollinated by the wind.", answer: "T", why: { az: "\"crops such as wheat and rice are pollinated by the wind\".", ru: "«crops such as wheat and rice are pollinated by the wind»." } },
          { id: "q5", type: "tfng", prompt: "Climate change is the main cause of bee decline.", answer: "F", why: { az: "\"There is no single cause\" — bir neçə amil birlikdə.", ru: "«There is no single cause» — несколько факторов вместе." } },
          { id: "q6", type: "tfng", prompt: "Azerbaijan has banned some pesticides.", answer: "NG", why: { az: "Konkret ölkələrin adı çəkilmir.", ru: "Конкретные страны не названы." } },
          { id: "q7", type: "choice", prompt: "How do some governments support pollinators?", options: ["By paying farmers to leave wild flowers", "By building beehives in cities", "By banning honey sales", "By planting rice"], answer: 0, why: { az: "\"pay farmers to leave strips of wild flowers\".", ru: "«pay farmers to leave strips of wild flowers»." } },
          { id: "q8", type: "short", prompt: "Name one thing ordinary people can do. (max 5 words)", accept: ["plant flowers", "planting flowers on a balcony", "plant flowers on a balcony", "avoid chemical sprays", "avoiding chemical sprays", "buy local honey", "buying honey from local beekeepers", "buy honey from local beekeepers"], maxWords: 6, why: { az: "Çiçək əkmək, kimyəvi çiləyicilərdən qaçmaq, yerli bal almaq.", ru: "Сажать цветы, не использовать химию, покупать местный мёд." } },
        ],
      },
    ],
  },
];
