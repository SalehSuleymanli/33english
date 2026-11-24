import type { IeltsSpeakingTopic } from "./types";

export const IELTS_TRAVEL: IeltsSpeakingTopic = {
  id: "travel-places",
  title: { en: "Travel and Places", az: "Səyahət və məkanlar", ru: "Путешествия и места" },
  intro: {
    az: "Səyahət mövzusu hekayə danışmaq üçün idealdır: keçmiş səfərlər (Past Simple, Past Continuous, Past Perfect), təcrübə (Present Perfect, ever/never), planlar (going to, would like to) və turizmin təsiri haqqında fikirlər (passive, müqayisə).",
    ru: "Тема путешествий идеальна для рассказа: прошлые поездки (Past Simple, Past Continuous, Past Perfect), опыт (Present Perfect, ever/never), планы (going to, would like to) и мнения о влиянии туризма (пассив, сравнения).",
  },
  part1: [
    { q: "Do you like travelling?", tr: { az: "Səyahət etməyi sevirsiniz?", ru: "Вы любите путешествовать?" }, a: "Yes, very much. I don't travel abroad often because it's expensive, but I try to visit a new region of Azerbaijan every year. There's always something surprising, even in places only a few hours from Baku." },
    { q: "Where did you go on your last holiday?", tr: { az: "Son tətilinizdə hara getdiniz?", ru: "Куда вы ездили в последний отпуск?" }, a: "Last August I went to Lahij with two friends. It's a small mountain village famous for its copper craftsmen. We stayed in a family guesthouse, and the owner cooked for us every evening." },
    { q: "Do you prefer travelling alone or with others?", tr: { az: "Tək səyahət etməyi üstün tutursunuz, yoxsa başqaları ilə?", ru: "Вы предпочитаете путешествовать одни или с другими?" }, a: "With others, usually. It's more fun to share experiences, and it's cheaper too. That said, I'd like to try a solo trip one day, because I think you meet more local people when you're on your own." },
    { q: "How do you usually plan a trip?", tr: { az: "Səfəri adətən necə planlaşdırırsınız?", ru: "Как вы обычно планируете поездку?" }, a: "I'm not a very organised traveller, I must admit. I book the transport and the first night's accommodation, and then I decide the rest when I get there. My friends find it stressful, but I like the freedom." },
    { q: "Is there a place you've always wanted to visit?", tr: { az: "Həmişə getmək istədiyiniz bir yer varmı?", ru: "Есть ли место, которое вы всегда хотели посетить?" }, a: "Japan. I've been interested in Japanese culture since I was a teenager, mostly because of films and food. I've already started saving, so hopefully I'll go in the next two or three years." },
    { q: "What do you usually bring back from a trip?", tr: { az: "Səfərdən adətən nə gətirirsiniz?", ru: "Что вы обычно привозите из поездок?" }, a: "Food, mostly — local sweets, spices or tea, because my family enjoys them more than souvenirs. And of course hundreds of photos that I never look at again." },
  ],
  part2: {
    cue: "Describe a place you visited that you found really interesting.",
    prompts: ["where it was", "when you went there and who you went with", "what you did there"],
    closing: "and explain why you found it so interesting.",
    cueTr: {
      az: "Ziyarət etdiyiniz və çox maraqlı hesab etdiyiniz bir yeri təsvir edin: harada idi, ora nə vaxt və kiminlə getdiniz, orada nə etdiniz və niyə belə maraqlı olduğunu izah edin.",
      ru: "Опишите место, которое вы посетили и которое показалось вам очень интересным: где оно находится, когда и с кем вы туда ездили, что вы там делали, и объясните, почему оно вам так понравилось.",
    },
    answer: [
      "I'd like to describe a trip to Sheki, a historic town in the north-west of Azerbaijan, at the foot of the Caucasus Mountains. I went there about two years ago, in late September, with my cousin, who had been there before and kept telling me I had to see it.",
      "We drove up from Baku, which took around five hours, and we were lucky with the weather — the forests on the hills were just starting to turn yellow and red. We stayed in an old caravanserai that has been turned into a hotel. It was built a few hundred years ago for merchants travelling along the Silk Road, and sleeping inside those thick stone walls felt like going back in time.",
      "Over two days we did a lot. We visited the Palace of the Sheki Khans, which is famous for its incredibly detailed stained-glass windows, made without a single nail or drop of glue. We watched a craftsman making these windows by hand, and he explained that one small panel can take weeks. We also wandered through the old streets, tried the local halva — which is much sweeter than anything I'd eaten before — and had piti, a traditional soup cooked in a clay pot.",
      "What made it so interesting for me was the feeling that history wasn't just in a museum; it was part of everyday life. People were still practising crafts that their great-grandparents had practised, in the same buildings. I'd always thought of history as something you read about, but in Sheki I could see it, taste it and talk to it. If I had the chance, I'd go back tomorrow, ideally in the spring, so I could walk in the mountains as well.",
    ],
    translation: {
      az: [
        "Azərbaycanın şimal-qərbində, Qafqaz dağlarının ətəyində yerləşən tarixi şəhər Şəkiyə səfərimi təsvir etmək istərdim. Ora təxminən iki il əvvəl, sentyabrın sonunda əmim oğlu ilə getmişdim; o, əvvəllər orada olmuşdu və mütləq görməli olduğumu təkrarlayırdı.",
        "Bakıdan maşınla getdik, təxminən beş saat çəkdi və havamız uğurlu oldu — təpələrdəki meşələr yenicə sarı və qırmızıya çalmağa başlayırdı. Otelə çevrilmiş köhnə bir karvansarada qaldıq. O, bir neçə yüz il əvvəl İpək Yolu ilə gedən tacirlər üçün tikilib və o qalın daş divarların içində yatmaq keçmişə qayıtmaq kimi idi.",
        "İki gün ərzində çox şey etdik. Bir dənə də olsun mismar və ya yapışqan damcısı olmadan hazırlanmış inanılmaz dərəcədə incə şəbəkə pəncərələri ilə məşhur Şəki Xan Sarayını ziyarət etdik. Bu pəncərələri əllə düzəldən bir ustaya baxdıq; o izah etdi ki, kiçik bir hissə həftələr çəkə bilər. Köhnə küçələrdə də gəzdik, yerli halvanı daddıq — əvvəllər yediyim hər şeydən daha şirin idi — və saxsı qabda bişirilən ənənəvi şorba olan piti yedik.",
        "Onu mənim üçün belə maraqlı edən tarixin sadəcə muzeydə olmaması, gündəlik həyatın bir hissəsi olması hissi idi. İnsanlar hələ də ulu babalarının məşğul olduğu sənətlərlə eyni binalarda məşğul olurdular. Mən həmişə tarixə oxunan bir şey kimi baxmışam, amma Şəkidə onu görə, dada və onunla danışa bildim. İmkanım olsaydı, sabah yenə gedərdim, ideal olaraq yazda, ki, dağlarda da gəzə biləm.",
      ],
      ru: [
        "Я хотел бы рассказать о поездке в Шеки — исторический город на северо-западе Азербайджана, у подножия Кавказских гор. Я ездил туда около двух лет назад, в конце сентября, с двоюродным братом, который уже бывал там и постоянно говорил мне, что я обязательно должен это увидеть.",
        "Мы ехали из Баку на машине около пяти часов, и нам повезло с погодой: леса на холмах только начинали желтеть и краснеть. Мы остановились в старом караван-сарае, превращённом в гостиницу. Его построили несколько сотен лет назад для купцов, шедших по Шёлковому пути, и ночевать за этими толстыми каменными стенами было словно вернуться в прошлое.",
        "За два дня мы успели многое. Мы посетили Дворец шекинских ханов, знаменитый невероятно тонкими витражами, собранными без единого гвоздя и капли клея. Мы видели, как мастер делает такие окна вручную, и он объяснил, что одна небольшая панель может занять несколько недель. Ещё мы бродили по старым улицам, попробовали местную халву — гораздо слаще всего, что я ел раньше, — и ели пити, традиционный суп, который готовят в глиняном горшочке.",
        "Самым интересным для меня было ощущение, что история не только в музее, а часть повседневной жизни. Люди до сих пор занимаются ремёслами, которыми занимались их прадеды, в тех же самых зданиях. Я всегда думал об истории как о чём-то, о чём читают, а в Шеки я мог её увидеть, попробовать на вкус и поговорить с ней. Будь у меня возможность, я бы поехал туда завтра же, лучше всего весной, чтобы ещё и погулять в горах.",
      ],
    },
    vocab: [
      { en: "at the foot of (the mountains)", az: "(dağların) ətəyində", ru: "у подножия (гор)" },
      { en: "caravanserai", az: "karvansara", ru: "караван-сарай" },
      { en: "merchant", az: "tacir", ru: "купец" },
      { en: "stained-glass window", az: "şəbəkə / rəngli şüşəli pəncərə", ru: "витраж" },
      { en: "craftsman", az: "usta, sənətkar", ru: "мастер, ремесленник" },
      { en: "wander", az: "gəzib-dolaşmaq", ru: "бродить" },
      { en: "clay pot", az: "saxsı qab", ru: "глиняный горшок" },
      { en: "breathtaking", az: "nəfəs kəsən", ru: "захватывающий" },
    ],
    expressions: [
      { en: "I'd like to describe …", az: "… təsvir etmək istərdim", ru: "Я хотел бы описать …" },
      { en: "We were lucky with the weather.", az: "Havamız uğurlu oldu.", ru: "Нам повезло с погодой." },
      { en: "It felt like going back in time.", az: "Keçmişə qayıtmaq kimi idi.", ru: "Это было словно вернуться в прошлое." },
      { en: "What made it so interesting was …", az: "Onu belə maraqlı edən … idi", ru: "Самым интересным было …" },
      { en: "If I had the chance, I'd go back tomorrow.", az: "İmkanım olsaydı, sabah yenə gedərdim.", ru: "Будь у меня возможность, я бы поехал туда завтра же." },
    ],
    grammar: [
      { en: "my cousin, who had been there before", note: { az: "Vergüllü nisbi cümlə + Past Perfect.", ru: "Придаточное с запятыми + Past Perfect." } },
      { en: "an old caravanserai that has been turned into a hotel", note: { az: "Present Perfect Passive.", ru: "Present Perfect Passive." } },
      { en: "It was built a few hundred years ago for merchants travelling along the Silk Road", note: { az: "Past Passive + -ing ilə qısaldılmış nisbi cümlə.", ru: "Past Passive + сокращённое придаточное с -ing." } },
      { en: "much sweeter than anything I'd eaten before", note: { az: "Müqayisə + Past Perfect (22-ci və 31-ci günlər).", ru: "Сравнение + Past Perfect (22-й и 31-й дни)." } },
      { en: "If I had the chance, I'd go back tomorrow", note: { az: "İkinci şərt.", ru: "Второй тип условных." } },
    ],
  },
  part3: [
    { q: "Why do people like to travel?", tr: { az: "İnsanlar niyə səyahət etməyi sevir?", ru: "Почему люди любят путешествовать?" }, a: "There are many reasons, but I think the main one is curiosity — people want to see how others live and eat and think. Travel also gives us a break from routine. When you're somewhere new, even simple things like buying bread become an adventure, and that makes you feel more alive." },
    { q: "What are the benefits of tourism for a country?", tr: { az: "Turizmin ölkə üçün faydaları nələrdir?", ru: "Какую пользу туризм приносит стране?" }, a: "The economic benefits are the most obvious: hotels, restaurants and transport create jobs, especially in regions where there's little other work. Tourism can also encourage a country to protect its historical buildings and nature, because they become valuable. And it helps people from different cultures understand each other better." },
    { q: "Can tourism have negative effects?", tr: { az: "Turizmin mənfi təsirləri ola bilərmi?", ru: "Может ли туризм иметь негативные последствия?" }, a: "Unfortunately, yes. In some popular cities, rents have risen so much that local people can't afford to live in the centre any more. Too many visitors can also damage fragile places, like old towns or beaches. I think the solution is to spread tourists across more regions and seasons rather than limiting tourism altogether." },
    { q: "How has the way people travel changed in recent decades?", tr: { az: "Son onilliklərdə insanların səyahət tərzi necə dəyişib?", ru: "Как изменился способ путешествовать за последние десятилетия?" }, a: "It has become much cheaper and more independent. Thirty years ago, most people travelled with organised tour groups, whereas now you can book flights and apartments yourself on your phone in minutes. Budget airlines have made international travel possible for people who could never have afforded it before." },
    { q: "Is it better to travel in your own country or abroad?", tr: { az: "Öz ölkəndə səyahət etmək yaxşıdır, yoxsa xaricdə?", ru: "Лучше путешествовать по своей стране или за границей?" }, a: "Both have value. Travelling abroad opens your mind and improves your language skills. But many people know famous foreign cities better than their own country's regions, which is a shame. Domestic travel is usually cheaper, more environmentally friendly, and it supports local communities." },
    { q: "Do you think virtual travel could replace real travel in the future?", tr: { az: "Sizcə, gələcəkdə virtual səyahət real səyahəti əvəz edə bilər?", ru: "Может ли виртуальное путешествие в будущем заменить настоящее?" }, a: "I doubt it. Virtual tours are great for planning, or for people who can't travel because of health or money. But so much of travel is about the senses — the smell of a market, the taste of local food, a conversation with a stranger. I don't think technology will be able to reproduce that, at least not in my lifetime." },
  ],
};
