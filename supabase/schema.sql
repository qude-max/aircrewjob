-- ============================================================
-- AirCrew Jobs — Supabase schema
-- Run this once in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ---------- profiles (one row per user, auto-created) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  full_name text default '',
  licence text default '',
  total_hours int default 0,
  ratings text default '',
  role text not null default 'pilot' check (role in ('pilot','crew','recruiter')),
  company text default '',
  approved boolean not null default false,   -- recruiters need admin approval; set true for pilots/crew by trigger
  is_admin boolean default false,
  alert_prefs jsonb default '{"regions":[],"roles":[],"email_weekly":true}',
  created_at timestamptz default now()
);

-- auto-create a profile on signup (role & company come from signup metadata)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_role text := coalesce(new.raw_user_meta_data->>'role', 'pilot');
begin
  insert into public.profiles (id, email, full_name, role, company, approved)
  values (
    new.id, new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    v_role,
    coalesce(new.raw_user_meta_data->>'company', ''),
    v_role <> 'recruiter'   -- pilots & crew auto-approved; recruiters wait for an admin
  );
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- jobs ----------
create table if not exists public.jobs (
  id bigint generated always as identity primary key,
  airline text not null,
  role text not null,
  aircraft text not null,
  region text not null,
  location text not null,
  type text not null,
  min_hours int not null default 0,
  rated boolean not null default false,
  salary text not null default '',
  verified boolean not null default false,
  apply_url text,
  reqs text,
  category text not null default 'pilot' check (category in ('pilot','crew')),
  posted_by uuid references public.profiles(id) on delete set null,
  posted_at timestamptz not null default now()
);

-- ---------- saved jobs ----------
create table if not exists public.saved_jobs (
  user_id uuid references public.profiles(id) on delete cascade,
  job_id bigint references public.jobs(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, job_id)
);

-- ---------- applications ----------
create table if not exists public.applications (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  job_id bigint references public.jobs(id) on delete cascade,
  cover_note text default '',
  licence text default '',
  total_hours int default 0,
  ratings text default '',
  status text not null default 'submitted',
  created_at timestamptz default now(),
  unique (user_id, job_id)
);

-- ---------- listing reports ----------
create table if not exists public.reports (
  id bigint generated always as identity primary key,
  job_id bigint references public.jobs(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  reason text not null default '',
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.saved_jobs enable row level security;
alter table public.applications enable row level security;
alter table public.reports enable row level security;

-- reports: signed-in users can flag; admins read & clear
create policy "reports insert" on public.reports for insert
  with check (auth.uid() = user_id);
create policy "reports admin read" on public.reports for select using (public.is_admin());
create policy "reports admin delete" on public.reports for delete using (public.is_admin());

-- helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public stable as
$$ select exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin) $$;

-- helper: is the current user an APPROVED recruiter?
create or replace function public.is_approved_recruiter()
returns boolean language sql security definer set search_path = public stable as
$$ select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'recruiter' and p.approved) $$;

-- profiles: users manage their own row; admins can read & update all (for the approval queue)
create policy "own profile read"   on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);
create policy "admin profile read"   on public.profiles for select using (public.is_admin());
create policy "admin profile update" on public.profiles for update using (public.is_admin());
-- recruiters may read the profiles of pilots who applied to THEIR jobs (for the applicant panel)
create policy "applicant profile read for job owner" on public.profiles for select
  using (exists (
    select 1 from public.applications a
    join public.jobs j on j.id = a.job_id
    where a.user_id = profiles.id and j.posted_by = auth.uid()
  ));

-- jobs: anyone can read; admins and APPROVED recruiters can post;
-- owners manage their own listings, admins manage everything
create policy "jobs public read" on public.jobs for select using (true);
create policy "jobs insert" on public.jobs for insert
  with check (public.is_admin() or (public.is_approved_recruiter() and posted_by = auth.uid()));
create policy "jobs update" on public.jobs for update
  using (public.is_admin() or posted_by = auth.uid());
create policy "jobs delete" on public.jobs for delete
  using (public.is_admin() or posted_by = auth.uid());

-- saved_jobs: users manage their own
create policy "saved own all" on public.saved_jobs for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- applications: applicants create & read their own;
-- the recruiter who owns the job can read its applications; admins read all
create policy "apps own read"   on public.applications for select using (auth.uid() = user_id);
create policy "apps own insert" on public.applications for insert with check (auth.uid() = user_id);
create policy "apps job owner read" on public.applications for select
  using (exists (select 1 from public.jobs j where j.id = job_id and j.posted_by = auth.uid()));
create policy "apps admin read" on public.applications for select using (public.is_admin());
-- the recruiter who owns the job (or an admin) can update application status
create policy "apps job owner update" on public.applications for update
  using (public.is_admin() or exists (select 1 from public.jobs j where j.id = job_id and j.posted_by = auth.uid()));

-- ============================================================
-- Seed vacancies
-- Verified rows (verified=true) were sourced from official airline
-- careers portals on 10 Jun 2026. Remaining rows are demo content.
-- ============================================================
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at) values
-- Emirates · official pathways (emiratesgroupcareers.com)
('Emirates','Captain','B777 / A380','Middle East','Dubai (DXB)','Direct Entry',7000,true,'Tax-free + housing + profit share',true,'https://www.emiratesgroupcareers.com/pilots/our-role-details/?name=direct-entry-captains','From 7,000 hrs TT. Direct Entry Captain pathway.', now()),
('Emirates','Captain','Accelerated Command','Middle East','Dubai (DXB)','Direct Entry',5000,false,'Tax-free + housing + profit share',true,'https://www.emiratesgroupcareers.com/pilots/our-role-details/?name=accelerated-command','From 5,000 hrs TT. Fast-track to command at Emirates.', now()),
('Emirates','First Officer','B777 / A380','Middle East','Dubai (DXB)','Direct Entry',2000,false,'Tax-free + housing + profit share',true,'https://www.emiratesgroupcareers.com/pilots/our-role-details/?name=first-officers','From 2,000 hrs TT. Training bond USD 42,000 / 42 months.', now()),
('Emirates','Cadet Pilot','National Cadet Programme','Middle East','Dubai (DXB)','Cadet',0,false,'Fully sponsored (UAE nationals)',true,'https://www.emiratesgroupcareers.com/pilots/our-role-details/?name=national-cadet-pilot-programme','0 hrs. Open to UAE nationals.', now()),
-- Etihad · live vacancies (careers.etihad.com / SmartRecruiters)
('Etihad Airways','First Officer','A320 (non-rated)','Middle East','Abu Dhabi (AUH)','Direct Entry',2500,false,'Tax-free, up to $138,318/yr',true,'https://jobs.smartrecruiters.com/EtihadAirways5/744000122598424-first-officer-a320-non-type-rated','2,500 hrs TT · 1,500 hrs multi-crew glass · ATPL/fATPL · under 50.', now()),
('Etihad Airways','First Officer','A320','Middle East','Abu Dhabi (AUH)','Rated',1500,true,'Tax-free, up to $138,318/yr',true,'https://jobs.smartrecruiters.com/EtihadAirways5/744000122343440-first-officer-a320','1,500–2,000 hrs TT with A320 time · current on type (12 mo).', now()),
('Etihad Airways','First Officer','Airbus Widebody','Middle East','Abu Dhabi (AUH)','Rated',2500,true,'Tax-free, up to $138,318/yr',true,'https://jobs.smartrecruiters.com/EtihadAirways5/744000122599168-first-officer-airbus-wide-body','2,500–3,000 hrs TT with 1,000–2,000 hrs widebody · current (12 mo).', now()),
('Etihad Airways','Captain','A320 (non-rated)','Middle East','Abu Dhabi (AUH)','Direct Entry',7000,false,'Tax-free, up to $181,589/yr',true,'https://jobs.smartrecruiters.com/EtihadAirways5/744000122599831-captain-a320-non-type-rated','7,000 hrs TT · 4,000 PIC multi-crew glass · ICAO ATPL · under 59.', now()),
('Etihad Airways','Captain','A320','Middle East','Abu Dhabi (AUH)','Rated',5500,true,'Tax-free, up to $181,589/yr',true,'https://jobs.smartrecruiters.com/EtihadAirways5/744000122343668-captain-a320','5,500 hrs TT · 2,500 PIC glass · 1,500 PIC on A320 family.', now()),
('Etihad Airways','Captain','Airbus Widebody','Middle East','Abu Dhabi (AUH)','Rated',7000,true,'Tax-free, up to $181,589/yr',true,'https://jobs.smartrecruiters.com/EtihadAirways5/744000122599538-captain-airbus-wide-body','7,000 hrs TT · 2,500–3,000 PIC jet, mostly widebody >140t · current.', now()),
('Etihad Airways','Captain','A320 — Instructor (TRI)','Middle East','Abu Dhabi (AUH)','Rated',5500,true,'See official listing',true,'https://jobs.smartrecruiters.com/EtihadAirways5/744000122595808-captain-a320-instructor','Captain A320 criteria + instructor experience — see listing.', now());

insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at) values
-- Qatar Airways
('Qatar Airways','Cadet Pilot','MPL Cadet Programme','Middle East','Doha (DOH)','Cadet',0,false,'See official listing',true,'https://careers.qatarairways.com/global/JobDetail/Cadet-Pilot-Training-Programme-Qatari-Nationals-Only/1258','Qatari nationals only · age 18+ · IELTS 6.0 · open to 30 Jun 2027.', now()),
-- flydubai
('flydubai','Captain','B737 NG / MAX','Middle East','Dubai (DXB)','Rated',5000,true,'Tax-free package — see listing',true,'https://careers.flydubai.com/captain','5,000 hrs TT · 1,500 PIC multi-crew >10t · 1,000 PIC on B737 · rating endorsed in last 24 mo.', now()),
('flydubai','First Officer','B737 NG / MAX','Middle East','Dubai (DXB)','Direct Entry',1500,false,'AED 35,250/mo + flying pay (tax-free)',true,'https://careers.flydubai.com/first-officer','Rated: 1,500 MPA hrs + 500 on B737. Non-rated: 2,500 hrs TT + 1,000 modern multi-crew jet.', now()),
('flydubai','Cadet Pilot','Ab Initio Programme','Middle East','Dubai (DXB)','Cadet',0,false,'See official listing',true,'https://careers.flydubai.com/pilots/ab-initio-pilot','0 hrs. Ab Initio Pilot Training Programme.', now()),
-- Ryanair
('Ryanair','Captain','B737-800 / 8200','Europe','Bases across Europe','Rated',3000,true,'Up to £155,500 / €165,000 in year 1',true,'https://careers.ryanair.com/pilots/jobs/','Experienced B737 Captains, all Group AOCs · 5/4 roster · full criteria on portal.', now()),
('Ryanair','First Officer','B737 (licensed cadets)','Europe','Bases across Europe','Rated',200,false,'See official listing',true,'https://careers.ryanair.com/pilots/cadets/','CPL/fATPL holders — type rating programme.', now()),
('Ryanair','Cadet Pilot','Future Flyer Academy','Europe','EU training partners','Cadet',0,false,'Self-funded with defined career path',true,'https://careers.ryanair.com/pilots/become-a-pilot/','0 hrs ab initio with path to the Ryanair flight deck.', now()),
-- easyJet
('easyJet','Captain','A320 family','Europe','UK & EU bases','Direct Entry',4000,false,'≈ £144,600–£166,300 (UK contract)',true,'https://careers.easyjet.com/en/career-areas/pilots','Rated: 4,000 TT + 1,000 PIC A320. Non-rated: 4,000 TT + 1,000 PIC jet >30t.', now()),
('easyJet','First Officer','A320 family','Europe','UK & EU bases','Direct Entry',500,false,'≈ £60,400–£83,000 (UK contract)',true,'https://careers.easyjet.com/en/career-areas/pilots','Rated: 500 hrs on A320. Non-rated: 500 hrs on aircraft >10t MTOW.', now()),
-- Wizz Air
('Wizz Air','Captain','A320 / A321','Europe','35+ bases EU & ME','Rated',3000,true,'Local contracts — see portal',true,'https://careers.wizzair.com/go/Pilot-Jobs/5258601','3,000 hrs actual flight time + 100 landings on Airbus family.', now()),
('Wizz Air','First Officer','A320 / A321','Europe','35+ bases EU & ME','Direct Entry',500,false,'Local contracts — see portal',true,'https://careers.wizzair.com/go/Pilot-Jobs/5258601','Rated: 500 hrs on type. Non-rated: 1,500 hrs jet MPA >50t.', now()),
('Wizz Air','Cadet Pilot','Pilot Academy (WAPA)','Europe','Budapest + partners','Cadet',0,false,'Tuition €13,950 (ab initio phase)',true,'https://careers.wizzair.com/go/Pilot-Academy/5382601/','0 hrs. Courses every 3 months through 2026.', now()),
-- Vueling
('Vueling','First Officer','A320','Europe','Barcelona + Spanish bases','Direct Entry',200,false,'See official listing',true,'https://careers.vueling.com/jobs/6621193-first-officer-a320-2026','fATPL/ATPL · Spanish EASA licence before OCC · Class 1 · ICAO L4 · 2026 intake.', now()),
('Vueling','Cadet Pilot','CAE Cadet Programme','Europe','CAE academies + Barcelona','Cadet',0,false,'Self-funded with airline pathway',true,'https://www.cae.com/civil-aviation/become-a-pilot/our-pilot-training-programmes/vueling-cadet-pilot-programme/','0 hrs. CPL + A320 rating then Vueling flight deck.', now()),
-- Jet2
('Jet2','Captain','B737 / A321neo','Europe','UK bases','Direct Entry',3000,false,'Competitive — 24%+ compounded rises since 2022',true,'https://jet2careers.com/pilot-careers/','TR & non-TR Captains — per-fleet criteria on Jet2 Careers.', now()),
('Jet2','First Officer','B737 / A321neo','Europe','UK bases','Rated',500,true,'See official listing',true,'https://jet2careers.com/vacancy/?vId=4613','TR B737NG/A320-family FOs (fATPL accepted).', now()),
-- Norwegian
('Norwegian','First Officer','B737','Europe','Oslo Gardermoen (OSL)','Rated',500,true,'See official listing',true,'https://careers.norwegian.com/job/Gardermoen-First-Officer-B737-2060/1358395957/','Rated B737 FOs · 90+ B737 fleet.', now()),
('Norwegian','First Officer','B737 (non-rated)','Europe','Oslo Gardermoen (OSL)','Direct Entry',1500,false,'See official listing',true,'https://careers.norwegian.com/job/Gardermoen-Experienced-Non-Type-Rated-First-Officers-2060/1359025057/','Experienced non-type-rated FOs.', now()),
-- IndiGo
('IndiGo','Captain','A320','Asia-Pacific','Indian bases','Rated',3000,true,'₹6–8 lakh/mo (typical)',true,'https://www.goindigo.in/careers/departments/flightoperations.html','DGCA ATPL with A320 PIC endorsement · 3,000 hrs TT.', now()),
('IndiGo','First Officer','A320','Asia-Pacific','Indian bases','Rated',500,true,'₹1.8–3.5 lakh/mo (typical)',true,'https://www.goindigo.in/careers/departments/flightoperations.html','Line-released A320 FOs · 200+ hrs post line release · under 55.', now()),
('IndiGo','Cadet Pilot','CAE Cadet Programme','Asia-Pacific','India + CAE academies','Cadet',0,false,'Self-funded → Junior FO on A320',true,'https://www.cae.com/civil-aviation/become-a-pilot/our-pilot-training-programmes/indigo-cadet-pilot-programme/','0 hrs. CPL + A320 rating, direct to Junior FO.', now()),
-- Cathay Pacific
('Cathay Pacific','First Officer','A321 / A330 / A350 / B777 / B747','Asia-Pacific','Hong Kong (HKG)','Direct Entry',1500,false,'Productivity contract + allowances',true,'https://careers.cathaypacific.com/en/careers/jobs/hong-kong/first-officer-direct-entry-30022','1,500 hrs TT (3,000 preferred) · 500 P1 · ICAO ATPL or CPL/MEIR with ATPL credits.', now()),
('Cathay Pacific','Cadet Pilot','Cadet Programme (~80 weeks)','Asia-Pacific','Hong Kong (HKG)','Cadet',0,false,'Fully sponsored training',true,'https://careers.cathaypacific.com/en/careers/jobs/hong-kong/cadet-pilot-programme-29631','0 hrs · HK/Chinese Mainland right to work · IELTS 6.0 · open year-round.', now()),
-- Singapore Airlines
('Singapore Airlines','Cadet Pilot','Ab Initio (A320 rating)','Asia-Pacific','Singapore (SIN)','Cadet',0,false,'Fully sponsored · 7-year bond',true,'https://careers.singaporeair.com/sia/job/Ab-Initio-Cadet-Pilot-%28Singapore%29/19586544/','0 hrs · Singapore citizens/PRs · SIA pays full training cost.', now()),
-- United Airlines
('United Airlines','First Officer','B737 / A321 / B787 / B777','Americas','US bases (DEN, ORD, IAH, EWR…)','Direct Entry',1500,false,'From $125.52/flight hr (year 1)',true,'https://careers.united.com/us/en/first-officer','1,500 hrs TT · unrestricted ATP (AMEL) · FAA Class 1 · US work authorisation.', now()),
-- Ethiopian Airlines
('Ethiopian Airlines','Captain','B777 / A350 / B767 / B737 (Expat)','Africa','Addis Ababa (ADD)','Rated',4000,true,'Expat contract — see vacancy list',true,'https://corporate.ethiopianairlines.com/AboutEthiopian/careers/vacancies','Type-rated, current Captains. Per-fleet criteria on official vacancies page.', now()),
('Ethiopian Airlines','First Officer','B737 NG (non-rated)','Africa','Addis Ababa (ADD)','Direct Entry',1500,false,'See official listing',true,'https://corporate.ethiopianairlines.com/AboutEthiopian/careers/vacancies','1,500 hrs TT · ATPL.', now()),
-- Virgin Australia
('Virgin Australia','First Officer','B737','Asia-Pacific','Australian bases','Direct Entry',500,false,'See official listing',true,'https://www.virginaustralia.com/au/en/about-us/careers/pilot-jobs/','Australian ATPL or CPL with ATPL theory · MEA IR (2D/3D).', now()),
-- Air New Zealand
('Air New Zealand','First Officer','Turboprop (Q300 / ATR72)','Asia-Pacific','NZ regional bases','Direct Entry',500,false,'See official listing',true,'https://careers.airnewzealand.co.nz/job/expression-of-interest-first-officer-turboprop-fleet-in-auckland-nz-jid-149','EOI · NZCAA CPL/ATPL · NZ/AU citizenship or residency.', now()),
-- Turkish Airlines (verified 11 Jun 2026)
('Turkish Airlines','Captain','A320 / A330 / B777','Middle East','Istanbul (IST)','Rated',5500,true,'≈ $174,000–$198,000',true,'https://careers.turkishairlines.com/en-us/cockpit-crew','5,500 hrs TT · 3,000 hrs >27t · 3/1 commuting roster.', now()),
('Turkish Airlines','First Officer','A320 / A330 / B777','Middle East','Istanbul (IST)','Rated',1500,true,'≈ $84,000–$132,000',true,'https://careers.turkishairlines.com/en-us/cockpit-crew','CPL/IR with ATPL credits or ATPL · 1,500 hrs on type.', now()),
-- Riyadh Air (verified 11 Jun 2026)
('Riyadh Air','Captain','B787','Middle East','Riyadh (RUH)','Rated',5000,true,'See official listing',true,'https://www.riyadhair.com/en/careers/pilots','DEC Captains — official channels only.', now()),
('Riyadh Air','First Officer','B787','Middle East','Riyadh (RUH)','Rated',1500,true,'See official listing',true,'https://pilots-riyadhair.icims.com/jobs/1124/first-officer-b787/job','B787 FOs, Riyadh base.', now());

-- British Airways & Aer Lingus (verified 11 Jun 2026)
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at) values
('British Airways','First Officer','A320 / B777 / B787 (DEP)','Europe','London Heathrow / Gatwick','Direct Entry',1500,false,'See official listing',true,'https://careers.ba.com/future-pilots','DEP, Self-Sponsored & Military pathways open. Speedbird Academy closed for 2026 — next intake expected 2027.', now()),
('Aer Lingus','First Officer','A320 family','Europe','Dublin (DUB)','Direct Entry',500,false,'See official listing',true,'https://www.aerlingus.com/careers/careers-in-the-air/direct-entry-pilots/','2026 Direct Entry campaign live — criteria on portal.', now());

-- Cabin crew (verified 11 Jun 2026)
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, category, posted_at) values
('Emirates','Cabin Crew','A380 / B777 cabins','Middle East','Dubai (DXB)','Direct Entry',0,false,'Tax-free + free accommodation + travel perks',true,'https://www.emiratesgroupcareers.com/cabin-crew/','21+ · Grade 12 · fluent English · 1+ yr customer service · open days worldwide.','crew', now()),
('Qatar Airways','Cabin Crew','QR international fleet','Middle East','Doha (DOH)','Direct Entry',0,false,'Tax-free + furnished accommodation + medical',true,'https://careers.qatarairways.com/global/JobDetail/Cabin-Crew-Recruitment-Doha-Qatar-2026/77216','Online application open · walk-in events worldwide.','crew', now()),
('Singapore Airlines','Cabin Crew','SQ international fleet','Asia-Pacific','MY · KR · JP · TH · IN bases','Direct Entry',0,false,'See official listing',true,'https://careers.singaporeair.com/sia/go/Cabin-Crew/689244/','Open for MY/KR/JP/TH/IN intakes (SIN base currently closed).','crew', now());

-- ============================================================
-- After you sign up in the app, make yourself an admin:
--   update public.profiles set is_admin = true where email = 'you@example.com';
-- ============================================================
