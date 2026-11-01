/**
 * Plays every lesson end to end with the authored answers.
 * Needs all days unlocked: run against `DEV_UNLOCK_ALL=true next dev`
 * (see README → Testing). Skipped otherwise.
 */
import { expect, test } from "@playwright/test";
import { LESSON_LIST } from "../../src/content/lessons/registry";
import { answer } from "./helpers";

test.describe("every lesson can be completed with the authored answers", () => {
  test.skip(!process.env.E2E_ALL_LESSONS, "set E2E_ALL_LESSONS=1 with a DEV_UNLOCK_ALL dev server");
  test.setTimeout(240_000);

  for (const lesson of LESSON_LIST) {
    test(`Day ${lesson.day}: ${lesson.title}`, async ({ page }) => {
      await page.goto(`/learn/${lesson.day}`);
      await page.getByRole("button", { name: "Start lesson" }).click();
      const reading = lesson.forms.length ? 4 : 3;
      for (let i = 0; i < reading; i++) await page.getByRole("button", { name: "Continue" }).click();
      for (const s of lesson.guided.steps) await page.getByRole("group", { name: s.label }).getByRole("button", { name: s.options[s.answer], exact: true }).click();
      await page.getByRole("button", { name: "Continue" }).click();
      for (const ex of lesson.practice.filter((e) => e.type !== "translate")) {
        await answer(page, ex);
        const status = page.getByRole("status").filter({ hasText: /Correct|Also correct|Good practice|Not quite|Almost/ });
        if (ex.type !== "speak") await expect(status, `${ex.id} should be correct`).toContainText(/Correct|Also correct/);
        await page.getByRole("button", { name: "Continue" }).last().click();
      }
      await page.getByRole("button", { name: "Continue" }).click(); // words
      await page.getByRole("button", { name: "Continue" }).click(); // dialogue
      for (const [k, ex] of lesson.review.entries()) {
        await answer(page, ex);
        await expect(page.getByRole("status").filter({ hasText: /Correct|Also correct|Not quite|Almost/ }), `${ex.id} should be correct`).toContainText(/Correct|Also correct/);
        await page.getByRole("button", { name: k === lesson.review.length - 1 ? "Finish lesson" : "Continue" }).last().click();
      }
      await expect(page.getByRole("heading", { name: `Day ${lesson.day} complete` })).toBeVisible();
      await expect(page.getByText("100%", { exact: true })).toBeVisible();
    });
  }
});
