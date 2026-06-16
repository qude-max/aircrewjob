-- ============================================================
-- AirCrew Jobs — apply click-out logging
-- ------------------------------------------------------------
-- Records every "Apply on airline site" click, anonymously
-- (job id + timestamp only — NO personal data). This gives a
-- consent-proof, first-party count of the #1 action, independent
-- of Google Ads / cookie consent.
--
-- Run once in Supabase -> SQL Editor.
-- ============================================================

create table if not exists public.apply_clicks (
  id         bigint generated always as identity primary key,
  job_id     text,
  airline    text,
  created_at timestamptz not null default now()
);

alter table public.apply_clicks enable row level security;

-- Anyone (anon or logged-in) may log a click; no consent needed (no personal data).
drop policy if exists "anyone can log apply click" on public.apply_clicks;
create policy "anyone can log apply click"
  on public.apply_clicks for insert
  to anon, authenticated
  with check (true);

-- Only admins can read the log.
drop policy if exists "admins read apply clicks" on public.apply_clicks;
create policy "admins read apply clicks"
  on public.apply_clicks for select
  to authenticated
  using (public.is_admin());

-- Handy views to check later:
--   select count(*) from apply_clicks;                                  -- total click-outs
--   select airline, count(*) from apply_clicks group by airline order by 2 desc;  -- by airline
--   select date_trunc('day', created_at) d, count(*) from apply_clicks group by 1 order by 1;  -- per day
