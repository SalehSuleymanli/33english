import type { Teach } from "./types";

export const TEACH_11: Teach = {
  day: 11,
  summary: {
    az: "Bu dərsdə altıncı çərçivəni, məchul növü (Passive Voice) öyrənirsiniz: Object + be + V3. Məchul növ diqqəti hərəkəti edəndən hərəkətin nəticəsinə və ya obyektə yönəldir. Xəbərlərdə, rəsmi mətnlərdə, təlimatlarda və elmi yazılarda çox işlənir.",
    ru: "В этом уроке вы изучаете шестую рамку — страдательный залог (Passive Voice): Object + be + V3. Пассив переносит внимание с того, кто действует, на результат действия или на предмет. Он очень распространён в новостях, официальных текстах, инструкциях и научных статьях.",
  },
  sections: [
    {
      id: "meaning",
      title: { az: "1. Məchul növ nədir və nə üçündür?", ru: "1. Что такое пассив и зачем он нужен?" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Məlum növdə (Active) cümlə hərəkəti edəndən başlayır: \"Workers built this bridge in 1990\" — İşçilər bu körpünü 1990-cı ildə tikdilər. Məchul növdə (Passive) isə cümlə hərəkətin obyektindən başlayır: \"This bridge was built in 1990\" — Bu körpü 1990-cı ildə tikilib. Azərbaycan dilində bu, \"-ıl, -in\" şəkilçiləri ilə verilir: tikilmək, yazılmaq, satılmaq.",
            ru: "В действительном залоге (Active) предложение начинается с того, кто действует: «Workers built this bridge in 1990» — Рабочие построили этот мост в 1990 году. В страдательном залоге (Passive) предложение начинается с объекта действия: «This bridge was built in 1990» — Этот мост был построен в 1990 году. По-русски это формы «построен», «написан», «продаётся».",
          },
        },
        {
          kind: "p",
          text: {
            az: "Passive üç əsas halda seçilir: 1) hərəkəti kimin etdiyi bilinmir (\"My bike was stolen\" — velosipedim oğurlanıb); 2) kimin etdiyi vacib deyil və ya aydındır (\"English is spoken here\"); 3) diqqət nəticəyə yönəldilməlidir (xəbərlər, hesabatlar, təlimatlar: \"The road will be closed on Sunday\").",
            ru: "Пассив выбирают в трёх основных случаях: 1) неизвестно, кто совершил действие («My bike was stolen» — мой велосипед украли); 2) кто совершил — неважно или очевидно («English is spoken here»); 3) внимание нужно перенести на результат (новости, отчёты, инструкции: «The road will be closed on Sunday»).",
          },
        },
        {
          kind: "formula",
          label: { az: "Məchul növün formulu", ru: "Формула пассива" },
          parts: [
            { text: "The bridge", role: "subject", note: { az: "Hərəkətin obyekti indi mübtəda olur.", ru: "Объект действия становится подлежащим." } },
            { text: "was", role: "be", note: { az: "\"Be\" zamanı göstərir: is/are, was/were, will be və s.", ru: "«Be» показывает время: is/are, was/were, will be и т. д." } },
            { text: "built", role: "verb", note: { az: "Feilin üçüncü forması (V3, past participle). Heç vaxt dəyişmir.", ru: "Третья форма глагола (V3, причастие прошедшего времени). Не изменяется." } },
            { text: "in 1990", role: "time", note: { az: "Nə vaxt / harada (istəyə bağlı).", ru: "Когда / где (необязательно)." } },
            { text: "(by …)", role: "other", note: { az: "Kim tərəfindən — yalnız vacib olanda.", ru: "Кем — только когда это важно." } },
          ],
          example: "The bridge was built in 1990.",
        },
      ],
    },
    {
      id: "v3",
      title: { az: "2. V3: feilin üçüncü forması", ru: "2. V3: третья форма глагола" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Düzgün feillərdə V3 keçmiş forma ilə eynidir: work → worked → worked, clean → cleaned → cleaned. Düzgün olmayan feillərin V3-ü xüsusi formadır və onu 6-cı gündəki cədvəldən öyrənməlisiniz. Passive-də ən çox işlənənlər bunlardır:",
            ru: "У правильных глаголов V3 совпадает с прошедшей формой: work → worked → worked, clean → cleaned → cleaned. У неправильных V3 — особая форма, её нужно выучить по таблице из 6-го дня. В пассиве чаще всего встречаются:",
          },
        },
        {
          kind: "table",
          head: [{ az: "V1", ru: "V1" }, { az: "V3", ru: "V3" }, { az: "Passive nümunə", ru: "Пример в пассиве" }],
          rows: [
            ["make", "made", "These shoes are made in Italy."],
            ["build", "built", "The house was built last year."],
            ["write", "written", "The book was written in 1925."],
            ["speak", "spoken", "Azerbaijani is spoken here."],
            ["take", "taken", "The photo was taken in Sheki."],
            ["give", "given", "We were given a map."],
            ["find", "found", "The keys were found in the car."],
            ["send", "sent", "The documents will be sent tomorrow."],
            ["steal", "stolen", "My wallet was stolen."],
            ["sell", "sold", "Tickets are sold online."],
          ],
        },
      ],
    },
    {
      id: "transform",
      title: { az: "3. Active-dən Passive-ə: addım-addım", ru: "3. Из Active в Passive: шаг за шагом" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Addım", ru: "Шаг" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["Active sentence", "The police arrested two men."],
            ["1. object → new subject", "Two men …"],
            ["2. be in the same tense as the active verb", "Two men were …"],
            ["3. main verb → V3", "Two men were arrested …"],
            ["4. add by + doer only if useful", "Two men were arrested (by the police)."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Diqqət: passive yalnız tamamlığı olan (transitiv) feillərdən düzəlir. \"Arrive\", \"happen\", \"sleep\", \"die\" kimi feillərin obyekti yoxdur, ona görə \"It was happened\" demək mümkün deyil: düzgünü \"It happened\".",
            ru: "Внимание: пассив образуется только от глаголов с дополнением (переходных). У «arrive», «happen», «sleep», «die» нет объекта, поэтому «It was happened» сказать нельзя: правильно «It happened».",
          },
        },
      ],
    },
    {
      id: "tenses",
      title: { az: "4. Passive bütün zamanlarda", ru: "4. Пассив во всех временах" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Passive-də V3 heç vaxt dəyişmir. Zamanı yalnız \"be\" göstərir. Ona görə hər zamanın passive-ini qurmaq üçün \"be\"-ni həmin zamana salmaq kifayətdir.",
            ru: "В пассиве V3 не меняется никогда. Время показывает только «be». Поэтому, чтобы построить пассив в любом времени, достаточно поставить «be» в это время.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Zaman", ru: "Время" }, { az: "Passive forma", ru: "Форма пассива" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["Present Simple", "am / is / are + V3", "The office is cleaned every evening."],
            ["Past Simple", "was / were + V3", "The letter was sent yesterday."],
            ["Future Simple", "will be + V3", "The results will be announced on Friday."],
            ["Present Continuous", "am / is / are being + V3", "The road is being repaired."],
            ["Past Continuous", "was / were being + V3", "The car was being washed when I arrived."],
            ["Present Perfect", "has / have been + V3", "The project has been finished. (Day 20)"],
            ["with modals", "modal + be + V3", "This must be done today. It can be fixed."],
          ],
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["−", "The room wasn't cleaned. The tickets won't be sold online."],
            ["?", "Was the room cleaned? Is breakfast included? When was this church built?"],
            ["Short answers", "Yes, it was. / No, it wasn't."],
          ],
        },
      ],
    },
    {
      id: "by",
      title: { az: "5. By: kim tərəfindən", ru: "5. By: кем" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Passive cümlələrin əksəriyyətində icraçı göstərilmir, çünki elə passive-in mənası budur. \"By\" ilə icraçını yalnız o, yeni və vacib məlumat olanda deyin: \"Hamlet was written by Shakespeare.\" \"The phone was taken by me\" kimi cümlələr qeyri-təbiidir: əgər icraçı \"mən\"-əmsə, active işlədin: \"I took the phone.\"",
            ru: "В большинстве пассивных предложений исполнитель не указывается — в этом и смысл пассива. Называйте исполнителя через «by», только если это новая и важная информация: «Hamlet was written by Shakespeare.» Фразы вроде «The phone was taken by me» звучат неестественно: если исполнитель — «я», используйте актив: «I took the phone.»",
          },
        },
      ],
    },
    {
      id: "compare",
      title: { az: "6. Müqayisə", ru: "6. Сравнение" },
      blocks: [
        {
          kind: "compare",
          items: [
            { en: "Someone cleans the office. / The office is cleaned.", text: { az: "Məna eynidir. Passive \"someone\" kimi qeyri-müəyyən icraçını aradan qaldırır və cümlə daha təbii olur.", ru: "Смысл одинаковый. Пассив убирает неопределённого исполнителя вроде «someone», и фраза звучит естественнее." } },
            { en: "The door is closed. / The door is closing.", text: { az: "\"Is closed\" — vəziyyətdir (qapı bağlıdır). \"Is closing\" — proses (qapı bağlanır, active continuous).", ru: "«Is closed» — состояние (дверь закрыта). «Is closing» — процесс (дверь закрывается, active continuous)." } },
            { en: "I was born in 1999.", text: { az: "Bu cümlə də passive-dir: \"bear\" (doğmaq) feilinin V3 forması \"born\". Ona görə \"was\" mütləqdir.", ru: "Это тоже пассив: «born» — V3 от «bear» (рожать). Поэтому «was» обязателен." } },
          ],
        },
      ],
    },
    {
      id: "examples",
      title: { az: "7. Nümunələr və tərcümələr", ru: "7. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "Breakfast is served from 7 to 10.", az: "Səhər yeməyi 7-dən 10-a qədər verilir.", ru: "Завтрак подаётся с 7 до 10." },
            { en: "This carpet was made by hand.", az: "Bu xalça əllə toxunub.", ru: "Этот ковёр сделан вручную." },
            { en: "The Maiden Tower was built in the 12th century.", az: "Qız qalası XII əsrdə tikilib.", ru: "Девичья башня была построена в XII веке." },
            { en: "The meeting has been cancelled.", az: "İclas ləğv edilib.", ru: "Совещание отменили." },
            { en: "Your order will be delivered tomorrow.", az: "Sifarişiniz sabah çatdırılacaq.", ru: "Ваш заказ будет доставлен завтра." },
            { en: "Is service included in the bill?", az: "Xidmət haqqı hesaba daxildir?", ru: "Обслуживание включено в счёт?" },
            { en: "Photos must not be taken in the museum.", az: "Muzeydə şəkil çəkmək olmaz.", ru: "В музее фотографировать нельзя." },
            { en: "My car is being repaired, so I took a taxi.", az: "Maşınım təmir olunur, ona görə taksiyə mindim.", ru: "Мою машину ремонтируют, поэтому я взял такси." },
            { en: "Where were these photos taken?", az: "Bu şəkillər harada çəkilib?", ru: "Где были сделаны эти фотографии?" },
            { en: "Nobody was injured in the accident.", az: "Qəzada heç kim xəsarət almayıb.", ru: "В аварии никто не пострадал." },
            { en: "The new metro station will be opened next year.", az: "Yeni metro stansiyası gələn il açılacaq.", ru: "Новая станция метро откроется в следующем году." },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "8. Tipik səhvlər", ru: "8. Типичные ошибки" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "The house built in 1990.", right: "The house was built in 1990.", why: { az: "\"Be\" buraxılıb. Onsuz cümlə \"ev nəyisə tikdi\" mənasını verir.", ru: "Пропущен «be». Без него получается «дом построил что-то»." } },
            { wrong: "The letter was wrote yesterday.", right: "The letter was written yesterday.", why: { az: "Passive-də V3 lazımdır: write → wrote → written.", ru: "В пассиве нужен V3: write → wrote → written." } },
            { wrong: "It was happened last week.", right: "It happened last week.", why: { az: "Happen obyektsiz feildir, passive olmur.", ru: "Happen — непереходный глагол, пассива у него нет." } },
            { wrong: "English speaks in many countries.", right: "English is spoken in many countries.", why: { az: "İngilis dili özü danışmır; onda danışırlar. Passive lazımdır.", ru: "Английский сам не говорит — на нём говорят. Нужен пассив." } },
            { wrong: "The phone was taken from me by me.", right: "I took the phone.", why: { az: "İcraçı \"mən\"-əmsə, active daha təbiidir.", ru: "Если исполнитель — «я», актив звучит естественнее." } },
            { wrong: "The results will announced soon.", right: "The results will be announced soon.", why: { az: "Gələcəkdə passive: will + be + V3.", ru: "Пассив в будущем: will + be + V3." } },
            { wrong: "The road is repairing now.", right: "The road is being repaired now.", why: { az: "Yol özü təmir etmir. Prosesdə olan passive: is being + V3.", ru: "Дорога сама себя не ремонтирует. Пассив в процессе: is being + V3." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Passive: obyekt + be + V3. Diqqət nəticəyə yönəlir.", ru: "Пассив: объект + be + V3. Внимание — на результате." },
    { az: "Zamanı yalnız \"be\" göstərir: is done, was done, will be done, is being done, has been done.", ru: "Время показывает только «be»: is done, was done, will be done, is being done, has been done." },
    { az: "By + icraçı yalnız vacib olanda.", ru: "By + исполнитель — только когда это важно." },
    { az: "Obyektsiz feillər (happen, arrive) passive olmur.", ru: "Непереходные глаголы (happen, arrive) пассива не имеют." },
  ],
};
