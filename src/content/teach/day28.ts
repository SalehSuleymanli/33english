import type { Teach } from "./types";

export const TEACH_28: Teach = {
  day: 28,
  summary: {
    az: "Bu dərs gündəlik danışıqda çox lazım olan, amma tez-tez qarışdırılan kiçik sözləri bir yerə toplayır: zaman və yer ön sözləri (at, on, in), as və like, so və such, feildən sonra -ing yoxsa to. Bu, qeydlərinizdəki 27-ci (prepositions) və 30-cu (as, like, so, such, -ing or to) mövzulardır. Bunları bilmək danışığınızı \"kitab dilindən\" təbii dilə çevirir.",
    ru: "Этот урок собирает мелкие, но очень нужные и часто путаемые слова: предлоги времени и места (at, on, in), as и like, so и such, -ing или to после глагола. Это темы 27 (prepositions) и 30 (as, like, so, such, -ing or to) из ваших заметок. Зная их, вы переходите от «книжного» английского к естественному.",
  },
  sections: [
    {
      id: "time-place",
      title: { az: "1. At, on, in: zaman və yer", ru: "1. At, on, in: время и место" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Zaman: at + saat, on + gün, in + ay / il", ru: "Время: at + час, on + день, in + месяц / год" },
          parts: [
            { text: "My flight leaves", role: "subject", note: { az: "Subyekt + feil.", ru: "Подлежащее + глагол." } },
            { text: "at 6:40", role: "time", note: { az: "Dəqiq saat → at.", ru: "Точное время → at." } },
            { text: "on Friday", role: "time", note: { az: "Gün / tarix → on.", ru: "День / дата → on." } },
            { text: "in May", role: "time", note: { az: "Ay, il, fəsil → in.", ru: "Месяц, год, сезон → in." } },
          ],
          example: "My flight leaves at 6:40 on Friday, 12 May.",
        },
        {
          kind: "table",
          head: [{ az: "Ön söz", ru: "Предлог" }, { az: "Zaman", ru: "Время" }, { az: "Yer", ru: "Место" }],
          rows: [
            ["at", "at 6, at noon, at night, at the weekend", "at the gate, at home, at work, at the station"],
            ["on", "on Monday, on 5 May, on my birthday", "on the table, on the wall, on the train, on the 3rd floor"],
            ["in", "in June, in 2024, in summer, in the morning", "in Baku, in the room, in the car, in the photo"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Qısa qayda: at — dəqiq nöqtə (saat, ünvan), on — gün və ya səth, in — daha böyük müddət və ya məkan (ay, il, şəhər, otaq). \"Arrive\"-dan sonra \"to\" işlənmir: \"arrive at the airport\" (bina), \"arrive in Baku\" (şəhər). Rus dilindəki «приехать в» və Azərbaycan dilindəki \"-a gəlmək\" bizi \"arrive to\" səhvinə aparır.",
            ru: "Короткое правило: at — точная точка (время, адрес), on — день или поверхность, in — больший отрезок или пространство (месяц, год, город, комната). После «arrive» не бывает «to»: «arrive at the airport» (здание), «arrive in Baku» (город). Русское «приехать в» подталкивает к ошибке «arrive to».",
          },
        },
      ],
    },
    {
      id: "as-like",
      title: { az: "2. As və like", ru: "2. As и like" },
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
      title: { az: "3. So və such", ru: "3. So и such" },
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
      title: { az: "4. Feildən sonra: -ing yoxsa to + V1?", ru: "4. После глагола: -ing или to + V1?" },
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
      title: { az: "5. Nümunələr və tərcümələr", ru: "5. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "See you on Friday at three.", az: "Cümə günü saat üçdə görüşərik.", ru: "Увидимся в пятницу в три." },
            { en: "We arrived in Rome late at night.", az: "Romaya gecə gec çatdıq.", ru: "Мы приехали в Рим поздно ночью." },
            { en: "Wait for me at the entrance.", az: "Məni girişdə gözlə.", ru: "Жди меня у входа." },
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
      title: { az: "6. Tipik səhvlər", ru: "6. Типичные ошибки" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "The meeting is in Monday.", right: "The meeting is on Monday.", why: { az: "Günlər — on.", ru: "Дни недели — on." } },
            { wrong: "We arrived to Baku.", right: "We arrived in Baku.", why: { az: "Arrive in (şəhər), arrive at (bina). To yox.", ru: "Arrive in (город), arrive at (здание). Не to." } },
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
    { az: "At — saat və nöqtə, on — gün və səth, in — ay, il, şəhər, otaq.", ru: "At — время и точка, on — день и поверхность, in — месяц, год, город, комната." },
    { az: "As — həqiqətən odur; like — ona oxşayır.", ru: "As — так и есть; like — похоже на." },
    { az: "So + sifət; such (a) + sifət + isim.", ru: "So + прилагательное; such (a) + прилагательное + существительное." },
    { az: "Enjoy/finish/mind + -ing; want/decide/hope + to; ön sözdən sonra -ing.", ru: "Enjoy/finish/mind + -ing; want/decide/hope + to; после предлога — -ing." },
  ],
};
