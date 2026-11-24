import type { Teach } from "./types";

export const TEACH_32: Teach = {
  day: 32,
  summary: {
    az: "Bu dərsdə altı çərçivəni imtahan formatına tətbiq edirsiniz: IELTS tipli danışıq cavablarının quruluşu (Part 1, 2, 3), fikir bildirmək üçün ifadələr, cavabı genişləndirmək texnikası və qısa esse planı. Məqsəd: bildiyiniz strukturları sistemli və inamlı cavaba çevirmək.",
    ru: "В этом уроке вы применяете шесть рамок к экзаменационному формату: структура устных ответов в стиле IELTS (Part 1, 2, 3), фразы для выражения мнения, техника расширения ответа и план короткого эссе. Цель — превратить знакомые структуры в системный и уверенный ответ.",
  },
  sections: [
    {
      id: "speaking",
      title: { az: "1. IELTS danışıq imtahanının quruluşu", ru: "1. Структура устной части IELTS" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Hissə", ru: "Часть" }, { az: "Nə olur", ru: "Что происходит" }, { az: "Cavab uzunluğu", ru: "Длина ответа" }],
          rows: [
            ["Part 1 (4–5 min)", "simple questions about you: work, study, home, hobbies", "2–3 sentences"],
            ["Part 2 (3–4 min)", "a cue card; 1 minute to prepare, 1–2 minutes to speak", "a short talk / story"],
            ["Part 3 (4–5 min)", "abstract discussion linked to Part 2", "4–6 sentences with reasons and examples"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "İmtahançı dörd şeyi qiymətləndirir: səlislik və ardıcıllıq, lüğət, qrammatika müxtəlifliyi və dəqiqliyi, tələffüz. \"Qrammatika müxtəlifliyi\" tam olaraq bu kursda öyrəndikləriniz deməkdir: müxtəlif çərçivələr, zamanlar, şərt cümlələri, nisbi budaq cümlələri, passive. Bunları təbii şəkildə işlətmək balınızı birbaşa artırır.",
            ru: "Экзаменатор оценивает четыре вещи: беглость и связность, лексику, разнообразие и точность грамматики, произношение. «Разнообразие грамматики» — это именно то, что вы изучили в курсе: разные рамки, времена, условные предложения, относительные придаточные, пассив. Естественное их использование напрямую повышает балл.",
          },
        },
      ],
    },
    {
      id: "extend",
      title: { az: "2. Cavabı genişləndirmək: A-R-E texnikası", ru: "2. Как расширить ответ: техника A-R-E" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Answer – Reason – Example", ru: "Answer – Reason – Example" },
          parts: [
            { text: "Answer", role: "subject", note: { az: "Birbaşa cavab: Yes, I do. / I really enjoy…", ru: "Прямой ответ: Yes, I do. / I really enjoy…" } },
            { text: "Reason", role: "connector", note: { az: "Səbəb: because…, The main reason is…", ru: "Причина: because…, The main reason is…" } },
            { text: "Example", role: "other", note: { az: "Nümunə və ya şəxsi təcrübə: For example, last week…", ru: "Пример или личный опыт: For example, last week…" } },
          ],
          example: "Yes, I love cooking, mainly because it helps me relax. For example, last weekend I made dolma for the whole family.",
        },
        {
          kind: "p",
          text: {
            az: "Part 1-də \"Yes\" və ya \"No\" ilə qısa cavab vermək ən böyük səhvdir. A-R-E ilə hər cavab 2–3 cümlə olur və avtomatik olaraq müxtəlif zamanlar işlənir: indiki (cavab), keçmiş (nümunə), hətta gələcək (plan).",
            ru: "Самая большая ошибка в Part 1 — ответить коротко «Yes» или «No». С A-R-E каждый ответ — 2–3 предложения, и в нём естественно появляются разные времена: настоящее (ответ), прошедшее (пример), даже будущее (план).",
          },
        },
      ],
    },
    {
      id: "phrases",
      title: { az: "3. Faydalı ifadələr", ru: "3. Полезные фразы" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Məqsəd", ru: "Цель" }, { az: "İfadələr", ru: "Фразы" }],
          rows: [
            ["opinion", "In my opinion, … / I'd say that … / Personally, I think …"],
            ["thinking time", "That's an interesting question. / Let me think about that for a second."],
            ["contrast", "On the one hand … on the other hand … / Although …, …"],
            ["example", "For instance, … / A good example of this is …"],
            ["speculation", "It might be because … / I suppose … / It's likely that …"],
            ["future / change", "In the future, … will probably … / Things have changed a lot since …"],
            ["conclusion", "So overall, … / That's why I believe …"],
          ],
        },
      ],
    },
    {
      id: "part2",
      title: { az: "4. Part 2: kartla danışmaq", ru: "4. Part 2: монолог по карточке" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Kartda mövzu və 3–4 sual olur (who, what, when, why). Hazırlıq dəqiqəsində cümlə yazmayın — açar sözlər yazın. Danışarkən 31-ci gündəki hekayə quruluşunu işlədin: səhnə, hadisələr, hiss. Kartdakı sualları ardıcıllıqla cavablandırın və sonda \"why\" sualına ən çox vaxt ayırın — orada fikir və qrammatika müxtəlifliyi göstərə bilərsiniz.",
            ru: "На карточке есть тема и 3–4 вопроса (who, what, when, why). За минуту подготовки не пишите предложения — запишите ключевые слова. Говоря, используйте структуру истории из 31-го дня: обстановка, события, чувства. Отвечайте на вопросы карточки по порядку и больше всего времени уделите «why» — там можно показать мнение и разнообразие грамматики.",
          },
        },
        {
          kind: "examples",
          items: [
            { en: "I'd like to talk about a trip I took to Shusha last year.", az: "Keçən il Şuşaya etdiyim səfər haqqında danışmaq istərdim.", ru: "Я хотел бы рассказать о поездке в Шушу в прошлом году." },
            { en: "I had always wanted to visit it, so when my friends suggested it, I agreed immediately.", az: "Həmişə ora getmək istəmişdim, ona görə dostlarım təklif edəndə dərhal razılaşdım.", ru: "Я всегда мечтал там побывать, поэтому, когда друзья предложили, я сразу согласился." },
            { en: "What made it special was the view from the mountains, which was absolutely breathtaking.", az: "Onu xüsusi edən dağlardan açılan mənzərə idi — nəfəs kəsən idi.", ru: "Особенной её сделал вид с гор — просто захватывающий." },
            { en: "If I had the chance, I would definitely go back.", az: "İmkanım olsa, mütləq yenə gedərdim.", ru: "Будь у меня возможность, я бы обязательно вернулся." },
          ],
        },
      ],
    },
    {
      id: "essay",
      title: { az: "5. Qısa esse planı", ru: "5. План короткого эссе" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Abzas", ru: "Абзац" }, { az: "Məzmun", ru: "Содержание" }, { az: "Başlanğıc ifadə", ru: "Начальная фраза" }],
          rows: [
            ["Introduction", "paraphrase the question + your view", "It is often argued that … In my view, …"],
            ["Body 1", "first main idea + example", "Firstly, … For example, …"],
            ["Body 2", "second idea or the other side", "On the other hand, … / Furthermore, …"],
            ["Conclusion", "summarise + final opinion", "In conclusion, … / Overall, I believe …"],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "Yazıda ixtisarlar (don't, it's) və danışıq sözləri (gonna, wanna, stuff) işlətməyin. Passive (It is believed that…) və şərt cümlələri (If governments invested more…) esseni akademik edir.",
            ru: "На письме не используйте сокращения (don't, it's) и разговорные слова (gonna, wanna, stuff). Пассив (It is believed that…) и условные предложения (If governments invested more…) делают эссе академичным.",
          },
        },
      ],
    },
    {
      id: "examples",
      title: { az: "6. Nümunə cavablar", ru: "6. Примеры ответов" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "Do you work or study? — I work as an accountant at a bank. I've been there for about three years, and I really enjoy it because every day is different.", az: "İşləyirsiniz, yoxsa oxuyursunuz? — Bankda mühasib işləyirəm. Təxminən üç ildir oradayam və çox xoşuma gəlir, çünki hər gün fərqlidir.", ru: "Вы работаете или учитесь? — Я работаю бухгалтером в банке. Я там около трёх лет, и мне очень нравится, потому что каждый день разный." },
            { en: "Do you like reading? — Yes, especially before bed. It helps me relax. At the moment I'm reading a novel that my sister recommended.", az: "Oxumağı sevirsiniz? — Bəli, xüsusilə yatmazdan əvvəl. Rahatlamağa kömək edir. Hazırda bacımın tövsiyə etdiyi bir romanı oxuyuram.", ru: "Вы любите читать? — Да, особенно перед сном. Это помогает расслабиться. Сейчас я читаю роман, который посоветовала сестра." },
            { en: "Should children learn a second language at school? — I'd say yes. Children learn languages much more easily than adults, and it opens many doors for them in the future.", az: "Uşaqlar məktəbdə ikinci dil öyrənməlidirmi? — Məncə, bəli. Uşaqlar dilləri böyüklərdən daha asan öyrənir və bu, gələcəkdə onlar üçün çox qapılar açır.", ru: "Должны ли дети учить второй язык в школе? — Я бы сказал, да. Дети учат языки гораздо легче взрослых, и в будущем это открывает им много дверей." },
            { en: "How has technology changed the way people communicate? — It has changed it completely. People used to write letters, but now we can talk to anyone instantly.", az: "Texnologiya ünsiyyəti necə dəyişib? — Tamamilə dəyişib. İnsanlar əvvəllər məktub yazırdılar, indi isə istənilən adamla dərhal danışa bilərik.", ru: "Как технологии изменили общение? — Полностью. Раньше люди писали письма, а теперь мы можем мгновенно поговорить с кем угодно." },
            { en: "That's an interesting question. I've never really thought about it, but I suppose it depends on the person.", az: "Maraqlı sualdır. Bu barədə heç düşünməmişəm, amma məncə, insandan asılıdır.", ru: "Интересный вопрос. Я никогда об этом не задумывался, но, наверное, это зависит от человека." },
            { en: "If I could change one thing about my city, I would build more parks.", az: "Şəhərimdə bir şeyi dəyişə bilsəydim, daha çox park salardım.", ru: "Если бы я мог изменить что-то в своём городе, я бы построил больше парков." },
            { en: "It is often said that money cannot buy happiness.", az: "Tez-tez deyilir ki, pulla xoşbəxtlik almaq olmaz.", ru: "Часто говорят, что счастье не купишь за деньги." },
            { en: "In conclusion, although technology has some disadvantages, its benefits are far greater.", az: "Nəticə olaraq, texnologiyanın bəzi çatışmazlıqları olsa da, faydaları qat-qat böyükdür.", ru: "В заключение: хотя у технологий есть недостатки, их польза гораздо больше." },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "7. İmtahanda tipik səhvlər", ru: "7. Типичные ошибки на экзамене" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "Do you like music? — Yes.", right: "Yes, I do. I listen to it almost every day, mostly when I'm driving…", why: { az: "Çox qısa cavab: səlislik və qrammatika göstərilmir.", ru: "Слишком короткий ответ: не видно ни беглости, ни грамматики." } },
            { wrong: "According to me, …", right: "In my opinion, … / Personally, I think …", why: { az: "Öz fikriniz üçün \"according to\" işlənmir.", ru: "Для своего мнения «according to» не используется." } },
            { wrong: "I am agree that…", right: "I agree that…", why: { az: "Agree feildir, \"am\" lazım deyil.", ru: "Agree — глагол, «am» не нужен." } },
            { wrong: "Nowadays people are using technology very much.", right: "Nowadays people use technology a lot.", why: { az: "Ümumi fakt üçün Present Simple; \"very much\" yerinə \"a lot\".", ru: "Для общего факта — Present Simple; вместо «very much» — «a lot»." } },
            { wrong: "In conclusion, I think it's gonna be better.", right: "In conclusion, I believe it will improve.", why: { az: "Yazıda danışıq formaları işlənmir.", ru: "На письме разговорные формы не используются." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Part 1 — qısa, amma genişləndirilmiş cavablar (A-R-E); Part 2 — hekayə; Part 3 — fikir + səbəb + nümunə.", ru: "Part 1 — короткие, но развёрнутые ответы (A-R-E); Part 2 — история; Part 3 — мнение + причина + пример." },
    { az: "Qrammatika müxtəlifliyi: Perfect, şərt cümlələri, nisbi cümlələr, passive təbii şəkildə.", ru: "Разнообразие грамматики: Perfect, условные, относительные придаточные, пассив — естественно." },
    { az: "Esse: giriş → iki əsas abzas → nəticə; ixtisar və danışıq sözləri yoxdur.", ru: "Эссе: введение → два основных абзаца → заключение; без сокращений и разговорных слов." },
  ],
};
