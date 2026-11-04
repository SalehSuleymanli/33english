/** Valid route ids, kept dependency-free so proxy.ts can use them. Tests keep them in sync with content. */
export const TOTAL_LESSON_DAYS = 33;
export const SCENARIO_IDS = [
  "first-meeting",
  "directions",
  "cafe-order",
  "routine",
  "trip-story",
  "experiences",
  "plans",
  "interview",
  "workplace",
  "opinions",
  "disagree",
  "airport",
  "story",
] as const;

/** Speaking topic ids (kept here so the proxy stays small; a test checks they match the content). */
export const SPEAKING_TOPIC_IDS = [
  "best-friend",
  "favourite-movie",
  "dream-house",
  "daily-routine",
  "memorable-experience",
  "future-plans",
  "person-admire",
  "favourite-food",
  "place-to-visit",
  "challenge-overcame",
  "ideal-job",
  "something-to-learn",
  "hometown",
  "perfect-weekend",
  "gift",
  "hobby",
  "cant-live-without",
  "childhood-memory",
  "teacher-helped",
  "celebration",
] as const;
