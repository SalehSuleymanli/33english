/**
 * Content model for the 33-day course.
 * Lessons are authored as typed data so they are reviewable, testable,
 * and can gain translations later through the optional `l10n` fields.
 */

export type FrameId =
  | "existence"
  | "states"
  | "actions"
  | "modals"
  | "possession"
  | "passive";

export type Stage =
  | "foundation"
  | "checkpoint"
  | "expansion"
  | "combination"
  | "communication"
  | "application";

/** Optional translations keyed by language code (e.g. "az"). */
export type L10n = Partial<Record<string, string>>;

/** One colored slot in a structure diagram, e.g. [Subject] [am/is/are] [complement]. */
export type Slot = {
  label: string; // what goes here, e.g. "Subject"
  text?: string; // example filler, e.g. "She"
  role: SlotRole;
  optional?: boolean;
};

export type SlotRole =
  | "subject"
  | "there"
  | "be"
  | "aux"
  | "modal"
  | "verb"
  | "object"
  | "complement"
  | "time"
  | "place"
  | "connector"
  | "question"
  | "negation"
  | "other";

export type Pattern = {
  name: string; // "Affirmative · present"
  slots: Slot[];
};

export type Example = {
  en: string;
  note?: string; // why it works
  register?: "neutral" | "formal" | "informal";
  l10n?: L10n;
};

export type FormSet = {
  label: string; // e.g. "Present"
  positive: string;
  negative: string;
  question: string;
  shortAnswers?: string;
};

export type Mistake = {
  wrong: string;
  right: string;
  why: string;
};

export type VocabItem = {
  term: string;
  meaning: string;
  example: string;
  l10n?: L10n;
};

export type DialogueLine = { speaker: string; line: string };

export type Dialogue = {
  title: string;
  setting: string;
  lines: DialogueLine[];
  /** Phrases worth noticing in the dialogue. */
  focus: string[];
};

/* ---------------- Exercises ---------------- */

type ExerciseBase = {
  id: string; // globally unique, e.g. "d01-e03"
  prompt: string;
  /** Shown after answering, whether right or wrong. */
  explanation: string;
  frame?: FrameId;
  skill?: Skill;
};

export type Skill =
  | "form"
  | "meaning"
  | "word-order"
  | "questions"
  | "negatives"
  | "tense"
  | "vocabulary"
  | "listening"
  | "reading"
  | "speaking"
  | "writing";

export type ChoiceExercise = ExerciseBase & {
  type: "choice";
  options: string[];
  answer: number; // index into options
  /** Optional per-option feedback for wrong picks. */
  optionFeedback?: Record<number, string>;
};

export type TextAnswer = {
  /** Accepted answers. The first is the model answer. */
  accept: string[];
  /** Grammatically valid alternatives that differ from the target — counted correct with a note. */
  alternatives?: { text: string; note: string }[];
  /** Predictable wrong answers mapped to targeted feedback. */
  traps?: { text: string; feedback: string }[];
};

export type FillExercise = ExerciseBase &
  TextAnswer & {
    type: "fill";
    /** Sentence with a single "___" gap. */
    sentence: string;
    hint?: string;
  };

export type TransformExercise = ExerciseBase &
  TextAnswer & {
    type: "transform";
    source: string;
    instruction: string; // "Make it negative."
  };

export type CorrectExercise = ExerciseBase &
  TextAnswer & {
    type: "correct";
    wrong: string;
  };

export type OrderExercise = ExerciseBase & {
  type: "order";
  /** Tiles in the correct order; the player shuffles them. */
  tiles: string[];
  /** Other valid orders (as full strings). */
  alsoValid?: string[];
};

export type TranslateExercise = ExerciseBase &
  TextAnswer & {
    type: "translate";
    /** Language of the source text. Only shown to learners with that native language. */
    from: string;
    source: string;
  };

export type ListenExercise = ExerciseBase &
  TextAnswer & {
    type: "listen";
    /** Spoken with speech synthesis; the learner types what they hear. */
    audioText: string;
  };

export type SpeakExercise = ExerciseBase & {
  type: "speak";
  target: string;
};

export type ReadingExercise = ExerciseBase & {
  type: "reading";
  passage: string;
  questions: { q: string; options: string[]; answer: number; why: string }[];
};

export type Exercise =
  | ChoiceExercise
  | FillExercise
  | TransformExercise
  | CorrectExercise
  | OrderExercise
  | TranslateExercise
  | ListenExercise
  | SpeakExercise
  | ReadingExercise;

export type ExerciseType = Exercise["type"];

/* ---------------- Guided builder ---------------- */

/** Step-by-step sentence construction: the learner picks one chip per step. */
export type GuidedBuild = {
  goal: string; // "Build: 'There are two cafés near my office.'"
  steps: {
    label: string; // "Choose the existence opener"
    role: SlotRole;
    options: string[];
    answer: number;
    why: string;
  }[];
  result: string;
};

/* ---------------- Lesson ---------------- */

export type Lesson = {
  day: number;
  stage: Stage;
  frame?: FrameId; // primary frame, if any
  title: string;
  objective: string;
  /** Link back to earlier learning. */
  builds_on: string;
  /** What the learner can do after the lesson. */
  outcome: string;
  minutes: number;
  explanation: string[]; // short paragraphs in simple English
  patterns: Pattern[];
  examples: Example[];
  forms: FormSet[];
  mistakes: Mistake[];
  guided: GuidedBuild;
  practice: Exercise[];
  vocabulary: VocabItem[];
  dialogue: Dialogue;
  review: Exercise[];
  /** Optional sentence-lab seed IDs to explore after the lesson. */
  labSeeds?: string[];
  l10n?: { explanation?: Record<string, string[]> };
};

export type LessonSummary = Pick<
  Lesson,
  "day" | "stage" | "frame" | "title" | "objective" | "outcome" | "minutes"
> & { scenario: string };
