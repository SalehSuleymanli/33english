import type { Teach } from "./types";

export const TEACH_03: Teach = {
  day: 3,
  summary: {
    az: "Bu dərsdə ikinci çərçivəni, vəziyyət çərçivəsini öyrənirsiniz: Subject + am / is / are. Bu struktur kimin kim olduğunu, necə olduğunu və harada olduğunu bildirir. İngilis dilində ən çox işlənən cümlə modellərindən biridir.",
    ru: "В этом уроке вы изучаете вторую рамку — рамку состояния: Subject + am / is / are. Эта структура говорит, кто человек, какой он и где находится. Это одна из самых частых моделей английского предложения.",
  },
  sections: [
    {
      id: "meaning",
      title: { az: "1. \"To be\" nə üçündür?", ru: "1. Зачем нужен «to be»?" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Azərbaycan dilində \"Mən tələbəyəm\", \"O, yorğundur\" deyirik: \"olmaq\" mənası şəkilçi ilə (-am, -dır) ifadə olunur. İngilis dilində isə şəkilçi yoxdur, buna görə ayrıca feil lazımdır: \"to be\". İndiki zamanda onun üç forması var: am, is, are. \"I am a student\" hərfən \"Mən varam tələbə\" kimi qurulur: mübtəda + be + təsvir.",
            ru: "В русском в настоящем времени мы говорим «Я студент», «Он устал» — глагол «быть» опускается. В английском так нельзя: в каждом предложении нужен глагол, поэтому используется «to be». В настоящем времени у него три формы: am, is, are. «I am a student» буквально звучит как «Я есть студент»: подлежащее + be + описание.",
          },
        },
        {
          kind: "tip",
          text: {
            az: "Qızıl qayda: ingilis cümləsində feil mütləqdir. Cümlədə başqa feil yoxdursa və siz kimisə və ya nəyisə təsvir edirsinizsə, am / is / are lazımdır.",
            ru: "Золотое правило: в английском предложении обязательно есть глагол. Если другого глагола нет и вы описываете кого-то или что-то, нужен am / is / are.",
          },
        },
        {
          kind: "formula",
          label: { az: "Təsdiq cümləsi", ru: "Утвердительное предложение" },
          parts: [
            { text: "She", role: "subject", note: { az: "Mübtəda: kim və ya nə haqqında danışırıq.", ru: "Подлежащее: о ком или о чём говорим." } },
            { text: "is", role: "be", note: { az: "\"To be\" feili, mübtədaya uyğun forma.", ru: "Глагол «to be» в форме, согласованной с подлежащим." } },
            { text: "a doctor / tired / at home", role: "complement", note: { az: "Təsvir: isim (kim?), sifət (necə?) və ya yer (harada?).", ru: "Описание: существительное (кто?), прилагательное (какой?) или место (где?)." } },
          ],
          example: "She is a doctor.",
        },
      ],
    },
    {
      id: "forms",
      title: { az: "2. Am, is, are: hansı əvəzlik hansı formanı alır", ru: "2. Am, is, are: какое местоимение с какой формой" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Mübtəda", ru: "Подлежащее" }, { az: "Tam forma", ru: "Полная форма" }, { az: "İxtisar", ru: "Сокращение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["I", "I am", "I'm", "I'm from Baku."],
            ["you", "you are", "you're", "You're right."],
            ["he / she / it", "he is / she is / it is", "he's / she's / it's", "She's my sister. It's cold."],
            ["we", "we are", "we're", "We're ready."],
            ["they", "they are", "they're", "They're at work."],
            ["Ali / my car / the book", "is", "Ali's", "Ali's at home. My car is new."],
            ["my parents / the books", "are", "—", "My parents are teachers."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "İxtisarlar danışıqda və qeyri-rəsmi yazıda normaldır, rəsmi yazıda (müraciət, esse) tam forma daha yaxşıdır. Qeyd: \"you\" həm tək (sən, siz), həm cəm (siz) üçün işlənir və həmişə \"are\" ilə gəlir.",
            ru: "Сокращения нормальны в речи и неформальном письме; в официальном письме (заявление, эссе) лучше полная форма. Обратите внимание: «you» означает и «ты/вы» в единственном числе, и «вы» во множественном, и всегда используется с «are».",
          },
        },
      ],
    },
    {
      id: "neg-q",
      title: { az: "3. İnkar, sual və qısa cavablar", ru: "3. Отрицание, вопрос и краткие ответы" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Forma", ru: "Форма" }, { az: "Quruluş", ru: "Структура" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["−", "subject + am/is/are + not", "I'm not tired. He isn't (He's not) here. They aren't (They're not) ready."],
            ["?", "Am/Is/Are + subject + …?", "Am I late? Is she a nurse? Are you OK?"],
            ["Short +", "Yes, + pronoun + am/is/are.", "Yes, I am. Yes, she is. Yes, we are."],
            ["Short −", "No, + pronoun + 'm not / isn't / aren't.", "No, I'm not. No, she isn't. No, we aren't."],
            ["Wh- ?", "Wh-word + am/is/are + subject?", "Where are you? How old is he? What's your name?"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "İnkarda \"not\" sözü \"be\" feilindən sonra gəlir. \"I am not\" yalnız \"I'm not\" kimi ixtisar olunur (\"I amn't\" deyilmir). Sual üçün \"be\" mübtədadan əvvələ keçir, köməkçi \"do\" lazım deyil: \"Are you a student?\", \"Do you are…?\" yox. Qısa təsdiq cavabında ixtisar işlənmir: \"Yes, I am\", \"Yes, I'm\" yox.",
            ru: "В отрицании «not» ставится после глагола «be». «I am not» сокращается только как «I'm not» («I amn't» не говорят). Для вопроса «be» встаёт перед подлежащим, вспомогательный «do» не нужен: «Are you a student?», а не «Do you are…?». В кратком утвердительном ответе сокращение не используется: «Yes, I am», а не «Yes, I'm».",
          },
        },
      ],
    },
    {
      id: "uses",
      title: { az: "4. \"To be\" ilə nələri deyirik", ru: "4. Что мы говорим с «to be»" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["name, identity", "I'm Leyla. This is my friend Murad."],
            ["job (a/an + job)", "She's an engineer. He's a taxi driver."],
            ["age", "I'm 25 (years old). How old are you?"],
            ["origin, nationality", "We're from Ganja. They're Turkish."],
            ["feelings, states", "I'm hungry. Are you OK? She's worried."],
            ["description", "The flat is small but comfortable."],
            ["location", "My keys are in the car. Where is the station?"],
            ["weather, time, distance (it)", "It's sunny. It's 7 o'clock. It's 3 km from here."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Bir neçə vacib məqam. Peşədən əvvəl \"a/an\" mütləqdir: \"She is a doctor\". Yaş \"be\" ilə deyilir, \"have\" ilə yox: \"I am 30\", \"I have 30 years\" yox. Hava, saat və məsafə haqqında danışarkən mübtəda olaraq \"it\" işlənir, hətta Azərbaycan və ya rus dilində heç bir mübtəda olmasa belə: \"Soyuqdur\" / «Холодно» → It's cold.",
            ru: "Несколько важных моментов. Перед профессией обязателен «a/an»: «She is a doctor». Возраст выражается через «be», а не «have»: «I am 30», а не «I have 30 years». О погоде, времени и расстоянии говорят с подлежащим «it», хотя в русском подлежащего нет: «Холодно» → It's cold.",
          },
        },
        {
          kind: "p",
          text: {
            az: "Hiss və vəziyyətlərin bir çoxu ingilis dilində sifətdir və \"be\" ilə işlənir, halbuki Azərbaycan və rus dillərində onlar feil kimi səslənə bilər: \"I am hungry\" (acmışam), \"I am afraid\" (qorxuram), \"I am late\" (gecikirəm), \"I am interested in music\" (musiqi ilə maraqlanıram).",
            ru: "Многие чувства и состояния в английском выражаются прилагательными с «be», хотя в русском это глаголы: «I am hungry» (я голоден / хочу есть), «I am afraid» (я боюсь), «I am late» (я опаздываю), «I am interested in music» (я интересуюсь музыкой).",
          },
        },
      ],
    },
    {
      id: "pronouns",
      title: { az: "5. Şəxs əvəzlikləri və yiyəlik sözləri", ru: "5. Личные и притяжательные местоимения" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Mübtəda", ru: "Подлежащее" }, { az: "Yiyəlik", ru: "Притяжательное" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["I", "my", "I'm Aysel. My brother is a pilot."],
            ["you", "your", "You're kind. Your English is good."],
            ["he", "his", "He's busy. His phone is off."],
            ["she", "her", "She's at work. Her office is big."],
            ["it", "its", "It's a nice café. Its coffee is great."],
            ["we", "our", "We're neighbours. Our flat is on the 5th floor."],
            ["they", "their", "They're students. Their teacher is strict."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Azərbaycan dilində \"o\" həm kişi, həm qadın, həm də əşya üçündür. İngilis dilində isə seçim etməlisiniz: kişi → he, qadın → she, əşya və heyvan → it. Bu, azərbaycanlıların ən çox səhv etdiyi yerlərdən biridir.",
            ru: "В русском род есть, поэтому «он/она» выбирать привычно. Но в английском предметы почти всегда «it», даже если в русском они мужского или женского рода: «стол — он» → the table — it, «машина — она» → the car — it.",
          },
        },
      ],
    },
    {
      id: "compare",
      title: { az: "6. Müqayisə: be yoxsa başqa feil?", ru: "6. Сравнение: be или другой глагол?" },
      blocks: [
        {
          kind: "compare",
          items: [
            {
              en: "I am a teacher. / I teach English.",
              text: {
                az: "Birincidə kim olduğumu deyirəm (vəziyyət, 2-ci çərçivə). İkincidə nə etdiyimi deyirəm (hərəkət, 3-cü çərçivə). Bunları qarışdırmayın: \"I am teach\" səhvdir.",
                ru: "В первом я говорю, кто я (состояние, рамка 2). Во втором — что я делаю (действие, рамка 3). Не смешивайте их: «I am teach» — ошибка.",
              },
            },
            {
              en: "I agree. (not: I am agree)",
              text: {
                az: "\"Agree\" feildir, sifət deyil, ona görə \"be\" lazım deyil. Eyni şey like, want, know, think üçün də keçərlidir: \"I like it\", \"I am like it\" yox.",
                ru: "«Agree» — глагол, а не прилагательное, поэтому «be» не нужен. То же с like, want, know, think: «I like it», а не «I am like it».",
              },
            },
            {
              en: "It is cold. / I am cold.",
              text: {
                az: "\"It is cold\" — hava soyuqdur. \"I am cold\" — mən üşüyürəm. Hər ikisi düzgündür, amma mənaları fərqlidir.",
                ru: "«It is cold» — на улице/в комнате холодно. «I am cold» — мне холодно. Оба верны, но значат разное.",
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
            { en: "Hi, I'm Kamran. I'm a designer.", az: "Salam, mən Kamranam. Dizaynerəm.", ru: "Привет, я Камран. Я дизайнер." },
            { en: "My sister is 19. She's a student.", az: "Bacım 19 yaşındadır. O, tələbədir.", ru: "Моей сестре 19. Она студентка." },
            { en: "We're not from here. We're from Lankaran.", az: "Biz buralı deyilik. Lənkərandanıq.", ru: "Мы не отсюда. Мы из Ленкорани." },
            { en: "Is this seat free? — Yes, it is.", az: "Bu yer boşdur? — Bəli.", ru: "Это место свободно? — Да." },
            { en: "Are they your colleagues? — No, they aren't. They're my cousins.", az: "Onlar sənin həmkarlarındır? — Yox. Əmim uşaqlarıdır.", ru: "Это твои коллеги? — Нет. Это мои двоюродные братья." },
            { en: "I'm sorry, I'm late.", az: "Bağışlayın, gecikmişəm.", ru: "Извините, я опоздал." },
            { en: "The museum is closed on Mondays.", az: "Muzey bazar ertəsi bağlıdır.", ru: "По понедельникам музей закрыт." },
            { en: "Where are my glasses? — They're on the table.", az: "Eynəyim haradadır? — Masanın üstündədir.", ru: "Где мои очки? — На столе." },
            { en: "How are you? — I'm fine, thanks.", az: "Necəsən? — Yaxşıyam, sağ ol.", ru: "Как дела? — Хорошо, спасибо." },
            { en: "It's very hot today.", az: "Bu gün çox istidir.", ru: "Сегодня очень жарко." },
            { en: "Your idea is interesting.", az: "Sənin fikrin maraqlıdır.", ru: "Твоя идея интересная." },
            { en: "What's your phone number?", az: "Telefon nömrən neçədir?", ru: "Какой у тебя номер телефона?" },
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
            { wrong: "I student.", right: "I am a student.", why: { az: "Feil buraxılıb. Azərbaycan dilində \"-am\" şəkilçisi var, ingilis dilində isə \"am\" ayrıca sözdür. Peşədən əvvəl \"a\" da lazımdır.", ru: "Пропущен глагол. В русском «быть» в настоящем опускается, в английском — нет. Перед профессией нужен ещё «a»." } },
            { wrong: "She is teacher.", right: "She is a teacher.", why: { az: "Tək saylı peşədən əvvəl \"a/an\" mütləqdir.", ru: "Перед профессией в единственном числе обязателен «a/an»." } },
            { wrong: "I have 25 years.", right: "I am 25 (years old).", why: { az: "Yaş \"be\" ilə deyilir. \"Have\" burada mümkün deyil.", ru: "Возраст выражается через «be». «Have» здесь невозможен." } },
            { wrong: "I am agree with you.", right: "I agree with you.", why: { az: "Agree feildir. Feildən əvvəl \"am\" qoyulmur.", ru: "Agree — глагол. Перед ним «am» не ставится." } },
            { wrong: "Do you are tired?", right: "Are you tired?", why: { az: "\"Be\" ilə sual üçün \"do\" lazım deyil; \"be\" özü önə keçir.", ru: "В вопросе с «be» не нужен «do»; «be» сам выходит вперёд." } },
            { wrong: "Is cold today.", right: "It is cold today.", why: { az: "İngilis cümləsində mübtəda mütləqdir. Hava üçün \"it\" işlənir.", ru: "В английском предложении подлежащее обязательно. Для погоды — «it»." } },
            { wrong: "My brother, she is a doctor.", right: "My brother is a doctor. He is…", why: { az: "Kişi üçün he, qadın üçün she. Bir mübtədanı iki dəfə təkrar etmirik.", ru: "Для мужчины he, для женщины she. Подлежащее не повторяем дважды." } },
            { wrong: "Are you hungry? — Yes, I'm.", right: "Yes, I am.", why: { az: "Qısa təsdiq cavabında ixtisar edilmir.", ru: "В кратком утвердительном ответе сокращение не используется." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "İngilis cümləsində feil mütləqdir: təsvir üçün am / is / are işlədin.", ru: "В английском предложении обязателен глагол: для описания используйте am / is / are." },
    { az: "I → am; he, she, it → is; you, we, they → are.", ru: "I → am; he, she, it → is; you, we, they → are." },
    { az: "İnkar: am/is/are + not. Sual: Am/Is/Are + mübtəda? \"Do\" lazım deyil.", ru: "Отрицание: am/is/are + not. Вопрос: Am/Is/Are + подлежащее? «Do» не нужен." },
    { az: "Peşədən əvvəl a/an, yaş \"be\" ilə, hava və saat \"it\" ilə.", ru: "Перед профессией a/an, возраст через «be», погода и время через «it»." },
  ],
};
