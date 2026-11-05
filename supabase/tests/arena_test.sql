-- Arena security + matchmaking tests. Runs after gamification_test.sql.
\set alice '11111111-1111-1111-1111-111111111111'
\set bob   '22222222-2222-2222-2222-222222222222'
insert into auth.users (id, email) values (:'alice', 'alice@example.com'), (:'bob', 'bob@example.com') on conflict (id) do nothing;
insert into auth.users (id, email)
select ('00000000-0000-0000-0000-00000000000' || n)::uuid, 'p' || n || '@example.com' from generate_series(1, 6) n
on conflict (id) do nothing;

-- ---------- learners can't touch the arena directly
set role authenticated;
select set_config('request.jwt.claim.sub', :'alice', false);
do $$ begin
  begin
    perform 1 from public.arena_matches limit 1;
    raise exception 'FAIL: learner read matches (seed would leak)';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.arena_answers (match_id, user_id, q, choice, correct, ms, points)
    values (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 0, 0, true, 1, 1000);
    raise exception 'FAIL: learner wrote an answer';
  exception when insufficient_privilege then null; end;
  begin
    perform public.arena_join('11111111-1111-1111-1111-111111111111', 'Alice', 'fox');
    raise exception 'FAIL: learner called arena_join';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

set role anon;
do $$ begin
  begin
    perform 1 from public.arena_players limit 1;
    raise exception 'FAIL: anon read players';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

-- ---------- matchmaking (as the server)
set role service_role;
do $$
declare
  m1 uuid; m1b uuid; m2 uuid; m6 uuid; v_start timestamptz; n int;
begin
  m1 := public.arena_join('11111111-1111-1111-1111-111111111111', 'Alice', 'fox');
  m1b := public.arena_join('11111111-1111-1111-1111-111111111111', 'Alice', 'fox');
  if m1 <> m1b then raise exception 'FAIL: rejoining should return the same match'; end if;
  m2 := public.arena_join('22222222-2222-2222-2222-222222222222', 'Bob', 'owl');
  if m2 <> m1 then raise exception 'FAIL: second player should share the open lobby'; end if;
  select start_at into v_start from public.arena_matches where id = m1;
  if v_start is not null then raise exception 'FAIL: 2 players should not start the match'; end if;

  -- bob leaves the lobby, then three others + bob join → 5 people → starts early
  if not public.arena_leave('22222222-2222-2222-2222-222222222222', m1) then raise exception 'FAIL: leave'; end if;
  perform public.arena_join('00000000-0000-0000-0000-000000000001', 'P1', 'fox');
  perform public.arena_join('00000000-0000-0000-0000-000000000002', 'P2', 'fox');
  perform public.arena_join('00000000-0000-0000-0000-000000000003', 'P3', 'fox');
  perform public.arena_join('22222222-2222-2222-2222-222222222222', 'Bob', 'owl');
  select count(*) into n from public.arena_players where match_id = m1;
  if n <> 5 then raise exception 'FAIL: expected 5 players, got %', n; end if;
  if (select count(distinct seat) from public.arena_players where match_id = m1) <> 5 then raise exception 'FAIL: seats must be unique'; end if;
  select start_at into v_start from public.arena_matches where id = m1;
  if v_start is null then raise exception 'FAIL: a full lobby should start'; end if;
  if public.arena_leave('22222222-2222-2222-2222-222222222222', m1) then raise exception 'FAIL: left a started match'; end if;

  -- a 6th player gets a new lobby
  m6 := public.arena_join('00000000-0000-0000-0000-000000000004', 'P4', 'fox');
  if m6 = m1 then raise exception 'FAIL: joined a full match'; end if;

  -- an expired lobby is never joined
  update public.arena_matches set fill_at = now() - interval '1 second' where id = m6;
  if public.arena_join('00000000-0000-0000-0000-000000000005', 'P5', 'fox') = m6 then raise exception 'FAIL: joined a closed lobby'; end if;

  -- answers are one per question
  insert into public.arena_answers (match_id, user_id, q, choice, correct, ms, points) values (m1, '11111111-1111-1111-1111-111111111111', 0, 1, true, 900, 955);
  begin
    insert into public.arena_answers (match_id, user_id, q, choice, correct, ms, points) values (m1, '11111111-1111-1111-1111-111111111111', 0, 2, true, 100, 995);
    raise exception 'FAIL: answered twice';
  exception when unique_violation then null; end;
end $$;
reset role;

select 'arena tests passed' as result;
