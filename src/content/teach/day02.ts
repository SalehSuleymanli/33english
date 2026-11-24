import type { Teach } from "./types";

export const TEACH_02: Teach = {
  day: 2,
  summary: {
    az: "Bu dərsdə mövcudluq çərçivəsini keçmiş və gələcək zamana keçirirsiniz: There was / There were və There will be. Həmçinin some, any, no, much, many və a lot of sözlərini dəqiq işlətməyi öyrənəcəksiniz.",
    ru: "В этом уроке вы переносите рамку существования в прошедшее и будущее время: There was / There were и There will be. Также вы научитесь точно употреблять some, any, no, much, many и a lot of.",
  },
  sections: [
    {
      id: "idea",
      title: { az: "1. Əsas fikir: dəyişən yalnız \"be\" feilidir", ru: "1. Главная идея: меняется только глагол «be»" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Mövcudluq çərçivəsinin quruluşu bütün zamanlarda eynidir: There + be + nə + harada/nə vaxt. Zamanı göstərən yeganə hissə \"be\" feilidir. İndiki zamanda is/are, keçmişdə was/were, gələcəkdə will be. Yəni 1-ci gündə öyrəndiyiniz hər şey (artikllər, tək və cəm, sual və inkar) burada da eynilə işləyir.",
            ru: "Структура рамки существования одинакова во всех временах: There + be + что + где/когда. Время показывает только глагол «be»: в настоящем is/are, в прошедшем was/were, в будущем will be. Значит, всё, что вы выучили в 1-й день (артикли, число, вопрос и отрицание), здесь работает точно так же.",
          },
        },
        {
          kind: "formula",
          label: { az: "Keçmiş zaman", ru: "Прошедшее время" },
          parts: [
            { text: "There", role: "there", note: { az: "Formal başlanğıc.", ru: "Формальное начало." } },
            { text: "was / were", role: "be", note: { az: "Tək və sayılmayan isimlə was, cəm isimlə were.", ru: "С единственным числом и неисчисляемыми — was, с множественным — were." } },
            { text: "a party / many guests", role: "object", note: { az: "Mövcud olmuş şey.", ru: "То, что было." } },
            { text: "last night", role: "time", note: { az: "Nə vaxt? Keçmiş zaman ifadəsi.", ru: "Когда? Выражение прошедшего времени." } },
          ],
          example: "There was a party last night.",
        },
        {
          kind: "formula",
          label: { az: "Gələcək zaman", ru: "Будущее время" },
          parts: [
            { text: "There", role: "there", note: { az: "Formal başlanğıc.", ru: "Формальное начало." } },
            { text: "will be", role: "be", note: { az: "Tək və cəm üçün eynidir: will be heç vaxt dəyişmir.", ru: "Одинаково для единственного и множественного числа: will be не меняется." } },
            { text: "a concert", role: "object", note: { az: "Olacaq şey.", ru: "То, что будет." } },
            { text: "tomorrow", role: "time", note: { az: "Nə vaxt? Gələcək zaman ifadəsi.", ru: "Когда? Выражение будущего времени." } },
          ],
          example: "There will be a concert tomorrow.",
        },
      ],
    },
    {
      id: "forms",
      title: { az: "2. Bütün formalar bir cədvəldə", ru: "2. Все формы в одной таблице" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Zaman", ru: "Время" }, { az: "Təsdiq", ru: "Утверждение" }, { az: "İnkar", ru: "Отрицание" }, { az: "Sual və qısa cavab", ru: "Вопрос и краткий ответ" }],
          rows: [
            ["Past, singular", "There was a problem.", "There wasn't a problem. / There was no problem.", "Was there a problem? — Yes, there was. / No, there wasn't."],
            ["Past, plural", "There were two problems.", "There weren't any problems. / There were no problems.", "Were there any problems? — Yes, there were. / No, there weren't."],
            ["Future", "There will be a test.", "There won't be a test. / There will be no test.", "Will there be a test? — Yes, there will. / No, there won't."],
            ["Future (plan)", "There is going to be a meeting.", "There isn't going to be a meeting.", "Is there going to be a meeting?"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Gələcəkdə sual qurarkən \"will\" sözü \"there\"-dən əvvələ keçir, \"be\" isə yerində qalır: There will be → Will there be? Qısa cavabda \"be\" deyilmir: \"Yes, there will\". \"Won't\" sözü \"will not\"-un ixtisarıdır və danışıqda çox işlənir.",
            ru: "В вопросе в будущем времени «will» переходит перед «there», а «be» остаётся на месте: There will be → Will there be? В кратком ответе «be» не говорят: «Yes, there will». «Won't» — сокращение от «will not», очень частое в речи.",
          },
        },
        {
          kind: "p",
          text: {
            az: "\"There is going to be\" planlaşdırılmış və ya əlamətləri görünən gələcək hadisə üçün işlənir: \"Look at those clouds. There's going to be a storm.\" (Buludlara bax, fırtına olacaq.) \"There will be\" isə daha ümumi proqnoz və ya rəsmi elan üçündür: \"There will be a short break at 11.\"",
            ru: "«There is going to be» используется для запланированного события или события, признаки которого уже видны: «Look at those clouds. There's going to be a storm.» (Посмотри на тучи, будет буря.) «There will be» — для более общего прогноза или официального объявления: «There will be a short break at 11.»",
          },
        },
      ],
    },
    {
      id: "time",
      title: { az: "3. Zaman ifadələri (siqnal sözlər)", ru: "3. Выражения времени (слова-сигналы)" },
      blocks: [
        {
          kind: "signals",
          words: ["yesterday", "last night", "last week", "last year", "two days ago", "in 2010", "when I was a child", "then"],
          text: {
            az: "Bu ifadələr keçmiş zamanı göstərir. Onları görəndə There was / There were işlədin. \"Ago\" həmişə müddətdən sonra gəlir: \"three years ago\" (üç il əvvəl), \"ago three years\" yox.",
            ru: "Эти выражения указывают на прошлое. Увидев их, используйте There was / There were. «Ago» всегда стоит после периода: «three years ago» (три года назад), а не «ago three years».",
          },
        },
        {
          kind: "signals",
          words: ["tomorrow", "tonight", "next week", "next year", "in two days", "soon", "in the future", "on Monday"],
          text: {
            az: "Bu ifadələr gələcəyi göstərir. \"In two days\" — iki gündən sonra deməkdir (indidən hesablayaraq). \"Next week\" ilə \"the next week\" fərqlidir: \"next week\" gələn həftə, \"the next week\" keçmişdəki hekayədə \"sonrakı həftə\".",
            ru: "Эти выражения указывают на будущее. «In two days» значит «через два дня» (считая от сейчас). «Next week» и «the next week» различаются: «next week» — на следующей неделе, «the next week» — «на следующей неделе» в рассказе о прошлом.",
          },
        },
      ],
    },
    {
      id: "quantity",
      title: { az: "4. Some, any, no, much, many, a lot of", ru: "4. Some, any, no, much, many, a lot of" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Söz", ru: "Слово" }, { az: "Hansı isimlə", ru: "С какими существительными" }, { az: "Harada", ru: "Где" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["some", "countable plural + uncountable", "+", "There were some students. There was some rain."],
            ["any", "countable plural + uncountable", "− and ?", "There weren't any students. Was there any rain?"],
            ["no", "both", "+ verb (negative meaning)", "There were no students. There was no rain."],
            ["many", "countable plural", "mostly − and ?", "There weren't many cars. Were there many people?"],
            ["much", "uncountable", "mostly − and ?", "There wasn't much time. Is there much traffic?"],
            ["a lot of / lots of", "both", "+ (also − and ?)", "There were a lot of cars. There was a lot of noise."],
            ["a few / a little", "countable / uncountable", "+", "There are a few shops. There is a little sugar."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Danışıq dilində təsdiq cümlələrində \"many\" və \"much\" əvəzinə daha çox \"a lot of\" işlənir: \"There was a lot of snow\" təbii səslənir, \"There was much snow\" isə kitab dilidir. İnkar və suallarda isə \"much\" və \"many\" tamamilə təbiidir: \"There isn't much time.\"",
            ru: "В разговорной речи в утвердительных предложениях вместо «many» и «much» чаще говорят «a lot of»: «There was a lot of snow» звучит естественно, а «There was much snow» — книжно. В отрицаниях и вопросах «much» и «many» вполне естественны: «There isn't much time.»",
          },
        },
        {
          kind: "p",
          text: {
            az: "\"A few\" və \"a little\" müsbət məna verir (\"bir neçə, bir az — kifayət qədər\"). Artiklsız \"few\" və \"little\" isə mənfi məna daşıyır (\"çox az, demək olar ki, yox\"): \"There were few people\" — adam az idi (təəssüf ki). Başlanğıc səviyyədə \"a few / a little\" daha çox lazımdır.",
            ru: "«A few» и «a little» имеют положительный оттенок («несколько, немного — достаточно»). Без артикля «few» и «little» имеют отрицательный оттенок («мало, почти нет»): «There were few people» — людей было мало (к сожалению). На начальном уровне чаще нужны «a few / a little».",
          },
        },
      ],
    },
    {
      id: "questions",
      title: { az: "5. Sual sözləri ilə suallar", ru: "5. Вопросы с вопросительными словами" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "How many people were there at the wedding?", az: "Toyda neçə nəfər var idi?", ru: "Сколько людей было на свадьбе?" },
            { en: "How much money was there in the wallet?", az: "Pul kisəsində nə qədər pul var idi?", ru: "Сколько денег было в кошельке?" },
            { en: "What was there in the box?", az: "Qutuda nə var idi?", ru: "Что было в коробке?" },
            { en: "When will there be a train to Ganja?", az: "Gəncəyə qatar nə vaxt olacaq?", ru: "Когда будет поезд в Гянджу?" },
          ],
        },
        {
          kind: "p",
          text: {
            az: "Quruluş: sual sözü + was/were/will + there + ...? \"How many\" sayılan cəm isimlə, \"how much\" sayılmayan isimlə işlənir.",
            ru: "Структура: вопросительное слово + was/were/will + there + ...? «How many» — с исчисляемыми во множественном числе, «how much» — с неисчисляемыми.",
          },
        },
      ],
    },
    {
      id: "directions",
      title: { az: "6. Real həyatda: yol soruşmaq və göstərmək", ru: "6. В жизни: спросить и объяснить дорогу" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Mövcudluq çərçivəsi yol soruşanda ən çox işlənən strukturdur. Yad şəhərdə ilk sualınız adətən \"Is there a … near here?\" olur. Cavab verən də eyni çərçivədən istifadə edir.",
            ru: "Рамка существования чаще всего нужна, когда спрашиваешь дорогу. В незнакомом городе первый вопрос обычно «Is there a … near here?». Отвечающий тоже использует эту рамку.",
          },
        },
        {
          kind: "examples",
          items: [
            { en: "Excuse me, is there a metro station near here?", az: "Bağışlayın, buralarda metro stansiyası var?", ru: "Извините, здесь поблизости есть станция метро?" },
            { en: "Yes, there is. Go straight and turn left. There's a big supermarket on the corner.", az: "Bəli, var. Düz gedin və sola dönün. Tində böyük supermarket var.", ru: "Да, есть. Идите прямо и поверните налево. На углу большой супермаркет." },
            { en: "There used to be a bank here, but there isn't one now.", az: "Əvvəllər burada bank var idi, amma indi yoxdur.", ru: "Раньше здесь был банк, а теперь его нет." },
            { en: "There will be a new bus line next year.", az: "Gələn il yeni avtobus xətti olacaq.", ru: "В следующем году будет новая автобусная линия." },
          ],
        },
      ],
    },
    {
      id: "compare",
      title: { az: "7. Müqayisə: There was vs It was, There will be vs I will have", ru: "7. Сравнение: There was и It was, There will be и I will have" },
      blocks: [
        {
          kind: "compare",
          items: [
            {
              en: "There was a concert yesterday. It was great.",
              text: {
                az: "There was hadisəni təqdim edir (konsert oldu), It was onu qiymətləndirir (əla idi). \"Yesterday was a concert\" deyilmir.",
                ru: "There was вводит событие (был концерт), It was оценивает его (было отлично). Нельзя сказать «Yesterday was a concert».",
              },
            },
            {
              en: "There will be a lot of guests. / We will have a lot of guests.",
              text: {
                az: "Hər ikisi düzgündür. Birinci cümlə hadisəni neytral təsvir edir, ikinci isə \"bizim\" qonaqlarımızdan danışır (sahiblik çərçivəsi).",
                ru: "Оба варианта верны. Первое предложение нейтрально описывает событие, второе говорит о «наших» гостях (рамка обладания).",
              },
            },
            {
              en: "There were no tickets. / There weren't any tickets.",
              text: {
                az: "Məna eynidir. \"No\" bir az daha qəti və emosional səslənir: \"Heç bilet yox idi!\"",
                ru: "Смысл одинаковый. «No» звучит чуть категоричнее и эмоциональнее: «Билетов не было вообще!»",
              },
            },
          ],
        },
      ],
    },
    {
      id: "examples",
      title: { az: "8. Nümunələr və tərcümələr", ru: "8. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "There was a lot of traffic this morning.", az: "Bu səhər tıxac çox idi.", ru: "Сегодня утром были большие пробки." },
            { en: "There were five people in the lift.", az: "Liftdə beş nəfər var idi.", ru: "В лифте было пять человек." },
            { en: "There wasn't any bread, so I went to the shop.", az: "Çörək yox idi, ona görə mağazaya getdim.", ru: "Хлеба не было, поэтому я сходил в магазин." },
            { en: "Were there many tourists in Sheki?", az: "Şəkidə turist çox idi?", ru: "В Шеки было много туристов?" },
            { en: "There will be rain on Sunday.", az: "Bazar günü yağış olacaq.", ru: "В воскресенье будет дождь." },
            { en: "There won't be any lessons next Monday.", az: "Gələn bazar ertəsi dərs olmayacaq.", ru: "В следующий понедельник уроков не будет." },
            { en: "Will there be food at the party?", az: "Məclisdə yemək olacaq?", ru: "На вечеринке будет еда?" },
            { en: "There were no seats, so we stood.", az: "Yer yox idi, ona görə ayaq üstə dayandıq.", ru: "Мест не было, поэтому мы стояли." },
            { en: "There was a little milk left.", az: "Bir az süd qalmışdı.", ru: "Оставалось немного молока." },
            { en: "There's going to be a big sale this weekend.", az: "Bu həftə sonu böyük endirim olacaq.", ru: "В эти выходные будет большая распродажа." },
            { en: "How many questions were there in the test? — There were twenty.", az: "Testdə neçə sual var idi? — İyirmi.", ru: "Сколько вопросов было в тесте? — Двадцать." },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "9. Tipik səhvlər", ru: "9. Типичные ошибки" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "There was many people.", right: "There were many people.", why: { az: "People cəmdir, buna görə keçmişdə \"were\".", ru: "People — множественное число, поэтому в прошедшем «were»." } },
            { wrong: "There will have a meeting.", right: "There will be a meeting.", why: { az: "Mövcudluq çərçivəsində feil həmişə \"be\"-dir. \"Olacaq\" sözünü \"have\" ilə tərcümə etməyin.", ru: "В рамке существования глагол всегда «be». Не переводите «будет» как «have»." } },
            { wrong: "Will be there a meeting?", right: "Will there be a meeting?", why: { az: "Sualda yalnız \"will\" önə keçir; \"be\" \"there\"-dən sonra qalır.", ru: "В вопросе вперёд выходит только «will»; «be» остаётся после «there»." } },
            { wrong: "Yesterday was a party in our street.", right: "There was a party in our street yesterday.", why: { az: "Ana dildən söz sırası köçürülüb. Yeni hadisəni There was ilə təqdim edin, zamanı sona qoyun.", ru: "Перенесён порядок слов из родного языка. Вводите новое событие через There was, время ставьте в конец." } },
            { wrong: "There wasn't no water.", right: "There wasn't any water. / There was no water.", why: { az: "İki inkar olmaz: ya \"wasn't any\", ya da \"was no\".", ru: "Двойного отрицания не бывает: либо «wasn't any», либо «was no»." } },
            { wrong: "There were a lot of information.", right: "There was a lot of information.", why: { az: "Information sayılmayandır, həmişə tək: was.", ru: "Information — неисчисляемое, всегда единственное число: was." } },
            { wrong: "Is there will be a bus?", right: "Will there be a bus?", why: { az: "İki köməkçi feil (is və will) birlikdə işlənmir. Gələcəkdə yalnız \"will\".", ru: "Два вспомогательных глагола (is и will) вместе не используются. В будущем — только «will»." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Keçmiş: There was (tək/sayılmayan), There were (cəm).", ru: "Прошедшее: There was (единственное/неисчисляемое), There were (множественное)." },
    { az: "Gələcək: There will be hər kəs üçün eynidir. Sual: Will there be…?", ru: "Будущее: There will be одинаково для всех. Вопрос: Will there be…?" },
    { az: "Some təsdiqdə, any inkar və sualda, no isə \"be\"-nin təsdiq forması ilə inkar mənasında.", ru: "Some — в утверждении, any — в отрицании и вопросе, no — с утвердительным «be» в значении отрицания." },
    { az: "Many sayılan, much sayılmayan isimlə; təsdiqdə daha çox a lot of işlənir.", ru: "Many — с исчисляемыми, much — с неисчисляемыми; в утверждении чаще используют a lot of." },
  ],
};
