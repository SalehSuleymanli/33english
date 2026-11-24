import type { IeltsSpeakingTopic } from "./types";

export const IELTS_WORK: IeltsSpeakingTopic = {
  id: "work-career",
  title: { en: "Work and Career", az: "İş və karyera", ru: "Работа и карьера" },
  intro: {
    az: "İş mövzusu IELTS-də ən çox düşən mövzulardan biridir. Burada indiki işinizi təsvir etmək (Present Simple, Present Perfect), planlarınızdan danışmaq (going to, will, would like to) və iş dünyası haqqında fikir bildirmək (müqayisə, şərt cümlələri) lazımdır.",
    ru: "Тема работы — одна из самых частых на IELTS. Нужно описывать текущую работу (Present Simple, Present Perfect), говорить о планах (going to, will, would like to) и высказываться о мире труда (сравнения, условные предложения).",
  },
  part1: [
    { q: "Do you work or are you a student?", tr: { az: "İşləyirsiniz, yoxsa tələbəsiniz?", ru: "Вы работаете или учитесь?" }, a: "I work full-time as a marketing assistant at a small IT company in Baku. I've been there for about two years, and I'm also taking an evening course in digital design." },
    { q: "What do you like most about your job?", tr: { az: "İşinizdə ən çox nəyi sevirsiniz?", ru: "Что вам больше всего нравится в вашей работе?" }, a: "Probably the variety. No two days are the same — one day I'm writing posts for social media, and the next I'm helping to organise an event. I'd get bored very quickly if I did the same thing every day." },
    { q: "Is there anything you dislike about it?", tr: { az: "Bəyənmədiyiniz bir şey varmı?", ru: "Есть ли что-то, что вам не нравится?" }, a: "The commute, to be honest. The office is on the other side of the city, so I spend almost two hours a day in traffic. If I could work from home more often, I'd be much happier." },
    { q: "Did you always want to do this kind of work?", tr: { az: "Həmişə bu cür iş görmək istəyirdiniz?", ru: "Вы всегда хотели заниматься такой работой?" }, a: "Not at all. When I was a child, I wanted to be a pilot. Then at university I studied economics, and I only discovered marketing during an internship. It turned out to be a much better fit for me." },
    { q: "What job would you like to do in the future?", tr: { az: "Gələcəkdə hansı işi görmək istərdiniz?", ru: "Какой работой вы хотели бы заниматься в будущем?" }, a: "I'd like to run my own small agency one day, helping local businesses to sell online. I'm going to get a few more years of experience first, though." },
    { q: "Do many people in your country work from home?", tr: { az: "Sizin ölkədə çox adam evdən işləyir?", ru: "Много ли людей в вашей стране работают из дома?" }, a: "More than before. Since the pandemic, a lot of companies have allowed people to work remotely at least a few days a week, especially in IT. But in banks and government offices, most people still go to the office every day." },
  ],
  part2: {
    cue: "Describe a job you would like to do in the future.",
    prompts: ["what the job is", "what skills or qualifications you would need", "how you would get this job"],
    closing: "and explain why you would like to do this job.",
    cueTr: {
      az: "Gələcəkdə görmək istədiyiniz bir işi təsvir edin: bu iş nədir, hansı bacarıq və ixtisas lazımdır, bu işi necə əldə edərdiniz və niyə bu işi görmək istədiyinizi izah edin.",
      ru: "Опишите работу, которой вы хотели бы заниматься в будущем: что это за работа, какие навыки и квалификация нужны, как бы вы её получили, и объясните, почему вы хотите ею заниматься.",
    },
    answer: [
      "I'd like to talk about a job that I've been thinking about for a few years now, which is running my own digital marketing agency — a small company that helps local businesses, like cafés, shops and family hotels, to promote themselves online.",
      "In terms of skills, I'd need much more than the ability to post on social media. You have to understand data, so you can see which adverts are actually working, and you need to be good at writing and design. Just as importantly, you need people skills, because small business owners are often nervous about spending money on marketing, and you have to earn their trust. I don't think I'd need a particular degree, but a few professional certificates would definitely help.",
      "As for how I'd get there, my plan is to stay in my current job for another two or three years and learn as much as I can. I'm already taking an evening course in design, and I've started doing small projects for friends' businesses at the weekend. If those go well, I'll have a portfolio and a few clients before I leave my full-time job, which would make the whole thing much less risky.",
      "The main reason I'd like to do this is that I really enjoy seeing a small business grow. A friend of mine opened a bakery last year, and after I helped her set up her online page, her orders nearly doubled. I remember thinking: if I could do that for fifty businesses instead of one, it would be incredibly satisfying. I'd also love the freedom to choose my own projects and, hopefully, to create jobs for other young people.",
    ],
    translation: {
      az: [
        "Bir neçə ildir düşündüyüm bir iş haqqında danışmaq istərdim: öz rəqəmsal marketinq agentliyimi idarə etmək — kafe, mağaza və ailə otelləri kimi yerli bizneslərə internetdə özlərini tanıtmağa kömək edən kiçik bir şirkət.",
        "Bacarıqlara gəlincə, sosial mediada paylaşım etməkdən xeyli artığı lazım olardı. Məlumatları başa düşməlisən ki, hansı reklamların həqiqətən işlədiyini görəsən, həmçinin yazı və dizaynda yaxşı olmalısan. Eyni dərəcədə vacibi insanlarla işləmək bacarığıdır, çünki kiçik biznes sahibləri çox vaxt marketinqə pul xərcləməkdən narahat olurlar və onların etimadını qazanmalısan. Məncə, xüsusi diplom lazım olmazdı, amma bir neçə peşəkar sertifikat mütləq kömək edərdi.",
        "Ora necə çatacağıma gəlincə, planım hazırkı işimdə daha iki-üç il qalmaq və bacardığım qədər çox öyrənməkdir. Artıq axşam dizayn kursunda oxuyuram və həftə sonları dostlarımın biznesləri üçün kiçik layihələr etməyə başlamışam. Bunlar uğurlu olsa, tam ştatlı işimdən çıxmazdan əvvəl portfoliom və bir neçə müştərim olacaq, bu da bütün işi xeyli az riskli edərdi.",
        "Bunu etmək istəməyimin əsas səbəbi kiçik bir biznesin böyüməsini görməkdən həqiqətən zövq almağımdır. Bir rəfiqəm keçən il çörəkxana açdı və mən onun internet səhifəsini qurmağa kömək etdikdən sonra sifarişləri təxminən iki dəfə artdı. Yadımdadır, düşündüm: bunu bir yox, əlli biznes üçün edə bilsəydim, inanılmaz dərəcədə məmnunedici olardı. Həmçinin öz layihələrimi seçmək azadlığını və, ümid edirəm, digər gənclər üçün iş yerləri yaratmağı çox istərdim.",
      ],
      ru: [
        "Я хотел бы рассказать о работе, о которой думаю уже несколько лет: руководить собственным агентством цифрового маркетинга — небольшой компанией, которая помогает местному бизнесу, например кафе, магазинам и семейным гостиницам, продвигать себя в интернете.",
        "Что касается навыков, понадобится гораздо больше, чем умение публиковать посты в соцсетях. Нужно понимать данные, чтобы видеть, какая реклама действительно работает, и хорошо писать и разбираться в дизайне. Не менее важны навыки общения, потому что владельцы малого бизнеса часто боятся тратить деньги на маркетинг, и нужно заслужить их доверие. Не думаю, что нужен какой-то особый диплом, но несколько профессиональных сертификатов точно помогли бы.",
        "Что касается того, как я к этому приду, мой план — проработать на нынешнем месте ещё два-три года и научиться как можно большему. Я уже учусь на вечерних курсах дизайна и начал делать небольшие проекты для бизнеса друзей по выходным. Если всё пойдёт хорошо, к моменту ухода с основной работы у меня будет портфолио и несколько клиентов, и это сделало бы всё гораздо менее рискованным.",
        "Главная причина в том, что мне очень нравится видеть, как растёт маленький бизнес. Моя подруга в прошлом году открыла пекарню, и после того как я помог ей сделать страницу в интернете, её заказы почти удвоились. Помню, я подумал: если бы я мог сделать это не для одного, а для пятидесяти бизнесов, это приносило бы огромное удовлетворение. А ещё мне бы очень хотелось свободы самому выбирать проекты и, надеюсь, создавать рабочие места для других молодых людей.",
      ],
    },
    vocab: [
      { en: "run (a company)", az: "idarə etmək", ru: "руководить (компанией)" },
      { en: "promote", az: "tanıtmaq, reklam etmək", ru: "продвигать" },
      { en: "qualification", az: "ixtisas, kvalifikasiya", ru: "квалификация" },
      { en: "portfolio", az: "portfolio (iş nümunələri)", ru: "портфолио" },
      { en: "full-time job", az: "tam ştatlı iş", ru: "работа на полный день" },
      { en: "earn someone's trust", az: "kiminsə etimadını qazanmaq", ru: "заслужить чьё-то доверие" },
      { en: "satisfying", az: "məmnunedici", ru: "приносящий удовлетворение" },
      { en: "commute", az: "işə gediş-gəliş", ru: "дорога на работу" },
    ],
    expressions: [
      { en: "In terms of skills, …", az: "Bacarıqlar baxımından, …", ru: "Что касается навыков, …" },
      { en: "As for how I'd get there, …", az: "Ora necə çatacağıma gəlincə, …", ru: "Что касается того, как я к этому приду, …" },
      { en: "Just as importantly, …", az: "Eyni dərəcədə vacibi, …", ru: "Не менее важно, …" },
      { en: "The main reason I'd like to … is that …", az: "…-mək istəməyimin əsas səbəbi … -dır", ru: "Главная причина, по которой я хотел бы …, в том, что …" },
      { en: "I remember thinking: …", az: "Yadımdadır, düşündüm ki, …", ru: "Помню, я подумал: …" },
    ],
    grammar: [
      { en: "a job that I've been thinking about for a few years", note: { az: "Nisbi cümlə + Present Perfect Continuous (16-cı gün).", ru: "Относительное придаточное + Present Perfect Continuous (16-й день)." } },
      { en: "I'd need … a few certificates would definitely help", note: { az: "Would + V1: xəyali/hipotetik gələcək.", ru: "Would + V1: гипотетическое будущее." } },
      { en: "If those go well, I'll have a portfolio", note: { az: "Birinci şərt: real plan (25-ci gün).", ru: "Первый тип условных: реальный план (25-й день)." } },
      { en: "If I could do that for fifty businesses, it would be incredibly satisfying", note: { az: "İkinci şərt: xəyal.", ru: "Второй тип условных: мечта." } },
      { en: "after I helped her set up her online page", note: { az: "Past Simple hekayə + help + şəxs + V1.", ru: "Past Simple в рассказе + help + человек + V1." } },
    ],
  },
  part3: [
    { q: "What makes a job satisfying for most people?", tr: { az: "Əksər insanlar üçün işi məmnunedici edən nədir?", ru: "Что делает работу приятной для большинства людей?" }, a: "I'd say there are two main things. The first is feeling that your work matters — that someone benefits from what you do. The second is a sense of progress: people want to feel they're learning and moving forward. Salary is important, of course, but research suggests that once people earn enough to live comfortably, extra money doesn't make them much happier at work." },
    { q: "Do you think young people today have different attitudes to work than their parents?", tr: { az: "Sizcə, bugünkü gənclərin işə münasibəti valideynlərininkindən fərqlidir?", ru: "Как вы думаете, отношение молодых людей к работе сегодня отличается от отношения их родителей?" }, a: "Definitely. My parents' generation usually stayed with one employer for decades, and stability was the main goal. Young people today change jobs much more often and care more about flexibility and personal growth. That said, I think this is partly because the job market itself has changed — long-term contracts are simply less common than they used to be." },
    { q: "Is it better to work for a large company or a small one?", tr: { az: "Böyük şirkətdə işləmək daha yaxşıdır, yoxsa kiçikdə?", ru: "Лучше работать в большой компании или в маленькой?" }, a: "It depends on what stage of your career you're at. A large company usually offers better training, a clear structure and more security, which is ideal when you're starting out. In a small company, on the other hand, you're given more responsibility earlier and you can see the impact of your work directly. Personally, I think it's useful to experience both." },
    { q: "How might technology change the way people work in the future?", tr: { az: "Texnologiya gələcəkdə insanların işləmə tərzini necə dəyişə bilər?", ru: "Как технологии могут изменить то, как люди будут работать в будущем?" }, a: "I think routine tasks will increasingly be done by software, so people will spend more time on work that needs creativity, judgement or human contact. Remote work will probably become even more normal. The risk is that people whose jobs are automated may struggle to retrain, so governments and companies will have to invest much more in lifelong learning." },
    { q: "Should schools teach practical work skills, or focus on academic subjects?", tr: { az: "Məktəblər praktik iş bacarıqları öyrətməlidir, yoxsa akademik fənlərə diqqət yetirməlidir?", ru: "Должны ли школы учить практическим рабочим навыкам или сосредоточиться на академических предметах?" }, a: "Ideally, both. Academic subjects teach you how to think, which is valuable in any job. But I believe schools should also teach things like communication, teamwork and managing money, because many students leave school without these skills. If I were in charge, I'd add more project-based learning, where students solve real problems together." },
    { q: "Why do some people choose to start their own business?", tr: { az: "Bəzi insanlar niyə öz biznesini açmağı seçir?", ru: "Почему некоторые люди решают открыть собственное дело?" }, a: "For many, it's about independence — being your own boss and making your own decisions. Others have spotted an opportunity or a problem that nobody else is solving. Of course, it's risky, and most new businesses don't survive for long, but people who succeed often say that the freedom is worth the stress." },
  ],
};
