import { test } from "@playwright/test";
import day01 from "../../src/content/lessons/day01";
import { answer } from "../e2e/helpers";

const OUT = process.env.SHOT_DIR ?? "test-results/shots";

test("screens", async ({ page }) => {
  test.setTimeout(240_000);
  // build real progress: complete Day 1, miss one item in Day 2
  await page.goto("/learn/1");
  await page.screenshot({ path: `${OUT}/m-lesson-intro.png` });
  await page.getByRole("button", { name: "Start lesson" }).click();
  await page.screenshot({ path: `${OUT}/m-lesson-learn.png`, fullPage: true });
  await page.getByRole("button", { name: "Continue" }).click();
  await page.screenshot({ path: `${OUT}/m-lesson-examples.png` });
  for (let i = 0; i < 3; i++) await page.getByRole("button", { name: "Continue" }).click();
  for (const s of day01.guided.steps) await page.getByRole("button", { name: s.options[s.answer], exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  for (const ex of day01.practice.filter((e) => e.type !== "translate")) {
    await answer(page, ex, { wrong: ex.id === "d01-p05" });
    if (ex.id === "d01-p05") await page.screenshot({ path: `${OUT}/m-feedback-wrong.png`, fullPage: true });
    if (ex.id === "d01-p04") await page.screenshot({ path: `${OUT}/m-order.png`, fullPage: true });
    await page.getByRole("button", { name: "Continue" }).last().click();
  }
  await page.getByRole("button", { name: "Continue" }).click();
  await page.screenshot({ path: `${OUT}/m-dialogue.png`, fullPage: true });
  await page.getByRole("button", { name: "Continue" }).click();
  for (const [k, ex] of day01.review.entries()) {
    await answer(page, ex);
    await page.getByRole("button", { name: k === day01.review.length - 1 ? "Finish lesson" : "Continue" }).last().click();
  }
  await page.screenshot({ path: `${OUT}/m-done.png`, fullPage: true });
  for (const [name, path] of [["today", "/today"], ["course", "/course"], ["practice", "/practice"], ["progress", "/progress"], ["lab", "/lab"], ["pricing", "/pricing"], ["scenario", "/scenarios/first-meeting"], ["method", "/method"]] as const) {
    await page.goto(path);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/m-${name}.png`, fullPage: true });
  }
});
