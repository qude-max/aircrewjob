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
const guidesSrc = fs.readFileSync(path.join(ROOT, "assets", "guides-content.js"), "utf8");
const ctx = {};
new Function("ctx", src.replace(/^const /gm, "ctx.") + ";")(ctx);
new Function("ctx", guidesSrc.replace(/^const /gm, "ctx.") + ";")(ctx);
const { JOBS, AIRLINES, SALARIES, VERIFIED_DATE, DOMAINS, GUIDES, GUIDE_CONTENT } = ctx;

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
  "Greece": "GR", "Latvia": "LV", "Poland": "PL", "Belgium": "BE", "Japan": "JP",
  "Malta": "MT", "Finland": "FI", "France": "FR", "Taiwan": "TW", "Malaysia": "MY",
  "Luxembourg": "LU"
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
    validThrough: new Date(Math.max(new Date(j.added).getTime() + 60 * 86400000, Date.now() + 30 * 86400000)).toISOString(),
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
        <p style="margin-top:10px"><a href="job/${jobSlug(j)}.html" style="color:var(--accent); font-size:0.85rem; text-decoration:none">Full details &amp; requirements →</a></p>
      </div>`;
}

/* shared <head> gtag + consent block */
const HEAD_GTAG = `  <!-- Google tag (gtag.js) + Consent Mode v2 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18240351644"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
    try{if(localStorage.getItem('acj_consent')==='granted')gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}catch(e){}
    gtag("js", new Date());
    gtag("config", "AW-18240351644");
  </script>`;

/* unique, stable URL slug for one opening */
const jobSlug = j => `${slugify(j.airline + "-" + j.role + "-" + j.aircraft)}-${j.id}`;

/* One crawlable static page per opening — single JobPosting LD + visible content.
   This is what wins Google Jobs eligibility and ranks for long-tail queries. */
function jobPage(j, a) {
  const slug = jobSlug(j);
  const aSlug = slugify(a.name);
  const crew = j.category === "crew";
  const title = `${j.role} – ${j.aircraft} at ${a.name} | AirCrew Jobs`;
  const shortReq = j.reqs ? String(j.reqs).slice(0, 150).replace(/\s+\S*$/, "") + "…" : "";
  const desc = `${a.name} is hiring a ${j.role} (${j.aircraft}), based ${j.location}. ${shortReq} Verified ${VERIFIED_DATE} against the official careers portal — apply direct, no agents.`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_GTAG}
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="../">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="canonical" href="${BASE}/job/${slug}.html">
  <meta name="robots" content="index,follow">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AirCrew Jobs">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${BASE}/job/${slug}.html">
  <meta property="og:image" content="${BASE}/assets/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    .jobwrap { max-width: 760px; margin: 0 auto; padding: 140px 0 60px; }
    .crumb { font-size: 0.85rem; color: var(--text-faint); margin-bottom: 22px; }
    .crumb a { color: var(--accent); text-decoration: none; }
    .jfacts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 24px 0; }
    .jfacts .fact { border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px 15px; background: var(--surface); }
    .jfacts dt { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); }
    .jfacts dd { margin-top: 4px; font-family: var(--font-display); font-weight: 600; font-size: 0.95rem; }
    .jreq { color: var(--text-dim); font-size: 0.97rem; line-height: 1.7; margin: 8px 0 26px; }
  </style>
${jobPostingLd(j, a)}
</head>
<body>
  <div class="container jobwrap">
    <div class="crumb"><a href="index.html">Home</a> › <a href="airline/${aSlug}.html">${esc(a.name)}</a> › ${esc(j.role)}</div>
    <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap">
      <h1 style="font-size:clamp(1.6rem,4vw,2.4rem)">${crew ? "🛎️" : "✈️"} ${esc(j.role)} — ${esc(j.aircraft)}</h1>
      ${j.verified ? `<span class="badge hiring">✓ Verified · official</span>` : `<span class="badge">Recruiter post</span>`}
    </div>
    <p style="margin-top:12px; font-size:1.1rem; color:var(--text)">${esc(a.name)} · ${esc(j.location)}</p>

    <dl class="jfacts">
      <div class="fact"><dt>Role</dt><dd>${esc(j.role)}</dd></div>
      <div class="fact"><dt>Aircraft</dt><dd>${esc(j.aircraft)}</dd></div>
      <div class="fact"><dt>Base</dt><dd>${esc(j.location)}</dd></div>
      <div class="fact"><dt>Type</dt><dd>${esc(j.type)}</dd></div>
      <div class="fact"><dt>Min hours</dt><dd>${j.minHours ? Number(j.minHours).toLocaleString() + " hrs" : "No hours required"}</dd></div>
      <div class="fact"><dt>Salary</dt><dd>${esc(j.salary || "See listing")}</dd></div>
    </dl>

    ${j.reqs ? `<p class="jreq">${esc(j.reqs)}</p>` : ""}

    ${j.applyUrl ? `<a class="btn btn-primary js-apply-out" data-airline="${esc(a.name)}" data-job-id="${esc(String(j.id))}" href="${esc(j.applyUrl)}" target="_blank" rel="noopener">Apply on ${esc(a.name)}'s official site ↗</a>` : ""}

    <p style="margin-top:22px; padding:14px 16px; border:1px solid var(--border-bright); border-radius:var(--radius-sm); background:rgba(56,224,255,0.05); font-size:0.92rem">🎯 Interview at ${esc(a.name)} coming up? <a href="games.html" style="color:var(--accent); font-weight:600">Train for the assessment in the Training Centre →</a></p>

    <p style="font-size:0.85rem; color:var(--text-faint); margin-top:22px">
      Listing verified ${VERIFIED_DATE} against ${esc(a.name)}'s official careers portal. AirCrew Jobs is independent and free for job-seekers — we never charge fees or use agents.
      See more <a href="airline/${aSlug}.html" style="color:var(--accent)">${esc(a.name)} openings</a> or browse the full <a href="jobs.html" style="color:var(--accent)">job board</a>.
    </p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="assets/config.js"></script>
  <script src="assets/data.js"></script>
  <script src="assets/backend.js"></script>
  <script src="assets/app.js"></script>
  <script>
    document.querySelectorAll("a.js-apply-out").forEach(function(el){
      el.addEventListener("click", function(){
        if (typeof trackConversion === "function") trackConversion("apply_click", { airline: el.dataset.airline || "" });
        if (typeof Backend !== "undefined" && Backend.applyClicks) Backend.applyClicks.log(el.dataset.jobId, el.dataset.airline);
      });
    });
  </script>
</body>
</html>`;
}

/* One crawlable static page per guide — article body baked into HTML. */
function guidePage(meta, content) {
  const secs = (content.sections || []);
  const title = `${meta.title} — AirCrew Jobs`;
  const articleLd = {
    "@context": "https://schema.org/",
    "@type": "Article",
    headline: meta.title,
    description: meta.blurb,
    author: { "@type": "Organization", name: "AirCrew Jobs" },
    publisher: { "@type": "Organization", name: "AirCrew Jobs" }
  };
  const others = GUIDES.filter(g => g.slug !== meta.slug)
    .sort((a, b) => (b.tag === meta.tag) - (a.tag === meta.tag)).slice(0, 2);
  return `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_GTAG}
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="../">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(meta.blurb)}">
  <link rel="canonical" href="${BASE}/guide/${meta.slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="AirCrew Jobs">
  <meta property="og:title" content="${esc(meta.title)}">
  <meta property="og:description" content="${esc(meta.blurb)}">
  <meta property="og:url" content="${BASE}/guide/${meta.slug}.html">
  <meta property="og:image" content="${BASE}/assets/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    .gwrap { max-width: 760px; margin: 0 auto; padding: 140px 0 60px; }
    .article-body h2 { font-size: 1.3rem; margin: 34px 0 12px; }
    .article-body h2::before { content: "// "; color: var(--accent); font-weight: 700; }
    .article-body p { margin-bottom: 16px; font-size: 1.02rem; line-height: 1.75; color: var(--text-dim); }
    .article-body b, .article-body i { color: var(--text); }
    .gtoc { border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px 20px; background: var(--surface); margin: 24px 0; }
    .gtoc a { display: block; color: var(--accent); text-decoration: none; font-size: 0.92rem; padding: 3px 0; }
    .gnext { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 40px; }
    @media (max-width: 600px) { .gnext { grid-template-columns: 1fr; } }
  </style>
  <script type="application/ld+json">${JSON.stringify(articleLd).replace(/</g, "\\u003c")}</script>
</head>
<body>
  <div class="container gwrap">
    <a href="guides.html" style="color:var(--accent); text-decoration:none; font-family:var(--font-display); font-weight:600; font-size:0.9rem">← All guides</a>
    <div style="margin-top:18px"><span style="font-size:1.6rem">${meta.icon}</span> <span class="badge type">${esc(meta.tag)}</span> <span class="badge">${esc(meta.time)} read</span></div>
    <h1 style="font-size:clamp(1.8rem,4.5vw,2.6rem); margin-top:16px">${esc(meta.title)}</h1>
    <p style="margin-top:14px; font-size:1.1rem; color:var(--text-dim)">${esc(meta.blurb)}</p>

    <div class="gtoc"><b style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-faint)">In this guide</b>
      ${secs.map((s, i) => `<a href="#s${i}">${esc(s.h)}</a>`).join("")}
    </div>

    <div class="article-body">
      ${secs.map((s, i) => `<section id="s${i}"><h2>${esc(s.h)}</h2>${s.html}</section>`).join("\n      ")}
    </div>

    <div class="gnext">
      ${others.map(g => `<a class="card" href="guide/${g.slug}.html" style="text-decoration:none; padding:18px"><div style="font-size:1.6rem; margin-bottom:8px">${g.icon}</div><div style="font-family:var(--font-display); font-weight:600; color:var(--text)">${esc(g.title)}</div><div style="font-size:0.85rem; color:var(--text-faint); margin-top:6px">${esc(g.blurb)}</div></a>`).join("")}
    </div>

    <p style="font-size:0.9rem; color:var(--text-dim); margin-top:36px">Ready to apply? Browse <a href="jobs.html" style="color:var(--accent)">verified pilot &amp; cabin crew jobs →</a></p>
  </div>

  <script src="assets/app.js"></script>
</body>
</html>`;
}

/* SEO landing page: a role / region / country facet listing matching jobs.
   Links into the per-job pages; no JobPosting LD here (those pages own it). */
function landingPage(def, allDefs) {
  const nav = allDefs.map(d =>
    `<a href="${d.slug}.html"${d.slug === def.slug ? ' class="cur"' : ""}>${esc(d.navLabel)}</a>`).join("");
  const cards = def.jobs.map(jobCard).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_GTAG}
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(def.title)}</title>
  <meta name="description" content="${esc(def.desc)}">
  <link rel="canonical" href="${BASE}/${def.slug}.html">
  <meta name="robots" content="index,follow">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="AirCrew Jobs">
  <meta property="og:title" content="${esc(def.title)}">
  <meta property="og:description" content="${esc(def.desc)}">
  <meta property="og:url" content="${BASE}/${def.slug}.html">
  <meta property="og:image" content="${BASE}/assets/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/style.css">
  <style>
    .lwrap { max-width: 860px; margin: 0 auto; padding: 130px 0 60px; }
    .lnav { display: flex; flex-wrap: wrap; gap: 8px; margin: 22px 0 28px; }
    .lnav a { font-size: 0.82rem; padding: 6px 13px; border: 1px solid var(--border); border-radius: 999px; color: var(--text-dim); text-decoration: none; transition: all 0.15s; }
    .lnav a:hover { border-color: var(--accent); color: var(--accent); }
    .lnav a.cur { background: rgba(56,224,255,0.1); border-color: var(--border-bright); color: var(--accent); }
  </style>
</head>
<body>
  <div class="container lwrap">
    <a href="jobs.html" style="color:var(--accent); text-decoration:none; font-family:var(--font-display); font-weight:600; font-size:0.9rem">← Full job board</a>
    <h1 style="font-size:clamp(1.8rem,4.5vw,2.7rem); margin-top:18px">${esc(def.h1)} <span class="gradient-text">2026</span></h1>
    <p style="margin-top:14px; font-size:1.05rem; color:var(--text-dim)">${esc(def.intro)} <b style="color:var(--text)">${def.jobs.length}</b> verified ${def.jobs.length === 1 ? "vacancy" : "vacancies"} below — each links to the airline's official application.</p>
    <nav class="lnav">${nav}</nav>
    ${cards || `<p style="color:var(--text-dim)">No openings in this category right now — see the <a href="jobs.html" style="color:var(--accent)">full board</a>.</p>`}
    <p style="font-size:0.85rem; color:var(--text-faint); margin:36px 0 0">Listings verified against each airline's official careers portal. AirCrew Jobs is free for job-seekers — no agents, no fees. Browse the <a href="jobs.html" style="color:var(--accent)">full board</a> or the <a href="airlines.html" style="color:var(--accent)">airline directory</a>.</p>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="assets/config.js"></script>
  <script src="assets/data.js"></script>
  <script src="assets/backend.js"></script>
  <script src="assets/app.js"></script>
</body>
</html>`;
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
  <!-- Google tag (gtag.js) + Consent Mode v2 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18240351644"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
    try{if(localStorage.getItem('acj_consent')==='granted')gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}catch(e){}
    gtag("js", new Date());
    gtag("config", "AW-18240351644");
  </script>
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
    <p style="color:var(--text-dim); font-size:0.95rem">Most carriers screen with aptitude testing and competency interviews. Train the underlying skills with our free <a href="games.html" style="color:var(--accent)">prep games</a> and read the <a href="guide/interview-prep.html" style="color:var(--accent)">assessment guide</a>. Building hours or starting out? See the <a href="schools.html" style="color:var(--accent)">flight schools & Class 1 map</a>.</p>

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
}
console.log(`✓ ${slugs.length} airline pages`);

/* per-job static pages → /job/<slug>.html */
const JOB_OUT = path.join(ROOT, "job");
fs.mkdirSync(JOB_OUT, { recursive: true });
const airlineByName = Object.fromEntries(AIRLINES.map(a => [a.name, a]));
const jobSlugs = [];
for (const j of JOBS) {
  const a = airlineByName[j.airline];
  if (!a) { console.warn("⚠ no airline entry for job", j.id, j.airline); continue; }
  const slug = jobSlug(j);
  fs.writeFileSync(path.join(JOB_OUT, slug + ".html"), jobPage(j, a));
  jobSlugs.push(slug);
}
console.log(`✓ ${jobSlugs.length} per-job pages`);

/* per-guide static pages → /guide/<slug>.html */
const GUIDE_OUT = path.join(ROOT, "guide");
fs.mkdirSync(GUIDE_OUT, { recursive: true });
const staticGuideSlugs = [];
for (const g of GUIDES) {
  const content = GUIDE_CONTENT[g.slug];
  if (!content) { console.warn("⚠ no content for guide", g.slug); continue; }
  fs.writeFileSync(path.join(GUIDE_OUT, g.slug + ".html"), guidePage(g, content));
  staticGuideSlugs.push(g.slug);
}
console.log(`✓ ${staticGuideSlugs.length} guide pages`);

/* ---- SEO landing pages: role / region / country facets → /<slug>.html ---- */
const jobsCountry = {};
JOBS.forEach(j => { const a = airlineByName[j.airline]; if (a) (jobsCountry[a.country] = jobsCountry[a.country] || []).push(j); });
const REGION_LIST = ["Middle East", "Europe", "Asia-Pacific", "Americas"];
const land = [];
land.push({ slug: "cabin-crew-jobs", navLabel: "Cabin crew", h1: "Cabin Crew Jobs",
  title: "Cabin Crew Jobs 2026 — Verified Airline Vacancies, Apply Direct | AirCrew Jobs",
  desc: "Verified cabin crew & flight attendant jobs for 2026, updated daily. Apply direct on each airline's official site — no agents, no fees.",
  intro: "Verified cabin crew and flight attendant vacancies, updated daily and linked straight to each airline's official application.",
  jobs: JOBS.filter(j => j.category === "crew") });
land.push({ slug: "first-officer-jobs", navLabel: "First officers", h1: "First Officer Jobs",
  title: "First Officer Jobs 2026 — Verified Co-Pilot Vacancies | AirCrew Jobs",
  desc: "Verified First Officer (co-pilot) jobs for 2026 — rated and non-rated, cadet to direct entry. Apply direct, no agents.",
  intro: "Verified First Officer and co-pilot vacancies worldwide, from type-rated direct entry to low-hour entry.",
  jobs: JOBS.filter(j => j.role === "First Officer") });
land.push({ slug: "captain-jobs", navLabel: "Captains", h1: "Airline Captain Jobs",
  title: "Captain Jobs 2026 — Direct Entry Airline Captain Vacancies | AirCrew Jobs",
  desc: "Verified airline Captain (PIC) jobs for 2026 — direct entry and command. Apply direct on the official portal.",
  intro: "Verified airline Captain and direct-entry command vacancies, linked to each carrier's official application.",
  jobs: JOBS.filter(j => j.role === "Captain") });
land.push({ slug: "cadet-pilot-jobs", navLabel: "Cadet programmes", h1: "Cadet Pilot Programmes",
  title: "Cadet Pilot Programmes 2026 — Airline-Sponsored Training | AirCrew Jobs",
  desc: "Airline cadet pilot programmes and ab-initio training routes for 2026 — zero-hour entry to the flight deck. Verified, apply direct.",
  intro: "Airline cadet pilot programmes and sponsored ab-initio routes — the zero-hour path to an airline flight deck.",
  jobs: JOBS.filter(j => /cadet/i.test(j.role) || j.type === "Cadet") });
REGION_LIST.forEach(r => { const js = JOBS.filter(j => j.region === r); if (js.length >= 2) land.push({
  slug: "aviation-jobs-" + slugify(r), navLabel: r, h1: `Aviation Jobs in ${r}`,
  title: `Pilot & Cabin Crew Jobs in ${r} 2026 | AirCrew Jobs`,
  desc: `Verified pilot and cabin crew vacancies across ${r}, updated daily — apply direct on each airline's official site.`,
  intro: `Verified pilot and cabin crew vacancies with airlines across ${r}.`, jobs: js }); });
Object.entries(jobsCountry).sort((a, b) => b[1].length - a[1].length).forEach(([c, js]) => { if (js.length >= 3) land.push({
  slug: "aviation-jobs-" + slugify(c), navLabel: c, h1: `Aviation Jobs in ${c}`,
  title: `Pilot & Cabin Crew Jobs in ${c} 2026 | AirCrew Jobs`,
  desc: `Verified airline jobs with carriers based in ${c} — pilot and cabin crew roles with direct apply links, updated daily.`,
  intro: `Verified jobs with airlines based in ${c} — pilot and cabin crew roles.`, jobs: js }); });
const landSlugs = [];
for (const def of land) {
  fs.writeFileSync(path.join(ROOT, def.slug + ".html"), landingPage(def, land));
  landSlugs.push(def.slug);
}
console.log(`✓ ${landSlugs.length} SEO landing pages`);


/* regenerate sitemap.xml including airline pages */
const corePages = ["/", "/jobs.html", "/airlines.html", "/schools.html", "/games.html", "/salaries.html", "/guides.html"];
const urls = [
  ...corePages.map(p => BASE + p),
  ...staticGuideSlugs.map(g => `${BASE}/guide/${g}.html`),
  ...landSlugs.map(s => `${BASE}/${s}.html`),
  ...slugs.map(s => `${BASE}/airline/${s}.html`),
  ...jobSlugs.map(s => `${BASE}/job/${s}.html`)
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
  const landingLinks = land.map(d => `        <li><a href="${d.slug}.html">${esc(d.h1)}</a> — ${d.jobs.length} verified</li>`).join("\n");
  const block =
`  <noscript>
    <!-- JOBS_NOSCRIPT_START — auto-generated by tools/generate-airlines.js; do not edit by hand -->
    <section class="container" style="padding:40px 0">
      <h2>Verified pilot &amp; cabin crew vacancies (${VERIFIED_DATE})</h2>
      <p>The interactive map and filters need JavaScript. Every current verified opening is listed below, each linking to the airline's hiring page and its official application portal.</p>
      <h3>Browse by role, region &amp; country</h3>
      <ul>
${landingLinks}
      </ul>
      <h3>All current openings</h3>
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
