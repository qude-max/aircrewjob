-- Migration: BA + Aer Lingus listings (verified 11 Jun 2026)
-- Run once in Supabase SQL Editor on the EXISTING database.
insert into public.jobs (airline, role, aircraft, region, location, type, min_hours, rated, salary, verified, apply_url, reqs, posted_at) values
('British Airways','First Officer','A320 / B777 / B787 (DEP)','Europe','London Heathrow / Gatwick','Direct Entry',1500,false,'See official listing',true,'https://careers.ba.com/future-pilots','DEP, Self-Sponsored & Military pathways open. Speedbird Academy closed for 2026 — next intake expected 2027.', now()),
('Aer Lingus','First Officer','A320 family','Europe','Dublin (DUB)','Direct Entry',500,false,'See official listing',true,'https://www.aerlingus.com/careers/careers-in-the-air/direct-entry-pilots/','2026 Direct Entry campaign live — criteria on portal.', now());
