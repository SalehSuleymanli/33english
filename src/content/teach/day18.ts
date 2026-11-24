import type { Teach } from "./types";

export const TEACH_18: Teach = {
  day: 18,
  summary: {
    az: "Bu dərsdə bir-birinə çox oxşayan, amma mənaları fərqli olan üç quruluşu öyrənirsiniz: used to + feil (keçmişdəki vərdiş), be used to + -ing (bir şeyə öyrəşmiş olmaq) və get used to + -ing (bir şeyə öyrəşmək prosesi).",
    ru: "В этом уроке вы изучите три очень похожие, но разные по смыслу структуры: used to + глагол (привычка в прошлом), be used to + -ing (быть привыкшим к чему-то) и get used to + -ing (привыкать к чему-то).",
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
      id: "be-used",
      title: { az: "2. Be used to + -ing / isim: öyrəşmiş olmaq", ru: "2. Be used to + -ing / существительное: быть привыкшим" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Be used to\" vəziyyətdir: bir şey sizin üçün artıq normal, tanışdır. \"I'm used to getting up early\" — tez durmağa öyrəşmişəm (mənim üçün çətin deyil). Burada \"to\" ön sözdür, \"to + feil\" deyil, ona görə ondan sonra isim və ya -ing forması gəlir: \"used to the noise\", \"used to working\".",
            ru: "«Be used to» — состояние: что-то для вас уже привычно, нормально. «I'm used to getting up early» — я привык рано вставать (мне это не трудно). Здесь «to» — предлог, а не часть «to + глагол», поэтому после него идёт существительное или форма -ing: «used to the noise», «used to working».",
          },
        },
        {
          kind: "formula",
          label: { az: "Be used to", ru: "Be used to" },
          parts: [
            { text: "She", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
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
      title: { az: "3. Get used to: öyrəşmək prosesi", ru: "3. Get used to: процесс привыкания" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Get used to\" dəyişikliyi, öyrəşmə prosesini bildirir: əvvəl qəribə idi, tədricən normal olur. \"I'm getting used to the new job\" — yeni işə öyrəşirəm. \"I got used to the cold\" — soyuğa öyrəşdim. \"You'll get used to it\" — öyrəşəcəksən (çox işlənən təsəlli ifadəsi). Ondan sonra da isim və ya -ing gəlir.",
            ru: "«Get used to» выражает изменение, процесс привыкания: сначала было непривычно, постепенно становится нормальным. «I'm getting used to the new job» — я привыкаю к новой работе. «I got used to the cold» — я привык к холоду. «You'll get used to it» — привыкнешь (частая фраза-утешение). После него тоже существительное или -ing.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["used to + V1", "past habit, not now", "I used to drive to work."],
            ["be used to + -ing / noun", "it's normal for me (state)", "I'm used to driving in Baku."],
            ["get used to + -ing / noun", "becoming normal (process)", "I'm getting used to driving on the left."],
          ],
        },
      ],
    },
    {
      id: "would",
      title: { az: "4. Would: keçmiş vərdiş üçün alternativ", ru: "4. Would: альтернатива для привычки в прошлом" },
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
            { en: "I'm used to the noise of the city.", az: "Şəhərin səs-küyünə öyrəşmişəm.", ru: "Я привык к шуму города." },
            { en: "He isn't used to working in a team.", az: "O, komandada işləməyə öyrəşməyib.", ru: "Он не привык работать в команде." },
            { en: "It took me a month to get used to the new schedule.", az: "Yeni qrafikə öyrəşməyim bir ay çəkdi.", ru: "Мне понадобился месяц, чтобы привыкнуть к новому графику." },
            { en: "Don't worry, you'll get used to it.", az: "Narahat olma, öyrəşəcəksən.", ru: "Не волнуйся, привыкнешь." },
            { en: "Are you getting used to life in London?", az: "Londondakı həyata öyrəşirsən?", ru: "Ты привыкаешь к жизни в Лондоне?" },
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
            { wrong: "I'm used to get up early.", right: "I'm used to getting up early.", why: { az: "Be used to-dan sonra -ing.", ru: "После be used to — форма -ing." } },
            { wrong: "I used to living here.", right: "I used to live here. / I'm used to living here.", why: { az: "Keçmiş vərdiş → used to + V1. Öyrəşmək → be used to + -ing.", ru: "Привычка в прошлом → used to + V1. Привычность → be used to + -ing." } },
            { wrong: "I can't used to the food.", right: "I can't get used to the food.", why: { az: "Proses üçün get used to.", ru: "Для процесса — get used to." } },
            { wrong: "I would have long hair.", right: "I used to have long hair.", why: { az: "Vəziyyət (have) üçün would yox, used to.", ru: "Для состояния (have) — не would, а used to." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Used to + V1: keçmişdə idi, indi yoxdur. Sual/inkar: did … use to.", ru: "Used to + V1: раньше было, сейчас нет. Вопрос/отрицание: did … use to." },
    { az: "Be used to + -ing/isim: öyrəşmişəm (vəziyyət).", ru: "Be used to + -ing/существительное: я привык (состояние)." },
    { az: "Get used to + -ing/isim: öyrəşirəm, öyrəşdim (proses).", ru: "Get used to + -ing/существительное: привыкаю, привык (процесс)." },
    { az: "Would — keçmişdə təkrarlanan hərəkət, vəziyyət üçün yox.", ru: "Would — повторяющееся действие в прошлом, не для состояний." },
  ],
};
