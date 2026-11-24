import type { Test } from "./types";

const howTo = { en: "Read the text, then answer the questions.", az: "Mətni oxuyun, sonra suallara cavab verin.", ru: "Прочитайте текст и ответьте на вопросы." };

export const READING_ELEMENTARY: Test[] = [
  {
    id: "rd-e1-first-flight",
    kind: "reading",
    level: "elementary",
    title: { en: "My first flight", az: "İlk uçuşum", ru: "Мой первый полёт" },
    description: { en: "A traveller describes her first time on a plane.", az: "Səyahətçi ilk dəfə təyyarəyə minməsini danışır.", ru: "Путешественница рассказывает о своём первом полёте." },
    minutes: 8,
    timed: false,
    passage: {
      title: "My first flight",
      paragraphs: [
        "I was twenty-four when I flew for the first time. I was going to Istanbul for a work conference, and I was very nervous. My friends told me that flying was safer than driving, but I couldn't sleep the night before.",
        "At the airport, everything was new for me. I didn't know where to go, so I asked a woman at the information desk. She was very kind and showed me the check-in area. After passport control, I waited at the gate for an hour. I was drinking a coffee when they called my flight.",
        "When the plane took off, I held my seat very tightly. But after a few minutes, I looked out of the window and saw the Caspian Sea below me. It was beautiful. The flight attendants brought us sandwiches and juice, and the time passed quickly.",
        "Since then, I have flown many times, and now I really enjoy it. I always ask for a window seat.",
      ],
    },
    reading: {
      topic: { en: "Travel", az: "Səyahət", ru: "Путешествия" },
      translation: {
        az: [
          "İlk dəfə təyyarəyə minəndə iyirmi dörd yaşım var idi. İş konfransı üçün İstanbula gedirdim və çox həyəcanlı idim. Dostlarım uçuşun maşın sürməkdən daha təhlükəsiz olduğunu deyirdilər, amma əvvəlki gecə yata bilmədim.",
          "Hava limanında hər şey mənim üçün yeni idi. Hara getməli olduğumu bilmirdim, ona görə məlumat masasındakı bir qadından soruşdum. O, çox mehriban idi və mənə qeydiyyat yerini göstərdi. Pasport nəzarətindən sonra çıxışda bir saat gözlədim. Qəhvə içirdim ki, reysimi elan etdilər.",
          "Təyyarə havaya qalxanda oturacağımdan bərk-bərk yapışmışdım. Amma bir neçə dəqiqə sonra pəncərədən baxdım və aşağıda Xəzər dənizini gördüm. Çox gözəl idi. Bortbələdçilər bizə sendviç və şirə gətirdilər və vaxt tez keçdi.",
          "O vaxtdan bəri çox uçmuşam və indi bundan həqiqətən zövq alıram. Həmişə pəncərə yanında yer istəyirəm.",
        ],
        ru: [
          "Мне было двадцать четыре, когда я впервые полетела на самолёте. Я летела в Стамбул на рабочую конференцию и очень волновалась. Друзья говорили мне, что летать безопаснее, чем ездить на машине, но накануне ночью я не могла уснуть.",
          "В аэропорту всё было для меня новым. Я не знала, куда идти, поэтому спросила женщину у справочной стойки. Она была очень любезна и показала мне зону регистрации. После паспортного контроля я час ждала у выхода на посадку. Я пила кофе, когда объявили мой рейс.",
          "Когда самолёт взлетел, я крепко держалась за кресло. Но через несколько минут я посмотрела в окно и увидела под собой Каспийское море. Это было красиво. Бортпроводники принесли нам сэндвичи и сок, и время пролетело быстро.",
          "С тех пор я летала много раз, и теперь мне это действительно нравится. Я всегда прошу место у окна.",
        ],
      },
      vocab: [
        { en: "conference", az: "konfrans", ru: "конференция" },
        { en: "nervous", az: "həyəcanlı", ru: "взволнованный" },
        { en: "check-in", az: "qeydiyyat", ru: "регистрация" },
        { en: "gate", az: "çıxış (təyyarəyə)", ru: "выход на посадку" },
        { en: "take off", az: "havaya qalxmaq", ru: "взлетать" },
        { en: "tightly", az: "bərk-bərk", ru: "крепко" },
        { en: "flight attendant", az: "bortbələdçi", ru: "бортпроводник" },
      ],
      grammar: [
        { en: "I was going to Istanbul … I was drinking a coffee when they called my flight", note: { az: "Past Continuous fon üçün, Past Simple qısa hadisə üçün.", ru: "Past Continuous — фон, Past Simple — короткое событие." } },
        { en: "flying was safer than driving", note: { az: "Müqayisə dərəcəsi: safe → safer than.", ru: "Сравнительная степень: safe → safer than." } },
        { en: "I didn't know where to go", note: { az: "Sual sözü + to + V1 (17-ci gün).", ru: "Вопросительное слово + to + V1 (17-й день)." } },
        { en: "Since then, I have flown many times", note: { az: "Present Perfect: since + indiyə qədər təcrübə.", ru: "Present Perfect: since + опыт до настоящего момента." } },
      ],
    },
    sections: [
      {
        instructions: howTo,
        questions: [
          { id: "q1", type: "choice", prompt: "Why was the writer going to Istanbul?", options: ["For a holiday", "To visit friends", "For a work conference", "To study"], answer: 2, why: { az: "\"for a work conference\".", ru: "«for a work conference»." } },
          { id: "q2", type: "choice", prompt: "What was she doing when they called her flight?", options: ["Sleeping", "Drinking a coffee", "Reading", "Talking to a friend"], answer: 1, why: { az: "\"I was drinking a coffee when they called my flight\".", ru: "«I was drinking a coffee when they called my flight»." } },
          { id: "q3", type: "tfng", prompt: "She slept well the night before the flight.", answer: "F", why: { az: "\"I couldn't sleep the night before\".", ru: "«I couldn't sleep the night before»." } },
          { id: "q4", type: "tfng", prompt: "A woman at the information desk helped her.", answer: "T", why: { az: "\"She was very kind and showed me the check-in area\".", ru: "«She was very kind and showed me the check-in area»." } },
          { id: "q5", type: "tfng", prompt: "The flight to Istanbul was late.", answer: "NG", why: { az: "Gecikmə haqqında heç nə deyilmir.", ru: "Об опоздании ничего не сказано." } },
          { id: "q6", type: "short", prompt: "What did she see from the window? (max 3 words)", accept: ["the Caspian Sea", "Caspian Sea"], maxWords: 3, why: { az: "\"saw the Caspian Sea below me\".", ru: "«saw the Caspian Sea below me»." } },
          { id: "q7", type: "choice", prompt: "How does she feel about flying now?", options: ["She is still afraid.", "She enjoys it.", "She never flies.", "She prefers driving."], answer: 1, why: { az: "\"now I really enjoy it\".", ru: "«now I really enjoy it»." } },
          { id: "q8", type: "short", prompt: "What kind of seat does she always ask for? (max 2 words)", accept: ["a window seat", "window seat", "window"], maxWords: 3, why: { az: "\"I always ask for a window seat\".", ru: "«I always ask for a window seat»." } },
        ],
      },
    ],
  },
  {
    id: "rd-e2-sleep",
    kind: "reading",
    level: "elementary",
    title: { en: "Why sleep matters", az: "Yuxu niyə vacibdir", ru: "Почему важен сон" },
    description: { en: "Simple facts about sleep and some practical advice.", az: "Yuxu haqqında sadə faktlar və praktik məsləhətlər.", ru: "Простые факты о сне и практические советы." },
    minutes: 8,
    timed: false,
    passage: {
      title: "Why sleep matters",
      paragraphs: [
        "Most adults need seven to nine hours of sleep every night, but many people sleep much less. Some people think that sleep is a waste of time. In fact, our body and brain are very busy while we sleep.",
        "During sleep, the brain organises the things we learned during the day. This is why students who sleep well often remember more than students who stay up all night before an exam. Sleep also helps the body to repair itself and fight illness.",
        "If you don't sleep enough, you can feel tired, hungry and irritable. You might find it difficult to concentrate at work or school, and it is more dangerous to drive.",
        "Doctors give some simple advice. You should go to bed and get up at the same time every day, even at the weekend. You shouldn't drink coffee in the evening, and it's a good idea to put your phone away an hour before bed.",
      ],
    },
    reading: {
      topic: { en: "Health and psychology", az: "Sağlamlıq və psixologiya", ru: "Здоровье и психология" },
      translation: {
        az: [
          "Yetkinlərin çoxuna hər gecə yeddi-doqquz saat yuxu lazımdır, amma bir çox insan bundan xeyli az yatır. Bəziləri yuxunun vaxt itkisi olduğunu düşünür. Əslində, biz yatarkən bədənimiz və beynimiz çox məşğuldur.",
          "Yuxu zamanı beyin gün ərzində öyrəndiklərimizi qaydaya salır. Buna görə də yaxşı yatan tələbələr imtahandan əvvəl bütün gecəni oyaq qalan tələbələrdən çox vaxt daha çox şey yadda saxlayır. Yuxu həm də bədənin özünü bərpa etməsinə və xəstəliklə mübarizəsinə kömək edir.",
          "Kifayət qədər yatmasanız, özünüzü yorğun, ac və əsəbi hiss edə bilərsiniz. İşdə və ya məktəbdə diqqətinizi cəmləmək çətin ola bilər, maşın sürmək isə daha təhlükəlidir.",
          "Həkimlər bir neçə sadə məsləhət verirlər. Hər gün, hətta həftə sonu da eyni vaxtda yatıb eyni vaxtda durmalısınız. Axşam qəhvə içməməlisiniz və yatmazdan bir saat əvvəl telefonu kənara qoymaq yaxşı fikirdir.",
        ],
        ru: [
          "Большинству взрослых нужно семь–девять часов сна каждую ночь, но многие спят гораздо меньше. Некоторые считают, что сон — это пустая трата времени. На самом деле, пока мы спим, наше тело и мозг очень заняты.",
          "Во время сна мозг упорядочивает то, что мы узнали за день. Поэтому студенты, которые хорошо высыпаются, часто запоминают больше, чем те, кто не спит всю ночь перед экзаменом. Сон также помогает телу восстанавливаться и бороться с болезнями.",
          "Если вы недосыпаете, вы можете чувствовать себя усталым, голодным и раздражительным. Вам может быть трудно сосредоточиться на работе или в школе, а водить машину становится опаснее.",
          "Врачи дают несколько простых советов. Ложитесь спать и вставайте в одно и то же время каждый день, даже в выходные. Не пейте кофе вечером, и неплохо убирать телефон за час до сна.",
        ],
      },
      vocab: [
        { en: "a waste of time", az: "vaxt itkisi", ru: "пустая трата времени" },
        { en: "organise", az: "qaydaya salmaq", ru: "упорядочивать" },
        { en: "stay up", az: "oyaq qalmaq", ru: "не ложиться спать" },
        { en: "repair", az: "bərpa etmək", ru: "восстанавливать" },
        { en: "irritable", az: "əsəbi", ru: "раздражительный" },
        { en: "concentrate", az: "diqqəti cəmləmək", ru: "сосредоточиться" },
      ],
      grammar: [
        { en: "students who sleep well", note: { az: "Nisbi budaq cümlə: who + feil (24-cü gün).", ru: "Относительное придаточное: who + глагол (24-й день)." } },
        { en: "If you don't sleep enough, you can feel tired", note: { az: "Real şərt: If + Present, can/will + V1.", ru: "Реальное условие: If + Present, can/will + V1." } },
        { en: "You should go to bed … You shouldn't drink coffee", note: { az: "Məsləhət: should / shouldn't + V1.", ru: "Совет: should / shouldn't + V1." } },
        { en: "it's a good idea to put your phone away", note: { az: "It + sifət/isim + to + V1 (17-ci gün).", ru: "It + прилагательное/существительное + to + V1 (17-й день)." } },
      ],
    },
    sections: [
      {
        instructions: howTo,
        questions: [
          { id: "q1", type: "choice", prompt: "How many hours of sleep do most adults need?", options: ["Five to six", "Six to seven", "Seven to nine", "Ten"], answer: 2, why: { az: "\"seven to nine hours\".", ru: "«seven to nine hours»." } },
          { id: "q2", type: "choice", prompt: "What does the brain do during sleep?", options: ["It rests completely.", "It organises what we learned.", "It forgets the day.", "It stops working."], answer: 1, why: { az: "\"the brain organises the things we learned\".", ru: "«the brain organises the things we learned»." } },
          { id: "q3", type: "tfng", prompt: "Students who stay up all night remember more.", answer: "F", why: { az: "Əksinə: yaxşı yatanlar daha çox yadda saxlayır.", ru: "Наоборот: те, кто хорошо спит, запоминают больше." } },
          { id: "q4", type: "tfng", prompt: "Lack of sleep can make you feel hungry.", answer: "T", why: { az: "\"you can feel tired, hungry and irritable\".", ru: "«you can feel tired, hungry and irritable»." } },
          { id: "q5", type: "tfng", prompt: "Children need more sleep than adults.", answer: "NG", why: { az: "Mətndə uşaqlardan danışılmır.", ru: "О детях в тексте не говорится." } },
          { id: "q6", type: "short", prompt: "What shouldn't you drink in the evening? (one word)", accept: ["coffee"], maxWords: 1, why: { az: "\"You shouldn't drink coffee in the evening\".", ru: "«You shouldn't drink coffee in the evening»." } },
          { id: "q7", type: "short", prompt: "When should you put your phone away? (max 4 words)", accept: ["an hour before bed", "one hour before bed", "an hour before bedtime"], maxWords: 4, why: { az: "\"an hour before bed\".", ru: "«an hour before bed»." } },
        ],
      },
    ],
  },
];
