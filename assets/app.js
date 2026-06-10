/* AirCrew Jobs — shared UI (nav, footer, reveal animations, helpers) */

const NAV_ITEMS = [
  { href: "index.html",    label: "Home" },
  { href: "jobs.html",     label: "Jobs" },
  { href: "airlines.html", label: "Airlines" },
  { href: "schools.html",  label: "Schools Map" },
  { href: "games.html",    label: "Prep Games" },
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
        el.innerHTML = `${adminLink}
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
          <h4>Airlines</h4>
          <ul>
            <li><a href="airlines.html">Directory</a></li>
            <li><a href="airlines.html">Hiring Status</a></li>
            <li><a href="recruiter.html">Recruiter Dashboard</a></li>
            <li><a href="admin.html">Platform Admin</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="index.html">About</a></li>
            <li><a href="${typeof DISCORD_INVITE !== "undefined" ? DISCORD_INVITE : "index.html#newsletter"}" target="_blank" rel="noopener">Discord Community</a></li>
            <li><a href="index.html">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 AirCrew Jobs. Demo site — listings are illustrative.</span>
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

/* Airline logo with graceful fallback to initials.
   Uses Google's favicon service against the airline's domain (see DOMAINS in data.js). */
function logoHTML(airline, cls = "job-logo") {
  const initials = airline.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const domain = (typeof DOMAINS !== "undefined" && DOMAINS[airline]) || null;
  if (!domain) return `<div class="${cls}">${initials}</div>`;
  return `<div class="${cls} has-img">
    <img src="https://www.google.com/s2/favicons?domain=${domain}&sz=128" alt="${airline} logo" loading="lazy"
      onerror="this.parentElement.classList.remove('has-img'); this.remove()">
    <span class="logo-fallback">${initials}</span>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderFooter();
  initReveal();
  animateCounters();
});
