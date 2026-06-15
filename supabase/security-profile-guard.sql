-- ============================================================
-- AirCrew Jobs — privilege-escalation guard for profiles
-- ------------------------------------------------------------
-- The "own profile update" RLS policy lets a user update their
-- own row, which (without this) also lets them set is_admin /
-- approved / role on themselves. This trigger forces those
-- privilege columns back to their previous values for anyone
-- who is NOT already an admin — so normal edits (name, licence,
-- hours, etc.) still work, but self-promotion is impossible.
--
-- Run once in Supabase → SQL Editor.
-- ============================================================

create or replace function public.guard_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    new.is_admin := old.is_admin;
    new.approved := old.approved;
    new.role     := old.role;
  end if;
  return new;
end $$;

drop trigger if exists profiles_guard_privileges on public.profiles;
create trigger profiles_guard_privileges
  before update on public.profiles
  for each row execute function public.guard_profile_privileges();

-- ---- Audit: who currently has elevated privileges? ----
-- Run this to confirm ONLY your own account is admin / nobody self-approved:
--   select email, is_admin, approved, role from public.profiles
--   where is_admin or approved order by is_admin desc;
