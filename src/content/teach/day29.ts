import type { Teach } from "./types";

export const TEACH_29: Teach = {
  day: 29,
  summary: {
    az: "Bu dərs gündəlik danışıqda çox lazım olan, amma tez-tez qarışdırılan kiçik strukturları bir yerə toplayır: be about to, out of və off, as və like, so və such, feildən sonra -ing yoxsa to. Bunları bilmək danışığınızı \"kitab dilindən\" təbii dilə çevirir.",
    ru: "Этот урок собирает мелкие, но очень нужные и часто путаемые структуры: be about to, out of и off, as и like, so и such, -ing или to после глагола. Зная их, вы переходите от «книжного» английского к естественному.",
  },
  sections: [
    {
      id: "about-to",
      title: { az: "1. Be about to: az qala, indicə …-acaq", ru: "1. Be about to: вот-вот, собираюсь прямо сейчас" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Be about to + V1", ru: "Be about to + V1" },
          parts: [
            { text: "The train", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "is about to", role: "be", note: { az: "Çox yaxın gələcək: elə indi.", ru: "Очень близкое будущее: прямо сейчас." } },
            { text: "leave", role: "verb", note: { az: "Feilin sadə forması.", ru: "Начальная форма глагола." } },
          ],
          example: "Hurry up! The train is about to leave.",
        },
        {
          kind: "p",
          text: {
            az: "\"Be about to\" bir şeyin bir neçə saniyə və ya dəqiqə sonra baş verəcəyini bildirir. Keçmişdə \"was about to … when …\" — \"tam … edəcəkdim ki, …\": \"I was about to call you when you called me.\" Bu quruluşla \"tomorrow\", \"next week\" kimi zaman ifadələri işlənmir.",
            ru: "«Be about to» говорит, что что-то случится через несколько секунд или минут. В прошлом «was about to … when …» — «я как раз собирался …, когда …»: «I was about to call you when you called me.» С выражениями вроде «tomorrow», «next week» эта структура не используется.",
          },
        },
      ],
    },
    {
      id: "prepositions",
      title: { az: "2. Out of və off, digər vacib ön sözlər", ru: "2. Out of и off, другие важные предлоги" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Ön söz", ru: "Предлог" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["out of", "içindən çıxmaq / из (изнутри)", "Get out of the car. Take it out of the box."],
            ["off", "səthindən ayırmaq / с (поверхности)", "Get off the bus. Take your shoes off."],
            ["out of (no more)", "qurtarıb / закончилось", "We're out of milk."],
            ["into / onto", "içinə / üstünə hərəkət", "He jumped into the pool. Put it onto the shelf."],
            ["get in / out (car, taxi)", "kiçik nəqliyyat", "Get in the taxi."],
            ["get on / off (bus, train, plane)", "böyük nəqliyyat", "Get on the bus at the next stop."],
            ["at / on / in (time)", "at 5, on Monday, in May / in 2020", "See you on Friday at 3."],
          ],
        },
      ],
    },
    {
      id: "as-like",
      title: { az: "3. As və like", ru: "3. As и like" },
      blocks: [
        {
          kind: "compare",
          items: [
            { en: "She works as a teacher.", text: { az: "\"As\" = rolunda, kimi (həqiqətən odur): o, müəllimdir.", ru: "«As» = в качестве (так и есть на самом деле): она работает учителем." } },
            { en: "She talks like a teacher.", text: { az: "\"Like\" = oxşar, kimi (əslində deyil): müəllim kimi danışır, amma müəllim deyil.", ru: "«Like» = как, похоже (на самом деле нет): говорит как учитель, но учителем не является." } },
            { en: "As I said, … / Like I said, …", text: { az: "Cümlədən əvvəl \"as\" (rəsmi); danışıqda \"like\" də işlənir.", ru: "Перед предложением — «as» (формально); в разговоре используют и «like»." } },
          ],
        },
      ],
    },
    {
      id: "so-such",
      title: { az: "4. So və such", ru: "4. So и such" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["so + adjective / adverb", "The film was so good. He drives so fast."],
            ["such + (a/an) + adjective + noun", "It was such a good film. They are such nice people."],
            ["so … that / such … that", "It was so cold that we stayed in. It was such a cold day that we stayed in."],
            ["so much / so many + noun", "There were so many people!"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Qısa qayda: isim varsa — such (a), isim yoxdursa — so. \"Such a nice day\", amma \"The day is so nice\". \"So nice day\" və \"such nice\" səhvdir.",
            ru: "Короткое правило: есть существительное — such (a), нет существительного — so. «Such a nice day», но «The day is so nice». «So nice day» и «such nice» — ошибки.",
          },
        },
      ],
    },
    {
      id: "ing-to",
      title: { az: "5. Feildən sonra: -ing yoxsa to + V1?", ru: "5. После глагола: -ing или to + V1?" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Qrup", ru: "Группа" }, { az: "Feillər", ru: "Глаголы" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+ -ing", "enjoy, finish, mind, avoid, keep, suggest, stop, consider, miss, practise", "I enjoy cooking. Would you mind waiting?"],
            ["+ to + V1", "want, decide, hope, plan, need, promise, agree, refuse, learn, afford", "I decided to leave. We can't afford to buy it."],
            ["both, same meaning", "like, love, hate, start, begin, continue", "I like swimming / to swim."],
            ["both, different meaning", "stop, remember, forget, try", "see below"],
            ["after prepositions: -ing", "interested in, good at, before, after, without", "I'm good at drawing. Think before speaking."],
          ],
        },
        {
          kind: "compare",
          items: [
            { en: "I stopped smoking. / I stopped to smoke.", text: { az: "Birinci: siqareti tərgitdim. İkinci: siqaret çəkmək üçün dayandım.", ru: "Первое: бросил курить. Второе: остановился, чтобы покурить." } },
            { en: "Remember to lock the door. / I remember locking the door.", text: { az: "Remember to — etməyi unutma (gələcək). Remember -ing — etdiyimi xatırlayıram (keçmiş).", ru: "Remember to — не забудь сделать (будущее). Remember -ing — помню, что сделал (прошлое)." } },
            { en: "Try to sleep. / Try drinking warm milk.", text: { az: "Try to — cəhd et (çətindir). Try -ing — sına, yoxla (bir üsul kimi).", ru: "Try to — постарайся (это трудно). Try -ing — попробуй (как способ)." } },
          ],
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
            { en: "I'm about to go into a meeting. Can I call you later?", az: "İndicə iclasa girirəm. Sonra zəng edə bilərəm?", ru: "Я как раз иду на совещание. Можно перезвоню позже?" },
            { en: "We've run out of coffee.", az: "Qəhvəmiz qurtarıb.", ru: "У нас закончился кофе." },
            { en: "Take your coat off and sit down.", az: "Paltonu çıxar və otur.", ru: "Снимай пальто и садись." },
            { en: "He got out of the taxi and ran inside.", az: "Taksidən düşüb içəri qaçdı.", ru: "Он вышел из такси и побежал внутрь." },
            { en: "I worked as a waiter when I was a student.", az: "Tələbə olanda ofisiant işləmişəm.", ru: "Когда я был студентом, я работал официантом." },
            { en: "It smells like fresh bread in here.", az: "Burada təzə çörək iyi gəlir.", ru: "Здесь пахнет свежим хлебом." },
            { en: "The exam was so difficult!", az: "İmtahan o qədər çətin idi ki!", ru: "Экзамен был таким трудным!" },
            { en: "She's such a talented singer.", az: "O, çox istedadlı müğənnidir.", ru: "Она такая талантливая певица." },
            { en: "Would you mind closing the window?", az: "Pəncərəni bağlamağınız mümkündürmü?", ru: "Не могли бы вы закрыть окно?" },
            { en: "I've decided to learn to drive.", az: "Sürücülük öyrənməyə qərar vermişəm.", ru: "Я решил научиться водить." },
            { en: "Don't forget to buy bread.", az: "Çörək almağı unutma.", ru: "Не забудь купить хлеб." },
            { en: "I'll never forget meeting you for the first time.", az: "Səninlə ilk dəfə görüşdüyümü heç vaxt unutmaram.", ru: "Я никогда не забуду нашу первую встречу." },
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
            { wrong: "I'm about to leaving.", right: "I'm about to leave.", why: { az: "About to + V1.", ru: "About to + V1." } },
            { wrong: "Get off the car.", right: "Get out of the car.", why: { az: "Maşından düşəndə out of; avtobusdan off.", ru: "Из машины — out of; из автобуса — off." } },
            { wrong: "He works like a doctor.", right: "He works as a doctor.", why: { az: "Real peşə — as.", ru: "Реальная профессия — as." } },
            { wrong: "It was so nice day.", right: "It was such a nice day.", why: { az: "İsim varsa — such a.", ru: "Есть существительное — such a." } },
            { wrong: "I enjoy to swim.", right: "I enjoy swimming.", why: { az: "Enjoy + -ing.", ru: "Enjoy + -ing." } },
            { wrong: "I decided going.", right: "I decided to go.", why: { az: "Decide + to + V1.", ru: "Decide + to + V1." } },
            { wrong: "I'm interested in learn Spanish.", right: "I'm interested in learning Spanish.", why: { az: "Ön sözdən sonra -ing.", ru: "После предлога — -ing." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Be about to + V1 = elə indi …-acaq.", ru: "Be about to + V1 = вот-вот." },
    { az: "Out of — içindən (maşın), off — üstündən (avtobus, ayaqqabı).", ru: "Out of — изнутри (машина), off — с поверхности (автобус, обувь)." },
    { az: "As — həqiqətən odur; like — ona oxşayır.", ru: "As — так и есть; like — похоже на." },
    { az: "So + sifət; such (a) + sifət + isim. Enjoy/finish/mind + -ing; want/decide/hope + to.", ru: "So + прилагательное; such (a) + прилагательное + существительное. Enjoy/finish/mind + -ing; want/decide/hope + to." },
  ],
};
