import type { Teach } from "./types";

export const TEACH_20: Teach = {
  day: 20,
  summary: {
    az: "Bu dərsdə hissləri dəqiq ifadə etməyi öyrənirsiniz: feel + sifət, It feels + sifət + to + feil, What does it feel like?, -ed və -ing sifətlərin fərqi (bored / boring) və zəngin emosiya lüğəti. Hisslərini düzgün izah edə bilmək dərin, səmimi söhbətin açarıdır.",
    ru: "В этом уроке вы научитесь точно выражать чувства: feel + прилагательное, It feels + прилагательное + to + глагол, What does it feel like?, разница между прилагательными на -ed и -ing (bored / boring) и богатый словарь эмоций. Умение объяснить свои чувства — ключ к глубокому, искреннему разговору.",
  },
  sections: [
    {
      id: "feel",
      title: { az: "1. Feel + sifət", ru: "1. Feel + прилагательное" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "\"Feel\" vəziyyət bildirən feildir və ondan sonra sifət gəlir, zərf yox: \"I feel tired\", \"She feels nervous\". \"I feel good\" düzgündür (özümü yaxşı hiss edirəm); \"I feel well\" isə \"sağlamam\" mənasındadır. Sual: \"How do you feel?\" və ya \"How are you feeling?\" — hər ikisi düzgündür; \"feel\" hisslər mənasında continuous-da da işlənə bilər.",
            ru: "«Feel» — глагол состояния, после него идёт прилагательное, а не наречие: «I feel tired», «She feels nervous». «I feel good» — правильно (я хорошо себя чувствую); «I feel well» значит «я здоров». Вопрос: «How do you feel?» или «How are you feeling?» — оба верны; «feel» в значении чувства может быть и в Continuous.",
          },
        },
        {
          kind: "formula",
          label: { az: "Subject + feel + sifət", ru: "Subject + feel + прилагательное" },
          parts: [
            { text: "I", role: "subject", note: { az: "Kim hiss edir.", ru: "Кто чувствует." } },
            { text: "feel", role: "verb", note: { az: "Hiss feili (zamana görə dəyişir: felt, will feel).", ru: "Глагол чувства (меняется по времени: felt, will feel)." } },
            { text: "a bit nervous", role: "complement", note: { az: "Sifət (zərf yox).", ru: "Прилагательное (не наречие)." } },
            { text: "about the interview", role: "other", note: { az: "Nədən? about / because …", ru: "Из-за чего? about / because …" } },
          ],
          example: "I feel a bit nervous about the interview.",
        },
      ],
    },
    {
      id: "it-feels",
      title: { az: "2. It feels + sifət + to… və feel like", ru: "2. It feels + прилагательное + to… и feel like" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Quruluş", ru: "Структура" }, { az: "Məna", ru: "Значение" }, { az: "Nümunə", ru: "Пример" }],
          rows: [
            ["It feels + adj + to + V1", "bir hərəkətin necə hiss etdirdiyi / каково делать что-то", "It feels great to be home."],
            ["What does it feel like (to …)?", "necə hissdir? / каково это?", "What does it feel like to live abroad?"],
            ["It feels like + noun / clause", "elə bil … / как будто", "It feels like a dream. It feels like I've known you for years."],
            ["feel like + -ing / noun", "istəmək, həvəs / хотеться", "I don't feel like cooking tonight. I feel like a pizza."],
            ["make someone feel + adj", "kimdəsə hiss yaratmaq / заставлять чувствовать", "This song makes me feel happy."],
          ],
        },
        {
          kind: "p",
          text: {
            az: "\"Feel like + -ing\" çox işlək danışıq ifadəsidir: \"I don't feel like going out\" — çölə çıxmaq istəmirəm, həvəsim yoxdur. Rus dilindəki «мне не хочется» qarşılığıdır. \"What does it feel like?\" isə təcrübə haqqında soruşmaq üçündür; cavab adətən \"It feels…\" ilə başlayır.",
            ru: "«Feel like + -ing» — очень частое разговорное выражение: «I don't feel like going out» — мне не хочется никуда идти. Это аналог «мне не хочется». «What does it feel like?» — чтобы спросить об опыте; ответ обычно начинается с «It feels…».",
          },
        },
      ],
    },
    {
      id: "ed-ing",
      title: { az: "3. -ed və -ing sifətlər", ru: "3. Прилагательные на -ed и -ing" },
      blocks: [
        {
          kind: "p",
          text: {
            az: "Bu, ən çox səhv edilən mövzulardan biridir. -ed ilə bitən sifət insanın hissini bildirir (I'm bored — darıxıram). -ing ilə bitən sifət isə həmin hissi yaradan şeyi təsvir edir (The film is boring — film darıxdırıcıdır). \"I'm boring\" desəniz, \"mən darıxdırıcı adamam\" demiş olursunuz!",
            ru: "Это одна из самых частых ошибок. Прилагательное на -ed выражает чувство человека (I'm bored — мне скучно). Прилагательное на -ing описывает то, что вызывает это чувство (The film is boring — фильм скучный). Сказав «I'm boring», вы скажете «я скучный человек»!",
          },
        },
        {
          kind: "table",
          head: [{ az: "Hiss (-ed)", ru: "Чувство (-ed)" }, { az: "Səbəb (-ing)", ru: "Причина (-ing)" }],
          rows: [
            ["I'm bored.", "The lesson is boring."],
            ["She's interested in art.", "Art is interesting."],
            ["We were surprised.", "The news was surprising."],
            ["He's tired.", "The trip was tiring."],
            ["I'm confused.", "The instructions are confusing."],
            ["They were excited.", "The match was exciting."],
            ["I felt embarrassed.", "It was an embarrassing moment."],
            ["She's worried.", "The situation is worrying."],
          ],
        },
      ],
    },
    {
      id: "vocabulary",
      title: { az: "4. Emosiyalar lüğəti: dəqiq sözlər", ru: "4. Словарь эмоций: точные слова" },
      blocks: [
        {
          kind: "table",
          head: [{ az: "Əsas söz", ru: "Базовое слово" }, { az: "Daha dəqiq / güclü", ru: "Точнее / сильнее" }],
          rows: [
            ["happy", "glad, pleased, delighted, thrilled, grateful, relieved"],
            ["sad", "upset, disappointed, down, heartbroken, lonely"],
            ["angry", "annoyed, irritated, frustrated, furious"],
            ["afraid", "nervous, anxious, worried, scared, terrified"],
            ["surprised", "amazed, shocked, astonished"],
            ["tired", "exhausted, worn out, sleepy"],
            ["calm", "relaxed, peaceful, at ease"],
          ],
        },
        {
          kind: "p",
          text: {
            az: "Ön sözlərə diqqət: angry WITH someone, angry ABOUT something; afraid OF; interested IN; worried ABOUT; proud OF; disappointed WITH/IN; tired OF (bezmək). \"Relieved\" — \"rahatladım, yüküm yüngülləşdi\" deməkdir və Azərbaycan və rus dillərinə tək sözlə çətin tərcümə olunur.",
            ru: "Внимание к предлогам: angry WITH someone, angry ABOUT something; afraid OF; interested IN; worried ABOUT; proud OF; disappointed WITH/IN; tired OF (надоело). «Relieved» значит «почувствовал облегчение» — одним словом на русский переводится с трудом.",
          },
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
            { en: "I feel really tired today.", az: "Bu gün özümü çox yorğun hiss edirəm.", ru: "Сегодня я очень устал." },
            { en: "How are you feeling after the operation?", az: "Əməliyyatdan sonra özünü necə hiss edirsən?", ru: "Как ты себя чувствуешь после операции?" },
            { en: "It feels strange to be back at school.", az: "Məktəbə qayıtmaq qəribə hissdir.", ru: "Странно снова оказаться в школе." },
            { en: "What does it feel like to be a parent?", az: "Valideyn olmaq necə hissdir?", ru: "Каково это — быть родителем?" },
            { en: "I don't feel like talking right now.", az: "İndi danışmaq istəmirəm.", ru: "Мне сейчас не хочется разговаривать." },
            { en: "I was so relieved when I heard the news.", az: "Xəbəri eşidəndə çox rahatladım.", ru: "Я почувствовал огромное облегчение, когда услышал новость." },
            { en: "She was disappointed with the results.", az: "Nəticələrdən məyus oldu.", ru: "Она была разочарована результатами." },
            { en: "The film was so boring that I fell asleep.", az: "Film o qədər darıxdırıcı idi ki, yuxuya getdim.", ru: "Фильм был таким скучным, что я уснул." },
            { en: "I'm a bit worried about my exams.", az: "İmtahanlarıma görə bir az narahatam.", ru: "Я немного волнуюсь из-за экзаменов." },
            { en: "That music always makes me feel calm.", az: "O musiqi məndə həmişə sakitlik yaradır.", ru: "Эта музыка всегда меня успокаивает." },
            { en: "I'm proud of you.", az: "Səninlə fəxr edirəm.", ru: "Я горжусь тобой." },
            { en: "It feels like we've known each other forever.", az: "Elə bil bir-birimizi əbədən tanıyırıq.", ru: "Такое чувство, будто мы знакомы целую вечность." },
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
            { wrong: "I am boring at work.", right: "I am bored at work.", why: { az: "Hiss üçün -ed: bored. \"Boring\" — darıxdırıcı adam deməkdir.", ru: "Для чувства — -ed: bored. «Boring» значит «скучный человек»." } },
            { wrong: "I feel myself bad.", right: "I feel bad.", why: { az: "Rus dilindəki «чувствую себя» birbaşa köçürülüb; ingilis dilində \"myself\" lazım deyil.", ru: "Калька с «чувствую себя»; в английском «myself» не нужно." } },
            { wrong: "I feel badly.", right: "I feel bad.", why: { az: "Feel-dən sonra sifət, zərf yox.", ru: "После feel — прилагательное, а не наречие." } },
            { wrong: "I don't feel like to go out.", right: "I don't feel like going out.", why: { az: "Feel like + -ing.", ru: "Feel like + -ing." } },
            { wrong: "I'm interesting in music.", right: "I'm interested in music.", why: { az: "Hiss: interested; ön söz: in.", ru: "Чувство: interested; предлог: in." } },
            { wrong: "She is angry on me.", right: "She is angry with me.", why: { az: "Angry WITH someone.", ru: "Angry WITH someone." } },
            { wrong: "How does it feel like?", right: "What does it feel like? / How does it feel?", why: { az: "\"Like\" ilə \"what\", \"like\" olmadan \"how\".", ru: "С «like» — «what», без «like» — «how»." } },
          ],
        },
      ],
    },
  ],
  recap: [
    { az: "Feel + sifət (I feel tired); \"myself\" yox.", ru: "Feel + прилагательное (I feel tired); без «myself»." },
    { az: "It feels + sifət + to… / What does it feel like? / feel like + -ing.", ru: "It feels + прилагательное + to… / What does it feel like? / feel like + -ing." },
    { az: "-ed = mənim hissim (bored), -ing = hissin səbəbi (boring).", ru: "-ed = моё чувство (bored), -ing = его причина (boring)." },
    { az: "Dəqiq sözlər: relieved, disappointed, frustrated, anxious, grateful.", ru: "Точные слова: relieved, disappointed, frustrated, anxious, grateful." },
  ],
};
