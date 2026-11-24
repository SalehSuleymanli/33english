import { describe, expect, test, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { TEACH } from "@/content/teach";
import { INTRO, INTRO_FRAMES, INTRO_STAGES } from "@/content/intro";
import { UI } from "@/lib/i18n/ui";
import { getLesson } from "@/content/lessons";

/** Walk any content object and collect every {az, ru} pair. */
function locs(x: unknown, out: { az: unknown; ru: unknown; path: string }[] = [], path = ""): typeof out {
  if (Array.isArray(x)) x.forEach((v, i) => locs(v, out, `${path}[${i}]`));
  else if (x && typeof x === "object") {
    const o = x as Record<string, unknown>;
    if ("az" in o && "ru" in o) out.push({ az: o.az, ru: o.ru, path });
    for (const [k, v] of Object.entries(o)) if (k !== "az" && k !== "ru") locs(v, out, `${path}.${k}`);
  }
  return out;
}

const filled = (v: unknown) => (typeof v === "string" ? v.trim().length > 0 : Array.isArray(v) && v.length > 0 && v.every((s) => typeof s === "string" && s.trim()));

describe("Azerbaijani and Russian content", () => {
  test("every interface string exists in all three languages", () => {
    for (const [k, v] of Object.entries(UI)) for (const l of ["en", "az", "ru"] as const) expect(v[l].trim(), `${k}.${l}`).not.toBe("");
  });
  test("the intro consultation is complete in both languages", () => {
    const all = locs([INTRO, INTRO_FRAMES, INTRO_STAGES]);
    expect(all.length).toBeGreaterThan(40);
    for (const l of all) {
      expect(filled(l.az), `az ${l.path}`).toBe(true);
      expect(filled(l.ru), `ru ${l.path}`).toBe(true);
      if (Array.isArray(l.az)) expect((l.ru as string[]).length, `paragraph count ${l.path}`).toBe(l.az.length);
    }
  });
  test("lesson explanations: complete, both languages, attached to the lesson", () => {
    for (const t of Object.values(TEACH)) {
      expect(getLesson(t.day)?.teach).toBe(t);
      expect(new Set(t.sections.map((s) => s.id)).size, `day ${t.day} section ids`).toBe(t.sections.length);
      expect(t.sections.length, `day ${t.day} sections`).toBeGreaterThanOrEqual(6);
      expect(t.recap.length).toBeGreaterThanOrEqual(3);
      for (const l of locs(t)) {
        expect(filled(l.az), `day ${t.day} az ${l.path}`).toBe(true);
        expect(filled(l.ru), `day ${t.day} ru ${l.path}`).toBe(true);
      }
      const kinds = new Set(t.sections.flatMap((s) => s.blocks.map((b) => b.kind)));
      for (const k of ["formula", "table", "examples", "mistakes"]) expect(kinds.has(k as never), `day ${t.day} has ${k}`).toBe(true);
      for (const s of t.sections) for (const b of s.blocks) if (b.kind === "table") for (const r of b.rows) expect(r.length, `day ${t.day} ${s.id} table row`).toBe(b.head.length);
      const examples = t.sections.flatMap((s) => s.blocks.flatMap((b) => (b.kind === "examples" ? b.items : [])));
      expect(examples.length, `day ${t.day} examples`).toBeGreaterThanOrEqual(10);
    }
  });
});
