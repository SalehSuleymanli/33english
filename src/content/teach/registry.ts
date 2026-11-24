/** All full explanations by day. Import through ./index on the server (it adds the server-only guard). */
import type { Teach } from "./types";
import { TEACH_01 } from "./day01";
import { TEACH_02 } from "./day02";
import { TEACH_03 } from "./day03";
import { TEACH_04 } from "./day04";
import { TEACH_05 } from "./day05";
import { TEACH_06 } from "./day06";
import { TEACH_07 } from "./day07";
import { TEACH_08 } from "./day08";
import { TEACH_09 } from "./day09";
import { TEACH_10 } from "./day10";
import { TEACH_11 } from "./day11";

export const TEACH: Record<number, Teach> = Object.fromEntries([TEACH_01, TEACH_02, TEACH_03, TEACH_04, TEACH_05, TEACH_06, TEACH_07, TEACH_08, TEACH_09, TEACH_10, TEACH_11].map((t) => [t.day, t]));
