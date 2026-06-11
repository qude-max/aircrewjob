-- ============================================================
-- Migration: replace generic BA listing with the 4 real postings
-- (+ BA cabin crew talent pool). Safe to run whether or not you
-- ran migration-ba-aerlingus.sql — it removes old BA rows first.
-- Run once in Supabase SQL Editor.
-- ============================================================

delete from public.jobs where airline = 'British Airways';

insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at) values
('British Airways','First Officer','Military Pilot Pathway','Europe','London Heathrow','Direct Entry',1000,false,'See official listing',true,'https://careers.ba.com/job/heathrow/military-pilot-pathway/22348/94593554320','Current/former military pilots transitioning to BA mainline — full criteria on the posting.', now()),
('British Airways','Captain','E190 (BA Cityflyer)','Europe','London City (LCY)','Direct Entry',3000,false,'See official listing',true,'https://careers.ba.com/job/london/ba-cityflyer-direct-entry-captain/22348/94593554608','Direct Entry Captain at BA Cityflyer — full criteria on the posting.', now()),
('British Airways','Captain','E190 (BA Cityflyer)','Europe','Edinburgh (EDI)','Direct Entry',3000,false,'See official listing',true,'https://careers.ba.com/job/edinburgh/ba-cityflyer-direct-entry-captain/22348/94593554592','Direct Entry Captain at BA Cityflyer, Edinburgh base — full criteria on the posting.', now()),
('British Airways','First Officer','E190 (BA Cityflyer) — Aspiration to Command','Europe','London City (LCY)','Direct Entry',1500,false,'See official listing',true,'https://careers.ba.com/job/london/ba-cityflyer-aspiration-to-command/22348/94593554560','Experienced FOs joining the E190 command pathway — full criteria on the posting.', now());

insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, category, posted_at) values
('British Airways','Cabin Crew','Talent Pool','Europe','London Heathrow','Direct Entry',0,false,'See official listing',true,'https://careers.ba.com/job/heathrow/cabin-crew-talent-pool/22348/94593554544','Live talent-pool posting — register for upcoming Heathrow cabin crew intakes.','crew', now());

-- If you never ran migration-ba-aerlingus.sql, also add Aer Lingus:
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at)
select 'Aer Lingus','First Officer','A320 family','Europe','Dublin (DUB)','Direct Entry',500,false,'See official listing',true,'https://www.aerlingus.com/careers/careers-in-the-air/direct-entry-pilots/','2026 Direct Entry campaign live — criteria on portal.', now()
where not exists (select 1 from public.jobs where airline = 'Aer Lingus');
