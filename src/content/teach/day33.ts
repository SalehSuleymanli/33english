import type { Teach } from "./types";

export const TEACH_33: Teach = {
  day: 33,
  summary: {
    az: "Təbrik edirik — son gündəsiniz! Bu dərs bütün kursu bir yerə toplayır: altı çərçivə, onların zamanları və birləşmələri. Yekun sınaqdan əvvəl bu xülasəni oxuyun, sonra kursdan sonra necə davam edəcəyinizi planlaşdırın.",
    ru: "Поздравляем — это последний день! Этот урок собирает весь курс воедино: шесть рамок, их времена и сочетания. Прочитайте этот обзор перед итоговым испытанием, а затем спланируйте, как продолжать после курса.",
  },
  sections: [
    {
      id: "frames",
      title: { az: "1. Altı çərçivə: son xülasə", ru: "1. Шесть рамок: итоговый обзор" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Çərçivə", ru: "Рамка" }, { az: "Formula", ru: "Формула" }, { az: "Sual / inkar", ru: "Вопрос / отрицание" }],
          rows: [
            ["1 Existence", "There + be + thing + place", "Is there…? / There isn't…"],
            ["2 States", "Subject + be + description", "Is she…? / She isn't…"],
            ["3 Actions", "Subject + verb (+ object)", "Do you…? Did he…? / I don't… He didn't…"],
            ["4 Modals", "Subject + modal + V1", "Can you…? / You shouldn't…"],
            ["5 Possession", "Subject + have/has + thing", "Do you have…? / She doesn't have…"],
            ["6 Passive", "Object + be + V3", "Was it built…? / It wasn't made…"],
          ],
        },
        {
          kind: "formula",
          label: { az: "Hər ingilis cümləsinin skeleti", ru: "Скелет любого английского предложения" },
          parts: [
            { text: "Subject", role: "subject", note: { az: "Həmişə var (lazım gəlsə: there, it).", ru: "Есть всегда (если нужно — there, it)." } },
            { text: "(helper)", role: "aux", note: { az: "Zamanı və sualı daşıyır: be, do, have, will, modal.", ru: "Несёт время и вопрос: be, do, have, will, модальный." } },
            { text: "verb", role: "verb", note: { az: "Əsas feil düzgün formada: V1, V2, V3, -ing.", ru: "Основной глагол в нужной форме: V1, V2, V3, -ing." } },
            { text: "the rest", role: "object", note: { az: "Obyekt, yer, zaman — adətən bu sırada.", ru: "Дополнение, место, время — обычно в таком порядке." } },
          ],
          example: "My sister has been living in London since 2020.",
        },
      ],
    },
    {
      id: "tenses",
      title: { az: "2. Zamanlar xəritəsi", ru: "2. Карта времён" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Növ", ru: "Вид" }, { az: "Keçmiş", ru: "Прошлое" }, { az: "İndi", ru: "Настоящее" }, { az: "Gələcək", ru: "Будущее" }],
          rows: [
            ["Simple", "I worked", "I work", "I will work"],
            ["Continuous", "I was working", "I am working", "I will be working"],
            ["Perfect", "I had worked", "I have worked", "I will have worked"],
            ["Perfect Continuous", "I had been working", "I have been working", "—"],
            ["Passive", "It was done", "It is done", "It will be done"],
          ],
        },
      ],
    },
    {
      id: "combinations",
      title: { az: "3. Ən vacib birləşmələr", ru: "3. Самые важные сочетания" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Struktur", ru: "Структура" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["questions (subject / object)", "Who called? / What did you do?"],
            ["want someone to", "I want you to stay."],
            ["it + adjective + to", "It's important to practise."],
            ["used to / be used to", "I used to live there. I'm used to it."],
            ["modal + have + V3", "I should have known."],
            ["comparatives", "better than, the best, as good as"],
            ["relative clauses", "the person who…, the place where…"],
            ["conditionals", "If it rains, I'll stay. If I were you, I'd go."],
            ["connectors", "although, despite, however, whether"],
            ["reported speech", "She said she was tired. He asked where I lived."],
          ],
        },
      ],
    },
    {
      id: "next",
      title: { az: "4. Kursdan sonra: necə davam etmək", ru: "4. После курса: как продолжать" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "33 gün ərzində möhkəm bir skelet qurdunuz. İndi sərbəstlik üçün üç şey lazımdır: hər gün ingilis dilini eşitmək və oxumaq (giriş məsləhətində danışdığımız kimi), \"Təkrar\" bölməsindəki səhvlərinizi müntəzəm təkrarlamaq və danışmaq — hətta özünüzlə də olsa. Saytdakı oyunlar, danışıq mövzuları və oxu mətnləri məhz bunun üçündür.",
            ru: "За 33 дня вы построили прочный каркас. Теперь для свободы нужны три вещи: каждый день слушать и читать по-английски (как мы говорили во вводной консультации), регулярно повторять свои ошибки в разделе «Практика» и говорить — пусть даже с самим собой. Игры, разговорные темы и тексты для чтения на сайте созданы именно для этого.",
          },
        },
        {
          kind: "tip",
          text: {
            az: "Səviyyənizi yoxlamaq üçün hər ay bir dəfə özünüzü səsə yazın: 2 dəqiqə ərzində özünüz, işiniz və planlarınız haqqında danışın. Bir neçə ay sonra fərqi özünüz eşidəcəksiniz.",
            ru: "Чтобы отслеживать прогресс, раз в месяц записывайте себя на диктофон: 2 минуты о себе, работе и планах. Через несколько месяцев вы сами услышите разницу.",
          },
        },
      ],
    },
    {
      id: "examples",
      title: { az: "5. Bütün çərçivələr bir mətndə", ru: "5. Все рамки в одном тексте" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "My name is Leyla and I'm a nurse.", az: "Adım Leyladır, tibb bacısıyam.", ru: "Меня зовут Лейла, я медсестра." },
            { en: "I have worked at the same hospital for six years.", az: "Altı ildir eyni xəstəxanada işləyirəm.", ru: "Я работаю в одной больнице шесть лет." },
            { en: "There are about forty nurses in our department.", az: "Şöbəmizdə təxminən qırx tibb bacısı var.", ru: "В нашем отделении около сорока медсестёр." },
            { en: "The hospital was opened in 2005 and it has a great team.", az: "Xəstəxana 2005-ci ildə açılıb və gözəl kollektivi var.", ru: "Больница открылась в 2005 году, и у неё отличная команда." },
            { en: "I used to be very shy, but now I'm used to talking to strangers.", az: "Əvvəllər çox utancaq idim, amma indi tanımadığım adamlarla danışmağa öyrəşmişəm.", ru: "Раньше я была очень застенчивой, а теперь привыкла разговаривать с незнакомыми людьми." },
            { en: "When I started this course, I couldn't build a simple question.", az: "Bu kursa başlayanda sadə sual qura bilmirdim.", ru: "Когда я начала этот курс, я не могла построить простой вопрос." },
            { en: "I should have started learning English years ago.", az: "İngilis dilini illər əvvəl öyrənməyə başlamalı idim.", ru: "Мне следовало начать учить английский много лет назад." },
            { en: "My dream is to work abroad, and if I keep practising, I think I'll be ready next year.", az: "Xəyalım xaricdə işləməkdir və məşq etməyə davam etsəm, məncə, gələn il hazır olacağam.", ru: "Моя мечта — работать за границей, и если я продолжу заниматься, думаю, через год буду готова." },
            { en: "Although it's not always easy, it feels great to understand English.", az: "Həmişə asan olmasa da, ingilis dilini başa düşmək gözəl hissdir.", ru: "Хотя это не всегда легко, понимать английский — прекрасное чувство." },
            { en: "My teacher told me to never stop practising.", az: "Müəllimim mənə heç vaxt məşqi dayandırmamağı dedi.", ru: "Мой учитель сказал мне никогда не прекращать практику." },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "6. Kurs boyu ən çox edilən 6 səhv", ru: "6. Шесть самых частых ошибок курса" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "She work in a bank.", right: "She works in a bank.", why: { az: "Üçüncü şəxs -s.", ru: "-s в третьем лице." } },
            { wrong: "I am agree.", right: "I agree.", why: { az: "Feillə \"am\" işlənmir.", ru: "С глаголом «am» не используется." } },
            { wrong: "Have a café near here?", right: "Is there a café near here?", why: { az: "\"Var\" = there is, have yox.", ru: "«Есть» в месте = there is, а не have." } },
            { wrong: "I live here since 2015.", right: "I have lived here since 2015.", why: { az: "Since / for → Present Perfect.", ru: "Since / for → Present Perfect." } },
            { wrong: "If it will rain, …", right: "If it rains, …", why: { az: "If hissəsində will yoxdur.", ru: "В части с if нет will." } },
            { wrong: "Where you work?", right: "Where do you work?", why: { az: "Sualda köməkçi feil.", ru: "В вопросе нужен вспомогательный глагол." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Hər cümlə: mübtəda + (köməkçi) + feil + qalan hissə.", ru: "Каждое предложение: подлежащее + (вспомогательный) + глагол + остальное." },
    { az: "Altı çərçivəni tanıyın, zamanı köməkçi ilə dəyişin.", ru: "Узнавайте шесть рамок, меняйте время через вспомогательный глагол." },
    { az: "Davam edin: hər gün eşidin, oxuyun, təkrarlayın, danışın.", ru: "Продолжайте: каждый день слушайте, читайте, повторяйте, говорите." },
  ],
};
