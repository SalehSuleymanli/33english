import type { Teach } from "./types";

export const TEACH_30: Teach = {
  day: 30,
  summary: {
    az: "Bu dərsdə dolayı nitqi öyrənirsiniz: başqasının sözlərini, suallarını və xahişlərini çatdırmaq. \"She said that she was tired\", \"He asked where I lived\", \"They told us to wait\". Zamanların bir addım geri çəkilməsi, söz sırası və say / tell fərqi əsas mövzulardır.",
    ru: "В этом уроке вы изучаете косвенную речь: как передать чужие слова, вопросы и просьбы. «She said that she was tired», «He asked where I lived», «They told us to wait». Главные темы — сдвиг времён на шаг назад, порядок слов и разница между say и tell.",
  },
  sections: [
    {
      id: "statements",
      title: { az: "1. Təsdiq cümlələri: said / told", ru: "1. Утверждения: said / told" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Dolayı nitq", ru: "Косвенная речь" },
          parts: [
            { text: "She", role: "subject", note: { az: "Kim dedi.", ru: "Кто сказал." } },
            { text: "said (that)", role: "verb", note: { az: "said (kimə olduğu deyilmir) və ya told + şəxs. \"That\" atıla bilər.", ru: "said (без указания кому) или told + человек. «That» можно опустить." } },
            { text: "she was", role: "subject", note: { az: "Əvəzlik və zaman dəyişir: I am → she was.", ru: "Местоимение и время меняются: I am → she was." } },
            { text: "tired", role: "complement", note: { az: "Məlumat.", ru: "Информация." } },
          ],
          example: "\"I'm tired.\" → She said (that) she was tired.",
        },
        {
          kind: "p",
          text: {
            az: "Rus dilində dolayı nitqdə zaman dəyişmir: «Она сказала, что устала». İngilis dilində isə əsas feil keçmişdədirsə (said), deyilən sözlərin zamanı adətən bir addım geri çəkilir: am → was, will → would, can → could. Azərbaycan dilində də \"dedi ki, yorğundur\" deyirik, ona görə bu qayda ana dilimizə yaddır və diqqət tələb edir.",
            ru: "В русском время в косвенной речи не меняется: «Она сказала, что устала». В английском же, если главный глагол в прошедшем (said), время передаваемых слов обычно сдвигается на шаг назад: am → was, will → would, can → could. Это правило непривычно для русскоговорящих и требует внимания.",
          },
        },
      ],
    },
    {
      id: "backshift",
      title: { az: "2. Zamanların geri çəkilməsi", ru: "2. Сдвиг времён" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Birbaşa nitq", ru: "Прямая речь" }, { az: "Dolayı nitq", ru: "Косвенная речь" }],
          rows: [
            ["\"I work here.\" (Present Simple)", "He said he worked there. (Past Simple)"],
            ["\"I'm working.\" (Present Continuous)", "He said he was working. (Past Continuous)"],
            ["\"I worked.\" / \"I have worked.\"", "He said he had worked. (Past Perfect)"],
            ["\"I will call.\"", "He said he would call."],
            ["\"I can help.\"", "He said he could help."],
            ["\"I must go.\"", "He said he had to go."],
            ["\"I may come.\"", "He said he might come."],
          ],
        },
        {
          kind: "table",
          head: [{ az: "Zaman və yer sözləri", ru: "Слова времени и места" }, { az: "Dəyişir", ru: "Меняются на" }],
          rows: [
            ["now", "then"], ["today", "that day"], ["tomorrow", "the next day / the following day"], ["yesterday", "the day before / the previous day"],
            ["next week", "the following week"], ["here", "there"], ["this", "that"],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "İstisna: əgər deyilən şey hələ də doğrudursa və ya \"says\" (indiki zaman) işlənirsə, zaman dəyişməyə bilər: \"He says he is busy\", \"She said Baku is beautiful\" (hələ də gözəldir).",
            ru: "Исключение: если сказанное по-прежнему верно или используется «says» (настоящее), время можно не менять: «He says he is busy», «She said Baku is beautiful» (он и сейчас красивый).",
          },
        },
      ],
    },
    {
      id: "say-tell",
      title: { az: "3. Say və tell", ru: "3. Say и tell" },
      blocks: [
        {
          kind: "compare",
          items: [
            { en: "She said (that) she was late. / She said to me that…", text: { az: "Say-dən sonra şəxs birbaşa gəlmir; lazım olsa \"to me\".", ru: "После say человек напрямую не ставится; если нужно — «to me»." } },
            { en: "She told me (that) she was late.", text: { az: "Tell-dən sonra mütləq şəxs gəlir: told me, told him. \"She told that…\" səhvdir.", ru: "После tell обязательно человек: told me, told him. «She told that…» — ошибка." } },
          ],
        },
      ],
    },
    {
      id: "questions",
      title: { az: "4. Sualları çatdırmaq", ru: "4. Передача вопросов" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Dolayı sualda söz sırası təsdiq cümləsindəki kimidir və köməkçi do/does/did işlənmir. Sual sözü varsa, o qalır; yoxdursa (\"Yes/No\" sualı), \"if\" və ya \"whether\" əlavə olunur. Sonda sual işarəsi qoyulmur.",
            ru: "В косвенном вопросе порядок слов как в утверждении, вспомогательные do/does/did не используются. Если есть вопросительное слово, оно остаётся; если нет (вопрос «да/нет»), добавляется «if» или «whether». Вопросительный знак в конце не ставится.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Birbaşa", ru: "Прямая" }, { az: "Dolayı", ru: "Косвенная" }],
          rows: [
            ["\"Where do you live?\"", "She asked me where I lived."],
            ["\"What time is it?\"", "He asked what time it was."],
            ["\"Are you married?\"", "She asked if / whether I was married."],
            ["\"Did you see the film?\"", "He asked if I had seen the film."],
            ["\"Can you help me?\"", "She asked if I could help her."],
          ],
        },
      ],
    },
    {
      id: "requests",
      title: { az: "5. Xahiş və əmrləri çatdırmaq", ru: "5. Передача просьб и приказов" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Birbaşa", ru: "Прямая" }, { az: "Dolayı", ru: "Косвенная" }],
          rows: [
            ["\"Please wait here.\"", "She asked me to wait there."],
            ["\"Close the door.\"", "He told me to close the door."],
            ["\"Don't be late.\"", "My boss told me not to be late."],
            ["\"You should rest.\"", "The doctor advised me to rest."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Bu, 14-cü gündəki modelin eynisidir: ask / tell / advise + şəxs + (not) to + V1. Zaman geri çəkilməsi burada lazım deyil, çünki \"to + V1\" dəyişmir.",
            ru: "Это та же модель, что на 14-й день: ask / tell / advise + человек + (not) to + V1. Сдвиг времён здесь не нужен, потому что «to + V1» не меняется.",
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
            { en: "He said he was busy.", az: "Dedi ki, məşğuldur.", ru: "Он сказал, что занят." },
            { en: "She told me she had finished the report.", az: "Mənə hesabatı bitirdiyini dedi.", ru: "Она сказала мне, что закончила отчёт." },
            { en: "They said they would come at 7.", az: "Saat 7-də gələcəklərini dedilər.", ru: "Они сказали, что придут в 7." },
            { en: "My mum said she couldn't find her glasses.", az: "Anam eynəyini tapa bilmədiyini dedi.", ru: "Мама сказала, что не может найти очки." },
            { en: "He asked me where I worked.", az: "Məndən harada işlədiyimi soruşdu.", ru: "Он спросил, где я работаю." },
            { en: "She asked if I wanted some tea.", az: "Çay istəyib-istəmədiyimi soruşdu.", ru: "Она спросила, хочу ли я чаю." },
            { en: "The teacher told us to open our books.", az: "Müəllim kitablarımızı açmağı dedi.", ru: "Учитель велел нам открыть книги." },
            { en: "He asked me not to tell anyone.", az: "Heç kimə deməməyimi xahiş etdi.", ru: "Он попросил меня никому не говорить." },
            { en: "She said she would call me the next day.", az: "Ertəsi gün mənə zəng edəcəyini dedi.", ru: "Она сказала, что позвонит мне на следующий день." },
            { en: "I asked him what time the shop opened.", az: "Ondan mağazanın saat neçədə açıldığını soruşdum.", ru: "Я спросил его, во сколько открывается магазин." },
            { en: "The doctor advised me to drink more water.", az: "Həkim mənə daha çox su içməyi məsləhət gördü.", ru: "Врач посоветовал мне пить больше воды." },
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
            { wrong: "She said me that she was tired.", right: "She told me that she was tired. / She said that…", why: { az: "Say-dən sonra şəxs gəlmir; tell + şəxs.", ru: "После say не ставится человек; tell + человек." } },
            { wrong: "He told that he was busy.", right: "He said that he was busy. / He told me…", why: { az: "Tell-dən sonra şəxs mütləqdir.", ru: "После tell обязательно человек." } },
            { wrong: "She asked me where do I live.", right: "She asked me where I lived.", why: { az: "Dolayı sualda düz söz sırası, do yoxdur.", ru: "В косвенном вопросе прямой порядок, без do." } },
            { wrong: "He asked me are you hungry.", right: "He asked me if I was hungry.", why: { az: "Yes/No sualı → if / whether + düz sıra.", ru: "Вопрос да/нет → if / whether + прямой порядок." } },
            { wrong: "She said she will come.", right: "She said she would come.", why: { az: "Said-dən sonra will → would.", ru: "После said: will → would." } },
            { wrong: "He told me don't worry.", right: "He told me not to worry.", why: { az: "Əmrin inkarı: not to + V1.", ru: "Отрицательный приказ: not to + V1." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Said (kimə yox) / told + şəxs. Zaman bir addım geri: am→was, will→would, can→could.", ru: "Said (без кому) / told + человек. Время на шаг назад: am→was, will→would, can→could." },
    { az: "Dolayı sual: asked + sual sözü / if + düz söz sırası.", ru: "Косвенный вопрос: asked + вопросительное слово / if + прямой порядок." },
    { az: "Xahiş və əmr: asked / told + şəxs + (not) to + V1.", ru: "Просьба и приказ: asked / told + человек + (not) to + V1." },
    { az: "Today → that day, tomorrow → the next day, here → there.", ru: "Today → that day, tomorrow → the next day, here → there." },
  ],
};
