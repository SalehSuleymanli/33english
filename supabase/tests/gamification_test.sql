-- Gamification security + logic tests. Runs after rls_test.sql (alice and bob exist).
\set alice '11111111-1111-1111-1111-111111111111'
\set bob   '22222222-2222-2222-2222-222222222222'
insert into auth.users (id, email) values (:'alice', 'alice@example.com'), (:'bob', 'bob@example.com') on conflict (id) do nothing;

-- level curve matches the app: 150 XP → level 2, 375 → level 3, 4050 → level 10
do $$ begin
  if public.level_for_xp(0) <> 1 or public.level_for_xp(149) <> 1 or public.level_for_xp(150) <> 2
     or public.level_for_xp(374) <> 2 or public.level_for_xp(375) <> 3 or public.level_for_xp(4050) <> 10 then
    raise exception 'FAIL: level curve';
  end if;
end $$;

-- ---------- learners can't touch XP
set role authenticated;
select set_config('request.jwt.claim.sub', :'alice', false);
do $$ begin
  begin
    insert into public.xp_events (user_id, kind, ref, xp, cap_group, local_date) values ('11111111-1111-1111-1111-111111111111', 'crossword', 'x', 1000, 'x', current_date);
    raise exception 'FAIL: learner inserted xp';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.user_progress (user_id, total_xp) values ('11111111-1111-1111-1111-111111111111', 99999);
    raise exception 'FAIL: learner wrote progress';
  exception when insufficient_privilege then null; end;
  begin
    perform public.grant_xp('11111111-1111-1111-1111-111111111111', 'crossword', 'x', 1000, current_date);
    raise exception 'FAIL: learner called grant_xp';
  exception when insufficient_privilege then null; end;
  begin
    perform public.reward_facts('22222222-2222-2222-2222-222222222222', current_date, current_date, 'w');
    raise exception 'FAIL: learner read facts';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.user_badges (user_id, badge_id) values ('11111111-1111-1111-1111-111111111111', 'graduate');
    raise exception 'FAIL: learner gave self a badge';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

-- ---------- server grants
set role service_role;
-- idempotent
select public.grant_xp(:'alice', 'lesson_complete', '1', 125, '2026-11-01');
do $$ declare r jsonb; begin
  r := public.grant_xp('11111111-1111-1111-1111-111111111111', 'lesson_complete', '1', 125, '2026-11-01');
  if (r ->> 'granted')::boolean then raise exception 'FAIL: duplicate grant'; end if;
  if (r ->> 'total_xp')::int <> 125 then raise exception 'FAIL: total after duplicate %', r; end if;
end $$;
-- daily cap: games capped at 400 per day
do $$ declare r jsonb; i int; begin
  for i in 1..6 loop
    r := public.grant_xp('11111111-1111-1111-1111-111111111111', 'crossword', 'medium-' || i, 90, '2026-11-01', '{}'::jsonb, 400, 'games');
  end loop;
  if (select sum(xp) from public.xp_events where user_id = '11111111-1111-1111-1111-111111111111' and cap_group = 'games') <> 400 then
    raise exception 'FAIL: cap not applied';
  end if;
  if (r ->> 'xp')::int <> 0 then raise exception 'FAIL: last grant over cap %', r; end if;
end $$;
-- streaks: consecutive days count up, a gap resets, old dates don't break it
select public.grant_xp(:'alice', 'speaking', 't1', 40, '2026-11-02');
select public.grant_xp(:'alice', 'speaking', 't2', 40, '2026-11-03');
do $$ declare p public.user_progress; begin
  select * into p from public.user_progress where user_id = '11111111-1111-1111-1111-111111111111';
  if p.current_streak <> 3 or p.best_streak <> 3 then raise exception 'FAIL: streak % %', p.current_streak, p.best_streak; end if;
  if p.level <> public.level_for_xp(p.total_xp) then raise exception 'FAIL: level out of sync'; end if;
end $$;
select public.grant_xp(:'alice', 'speaking', 't3', 40, '2026-11-01');
select public.grant_xp(:'alice', 'speaking', 't4', 40, '2026-11-06');
do $$ declare p public.user_progress; begin
  select * into p from public.user_progress where user_id = '11111111-1111-1111-1111-111111111111';
  if p.current_streak <> 1 or p.best_streak <> 3 or p.last_active_date <> '2026-11-06' then raise exception 'FAIL: streak reset % %', p.current_streak, p.best_streak; end if;
end $$;
-- game records keep the best
select public.record_game(:'alice', 'quest', 'w1-s1', 50, 2, true, null);
select public.record_game(:'alice', 'quest', 'w1-s1', 30, 1, true, null);
select public.record_game(:'alice', 'quest', 'w1-s1', 0, 3, false, null);
do $$ declare g public.game_records; begin
  select * into g from public.game_records where user_id = '11111111-1111-1111-1111-111111111111' and ref = 'w1-s1';
  if g.stars <> 2 or g.plays <> 3 or g.wins <> 2 or g.best_score <> 50 then raise exception 'FAIL: game record %', row_to_json(g); end if;
end $$;
select public.record_speaking(:'alice', 'best-friend');
select public.record_speaking(:'alice', 'best-friend');
-- facts
do $$ declare f jsonb; begin
  f := public.reward_facts('11111111-1111-1111-1111-111111111111', '2026-11-01', '2026-10-26', '2026-W44');
  if (f ->> 'crosswords')::int <> 6 then raise exception 'FAIL: facts crosswords %', f; end if;
  if (f -> 'today' ->> 'crossword')::int <> 6 then raise exception 'FAIL: facts today %', f -> 'today'; end if;
  if (f ->> 'quest_stars')::int <> 2 then raise exception 'FAIL: facts stars'; end if;
  if (f -> 'speaking_done' ->> 'best-friend')::int <> 2 then raise exception 'FAIL: speaking count'; end if;
  if f -> 'lesson_days' <> '["1"]'::jsonb then raise exception 'FAIL: lesson days %', f -> 'lesson_days'; end if;
end $$;
reset role;

-- ---------- bob can't see alice's XP
set role authenticated;
select set_config('request.jwt.claim.sub', :'bob', false);
do $$ begin
  if (select count(*) from public.xp_events) <> 0 then raise exception 'FAIL: bob sees alice xp'; end if;
  if (select count(*) from public.user_progress) <> 0 then raise exception 'FAIL: bob sees alice progress'; end if;
  if (select count(*) from public.game_records) <> 0 then raise exception 'FAIL: bob sees alice games'; end if;
end $$;
select set_config('request.jwt.claim.sub', :'alice', false);
do $$ begin
  if (select count(*) from public.xp_events) = 0 then raise exception 'FAIL: alice cannot read own xp'; end if;
  -- avatar is a normal profile field
  update public.profiles set avatar = 'owl' where id = '11111111-1111-1111-1111-111111111111';
end $$;
reset role;

select 'gamification tests passed' as result;
