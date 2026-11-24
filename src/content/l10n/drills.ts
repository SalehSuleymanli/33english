import type { DrillId } from "@/lib/game/drills";

type L = { en: string; az: string; ru: string };

export const DRILL_TEXT: Record<DrillId, { name: L; short: L; how: L; icon: string }> = {
  builder: {
    icon: "🧩",
    name: { en: "Sentence Builder", az: "Cümlə qurucusu", ru: "Конструктор предложений" },
    short: { en: "Put shuffled words in the right order.", az: "Qarışıq sözləri düzgün ardıcıllıqla düzün.", ru: "Расставьте перемешанные слова в правильном порядке." },
    how: { en: "Tap the words in order to build the sentence. Tap a word in your sentence to take it back.", az: "Cümləni qurmaq üçün sözlərə ardıcıllıqla toxunun. Geri qaytarmaq üçün cümlənizdəki sözə toxunun.", ru: "Нажимайте на слова по порядку, чтобы собрать предложение. Нажмите на слово в вашем предложении, чтобы вернуть его." },
  },
  battle: {
    icon: "⚔️",
    name: { en: "Grammar Battle", az: "Qrammatika döyüşü", ru: "Грамматическая битва" },
    short: { en: "Choose the right form before time runs out.", az: "Vaxt bitmədən düzgün formanı seçin.", ru: "Выберите правильную форму, пока не кончилось время." },
    how: { en: "15 seconds per question. Faster right answers earn a speed bonus.", az: "Hər suala 15 saniyə. Sürətli düzgün cavablar əlavə bal qazandırır.", ru: "15 секунд на вопрос. Быстрые правильные ответы дают бонус за скорость." },
  },
  detective: {
    icon: "🔍",
    name: { en: "Error Detective", az: "Səhv detektivi", ru: "Детектив ошибок" },
    short: { en: "Is the sentence right? If not, pick the correction.", az: "Cümlə düzgündür? Deyilsə, düzəlişi seçin.", ru: "Предложение верное? Если нет, выберите исправление." },
    how: { en: "Some sentences are already correct. If you see a mistake, choose the corrected version.", az: "Bəzi cümlələr artıq düzgündür. Səhv görsəniz, düzəldilmiş variantı seçin.", ru: "Некоторые предложения уже верные. Если видите ошибку, выберите исправленный вариант." },
  },
  transform: {
    icon: "🔁",
    name: { en: "Sentence Transformation", az: "Cümlə çevirmə", ru: "Трансформация предложений" },
    short: { en: "Rewrite sentences: negative, question, tense, passive.", az: "Cümlələri dəyişin: inkar, sual, zaman, passive.", ru: "Переделайте предложения: отрицание, вопрос, время, пассив." },
    how: { en: "Read the instruction and type the new sentence. Contractions are fine.", az: "Tapşırığı oxuyun və yeni cümləni yazın. İxtisarlar qəbul olunur.", ru: "Прочитайте задание и напишите новое предложение. Сокращения допускаются." },
  },
  vocab: {
    icon: "🔤",
    name: { en: "Vocabulary Challenge", az: "Söz yarışı", ru: "Словарный вызов" },
    short: { en: "Match English words with their meanings.", az: "İngilis sözlərini mənaları ilə uyğunlaşdırın.", ru: "Сопоставьте английские слова с их значениями." },
    how: { en: "Tap an English word, then its meaning. Three sets of five words.", az: "İngilis sözünə, sonra onun mənasına toxunun. Beş sözdən ibarət üç dəst.", ru: "Нажмите на английское слово, затем на его значение. Три набора по пять слов." },
  },
  gap: {
    icon: "✏️",
    name: { en: "Fill in the Gap", az: "Boşluğu doldur", ru: "Заполни пропуск" },
    short: { en: "Type the missing grammar form.", az: "Buraxılmış qrammatik formanı yazın.", ru: "Впишите пропущенную грамматическую форму." },
    how: { en: "Type the word or words that complete the sentence correctly.", az: "Cümləni düzgün tamamlayan söz(lər)i yazın.", ru: "Впишите слово или слова, которые правильно дополняют предложение." },
  },
};

export const DRILL_UI = {
  start: { en: "Start", az: "Başla", ru: "Начать" },
  check: { en: "Check", az: "Yoxla", ru: "Проверить" },
  next: { en: "Next", az: "Növbəti", ru: "Дальше" },
  finish: { en: "See results", az: "Nəticələrə bax", ru: "Результаты" },
  again: { en: "Play again", az: "Yenidən oyna", ru: "Играть снова" },
  allGames: { en: "All games", az: "Bütün oyunlar", ru: "Все игры" },
  right: { en: "Right!", az: "Düzgün!", ru: "Верно!" },
  wrong: { en: "Not quite.", az: "Düz deyil.", ru: "Не совсем." },
  answerIs: { en: "Correct answer:", az: "Düzgün cavab:", ru: "Правильный ответ:" },
  correctAsIs: { en: "It's correct as it is", az: "Cümlə düzgündür", ru: "Предложение верное" },
  shouldBe: { en: "Should be:", az: "Belə olmalıdır:", ru: "Должно быть:" },
  timeUp: { en: "Time's up!", az: "Vaxt bitdi!", ru: "Время вышло!" },
  score: { en: "Score", az: "Xal", ru: "Счёт" },
  best: { en: "Best", az: "Ən yaxşı", ru: "Лучший" },
  plays: { en: "Played", az: "Oynanılıb", ru: "Сыграно" },
  never: { en: "Not played yet", az: "Hələ oynanılmayıb", ru: "Ещё не играли" },
  typeHere: { en: "Type your answer", az: "Cavabınızı yazın", ru: "Введите ответ" },
  clear: { en: "Clear", az: "Təmizlə", ru: "Очистить" },
  review: { en: "Your answers", az: "Cavablarınız", ru: "Ваши ответы" },
  saving: { en: "Saving XP…", az: "XP saxlanılır…", ru: "Сохраняем XP…" },
  xpGuest: { en: "Sign in to save XP and your best scores across devices.", az: "XP və ən yaxşı nəticələrinizi saxlamaq üçün daxil olun.", ru: "Войдите, чтобы сохранять XP и лучшие результаты на всех устройствах." },
  results: { en: "Round complete", az: "Raund bitdi", ru: "Раунд завершён" },
  practiceGames: { en: "Practice games", az: "Məşq oyunları", ru: "Тренировочные игры" },
  practiceGamesBody: { en: "Short rounds that train one skill at a time. Scores, explanations and XP.", az: "Hər dəfə bir bacarığı məşq etdirən qısa raundlar. Xal, izah və XP.", ru: "Короткие раунды, каждый тренирует один навык. Очки, объяснения и XP." },
} satisfies Record<string, L>;
