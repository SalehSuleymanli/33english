import type { Teach } from "./types";

export const TEACH_24: Teach = {
  day: 24,
  summary: {
    az: "Bu dərsdə iki fikri birləşdirib insanları və əşyaları dəqiq təsvir etməyi öyrənirsiniz: who, which, that, whose, where ilə nisbi budaq cümlələri. \"The man who lives next door\", \"the phone that I bought\". Azərbaycan dilində bu, \"-an/-ən, -dığı\" kimi feili sifətlərlə verilir, ona görə quruluş tamamilə fərqlidir.",
    ru: "В этом уроке вы научитесь соединять две мысли и точно описывать людей и предметы с помощью относительных придаточных: who, which, that, whose, where. «The man who lives next door», «the phone that I bought». По-русски это «который», и порядок здесь похож, но есть важные отличия.",
  },
  sections: [
    {
      id: "idea",
      title: { az: "1. Nisbi budaq cümləsi nədir?", ru: "1. Что такое относительное придаточное?" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "İki cümləni götürək: \"I have a friend. He lives in London.\" Onları birləşdirmək üçün ikinci cümlədəki \"he\" əvəzinə \"who\" qoyuruq və onu birbaşa isimdən sonra yerləşdiririk: \"I have a friend who lives in London.\" Azərbaycan dilində təsvir isimdən ƏVVƏL gəlir (\"Londonda yaşayan dostum\"), ingilis dilində isə isimdən SONRA. Bu, ən vacib fərqdir.",
            ru: "Возьмём два предложения: «I have a friend. He lives in London.» Чтобы соединить их, заменяем «he» во втором на «who» и ставим его сразу после существительного: «I have a friend who lives in London.» По-русски так же: «друг, который живёт в Лондоне» — описание идёт после существительного, поэтому эта тема русскоговорящим обычно даётся легче.",
          },
        },
        {
          kind: "formula",
          label: { az: "İsim + nisbi əvəzlik + budaq cümlə", ru: "Существительное + относительное местоимение + придаточное" },
          parts: [
            { text: "The woman", role: "subject", note: { az: "Təsvir olunan isim.", ru: "Описываемое существительное." } },
            { text: "who", role: "connector", note: { az: "Nisbi əvəzlik: insan üçün who/that.", ru: "Относительное местоимение: для людей who/that." } },
            { text: "works with me", role: "verb", note: { az: "Budaq cümlə: isim haqqında məlumat.", ru: "Придаточное: информация о существительном." } },
            { text: "is from Ganja", role: "complement", note: { az: "Əsas cümlənin davamı.", ru: "Продолжение главного предложения." } },
          ],
          example: "The woman who works with me is from Ganja.",
        },
      ],
    },
    {
      id: "words",
      title: { az: "2. Who, which, that, whose, where", ru: "2. Who, which, that, whose, where" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Söz", ru: "Слово" }, { az: "Nə üçün", ru: "Для чего" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["who", "people", "The doctor who helped me was very kind."],
            ["which", "things, animals", "The car which I bought is red."],
            ["that", "people and things (informal, common)", "The man that called you. The book that I read."],
            ["whose", "possession (kimin / чей)", "That's the girl whose brother is a pilot."],
            ["where", "places", "This is the café where we first met."],
            ["when", "times", "I remember the day when I got my first job."],
            ["whom", "people as object (formal)", "The person whom I contacted…"],
          ],
        },
      ],
    },
    {
      id: "subject-object",
      title: { az: "3. Mübtəda və obyekt: \"that\"-i nə vaxt atmaq olar", ru: "3. Подлежащее и дополнение: когда можно опустить «that»" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Nisbi əvəzlik budaq cümlədə mübtəda ola bilər (\"the man who CALLED\" — kişi zəng etdi) və ya obyekt (\"the man who I CALLED\" — mən kişiyə zəng etdim). Əgər o, obyektdirsə (ondan sonra başqa mübtəda gəlirsə), danışıqda onu atmaq olar və çox vaxt atılır: \"the phone (that) I bought\", \"the people (who) we met\". Mübtəda olanda isə atmaq olmaz: \"the man who called\" — \"the man called\" başqa məna verir.",
            ru: "Относительное местоимение в придаточном может быть подлежащим («the man who CALLED» — мужчина позвонил) или дополнением («the man who I CALLED» — я позвонил мужчине). Если оно дополнение (после него идёт другое подлежащее), в речи его можно опустить, и так обычно и делают: «the phone (that) I bought», «the people (who) we met». Если же оно подлежащее, опускать нельзя: «the man who called» — без who смысл другой.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Rol", ru: "Роль" }, { az: "Atmaq olar?", ru: "Можно опустить?" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["subject (verb follows)", "No", "The bus that goes to the airport leaves at 6."],
            ["object (subject + verb follow)", "Yes", "The film (that) we watched was boring."],
          ],
        },
      ],
    },
    {
      id: "commas",
      title: { az: "4. Vergüllü və vergülsüz budaq cümlələr", ru: "4. Придаточные с запятыми и без" },
      blocks: [
        {
          kind: "compare",
          items: [
            { en: "My brother who lives in Moscow is a doctor.", text: { az: "Vergülsüz: məlumat lazımdır — deməli bir neçə qardaşım var, Moskvada yaşayanı həkimdir.", ru: "Без запятых: информация нужна для определения — значит, у меня несколько братьев, и врач тот, что живёт в Москве." } },
            { en: "My brother, who lives in Moscow, is a doctor.", text: { az: "Vergüllə: əlavə məlumatdır — bir qardaşım var, o həkimdir, yeri gəlmişkən Moskvada yaşayır. Vergüllə \"that\" işlənmir və əvəzliyi atmaq olmaz.", ru: "С запятыми: дополнительная информация — брат у меня один, он врач, кстати живёт в Москве. С запятыми «that» не используется, и местоимение опускать нельзя." } },
            { en: "She passed the exam, which surprised everyone.", text: { az: "\"Which\" bütün əvvəlki fikrə aid ola bilər: imtahandan keçməsi hamını təəccübləndirdi.", ru: "«Which» может относиться ко всей предыдущей мысли: то, что она сдала экзамен, всех удивило." } },
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
            { en: "The people who live upstairs are very noisy.", az: "Yuxarıda yaşayan adamlar çox səs-küylüdür.", ru: "Люди, которые живут наверху, очень шумные." },
            { en: "Is this the bus that goes to the centre?", az: "Mərkəzə gedən avtobus budur?", ru: "Это автобус, который идёт в центр?" },
            { en: "The phone I bought last week has stopped working.", az: "Keçən həftə aldığım telefon işləmir.", ru: "Телефон, который я купил на прошлой неделе, перестал работать." },
            { en: "I met a man whose son studies with you.", az: "Oğlu səninlə oxuyan bir kişi ilə tanış oldum.", ru: "Я познакомился с мужчиной, чей сын учится с тобой." },
            { en: "That's the restaurant where we had our wedding.", az: "Toyumuzu etdiyimiz restoran odur.", ru: "Это ресторан, где была наша свадьба." },
            { en: "Do you remember the year when we met?", az: "Tanış olduğumuz ili xatırlayırsan?", ru: "Помнишь год, когда мы познакомились?" },
            { en: "The teacher who taught me English was from Ireland.", az: "Mənə ingilis dili öyrədən müəllim İrlandiyadan idi.", ru: "Учитель, который учил меня английскому, был из Ирландии." },
            { en: "Everything (that) he said was true.", az: "Onun dediyi hər şey doğru idi.", ru: "Всё, что он сказал, было правдой." },
            { en: "My grandmother, who is 85, still cooks every day.", az: "85 yaşlı nənəm hələ də hər gün yemək bişirir.", ru: "Моя бабушка, которой 85 лет, до сих пор каждый день готовит." },
            { en: "He didn't call me, which made me angry.", az: "Mənə zəng etmədi və bu, məni əsəbiləşdirdi.", ru: "Он мне не позвонил, что меня разозлило." },
            { en: "The job she applied for was in Dubai.", az: "Onun müraciət etdiyi iş Dubayda idi.", ru: "Работа, на которую она подала заявку, была в Дубае." },
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
            { wrong: "The man which called you.", right: "The man who called you.", why: { az: "İnsan üçün who/that, which yox.", ru: "Для людей — who/that, не which." } },
            { wrong: "The book that I read it was great.", right: "The book that I read was great.", why: { az: "Əvəzlik təkrarlanmır: \"that\" artıq \"it\"-in yerini tutur.", ru: "Местоимение не повторяется: «that» уже заменяет «it»." } },
            { wrong: "In London living my friend.", right: "My friend who lives in London…", why: { az: "Təsvir isimdən sonra gəlir.", ru: "Описание ставится после существительного." } },
            { wrong: "The girl who her father is a pilot.", right: "The girl whose father is a pilot.", why: { az: "Sahiblik üçün whose.", ru: "Для принадлежности — whose." } },
            { wrong: "My mother, that is a teacher, …", right: "My mother, who is a teacher, …", why: { az: "Vergüllə \"that\" işlənmir.", ru: "С запятыми «that» не используется." } },
            { wrong: "The man called me is my uncle.", right: "The man who called me is my uncle.", why: { az: "Mübtəda rolunda olan əvəzliyi atmaq olmaz.", ru: "Местоимение в роли подлежащего опускать нельзя." } },
            { wrong: "The city which I was born.", right: "The city where I was born. / … which I was born in.", why: { az: "Yer üçün where (və ya which + ön söz).", ru: "Для места — where (или which + предлог)." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Who — insan, which — əşya, that — hər ikisi, whose — sahiblik, where — yer.", ru: "Who — люди, which — предметы, that — оба, whose — принадлежность, where — место." },
    { az: "Təsvir isimdən sonra gəlir: the man who lives next door.", ru: "Описание ставится после существительного: the man who lives next door." },
    { az: "Obyekt rolunda olan who/that atıla bilər: the film (that) we watched.", ru: "Who/that в роли дополнения можно опустить: the film (that) we watched." },
    { az: "Vergüllü budaq cümlə — əlavə məlumat; \"that\" işlənmir.", ru: "Придаточное с запятыми — доп. информация; «that» не используется." },
  ],
};
