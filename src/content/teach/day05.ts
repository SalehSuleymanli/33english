import type { Teach } from "./types";

export const TEACH_05: Teach = {
  day: 5,
  summary: {
    az: "Bu dərsdə üçüncü çərçivəni, hərəkət çərçivəsini başlayırsınız: Subject + Verb. İlk zaman Present Simple-dır: vərdişlər, müntəzəm hərəkətlər və ümumi faktlar. Burada köməkçi feil (do / does) anlayışı ilk dəfə ortaya çıxır.",
    ru: "В этом уроке вы начинаете третью рамку — рамку действия: Subject + Verb. Первое время — Present Simple: привычки, регулярные действия и общие факты. Здесь впервые появляется понятие вспомогательного глагола (do / does).",
  },
  sections: [
    {
      id: "frame",
      title: { az: "1. Hərəkət çərçivəsi və onun zamanları", ru: "1. Рамка действия и её времена" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Vəziyyət çərçivəsində (am/is/are) kimin necə olduğunu deyirdik. Hərəkət çərçivəsində isə kimin nə etdiyini deyirik: işləyirəm, oxuyuram, yaşayıram. Burada əsas söz feildir: work, live, eat, play. Hərəkət çərçivəsinin bir neçə zamanı var və 5–7-ci günlərdə ən vacib altısını öyrənəcəksiniz.",
            ru: "В рамке состояния (am/is/are) мы говорили, какой кто-то. В рамке действия мы говорим, кто что делает: работаю, читаю, живу. Главное слово здесь — глагол: work, live, eat, play. У рамки действия несколько времён, и в дни 5–7 вы изучите шесть самых важных.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Zaman", ru: "Время" }, { az: "Nə üçün", ru: "Для чего" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["Present Simple (Day 5)", "habits, facts, routines", "I work every day."],
            ["Past Simple (Day 6)", "finished past actions", "I worked yesterday."],
            ["Future Simple (Day 6)", "decisions, predictions, promises", "I will work tomorrow."],
            ["Present Continuous (Day 7)", "happening now", "I am working now."],
            ["Past Continuous (Day 7)", "in progress at a past moment", "I was working at 8."],
            ["Future Continuous (Day 7)", "in progress at a future moment", "I will be working at 8."],
          ],
        },
      ],
    },
    {
      id: "meaning",
      title: { az: "2. Present Simple nə vaxt işlənir", ru: "2. Когда используется Present Simple" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Present Simple adına baxmayaraq \"indi baş verən\" hərəkət üçün deyil. O, ümumiyyətlə, müntəzəm və ya həmişə doğru olan şeylər üçündür. \"I drink coffee\" — mən qəhvə içirəm (ümumiyyətlə, vərdişim belədir). İndi, bu an içdiyimi demək üçün başqa zaman lazımdır: \"I am drinking coffee\" (7-ci gün).",
            ru: "Несмотря на название, Present Simple — не для действия, которое происходит прямо сейчас. Он для того, что бывает вообще, регулярно или всегда верно. «I drink coffee» — я пью кофе (вообще, это моя привычка). Чтобы сказать, что я пью кофе в данный момент, нужно другое время: «I am drinking coffee» (7-й день).",
          },
        },
        {
          kind: "table",
          head: [{ az: "İstifadə", ru: "Употребление" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["habits and routines", "I get up at 7. She goes to the gym on Mondays."],
            ["facts and general truths", "Water boils at 100 degrees. The sun rises in the east."],
            ["permanent situations", "They live in Baku. He works in a bank."],
            ["timetables", "The train leaves at 6:15. The film starts at 9."],
            ["likes, opinions, states", "I like tea. We know the answer. She needs help."],
          ],
        },
      ],
    },
    {
      id: "formula",
      title: { az: "3. Formula və üçüncü şəxs -s", ru: "3. Формула и окончание -s в третьем лице" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Təsdiq cümləsi", ru: "Утвердительное предложение" },
          parts: [
            { text: "She", role: "subject", note: { az: "Mübtəda: kim edir.", ru: "Подлежащее: кто делает." } },
            { text: "works", role: "verb", note: { az: "Feil. He/she/it ilə sonuna -s və ya -es artırılır.", ru: "Глагол. С he/she/it к нему добавляется -s или -es." } },
            { text: "in a hospital", role: "place", note: { az: "Harada? (istəyə bağlı)", ru: "Где? (необязательно)" } },
            { text: "every day", role: "time", note: { az: "Nə qədər tez-tez? (istəyə bağlı)", ru: "Как часто? (необязательно)" } },
          ],
          example: "She works in a hospital every day.",
        },
        {
          kind: "p",
          text: {
            az: "Present Simple-ın ən vacib qaydası: üçüncü şəxs təkdə (he, she, it, bir ad, bir əşya) feilin sonuna -s artırılır. I work, you work, we work, they work, amma he works, she works, Ali works. Azərbaycan dilində hər şəxsin öz şəkilçisi var (-ıram, -ırsan, -ır), ingilis dilində isə yalnız bir şəxs dəyişir, və elə onu unutmaq asandır.",
            ru: "Главное правило Present Simple: в третьем лице единственного числа (he, she, it, имя, предмет) к глаголу добавляется -s. I work, you work, we work, they work, но he works, she works, Ali works. В русском у каждого лица своё окончание, а в английском меняется только одно лицо — поэтому его так легко забыть.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Qayda", ru: "Правило" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["most verbs + s", "work → works, play → plays, read → reads"],
            ["-s, -sh, -ch, -x, -o + es", "watch → watches, wash → washes, go → goes, do → does"],
            ["consonant + y → ies", "study → studies, try → tries, fly → flies"],
            ["irregular", "have → has"],
          ],
        },
      ],
    },
    {
      id: "aux",
      title: { az: "4. Köməkçi feil do / does: inkar və sual", ru: "4. Вспомогательный глагол do / does: отрицание и вопрос" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Be\" ilə cümlələrdə sual və inkar asan idi: \"be\" özü önə keçir və ya \"not\" qəbul edir. Adi feillər isə bunu edə bilmir: \"Work you?\" və ya \"I work not\" deyilmir. Onlara köməkçi lazımdır: do və does. Köməkçi feil zamanı və şəxsi daşıyır, əsas feil isə sadə formada qalır.",
            ru: "В предложениях с «be» вопрос и отрицание строились просто: «be» сам выходит вперёд или принимает «not». Обычные глаголы так не умеют: нельзя сказать «Work you?» или «I work not». Им нужен помощник: do и does. Вспомогательный глагол несёт время и лицо, а основной глагол остаётся в начальной форме.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "I / you / we / they", ru: "I / you / we / they" }, { az: "he / she / it", ru: "he / she / it" }],
          rows: [
            ["+", "I work.", "She works."],
            ["−", "I don't (do not) work.", "She doesn't (does not) work."],
            ["?", "Do you work?", "Does she work?"],
            ["Short answers", "Yes, I do. / No, I don't.", "Yes, she does. / No, she doesn't."],
            ["Wh- ?", "Where do you work?", "Where does she work?"],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "-s yalnız bir dəfə yazılır. \"Does\" artıq -s daşıyır, ona görə əsas feil sadə qalır: \"Does she work?\", \"Does she works?\" yox. \"She doesn't work\", \"She doesn't works\" yox.",
            ru: "-s пишется только один раз. «Does» уже несёт -s, поэтому основной глагол остаётся без него: «Does she work?», а не «Does she works?». «She doesn't work», а не «She doesn't works».",
          },
        },
      ],
    },
    {
      id: "frequency",
      title: { az: "5. Tezlik zərfləri və siqnal sözlər", ru: "5. Наречия частоты и слова-сигналы" },
      blocks: [
        {
          kind: "signals",
          words: ["always", "usually", "often", "sometimes", "rarely", "never", "every day", "every week", "on Mondays", "twice a week", "in the morning"],
          text: {
            az: "Tezlik zərfləri (always, usually, often, sometimes, rarely, never) adi feildən əvvəl, amma \"be\"-dən sonra gəlir: \"I usually drink tea\", amma \"I am usually tired\". \"Every day\", \"twice a week\" kimi ifadələr isə cümlənin sonunda durur. \"Never\" artıq inkardır, ona görə \"don't\" lazım deyil: \"I never smoke\".",
            ru: "Наречия частоты (always, usually, often, sometimes, rarely, never) ставятся перед обычным глаголом, но после «be»: «I usually drink tea», но «I am usually tired». Выражения вроде «every day», «twice a week» стоят в конце предложения. «Never» уже отрицание, поэтому «don't» не нужен: «I never smoke».",
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
            {
              en: "I work. / I am working.",
              text: {
                az: "\"I work\" — ümumiyyətlə işləyirəm, işim var. \"I am working\" — elə indi, bu an işləyirəm (7-ci gün).",
                ru: "«I work» — я вообще работаю, у меня есть работа. «I am working» — я работаю прямо сейчас (7-й день).",
              },
            },
            {
              en: "Are you a student? / Do you study?",
              text: {
                az: "\"Be\" ilə sual kim olduğunu soruşur (2-ci çərçivə), \"do\" ilə sual nə etdiyini (3-cü çərçivə). Hər çərçivənin öz sual yolu var.",
                ru: "Вопрос с «be» спрашивает, кто ты (рамка 2), вопрос с «do» — что ты делаешь (рамка 3). У каждой рамки свой способ задать вопрос.",
              },
            },
            {
              en: "She doesn't like coffee. / She isn't a coffee person.",
              text: {
                az: "Hərəkət çərçivəsində inkar \"doesn't + feil\", vəziyyət çərçivəsində \"isn't + təsvir\". \"She isn't like coffee\" səhvdir.",
                ru: "В рамке действия отрицание — «doesn't + глагол», в рамке состояния — «isn't + описание». «She isn't like coffee» — ошибка.",
              },
            },
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
            { en: "I get up at seven and have breakfast at half past seven.", az: "Saat yeddidə oyanıram, yeddi yarımda səhər yeməyi yeyirəm.", ru: "Я встаю в семь и завтракаю в половине восьмого." },
            { en: "My husband works from home.", az: "Ərim evdən işləyir.", ru: "Мой муж работает из дома." },
            { en: "We don't watch TV in the evenings.", az: "Axşamlar televizor izləmirik.", ru: "По вечерам мы не смотрим телевизор." },
            { en: "Does your son go to school by bus?", az: "Oğlunuz məktəbə avtobusla gedir?", ru: "Ваш сын ездит в школу на автобусе?" },
            { en: "Yes, he does. / No, he doesn't. He walks.", az: "Bəli. / Xeyr, piyada gedir.", ru: "Да. / Нет, он ходит пешком." },
            { en: "What time does the shop open?", az: "Mağaza saat neçədə açılır?", ru: "Во сколько открывается магазин?" },
            { en: "She always drinks tea without sugar.", az: "O, həmişə çayı şəkərsiz içir.", ru: "Она всегда пьёт чай без сахара." },
            { en: "I never eat fast food.", az: "Heç vaxt fast food yemirəm.", ru: "Я никогда не ем фастфуд." },
            { en: "How often do you visit your parents?", az: "Valideynlərinə nə qədər tez-tez baş çəkirsən?", ru: "Как часто ты навещаешь родителей?" },
            { en: "It rains a lot in Lankaran.", az: "Lənkəranda çox yağış yağır.", ru: "В Ленкорани часто идут дожди." },
            { en: "My phone doesn't work.", az: "Telefonum işləmir.", ru: "Мой телефон не работает." },
            { en: "Where do you live? — I live in Khirdalan.", az: "Harada yaşayırsan? — Xırdalanda.", ru: "Где ты живёшь? — В Хырдалане." },
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
            { wrong: "He work in a bank.", right: "He works in a bank.", why: { az: "Üçüncü şəxs təkdə -s unudulub.", ru: "Забыто -s в третьем лице единственного числа." } },
            { wrong: "Does she works here?", right: "Does she work here?", why: { az: "-s artıq \"does\"-dadır, əsas feil sadə qalır.", ru: "-s уже в «does», основной глагол остаётся без него." } },
            { wrong: "I am work every day.", right: "I work every day.", why: { az: "Hərəkət feili ilə \"am\" işlənmir. \"Am\" yalnız vəziyyət üçün və ya -ing ilə (7-ci gün).", ru: "С глаголом действия «am» не используется. «Am» — только для состояния или с -ing (7-й день)." } },
            { wrong: "You like tea?", right: "Do you like tea?", why: { az: "Danışıqda intonasiya ilə sual mümkündür, amma düzgün sualda köməkçi \"do\" lazımdır.", ru: "В речи можно спросить интонацией, но в правильном вопросе нужен вспомогательный «do»." } },
            { wrong: "I don't never eat meat.", right: "I never eat meat.", why: { az: "Never özü inkardır; iki inkar olmaz.", ru: "Never само по себе отрицание; двойного отрицания не бывает." } },
            { wrong: "I drink always coffee.", right: "I always drink coffee.", why: { az: "Tezlik zərfi adi feildən əvvəl gəlir.", ru: "Наречие частоты ставится перед обычным глаголом." } },
            { wrong: "Where you work?", right: "Where do you work?", why: { az: "Sual sözündən sonra köməkçi feil lazımdır: Where + do + you + work?", ru: "После вопросительного слова нужен вспомогательный глагол: Where + do + you + work?" } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Present Simple: vərdişlər, faktlar, cədvəllər. İndi baş verən üçün deyil.", ru: "Present Simple: привычки, факты, расписания. Не для того, что происходит сейчас." },
    { az: "He/she/it ilə feilə -s: works, goes, studies, has.", ru: "С he/she/it к глаголу добавляется -s: works, goes, studies, has." },
    { az: "İnkar: don't / doesn't + feil. Sual: Do / Does + mübtəda + feil?", ru: "Отрицание: don't / doesn't + глагол. Вопрос: Do / Does + подлежащее + глагол?" },
    { az: "Tezlik zərfləri adi feildən əvvəl, \"be\"-dən sonra.", ru: "Наречия частоты — перед обычным глаголом, после «be»." },
  ],
};
