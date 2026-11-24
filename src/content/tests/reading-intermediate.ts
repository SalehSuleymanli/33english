import type { Test } from "./types";

const howTo = { en: "Read the text, then answer the questions.", az: "Mətni oxuyun, sonra suallara cavab verin.", ru: "Прочитайте текст и ответьте на вопросы." };

export const READING_INTERMEDIATE: Test[] = [
  {
    id: "rd-i1-smartphones",
    kind: "reading",
    level: "intermediate",
    title: { en: "Are we addicted to our phones?", az: "Telefonlarımızdan asılıyıqmı?", ru: "Зависим ли мы от телефонов?" },
    description: { en: "How smartphones affect attention, and what some people are doing about it.", az: "Smartfonlar diqqətə necə təsir edir və bəzi insanlar bununla bağlı nə edir.", ru: "Как смартфоны влияют на внимание и что с этим делают некоторые люди." },
    minutes: 10,
    timed: false,
    passage: {
      title: "Are we addicted to our phones?",
      paragraphs: [
        "The average smartphone user checks their phone more than 90 times a day. Many of us pick up our phones without even noticing — while we are waiting for a bus, watching television or even talking to friends. Psychologists say this habit is not an accident: apps are designed to keep us coming back.",
        "Every notification, like or new message gives the brain a small reward. Because we never know when the next reward will come, we keep checking. Scientists compare this to the way slot machines work in a casino.",
        "The problem is not only the time we lose. Research suggests that constant interruptions make it harder to concentrate on long tasks, such as reading a book or writing a report. Some studies have found that people perform worse on tests when their phone is simply on the desk next to them, even if it is switched off.",
        "However, not everyone agrees that phones are harmful. Phones help us to stay in touch with family, find information quickly and learn new skills. The real question, experts say, is not whether we use our phones, but how.",
        "More and more people are trying simple changes: turning off notifications, keeping the phone in another room while they work, or having one phone-free day a week. Many of those who have tried it say they feel calmer and more productive.",
      ],
    },
    reading: {
      topic: { en: "Technology and psychology", az: "Texnologiya və psixologiya", ru: "Технологии и психология" },
      translation: {
        az: [
          "Orta statistik smartfon istifadəçisi gündə telefonunu 90 dəfədən çox yoxlayır. Çoxumuz telefonu heç fərqinə varmadan götürürük — avtobus gözləyərkən, televizor izləyərkən və hətta dostlarla danışarkən. Psixoloqlar deyir ki, bu vərdiş təsadüfi deyil: tətbiqlər bizi təkrar-təkrar geri qaytarmaq üçün hazırlanır.",
          "Hər bildiriş, bəyənmə və ya yeni mesaj beynə kiçik bir mükafat verir. Növbəti mükafatın nə vaxt gələcəyini heç vaxt bilmədiyimiz üçün yoxlamağa davam edirik. Alimlər bunu kazinodakı oyun avtomatlarının iş prinsipi ilə müqayisə edirlər.",
          "Problem təkcə itirdiyimiz vaxtda deyil. Tədqiqatlar göstərir ki, daimi fasilələr kitab oxumaq və ya hesabat yazmaq kimi uzun tapşırıqlara diqqəti cəmləməyi çətinləşdirir. Bəzi tədqiqatlar müəyyən edib ki, telefon sadəcə yanlarında masanın üstündə olanda, hətta söndürülmüş olsa belə, insanlar testlərdə daha zəif nəticə göstərirlər.",
          "Lakin hər kəs telefonların zərərli olduğu ilə razılaşmır. Telefonlar ailə ilə əlaqə saxlamağa, məlumatı tez tapmağa və yeni bacarıqlar öyrənməyə kömək edir. Mütəxəssislərin fikrincə, əsl sual telefonlardan istifadə edib-etməməyimiz deyil, necə istifadə etməyimizdir.",
          "Getdikcə daha çox insan sadə dəyişikliklər sınayır: bildirişləri söndürmək, işləyərkən telefonu başqa otaqda saxlamaq və ya həftədə bir gün telefonsuz keçirmək. Bunu sınayanların çoxu özlərini daha sakit və məhsuldar hiss etdiklərini deyirlər.",
        ],
        ru: [
          "Средний пользователь смартфона проверяет телефон более 90 раз в день. Многие из нас берут телефон, даже не замечая этого, — пока ждут автобус, смотрят телевизор или даже разговаривают с друзьями. Психологи говорят, что эта привычка не случайна: приложения созданы, чтобы мы возвращались к ним снова и снова.",
          "Каждое уведомление, лайк или новое сообщение дают мозгу маленькую награду. Поскольку мы никогда не знаем, когда придёт следующая, мы продолжаем проверять. Учёные сравнивают это с принципом работы игровых автоматов в казино.",
          "Проблема не только во времени, которое мы теряем. Исследования показывают, что постоянные отвлечения мешают сосредоточиться на долгих задачах — например, на чтении книги или написании отчёта. Некоторые исследования обнаружили, что люди хуже справляются с тестами, когда телефон просто лежит на столе рядом, даже выключенный.",
          "Однако не все согласны, что телефоны вредны. Они помогают поддерживать связь с семьёй, быстро находить информацию и осваивать новые навыки. Настоящий вопрос, говорят эксперты, не в том, пользуемся ли мы телефонами, а в том, как.",
          "Всё больше людей пробуют простые изменения: отключают уведомления, держат телефон в другой комнате во время работы или устраивают один день в неделю без телефона. Многие из тех, кто это попробовал, говорят, что чувствуют себя спокойнее и продуктивнее.",
        ],
      },
      vocab: [
        { en: "notification", az: "bildiriş", ru: "уведомление" },
        { en: "reward", az: "mükafat", ru: "награда" },
        { en: "interruption", az: "fasilə, kəsilmə", ru: "прерывание, отвлечение" },
        { en: "perform worse", az: "daha zəif nəticə göstərmək", ru: "показывать худшие результаты" },
        { en: "harmful", az: "zərərli", ru: "вредный" },
        { en: "stay in touch", az: "əlaqə saxlamaq", ru: "поддерживать связь" },
        { en: "productive", az: "məhsuldar", ru: "продуктивный" },
      ],
      grammar: [
        { en: "apps are designed to keep us coming back", note: { az: "Passive (are designed) + to + V1: məqsəd.", ru: "Пассив (are designed) + to + V1: цель." } },
        { en: "Some studies have found that…", note: { az: "Present Perfect: nəticə indi vacibdir, vaxt göstərilmir.", ru: "Present Perfect: важен результат, время не указано." } },
        { en: "not whether we use our phones, but how", note: { az: "Whether: iki variant arasında seçim (27-ci gün).", ru: "Whether: выбор между двумя вариантами (27-й день)." } },
        { en: "Many of those who have tried it say…", note: { az: "Nisbi cümlə + Present Perfect.", ru: "Относительное придаточное + Present Perfect." } },
      ],
    },
    sections: [
      {
        instructions: howTo,
        questions: [
          { id: "q1", type: "choice", prompt: "According to psychologists, why do we check our phones so often?", options: ["Because we are bored.", "Because apps are designed to make us come back.", "Because phones are cheap.", "Because our friends ask us to."], answer: 1, why: { az: "\"apps are designed to keep us coming back\".", ru: "«apps are designed to keep us coming back»." } },
          { id: "q2", type: "choice", prompt: "What do scientists compare phone checking to?", options: ["Reading a book", "Slot machines in a casino", "Watching television", "Eating sweets"], answer: 1, why: { az: "\"compare this to the way slot machines work\".", ru: "«compare this to the way slot machines work»." } },
          { id: "q3", type: "tfng", prompt: "People do worse on tests when a phone is on their desk, even if it is off.", answer: "T", why: { az: "\"even if it is switched off\".", ru: "«even if it is switched off»." } },
          { id: "q4", type: "tfng", prompt: "All experts agree that phones are harmful.", answer: "F", why: { az: "\"not everyone agrees that phones are harmful\".", ru: "«not everyone agrees that phones are harmful»." } },
          { id: "q5", type: "tfng", prompt: "Teenagers check their phones more often than adults.", answer: "NG", why: { az: "Yaş qrupları müqayisə olunmur.", ru: "Возрастные группы не сравниваются." } },
          { id: "q6", type: "choice", prompt: "What is the 'real question', according to experts?", options: ["Whether we should ban phones", "How we use our phones", "How much phones cost", "Which apps are best"], answer: 1, why: { az: "\"not whether we use our phones, but how\".", ru: "«not whether we use our phones, but how»." } },
          { id: "q7", type: "short", prompt: "Name one change people are trying. (max 4 words)", accept: ["turning off notifications", "turn off notifications", "one phone-free day", "a phone-free day", "phone-free day", "keeping the phone in another room", "phone in another room"], maxWords: 6, why: { az: "Bildirişləri söndürmək, telefonu başqa otaqda saxlamaq və ya telefonsuz gün.", ru: "Отключить уведомления, держать телефон в другой комнате или день без телефона." } },
          { id: "q8", type: "short", prompt: "How do people feel after trying these changes? (max 3 words)", accept: ["calmer and more productive", "calmer", "more productive"], maxWords: 4, why: { az: "\"they feel calmer and more productive\".", ru: "«they feel calmer and more productive»." } },
        ],
      },
    ],
  },
  {
    id: "rd-i2-silk-road",
    kind: "reading",
    level: "intermediate",
    title: { en: "The Silk Road and Azerbaijan", az: "İpək Yolu və Azərbaycan", ru: "Шёлковый путь и Азербайджан" },
    description: { en: "A short history of trade routes through the Caucasus.", az: "Qafqazdan keçən ticarət yollarının qısa tarixi.", ru: "Краткая история торговых путей через Кавказ." },
    minutes: 10,
    timed: false,
    passage: {
      title: "The Silk Road and Azerbaijan",
      paragraphs: [
        "For more than a thousand years, a network of trade routes connected China with Europe. Today we call it the Silk Road, although the name was only invented in the nineteenth century, and silk was just one of many goods that travelled along it.",
        "Merchants did not usually travel the whole route. Instead, goods were passed from one trader to another, and from city to city. Spices, paper, glass, horses and ideas all moved along these roads. Religions, languages and even recipes spread in the same way.",
        "The lands of today's Azerbaijan were an important part of this network. Caravans crossed the Caucasus, and cities such as Shamakhi and Sheki became busy centres of trade. Shamakhi was famous for its silk, while Sheki's caravanserais — large inns where travellers could rest with their animals — can still be visited today.",
        "Trade along the old routes declined after sea routes became faster and cheaper in the sixteenth century. But the idea of the Silk Road has never really disappeared. In recent years, new railways and ports have been built to connect Asia and Europe again, and Azerbaijan is once more on the way between East and West.",
      ],
    },
    reading: {
      topic: { en: "History", az: "Tarix", ru: "История" },
      translation: {
        az: [
          "Min ildən çox müddət ərzində ticarət yolları şəbəkəsi Çini Avropa ilə birləşdirirdi. Bu gün biz onu İpək Yolu adlandırırıq, baxmayaraq ki, bu ad yalnız XIX əsrdə uydurulub və ipək bu yolla daşınan çoxsaylı mallardan sadəcə biri idi.",
          "Tacirlər adətən bütün yolu qət etmirdilər. Əvəzində mallar bir tacirdən digərinə, şəhərdən şəhərə ötürülürdü. Ədviyyat, kağız, şüşə, atlar və ideyalar — hamısı bu yollarla hərəkət edirdi. Dinlər, dillər və hətta yemək reseptləri də eyni yolla yayılırdı.",
          "Bugünkü Azərbaycan torpaqları bu şəbəkənin mühüm hissəsi idi. Karvanlar Qafqazı keçirdi, Şamaxı və Şəki kimi şəhərlər isə qaynar ticarət mərkəzlərinə çevrildi. Şamaxı ipəyi ilə məşhur idi, Şəkinin karvansaraları — səyyahların heyvanları ilə birlikdə dincələ bildikləri böyük mehmanxanalar — isə bu gün də ziyarət oluna bilər.",
          "XVI əsrdə dəniz yolları daha sürətli və ucuz olduqdan sonra köhnə yollarda ticarət zəiflədi. Amma İpək Yolu ideyası heç vaxt tam yox olmayıb. Son illərdə Asiya ilə Avropanı yenidən birləşdirmək üçün yeni dəmir yolları və limanlar tikilib və Azərbaycan yenə Şərqlə Qərb arasında yol üzərindədir.",
        ],
        ru: [
          "Более тысячи лет сеть торговых путей соединяла Китай с Европой. Сегодня мы называем её Шёлковым путём, хотя это название придумали только в XIX веке, а шёлк был лишь одним из многих товаров, которые по нему перевозили.",
          "Купцы обычно не проходили весь путь целиком. Товары передавались от одного торговца к другому, из города в город. Пряности, бумага, стекло, лошади и идеи — всё двигалось по этим дорогам. Так же распространялись религии, языки и даже рецепты.",
          "Земли нынешнего Азербайджана были важной частью этой сети. Караваны пересекали Кавказ, а такие города, как Шамахы и Шеки, стали оживлёнными торговыми центрами. Шамахы славилась своим шёлком, а караван-сараи Шеки — большие постоялые дворы, где путники могли отдохнуть вместе с животными, — можно посетить и сегодня.",
          "Торговля по старым путям пришла в упадок после того, как в XVI веке морские пути стали быстрее и дешевле. Но идея Шёлкового пути никогда по-настоящему не исчезала. В последние годы построены новые железные дороги и порты, чтобы снова соединить Азию и Европу, и Азербайджан снова оказался на пути между Востоком и Западом.",
        ],
      },
      vocab: [
        { en: "trade route", az: "ticarət yolu", ru: "торговый путь" },
        { en: "merchant", az: "tacir", ru: "купец" },
        { en: "goods", az: "mallar", ru: "товары" },
        { en: "spread", az: "yayılmaq", ru: "распространяться" },
        { en: "caravanserai", az: "karvansara", ru: "караван-сарай" },
        { en: "decline", az: "zəifləmək, tənəzzül etmək", ru: "приходить в упадок" },
      ],
      grammar: [
        { en: "the name was only invented in the nineteenth century", note: { az: "Past Simple Passive: was + V3.", ru: "Past Simple Passive: was + V3." } },
        { en: "goods were passed from one trader to another", note: { az: "Passive: icraçı vacib deyil, prosesə diqqət.", ru: "Пассив: важен процесс, а не исполнитель." } },
        { en: "large inns where travellers could rest", note: { az: "Nisbi cümlə where ilə (yer).", ru: "Относительное придаточное с where (место)." } },
        { en: "new railways and ports have been built", note: { az: "Present Perfect Passive (20-ci gün).", ru: "Present Perfect Passive (20-й день)." } },
      ],
    },
    sections: [
      {
        instructions: howTo,
        questions: [
          { id: "q1", type: "tfng", prompt: "The name 'Silk Road' is more than a thousand years old.", answer: "F", why: { az: "\"the name was only invented in the nineteenth century\".", ru: "«the name was only invented in the nineteenth century»." } },
          { id: "q2", type: "tfng", prompt: "Most merchants travelled the whole route from China to Europe.", answer: "F", why: { az: "\"Merchants did not usually travel the whole route\".", ru: "«Merchants did not usually travel the whole route»." } },
          { id: "q3", type: "tfng", prompt: "Recipes spread along the trade routes.", answer: "T", why: { az: "\"even recipes spread in the same way\".", ru: "«even recipes spread in the same way»." } },
          { id: "q4", type: "tfng", prompt: "Shamakhi had more caravanserais than Sheki.", answer: "NG", why: { az: "Sayları müqayisə edilmir.", ru: "Их количество не сравнивается." } },
          { id: "q5", type: "choice", prompt: "What was Shamakhi famous for?", options: ["Horses", "Glass", "Silk", "Paper"], answer: 2, why: { az: "\"Shamakhi was famous for its silk\".", ru: "«Shamakhi was famous for its silk»." } },
          { id: "q6", type: "choice", prompt: "Why did trade along the old routes decline?", options: ["Wars closed the roads.", "Sea routes became faster and cheaper.", "People stopped buying silk.", "The caravanserais closed."], answer: 1, why: { az: "\"after sea routes became faster and cheaper\".", ru: "«after sea routes became faster and cheaper»." } },
          { id: "q7", type: "short", prompt: "What is a caravanserai? (max 3 words)", accept: ["a large inn", "large inns", "large inn", "an inn", "inn"], maxWords: 3, why: { az: "\"large inns where travellers could rest\".", ru: "«large inns where travellers could rest»." } },
          { id: "q8", type: "short", prompt: "In which century did sea routes become cheaper? (one or two words)", accept: ["sixteenth", "the sixteenth", "16th", "the 16th", "sixteenth century", "the sixteenth century"], maxWords: 3, why: { az: "\"in the sixteenth century\".", ru: "«in the sixteenth century»." } },
        ],
      },
    ],
  },
];
