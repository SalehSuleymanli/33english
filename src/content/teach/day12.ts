import type { Teach } from "./types";

export const TEACH_12: Teach = {
  day: 12,
  summary: {
    az: "Bu, təməl mərhələsinin yoxlama günüdür. Altı çərçivənin hamısını yan-yana qoyur, hər birinin nə vaxt seçildiyini və onların sual-inkar \"mexanizmlərinin\" necə fərqləndiyini sistemləşdiririk. Məqsəd: demək istədiyiniz fikir üçün düzgün çərçivəni avtomatik seçmək.",
    ru: "Это контрольный день этапа «Фундамент». Мы ставим все шесть рамок рядом, систематизируем, когда выбирается каждая, и чем отличаются их «механизмы» вопроса и отрицания. Цель — автоматически выбирать правильную рамку для мысли, которую вы хотите выразить.",
  },
  sections: [
    {
      id: "map",
      title: { az: "1. Altı çərçivənin xəritəsi", ru: "1. Карта шести рамок" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Çərçivə", ru: "Рамка" }, { az: "Hansı suala cavab verir", ru: "На какой вопрос отвечает" }, { az: "Formula", ru: "Формула" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["1 Existence", "What is there? Where?", "There + be + thing + place", "There is a café on the corner."],
            ["2 States", "Who / what / where / how is it?", "Subject + be + description", "The café is small and cosy."],
            ["3 Actions", "What does someone do?", "Subject + verb (+ object)", "My friend works there."],
            ["4 Modals", "Can / must / should someone do it?", "Subject + modal + verb", "You should try their cake."],
            ["5 Possession", "What does someone have?", "Subject + have/has + thing", "The café has a terrace."],
            ["6 Passive", "What is done to something?", "Thing + be + V3", "The cake is made every morning."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Cədvəldəki altı cümlə bir kafe haqqında kiçik bir mətn təşkil edir. Hər cümlə fərqli çərçivədədir və hər biri öz işini görür. Real danışıq məhz belədir: çərçivələr bir-birini əvəz edərək fikri tamamlayır.",
            ru: "Шесть предложений из таблицы складываются в небольшой текст о кафе. Каждое предложение — в своей рамке, и каждое выполняет свою задачу. Именно так устроена живая речь: рамки сменяют друг друга и дополняют мысль.",
          },
        },
      ],
    },
    {
      id: "choose",
      title: { az: "2. Düzgün çərçivəni necə seçmək", ru: "2. Как выбрать правильную рамку" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Fikrinizi ingiliscə deməzdən əvvəl özünüzə bir sual verin: \"Mən nə demək istəyirəm?\" Yeni bir şeyin varlığını? → 1. Kimisə və ya nəyisə təsvir etmək? → 2. Kiminsə hərəkətini? → 3. Bacarıq, məcburiyyət, məsləhət, ehtimal? → 4. Sahibliyi? → 5. Hərəkətin obyektə nə etdiyini, icraçı vacib deyilsə? → 6.",
            ru: "Прежде чем сказать мысль по-английски, задайте себе вопрос: «Что я хочу сказать?» О наличии чего-то нового? → 1. Описать кого-то или что-то? → 2. О действии человека? → 3. Об умении, обязанности, совете, вероятности? → 4. Об обладании? → 5. О том, что происходит с предметом, когда исполнитель неважен? → 6.",
          },
        },
        {
          kind: "formula",
          label: { az: "Qərar ardıcıllığı", ru: "Порядок решения" },
          parts: [
            { text: "meaning", role: "other", note: { az: "Nə demək istəyirəm?", ru: "Что я хочу сказать?" } },
            { text: "frame", role: "be", note: { az: "Hansı çərçivə bu mənanı verir?", ru: "Какая рамка передаёт этот смысл?" } },
            { text: "tense", role: "time", note: { az: "Nə vaxt? İndi, keçmiş, gələcək, proses?", ru: "Когда? Сейчас, прошлое, будущее, процесс?" } },
            { text: "form", role: "question", note: { az: "Təsdiq, inkar yoxsa sual?", ru: "Утверждение, отрицание или вопрос?" } },
          ],
          example: "Is there a pharmacy near here?",
        },
      ],
    },
    {
      id: "engines",
      title: { az: "3. Sual və inkarın üç \"mexanizmi\"", ru: "3. Три «механизма» вопроса и отрицания" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Bütün çərçivələrdə sual və inkar üç yoldan biri ilə qurulur. Bunu başa düşmək ingilis qrammatikasının yarısını açır.",
            ru: "Во всех рамках вопрос и отрицание строятся одним из трёх способов. Понять это — значит открыть половину английской грамматики.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Mexanizm", ru: "Механизм" }, { az: "Harada", ru: "Где" }, { az: "Sual", ru: "Вопрос" }, { az: "İnkar", ru: "Отрицание" }],
          rows: [
            ["be moves", "Frames 1, 2, 6; continuous", "Is there…? Is she…? Was it built…? Are you working?", "There isn't… She isn't… It wasn't built…"],
            ["modal moves", "Frame 4; will", "Can you…? Should I…? Will they…?", "I can't… You shouldn't… They won't…"],
            ["do / does / did helps", "Frame 3 simple; Frame 5", "Do you work? Did she go? Does he have…?", "I don't work. She didn't go. He doesn't have…"],
          ],
        },
        {
          kind: "tip",
          text: {
            az: "Qayda sadədir: cümlədə be və ya modal varsa, o özü önə keçir və \"not\" alır. Yoxdursa, do / does / did köməyə gəlir.",
            ru: "Правило простое: если в предложении есть be или модальный глагол, он сам выходит вперёд и принимает «not». Если нет — на помощь приходят do / does / did.",
          },
        },
      ],
    },
    {
      id: "tenses",
      title: { az: "4. Bir fikir, bütün zamanlar", ru: "4. Одна мысль во всех временах" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Çərçivə", ru: "Рамка" }, { az: "Keçmiş", ru: "Прошлое" }, { az: "İndi", ru: "Настоящее" }, { az: "Gələcək", ru: "Будущее" }],
          rows: [
            ["1", "There was a problem.", "There is a problem.", "There will be a problem."],
            ["2", "She was busy.", "She is busy.", "She will be busy."],
            ["3", "He worked.", "He works.", "He will work."],
            ["3 (continuous)", "He was working.", "He is working.", "He will be working."],
            ["4", "I could swim. I had to go.", "I can swim. I have to go.", "I will be able to swim. I will have to go."],
            ["5", "We had a car.", "We have a car.", "We will have a car."],
            ["6", "It was built.", "It is built.", "It will be built."],
          ],
        },
      ],
    },
    {
      id: "combine",
      title: { az: "5. Çərçivələri birləşdirmək", ru: "5. Как сочетать рамки" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Uzun cümlələr çox vaxt iki çərçivənin \"and\", \"but\", \"because\", \"so\" ilə birləşməsidir. Hər hissə öz qaydasına tabe olur. \"There was no bus (1), so I had to walk (4).\" \"She is tired (2) because she worked all night (3).\"",
            ru: "Длинные предложения часто соединяют две рамки через «and», «but», «because», «so». Каждая часть подчиняется своему правилу. «There was no bus (1), so I had to walk (4).» «She is tired (2) because she worked all night (3).»",
          },
        },
        {
          kind: "examples",
          items: [
            { en: "There's a new gym near my house, and it's not expensive.", az: "Evimin yaxınlığında yeni idman zalı var və baha deyil.", ru: "Рядом с моим домом открылся новый спортзал, и он недорогой." },
            { en: "I have a car, but I usually walk to work.", az: "Maşınım var, amma adətən işə piyada gedirəm.", ru: "У меня есть машина, но на работу я обычно хожу пешком." },
            { en: "The road was closed, so we had to go another way.", az: "Yol bağlanmışdı, ona görə başqa yolla getməli olduq.", ru: "Дорогу перекрыли, поэтому нам пришлось ехать другим путём." },
            { en: "She can't come because she's working late.", az: "O, gələ bilməz, çünki gec saata qədər işləyir.", ru: "Она не может прийти, потому что работает допоздна." },
          ],
        },
      ],
    },
    {
      id: "examples",
      title: { az: "6. Bir mövzu — altı çərçivə", ru: "6. Одна тема — шесть рамок" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "There are four people in my family.", az: "Ailəmizdə dörd nəfər var.", ru: "В моей семье четыре человека." },
            { en: "My father is an engineer.", az: "Atam mühəndisdir.", ru: "Мой отец инженер." },
            { en: "My mother teaches maths at a school.", az: "Anam məktəbdə riyaziyyat dərsi deyir.", ru: "Мама преподаёт математику в школе." },
            { en: "My brother can play the tar.", az: "Qardaşım tar çala bilir.", ru: "Мой брат умеет играть на таре." },
            { en: "We have a small house in the village.", az: "Kənddə kiçik evimiz var.", ru: "У нас есть небольшой дом в деревне." },
            { en: "The house was built by my grandfather.", az: "Ev babam tərəfindən tikilib.", ru: "Дом построил мой дедушка." },
            { en: "Is there a hospital in your village?", az: "Kəndinizdə xəstəxana var?", ru: "В вашей деревне есть больница?" },
            { en: "Were you happy at school?", az: "Məktəbdə xoşbəxt idin?", ru: "Ты был счастлив в школе?" },
            { en: "Did your parents speak English?", az: "Valideynlərin ingiliscə danışırdılar?", ru: "Твои родители говорили по-английски?" },
            { en: "Should we bring anything?", az: "Bir şey gətirək?", ru: "Нам что-нибудь принести?" },
            { en: "Does your flat have a balcony?", az: "Mənzilinizin eyvanı var?", ru: "В вашей квартире есть балкон?" },
            { en: "When was the museum opened?", az: "Muzey nə vaxt açılıb?", ru: "Когда открылся музей?" },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "7. Çərçivələri qarışdırmaqdan yaranan səhvlər", ru: "7. Ошибки от смешения рамок" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "I am work in a bank.", right: "I work in a bank.", why: { az: "2-ci və 3-cü çərçivələr qarışıb. Hərəkət üçün \"am\" lazım deyil.", ru: "Смешаны рамки 2 и 3. Для действия «am» не нужен." } },
            { wrong: "Have a supermarket near here?", right: "Is there a supermarket near here?", why: { az: "Yerdə mövcudluq — 1-ci çərçivə, 5-ci yox.", ru: "Наличие в месте — рамка 1, а не 5." } },
            { wrong: "Do you can drive?", right: "Can you drive?", why: { az: "Modal özü önə keçir; \"do\" lazım deyil.", ru: "Модальный глагол сам выходит вперёд; «do» не нужен." } },
            { wrong: "Does she is a teacher?", right: "Is she a teacher?", why: { az: "Be ilə \"does\" işlənmir.", ru: "С be «does» не используется." } },
            { wrong: "The bridge built in 1990.", right: "The bridge was built in 1990.", why: { az: "6-cı çərçivədə \"be\" mütləqdir.", ru: "В рамке 6 «be» обязателен." } },
            { wrong: "I don't have time and I no can come.", right: "I don't have time, so I can't come.", why: { az: "Hər hissə öz inkar mexanizmi ilə: don't have (do), can't (modal).", ru: "Каждая часть — со своим механизмом отрицания: don't have (do), can't (модальный)." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Varlıq → 1, təsvir → 2, hərəkət → 3, bacarıq/məcburiyyət/ehtimal → 4, sahiblik → 5, obyektə edilən → 6.", ru: "Наличие → 1, описание → 2, действие → 3, умение/обязанность/вероятность → 4, обладание → 5, что делают с предметом → 6." },
    { az: "Sual və inkarın üç yolu: be önə keçir, modal önə keçir, do/does/did kömək edir.", ru: "Три способа вопроса и отрицания: выходит be, выходит модальный, помогает do/does/did." },
    { az: "Zaman çərçivəni dəyişmir, yalnız köməkçi və ya feil formasını dəyişir.", ru: "Время не меняет рамку, оно меняет только вспомогательный глагол или форму глагола." },
  ],
};
