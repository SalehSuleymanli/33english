import type { IeltsSpeakingTopic } from "./types";

export const IELTS_HOBBIES: IeltsSpeakingTopic = {
  id: "hobbies-sports-free-time",
  title: { en: "Hobbies, Sports and Free Time", az: "Hobbilər, idman və boş vaxt", ru: "Хобби, спорт и свободное время" },
  intro: {
    az: "Bu mövzuda boş vaxtınızı necə keçirdiyinizdən (Present Simple, tezlik), nə vaxtdan məşğul olduğunuzdan (Present Perfect + for/since), uşaqlıq maraqlarından (used to) və idmanın, asudə vaxtın cəmiyyətdəki rolundan (it + sifət + to, should, şərt cümlələri) danışacaqsınız.",
    ru: "В этой теме вы будете говорить о том, как проводите свободное время (Present Simple, частота), как давно чем-то занимаетесь (Present Perfect + for/since), о детских увлечениях (used to) и о роли спорта и досуга в обществе (it + прилагательное + to, should, условные предложения).",
  },
  part1: [
    { q: "What do you like to do in your free time?", tr: { az: "Boş vaxtınızda nə etməyi sevirsiniz?", ru: "Чем вы любите заниматься в свободное время?" }, a: "I like doing something active after sitting at a desk all day, so I usually go running by the sea or play football with friends. At the weekend I also enjoy cooking for my family — it's my way of relaxing." },
    { q: "Do you play any sports?", tr: { az: "Hər hansı idmanla məşğul olursunuz?", ru: "Вы занимаетесь каким-нибудь спортом?" }, a: "Yes, I play football twice a week in a small amateur team. We're not very good, to be honest, but we have a lot of fun, and it's a great way to stay fit and see friends at the same time." },
    { q: "Did you have a hobby as a child?", tr: { az: "Uşaq olanda hobbiniz var idimi?", ru: "Было ли у вас хобби в детстве?" }, a: "I used to collect stamps, believe it or not. My grandfather gave me his old collection when I was eight, and I spent hours sorting them by country. I don't collect anything now, but I still have the album." },
    { q: "Is there a new hobby you would like to try?", tr: { az: "Sınamaq istədiyiniz yeni bir hobbi varmı?", ru: "Есть ли новое хобби, которое вы хотели бы попробовать?" }, a: "I'd love to learn rock climbing. A friend of mine started last year and showed me some videos, and it looks both challenging and exciting. There's an indoor climbing centre near my office, so I'm planning to try a beginners' class soon." },
    { q: "Do you prefer spending free time at home or outside?", tr: { az: "Boş vaxtı evdə keçirməyi üstün tutursunuz, yoxsa çöldə?", ru: "Вы предпочитаете проводить свободное время дома или на улице?" }, a: "Outside, especially in spring and autumn when the weather in Baku is perfect. In winter, though, I'm happy to stay at home with a good book or a series." },
    { q: "How much free time do you have during the week?", tr: { az: "Həftə ərzində nə qədər boş vaxtınız olur?", ru: "Сколько свободного времени у вас бывает в течение недели?" }, a: "Not as much as I'd like. On weekdays I usually have only a couple of hours in the evening. That's why I try not to waste my weekends — I plan at least one activity that has nothing to do with work." },
  ],
  part2: {
    cue: "Describe a hobby or activity that you enjoy doing in your free time.",
    prompts: ["what the activity is", "when and how you started it", "how often and where you do it"],
    closing: "and explain why you enjoy it.",
    cueTr: {
      az: "Boş vaxtınızda etməkdən zövq aldığınız bir hobbi və ya fəaliyyəti təsvir edin: bu nədir, nə vaxt və necə başlamısınız, nə qədər tez-tez və harada edirsiniz və niyə ondan zövq aldığınızı izah edin.",
      ru: "Опишите хобби или занятие, которое вам нравится в свободное время: что это, когда и как вы начали, как часто и где вы этим занимаетесь, и объясните, почему вам это нравится.",
    },
    answer: [
      "The activity I'd like to talk about is running. It's quite a simple hobby, but over the last four years it has become a really important part of my life.",
      "I started almost by accident. I'd been working from home during the pandemic, sitting at my laptop for ten hours a day, and I'd put on quite a lot of weight. One evening my sister suggested that we go for a run together along the seaside boulevard. I couldn't even run for five minutes without stopping, and I remember feeling embarrassed. But she persuaded me to try again the next day, and then the day after that.",
      "These days I run three or four times a week, usually early in the morning before work, because the boulevard is quiet then and it isn't too hot. On Saturdays I do a longer run of about fifteen kilometres. Last spring I took part in my first half-marathon in Baku. I wasn't fast — I finished somewhere in the middle — but crossing the finish line was one of the proudest moments of my life.",
      "There are a few reasons why I enjoy it so much. Physically, I feel much healthier, and I sleep better. But the main benefit is mental. When I'm running, I can't check my phone or think about emails, so it's the only time of the day when my mind is completely clear. I often solve problems while I'm running without even trying. I'd recommend it to anyone, because you don't need expensive equipment — just a good pair of shoes and the decision to start.",
    ],
    translation: {
      az: [
        "Danışmaq istədiyim fəaliyyət qaçışdır. Bu, kifayət qədər sadə hobbidir, amma son dörd ildə həyatımın həqiqətən vacib hissəsinə çevrilib.",
        "Demək olar ki, təsadüfən başladım. Pandemiya zamanı evdən işləyirdim, gündə on saat noutbukun qarşısında otururdum və xeyli kilo almışdım. Bir axşam bacım dənizkənarı bulvarda birlikdə qaçmağı təklif etdi. Dayanmadan heç beş dəqiqə qaça bilmədim və utandığımı xatırlayıram. Amma o, məni ertəsi gün yenidən cəhd etməyə, sonra da ondan sonrakı gün davam etməyə inandırdı.",
        "İndi həftədə üç-dörd dəfə, adətən səhər tezdən, işdən əvvəl qaçıram, çünki o vaxt bulvar sakit olur və çox isti olmur. Şənbə günləri təxminən on beş kilometrlik daha uzun qaçış edirəm. Keçən yaz Bakıda ilk yarımmarafonumda iştirak etdim. Sürətli deyildim — ortalarda bitirdim — amma finiş xəttini keçmək həyatımın ən qürurlu anlarından biri idi.",
        "Ondan bu qədər zövq almağımın bir neçə səbəbi var. Fiziki cəhətdən özümü xeyli sağlam hiss edirəm və daha yaxşı yatıram. Amma əsas fayda psixolojidir. Qaçarkən telefonumu yoxlaya və ya e-poçtlar haqqında düşünə bilmirəm, ona görə bu, günün beynimin tamamilə təmiz olduğu yeganə vaxtıdır. Çox vaxt qaçarkən heç çalışmadan problemləri həll edirəm. Bunu hər kəsə tövsiyə edərdim, çünki bahalı avadanlıq lazım deyil — sadəcə yaxşı bir cüt idman ayaqqabısı və başlamaq qərarı.",
      ],
      ru: [
        "Занятие, о котором я хочу рассказать, — бег. Это довольно простое хобби, но за последние четыре года оно стало по-настоящему важной частью моей жизни.",
        "Я начал почти случайно. Во время пандемии я работал из дома, по десять часов в день сидел за ноутбуком и сильно набрал вес. Однажды вечером сестра предложила вместе пробежаться по приморскому бульвару. Я не мог пробежать даже пяти минут без остановки и помню, как мне было стыдно. Но она уговорила меня попробовать снова на следующий день, а потом и на следующий.",
        "Теперь я бегаю три-четыре раза в неделю, обычно рано утром перед работой, потому что в это время на бульваре тихо и не слишком жарко. По субботам делаю длинную пробежку — около пятнадцати километров. Прошлой весной я участвовал в своём первом полумарафоне в Баку. Я бежал не быстро — финишировал где-то в середине, — но пересечь финишную черту было одним из самых гордых моментов в моей жизни.",
        "Есть несколько причин, почему мне это так нравится. Физически я чувствую себя гораздо здоровее и лучше сплю. Но главная польза — психологическая. Когда я бегу, я не могу проверять телефон или думать о письмах, поэтому это единственное время дня, когда голова совершенно ясная. Часто я решаю проблемы на бегу, даже не стараясь. Я бы посоветовал бег всем, потому что не нужно дорогое снаряжение — только хорошая пара кроссовок и решение начать.",
      ],
    },
    vocab: [
      { en: "put on weight", az: "kilo almaq", ru: "набрать вес" },
      { en: "seaside boulevard", az: "dənizkənarı bulvar", ru: "приморский бульвар" },
      { en: "persuade someone to do", az: "kimisə nəyəsə inandırmaq", ru: "уговорить кого-то" },
      { en: "half-marathon", az: "yarımmarafon", ru: "полумарафон" },
      { en: "finish line", az: "finiş xətti", ru: "финишная черта" },
      { en: "stay fit", az: "formada qalmaq", ru: "поддерживать форму" },
      { en: "amateur", az: "həvəskar", ru: "любительский" },
      { en: "equipment", az: "avadanlıq", ru: "снаряжение" },
    ],
    expressions: [
      { en: "over the last four years", az: "son dörd ildə", ru: "за последние четыре года" },
      { en: "I started almost by accident.", az: "Demək olar ki, təsadüfən başladım.", ru: "Я начал почти случайно." },
      { en: "one of the proudest moments of my life", az: "həyatımın ən qürurlu anlarından biri", ru: "один из самых гордых моментов в моей жизни" },
      { en: "There are a few reasons why …", az: "…-ın bir neçə səbəbi var", ru: "Есть несколько причин, почему …" },
      { en: "I'd recommend it to anyone, because …", az: "Bunu hər kəsə tövsiyə edərdim, çünki …", ru: "Я бы посоветовал это всем, потому что …" },
    ],
    grammar: [
      { en: "it has become a really important part of my life", note: { az: "Present Perfect + over the last four years.", ru: "Present Perfect + over the last four years." } },
      { en: "I'd been working from home … and I'd put on quite a lot of weight", note: { az: "Past Perfect Continuous və Past Perfect: hekayədə fon.", ru: "Past Perfect Continuous и Past Perfect: фон в рассказе." } },
      { en: "my sister suggested that we go for a run", note: { az: "Suggest + that + V1 (təklif).", ru: "Suggest + that + V1 (предложение)." } },
      { en: "she persuaded me to try again", note: { az: "Feil + şəxs + to + V1 (14-cü gün).", ru: "Глагол + человек + to + V1 (14-й день)." } },
      { en: "the only time of the day when my mind is completely clear", note: { az: "Nisbi cümlə when ilə (zaman).", ru: "Придаточное с when (время)." } },
    ],
  },
  part3: [
    { q: "Why is it important for people to have hobbies?", tr: { az: "İnsanların hobbisi olması niyə vacibdir?", ru: "Почему людям важно иметь хобби?" }, a: "Hobbies give people a sense of balance. Most of us spend our days doing things we have to do, so it's important to have something we do purely because we enjoy it. Hobbies also reduce stress, and many of them, like team sports or choirs, help people make friends outside work." },
    { q: "Do you think people today have less free time than in the past?", tr: { az: "Sizcə, bugünkü insanların keçmişlə müqayisədə daha az boş vaxtı var?", ru: "Как вы думаете, у людей сегодня меньше свободного времени, чем раньше?" }, a: "In a way, yes. Even if official working hours haven't increased, smartphones mean that work follows us home — people answer emails at night and at weekends. So although we might technically have free time, it's often interrupted, and that makes it harder to really rest." },
    { q: "Should the government invest more in sports facilities?", tr: { az: "Dövlət idman obyektlərinə daha çox sərmayə qoymalıdırmı?", ru: "Должно ли государство больше вкладывать в спортивные объекты?" }, a: "I believe it should, especially in free public facilities like parks, outdoor gyms and cycle paths. If more people exercised regularly, there would be fewer health problems, which would save money on healthcare in the long run. Big stadiums are impressive, but small local facilities probably make a bigger difference to ordinary people." },
    { q: "Why do professional athletes earn so much money?", tr: { az: "Peşəkar idmançılar niyə bu qədər çox pul qazanır?", ru: "Почему профессиональные спортсмены так много зарабатывают?" }, a: "Mainly because sport is a huge entertainment business. Millions of people watch matches and buy tickets and shirts, and companies pay a lot to advertise during games. Top athletes attract that money. Whether it's fair compared with, say, nurses or teachers is another question — personally, I don't think it is." },
    { q: "How are children's hobbies different now compared with the past?", tr: { az: "Uşaqların hobbiləri keçmişlə müqayisədə necə fərqlənir?", ru: "Чем увлечения детей сегодня отличаются от прошлого?" }, a: "Children today spend much more time on screens — gaming and watching videos — whereas my parents' generation played outside until it got dark. On the positive side, children now have access to many more organised activities, like coding clubs or language courses. The challenge is to make sure they still get enough physical activity." },
    { q: "Can a hobby ever become a career?", tr: { az: "Hobbi nə vaxtsa karyeraya çevrilə bilərmi?", ru: "Может ли хобби стать карьерой?" }, a: "Definitely — think of photographers, chefs or bloggers who started for fun. But there's a risk: once your hobby becomes your job, you have deadlines and clients, and it may stop being relaxing. So I'd say it's worth trying, as long as you find a new hobby to rest with." },
  ],
};
