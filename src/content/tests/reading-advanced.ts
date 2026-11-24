import type { Test } from "./types";

const howTo = { en: "Read the text, then answer the questions.", az: "Mətni oxuyun, sonra suallara cavab verin.", ru: "Прочитайте текст и ответьте на вопросы." };

export const READING_ADVANCED: Test[] = [
  {
    id: "rd-a1-memory",
    kind: "reading",
    level: "advanced",
    title: { en: "The unreliable witness", az: "Etibarsız şahid", ru: "Ненадёжный свидетель" },
    description: { en: "Why our memories are reconstructed, not recorded — and what this means for justice.", az: "Xatirələrimiz niyə yazılmır, yenidən qurulur və bunun ədalət üçün mənası.", ru: "Почему память не записывает, а реконструирует — и что это значит для правосудия." },
    minutes: 15,
    timed: false,
    passage: {
      title: "The unreliable witness",
      paragraphs: [
        "Most of us assume that memory works like a video camera: an event is recorded, stored and later played back. Decades of psychological research suggest otherwise. Every time we remember something, we do not simply retrieve a fixed record; we rebuild it, filling the gaps with expectations, later information and even suggestions from other people.",
        "One of the best-known demonstrations came from the American psychologist Elizabeth Loftus in the 1970s. Participants watched a film of a car accident and were then asked how fast the cars had been going when they 'hit' or 'smashed into' each other. Those who heard the word 'smashed' not only gave higher estimates of speed; a week later, they were more likely to report having seen broken glass, although there had been none in the film.",
        "Later studies went further. In some experiments, researchers managed to convince a significant minority of adults that they had experienced events in childhood that had never actually happened, such as being lost in a shopping centre. The false memories were often described with confidence and in vivid detail.",
        "These findings have serious consequences for the legal system. For centuries, courts have treated eyewitness testimony as particularly persuasive evidence. Yet studies of convictions that were later overturned by DNA evidence have found that mistaken eyewitness identification played a role in a large proportion of cases. Witnesses were rarely lying; they sincerely believed what they remembered.",
        "None of this means that memory is useless. In everyday life it serves us remarkably well, and its flexibility is arguably what allows us to learn, imagine and plan. But it does mean that confidence is a poor guide to accuracy. As a result, many police forces have changed the way they interview witnesses, avoiding leading questions and recording how certain a witness is at the very first identification, before that certainty can be shaped by what happens later.",
      ],
    },
    reading: {
      topic: { en: "Psychology", az: "Psixologiya", ru: "Психология" },
      translation: {
        az: [
          "Çoxumuz yaddaşın videokamera kimi işlədiyini düşünürük: hadisə yazılır, saxlanılır və sonra yenidən oynadılır. Onilliklər boyu aparılan psixoloji tədqiqatlar isə başqa şey deyir. Hər dəfə nəyisə xatırlayanda biz sadəcə sabit bir qeydi çıxarmırıq; onu yenidən qururuq və boşluqları gözləntilərlə, sonradan aldığımız məlumatla və hətta başqalarının təklifləri ilə doldururuq.",
          "Ən məşhur nümayişlərdən biri 1970-ci illərdə amerikalı psixoloq Elizabet Loftusa məxsusdur. İştirakçılar avtomobil qəzası haqqında film izlədilər, sonra onlardan maşınlar bir-birinə \"dəyəndə\" və ya \"çırpılanda\" nə qədər sürətlə getdiyi soruşuldu. \"Çırpıldı\" sözünü eşidənlər təkcə sürəti daha yüksək qiymətləndirmədilər; bir həftə sonra onlar filmdə heç olmasa da, sınmış şüşə gördüklərini daha çox deyirdilər.",
          "Sonrakı tədqiqatlar daha da irəli getdi. Bəzi təcrübələrdə tədqiqatçılar yetkinlərin xeyli hissəsini uşaqlıqda əslində heç vaxt baş verməmiş hadisələri, məsələn, ticarət mərkəzində azmağı yaşadıqlarına inandıra bildilər. Yalançı xatirələr çox vaxt inamla və canlı detallarla təsvir edilirdi.",
          "Bu nəticələrin hüquq sistemi üçün ciddi fəsadları var. Əsrlər boyu məhkəmələr şahid ifadələrini xüsusilə inandırıcı sübut hesab ediblər. Lakin sonradan DNT sübutları ilə ləğv edilmiş hökmlərin araşdırılması göstərib ki, səhv şahid tanınması işlərin böyük hissəsində rol oynayıb. Şahidlər nadir hallarda yalan danışırdılar; onlar xatırladıqlarına səmimi şəkildə inanırdılar.",
          "Bütün bunlar yaddaşın faydasız olduğu demək deyil. Gündəlik həyatda o, bizə heyrətamiz dərəcədə yaxşı xidmət edir və məhz onun çevikliyi, demək olar ki, öyrənməyimizə, təsəvvür etməyimizə və planlaşdırmağımıza imkan verir. Amma bu o deməkdir ki, əminlik dəqiqliyin pis göstəricisidir. Nəticədə bir çox polis idarəsi şahidləri dindirmə üsulunu dəyişib: istiqamətləndirici suallardan qaçır və şahidin ilk tanınma anındakı əminliyini, sonrakı hadisələr onu formalaşdırmazdan əvvəl qeydə alır.",
        ],
        ru: [
          "Большинство из нас считает, что память работает как видеокамера: событие записывается, хранится и позже воспроизводится. Десятилетия психологических исследований говорят об обратном. Каждый раз, вспоминая что-то, мы не просто извлекаем неизменную запись — мы перестраиваем её, заполняя пробелы ожиданиями, более поздней информацией и даже подсказками других людей.",
          "Одна из самых известных демонстраций принадлежит американскому психологу Элизабет Лофтус (1970-е годы). Участники смотрели фильм об автомобильной аварии, а затем их спрашивали, с какой скоростью ехали машины, когда они «ударились» или «врезались» друг в друга. Те, кто слышал слово «врезались», не только называли более высокую скорость; через неделю они чаще сообщали, что видели разбитое стекло, хотя в фильме его не было.",
          "Последующие исследования пошли дальше. В некоторых экспериментах учёным удавалось убедить значительное меньшинство взрослых, что в детстве с ними случались события, которых на самом деле никогда не было, — например, что они потерялись в торговом центре. Ложные воспоминания часто описывались уверенно и в ярких подробностях.",
          "Эти выводы имеют серьёзные последствия для правовой системы. Веками суды считали показания очевидцев особенно убедительным доказательством. Однако анализ приговоров, позже отменённых благодаря ДНК-доказательствам, показал, что ошибочное опознание сыграло роль в значительной доле дел. Свидетели редко лгали — они искренне верили в то, что помнили.",
          "Всё это не значит, что память бесполезна. В повседневной жизни она служит нам поразительно хорошо, и, пожалуй, именно её гибкость позволяет нам учиться, воображать и планировать. Но это значит, что уверенность — плохой показатель точности. Поэтому многие полицейские службы изменили способ допроса свидетелей: избегают наводящих вопросов и фиксируют, насколько свидетель уверен в момент самого первого опознания, прежде чем на эту уверенность повлияет то, что произойдёт позже.",
        ],
      },
      vocab: [
        { en: "retrieve", az: "çıxarmaq, bərpa etmək", ru: "извлекать" },
        { en: "estimate", az: "təxmin", ru: "оценка" },
        { en: "vivid", az: "canlı, parlaq", ru: "яркий" },
        { en: "testimony", az: "şahid ifadəsi", ru: "показания" },
        { en: "persuasive", az: "inandırıcı", ru: "убедительный" },
        { en: "conviction (legal)", az: "məhkumluq hökmü", ru: "обвинительный приговор" },
        { en: "overturn", az: "ləğv etmək", ru: "отменять" },
        { en: "leading question", az: "istiqamətləndirici sual", ru: "наводящий вопрос" },
      ],
      grammar: [
        { en: "how fast the cars had been going", note: { az: "Dolayı sual + Past Perfect Continuous.", ru: "Косвенный вопрос + Past Perfect Continuous." } },
        { en: "not only gave higher estimates…; … they were more likely to report", note: { az: "Not only … (but also): fikri gücləndirmək.", ru: "Not only … (but also): усиление мысли." } },
        { en: "events that had never actually happened", note: { az: "Nisbi cümlə + Past Perfect: keçmişdən əvvəlki keçmiş.", ru: "Придаточное + Past Perfect: прошлое до прошлого." } },
        { en: "convictions that were later overturned", note: { az: "Nisbi cümlə + Past Passive.", ru: "Придаточное + Past Passive." } },
      ],
    },
    sections: [
      {
        instructions: howTo,
        questions: [
          { id: "q1", type: "choice", prompt: "According to the text, what happens when we remember something?", options: ["We play back an exact recording.", "We rebuild the memory, filling gaps.", "We always remember less over time.", "We copy other people's memories."], answer: 1, why: { az: "\"we rebuild it, filling the gaps\".", ru: "«we rebuild it, filling the gaps»." } },
          { id: "q2", type: "choice", prompt: "In Loftus's experiment, people who heard the word 'smashed'…", options: ["forgot the film more quickly.", "later remembered broken glass that was not in the film.", "refused to answer the question.", "gave lower estimates of speed."], answer: 1, why: { az: "Onlar filmdə olmayan sınmış şüşəni \"xatırladılar\".", ru: "Они «вспомнили» разбитое стекло, которого в фильме не было." } },
          { id: "q3", type: "tfng", prompt: "The false childhood memories were usually described without much detail.", answer: "F", why: { az: "\"described with confidence and in vivid detail\".", ru: "«described with confidence and in vivid detail»." } },
          { id: "q4", type: "tfng", prompt: "Most witnesses in overturned cases were deliberately lying.", answer: "F", why: { az: "\"Witnesses were rarely lying; they sincerely believed…\".", ru: "«Witnesses were rarely lying; they sincerely believed…»." } },
          { id: "q5", type: "tfng", prompt: "Loftus's research was carried out in several countries.", answer: "NG", why: { az: "Tədqiqatın harada aparıldığı deyilmir.", ru: "Где проводилось исследование, не сказано." } },
          { id: "q6", type: "tfng", prompt: "The writer believes memory is generally useful in everyday life.", answer: "T", why: { az: "\"In everyday life it serves us remarkably well\".", ru: "«In everyday life it serves us remarkably well»." } },
          { id: "q7", type: "short", prompt: "What kind of evidence overturned some convictions? (one word)", accept: ["DNA", "DNA evidence"], maxWords: 2, why: { az: "\"overturned by DNA evidence\".", ru: "«overturned by DNA evidence»." } },
          { id: "q8", type: "choice", prompt: "What is the main idea of the final paragraph?", options: ["Memory is useless and should not be trusted.", "Confidence does not prove that a memory is accurate, so interview methods have changed.", "Police no longer use witnesses.", "Flexible memory makes people lie."], answer: 1, why: { az: "\"confidence is a poor guide to accuracy\" və polisin üsullarını dəyişməsi.", ru: "«confidence is a poor guide to accuracy» и изменение методов полиции." } },
        ],
      },
    ],
  },
  {
    id: "rd-a2-ai-work",
    kind: "reading",
    level: "advanced",
    title: { en: "Will machines take our jobs?", az: "Maşınlar işlərimizi alacaqmı?", ru: "Заберут ли машины нашу работу?" },
    description: { en: "A balanced look at automation, history and the skills that may matter most.", az: "Avtomatlaşdırma, tarix və ən vacib ola biləcək bacarıqlara balanslı baxış.", ru: "Взвешенный взгляд на автоматизацию, историю и навыки, которые могут оказаться важнее всего." },
    minutes: 15,
    timed: false,
    passage: {
      title: "Will machines take our jobs?",
      paragraphs: [
        "Every few decades, a new technology prompts the same anxious question: will machines leave us without work? In the early nineteenth century, English textile workers known as Luddites smashed the mechanical looms they believed were destroying their livelihoods. In the 1960s, commentators warned that computers would soon make most office workers redundant. In both cases, the fears were understandable, and in both cases the predicted mass unemployment did not arrive.",
        "Economists usually explain this with a simple observation: technology destroys particular tasks, but it rarely destroys work itself. When machines make a product cheaper, people tend to buy more of it, and the money they save is spent elsewhere, creating demand for new kinds of jobs. Few people in 1900 could have imagined that their great-grandchildren would work as software developers or social media managers.",
        "Some researchers, however, argue that artificial intelligence is different. Earlier machines mostly replaced physical effort and routine calculation. Today's systems can write, translate, summarise documents and recognise images — tasks that until recently were thought to require human judgement. If the range of activities that machines can perform keeps expanding, the space left for human workers may shrink faster than new jobs can be created.",
        "The truth is likely to lie somewhere in between, and it will vary greatly between professions. Jobs made up mainly of predictable, repetitive tasks are the most exposed. Work that depends on physical dexterity in unpredictable environments, on caring for people, or on building trust has so far proved much harder to automate.",
        "What seems clear is that the transition will not be painless for everyone. Those whose skills lose value often struggle to retrain, especially later in their careers. For individuals, the safest strategy may be to treat learning as a lifelong process rather than something that ends with a diploma. Ironically, the ability to communicate clearly — in more than one language — may become more valuable, not less, in a world full of intelligent machines.",
      ],
    },
    reading: {
      topic: { en: "Technology and work", az: "Texnologiya və iş", ru: "Технологии и работа" },
      translation: {
        az: [
          "Hər bir neçə onillikdən bir yeni texnologiya eyni narahat sualı doğurur: maşınlar bizi işsiz qoyacaqmı? XIX əsrin əvvəllərində ludditlər kimi tanınan ingilis toxucu işçiləri dolanışıqlarını məhv etdiyinə inandıqları mexaniki dəzgahları sındırırdılar. 1960-cı illərdə şərhçilər kompüterlərin tezliklə ofis işçilərinin əksəriyyətini lüzumsuz edəcəyi barədə xəbərdarlıq edirdilər. Hər iki halda qorxular başa düşülən idi və hər iki halda proqnozlaşdırılan kütləvi işsizlik baş vermədi.",
          "İqtisadçılar bunu adətən sadə bir müşahidə ilə izah edirlər: texnologiya konkret tapşırıqları məhv edir, amma işin özünü nadir hallarda məhv edir. Maşınlar məhsulu ucuzlaşdıranda insanlar ondan daha çox alır, qənaət etdikləri pul isə başqa yerlərə xərclənir və yeni növ işlərə tələbat yaradır. 1900-cü ildə çox az adam nəticələrinin proqram tərtibatçısı və ya sosial media meneceri işləyəcəyini təsəvvür edə bilərdi.",
          "Lakin bəzi tədqiqatçılar süni intellektin fərqli olduğunu iddia edirlər. Əvvəlki maşınlar əsasən fiziki gücü və rutin hesablamaları əvəz edirdi. Bugünkü sistemlər yaza, tərcümə edə, sənədləri xülasə edə və şəkilləri tanıya bilir — yaxın vaxtlara qədər insan mühakiməsi tələb etdiyi düşünülən tapşırıqlar. Maşınların görə bildiyi işlərin dairəsi genişlənməyə davam etsə, insan işçilər üçün qalan məkan yeni işlərin yaranmasından daha sürətlə daralar.",
          "Həqiqət, ehtimal ki, ortada bir yerdədir və peşələr arasında çox fərqlənəcək. Əsasən proqnozlaşdırıla bilən, təkrarlanan tapşırıqlardan ibarət işlər ən çox risk altındadır. Gözlənilməz mühitlərdə fiziki çeviklikdən, insanlara qayğıdan və ya etimad qurmaqdan asılı olan işi avtomatlaşdırmaq indiyə qədər xeyli çətin olub.",
          "Aydın görünən odur ki, keçid hər kəs üçün ağrısız olmayacaq. Bacarıqları dəyərini itirən insanlar, xüsusilə karyeralarının sonrakı mərhələlərində, yenidən təhsil almaqda çox vaxt çətinlik çəkirlər. Fərdlər üçün ən təhlükəsiz strategiya öyrənməyə diplomla bitən bir şey kimi deyil, ömürlük proses kimi yanaşmaq ola bilər. Paradoksal olaraq, ağıllı maşınlarla dolu dünyada aydın ünsiyyət qurmaq bacarığı — bir neçə dildə — daha az deyil, daha çox dəyərli ola bilər.",
        ],
        ru: [
          "Каждые несколько десятилетий новая технология порождает один и тот же тревожный вопрос: оставят ли нас машины без работы? В начале XIX века английские текстильщики, известные как луддиты, ломали механические ткацкие станки, которые, как они считали, лишали их средств к существованию. В 1960-х комментаторы предупреждали, что компьютеры скоро сделают ненужными большинство офисных работников. В обоих случаях страхи были понятны, и в обоих случаях предсказанной массовой безработицы не наступило.",
          "Экономисты обычно объясняют это простым наблюдением: технология уничтожает отдельные задачи, но редко уничтожает работу как таковую. Когда машины делают продукт дешевле, люди покупают его больше, а сэкономленные деньги тратят на другое, создавая спрос на новые виды работы. Мало кто в 1900 году мог представить, что его правнуки будут работать разработчиками программ или менеджерами соцсетей.",
          "Однако некоторые исследователи утверждают, что искусственный интеллект — другое дело. Прежние машины в основном заменяли физические усилия и рутинные вычисления. Нынешние системы умеют писать, переводить, кратко излагать документы и распознавать изображения — задачи, которые ещё недавно считались требующими человеческого суждения. Если круг того, что умеют машины, продолжит расширяться, пространство для людей может сокращаться быстрее, чем будут появляться новые профессии.",
          "Истина, скорее всего, где-то посередине, и она будет сильно различаться в зависимости от профессии. Больше всего рискуют профессии, состоящие в основном из предсказуемых, повторяющихся задач. Работу, которая зависит от физической ловкости в непредсказуемой среде, от заботы о людях или от умения завоёвывать доверие, пока что автоматизировать гораздо труднее.",
          "Ясно одно: переход не будет безболезненным для всех. Тем, чьи навыки теряют ценность, часто трудно переучиться, особенно в зрелом возрасте. Для отдельного человека самой надёжной стратегией может быть отношение к обучению как к процессу на всю жизнь, а не как к тому, что заканчивается с получением диплома. Как ни парадоксально, умение ясно общаться — причём не на одном языке — в мире, полном умных машин, может стать не менее, а более ценным.",
        ],
      },
      vocab: [
        { en: "prompt (a question)", az: "doğurmaq (sual)", ru: "вызывать (вопрос)" },
        { en: "livelihood", az: "dolanışıq", ru: "средства к существованию" },
        { en: "redundant", az: "lüzumsuz, ixtisar edilmiş", ru: "ненужный, сокращённый" },
        { en: "demand", az: "tələbat", ru: "спрос" },
        { en: "judgement", az: "mühakimə", ru: "суждение" },
        { en: "shrink", az: "daralmaq, kiçilmək", ru: "сокращаться" },
        { en: "exposed", az: "risk altında olan", ru: "уязвимый" },
        { en: "dexterity", az: "çeviklik (əl)", ru: "ловкость" },
        { en: "retrain", az: "yenidən təhsil almaq", ru: "переучиваться" },
      ],
      grammar: [
        { en: "the mechanical looms they believed were destroying their livelihoods", note: { az: "Nisbi cümlə (that atılıb) + Past Continuous.", ru: "Придаточное (that опущено) + Past Continuous." } },
        { en: "Few people in 1900 could have imagined…", note: { az: "Modal + have + V3: keçmişdəki imkan.", ru: "Модальный + have + V3: возможность в прошлом." } },
        { en: "tasks that until recently were thought to require human judgement", note: { az: "Passive + to-infinitive: were thought to require.", ru: "Пассив + инфинитив: were thought to require." } },
        { en: "If the range … keeps expanding, the space … may shrink", note: { az: "Real şərt + modal (may).", ru: "Реальное условие + модальный (may)." } },
      ],
    },
    sections: [
      {
        instructions: howTo,
        questions: [
          { id: "q1", type: "choice", prompt: "Who were the Luddites?", options: ["Computer engineers in the 1960s", "Textile workers who destroyed machines", "Economists who studied unemployment", "Factory owners"], answer: 1, why: { az: "\"English textile workers known as Luddites smashed the mechanical looms\".", ru: "«English textile workers known as Luddites smashed the mechanical looms»." } },
          { id: "q2", type: "tfng", prompt: "The mass unemployment predicted in the 1960s did not happen.", answer: "T", why: { az: "\"the predicted mass unemployment did not arrive\".", ru: "«the predicted mass unemployment did not arrive»." } },
          { id: "q3", type: "choice", prompt: "According to economists, technology usually…", options: ["destroys work completely.", "destroys particular tasks but not work itself.", "creates fewer jobs than it destroys.", "makes products more expensive."], answer: 1, why: { az: "\"technology destroys particular tasks, but it rarely destroys work itself\".", ru: "«technology destroys particular tasks, but it rarely destroys work itself»." } },
          { id: "q4", type: "tfng", prompt: "Some researchers think AI is different because it can do tasks that need human judgement.", answer: "T", why: { az: "Yazmaq, tərcümə etmək və s. — əvvəllər insan mühakiməsi tələb edən işlər.", ru: "Писать, переводить и т. д. — задачи, требовавшие человеческого суждения." } },
          { id: "q5", type: "tfng", prompt: "The writer predicts that half of all jobs will disappear by 2040.", answer: "NG", why: { az: "Mətndə belə rəqəm və ya tarix yoxdur.", ru: "В тексте нет такой цифры или даты." } },
          { id: "q6", type: "choice", prompt: "Which jobs are the most exposed to automation?", options: ["Jobs based on caring for people", "Jobs made up of predictable, repetitive tasks", "Jobs that require building trust", "Jobs in unpredictable environments"], answer: 1, why: { az: "\"Jobs made up mainly of predictable, repetitive tasks are the most exposed\".", ru: "«Jobs made up mainly of predictable, repetitive tasks are the most exposed»." } },
          { id: "q7", type: "short", prompt: "What should learning be treated as, according to the writer? (max 3 words)", accept: ["a lifelong process", "lifelong process", "lifelong"], maxWords: 3, why: { az: "\"treat learning as a lifelong process\".", ru: "«treat learning as a lifelong process»." } },
          { id: "q8", type: "choice", prompt: "What does the writer find ironic?", options: ["That machines cannot translate", "That communication skills may become more valuable", "That diplomas are no longer useful", "That economists were wrong"], answer: 1, why: { az: "\"Ironically, the ability to communicate clearly … may become more valuable\".", ru: "«Ironically, the ability to communicate clearly … may become more valuable»." } },
        ],
      },
    ],
  },
];
