-- ============================================================
-- AirCrew Jobs — application tracker ("My Applications")
-- ------------------------------------------------------------
-- Per-user list of jobs they've applied to (across external
-- airline portals), with status + notes. Anonymous users keep
-- this in their browser (localStorage); signed-in users get it
-- saved here and synced across devices.
-- Run once in Supabase -> SQL Editor.
-- ============================================================

create table if not exists public.tracked_applications (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  job_id      text,
  airline     text,
  role        text,
  status      text not null default 'applied',   -- applied | interviewing | offer | hired | not_hired
  notes       text default '',
  applied_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

alter table public.tracked_applications enable row level security;

-- Each user can only see and manage their own tracked applications.
drop policy if exists "tracked own select" on public.tracked_applications;
create policy "tracked own select" on public.tracked_applications for select to authenticated using (auth.uid() = user_id);
drop policy if exists "tracked own insert" on public.tracked_applications;
create policy "tracked own insert" on public.tracked_applications for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "tracked own update" on public.tracked_applications;
create policy "tracked own update" on public.tracked_applications for update to authenticated using (auth.uid() = user_id);
drop policy if exists "tracked own delete" on public.tracked_applications;
create policy "tracked own delete" on public.tracked_applications for delete to authenticated using (auth.uid() = user_id);
