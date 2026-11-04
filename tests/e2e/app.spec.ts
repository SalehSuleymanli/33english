import { expect, test } from "@playwright/test";
import day01 from "../../src/content/lessons/day01";
import day02 from "../../src/content/lessons/day02";
import { answer, collectErrors } from "./helpers";
import { generatePuzzle } from "../../src/lib/game/crossword";

const PUBLIC = ["/", "/method", "/journey", "/curriculum", "/pricing", "/faq", "/privacy", "/terms", "/login", "/signup", "/forgot-password", "/reset-password"];
const APP = ["/today", "/course", "/practice", "/lab", "/words", "/progress", "/scenarios", "/settings", "/billing", "/onboarding", "/scenarios/first-meeting", "/learn/1", "/games", "/speaking", "/speaking/dream-house", "/profile", "/play/crossword", "/play/quest"];

test.describe("routes", () => {
  for (const path of [...PUBLIC, ...APP]) {
    test(`renders ${path} without errors`, async ({ page }) => {
      const errors = collectErrors(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  }

  test("unknown lesson days and scenarios are real 404s", async ({ page }) => {
    for (const p of ["/learn/99", "/learn/0", "/learn/abc", "/scenarios/nope", "/speaking/nope", "/no-such-page"]) {
      const res = await page.goto(p);
      expect(res?.status(), p).toBe(404);
    }
    await expect(page.getByText("page here")).toBeVisible();
  });
});

test.describe("learning flow", () => {
  test("completes Day 1, persists after reload, unlocks achievements", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/learn/1");
    await page.getByRole("button", { name: "Start lesson" }).click();
    // reading steps until the guided builder
    for (let i = 0; i < 4; i++) await page.getByRole("button", { name: "Continue" }).click();
    for (const s of day01.guided.steps) await page.getByRole("button", { name: s.options[s.answer], exact: true }).click();
    await expect(page.getByText(day01.guided.result).first()).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).click();

    // practice (translation items are hidden unless the learner's language is Azerbaijani)
    for (const ex of day01.practice.filter((e) => e.type !== "translate")) {
      await answer(page, ex);
      await page.getByRole("button", { name: "Continue" }).last().click();
    }
    // words: save one, then dialogue
    await page.getByRole("button", { name: `Save ${day01.vocabulary[0].term}` }).click();
    await expect(page.getByRole("button", { name: `${day01.vocabulary[0].term} saved` })).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByRole("heading", { name: day01.dialogue.title })).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).click();

    // review
    for (const [k, ex] of day01.review.entries()) {
      await answer(page, ex);
      await page.getByRole("button", { name: k === day01.review.length - 1 ? "Finish lesson" : "Continue" }).last().click();
    }
    await expect(page.getByRole("heading", { name: "Day 1 complete" })).toBeVisible();
    await expect(page.getByText("100%", { exact: true })).toBeVisible();
    await expect(page.getByText(/Achievement:/).first()).toBeVisible();

    // persistence
    await page.goto("/today");
    await expect(page.getByText("1 of 33 days complete.")).toBeVisible();
    await expect(page.getByRole("heading", { name: day02.title })).toBeVisible();
    await page.reload();
    await expect(page.getByText("1 of 33 days complete.")).toBeVisible();
    await page.goto("/course");
    await expect(page.getByRole("link", { name: /Day 1: There is, there are/ })).toContainText("best 100%");
    await page.goto("/words");
    await expect(page.getByText(day01.vocabulary[0].term, { exact: true })).toBeVisible();
    await page.goto("/progress");
    await expect(page.getByText("1/33")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("mistakes go into review, and review reschedules them", async ({ page }) => {
    await page.goto("/learn/2");
    await page.getByRole("button", { name: "Start lesson" }).click();
    for (let i = 0; i < 4; i++) await page.getByRole("button", { name: "Continue" }).click();
    for (const s of day02.guided.steps) await page.getByRole("button", { name: s.options[s.answer], exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    // answer the first practice item wrong, the second right
    await answer(page, day02.practice[0], { wrong: true });
    await expect(page.getByText("Not quite")).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).last().click();
    await answer(page, day02.practice[1], { wrong: true });
    await expect(page.getByText(/Compared with the answer/)).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).last().click();

    // leave mid-lesson → resume is offered
    await page.goto("/today");
    await expect(page.getByText("Continue where you left off · Day 2")).toBeVisible();
    await page.getByRole("link", { name: "Resume lesson" }).click();
    await expect(page.getByRole("button", { name: "Resume where I left off" })).toBeVisible();

    // review queue
    await page.goto("/practice");
    await expect(page.getByText(/2 items ready/)).toBeVisible();
    await page.getByRole("button", { name: "Start review" }).click();
    await answer(page, day02.practice[0]);
    await page.getByRole("button", { name: "Continue" }).last().click();
    await answer(page, day02.practice[1]);
    await page.getByRole("button", { name: "Continue" }).last().click();
    await expect(page.getByText("2 of 2 correct.")).toBeVisible();
    await page.getByRole("button", { name: "Back to Practice" }).click();
    await expect(page.getByText(/You're up to date/)).toBeVisible();
  });
});

test.describe("access control", () => {
  test("premium days show the paywall and never send lesson content", async ({ page }) => {
    const res = await page.goto("/learn/8");
    expect(res?.status()).toBe(200);
    await expect(page.getByText("This day is part of Premium.", { exact: false })).toBeVisible();
    const html = await page.content();
    // a distinctive sentence from Day 8's content must not be in the page
    expect(html).not.toContain("When I was a child, I could climb trees easily.");
  });

  test("premium scenarios are gated", async ({ page }) => {
    await page.goto("/scenarios/interview");
    await expect(page.getByText("This conversation is part of Premium.")).toBeVisible();
    expect(await page.content()).not.toContain("front desk");
  });

  test("exercise API only returns accessible content", async ({ request }) => {
    const res = await request.post("/api/exercises", { data: { ids: ["d01-p01", "d08-p01", "d33-r01"] } });
    const json = await res.json();
    expect(json.exercises.map((e: { id: string }) => e.id)).toEqual(["d01-p01"]);
    const bad = await request.post("/api/exercises", { data: { ids: "nope" } });
    expect(bad.status()).toBe(400);
    const day = await request.post("/api/exercises", { data: { day: 9 } });
    expect((await day.json()).exercises).toEqual([]);
  });

  test("entitlement endpoint reports free access", async ({ request }) => {
    const json = await (await request.get("/api/entitlement")).json();
    expect(json).toMatchObject({ signedIn: false, premium: false });
  });

  test("webhook rejects unsigned requests", async ({ request }) => {
    const res = await request.post("/api/webhooks/paddle", { data: { event_type: "subscription.created" } });
    expect(res.status()).toBe(401);
  });

  test("auth callback refuses open redirects", async ({ page }) => {
    await page.goto("/auth/callback?next=//evil.example.com");
    expect(new URL(page.url()).hostname).toBe("localhost");
    expect(page.url()).toContain("/login");
  });
});

test.describe("tools", () => {
  test("Sentence Lab transforms and explains", async ({ page }) => {
    await page.goto("/lab");
    await expect(page.locator(".specimen").first()).toContainText("I work at a bank.");
    await page.getByRole("button", { name: "Past", exact: true }).click();
    await expect(page.locator(".specimen").first()).toContainText("I worked at a bank.");
    await page.getByRole("button", { name: "Question", exact: true }).click();
    await expect(page.locator(".specimen").first()).toContainText("Did I work at a bank?");
    await page.getByRole("tab", { name: /Passive/ }).click();
    await expect(page.locator(".specimen").first()).toContainText(/ (is|are) /);
    // a refusal with a reason
    await page.getByRole("tab", { name: /Possession/ }).click();
    await page.getByRole("button", { name: "In progress", exact: true }).click();
    await expect(page.getByText("Not used in natural English")).toBeVisible();
    // challenge mode
    await page.getByRole("tab", { name: "Challenge" }).click();
    await page.getByLabel("Your sentence").fill("something wrong");
    await page.getByRole("button", { name: "Check" }).click();
    await expect(page.getByText(/Not quite|Almost/)).toBeVisible();
  });

  test("placement suggests a starting day", async ({ page }) => {
    await page.goto("/onboarding");
    await page.getByRole("button", { name: "Start the check" }).click();
    for (let i = 0; i < 18; i++) await page.getByRole("button", { name: "I don't know" }).click();
    await expect(page.getByRole("heading", { name: "Suggested start: Day 1" })).toBeVisible();
    await expect(page.getByText(/not an official CEFR level/)).toBeVisible();
  });

  test("settings persist and streaks can be turned off", async ({ page }) => {
    await page.goto("/settings");
    await page.getByRole("switch", { name: "Streaks" }).click();
    await page.getByLabel("Daily goal").selectOption("30");
    await page.reload();
    await expect(page.getByRole("switch", { name: "Streaks" })).toHaveAttribute("aria-checked", "false");
    await expect(page.getByLabel("Daily goal")).toHaveValue("30");
  });

  test("words can be added and removed", async ({ page }) => {
    await page.goto("/words");
    await page.getByRole("button", { name: "Add a word" }).click();
    await page.getByLabel("Word or phrase").fill("on the verge of");
    await page.getByLabel("Meaning").fill("very close to");
    await page.getByRole("button", { name: "Save word" }).click();
    await expect(page.getByText("on the verge of", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Remove on the verge of" }).click();
    await expect(page.getByText("on the verge of", { exact: true })).toHaveCount(0);
  });

  test("scenario can be completed", async ({ page }) => {
    await page.goto("/scenarios/first-meeting");
    await page.getByRole("button", { name: "Check your understanding" }).click();
    await page.getByRole("group", { name: "Options" }).getByRole("button").nth(1).click();
    await page.getByRole("button", { name: "Continue" }).last().click();
    await page.getByRole("group", { name: "Options" }).getByRole("button").nth(2).click();
    await page.getByRole("button", { name: "Continue" }).last().click();
    for (let i = 0; i < 2; i++) {
      await page.getByRole("button", { name: /I said it aloud|Skip speaking/ }).first().click();
      await page.getByRole("button", { name: "Continue" }).last().click();
    }
    await expect(page.getByText("Conversation complete.")).toBeVisible();
  });
});

test.describe("mobile @mobile", () => {
  test("app navigation and lesson fit a phone screen", async ({ page }) => {
    for (const path of ["/", "/today", "/learn/1", "/lab", "/pricing"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${path} scrolls horizontally`).toBeLessThanOrEqual(1);
    }
    await page.goto("/today");
    await expect(page.getByRole("navigation", { name: "App" }).last()).toBeVisible();
  });
});

test.describe("games and speaking", () => {
  test("solve a crossword end to end", async ({ page }) => {
    const errors = collectErrors(page);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/play/crossword");
    await page.getByRole("button", { name: /Play/ }).first().click();
    const p = generatePuzzle("easy-1")!;
    const acrossCount = p.entries.filter((e) => e.dir === "across").length;
    const clues = page.locator("aside li button");
    const n = await clues.count();
    expect(n).toBe(p.entries.length);
    for (let i = 0; i < n; i++) {
      const num = parseInt(await clues.nth(i).innerText());
      const e = p.entries.find((x) => x.num === num && x.dir === (i < acrossCount ? "across" : "down"))!;
      await clues.nth(i).click();
      for (const ch of e.answer) await page.keyboard.press(ch);
    }
    await expect(page.getByText("Brilliant!")).toBeVisible();
    await expect(page.getByText(p.entries[0].example)).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("Word Quest: start a battle, answer, see feedback and a tip", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/play/quest");
    await page.getByRole("button", { name: "Stage 1", exact: true }).click();
    await expect(page.getByRole("progressbar", { name: /Pip health/ })).toBeVisible();
    const attack = page.getByRole("button", { name: /Attack!/ });
    if (await attack.isVisible()) {
      const tiles = page.locator("section[aria-live] button.border-line-strong:not([disabled])");
      while (await tiles.count()) await tiles.first().click();
      await attack.click();
    } else {
      await page.locator("section[aria-live] .grid button").first().click();
    }
    await expect(page.getByText("💡").first()).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("speaking topic: grammar-rich answer highlights the frames", async ({ page }) => {
    await page.goto("/speaking/dream-house");
    await page.getByRole("tab", { name: "Grammar-rich answer" }).click();
    await expect(page.getByRole("heading", { name: "Grammar breakdown" })).toBeVisible();
    await expect(page.locator("mark").first()).toBeVisible();
    await page.getByRole("tab", { name: "Speaking card" }).click();
    await page.getByRole("button", { name: "Start practice" }).click();
    await page.getByRole("button", { name: /ready to speak/ }).click();
    await page.getByRole("button", { name: /finished/ }).click();
    await expect(page.getByRole("button", { name: /Mark as completed/ })).toBeVisible();
  });

  test("rewards API refuses guests and bad claims", async ({ request }) => {
    const get = await request.get("/api/rewards");
    expect([401, 503]).toContain(get.status());
    const post = await request.post("/api/rewards", { data: { type: "quest", stageId: "w1-s1" } });
    expect([400, 503]).toContain(post.status());
  });
});
