-- ============================================================
-- CONSOLIDATED MIGRATION — 11 Jun 2026
-- Brings an existing live database fully up to date, no matter
-- which earlier migration files were or weren't run.
-- Safe to run ONCE in Supabase SQL Editor. Every step is guarded.
-- Supersedes: migration-crew.sql, migration-reports.sql,
--             migration-ba-aerlingus.sql, migration-ba-fix.sql
-- ============================================================

-- 1. category column (pilot/crew)
alter table public.jobs add column if not exists category text not null default 'pilot';
do $$ begin
  alter table public.jobs add constraint jobs_category_check check (category in ('pilot','crew'));
exception when duplicate_object then null; end $$;

-- 2. reports table + policies
create table if not exists public.reports (
  id bigint generated always as identity primary key,
  job_id bigint references public.jobs(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  reason text not null default '',
  created_at timestamptz default now()
);
alter table public.reports enable row level security;
do $$ begin
  create policy "reports insert" on public.reports for insert with check (auth.uid() = user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "reports admin read" on public.reports for select using (public.is_admin());
exception when duplicate_object then null; end $$;
do $$ begin
  create policy "reports admin delete" on public.reports for delete using (public.is_admin());
exception when duplicate_object then null; end $$;

-- 3. Low-cost carriers round (if missing)
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
select * from (values
  ('Vueling','First Officer','A320','Europe','Barcelona + Spanish bases','Direct Entry',200,false,'See official listing',true,'https://careers.vueling.com/jobs/6621193-first-officer-a320-2026','fATPL/ATPL · Spanish EASA licence before OCC · Class 1 · ICAO L4 · 2026 intake.', now()),
  ('Vueling','Cadet Pilot','CAE Cadet Programme','Europe','CAE academies + Barcelona','Cadet',0,false,'Self-funded with airline pathway',true,'https://www.cae.com/civil-aviation/become-a-pilot/our-pilot-training-programmes/vueling-cadet-pilot-programme/','0 hrs. CPL + A320 rating then Vueling flight deck.', now())
) as v(airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
where not exists (select 1 from public.jobs where airline = 'Vueling');

insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
select * from (values
  ('Jet2','Captain','B737 / A321neo','Europe','UK bases','Direct Entry',3000,false,'Competitive — 24%+ compounded rises since 2022',true,'https://jet2careers.com/pilot-careers/','TR & non-TR Captains — per-fleet criteria on Jet2 Careers.', now()),
  ('Jet2','First Officer','B737 / A321neo','Europe','UK bases','Rated',500,true,'See official listing',true,'https://jet2careers.com/vacancy/?vId=4613','TR B737NG/A320-family FOs (fATPL accepted).', now())
) as v(airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
where not exists (select 1 from public.jobs where airline = 'Jet2');

insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
select * from (values
  ('Norwegian','First Officer','B737','Europe','Oslo Gardermoen (OSL)','Rated',500,true,'See official listing',true,'https://careers.norwegian.com/job/Gardermoen-First-Officer-B737-2060/1358395957/','Rated B737 FOs · 90+ B737 fleet.', now()),
  ('Norwegian','First Officer','B737 (non-rated)','Europe','Oslo Gardermoen (OSL)','Direct Entry',1500,false,'See official listing',true,'https://careers.norwegian.com/job/Gardermoen-Experienced-Non-Type-Rated-First-Officers-2060/1359025057/','Experienced non-type-rated FOs.', now())
) as v(airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
where not exists (select 1 from public.jobs where airline = 'Norwegian');

insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
select * from (values
  ('IndiGo','Captain','A320','Asia-Pacific','Indian bases','Rated',3000,true,'₹6–8 lakh/mo (typical)',true,'https://www.goindigo.in/careers/departments/flightoperations.html','DGCA ATPL with A320 PIC endorsement · 3,000 hrs TT.', now()),
  ('IndiGo','First Officer','A320','Asia-Pacific','Indian bases','Rated',500,true,'₹1.8–3.5 lakh/mo (typical)',true,'https://www.goindigo.in/careers/departments/flightoperations.html','Line-released A320 FOs · 200+ hrs post line release · under 55.', now()),
  ('IndiGo','Cadet Pilot','CAE Cadet Programme','Asia-Pacific','India + CAE academies','Cadet',0,false,'Self-funded → Junior FO on A320',true,'https://www.cae.com/civil-aviation/become-a-pilot/our-pilot-training-programmes/indigo-cadet-pilot-programme/','0 hrs. CPL + A320 rating, direct to Junior FO.', now())
) as v(airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
where not exists (select 1 from public.jobs where airline = 'IndiGo');

-- 4. Turkish Airlines: no open cockpit postings (checked 11 Jun 2026) — remove if present
delete from public.jobs where airline = 'Turkish Airlines';

-- Riyadh Air (if missing)
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
select * from (values
  ('Riyadh Air','Captain','B787','Middle East','Riyadh (RUH)','Rated',5000,true,'See official listing',true,'https://www.riyadhair.com/en/careers/pilots','DEC Captains — official channels only.', now()),
  ('Riyadh Air','First Officer','B787','Middle East','Riyadh (RUH)','Rated',1500,true,'See official listing',true,'https://pilots-riyadhair.icims.com/jobs/1124/first-officer-b787/job','B787 FOs, Riyadh base.', now())
) as v(airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
where not exists (select 1 from public.jobs where airline = 'Riyadh Air');

-- 5. Cabin crew (if missing)
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, category, posted_at)
select * from (values
  ('Emirates','Cabin Crew','A380 / B777 cabins','Middle East','Dubai (DXB)','Direct Entry',0,false,'Tax-free + free accommodation + travel perks',true,'https://www.emiratesgroupcareers.com/cabin-crew/','21+ · Grade 12 · fluent English · 1+ yr customer service · open days worldwide.','crew', now()),
  ('Qatar Airways','Cabin Crew','QR international fleet','Middle East','Doha (DOH)','Direct Entry',0,false,'Tax-free + furnished accommodation + medical',true,'https://careers.qatarairways.com/global/JobDetail/Cabin-Crew-Recruitment-Doha-Qatar-2026/77216','Online application open · walk-in events worldwide.','crew', now()),
  ('Singapore Airlines','Cabin Crew','SQ international fleet','Asia-Pacific','MY · KR · JP · TH · IN bases','Direct Entry',0,false,'See official listing',true,'https://careers.singaporeair.com/sia/go/Cabin-Crew/689244/','Open for MY/KR/JP/TH/IN intakes (SIN base currently closed).','crew', now())
) as v(airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, category, posted_at)
where not exists (select 1 from public.jobs where category = 'crew');

-- 6. British Airways — remove any old/generic rows, insert the 4 real postings + crew talent pool
delete from public.jobs where airline = 'British Airways';
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at) values
('British Airways','First Officer','Military Pilot Pathway','Europe','London Heathrow','Direct Entry',1000,false,'See official listing',true,'https://careers.ba.com/job/heathrow/military-pilot-pathway/22348/94593554320','Current/former military pilots transitioning to BA mainline — full criteria on the posting.', now()),
('British Airways','Captain','E190 (BA Cityflyer)','Europe','London City (LCY)','Direct Entry',3000,false,'See official listing',true,'https://careers.ba.com/job/london/ba-cityflyer-direct-entry-captain/22348/94593554608','Direct Entry Captain at BA Cityflyer — full criteria on the posting.', now()),
('British Airways','Captain','E190 (BA Cityflyer)','Europe','Edinburgh (EDI)','Direct Entry',3000,false,'See official listing',true,'https://careers.ba.com/job/edinburgh/ba-cityflyer-direct-entry-captain/22348/94593554592','Direct Entry Captain at BA Cityflyer, Edinburgh base — full criteria on the posting.', now()),
('British Airways','First Officer','E190 (BA Cityflyer) — Aspiration to Command','Europe','London City (LCY)','Direct Entry',1500,false,'See official listing',true,'https://careers.ba.com/job/london/ba-cityflyer-aspiration-to-command/22348/94593554560','Experienced FOs joining the E190 command pathway — full criteria on the posting.', now());
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, category, posted_at) values
('British Airways','Cabin Crew','Talent Pool','Europe','London Heathrow','Direct Entry',0,false,'See official listing',true,'https://careers.ba.com/job/heathrow/cabin-crew-talent-pool/22348/94593554544','Live talent-pool posting — register for upcoming Heathrow cabin crew intakes.','crew', now());

-- 7. Aer Lingus: DEP application process closed (confirmed 11 Jun 2026) — remove if present
delete from public.jobs where airline = 'Aer Lingus';

-- 8. Sanity check — should match the website's data.js (50 rows, 4 crew)
select count(*) as total_jobs, count(*) filter (where category = 'crew') as crew_jobs from public.jobs;
