import type { Teach } from "./types";

export const TEACH_31: Teach = {
  day: 31,
  summary: {
    az: "Bu dərsdə hekayə danışmağı öyrənirsiniz: hadisələri ardıcıllıqla vermək üçün bağlayıcılar (first, then, after that, meanwhile, eventually) və hekayə zamanları — Past Simple, Past Continuous və Past Perfect birlikdə. Yaxşı hekayə danışmaq həm gündəlik söhbətdə, həm də IELTS-in ikinci hissəsində ən vacib bacarıqlardan biridir.",
    ru: "В этом уроке вы учитесь рассказывать истории: связки для последовательности событий (first, then, after that, meanwhile, eventually) и времена рассказа — Past Simple, Past Continuous и Past Perfect вместе. Умение хорошо рассказать историю — один из главных навыков и в разговоре, и во второй части IELTS.",
  },
  sections: [
    {
      id: "tenses",
      title: { az: "1. Hekayə zamanları: üç keçmiş zaman birlikdə", ru: "1. Времена рассказа: три прошедших времени вместе" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Zaman", ru: "Время" }, { az: "Hekayədəki rolu", ru: "Роль в рассказе" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["Past Continuous", "background: what was happening", "It was raining and people were hurrying home."],
            ["Past Simple", "main events, one after another", "I opened the door, saw a strange man and screamed."],
            ["Past Perfect", "something that happened earlier", "I realised I had left my keys at work."],
          ],
        },
        {
          kind: "formula",
          label: { az: "Past Perfect: had + V3", ru: "Past Perfect: had + V3" },
          parts: [
            { text: "When I arrived,", role: "time", note: { az: "Keçmişdəki bir an (Past Simple).", ru: "Момент в прошлом (Past Simple)." } },
            { text: "the film", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "had already started", role: "verb", note: { az: "Ondan da ƏVVƏL olan hadisə: had + V3.", ru: "Событие ещё РАНЬШЕ: had + V3." } },
          ],
          example: "When I arrived, the film had already started.",
        },
        {
          kind: "p",
          text: {
            az: "Past Perfect keçmişin keçmişidir. Hekayədə artıq keçmişdəyik, və ondan da əvvəl baş verən şeyi göstərmək lazımdır: \"When I got to the station, the train had left\" — stansiyaya çatanda qatar artıq getmişdi (əvvəl qatar getdi, sonra mən çatdım). Müqayisə edin: \"When I got to the station, the train left\" — mən çatanda qatar yola düşdü (eyni anda).",
            ru: "Past Perfect — это «прошлое в прошлом». В рассказе мы уже в прошлом, и нужно показать то, что было ещё раньше: «When I got to the station, the train had left» — когда я добрался до вокзала, поезд уже ушёл (сначала ушёл поезд, потом пришёл я). Сравните: «When I got to the station, the train left» — когда я пришёл, поезд отправился (в тот же момент).",
          },
        },
      ],
    },
    {
      id: "sequence",
      title: { az: "2. Ardıcıllıq bildirən sözlər", ru: "2. Слова последовательности" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Mərhələ", ru: "Этап" }, { az: "Sözlər", ru: "Слова" }],
          rows: [
            ["beginning", "First, / At first, / In the beginning, / One day, / It all started when…"],
            ["next events", "Then, / After that, / Next, / Later, / A few minutes later,"],
            ["at the same time", "Meanwhile, / While …, / As …,"],
            ["sudden events", "Suddenly, / All of a sudden, / Just then,"],
            ["end", "Finally, / In the end, / Eventually, / At last,"],
            ["comment", "Luckily, / Unfortunately, / Surprisingly, / To my surprise,"],
          ],
        },
        {
          kind: "compare",
          items: [
            { en: "Finally / At last / In the end / Eventually", text: { az: "Finally — siyahıda sonuncu və ya uzun gözləmədən sonra. At last — nəhayət (səbirsizliklə gözlənilən). In the end — bütün hadisələrdən sonra nəticə. Eventually — uzun prosesdən sonra, sonda.", ru: "Finally — последнее в списке или после долгого ожидания. At last — наконец-то (долгожданное). In the end — итог после всех событий. Eventually — в конце концов, после долгого процесса." } },
            { en: "At first / First", text: { az: "First — birincisi (siyahı). At first — əvvəlcə (sonra vəziyyət dəyişdi): \"At first I hated it, but now I love it.\"", ru: "First — во-первых (список). At first — сначала (потом всё изменилось): «At first I hated it, but now I love it.»" } },
          ],
        },
      ],
    },
    {
      id: "structure",
      title: { az: "3. Yaxşı hekayənin quruluşu", ru: "3. Структура хорошей истории" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Hissə", ru: "Часть" }, { az: "Nə deyilir", ru: "Что говорится" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["1. Set the scene", "when, where, who, background (Past Continuous)", "It was a cold evening last December. I was walking home from work."],
            ["2. The problem", "what happened (Past Simple, Suddenly)", "Suddenly, I realised I had lost my wallet."],
            ["3. Actions", "what you did next (Then, After that)", "I went back to the office, but it was closed."],
            ["4. Ending", "how it ended (Eventually, In the end)", "In the end, a taxi driver found it and called me."],
            ["5. Feeling / lesson", "how you felt (Day 26)", "I was so relieved. Now I always check my pockets."],
          ],
        },
      ],
    },
    {
      id: "model",
      title: { az: "4. Nümunə hekayə", ru: "4. Пример истории" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "Last summer my friends and I decided to go to Gabala for the weekend.", az: "Keçən yay dostlarımla həftə sonu Qəbələyə getməyə qərar verdik.", ru: "Прошлым летом мы с друзьями решили поехать на выходные в Габалу." },
            { en: "We had booked a small hotel near the mountains.", az: "Dağların yanında kiçik bir otel bron etmişdik.", ru: "Мы забронировали небольшой отель у гор." },
            { en: "We were driving along the road when suddenly the car stopped.", az: "Yolda gedirdik ki, birdən maşın dayandı.", ru: "Мы ехали по дороге, как вдруг машина заглохла." },
            { en: "At first we didn't know what to do.", az: "Əvvəlcə nə edəcəyimizi bilmədik.", ru: "Сначала мы не знали, что делать." },
            { en: "Then a farmer who was passing by stopped and helped us.", az: "Sonra yoldan keçən bir fermer dayanıb bizə kömək etdi.", ru: "Потом мимо проезжал фермер, он остановился и помог нам." },
            { en: "Meanwhile, it had started to get dark.", az: "Bu vaxt hava qaralmağa başlamışdı.", ru: "Тем временем начало темнеть." },
            { en: "Eventually, we arrived at the hotel at midnight.", az: "Nəhayət, gecə yarısı otelə çatdıq.", ru: "В конце концов, мы добрались до отеля в полночь." },
            { en: "It was a stressful day, but in the end it became our favourite story.", az: "Gərgin gün idi, amma sonda ən sevimli hekayəmizə çevrildi.", ru: "День был напряжённым, но в итоге стал нашей любимой историей." },
          ],
        },
      ],
    },
    {
      id: "examples",
      title: { az: "5. Əlavə nümunələr", ru: "5. Дополнительные примеры" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "I had never seen snow before I went to Moscow.", az: "Moskvaya getməzdən əvvəl heç vaxt qar görməmişdim.", ru: "До поездки в Москву я никогда не видел снега." },
            { en: "While I was cooking, the lights went out.", az: "Yemək bişirərkən işıqlar söndü.", ru: "Пока я готовил, погас свет." },
            { en: "By the time the police arrived, the thief had escaped.", az: "Polis gələndə oğru artıq qaçmışdı.", ru: "К тому времени, как приехала полиция, вор уже сбежал." },
            { en: "Luckily, nobody was hurt.", az: "Xoşbəxtlikdən, heç kim xəsarət almadı.", ru: "К счастью, никто не пострадал." },
            { en: "After we had eaten, we went for a walk.", az: "Yemək yedikdən sonra gəzməyə getdik.", ru: "После того как мы поели, мы пошли гулять." },
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
            { wrong: "When I arrived, the film already started.", right: "When I arrived, the film had already started.", why: { az: "Daha əvvəlki hadisə üçün Past Perfect.", ru: "Для более раннего события — Past Perfect." } },
            { wrong: "I was walking home when I was seeing an accident.", right: "I was walking home when I saw an accident.", why: { az: "Qısa hadisə — Past Simple; uzun fon — Past Continuous.", ru: "Короткое событие — Past Simple; длинный фон — Past Continuous." } },
            { wrong: "In the end of the film…", right: "At the end of the film… / In the end, …", why: { az: "At the end of + isim (sonunda); In the end = nəticədə.", ru: "At the end of + существительное (в конце); In the end = в итоге." } },
            { wrong: "After I have eaten, I went out.", right: "After I had eaten, I went out. / After eating, I went out.", why: { az: "Hekayədə Present Perfect yox, Past Perfect.", ru: "В рассказе не Present Perfect, а Past Perfect." } },
            { wrong: "Yesterday I go to the market and I see my teacher.", right: "Yesterday I went to the market and saw my teacher.", why: { az: "Keçmiş hekayədə bütün əsas hadisələr Past Simple-da.", ru: "В рассказе о прошлом все основные события — в Past Simple." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Fon — Past Continuous; əsas hadisələr — Past Simple; daha əvvəl olan — Past Perfect (had + V3).", ru: "Фон — Past Continuous; основные события — Past Simple; что было раньше — Past Perfect (had + V3)." },
    { az: "Ardıcıllıq: First, Then, After that, Meanwhile, Suddenly, Eventually, In the end.", ru: "Последовательность: First, Then, After that, Meanwhile, Suddenly, Eventually, In the end." },
    { az: "Quruluş: səhnə → problem → hərəkətlər → son → hiss.", ru: "Структура: обстановка → проблема → действия → финал → чувства." },
  ],
};
