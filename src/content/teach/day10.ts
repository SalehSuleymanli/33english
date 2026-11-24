import type { Teach } from "./types";

export const TEACH_10: Teach = {
  day: 10,
  summary: {
    az: "Bu dərsdə beşinci çərçivəni, sahiblik çərçivəsini öyrənirsiniz: Subject + have / has. Bu struktur kimin nəyə sahib olduğunu bildirir. Ən vacib məqam: sahiblik \"have\"-i Perfect zamanlardakı köməkçi \"have\"-dən ayırmaq.",
    ru: "В этом уроке вы изучаете пятую рамку — рамку обладания: Subject + have / has. Эта структура сообщает, что у кого есть. Самое важное — отличать «have» обладания от вспомогательного «have» во временах Perfect.",
  },
  sections: [
    {
      id: "meaning",
      title: { az: "1. Have nə deməkdir?", ru: "1. Что означает have?" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Azərbaycan dilində sahibliyi \"mənim ... var\" şəklində deyirik: \"Mənim maşınım var.\" İngilis dilində isə sahib mübtəda olur və feil \"have\" işlənir: \"I have a car\" — hərfən \"Mən maşına sahibəm\". Yəni cümlə sahibdən başlayır, \"var\" sözünün yerini \"have\" tutur.",
            ru: "По-русски обладание выражается так: «У меня есть машина». В английском владелец становится подлежащим, а глагол — «have»: «I have a car», буквально «Я имею машину». То есть предложение начинается с владельца, а «есть» заменяется на «have».",
          },
        },
        {
          kind: "formula",
          label: { az: "Təsdiq cümləsi", ru: "Утвердительное предложение" },
          parts: [
            { text: "My sister", role: "subject", note: { az: "Sahib: kimin?", ru: "Владелец: у кого?" } },
            { text: "has", role: "verb", note: { az: "He/she/it ilə has, digərləri ilə have.", ru: "С he/she/it — has, с остальными — have." } },
            { text: "two children", role: "object", note: { az: "Sahib olunan şey.", ru: "То, что есть." } },
          ],
          example: "My sister has two children.",
        },
        {
          kind: "table",
          head: [{ az: "Mübtəda", ru: "Подлежащее" }, { az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["I / you / we / they", "have", "We have a dog."],
            ["he / she / it / Ali", "has", "Ali has a new phone."],
          ],
        },
      ],
    },
    {
      id: "uses",
      title: { az: "2. Have ilə nələri deyirik", ru: "2. Что мы говорим с have" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["things you own", "I have a car. They have a big house."],
            ["family and relationships", "I have two brothers. She has a lot of friends."],
            ["body and appearance", "He has blue eyes. She has long hair."],
            ["illness", "I have a headache. He has a cold."],
            ["time and plans", "I have a meeting at 3. Do you have time?"],
            ["features of things / places", "The hotel has a pool. This phone has a great camera."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Xəstəliklər üçün də \"have\" işlənir: \"I have a headache\" (başım ağrıyır), \"I have a cold\" (soyuqdəymişəm). Bu, Azərbaycan və rus dillərindən fərqli qurulduğu üçün xüsusilə yadda saxlayın.",
            ru: "Для болезней тоже используется «have»: «I have a headache» (у меня болит голова), «I have a cold» (я простужен). Запомните это особенно: в русском такие фразы строятся иначе.",
          },
        },
      ],
    },
    {
      id: "forms",
      title: { az: "3. İnkar, sual və qısa cavablar", ru: "3. Отрицание, вопрос и краткие ответы" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Sahiblik mənasında \"have\" adi feil kimi davranır: sual və inkar üçün \"do / does / did\" lazımdır. \"Do you have a pen?\", \"She doesn't have a car.\" \"Does\" ilə \"has\" yox, \"have\" işlənir, çünki -s artıq \"does\"-dadır.",
            ru: "В значении обладания «have» ведёт себя как обычный глагол: для вопроса и отрицания нужен «do / does / did». «Do you have a pen?», «She doesn't have a car.» После «does» используется «have», а не «has», потому что -s уже в «does».",
          },
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "I / you / we / they", ru: "I / you / we / they" }, { az: "he / she / it", ru: "he / she / it" }],
          rows: [
            ["+", "I have a bike.", "She has a bike."],
            ["−", "I don't have a bike.", "She doesn't have a bike."],
            ["?", "Do you have a bike?", "Does she have a bike?"],
            ["Short answers", "Yes, I do. / No, I don't.", "Yes, she does. / No, she doesn't."],
            ["Past", "I had a bike. I didn't have a bike. Did you have a bike?", "(same for all)"],
            ["Future", "I'll have more time next week.", "(same for all)"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Britaniya ingiliscəsində danışıqda \"have got\" də işlənir: \"I've got a car\", \"Have you got a pen?\", \"She hasn't got time.\" Məna eynidir. Bu formada \"do\" lazım deyil. \"Have got\" yalnız indiki zamanda işlənir; keçmişdə \"had\" deyilir.",
            ru: "В британском разговорном английском используется также «have got»: «I've got a car», «Have you got a pen?», «She hasn't got time.» Значение то же. В этой форме «do» не нужен. «Have got» бывает только в настоящем; в прошлом говорят «had».",
          },
        },
      ],
    },
    {
      id: "actions",
      title: { az: "4. Hərəkət mənasında have", ru: "4. Have в значении действия" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Have\" bəzən sahiblik deyil, hərəkət bildirir: yemək, içmək, istirahət, hadisə. Bu mənada o, continuous formada da işlənə bilər: \"I'm having lunch\" (nahar edirəm). \"Have got\" bu mənada işlənmir.",
            ru: "Иногда «have» означает не обладание, а действие: еду, питьё, отдых, событие. В этом значении он может быть и в Continuous: «I'm having lunch» (я обедаю). «Have got» в этом значении не используется.",
          },
        },
        {
          kind: "signals",
          words: ["have breakfast / lunch / dinner", "have a coffee", "have a shower", "have a rest", "have a party", "have a good time", "have a look", "have a problem", "have fun"],
          text: {
            az: "Bu ifadələri bütöv şəkildə yadda saxlayın. \"Have a good time!\" — Yaxşı vaxt keçir! \"Have a look\" — Bax.",
            ru: "Запоминайте эти выражения целиком. «Have a good time!» — Хорошо проведи время! «Have a look» — Взгляни.",
          },
        },
      ],
    },
    {
      id: "helper",
      title: { az: "5. Sahiblik have və köməkçi have", ru: "5. Have обладания и вспомогательный have" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Bu, kursun ən vacib incəliklərindən biridir. \"Have\" sözü iki fərqli rolda çıxış edir. Sahiblik çərçivəsində (5-ci) o, əsas feildir və \"sahib olmaq\" deməkdir: \"I have a car.\" Perfect zamanlarda isə o, köməkçi feildir və heç bir sahiblik mənası yoxdur; sadəcə zamanı qurur və ondan sonra feilin üçüncü forması (V3) gəlir: \"I have finished\" — bitirmişəm. Bu cümlə 3-cü çərçivəyə, hərəkətə aiddir.",
            ru: "Это одна из самых важных тонкостей курса. Слово «have» выступает в двух разных ролях. В рамке обладания (5) это основной глагол со значением «иметь»: «I have a car.» Во временах Perfect это вспомогательный глагол без всякого значения обладания: он лишь строит время, и после него идёт третья форма глагола (V3): «I have finished» — я закончил. Такое предложение относится к рамке 3 — действию.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Rol", ru: "Роль" }, { az: "Sonra nə gəlir", ru: "Что идёт после" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["possession (Frame 5)", "a noun", "I have a sister. She has a cat."],
            ["helper (Frame 3, perfect)", "V3 (past participle)", "I have seen this film. She has left."],
            ["both together", "have + had", "I have had this car for ten years."],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "Sürətli test: \"have\"-dən sonra isim gəlirsə (a car, two brothers) — sahiblikdir. Feilin üçüncü forması gəlirsə (done, seen, been) — köməkçidir. Sualda da fərq görünür: sahiblik — \"Do you have…?\", köməkçi — \"Have you seen…?\"",
            ru: "Быстрая проверка: если после «have» существительное (a car, two brothers) — это обладание. Если третья форма глагола (done, seen, been) — вспомогательный. В вопросе тоже видно: обладание — «Do you have…?», вспомогательный — «Have you seen…?»",
          },
        },
      ],
    },
    {
      id: "compare",
      title: { az: "6. Müqayisə: have və there is", ru: "6. Сравнение: have и there is" },
      blocks: [
        {
          kind: "compare",
          items: [
            {
              en: "I have a garden. / There is a garden behind my house.",
              text: {
                az: "\"Have\" sahibliyi vurğulayır (mənim bağım var), \"there is\" yerdə mövcudluğu (evin arxasında bağ var). Yer haqqında danışanda \"there is\", şəxs haqqında danışanda \"have\".",
                ru: "«Have» подчёркивает обладание (у меня есть сад), «there is» — наличие в месте (за домом есть сад). Говоря о месте — «there is», о человеке — «have».",
              },
            },
            {
              en: "Do you have any questions? / Are there any questions?",
              text: {
                az: "Hər ikisi düzgündür. Müəllim auditoriyaya hər iki formada müraciət edə bilər.",
                ru: "Оба варианта верны. Преподаватель может обратиться к аудитории в любой из этих форм.",
              },
            },
          ],
        },
      ],
    },
    {
      id: "examples",
      title: { az: "7. Nümunələr və tərcümələr", ru: "7. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "I have two sisters and a brother.", az: "İki bacım və bir qardaşım var.", ru: "У меня две сестры и брат." },
            { en: "Does this hotel have free Wi-Fi?", az: "Bu oteldə pulsuz Wi-Fi var?", ru: "В этом отеле есть бесплатный Wi-Fi?" },
            { en: "We don't have much time.", az: "Çox vaxtımız yoxdur.", ru: "У нас мало времени." },
            { en: "She has a beautiful voice.", az: "Onun gözəl səsi var.", ru: "У неё красивый голос." },
            { en: "I have a terrible headache.", az: "Başım dəhşətli ağrıyır.", ru: "У меня ужасно болит голова." },
            { en: "Did you have a car when you lived in Baku?", az: "Bakıda yaşayanda maşının var idi?", ru: "У тебя была машина, когда ты жил в Баку?" },
            { en: "I'll have a black coffee, please.", az: "Mənə qara qəhvə, zəhmət olmasa.", ru: "Мне чёрный кофе, пожалуйста." },
            { en: "We're having dinner. Can I call you later?", az: "Şam yeməyi yeyirik. Sonra zəng edə bilərəm?", ru: "Мы ужинаем. Можно я перезвоню?" },
            { en: "Have you got a minute?", az: "Bir dəqiqən var?", ru: "У тебя есть минутка?" },
            { en: "He doesn't have any experience.", az: "Onun heç bir təcrübəsi yoxdur.", ru: "У него нет никакого опыта." },
            { en: "I have lived here for five years. (helper have)", az: "Beş ildir burada yaşayıram. (köməkçi have)", ru: "Я живу здесь пять лет. (вспомогательный have)" },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "8. Tipik səhvlər", ru: "8. Типичные ошибки" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "She have a car.", right: "She has a car.", why: { az: "Üçüncü şəxs təkdə has.", ru: "В третьем лице единственного числа — has." } },
            { wrong: "Does he has a brother?", right: "Does he have a brother?", why: { az: "Does-dan sonra have.", ru: "После does — have." } },
            { wrong: "I haven't a car.", right: "I don't have a car. / I haven't got a car.", why: { az: "Müasir ingilis dilində sahiblik üçün \"don't have\" və ya \"haven't got\".", ru: "В современном английском для обладания — «don't have» или «haven't got»." } },
            { wrong: "At me is a car.", right: "I have a car.", why: { az: "Rus dilindəki \"У меня есть\" quruluşunu birbaşa köçürmək. İngilis dilində sahib mübtədadır.", ru: "Дословный перевод «У меня есть». В английском владелец — подлежащее." } },
            { wrong: "My car is two doors.", right: "My car has two doors.", why: { az: "Xüsusiyyət və hissələr üçün has.", ru: "Для частей и характеристик — has." } },
            { wrong: "I am having a car.", right: "I have a car.", why: { az: "Sahiblik mənasında continuous işlənmir.", ru: "В значении обладания Continuous не используется." } },
            { wrong: "Have you a pen?", right: "Do you have a pen? / Have you got a pen?", why: { az: "\"Have you…?\" köhnəlmiş formadır. Sahiblik üçün \"Do you have\" və ya \"Have you got\".", ru: "«Have you…?» — устаревшая форма. Для обладания — «Do you have» или «Have you got»." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Sahiblik: I/you/we/they have, he/she/it has.", ru: "Обладание: I/you/we/they have, he/she/it has." },
    { az: "Sual və inkar do/does/did ilə: Do you have…? She doesn't have…", ru: "Вопрос и отрицание с do/does/did: Do you have…? She doesn't have…" },
    { az: "Have + isim = sahiblik (5-ci çərçivə). Have + V3 = Perfect zaman (3-cü çərçivə).", ru: "Have + существительное = обладание (рамка 5). Have + V3 = время Perfect (рамка 3)." },
    { az: "Hərəkət mənasında: have breakfast, have a shower, have fun.", ru: "В значении действия: have breakfast, have a shower, have fun." },
  ],
};
