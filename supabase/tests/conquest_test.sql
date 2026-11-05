-- Word Empires security + matchmaking tests. Runs after gamification_test.sql.
\set alice '11111111-1111-1111-1111-111111111111'
\set bob   '22222222-2222-2222-2222-222222222222'
insert into auth.users (id, email) values (:'alice', 'alice@example.com'), (:'bob', 'bob@example.com') on conflict (id) do nothing;
insert into auth.users (id, email)
select ('00000000-0000-0000-0000-00000000000' || n)::uuid, 'p' || n || '@example.com' from generate_series(1, 6) n
on conflict (id) do nothing;

-- the old arena is gone
do $t$ begin
  if to_regclass('public.arena_matches') is not null then raise exception 'FAIL: arena tables still exist'; end if;
end $t$;

-- ---------- learners can't touch the game directly
set role authenticated;
select set_config('request.jwt.claim.sub', :'alice', false);
do $t$ begin
  begin
    perform 1 from public.conquest_matches limit 1;
    raise exception 'FAIL: learner read matches (seed would leak)';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.conquest_actions (match_id, user_id, step, kind, value, ms)
    values (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 0, 'answer', 0, 1);
    raise exception 'FAIL: learner wrote an answer';
  exception when insufficient_privilege then null; end;
  begin
    perform public.conquest_join('11111111-1111-1111-1111-111111111111', 'Alice', 'fox');
    raise exception 'FAIL: learner called conquest_join';
  exception when insufficient_privilege then null; end;
end $t$;
reset role;

set role anon;
do $t$ begin
  begin
    perform 1 from public.conquest_players limit 1;
    raise exception 'FAIL: anon read players';
  exception when insufficient_privilege then null; end;
end $t$;
reset role;

-- ---------- matchmaking (as the server)
set role service_role;
do $t$
declare
  m1 uuid; m1b uuid; m2 uuid; m5 uuid; v_start timestamptz; n int;
begin
  m1 := public.conquest_join('11111111-1111-1111-1111-111111111111', 'Alice', 'fox');
  m1b := public.conquest_join('11111111-1111-1111-1111-111111111111', 'Alice', 'fox');
  if m1 <> m1b then raise exception 'FAIL: rejoining should return the same match'; end if;
  m2 := public.conquest_join('22222222-2222-2222-2222-222222222222', 'Bob', 'owl');
  if m2 <> m1 then raise exception 'FAIL: second player should share the open lobby'; end if;
  select start_at into v_start from public.conquest_matches where id = m1;
  if v_start is not null then raise exception 'FAIL: 2 players should not start the match'; end if;

  -- bob leaves, then two others + bob join: 4 people, starts early
  if not public.conquest_leave('22222222-2222-2222-2222-222222222222', m1) then raise exception 'FAIL: leave'; end if;
  perform public.conquest_join('00000000-0000-0000-0000-000000000001', 'P1', 'fox');
  perform public.conquest_join('00000000-0000-0000-0000-000000000002', 'P2', 'fox');
  perform public.conquest_join('22222222-2222-2222-2222-222222222222', 'Bob', 'owl');
  select count(*) into n from public.conquest_players where match_id = m1;
  if n <> 4 then raise exception 'FAIL: expected 4 players, got %', n; end if;
  if (select count(distinct seat) from public.conquest_players where match_id = m1) <> 4 then raise exception 'FAIL: seats must be unique'; end if;
  select start_at into v_start from public.conquest_matches where id = m1;
  if v_start is null then raise exception 'FAIL: a full lobby should start'; end if;
  if public.conquest_leave('22222222-2222-2222-2222-222222222222', m1) then raise exception 'FAIL: left a started match'; end if;

  -- a 5th player gets a new lobby; an expired lobby is never joined
  m5 := public.conquest_join('00000000-0000-0000-0000-000000000003', 'P3', 'fox');
  if m5 = m1 then raise exception 'FAIL: joined a full match'; end if;
  update public.conquest_matches set fill_at = now() - interval '1 second' where id = m5;
  if public.conquest_join('00000000-0000-0000-0000-000000000004', 'P4', 'fox') = m5 then raise exception 'FAIL: joined a closed lobby'; end if;

  -- one pick and one answer per step
  insert into public.conquest_actions (match_id, user_id, step, kind, value, ms) values (m1, '11111111-1111-1111-1111-111111111111', 0, 'answer', 1, 900);
  begin
    insert into public.conquest_actions (match_id, user_id, step, kind, value, ms) values (m1, '11111111-1111-1111-1111-111111111111', 0, 'answer', 2, 100);
    raise exception 'FAIL: answered twice';
  exception when unique_violation then null; end;
end $t$;
reset role;

select 'conquest tests passed' as result;
