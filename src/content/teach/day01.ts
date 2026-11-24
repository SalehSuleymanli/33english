import type { Teach } from "./types";

export const TEACH_01: Teach = {
  day: 1,
  summary: {
    az: "Bu dərsdə birinci çərçivəni, mövcudluq çərçivəsini öyrənirsiniz: There is / There are. Bu struktur nəyinsə harada isə olub-olmadığını bildirir və Azərbaycan dilindəki \"var / yoxdur\" sözlərinin əsas qarşılığıdır.",
    ru: "В этом уроке вы изучаете первую рамку — рамку существования: There is / There are. Эта структура сообщает, есть ли что-то где-то, и это главный аналог русских «есть / нет / находится».",
  },
  sections: [
    {
      id: "meaning",
      title: { az: "1. There is / There are nə deməkdir?", ru: "1. Что означает There is / There are?" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "There is / There are konstruksiyası bir şeyin müəyyən yerdə və ya müəyyən vaxtda mövcud olduğunu bildirir. Azərbaycan dilində biz bunu \"var\" sözü ilə deyirik: \"Masanın üstündə kitab var.\" İngilis dilində isə \"var\" üçün ayrıca söz yoxdur, buna görə də cümlə \"There is a book on the table\" şəklində qurulur.",
            ru: "Конструкция There is / There are сообщает, что что-то существует или находится в определённом месте или в определённое время. По-русски мы говорим: «На столе лежит книга» или «На столе есть книга». В английском нет отдельного слова «есть» в этом значении, поэтому предложение строится так: «There is a book on the table».",
          },
        },
        {
          kind: "p",
          text: {
            az: "Burada \"there\" sözü \"orada\" mənasını vermir. O, sadəcə cümlənin formal başlanğıcıdır, mübtəda yerini tutan \"boş\" sözdür. İngilis cümləsində mübtəda olmalıdır, və yeni bir şeyi ilk dəfə təqdim edəndə bu yeri \"there\" tutur. Mənanı isə \"is / are\" feili və ondan sonra gələn isim verir.",
            ru: "Здесь слово «there» не означает «там». Это формальное начало предложения, «пустое» слово на месте подлежащего. В английском предложении обязательно должно быть подлежащее, и когда мы впервые сообщаем о чём-то новом, это место занимает «there». Смысл же передают глагол «is / are» и существительное после него.",
          },
        },
        {
          kind: "tip",
          text: {
            az: "Qısa qayda: yeni bir şey haqqında \"... var\" və ya \"... yoxdur\" demək istəyirsinizsə, cümləni There is / There are ilə başlayın.",
            ru: "Короткое правило: если вы хотите сказать «есть …» или «нет …» о чём-то новом для собеседника, начинайте предложение с There is / There are.",
          },
        },
      ],
    },
    {
      id: "formula",
      title: { az: "2. Cümlənin formulu və hər hissənin rolu", ru: "2. Формула предложения и роль каждой части" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Təsdiq cümləsi (indiki zaman)", ru: "Утвердительное предложение (настоящее время)" },
          parts: [
            { text: "There", role: "there", note: { az: "Formal başlanğıc. Tərcümə olunmur.", ru: "Формальное начало. Не переводится." } },
            { text: "is / are", role: "be", note: { az: "\"to be\" feili. Təkdə is, cəmdə are.", ru: "Глагол «to be». В единственном числе is, во множественном are." } },
            { text: "a book / two books", role: "object", note: { az: "Mövcud olan şey: artikl və ya say ilə isim.", ru: "То, что существует: существительное с артиклем или числом." } },
            { text: "on the table", role: "place", note: { az: "Harada? Yer və ya zaman bildirən hissə. Adətən cümlənin sonunda gəlir.", ru: "Где? Часть, обозначающая место или время. Обычно стоит в конце." } },
          ],
          example: "There is a book on the table.",
        },
        {
          kind: "p",
          text: {
            az: "Söz sırasına diqqət edin: ingilis dilində yer bildirən hissə adətən sonda gəlir. Azərbaycan dilində \"Masanın üstündə kitab var\" deyirik, yəni yer əvvəldə, \"var\" sonda. İngilis dilində isə sıra tam əksinədir: There is → nə → harada.",
            ru: "Обратите внимание на порядок слов: в английском обстоятельство места обычно стоит в конце. По-русски мы говорим «На столе лежит книга» — место в начале. В английском порядок обратный: There is → что → где.",
          },
        },
      ],
    },
    {
      id: "number",
      title: { az: "3. Tək və cəm: is yoxsa are?", ru: "3. Единственное и множественное число: is или are?" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"is\" və ya \"are\" seçimi feildən sonra gələn isimdən asılıdır. İsim təkdirsə, \"is\", cəmdirsə \"are\" işlədilir. Tək saylı sayılan isimdən əvvəl mütləq \"a\" və ya \"an\" artiklı gəlir: samitlə başlayan sözdən əvvəl \"a\" (a book, a car), saitlə başlayan səsdən əvvəl \"an\" (an apple, an hour). Diqqət: seçim hərfə yox, səsə görə edilir: \"an hour\" (h oxunmur), amma \"a university\" (\"yu\" səsi ilə başlayır).",
            ru: "Выбор между «is» и «are» зависит от существительного после глагола. Если оно в единственном числе — «is», если во множественном — «are». Перед исчисляемым существительным в единственном числе обязательно стоит артикль «a» или «an»: «a» перед согласным звуком (a book, a car), «an» перед гласным звуком (an apple, an hour). Важно: выбор зависит от звука, а не от буквы: «an hour» (h не читается), но «a university» (начинается со звука «ю»).",
          },
        },
        {
          kind: "table",
          head: [{ az: "Növ", ru: "Тип" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["a / an + singular", "There is a bank near here. There is an old church in the village."],
            ["number + plural", "There are two banks near here. There are three windows."],
            ["some / many / a lot of + plural", "There are some chairs. There are a lot of people."],
            ["uncountable (no a/an)", "There is some milk in the fridge. There is a lot of traffic."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Sayılmayan isimlər (water, milk, money, information, traffic, furniture, advice) həmişə tək kimi işlədilir: \"There is some water\", heç vaxt \"There are water\" deyilmir. Onlardan əvvəl \"a/an\" qoyulmur. Azərbaycan və rus dillərində bəzi sözlər sayılan olsa da, ingilis dilində sayılmayandır: \"məlumatlar\" → information (cəmi yoxdur), \"məsləhətlər\" → advice, \"mebellər\" → furniture.",
            ru: "Неисчисляемые существительные (water, milk, money, information, traffic, furniture, advice) всегда употребляются как единственное число: «There is some water», а не «There are water». Артикль «a/an» перед ними не ставится. Некоторые слова, исчисляемые в русском, в английском неисчисляемые: «сведения/информация» → information (нет множественного числа), «советы» → advice, «мебель» → furniture.",
          },
        },
        {
          kind: "tip",
          text: {
            az: "Bir neçə şey sadalayanda feil birinci isimə uyğunlaşır: \"There is a sofa and two chairs\" (birinci isim tək), \"There are two chairs and a sofa\" (birinci isim cəm).",
            ru: "При перечислении глагол согласуется с первым существительным: «There is a sofa and two chairs» (первое — в единственном числе), «There are two chairs and a sofa» (первое — во множественном).",
          },
        },
      ],
    },
    {
      id: "forms",
      title: { az: "4. Təsdiq, inkar, sual və qısa cavablar", ru: "4. Утверждение, отрицание, вопрос и краткие ответы" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Tək", ru: "Единственное число" }, { az: "Cəm", ru: "Множественное число" }],
          rows: [
            ["+", "There is (There's) a cat.", "There are two cats."],
            ["−", "There isn't a cat. / There is no cat.", "There aren't any cats. / There are no cats."],
            ["?", "Is there a cat?", "Are there any cats?"],
            ["Short answer", "Yes, there is. / No, there isn't.", "Yes, there are. / No, there aren't."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Sual qurmaq üçün \"is/are\" sözünü \"there\"-dən əvvələ keçiririk: There is → Is there? Bu, ingilis dilində sualın əsas prinsipidir: köməkçi feil mübtədadan əvvələ keçir. Cavabda isə isim təkrarlanmır, sadəcə \"Yes, there is\" və ya \"No, there isn't\" deyilir. Qısa təsdiq cavabında \"Yes, there's\" kimi ixtisar işlədilmir.",
            ru: "Чтобы задать вопрос, переносим «is/are» перед «there»: There is → Is there? Это основной принцип английского вопроса: вспомогательный глагол встаёт перед подлежащим. В ответе существительное не повторяют, а говорят просто «Yes, there is» или «No, there isn't». В кратком утвердительном ответе сокращение «Yes, there's» не используется.",
          },
        },
        {
          kind: "p",
          text: {
            az: "İnkarın iki yolu var. Birinci: \"isn't / aren't\" + \"a\" və ya \"any\": \"There isn't a bank\", \"There aren't any banks\". İkinci: \"is / are\" + \"no\": \"There is no bank\", \"There are no banks\". \"No\" ilə deyilən variant bir az daha qətidir. Diqqət: \"no\" işlədəndə artikl və \"not\" atılır. \"There isn't no bank\" səhvdir, çünki ingilis dilində iki inkar bir cümlədə işlənmir.",
            ru: "Есть два способа сделать отрицание. Первый: «isn't / aren't» + «a» или «any»: «There isn't a bank», «There aren't any banks». Второй: «is / are» + «no»: «There is no bank», «There are no banks». Вариант с «no» звучит чуть категоричнее. Внимание: с «no» не нужны ни артикль, ни «not». «There isn't no bank» — ошибка: в английском не бывает двух отрицаний в одном предложении, в отличие от русского «нет никакого банка».",
          },
        },
      ],
    },
    {
      id: "some-any",
      title: { az: "5. Some, any, no və How many / How much", ru: "5. Some, any, no и How many / How much" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Söz", ru: "Слово" }, { az: "Harada işlənir", ru: "Где используется" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["some", "+ (affirmative)", "There are some apples. There is some bread."],
            ["any", "− and ?", "There aren't any apples. Is there any bread?"],
            ["no", "+ verb, negative meaning", "There are no apples. There is no bread."],
            ["How many …?", "countable plural", "How many students are there in your class?"],
            ["How much …?", "uncountable", "How much milk is there?"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "\"Some\" bir qədər, bir neçə mənasını verir və təsdiq cümləsində işlənir. \"Any\" inkar və sual cümlələrində işlənir. Təklif və xahişlərdə isə sualda da \"some\" deyilir: \"Is there some coffee left?\" (bir az qəhvə qalıbmı? — cavabın \"hə\" olacağını gözləyirik).",
            ru: "«Some» означает «немного, несколько» и используется в утвердительных предложениях. «Any» — в отрицаниях и вопросах. В предложениях и просьбах и в вопросе можно сказать «some»: «Is there some coffee left?» (там осталось немного кофе? — мы ожидаем ответ «да»).",
          },
        },
      ],
    },
    {
      id: "tenses",
      title: { az: "6. Keçmiş və gələcək zaman (ön baxış)", ru: "6. Прошедшее и будущее время (обзор)" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Mövcudluq çərçivəsi bütün zamanlarda eyni qaydada işləyir: dəyişən yalnız \"be\" feilidir. Keçmiş zamanı və gələcəyi 2-ci gündə ətraflı öyrənəcəksiniz; burada ümumi mənzərəni görün.",
            ru: "Рамка существования работает одинаково во всех временах: меняется только глагол «be». Прошедшее и будущее время вы подробно изучите на 2-й день; здесь — общая картина.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Zaman", ru: "Время" }, { az: "Təsdiq", ru: "Утверждение" }, { az: "İnkar", ru: "Отрицание" }, { az: "Sual", ru: "Вопрос" }],
          rows: [
            ["Present", "There is / There are", "There isn't / There aren't", "Is there? / Are there?"],
            ["Past", "There was / There were", "There wasn't / There weren't", "Was there? / Were there?"],
            ["Future", "There will be", "There won't be", "Will there be?"],
            ["Present perfect", "There has been / There have been", "There hasn't been / There haven't been", "Has there been? / Have there been?"],
          ],
        },
        {
          kind: "examples",
          items: [
            { en: "There was a storm last night.", az: "Dünən gecə fırtına oldu.", ru: "Вчера ночью была буря." },
            { en: "There will be a meeting at ten.", az: "Saat onda iclas olacaq.", ru: "В десять будет совещание." },
            { en: "There have been a lot of changes this year.", az: "Bu il çoxlu dəyişikliklər olub.", ru: "В этом году было много перемен." },
          ],
        },
      ],
    },
    {
      id: "compare",
      title: { az: "7. Oxşar konstruksiyalarla müqayisə", ru: "7. Сравнение с похожими конструкциями" },
      blocks: [
        {
          kind: "compare",
          items: [
            {
              en: "There is a car outside. It is red.",
              text: {
                az: "\"There is\" yeni şeyi təqdim edir (\"çöldə bir maşın var\"). \"It is\" artıq məlum olan şeyi təsvir edir (\"o qırmızıdır\"). Əvvəlcə There is ilə təqdim edirik, sonra It is ilə təsvir edirik.",
                ru: "«There is» вводит новый предмет («на улице стоит машина»). «It is» описывает уже известный предмет («она красная»). Сначала вводим с There is, потом описываем с It is.",
              },
            },
            {
              en: "There is a garden behind the house. / The house has a garden.",
              text: {
                az: "Hər ikisi düzgündür. There is yerə diqqət edir (evin arxasında nə var). Has isə sahibliyə (evin nəyi var). Azərbaycan dilindəki \"var\" sözünü avtomatik olaraq \"have\" ilə tərcümə etməyin: \"Burada kafe var\" → There is a café here, \"Have a café here\" deyil.",
                ru: "Оба варианта верны. There is делает акцент на месте (что находится за домом), has — на обладании (что есть у дома). Не переводите автоматически «есть» как «have»: «Здесь есть кафе» → There is a café here, а не «Have a café here».",
              },
            },
            {
              en: "There's a book on the table. / The book is on the table.",
              text: {
                az: "Birinci cümlə yeni məlumatdır: bir kitab var. İkinci cümlədə \"the book\" artıq bildiyimiz kitabdır və biz onun harada olduğunu deyirik. Məlum şey üçün There is deyil, \"The book is…\" (2-ci çərçivə) işlədilir.",
                ru: "Первое предложение — новая информация: есть какая-то книга. Во втором «the book» — уже известная книга, и мы говорим, где она. Для известного предмета используется не There is, а «The book is…» (рамка 2).",
              },
            },
            {
              en: "there / their / they're",
              text: {
                az: "Üçü də eyni oxunur, amma mənaları fərqlidir: there (mövcudluq və ya \"orada\"), their (onların), they're = they are (onlar …dır).",
                ru: "Все три слова звучат одинаково, но значат разное: there (существование или «там»), their (их), they're = they are (они …).",
              },
            },
          ],
        },
      ],
    },
    {
      id: "places",
      title: { az: "8. Yer bildirən sözlər", ru: "8. Слова, обозначающие место" },
      blocks: [
        {
          kind: "signals",
          words: ["in", "on", "under", "next to", "near", "behind", "in front of", "between", "opposite", "at", "here", "in my city", "on the wall"],
          text: {
            az: "Bu sözlər There is cümləsinin sonunda \"harada?\" sualına cavab verir. \"In\" bir şeyin içində (in the box, in the room), \"on\" səthin üstündə (on the table, on the wall), \"at\" konkret nöqtədə (at the bus stop, at work) deməkdir.",
            ru: "Эти слова в конце предложения с There is отвечают на вопрос «где?». «In» — внутри (in the box, in the room), «on» — на поверхности (on the table, on the wall), «at» — в конкретной точке (at the bus stop, at work).",
          },
        },
      ],
    },
    {
      id: "examples",
      title: { az: "9. Nümunələr və tərcümələr", ru: "9. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "There is a pharmacy next to the bank.", az: "Bankın yanında aptek var.", ru: "Рядом с банком есть аптека." },
            { en: "There are three bedrooms in our flat.", az: "Mənzilimizdə üç yataq otağı var.", ru: "В нашей квартире три спальни." },
            { en: "There isn't a lift in this building.", az: "Bu binada lift yoxdur.", ru: "В этом здании нет лифта." },
            { en: "There aren't any free tables.", az: "Boş masa yoxdur.", ru: "Свободных столиков нет." },
            { en: "Is there a bus stop near here?", az: "Buralarda avtobus dayanacağı var?", ru: "Здесь поблизости есть остановка?" },
            { en: "Are there any good restaurants in your town?", az: "Sizin şəhərdə yaxşı restoran var?", ru: "В вашем городе есть хорошие рестораны?" },
            { en: "There is some juice in the fridge.", az: "Soyuducuda bir az şirə var.", ru: "В холодильнике есть немного сока." },
            { en: "There is no time. We have to go.", az: "Vaxt yoxdur. Getməliyik.", ru: "Времени нет. Нам нужно идти." },
            { en: "How many people are there in your family? — There are five.", az: "Ailənizdə neçə nəfər var? — Beş nəfər.", ru: "Сколько человек в вашей семье? — Пятеро." },
            { en: "There's a problem with my phone.", az: "Telefonumla bağlı problem var.", ru: "С моим телефоном проблема." },
            { en: "There are a lot of tourists in Baku in summer.", az: "Yayda Bakıda çoxlu turist olur.", ru: "Летом в Баку много туристов." },
            { en: "Is there anything I can do? — No, there isn't. Thanks.", az: "Edə biləcəyim bir şey varmı? — Yox, sağ olun.", ru: "Я могу чем-нибудь помочь? — Нет, спасибо." },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "10. Azərbaycan və rus dilində danışanların tipik səhvləri", ru: "10. Типичные ошибки азербайджано- и русскоговорящих" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            {
              wrong: "In my room is a big bed.",
              right: "There is a big bed in my room.",
              why: {
                az: "Ana dilimizdəki söz sırasını (yer əvvəldə) birbaşa köçürmək. İngilis dilində yeni şeyi təqdim edəndə cümlə There is ilə başlayır, yer isə sona keçir.",
                ru: "Перенос русского порядка слов («В моей комнате стоит большая кровать»). В английском новое вводится через There is, а место уходит в конец.",
              },
            },
            {
              wrong: "Have a café near my house.",
              right: "There is a café near my house.",
              why: {
                az: "\"Var\" sözünü \"have\" kimi tərcümə etmək. \"Have\" kiminsə sahibliyini bildirir; yerdə nəyinsə olmasını isə There is bildirir.",
                ru: "Перевод «есть» как «have». «Have» означает обладание кого-то чем-то; наличие чего-то в месте выражает There is.",
              },
            },
            {
              wrong: "There is many people here.",
              right: "There are many people here.",
              why: {
                az: "\"People\" cəmdir (bir nəfər = a person). Cəm isimlə \"are\" işlənir.",
                ru: "«People» — множественное число (один человек = a person). С множественным числом — «are».",
              },
            },
            {
              wrong: "There is book on the table.",
              right: "There is a book on the table.",
              why: {
                az: "Azərbaycan və rus dillərində artikl yoxdur, buna görə onu unutmaq asandır. Tək saylı sayılan isimdən əvvəl \"a/an\" mütləqdir.",
                ru: "В русском нет артиклей, поэтому их легко забыть. Перед исчисляемым существительным в единственном числе «a/an» обязательны.",
              },
            },
            {
              wrong: "There are two book.",
              right: "There are two books.",
              why: {
                az: "Azərbaycan dilində saydan sonra isim tək qalır (\"iki kitab\"), ingilis dilində isə cəm şəkilçisi -s mütləqdir.",
                ru: "В английском после числа больше одного существительное всегда во множественном числе с -s, даже когда в русском форма особая («две книги»).",
              },
            },
            {
              wrong: "There are a lot of water.",
              right: "There is a lot of water.",
              why: {
                az: "Water sayılmayan isimdir və həmişə tək kimi işlənir, \"a lot of\" olsa belə.",
                ru: "Water — неисчисляемое существительное и всегда употребляется как единственное число, даже с «a lot of».",
              },
            },
            {
              wrong: "There isn't no milk.",
              right: "There isn't any milk. / There is no milk.",
              why: {
                az: "İngilis dilində bir cümlədə iki inkar olmur. Ya \"isn't any\", ya da \"is no\" seçin.",
                ru: "В английском не бывает двойного отрицания, как в русском «нет никакого молока». Выберите «isn't any» или «is no».",
              },
            },
            {
              wrong: "Is there a shop near? — Yes, there's.",
              right: "Is there a shop near here? — Yes, there is.",
              why: {
                az: "Qısa təsdiq cavabında ixtisar edilmir. Bundan əlavə, \"near\" sözündən sonra adətən \"here\" və ya yer gəlir.",
                ru: "В кратком утвердительном ответе сокращение не используется. Кроме того, после «near» обычно нужно «here» или название места.",
              },
            },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "There is / There are yeni şeyin harada isə \"var\"-lığını bildirir. \"There\" burada \"orada\" demək deyil.", ru: "There is / There are сообщает, что что-то новое «есть» где-то. «There» здесь не значит «там»." },
    { az: "Tək və sayılmayan isimlə is, cəm isimlə are işlənir. Tək sayılan isimdən əvvəl a/an mütləqdir.", ru: "С единственным числом и неисчисляемыми — is, с множественным — are. Перед исчисляемым в единственном числе обязательно a/an." },
    { az: "Sual: Is there…? / Are there…? İnkar: isn't / aren't (any) və ya is / are no.", ru: "Вопрос: Is there…? / Are there…? Отрицание: isn't / aren't (any) или is / are no." },
    { az: "Some təsdiqdə, any inkar və sualda işlənir. Yer bildirən hissə adətən cümlənin sonundadır.", ru: "Some — в утверждении, any — в отрицании и вопросе. Обстоятельство места обычно в конце предложения." },
    { az: "Keçmiş: There was / were. Gələcək: There will be.", ru: "Прошедшее: There was / were. Будущее: There will be." },
  ],
};
