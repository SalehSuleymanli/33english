-- Structa initial schema.
-- Every table has row-level security. Learners can only see and change their own rows.
-- Subscriptions and payment events are written only by the server (service role) from verified webhooks.

-- ---------------------------------------------------------------- profiles
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text check (char_length(display_name) <= 80),
  native_language text check (char_length(native_language) <= 12),
  daily_goal smallint not null default 20 check (daily_goal between 5 and 200),
  streaks_enabled boolean not null default true,
  show_translations boolean not null default false,
  speech_rate numeric(3, 2) not null default 0.90 check (speech_rate between 0.5 and 1.5),
  onboarded boolean not null default false,
  placement jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create a profile row automatically when someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'display_name', ''), 80))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- learning progress
create table public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  day smallint not null check (day between 1 and 33),
  status text not null check (status in ('started', 'completed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  last_section smallint check (last_section between 0 and 50),
  score smallint check (score between 0 and 100),
  best_score smallint check (best_score between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, day)
);

create table public.exercise_attempts (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  exercise_id text not null check (char_length(exercise_id) <= 64),
  day smallint not null check (day between 0 and 33),
  correct boolean not null,
  answer text not null default '' check (char_length(answer) <= 500),
  source text not null check (source in ('lesson', 'review', 'lab', 'placement', 'scenario')),
  frame text check (char_length(frame) <= 20),
  skill text check (char_length(skill) <= 20),
  created_at timestamptz not null default now()
);
create index exercise_attempts_user_created on public.exercise_attempts (user_id, created_at desc);

create table public.review_items (
  user_id uuid not null references auth.users (id) on delete cascade,
  item_id text not null check (char_length(item_id) <= 140),
  kind text not null check (kind in ('exercise', 'vocab', 'bookmark')),
  day smallint not null default 0 check (day between 0 and 33),
  box smallint not null check (box between 0 and 5),
  due_at timestamptz not null,
  lapses integer not null default 0,
  reviews integer not null default 0,
  last_correct boolean,
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);
create index review_items_due on public.review_items (user_id, due_at);

create table public.vocabulary (
  user_id uuid not null references auth.users (id) on delete cascade,
  term text not null check (char_length(term) <= 120),
  meaning text not null default '' check (char_length(meaning) <= 400),
  example text not null default '' check (char_length(example) <= 400),
  source_day smallint not null default 0 check (source_day between 0 and 33),
  created_at timestamptz not null default now(),
  primary key (user_id, term)
);

create table public.bookmarks (
  user_id uuid not null references auth.users (id) on delete cascade,
  ref text not null check (char_length(ref) <= 140),
  label text not null check (char_length(label) <= 200),
  day smallint not null default 0 check (day between 0 and 33),
  note text check (char_length(note) <= 1000),
  created_at timestamptz not null default now(),
  primary key (user_id, ref)
);

create table public.activity_days (
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  items integer not null default 0 check (items >= 0),
  correct integer not null default 0 check (correct >= 0),
  primary key (user_id, date)
);

create table public.learner_stats (
  user_id uuid primary key references auth.users (id) on delete cascade,
  lab_builds integer not null default 0 check (lab_builds >= 0),
  scenarios_done text[] not null default '{}',
  achievements jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- billing
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  provider text not null,
  provider_customer_id text,
  provider_subscription_id text unique,
  status text not null check (status in ('active', 'trialing', 'past_due', 'paused', 'canceled')),
  plan text not null check (plan in ('monthly', 'annual')),
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  updated_at timestamptz not null default now()
);

-- Raw webhook events, for idempotency and audit. Server-only.
create table public.payment_events (
  id text primary key,
  provider text not null,
  type text not null,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- row-level security
alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.review_items enable row level security;
alter table public.vocabulary enable row level security;
alter table public.bookmarks enable row level security;
alter table public.activity_days enable row level security;
alter table public.learner_stats enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payment_events enable row level security;

create policy "own profile: read" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "own profile: update" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "own profile: insert" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);

do $$
declare t text;
begin
  foreach t in array array['lesson_progress', 'exercise_attempts', 'review_items', 'vocabulary', 'bookmarks', 'activity_days', 'learner_stats']
  loop
    execute format('create policy "own rows: read" on public.%I for select to authenticated using ((select auth.uid()) = user_id)', t);
    execute format('create policy "own rows: insert" on public.%I for insert to authenticated with check ((select auth.uid()) = user_id)', t);
    execute format('create policy "own rows: update" on public.%I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', t);
    execute format('create policy "own rows: delete" on public.%I for delete to authenticated using ((select auth.uid()) = user_id)', t);
  end loop;
end $$;

-- Attempts are an append-only log: no updates from clients.
drop policy "own rows: update" on public.exercise_attempts;

-- Subscriptions: learners can read their own row. No client writes at all.
create policy "own subscription: read" on public.subscriptions for select to authenticated using ((select auth.uid()) = user_id);
-- payment_events: no policies → no client access. Service role bypasses RLS.

-- Anonymous visitors get nothing from these tables.
revoke all on all tables in schema public from anon;

-- Premium check for the calling user (usable from SQL / RPC). Only answers for yourself.
create or replace function public.has_premium()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.subscriptions s
    where s.user_id = (select auth.uid())
      and s.status in ('active', 'trialing')
      and (s.current_period_end is null or s.current_period_end > now())
  );
$$;
revoke execute on function public.has_premium() from public, anon;
grant execute on function public.has_premium() to authenticated, service_role;
