import type { Teach } from "./types";

export const TEACH_09: Teach = {
  day: 9,
  summary: {
    az: "Bu dərsdə modal çərçivəni tamamlayırsınız: must, have to (məcburiyyət), should (məsləhət), might və may (ehtimal, icazə). Bu feillərin fərqini bilmək sizə həm düzgün, həm də nəzakətli danışmağa imkan verəcək.",
    ru: "В этом уроке вы завершаете модальную рамку: must, have to (обязанность), should (совет), might и may (вероятность, разрешение). Понимая разницу между ними, вы будете говорить и правильно, и вежливо.",
  },
  sections: [
    {
      id: "overview",
      title: { az: "1. Ümumi mənzərə: güc şkalası", ru: "1. Общая картина: шкала силы" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Feil", ru: "Глагол" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["must", "strong obligation (speaker's opinion), rules", "You must wear a seatbelt."],
            ["have to", "obligation from outside (rules, situation)", "I have to work on Saturday."],
            ["should", "advice, the right thing to do", "You should see a doctor."],
            ["may", "possibility (50%), formal permission", "It may rain. May I come in?"],
            ["might", "weaker possibility", "I might be late."],
            ["mustn't", "prohibition", "You mustn't smoke here."],
            ["don't have to", "no obligation (not necessary)", "You don't have to come."],
          ],
        },
        {
          kind: "formula",
          label: { az: "Formula", ru: "Формула" },
          parts: [
            { text: "You", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "should", role: "modal", note: { az: "Modal: dəyişmir, -s almır.", ru: "Модальный: не изменяется, без -s." } },
            { text: "drink", role: "verb", note: { az: "Feilin sadə forması.", ru: "Начальная форма глагола." } },
            { text: "more water", role: "object", note: { az: "Tamamlıq.", ru: "Дополнение." } },
          ],
          example: "You should drink more water.",
        },
      ],
    },
    {
      id: "must-have",
      title: { az: "2. Must və have to: fərq nədir?", ru: "2. Must и have to: в чём разница?" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Hər ikisi \"-malı, -məli\" mənası verir, amma mənbəyi fərqlidir. \"Must\" danışanın öz fikrini, hissini bildirir: \"I must call my mum\" (özüm vacib hesab edirəm). \"Have to\" isə xarici məcburiyyətdir: qaydalar, iş, vəziyyət: \"I have to wear a uniform at work\" (iş qaydası belədir). Danışıqda \"have to\" daha çox işlənir, \"must\" isə yazılı qaydalarda və güclü tövsiyələrdə.",
            ru: "Оба означают «должен, надо», но источник обязанности разный. «Must» выражает мнение и чувство самого говорящего: «I must call my mum» (я сам считаю это важным). «Have to» — обязанность извне: правила, работа, обстоятельства: «I have to wear a uniform at work» (таковы правила). В разговоре чаще говорят «have to», а «must» — в письменных правилах и сильных рекомендациях.",
          },
        },
        {
          kind: "p",
          text: {
            az: "\"Have to\" modal deyil, adi feil kimi davranır: üçüncü şəxsdə \"has to\", sual və inkarda \"do/does/did\" lazımdır, bütün zamanlarda işlənir. \"Must\"-un keçmiş forması yoxdur, keçmişdə \"had to\" işlənir: \"I had to wait two hours.\"",
            ru: "«Have to» — не модальный, а ведёт себя как обычный глагол: в третьем лице «has to», в вопросе и отрицании нужен «do/does/did», используется во всех временах. У «must» нет прошедшей формы, в прошлом говорят «had to»: «I had to wait two hours.»",
          },
        },
        {
          kind: "table",
          head: [{ az: "Zaman / forma", ru: "Время / форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["present", "I have to go. She has to go."],
            ["question", "Do you have to go? Does she have to work today?"],
            ["past", "We had to leave early. Did you have to pay?"],
            ["future", "You'll have to wait."],
          ],
        },
        {
          kind: "compare",
          items: [
            {
              en: "You mustn't park here. / You don't have to park here.",
              text: {
                az: "Diqqət, bu ən vacib fərqdir! \"Mustn't\" qadağadır: burada park etmək olmaz. \"Don't have to\" məcburiyyətin olmamasıdır: burada park etmək məcburi deyil (istəsən, başqa yerdə park et).",
                ru: "Внимание, это самая важная разница! «Mustn't» — запрет: здесь парковаться нельзя. «Don't have to» — отсутствие обязанности: здесь парковаться не обязательно (можешь встать в другом месте).",
              },
            },
          ],
        },
      ],
    },
    {
      id: "should",
      title: { az: "3. Should: məsləhət və rəy", ru: "3. Should: совет и мнение" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Should\" məsləhət vermək, nəyin düzgün olduğunu söyləmək üçündür. Must-dan yumşaqdır: əmr deyil, tövsiyədir. Məsləhət istəmək üçün sual: \"What should I do?\", \"Should I call him?\" Daha yumşaq məsləhət üçün \"I think you should…\" və ya \"Maybe you should…\" deyilir. \"Ought to\" eyni mənanı verir, amma daha nadir və rəsmidir.",
            ru: "«Should» — чтобы дать совет или сказать, что правильно. Мягче, чем must: не приказ, а рекомендация. Попросить совета: «What should I do?», «Should I call him?» Для более мягкого совета говорят «I think you should…» или «Maybe you should…». «Ought to» значит то же самое, но встречается реже и звучит официальнее.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "You should rest."],
            ["−", "You shouldn't eat so late."],
            ["?", "Should I tell her? — Yes, you should. / No, you shouldn't."],
            ["soft advice", "I think you should apologise. / I don't think you should go."],
          ],
        },
      ],
    },
    {
      id: "might-may",
      title: { az: "4. Might və may: ehtimal", ru: "4. Might и may: вероятность" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Might\" və \"may\" nəyinsə ola biləcəyini, amma əmin olmadığımızı bildirir: \"It might rain\" — yağış yağa bilər (bəlkə). \"May\" bir az daha ehtimallı və rəsmi səslənir. İnkar: \"might not\", \"may not\" — \"bəlkə də ... yox\". Diqqət: \"can't\" isə qeyri-mümkünlükdür: \"It can't be true\" — bu doğru ola bilməz (əminəm).",
            ru: "«Might» и «may» выражают, что что-то возможно, но мы не уверены: «It might rain» — возможно, пойдёт дождь. «May» звучит чуть вероятнее и официальнее. Отрицание: «might not», «may not» — «возможно, не…». Внимание: «can't» — это невозможность: «It can't be true» — это не может быть правдой (я уверен).",
          },
        },
        {
          kind: "table",
          head: [{ az: "Əminlik", ru: "Уверенность" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["100% yes", "She is at home. / She will be at home."],
            ["~90% (logical)", "She must be at home. (the lights are on)"],
            ["~50%", "She may be at home."],
            ["~30%", "She might be at home."],
            ["~0% (logical)", "She can't be at home. (I just saw her in town)"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Gördüyünüz kimi, \"must\"-un ikinci mənası da var: məntiqi nəticə. \"You must be tired\" — yəqin ki, yorğunsan (gördüklərimə əsasən əminəm). Bu, məcburiyyət deyil.",
            ru: "Как видите, у «must» есть второе значение — логический вывод. «You must be tired» — ты, наверное, устал (я уверен, исходя из того, что вижу). Это не обязанность.",
          },
        },
      ],
    },
    {
      id: "register",
      title: { az: "5. Nəzakət və tonu seçmək", ru: "5. Вежливость и выбор тона" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Birbaşa \"You must…\" demək, xüsusən böyüklərə və ya müştəriyə, kobud səslənə bilər. İngilis dilində məsləhəti yumşaltmaq qəbul olunub: \"You should…\" → \"Maybe you should…\" → \"You might want to…\" → \"Have you thought about…?\" Qaydaları isə \"You have to…\" və ya \"Please remember to…\" ilə demək daha təbiidir.",
            ru: "Прямое «You must…», особенно старшему или клиенту, может звучать грубо. В английском принято смягчать совет: «You should…» → «Maybe you should…» → «You might want to…» → «Have you thought about…?» О правилах естественнее говорить «You have to…» или «Please remember to…».",
          },
        },
        {
          kind: "examples",
          items: [
            { en: "You might want to check the address again.", az: "Ünvanı bir də yoxlasanız yaxşı olar.", ru: "Возможно, стоит ещё раз проверить адрес." },
            { en: "Maybe you should talk to your manager.", az: "Bəlkə rəhbərinlə danışasan.", ru: "Может, тебе стоит поговорить с руководителем." },
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
            { en: "I have to get up early tomorrow.", az: "Sabah tez durmalıyam.", ru: "Завтра мне нужно рано вставать." },
            { en: "She has to take the medicine twice a day.", az: "O, dərmanı gündə iki dəfə qəbul etməlidir.", ru: "Ей нужно принимать лекарство дважды в день." },
            { en: "Passengers must show their tickets.", az: "Sərnişinlər biletlərini göstərməlidir.", ru: "Пассажиры обязаны предъявлять билеты." },
            { en: "You mustn't tell anyone about this.", az: "Bu barədə heç kimə deməməlisən.", ru: "Ты никому не должен об этом рассказывать." },
            { en: "You don't have to bring anything. We have everything.", az: "Heç nə gətirməyin lazım deyil. Hər şeyimiz var.", ru: "Ничего приносить не нужно. У нас всё есть." },
            { en: "We had to cancel the trip because of the weather.", az: "Hava şəraitinə görə səfəri ləğv etməli olduq.", ru: "Нам пришлось отменить поездку из-за погоды." },
            { en: "You should try the dolma here. It's great.", az: "Burada dolmanı dadmalısan. Əladır.", ru: "Обязательно попробуй здесь долму. Она отличная." },
            { en: "Should I bring a jacket?", az: "Gödəkçə götürüm?", ru: "Мне взять куртку?" },
            { en: "I might go to the party, but I'm not sure.", az: "Bəlkə məclisə gedim, amma əmin deyiləm.", ru: "Может быть, я пойду на вечеринку, но я не уверен." },
            { en: "The flight may be delayed.", az: "Uçuş gecikə bilər.", ru: "Рейс может задержаться." },
            { en: "You've worked all day. You must be exhausted.", az: "Bütün günü işləmisən. Yəqin ki, çox yorulmusan.", ru: "Ты работал весь день. Ты, должно быть, вымотался." },
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
            { wrong: "You must to go.", right: "You must go.", why: { az: "Must-dan sonra \"to\" yoxdur. (Have to-da isə \"to\" var.)", ru: "После must «to» нет. (А в have to «to» есть.)" } },
            { wrong: "She have to work.", right: "She has to work.", why: { az: "Have to adi feil kimidir: üçüncü şəxsdə has to.", ru: "Have to ведёт себя как обычный глагол: в третьем лице has to." } },
            { wrong: "Yesterday I must stay at home.", right: "Yesterday I had to stay at home.", why: { az: "Must-un keçmiş forması yoxdur; keçmişdə had to.", ru: "У must нет прошедшей формы; в прошлом had to." } },
            { wrong: "You mustn't come if you're busy.", right: "You don't have to come if you're busy.", why: { az: "Burada qadağa yox, məcburiyyətin olmaması nəzərdə tutulur.", ru: "Здесь имеется в виду не запрет, а отсутствие обязанности." } },
            { wrong: "Do you should go?", right: "Should you go? / Do you have to go?", why: { az: "Should modaldır, sualda \"do\" işlənmir.", ru: "Should — модальный, в вопросе «do» не нужен." } },
            { wrong: "Maybe it might rain.", right: "It might rain. / Maybe it will rain.", why: { az: "Maybe və might eyni mənanı verir; ikisini birlikdə işlətmək artıqdır.", ru: "Maybe и might значат одно и то же; вместе — избыточно." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Must — güclü daxili məcburiyyət, have to — xarici məcburiyyət. Keçmişdə had to.", ru: "Must — сильная внутренняя обязанность, have to — внешняя. В прошлом had to." },
    { az: "Mustn't = qadağandır. Don't have to = lazım deyil.", ru: "Mustn't = нельзя. Don't have to = не обязательно." },
    { az: "Should — məsləhət. Might / may — ehtimal. Must be / can't be — məntiqi nəticə.", ru: "Should — совет. Might / may — вероятность. Must be / can't be — логический вывод." },
    { az: "Məsləhəti yumşaltmaq üçün: Maybe you should…, You might want to…", ru: "Чтобы смягчить совет: Maybe you should…, You might want to…" },
  ],
};
