import type { IeltsSpeakingTopic } from "./types";

export const IELTS_TECHNOLOGY: IeltsSpeakingTopic = {
  id: "technology-social-media",
  title: { en: "Technology and Social Media", az: "Texnologiya və sosial media", ru: "Технологии и социальные сети" },
  intro: {
    az: "Bu mövzuda gündəlik texnologiya vərdişlərinizdən (Present Simple, tezlik zərfləri), texnologiyanın həyatınızı necə dəyişdiyindən (Present Perfect, used to) və onun cəmiyyətə təsirindən (müqayisə, although/however, şərt cümlələri) danışacaqsınız.",
    ru: "В этой теме вы будете говорить о своих технологических привычках (Present Simple, наречия частоты), о том, как технологии изменили вашу жизнь (Present Perfect, used to), и об их влиянии на общество (сравнения, although/however, условные предложения).",
  },
  part1: [
    { q: "How often do you use social media?", tr: { az: "Sosial mediadan nə qədər tez-tez istifadə edirsiniz?", ru: "Как часто вы пользуетесь соцсетями?" }, a: "Every day, I'm afraid — probably more than I should. I usually check Instagram in the morning and again in the evening. I've tried to cut down recently by turning off notifications, and it's helped a bit." },
    { q: "Which app do you use the most?", tr: { az: "Ən çox hansı tətbiqdən istifadə edirsiniz?", ru: "Каким приложением вы пользуетесь больше всего?" }, a: "Probably WhatsApp, because my whole family uses it to stay in touch. We have a family group where my aunts post photos of everything they cook, so it's never quiet." },
    { q: "Did you use computers a lot when you were a child?", tr: { az: "Uşaq olanda kompüterdən çox istifadə edirdiniz?", ru: "Вы много пользовались компьютером в детстве?" }, a: "Not really. We had one old computer at home, and my brother and I used to fight over who could play games on it. These days children have their own tablets from a very young age, which is a huge change." },
    { q: "Is there a piece of technology you couldn't live without?", tr: { az: "Onsuz yaşaya bilmədiyiniz bir texnologiya varmı?", ru: "Есть ли техника, без которой вы не можете жить?" }, a: "My phone, obviously — not because of social media, but because everything is on it now: my bank, my maps, my tickets, even my English dictionary. If I lost it, I'd feel completely lost myself." },
    { q: "Do you prefer reading on paper or on a screen?", tr: { az: "Kağızda oxumağı üstün tutursunuz, yoxsa ekranda?", ru: "Вы предпочитаете читать на бумаге или с экрана?" }, a: "For long books, definitely paper. I find it easier to concentrate, and my eyes don't get tired. But for news and short articles, I read everything on my phone because it's more convenient." },
    { q: "Have you ever taken a break from social media?", tr: { az: "Heç sosial mediaya fasilə vermisinizmi?", ru: "Вы когда-нибудь делали перерыв в соцсетях?" }, a: "Yes, last summer I deleted the apps for two weeks while I was on holiday. The first few days were strange — I kept reaching for my phone — but by the end I felt much calmer and I actually read two books." },
  ],
  part2: {
    cue: "Describe a piece of technology that has changed your life.",
    prompts: ["what it is", "when you started using it", "how you use it"],
    closing: "and explain how it has changed your life.",
    cueTr: {
      az: "Həyatınızı dəyişmiş bir texnologiyanı təsvir edin: bu nədir, ondan nə vaxt istifadə etməyə başlamısınız, ondan necə istifadə edirsiniz və həyatınızı necə dəyişdiyini izah edin.",
      ru: "Опишите технологию, которая изменила вашу жизнь: что это, когда вы начали ею пользоваться, как вы ею пользуетесь, и объясните, как она изменила вашу жизнь.",
    },
    answer: [
      "The piece of technology I'd like to talk about is a language-learning app on my phone. It might sound like a small thing, but honestly it has changed my daily routine and, in a way, my future plans.",
      "I started using it about three years ago. At that time I was working long hours and I didn't have the time or the money for an English course. A colleague showed me the app during a lunch break, and I downloaded it that evening, mainly out of curiosity. I didn't expect to keep using it for more than a week.",
      "Now I use it every single day, usually on the metro on my way to work. The lessons only take ten or fifteen minutes, which is perfect, because I can fit them into moments that I used to waste scrolling through social media. The app reminds me if I forget, and there's a streak counter that shows how many days in a row I've practised — at the moment it's over four hundred. I also use it to listen to short stories and to practise pronunciation with the microphone.",
      "As for how it has changed my life, the biggest difference is confidence. Three years ago I could hardly introduce myself in English, and now I can follow films without subtitles and talk to foreign clients at work. Because of that, I was given more responsibility in my job, and I've started thinking seriously about studying abroad. If someone had told me that a free app on my phone would make such a difference, I wouldn't have believed them.",
    ],
    translation: {
      az: [
        "Danışmaq istədiyim texnologiya telefonumdakı dil öyrənmə tətbiqidir. Kiçik bir şey kimi səslənə bilər, amma səmimi desəm, o, mənim gündəlik rejimimi və müəyyən mənada gələcək planlarımı dəyişib.",
        "Ondan təxminən üç il əvvəl istifadə etməyə başladım. O vaxt uzun saatlar işləyirdim və ingilis dili kursu üçün nə vaxtım, nə də pulum var idi. Bir həmkarım nahar fasiləsində tətbiqi mənə göstərdi və mən onu həmin axşam, əsasən maraq üzündən yüklədim. Ondan bir həftədən artıq istifadə edəcəyimi gözləmirdim.",
        "İndi ondan hər gün, adətən işə gedərkən metroda istifadə edirəm. Dərslər cəmi on-on beş dəqiqə çəkir, bu da əladır, çünki onları əvvəllər sosial mediada boş-boşuna vərəqləməyə sərf etdiyim anlara sığışdıra bilirəm. Unutsam, tətbiq xatırladır və neçə gün ardıcıl məşq etdiyimi göstərən sayğac var — hazırda dörd yüzdən çoxdur. Həmçinin ondan qısa hekayələr dinləmək və mikrofonla tələffüz məşq etmək üçün istifadə edirəm.",
        "Həyatımı necə dəyişdiyinə gəlincə, ən böyük fərq özünəinamdır. Üç il əvvəl ingiliscə özümü güclə təqdim edə bilirdim, indi isə filmləri altyazısız izləyə və işdə xarici müştərilərlə danışa bilirəm. Buna görə işdə mənə daha çox məsuliyyət verdilər və xaricdə oxumaq barədə ciddi düşünməyə başlamışam. Kimsə mənə telefonumdakı pulsuz bir tətbiqin belə fərq yaradacağını desəydi, inanmazdım.",
      ],
      ru: [
        "Технология, о которой я хочу рассказать, — это приложение для изучения языков на моём телефоне. Это может показаться мелочью, но, честно говоря, оно изменило мой распорядок дня и в каком-то смысле мои планы на будущее.",
        "Я начал им пользоваться примерно три года назад. Тогда я много работал, и у меня не было ни времени, ни денег на курсы английского. Коллега показал мне приложение в обеденный перерыв, и я скачал его в тот же вечер, в основном из любопытства. Я не ожидал, что буду пользоваться им дольше недели.",
        "Теперь я занимаюсь каждый день, обычно в метро по дороге на работу. Уроки занимают всего десять-пятнадцать минут, и это идеально, потому что я могу вписать их в моменты, которые раньше тратил на бесцельную ленту соцсетей. Если я забываю, приложение напоминает, а счётчик показывает, сколько дней подряд я занимаюсь, — сейчас больше четырёхсот. Ещё я слушаю в нём короткие рассказы и тренирую произношение с микрофоном.",
        "Что касается того, как оно изменило мою жизнь, главная разница — уверенность. Три года назад я с трудом мог представиться по-английски, а теперь смотрю фильмы без субтитров и разговариваю с иностранными клиентами на работе. Благодаря этому мне доверили больше ответственности, и я начал всерьёз думать об учёбе за границей. Если бы мне кто-то сказал, что бесплатное приложение в телефоне так много изменит, я бы не поверил.",
      ],
    },
    vocab: [
      { en: "out of curiosity", az: "maraq üzündən", ru: "из любопытства" },
      { en: "fit something into", az: "nəyisə (vaxta) sığışdırmaq", ru: "вписать что-то (во время)" },
      { en: "scroll through", az: "vərəqləmək (ekranda)", ru: "листать (ленту)" },
      { en: "in a row", az: "ardıcıl", ru: "подряд" },
      { en: "subtitles", az: "altyazı", ru: "субтитры" },
      { en: "cut down (on)", az: "azaltmaq", ru: "сократить" },
      { en: "notification", az: "bildiriş", ru: "уведомление" },
      { en: "convenient", az: "rahat, əlverişli", ru: "удобный" },
    ],
    expressions: [
      { en: "It might sound like a small thing, but …", az: "Kiçik bir şey kimi səslənə bilər, amma …", ru: "Это может показаться мелочью, но …" },
      { en: "honestly / to be honest", az: "səmimi desəm", ru: "честно говоря" },
      { en: "in a way", az: "müəyyən mənada", ru: "в каком-то смысле" },
      { en: "The biggest difference is …", az: "Ən böyük fərq … -dır", ru: "Главная разница — …" },
      { en: "If someone had told me …, I wouldn't have believed them.", az: "Kimsə mənə … desəydi, inanmazdım.", ru: "Если бы мне кто-то сказал …, я бы не поверил." },
    ],
    grammar: [
      { en: "a piece of technology that has changed your life", note: { az: "Nisbi cümlə + Present Perfect: nəticə indi də var.", ru: "Придаточное + Present Perfect: результат есть и сейчас." } },
      { en: "moments that I used to waste", note: { az: "Nisbi cümlə + used to (keçmiş vərdiş).", ru: "Придаточное + used to (привычка в прошлом)." } },
      { en: "how many days in a row I've practised", note: { az: "Dolayı sual (düz söz sırası) + Present Perfect.", ru: "Косвенный вопрос (прямой порядок) + Present Perfect." } },
      { en: "I was given more responsibility", note: { az: "Past Passive: kim verdiyi vacib deyil.", ru: "Past Passive: неважно, кто дал." } },
      { en: "If someone had told me …, I wouldn't have believed them", note: { az: "Üçüncü şərt.", ru: "Третий тип условных." } },
    ],
  },
  part3: [
    { q: "How has social media changed the way people communicate?", tr: { az: "Sosial media insanların ünsiyyət tərzini necə dəyişib?", ru: "Как соцсети изменили общение людей?" }, a: "It has made communication much faster and easier over long distances — I can talk to relatives in another country every day for free. However, I think conversations have become shorter and more superficial. People share a lot of photos, but they don't necessarily share how they really feel." },
    { q: "Do you think people spend too much time online?", tr: { az: "Sizcə, insanlar internetdə həddindən artıq vaxt keçirir?", ru: "Как вы думаете, люди проводят слишком много времени в интернете?" }, a: "Many people do, yes, and I include myself. The problem isn't the time itself but what we do with it. An hour on an online course is very different from an hour of scrolling. I think schools should teach young people how to use technology deliberately rather than just banning it." },
    { q: "Should children be allowed to use smartphones?", tr: { az: "Uşaqlara smartfondan istifadə etməyə icazə verilməlidirmi?", ru: "Нужно ли разрешать детям пользоваться смартфонами?" }, a: "I think it depends on the age. For young children, I'd limit screen time quite strictly, because they need to play, move and talk to people face to face. Teenagers, on the other hand, will need these skills, so it's better if parents guide them rather than forbid phones completely." },
    { q: "Is it a good thing that news is spread so quickly online?", tr: { az: "Xəbərlərin internetdə belə tez yayılması yaxşıdırmı?", ru: "Хорошо ли, что новости так быстро распространяются в интернете?" }, a: "It's a double-edged sword. On the one hand, important information, like warnings about natural disasters, can reach millions of people in minutes. On the other hand, false stories spread just as fast, and many people share them without checking. I believe media literacy should be taught at school, just like maths." },
    { q: "What are the advantages and disadvantages of online shopping?", tr: { az: "Onlayn alış-verişin üstünlükləri və çatışmazlıqları nələrdir?", ru: "Каковы плюсы и минусы онлайн-покупок?" }, a: "The main advantages are convenience and choice — you can compare prices and order things that aren't available in local shops. The disadvantages are that you can't see or try the product, and small local businesses often lose customers to big online companies, which affects the life of a neighbourhood." },
    { q: "What new technology do you think will be most important in the future?", tr: { az: "Sizcə, gələcəkdə hansı yeni texnologiya ən vacib olacaq?", ru: "Какая новая технология, по-вашему, будет важнее всего в будущем?" }, a: "Probably artificial intelligence, because it will affect almost every area — medicine, education, transport. If it's used responsibly, it could help doctors diagnose diseases earlier, for example. But it will also raise difficult questions about privacy and jobs, so I think governments will need clear rules." },
  ],
};
