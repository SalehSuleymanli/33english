import type { IeltsSpeakingTopic } from "./types";

export const IELTS_EDUCATION: IeltsSpeakingTopic = {
  id: "education-learning",
  title: { en: "Education and Learning", az: "Təhsil və öyrənmə", ru: "Образование и обучение" },
  intro: {
    az: "Təhsil mövzusunda məktəb illərindən (Past Simple, used to), indi öyrəndiyiniz bacarıqlardan (Present Perfect, Present Continuous) və təhsil sistemi haqqında fikirlərinizdən (should, müqayisə, passive) danışacaqsınız.",
    ru: "В теме образования вы будете говорить о школьных годах (Past Simple, used to), о навыках, которые осваиваете сейчас (Present Perfect, Present Continuous), и о системе образования (should, сравнения, пассив).",
  },
  part1: [
    { q: "Did you enjoy going to school?", tr: { az: "Məktəbə getməyi sevirdiniz?", ru: "Вам нравилось ходить в школу?" }, a: "Mostly, yes. I wasn't a big fan of getting up early, but I had a great group of friends and a couple of teachers who made lessons really interesting. Looking back, I think those were some of the easiest years of my life." },
    { q: "What was your favourite subject?", tr: { az: "Sevimli fənniniz hansı idi?", ru: "Какой у вас был любимый предмет?" }, a: "History, without a doubt. Our history teacher used to tell stories instead of just giving us dates to memorise, so it never felt like studying. I still read history books for fun now." },
    { q: "Is there a subject you found difficult?", tr: { az: "Çətin gələn fənn var idimi?", ru: "Был ли предмет, который давался вам трудно?" }, a: "Physics was always a struggle for me. I could follow the explanations in class, but when I tried to solve problems on my own at home, I'd get completely lost. I passed in the end, but only because a friend helped me before the exams." },
    { q: "Are you learning anything at the moment?", tr: { az: "Hazırda nəsə öyrənirsiniz?", ru: "Вы сейчас чему-нибудь учитесь?" }, a: "Yes, apart from English, I'm learning to play the guitar. I've been practising for about six months, mostly with online videos. I can play a few simple songs now, which is very motivating." },
    { q: "Do you prefer studying alone or with other people?", tr: { az: "Tək oxumağı üstün tutursunuz, yoxsa başqaları ilə?", ru: "Вы предпочитаете заниматься одни или с другими?" }, a: "It depends on what I'm studying. For reading and memorising, I need to be alone and in a quiet room. But for practising speaking or preparing a project, working with others is much more effective, because you can test your ideas and correct each other." },
    { q: "How do you usually learn new words in English?", tr: { az: "Adətən ingilis dilində yeni sözləri necə öyrənirsiniz?", ru: "Как вы обычно учите новые английские слова?" }, a: "I keep a list on my phone and review it on the bus. I also try to use a new word in a sentence on the same day — if I don't use it, I usually forget it within a week." },
  ],
  part2: {
    cue: "Describe a teacher who has had a great influence on you.",
    prompts: ["who the teacher was", "what subject he or she taught", "what this teacher was like"],
    closing: "and explain why this teacher had such an influence on you.",
    cueTr: {
      az: "Sizə böyük təsir göstərmiş bir müəllimi təsvir edin: o kim idi, hansı fənni tədris edirdi, necə insan idi və niyə sizə belə təsir etdiyini izah edin.",
      ru: "Опишите учителя, который оказал на вас большое влияние: кто это был, какой предмет преподавал, каким он был человеком, и объясните, почему он так на вас повлиял.",
    },
    answer: [
      "I'd like to talk about my English teacher at secondary school, Mrs Aliyeva. She taught me for three years, from when I was about thirteen until I was sixteen, and I can honestly say she changed the way I thought about learning.",
      "Before her classes, English was just another subject for me — a list of grammar rules and words that I had to memorise for tests. Mrs Aliyeva was completely different. She didn't start with rules; she started with things we were actually interested in. She brought song lyrics, short videos and interviews with football players, and only after we had understood the meaning did she show us the grammar behind them.",
      "As a person, she was strict but incredibly fair. She expected us to do our homework and to speak only English in her lessons, which felt impossible at first. But she never laughed at our mistakes. In fact, she used to say that a mistake was proof that we were trying, and that the only real failure was staying silent.",
      "The reason she had such an influence on me is that she gave me confidence. I had always been shy, and in her class I discovered that I could express myself in another language. If she hadn't encouraged me, I probably wouldn't have taken part in a student exchange programme a few years later, and I definitely wouldn't be preparing for IELTS now. Even today, when I'm afraid of making a mistake, I remember her words and just start talking.",
    ],
    translation: {
      az: [
        "Orta məktəbdəki ingilis dili müəllimim Əliyeva xanım haqqında danışmaq istərdim. O, mənə üç il dərs deyib — təxminən on üç yaşımdan on altı yaşıma qədər — və səmimi deyə bilərəm ki, öyrənməyə baxışımı dəyişdi.",
        "Onun dərslərindən əvvəl ingilis dili mənim üçün sadəcə bir fənn idi — testlər üçün əzbərləməli olduğum qrammatik qaydalar və sözlər siyahısı. Əliyeva xanım tamamilə fərqli idi. O, qaydalarla deyil, bizi həqiqətən maraqlandıran şeylərlə başlayırdı. Mahnı sözləri, qısa videolar, futbolçularla müsahibələr gətirirdi və yalnız biz mənanı başa düşdükdən sonra arxasındakı qrammatikanı göstərirdi.",
        "İnsan kimi o, tələbkar, amma inanılmaz dərəcədə ədalətli idi. Ev tapşırığını etməyimizi və onun dərslərində yalnız ingiliscə danışmağımızı gözləyirdi, bu da əvvəlcə mümkünsüz görünürdü. Amma heç vaxt səhvlərimizə gülmürdü. Əksinə, deyərdi ki, səhv bizim cəhd etdiyimizin sübutudur və yeganə əsl uğursuzluq susmaqdır.",
        "Onun mənə belə təsir etməsinin səbəbi mənə özünəinam verməsidir. Mən həmişə utancaq olmuşam və onun dərsində başqa dildə özümü ifadə edə bildiyimi kəşf etdim. O, məni ruhlandırmasaydı, yəqin ki, bir neçə il sonra tələbə mübadiləsi proqramında iştirak etməzdim və indi IELTS-ə hazırlaşmazdım. Bu gün də səhv etməkdən qorxanda onun sözlərini xatırlayıram və sadəcə danışmağa başlayıram.",
      ],
      ru: [
        "Я хотел бы рассказать о моей учительнице английского в средней школе, госпоже Алиевой. Она учила меня три года — примерно с тринадцати до шестнадцати лет, — и могу честно сказать, что она изменила моё отношение к учёбе.",
        "До её уроков английский был для меня просто ещё одним предметом — списком грамматических правил и слов, которые нужно было зубрить к контрольным. Госпожа Алиева была совсем другой. Она начинала не с правил, а с того, что нам действительно было интересно. Она приносила тексты песен, короткие видео, интервью с футболистами, и только после того, как мы понимали смысл, показывала стоящую за ними грамматику.",
        "Как человек она была строгой, но невероятно справедливой. Она требовала, чтобы мы делали домашние задания и говорили на её уроках только по-английски, и поначалу это казалось невозможным. Но она никогда не смеялась над нашими ошибками. Наоборот, она говорила, что ошибка — доказательство того, что мы стараемся, а единственная настоящая неудача — молчать.",
        "Она так повлияла на меня, потому что дала мне уверенность в себе. Я всегда был застенчивым, а на её уроках обнаружил, что могу выражать себя на другом языке. Если бы она меня не поддержала, я, скорее всего, не участвовал бы через несколько лет в программе студенческого обмена и уж точно не готовился бы сейчас к IELTS. Даже сегодня, когда я боюсь ошибиться, я вспоминаю её слова и просто начинаю говорить.",
      ],
    },
    vocab: [
      { en: "have an influence on", az: "təsir göstərmək", ru: "оказывать влияние на" },
      { en: "secondary school", az: "orta məktəb", ru: "средняя школа" },
      { en: "memorise", az: "əzbərləmək", ru: "заучивать" },
      { en: "strict but fair", az: "tələbkar, amma ədalətli", ru: "строгий, но справедливый" },
      { en: "proof", az: "sübut", ru: "доказательство" },
      { en: "confidence", az: "özünəinam", ru: "уверенность в себе" },
      { en: "encourage", az: "ruhlandırmaq", ru: "поощрять, поддерживать" },
      { en: "student exchange programme", az: "tələbə mübadiləsi proqramı", ru: "программа студенческого обмена" },
    ],
    expressions: [
      { en: "I can honestly say (that) …", az: "Səmimi deyə bilərəm ki, …", ru: "Могу честно сказать, что …" },
      { en: "Looking back, …", az: "Geriyə baxanda, …", ru: "Оглядываясь назад, …" },
      { en: "In fact, …", az: "Əslində / əksinə, …", ru: "На самом деле, …" },
      { en: "The reason (why) … is that …", az: "…-ın səbəbi ondadır ki, …", ru: "Причина … в том, что …" },
      { en: "Even today, …", az: "Bu gün də, …", ru: "Даже сегодня …" },
    ],
    grammar: [
      { en: "a teacher who has had a great influence on you", note: { az: "Nisbi cümlə + Present Perfect: təsir indiyə qədər davam edir.", ru: "Придаточное + Present Perfect: влияние продолжается до сих пор." } },
      { en: "words that I had to memorise", note: { az: "Nisbi cümlə + had to (keçmiş məcburiyyət).", ru: "Придаточное + had to (обязанность в прошлом)." } },
      { en: "only after we had understood the meaning did she show us…", note: { az: "Past Perfect + inversiya (only after … did she) — yüksək səviyyəli quruluş.", ru: "Past Perfect + инверсия (only after … did she) — конструкция высокого уровня." } },
      { en: "she used to say that a mistake was proof…", note: { az: "Used to + dolayı nitq (was).", ru: "Used to + косвенная речь (was)." } },
      { en: "If she hadn't encouraged me, I probably wouldn't have taken part…", note: { az: "Üçüncü şərt: keçmişin başqa cür olması.", ru: "Третий тип условных: иное прошлое." } },
    ],
  },
  part3: [
    { q: "What qualities make a good teacher?", tr: { az: "Yaxşı müəllimi hansı keyfiyyətlər fərqləndirir?", ru: "Какие качества делают учителя хорошим?" }, a: "I think knowledge of the subject is only the starting point. A good teacher can explain difficult ideas simply, is patient with students who learn more slowly, and makes students curious. In my experience, the teachers people remember are the ones who believed in them, not necessarily the ones who knew the most." },
    { q: "Has technology made learning easier or harder?", tr: { az: "Texnologiya öyrənməni asanlaşdırıb, yoxsa çətinləşdirib?", ru: "Технологии сделали обучение легче или труднее?" }, a: "In many ways easier. You can now learn almost anything online, often for free, and that has opened up education to people who couldn't afford it before. On the other hand, it's harder to concentrate, because there are so many distractions. So I'd say technology has made learning more accessible, but it requires more self-discipline." },
    { q: "Should university education be free?", tr: { az: "Ali təhsil pulsuz olmalıdırmı?", ru: "Должно ли высшее образование быть бесплатным?" }, a: "I believe it should be free, or at least much cheaper, for students from low-income families. Talented young people shouldn't miss out simply because their parents can't pay. However, completely free education is very expensive for the state, so perhaps a system where graduates pay back part of the cost once they earn a good salary would be fairer." },
    { q: "Are exams the best way to measure what students know?", tr: { az: "İmtahanlar tələbələrin bildiklərini ölçməyin ən yaxşı yoludurmu?", ru: "Являются ли экзамены лучшим способом проверить знания?" }, a: "Not entirely. Exams are useful because they're objective and everyone is judged in the same way. But they mostly test memory and performance under pressure. Some students who understand a subject deeply simply don't do well in a two-hour test. Combining exams with projects and presentations gives a much more complete picture." },
    { q: "Is it ever too late to learn something new?", tr: { az: "Yeni bir şey öyrənmək üçün nə vaxtsa gec olurmu?", ru: "Бывает ли слишком поздно учиться чему-то новому?" }, a: "I don't think so. It may take longer as we get older, especially with things like languages, but adults have advantages too — they're usually more motivated and better at organising their time. My grandmother started using a smartphone at seventy-five and now she sends me voice messages every day." },
    { q: "How will education change in the next twenty years?", tr: { az: "Növbəti iyirmi ildə təhsil necə dəyişəcək?", ru: "Как изменится образование в ближайшие двадцать лет?" }, a: "I expect learning to become much more personalised. Software will probably adapt lessons to each student's level, so teachers will spend less time lecturing and more time guiding and supporting. I also think people will study throughout their lives, not just until their early twenties, because jobs will keep changing." },
  ],
};
