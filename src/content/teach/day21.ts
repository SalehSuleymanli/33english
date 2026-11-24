import type { Teach } from "./types";

export const TEACH_21: Teach = {
  day: 21,
  summary: {
    az: "Bu, birləşmə mərhələsinin yoxlama günüdür. 13–20-ci günlərdə öyrəndiyiniz bütün strukturları — suallar, want someone to, Perfect zamanlar, going to, it + sifət + to, used to, modal + have + V3 və mürəkkəb passive — bir sistemdə birləşdiririk və cümlələri bir formadan digərinə çevirməyi məşq edirik.",
    ru: "Это контрольный день этапа «Сочетание». Мы объединяем в одну систему всё, что изучили в дни 13–20: вопросы, want someone to, времена Perfect, going to, it + прилагательное + to, used to, модальный + have + V3 и сложный пассив, — и тренируемся переводить предложения из одной формы в другую.",
  },
  sections: [
    {
      id: "overview",
      title: { az: "1. Mərhələnin xülasəsi", ru: "1. Обзор этапа" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Gün", ru: "День" }, { az: "Struktur", ru: "Структура" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["13", "Wh- questions: object vs subject", "What did you buy? / Who bought it?"],
            ["14", "verb + person + to + verb", "I want you to call him."],
            ["15", "Present Perfect", "Have you ever been to Shusha?"],
            ["16", "Perfect Continuous; going to", "I've been waiting for an hour. I'm going to complain."],
            ["17", "it + adjective + to; enough / too; how to", "It's hard to decide. It's too late to go."],
            ["18", "used to / be used to / get used to", "I used to live here. I'm used to the noise."],
            ["19", "modal + have + V3", "You should have told me. He must have left."],
            ["20", "complex passive", "It has been done. It should have been done."],
          ],
        },
      ],
    },
    {
      id: "transform",
      title: { az: "2. Çevirmə: bir fikir — müxtəlif formalar", ru: "2. Трансформации: одна мысль — разные формы" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Bu mərhələnin əsas bacarığı eyni fikri müxtəlif strukturlarla deməkdir. Bu, həm danışıqda çevikliyi, həm də imtahanlarda \"sentence transformation\" tapşırıqlarını həll etməyi öyrədir.",
            ru: "Главный навык этого этапа — сказать одну мысль разными структурами. Это развивает гибкость речи и помогает в экзаменационных заданиях «sentence transformation».",
          },
        },
        {
          kind: "table",
          head: [{ az: "Başlanğıc", ru: "Исходное" }, { az: "Çevrilmiş", ru: "Преобразованное" }],
          rows: [
            ["I started working here in 2020.", "I have worked here since 2020."],
            ["She said, 'Please wait.'", "She asked me to wait."],
            ["Someone has stolen my bike.", "My bike has been stolen."],
            ["I smoked before, but I don't now.", "I used to smoke."],
            ["It was a mistake not to call you.", "I should have called you."],
            ["Learning Chinese is difficult.", "It's difficult to learn Chinese."],
            ["I'm sure he forgot.", "He must have forgotten."],
            ["They are building a new bridge.", "A new bridge is being built."],
            ["The room is very small. Ten people can't fit.", "The room isn't big enough for ten people."],
          ],
        },
      ],
    },
    {
      id: "aux",
      title: { az: "3. Köməkçi feillərin xəritəsi", ru: "3. Карта вспомогательных глаголов" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Hər zamanın \"motoru\"", ru: "«Двигатель» каждого времени" },
          parts: [
            { text: "do/does/did", role: "aux", note: { az: "Simple zamanların sual və inkarı.", ru: "Вопрос и отрицание в простых временах." } },
            { text: "be + -ing", role: "be", note: { az: "Continuous.", ru: "Continuous." } },
            { text: "have + V3", role: "aux", note: { az: "Perfect.", ru: "Perfect." } },
            { text: "be + V3", role: "be", note: { az: "Passive.", ru: "Passive." } },
            { text: "modal + V1", role: "modal", note: { az: "Modal; keçmiş üçün modal + have + V3.", ru: "Модальный; для прошлого — модальный + have + V3." } },
          ],
          example: "It has been being… → It has been built. (simple is better)",
        },
        {
          kind: "tip",
          text: {
            az: "Sual qurarkən həmişə BİRİNCİ köməkçi feil önə keçir: \"She has been working\" → \"Has she been working?\"; \"It should have been done\" → \"Should it have been done?\" İnkarda \"not\" birinci köməkçidən sonra gəlir: \"She hasn't been working.\"",
            ru: "В вопросе вперёд всегда выходит ПЕРВЫЙ вспомогательный глагол: «She has been working» → «Has she been working?»; «It should have been done» → «Should it have been done?» В отрицании «not» ставится после первого вспомогательного: «She hasn't been working.»",
          },
        },
      ],
    },
    {
      id: "choose",
      title: { az: "4. Hansı zaman? Qərar sualları", ru: "4. Какое время? Вопросы для выбора" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Sual", ru: "Вопрос" }, { az: "Cavab", ru: "Ответ" }],
          rows: [
            ["Is there an exact past time (yesterday, in 2019)?", "Past Simple"],
            ["Does it connect past and now (ever, already, for, since)?", "Present Perfect"],
            ["Is the focus on how long an activity has continued?", "Present Perfect Continuous"],
            ["Is it a plan decided before?", "going to / Present Continuous"],
            ["Was it a habit in the past, not now?", "used to"],
            ["Is it about what happened to the object, not who did it?", "Passive"],
            ["Is it regret or deduction about the past?", "modal + have + V3"],
          ],
        },
      ],
    },
    {
      id: "examples",
      title: { az: "5. Qarışıq nümunələr", ru: "5. Смешанные примеры" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "Who has taken my charger?", az: "Kim mənim adapterimi götürüb?", ru: "Кто взял мою зарядку?" },
            { en: "What have you been doing all day?", az: "Bütün günü nə edirdin?", ru: "Что ты делал весь день?" },
            { en: "My boss wants me to finish this by Friday.", az: "Rəhbərim bunu cüməyə qədər bitirməyimi istəyir.", ru: "Начальник хочет, чтобы я закончил это к пятнице." },
            { en: "It's not easy to get used to a new country.", az: "Yeni ölkəyə öyrəşmək asan deyil.", ru: "Привыкнуть к новой стране нелегко." },
            { en: "I used to think English was impossible.", az: "Əvvəllər ingilis dilinin mümkünsüz olduğunu düşünürdüm.", ru: "Раньше я думал, что английский — это невозможно." },
            { en: "The keys must have been left in the office.", az: "Açarlar yəqin ofisdə qalıb.", ru: "Ключи, наверное, остались в офисе." },
            { en: "We're going to be told the results tomorrow.", az: "Nəticələri bizə sabah deyəcəklər.", ru: "Результаты нам сообщат завтра." },
            { en: "Have you been asked to give a speech?", az: "Səndən çıxış etməyi xahiş ediblər?", ru: "Тебя попросили выступить с речью?" },
            { en: "I've never been able to understand him.", az: "Onu heç vaxt başa düşə bilməmişəm.", ru: "Я никогда не мог его понять." },
            { en: "You shouldn't have been worried. Everything is fine.", az: "Narahat olmamalı idin. Hər şey qaydasındadır.", ru: "Зря ты волновался. Всё в порядке." },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "6. Bu mərhələdə ən çox edilən səhvlər", ru: "6. Самые частые ошибки этапа" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "I am here since Monday.", right: "I have been here since Monday.", why: { az: "Since → Present Perfect.", ru: "Since → Present Perfect." } },
            { wrong: "He told me that I wait.", right: "He told me to wait.", why: { az: "Tell + şəxs + to + feil.", ru: "Tell + человек + to + глагол." } },
            { wrong: "Who did break the window?", right: "Who broke the window?", why: { az: "Mübtəda sualında köməkçi yoxdur.", ru: "В вопросе к подлежащему вспомогательного нет." } },
            { wrong: "I'm used to wake up early.", right: "I'm used to waking up early.", why: { az: "Be used to + -ing.", ru: "Be used to + -ing." } },
            { wrong: "You should told me.", right: "You should have told me.", why: { az: "Modal + have + V3.", ru: "Модальный + have + V3." } },
            { wrong: "The email has sent.", right: "The email has been sent.", why: { az: "Passive Perfect: has been + V3.", ru: "Пассив Perfect: has been + V3." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Birinci köməkçi feil sualda önə keçir və inkarda \"not\" alır.", ru: "Первый вспомогательный выходит вперёд в вопросе и принимает «not» в отрицании." },
    { az: "Dəqiq keçmiş vaxt → Past Simple; keçmiş + indi → Present Perfect.", ru: "Точное время в прошлом → Past Simple; прошлое + настоящее → Present Perfect." },
    { az: "Eyni fikri müxtəlif strukturlarla deyə bilmək — sərbəst danışığın açarıdır.", ru: "Умение сказать одно и то же разными структурами — ключ к свободной речи." },
  ],
};
