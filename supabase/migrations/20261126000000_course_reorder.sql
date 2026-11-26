-- 33English: the 33 days now follow the order of the original syllabus.
-- Moves every learner's saved progress from the old day numbers to the new ones.
-- Safe to run once: a second run stops at the first insert (course-reorder-v2 already recorded).
-- Old days 12, 21 (review checkpoints) and 33 (graduation) no longer exist.

begin;

create table if not exists public.app_migrations (
  name text primary key,
  ran_at timestamptz not null default now()
);
alter table public.app_migrations enable row level security;
insert into public.app_migrations (name) values ('course-reorder-v2');

create temp table day_map (old smallint primary key, new smallint) on commit drop;
insert into day_map (old, new) values
  (11, 19), (12, null), (13, 17), (14, 11), (15, 16), (16, 18), (17, 15), (18, 24), (19, 29), (20, 30),
  (21, null), (22, 12), (23, 14), (24, 13), (25, 22), (26, 20), (27, 27), (28, 26), (29, 21), (30, 31),
  (31, 32), (32, 33), (33, null);

-- exercise id → new id ("d11-p03" → "d19-p03"; part of old day 29 moved to day 28)
create temp table id_map on commit drop as
select ids.item_id as old_id,
       case
         when d.new is null then null
         when d.old = 29 and substr(ids.item_id, 5) in ('p01', 'p02', 'p04', 'p05', 'p08', 'p09', 'r02', 'r03', 'r04', 'r05') then 'd28-' || substr(ids.item_id, 5)
         else 'd' || lpad(d.new::text, 2, '0') || '-' || substr(ids.item_id, 5)
       end as new_id,
       case when d.old = 29 and substr(ids.item_id, 5) in ('p01', 'p02', 'p04', 'p05', 'p08', 'p09', 'r02', 'r03', 'r04', 'r05') then 28 else d.new end as new_day
from (
  select item_id from public.review_items
  union
  select exercise_id from public.exercise_attempts
) ids
join day_map d on ids.item_id ~ '^d[0-9]{2}-' and d.old = substr(ids.item_id, 2, 2)::smallint;

-- lessons
create temp table lp on commit drop as
select l.*, d.new as new_day from public.lesson_progress l join day_map d on d.old = l.day;
delete from public.lesson_progress l using day_map d where l.day = d.old;
insert into public.lesson_progress (user_id, day, status, started_at, completed_at, last_section, score, best_score, updated_at)
select user_id, new_day, status, started_at, completed_at, last_section, score, best_score, updated_at from lp where new_day is not null;

-- review queue
create temp table ri on commit drop as
select r.*, m.new_id, m.new_day from public.review_items r join id_map m on m.old_id = r.item_id;
delete from public.review_items r using id_map m where r.item_id = m.old_id;
insert into public.review_items (user_id, item_id, kind, day, box, due_at, lapses, reviews, last_correct, updated_at)
select user_id, new_id, kind, new_day, box, due_at, lapses, reviews, last_correct, updated_at from ri where new_id is not null;
update public.review_items r set day = coalesce(d.new, 0) from day_map d where r.day = d.old and r.item_id !~ '^d[0-9]{2}-';

-- answer history
delete from public.exercise_attempts e using id_map m where e.exercise_id = m.old_id and m.new_id is null;
update public.exercise_attempts e set exercise_id = m.new_id, day = m.new_day from id_map m where e.exercise_id = m.old_id;
update public.exercise_attempts e set day = coalesce(d.new, 0) from day_map d where e.day = d.old and e.exercise_id !~ '^d[0-9]{2}-';

-- saved words and bookmarks
update public.vocabulary v set source_day = coalesce(d.new, 0) from day_map d where v.source_day = d.old;
update public.bookmarks b set day = coalesce(d.new, 0) from day_map d where b.day = d.old;

-- XP ledger: lesson rewards follow their lesson (two passes so refs never collide)
update public.xp_events x
set ref = 'mv:' || coalesce(d.new::text, 'old' || d.old::text) || coalesce(substring(x.ref from '@.*$'), '')
from day_map d
where x.kind in ('lesson_complete', 'lesson_perfect', 'lesson_replay', 'level_test')
  and split_part(x.ref, '@', 1) ~ '^[0-9]+$'
  and split_part(x.ref, '@', 1)::int = d.old;
update public.xp_events set ref = substr(ref, 4) where ref like 'mv:%';

commit;
