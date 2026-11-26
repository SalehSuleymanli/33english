import type { Teach } from "./types";

export const TEACH_06: Teach = {
  day: 6,
  summary: {
    az: "Bu dərsdə hərəkət çərçivəsini keçmiş və gələcəyə keçirirsiniz: Past Simple (I worked, I went) və Future Simple (I will work). Ən vacib qaydalar: düzgün və düzgün olmayan feillər, köməkçi \"did\" və \"will\".",
    ru: "В этом уроке вы переносите рамку действия в прошлое и будущее: Past Simple (I worked, I went) и Future Simple (I will work). Главные правила: правильные и неправильные глаголы, вспомогательные «did» и «will».",
  },
  sections: [
    {
      id: "past-meaning",
      title: { az: "1. Past Simple: bitmiş keçmiş hərəkət", ru: "1. Past Simple: законченное действие в прошлом" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Past Simple keçmişdə başlayıb bitmiş hərəkət üçün işlənir. Adətən nə vaxt olduğu bəllidir və ya kontekstdən aydındır: dünən, keçən il, 2019-cu ildə, uşaq olanda. Hekayə danışanda ardıcıl hərəkətlər də Past Simple ilə verilir: \"I opened the door, saw a cat and laughed.\"",
            ru: "Past Simple используется для действия, которое началось и закончилось в прошлом. Обычно известно, когда это было, или это понятно из контекста: вчера, в прошлом году, в 2019-м, в детстве. В рассказе последовательные действия тоже передаются через Past Simple: «I opened the door, saw a cat and laughed.»",
          },
        },
        {
          kind: "formula",
          label: { az: "Təsdiq cümləsi", ru: "Утвердительное предложение" },
          parts: [
            { text: "We", role: "subject", note: { az: "Mübtəda. Bütün şəxslər üçün forma eynidir.", ru: "Подлежащее. Форма одинакова для всех лиц." } },
            { text: "visited", role: "verb", note: { az: "Feilin keçmiş forması (V2): düzgün feillərdə -ed.", ru: "Форма прошедшего времени (V2): у правильных глаголов -ed." } },
            { text: "our grandparents", role: "object", note: { az: "Tamamlıq: kimi? nəyi?", ru: "Дополнение: кого? что?" } },
            { text: "last Sunday", role: "time", note: { az: "Keçmiş zaman ifadəsi.", ru: "Выражение прошедшего времени." } },
          ],
          example: "We visited our grandparents last Sunday.",
        },
      ],
    },
    {
      id: "regular",
      title: { az: "2. Düzgün feillər: -ed və tələffüz", ru: "2. Правильные глаголы: -ed и произношение" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Qayda", ru: "Правило" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+ ed", "work → worked, play → played, watch → watched"],
            ["-e + d", "live → lived, like → liked, close → closed"],
            ["consonant + y → ied", "study → studied, try → tried (but play → played)"],
            ["short verb: double consonant", "stop → stopped, plan → planned"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "-ed sonluğu üç cür oxunur: /t/ (worked, watched), /d/ (played, lived) və /ɪd/ — yalnız feil t və ya d ilə bitəndə (wanted, needed). Ən çox edilən səhv hər sözdə \"-ed\"-i ayrıca heca kimi oxumaqdır: \"work-ed\" deyil, \"workt\".",
            ru: "Окончание -ed читается тремя способами: /t/ (worked, watched), /d/ (played, lived) и /ɪd/ — только если глагол оканчивается на t или d (wanted, needed). Самая частая ошибка — произносить «-ed» отдельным слогом везде: не «work-ed», а «workt».",
          },
        },
      ],
    },
    {
      id: "irregular",
      title: { az: "3. Düzgün olmayan feillər", ru: "3. Неправильные глаголы" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Ən çox işlənən feillərin çoxu düzgün deyil: onların keçmiş forması -ed ilə deyil, xüsusi sözlə düzəlir. Bunları əzbərləmək lazımdır, amma narahat olmayın: gündəlik danışıqda 30–40 feil kifayətdir. Aşağıdakı cədvəldə ən vacibləri var. Üçüncü sütun (V3) Perfect zamanlarda və Passive-də lazım olacaq.",
            ru: "Многие самые частые глаголы неправильные: их прошедшая форма образуется не через -ed, а особым словом. Их нужно выучить, но не волнуйтесь: для повседневной речи хватит 30–40 глаголов. В таблице ниже — самые важные. Третья колонка (V3) понадобится во временах Perfect и в Passive.",
          },
        },
        {
          kind: "table",
          head: [{ az: "V1 (əsas)", ru: "V1 (начальная)" }, { az: "V2 (keçmiş)", ru: "V2 (прошедшее)" }, { az: "V3", ru: "V3" }],
          rows: [
            ["be", "was / were", "been"], ["have", "had", "had"], ["do", "did", "done"], ["go", "went", "gone"],
            ["come", "came", "come"], ["see", "saw", "seen"], ["get", "got", "got / gotten"], ["make", "made", "made"],
            ["take", "took", "taken"], ["give", "gave", "given"], ["say", "said", "said"], ["tell", "told", "told"],
            ["know", "knew", "known"], ["think", "thought", "thought"], ["buy", "bought", "bought"], ["bring", "brought", "brought"],
            ["eat", "ate", "eaten"], ["drink", "drank", "drunk"], ["write", "wrote", "written"], ["read", "read /red/", "read /red/"],
            ["speak", "spoke", "spoken"], ["leave", "left", "left"], ["meet", "met", "met"], ["pay", "paid", "paid"],
            ["sleep", "slept", "slept"], ["find", "found", "found"], ["lose", "lost", "lost"], ["begin", "began", "begun"],
            ["put", "put", "put"], ["cost", "cost", "cost"],
          ],
        },
      ],
    },
    {
      id: "did",
      title: { az: "4. Did: keçmişdə inkar və sual", ru: "4. Did: отрицание и вопрос в прошедшем" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Present Simple-dakı \"do/does\" keçmişdə \"did\" olur və bütün şəxslər üçün eynidir. Ən vacib qayda: \"did\" keçmiş zamanı artıq göstərir, ona görə əsas feil sadə formaya (V1) qayıdır. \"Did you see?\" düzgündür, \"Did you saw?\" səhvdir. \"I didn't go\" düzgündür, \"I didn't went\" səhvdir.",
            ru: "«Do/does» из Present Simple в прошедшем превращается в «did» — одинаково для всех лиц. Главное правило: «did» уже показывает прошедшее время, поэтому основной глагол возвращается в начальную форму (V1). «Did you see?» — правильно, «Did you saw?» — ошибка. «I didn't go» — правильно, «I didn't went» — ошибка.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Quruluş", ru: "Структура" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "subject + V2", "She called me. They went home."],
            ["−", "subject + didn't + V1", "She didn't call me. They didn't go home."],
            ["?", "Did + subject + V1?", "Did she call you? Did they go home?"],
            ["Short answers", "Yes, … did. / No, … didn't.", "Yes, she did. / No, they didn't."],
            ["Wh- ?", "Wh- + did + subject + V1?", "Where did you go? What did she say?"],
          ],
        },
      ],
    },
    {
      id: "future",
      title: { az: "5. Future Simple: will + feil", ru: "5. Future Simple: will + глагол" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Will + feilin əsas forması gələcək hərəkəti bildirir. Bütün şəxslər üçün eynidir, -s artırılmır. Will əsasən dörd vəziyyətdə işlənir: danışıq anında verilən qərar (\"The phone is ringing. I'll answer it.\"), söz vermək (\"I'll call you tonight.\"), proqnoz (\"It will rain tomorrow.\") və təklif (\"I'll help you with your bags.\").",
            ru: "Will + начальная форма глагола выражает будущее действие. Форма одинакова для всех лиц, -s не добавляется. Will используется в основном в четырёх случаях: решение в момент речи («The phone is ringing. I'll answer it.»), обещание («I'll call you tonight.»), прогноз («It will rain tomorrow.») и предложение помощи («I'll help you with your bags.»).",
          },
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "I'll (I will) see you tomorrow."],
            ["−", "I won't (will not) forget."],
            ["?", "Will you come? — Yes, I will. / No, I won't."],
            ["Wh- ?", "When will they arrive?"],
          ],
        },
        {
          kind: "compare",
          items: [
            {
              en: "I'll buy a car. / I'm going to buy a car.",
              text: {
                az: "\"Will\" — qərar indi verilir və ya ümumi niyyətdir. \"Going to\" — qərar əvvəlcədən verilib, plan artıq var (18-ci gündə ətraflı). Başlanğıc üçün sadə qayda: plan → going to, ani qərar və söz → will.",
                ru: "«Will» — решение принимается сейчас или это общее намерение. «Going to» — решение принято заранее, план уже есть (подробнее на 18-й день). Простое правило для начала: план → going to, мгновенное решение и обещание → will.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "signals",
      title: { az: "6. Siqnal sözlər", ru: "6. Слова-сигналы" },
      blocks: [
        {
          kind: "signals",
          words: ["yesterday", "last week", "ago", "in 2020", "when I was…", "then", "after that", "tomorrow", "next month", "soon", "probably", "I think", "maybe"],
          text: {
            az: "Keçmiş ifadələri Past Simple-ı, gələcək ifadələri will-i çağırır. \"I think\", \"probably\", \"maybe\" ilə proqnozlarda çox vaxt will gəlir: \"I think she'll like it.\" \"Probably\" will-dən sonra, amma won't-dan əvvəl durur: \"He'll probably call\", \"He probably won't call\".",
            ru: "Выражения прошлого требуют Past Simple, выражения будущего — will. С «I think», «probably», «maybe» в прогнозах обычно стоит will: «I think she'll like it.» «Probably» ставится после will, но перед won't: «He'll probably call», «He probably won't call».",
          },
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
            { en: "I watched a good film last night.", az: "Dünən gecə yaxşı film izlədim.", ru: "Вчера вечером я посмотрел хороший фильм." },
            { en: "We went to Gabala in August.", az: "Avqustda Qəbələyə getdik.", ru: "В августе мы ездили в Габалу." },
            { en: "She didn't answer my message.", az: "O, mesajıma cavab vermədi.", ru: "Она не ответила на моё сообщение." },
            { en: "Did you have breakfast? — Yes, I did.", az: "Səhər yeməyi yedin? — Bəli.", ru: "Ты позавтракал? — Да." },
            { en: "What did the doctor say?", az: "Həkim nə dedi?", ru: "Что сказал врач?" },
            { en: "I bought this jacket two years ago.", az: "Bu gödəkçəni iki il əvvəl almışam.", ru: "Я купил эту куртку два года назад." },
            { en: "They arrived late and left early.", az: "Gec gəldilər, tez getdilər.", ru: "Они пришли поздно и ушли рано." },
            { en: "I'll send you the file tonight.", az: "Faylı bu axşam sənə göndərəcəyəm.", ru: "Я пришлю тебе файл сегодня вечером." },
            { en: "Don't worry, I won't tell anyone.", az: "Narahat olma, heç kimə deməyəcəyəm.", ru: "Не волнуйся, я никому не скажу." },
            { en: "Will you help me with this? — Of course I will.", az: "Bu işdə mənə kömək edərsən? — Əlbəttə.", ru: "Поможешь мне с этим? — Конечно." },
            { en: "I think it will be sunny tomorrow.", az: "Məncə, sabah hava günəşli olacaq.", ru: "Думаю, завтра будет солнечно." },
            { en: "Where did you meet your wife?", az: "Həyat yoldaşınla harada tanış oldun?", ru: "Где ты познакомился с женой?" },
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
            { wrong: "I didn't went to work.", right: "I didn't go to work.", why: { az: "\"Didn't\"-dən sonra feil sadə formada (V1) olur.", ru: "После «didn't» глагол в начальной форме (V1)." } },
            { wrong: "Did you saw him?", right: "Did you see him?", why: { az: "Keçmiş zamanı \"did\" göstərir; əsas feil V1-də qalır.", ru: "Прошедшее время показывает «did»; основной глагол остаётся в V1." } },
            { wrong: "Yesterday I go to the cinema.", right: "Yesterday I went to the cinema.", why: { az: "Keçmiş zaman ifadəsi var, feil V2-də olmalıdır.", ru: "Есть выражение прошлого — глагол должен быть в V2." } },
            { wrong: "I buyed a phone.", right: "I bought a phone.", why: { az: "Buy düzgün olmayan feildir: buy → bought.", ru: "Buy — неправильный глагол: buy → bought." } },
            { wrong: "She will calls you.", right: "She will call you.", why: { az: "Will-dən sonra -s artırılmır.", ru: "После will -s не добавляется." } },
            { wrong: "I will to go.", right: "I will go.", why: { az: "Will-dən sonra \"to\" gəlmir.", ru: "После will не ставится «to»." } },
            { wrong: "When you arrived?", right: "When did you arrive?", why: { az: "Sual sözündən sonra köməkçi \"did\" lazımdır.", ru: "После вопросительного слова нужен вспомогательный «did»." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Past Simple: bitmiş keçmiş hərəkət. Düzgün feillər -ed, düzgün olmayanlar xüsusi forma (V2).", ru: "Past Simple: законченное действие в прошлом. Правильные глаголы с -ed, неправильные — особая форма (V2)." },
    { az: "İnkar: didn't + V1. Sual: Did + mübtəda + V1?", ru: "Отрицание: didn't + V1. Вопрос: Did + подлежащее + V1?" },
    { az: "Future Simple: will + V1 — ani qərar, söz, proqnoz, təklif. İnkar won't.", ru: "Future Simple: will + V1 — мгновенное решение, обещание, прогноз, предложение. Отрицание won't." },
    { az: "Will-dən sonra nə -s, nə də \"to\".", ru: "После will ни -s, ни «to»." },
  ],
};
