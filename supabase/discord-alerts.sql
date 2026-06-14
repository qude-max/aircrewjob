-- ============================================================
-- AirCrew Jobs — Discord new-job notifier ("Jobee" → #new-jobs)
-- ------------------------------------------------------------
-- Fires on INSERT into public.jobs and posts a Chill Wings embed.
-- Links point to AirCrew Jobs (jobs.html?job=ID) so traffic lands
-- on the site — where the "Apply on airline site" button lives —
-- instead of leaking straight to the airline's portal.
--
-- SECURITY: replace <WEBHOOK_URL> with your Discord webhook URL
-- before running. Do NOT commit the real URL — the repo is public.
-- The webhook lives only inside the database function.
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
  webhook text := '<WEBHOOK_URL>';
  job_url text := 'https://www.aircrewjob.com/jobs.html?job=' || new.id::text;
begin
  if webhook like 'http%' then
    perform net.http_post(
      url     := webhook,
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body    := jsonb_build_object(
        'content', '🆕 ' || case when new.category = 'crew' then '🛎️' else '✈️' end
                   || ' **' || new.role || ' — ' || new.aircraft || '** at **' || new.airline || '**',
        'embeds', jsonb_build_array(jsonb_build_object(
          'title', '📍 ' || new.location || ' · ' || new.type,
          'url',   job_url,
          'description',
            coalesce(new.reqs, '') || E'\n\n💰 ' || coalesce(new.salary, 'See listing') ||
            E'\n\n🔗 [View & apply on AirCrew Jobs](' || job_url || ')',
          'color', 3727615,
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
