/* AirCrew Jobs — shared UI (nav, footer, reveal animations, helpers) */

const NAV_ITEMS = [
  { href: "index.html",    label: "Home" },
  { href: "jobs.html",     label: "Jobs" },
  { href: "airlines.html", label: "Airlines" },
  { href: "schools.html",  label: "Schools Map" },
  { href: "games.html",    label: "Training Centre" },
  { href: "salaries.html", label: "Salaries" },
  { href: "guides.html",   label: "Guides" }
];

const LOGO_SVG = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 4L3 11l6 2.5L11.5 20 14 14.5 21 4z" stroke="#38e0ff" stroke-width="1.8" stroke-linejoin="round" fill="rgba(56,224,255,0.15)"/>
</svg>`;

function renderNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  const links = NAV_ITEMS.map(i =>
    `<li><a href="${i.href}" class="${i.href === page ? "active" : ""}">${i.label}</a></li>`
  ).join("");
  document.body.insertAdjacentHTML("afterbegin", `
    <nav class="main-nav">
      <div class="nav-inner">
        <a class="logo" href="index.html">${LOGO_SVG} AirCrew<span>Jobs</span></a>
        <ul class="nav-links" id="navLinks">${links}</ul>
        <div class="nav-cta">
          <span id="navAuth"><a href="jobs.html" class="btn btn-primary btn-sm">Find a Job</a></span>
          <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
        </div>
      </div>
    </nav>
    <div class="bg-grid"></div>
    <div class="bg-glow one"></div>
    <div class="bg-glow two"></div>
    <div class="bg-glow three"></div>`);
  document.getElementById("navToggle").addEventListener("click", () =>
    document.getElementById("navLinks").classList.toggle("open"));

  // Auth-aware CTA (only on pages that load backend.js)
  if (typeof Backend !== "undefined") {
    Backend.ready.then(() => Backend.auth.onChange(user => {
      const el = document.getElementById("navAuth");
      if (!el) return;
      if (user) {
        const p = Backend.auth.profile();
        const initial = (p?.full_name || user.email)[0].toUpperCase();
        const isRecruiter = p?.role === "recruiter";
        const adminLink = p?.is_admin && Backend.mode === "supabase"
          ? `<a href="admin.html" class="btn btn-ghost btn-sm" title="Platform Admin">🛂 Admin</a>` : "";
        // in-app alert bell: new listings since the last time you opened the job board
        let bell = "";
        if (!isRecruiter && typeof JOBS !== "undefined") {
          const lastSeen = localStorage.getItem("acj_seen_at") || "2000-01-01";
          const fresh = JOBS.filter(j => j.verified && j.added && j.added > lastSeen).length;
          if (fresh > 0) {
            bell = `<a href="jobs.html" class="btn btn-ghost btn-sm" title="${fresh} new listing${fresh > 1 ? "s" : ""} since your last visit" style="position:relative; padding:8px 12px">
              🔔<span style="position:absolute; top:-5px; right:-5px; background:var(--accent); color:#03121a;
                font-size:0.66rem; font-weight:700; min-width:17px; height:17px; border-radius:999px;
                display:grid; place-items:center; font-family:var(--font-display)">${fresh}</span></a>`;
          }
        }
        el.innerHTML = `${bell}${adminLink}
          <a href="${isRecruiter ? "recruiter.html" : "account.html"}" class="btn btn-ghost btn-sm" title="${user.email}" style="gap:8px">
            <span style="width:22px;height:22px;border-radius:50%;display:inline-grid;place-items:center;
              background:rgba(56,224,255,0.15);color:var(--accent);font-weight:700;font-size:0.78rem">${initial}</span>
            ${isRecruiter ? "Dashboard" : "My Account"}
          </a>`;
      } else {
        el.innerHTML = `<a href="auth.html" class="btn btn-ghost btn-sm">Sign in</a>
          <a href="jobs.html" class="btn btn-primary btn-sm">Find a Job</a>`;
      }
    }));
  }
}

function renderFooter() {
  document.body.insertAdjacentHTML("beforeend", `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="logo" href="index.html" style="margin-bottom:14px">${LOGO_SVG} AirCrew<span>Jobs</span></a>
          <p style="font-size:0.9rem; max-width:300px; margin-top:12px">The flight deck careers platform — live pilot jobs, airline intelligence, salary data and training guides in one place.</p>
        </div>
        <div>
          <h4>Pilots</h4>
          <ul>
            <li><a href="jobs.html">Job Board</a></li>
            <li><a href="schools.html">Schools & Class 1 Map</a></li>
            <li><a href="games.html">Aptitude Prep Games</a></li>
            <li><a href="salaries.html">Salary Explorer</a></li>
            <li><a href="guides.html">Career Guides</a></li>
            <li><a href="account.html">My Account</a></li>
          </ul>
        </div>
        <div>
          <h4>Airlines & Recruiters</h4>
          <ul>
            <li><a href="airlines.html">Airline Directory</a></li>
            <li><a href="airlines.html">Hiring Status</a></li>
            <li><a href="recruiter.html">Post a job — free during beta</a></li>
          </ul>
        </div>
        <div>
          <h4>Company & Legal</h4>
          <ul>
            <li><a href="${typeof DISCORD_INVITE !== "undefined" ? DISCORD_INVITE : "index.html#newsletter"}" target="_blank" rel="noopener">Chill Wings (Discord)</a></li>
            <li><a href="privacy.html">Privacy & Data Protection</a></li>
            <li><a href="terms.html">Terms of Use</a></li>
            <li><a href="cookies.html">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 AirCrew Jobs · Listings verified against official airline sources.</span>
        <span>Fly safe. ✈</span>
      </div>
    </div>
  </footer>`);
}

function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const t0 = performance.now(), dur = 1400;
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => io.observe(c));
}

function daysAgo(n) { return n === 0 ? "Today" : n === 1 ? "Yesterday" : `${n} days ago`; }
/* Precise relative time from an epoch-ms timestamp. Listings carrying a real
   posting time show "Just now / 12m ago / 3h ago"; date-only entries (midnight
   UTC) fall back to day buckets so we never invent an hour we didn't record. */
function timeAgo(ms) {
  if (!ms) return "Recently";
  let diff = Date.now() - ms; if (diff < 0) diff = 0;
  const dateOnly = ms % 86400000 === 0;
  if (!dateOnly) {
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  }
  const d = Math.floor(diff / 86400000);
  if (d <= 0) return "Today";
  if (d === 1) return "Yesterday";
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

/* HTML-escape user-generated content before inserting into innerHTML.
   Prevents stored XSS from recruiter posts, applicant notes, names, etc. */
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* Only allow http(s) URLs into href attributes (blocks javascript: etc.) */
function safeUrl(u) {
  return /^https?:\/\//i.test(String(u ?? "")) ? esc(u) : "";
}

/* Airline logo with graceful fallback to initials.
   Uses Google's favicon service against the airline's domain (see DOMAINS in data.js). */
function logoHTML(airline, cls = "job-logo", urlHint = null) {
  const initials = esc(String(airline || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase());
  let domain = (typeof DOMAINS !== "undefined" && DOMAINS[airline]) || null;
  // fallback: derive the logo from the job's apply link (gives recruiter posts a logo too)
  if (!domain && urlHint) {
    try { domain = new URL(urlHint).hostname.replace(/^(www|careers|jobs|apply)\./, ""); } catch {}
  }
  if (!domain) return `<div class="${cls}">${initials}</div>`;
  return `<div class="${cls} has-img">
    <img src="https://www.google.com/s2/favicons?domain=${esc(domain)}&sz=128" alt="${esc(airline)} logo" loading="lazy"
      onerror="this.parentElement.classList.remove('has-img'); this.remove()">
    <span class="logo-fallback">${initials}</span>
  </div>`;
}

/* Vercel Web Analytics — only loads on the deployed site, never locally.
   Enable it once in Vercel: Project → Analytics → Enable. */
function initAnalytics() {
  if (!location.hostname.endsWith(".vercel.app") && !location.hostname.includes("aircrewjob")) return;
  const s = document.createElement("script");
  s.defer = true;
  s.src = "/_vercel/insights/script.js";
  document.head.appendChild(s);
}

/* PWA service worker — deployed site only */
function initPWA() {
  if (!("serviceWorker" in navigator)) return;
  if (!location.hostname.endsWith(".vercel.app") && !location.hostname.includes("aircrewjob")) return;
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}

/* Live "aircrew online" count from the Discord server widget.
   Needs DISCORD_GUILD_ID set + the server widget enabled. Fails silently
   (count stays hidden) if not configured or unreachable. */
function initCommunity() {
  if (typeof DISCORD_GUILD_ID === "undefined" || !DISCORD_GUILD_ID) return;
  fetch("https://discord.com/api/guilds/" + DISCORD_GUILD_ID + "/widget.json")
    .then(r => (r.ok ? r.json() : null))
    .then(d => {
      if (!d || typeof d.presence_count !== "number") return;
      document.querySelectorAll("[data-discord-online]").forEach(el => { el.textContent = d.presence_count.toLocaleString(); });
      document.querySelectorAll("[data-discord-count]").forEach(el => { el.style.display = ""; });
    })
    .catch(() => {});
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
  initReveal();
  animateCounters();
  initAnalytics();
  initPWA();
  initCommunity();
});

/* ---- Cookie consent banner (Google Consent Mode v2) ---- */
(function () {
  function init() {
    var KEY = "acj_consent";
    var gtag = window.gtag || function () { (window.dataLayer = window.dataLayer || []).push(arguments); };
    try { if (localStorage.getItem(KEY)) return; } catch (e) { return; }
    if (!document.body) return;
    var bar = document.createElement("div");
    bar.id = "acjConsent";
    bar.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:99999;background:rgba(8,12,22,0.97);border-top:1px solid rgba(56,224,255,0.28);padding:14px 18px;display:flex;gap:14px;align-items:center;justify-content:center;flex-wrap:wrap;font-family:Inter,system-ui,sans-serif;box-shadow:0 -8px 30px rgba(0,0,0,0.45)";
    bar.innerHTML =
      '<span style="font-size:0.85rem;color:#c9d4e8;max-width:640px;line-height:1.5">We use cookies for analytics and to measure our ads. Accept or decline non-essential cookies. <a href="cookies.html" style="color:#38e0ff;text-decoration:none">Learn more</a>.</span>' +
      '<span style="display:flex;gap:10px;flex-wrap:wrap">' +
      '<button id="acjDecline" style="cursor:pointer;font:600 0.85rem Inter,sans-serif;padding:9px 18px;border-radius:9px;border:1px solid rgba(255,255,255,0.22);background:transparent;color:#c9d4e8">Decline</button>' +
      '<button id="acjAccept" style="cursor:pointer;font:600 0.85rem Inter,sans-serif;padding:9px 18px;border-radius:9px;border:none;background:#38e0ff;color:#04121a">Accept</button>' +
      '</span>';
    document.body.appendChild(bar);
    function choose(v) {
      try { localStorage.setItem(KEY, v); } catch (e) {}
      var s = v === "granted" ? "granted" : "denied";
      gtag("consent", "update", { ad_storage: s, ad_user_data: s, ad_personalization: s, analytics_storage: s });
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    }
    document.getElementById("acjAccept").onclick = function () { choose("granted"); };
    document.getElementById("acjDecline").onclick = function () { choose("denied"); };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
