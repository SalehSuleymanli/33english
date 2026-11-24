-- 33English: exam / reading test history, and practice games in game_records.
-- Security model (same as rewards): learners can read their own rows only;
-- only the server (service role) writes, after grading the answers itself.

-- practice games keep a best score per game
alter table public.game_records drop constraint if exists game_records_game_check;
alter table public.game_records add constraint game_records_game_check check (game in ('crossword', 'quest', 'drill'));

create table if not exists public.test_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  test_id text not null check (char_length(test_id) <= 60),
  kind text not null check (kind in ('exam', 'reading', 'ielts-reading')),
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  percent smallint not null check (percent between 0 and 100),
  seconds integer check (seconds >= 0),
  created_at timestamptz not null default now()
);
create index if not exists test_attempts_user on public.test_attempts (user_id, created_at desc);

alter table public.test_attempts enable row level security;
drop policy if exists "own test attempts: read" on public.test_attempts;
create policy "own test attempts: read" on public.test_attempts for select to authenticated using ((select auth.uid()) = user_id);
revoke insert, update, delete on public.test_attempts from anon, authenticated;
grant select, insert on public.test_attempts to service_role;
