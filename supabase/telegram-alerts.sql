-- ============================================================
-- AirCrew Jobs — Telegram new-job notifier
-- ------------------------------------------------------------
-- Posts every new job to your Telegram channel so aircrew can
-- subscribe for instant alerts — high-value for the Telegram/
-- WhatsApp-first audience in South & SE Asia.
--
-- SETUP (do this first — see chat for the step-by-step):
--   1. Create a bot with @BotFather       -> copy the bot TOKEN
--   2. Create a PUBLIC channel (e.g. AircrewJobs -> @AircrewJobs)
--   3. Add the bot as an ADMIN of the channel (with "Post" right)
--   4. Paste the TOKEN + channel below, then run this file in
--      Supabase -> SQL Editor.
--
-- SECURITY: the bot token is a SECRET. Paste it ONLY here in
-- Supabase. Never commit the real token — this repo is public.
-- ============================================================

create or replace function public.notify_telegram_new_job()
  returns trigger
  language plpgsql
  security definer
  set search_path to 'public'
as $function$
declare
  bot_token text := 'PASTE_YOUR_TELEGRAM_BOT_TOKEN_HERE';   -- from @BotFather
  channel   text := '@AircrewJobs';                          -- your public channel @username (keep the @)
  job_url   text := 'https://www.aircrewjob.com/jobs.html?job=' || new.id::text;
  icon      text := case when new.category = 'crew' then '🛎️' else '✈️' end;
  msg       text;
begin
  if bot_token like 'PASTE_%' then
    return new;  -- not configured yet — do nothing
  end if;

  msg := '🆕 ' || icon || ' ' || new.role || ' — ' || new.aircraft || E'\n'
      || 'at ' || new.airline || E'\n'
      || '📍 ' || new.location || ' · ' || new.type || E'\n'
      || '💰 ' || coalesce(new.salary, 'See listing') || E'\n'
      || case when new.verified then '✓ Verified on the official portal' else 'Recruiter post' end || E'\n'
      || '👉 ' || job_url;

  perform net.http_post(
    url     := 'https://api.telegram.org/bot' || bot_token || '/sendMessage',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body    := jsonb_build_object(
      'chat_id', channel,
      'text', msg,
      'disable_web_page_preview', false
    )
  );
  return new;
exception when others then
  return new;  -- never let a Telegram hiccup block a job insert
end $function$;

-- Fire after every job insert (runs alongside the Discord trigger)
drop trigger if exists trg_telegram_new_job on public.jobs;
create trigger trg_telegram_new_job
  after insert on public.jobs
  for each row execute function public.notify_telegram_new_job();
