import type { Teach } from "./types";

export const TEACH_29: Teach = {
  day: 29,
  summary: {
    az: "Bu dərsdə modal feilləri keçmişə tətbiq edirsiniz: modal + have + V3. Bu quruluşla peşmanlıq (I should have called), tənqid (You shouldn't have said that), keçmiş haqqında məntiqi nəticə (She must have forgotten) və baş verməmiş imkanları (I could have won) ifadə edirsiniz.",
    ru: "В этом уроке вы применяете модальные глаголы к прошлому: модальный + have + V3. Так выражаются сожаление (I should have called), упрёк (You shouldn't have said that), логический вывод о прошлом (She must have forgotten) и несостоявшиеся возможности (I could have won).",
  },
  sections: [
    {
      id: "formula",
      title: { az: "1. Formula və əsas ideya", ru: "1. Формула и главная идея" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Modal feillərin keçmiş forması yoxdur (should, must, might dəyişmir). Keçmiş haqqında danışmaq üçün onlardan sonra \"have + V3\" qoyulur. Burada \"have\" heç vaxt \"has\" və ya \"had\" olmur və sahiblik mənası daşımır — sadəcə keçmişi göstərir.",
            ru: "У модальных глаголов нет прошедшей формы (should, must, might не меняются). Чтобы говорить о прошлом, после них ставится «have + V3». Здесь «have» никогда не превращается в «has» или «had» и не означает обладание — он просто показывает прошлое.",
          },
        },
        {
          kind: "formula",
          label: { az: "Modal + have + V3", ru: "Модальный + have + V3" },
          parts: [
            { text: "I", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "should", role: "modal", note: { az: "Modal: should, could, must, might, may, can't, would.", ru: "Модальный: should, could, must, might, may, can't, would." } },
            { text: "have", role: "aux", note: { az: "Həmişə \"have\", bütün şəxslər üçün.", ru: "Всегда «have», для всех лиц." } },
            { text: "called", role: "verb", note: { az: "Feilin üçüncü forması (V3).", ru: "Третья форма глагола (V3)." } },
            { text: "you", role: "object", note: { az: "Tamamlıq.", ru: "Дополнение." } },
          ],
          example: "I should have called you.",
        },
        {
          kind: "p",
          text: {
            az: "Danışıqda \"have\" çox zəif oxunur və yazıda bəzən ixtisar olunur: should've, could've, must've. Bu, \"of\" kimi eşidilir, ona görə ana dili ingiliscə olanlar belə bəzən səhvən \"should of\" yazırlar. Doğrusu həmişə \"should have\"-dır.",
            ru: "В речи «have» звучит очень слабо и на письме иногда сокращается: should've, could've, must've. На слух это похоже на «of», поэтому даже носители иногда ошибочно пишут «should of». Правильно всегда «should have».",
          },
        },
      ],
    },
    {
      id: "meanings",
      title: { az: "2. Hər modalın keçmişdəki mənası", ru: "2. Значение каждого модального в прошлом" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["should have + V3", "regret / criticism: it was right, but it didn't happen", "I should have studied more. You should have told me."],
            ["shouldn't have + V3", "it happened, but it was wrong", "I shouldn't have eaten so much."],
            ["could have + V3", "possible, but didn't happen", "We could have taken a taxi."],
            ["couldn't have + V3", "impossible in the past", "She couldn't have known. Nobody told her."],
            ["must have + V3", "I'm almost sure it happened (deduction)", "He must have forgotten. He's never late."],
            ["can't have + V3", "I'm almost sure it didn't happen", "You can't have seen Ali. He's in Paris."],
            ["might / may have + V3", "maybe it happened", "She might have missed the bus."],
            ["would have + V3", "imagined past result (Day 22)", "I would have come, but I was ill."],
          ],
        },
      ],
    },
    {
      id: "regret",
      title: { az: "3. Peşmanlıq və tənqid: should have", ru: "3. Сожаление и упрёк: should have" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Should have\" keçmişdə doğru olan, amma edilməyən şeyi bildirir: \"I should have listened to you\" — səni dinləməli idim (dinləmədim, peşmanam). Başqasına deyiləndə tənqiddir: \"You should have asked me first\" — əvvəlcə məndən soruşmalı idin. Azərbaycan dilində \"-malı idim\", rus dilində «надо было», «стоило» qarşılığıdır.",
            ru: "«Should have» выражает то, что было бы правильно сделать, но не было сделано: «I should have listened to you» — надо было тебя послушать (не послушал, жалею). Сказанное другому — упрёк: «You should have asked me first» — надо было сначала спросить меня. По-русски: «надо было», «стоило».",
          },
        },
      ],
    },
    {
      id: "deduction",
      title: { az: "4. Keçmiş haqqında məntiqi nəticə: must have, can't have, might have", ru: "4. Логический вывод о прошлом: must have, can't have, might have" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Bir şeyi görməmisiniz, amma əlamətlərə əsasən nəticə çıxarırsınız. \"The ground is wet. It must have rained\" — yer yaşdır, yəqin yağış yağıb (90% əminəm). \"She can't have finished already. She started five minutes ago\" — artıq bitirmiş ola bilməz (əminəm ki, yox). \"He might have gone home\" — bəlkə evə gedib (əmin deyiləm).",
            ru: "Вы не видели события, но делаете вывод по признакам. «The ground is wet. It must have rained» — земля мокрая, наверное, шёл дождь (уверен на 90%). «She can't have finished already. She started five minutes ago» — не может быть, что она уже закончила (уверен, что нет). «He might have gone home» — возможно, он ушёл домой (не уверен).",
          },
        },
        {
          kind: "tip",
          text: {
            az: "Diqqət: \"must have\" burada məcburiyyət deyil, əminlikdir. Keçmişdəki məcburiyyət üçün \"had to\" işlənir: \"I had to leave early\" (tez getməli oldum).",
            ru: "Внимание: «must have» здесь означает не обязанность, а уверенность. Для обязанности в прошлом используется «had to»: «I had to leave early» (мне пришлось уйти рано).",
          },
        },
      ],
    },
    {
      id: "forms",
      title: { az: "5. İnkar və sual", ru: "5. Отрицание и вопрос" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["−", "You shouldn't have shouted. He couldn't have done it alone."],
            ["?", "Should I have called him? Could they have missed the train?"],
            ["contraction (speech)", "should've, could've, must've, might've"],
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
            { en: "I should have brought an umbrella.", az: "Çətir götürməli idim.", ru: "Надо было взять зонт." },
            { en: "You shouldn't have paid for everything.", az: "Hər şeyin pulunu sən ödəməməli idin.", ru: "Зря ты за всё заплатил." },
            { en: "We could have won the match.", az: "Oyunu qazana bilərdik.", ru: "Мы могли выиграть матч." },
            { en: "She must have been very tired.", az: "Yəqin ki, çox yorğun idi.", ru: "Она, должно быть, очень устала." },
            { en: "They can't have left already. Their car is still here.", az: "Onlar artıq gedə bilməzdilər. Maşınları hələ buradadır.", ru: "Не может быть, что они уже ушли. Их машина ещё здесь." },
            { en: "I might have left my wallet in the taxi.", az: "Bəlkə pul kisəmi taksidə qoymuşam.", ru: "Возможно, я оставил кошелёк в такси." },
            { en: "He may have misunderstood you.", az: "Bəlkə səni səhv başa düşüb.", ru: "Возможно, он тебя неправильно понял." },
            { en: "You could have told me earlier!", az: "Mənə əvvəlcədən deyə bilərdin!", ru: "Мог бы сказать мне раньше!" },
            { en: "I shouldn't have said that. I'm sorry.", az: "Bunu deməməli idim. Bağışla.", ru: "Не стоило мне это говорить. Прости." },
            { en: "Someone must have taken my seat.", az: "Yəqin kimsə yerimi tutub.", ru: "Наверное, кто-то занял моё место." },
            { en: "It could have been worse.", az: "Daha pis ola bilərdi.", ru: "Могло быть и хуже." },
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
            { wrong: "I should called you.", right: "I should have called you.", why: { az: "\"Have\" buraxılıb; keçmiş üçün modal + have + V3.", ru: "Пропущен «have»; для прошлого — модальный + have + V3." } },
            { wrong: "She must has forgotten.", right: "She must have forgotten.", why: { az: "Modaldan sonra həmişə \"have\".", ru: "После модального всегда «have»." } },
            { wrong: "I should have went.", right: "I should have gone.", why: { az: "Have-dən sonra V3.", ru: "После have — V3." } },
            { wrong: "I should of known.", right: "I should have known.", why: { az: "\"Of\" səs oxşarlığından yaranan səhvdir.", ru: "«Of» — ошибка из-за похожего звучания." } },
            { wrong: "Yesterday I must have stayed at work until 9 (= it was necessary).", right: "Yesterday I had to stay at work until 9.", why: { az: "Keçmiş məcburiyyət had to ilə; must have əminlik bildirir.", ru: "Обязанность в прошлом — had to; must have выражает уверенность." } },
            { wrong: "He can't have be there.", right: "He can't have been there.", why: { az: "Be-nin V3 forması been.", ru: "V3 от be — been." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Modal + have + V3 — keçmiş haqqında.", ru: "Модальный + have + V3 — о прошлом." },
    { az: "Should have — peşmanlıq/tənqid; could have — baş verməyən imkan.", ru: "Should have — сожаление/упрёк; could have — несостоявшаяся возможность." },
    { az: "Must have — yəqin oldu; can't have — ola bilməz; might/may have — bəlkə oldu.", ru: "Must have — наверняка было; can't have — не может быть; might/may have — возможно, было." },
    { az: "Keçmiş məcburiyyət: had to (must have deyil).", ru: "Обязанность в прошлом: had to (не must have)." },
  ],
};
