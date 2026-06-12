/* AirCrew Jobs — dataset.
   ALL job listings are real vacancies/programmes sourced from official airline
   careers portals, verified 10 Jun 2026. Each links out via applyUrl.
   Where an airline doesn't publish a figure (salary / exact minimums),
   we say so rather than invent one. */

const VERIFIED_DATE = "10 Jun 2026";

/* Airline website domains — used for logo lookup */
const DOMAINS = {
  "Emirates": "emirates.com",
  "Etihad Airways": "etihad.com",
  "Qatar Airways": "qatarairways.com",
  "flydubai": "flydubai.com",
  "Ryanair": "ryanair.com",
  "easyJet": "easyjet.com",
  "Wizz Air": "wizzair.com",
  "Cathay Pacific": "cathaypacific.com",
  "Singapore Airlines": "singaporeair.com",
  "United Airlines": "united.com",
  "Ethiopian Airlines": "ethiopianairlines.com",
  "Virgin Australia": "virginaustralia.com",
  "Air New Zealand": "airnewzealand.co.nz",
  "Vueling": "vueling.com",
  "Norwegian": "norwegian.com",
  "IndiGo": "goindigo.in",
  "Delta Air Lines": "delta.com",
  "American Airlines": "aa.com",
  "Lufthansa": "lufthansa.com",
  "Qantas": "qantas.com",
  "Turkish Airlines": "turkishairlines.com",
  "Jet2": "jet2.com",
  "Air Canada": "aircanada.com",
  "Korean Air": "koreanair.com",
  "Riyadh Air": "riyadhair.com",
  "British Airways": "britishairways.com",
  "Aer Lingus": "aerlingus.com",
  "DHL Aviation": "dhl.com",
  "SAS": "flysas.com",
  "Akasa Air": "akasaair.com",
  "Gulf Air": "gulfair.com"
};

/* Base coordinates for the job map — keyed by the exact `location` strings used in JOBS.
   Multi-base entries pin at the airline's hub. */
const BASES = {
  "Dubai (DXB)":                      [25.25, 55.36],
  "Abu Dhabi (AUH)":                  [24.43, 54.65],
  "Doha (DOH)":                       [25.27, 51.61],
  "Riyadh (RUH)":                     [24.96, 46.70],
  "Bases across Europe":              [53.43, -6.25],   // Ryanair — Dublin hub
  "EU training partners":             [53.43, -6.25],
  "UK & EU bases":                    [51.87, -0.37],   // easyJet — Luton hub
  "35+ bases EU & ME":                [47.44, 19.26],   // Wizz — Budapest hub
  "Budapest + partners":              [47.44, 19.26],   // Wizz Pilot Academy
  "Barcelona + Spanish bases":        [41.30, 2.08],
  "CAE academies + Barcelona":        [41.30, 2.08],
  "UK bases":                         [53.87, -1.66],   // Jet2 — Leeds hub
  "Oslo Gardermoen (OSL)":            [60.19, 11.10],
  "London Heathrow":                  [51.47, -0.45],
  "London City (LCY)":                [51.50, 0.05],
  "Edinburgh (EDI)":                  [55.95, -3.37],
  "Hong Kong (HKG)":                  [22.31, 113.92],
  "Singapore (SIN)":                  [1.36, 103.99],
  "MY · KR · JP · TH · IN bases":     [1.36, 103.99],   // SIA crew — Singapore HQ
  "Indian bases":                     [28.56, 77.10],   // IndiGo — Delhi hub
  "India + CAE academies":            [28.56, 77.10],
  "US bases (DEN, ORD, IAH, EWR…)":   [39.86, -104.67], // United — Denver
  "Addis Ababa (ADD)":                [8.98, 38.80],
  "Leipzig (LEJ)":                    [51.42, 12.24],
  "East Midlands (EMA)":              [52.83, -1.33],
  "Copenhagen (CPH)":                 [55.62, 12.65],
  "Mumbai (BOM)":                     [19.09, 72.87],
  "Bahrain (BAH)":                    [26.27, 50.63],
  "Australian bases":                 [-27.38, 153.12], // Virgin Australia — Brisbane
  "NZ regional bases":                [-37.01, 174.79]  // Air NZ — Auckland
};

const JOBS = [
  /* ================= MIDDLE EAST ================= */

  /* ---- Emirates · official pathways (emiratesgroupcareers.com) ---- */
  { id: 101, airline: "Emirates", role: "Captain", aircraft: "B777 / A380", region: "Middle East", location: "Dubai (DXB)", type: "Direct Entry", minHours: 7000, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tax-free + housing + profit share",
    reqs: "From 7,000 hrs TT. Direct Entry Captain pathway.",
    applyUrl: "https://www.emiratesgroupcareers.com/pilots/our-role-details/?name=direct-entry-captains" },
  { id: 102, airline: "Emirates", role: "Captain", aircraft: "Accelerated Command", region: "Middle East", location: "Dubai (DXB)", type: "Direct Entry", minHours: 5000, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tax-free + housing + profit share",
    reqs: "From 5,000 hrs TT. Fast-track to command at Emirates.",
    applyUrl: "https://www.emiratesgroupcareers.com/pilots/our-role-details/?name=accelerated-command" },
  { id: 103, airline: "Emirates", role: "First Officer", aircraft: "B777 / A380", region: "Middle East", location: "Dubai (DXB)", type: "Direct Entry", minHours: 2000, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tax-free + housing + profit share",
    reqs: "From 2,000 hrs TT. Training bond USD 42,000 / 42 months.",
    applyUrl: "https://www.emiratesgroupcareers.com/pilots/our-role-details/?name=first-officers" },
  { id: 104, airline: "Emirates", role: "Cadet Pilot", aircraft: "National Cadet Programme", region: "Middle East", location: "Dubai (DXB)", type: "Cadet", minHours: 0, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Fully sponsored (UAE nationals)",
    reqs: "0 hrs. Open to UAE nationals.",
    applyUrl: "https://www.emiratesgroupcareers.com/pilots/our-role-details/?name=national-cadet-pilot-programme" },

  /* ---- Etihad · live vacancies (careers.etihad.com / SmartRecruiters) ---- */
  { id: 111, airline: "Etihad Airways", role: "First Officer", aircraft: "A320 (non-rated)", region: "Middle East", location: "Abu Dhabi (AUH)", type: "Direct Entry", minHours: 2500, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tax-free, up to $138,318/yr",
    reqs: "2,500 hrs TT · 1,500 hrs multi-crew glass · ATPL/fATPL · under 50.",
    applyUrl: "https://jobs.smartrecruiters.com/EtihadAirways5/744000122598424-first-officer-a320-non-type-rated" },
  { id: 112, airline: "Etihad Airways", role: "First Officer", aircraft: "A320", region: "Middle East", location: "Abu Dhabi (AUH)", type: "Rated", minHours: 1500, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tax-free, up to $138,318/yr",
    reqs: "1,500–2,000 hrs TT with A320 time · current on type (12 mo).",
    applyUrl: "https://jobs.smartrecruiters.com/EtihadAirways5/744000122343440-first-officer-a320" },
  { id: 113, airline: "Etihad Airways", role: "First Officer", aircraft: "Airbus Widebody", region: "Middle East", location: "Abu Dhabi (AUH)", type: "Rated", minHours: 2500, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tax-free, up to $138,318/yr",
    reqs: "2,500–3,000 hrs TT with 1,000–2,000 hrs widebody · current (12 mo).",
    applyUrl: "https://jobs.smartrecruiters.com/EtihadAirways5/744000122599168-first-officer-airbus-wide-body" },
  { id: 114, airline: "Etihad Airways", role: "Captain", aircraft: "A320 (non-rated)", region: "Middle East", location: "Abu Dhabi (AUH)", type: "Direct Entry", minHours: 7000, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tax-free, up to $181,589/yr",
    reqs: "7,000 hrs TT · 4,000 PIC multi-crew glass · ICAO ATPL · under 59.",
    applyUrl: "https://jobs.smartrecruiters.com/EtihadAirways5/744000122599831-captain-a320-non-type-rated" },
  { id: 115, airline: "Etihad Airways", role: "Captain", aircraft: "A320", region: "Middle East", location: "Abu Dhabi (AUH)", type: "Rated", minHours: 5500, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tax-free, up to $181,589/yr",
    reqs: "5,500 hrs TT · 2,500 PIC glass · 1,500 PIC on A320 family.",
    applyUrl: "https://jobs.smartrecruiters.com/EtihadAirways5/744000122343668-captain-a320" },
  { id: 116, airline: "Etihad Airways", role: "Captain", aircraft: "Airbus Widebody", region: "Middle East", location: "Abu Dhabi (AUH)", type: "Rated", minHours: 7000, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tax-free, up to $181,589/yr",
    reqs: "7,000 hrs TT · 2,500–3,000 PIC jet, mostly widebody >140t · current.",
    applyUrl: "https://jobs.smartrecruiters.com/EtihadAirways5/744000122599538-captain-airbus-wide-body" },
  { id: 117, airline: "Etihad Airways", role: "Captain", aircraft: "A320 — Instructor (TRI)", region: "Middle East", location: "Abu Dhabi (AUH)", type: "Rated", minHours: 5500, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "Captain A320 criteria + instructor experience — see listing.",
    applyUrl: "https://jobs.smartrecruiters.com/EtihadAirways5/744000122595808-captain-a320-instructor" },

  /* ---- Qatar Airways (careers.qatarairways.com) ---- */
  { id: 121, airline: "Qatar Airways", role: "Cadet Pilot", aircraft: "MPL Cadet Programme", region: "Middle East", location: "Doha (DOH)", type: "Cadet", minHours: 0, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "Qatari nationals only · age 18+ · IELTS 6.0 · applications open to 30 Jun 2027. (Direct-entry FO/Captain windows currently closed on the portal.)",
    applyUrl: "https://careers.qatarairways.com/global/JobDetail/Cadet-Pilot-Training-Programme-Qatari-Nationals-Only/1258" },

  /* ---- flydubai (careers.flydubai.com) ---- */
  { id: 131, airline: "flydubai", role: "Captain", aircraft: "B737 NG / MAX", region: "Middle East", location: "Dubai (DXB)", type: "Rated", minHours: 5000, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tax-free package — see listing",
    reqs: "5,000 hrs TT · 1,500 hrs PIC multi-crew >10t · 1,000 hrs PIC on B737 · rating endorsed in last 24 mo.",
    applyUrl: "https://careers.flydubai.com/captain" },
  { id: 132, airline: "flydubai", role: "First Officer", aircraft: "B737 NG / MAX", region: "Middle East", location: "Dubai (DXB)", type: "Direct Entry", minHours: 1500, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "AED 35,250/mo + flying pay (tax-free)",
    reqs: "Rated: 1,500 MPA hrs + 500 on B737. Non-rated: 2,500 hrs TT + 1,000 on modern multi-crew jet.",
    applyUrl: "https://careers.flydubai.com/first-officer" },
  { id: 133, airline: "flydubai", role: "Cadet Pilot", aircraft: "Ab Initio Programme", region: "Middle East", location: "Dubai (DXB)", type: "Cadet", minHours: 0, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "0 hrs. Ab Initio Pilot Training Programme — plus separate UAE-national cadet route.",
    applyUrl: "https://careers.flydubai.com/pilots/ab-initio-pilot" },

  /* ================= EUROPE ================= */

  /* ---- Ryanair (careers.ryanair.com) ---- */
  { id: 141, airline: "Ryanair", role: "Captain", aircraft: "B737-800 / 8200", region: "Europe", location: "Bases across Europe", type: "Rated", minHours: 3000, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "Up to £155,500 / €165,000 in year 1",
    reqs: "Experienced B737 Captains, all Ryanair Group AOCs · 5/4 roster, no night stops · full criteria on portal.",
    applyUrl: "https://careers.ryanair.com/pilots/jobs/" },
  { id: 142, airline: "Ryanair", role: "First Officer", aircraft: "B737 (licensed cadets)", region: "Europe", location: "Bases across Europe", type: "Rated", minHours: 200, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "CPL/fATPL holders — type rating programme, fastest route to command.",
    applyUrl: "https://careers.ryanair.com/pilots/cadets/" },
  { id: 143, airline: "Ryanair", role: "Cadet Pilot", aircraft: "Future Flyer Academy", region: "Europe", location: "EU training partners", type: "Cadet", minHours: 0, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Self-funded with defined career path",
    reqs: "0 hrs. Ab initio training with a clear path to the Ryanair flight deck.",
    applyUrl: "https://careers.ryanair.com/pilots/become-a-pilot/" },

  /* ---- easyJet (careers.easyjet.com) ---- */
  { id: 151, airline: "easyJet", role: "Captain", aircraft: "A320 family", region: "Europe", location: "UK & EU bases", type: "Direct Entry", minHours: 4000, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "≈ £144,600–£166,300 (UK contract)",
    reqs: "Rated: 4,000 hrs TT + 1,000 PIC on A320. Non-rated: 4,000 hrs TT + 1,000 PIC jet >30t.",
    applyUrl: "https://careers.easyjet.com/en/career-areas/pilots" },
  { id: 152, airline: "easyJet", role: "First Officer", aircraft: "A320 family", region: "Europe", location: "UK & EU bases", type: "Direct Entry", minHours: 500, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "≈ £60,400–£83,000 (UK contract)",
    reqs: "Rated: 500 hrs on A320. Non-rated: 500 hrs on aircraft >10t MTOW.",
    applyUrl: "https://careers.easyjet.com/en/career-areas/pilots" },

  /* ---- Wizz Air (careers.wizzair.com) ---- */
  { id: 161, airline: "Wizz Air", role: "Captain", aircraft: "A320 / A321", region: "Europe", location: "35+ bases EU & ME", type: "Rated", minHours: 3000, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "Local contracts — see portal",
    reqs: "3,000 hrs actual flight time + 100 landings on A320/A330/A350 family.",
    applyUrl: "https://careers.wizzair.com/go/Pilot-Jobs/5258601" },
  { id: 162, airline: "Wizz Air", role: "First Officer", aircraft: "A320 / A321", region: "Europe", location: "35+ bases EU & ME", type: "Direct Entry", minHours: 500, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Local contracts — see portal",
    reqs: "Rated: current A320 rating + 500 hrs on type. Non-rated: 1,500 hrs on jet MPA >50t.",
    applyUrl: "https://careers.wizzair.com/go/Pilot-Jobs/5258601" },
  { id: 163, airline: "Wizz Air", role: "Cadet Pilot", aircraft: "Pilot Academy (WAPA)", region: "Europe", location: "Budapest + partners", type: "Cadet", minHours: 0, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Tuition €13,950 (ab initio phase)",
    reqs: "0 hrs. Courses start every 3 months through 2026.",
    applyUrl: "https://careers.wizzair.com/go/Pilot-Academy/5382601/" },

  /* ---- Vueling (careers.vueling.com) ---- */
  { id: 221, airline: "Vueling", role: "First Officer", aircraft: "A320", region: "Europe", location: "Barcelona + Spanish bases", type: "Direct Entry", minHours: 200, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "fATPL/ATPL · Spanish EASA licence before OCC · Class 1 · ICAO L4 · 2026 intake (50 B737 MAX arriving from late 2026).",
    applyUrl: "https://careers.vueling.com/jobs/6621193-first-officer-a320-2026" },
  { id: 222, airline: "Vueling", role: "Cadet Pilot", aircraft: "CAE Cadet Programme", region: "Europe", location: "CAE academies + Barcelona", type: "Cadet", minHours: 0, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Self-funded with airline pathway",
    reqs: "0 hrs. CPL + A320 rating then Vueling flight deck — run with CAE.",
    applyUrl: "https://www.cae.com/civil-aviation/become-a-pilot/our-pilot-training-programmes/vueling-cadet-pilot-programme/" },

  /* ---- Jet2 (jet2careers.com) ---- */
  { id: 223, airline: "Jet2", role: "Captain", aircraft: "B737 / A321neo", region: "Europe", location: "UK bases", type: "Direct Entry", minHours: 3000, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Competitive — 24%+ compounded rises since 2022",
    reqs: "Type-rated and non-type-rated Captains — full per-fleet criteria on Jet2 Careers.",
    applyUrl: "https://jet2careers.com/pilot-careers/" },
  { id: 224, airline: "Jet2", role: "First Officer", aircraft: "B737 / A321neo", region: "Europe", location: "UK bases", type: "Rated", minHours: 500, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "Type-rated B737NG/A320-family FOs (fATPL accepted) · non-rated SFO route also open.",
    applyUrl: "https://jet2careers.com/vacancy/?vId=4613" },

  /* ---- Norwegian (careers.norwegian.com) ---- */
  { id: 225, airline: "Norwegian", role: "First Officer", aircraft: "B737", region: "Europe", location: "Oslo Gardermoen (OSL)", type: "Rated", minHours: 500, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "Rated B737 FOs · 90+ B737 NG/MAX fleet across Nordics.",
    applyUrl: "https://careers.norwegian.com/job/Gardermoen-First-Officer-B737-2060/1358395957/" },
  { id: 226, airline: "Norwegian", role: "First Officer", aircraft: "B737 (non-rated)", region: "Europe", location: "Oslo Gardermoen (OSL)", type: "Direct Entry", minHours: 1500, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "Experienced non-type-rated FOs — criteria on the listing.",
    applyUrl: "https://careers.norwegian.com/job/Gardermoen-Experienced-Non-Type-Rated-First-Officers-2060/1359025057/" },

  /* ================= ASIA-PACIFIC ================= */

  /* ---- IndiGo (goindigo.in) ---- */
  { id: 227, airline: "IndiGo", role: "Captain", aircraft: "A320", region: "Asia-Pacific", location: "Indian bases", type: "Rated", minHours: 3000, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "₹6–8 lakh/mo (typical)",
    reqs: "DGCA ATPL with A320 PIC endorsement · 3,000 hrs TT · 100 PIC post line release on A320 family.",
    applyUrl: "https://www.goindigo.in/careers/departments/flightoperations.html" },
  { id: 228, airline: "IndiGo", role: "First Officer", aircraft: "A320", region: "Asia-Pacific", location: "Indian bases", type: "Rated", minHours: 500, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "₹1.8–3.5 lakh/mo (typical)",
    reqs: "Line-released A320 FOs · 200+ hrs post line release · valid FRTO/RTR, Class 1 · under 55.",
    applyUrl: "https://www.goindigo.in/careers/departments/flightoperations.html" },
  { id: 229, airline: "IndiGo", role: "Cadet Pilot", aircraft: "CAE Cadet Programme", region: "Asia-Pacific", location: "India + CAE academies", type: "Cadet", minHours: 0, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Self-funded → Junior FO on A320",
    reqs: "0 hrs. CPL + A320 rating, direct to IndiGo Junior First Officer.",
    applyUrl: "https://www.cae.com/civil-aviation/become-a-pilot/our-pilot-training-programmes/indigo-cadet-pilot-programme/" },


  /* ---- Cathay Pacific (careers.cathaypacific.com) ---- */
  { id: 171, airline: "Cathay Pacific", role: "First Officer", aircraft: "A321 / A330 / A350 / B777 / B747", region: "Asia-Pacific", location: "Hong Kong (HKG)", type: "Direct Entry", minHours: 1500, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Productivity contract + housing & education allowances",
    reqs: "1,500 hrs TT (3,000 preferred) · 500 hrs P1 · ICAO ATPL or CPL/MEIR with ATPL credits · fleet assigned by Cathay.",
    applyUrl: "https://careers.cathaypacific.com/en/careers/jobs/hong-kong/first-officer-direct-entry-30022" },
  { id: 172, airline: "Cathay Pacific", role: "Cadet Pilot", aircraft: "Cadet Programme (~80 weeks)", region: "Asia-Pacific", location: "Hong Kong (HKG)", type: "Cadet", minHours: 0, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Fully sponsored training",
    reqs: "0 hrs · right to live/work in Hong Kong or Chinese Mainland · IELTS 6.0 · open year-round.",
    applyUrl: "https://careers.cathaypacific.com/en/careers/jobs/hong-kong/cadet-pilot-programme-29631" },

  /* ---- Singapore Airlines (careers.singaporeair.com) ---- */
  { id: 181, airline: "Singapore Airlines", role: "Cadet Pilot", aircraft: "Ab Initio (A320 rating)", region: "Asia-Pacific", location: "Singapore (SIN)", type: "Cadet", minHours: 0, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "Fully sponsored · 7-year bond",
    reqs: "0 hrs · Singapore citizens/PRs · A-levels, diploma or degree · SIA pays full training cost incl. type rating.",
    applyUrl: "https://careers.singaporeair.com/sia/job/Ab-Initio-Cadet-Pilot-%28Singapore%29/19586544/" },

  /* ================= AMERICAS ================= */

  /* ---- United Airlines (careers.united.com) ---- */
  { id: 191, airline: "United Airlines", role: "First Officer", aircraft: "B737 / A321 / B787 / B777", region: "Americas", location: "US bases (DEN, ORD, IAH, EWR…)", type: "Direct Entry", minHours: 1500, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "From $125.52/flight hr (year 1)",
    reqs: "1,500 hrs TT · unrestricted ATP (AMEL) · FAA Class 1 · FCC permit · 1,000 fixed-wing turbine preferred · US work authorisation.",
    applyUrl: "https://careers.united.com/us/en/first-officer" },

  /* ================= AFRICA ================= */

  /* ---- Ethiopian Airlines (corporate.ethiopianairlines.com) ---- */
  { id: 201, airline: "Ethiopian Airlines", role: "Captain", aircraft: "B777 / A350 / B767 / B737 (Expat)", region: "Africa", location: "Addis Ababa (ADD)", type: "Rated", minHours: 4000, rated: true, posted: 0, added: "2026-06-10", verified: true,
    salary: "Expat contract — see vacancy list",
    reqs: "Type-rated, current Captains. Per-fleet criteria on the official international vacancies page.",
    applyUrl: "https://corporate.ethiopianairlines.com/AboutEthiopian/careers/vacancies" },
  { id: 202, airline: "Ethiopian Airlines", role: "First Officer", aircraft: "B737 NG (non-rated)", region: "Africa", location: "Addis Ababa (ADD)", type: "Direct Entry", minHours: 1500, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "1,500 hrs TT · ATPL. Africa's largest carrier, rapid widebody progression.",
    applyUrl: "https://corporate.ethiopianairlines.com/AboutEthiopian/careers/vacancies" },

  /* ================= OCEANIA ================= */

  /* ---- Virgin Australia (virginaustralia.com) ---- */
  { id: 211, airline: "Virgin Australia", role: "First Officer", aircraft: "B737", region: "Asia-Pacific", location: "Australian bases", type: "Direct Entry", minHours: 500, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "Australian ATPL or CPL with ATPL theory · MEA IR (2D/3D) · actively processing applications. Full criteria on portal.",
    applyUrl: "https://www.virginaustralia.com/au/en/about-us/careers/pilot-jobs/" },

  /* ---- Air New Zealand (careers.airnewzealand.co.nz) ---- */
  { id: 212, airline: "Air New Zealand", role: "First Officer", aircraft: "Turboprop (Q300 / ATR72)", region: "Asia-Pacific", location: "NZ regional bases", type: "Direct Entry", minHours: 500, rated: false, posted: 0, added: "2026-06-10", verified: true,
    salary: "See official listing",
    reqs: "Expression of interest · NZCAA CPL/ATPL · NZ/AU citizenship or residency · multiple bases.",
    applyUrl: "https://careers.airnewzealand.co.nz/job/expression-of-interest-first-officer-turboprop-fleet-in-auckland-nz-jid-149" },

  /* Turkish Airlines: no open cockpit postings on the portal (checked 11 Jun 2026) — listings removed,
     status tracked in the airline directory instead. */

  /* ---- Riyadh Air (riyadhair.com / icims) — verified 11 Jun 2026 ---- */
  { id: 233, airline: "Riyadh Air", role: "Captain", aircraft: "B787", region: "Middle East", location: "Riyadh (RUH)", type: "Rated", minHours: 5000, rated: true, posted: 0, added: "2026-06-11", verified: true,
    salary: "See official listing",
    reqs: "Direct Entry Captains for Saudi Arabia's new flag carrier — full criteria on the official portal. Beware unofficial agents charging fees.",
    applyUrl: "https://www.riyadhair.com/en/careers/pilots" },
  { id: 234, airline: "Riyadh Air", role: "First Officer", aircraft: "B787", region: "Middle East", location: "Riyadh (RUH)", type: "Rated", minHours: 1500, rated: true, posted: 0, added: "2026-06-11", verified: true,
    salary: "See official listing",
    reqs: "B787 First Officers, Riyadh base. Apply only via official Riyadh Air channels.",
    applyUrl: "https://pilots-riyadhair.icims.com/jobs/1124/first-officer-b787/job" },

  /* ---- British Airways (careers.ba.com) — 4 live postings, verified 11 Jun 2026 ---- */
  { id: 241, airline: "British Airways", role: "First Officer", aircraft: "Military Pilot Pathway", region: "Europe", location: "London Heathrow", type: "Direct Entry", minHours: 1000, rated: false, posted: 0, added: "2026-06-11", verified: true,
    salary: "See official listing",
    reqs: "Current/former military pilots transitioning to BA mainline — full criteria on the posting. (No mainline civilian DEP FO posting currently; Speedbird Academy reopens 2027.)",
    applyUrl: "https://careers.ba.com/job/heathrow/military-pilot-pathway/22348/94593554320" },
  { id: 243, airline: "British Airways", role: "Captain", aircraft: "E190 (BA Cityflyer)", region: "Europe", location: "London City (LCY)", type: "Direct Entry", minHours: 3000, rated: false, posted: 0, added: "2026-06-11", verified: true,
    salary: "See official listing",
    reqs: "Direct Entry Captain at BA Cityflyer — full criteria on the posting.",
    applyUrl: "https://careers.ba.com/job/london/ba-cityflyer-direct-entry-captain/22348/94593554608" },
  { id: 244, airline: "British Airways", role: "Captain", aircraft: "E190 (BA Cityflyer)", region: "Europe", location: "Edinburgh (EDI)", type: "Direct Entry", minHours: 3000, rated: false, posted: 0, added: "2026-06-11", verified: true,
    salary: "See official listing",
    reqs: "Direct Entry Captain at BA Cityflyer, Edinburgh base — full criteria on the posting.",
    applyUrl: "https://careers.ba.com/job/edinburgh/ba-cityflyer-direct-entry-captain/22348/94593554592" },
  { id: 245, airline: "British Airways", role: "First Officer", aircraft: "E190 (BA Cityflyer) — Aspiration to Command", region: "Europe", location: "London City (LCY)", type: "Direct Entry", minHours: 1500, rated: false, posted: 0, added: "2026-06-11", verified: true,
    salary: "See official listing",
    reqs: "Experienced FOs joining the E190 command pathway — full criteria on the posting.",
    applyUrl: "https://careers.ba.com/job/london/ba-cityflyer-aspiration-to-command/22348/94593554560" },

  /* Aer Lingus: DEP application process CLOSED (confirmed on their page, 11 Jun 2026) —
     listing removed, status tracked in the airline directory instead. */

  /* ---- DHL Aviation (careers.dhl.com) — verified 12 Jun 2026 ---- */
  { id: 251, airline: "DHL Aviation", role: "First Officer", aircraft: "A330 / B757 (EAT Leipzig)", region: "Europe", location: "Leipzig (LEJ)", type: "Direct Entry", minHours: 500, rated: false, posted: 0, added: "2026-06-12", verified: true,
    salary: "See requisitions — 144 OFF days/yr roster",
    reqs: "Rated & non-rated FOs at EAT Leipzig (cargo) — commuter-friendly 7-on/6-off pattern, 36 days leave. Captains also recruited; criteria per requisition.",
    applyUrl: "https://careers.dhl.com/global/en/flight-operations" },
  { id: 252, airline: "DHL Aviation", role: "First Officer", aircraft: "B777 (DHL Air UK)", region: "Europe", location: "East Midlands (EMA)", type: "Rated", minHours: 500, rated: true, posted: 0, added: "2026-06-12", verified: true,
    salary: "See requisitions",
    reqs: "Type-rated B777 FOs for DHL Air UK long-haul cargo — Captains also recruited via the same portal.",
    applyUrl: "https://careers.dhl.com/global/en/flight-operations" },

  /* ---- SAS (careers.sasgroup.net) — direct posting, verified 12 Jun 2026 ---- */
  { id: 253, airline: "SAS", role: "First Officer", aircraft: "A320 / A330 / A350", region: "Europe", location: "Copenhagen (CPH)", type: "Direct Entry", minHours: 1500, rated: false, posted: 0, added: "2026-06-12", verified: true,
    salary: "See official posting",
    reqs: "'Experienced First Officer' posting live at Kastrup — full criteria on the posting. A350 growth (Seoul, Mumbai routes) driving intake.",
    applyUrl: "https://careers.sasgroup.net/job/Kastrup-JOIN-SAS-AS-A-EXPERIENCED-FIRST-OFFICER/1222839901/" },

  /* ---- Akasa Air (akasaair.com) — verified 12 Jun 2026 ---- */
  { id: 254, airline: "Akasa Air", role: "First Officer", aircraft: "B737 MAX", region: "Asia-Pacific", location: "Mumbai (BOM)", type: "Direct Entry", minHours: 200, rated: false, posted: 0, added: "2026-06-12", verified: true,
    salary: "See official listing",
    reqs: "CPL holders and B737 type-rated pilots — India's fastest-growing fleet (226 MAX on order). Captains also recruited; criteria per role on the portal.",
    applyUrl: "https://www.akasaair.com/careers-at-akasa-air/pilots-careers-at-akasa-air" },
  { id: 255, airline: "Akasa Air", role: "Cadet Pilot", aircraft: "SkyCadet Programme", region: "Asia-Pacific", location: "Mumbai (BOM)", type: "Cadet", minHours: 0, rated: false, posted: 0, added: "2026-06-12", verified: true,
    salary: "Structured pathway to the B737 MAX",
    reqs: "⏰ Applications close 24 Jun 2026. Ab initio pathway into Akasa's flight deck — criteria on the official programme page.",
    applyUrl: "https://www.akasaair.com/akasa-air-skycadet-programme" },

  /* ---- Gulf Air (gulfair.com) — verified 12 Jun 2026 ---- */
  { id: 256, airline: "Gulf Air", role: "Captain", aircraft: "B787", region: "Middle East", location: "Bahrain (BAH)", type: "Rated", minHours: 4000, rated: true, posted: 0, added: "2026-06-12", verified: true,
    salary: "Tax-free + housing + schooling (2 children)",
    reqs: "B787 Captains advertised — search 'pilot' in the official portal's Job Search for full per-role criteria.",
    applyUrl: "https://www.gulfair.com/careers" },

  /* ================= CABIN CREW — verified 11 Jun 2026 ================= */
  { id: 301, airline: "Emirates", category: "crew", role: "Cabin Crew", aircraft: "A380 / B777 cabins", region: "Middle East", location: "Dubai (DXB)", type: "Direct Entry", minHours: 0, rated: false, posted: 0, added: "2026-06-11", verified: true,
    salary: "Tax-free + free accommodation + travel perks",
    reqs: "21+ · high-school (Grade 12) · fluent English · 1+ yr customer service · open days worldwide + online application.",
    applyUrl: "https://www.emiratesgroupcareers.com/cabin-crew/" },
  { id: 302, airline: "Qatar Airways", category: "crew", role: "Cabin Crew", aircraft: "QR international fleet", region: "Middle East", location: "Doha (DOH)", type: "Direct Entry", minHours: 0, rated: false, posted: 0, added: "2026-06-11", verified: true,
    salary: "Tax-free + furnished accommodation + medical",
    reqs: "Online application open · walk-in events worldwide (Nice, Bangkok, Tokyo & more on the portal).",
    applyUrl: "https://careers.qatarairways.com/global/JobDetail/Cabin-Crew-Recruitment-Doha-Qatar-2026/77216" },
  { id: 303, airline: "Singapore Airlines", category: "crew", role: "Cabin Crew", aircraft: "SQ international fleet", region: "Asia-Pacific", location: "MY · KR · JP · TH · IN bases", type: "Direct Entry", minHours: 0, rated: false, posted: 0, added: "2026-06-11", verified: true,
    salary: "See official listing",
    reqs: "Open now for Malaysia, South Korea, Japan, Thailand & India intakes (Singapore base currently closed) · video interview then in-person.",
    applyUrl: "https://careers.singaporeair.com/sia/go/Cabin-Crew/689244/" },
  { id: 304, airline: "British Airways", category: "crew", role: "Cabin Crew", aircraft: "Talent Pool", region: "Europe", location: "London Heathrow", type: "Direct Entry", minHours: 0, rated: false, posted: 0, added: "2026-06-11", verified: true,
    salary: "See official listing",
    reqs: "Live talent-pool posting — register for upcoming Heathrow cabin crew intakes.",
    applyUrl: "https://careers.ba.com/job/heathrow/cabin-crew-talent-pool/22348/94593554544" }
];

const AIRLINES = [
  { name: "Emirates",           code: "EK", domain: "emirates.com",          country: "UAE",          fleet: "A380, B777, A350",        pilots: 4200, bases: "Dubai",                       status: "hiring", note: "✓ Verified 10 Jun 2026: recruiting DE Captains (7,000+ hrs), Accelerated Command (5,000+), FOs (2,000+) and UAE national cadets. Roadshows: Astana, Istanbul, Hong Kong, Singapore, Madrid, Lisbon (Jun–Aug)." },
  { name: "Etihad Airways",     code: "EY", domain: "etihad.com",            country: "UAE",          fleet: "B787, A350, B777, A380",  pilots: 1800, bases: "Abu Dhabi",                   status: "hiring", note: "✓ Verified 10 Jun 2026: 7 live flight-deck vacancies — A320 & widebody Captains and FOs, rated and non-rated. 'Journey 2030' plan to double the fleet." },
  { name: "Qatar Airways",      code: "QR", domain: "qatarairways.com",      country: "Qatar",        fleet: "B787, B777, A350, A380",  pilots: 3800, bases: "Doha",                        status: "paused", note: "✓ Verified 10 Jun 2026: only the MPL Cadet Programme (Qatari nationals) is open on the careers portal. Direct-entry windows open periodically — check back." },
  { name: "flydubai",           code: "FZ", domain: "flydubai.com",          country: "UAE",          fleet: "B737 NG, B737 MAX",       pilots: 1300, bases: "Dubai",                       status: "hiring", note: "✓ Verified 10 Jun 2026: recruiting Captains, FOs (rated & non-rated), Second Officers and ab initio cadets." },
  { name: "Ryanair",            code: "FR", domain: "ryanair.com",           country: "Ireland",      fleet: "B737-800, B737-8200",     pilots: 6500, bases: "90+ across Europe",           status: "hiring", note: "✓ Verified 10 Jun 2026: Direct Entry Captains open across the Group (up to £155.5k/€165k yr 1), plus licensed-cadet TR programme and Future Flyer Academy." },
  { name: "easyJet",            code: "U2", domain: "easyjet.com",           country: "UK",           fleet: "A319, A320, A321neo",     pilots: 4600, bases: "30+ across Europe",           status: "hiring", note: "✓ Verified 10 Jun 2026: recruiting Captains (4,000 hrs) and Co-Pilots (500 hrs, rated or non-rated) across UK/EU bases." },
  { name: "Wizz Air",           code: "W6", domain: "wizzair.com",           country: "Hungary",      fleet: "A320, A321neo",           pilots: 2400, bases: "35+ across Europe & ME",      status: "hiring", note: "✓ Verified 10 Jun 2026: hiring from cadet to Direct Entry Captain via single portal (Hungary/Malta AOCs). Academy courses every 3 months." },
  { name: "Vueling",            code: "VY", domain: "vueling.com",           country: "Spain",        fleet: "A320, A321 (B737 MAX from 2026)", pilots: 1400, bases: "BCN + Spanish bases",  status: "hiring", note: "✓ Verified 10 Jun 2026: FO A320 2026 intake open (Spanish EASA licence required) + CAE cadet programme. 50 B737 MAX on order." },
  { name: "Jet2",               code: "LS", domain: "jet2.com",              country: "UK",           fleet: "B737-800, A321neo",       pilots: 1600, bases: "12 UK bases",                 status: "hiring", note: "✓ Verified 10 Jun 2026: TR & non-TR Captains, TR FOs (B737/A321neo) and SFO routes open across UK bases." },
  { name: "Norwegian",          code: "DY", domain: "norwegian.com",         country: "Norway",       fleet: "B737 NG, B737 MAX",       pilots: 1000, bases: "OSL + Nordic bases",          status: "hiring", note: "✓ Verified 10 Jun 2026: 2 live FO vacancies at Gardermoen — rated B737 and experienced non-rated." },
  { name: "IndiGo",             code: "6E", domain: "goindigo.in",           country: "India",        fleet: "A320, A321, A350 (order)", pilots: 5000, bases: "DEL, BOM, BLR, HYD…",        status: "hiring", note: "✓ Verified 10 Jun 2026: rated A320 Captains & FOs + CAE cadet programme. World's largest A320-family operator, huge order book." },
  { name: "Cathay Pacific",     code: "CX", domain: "cathaypacific.com",     country: "Hong Kong",    fleet: "A321neo, A330, A350, B777, B747", pilots: 2900, bases: "Hong Kong",           status: "hiring", note: "✓ Verified 10 Jun 2026: FO Direct Entry open (1,500 hrs TT, 500 P1) plus year-round ~80-week sponsored Cadet Programme." },
  { name: "Singapore Airlines", code: "SQ", domain: "singaporeair.com",      country: "Singapore",    fleet: "A350, B787, B777, A380",  pilots: 3100, bases: "Singapore",                   status: "hiring", note: "✓ Verified 10 Jun 2026: Ab Initio Cadet Pilot programme open (Singaporeans/PRs) — fully sponsored, 7-year bond." },
  { name: "United Airlines",    code: "UA", domain: "united.com",            country: "USA",          fleet: "B737, B787, B777, A321",  pilots: 16800, bases: "DEN, ORD, IAH, EWR, SFO",    status: "hiring", note: "✓ Verified 10 Jun 2026: FO applications open — 1,500 hrs TT, unrestricted ATP. $125.52/flight hr year 1. Aviate & military pathways too." },
  { name: "Ethiopian Airlines", code: "ET", domain: "ethiopianairlines.com", country: "Ethiopia",     fleet: "B737, B767, B777, B787, A350", pilots: 1500, bases: "Addis Ababa",            status: "hiring", note: "✓ Verified 10 Jun 2026: Expat Captains on B777/A350/B767/B737 plus non-rated B737 FOs and trainee pilots. Africa's largest carrier." },
  { name: "Virgin Australia",   code: "VA", domain: "virginaustralia.com",   country: "Australia",    fleet: "B737-800, B737 MAX",      pilots: 1500, bases: "BNE, SYD, MEL, PER",          status: "hiring", note: "✓ Verified 10 Jun 2026: Direct Entry First Officers — applications actively processed. Australian ATPL/CPL + MEA IR required." },
  { name: "Air New Zealand",    code: "NZ", domain: "airnewzealand.co.nz",   country: "New Zealand",  fleet: "Q300, ATR72, A320, B787", pilots: 1100, bases: "AKL, WLG, CHC",               status: "hiring", note: "✓ Verified 10 Jun 2026: expressions of interest open for turboprop FOs (NZ/AU citizens & residents), multiple regional bases." },
  { name: "Qantas",             code: "QF", domain: "qantas.com",            country: "Australia",    fleet: "B737, A330, B787, A350",  pilots: 3200, bases: "SYD, MEL, BNE, PER",          status: "paused", note: "✓ Verified 10 Jun 2026: Jetstar applications closed. Group virtual pilot info sessions 25 Jun, 8 Jul & 2 Sep 2026 — register via careers.qantas.com." },
  { name: "Delta Air Lines",    code: "DL", domain: "delta.com",             country: "USA",          fleet: "B737, A321, B767, A350",  pilots: 17500, bases: "ATL, MSP, DTW, SLC, NYC",    status: "hiring", note: "US major — check propel pathway and delta.com/careers for current FO windows. (Not yet verified by AirCrew Jobs.)" },
  { name: "Lufthansa",          code: "LH", domain: "lufthansa.com",         country: "Germany",      fleet: "A320, A350, B747, B787",  pilots: 5400, bases: "FRA, MUC",                    status: "hiring", note: "European legacy — cadet (Lufthansa Aviation Training) and rated DE windows. (Not yet verified by AirCrew Jobs.)" },
  { name: "Turkish Airlines",   code: "TK", domain: "turkishairlines.com",   country: "Türkiye",      fleet: "B777, A330, A320, B787",  pilots: 5100, bases: "Istanbul",                    status: "paused", note: "✓ Checked 11 Jun 2026: no open cockpit postings on the careers portal right now. TK recruits in periodic waves (typically rated FOs 1,500 hrs on type, Captains 5,500 hrs, 3/1 commuting roster) — watch careers.turkishairlines.com." },
  { name: "Riyadh Air",         code: "RX", domain: "riyadhair.com",         country: "Saudi Arabia", fleet: "B787 (A321 on order)",    pilots: 400,  bases: "Riyadh",                      status: "hiring", note: "✓ Verified 11 Jun 2026: B787 DEC Captains & FOs for Saudi Arabia's new flag carrier. Apply only via official channels — fee-charging agents are scams." },
  { name: "Air Canada",         code: "AC", domain: "aircanada.com",         country: "Canada",       fleet: "B787, A220, B777, A321",  pilots: 4700, bases: "YYZ, YVR, YUL",               status: "hiring", note: "Strong hiring cycle post-CBA. (Not yet verified by AirCrew Jobs.)" },
  { name: "British Airways",    code: "BA", domain: "britishairways.com",    country: "UK",           fleet: "A320, A350, B777, B787, A380 (+E190 Cityflyer)", pilots: 4300, bases: "LHR, LGW, LCY", status: "hiring", note: "✓ Verified 11 Jun 2026: 4 live pilot postings — Military Pilot Pathway (mainline) + Cityflyer E190 DE Captains (LCY & EDI) and Aspiration to Command. No mainline civilian DEP FO posting right now; Speedbird Academy reopens 2027. Cabin crew talent pool open." },
  { name: "Aer Lingus",         code: "EI", domain: "aerlingus.com",         country: "Ireland",      fleet: "A320, A321XLR, A330",     pilots: 1100, bases: "DUB, ORK, SNN",               status: "paused", note: "✓ Checked 11 Jun 2026: Direct Entry application process is closed. EI runs periodic DEP and cadet windows — watch aerlingus.com/careers." },
  { name: "DHL Aviation",       code: "D0", domain: "dhl.com",               country: "Germany / UK", fleet: "A330, A300, B757, B777, B767", pilots: 1200, bases: "LEJ, EMA",              status: "hiring", note: "✓ Verified 12 Jun 2026: EAT Leipzig recruiting rated & non-rated A330/B757 FOs (144 OFF days/yr roster); DHL Air UK recruiting B777 pilots. Cargo — no night-stop passenger pressure, commuter-friendly." },
  { name: "SAS",                code: "SK", domain: "flysas.com",            country: "Scandinavia",  fleet: "A320neo, A330, A350",     pilots: 1500, bases: "CPH, OSL, ARN",               status: "hiring", note: "✓ Verified 12 Jun 2026: 'Experienced First Officer' posting live at Copenhagen. A350 growth (Seoul, Mumbai routes) accelerating intake; MPL cadet windows run periodically." },
  { name: "Akasa Air",          code: "QP", domain: "akasaair.com",          country: "India",        fleet: "B737 MAX (226 on order)", pilots: 900,  bases: "BOM, BLR, DEL",               status: "hiring", note: "✓ Verified 12 Jun 2026: recruiting CPL holders & B737-rated pilots; SkyCadet ab initio programme closes 24 Jun 2026. India's fastest-growing airline." },
  { name: "Gulf Air",           code: "GF", domain: "gulfair.com",           country: "Bahrain",      fleet: "B787, A320neo, A321",     pilots: 800,  bases: "Bahrain",                     status: "hiring", note: "✓ Verified 12 Jun 2026: B787 Captains advertised on the official portal. Tax-free package + housing + schooling for two children." },
  { name: "Korean Air",         code: "KE", domain: "koreanair.com",         country: "South Korea",  fleet: "B777, B787, A350, B747",  pilots: 2800, bases: "Seoul",                       status: "closed", note: "Foreign pilot recruitment currently closed." }
];

const SALARIES = [
  { airline: "Delta Air Lines",   region: "Americas",     foYear1: 112000, foYear5: 190000, captain: 380000, currency: "USD" },
  { airline: "United Airlines",   region: "Americas",     foYear1: 108000, foYear5: 185000, captain: 365000, currency: "USD" },
  { airline: "American Airlines", region: "Americas",     foYear1: 106000, foYear5: 180000, captain: 355000, currency: "USD" },
  { airline: "Emirates",          region: "Middle East",  foYear1: 110400, foYear5: 132000, captain: 196000, currency: "USD (tax-free)" },
  { airline: "Qatar Airways",     region: "Middle East",  foYear1: 98000,  foYear5: 121000, captain: 178000, currency: "USD (tax-free)" },
  { airline: "Etihad Airways",    region: "Middle East",  foYear1: 100800, foYear5: 124000, captain: 182000, currency: "USD (tax-free)" },
  { airline: "Lufthansa",         region: "Europe",       foYear1: 85000,  foYear5: 125000, captain: 255000, currency: "EUR" },
  { airline: "easyJet",           region: "Europe",       foYear1: 78000,  foYear5: 105000, captain: 175000, currency: "GBP" },
  { airline: "Ryanair",           region: "Europe",       foYear1: 72000,  foYear5: 98000,  captain: 165000, currency: "EUR" },
  { airline: "Qantas",            region: "Asia-Pacific", foYear1: 98000,  foYear5: 140000, captain: 250000, currency: "AUD" },
  { airline: "Singapore Airlines",region: "Asia-Pacific", foYear1: 86000,  foYear5: 118000, captain: 210000, currency: "SGD" },
  { airline: "Cathay Pacific",    region: "Asia-Pacific", foYear1: 74000,  foYear5: 112000, captain: 205000, currency: "USD" }
];

const GUIDES = [
  { slug: "zero-to-atpl",   icon: "🛫", title: "Zero to ATPL: The Complete Roadmap",       time: "18 min", tag: "Getting Started", blurb: "Every route to the flight deck compared — integrated, modular, university and military — with realistic costs and timelines for 2026." },
  { slug: "type-rating",    icon: "⚙️", title: "Type Ratings Explained: Pay or Be Paid?",  time: "12 min", tag: "Training",        blurb: "Self-sponsored vs bonded vs fully-funded type ratings. What a TR really costs, who pays, and how to avoid predatory schemes." },
  { slug: "interview-prep", icon: "🎯", title: "Airline Interview & Sim Assessment Prep",  time: "15 min", tag: "Interviews",      blurb: "Competency-based questions, group exercises, and the sim profiles used by major carriers — plus how assessors actually score you." },
  { slug: "hour-building",  icon: "⏱️", title: "Smart Hour Building on a Budget",          time: "10 min", tag: "Training",        blurb: "How to build quality hours that airlines respect — instructing, ferrying, survey flying — without burning cash on circuits." },
  { slug: "medical",        icon: "🩺", title: "Class 1 Medical: What to Expect",          time: "8 min",  tag: "Getting Started", blurb: "The full examination walkthrough, common deferral reasons, eyesight limits, and what to do if something gets flagged." },
  { slug: "low-hour-cv",    icon: "📄", title: "The Low-Hour Pilot CV That Gets Calls",    time: "9 min",  tag: "Interviews",      blurb: "What recruiters scan for in the first 6 seconds, the one-page format that works, and the mistakes that get CVs binned." },
  { slug: "atpl-theory",    icon: "📚", title: "Surviving ATPL Theory: 13 Exams, One Pass", time: "14 min", tag: "Training",        blurb: "Study strategies, question banks, and how to schedule your sittings so you stay sane through the toughest stretch of training." },
  { slug: "first-command",  icon: "👨‍✈️", title: "From FO to Captain: The Upgrade Path",     time: "11 min", tag: "Career",          blurb: "Command minimums by airline, what the upgrade course involves, and how to position yourself from day one in the right seat." },
  { slug: "expat-life",     icon: "🌏", title: "Flying Abroad: Expat Contracts Compared",   time: "13 min", tag: "Career",          blurb: "Middle East vs Asia vs contract flying — packages, lifestyle, tax, commuting rosters, and what nobody tells you before you sign." }
];
