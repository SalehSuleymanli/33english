import type { Teach } from "./types";

export const TEACH_20: Teach = {
  day: 20,
  summary: {
    az: "Bu dərsdə məchul növü (6-cı çərçivə) mürəkkəb zamanlarla birləşdirirsiniz: has been done, is being done, had been done, will have been done və modal + be + V3. İş yazışmalarında, hesabatlarda və xəbərlərdə ən çox rast gəlinən formalardır.",
    ru: "В этом уроке вы соединяете пассив (рамка 6) со сложными временами: has been done, is being done, had been done, will have been done и модальный + be + V3. Эти формы чаще всего встречаются в деловой переписке, отчётах и новостях.",
  },
  sections: [
    {
      id: "logic",
      title: { az: "1. Məntiq: \"be\" zamanı daşıyır, V3 sabit qalır", ru: "1. Логика: «be» несёт время, V3 не меняется" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "11-ci gündə öyrəndiniz: passive = be + V3. İndi \"be\"-ni istənilən mürəkkəb zamana qoyuruq. Qayda belədir: active cümlədəki zamanı tapın, həmin zamanda \"be\" feilini qurun və arxasına V3 əlavə edin. Perfect-də \"be\" → been, continuous-da \"be\" → being olur.",
            ru: "На 11-й день вы узнали: пассив = be + V3. Теперь ставим «be» в любое сложное время. Правило: найдите время в активном предложении, постройте в этом времени глагол «be» и добавьте V3. В Perfect «be» → been, в Continuous «be» → being.",
          },
        },
        {
          kind: "formula",
          label: { az: "Present Perfect Passive", ru: "Present Perfect Passive" },
          parts: [
            { text: "The report", role: "subject", note: { az: "Obyekt mübtəda olur.", ru: "Объект становится подлежащим." } },
            { text: "has been", role: "be", note: { az: "have/has + been = Perfect-də \"be\".", ru: "have/has + been = «be» в Perfect." } },
            { text: "sent", role: "verb", note: { az: "V3.", ru: "V3." } },
            { text: "to the client", role: "object", note: { az: "Kimə / hara.", ru: "Кому / куда." } },
          ],
          example: "The report has been sent to the client.",
        },
      ],
    },
    {
      id: "table",
      title: { az: "2. Bütün passive zamanlar", ru: "2. Все времена пассива" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Zaman", ru: "Время" }, { az: "Active", ru: "Active" }, { az: "Passive", ru: "Passive" }],
          rows: [
            ["Present Simple", "They clean the room.", "The room is cleaned."],
            ["Present Continuous", "They are cleaning the room.", "The room is being cleaned."],
            ["Past Simple", "They cleaned the room.", "The room was cleaned."],
            ["Past Continuous", "They were cleaning the room.", "The room was being cleaned."],
            ["Present Perfect", "They have cleaned the room.", "The room has been cleaned."],
            ["Past Perfect", "They had cleaned the room.", "The room had been cleaned."],
            ["Future Simple", "They will clean the room.", "The room will be cleaned."],
            ["going to", "They are going to clean the room.", "The room is going to be cleaned."],
            ["Future Perfect", "They will have cleaned the room by 5.", "The room will have been cleaned by 5."],
            ["Modal", "They must clean the room.", "The room must be cleaned."],
            ["Modal + have", "They should have cleaned the room.", "The room should have been cleaned."],
          ],
        },
      ],
    },
    {
      id: "perfect",
      title: { az: "3. Perfect Passive: has / have / had been + V3", ru: "3. Perfect Passive: has / have / had been + V3" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Present Perfect Passive iş həyatında ən çox işlənən formadır, çünki görülən işin nəticəsini bildirir, kimin gördüyünü vurğulamadan: \"Your order has been shipped\" (sifarişiniz göndərilib), \"The meeting has been cancelled\" (iclas ləğv edilib), \"Mistakes have been made\" (səhvlər buraxılıb). Past Perfect Passive (had been done) keçmişdə başqa hadisədən əvvəl tamamlanmış işi bildirir: \"When I arrived, the food had already been eaten.\"",
            ru: "Present Perfect Passive — самая частая форма в деловой жизни: она сообщает результат работы, не подчёркивая, кто её сделал: «Your order has been shipped» (ваш заказ отправлен), «The meeting has been cancelled» (совещание отменено), «Mistakes have been made» (были допущены ошибки). Past Perfect Passive (had been done) — работа, завершённая до другого события в прошлом: «When I arrived, the food had already been eaten.»",
          },
        },
      ],
    },
    {
      id: "continuous",
      title: { az: "4. Continuous Passive: being + V3", ru: "4. Continuous Passive: being + V3" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Bir şey üzərində proses gedirsə və icraçı vacib deyilsə: \"The road is being repaired\" (yol təmir olunur), \"My car was being serviced when you called\" (zəng edəndə maşınıma servis göstərilirdi). Perfect Continuous passive (has been being done) çox ağır səsləndiyi üçün demək olar ki, işlənmir.",
            ru: "Если с предметом идёт процесс, а исполнитель неважен: «The road is being repaired» (дорогу ремонтируют), «My car was being serviced when you called» (когда ты позвонил, мою машину обслуживали). Perfect Continuous в пассиве (has been being done) звучит тяжело и почти не используется.",
          },
        },
      ],
    },
    {
      id: "modal",
      title: { az: "5. Modal Passive", ru: "5. Пассив с модальными" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["modal + be + V3 (present/future)", "This form must be signed. The problem can be solved. Phones should be switched off."],
            ["modal + have been + V3 (past)", "The letter should have been sent yesterday. It must have been stolen. He might have been told."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Qaydalar, təlimatlar və elanlar çox vaxt modal passive ilə yazılır: \"Seat belts must be worn\", \"Tickets can be bought online\". \"Should have been + V3\" isə görülməli olan, amma görülməyən işi bildirir: \"This should have been done last week\" — bu, keçən həftə edilməli idi.",
            ru: "Правила, инструкции и объявления часто пишутся в модальном пассиве: «Seat belts must be worn», «Tickets can be bought online». «Should have been + V3» — работа, которую следовало сделать, но не сделали: «This should have been done last week» — это нужно было сделать на прошлой неделе.",
          },
        },
      ],
    },
    {
      id: "examples",
      title: { az: "6. Nümunələr və tərcümələr", ru: "6. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "Your application has been received.", az: "Müraciətiniz qəbul edilib.", ru: "Ваша заявка получена." },
            { en: "The flight has been delayed by two hours.", az: "Uçuş iki saat gecikdirilib.", ru: "Рейс задержан на два часа." },
            { en: "New rules have been introduced.", az: "Yeni qaydalar tətbiq edilib.", ru: "Введены новые правила." },
            { en: "The building is being renovated.", az: "Bina təmir olunur.", ru: "Здание ремонтируется." },
            { en: "I felt I was being watched.", az: "Kiminsə məni izlədiyini hiss edirdim.", ru: "Я чувствовал, что за мной наблюдают." },
            { en: "By the time we arrived, all the tickets had been sold.", az: "Biz çatanda bütün biletlər satılmışdı.", ru: "Когда мы приехали, все билеты уже были проданы." },
            { en: "The work will have been finished by Friday.", az: "İş cüməyə qədər bitirilmiş olacaq.", ru: "К пятнице работа будет завершена." },
            { en: "This medicine must be kept in the fridge.", az: "Bu dərman soyuducuda saxlanılmalıdır.", ru: "Это лекарство нужно хранить в холодильнике." },
            { en: "The problem can't be fixed today.", az: "Problemi bu gün həll etmək olmaz.", ru: "Проблему сегодня не решить." },
            { en: "He should have been told earlier.", az: "Ona əvvəlcədən deyilməli idi.", ru: "Ему следовало сказать раньше." },
            { en: "Has the invoice been paid yet?", az: "Hesab-faktura artıq ödənilib?", ru: "Счёт уже оплачен?" },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "7. Tipik səhvlər", ru: "7. Типичные ошибки" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "The report has sent.", right: "The report has been sent.", why: { az: "Hesabat özü göndərmir; passive üçün been lazımdır.", ru: "Отчёт сам ничего не отправляет; для пассива нужен been." } },
            { wrong: "The road is repairing.", right: "The road is being repaired.", why: { az: "Prosesdə olan passive: being + V3.", ru: "Пассив в процессе: being + V3." } },
            { wrong: "The form must signed.", right: "The form must be signed.", why: { az: "Modal passive: modal + be + V3.", ru: "Модальный пассив: модальный + be + V3." } },
            { wrong: "It should have done yesterday.", right: "It should have been done yesterday.", why: { az: "Keçmiş modal passive: should have been + V3.", ru: "Модальный пассив в прошлом: should have been + V3." } },
            { wrong: "The house has been build.", right: "The house has been built.", why: { az: "Build-in V3 forması built.", ru: "V3 от build — built." } },
            { wrong: "The results will announce tomorrow.", right: "The results will be announced tomorrow.", why: { az: "Gələcək passive: will be + V3.", ru: "Пассив в будущем: will be + V3." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Passive-də V3 dəyişmir; zamanı \"be\" göstərir.", ru: "В пассиве V3 не меняется; время показывает «be»." },
    { az: "Perfect: has/have/had been + V3. Continuous: is/was being + V3.", ru: "Perfect: has/have/had been + V3. Continuous: is/was being + V3." },
    { az: "Modal: must/can/should be + V3; keçmişdə should/must have been + V3.", ru: "Модальный: must/can/should be + V3; в прошлом should/must have been + V3." },
    { az: "İşdə ən çox: has been sent / done / cancelled / approved.", ru: "Чаще всего на работе: has been sent / done / cancelled / approved." },
  ],
};
