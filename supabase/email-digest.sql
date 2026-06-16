-- ============================================================
-- AirCrew Jobs — daily email digest (Resend)
-- ------------------------------------------------------------
-- Sends ONE email per day to each subscriber listing the new
-- verified jobs from the last 24h, filtered to their interest
-- (pilot / crew / all). Daily digest — NOT per-job — so a bulk
-- catalogue update never blasts subscribers with many emails.
--
-- PREREQUISITES (one-time, see chat for the walk-through):
--   1. Create a Resend account (resend.com).
--   2. Add & verify your domain aircrewjob.com (SPF/DKIM DNS) so
--      you can send from alerts@aircrewjob.com.
--   3. Create a Resend API key.
--   4. Supabase -> Database -> Extensions: enable `pg_cron`
--      (pg_net is already on from the Discord notifier).
--   5. Paste the API key + from-address below, then run this file
--      in Supabase -> SQL Editor.
--
-- SECURITY: the Resend API key is a SECRET. Paste it ONLY here in
-- Supabase. Never commit the real key — this repo is public.
-- ============================================================

create or replace function public.send_daily_job_digest()
  returns void
  language plpgsql
  security definer
  set search_path to 'public'
as $function$
declare
  api_key   text := 'PASTE_YOUR_RESEND_API_KEY_HERE';
  from_addr text := 'AirCrew Jobs <alerts@aircrewjob.com>';   -- MUST be your Resend-verified domain (not gmail)
  reply_to  text := 'aircrewjobcontact@gmail.com';            -- replies + unsubscribes land in your Gmail
  s   record;
  j   record;
  rows text;
  cnt int;
begin
  if api_key like 'PASTE_%' then return; end if;   -- not configured yet

  for s in select email, coalesce(category, 'all') as category from public.subscribers loop
    rows := '';
    cnt  := 0;
    for j in
      select * from public.jobs
      where verified = true
        and posted_at >= now() - interval '24 hours'
        and (s.category = 'all' or coalesce(category, 'pilot') = s.category)
      order by posted_at desc
    loop
      cnt  := cnt + 1;
      rows := rows
        || '<p style="margin:0 0 14px;padding:0 0 14px;border-bottom:1px solid #e5e8ef">'
        || '<strong>' || coalesce(j.role, '') || ' — ' || coalesce(j.aircraft, '') || '</strong> at <strong>'
        || coalesce(j.airline, '') || '</strong><br>'
        || '<span style="color:#52607a">📍 ' || coalesce(j.location, '') || ' · ' || coalesce(j.type, '')
        || ' · 💰 ' || coalesce(j.salary, 'See listing') || '</span><br>'
        || '<a href="https://www.aircrewjob.com/jobs.html?job=' || j.id
        || '" style="color:#1f7fa8;font-weight:600;text-decoration:none">View &amp; apply →</a></p>';
    end loop;

    if cnt > 0 then
      perform net.http_post(
        url     := 'https://api.resend.com/emails',
        headers := jsonb_build_object('Authorization', 'Bearer ' || api_key, 'Content-Type', 'application/json'),
        body    := jsonb_build_object(
          'from',     from_addr,
          'to',       s.email,
          'reply_to', reply_to,
          'subject',  cnt || ' new verified aircrew job' || case when cnt > 1 then 's' else '' end || ' today ✈️',
          'headers',  jsonb_build_object('List-Unsubscribe', '<mailto:aircrewjobcontact@gmail.com?subject=unsubscribe>'),
          'html',
            '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;color:#0a1020">'
            || '<h2 style="font-size:18px;margin:0 0 6px">Today''s verified jobs on AirCrew Jobs</h2>'
            || '<p style="color:#52607a;font-size:14px;margin:0 0 18px">Every listing is checked on the airline''s official careers portal — apply direct, no agents, no fees.</p>'
            || rows
            || '<p style="font-size:12px;color:#8a96ad;margin-top:18px">You signed up for job alerts at aircrewjob.com. To stop, reply "unsubscribe" or email aircrewjobcontact@gmail.com.</p>'
            || '</div>',
          'text', cnt || ' new verified aircrew jobs today — see https://www.aircrewjob.com/jobs.html'
        )
      );
    end if;
  end loop;
end $function$;

-- ---- Schedule: every day at 09:00 UTC (adjust the cron as you like) ----
-- Requires the pg_cron extension. Re-running this safely replaces the job.
do $$ begin perform cron.unschedule('daily-job-digest'); exception when others then null; end $$;
select cron.schedule('daily-job-digest', '0 9 * * *', $$ select public.send_daily_job_digest(); $$);

-- Manual test (sends now if any verified jobs were added in the last 24h):
--   select public.send_daily_job_digest();
