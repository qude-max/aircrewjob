# Deploying AirCrew Jobs

The site runs in two modes:

- **Demo mode** (right now): no accounts needed. Auth, saved jobs, applications and the recruiter dashboard all work using your browser's localStorage. Just open `index.html`.
- **Live mode**: real database + real accounts via Supabase, hosted on Vercel. ~15 minutes of setup, both free tiers.

---

## Part 1 — Supabase (the backend) · ~7 min

1. Go to [supabase.com](https://supabase.com) → **Start your project** → sign up (GitHub login is fastest).
2. **New project** → pick any name (e.g. `aircrewjobs`), set a database password (save it somewhere), choose the region closest to you → **Create new project**. Wait ~2 min for provisioning.
3. In the left sidebar: **SQL Editor** → **New query** → paste the entire contents of `supabase/schema.sql` from this folder → **Run**. You should see "Success". This creates all tables, security rules, and seeds 24 jobs.
4. Sidebar: **Project Settings** (gear) → **API**. Copy two values:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon public** key (the long one under "Project API keys")
5. Open `assets/config.js` in this folder and paste them in:
   ```js
   const SUPABASE_URL = "https://abcdefgh.supabase.co";
   const SUPABASE_ANON_KEY = "eyJhbGciOi...";
   ```
   (The anon key is safe to expose in frontend code — Row Level Security protects the data.)
6. Open the site, **create your account** via Sign in → Create account.
   - By default Supabase sends a confirmation email. To skip that during testing: **Authentication → Sign In / Up → Email → disable "Confirm email"**.
7. Make yourself an admin (unlocks the recruiter dashboard). SQL Editor → run:
   ```sql
   update public.profiles set is_admin = true where email = 'your@email.com';
   ```

Done — refresh the site and everything (accounts, saved jobs, applications, job posting) is live against a real database.

---

## Part 2 — Vercel (the hosting) · ~5 min

**Option A — via GitHub (recommended, auto-deploys on every change):**

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → sign up with GitHub → **Add New → Project** → import your repo.
3. Framework preset: **Other**. No build command, no output directory changes needed (it's a static site). → **Deploy**.
4. You get a live URL like `aircrewjobs.vercel.app`. Add a custom domain later in Project → Settings → Domains.

**Option B — no GitHub, via CLI:**

```bash
npm i -g vercel
cd /path/to/aircrewjobs
vercel          # follow prompts, accept defaults
vercel --prod   # production deploy
```

**After deploying:** in Supabase → **Authentication → URL Configuration**, set the Site URL to your Vercel URL so email confirmation links point to the right place.

---

## Accounts & roles

Three account types at signup: **Pilot**, **Cabin Crew** (jobs coming later) and **Recruiter**.

- Pilots/crew are active immediately: save jobs, apply, set alerts.
- Recruiters are created in a **pending** state and cannot post until an admin approves them
  (admin.html → Recruiter approvals). Once approved, their listings publish instantly with a
  "Recruiter post" badge — clearly distinct from the "✓ Verified · official" airline listings —
  and they see applicants per listing in recruiter.html. Admins can remove any listing.
- Demo mode: recruiter accounts genuinely go through the approval gate; any pilot/crew account
  can act as platform admin so you can test both sides in one browser.
- Live mode: grant admin with `update public.profiles set is_admin = true where email = '…';`

## What's where

| File | Purpose |
|---|---|
| `assets/config.js` | The only file you edit to go live |
| `assets/backend.js` | Data layer — auto-switches demo ↔ Supabase |
| `supabase/schema.sql` | Full database setup, run once |
| `recruiter.html` | Recruiter dashboard — post jobs, review applicants |
| `admin.html` | Platform admin — approve recruiters, moderate listings |

## Notes & next steps

- Airlines and salary pages currently use curated static data (`assets/data.js`) — sensible, since that's editorial content. They can be moved to Supabase tables later the same way jobs were.
- Weekly alert emails would need a Supabase Edge Function + an email provider (e.g. Resend) — happy to build that next.
- All job listings are demo/illustrative content. Replace with real vacancies via the recruiter dashboard.
