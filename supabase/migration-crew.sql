-- ============================================================
-- Migration: cabin crew category + new verified listings
-- Run once in Supabase SQL Editor on the EXISTING database.
-- (New databases get all this from schema.sql automatically.)
-- ============================================================

alter table public.jobs add column if not exists category text not null default 'pilot';
do $$ begin
  alter table public.jobs add constraint jobs_category_check check (category in ('pilot','crew'));
exception when duplicate_object then null; end $$;

-- New pilot listings (verified 11 Jun 2026)
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at) values
('Turkish Airlines','Captain','A320 / A330 / B777','Middle East','Istanbul (IST)','Rated',5500,true,'≈ $174,000–$198,000',true,'https://careers.turkishairlines.com/en-us/cockpit-crew','5,500 hrs TT · 3,000 hrs >27t · 3/1 commuting roster.', now()),
('Turkish Airlines','First Officer','A320 / A330 / B777','Middle East','Istanbul (IST)','Rated',1500,true,'≈ $84,000–$132,000',true,'https://careers.turkishairlines.com/en-us/cockpit-crew','CPL/IR with ATPL credits or ATPL · 1,500 hrs on type.', now()),
('Riyadh Air','Captain','B787','Middle East','Riyadh (RUH)','Rated',5000,true,'See official listing',true,'https://www.riyadhair.com/en/careers/pilots','DEC Captains — official channels only.', now()),
('Riyadh Air','First Officer','B787','Middle East','Riyadh (RUH)','Rated',1500,true,'See official listing',true,'https://pilots-riyadhair.icims.com/jobs/1124/first-officer-b787/job','B787 FOs, Riyadh base.', now());

-- Cabin crew listings (verified 11 Jun 2026)
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, category, posted_at) values
('Emirates','Cabin Crew','A380 / B777 cabins','Middle East','Dubai (DXB)','Direct Entry',0,false,'Tax-free + free accommodation + travel perks',true,'https://www.emiratesgroupcareers.com/cabin-crew/','21+ · Grade 12 · fluent English · 1+ yr customer service · open days worldwide.','crew', now()),
('Qatar Airways','Cabin Crew','QR international fleet','Middle East','Doha (DOH)','Direct Entry',0,false,'Tax-free + furnished accommodation + medical',true,'https://careers.qatarairways.com/global/JobDetail/Cabin-Crew-Recruitment-Doha-Qatar-2026/77216','Online application open · walk-in events worldwide.','crew', now()),
('Singapore Airlines','Cabin Crew','SQ international fleet','Asia-Pacific','MY · KR · JP · TH · IN bases','Direct Entry',0,false,'See official listing',true,'https://careers.singaporeair.com/sia/go/Cabin-Crew/689244/','Open for MY/KR/JP/TH/IN intakes (SIN base currently closed).','crew', now());
