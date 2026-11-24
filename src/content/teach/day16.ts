import type { Teach } from "./types";

export const TEACH_16: Teach = {
  day: 16,
  summary: {
    az: "Bu dərsdə iki mövzu var. Birincisi Present Perfect Continuous: have been + -ing — bir müddətdir davam edən fəaliyyət. İkincisi gələcək planlar: going to, Present Continuous ilə razılaşdırılmış planlar və danışıq formaları gonna / wanna.",
    ru: "В этом уроке две темы. Первая — Present Perfect Continuous: have been + -ing — действие, которое длится уже какое-то время. Вторая — планы на будущее: going to, Present Continuous для договорённостей и разговорные формы gonna / wanna.",
  },
  sections: [
    {
      id: "ppc",
      title: { az: "1. Present Perfect Continuous: nə vaxtdan bəri davam edir", ru: "1. Present Perfect Continuous: как долго длится" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Bu zaman keçmişdə başlayıb indiyə qədər davam edən (və ya indicə bitmiş) fəaliyyəti vurğulayır. Diqqət fəaliyyətin özünə və müddətinə yönəlir: \"I've been waiting for an hour\" — bir saatdır gözləyirəm. Azərbaycan və rus dillərində bunu yenə indiki zamanla deyirik: \"Bir saatdır gözləyirəm\" / «Я жду уже час».",
            ru: "Это время подчёркивает действие, которое началось в прошлом и длится до сих пор (или только что закончилось). Внимание — на самом процессе и его длительности: «I've been waiting for an hour» — я жду уже час. В русском это снова настоящее время: «Я жду уже час».",
          },
        },
        {
          kind: "formula",
          label: { az: "Present Perfect Continuous", ru: "Present Perfect Continuous" },
          parts: [
            { text: "I", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "have been", role: "aux", note: { az: "have/has + been: bütün şəxslər üçün been dəyişmir.", ru: "have/has + been: been не меняется." } },
            { text: "learning", role: "verb", note: { az: "Feil -ing ilə.", ru: "Глагол с -ing." } },
            { text: "English for two years", role: "time", note: { az: "Müddət: for / since.", ru: "Длительность: for / since." } },
          ],
          example: "I have been learning English for two years.",
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "She's been working all day."],
            ["−", "I haven't been sleeping well."],
            ["?", "How long have you been waiting? Have you been crying?"],
            ["visible result", "Your eyes are red. Have you been crying? / The ground is wet. It's been raining."],
          ],
        },
      ],
    },
    {
      id: "vs-perfect",
      title: { az: "2. Perfect yoxsa Perfect Continuous?", ru: "2. Perfect или Perfect Continuous?" },
      blocks: [
        {
          kind: "compare",
          items: [
            { en: "I've written three emails. / I've been writing emails all morning.", text: { az: "Perfect nəticəni və sayı vurğulayır (üç məktub yazmışam). Continuous prosesi və müddəti (bütün səhər məktub yazıram).", ru: "Perfect подчёркивает результат и количество (написал три письма). Continuous — процесс и длительность (всё утро пишу письма)." } },
            { en: "I've known her for years. (not: I've been knowing)", text: { az: "Vəziyyət feilləri (know, like, have = sahiblik) continuous olmur, ona görə sadə Perfect işlənir.", ru: "Глаголы состояния (know, like, have = обладание) не бывают в Continuous, поэтому используется простой Perfect." } },
            { en: "I've lived / I've been living here for 5 years.", text: { az: "Live, work, study kimi feillərlə hər iki forma demək olar ki, eyni mənanı verir.", ru: "С глаголами live, work, study обе формы значат почти одно и то же." } },
          ],
        },
      ],
    },
    {
      id: "going-to",
      title: { az: "3. Going to: plan və niyyət", ru: "3. Going to: план и намерение" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Going to", ru: "Going to" },
          parts: [
            { text: "We", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "are going to", role: "be", note: { az: "am/is/are + going to.", ru: "am/is/are + going to." } },
            { text: "buy", role: "verb", note: { az: "Feilin sadə forması.", ru: "Начальная форма глагола." } },
            { text: "a new flat", role: "object", note: { az: "Tamamlıq.", ru: "Дополнение." } },
          ],
          example: "We are going to buy a new flat.",
        },
        {
          kind: "p",
          text: {
            az: "\"Going to\" əvvəlcədən qərarlaşdırılmış plan və ya niyyət üçündür: \"I'm going to learn to drive this year.\" Həmçinin indiki əlamətlərə əsaslanan proqnoz üçün: \"Look at the sky. It's going to rain.\" Bu, 6-cı gündə öyrəndiyiniz \"will\"-dən fərqlidir: will — ani qərar və ümumi proqnoz.",
            ru: "«Going to» — для заранее принятого плана или намерения: «I'm going to learn to drive this year.» А также для прогноза по видимым признакам: «Look at the sky. It's going to rain.» Это отличается от «will» из 6-го дня: will — мгновенное решение и общий прогноз.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Gələcək forması", ru: "Форма будущего" }, { az: "Nə vaxt", ru: "Когда" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["will", "instant decision, promise, general prediction", "I'll have the soup. I'll call you."],
            ["going to", "plan already decided, prediction from evidence", "I'm going to visit my aunt. It's going to rain."],
            ["Present Continuous", "fixed arrangement with time/place/people", "I'm meeting Elvin at 7 tomorrow."],
            ["Present Simple", "timetables", "The train leaves at 6:40."],
          ],
        },
      ],
    },
    {
      id: "informal",
      title: { az: "4. Gonna, wanna, gotta: danışıq formaları", ru: "4. Gonna, wanna, gotta: разговорные формы" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Danışıq", ru: "Разговорное" }, { az: "Tam forma", ru: "Полная форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["gonna", "going to", "I'm gonna be late. (= I'm going to be late.)"],
            ["wanna", "want to", "Do you wanna come? (= Do you want to come?)"],
            ["gotta", "have got to / have to", "I gotta go. (= I've got to go.)"],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "Bu formaları filmlərdə və mahnılarda tez-tez eşidəcəksiniz və başa düşmək vacibdir. Amma yazıda (məktub, imtahan, iş yazışması) həmişə tam formanı yazın. \"Gonna\" yalnız \"going to + feil\" əvəzinə işlənir: \"I'm going to Baku\" (yerə getmək) → \"gonna Baku\" demək olmaz.",
            ru: "Эти формы вы часто услышите в фильмах и песнях, и их важно понимать. Но на письме (письмо, экзамен, деловая переписка) всегда пишите полную форму. «Gonna» заменяет только «going to + глагол»: «I'm going to Baku» (ехать куда-то) нельзя сказать как «gonna Baku».",
          },
        },
      ],
    },
    {
      id: "examples",
      title: { az: "5. Nümunələr və tərcümələr", ru: "5. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "I've been waiting for you for 40 minutes!", az: "40 dəqiqədir səni gözləyirəm!", ru: "Я жду тебя уже 40 минут!" },
            { en: "How long have you been working here?", az: "Neçə vaxtdır burada işləyirsən?", ru: "Как долго ты здесь работаешь?" },
            { en: "She's been studying since 8 o'clock.", az: "O, saat 8-dən dərs oxuyur.", ru: "Она занимается с восьми часов." },
            { en: "You look tired. Have you been running?", az: "Yorğun görünürsən. Qaçırdın?", ru: "Ты выглядишь уставшим. Ты бегал?" },
            { en: "It's been raining all day.", az: "Bütün günü yağış yağır.", ru: "Весь день идёт дождь." },
            { en: "We're going to move to Ganja next year.", az: "Gələn il Gəncəyə köçəcəyik.", ru: "В следующем году мы переезжаем в Гянджу." },
            { en: "What are you going to do after university?", az: "Universitetdən sonra nə etmək fikrindəsən?", ru: "Что ты собираешься делать после университета?" },
            { en: "Be careful! You're going to fall!", az: "Ehtiyatlı ol! Yıxılacaqsan!", ru: "Осторожно! Ты сейчас упадёшь!" },
            { en: "I'm seeing the dentist on Thursday.", az: "Cümə axşamı diş həkiminin qəbuluna gedirəm.", ru: "В четверг я иду к стоматологу." },
            { en: "I'm not going to say anything.", az: "Heç nə deməyəcəyəm.", ru: "Я ничего не скажу." },
            { en: "Do you wanna grab a coffee? (informal)", az: "Qəhvə içməyə gedək? (danışıq)", ru: "Хочешь выпить кофе? (разговорное)" },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "6. Tipik səhvlər", ru: "6. Типичные ошибки" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "I am waiting for an hour.", right: "I have been waiting for an hour.", why: { az: "Müddət (for an hour) + indiyə qədər → Perfect Continuous.", ru: "Длительность (for an hour) + до сих пор → Perfect Continuous." } },
            { wrong: "I have been knowing him for years.", right: "I have known him for years.", why: { az: "Know continuous olmur.", ru: "Know не бывает в Continuous." } },
            { wrong: "She has been work here.", right: "She has been working here.", why: { az: "Been-dən sonra -ing.", ru: "После been — форма -ing." } },
            { wrong: "I going to visit my aunt.", right: "I am going to visit my aunt.", why: { az: "Going to-dan əvvəl am/is/are mütləqdir.", ru: "Перед going to обязательно am/is/are." } },
            { wrong: "I will meet my friend tomorrow at 7, we arranged it.", right: "I'm meeting my friend tomorrow at 7.", why: { az: "Razılaşdırılmış plan üçün Present Continuous daha təbiidir.", ru: "Для договорённости естественнее Present Continuous." } },
            { wrong: "I'm gonna the cinema.", right: "I'm going to the cinema.", why: { az: "Gonna yalnız going to + feil əvəzinədir.", ru: "Gonna заменяет только going to + глагол." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Perfect Continuous: have/has been + -ing — müddət və proses (for, since, how long).", ru: "Perfect Continuous: have/has been + -ing — длительность и процесс (for, since, how long)." },
    { az: "Nəticə və say → Perfect; proses və müddət → Perfect Continuous.", ru: "Результат и количество → Perfect; процесс и длительность → Perfect Continuous." },
    { az: "Plan → going to; razılaşma → Present Continuous; ani qərar → will.", ru: "План → going to; договорённость → Present Continuous; мгновенное решение → will." },
    { az: "Gonna / wanna / gotta — yalnız danışıqda.", ru: "Gonna / wanna / gotta — только в разговоре." },
  ],
};
