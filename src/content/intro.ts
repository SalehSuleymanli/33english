/**
 * Day 0 — the introductory consultation. Read before Day 1.
 * Written as a teacher's first conversation with a new learner, in
 * Azerbaijani, Russian and English.
 */
import type { Loc, LocList } from "@/lib/i18n";

export type IntroBlock =
  | { kind: "p"; text: LocList }
  | { kind: "list"; items: { az: string; ru: string; en: string }[] }
  | { kind: "frames" }
  | { kind: "stages" }
  | { kind: "quote"; text: Loc };

export type IntroSection = { id: string; title: Loc; blocks: IntroBlock[] };

export const INTRO_TITLE: Loc = {
  az: "İngilis dilini necə öyrənirik: 33 günlük metodun fəlsəfəsi",
  ru: "Как мы учим английский: философия 33-дневного метода",
  en: "How we learn English: the philosophy behind the 33-day method",
};

export const INTRO_LEAD: Loc = {
  az: "Dərslərə başlamazdan əvvəl gəlin bir müəllim və tələbə kimi oturub danışaq. Bu söhbətdə sizə nəyi, niyə və necə öyrənəcəyimizi izah edəcəyəm. Bu fəsli diqqətlə oxuyun: kurs boyu verəcəyiniz hər qərar burada deyilən fikirlərə əsaslanır.",
  ru: "Прежде чем начать уроки, давайте поговорим как преподаватель и ученик. В этой беседе я объясню, что мы будем изучать, зачем и как. Прочитайте этот раздел внимательно: на этих идеях держится весь курс.",
  en: "Before the lessons begin, let's sit down and talk like a teacher and a new student. In this conversation I'll explain what we'll learn, why, and how. Read it carefully: every part of the course rests on these ideas.",
};

export const INTRO: IntroSection[] = [
  {
    id: "no-memorizing",
    title: {
      az: "1. Bütün qrammatikanı əzbərləmək lazım deyil",
      ru: "1. Не нужно заучивать всю грамматику",
      en: "1. You don't need to memorize all of grammar",
    },
    blocks: [
      {
        kind: "quote",
        text: {
          az: "İngilis dilində bütün qrammatikanı əzbərləmək lazım deyil. Əsas məsələ dilin axarını, ritmini və cümlə quruluşlarını mənimsəməkdir.",
          ru: "В английском не нужно заучивать всю грамматику. Главное — усвоить течение языка, его ритм и устройство предложений.",
          en: "You don't need to memorize all of English grammar. What matters is absorbing the flow of the language, its rhythm and the way its sentences are built.",
        },
      },
      {
        kind: "p",
        text: {
          az: [
            "Bir çoxumuz ingilis dilini məktəbdə qaydalar siyahısı kimi öyrənmişik: zamanların adları, istisnalar, cədvəllər. Nəticədə qaydaları bilirik, amma danışmağa başlayanda cümlə qura bilmirik. Səbəb sadədir: qaydanı bilmək və qaydadan istifadə etmək iki fərqli bacarıqdır. Birincisi yaddaşla, ikincisi isə vərdişlə bağlıdır.",
            "Ana dilinizi xatırlayın. Siz Azərbaycan və ya rus dilində danışmağı qrammatika kitabından öyrənməmisiniz. Uşaq ikən yüz minlərlə cümlə eşitmisiniz, onları təkrar etmisiniz, səhv etmisiniz, düzəlmisiniz. Qaydaların adlarını sonra, məktəbdə öyrəndiniz, amma onlardan illərdir istifadə edirdiniz.",
            "Gündəlik ünsiyyət üçün ingilis qrammatikasının hamısına deyil, onun kiçik, amma çox güclü bir hissəsinə ehtiyac var. Danışığın böyük qismi cəmi bir neçə cümlə modeli üzərində qurulur. Bu modelləri dərindən mənimsəsəniz, qalan qaydalar onların üzərinə təbii şəkildə əlavə olunur.",
          ],
          ru: [
            "Многие из нас учили английский в школе как список правил: названия времён, исключения, таблицы. В итоге правила мы знаем, но когда нужно заговорить, не можем построить предложение. Причина проста: знать правило и пользоваться им — два разных навыка. Первое — это память, второе — привычка.",
            "Вспомните свой родной язык. Вы научились говорить по-азербайджански или по-русски не по учебнику грамматики. В детстве вы слышали сотни тысяч предложений, повторяли их, ошибались, исправлялись. Названия правил вы узнали позже, в школе, а пользовались ими уже много лет.",
            "Для повседневного общения нужна не вся английская грамматика, а её небольшая, но очень мощная часть. Большая часть живой речи строится всего на нескольких моделях предложения. Если освоить эти модели глубоко, остальные правила естественно ложатся поверх них.",
          ],
          en: [
            "Many of us learned English at school as a list of rules: names of tenses, exceptions, tables. We end up knowing the rules but unable to build a sentence when it's time to speak. The reason is simple: knowing a rule and using it are two different skills. The first is memory; the second is habit.",
            "Think of your first language. You didn't learn to speak Azerbaijani or Russian from a grammar book. As a child you heard hundreds of thousands of sentences, repeated them, made mistakes and corrected them. You learned the names of the rules later, at school, after years of using them.",
            "Everyday communication doesn't need all of English grammar. It needs a small but very powerful part of it. Most real speech is built on just a few sentence patterns. Master those deeply and the rest of the rules settle on top of them naturally.",
          ],
        },
      },
      {
        kind: "p",
        text: {
          az: [
            "Qrammatika və söz bazası zaman keçdikcə formalaşır. Əgər məqsədiniz beynəlxalq sertifikat imtahanı deyil, gündəlik həyatda sərbəst danışmaq və başa düşməkdirsə, əsas diqqətinizi fundamental cümlə strukturlarına və praktikaya yönəltməlisiniz. İmtahana hazırlaşırsınızsa belə, bu baza sizə lazım olacaq: IELTS və ya TOEFL-də yüksək bal alan hər kəs məhz bu strukturlarla sərbəst işləməyi bacarır.",
          ],
          ru: [
            "Грамматика и словарный запас формируются со временем. Если ваша цель — не международный сертификационный экзамен, а свободно говорить и понимать в повседневной жизни, сосредоточьтесь на фундаментальных структурах предложения и на практике. Даже если вы готовитесь к экзамену, эта база вам понадобится: все, кто получает высокий балл на IELTS или TOEFL, свободно работают именно с этими структурами.",
          ],
          en: [
            "Grammar and vocabulary grow over time. If your goal isn't an international certificate exam but speaking and understanding freely in everyday life, put your attention on the fundamental sentence structures and on practice. Even if you are preparing for an exam, you'll need this base: everyone who scores well on IELTS or TOEFL works freely with exactly these structures.",
          ],
        },
      },
    ],
  },
  {
    id: "frames",
    title: {
      az: "2. Metodun ürəyi: altı fundamental cümlə strukturu",
      ru: "2. Сердце метода: шесть фундаментальных структур предложения",
      en: "2. The heart of the method: six fundamental sentence frames",
    },
    blocks: [
      {
        kind: "p",
        text: {
          az: [
            "Bizim metodumuzun əsasını ingilis dilində altı fundamental cümlə strukturu təşkil edir. Biz onlara \"çərçivə\" deyirik, çünki hər biri cümlənin skeletidir: siz sadəcə boşluqları öz sözlərinizlə doldurursunuz. İngilis dilində eşitdiyiniz və deyəcəyiniz cümlələrin çox böyük hissəsi bu altı çərçivədən birinə və ya onların birləşməsinə uyğun gəlir.",
            "Saytda hər çərçivənin öz rəngi var. Bu rəngləri bütün dərslərdə, diaqramlarda və oyunlarda görəcəksiniz. Bir müddət sonra cümləyə baxanda onun hansı çərçivəyə aid olduğunu avtomatik tanıyacaqsınız. Bu, metodun ən vacib nəticələrindən biridir.",
          ],
          ru: [
            "В основе нашего метода лежат шесть фундаментальных структур английского предложения. Мы называем их «рамками», потому что каждая из них — скелет предложения: вы просто заполняете пустые места своими словами. Подавляющее большинство предложений, которые вы услышите и скажете по-английски, укладываются в одну из этих шести рамок или в их сочетание.",
            "На сайте у каждой рамки свой цвет. Вы будете видеть эти цвета во всех уроках, схемах и играх. Со временем, глядя на предложение, вы будете автоматически узнавать, к какой рамке оно относится. Это один из самых важных результатов метода.",
          ],
          en: [
            "Our method rests on six fundamental English sentence structures. We call them frames, because each one is the skeleton of a sentence: you fill the empty places with your own words. The great majority of sentences you'll hear and say in English fit one of these six frames, or a combination of them.",
            "Each frame has its own colour on the site. You'll see these colours in every lesson, diagram and game. After a while you'll look at a sentence and recognise its frame automatically. That's one of the most important results of the method.",
          ],
        },
      },
      { kind: "frames" },
      {
        kind: "p",
        text: {
          az: [
            "Diqqət edin: bu çərçivələr bir-birini əvəz etmir, bir-birini tamamlayır. \"I have been working here for three years\" cümləsində \"have\" sahiblik (5-ci çərçivə) deyil, köməkçi feildir və cümlə əslində 3-cü çərçivəyə, hərəkətə aiddir. Belə incəlikləri dərslərdə addım-addım izah edəcəyik.",
          ],
          ru: [
            "Обратите внимание: рамки не заменяют, а дополняют друг друга. В предложении «I have been working here for three years» слово «have» — это не обладание (рамка 5), а вспомогательный глагол, и предложение на самом деле относится к рамке 3 — действию. Такие тонкости мы разберём в уроках шаг за шагом.",
          ],
          en: [
            "Note that the frames don't replace each other; they complete each other. In \"I have been working here for three years\", \"have\" isn't possession (Frame 5) but a helper verb, and the sentence actually belongs to Frame 3, actions. We'll take such details step by step in the lessons.",
          ],
        },
      },
    ],
  },
  {
    id: "exposure",
    title: {
      az: "3. Dil necə mənimsənilir: təmas və təkrar",
      ru: "3. Как усваивается язык: контакт и повторение",
      en: "3. How a language is absorbed: exposure and repetition",
    },
    blocks: [
      {
        kind: "p",
        text: {
          az: [
            "Xaricə gedib heç bir xüsusi dil təhsili almadan, sadəcə gündəlik həyatında insanlarla ünsiyyət quraraq ingilis dilində çox yaxşı danışan insanlara rast gələ bilərsiniz. Bu təsadüf deyil. Dil yalnız qrammatik qaydaları əzbərləməklə deyil, onu gündəlik həyatınızın bir hissəsinə çevirməklə mənimsənilir.",
            "Beyin dili \"anlaşılan giriş\" vasitəsilə öyrənir: başa düşdüyünüz, amma səviyyənizdən bir az yuxarı olan materialı eşidib oxuduqca beyin cümlə modellərini özü tanıyır və yadda saxlayır. Eyni struktur müxtəlif kontekstlərdə onlarla dəfə qarşınıza çıxanda, o, \"bilik\"dən \"vərdiş\"ə çevrilir. Artıq düşünmədən istifadə edirsiniz.",
            "Bu səbəbdən kursda iki şey paralel gedir: struktur haqqında aydın izah (niyə belədir) və çoxlu nümunə, təkrar və praktika (necə işlədilir). İzah yolu göstərir, təkrar isə həmin yolu açır.",
          ],
          ru: [
            "Вы наверняка встречали людей, которые уехали за границу и без всяких курсов, просто общаясь с людьми каждый день, стали прекрасно говорить по-английски. Это не случайность. Язык усваивается не заучиванием грамматических правил, а тем, что он становится частью вашей повседневной жизни.",
            "Мозг учит язык через «понятный ввод»: когда вы слушаете и читаете материал, который понимаете, но который чуть выше вашего уровня, мозг сам распознаёт модели предложений и запоминает их. Когда одна и та же структура встречается вам десятки раз в разных ситуациях, она превращается из «знания» в «навык». Вы начинаете пользоваться ею не задумываясь.",
            "Поэтому в курсе параллельно идут две вещи: ясное объяснение структуры (почему так) и много примеров, повторения и практики (как это используется). Объяснение показывает дорогу, а повторение её прокладывает.",
          ],
          en: [
            "You've probably met people who moved abroad and, without any course, just by talking to people every day, came to speak English very well. That's no accident. A language is absorbed not by memorizing grammar rules but by making it part of your everyday life.",
            "The brain learns language through comprehensible input: when you hear and read material you understand but that is a little above your level, the brain recognises sentence patterns and stores them on its own. When the same structure meets you dozens of times in different situations, it turns from knowledge into habit. You use it without thinking.",
            "That's why two things run side by side in the course: a clear explanation of each structure (why it works this way) and many examples, repetition and practice (how it's used). The explanation shows the road; repetition builds it.",
          ],
        },
      },
    ],
  },
  {
    id: "daily-life",
    title: {
      az: "4. İngilis dilini gündəlik həyatınızın bir hissəsinə çevirin",
      ru: "4. Сделайте английский частью повседневной жизни",
      en: "4. Make English part of your everyday life",
    },
    blocks: [
      {
        kind: "p",
        text: {
          az: [
            "Gündə 20–30 dəqiqəlik dərs çox vacibdir, amma günün qalan 23 saatı da önəmlidir. Sosial şəbəkələrdə, YouTube-da, filmlərdə, kitablarda və gündəlik informasiya istehlakınızda ingilis dilinə daha çox yer ayırın. Məqsəd hər şeyi başa düşmək deyil; məqsəd dilin səsinə, ritminə və strukturlarına öyrəşməkdir.",
            "Başlamaq üçün sadə və real addımlar:",
          ],
          ru: [
            "Ежедневный урок на 20–30 минут очень важен, но важны и остальные 23 часа в сутках. Отведите английскому больше места в соцсетях, на YouTube, в фильмах, книгах и во всём, что вы читаете и смотрите каждый день. Цель — не понимать всё, а привыкнуть к звучанию, ритму и структурам языка.",
            "Простые и реальные шаги, чтобы начать:",
          ],
          en: [
            "A daily lesson of 20–30 minutes is very important, but so are the other 23 hours of the day. Give English more room in your social media, on YouTube, in films, books and everything you read and watch. The aim isn't to understand everything; it's to get used to the sound, rhythm and structures of the language.",
            "Simple, realistic steps to begin:",
          ],
        },
      },
      {
        kind: "list",
        items: [
          {
            az: "Telefonunuzun və sevdiyiniz tətbiqlərin dilini ingiliscəyə dəyişin. Hər gün gördüyünüz sözlər (Settings, Download, Share) özü-özünə yadda qalacaq.",
            ru: "Переключите язык телефона и любимых приложений на английский. Слова, которые вы видите каждый день (Settings, Download, Share), запомнятся сами собой.",
            en: "Switch your phone and favourite apps to English. Words you see every day (Settings, Download, Share) will stick on their own.",
          },
          {
            az: "Sosial şəbəkələrdə maraqlarınıza uyğun 5–10 ingilisdilli səhifəyə abunə olun: idman, yemək, texnologiya, səyahət, biznes. Lent özü sizin üçün ingilis dili materialına çevriləcək.",
            ru: "Подпишитесь в соцсетях на 5–10 англоязычных страниц по вашим интересам: спорт, еда, технологии, путешествия, бизнес. Лента сама станет для вас учебным материалом.",
            en: "Follow 5–10 English-language accounts on social media that match your interests: sport, food, technology, travel, business. Your feed becomes study material by itself.",
          },
          {
            az: "Film və serialları əvvəlcə Azərbaycan və ya rus altyazısı ilə, sonra ingilis altyazısı ilə izləyin. Tanış serialı ingilis dilində yenidən izləmək xüsusilə faydalıdır: süjeti bildiyiniz üçün diqqətiniz dilə yönəlir.",
            ru: "Смотрите фильмы и сериалы сначала с азербайджанскими или русскими субтитрами, затем с английскими. Особенно полезно пересмотреть знакомый сериал на английском: сюжет вы знаете, поэтому всё внимание уходит на язык.",
            en: "Watch films and series first with Azerbaijani or Russian subtitles, then with English ones. Rewatching a series you know is especially useful: you know the story, so your attention goes to the language.",
          },
          {
            az: "Yolda, idmanda və ya ev işləri görərkən ingilisdilli podkast və ya YouTube videoları dinləyin. Hər şeyi başa düşməsəniz də, qulağınız dilin ritminə öyrəşir.",
            ru: "В дороге, на тренировке или за домашними делами слушайте англоязычные подкасты или видео на YouTube. Даже если вы понимаете не всё, ухо привыкает к ритму языка.",
            en: "Listen to English podcasts or YouTube videos on the way to work, at the gym or while doing housework. Even if you don't understand everything, your ear gets used to the rhythm.",
          },
          {
            az: "Gündə bir neçə cümlə ingiliscə yazın: gün ərzində nə etdiniz, nə planlaşdırırsınız. Dərsdə öyrəndiyiniz strukturdan istifadə etməyə çalışın.",
            ru: "Пишите по-английски несколько предложений в день: что вы делали, что планируете. Старайтесь использовать структуру из урока.",
            en: "Write a few sentences in English every day: what you did, what you plan to do. Try to use the structure from that day's lesson.",
          },
          {
            az: "Özünüzlə ingiliscə danışın. Mağazaya gedərkən fikrinizdə \"There is a long queue. I am going to wait.\" kimi cümlələr qurun. Bu, ən ucuz və ən təsirli danışıq məşqidir.",
            ru: "Разговаривайте с собой по-английски. По дороге в магазин стройте в голове фразы вроде «There is a long queue. I am going to wait.». Это самая дешёвая и самая эффективная разговорная практика.",
            en: "Talk to yourself in English. On the way to the shop, build sentences in your head like \"There is a long queue. I am going to wait.\" It's the cheapest and most effective speaking practice there is.",
          },
        ],
      },
    ],
  },
  {
    id: "how-it-works",
    title: {
      az: "5. 33 günlük metod necə işləyir",
      ru: "5. Как устроен 33-дневный метод",
      en: "5. How the 33-day method works",
    },
    blocks: [
      {
        kind: "p",
        text: {
          az: [
            "Kurs beş mərhələdən ibarətdir. Hər mərhələ əvvəlkinin üzərində qurulur, buna görə də dərsləri ardıcıl keçmək vacibdir. İlk 11 gün xüsusilə önəmlidir: burada altı çərçivənin hər birini ayrıca, bütün formaları ilə öyrənirsiniz. Bu təməl möhkəm olarsa, sonrakı mövzular çox asan gələcək.",
          ],
          ru: [
            "Курс состоит из пяти этапов. Каждый этап строится на предыдущем, поэтому важно проходить уроки по порядку. Первые 11 дней особенно важны: здесь вы изучаете каждую из шести рамок отдельно, во всех её формах. Если этот фундамент будет прочным, последующие темы дадутся гораздо легче.",
          ],
          en: [
            "The course has five stages. Each builds on the one before, so it's important to take the lessons in order. The first 11 days matter most: here you learn each of the six frames on its own, in all its forms. If this foundation is solid, everything after it comes much more easily.",
          ],
        },
      },
      { kind: "stages" },
      {
        kind: "p",
        text: {
          az: [
            "Hər dərs eyni ardıcıllıqla gedir: məqsəd, ətraflı izah, struktur diaqramı, nümunələr, təsdiq, inkar və sual formaları, tipik səhvlər, addım-addım cümlə qurma, interaktiv tapşırıqlar, lüğət, real dialoq və sonda yoxlama testi. Səhv cavablarınız avtomatik olaraq \"Təkrar\" bölməsinə düşür və sistem onları sizə müəyyən fasilələrlə (1, 2, 4, 8, 16 gün) yenidən göstərir. Bu, unutmağın qarşısını alan elmi əsaslı üsuldur.",
            "Gündəlik rejim üçün tövsiyəmiz: bir dərs (20–30 dəqiqə), \"Təkrar\" bölməsindən 10 dəqiqə və istəsəniz bir oyun və ya danışıq mövzusu. Hər gün az, amma mütəmadi məşğul olmaq, həftədə bir dəfə uzun müddət oturmaqdan qat-qat təsirlidir.",
          ],
          ru: [
            "Каждый урок идёт в одном порядке: цель, подробное объяснение, схема структуры, примеры, утвердительная, отрицательная и вопросительная формы, типичные ошибки, пошаговое построение предложения, интерактивные задания, словарь, живой диалог и итоговый тест. Ваши неверные ответы автоматически попадают в раздел «Практика», и система показывает их снова через определённые интервалы (1, 2, 4, 8, 16 дней). Это научно обоснованный способ не забывать выученное.",
            "Наш совет для ежедневного режима: один урок (20–30 минут), 10 минут в разделе «Практика» и, по желанию, одна игра или разговорная тема. Заниматься понемногу, но каждый день, гораздо эффективнее, чем сидеть долго раз в неделю.",
          ],
          en: [
            "Every lesson follows the same order: objective, full explanation, structure diagram, examples, affirmative, negative and question forms, common mistakes, step-by-step sentence building, interactive exercises, vocabulary, a real dialogue and a final check. Your wrong answers go to Practice automatically, and the system shows them again at set intervals (1, 2, 4, 8 and 16 days). It's a research-based way to stop forgetting.",
            "Our advice for a daily routine: one lesson (20–30 minutes), 10 minutes of Practice and, if you like, a game or a speaking topic. A little every day is far more effective than one long session a week.",
          ],
        },
      },
    ],
  },
  {
    id: "expectations",
    title: {
      az: "6. 33 gündən sonra nə gözləməli: dürüst cavab",
      ru: "6. Чего ожидать через 33 дня: честный ответ",
      en: "6. What to expect after 33 days: an honest answer",
    },
    blocks: [
      {
        kind: "p",
        text: {
          az: [
            "33 gün ərzində heç kim ana dili səviyyəsində danışmağa başlamır, və biz sizə belə vəd vermirik. Amma dərsləri tam və diqqətlə keçsəniz, real və ölçülə bilən nəticə əldə edəcəksiniz:",
          ],
          ru: [
            "За 33 дня никто не начинает говорить как носитель языка, и мы этого не обещаем. Но если вы пройдёте уроки полностью и внимательно, вы получите реальный, измеримый результат:",
          ],
          en: [
            "Nobody speaks like a native after 33 days, and we don't promise that. But if you complete the lessons fully and carefully, you'll get a real, measurable result:",
          ],
        },
      },
      {
        kind: "list",
        items: [
          {
            az: "Altı çərçivənin hər birində keçmiş, indiki və gələcək zamanda təsdiq, inkar və sual cümlələri qura biləcəksiniz.",
            ru: "Вы сможете строить утвердительные, отрицательные и вопросительные предложения во всех шести рамках в прошедшем, настоящем и будущем времени.",
            en: "You'll build affirmative, negative and question sentences in all six frames, in the past, present and future.",
          },
          {
            az: "Perfect, Continuous və Passive formalarını, şərt cümlələrini, nisbi budaq cümlələrini və bağlayıcıları başa düşüb istifadə edəcəksiniz.",
            ru: "Вы будете понимать и использовать формы Perfect, Continuous и Passive, условные предложения, относительные придаточные и связующие слова.",
            en: "You'll understand and use perfect, continuous and passive forms, conditionals, relative clauses and linking words.",
          },
          {
            az: "Özünüz, işiniz, planlarınız və təcrübələriniz haqqında qısa, amma düzgün söhbət apara biləcəksiniz.",
            ru: "Вы сможете вести короткий, но правильный разговор о себе, своей работе, планах и опыте.",
            en: "You'll hold short but correct conversations about yourself, your work, your plans and your experiences.",
          },
          {
            az: "Eşitdiyiniz və oxuduğunuz ingilis dilində cümlələrin quruluşunu tanıyacaqsınız, bu da yeni materialı başa düşməyi xeyli asanlaşdıracaq.",
            ru: "Вы будете узнавать устройство английских предложений, которые слышите и читаете, и это заметно облегчит понимание нового материала.",
            en: "You'll recognise how the English sentences you hear and read are built, which makes new material much easier to follow.",
          },
        ],
      },
      {
        kind: "p",
        text: {
          az: [
            "Kursdan sonra sizə möhkəm bir skelet qalacaq. Sərbəstlik isə bu skeletin üzərinə hər gün əlavə etdiyiniz sözlər, eşitdiyiniz dialoqlar və apardığınız söhbətlər hesabına gələcək. Biz irəliləyişinizi uydurulmuş faizlərlə deyil, real cavablarınızla ölçürük: hansı çərçivədə nə qədər dəqiqsiniz, harada səhv edirsiniz, nəyi təkrarlamalısınız.",
            "Hazırsınızsa, 1-ci günə başlayaq. Uğurlar!",
          ],
          ru: [
            "После курса у вас останется прочный каркас. А свобода придёт за счёт слов, которые вы будете добавлять к нему каждый день, диалогов, которые будете слушать, и разговоров, которые будете вести. Мы измеряем ваш прогресс не придуманными процентами, а реальными ответами: насколько вы точны в каждой рамке, где ошибаетесь, что стоит повторить.",
            "Если вы готовы, начнём 1-й день. Удачи!",
          ],
          en: [
            "After the course you'll have a solid framework. Fluency comes from the words you add to it every day, the dialogues you listen to and the conversations you have. We measure your progress with your real answers, never invented percentages: how accurate you are in each frame, where you make mistakes, what to review.",
            "If you're ready, let's start Day 1. Good luck!",
          ],
        },
      },
    ],
  },
];

/** Per-frame lines for the "frames" block. */
export const INTRO_FRAMES: { id: string; name: Loc; formula: string; example: string; meaning: Loc }[] = [
  { id: "existence", name: { az: "1. Mövcudluq", ru: "1. Существование", en: "1. Existence" }, formula: "There + be + something + place/time", example: "There is a café near my house.", meaning: { az: "Nəyinsə harada isə olub-olmadığını bildirir.", ru: "Говорит о том, есть ли что-то где-то.", en: "Says whether something exists somewhere." } },
  { id: "states", name: { az: "2. Vəziyyət", ru: "2. Состояние", en: "2. States" }, formula: "Subject + be + description", example: "She is a doctor. We were tired.", meaning: { az: "Kimin və ya nəyin necə, kim, harada olduğunu təsvir edir.", ru: "Описывает, кто, какой или где находится человек или предмет.", en: "Describes who, what or where someone or something is." } },
  { id: "actions", name: { az: "3. Hərəkət", ru: "3. Действие", en: "3. Actions" }, formula: "Subject + verb (+ object)", example: "I work in a bank. They are playing football.", meaning: { az: "Kimin nə etdiyini, etdiyini və ya edəcəyini bildirir.", ru: "Говорит о том, кто что делает, делал или будет делать.", en: "Says who does, did or will do something." } },
  { id: "modals", name: { az: "4. Modal feillər", ru: "4. Модальные глаголы", en: "4. Modals" }, formula: "Subject + modal + verb", example: "You should rest. I can swim.", meaning: { az: "Bacarıq, icazə, məcburiyyət, məsləhət və ehtimalı ifadə edir.", ru: "Выражает умение, разрешение, обязанность, совет и вероятность.", en: "Expresses ability, permission, obligation, advice and possibility." } },
  { id: "possession", name: { az: "5. Sahiblik", ru: "5. Обладание", en: "5. Possession" }, formula: "Subject + have/has + something", example: "I have two brothers.", meaning: { az: "Kiminsə nəyəsə sahib olduğunu bildirir.", ru: "Говорит о том, что у кого-то что-то есть.", en: "Says that someone has something." } },
  { id: "passive", name: { az: "6. Məchul növ", ru: "6. Страдательный залог", en: "6. Passive" }, formula: "Object + be + V3 (+ by …)", example: "This bridge was built in 1990.", meaning: { az: "Diqqəti hərəkəti edənə deyil, hərəkətin nəticəsinə yönəldir.", ru: "Переносит внимание с того, кто действует, на результат действия.", en: "Moves the focus from who acts to what happens." } },
];

export const INTRO_STAGES: { name: Loc; days: string; what: Loc }[] = [
  { name: { az: "Təməl", ru: "Фундамент", en: "Foundation" }, days: "1–12", what: { az: "Altı çərçivənin hər biri ayrıca, bütün zaman və formaları ilə; 12-ci gündə yoxlama.", ru: "Каждая из шести рамок отдельно, во всех временах и формах; проверка на 12-й день.", en: "Each of the six frames on its own, in all tenses and forms; a checkpoint on Day 12." } },
  { name: { az: "Genişlənmə", ru: "Расширение", en: "Expansion" }, days: "13–14", what: { az: "Sual sözləri və \"I want you to…\" modeli.", ru: "Вопросительные слова и модель «I want you to…».", en: "Question words and the \"I want you to…\" pattern." } },
  { name: { az: "Birləşmə", ru: "Сочетание", en: "Combination" }, days: "15–21", what: { az: "Perfect zamanlar, used to, keçmişdə modal feillər, Perfect + Passive; 21-ci gündə yoxlama.", ru: "Времена Perfect, used to, модальные глаголы о прошлом, Perfect + Passive; проверка на 21-й день.", en: "Perfect tenses, used to, past modals, perfect passive; a checkpoint on Day 21." } },
  { name: { az: "Ünsiyyət", ru: "Общение", en: "Communication" }, days: "22–30", what: { az: "Müqayisə, nisbi cümlələr, şərt cümlələri, hisslər, bağlayıcılar, dolayı nitq.", ru: "Сравнения, относительные придаточные, условные предложения, чувства, связки, косвенная речь.", en: "Comparisons, relative clauses, conditionals, feelings, connectors, reported speech." } },
  { name: { az: "Tətbiq", ru: "Применение", en: "Application" }, days: "31–33", what: { az: "Hekayə danışmaq, imtahan ingiliscəsi və yekun sınaq.", ru: "Рассказ истории, экзаменационный английский и итоговое испытание.", en: "Telling stories, exam English and the graduation challenge." } },
];
