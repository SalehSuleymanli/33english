import type { Teach } from "./types";

export const TEACH_08: Teach = {
  day: 8,
  summary: {
    az: "Bu dərsdə dördüncü çərçivəni, modal feilləri başlayırsınız: can, could və be able to. Onlar bacarıq, imkan, icazə və xahiş bildirir. Modal feillərin öz qaydaları var: onlardan sonra feil həmişə sadə formada gəlir və onlar heç vaxt dəyişmir.",
    ru: "В этом уроке вы начинаете четвёртую рамку — модальные глаголы: can, could и be able to. Они выражают умение, возможность, разрешение и просьбу. У модальных глаголов свои правила: после них глагол всегда в начальной форме, а сами они не изменяются.",
  },
  sections: [
    {
      id: "modals",
      title: { az: "1. Modal feil nədir?", ru: "1. Что такое модальный глагол?" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Modal feil hərəkətin özünü deyil, ona münasibətimizi bildirir: bacarıram, etməliyəm, edə bilərəm, edə bilər. Azərbaycan dilində bu mənalar çox vaxt şəkilçi ilə verilir (\"üzə bilirəm\", \"getməliyəm\"), ingilis dilində isə ayrıca sözlə: can, must, should, might. Modal feil əsas feildən əvvəl dayanır.",
            ru: "Модальный глагол выражает не само действие, а отношение к нему: умею, должен, могу, может быть. В русском это тоже отдельные слова (могу, должен, умею), поэтому модальные глаголы обычно даются русскоговорящим легче. Модальный глагол стоит перед основным.",
          },
        },
        {
          kind: "formula",
          label: { az: "Modal çərçivənin formulu", ru: "Формула модальной рамки" },
          parts: [
            { text: "I", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "can", role: "modal", note: { az: "Modal feil. Heç vaxt dəyişmir: he can, she can (-s yoxdur).", ru: "Модальный глагол. Не изменяется: he can, she can (без -s)." } },
            { text: "swim", role: "verb", note: { az: "Əsas feil həmişə sadə formada, \"to\" olmadan.", ru: "Основной глагол всегда в начальной форме, без «to»." } },
          ],
          example: "I can swim.",
        },
        {
          kind: "tip",
          text: {
            az: "Modal feillərin üç qızıl qaydası: 1) -s almır (She can drive). 2) Özündən sonra \"to\" istəmir (I can go, \"I can to go\" yox). 3) Sual və inkarda \"do\" işlənmir: Can you…? I can't…",
            ru: "Три золотых правила модальных глаголов: 1) не принимают -s (She can drive). 2) После них нет «to» (I can go, а не «I can to go»). 3) В вопросе и отрицании не нужен «do»: Can you…? I can't…",
          },
        },
      ],
    },
    {
      id: "can",
      title: { az: "2. Can: indiki bacarıq, imkan, icazə", ru: "2. Can: умение, возможность, разрешение в настоящем" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "She can speak three languages."],
            ["−", "I can't (cannot) find my keys."],
            ["?", "Can you help me? — Yes, I can. / No, I can't."],
            ["Wh- ?", "What can I do? How can I get to the station?"],
          ],
        },
        {
          kind: "table",
          head: [{ az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["ability (bacarıq)", "I can play the guitar."],
            ["possibility (imkan)", "You can buy tickets online."],
            ["permission (icazə)", "You can sit here. Can I open the window?"],
            ["request (xahiş, informal)", "Can you pass the salt?"],
            ["impossibility (qeyri-mümkünlük)", "That can't be true!"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "\"Cannot\" bir söz kimi yazılır. Danışıqda \"can\" adətən zəif oxunur (/kən/), \"can't\" isə güclü və uzun (/kɑːnt/ və ya /kænt/). Bu fərqi eşitmək vacibdir, çünki cümlənin mənası tam əksinə dəyişir.",
            ru: "«Cannot» пишется слитно. В речи «can» обычно произносится слабо (/кэн/), а «can't» — сильно и долго (/ка:нт/ или /кэнт/). Важно слышать эту разницу: от неё смысл меняется на противоположный.",
          },
        },
      ],
    },
    {
      id: "could",
      title: { az: "3. Could: keçmiş bacarıq və nəzakətli xahiş", ru: "3. Could: умение в прошлом и вежливая просьба" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Could \"can\"-in keçmiş formasıdır və keçmişdəki ümumi bacarığı bildirir: \"When I was five, I could read.\" Bundan əlavə, could xahişi daha nəzakətli edir: \"Could you help me?\" \"Can you help me?\"-dən daha yumşaq səslənir. Həmçinin ehtimal üçün işlənir: \"It could rain later.\" (Sonra yağış yağa bilər.)",
            ru: "Could — прошедшая форма «can», выражает общее умение в прошлом: «When I was five, I could read.» Кроме того, could делает просьбу вежливее: «Could you help me?» звучит мягче, чем «Can you help me?». Также выражает возможность: «It could rain later.» (Позже может пойти дождь.)",
          },
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "My grandmother could sew beautifully."],
            ["−", "I couldn't sleep last night."],
            ["?", "Could you swim when you were a child?"],
            ["polite request", "Could you send me the address, please?"],
          ],
        },
      ],
    },
    {
      id: "able",
      title: { az: "4. Be able to: bütün zamanlarda bacarıq", ru: "4. Be able to: умение во всех временах" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Can-in yalnız iki forması var (can, could). Gələcəkdə, Perfect zamanlarda və başqa modal feildən sonra \"can\" işlənə bilmir. Onda \"be able to\" köməyə gəlir: \"I will be able to\", \"I have been able to\", \"I might be able to\". \"Will can\" heç vaxt deyilmir.",
            ru: "У can только две формы (can, could). В будущем, в Perfect и после другого модального глагола «can» использовать нельзя. Тогда на помощь приходит «be able to»: «I will be able to», «I have been able to», «I might be able to». «Will can» не говорят никогда.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Zaman", ru: "Время" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["present", "I am able to work from home. (= I can)"],
            ["past (one specific success)", "The fire was big, but everyone was able to escape."],
            ["future", "You will be able to speak English after the course."],
            ["present perfect", "I haven't been able to call him yet."],
            ["after another modal", "I might be able to come."],
          ],
        },
        {
          kind: "compare",
          items: [
            {
              en: "I could swim. / I was able to swim to the shore.",
              text: {
                az: "\"Could\" keçmişdə ümumi bacarıqdır (üzə bilirdim). Konkret bir vəziyyətdə çətinliklə bacarmaq üçün \"was able to\" (və ya \"managed to\") işlənir: sahilə qədər üzə bildim. Təsdiq cümləsində tək bir uğur üçün \"could\" işlətmək səhvdir; inkarda isə \"couldn't\" hər ikisində olar.",
                ru: "«Could» — общее умение в прошлом (умел плавать). Для успеха в конкретной ситуации, часто с трудом, используется «was able to» (или «managed to»): смог доплыть до берега. В утверждении «could» для единичного успеха — ошибка; в отрицании «couldn't» подходит в обоих случаях.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "permission",
      title: { az: "5. İcazə istəmək: can, could, may", ru: "5. Просить разрешения: can, could, may" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Səviyyə", ru: "Уровень" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["informal", "Can I use your phone?"],
            ["polite", "Could I ask you a question?"],
            ["formal", "May I come in?"],
            ["answers", "Yes, of course. / Sure. / Sorry, you can't."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Cavabda \"Yes, you could\" deyilmir: \"could\" yalnız xahişi nəzakətli edir, icazə verəndə \"can\" işlənir: \"Could I sit here? — Yes, of course you can.\"",
            ru: "В ответе не говорят «Yes, you could»: «could» лишь делает просьбу вежливой, а разрешение дают через «can»: «Could I sit here? — Yes, of course you can.»",
          },
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
            { en: "I can cook, but I can't bake.", az: "Yemək bişirə bilirəm, amma şirniyyat bişirə bilmirəm.", ru: "Я умею готовить, но не умею печь." },
            { en: "Can you speak a bit slower, please?", az: "Bir az yavaş danışa bilərsiniz?", ru: "Вы не могли бы говорить чуть медленнее?" },
            { en: "You can pay by card here.", az: "Burada kartla ödəyə bilərsiniz.", ru: "Здесь можно оплатить картой." },
            { en: "I couldn't find a parking space.", az: "Park yeri tapa bilmədim.", ru: "Я не смог найти парковку." },
            { en: "Could you tell me the time?", az: "Saatın neçə olduğunu deyə bilərsiniz?", ru: "Не подскажете, который час?" },
            { en: "When she was young, she could run very fast.", az: "Gənc olanda çox sürətli qaça bilirdi.", ru: "В молодости она умела очень быстро бегать." },
            { en: "We'll be able to buy a flat next year.", az: "Gələn il mənzil ala biləcəyik.", ru: "В следующем году мы сможем купить квартиру." },
            { en: "I haven't been able to sleep well recently.", az: "Son vaxtlar yaxşı yata bilmirəm.", ru: "В последнее время я не могу нормально спать." },
            { en: "May I see your passport, please?", az: "Pasportunuzu görə bilərəmmi?", ru: "Можно ваш паспорт, пожалуйста?" },
            { en: "That can't be Murad. He's in London.", az: "Bu Murad ola bilməz. O, Londondadır.", ru: "Это не может быть Мурад. Он в Лондоне." },
            { en: "After three hours, they were able to fix the problem.", az: "Üç saatdan sonra problemi həll edə bildilər.", ru: "Через три часа им удалось решить проблему." },
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
            { wrong: "She cans drive.", right: "She can drive.", why: { az: "Modal feillər -s almır.", ru: "Модальные глаголы не принимают -s." } },
            { wrong: "I can to speak English.", right: "I can speak English.", why: { az: "Can-dan sonra \"to\" işlənmir.", ru: "После can «to» не используется." } },
            { wrong: "Do you can help me?", right: "Can you help me?", why: { az: "Modal feillə sualda \"do\" işlənmir.", ru: "В вопросе с модальным глаголом «do» не нужен." } },
            { wrong: "I will can come tomorrow.", right: "I will be able to come tomorrow.", why: { az: "İki modal feil yan-yana işlənmir. Gələcək üçün \"will be able to\".", ru: "Два модальных глагола подряд не используются. Для будущего — «will be able to»." } },
            { wrong: "She can speaks French.", right: "She can speak French.", why: { az: "Modal feildən sonra əsas feil sadə formada.", ru: "После модального глагола — начальная форма глагола." } },
            { wrong: "I can't to sleep.", right: "I can't sleep.", why: { az: "İnkarda da \"to\" yoxdur.", ru: "И в отрицании «to» нет." } },
            { wrong: "Yesterday I could finish the report.", right: "Yesterday I was able to (managed to) finish the report.", why: { az: "Konkret bir keçmiş uğur üçün \"was able to\" və ya \"managed to\".", ru: "Для конкретного успеха в прошлом — «was able to» или «managed to»." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Modal feil + feilin sadə forması: -s yox, \"to\" yox, \"do\" yox.", ru: "Модальный глагол + начальная форма: без -s, без «to», без «do»." },
    { az: "Can — indiki bacarıq, imkan, icazə. Could — keçmiş bacarıq və nəzakətli xahiş.", ru: "Can — умение, возможность, разрешение сейчас. Could — умение в прошлом и вежливая просьба." },
    { az: "Gələcəkdə və digər zamanlarda be able to: will be able to, have been able to.", ru: "В будущем и других временах — be able to: will be able to, have been able to." },
    { az: "İcazə: Can I (sadə), Could I (nəzakətli), May I (rəsmi).", ru: "Разрешение: Can I (просто), Could I (вежливо), May I (официально)." },
  ],
};
