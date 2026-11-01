# Project status

_Last updated: 27 October 2026._ This file is the hand-over point between work sessions: read it first, then continue from the code.

## Summary
All six phases are implemented. The product runs end to end without any external keys (device-only mode). Accounts/sync and payments are fully coded and switch on with credentials; they have **not** been exercised against a live Supabase project or Paddle account, because none exist yet.

## Phase by phase

| Phase | Status | Tested how |
|---|---|---|
| 1 Blueprint & curriculum | Done — `docs/BLUEPRINT.md` | Reviewed |
| 2 Design system, site, foundation | Done — brand, light/dark, 10 public pages, auth pages, Supabase clients, session proxy, migrations | E2E: every route renders with no console errors; mobile overflow check |
| 3 Engine, exercises, 33 lessons | Done — rule-based engine (6 frames × tense/aspect/polarity/mood/modal/voice/contractions), Sentence Lab + challenges, 9 exercise types, 33 complete lessons | Unit: 2,000+ engine combinations, exact-sentence assertions per frame; content validation for all 33 days; **E2E: every lesson completed in the browser at 100% with authored answers** |
| 4 Retention & communication | Done — Leitner review, mistakes practice, per-day review, vocabulary, bookmarks, progress by frame/skill, achievements, optional streaks, 13 scenarios, TTS, speech recognition (transcript match), placement | Unit (scheduler, reducers, achievements, placement); E2E (mistake → review → rescheduled, resume, settings, words, scenario, placement) |
| 5 Monetization & security | Done — free Days 1–7, server-side gating of lessons/scenarios/exercise API, Paddle checkout, verified webhook, customer portal, RLS | Unit (signature, event mapping); E2E (paywall, no premium content in HTML/API, unsigned webhook rejected, open redirect blocked); **RLS tested on real Postgres** |
| 6 Testing & launch | Done — 199 unit tests, 38 E2E tests, 33-lesson playthrough, RLS suite, deployment guide, launch checklist | — |

## Not yet verified (needs credentials)
- Real sign-up / sign-in / email links against a Supabase project
- Sync of progress to the database and guest → account merge in a live browser (logic is unit-tested)
- Paddle sandbox checkout → webhook → unlock → portal cancellation

## Decisions needed from the founder
1. Payment provider: Paddle is integrated (merchant of record; Azerbaijan not excluded). Confirm eligibility with Paddle.
2. Prices ($9.99/month, $59.99/year are placeholders) and free tier (Days 1–7).
3. Brand name "Structa" — trademark/domain check.
4. Approve the flagged method changes (BLUEPRINT §2) and review Days 27–33 and Azerbaijani translations.

## Suggested next work
- Azerbaijani explanations (`l10n` fields exist in the content model) — high value for your audience
- Recorded native audio to replace device voices for dialogues
- A pronunciation-assessment service behind the existing speaking interface
- Analytics (privacy-friendly) and error monitoring
- More scenarios and an "after 33 days" advanced path
