import type { Teach } from "./types";

export const TEACH_21: Teach = {
  day: 21,
  summary: {
    az: "Bu dərs qeydlərinizdəki 17-ci mövzudur: \"to be about to\" (üzrə olmaq, az qala …-acaq) və \"out of\" ilə \"off\" fərqi (içindən və üzərindən). Həmçinin into / onto və nəqliyyatla işlənən get in / get on. Bu kiçik sözlər səyahətdə, evdə və işdə hər gün lazım olur.",
    ru: "Это тема 17 из ваших заметок: «to be about to» (вот-вот, собираться прямо сейчас) и разница между «out of» и «off» (изнутри и с поверхности). Также into / onto и get in / get on с транспортом. Эти маленькие слова нужны каждый день — в поездке, дома и на работе.",
  },
  sections: [
    {
      id: "about-to",
      title: { az: "1. Be about to: az qala, indicə …-acaq", ru: "1. Be about to: вот-вот, прямо сейчас" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Be about to + V1", ru: "Be about to + V1" },
          parts: [
            { text: "The train", role: "subject", note: { az: "Subyekt.", ru: "Подлежащее." } },
            { text: "is about to", role: "be", note: { az: "Çox yaxın gələcək: elə indi.", ru: "Очень близкое будущее: прямо сейчас." } },
            { text: "leave", role: "verb", note: { az: "Feilin sadə forması.", ru: "Начальная форма глагола." } },
          ],
          example: "Hurry up! The train is about to leave.",
        },
        {
          kind: "p",
          text: {
            az: "\"Be about to\" bir şeyin bir neçə saniyə və ya dəqiqə sonra baş verəcəyini bildirir. Qeydlərinizdəki cümlə: \"I'm about to do the thing you mentioned\" — dediyin işi görmək üzrəyəm. Bu quruluşla \"tomorrow\", \"next week\" kimi zaman ifadələri işlənmir — uzaq plan üçün going to (18-ci gün) lazımdır.",
            ru: "«Be about to» говорит, что что-то случится через несколько секунд или минут. Предложение из ваших заметок: «I'm about to do the thing you mentioned» — я как раз собираюсь сделать то, о чём ты говорил. С выражениями вроде «tomorrow», «next week» эта структура не используется — для дальних планов нужен going to (18-й день).",
          },
        },
      ],
    },
    {
      id: "was-about",
      title: { az: "2. Was about to … when …", ru: "2. Was about to … when …" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Keçmişdə \"was / were about to … when …\" — \"tam … edəcəkdim ki, …\" deməkdir: bir şey etmək üzrə idiniz, amma başqa hadisə mane oldu. \"I was about to call you when you called me\" — sənə zəng etmək üzrəydim ki, sən zəng etdin.",
            ru: "В прошлом «was / were about to … when …» значит «я как раз собирался …, когда …»: вы были готовы что-то сделать, но помешало другое событие. «I was about to call you when you called me» — я как раз собирался тебе позвонить, когда ты позвонил.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "We're about to start."],
            ["−", "I'm not about to give up."],
            ["?", "Is the film about to start?"],
            ["past", "She was about to leave when it started to rain."],
          ],
        },
      ],
    },
    {
      id: "out-off",
      title: { az: "3. Out of və off: içindən və üzərindən", ru: "3. Out of и off: изнутри и с поверхности" },
      blocks: [
        {
          kind: "compare",
          items: [
            { en: "Take the phone out of the bag.", text: { az: "Telefonu çantanın içindən götür — çanta qabdır, telefon içindədir.", ru: "Достань телефон из сумки — сумка это ёмкость, телефон внутри." } },
            { en: "Take the phone off the bag.", text: { az: "Telefonu çantanın üzərindən götür — telefon çantanın üstündədir.", ru: "Сними телефон с сумки — телефон лежит сверху." } },
          ],
        },
        {
          kind: "p",
          text: {
            az: "Bu, qeydlərinizdəki iki nümunədir. Qayda sadədir: içindədirsə — out of, üstündədirsə — off. Əks istiqamət: into (içinə) və onto (üstünə): \"Put the milk into the fridge\", \"Put the box onto the shelf\". \"Out of\"-un ikinci mənası da var — qurtarmaq: \"We've run out of milk\" (südümüz qurtarıb).",
            ru: "Это два примера из ваших заметок. Правило простое: внутри — out of, сверху — off. Обратное направление: into (внутрь) и onto (на поверхность): «Put the milk into the fridge», «Put the box onto the shelf». У «out of» есть и второе значение — закончиться: «We've run out of milk» (у нас закончилось молоко).",
          },
        },
      ],
    },
    {
      id: "transport",
      title: { az: "4. Get in / out of və get on / off", ru: "4. Get in / out of и get on / off" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Nəqliyyat", ru: "Транспорт" }, { az: "Minmək", ru: "Сесть" }, { az: "Düşmək", ru: "Выйти" }],
          rows: [
            ["car, taxi", "get in (the car)", "get out of (the car)"],
            ["bus, train, plane, ship, bike", "get on (the bus)", "get off (the bus)"],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "Yadda saxlamaq üçün: avtobusda ayağa qalxıb gəzə bilirsiniz — sanki onun \"üstündəsiniz\" (on / off). Maşında isə əyilib içinə girirsiniz (in / out of).",
            ru: "Чтобы запомнить: в автобусе можно встать и пройти — вы как бы «на» нём (on / off). А в машину вы забираетесь внутрь (in / out of).",
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
            { en: "I'm about to do the thing you mentioned.", az: "Dediyin işi görmək üzrəyəm.", ru: "Я как раз собираюсь сделать то, о чём ты говорил." },
            { en: "I'm about to go into a meeting. Can I call you later?", az: "İndicə iclasa girirəm. Sonra zəng edə bilərəm?", ru: "Я как раз иду на совещание. Можно перезвоню позже?" },
            { en: "The film is about to start — turn off your phone.", az: "Film indicə başlayır — telefonunu söndür.", ru: "Фильм вот-вот начнётся — выключи телефон." },
            { en: "I was about to leave when my boss called.", az: "Çıxmaq üzrəydim ki, müdirim zəng etdi.", ru: "Я уже собирался уходить, когда позвонил начальник." },
            { en: "Take the phone out of the bag.", az: "Telefonu çantanın içindən götür.", ru: "Достань телефон из сумки." },
            { en: "Take the phone off the bag.", az: "Telefonu çantanın üzərindən götür.", ru: "Убери телефон с сумки." },
            { en: "Take your coat off and sit down.", az: "Paltonu çıxar və otur.", ru: "Снимай пальто и садись." },
            { en: "He got out of the taxi and ran inside.", az: "Taksidən düşüb içəri qaçdı.", ru: "Он вышел из такси и побежал внутрь." },
            { en: "Get off the bus at the next stop.", az: "Növbəti dayanacaqda avtobusdan düş.", ru: "Выйди из автобуса на следующей остановке." },
            { en: "We've run out of coffee.", az: "Qəhvəmiz qurtarıb.", ru: "У нас закончился кофе." },
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
            { wrong: "I'm about to leaving.", right: "I'm about to leave.", why: { az: "About to + V1.", ru: "About to + V1." } },
            { wrong: "The train is about to leave tomorrow.", right: "The train leaves tomorrow.", why: { az: "About to — indicə, sabah üçün yox.", ru: "About to — сейчас, не на завтра." } },
            { wrong: "Take the keys off the box.", right: "Take the keys out of the box.", why: { az: "Qutunun içindən — out of.", ru: "Изнутри коробки — out of." } },
            { wrong: "Get off the car.", right: "Get out of the car.", why: { az: "Maşından düşəndə out of; avtobusdan off.", ru: "Из машины — out of; из автобуса — off." } },
            { wrong: "I got out of the bus.", right: "I got off the bus.", why: { az: "Avtobus, qatar, təyyarə — get off.", ru: "Автобус, поезд, самолёт — get off." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Be about to + V1 = elə indi …-acaq. Keçmiş: was about to … when …", ru: "Be about to + V1 = вот-вот. Прошлое: was about to … when …" },
    { az: "Out of — içindən, off — üzərindən. Əksi: into, onto.", ru: "Out of — изнутри, off — с поверхности. Обратное: into, onto." },
    { az: "Maşın, taksi — get in / out of. Avtobus, qatar, təyyarə — get on / off.", ru: "Машина, такси — get in / out of. Автобус, поезд, самолёт — get on / off." },
  ],
};
