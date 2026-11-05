-- 33English Word Empires: 4-player world conquest, powered by English answers.
-- Replaces English Arena.
-- Security model (same as rewards):
--   * Learners never touch these tables directly: RLS is on with no policies,
--     so only the server (service role) can read or write them.
--   * The server replays every match from the stored picks and answers,
--     times every answer itself and never sends the match seed.

drop function if exists public.arena_join(uuid, text, text, integer, integer, integer);
drop function if exists public.arena_leave(uuid, uuid);
drop table if exists public.arena_answers;
drop table if exists public.arena_players;
drop table if exists public.arena_matches;

create table if not exists public.conquest_matches (
  id uuid primary key default gen_random_uuid(),
  seed integer not null check (seed > 0),
  created_at timestamptz not null default now(),
  fill_at timestamptz not null,           -- lobby closes; bots take any empty seats
  start_at timestamptz                    -- set early when all 4 seats are taken by people
);
create index if not exists conquest_matches_open on public.conquest_matches (fill_at) where start_at is null;
create index if not exists conquest_matches_created on public.conquest_matches (created_at);

create table if not exists public.conquest_players (
  match_id uuid not null references public.conquest_matches (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  seat smallint not null check (seat between 0 and 3),
  name text not null check (char_length(name) between 1 and 24),
  avatar text not null default 'fox' check (char_length(avatar) <= 24),
  joined_at timestamptz not null default now(),
  primary key (match_id, user_id),
  unique (match_id, seat)
);
create index if not exists conquest_players_user on public.conquest_players (user_id, joined_at desc);

create table if not exists public.conquest_actions (
  match_id uuid not null references public.conquest_matches (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  step smallint not null check (step between 0 and 40),
  kind text not null check (kind in ('pick', 'answer')),
  value smallint not null check (value between 0 and 40),
  ms integer not null check (ms >= 0),
  created_at timestamptz not null default now(),
  primary key (match_id, user_id, step, kind)
);

alter table public.conquest_matches enable row level security;
alter table public.conquest_players enable row level security;
alter table public.conquest_actions enable row level security;
revoke all on public.conquest_matches, public.conquest_players, public.conquest_actions from anon, authenticated;

-- ---------------------------------------------------------------- conquest_join (server only)
-- Puts the player in an open lobby (or a new one) and returns the match id.
-- A player who is still in an unfinished match is sent back to it.
create or replace function public.conquest_join(
  p_user uuid,
  p_name text,
  p_avatar text,
  p_lobby_ms integer default 15000,
  p_countdown_ms integer default 4000,
  p_match_ms integer default 337500
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $conquest$
declare
  v_match uuid;
  v_seats integer;
  v_seat integer;
begin
  if p_user is null then
    raise exception 'missing user';
  end if;
  -- one join at a time, so two people can never take the same seat
  perform pg_advisory_xact_lock(hashtext('33english:conquest_join'));

  select p.match_id into v_match
  from public.conquest_players p
  join public.conquest_matches m on m.id = p.match_id
  where p.user_id = p_user
    and coalesce(m.start_at, m.fill_at + make_interval(secs => p_countdown_ms / 1000.0))
        + make_interval(secs => p_match_ms / 1000.0) > now()
  order by p.joined_at desc
  limit 1;
  if v_match is not null then
    return v_match;
  end if;

  select m.id into v_match
  from public.conquest_matches m
  where m.start_at is null
    and m.fill_at > now() + interval '1 second'
    and (select count(*) from public.conquest_players p where p.match_id = m.id) < 4
  order by m.created_at
  limit 1;

  if v_match is null then
    insert into public.conquest_matches (seed, fill_at)
    values (1 + floor(random() * 2147483000)::integer, now() + make_interval(secs => p_lobby_ms / 1000.0))
    returning id into v_match;
    -- tidy up old matches while we're here
    delete from public.conquest_matches where created_at < now() - interval '3 days';
  end if;

  select min(s) into v_seat
  from generate_series(0, 3) s
  where not exists (select 1 from public.conquest_players p where p.match_id = v_match and p.seat = s);
  insert into public.conquest_players (match_id, user_id, seat, name, avatar)
  values (v_match, p_user, v_seat, left(coalesce(nullif(trim(p_name), ''), 'Player'), 24), left(coalesce(p_avatar, 'fox'), 24));

  select count(*) into v_seats from public.conquest_players where match_id = v_match;
  if v_seats >= 4 then
    update public.conquest_matches set start_at = now() + make_interval(secs => p_countdown_ms / 1000.0) where id = v_match;
  end if;
  return v_match;
end;
$conquest$;

-- ---------------------------------------------------------------- conquest_leave (server only)
-- Leaving is only possible while the lobby is still open.
create or replace function public.conquest_leave(p_user uuid, p_match uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $conquest$
declare
  v_deleted integer;
begin
  perform pg_advisory_xact_lock(hashtext('33english:conquest_join'));
  delete from public.conquest_players p
  using public.conquest_matches m
  where p.match_id = p_match and p.user_id = p_user and m.id = p.match_id
    and m.start_at is null and m.fill_at > now();
  get diagnostics v_deleted = row_count;
  -- an empty lobby is removed
  delete from public.conquest_matches m
  where m.id = p_match and m.start_at is null
    and not exists (select 1 from public.conquest_players p where p.match_id = m.id);
  return v_deleted > 0;
end;
$conquest$;

revoke all on function public.conquest_join(uuid, text, text, integer, integer, integer) from public, anon, authenticated;
revoke all on function public.conquest_leave(uuid, uuid) from public, anon, authenticated;
grant execute on function public.conquest_join(uuid, text, text, integer, integer, integer) to service_role;
grant execute on function public.conquest_leave(uuid, uuid) to service_role;
grant select, insert, update, delete on public.conquest_matches, public.conquest_players, public.conquest_actions to service_role;
