import type { Teach } from "./types";

export const TEACH_17: Teach = {
  day: 17,
  summary: {
    az: "Bu dərsdə sual sözləri ilə tam suallar qurmağı öyrənirsiniz: who, what, where, when, why, how və onların birləşmələri. Ən vacib mövzu: obyekt sualları (What did you do?) ilə mübtəda sualları (Who called?) arasındakı fərq.",
    ru: "В этом уроке вы научитесь строить полные вопросы с вопросительными словами: who, what, where, when, why, how и их сочетаниями. Самая важная тема — разница между вопросами к дополнению (What did you do?) и вопросами к подлежащему (Who called?).",
  },
  sections: [
    {
      id: "words",
      title: { az: "1. Sual sözləri və mənaları", ru: "1. Вопросительные слова и их значения" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Söz", ru: "Слово" }, { az: "Nə soruşur", ru: "О чём спрашивает" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["who", "person (kim / кто)", "Who is that man?"],
            ["what", "thing, action (nə / что)", "What do you want?"],
            ["which", "choice from a group (hansı / который)", "Which bus goes to the centre?"],
            ["where", "place (harada / где, куда)", "Where do you live?"],
            ["when", "time (nə vaxt / когда)", "When does the shop close?"],
            ["why", "reason (niyə / почему)", "Why are you late?"],
            ["how", "way, condition (necə / как)", "How do you get to work?"],
            ["whose", "owner (kimin / чей)", "Whose bag is this?"],
            ["how much / how many", "amount (nə qədər, neçə / сколько)", "How many children do you have?"],
            ["how long / how often / how far / how old", "duration, frequency, distance, age", "How long does it take?"],
            ["what time / what kind of", "exact time, type", "What kind of music do you like?"],
          ],
        },
      ],
    },
    {
      id: "object",
      title: { az: "2. Obyekt sualları: köməkçi feil lazımdır", ru: "2. Вопросы к дополнению: нужен вспомогательный глагол" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Əksər suallar obyekt, yer, zaman və ya səbəb haqqındadır. Onlarda sual sözündən sonra adi sual sırası gəlir: köməkçi feil + mübtəda + əsas feil. Yəni artıq bildiyiniz \"Did you see?\" sualının əvvəlinə sual sözü əlavə olunur: \"What did you see?\"",
            ru: "Большинство вопросов — о дополнении, месте, времени или причине. В них после вопросительного слова идёт обычный порядок вопроса: вспомогательный глагол + подлежащее + основной глагол. То есть к уже знакомому «Did you see?» в начало добавляется вопросительное слово: «What did you see?»",
          },
        },
        {
          kind: "formula",
          label: { az: "Obyekt sualı", ru: "Вопрос к дополнению" },
          parts: [
            { text: "What", role: "question", note: { az: "Sual sözü.", ru: "Вопросительное слово." } },
            { text: "did", role: "aux", note: { az: "Köməkçi: do/does/did, be, modal və ya have.", ru: "Вспомогательный: do/does/did, be, модальный или have." } },
            { text: "you", role: "subject", note: { az: "Mübtəda.", ru: "Подлежащее." } },
            { text: "buy", role: "verb", note: { az: "Əsas feil (did-dən sonra V1).", ru: "Основной глагол (после did — V1)." } },
          ],
          example: "What did you buy?",
        },
        {
          kind: "table",
          head: [{ az: "Çərçivə / zaman", ru: "Рамка / время" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["be (Frame 2)", "Where is your office? Why were you angry?"],
            ["Present Simple", "What time do you start work? Where does she live?"],
            ["Past Simple", "When did you arrive? What did he say?"],
            ["Continuous", "What are you doing? Who were you talking to?"],
            ["Modal", "How can I help you? What should we do?"],
            ["Future", "When will you be back?"],
            ["Passive", "Where was this photo taken?"],
          ],
        },
      ],
    },
    {
      id: "subject",
      title: { az: "3. Mübtəda sualları: köməkçi YOXDUR", ru: "3. Вопросы к подлежащему: вспомогательного глагола НЕТ" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Əgər sual sözü (who və ya what) mübtədanın özünü soruşursa, yəni \"hərəkəti kim etdi?\", onda köməkçi feil işlənmir və söz sırası təsdiq cümləsindəki kimi qalır. \"Someone called\" → \"Who called?\" (Kim zəng etdi?). \"Did who call?\" və ya \"Who did call?\" deyilmir.",
            ru: "Если вопросительное слово (who или what) спрашивает о самом подлежащем, то есть «кто совершил действие?», вспомогательный глагол не используется, а порядок слов остаётся как в утверждении. «Someone called» → «Who called?» (Кто звонил?). Не говорят «Did who call?» или «Who did call?».",
          },
        },
        {
          kind: "compare",
          items: [
            { en: "Who did you call? / Who called you?", text: { az: "Birinci: sən kimə zəng etdin? (sən zəng etdin, \"kim\" obyektdir → did). İkinci: sənə kim zəng etdi? (\"kim\" zəng edəndir, mübtədadır → did yoxdur, feil keçmiş zamanda).", ru: "Первый: кому ты звонил? («ты» звонил, «кто» — дополнение → did). Второй: кто тебе звонил? («кто» — тот, кто звонил, подлежащее → без did, глагол в прошедшем)." } },
            { en: "What happened? / What did you do?", text: { az: "\"What happened\" — nə baş verdi (mübtəda sualı). \"Happen\" feili ilə həmişə belə: \"What did happen?\" səhvdir.", ru: "«What happened» — что случилось (вопрос к подлежащему). С «happen» всегда так: «What did happen?» — ошибка." } },
            { en: "Who lives here? / Who do you live with?", text: { az: "Mübtəda sualında Present Simple-da üçüncü şəxs -s qalır: \"Who lives…\", \"Who knows…\".", ru: "В вопросе к подлежащему в Present Simple сохраняется -s третьего лица: «Who lives…», «Who knows…»." } },
          ],
        },
      ],
    },
    {
      id: "prepositions",
      title: { az: "4. Ön söz sonda", ru: "4. Предлог в конце" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Danışıq ingiliscəsində ön söz adətən sualın sonuna keçir: \"Who are you talking to?\" (kimlə danışırsan?), \"Where are you from?\" (haralısan?), \"What are you looking for?\" (nə axtarırsan?). Bu, Azərbaycan və rus dillərindən çox fərqlidir, amma tamamilə normaldır. Rəsmi dildə \"To whom…\" mümkündür, gündəlik danışıqda isə nadirdir.",
            ru: "В разговорном английском предлог обычно уходит в конец вопроса: «Who are you talking to?» (с кем ты говоришь?), «Where are you from?» (откуда ты?), «What are you looking for?» (что ты ищешь?). Это сильно отличается от русского, но совершенно нормально. В официальном языке возможно «To whom…», в повседневной речи — редко.",
          },
        },
      ],
    },
    {
      id: "indirect",
      title: { az: "5. Nəzakətli (dolayı) suallar", ru: "5. Вежливые (косвенные) вопросы" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Yad adama və ya rəsmi vəziyyətdə daha nəzakətli sual üçün \"Could you tell me…\", \"Do you know…\" ilə başlayırıq. Diqqət: bundan sonra söz sırası təsdiq cümləsindəki kimidir və köməkçi feil yoxdur: \"Where is the station?\" → \"Could you tell me where the station is?\" \"What time does it open?\" → \"Do you know what time it opens?\"",
            ru: "Чтобы спросить вежливее у незнакомого человека или в официальной ситуации, начинаем с «Could you tell me…», «Do you know…». Внимание: после этого порядок слов как в утверждении, вспомогательного глагола нет: «Where is the station?» → «Could you tell me where the station is?» «What time does it open?» → «Do you know what time it opens?»",
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
            { en: "Where did you go on holiday?", az: "Tətildə hara getdin?", ru: "Куда ты ездил в отпуск?" },
            { en: "Who told you that?", az: "Bunu sənə kim dedi?", ru: "Кто тебе это сказал?" },
            { en: "What does this word mean?", az: "Bu söz nə deməkdir?", ru: "Что значит это слово?" },
            { en: "Which one do you prefer, tea or coffee?", az: "Hansını üstün tutursan, çay yoxsa qəhvə?", ru: "Что ты предпочитаешь — чай или кофе?" },
            { en: "How long have you lived here?", az: "Neçə ildir burada yaşayırsan?", ru: "Как давно ты здесь живёшь?" },
            { en: "Why didn't you call me?", az: "Niyə mənə zəng etmədin?", ru: "Почему ты мне не позвонил?" },
            { en: "Whose turn is it?", az: "Növbə kimindir?", ru: "Чья очередь?" },
            { en: "What happened to your car?", az: "Maşınına nə olub?", ru: "Что случилось с твоей машиной?" },
            { en: "Who wants more tea?", az: "Kim daha çay istəyir?", ru: "Кто хочет ещё чаю?" },
            { en: "How often do you go to the gym?", az: "İdman zalına nə qədər tez-tez gedirsən?", ru: "Как часто ты ходишь в спортзал?" },
            { en: "Who are you waiting for?", az: "Kimi gözləyirsən?", ru: "Кого ты ждёшь?" },
            { en: "Could you tell me where the toilets are?", az: "Tualetin harada olduğunu deyə bilərsiniz?", ru: "Не подскажете, где туалет?" },
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
            { wrong: "Where you live?", right: "Where do you live?", why: { az: "Obyekt sualında köməkçi feil mütləqdir.", ru: "В вопросе к дополнению вспомогательный глагол обязателен." } },
            { wrong: "What you did yesterday?", right: "What did you do yesterday?", why: { az: "Sıra: sual sözü + did + mübtəda + V1.", ru: "Порядок: вопросительное слово + did + подлежащее + V1." } },
            { wrong: "Who did call you?", right: "Who called you?", why: { az: "Mübtəda sualında köməkçi yoxdur.", ru: "В вопросе к подлежащему вспомогательного глагола нет." } },
            { wrong: "What did happen?", right: "What happened?", why: { az: "\"Nə\" burada mübtədadır.", ru: "«Что» здесь — подлежащее." } },
            { wrong: "With who you are talking?", right: "Who are you talking to?", why: { az: "Ön söz sona keçir; be mübtədadan əvvəl gəlir.", ru: "Предлог уходит в конец; be ставится перед подлежащим." } },
            { wrong: "Can you tell me where is the bank?", right: "Can you tell me where the bank is?", why: { az: "Dolayı sualda düz söz sırası.", ru: "В косвенном вопросе прямой порядок слов." } },
            { wrong: "How many money do you need?", right: "How much money do you need?", why: { az: "Money sayılmayandır → how much.", ru: "Money — неисчисляемое → how much." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Obyekt sualı: sual sözü + köməkçi + mübtəda + feil (What did you see?).", ru: "Вопрос к дополнению: вопросительное слово + вспомогательный + подлежащее + глагол (What did you see?)." },
    { az: "Mübtəda sualı: who/what + feil, köməkçi yoxdur (Who called? What happened?).", ru: "Вопрос к подлежащему: who/what + глагол, без вспомогательного (Who called? What happened?)." },
    { az: "Ön söz adətən sonda: Who are you talking to?", ru: "Предлог обычно в конце: Who are you talking to?" },
    { az: "Nəzakətli sualda düz söz sırası: Could you tell me where the station is?", ru: "В вежливом вопросе прямой порядок: Could you tell me where the station is?" },
  ],
};
