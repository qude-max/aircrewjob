-- ============================================================
-- AirCrew Jobs — B2B flight-school interest leads
-- ------------------------------------------------------------
-- A student registers interest in a flight school on the map.
-- These leads are the asset you sell/forward to schools (and
-- proof of demand when pitching "featured partner" placement).
-- Anyone can submit; only admins can read. Run once in Supabase.
-- ============================================================
create table if not exists public.school_leads (
  id         bigint generated always as identity primary key,
  school     text,
  region     text,
  name       text,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.school_leads enable row level security;

drop policy if exists "anyone can register interest" on public.school_leads;
create policy "anyone can register interest"
  on public.school_leads for insert
  to anon, authenticated
  with check (true);

drop policy if exists "admins read school leads" on public.school_leads;
create policy "admins read school leads"
  on public.school_leads for select
  to authenticated
  using (public.is_admin());

-- Check:  select school, count(*) from school_leads group by school order by 2 desc;
