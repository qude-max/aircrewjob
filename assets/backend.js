/* ============================================================
   AirCrew Jobs — unified data layer
   Runs in "demo" mode (localStorage) by default.
   Automatically switches to Supabase when config.js is filled in
   and the supabase-js CDN script is loaded on the page.
   Requires: config.js, data.js loaded first.

   Roles: "pilot" | "crew" | "recruiter"
   Recruiters must be approved by an admin before posting jobs.
   ============================================================ */

const Backend = (() => {
  const configured =
    typeof SUPABASE_URL === "string" && SUPABASE_URL.startsWith("https://") &&
    typeof SUPABASE_ANON_KEY === "string" && SUPABASE_ANON_KEY.length > 40 &&
    typeof window !== "undefined" && window.supabase;

  const mode = configured ? "supabase" : "demo";
  let sb = null, currentUser = null, currentProfile = null, recoveryMode = false;
  const authListeners = [];

  /* ---------- demo-mode storage helpers ---------- */
  const LS = {
    get(k, d) { try { return JSON.parse(localStorage.getItem("acj_" + k)) ?? d; } catch { return d; } },
    set(k, v) { localStorage.setItem("acj_" + k, JSON.stringify(v)); }
  };
  const demoUsers = () => LS.get("users", {});
  const saveDemoUsers = u => LS.set("users", u);
  const emptyProfile = (email, role = "pilot", company = "") => ({
    email, full_name: "", licence: "", total_hours: 0, ratings: "",
    role, company,
    approved: role !== "recruiter",   // pilots & crew are auto-approved; recruiters need admin sign-off
    is_admin: role !== "recruiter",   // demo mode: pilot/crew accounts may act as platform admin to try the
                                      // approval flow; recruiter accounts genuinely go through the gate
    alert_prefs: { regions: [], roles: [], email_weekly: true }
  });
  const normalizeDemoProfile = p => ({ role: "pilot", company: "", approved: true, ...p });

  function notifyAuth() { authListeners.forEach(cb => cb(currentUser, currentProfile)); }

  /* ---------- init ---------- */
  async function init() {
    if (mode === "supabase") {
      sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data: { session } } = await sb.auth.getSession();
      if (session) { currentUser = session.user; await loadProfile(); }
      sb.auth.onAuthStateChange(async (ev, s) => {
        if (ev === "PASSWORD_RECOVERY") recoveryMode = true;
        currentUser = s ? s.user : null;
        currentProfile = null;
        if (currentUser) await loadProfile();
        notifyAuth();
      });
    } else {
      const email = LS.get("session", null);
      if (email && demoUsers()[email]) {
        currentUser = { id: "demo-" + email, email };
        currentProfile = normalizeDemoProfile(demoUsers()[email].profile);
      }
    }
    notifyAuth();
    return mode;
  }

  async function loadProfile() {
    const { data } = await sb.from("profiles").select("*").eq("id", currentUser.id).single();
    currentProfile = data || null;
  }

  /* ---------- auth ---------- */
  const auth = {
    user: () => currentUser,
    profile: () => currentProfile,
    onChange(cb) { authListeners.push(cb); cb(currentUser, currentProfile); },

    async signUp(email, password, fullName, role = "pilot", company = "") {
      if (mode === "supabase") {
        const { data, error } = await sb.auth.signUp({
          email, password,
          options: { data: { full_name: fullName, role, company } }
        });
        if (error) return { error: error.message };
        currentUser = data.user;
        await loadProfile();
        notifyAuth();
        return { ok: true, confirmEmail: !data.session };
      }
      const users = demoUsers();
      if (users[email]) return { error: "An account with that email already exists. Try signing in." };
      users[email] = { password, profile: { ...emptyProfile(email, role, company), full_name: fullName } };
      saveDemoUsers(users);
      LS.set("session", email);
      currentUser = { id: "demo-" + email, email };
      currentProfile = users[email].profile;
      notifyAuth();
      return { ok: true };
    },

    async signIn(email, password) {
      if (mode === "supabase") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        return error ? { error: error.message } : { ok: true };
      }
      const u = demoUsers()[email];
      if (!u || u.password !== password) return { error: "Invalid email or password." };
      LS.set("session", email);
      currentUser = { id: "demo-" + email, email };
      currentProfile = normalizeDemoProfile(u.profile);
      notifyAuth();
      return { ok: true };
    },

    async signOut() {
      if (mode === "supabase") await sb.auth.signOut();
      else LS.set("session", null);
      currentUser = null; currentProfile = null;
      notifyAuth();
    },

    /* password recovery */
    isRecovery: () => recoveryMode,
    async resetRequest(email) {
      if (mode !== "supabase")
        return { error: "Password reset isn't available in demo mode — demo accounts live only in this browser." };
      const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: location.origin + "/auth.html"
      });
      return error ? { error: error.message } : { ok: true };
    },
    async updatePassword(newPassword) {
      if (mode !== "supabase") return { error: "Not available in demo mode." };
      const { error } = await sb.auth.updateUser({ password: newPassword });
      if (error) return { error: error.message };
      recoveryMode = false;
      return { ok: true };
    }
  };

  /* ---------- profile ---------- */
  const profileApi = {
    get: () => currentProfile,
    async update(patch) {
      if (!currentUser) return { error: "Not signed in." };
      if (mode === "supabase") {
        const { error } = await sb.from("profiles").update(patch).eq("id", currentUser.id);
        if (error) return { error: error.message };
        currentProfile = { ...currentProfile, ...patch };
        return { ok: true };
      }
      const users = demoUsers();
      const u = users[currentUser.email];
      u.profile = { ...normalizeDemoProfile(u.profile), ...patch };
      saveDemoUsers(users);
      currentProfile = u.profile;
      return { ok: true };
    }
  };

  /* ---------- jobs ---------- */
  function normalizeRow(r) {
    return {
      id: r.id, airline: r.airline, role: r.role, aircraft: r.aircraft,
      region: r.region, location: r.location, type: r.type,
      minHours: r.min_hours, rated: r.rated, salary: r.salary,
      category: r.category || "pilot",
      verified: r.verified || false, applyUrl: r.apply_url || null, reqs: r.reqs || null,
      owner: r.posted_by || null,
      posted: Math.max(0, Math.floor((Date.now() - new Date(r.posted_at)) / 86400000)),
      postedAt: new Date(r.posted_at).getTime()
    };
  }
  const canPost = () => {
    const p = currentProfile;
    if (!p) return false;
    return p.is_admin || (p.role === "recruiter" && p.approved);
  };

  const jobsApi = {
    async list() {
      if (mode === "supabase") {
        const { data, error } = await sb.from("jobs").select("*").order("posted_at", { ascending: false });
        if (!error && data && data.length) return data.map(normalizeRow);
        return [];
      }
      const removed = LS.get("removed_jobs", []);
      const edits = LS.get("job_edits", {});
      const daysSince = d => d ? Math.max(0, Math.floor((Date.now() - new Date(d)) / 86400000)) : 0;
      const base = JOBS.filter(j => !removed.includes(j.id))
        .map(j => ({ ...j, posted: daysSince(j.added), postedAt: new Date(j.added).getTime(), ...(edits[j.id] || {}) }));
      return [...LS.get("custom_jobs", []), ...base];
    },
    async mine() {
      if (!currentUser) return [];
      if (mode === "supabase") {
        const { data } = await sb.from("jobs").select("*").eq("posted_by", currentUser.id).order("posted_at", { ascending: false });
        return (data || []).map(normalizeRow);
      }
      return LS.get("custom_jobs", []).filter(j => j.owner === currentUser.email);
    },
    async create(job) {
      if (!canPost()) return { error: "Your recruiter account is awaiting approval — you can post once an admin approves it." };
      if (mode === "supabase") {
        const { error } = await sb.from("jobs").insert({
          airline: job.airline, role: job.role, aircraft: job.aircraft, region: job.region,
          location: job.location, type: job.type, min_hours: job.minHours, rated: job.rated,
          salary: job.salary, apply_url: job.applyUrl || null, reqs: job.reqs || null,
          category: job.category || "pilot",
          verified: false, posted_by: currentUser.id
        });
        return error ? { error: error.message } : { ok: true };
      }
      const custom = LS.get("custom_jobs", []);
      custom.unshift({ ...job, id: Date.now(), posted: 0, postedAt: Date.now(), verified: false, owner: currentUser.email });
      LS.set("custom_jobs", custom);
      return { ok: true };
    },
    async update(id, patch) {
      if (mode === "supabase") {
        const dbPatch = { ...patch };
        if ("minHours" in dbPatch) { dbPatch.min_hours = dbPatch.minHours; delete dbPatch.minHours; }
        if ("applyUrl" in dbPatch) { dbPatch.apply_url = dbPatch.applyUrl; delete dbPatch.applyUrl; }
        const { error } = await sb.from("jobs").update(dbPatch).eq("id", id);
        return error ? { error: error.message } : { ok: true };
      }
      const custom = LS.get("custom_jobs", []);
      const idx = custom.findIndex(j => j.id === id);
      if (idx >= 0) {
        const isOwner = custom[idx].owner === currentUser?.email;
        if (!isOwner && !currentProfile?.is_admin) return { error: "Not authorised." };
        custom[idx] = { ...custom[idx], ...patch };
        LS.set("custom_jobs", custom);
      } else {
        if (!currentProfile?.is_admin) return { error: "Not authorised." };
        const edits = LS.get("job_edits", {});
        edits[id] = { ...(edits[id] || {}), ...patch };
        LS.set("job_edits", edits);
      }
      return { ok: true };
    },
    async remove(id) {
      if (mode === "supabase") {
        const { error } = await sb.from("jobs").delete().eq("id", id);
        return error ? { error: error.message } : { ok: true };
      }
      const custom = LS.get("custom_jobs", []);
      const mineIdx = custom.findIndex(j => j.id === id);
      if (mineIdx >= 0) {
        const isOwner = custom[mineIdx].owner === currentUser?.email;
        if (!isOwner && !currentProfile?.is_admin) return { error: "Not authorised." };
        LS.set("custom_jobs", custom.filter(j => j.id !== id));
      } else {
        if (!currentProfile?.is_admin) return { error: "Not authorised." };
        const removed = LS.get("removed_jobs", []);
        removed.push(id);
        LS.set("removed_jobs", removed);
      }
      return { ok: true };
    }
  };

  /* ---------- saved jobs ---------- */
  const savedApi = {
    async ids() {
      if (!currentUser) return new Set();
      if (mode === "supabase") {
        const { data } = await sb.from("saved_jobs").select("job_id").eq("user_id", currentUser.id);
        return new Set((data || []).map(r => r.job_id));
      }
      return new Set(LS.get("saved_" + currentUser.email, []));
    },
    async toggle(jobId) {
      if (!currentUser) return { error: "auth" };
      if (mode === "supabase") {
        const ids = await savedApi.ids();
        if (ids.has(jobId)) await sb.from("saved_jobs").delete().match({ user_id: currentUser.id, job_id: jobId });
        else await sb.from("saved_jobs").insert({ user_id: currentUser.id, job_id: jobId });
        return { ok: true, saved: !ids.has(jobId) };
      }
      const key = "saved_" + currentUser.email;
      let list = LS.get(key, []);
      const saved = !list.includes(jobId);
      list = saved ? [...list, jobId] : list.filter(i => i !== jobId);
      LS.set(key, list);
      return { ok: true, saved };
    }
  };

  /* ---------- applications ----------
     Demo mode stores all applications in one global list so recruiters
     can see applicants to their own listings. */
  const allApps = () => LS.get("applications", []);

  const appsApi = {
    /* the signed-in user's own applications */
    async list() {
      if (!currentUser) return [];
      if (mode === "supabase") {
        const { data } = await sb.from("applications")
          .select("*, jobs(airline, role, aircraft, location)")
          .eq("user_id", currentUser.id).order("created_at", { ascending: false });
        return (data || []).map(a => ({
          id: a.id, jobId: a.job_id, status: a.status, note: a.cover_note,
          created: a.created_at, job: a.jobs
        }));
      }
      return allApps().filter(a => a.applicantEmail === currentUser.email);
    },

    async submit(job, form) {
      if (!currentUser) return { error: "auth" };
      if (mode === "supabase") {
        const { error } = await sb.from("applications").insert({
          user_id: currentUser.id, job_id: job.id, cover_note: form.note,
          licence: form.licence, total_hours: form.hours, ratings: form.ratings
        });
        return error ? { error: error.message } : { ok: true };
      }
      const apps = allApps();
      if (apps.some(a => a.jobId === job.id && a.applicantEmail === currentUser.email))
        return { error: "You've already applied to this position." };
      apps.unshift({
        id: Date.now(), jobId: job.id, status: "submitted",
        applicantEmail: currentUser.email,
        applicantName: currentProfile?.full_name || currentUser.email,
        licence: form.licence, hours: form.hours, ratings: form.ratings, note: form.note,
        created: new Date().toISOString(),
        job: { airline: job.airline, role: job.role, aircraft: job.aircraft, location: job.location }
      });
      LS.set("applications", apps);
      return { ok: true };
    },

    /* recruiter/admin updates an application's status */
    async setStatus(appId, status) {
      const allowed = ["submitted", "shortlisted", "interview", "hired", "rejected"];
      if (!allowed.includes(status)) return { error: "Invalid status." };
      if (mode === "supabase") {
        const { error } = await sb.from("applications").update({ status }).eq("id", appId);
        return error ? { error: error.message } : { ok: true };
      }
      const apps = allApps();
      const a = apps.find(x => x.id === appId);
      if (!a) return { error: "Application not found." };
      const ownsJob = LS.get("custom_jobs", []).some(j => j.id === a.jobId && j.owner === currentUser?.email);
      if (!ownsJob && !currentProfile?.is_admin) return { error: "Not authorised." };
      a.status = status;
      LS.set("applications", apps);
      return { ok: true };
    },

    /* applications received on a specific job (owner/admin only) */
    async forJob(jobId) {
      if (!currentUser) return [];
      if (mode === "supabase") {
        const { data } = await sb.from("applications")
          .select("*, profiles(full_name, email)")
          .eq("job_id", jobId).order("created_at", { ascending: false });
        return (data || []).map(a => ({
          id: a.id, jobId: a.job_id, status: a.status, note: a.cover_note,
          licence: a.licence, hours: a.total_hours, ratings: a.ratings,
          applicantName: a.profiles?.full_name || "—", applicantEmail: a.profiles?.email || "—",
          created: a.created_at
        }));
      }
      return allApps().filter(a => a.jobId === jobId);
    }
  };

  /* ---------- listing reports (community freshness flags) ---------- */
  const reportsApi = {
    async submit(job, reason) {
      if (!currentUser) return { error: "auth" };
      if (mode === "supabase") {
        const { error } = await sb.from("reports").insert({
          job_id: job.id, user_id: currentUser.id, reason: reason
        });
        return error ? { error: error.message } : { ok: true };
      }
      const reports = LS.get("reports", []);
      reports.unshift({
        id: Date.now(), jobId: job.id, reason,
        reporter: currentUser.email, created: new Date().toISOString(),
        job: { airline: job.airline, role: job.role, aircraft: job.aircraft }
      });
      LS.set("reports", reports);
      return { ok: true };
    },
    async list() {
      if (mode === "supabase") {
        const { data } = await sb.from("reports")
          .select("*, jobs(airline, role, aircraft)")
          .order("created_at", { ascending: false });
        return (data || []).map(r => ({
          id: r.id, jobId: r.job_id, reason: r.reason, created: r.created_at,
          job: r.jobs || {}
        }));
      }
      return LS.get("reports", []);
    },
    async remove(id) {
      if (mode === "supabase") {
        const { error } = await sb.from("reports").delete().eq("id", id);
        return error ? { error: error.message } : { ok: true };
      }
      LS.set("reports", LS.get("reports", []).filter(r => r.id !== id));
      return { ok: true };
    }
  };

  /* ---------- admin ---------- */
  const adminApi = {
    async pendingRecruiters() {
      if (mode === "supabase") {
        const { data } = await sb.from("profiles")
          .select("id, email, full_name, company, created_at")
          .eq("role", "recruiter").eq("approved", false);
        return data || [];
      }
      return Object.values(demoUsers())
        .map(u => normalizeDemoProfile(u.profile))
        .filter(p => p.role === "recruiter" && !p.approved);
    },
    /* site-wide stats for the admin dashboard */
    async stats() {
      if (mode === "supabase") {
        const count = async (table, filter) => {
          let q = sb.from(table).select("*", { count: "exact", head: true });
          if (filter) q = filter(q);
          const { count: c } = await q;
          return c || 0;
        };
        const [pilots, crew, recruiters, pendingRec, jobsTotal, jobsVerified, jobsRecruiter, apps, saved] = await Promise.all([
          count("profiles", q => q.eq("role", "pilot")),
          count("profiles", q => q.eq("role", "crew")),
          count("profiles", q => q.eq("role", "recruiter")),
          count("profiles", q => q.eq("role", "recruiter").eq("approved", false)),
          count("jobs"),
          count("jobs", q => q.eq("verified", true)),
          count("jobs", q => q.eq("verified", false)),
          count("applications"),
          count("saved_jobs")
        ]);
        return { pilots, crew, recruiters, pendingRec, jobsTotal, jobsVerified, jobsRecruiter, apps, saved };
      }
      const users = Object.values(demoUsers()).map(u => normalizeDemoProfile(u.profile));
      const jobs = await jobsApi.list();
      let saved = 0;
      users.forEach(u => saved += LS.get("saved_" + u.email, []).length);
      return {
        pilots: users.filter(u => u.role === "pilot").length,
        crew: users.filter(u => u.role === "crew").length,
        recruiters: users.filter(u => u.role === "recruiter").length,
        pendingRec: users.filter(u => u.role === "recruiter" && !u.approved).length,
        jobsTotal: jobs.length,
        jobsVerified: jobs.filter(j => j.verified).length,
        jobsRecruiter: jobs.filter(j => !j.verified).length,
        apps: allApps().length,
        saved
      };
    },

    async setRecruiterApproval(idOrEmail, approved) {
      if (mode === "supabase") {
        const { error } = await sb.from("profiles").update({ approved }).eq("id", idOrEmail);
        return error ? { error: error.message } : { ok: true };
      }
      const users = demoUsers();
      const u = users[idOrEmail];
      if (!u) return { error: "User not found." };
      u.profile.approved = approved;
      saveDemoUsers(users);
      if (currentUser?.email === idOrEmail) currentProfile = normalizeDemoProfile(u.profile);
      return { ok: true };
    }
  };

  /* ---------- job-alert subscribers (email capture) ---------- */
  const subscribeApi = {
    async add(email, category) {
      email = (email || "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Please enter a valid email address." };
      if (mode === "supabase") {
        const { error } = await sb.from("subscribers").insert({ email, category: category || "all" });
        // a repeat signup (unique-email clash) is a success from the user's side
        if (error && !/duplicate|unique|already exists/i.test(error.message)) return { error: error.message };
        return { ok: true };
      }
      const list = LS.get("subscribers", []);
      if (!list.some(s => s.email === email)) {
        list.push({ email, category: category || "all", created: new Date().toISOString() });
        LS.set("subscribers", list);
      }
      return { ok: true };
    }
  };

  /* ---------- apply click-out logging (anonymous, consent-free metric) ---------- */
  const applyClicksApi = {
    async log(jobId, airline) {
      if (mode === "supabase") {
        try { await sb.from("apply_clicks").insert({ job_id: jobId != null ? String(jobId) : null, airline: airline || null }); } catch (e) {}
        return { ok: true };
      }
      const list = LS.get("apply_clicks", []);
      list.push({ jobId, airline, created: new Date().toISOString() });
      LS.set("apply_clicks", list);
      return { ok: true };
    }
  };

  /* ---------- application tracker ("My Applications") ----------
     Anonymous → localStorage. Signed-in → Supabase (synced across devices). */
  const trackerApi = {
    signedIn() { return mode === "supabase" && !!currentUser; },
    async list() {
      if (this.signedIn()) {
        const { data } = await sb.from("tracked_applications").select("*").eq("user_id", currentUser.id).order("applied_at", { ascending: false });
        return (data || []).map(r => ({ id: r.id, jobId: r.job_id, airline: r.airline, role: r.role, status: r.status, notes: r.notes || "", appliedAt: r.applied_at }));
      }
      return LS.get("tracker", []);
    },
    async add(item) {
      if (this.signedIn()) {
        const { data } = await sb.from("tracked_applications").insert({
          user_id: currentUser.id, job_id: item.jobId != null ? String(item.jobId) : null,
          airline: item.airline || null, role: item.role || null,
          status: item.status || "applied", notes: item.notes || "",
          applied_at: item.appliedAt || new Date().toISOString()
        }).select().single();
        return data ? { id: data.id, jobId: data.job_id, airline: data.airline, role: data.role, status: data.status, notes: data.notes || "", appliedAt: data.applied_at } : null;
      }
      const list = LS.get("tracker", []);
      const row = { id: "l" + Date.now(), jobId: item.jobId, airline: item.airline, role: item.role, status: item.status || "applied", notes: item.notes || "", appliedAt: item.appliedAt || new Date().toISOString() };
      list.unshift(row); LS.set("tracker", list); return row;
    },
    async update(id, patch) {
      if (this.signedIn() && !String(id).startsWith("l")) {
        const p = {}; if (patch.status !== undefined) p.status = patch.status; if (patch.notes !== undefined) p.notes = patch.notes;
        await sb.from("tracked_applications").update(p).eq("id", id); return { ok: true };
      }
      const list = LS.get("tracker", []); const r = list.find(x => String(x.id) === String(id)); if (r) Object.assign(r, patch); LS.set("tracker", list); return { ok: true };
    },
    async remove(id) {
      if (this.signedIn() && !String(id).startsWith("l")) { await sb.from("tracked_applications").delete().eq("id", id); return { ok: true }; }
      LS.set("tracker", LS.get("tracker", []).filter(x => String(x.id) !== String(id))); return { ok: true };
    },
    /* one-time merge of any device-local items into the signed-in account */
    async syncLocalUp() {
      if (!this.signedIn()) return 0;
      const local = LS.get("tracker", []);
      if (!local.length) return 0;
      for (const it of local) await this.add(it);
      LS.set("tracker", []);
      return local.length;
    }
  };

  return { mode, init, auth, profile: profileApi, jobs: jobsApi, saved: savedApi, apps: appsApi, reports: reportsApi, admin: adminApi, subscribe: subscribeApi, applyClicks: applyClicksApi, tracker: trackerApi, canPost };
})();

Backend.ready = Backend.init();
