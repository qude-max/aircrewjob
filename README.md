# AirCrew Jobs ✈

The flight deck careers platform — verified pilot jobs from official airline portals, airline hiring intel, salary data, training guides, a flight school & Class 1 medical map, and free aptitude prep games.

## Features

- **Job board** — 140 verified vacancies from 68 airlines across 5 continents, every listing sourced from the airline's official careers portal with a direct apply link
- **Accounts & roles** — pilots/cabin crew (save jobs, apply, track status) and recruiters (post listings, review applicants) with admin approval gate
- **Airline directory** — live hiring status and recruitment notes
- **Schools & Class 1 map** — interactive world map of flight academies and aeromedical centres
- **Aptitude prep games** — reaction, memory span and multitasking trainers
- **Career guides** — 9 full articles from zero hours to command
- **Salary explorer** — comparable pay scales by airline and seniority

## Running it

It's a static site — open `index.html` in a browser, or serve the folder with any static server. No build step.

Runs in **demo mode** by default (accounts stored in localStorage). To go live with real auth + database, follow [DEPLOY.md](DEPLOY.md) — Supabase setup (~7 min) + Vercel hosting (~5 min).

## Configuration

Everything lives in `assets/config.js`: Supabase URL + anon key, and your Discord invite link.

## ⚠️ After ANY change to assets/data.js — two steps

```bash
node tools/generate-airlines.js   # rebuilds /airline/ pages, sitemap.xml AND supabase/sync-jobs.sql
```

then paste **`supabase/sync-jobs.sql`** into the Supabase SQL Editor and run it.
The static pages read data.js directly, but the LIVE job board reads the database —
the sync file is what carries catalog changes into it. It's auto-generated and
idempotent (safe to run repeatedly); recruiter posts are never touched.

---

Job listings verified 20 Jul 2026. Always confirm requirements on the airline's official site before applying.
