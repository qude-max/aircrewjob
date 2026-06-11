-- ============================================================
-- Migration: listing reports table
-- Run once in Supabase SQL Editor on the EXISTING database.
-- ============================================================

create table if not exists public.reports (
  id bigint generated always as identity primary key,
  job_id bigint references public.jobs(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  reason text not null default '',
  created_at timestamptz default now()
);

alter table public.reports enable row level security;

create policy "reports insert" on public.reports for insert
  with check (auth.uid() = user_id);
create policy "reports admin read" on public.reports for select using (public.is_admin());
create policy "reports admin delete" on public.reports for delete using (public.is_admin());
