#!/usr/bin/env node
/* ============================================================
   AirCrew Jobs — static airline-page generator
   Usage:  node tools/generate-airlines.js
   Reads assets/data.js and emits one SEO landing page per
   airline into /airline/{slug}.html with content baked into
   the HTML (no JS needed for Google to read it).
   Re-run whenever data.js changes, then commit the output.
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "airline");
const BASE = "https://www.aircrewjob.com";

/* load data.js in a sandbox */
const src = fs.readFileSync(path.join(ROOT, "assets", "data.js"), "utf8");
const ctx = {};
new Function("ctx", src.replace(/^const /gm, "ctx.") + ";")(ctx);
const { JOBS, AIRLINES, SALARIES, VERIFIED_DATE, DOMAINS } = ctx;

const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const STATUS_LABEL = { hiring: "Actively hiring", paused: "Hiring paused", closed: "Not currently hiring" };
const STATUS_CLASS = { hiring: "hiring", paused: "paused", closed: "closed" };

/* ---- JobPosting structured data (schema.org) for Google Jobs eligibility ---- */
const COUNTRY_ISO = {
  "UAE": "AE", "Qatar": "QA", "Ireland": "IE", "UK": "GB", "Hungary": "HU",
  "Spain": "ES", "Norway": "NO", "India": "IN", "Hong Kong": "HK", "Singapore": "SG",
  "USA": "US", "Ethiopia": "ET", "Australia": "AU", "New Zealand": "NZ", "Türkiye": "TR",
  "Saudi Arabia": "SA", "Canada": "CA", "Germany / UK": "DE", "Germany": "DE",
  "Scandinavia": "SE", "Bahrain": "BH", "South Korea": "KR", "Kazakhstan": "KZ",
  "Greece": "GR", "Latvia": "LV", "Poland": "PL", "Belgium": "BE", "Japan": "JP"
};

/* Pull a single city out of a location string, or null when it's multi-base / vague */
function cityFromLocation(loc) {
  if (!loc) return null;
  const c = String(loc).replace(/\s*\([^)]*\)/g, "").trim();   // strip "(DXB)" etc.
  if (/base|across|partner|academ|\bEU\b|\bME\b|\+|,|·|worldwide/i.test(c)) return null;
  return c || null;
}

/* One JobPosting JSON-LD <script> block per opening */
function jobPostingLd(j, a) {
  const domain = (typeof DOMAINS !== "undefined" && DOMAINS[a.name]) || null;
  const city = cityFromLocation(j.location);
  const address = { "@type": "PostalAddress", addressCountry: COUNTRY_ISO[a.country] || a.country };
  if (city) address.addressLocality = city;
  const obj = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: `${j.role} – ${j.aircraft}`,
    description:
      `<p>${j.role} (${j.aircraft}) at ${a.name}, based ${j.location} · ${j.type}` +
      `${j.minHours ? ` · from ${Number(j.minHours).toLocaleString()} hrs total time` : ""}.</p>` +
      (j.reqs ? `<p>${j.reqs}</p>` : "") +
      (j.salary ? `<p>Salary: ${j.salary}.</p>` : "") +
      `<p>Apply via the airline's official careers portal. Listing verified ${VERIFIED_DATE} by AirCrew Jobs.</p>`,
    datePosted: j.added,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: a.name,
      ...(domain ? {
        sameAs: `https://${domain}`,
        logo: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
      } : {})
    },
    jobLocation: { "@type": "Place", address },
    identifier: { "@type": "PropertyValue", name: "AirCrew Jobs", value: String(j.id) },
    directApply: false
  };
  // < guards against any "</script>" sequence breaking out of the tag
  return `  <script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
}

function jobCard(j) {
  const crew = j.category === "crew";
  return `
      <div class="card" style="margin-bottom:14px">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:14px; flex-wrap:wrap">
          <div>
            <h3 style="font-size:1.05rem">${crew ? "🛎️" : "✈️"} ${esc(j.role)} — ${esc(j.aircraft)}</h3>
            <p style="font-size:0.88rem; margin-top:6px">${esc(j.location)} · ${esc(j.type)}${j.minHours ? ` · min ${Number(j.minHours).toLocaleString()} hrs` : ""}</p>
            ${j.reqs ? `<p style="font-size:0.86rem; color:var(--text-faint); margin-top:8px">${esc(j.reqs)}</p>` : ""}
            <p style="font-size:0.9rem; color:var(--green); font-family:var(--font-display); font-weight:600; margin-top:8px">${esc(j.salary)}</p>
          </div>
          <a class="btn btn-primary btn-sm" href="${esc(j.applyUrl)}" target="_blank" rel="noopener">Apply on airline site ↗</a>
        </div>
      </div>`;
}

function page(a) {
  const slug = slugify(a.name);
  const jobs = JOBS.filter(j => j.airline === a.name);
  const pilotJobs = jobs.filter(j => (j.category || "pilot") === "pilot");
  const crewJobs = jobs.filter(j => j.category === "crew");
  const salary = SALARIES.find(s => s.airline === a.name);
  const jobsLd = jobs.map(j => jobPostingLd(j, a)).join("\n");

  const title = `${a.name} Pilot${crewJobs.length ? " & Cabin Crew" : ""} Jobs 2026 — Requirements & Hiring Status`;
  const desc = `Is ${a.name} hiring in 2026? ${STATUS_LABEL[a.status]}. ${jobs.length ? jobs.length + " verified opening" + (jobs.length > 1 ? "s" : "") + " with requirements and direct apply links." : "Current recruitment status, fleet and bases."} Checked against the official careers portal.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="../">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${BASE}/airline/${slug}.html">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AirCrew Jobs">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${BASE}/airline/${slug}.html">
  <meta property="og:image" content="${BASE}/assets/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    .profile { max-width: 860px; margin: 0 auto; }
    .profile-head { padding: 150px 0 36px; }
    .facts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 28px 0; }
    @media (max-width: 720px) { .facts { grid-template-columns: repeat(2, 1fr); } }
    .fact { border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 14px 16px; background: var(--surface); }
    .fact dt { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); }
    .fact dd { margin-top: 4px; color: var(--text); font-family: var(--font-display); font-weight: 600; font-size: 0.95rem; }
    h2.sec { font-size: 1.3rem; margin: 40px 0 16px; }
    .note-box { border-left: 3px solid var(--accent); padding: 4px 0 4px 16px; color: var(--text-dim); font-size: 0.95rem; }
  </style>
${jobsLd ? jobsLd + "\n" : ""}</head>
<body>

  <div class="container profile">
    <div class="profile-head">
      <a href="airlines.html" style="color:var(--accent); text-decoration:none; font-family:var(--font-display); font-weight:600; font-size:0.9rem">← All airlines</a>
      <div style="display:flex; align-items:center; gap:18px; margin-top:24px; flex-wrap:wrap">
        <h1 style="font-size:clamp(1.9rem,4.5vw,3rem)">${esc(a.name)} <span class="gradient-text">jobs & hiring</span></h1>
        <span class="badge ${STATUS_CLASS[a.status]}" style="font-size:0.85rem">${STATUS_LABEL[a.status]}</span>
      </div>
      <p style="margin-top:14px; font-size:1.05rem">${esc(desc)}</p>
    </div>

    <dl class="facts">
      <div class="fact"><dt>Fleet</dt><dd>${esc(a.fleet)}</dd></div>
      <div class="fact"><dt>Bases</dt><dd>${esc(a.bases)}</dd></div>
      <div class="fact"><dt>Pilots</dt><dd>≈ ${Number(a.pilots).toLocaleString()}</dd></div>
      <div class="fact"><dt>Country</dt><dd>${esc(a.country)}</dd></div>
    </dl>

    <p class="note-box">${esc(a.note)}</p>

    ${pilotJobs.length ? `<h2 class="sec">✈️ Verified pilot openings (${VERIFIED_DATE})</h2>${pilotJobs.map(jobCard).join("")}` : ""}
    ${crewJobs.length ? `<h2 class="sec">🛎️ Verified cabin crew openings (${VERIFIED_DATE})</h2>${crewJobs.map(jobCard).join("")}` : ""}
    ${!jobs.length ? `<h2 class="sec">Current openings</h2><p style="color:var(--text-dim)">No verified openings on our board right now — check the <a href="jobs.html" style="color:var(--accent)">job board</a> for carriers actively recruiting, or the airline's own careers site.</p>` : ""}

    ${salary ? `<h2 class="sec">💰 Indicative pay (${esc(salary.currency)})</h2>
    <div class="card" style="padding:18px 24px">
      <p style="font-size:0.95rem">First Officer year 1: <b style="color:var(--text)">${salary.foYear1.toLocaleString()}</b> · FO year 5: <b style="color:var(--text)">${salary.foYear5.toLocaleString()}</b> · Senior Captain: <b style="color:var(--green)">${salary.captain.toLocaleString()}</b></p>
      <p style="font-size:0.8rem; color:var(--text-faint); margin-top:8px">Indicative scales — verify against current published agreements. More on the <a href="salaries.html" style="color:var(--accent)">salary explorer</a>.</p>
    </div>` : ""}

    <h2 class="sec">Prepare for ${esc(a.name)} selection</h2>
    <p style="color:var(--text-dim); font-size:0.95rem">Most carriers screen with aptitude testing and competency interviews. Train the underlying skills with our free <a href="games.html" style="color:var(--accent)">prep games</a> and read the <a href="guide.html?slug=interview-prep" style="color:var(--accent)">assessment guide</a>. Building hours or starting out? See the <a href="schools.html" style="color:var(--accent)">flight schools & Class 1 map</a>.</p>

    <p style="font-size:0.8rem; color:var(--text-faint); margin:40px 0 60px">Listings verified against the airline's official careers portal on the date shown. ${esc(a.name)} names and logos belong to their owners; AirCrew Jobs is independent and not affiliated. Always confirm full criteria on the official site.</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="assets/config.js"></script>
  <script src="assets/data.js"></script>
  <script src="assets/backend.js"></script>
  <script src="assets/app.js"></script>
</body>
</html>`;
}

fs.mkdirSync(OUT, { recursive: true });
const slugs = [];
for (const a of AIRLINES) {
  const slug = slugify(a.name);
  fs.writeFileSync(path.join(OUT, slug + ".html"), page(a));
  slugs.push(slug);
  console.log("✓", slug + ".html");
}

/* regenerate sitemap.xml including airline pages */
const corePages = ["/", "/jobs.html", "/airlines.html", "/schools.html", "/games.html", "/salaries.html", "/guides.html"];
const guideSlugs = ctx.GUIDES.map(g => g.slug);
const urls = [
  ...corePages.map(p => BASE + p),
  ...guideSlugs.map(g => `${BASE}/guide.html?slug=${g}`),
  ...slugs.map(s => `${BASE}/airline/${s}.html`)
];
const today = new Date().toISOString().slice(0, 10);
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + urls.map(u => `  <url><loc>${u.replace(/&/g, "&amp;")}</loc><lastmod>${today}</lastmod></url>`).join("\n")
  + "\n</urlset>\n";
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml);
console.log(`\n${slugs.length} airline pages + sitemap.xml (${urls.length} URLs)`);

/* ---- inject a crawlable <noscript> fallback into jobs.html ----
   The board renders client-side, so crawlers (and the no-JS case) see nothing.
   This block is invisible to normal (JS-enabled) visitors — it ONLY renders when
   JS is off — so the page's look is unchanged, but Google gets real listing text
   and internal links into all the airline pages. Regenerated on every run. */
(function injectJobsNoscript() {
  const file = path.join(ROOT, "jobs.html");
  let html = fs.readFileSync(file, "utf8");
  const items = JOBS.map(j => {
    const slug = slugify(j.airline);
    const bits = [esc(j.location), esc(j.type)];
    if (j.minHours) bits.push("min " + Number(j.minHours).toLocaleString() + " hrs");
    if (j.salary) bits.push(esc(j.salary));
    return `        <li><a href="airline/${slug}.html">${esc(j.airline)} — ${esc(j.role)}, ${esc(j.aircraft)}</a> — ${bits.join(" · ")}. <a href="${esc(j.applyUrl)}" target="_blank" rel="noopener">Apply on airline site</a></li>`;
  }).join("\n");
  const block =
`  <noscript>
    <!-- JOBS_NOSCRIPT_START — auto-generated by tools/generate-airlines.js; do not edit by hand -->
    <section class="container" style="padding:40px 0">
      <h2>Verified pilot &amp; cabin crew vacancies (${VERIFIED_DATE})</h2>
      <p>The interactive map and filters need JavaScript. Every current verified opening is listed below, each linking to the airline's hiring page and its official application portal.</p>
      <ul>
${items}
      </ul>
    </section>
    <!-- JOBS_NOSCRIPT_END -->
  </noscript>`;
  const re = /  <noscript>\s*<!-- JOBS_NOSCRIPT_START[\s\S]*?JOBS_NOSCRIPT_END -->\s*<\/noscript>/;
  html = re.test(html)
    ? html.replace(re, block)
    : html.replace(/(<div id="jobList"[^>]*><\/div>)/, `$1\n${block}`);
  fs.writeFileSync(file, html);
  console.log(`✓ jobs.html noscript fallback (${JOBS.length} listings, invisible to JS users)`);
})();

/* also regenerate the database sync file — one command does everything */
require("./sync-jobs.js");
