import type { Teach } from "./types";

export const TEACH_22: Teach = {
  day: 22,
  summary: {
    az: "Bu dərsdə şərt cümlələrini öyrənirsiniz: real şərt (If it rains, I'll stay home), xəyali şərt (If I had money, I would travel), keçmişə aid şərt (If I had known, I would have come), həmçinin unless və \"If I were you\" ilə məsləhət. Bu strukturlar plan, ehtimal və xəyali vəziyyətlər haqqında danışmaq üçün vacibdir. Sabah (23-cü gün) eyni xəyali formanı \"What if…?\" və \"My dream is to…\" ilə işlədəcəksiniz.",
    ru: "В этом уроке вы изучаете условные предложения: реальное условие (If it rains, I'll stay home), воображаемое (If I had money, I would travel), условие о прошлом (If I had known, I would have come), а также unless и совет «If I were you». Они нужны, чтобы говорить о планах, возможностях и воображаемых ситуациях. Завтра (23-й день) та же воображаемая форма понадобится для «What if…?» и «My dream is to…».",
  },
  sections: [
    {
      id: "overview",
      title: { az: "1. Şərt cümlələrinin növləri", ru: "1. Типы условных предложений" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Növ", ru: "Тип" }, { az: "If hissəsi", ru: "Часть с if" }, { az: "Nəticə hissəsi", ru: "Часть-результат" }, { az: "Məna", ru: "Значение" }],
          rows: [
            ["Zero", "Present Simple", "Present Simple", "always true: If you heat ice, it melts."],
            ["First (real)", "Present Simple", "will + V1", "possible future: If it rains, I'll stay home."],
            ["Second (unreal)", "Past Simple", "would + V1", "imaginary now/future: If I had time, I'd learn Chinese."],
            ["Third (past)", "had + V3", "would have + V3", "imaginary past: If I had known, I would have helped."],
          ],
        },
      ],
    },
    {
      id: "first",
      title: { az: "2. Birinci şərt: real gələcək", ru: "2. Первый тип: реальное будущее" },
      blocks: [
        {
          kind: "formula",
          label: { az: "If + Present Simple, will + V1", ru: "If + Present Simple, will + V1" },
          parts: [
            { text: "If", role: "connector", note: { az: "Şərt sözü.", ru: "Союз условия." } },
            { text: "you hurry", role: "verb", note: { az: "Present Simple — gələcək mənasında olsa belə!", ru: "Present Simple — даже если речь о будущем!" } },
            { text: "you'll catch", role: "modal", note: { az: "Nəticə: will + V1 (və ya can, may, might, imperative).", ru: "Результат: will + V1 (или can, may, might, повелительное)." } },
            { text: "the bus", role: "object", note: { az: "Tamamlıq.", ru: "Дополнение." } },
          ],
          example: "If you hurry, you'll catch the bus.",
        },
        {
          kind: "p",
          text: {
            az: "Ən vacib qayda: \"if\" hissəsində \"will\" işlənmir, hətta söhbət gələcəkdən gedirsə belə. Azərbaycan dilində \"Yağış yağsa, evdə qalacağam\", rus dilində «Если пойдёт дождь» deyirik — rus dilində \"if\" hissəsində gələcək zaman var, ona görə ruslar \"If it will rain\" deyə səhv edirlər. Doğrusu: \"If it rains, I'll stay home.\" Eyni qayda when, as soon as, before, after, until üçün də keçərlidir: \"I'll call you when I arrive.\"",
            ru: "Главное правило: в части с «if» «will» не используется, даже если речь о будущем. По-русски мы говорим «Если пойдёт дождь» — с будущим временем, поэтому русскоговорящие часто ошибаются: «If it will rain». Правильно: «If it rains, I'll stay home.» То же правило для when, as soon as, before, after, until: «I'll call you when I arrive.»",
          },
        },
        {
          kind: "p",
          text: {
            az: "Hissələrin sırası dəyişə bilər: \"I'll stay home if it rains.\" \"If\" əvvəldə olanda hissələr vergüllə ayrılır, sonda olanda vergül lazım deyil. \"Unless\" = \"if … not\": \"You'll be late unless you leave now\" (indi çıxmasan, gecikəcəksən).",
            ru: "Части можно менять местами: «I'll stay home if it rains.» Когда «if» в начале, части разделяются запятой; когда в конце — запятая не нужна. «Unless» = «if … not»: «You'll be late unless you leave now» (если не выйдешь сейчас, опоздаешь).",
          },
        },
      ],
    },
    {
      id: "second",
      title: { az: "3. İkinci şərt: xəyali vəziyyət", ru: "3. Второй тип: воображаемая ситуация" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "İkinci şərt indi və ya gələcəkdə real olmayan, xəyali vəziyyət üçündür: \"If I had a lot of money, I would buy a house by the sea\" — çoxlu pulum olsaydı, dəniz kənarında ev alardım (amma yoxdur). Burada \"had\" keçmiş zaman deyil, real olmamağın işarəsidir. Azərbaycan dilində \"-sa idi, -ardı\", rus dilində «если бы …, то бы» qarşılığıdır.",
            ru: "Второй тип — для нереальной, воображаемой ситуации сейчас или в будущем: «If I had a lot of money, I would buy a house by the sea» — если бы у меня было много денег, я бы купил дом у моря (но их нет). Здесь «had» — не прошедшее время, а знак нереальности. Русский аналог — «если бы …, то бы».",
          },
        },
        {
          kind: "formula",
          label: { az: "If + Past Simple, would + V1", ru: "If + Past Simple, would + V1" },
          parts: [
            { text: "If", role: "connector", note: { az: "Şərt.", ru: "Условие." } },
            { text: "I were you", role: "verb", note: { az: "Past Simple; \"be\" bütün şəxslərdə were ola bilər.", ru: "Past Simple; у «be» для всех лиц может быть were." } },
            { text: "I would accept", role: "modal", note: { az: "would ('d) + V1; həmçinin could, might.", ru: "would ('d) + V1; также could, might." } },
            { text: "the offer", role: "object", note: { az: "Tamamlıq.", ru: "Дополнение." } },
          ],
          example: "If I were you, I would accept the offer.",
        },
        {
          kind: "tip",
          text: {
            az: "\"If I were you, I would…\" — ingilis dilində məsləhət verməyin ən klassik yoludur: \"Sənin yerində olsaydım…\"",
            ru: "«If I were you, I would…» — классический способ дать совет по-английски: «На твоём месте я бы…»",
          },
        },
      ],
    },
    {
      id: "third",
      title: { az: "4. Üçüncü şərt: keçmiş haqqında xəyal və peşmanlıq", ru: "4. Третий тип: воображаемое прошлое и сожаление" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Üçüncü şərt keçmişdə baş verməmiş şeyi təsəvvür edir: \"If I had left earlier, I wouldn't have missed the train\" — daha tez çıxsaydım, qatara gecikməzdim (amma tez çıxmadım və gecikdim). Peşmanlıq və tənqid üçün işlənir. Bunu indi tanımaq kifayətdir — 29-cu gündə \"should have\" ilə daha ətraflı işləyəcəksiniz.",
            ru: "Третий тип представляет то, чего не было в прошлом: «If I had left earlier, I wouldn't have missed the train» — если бы я вышел раньше, я бы не опоздал на поезд (но не вышел и опоздал). Используется для сожаления и упрёка. Сейчас его достаточно узнавать — подробнее вы поработаете с ним в 29-й день вместе с «should have».",
          },
        },
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["+", "If you had told me, I would have helped."],
            ["−", "If it hadn't rained, we would have gone to the beach."],
            ["?", "What would you have done if you had lost the job?"],
          ],
        },
      ],
    },
    {
      id: "examples",
      title: { az: "5. Nümunələr və tərcümələr", ru: "5. Примеры с переводом" },
      blocks: [
        {
          kind: "examples",
          items: [
            { en: "If you mix red and white, you get pink.", az: "Qırmızı ilə ağı qarışdırsan, çəhrayı alınır.", ru: "Если смешать красный и белый, получится розовый." },
            { en: "If I finish early, I'll call you.", az: "Tez qurtarsam, sənə zəng edəcəyəm.", ru: "Если закончу рано, позвоню тебе." },
            { en: "We won't go if the weather is bad.", az: "Hava pis olsa, getməyəcəyik.", ru: "Мы не поедем, если будет плохая погода." },
            { en: "I'll tell her as soon as she arrives.", az: "Gələn kimi ona deyəcəyəm.", ru: "Я скажу ей, как только она придёт." },
            { en: "If I lived near the sea, I would swim every day.", az: "Dəniz kənarında yaşasaydım, hər gün üzərdim.", ru: "Если бы я жил у моря, я бы плавал каждый день." },
            { en: "What would you do if you won the lottery?", az: "Lotereya udsaydın, nə edərdin?", ru: "Что бы ты сделал, если бы выиграл в лотерею?" },
            { en: "If I were you, I'd talk to him.", az: "Sənin yerində olsaydım, onunla danışardım.", ru: "На твоём месте я бы с ним поговорил." },
            { en: "If we had booked earlier, it would have been cheaper.", az: "Daha tez bron etsəydik, ucuz olardı.", ru: "Если бы мы забронировали раньше, было бы дешевле." },
            { en: "If she calls, tell her I'm in a meeting.", az: "Zəng etsə, de ki, iclasdayam.", ru: "Если она позвонит, скажи, что я на совещании." },
            { en: "If I had a car, I wouldn't take the bus.", az: "Maşınım olsaydı, avtobusa minməzdim.", ru: "Если бы у меня была машина, я бы не ездил на автобусе." },
            { en: "You can borrow my laptop as long as you're careful.", az: "Ehtiyatlı olsan, noutbukumu götürə bilərsən.", ru: "Можешь взять мой ноутбук, если будешь аккуратен." },
            { en: "Unless you practise, you won't improve.", az: "Məşq etməsən, irəliləməyəcəksən.", ru: "Если не будешь практиковаться, не будет прогресса." },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      title: { az: "6. Tipik səhvlər", ru: "6. Типичные ошибки" },
      blocks: [
        {
          kind: "mistakes",
          items: [
            { wrong: "If it will rain, I'll stay home.", right: "If it rains, I'll stay home.", why: { az: "If hissəsində will işlənmir.", ru: "В части с if «will» не используется." } },
            { wrong: "I'll call you when I will arrive.", right: "I'll call you when I arrive.", why: { az: "When, as soon as, before-dən sonra da Present Simple.", ru: "После when, as soon as, before — тоже Present Simple." } },
            { wrong: "If I would have money, I would buy it.", right: "If I had money, I would buy it.", why: { az: "If hissəsində would yox, Past Simple.", ru: "В части с if — не would, а Past Simple." } },
            { wrong: "If I knew, I would have told you.", right: "If I had known, I would have told you.", why: { az: "Keçmiş xəyali şərt: had + V3.", ru: "Нереальное прошлое: had + V3." } },
            { wrong: "If I am you, I would go.", right: "If I were you, I would go.", why: { az: "Xəyali vəziyyət — were.", ru: "Воображаемая ситуация — were." } },
            { wrong: "Unless you don't hurry, you'll be late.", right: "Unless you hurry, you'll be late.", why: { az: "Unless artıq \"if … not\" deməkdir — ikinci inkar lazım deyil.", ru: "Unless уже значит «if … not» — второе отрицание не нужно." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Real: If + Present, will + V1. If hissəsində will yoxdur.", ru: "Реальное: If + Present, will + V1. В части с if нет will." },
    { az: "Xəyali indi: If + Past, would + V1 (If I were you…).", ru: "Нереальное сейчас: If + Past, would + V1 (If I were you…)." },
    { az: "Xəyali keçmiş: If + had + V3, would have + V3.", ru: "Нереальное прошлое: If + had + V3, would have + V3." },
    { az: "Unless = if … not. When, as soon as, until-dən sonra da will yoxdur.", ru: "Unless = if … not. После when, as soon as, until тоже нет will." },
  ],
};
