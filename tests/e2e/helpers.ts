import { expect, type Page } from "@playwright/test";
import type { Exercise } from "../../src/content/types";

/** Answers one exercise correctly (or deliberately wrong) using the authored content. */
export async function answer(page: Page, ex: Exercise, opts: { wrong?: boolean } = {}) {
  switch (ex.type) {
    case "choice": {
      const idx = opts.wrong ? (ex.answer + 1) % ex.options.length : ex.answer;
      await page.getByRole("group", { name: "Options" }).getByRole("button").nth(idx).click();
      break;
    }
    case "fill":
      await page.getByLabel("Your answer").fill(opts.wrong ? "zzz" : ex.accept[0]);
      await page.getByRole("button", { name: "Check", exact: true }).click();
      break;
    case "transform":
    case "correct":
    case "translate":
    case "listen":
      await page.getByLabel("Your answer").fill(opts.wrong ? "completely wrong answer here" : ex.accept[0]);
      await page.getByRole("button", { name: "Check", exact: true }).click();
      break;
    case "order": {
      const bank = page.getByLabel("Word bank");
      for (const t of ex.tiles) await bank.getByRole("button", { name: t, exact: true }).first().click();
      await page.getByRole("button", { name: "Check", exact: true }).click();
      break;
    }
    case "speak": {
      // Headless Chromium has no speech recognition → fallback path.
      const fallback = page.getByRole("button", { name: /I said it aloud|Skip speaking/ }).first();
      await fallback.click();
      break;
    }
    case "reading":
      for (let i = 0; i < ex.questions.length; i++) {
        const q = ex.questions[i];
        await page.getByRole("group", { name: new RegExp(escape(`${i + 1}. ${q.q}`)) }).getByLabel(q.options[q.answer], { exact: true }).check();
      }
      await page.getByRole("button", { name: "Check answers" }).click();
      break;
  }
  await expect(page.getByRole("status").filter({ hasText: /Correct|Also correct|Almost|Not quite|Good practice/ })).toBeVisible();
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error" && !/Failed to load resource.*(401|404)|favicon/.test(m.text())) errors.push(m.text());
  });
  return errors;
}
