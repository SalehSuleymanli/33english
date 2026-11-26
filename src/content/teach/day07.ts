import type { Teach } from "./types";

export const TEACH_07: Teach = {
  day: 7,
  summary: {
    az: "Bu dərsdə hərəkət çərçivəsinin \"davamlı\" zamanlarını öyrənirsiniz: Present, Past və Future Continuous. Bu zamanlar hərəkətin müəyyən anda davam etdiyini, prosesdə olduğunu bildirir. Formulu sadədir: be + feil-ing.",
    ru: "В этом уроке вы изучаете «длительные» времена рамки действия: Present, Past и Future Continuous. Они показывают, что действие длится, находится в процессе в определённый момент. Формула простая: be + глагол-ing.",
  },
  sections: [
    {
      id: "idea",
      title: { az: "1. Davamlılıq ideyası", ru: "1. Идея длительности" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Simple zamanlar hərəkəti bütöv bir fakt kimi görür: \"I work\" (ümumiyyətlə işləyirəm), \"I worked\" (işlədim, bitdi). Continuous zamanlar isə hərəkətin ortasına \"kamera\" kimi baxır: hərəkət başlayıb, hələ bitməyib, prosesdədir. \"I am working\" — indi, bu an işin içindəyəm.",
            ru: "Простые времена видят действие как целый факт: «I work» (вообще работаю), «I worked» (поработал, всё). Длительные времена смотрят на действие изнутри, как камера: действие началось, ещё не закончилось, оно в процессе. «I am working» — сейчас, в этот момент я в процессе работы.",
          },
        },
        {
          kind: "formula",
          label: { az: "Ümumi formula", ru: "Общая формула" },
          parts: [
            { text: "Subject", role: "subject", note: { az: "Kim?", ru: "Кто?" } },
            { text: "am / is / are · was / were · will be", role: "be", note: { az: "\"Be\" zamanı göstərir: indi, keçmiş, gələcək.", ru: "«Be» показывает время: настоящее, прошедшее, будущее." } },
            { text: "verb + ing", role: "verb", note: { az: "Feil -ing ilə: prosesi göstərir.", ru: "Глагол с -ing: показывает процесс." } },
          ],
          example: "She is reading. She was reading. She will be reading.",
        },
        {
          kind: "tip",
          text: {
            az: "Continuous-da köməkçi feil \"be\"-dir, \"do\" deyil. Buna görə sual və inkar 2-ci çərçivədəki kimi qurulur: Are you working? I'm not working.",
            ru: "В Continuous вспомогательный глагол — «be», а не «do». Поэтому вопрос и отрицание строятся как в рамке 2: Are you working? I'm not working.",
          },
        },
      ],
    },
    {
      id: "ing",
      title: { az: "2. -ing formasının yazılışı", ru: "2. Правописание формы -ing" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Qayda", ru: "Правило" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+ ing", "work → working, read → reading, play → playing"],
            ["-e → ing", "make → making, write → writing (but see → seeing)"],
            ["short verb: double consonant", "sit → sitting, run → running, swim → swimming"],
            ["-ie → ying", "lie → lying, die → dying"],
          ],
        },
      ],
    },
    {
      id: "present",
      title: { az: "3. Present Continuous: indi baş verən", ru: "3. Present Continuous: то, что происходит сейчас" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "İstifadə", ru: "Употребление" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["right now, at this moment", "I'm cooking. Can I call you back?"],
            ["around now, these days (temporary)", "She's studying for her exams this month."],
            ["changing situations", "Prices are going up. Your English is getting better."],
            ["fixed future arrangements", "We're meeting them on Saturday. (Day 18)"],
          ],
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "I'm working. He's sleeping. They're playing."],
            ["−", "I'm not working. He isn't sleeping. They aren't playing."],
            ["?", "Am I talking too fast? Is he sleeping? Are they playing?"],
            ["Short answers", "Yes, he is. / No, he isn't."],
            ["Wh- ?", "What are you doing? Where is she going?"],
          ],
        },
      ],
    },
    {
      id: "past",
      title: { az: "4. Past Continuous: keçmişdə müəyyən anda", ru: "4. Past Continuous: в определённый момент в прошлом" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Past Continuous keçmişdə konkret bir anda davam edən hərəkəti bildirir: \"At 8 o'clock I was having dinner.\" Çox vaxt Past Simple ilə birlikdə işlənir: uzun hərəkət (Continuous) qısa hərəkətlə (Simple) kəsilir. \"I was walking home when it started to rain.\" — Evə gedirdim (proses), yağış başladı (qısa hadisə).",
            ru: "Past Continuous выражает действие, которое длилось в конкретный момент в прошлом: «At 8 o'clock I was having dinner.» Часто используется вместе с Past Simple: длинное действие (Continuous) прерывается коротким (Simple). «I was walking home when it started to rain.» — Я шёл домой (процесс), пошёл дождь (короткое событие).",
          },
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "I was reading. They were waiting."],
            ["−", "I wasn't reading. They weren't waiting."],
            ["?", "Were you sleeping? What was she doing?"],
            ["when / while", "I was cooking when he called. While I was cooking, he called."],
          ],
        },
      ],
    },
    {
      id: "future",
      title: { az: "5. Future Continuous: gələcəkdə müəyyən anda", ru: "5. Future Continuous: в определённый момент в будущем" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Future Continuous gələcəkdə konkret anda davam edəcək hərəkəti bildirir: \"This time tomorrow I'll be flying to London.\" (Sabah bu vaxt Londona uçuram olacam — yəni təyyarədə olacağam.) Həmçinin nəzakətli sual üçün işlənir: \"Will you be using the car tonight?\" (Bu axşam maşından istifadə edəcəksən? — xahiş etməzdən əvvəl ehtiyatla soruşmaq).",
            ru: "Future Continuous выражает действие, которое будет длиться в конкретный момент в будущем: «This time tomorrow I'll be flying to London.» (Завтра в это время я буду лететь в Лондон.) Также используется для вежливого вопроса: «Will you be using the car tonight?» (Ты будешь пользоваться машиной вечером? — осторожно, прежде чем попросить.)",
          },
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "I'll be working at 10."],
            ["−", "I won't be working at 10."],
            ["?", "Will you be working at 10? — Yes, I will."],
          ],
        },
      ],
    },
    {
      id: "states",
      title: { az: "6. Vəziyyət feilləri: continuous-da işlənmir", ru: "6. Глаголы состояния: не используются в Continuous" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Bəzi feillər hərəkət deyil, vəziyyət bildirir: bilmək, sevmək, istəmək, sahib olmaq. Onlar adətən continuous formada işlənmir, hətta \"indi\" mənasında da: \"I know the answer\" (\"I am knowing\" yox), \"I want some water\" (\"I am wanting\" yox).",
            ru: "Некоторые глаголы выражают не действие, а состояние: знать, любить, хотеть, обладать. Обычно они не используются в Continuous даже в значении «сейчас»: «I know the answer» (не «I am knowing»), «I want some water» (не «I am wanting»).",
          },
        },
        {
          kind: "signals",
          words: ["know", "understand", "believe", "remember", "like", "love", "hate", "want", "need", "prefer", "own", "belong", "seem", "mean"],
          text: {
            az: "Bu feillər adətən Simple zamanlarda işlənir. İstisna: \"have\" sahiblik mənasında continuous olmur (\"I have a car\"), amma hərəkət mənasında olur: \"I'm having lunch\" (nahar edirəm), \"We're having a great time\".",
            ru: "Эти глаголы обычно используются в простых временах. Исключение: «have» в значении обладания не бывает в Continuous («I have a car»), но в значении действия — бывает: «I'm having lunch» (я обедаю), «We're having a great time».",
          },
        },
      ],
    },
    {
      id: "compare",
      title: { az: "7. Simple və Continuous: fərq nədir?", ru: "7. Simple и Continuous: в чём разница?" },
      blocks: [
        {
          kind: "compare",
          items: [
            { en: "I work in a bank. / I'm working at home today.", text: { az: "Birinci daimi vəziyyətdir, ikinci müvəqqəti.", ru: "Первое — постоянная ситуация, второе — временная." } },
            { en: "She drinks coffee. / She's drinking coffee.", text: { az: "Birinci vərdişdir (ümumiyyətlə içir), ikinci bu andır (indi içir).", ru: "Первое — привычка (вообще пьёт), второе — этот момент (сейчас пьёт)." } },
            { en: "I read a book yesterday. / I was reading a book at 9.", text: { az: "Past Simple bitmiş hərəkətdir. Past Continuous saat 9-da prosesin ortası; bitib-bitmədiyi vacib deyil.", ru: "Past Simple — законченное действие. Past Continuous — середина процесса в 9 часов; закончилось ли оно, не важно." } },
            { en: "I'll call you at 6. / I'll be driving at 6.", text: { az: "Will + feil saat 6-da baş verəcək hadisədir. Will be + -ing saat 6-da davam edəcək prosesdir (o vaxt maşın sürəcəyəm, zəng edə bilmərəm).", ru: "Will + глагол — событие в 6 часов. Will be + -ing — процесс, который будет идти в 6 (я буду за рулём, позвонить не смогу)." } },
          ],
        },
        {
          kind: "signals",
          words: ["now", "right now", "at the moment", "today", "this week", "Look!", "Listen!", "at 8 yesterday", "when", "while", "this time tomorrow"],
          text: {
            az: "Bu ifadələr continuous zamanlara işarədir. \"Now\" və \"at the moment\" Present Continuous, \"at 8 yesterday\" və \"while\" Past Continuous, \"this time tomorrow\" Future Continuous üçün tipikdir.",
            ru: "Эти выражения указывают на длительные времена. «Now» и «at the moment» — Present Continuous, «at 8 yesterday» и «while» — Past Continuous, «this time tomorrow» — Future Continuous.",
          },
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
            { en: "Sorry, I can't talk. I'm driving.", az: "Bağışla, danışa bilmirəm. Maşın sürürəm.", ru: "Извини, не могу говорить. Я за рулём." },
            { en: "What are you doing this weekend?", az: "Bu həftə sonu nə edirsən?", ru: "Что ты делаешь на этих выходных?" },
            { en: "The children are playing in the garden.", az: "Uşaqlar bağçada oynayırlar.", ru: "Дети играют в саду." },
            { en: "She isn't working today. She's ill.", az: "O, bu gün işləmir. Xəstədir.", ru: "Она сегодня не работает. Она болеет." },
            { en: "It's getting dark.", az: "Hava qaralır.", ru: "Темнеет." },
            { en: "What were you doing at midnight?", az: "Gecə yarısı nə edirdin?", ru: "Что ты делал в полночь?" },
            { en: "I was having a shower when the doorbell rang.", az: "Duş qəbul edirdim ki, qapı zəngi çalındı.", ru: "Я принимал душ, когда позвонили в дверь." },
            { en: "While we were walking, it started to snow.", az: "Biz gəzərkən qar yağmağa başladı.", ru: "Пока мы гуляли, пошёл снег." },
            { en: "This time next week I'll be lying on the beach.", az: "Gələn həftə bu vaxt çimərlikdə uzanmış olacağam.", ru: "На следующей неделе в это время я буду лежать на пляже." },
            { en: "Will you be using your laptop tonight?", az: "Bu axşam noutbukundan istifadə edəcəksən?", ru: "Ты будешь пользоваться ноутбуком вечером?" },
            { en: "I know you're tired, but we need to finish.", az: "Bilirəm ki, yorulmusan, amma bitirməliyik.", ru: "Я знаю, что ты устал, но нам нужно закончить." },
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
            { wrong: "I working now.", right: "I am working now.", why: { az: "\"Be\" köməkçi feili buraxılıb. -ing tək başına feil deyil.", ru: "Пропущен вспомогательный «be». Форма с -ing сама по себе не глагол." } },
            { wrong: "Do you working?", right: "Are you working?", why: { az: "Continuous-da köməkçi \"be\"-dir, \"do\" yox.", ru: "В Continuous вспомогательный глагол — «be», а не «do»." } },
            { wrong: "I am knowing him.", right: "I know him.", why: { az: "Know vəziyyət feilidir, continuous-da işlənmir.", ru: "Know — глагол состояния, в Continuous не используется." } },
            { wrong: "I am go to work every day.", right: "I go to work every day.", why: { az: "Vərdiş üçün Present Simple. \"Am\" + V1 heç vaxt düzgün deyil.", ru: "Для привычки — Present Simple. «Am» + V1 никогда не бывает правильным." } },
            { wrong: "When he called, I cooked.", right: "When he called, I was cooking.", why: { az: "Zəng gələndə bişirmə prosesdə idi — Past Continuous lazımdır. \"I cooked\" zəngdən sonra bişirməyə başladım deməkdir.", ru: "Когда он позвонил, готовка уже шла — нужен Past Continuous. «I cooked» значит, что я начал готовить после звонка." } },
            { wrong: "She is study English.", right: "She is studying English.", why: { az: "\"Is\"-dən sonra hərəkət feili -ing ilə gəlməlidir.", ru: "После «is» глагол действия должен быть с -ing." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Continuous = be + feil-ing: hərəkət prosesdədir.", ru: "Continuous = be + глагол-ing: действие в процессе." },
    { az: "Present: am/is/are + -ing (indi). Past: was/were + -ing (keçmiş an). Future: will be + -ing (gələcək an).", ru: "Present: am/is/are + -ing (сейчас). Past: was/were + -ing (момент в прошлом). Future: will be + -ing (момент в будущем)." },
    { az: "Uzun proses (Past Continuous) + qısa hadisə (Past Simple): I was cooking when he called.", ru: "Длинный процесс (Past Continuous) + короткое событие (Past Simple): I was cooking when he called." },
    { az: "Know, like, want, need kimi vəziyyət feilləri continuous-da işlənmir.", ru: "Глаголы состояния (know, like, want, need) не используются в Continuous." },
  ],
};
