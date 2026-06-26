/* ============================================================
   AirCrew Jobs — backend configuration
   ------------------------------------------------------------
   DEMO MODE (default): leave the placeholders below as-is.
   Everything works using your browser's localStorage.

   LIVE MODE: create a free project at https://supabase.com,
   run supabase/schema.sql in the SQL Editor, then paste your
   Project URL and anon/public key here (Settings → API).
   ============================================================ */

const SUPABASE_URL = "https://nxtumyutsfhvrhbrozzu.supabase.co";        // e.g. "https://abcdefgh.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54dHVteXV0c2ZodnJoYnJvenp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwOTMyNzYsImV4cCI6MjA5NjY2OTI3Nn0.uHTj73iEhE2hx9leJ8HtT3x_iwFh44TlM8ihQWoLWrQ";      // the long "anon public" key

/* Community — paste your Discord invite link here (one place, used site-wide) */
const DISCORD_INVITE = "https://discord.gg/NYdRP7d69p";

/* Optional — your Discord server ID, for the live "aircrew online" count.
   Enable it: Discord → Server Settings → Widget → Enable Server Widget.
   Get the ID: Discord → Settings → Advanced → Developer Mode ON, then
   right-click your server → Copy Server ID. Leave "" to hide the count. */
const DISCORD_GUILD_ID = "1487767764775993346";

/* Community — Telegram job-alert channel (auto-posts every new verified job).
   Paste your PUBLIC channel link here once created, e.g. "https://t.me/AircrewJobs".
   Leave "" to hide the Telegram buttons site-wide. */
const TELEGRAM_INVITE = "";

/* Community — WhatsApp Channel (one-tap follow, no install/onboarding —
   best fit for our mostly-mobile South-Asia audience). Paste the channel
   share link here. Leave "" to hide the WhatsApp buttons site-wide. */
const WHATSAPP_INVITE = "https://whatsapp.com/channel/0029VbCdabI7oQhYilhuxc2g";

/* Monetization — Training Centre (games.html) premium unlock. One-time S$5 for a
   60-day pass, tied to the user's account (secure: a Stripe webhook → Supabase
   Edge Function writes the access; users can't self-grant). Requires login.
   Stripe one-time Payment Link; set its success URL to:
     https://www.aircrewjob.com/games.html?prep_paid=1
   The site appends ?client_reference_id=<userId> so the webhook knows who paid. */
const PREP_CHECKOUT_URL = "https://buy.stripe.com/6oU00k2zlbDy4pWdFZ28803";
const PREP_PRICE = "S$5 · 2-month pass";
