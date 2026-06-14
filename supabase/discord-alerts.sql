-- ============================================================
-- AirCrew Jobs — Discord new-job notifier ("Jobee")
-- ------------------------------------------------------------
-- Fires on INSERT into public.jobs and posts a Chill Wings embed.
-- Routes by job category:
--   • pilot jobs  -> #new-jobs        (webhook_pilot)
--   • cabin crew  -> #cabin-crew-jobs (webhook_crew)
-- Links point to AirCrew Jobs (jobs.html?job=ID) so traffic lands
-- on the site — where the "Apply on airline site" button lives.
--
-- SECURITY: paste each bare https://… webhook URL below (NO angle
-- brackets). Do NOT commit the real URLs — the repo is public; the
-- webhooks live only inside the database function.
--
-- Deploy: paste into Supabase → SQL Editor → Run. The existing
-- trigger calls this function by name, so no trigger change needed.
-- ============================================================

create or replace function public.notify_discord_new_job()
  returns trigger
  language plpgsql
  security definer
  set search_path to 'public'
as $function$
declare
  webhook_pilot text := 'PASTE_YOUR_PILOT_WEBHOOK_URL_HERE';        -- #new-jobs
  webhook_crew  text := 'PASTE_YOUR_CABIN_CREW_WEBHOOK_URL_HERE';   -- #cabin-crew-jobs
  is_crew boolean := (new.category = 'crew');
  webhook text := case when is_crew then webhook_crew else webhook_pilot end;
  job_url text := 'https://www.aircrewjob.com/jobs.html?job=' || new.id::text;
begin
  if webhook like 'http%' then
    perform net.http_post(
      url     := webhook,
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body    := jsonb_build_object(
        'content', '🆕 ' || case when is_crew then '🛎️' else '✈️' end
                   || ' **' || new.role || ' — ' || new.aircraft || '** at **' || new.airline || '**',
        'embeds', jsonb_build_array(jsonb_build_object(
          'title', '📍 ' || new.location || ' · ' || new.type,
          'url',   job_url,
          'description',
            coalesce(new.reqs, '') || E'\n\n💰 ' || coalesce(new.salary, 'See listing') ||
            E'\n\n🔗 [View & apply on AirCrew Jobs](' || job_url || ')',
          'color', case when is_crew then 16752540 else 3727615 end,   -- crew = rose, pilot = cyan
          'footer', jsonb_build_object(
            'text', case when new.verified
                    then '✓ Verified on the official portal · aircrewjob.com'
                    else 'Recruiter post · aircrewjob.com' end)
        ))
      )
    );
  end if;
  return new;
exception when others then
  return new;  -- never let a Discord hiccup block a job insert
end $function$;
