import type { Teach } from "./types";

export const TEACH_24: Teach = {
  day: 24,
  summary: {
    az: "Bu dərsdə \"used to + feil\" quruluşunu öyrənirsiniz: keçmişdə adət halını almış, amma indi olmayan hərəkət və vəziyyətlər. \"I used to play tennis\" — əvvəllər tennis oynayırdım. Həmçinin sual və inkar (did … use to), \"there used to be\" və xatirələrdə işlənən \"would\". Sabah (25-ci gün) buna çox oxşayan \"be used to\" və \"get used to\"-nu öyrənəcəksiniz.",
    ru: "В этом уроке вы изучаете структуру «used to + глагол»: привычки и состояния в прошлом, которых сейчас уже нет. «I used to play tennis» — раньше я играл в теннис. Также вопрос и отрицание (did … use to), «there used to be» и «would» в воспоминаниях. Завтра (25-й день) — очень похожие «be used to» и «get used to».",
  },
  sections: [
    {
      id: "used-to",
      title: { az: "1. Used to + feil: keçmişdə idi, indi yoxdur", ru: "1. Used to + глагол: раньше было, теперь нет" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Used to\" keçmişdəki vərdiş və ya vəziyyəti bildirir, və o, artıq davam etmir. \"I used to smoke\" — əvvəllər siqaret çəkirdim (indi çəkmirəm). Azərbaycan dilində \"əvvəllər ...-ırdım\", rus dilində «раньше я …» deyirik. Bu quruluş yalnız keçmişdə işlənir; indiki vərdiş üçün Present Simple və \"usually\" lazımdır.",
            ru: "«Used to» выражает привычку или состояние в прошлом, которых уже нет. «I used to smoke» — раньше я курил (теперь нет). По-русски — «раньше я …». Эта структура бывает только в прошлом; для привычки в настоящем нужен Present Simple и «usually».",
          },
        },
        {
          kind: "formula",
          label: { az: "Used to + feil", ru: "Used to + глагол" },
          parts: [
            { text: "We", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "used to", role: "aux", note: { az: "Bütün şəxslər üçün eyni. Keçmiş mənası daşıyır.", ru: "Одинаково для всех лиц. Несёт значение прошлого." } },
            { text: "live", role: "verb", note: { az: "Feilin sadə forması.", ru: "Начальная форма глагола." } },
            { text: "in Sheki", role: "place", note: { az: "Yer / tamamlıq.", ru: "Место / дополнение." } },
          ],
          example: "We used to live in Sheki.",
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "I used to play football every day."],
            ["−", "I didn't use to like vegetables."],
            ["?", "Did you use to have long hair?"],
            ["also", "There used to be a cinema here."],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "Sual və inkarda \"did\" olduğu üçün \"used\" → \"use\" olur: didn't use to, did you use to. Bu, \"did\"-dən sonra feilin sadə forma qaydasının eynisidir.",
            ru: "В вопросе и отрицании есть «did», поэтому «used» → «use»: didn't use to, did you use to. Это то же правило: после «did» глагол в начальной форме.",
          },
        },
      ],
    },
    {
      id: "there-used",
      title: { az: "2. There used to be: əvvəllər burada … var idi", ru: "2. There used to be: раньше здесь был …" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Used to 1-ci gündəki \"there is / there are\" ilə birləşir: \"There used to be a cinema here\" — burada əvvəllər kinoteatr var idi (indi yoxdur). Şəhərin, evin, məktəbin necə dəyişdiyini danışmaq üçün çox rahatdır. Sual: \"Was there a cinema here?\" və ya \"Did there use to be a cinema here?\"",
            ru: "Used to сочетается с «there is / there are» из 1-го дня: «There used to be a cinema here» — раньше здесь был кинотеатр (сейчас нет). Очень удобно, чтобы рассказать, как изменился город, дом или школа. Вопрос: «Was there a cinema here?» или «Did there use to be a cinema here?»",
          },
        },
        {
          kind: "compare",
          items: [
            { en: "There was a cinema here in 1990.", text: { az: "Sadə fakt: 1990-cı ildə var idi.", ru: "Простой факт: в 1990 году был." } },
            { en: "There used to be a cinema here.", text: { az: "Uzun müddət var idi, indi yoxdur — dəyişiklik vurğulanır.", ru: "Долго был, а теперь нет — подчёркивается перемена." } },
          ],
        },
      ],
    },
    {
      id: "now",
      title: { az: "3. İndi üçün used to işlənmir", ru: "3. Для настоящего used to не используется" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Used to yalnız keçmişdir. İndiki vərdiş üçün Present Simple və \"usually\" lazımdır: \"I usually get up at 7\", \"I use to get up at 7\" yox. Azərbaycan dilində \"adətən\", rus dilində «обычно» desəniz — Present Simple seçin; \"əvvəllər\", «раньше» desəniz — used to.",
            ru: "Used to — только прошлое. Для привычки в настоящем нужен Present Simple и «usually»: «I usually get up at 7», а не «I use to get up at 7». Если по-русски вы говорите «обычно» — выбирайте Present Simple; если «раньше» — used to.",
          },
        },
        {
          kind: "signals",
          words: ["not anymore", "no longer", "these days", "now", "back then", "as a child", "when I was young"],
          text: {
            az: "Bu sözlər \"əvvəl\" ilə \"indi\" arasındakı fərqi göstərir və used to ilə tez-tez işlənir: \"I used to smoke, but not anymore.\"",
            ru: "Эти слова показывают разницу между «тогда» и «сейчас» и часто идут с used to: «I used to smoke, but not anymore.»",
          },
        },
      ],
    },
    {
      id: "would",
      title: { az: "4. Would: xatirələrdə təkrarlanan hərəkət", ru: "4. Would: повторяющиеся действия в воспоминаниях" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Xatirələr danışanda keçmişdə təkrarlanan hərəkətlər üçün \"would\" da işlənir: \"Every summer we would go to the village.\" Amma vəziyyət feilləri ilə (be, have, live, like) yalnız \"used to\" olar: \"I used to have a dog\", \"I would have a dog\" yox.",
            ru: "В воспоминаниях для повторявшихся действий в прошлом используется и «would»: «Every summer we would go to the village.» Но с глаголами состояния (be, have, live, like) — только «used to»: «I used to have a dog», а не «I would have a dog».",
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
            { en: "I used to be afraid of dogs.", az: "Əvvəllər itlərdən qorxurdum.", ru: "Раньше я боялся собак." },
            { en: "My grandfather used to tell us stories.", az: "Babam bizə nağıllar danışardı.", ru: "Дедушка раньше рассказывал нам истории." },
            { en: "Did you use to play any sport?", az: "Əvvəllər idmanla məşğul olurdun?", ru: "Ты раньше занимался каким-нибудь спортом?" },
            { en: "There used to be a market here.", az: "Burada əvvəllər bazar var idi.", ru: "Раньше здесь был рынок." },
            { en: "She didn't use to drink coffee.", az: "O, əvvəllər qəhvə içmirdi.", ru: "Раньше она не пила кофе." },
            { en: "I used to play tennis.", az: "Mən əvvəllər tennis oynayırdım.", ru: "Раньше я играл в теннис." },
            { en: "I used to speak Spanish.", az: "Mən əvvəllər ispanca danışırdım.", ru: "Раньше я говорил по-испански." },
            { en: "I used to have blonde hair.", az: "Əvvəllər saçlarım sarı idi.", ru: "Раньше у меня были светлые волосы." },
            { en: "We didn't use to have a car.", az: "Əvvəllər maşınımız yox idi.", ru: "Раньше у нас не было машины." },
            { en: "He no longer lives here.", az: "O, artıq burada yaşamır.", ru: "Он здесь больше не живёт." },
            { en: "When I was a child, we would spend every summer by the sea.", az: "Uşaq olanda hər yayı dəniz kənarında keçirərdik.", ru: "В детстве мы каждое лето проводили у моря." },
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
            { wrong: "I use to get up at 7 every day.", right: "I usually get up at 7.", why: { az: "İndiki vərdiş üçün used to işlənmir; Present Simple + usually.", ru: "Для привычки в настоящем used to не используется; Present Simple + usually." } },
            { wrong: "I didn't used to like it.", right: "I didn't use to like it.", why: { az: "Did-dən sonra use (sadə forma).", ru: "После did — use (начальная форма)." } },
            { wrong: "I used to living here.", right: "I used to live here.", why: { az: "Used to + V1 (sadə forma), -ing yox.", ru: "Used to + V1 (начальная форма), не -ing." } },
            { wrong: "I use to play tennis when I was young.", right: "I used to play tennis when I was young.", why: { az: "Təsdiq cümləsində used (d ilə).", ru: "В утверждении — used (с d)." } },
            { wrong: "I would have long hair.", right: "I used to have long hair.", why: { az: "Vəziyyət (have) üçün would yox, used to.", ru: "Для состояния (have) — не would, а used to." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Used to + V1: keçmişdə idi, indi yoxdur. Sual/inkar: did … use to.", ru: "Used to + V1: раньше было, сейчас нет. Вопрос/отрицание: did … use to." },
    { az: "There used to be — əvvəllər var idi, indi yoxdur.", ru: "There used to be — раньше был, теперь нет." },
    { az: "İndiki vərdiş üçün used to yox, Present Simple + usually.", ru: "Для привычки сейчас — не used to, а Present Simple + usually." },
    { az: "Would — keçmişdə təkrarlanan hərəkət, vəziyyət üçün yox.", ru: "Would — повторяющееся действие в прошлом, не для состояний." },
  ],
};
