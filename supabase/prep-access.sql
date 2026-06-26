-- ============================================================
-- AirCrew Jobs — Training Centre paid access (60-day pass)
-- ------------------------------------------------------------
-- One row per user. expires_at is written ONLY by the Stripe
-- webhook (Edge Function, service role) — users can read their
-- own row but cannot write it, so access can't be self-granted.
-- Run once in Supabase -> SQL Editor.
-- ============================================================

create table if not exists public.prep_access (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  expires_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.prep_access enable row level security;

-- Users may READ their own access row (to show "days left").
drop policy if exists "read own prep access" on public.prep_access;
create policy "read own prep access"
  on public.prep_access for select
  to authenticated
  using (auth.uid() = user_id);

-- NO insert/update/delete policy for anon or authenticated.
-- Only the service role (used by the Stripe webhook Edge Function)
-- bypasses RLS and can write — this is what makes the pass un-forgeable.

-- Check later:  select * from prep_access order by updated_at desc;
