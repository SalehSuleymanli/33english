import type { Teach } from "./types";

export const TEACH_16: Teach = {
  day: 16,
  summary: {
    az: "Bu dərsdə Present Perfect zamanını öyrənirsiniz: have / has + V3. Bu zaman keçmişi indiki anla bağlayır: həyat təcrübəsi, nəticəsi indi görünən hadisələr və indiyə qədər davam edən vəziyyətlər. Azərbaycan və rus dillərində dəqiq qarşılığı olmadığı üçün ən çətin mövzulardan biridir.",
    ru: "В этом уроке вы изучаете Present Perfect: have / has + V3. Это время связывает прошлое с настоящим: жизненный опыт, события с результатом в настоящем и ситуации, длящиеся до сих пор. Точного аналога в русском нет, поэтому это одна из самых трудных тем.",
  },
  sections: [
    {
      id: "idea",
      title: { az: "1. Əsas ideya: keçmiş + indi", ru: "1. Главная идея: прошлое + настоящее" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Past Simple keçmişdə bitmiş hadisədən danışır və bizi o vaxta aparır: \"I lost my keys yesterday\" (dünən açarlarımı itirdim). Present Perfect isə keçmiş hadisənin indiki nəticəsinə baxır: \"I have lost my keys\" (açarlarımı itirmişəm — indi açarım yoxdur, evə girə bilmirəm). Nə vaxt olduğu vacib deyil; vacib olan indiki vəziyyətdir.",
            ru: "Past Simple говорит о законченном событии в прошлом и переносит нас в то время: «I lost my keys yesterday» (вчера я потерял ключи). Present Perfect смотрит на результат прошлого события сейчас: «I have lost my keys» (я потерял ключи — сейчас их у меня нет, я не могу войти). Когда это произошло — неважно; важна ситуация сейчас.",
          },
        },
        {
          kind: "formula",
          label: { az: "Present Perfect", ru: "Present Perfect" },
          parts: [
            { text: "She", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "has", role: "aux", note: { az: "Köməkçi have/has. Sahiblik mənası YOXDUR (10-cu gün).", ru: "Вспомогательный have/has. Значения обладания НЕТ (10-й день)." } },
            { text: "finished", role: "verb", note: { az: "Feilin üçüncü forması (V3).", ru: "Третья форма глагола (V3)." } },
            { text: "the report", role: "object", note: { az: "Tamamlıq.", ru: "Дополнение." } },
          ],
          example: "She has finished the report.",
        },
      ],
    },
    {
      id: "uses",
      title: { az: "2. Üç əsas istifadə", ru: "2. Три основных употребления" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "İstifadə", ru: "Употребление" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["1. life experience (ever / never)", "I have been to Turkey three times. Have you ever tried sushi?"],
            ["2. recent action with a result now", "I've cut my finger. (it's bleeding) She has just left."],
            ["3. state from the past until now (for / since)", "We have lived here for ten years. I've known him since 2015."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Birinci istifadədə \"həyatım boyu, indiyə qədər\" mənası var: dəqiq vaxt verilmir. \"I have been to London\" — Londonda olmuşam (nə vaxt olduğu vacib deyil). Dəqiq vaxt deyən kimi Past Simple-a keçirik: \"I went to London in 2019.\"",
            ru: "В первом употреблении есть смысл «за всю жизнь, до сих пор»: точное время не называется. «I have been to London» — я бывал в Лондоне (когда — неважно). Как только называем точное время, переходим на Past Simple: «I went to London in 2019.»",
          },
        },
        {
          kind: "p",
          text: {
            az: "Üçüncü istifadə Azərbaycan və rus dilində indiki zamanla deyilir: \"On ildir burada yaşayırıq\" / «Мы живём здесь десять лет». İngilis dilində isə bu, Present Perfect-dir: \"We have lived here for ten years\". \"We live here for ten years\" səhvdir.",
            ru: "Третье употребление в русском передаётся настоящим временем: «Мы живём здесь десять лет». В английском это Present Perfect: «We have lived here for ten years». «We live here for ten years» — ошибка.",
          },
        },
      ],
    },
    {
      id: "forms",
      title: { az: "3. Formalar", ru: "3. Формы" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "I've (I have) seen it. She's (she has) gone."],
            ["−", "I haven't seen it. She hasn't called."],
            ["?", "Have you seen it? Has she called?"],
            ["Short answers", "Yes, I have. / No, I haven't. Yes, she has. / No, she hasn't."],
            ["Wh- ?", "Where have you been? How long have you worked here?"],
          ],
        },
        {
          kind: "compare",
          items: [
            { en: "She's gone to Paris. / She's been to Paris.", text: { az: "\"Gone to\" — Parisə gedib, hələ oradadır. \"Been to\" — Parisdə olub, artıq qayıdıb.", ru: "«Gone to» — уехала в Париж и всё ещё там. «Been to» — бывала в Париже и уже вернулась." } },
          ],
        },
      ],
    },
    {
      id: "signals",
      title: { az: "4. Siqnal sözlər: ever, never, already, yet, just, for, since", ru: "4. Слова-сигналы: ever, never, already, yet, just, for, since" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Söz", ru: "Слово" }, { az: "Məna və yer", ru: "Значение и место" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["ever", "heç (sualda) / когда-либо — before V3", "Have you ever been to Japan?"],
            ["never", "heç vaxt / никогда — before V3", "I've never seen snow."],
            ["already", "artıq / уже — before V3", "I've already eaten."],
            ["yet", "hələ (−) / artıq (?) / ещё, уже — end", "I haven't finished yet. Have you finished yet?"],
            ["just", "indicə / только что — before V3", "He's just arrived."],
            ["for", "müddət / в течение", "for two hours, for a long time, for years"],
            ["since", "başlanğıc nöqtəsi / с (какого-то момента)", "since Monday, since 2010, since I was a child"],
            ["so far / recently / lately / this week", "indiyə qədər / до сих пор, недавно", "I've read two books this month."],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "\"For\" müddəti (nə qədər?), \"since\" başlanğıcı (nə vaxtdan?) bildirir: for three years = since 2022. Azərbaycan dilində hər ikisi \"-dır\" (üç ildir) və ya \"-dan bəri\" kimi deyilir, ona görə seçimə diqqət edin.",
            ru: "«For» — длительность (сколько?), «since» — начальная точка (с какого времени?): for three years = since 2022. В русском оба часто передаются одинаково («уже три года», «с 2022»), поэтому будьте внимательны.",
          },
        },
      ],
    },
    {
      id: "vs-past",
      title: { az: "5. Present Perfect yoxsa Past Simple?", ru: "5. Present Perfect или Past Simple?" },
      blocks: [
        {
          kind: "compare",
          items: [
            { en: "I've lost my phone. / I lost my phone last week.", text: { az: "Vaxt göstərilmir, nəticə indi vacibdir → Perfect. Dəqiq keçmiş vaxt var (last week) → Past Simple.", ru: "Время не указано, важен результат сейчас → Perfect. Есть точное прошедшее время (last week) → Past Simple." } },
            { en: "Have you ever been to Gabala? — Yes, I went there last summer.", text: { az: "Söhbət Perfect ilə başlayır (təcrübə), detallar Past Simple ilə davam edir. Bu, çox təbii nümunədir.", ru: "Разговор начинается с Perfect (опыт), а подробности продолжаются в Past Simple. Это очень естественная схема." } },
            { en: "I've worked here for 5 years. / I worked there for 5 years.", text: { az: "Birincisi hələ də işləyirəm. İkincisi artıq orada işləmirəm.", ru: "В первом я до сих пор здесь работаю. Во втором — я там больше не работаю." } },
          ],
        },
        {
          kind: "signals",
          words: ["yesterday", "last year", "in 2018", "two days ago", "when I was…", "What time…?"],
          text: {
            az: "Bu ifadələr Present Perfect ilə işlənmir, çünki keçmişdə bitmiş konkret vaxtı göstərir. \"I have seen him yesterday\" səhvdir.",
            ru: "Эти выражения не используются с Present Perfect, потому что указывают на конкретное законченное время в прошлом. «I have seen him yesterday» — ошибка.",
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
            { en: "Have you ever met a famous person?", az: "Heç məşhur birisi ilə tanış olmusan?", ru: "Ты когда-нибудь встречал знаменитость?" },
            { en: "I've never been on a plane.", az: "Heç vaxt təyyarəyə minməmişəm.", ru: "Я никогда не летал на самолёте." },
            { en: "We've already booked the hotel.", az: "Oteli artıq bron etmişik.", ru: "Мы уже забронировали отель." },
            { en: "Has the bus left yet? — No, it hasn't.", az: "Avtobus artıq gedib? — Yox, hələ getməyib.", ru: "Автобус уже ушёл? — Нет, ещё нет." },
            { en: "She has just called you.", az: "O, indicə sənə zəng etdi.", ru: "Она только что тебе звонила." },
            { en: "I've known Rashad since school.", az: "Rəşadı məktəbdən tanıyıram.", ru: "Я знаю Рашада со школы." },
            { en: "They've been married for twenty years.", az: "İyirmi ildir evlidirlər.", ru: "Они женаты двадцать лет." },
            { en: "How long have you had this car?", az: "Bu maşın nə vaxtdan səndədir?", ru: "Сколько у тебя уже эта машина?" },
            { en: "Prices have gone up a lot.", az: "Qiymətlər çox qalxıb.", ru: "Цены сильно выросли." },
            { en: "I haven't seen her this week.", az: "Bu həftə onu görməmişəm.", ru: "На этой неделе я её не видел." },
            { en: "Someone has taken my pen!", az: "Kimsə qələmimi götürüb!", ru: "Кто-то взял мою ручку!" },
            { en: "Where have you been? I've been worried.", az: "Harada idin? Narahat olmuşdum.", ru: "Где ты был? Я волновался." },
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
            { wrong: "I live here since 2015.", right: "I have lived here since 2015.", why: { az: "Keçmişdən indiyə qədər davam edən vəziyyət → Present Perfect.", ru: "Ситуация из прошлого до сих пор → Present Perfect." } },
            { wrong: "I have seen him yesterday.", right: "I saw him yesterday.", why: { az: "Dəqiq keçmiş vaxt (yesterday) → Past Simple.", ru: "Точное прошедшее время (yesterday) → Past Simple." } },
            { wrong: "She has went home.", right: "She has gone home.", why: { az: "Have/has-dan sonra V3 (gone), V2 (went) yox.", ru: "После have/has — V3 (gone), а не V2 (went)." } },
            { wrong: "Did you ever eat plov?", right: "Have you ever eaten plov?", why: { az: "Həyat təcrübəsi sualı adətən Present Perfect ilə.", ru: "Вопрос о жизненном опыте обычно в Present Perfect." } },
            { wrong: "I know him for ten years.", right: "I have known him for ten years.", why: { az: "Know vəziyyət feilidir; davamlı vəziyyət üçün Present Perfect.", ru: "Know — глагол состояния; для длящегося состояния — Present Perfect." } },
            { wrong: "I haven't finished already.", right: "I haven't finished yet.", why: { az: "İnkarda \"yet\" (hələ), təsdiqdə \"already\" (artıq).", ru: "В отрицании — «yet» (ещё), в утверждении — «already» (уже)." } },
            { wrong: "since two years", right: "for two years", why: { az: "Müddət üçün for, başlanğıc üçün since.", ru: "Для длительности — for, для начальной точки — since." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Present Perfect: have/has + V3. Keçmişi indi ilə bağlayır.", ru: "Present Perfect: have/has + V3. Связывает прошлое с настоящим." },
    { az: "Təcrübə (ever, never), indiki nəticə (just, already, yet), indiyə qədər davam (for, since).", ru: "Опыт (ever, never), результат сейчас (just, already, yet), длится до сих пор (for, since)." },
    { az: "Dəqiq keçmiş vaxt varsa (yesterday, in 2019) → Past Simple.", ru: "Если есть точное прошедшее время (yesterday, in 2019) → Past Simple." },
    { az: "\"On ildir yaşayıram\" = I have lived… (indiki zaman yox!).", ru: "«Живу десять лет» = I have lived… (не настоящее время!)." },
  ],
};
