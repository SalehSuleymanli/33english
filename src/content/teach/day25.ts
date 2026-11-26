import type { Teach } from "./types";

export const TEACH_25: Teach = {
  day: 25,
  summary: {
    az: "Dünən \"used to + feil\" (keçmiş vərdiş) öyrəndiniz. Bu gün ona çox oxşayan iki quruluş: \"be used to\" — bir şeyə öyrəşmiş olmaq (vəziyyət, hərəkət yoxdur) və \"get used to\" — bir şeyə öyrəşmək (proses, hərəkət var). Hər ikisindən sonra isim və ya feil + -ing gəlir. Bu, qeydlərinizdəki 21-ci mövzudur: \"to be used to\" və \"to get used to\".",
    ru: "Вчера вы изучили «used to + глагол» (привычка в прошлом). Сегодня — две очень похожие структуры: «be used to» — быть привыкшим (состояние, без действия) и «get used to» — привыкать (процесс, есть действие). После обеих идёт существительное или глагол + -ing. Это тема 21 из ваших заметок: «to be used to» и «to get used to».",
  },
  sections: [
    {
      id: "be-used",
      title: { az: "1. Be used to + -ing / isim: öyrəşmiş olmaq", ru: "1. Be used to + -ing / существительное: быть привыкшим" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Be used to\" vəziyyətdir: bir şey sizin üçün artıq normal, tanışdır. Qeydlərinizdəki nümunə: \"I am used to playing football\" — mən futbol oynamağa öyrəşikliyəm (bu, ikinci tip cümlədir, yəni Frame 2: subyekt + be + …). Burada \"to\" ön sözdür, \"to + feil\" deyil, ona görə ondan sonra isim və ya -ing gəlir: \"used to the noise\", \"used to working\".",
            ru: "«Be used to» — состояние: что-то для вас уже привычно, нормально. Пример из ваших заметок: «I am used to playing football» — я привык играть в футбол (это предложение второго типа, то есть Frame 2: подлежащее + be + …). Здесь «to» — предлог, а не часть «to + глагол», поэтому после него идёт существительное или -ing: «used to the noise», «used to working».",
          },
        },
        {
          kind: "formula",
          label: { az: "Subyekt + be + used to + isim / V-ing", ru: "Подлежащее + be + used to + сущ. / V-ing" },
          parts: [
            { text: "She", role: "subject", note: { az: "Subyekt.", ru: "Подлежащее." } },
            { text: "is", role: "be", note: { az: "\"Be\" istənilən zamanda: is / was / will be.", ru: "«Be» в любом времени: is / was / will be." } },
            { text: "used to", role: "complement", note: { az: "Öyrəşmiş.", ru: "Привыкший." } },
            { text: "working at night", role: "verb", note: { az: "-ing və ya isim.", ru: "-ing или существительное." } },
          ],
          example: "She is used to working at night.",
        },
      ],
    },
    {
      id: "get-used",
      title: { az: "2. Get used to: öyrəşmək prosesi", ru: "2. Get used to: процесс привыкания" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Get used to\" dəyişikliyi, öyrəşmə prosesini bildirir: əvvəl qəribə idi, tədricən normal olur. Qeydlərinizdə iki forma var: \"I get used to playing football\" — öyrəşirəm (sadə zaman, ümumiyyətlə) və \"I am getting used to playing football\" — indi öyrəşməkdəyəm (davamedici zaman). Keçmişdə: \"I got used to the cold\" — soyuğa öyrəşdim.",
            ru: "«Get used to» выражает изменение, процесс привыкания: сначала было непривычно, постепенно становится нормальным. В ваших заметках две формы: «I get used to playing football» — привыкаю (простое время, вообще) и «I am getting used to playing football» — привыкаю сейчас (длительное время). В прошлом: «I got used to the cold» — я привык к холоду.",
          },
        },
        {
          kind: "tip",
          text: {
            az: "\"You'll get used to it\" — \"öyrəşəcəksən\". Yeni işə, şəhərə və ya məktəbə başlayan birinə deyilən ən tipik təsəlli ifadəsidir.",
            ru: "«You'll get used to it» — «привыкнешь». Самая типичная фраза поддержки для того, кто начал новую работу, переехал или пошёл в новую школу.",
          },
        },
      ],
    },
    {
      id: "compare",
      title: { az: "3. Üç oxşar quruluş yan-yana", ru: "3. Три похожие структуры рядом" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["used to + V1", "past habit, not now (Day 24)", "I used to drive to work."],
            ["be used to + V-ing / noun", "it's normal for me (state)", "I'm used to driving in Baku."],
            ["get used to + V-ing / noun", "becoming normal (process)", "I'm getting used to driving on the left."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Ən asan yoxlama: cümlədə \"be\" və ya \"get\" varsa, sonra -ing gəlir. \"Be\" və \"get\" yoxdursa, söhbət keçmiş vərdişdən gedir və sonra feilin sadə forması gəlir.",
            ru: "Самая простая проверка: если в предложении есть «be» или «get», дальше идёт -ing. Если «be» и «get» нет — речь о привычке в прошлом, и дальше идёт начальная форма глагола.",
          },
        },
      ],
    },
    {
      id: "tenses",
      title: { az: "4. Bütün zamanlarda", ru: "4. Во всех временах" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Zaman", ru: "Время" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["Present", "I'm used to the noise. / I get used to new places quickly."],
            ["Continuous", "I'm getting used to my new job."],
            ["Past", "I was used to the cold. / I got used to it."],
            ["Future", "You'll get used to it."],
            ["Perfect", "Have you got used to the new office yet?"],
            ["Negative", "I'm not used to it. / I can't get used to it."],
          ],
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
            { en: "I am used to playing football.", az: "Mən futbol oynamağa öyrəşikliyəm.", ru: "Я привык играть в футбол." },
            { en: "I get used to new places quickly.", az: "Yeni yerlərə tez öyrəşirəm.", ru: "Я быстро привыкаю к новым местам." },
            { en: "I am getting used to playing football.", az: "Futbol oynamağa öyrəşirəm (indi).", ru: "Я привыкаю играть в футбол (сейчас)." },
            { en: "I'm used to the noise of the city.", az: "Şəhərin səs-küyünə öyrəşmişəm.", ru: "Я привык к шуму города." },
            { en: "He isn't used to working in a team.", az: "O, komandada işləməyə öyrəşməyib.", ru: "Он не привык работать в команде." },
            { en: "It took me a month to get used to the new schedule.", az: "Yeni qrafikə öyrəşməyim bir ay çəkdi.", ru: "Мне понадобился месяц, чтобы привыкнуть к новому графику." },
            { en: "Don't worry, you'll get used to it.", az: "Narahat olma, öyrəşəcəksən.", ru: "Не волнуйся, привыкнешь." },
            { en: "Are you getting used to life in London?", az: "Londondakı həyata öyrəşirsən?", ru: "Ты привыкаешь к жизни в Лондоне?" },
            { en: "I'll never get used to waking up at five.", az: "Saat beşdə oyanmağa heç vaxt öyrəşməyəcəyəm.", ru: "Я никогда не привыкну вставать в пять." },
            { en: "She was used to hot weather, so Moscow was a shock.", az: "O, isti havaya öyrəşmişdi, ona görə Moskva onun üçün şok oldu.", ru: "Она привыкла к жаркой погоде, поэтому Москва стала для неё шоком." },
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
            { wrong: "I'm used to get up early.", right: "I'm used to getting up early.", why: { az: "Be used to-dan sonra -ing.", ru: "После be used to — форма -ing." } },
            { wrong: "I used to living here.", right: "I'm used to living here.", why: { az: "İndiki vəziyyət üçün be lazımdır: I'm used to.", ru: "Для состояния сейчас нужен be: I'm used to." } },
            { wrong: "I can't used to the food.", right: "I can't get used to the food.", why: { az: "Proses üçün get used to.", ru: "Для процесса — get used to." } },
            { wrong: "She is getting used to wake up early.", right: "She is getting used to waking up early.", why: { az: "Get used to-dan sonra da -ing.", ru: "После get used to тоже -ing." } },
            { wrong: "I didn't used to the cold.", right: "I wasn't used to the cold.", why: { az: "Be used to-nun inkarı be ilə: wasn't.", ru: "Отрицание be used to — через be: wasn't." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Be used to + -ing/isim: öyrəşmişəm (vəziyyət).", ru: "Be used to + -ing/сущ.: я привык (состояние)." },
    { az: "Get used to + -ing/isim: öyrəşirəm, öyrəşdim (proses).", ru: "Get used to + -ing/сущ.: привыкаю, привык (процесс)." },
    { az: "Be və ya get varsa → -ing. Yoxdursa → used to + V1 (keçmiş vərdiş).", ru: "Есть be или get → -ing. Нет → used to + V1 (привычка в прошлом)." },
  ],
};
