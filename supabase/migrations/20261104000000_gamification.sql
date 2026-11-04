-- 33English gamification: XP ledger, levels, streaks, badges, game records, speaking progress.
--
-- Security model
--   * Learners can READ their own rows (RLS) but can never write XP, badges or game results.
--   * All writes go through the server route /api/rewards, which re-checks answers
--     (lessons, crosswords, battles) and then calls public.grant_xp with the service role.
--   * public.grant_xp is idempotent (one event per user/kind/ref), applies daily caps
--     atomically, and keeps the totals in public.user_progress consistent.

-- ---------------------------------------------------------------- profile additions
alter table public.profiles
  add column if not exists avatar text not null default 'fox' check (char_length(avatar) <= 24);

-- ---------------------------------------------------------------- level curve
-- XP needed to go from level L to L+1 is 150 + 75 * (L - 1).
-- Total XP to reach level L: 150 * (L - 1) + 37.5 * (L - 1) * (L - 2).
create or replace function public.level_for_xp(p_xp integer)
returns integer
language plpgsql
immutable
set search_path = ''
as $$
declare
  l integer := 1;
begin
  while l < 200 and (150 * l + (75 * l * (l - 1)) / 2) <= coalesce(p_xp, 0) loop
    l := l + 1;
  end loop;
  return l;
end;
$$;

-- ---------------------------------------------------------------- tables
create table public.user_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  total_xp integer not null default 0 check (total_xp >= 0),
  level integer not null default 1 check (level >= 1),
  current_streak integer not null default 0 check (current_streak >= 0),
  best_streak integer not null default 0 check (best_streak >= 0),
  last_active_date date,
  updated_at timestamptz not null default now()
);

create table public.xp_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (char_length(kind) <= 32),
  ref text not null check (char_length(ref) <= 120),
  xp integer not null check (xp >= 0 and xp <= 1000),
  cap_group text not null check (char_length(cap_group) <= 32),
  local_date date not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, kind, ref)
);
create index xp_events_user_date on public.xp_events (user_id, local_date);
create index xp_events_user_kind on public.xp_events (user_id, kind);

create table public.user_badges (
  user_id uuid not null references auth.users (id) on delete cascade,
  badge_id text not null check (char_length(badge_id) <= 40),
  unlocked_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

create table public.game_records (
  user_id uuid not null references auth.users (id) on delete cascade,
  game text not null check (game in ('crossword', 'quest')),
  ref text not null check (char_length(ref) <= 60),
  best_score integer not null default 0 check (best_score >= 0),
  stars smallint not null default 0 check (stars between 0 and 3),
  plays integer not null default 0 check (plays >= 0),
  wins integer not null default 0 check (wins >= 0),
  best_time_ms integer check (best_time_ms >= 0),
  first_cleared_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, game, ref)
);

create table public.speaking_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id text not null check (char_length(topic_id) <= 60),
  completed_at timestamptz not null default now(),
  practice_count integer not null default 1 check (practice_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

-- ---------------------------------------------------------------- RLS: read own, never write
alter table public.user_progress enable row level security;
alter table public.xp_events enable row level security;
alter table public.user_badges enable row level security;
alter table public.game_records enable row level security;
alter table public.speaking_progress enable row level security;

create policy "own progress: read" on public.user_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "own xp: read" on public.xp_events for select to authenticated using ((select auth.uid()) = user_id);
create policy "own badges: read" on public.user_badges for select to authenticated using ((select auth.uid()) = user_id);
create policy "own games: read" on public.game_records for select to authenticated using ((select auth.uid()) = user_id);
create policy "own speaking: read" on public.speaking_progress for select to authenticated using ((select auth.uid()) = user_id);

-- No insert/update/delete policies: only the service role (server) writes these tables.
revoke insert, update, delete on public.user_progress, public.xp_events, public.user_badges, public.game_records, public.speaking_progress from authenticated;
revoke all on public.user_progress, public.xp_events, public.user_badges, public.game_records, public.speaking_progress from anon;

-- ---------------------------------------------------------------- grant_xp (server only)
create or replace function public.grant_xp(
  p_user uuid,
  p_kind text,
  p_ref text,
  p_xp integer,
  p_local_date date,
  p_meta jsonb default '{}'::jsonb,
  p_daily_cap integer default null,
  p_cap_group text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_group text := coalesce(p_cap_group, p_kind);
  v_used integer := 0;
  v_xp integer := greatest(0, least(coalesce(p_xp, 0), 1000));
  v_rows integer;
  v_prog public.user_progress;
begin
  if p_user is null or p_kind is null or p_ref is null or p_local_date is null then
    raise exception 'grant_xp: missing argument';
  end if;
  -- serialise grants per user so caps and streaks stay consistent
  perform pg_advisory_xact_lock(hashtextextended(p_user::text, 0));

  if p_daily_cap is not null then
    select coalesce(sum(e.xp), 0) into v_used
      from public.xp_events e
     where e.user_id = p_user and e.local_date = p_local_date and e.cap_group = v_group;
    v_xp := greatest(0, least(v_xp, p_daily_cap - v_used));
  end if;

  insert into public.xp_events (user_id, kind, ref, xp, cap_group, local_date, meta)
  values (p_user, p_kind, p_ref, v_xp, v_group, p_local_date, coalesce(p_meta, '{}'::jsonb))
  on conflict (user_id, kind, ref) do nothing;
  get diagnostics v_rows = row_count;

  insert into public.user_progress (user_id) values (p_user) on conflict (user_id) do nothing;

  if v_rows = 1 then
    update public.user_progress p
       set total_xp = p.total_xp + v_xp,
           level = public.level_for_xp(p.total_xp + v_xp),
           current_streak = case
             when p.last_active_date is null then 1
             when p_local_date = p.last_active_date then greatest(p.current_streak, 1)
             when p_local_date = p.last_active_date + 1 then p.current_streak + 1
             when p_local_date < p.last_active_date then p.current_streak
             else 1
           end,
           best_streak = greatest(p.best_streak, case
             when p.last_active_date is null then 1
             when p_local_date = p.last_active_date then greatest(p.current_streak, 1)
             when p_local_date = p.last_active_date + 1 then p.current_streak + 1
             when p_local_date < p.last_active_date then p.current_streak
             else 1
           end),
           last_active_date = greatest(coalesce(p.last_active_date, p_local_date), p_local_date),
           updated_at = now()
     where p.user_id = p_user;
  end if;

  select * into v_prog from public.user_progress where user_id = p_user;
  return jsonb_build_object(
    'granted', v_rows = 1,
    'xp', case when v_rows = 1 then v_xp else 0 end,
    'total_xp', v_prog.total_xp,
    'level', v_prog.level,
    'current_streak', v_prog.current_streak,
    'best_streak', v_prog.best_streak,
    'last_active_date', v_prog.last_active_date
  );
end;
$$;

revoke execute on function public.grant_xp(uuid, text, text, integer, date, jsonb, integer, text) from public, anon, authenticated;
grant execute on function public.grant_xp(uuid, text, text, integer, date, jsonb, integer, text) to service_role;

-- ---------------------------------------------------------------- record_game (server only)
create or replace function public.record_game(
  p_user uuid,
  p_game text,
  p_ref text,
  p_score integer,
  p_stars integer,
  p_won boolean,
  p_time_ms integer default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.game_records as g (user_id, game, ref, best_score, stars, plays, wins, best_time_ms, first_cleared_at)
  values (p_user, p_game, p_ref, greatest(p_score, 0), case when p_won then least(greatest(p_stars, 0), 3) else 0 end, 1,
          case when p_won then 1 else 0 end, case when p_won then p_time_ms end, case when p_won then now() end)
  on conflict (user_id, game, ref) do update
     set best_score = greatest(g.best_score, excluded.best_score),
         stars = greatest(g.stars, excluded.stars),
         plays = g.plays + 1,
         wins = g.wins + excluded.wins,
         best_time_ms = case
           when excluded.best_time_ms is null then g.best_time_ms
           when g.best_time_ms is null then excluded.best_time_ms
           else least(g.best_time_ms, excluded.best_time_ms) end,
         first_cleared_at = coalesce(g.first_cleared_at, excluded.first_cleared_at),
         updated_at = now();
end;
$$;

revoke execute on function public.record_game(uuid, text, text, integer, integer, boolean, integer) from public, anon, authenticated;
grant execute on function public.record_game(uuid, text, text, integer, integer, boolean, integer) to service_role;

-- ---------------------------------------------------------------- reward_facts (server only)
-- Everything the server needs to evaluate badges and challenges, in one call.
create or replace function public.reward_facts(p_user uuid, p_local_date date, p_week_start date, p_week_key text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'progress', (select to_jsonb(p) from public.user_progress p where p.user_id = p_user),
    'lesson_days', coalesce((select jsonb_agg(e.ref) from public.xp_events e where e.user_id = p_user and e.kind = 'lesson_complete'), '[]'::jsonb),
    'perfect', (select count(*) from public.xp_events e where e.user_id = p_user and e.kind = 'lesson_perfect'),
    'stages', coalesce((select jsonb_agg(e.ref) from public.xp_events e where e.user_id = p_user and e.kind = 'stage_complete'), '[]'::jsonb),
    'crosswords', (select count(*) from public.xp_events e where e.user_id = p_user and e.kind = 'crossword'),
    'hard_crosswords', (select count(*) from public.xp_events e where e.user_id = p_user and e.kind = 'crossword' and e.ref like 'hard-%'),
    'quest_wins', (select count(*) from public.xp_events e where e.user_id = p_user and e.kind in ('quest_clear', 'quest_win')),
    'quest_cleared', coalesce((select jsonb_agg(e.ref) from public.xp_events e where e.user_id = p_user and e.kind = 'quest_clear'), '[]'::jsonb),
    'quest_stars', (select coalesce(sum(g.stars), 0) from public.game_records g where g.user_id = p_user and g.game = 'quest'),
    'speaking', (select count(*) from public.xp_events e where e.user_id = p_user and e.kind = 'speaking'),
    'words', (select count(*) from public.xp_events e where e.user_id = p_user and e.kind = 'word_saved'),
    'sweeps', (select count(*) from public.xp_events e where e.user_id = p_user and e.kind = 'daily_sweep'),
    'today', coalesce((select jsonb_object_agg(t.kind, t.n) from (
        select e.kind, count(*) as n from public.xp_events e
         where e.user_id = p_user and e.local_date = p_local_date group by e.kind) t), '{}'::jsonb),
    'today_xp', (select coalesce(sum(e.xp), 0) from public.xp_events e where e.user_id = p_user and e.local_date = p_local_date),
    'week', coalesce((select jsonb_object_agg(t.kind, t.n) from (
        select e.kind, count(*) as n from public.xp_events e
         where e.user_id = p_user and e.local_date between p_week_start and p_week_start + 6 group by e.kind) t), '{}'::jsonb),
    'week_days', (select count(distinct e.local_date) from public.xp_events e
         where e.user_id = p_user and e.local_date between p_week_start and p_week_start + 6
           and e.kind not in ('daily', 'daily_sweep', 'weekly', 'streak', 'stage_complete', 'level_test', 'lesson_perfect')),
    'week_xp', (select coalesce(sum(e.xp), 0) from public.xp_events e where e.user_id = p_user and e.local_date between p_week_start and p_week_start + 6),
    'claimed_today', coalesce((select jsonb_agg(e.ref) from public.xp_events e where e.user_id = p_user and e.kind = 'daily' and e.ref like p_local_date::text || ':%'), '[]'::jsonb),
    'claimed_week', coalesce((select jsonb_agg(e.ref) from public.xp_events e where e.user_id = p_user and e.kind = 'weekly' and e.ref like p_week_key || ':%'), '[]'::jsonb),
    'badges', coalesce((select jsonb_object_agg(b.badge_id, b.unlocked_at) from public.user_badges b where b.user_id = p_user), '{}'::jsonb),
    'quest_records', coalesce((select jsonb_object_agg(g.ref, jsonb_build_object('stars', g.stars, 'wins', g.wins, 'plays', g.plays)) from public.game_records g where g.user_id = p_user and g.game = 'quest'), '{}'::jsonb),
    'crossword_solved', coalesce((select jsonb_agg(g.ref) from public.game_records g where g.user_id = p_user and g.game = 'crossword' and g.wins > 0), '[]'::jsonb),
    'speaking_done', coalesce((select jsonb_object_agg(s.topic_id, s.practice_count) from public.speaking_progress s where s.user_id = p_user), '{}'::jsonb),
    'recent', coalesce((select jsonb_agg(r) from (
        select e.kind, e.ref, e.xp, e.created_at from public.xp_events e
         where e.user_id = p_user order by e.created_at desc limit 12) r), '[]'::jsonb),
    'last7', coalesce((select jsonb_object_agg(t.d, t.xp) from (
        select e.local_date::text as d, sum(e.xp) as xp from public.xp_events e
         where e.user_id = p_user and e.local_date > p_local_date - 7 group by e.local_date) t), '{}'::jsonb)
  );
$$;

revoke execute on function public.reward_facts(uuid, date, date, text) from public, anon, authenticated;
grant execute on function public.reward_facts(uuid, date, date, text) to service_role;

-- ---------------------------------------------------------------- record_speaking (server only)
create or replace function public.record_speaking(p_user uuid, p_topic text)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.speaking_progress as s (user_id, topic_id) values (p_user, p_topic)
  on conflict (user_id, topic_id) do update set practice_count = s.practice_count + 1, updated_at = now();
$$;

revoke execute on function public.record_speaking(uuid, text) from public, anon, authenticated;
grant execute on function public.record_speaking(uuid, text) to service_role;
