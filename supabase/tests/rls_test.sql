-- RLS tests. Run with: psql -v ON_ERROR_STOP=1 -f rls_test.sql
-- Each block raises an exception if a rule is broken.
\set alice '11111111-1111-1111-1111-111111111111'
\set bob   '22222222-2222-2222-2222-222222222222'

insert into auth.users (id, email, raw_user_meta_data) values
  (:'alice', 'alice@example.com', '{"display_name":"Alice"}'),
  (:'bob', 'bob@example.com', '{}');

-- signup trigger created profiles
do $$ begin
  if (select count(*) from public.profiles) <> 2 then raise exception 'profile trigger failed'; end if;
  if (select display_name from public.profiles where id = '11111111-1111-1111-1111-111111111111') <> 'Alice' then raise exception 'display name not copied'; end if;
end $$;

-- server writes a subscription for bob (service role bypasses RLS)
set role service_role;
insert into public.subscriptions (user_id, provider, status, plan, current_period_end)
values (:'bob', 'paddle', 'active', 'monthly', now() + interval '30 days');
reset role;

-- ---------- act as alice
set role authenticated;
select set_config('request.jwt.claim.sub', :'alice', false);

insert into public.lesson_progress (user_id, day, status) values (:'alice', 1, 'completed');
insert into public.exercise_attempts (id, user_id, exercise_id, day, correct, source) values (gen_random_uuid(), :'alice', 'd01-e01', 1, true, 'lesson');
insert into public.review_items (user_id, item_id, kind, box, due_at) values (:'alice', 'd01-e01', 'exercise', 2, now());
update public.profiles set display_name = 'Alice B' where id = :'alice';

-- alice cannot write rows for bob
do $$ begin
  begin
    insert into public.lesson_progress (user_id, day, status) values ('22222222-2222-2222-2222-222222222222', 1, 'completed');
    raise exception 'FAIL: alice wrote bob''s progress';
  exception when insufficient_privilege then null; end;
end $$;

-- alice cannot give herself a subscription
do $$ begin
  begin
    insert into public.subscriptions (user_id, provider, status, plan) values ('11111111-1111-1111-1111-111111111111', 'x', 'active', 'annual');
    raise exception 'FAIL: alice created a subscription';
  exception when insufficient_privilege then null; end;
end $$;

-- alice cannot read events
do $$ begin
  if (select count(*) from public.payment_events) <> 0 then raise exception 'FAIL: events visible'; end if;
end $$;

-- alice cannot edit her attempts (append-only)
do $$ declare n int; begin
  update public.exercise_attempts set correct = false;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FAIL: attempts updated'; end if;
end $$;

-- alice cannot see or update bob's profile, and has no premium
do $$ declare n int; begin
  if (select count(*) from public.profiles) <> 1 then raise exception 'FAIL: sees other profiles'; end if;
  update public.profiles set display_name = 'hacked' where id = '22222222-2222-2222-2222-222222222222';
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FAIL: updated bob profile'; end if;
  if (select count(*) from public.subscriptions) <> 0 then raise exception 'FAIL: sees bob subscription'; end if;
  if public.has_premium() then raise exception 'FAIL: alice premium'; end if;
end $$;

-- ---------- act as bob
select set_config('request.jwt.claim.sub', :'bob', false);
do $$ begin
  if (select count(*) from public.lesson_progress) <> 0 then raise exception 'FAIL: bob sees alice progress'; end if;
  if (select count(*) from public.review_items) <> 0 then raise exception 'FAIL: bob sees alice reviews'; end if;
  if (select count(*) from public.subscriptions) <> 1 then raise exception 'FAIL: bob cannot see own subscription'; end if;
  if not public.has_premium() then raise exception 'FAIL: bob not premium'; end if;
end $$;
-- bob cannot upgrade/extend his own subscription
do $$ declare n int; begin
  update public.subscriptions set current_period_end = now() + interval '10 years';
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FAIL: bob extended subscription'; end if;
end $$;

-- ---------- anonymous
reset role;
set role anon;
select set_config('request.jwt.claim.sub', '', false);
do $$ begin
  begin
    perform count(*) from public.profiles;
    raise exception 'FAIL: anon read profiles';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

-- deleting a user cascades
delete from auth.users where id = :'alice';
do $$ begin
  if (select count(*) from public.lesson_progress) <> 0 then raise exception 'FAIL: cascade'; end if;
end $$;

select 'ALL RLS TESTS PASSED' as result;
