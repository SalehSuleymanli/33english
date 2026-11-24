import type { Teach } from "./types";

export const TEACH_14: Teach = {
  day: 14,
  summary: {
    az: "Bu dərsdə kiminsə nəsə etməsini istəmək, xahiş etmək və tapşırmaq üçün güclü bir modeli öyrənirsiniz: Subject + verb + person + to + verb. \"I want you to come\" — gəlməyini istəyirəm. Azərbaycan və rus dillərindən fərqli qurulduğu üçün ən çox səhv edilən strukturlardan biridir.",
    ru: "В этом уроке вы изучите мощную модель, чтобы хотеть, просить и поручать, чтобы кто-то что-то сделал: Subject + verb + person + to + verb. «I want you to come» — я хочу, чтобы ты пришёл. Строится иначе, чем в русском, поэтому в ней очень часто ошибаются.",
  },
  sections: [
    {
      id: "formula",
      title: { az: "1. Formula", ru: "1. Формула" },
      blocks: [
        {
          kind: "formula",
          label: { az: "Feil + şəxs + to + feil", ru: "Глагол + человек + to + глагол" },
          parts: [
            { text: "I", role: "subject", note: { az: "İstəyən, xahiş edən.", ru: "Тот, кто хочет или просит." } },
            { text: "want", role: "verb", note: { az: "İstək, xahiş və ya əmr feili.", ru: "Глагол желания, просьбы или приказа." } },
            { text: "you", role: "object", note: { az: "Hərəkəti edəcək şəxs. Obyekt forması: me, you, him, her, us, them.", ru: "Тот, кто выполнит действие. Объектная форма: me, you, him, her, us, them." } },
            { text: "to come", role: "verb", note: { az: "to + feilin sadə forması.", ru: "to + начальная форма глагола." } },
          ],
          example: "I want you to come.",
        },
        {
          kind: "p",
          text: {
            az: "Azərbaycan dilində bunu budaq cümlə ilə deyirik: \"Gəlməyini istəyirəm\" və ya \"İstəyirəm ki, gələsən\". Rus dilində: «Я хочу, чтобы ты пришёл». İngilis dilində isə \"that\" və ya ikinci mübtəda yoxdur: sadəcə şəxs (obyekt formasında) + to + feil. \"I want that you come\" səhvdir.",
            ru: "По-русски мы говорим придаточным предложением: «Я хочу, чтобы ты пришёл». В английском нет ни «чтобы», ни второго подлежащего: просто человек (в объектной форме) + to + глагол. «I want that you come» — ошибка.",
          },
        },
        {
          kind: "table",
          head: [{ az: "Mübtəda", ru: "Подлежащее" }, { az: "Obyekt", ru: "Объект" }],
          rows: [["I", "me"], ["you", "you"], ["he", "him"], ["she", "her"], ["it", "it"], ["we", "us"], ["they", "them"]],
        },
      ],
    },
    {
      id: "verbs",
      title: { az: "2. Bu modellə işlənən feillər", ru: "2. Глаголы, которые используются в этой модели" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Feil", ru: "Глагол" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["want", "istəmək / хотеть", "She wants me to help her."],
            ["would like ('d like)", "istərdim (nəzakətli) / хотел бы", "I'd like you to meet my wife."],
            ["ask", "xahiş etmək / просить", "He asked us to wait."],
            ["tell", "tapşırmaq, demək / велеть, сказать", "The doctor told me to rest."],
            ["need", "ehtiyac / нужно, чтобы", "I need you to sign this."],
            ["expect", "gözləmək / ожидать", "They expect us to finish today."],
            ["help", "kömək etmək / помогать", "Can you help me (to) carry this?"],
            ["advise / remind / invite / allow", "məsləhət görmək / xatırlatmaq / dəvət etmək / icazə vermək", "Remind me to call Mum."],
          ],
        },
        {
          kind: "compare",
          items: [
            { en: "Let me go. / Make him stop.", text: { az: "\"Let\" və \"make\" fərqlidir: onlardan sonra \"to\" işlənmir. Let = icazə vermək, make = məcbur etmək.", ru: "«Let» и «make» — особые: после них «to» не ставится. Let = разрешить, make = заставить." } },
          ],
        },
      ],
    },
    {
      id: "forms",
      title: { az: "3. İnkar, sual və zamanlar", ru: "3. Отрицание, вопрос и времена" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "I want you to stay."],
            ["− (main verb)", "I don't want you to go."],
            ["− (second verb)", "She told me not to worry. He asked us not to be late."],
            ["?", "Do you want me to drive? What do you want me to do?"],
            ["past", "They asked me to speak at the meeting."],
            ["future", "I'll ask him to call you."],
            ["polite offer", "Would you like me to help?"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "İki cür inkar var və mənaları fərqlidir. \"I don't want you to go\" — getməyini istəmirəm (inkar istəkdədir). \"She told me not to worry\" — mənə narahat olmamağı dedi (inkar ikinci hərəkətdədir, \"not\" \"to\"-dan əvvəl gəlir). Xüsusilə tell və ask ilə ikinci forma çox işlənir.",
            ru: "Есть два вида отрицания с разным смыслом. «I don't want you to go» — я не хочу, чтобы ты уходил (отрицание при желании). «She told me not to worry» — она сказала мне не волноваться (отрицание при втором действии, «not» ставится перед «to»). Особенно с tell и ask часто нужна вторая форма.",
          },
        },
      ],
    },
    {
      id: "requests",
      title: { az: "4. Real həyatda: xahiş və təkliflər", ru: "4. В жизни: просьбы и предложения" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Would you like me to…?\" — kömək təklif etməyin ən nəzakətli yoludur: \"Would you like me to open the window?\" (Pəncərəni açım?). \"Do you want me to…?\" eyni mənada, amma daha sadə. İşdə tapşırıq verərkən \"I need you to…\" birbaşa, amma normal səslənir; daha yumşaq variant \"Could you…?\" və ya \"I'd like you to…\".",
            ru: "«Would you like me to…?» — самый вежливый способ предложить помощь: «Would you like me to open the window?» (Открыть окно?). «Do you want me to…?» — то же, но проще. На работе «I need you to…» звучит прямо, но нормально; мягче — «Could you…?» или «I'd like you to…».",
          },
        },
      ],
    },
    {
      id: "compare",
      title: { az: "5. Müqayisə: want to və want someone to", ru: "5. Сравнение: want to и want someone to" },
      blocks: [
        {
          kind: "compare",
          items: [
            { en: "I want to go. / I want you to go.", text: { az: "Birincidə özüm getmək istəyirəm. İkincidə sənin getməyini istəyirəm. Fərq yalnız aradakı şəxsdədir.", ru: "В первом я сам хочу пойти. Во втором — хочу, чтобы пошёл ты. Разница только в человеке посередине." } },
            { en: "He said to me… / He told me to…", text: { az: "Tapşırığı çatdırarkən \"tell + şəxs + to\" işlənir: \"He told me to wait\". \"He said me to wait\" səhvdir (say-dən sonra şəxs gəlmir).", ru: "Передавая поручение, используют «tell + человек + to»: «He told me to wait». «He said me to wait» — ошибка (после say человек не ставится)." } },
          ],
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
            { en: "My parents want me to become a doctor.", az: "Valideynlərim həkim olmağımı istəyirlər.", ru: "Родители хотят, чтобы я стал врачом." },
            { en: "I'd like you to meet my colleague, Nigar.", az: "Sizi həmkarım Nigarla tanış etmək istərdim.", ru: "Хочу познакомить вас с моей коллегой Нигяр." },
            { en: "Can you ask him to call me back?", az: "Ondan mənə geri zəng etməsini xahiş edə bilərsən?", ru: "Можешь попросить его мне перезвонить?" },
            { en: "The teacher told us to open our books.", az: "Müəllim kitablarımızı açmağı dedi.", ru: "Учитель велел нам открыть книги." },
            { en: "She asked me not to tell anyone.", az: "Heç kimə deməməyimi xahiş etdi.", ru: "Она попросила меня никому не говорить." },
            { en: "Do you want me to pick you up?", az: "Səni maşınla götürüm?", ru: "Тебя забрать на машине?" },
            { en: "Would you like me to send you the details?", az: "Təfərrüatları sizə göndərim?", ru: "Прислать вам подробности?" },
            { en: "I need you to check these numbers.", az: "Bu rəqəmləri yoxlamağın lazımdır.", ru: "Мне нужно, чтобы ты проверил эти цифры." },
            { en: "Remind me to buy bread.", az: "Çörək almağı mənə xatırlat.", ru: "Напомни мне купить хлеб." },
            { en: "They invited us to stay for dinner.", az: "Bizi şam yeməyinə qalmağa dəvət etdilər.", ru: "Они пригласили нас остаться на ужин." },
            { en: "My boss doesn't allow us to work from home.", az: "Rəhbərim evdən işləməyimizə icazə vermir.", ru: "Начальник не разрешает нам работать из дома." },
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
            { wrong: "I want that you come.", right: "I want you to come.", why: { az: "\"That\" + ikinci mübtəda işlənmir; şəxs + to + feil.", ru: "«That» + второе подлежащее не используется; человек + to + глагол." } },
            { wrong: "She wants I help her.", right: "She wants me to help her.", why: { az: "Şəxs obyekt formasında (me) və \"to\" mütləqdir.", ru: "Человек в объектной форме (me), и «to» обязательно." } },
            { wrong: "He told me wait.", right: "He told me to wait.", why: { az: "Tell-dən sonra to + feil.", ru: "После tell — to + глагол." } },
            { wrong: "He said me to wait.", right: "He told me to wait.", why: { az: "Say-dən sonra şəxs gəlmir; tapşırıq üçün tell.", ru: "После say не ставится человек; для поручения — tell." } },
            { wrong: "She asked me to not be late.", right: "She asked me not to be late.", why: { az: "\"Not\" \"to\"-dan əvvəl gəlir.", ru: "«Not» ставится перед «to»." } },
            { wrong: "Let me to explain.", right: "Let me explain.", why: { az: "Let-dən sonra \"to\" işlənmir.", ru: "После let «to» не ставится." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Formula: want / ask / tell / need + şəxs (me, him, us…) + to + feil.", ru: "Формула: want / ask / tell / need + человек (me, him, us…) + to + глагол." },
    { az: "\"That\" və ikinci mübtəda yoxdur: I want you to come.", ru: "Нет «that» и второго подлежащего: I want you to come." },
    { az: "İkinci hərəkəti inkar etmək: not + to: She told me not to worry.", ru: "Отрицание второго действия: not + to: She told me not to worry." },
    { az: "Let və make-dən sonra to yoxdur. Kömək təklifi: Would you like me to…?", ru: "После let и make нет to. Предложить помощь: Would you like me to…?" },
  ],
};
