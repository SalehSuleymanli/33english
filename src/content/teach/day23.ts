import type { Teach } from "./types";

export const TEACH_23: Teach = {
  day: 23,
  summary: {
    az: "Bu dərsdə xəyal və təsəvvür haqqında danışmağı öyrənirsiniz: \"What if…?\" (bəs … olsa? / bəs … etsək?) sualı və \"My dream is to…\" (arzum … etməkdir) ifadəsi. Dünən öyrəndiyiniz xəyali forma (if + Past, would + V1) burada sual və təklif kimi işləyir. Bu ifadələr adi söhbətdə də, IELTS danışıq imtahanında da çox lazımdır.",
    ru: "В этом уроке вы учитесь говорить о мечтах и воображаемых ситуациях: вопрос «What if…?» (а что если…? / а вдруг…?) и выражение «My dream is to…» (моя мечта — …). Воображаемая форма из вчерашнего урока (if + Past, would + V1) здесь работает как вопрос и предложение. Эти выражения нужны и в обычном разговоре, и на устной части IELTS.",
  },
  sections: [
    {
      id: "what-if-imaginary",
      title: { az: "1. What if + Past: xəyali vəziyyət", ru: "1. What if + Past: воображаемая ситуация" },
      blocks: [
        {
          kind: "formula",
          label: { az: "What if + subyekt + Past Simple … ?", ru: "What if + подлежащее + Past Simple … ?" },
          parts: [
            { text: "What if", role: "question", note: { az: "\"Bəs … olsa?\", \"Təsəvvür et ki…\"", ru: "«А что если…?», «Представь, что…»" } },
            { text: "I", role: "subject", note: { az: "Subyekt.", ru: "Подлежащее." } },
            { text: "told", role: "verb", note: { az: "Past Simple — keçmiş deyil, xəyal işarəsi (ikinci şərt kimi).", ru: "Past Simple — не прошлое, а знак воображения (как во втором типе условных)." } },
            { text: "you I was a teacher", role: "object", note: { az: "Qalan hissə də keçmişə uyğunlaşır: was.", ru: "Остальная часть тоже согласуется: was." } },
          ],
          example: "What if I told you I was a teacher? What would you do?",
        },
        {
          kind: "p",
          text: {
            az: "Bu, sizin qeydlərinizdəki cümlədir, düzəldilmiş formada: \"What if I told you I was a teacher? What would you do?\" — Əgər sənə müəllim olduğumu desəydim, nə edərdin? Burada \"told\" və \"was\" keçmiş zaman deyil: 22-ci gündəki kimi, Past Simple \"real deyil, təsəvvür edirik\" mənasını verir. Cavab da would ilə gəlir: \"I would be surprised.\"",
            ru: "Это предложение из ваших заметок в исправленном виде: «What if I told you I was a teacher? What would you do?» — Что бы ты сделал, если бы я сказал, что я учитель? Здесь «told» и «was» — не прошедшее время: как в 22-м дне, Past Simple означает «не на самом деле, мы представляем». Ответ тоже с would: «I would be surprised.»",
          },
        },
      ],
    },
    {
      id: "what-if-real",
      title: { az: "2. What if + Present: real narahatlıq", ru: "2. What if + Present: реальное беспокойство" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Əgər hadisə həqiqətən baş verə bilərsə və siz narahatsınızsa, \"What if\"-dən sonra Present Simple işlənir: \"What if the shop is closed?\" — Bəs mağaza bağlı olsa? Bu, \"Maybe the shop is closed. What will we do then?\" deməkdir. Diqqət: burada da will işlənmir — \"What if it will rain?\" səhvdir, düzgünü \"What if it rains?\".",
            ru: "Если событие действительно может произойти и вы волнуетесь, после «What if» используется Present Simple: «What if the shop is closed?» — А вдруг магазин закрыт? Это значит «Maybe the shop is closed. What will we do then?». Внимание: и здесь нет will — «What if it will rain?» — ошибка, правильно «What if it rains?».",
          },
        },
        {
          kind: "compare",
          items: [
            { en: "What if it rains tomorrow?", text: { az: "Real ehtimal: sabah yağış yağa bilər — narahatıq.", ru: "Реальная возможность: завтра может пойти дождь — волнуемся." } },
            { en: "What if it never rained again?", text: { az: "Xəyal: belə şey real deyil, sadəcə təsəvvür edirik.", ru: "Фантазия: так не бывает, мы просто представляем." } },
          ],
        },
      ],
    },
    {
      id: "what-if-suggest",
      title: { az: "3. What if we…? — yumşaq təklif", ru: "3. What if we…? — мягкое предложение" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"What if we + Past?\" həm də nəzakətli təklifdir: \"What if we went to the cinema tonight?\" — Bəs bu axşam kinoya getsək? Bu, \"Let's go to the cinema\"-dan daha yumşaq səslənir. Azərbaycan dilində \"Bəs … etsək necə olar?\", rus dilində «А что если нам…?» qarşılığıdır.",
            ru: "«What if we + Past?» — это ещё и вежливое предложение: «What if we went to the cinema tonight?» — А что если нам сходить в кино сегодня вечером? Звучит мягче, чем «Let's go to the cinema». Русский аналог — «А что если нам…?».",
          },
        },
        {
          kind: "tip",
          text: {
            az: "Təklif üçün \"What if we try…?\" (Present) də deyilir — o, bir az daha birbaşa səslənir. Hər ikisi düzgündür.",
            ru: "Для предложения говорят и «What if we try…?» (Present) — это звучит немного прямее. Оба варианта правильные.",
          },
        },
      ],
    },
    {
      id: "dream",
      title: { az: "4. My dream is to + V1", ru: "4. My dream is to + V1" },
      blocks: [
        {
          kind: "formula",
          label: { az: "My dream is + to + V1", ru: "My dream is + to + V1" },
          parts: [
            { text: "My dream", role: "subject", note: { az: "Subyekt: arzum.", ru: "Подлежащее: моя мечта." } },
            { text: "is", role: "be", note: { az: "Frame 2: to be.", ru: "Frame 2: to be." } },
            { text: "to understand", role: "verb", note: { az: "Mütləq to + V1.", ru: "Обязательно to + V1." } },
            { text: "you", role: "object", note: { az: "Tamamlıq.", ru: "Дополнение." } },
          ],
          example: "My dream is to understand you.",
        },
        {
          kind: "p",
          text: {
            az: "Qeydlərinizdə iki nümunə var: \"My dream is to understand you\" (arzum səni başa düşməkdir) və \"My dream is to be able to understand you\" (arzum səni başa düşə bilməkdir). İkincidə bacarıq var, ona görə 8-ci gündəki \"be able to\" işlənir — çünki \"can\"-ın to-formu yoxdur: \"to can\" demək olmaz.",
            ru: "В ваших заметках два примера: «My dream is to understand you» (моя мечта — понимать тебя) и «My dream is to be able to understand you» (моя мечта — суметь понимать тебя). Во втором речь об умении, поэтому используется «be able to» из 8-го дня — у «can» нет формы с to: «to can» сказать нельзя.",
          },
        },
      ],
    },
    {
      id: "other-dreams",
      title: { az: "5. Arzular haqqında başqa ifadələr", ru: "5. Другие способы говорить о мечтах" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "İfadə", ru: "Выражение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["I'd love to + V1", "I'd love to live in Japan."],
            ["I dream of + V-ing", "I dream of opening a café."],
            ["My dream job is + noun", "My dream job is a pilot."],
            ["One day I'd like to + V1", "One day I'd like to write a book."],
            ["… come true", "I hope your dream comes true."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Diqqət: \"dream of\"-dan sonra feil -ing ilə gəlir, çünki \"of\" sözönüdür: \"I dream of travelling\", \"I dream of to travel\" yox. \"I'd love to\"-dan sonra isə to + V1: \"I'd love to travel\".",
            ru: "Внимание: после «dream of» глагол с -ing, потому что «of» — предлог: «I dream of travelling», а не «I dream of to travel». А после «I'd love to» — to + V1: «I'd love to travel».",
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
            { en: "What if I told you I was a teacher?", az: "Bəs sənə müəllim olduğumu desəydim?", ru: "А что если бы я сказал тебе, что я учитель?" },
            { en: "What would you do if you won a million dollars?", az: "Bir milyon dollar udsaydın, nə edərdin?", ru: "Что бы ты сделал, если бы выиграл миллион долларов?" },
            { en: "What if we miss the flight?", az: "Bəs uçuşa gecikəsək?", ru: "А вдруг мы опоздаем на рейс?" },
            { en: "What if nobody comes to the party?", az: "Bəs heç kim qonaqlığa gəlməsə?", ru: "А вдруг никто не придёт на вечеринку?" },
            { en: "What if we went to the mountains this weekend?", az: "Bəs bu həftəsonu dağlara getsək?", ru: "А что если нам поехать в горы на выходных?" },
            { en: "My dream is to travel around the world.", az: "Arzum bütün dünyanı gəzməkdir.", ru: "Моя мечта — путешествовать по миру." },
            { en: "My dream is to be able to understand you.", az: "Arzum səni başa düşə bilməkdir.", ru: "Моя мечта — суметь понимать тебя." },
            { en: "I'd love to learn to surf.", az: "Sörf etməyi öyrənmək çox istərdim.", ru: "Я бы очень хотел научиться сёрфингу." },
            { en: "He dreams of becoming a famous chef.", az: "O, məşhur aşpaz olmaq arzusundadır.", ru: "Он мечтает стать известным шеф-поваром." },
            { en: "My dream job is a wildlife photographer.", az: "Arzuladığım iş vəhşi təbiət fotoqrafıdır.", ru: "Работа моей мечты — фотограф дикой природы." },
            { en: "I hope your dream comes true.", az: "Ümid edirəm, arzun reallaşar.", ru: "Надеюсь, твоя мечта сбудется." },
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
            { wrong: "My dream is open a café.", right: "My dream is to open a café.", why: { az: "My dream is + to + V1.", ru: "My dream is + to + V1." } },
            { wrong: "What if I tell you I am teacher?", right: "What if I told you I was a teacher?", why: { az: "Xəyal — Past Simple; peşədən əvvəl a.", ru: "Воображение — Past Simple; перед профессией a." } },
            { wrong: "What if it will rain?", right: "What if it rains?", why: { az: "What if-dən sonra will işlənmir.", ru: "После what if не используется will." } },
            { wrong: "My dream is to can speak English.", right: "My dream is to be able to speak English.", why: { az: "\"to can\" yoxdur — to be able to.", ru: "«to can» не бывает — to be able to." } },
            { wrong: "I dream of to travel.", right: "I dream of travelling.", why: { az: "of-dan sonra V-ing.", ru: "После of — V-ing." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "What if + Past = xəyal (What if I told you…?) və ya yumşaq təklif (What if we went…?).", ru: "What if + Past = фантазия (What if I told you…?) или мягкое предложение (What if we went…?)." },
    { az: "What if + Present = real narahatlıq (What if the shop is closed?). Will yoxdur.", ru: "What if + Present = реальное беспокойство (What if the shop is closed?). Без will." },
    { az: "My dream is to + V1; bacarıq üçün to be able to + V1.", ru: "My dream is to + V1; для умения — to be able to + V1." },
    { az: "I'd love to + V1, I dream of + V-ing.", ru: "I'd love to + V1, I dream of + V-ing." },
  ],
};
