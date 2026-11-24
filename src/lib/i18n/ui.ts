/**
 * Interface strings in English, Azerbaijani and Russian.
 * Add a key here, then use it with `const t = useT(); t("nav.today")`.
 */
import type { Lang } from "./index";

type Entry = { en: string; az: string; ru: string };

export const UI = {
  // navigation
  "nav.today": { en: "Today", az: "Bu gün", ru: "Сегодня" },
  "nav.course": { en: "Course", az: "Kurs", ru: "Курс" },
  "nav.intro": { en: "Start here", az: "Buradan başlayın", ru: "Начните здесь" },
  "nav.games": { en: "Games", az: "Oyunlar", ru: "Игры" },
  "nav.speaking": { en: "Speaking", az: "Danışıq", ru: "Говорение" },
  "nav.practice": { en: "Practice", az: "Təkrar", ru: "Практика" },
  "nav.lab": { en: "Lab", az: "Laboratoriya", ru: "Лаборатория" },
  "nav.scenarios": { en: "Conversations", az: "Dialoqlar", ru: "Диалоги" },
  "nav.words": { en: "Words", az: "Sözlər", ru: "Слова" },
  "nav.progress": { en: "Progress", az: "İrəliləyiş", ru: "Прогресс" },
  "nav.profile": { en: "Profile", az: "Profil", ru: "Профиль" },
  "nav.settings": { en: "Settings", az: "Parametrlər", ru: "Настройки" },
  "nav.home": { en: "33English home", az: "33English ana səhifə", ru: "Главная 33English" },

  // sync status
  "sync.local": { en: "Saved on this device", az: "Bu cihazda saxlanılıb", ru: "Сохранено на устройстве" },
  "sync.syncing": { en: "Saving…", az: "Saxlanılır…", ru: "Сохраняется…" },
  "sync.synced": { en: "Synced", az: "Sinxronlaşdırılıb", ru: "Синхронизировано" },
  "sync.offline": { en: "Offline — will sync later", az: "Oflayn — sonra sinxronlaşacaq", ru: "Офлайн — синхронизируем позже" },
  "sync.error": { en: "Sync paused — retrying", az: "Sinxronizasiya dayandı — yenidən cəhd edilir", ru: "Синхронизация приостановлена — повторяем" },

  // language
  "lang.title": { en: "Explanation language", az: "İzah dili", ru: "Язык объяснений" },
  "lang.hint": {
    en: "Lessons, instructions and the menus are shown in this language. English examples stay in English.",
    az: "Dərslər, tapşırıqların izahı və menyular bu dildə göstərilir. İngilis dilində nümunələr ingiliscə qalır.",
    ru: "Уроки, инструкции и меню показываются на этом языке. Английские примеры остаются на английском.",
  },
  "lang.choose": { en: "Choose your explanation language", az: "İzah dilini seçin", ru: "Выберите язык объяснений" },

  // onboarding
  "onb.title": { en: "Find your starting point", az: "Başlanğıc nöqtənizi tapın", ru: "Найдите свою точку старта" },
  "onb.body": {
    en: "18 quick questions, about 4 minutes. It's an estimate to suggest where to begin — not an official level test. Skip any question you don't know; guessing makes the result less useful.",
    az: "18 qısa sual, təxminən 4 dəqiqə. Bu, haradan başlamağı tövsiyə etmək üçün təxmini qiymətləndirmədir, rəsmi səviyyə imtahanı deyil. Bilmədiyiniz sualı ötürün: təxmin etmək nəticəni daha az faydalı edir.",
    ru: "18 коротких вопросов, около 4 минут. Это примерная оценка, чтобы подсказать, с чего начать, а не официальный тест уровня. Пропускайте вопросы, ответа на которые не знаете: угадывание делает результат менее точным.",
  },
  "onb.name": { en: "What should we call you? (optional)", az: "Sizə necə müraciət edək? (istəyə bağlı)", ru: "Как к вам обращаться? (необязательно)" },
  "onb.start": { en: "Start the check", az: "Yoxlamaya başla", ru: "Начать проверку" },
  "onb.skip": { en: "Skip — start Day 1", az: "Ötür — 1-ci gündən başla", ru: "Пропустить — начать с 1-го дня" },
  "onb.intro": { en: "Read the introduction first", az: "Əvvəlcə giriş məsləhətini oxuyun", ru: "Сначала прочитайте вводную консультацию" },
  "onb.dontKnow": { en: "I don't know", az: "Bilmirəm", ru: "Не знаю" },

  // intro consultation
  "intro.kicker": { en: "Before Day 1 · Introductory consultation", az: "1-ci gündən əvvəl · Giriş məsləhəti", ru: "Перед 1-м днём · Вводная консультация" },
  "intro.minutes": { en: "about 12 minutes of reading", az: "təxminən 12 dəqiqəlik oxu", ru: "примерно 12 минут чтения" },
  "intro.cta": { en: "Start Day 1", az: "1-ci günə başla", ru: "Начать 1-й день" },
  "intro.course": { en: "See the whole course", az: "Bütün kursa bax", ru: "Посмотреть весь курс" },
  "intro.card": {
    en: "How the 33-day method works and how to get the most from it.",
    az: "33 günlük metodun necə işlədiyi və ondan maksimum fayda götürmək yolları.",
    ru: "Как устроен 33-дневный метод и как получить от него максимум.",
  },

  // games hub
  "games.lead": {
    en: "Play to practise. Every game uses the same six frames and real everyday vocabulary.",
    az: "Oynayaraq məşq edin. Hər oyun eyni altı çərçivəyə və real gündəlik lüğətə əsaslanır.",
    ru: "Тренируйтесь в игре. Все игры построены на тех же шести рамках и реальной повседневной лексике.",
  },

  // course
  "course.title": { en: "Course", az: "Kurs", ru: "Курс" },
  "course.day": { en: "Day", az: "Gün", ru: "День" },
  "course.introTitle": { en: "Introductory consultation", az: "Giriş məsləhəti", ru: "Вводная консультация" },
  "course.introDay": { en: "Day 0", az: "0-cı gün", ru: "День 0" },

  // lesson player
  "lesson.teach": { en: "Full explanation", az: "Ətraflı izah", ru: "Подробное объяснение" },
  "lesson.translation": { en: "Translation", az: "Tərcümə", ru: "Перевод" },
  "lesson.continue": { en: "Continue", az: "Davam et", ru: "Продолжить" },
  "lesson.back": { en: "Back", az: "Geri", ru: "Назад" },
} satisfies Record<string, Entry>;

export type UIKey = keyof typeof UI;

export function translate(key: UIKey, lang: Lang): string {
  return UI[key][lang];
}
