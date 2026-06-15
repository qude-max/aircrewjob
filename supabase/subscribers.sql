-- ============================================================
-- AirCrew Jobs — email job-alert subscribers
-- Run once in the Supabase SQL Editor.
-- Anyone (anon) may sign up; only admins can read the list.
-- ============================================================

create table if not exists public.subscribers (
  id         bigint generated always as identity primary key,
  email      text not null,
  category   text not null default 'all',          -- 'all' | 'pilot' | 'crew'
  source     text default 'jobs.html',
  created_at timestamptz not null default now(),
  unique (email)
);

alter table public.subscribers enable row level security;

-- Public signup: allow inserts from anon + authenticated visitors.
drop policy if exists "anyone can subscribe" on public.subscribers;
create policy "anyone can subscribe"
  on public.subscribers for insert
  to anon, authenticated
  with check (true);

-- Only admins can read / manage the subscriber list.
drop policy if exists "admins read subscribers" on public.subscribers;
create policy "admins read subscribers"
  on public.subscribers for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admins delete subscribers" on public.subscribers;
create policy "admins delete subscribers"
  on public.subscribers for delete
  to authenticated
  using (public.is_admin());
