# Deployment, environment and launch

Order: **1 Supabase → 2 hosting → 3 Paddle → 4 launch checklist.** Each step works on its own; the site is usable after step 2.

## 1. Supabase (accounts, progress, subscriptions)

1. Create a project at supabase.com. Choose a region near your learners (e.g. Frankfurt for Azerbaijan/Europe).
2. **SQL Editor → New query**: paste the whole of `supabase/migrations/20261027000000_init.sql` and run it. (Or with the Supabase CLI: `supabase link` then `supabase db push`.)
3. **Authentication → URL Configuration**: set *Site URL* to your domain, and add `https://YOUR-DOMAIN/auth/callback` (and `http://localhost:3000/auth/callback` for development) to *Redirect URLs*.
4. **Authentication → Providers → Email**: keep "Confirm email" on. Configure custom SMTP before launch (Supabase's built-in email is rate-limited).
5. **Project Settings → API**: copy the URL and the *publishable* (anon) key into `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and the *service role* key into `SUPABASE_SERVICE_ROLE_KEY` (server only — never in a `NEXT_PUBLIC_` variable, never in git).

What the database enforces (tested in `supabase/tests/rls_test.sql`): learners can read and write only their own rows; attempts are append-only; nobody can write subscriptions or payment events except the server with the service role key; anonymous visitors get nothing.

## 2. Hosting (Vercel recommended)

1. Push the repository to GitHub (private).
2. Import it in Vercel. Framework: Next.js (detected). No build settings to change.
3. Add the environment variables from `.env.example` under *Settings → Environment Variables*. Set `NEXT_PUBLIC_SITE_URL` to your production URL. **Do not** set `DEV_UNLOCK_ALL` in production (it's ignored there anyway).
4. Deploy, then add your domain.

Any Node 20+ host that runs `npm run build && npm start` works too.

## 3. Payments (Paddle)

Paddle acts as merchant of record (handles VAT/sales tax and invoices) and does not list Azerbaijan as an unsupported seller country — but **confirm your eligibility with Paddle during onboarding** (they review the website and business). Stripe requires a business entity in a Stripe-supported country.

1. Create a Paddle account; start in **Sandbox**.
2. *Catalog → Products*: create "Structa Premium" with two prices — monthly and yearly. Match the amounts in `src/lib/pricing.ts` (currently $9.99 / $59.99 — proposals; change both places).
3. *Developer tools → Authentication*: create a **client-side token** → `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`; create an **API key** → `PADDLE_API_KEY` (server only).
4. Put the two price ids (`pri_…`) in `NEXT_PUBLIC_PADDLE_PRICE_MONTHLY` / `NEXT_PUBLIC_PADDLE_PRICE_ANNUAL`.
5. *Developer tools → Notifications*: new destination `https://YOUR-DOMAIN/api/webhooks/paddle`, events `subscription.created`, `subscription.updated`, `subscription.canceled`, `subscription.past_due`, `subscription.paused`, `subscription.resumed`, `subscription.activated`, `subscription.trialing`. Copy its secret → `PADDLE_WEBHOOK_SECRET`.
6. *Checkout settings*: set your default payment link to `https://YOUR-DOMAIN/billing` and approve your domain.
7. Test in sandbox with Paddle's test card: sign up on your site → Billing → checkout → the webhook writes `subscriptions` → Days 8–33 unlock. Then cancel in the portal and confirm access lasts until the period end.
8. Switch `NEXT_PUBLIC_PADDLE_ENVIRONMENT=production` and use live credentials.

How access works: Premium comes **only** from the `subscriptions` row written by the signature-verified webhook. Lesson content for Days 8–33 is rendered on the server only after that check; it is never in the public JavaScript.

## 4. Launch checklist

**Decisions (founder)**
- [ ] Brand name "Structa": check trademark and domain availability
- [ ] Prices (`src/lib/pricing.ts` + Paddle) and free tier size (`FREE_DAYS` in `src/content/curriculum.ts`)
- [ ] Review flagged changes to the method (`docs/BLUEPRINT.md` §2)
- [ ] Review Days 27–33 (authored from headings only) and all Azerbaijani translation exercises
- [ ] Support email in `src/lib/brand.ts`

**Legal**
- [ ] Privacy policy and terms reviewed by a lawyer (`src/app/(site)/privacy`, `terms`)
- [ ] Cookie/consent requirements for your markets (the app uses only essential cookies and local storage; add a banner if you add analytics)

**Technical**
- [ ] Supabase migration applied; redirect URLs set; custom SMTP configured
- [ ] All env vars set in hosting; service role key and Paddle secrets only in server variables
- [ ] Sandbox purchase → webhook → Premium unlock → cancel flow tested
- [ ] `npm test`, `npm run test:e2e`, `npm run test:rls` pass
- [ ] Error monitoring (e.g. Sentry) and uptime check added
- [ ] Database backups enabled (Supabase Pro includes daily backups)
- [ ] Test on real devices: iPhone Safari, Android Chrome (speech recognition availability varies)

**After launch**
- [ ] Watch webhook logs for the first real payments
- [ ] Collect learner feedback on lesson difficulty; adjust content files
