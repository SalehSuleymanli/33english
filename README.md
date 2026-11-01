# Structa — Six frames. Every sentence.

A 33-day English course built on six sentence frames (Existence, States, Actions, Modals, Possession, Passive), with an interactive sentence engine, spaced review, real-life conversations, accounts and subscriptions.

- **Product blueprint and curriculum map:** [`docs/BLUEPRINT.md`](docs/BLUEPRINT.md)
- **Deployment, environment and launch checklist:** [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- **What's done, what's next:** [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md)

## Quick start

```bash
npm install
cp .env.example .env.local      # optional: works without any keys
npm run dev                     # http://localhost:3000
```

With no keys, the app runs fully in **device-only mode**: all free lessons, the Sentence Lab, review and progress work, saved in the browser. Accounts, sync and payments switch on when you add Supabase and Paddle keys (see `docs/DEPLOYMENT.md`).

To try the whole course locally without a subscription, add `DEV_UNLOCK_ALL=true` to `.env.local`. It is ignored in production builds.

## What's inside

| Area | Where |
|---|---|
| 33 lessons (typed content) | `src/content/lessons/dayNN.ts` |
| Curriculum, frames, scenarios, placement | `src/content/` |
| Sentence engine (rule-based) | `src/engine/build.ts`, `lexicon.ts`, `seeds.ts`, `challenges.ts` |
| Answer checking | `src/engine/check.ts` |
| Spaced repetition (Leitner) | `src/engine/srs.ts` |
| Progress state, sync, achievements | `src/lib/learner/` |
| Access control (server) | `src/lib/entitlements.ts`, `src/app/learn/[day]/page.tsx` |
| Payments (Paddle) | `src/lib/payments/paddle.ts`, `src/app/api/webhooks/paddle` |
| Database + row-level security | `supabase/migrations/` |

### Editing lessons
Each day is one file. After adding or renaming a day file, run `npm run gen:registry`. Then `npm test` checks every lesson for completeness and consistency (for example, a "trap" wrong answer that's accidentally identical to an accepted one).

Inline `**bold**` in explanations, notes and feedback is shown in the frame's color.

## Testing

```bash
npm test                 # unit: engine, checker, scheduler, state, sync, payments, all lesson content
npm run build && CHROME=<optional chromium path> npm run test:e2e   # end-to-end on a production build
npm run test:rls         # applies migrations to a throwaway Postgres and tests row-level security (needs postgres binaries; run as a non-root user)
# Play all 33 lessons through the UI with their authored answers:
DEV_UNLOCK_ALL=true npx next dev -p 3300   # in one terminal
npm run test:lessons                         # in another
```

## Stack
Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Supabase (Auth + Postgres + RLS), Paddle Billing, Vitest, Playwright. Fonts: Atkinson Hyperlegible Next and Literata (self-hosted via Fontsource).
