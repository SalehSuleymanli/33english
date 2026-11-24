/** All exams and reading tests. */
import type { Test, TestLevel } from "./types";
import { EXAM_FOUNDATION } from "./exam-foundation";
import { EXAM_EXPANSION } from "./exam-expansion";
import { EXAM_COMMUNICATION } from "./exam-communication";
import { EXAM_FINAL } from "./exam-final";
import { READING_BEGINNER } from "./reading-beginner";
import { READING_ELEMENTARY } from "./reading-elementary";
import { READING_INTERMEDIATE } from "./reading-intermediate";
import { READING_UPPER } from "./reading-upper";
import { READING_ADVANCED } from "./reading-advanced";

export const EXAMS: Test[] = [EXAM_FOUNDATION, EXAM_EXPANSION, EXAM_COMMUNICATION, EXAM_FINAL];
export const READINGS: Test[] = [...READING_BEGINNER, ...READING_ELEMENTARY, ...READING_INTERMEDIATE, ...READING_UPPER, ...READING_ADVANCED];
export const ALL_TESTS: Test[] = [...EXAMS, ...READINGS];

const BY_ID = new Map(ALL_TESTS.map((t) => [t.id, t]));
export const testById = (id: string) => BY_ID.get(id);

export const LEVELS: { id: TestLevel; en: string; az: string; ru: string }[] = [
  { id: "beginner", en: "Beginner", az: "Başlanğıc", ru: "Начальный" },
  { id: "elementary", en: "Elementary", az: "Elementar", ru: "Элементарный" },
  { id: "intermediate", en: "Intermediate", az: "Orta", ru: "Средний" },
  { id: "upper-intermediate", en: "Upper-Intermediate", az: "Ortadan yuxarı", ru: "Выше среднего" },
  { id: "advanced", en: "Advanced", az: "İrəli", ru: "Продвинутый" },
];

export const EXAMS_IDS = EXAMS.map((t) => t.id);
export const READING_IDS = READINGS.map((t) => t.id);
