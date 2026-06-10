/* AirCrew Jobs — flight schools & Class 1 medical directory.
   Curated set of well-known, long-established organisations.
   `auth` = licensing authority/system the organisation works under
   (for schools: the licence you train towards; for medical centres:
   whose Class 1 they issue/revalidate).
   Coordinates are CITY-LEVEL approximations for the map.
   Always confirm details with the organisation and your regulator. */

const SCHOOLS = [
  /* ---- Europe ---- */
  { name: "L3Harris Flight Academy",        city: "Crawley (Gatwick), UK",     lat: 51.15,  lng: -0.18,   region: "Europe",       auth: "UK CAA + EASA", url: "https://www.l3harrisairlineacademy.com", note: "Integrated & modular ATPL, airline partnerships (incl. easyJet pathways)." },
  { name: "Skyborne Airline Academy",       city: "Gloucestershire, UK",       lat: 51.89,  lng: -2.16,   region: "Europe",       auth: "UK CAA + EASA", url: "https://skyborne.com",                  note: "UK + Vero Beach campuses. Integrated ATPL, airline-mentored routes." },
  { name: "Leading Edge Aviation",          city: "Oxford, UK",                lat: 51.84,  lng: -1.32,   region: "Europe",       auth: "UK CAA + EASA", url: "https://www.leadingedgeaviation.com",   note: "Integrated & modular at London Oxford Airport." },
  { name: "FTEJerez",                       city: "Jerez, Spain",              lat: 36.74,  lng: -6.06,   region: "Europe",       auth: "EASA + UK CAA", url: "https://www.ftejerez.com",              note: "Integrated ATPL with strong airline placement record (BA, easyJet…)." },
  { name: "FlyBy Aviation Academy",         city: "Burgos, Spain",             lat: 42.36,  lng: -3.62,   region: "Europe",       auth: "EASA",          url: "https://flybyschool.com",               note: "Integrated ATPL, competitive pricing." },
  { name: "One Air Aviation",               city: "Málaga, Spain",             lat: 36.67,  lng: -4.49,   region: "Europe",       auth: "EASA",          url: "https://www.oneair.es",                 note: "Integrated/modular training on the Costa del Sol." },
  { name: "BAA Training",                   city: "Vilnius, Lithuania",        lat: 54.64,  lng: 25.28,   region: "Europe",       auth: "EASA",          url: "https://www.baatraining.com",           note: "Ab initio + type ratings; cadet programmes with European carriers." },
  { name: "Bartolini Air",                  city: "Łódź, Poland",              lat: 51.72,  lng: 19.40,   region: "Europe",       auth: "EASA",          url: "https://www.bartoliniair.com",          note: "Popular modular route — PPL to fATPL at Central-European prices." },
  { name: "Pilot Flight Academy",           city: "Sandefjord, Norway",        lat: 59.18,  lng: 10.25,   region: "Europe",       auth: "EASA",          url: "https://www.pilot.no",                  note: "Norway's largest; integrated programme, Scandinavian airline links." },
  { name: "Lufthansa Aviation Training (EFA)", city: "Bremen, Germany",        lat: 53.05,  lng: 8.79,    region: "Europe",       auth: "EASA",          url: "https://www.european-flight-academy.com", note: "Lufthansa Group's academy — cadet routes into LH Group airlines." },
  { name: "AFTA — Atlantic Flight Training", city: "Cork, Ireland",            lat: 51.84,  lng: -8.49,   region: "Europe",       auth: "EASA (IAA)",    url: "https://www.afta.ie",                   note: "Modular & integrated, Ryanair/Aer Lingus feeder history." },
  { name: "Egnatia Aviation",               city: "Kavala, Greece",            lat: 40.91,  lng: 24.62,   region: "Europe",       auth: "EASA",          url: "https://www.egnatia-aviation.aero",     note: "Integrated ATPL, 300+ flying days/year climate." },

  /* ---- Americas ---- */
  { name: "ATP Flight School (HQ)",         city: "Jacksonville, FL, USA",     lat: 30.34,  lng: -81.66,  region: "Americas",     auth: "FAA",           url: "https://atpflightschool.com",           note: "USA's largest — 70+ locations, airline-direct pathways (incl. United Aviate)." },
  { name: "Embry-Riddle Aeronautical Univ.", city: "Daytona Beach, FL, USA",   lat: 29.19,  lng: -81.05,  region: "Americas",     auth: "FAA (R-ATP)",   url: "https://erau.edu",                      note: "Degree + R-ATP route (1,000-hr minimums for graduates)." },
  { name: "UND Aerospace",                  city: "Grand Forks, ND, USA",      lat: 47.94,  lng: -97.18,  region: "Americas",     auth: "FAA (R-ATP)",   url: "https://aero.und.edu",                  note: "Major university programme, R-ATP eligible." },
  { name: "FlightSafety Academy",           city: "Vero Beach, FL, USA",       lat: 27.65,  lng: -80.42,  region: "Americas",     auth: "FAA + EASA partners", url: "https://www.flightsafetyacademy.com", note: "Long-running professional academy with international airline cadets." },
  { name: "Epic Flight Academy",            city: "New Smyrna Beach, FL, USA", lat: 29.05,  lng: -80.95,  region: "Americas",     auth: "FAA",           url: "https://epicflightacademy.com",         note: "International students welcome; zero-to-CPL fast track." },
  { name: "AeroGuard Flight Training",      city: "Phoenix, AZ, USA",          lat: 33.69,  lng: -112.08, region: "Americas",     auth: "FAA",           url: "https://www.flyaeroguard.com",          note: "Cadet pipeline with US regional partnerships." },
  { name: "Hillsboro Aero Academy",         city: "Portland, OR, USA",         lat: 45.53,  lng: -122.95, region: "Americas",     auth: "FAA",           url: "https://www.flyhaa.com",                note: "Fixed-wing + helicopter, strong international cohort." },
  { name: "CAE Phoenix Aviation Academy",   city: "Phoenix-Mesa, AZ, USA",     lat: 33.31,  lng: -111.65, region: "Americas",     auth: "FAA + airline programmes", url: "https://www.cae.com",            note: "CAE's US ab initio academy; global airline cadet contracts." },
  { name: "Moncton Flight College",         city: "Moncton, NB, Canada",       lat: 46.12,  lng: -64.69,  region: "Americas",     auth: "Transport Canada", url: "https://mfc.nb.ca",                  note: "One of Canada's largest; airline cadet programmes." },

  /* ---- Middle East & Africa ---- */
  { name: "Emirates Flight Training Academy", city: "Dubai, UAE",              lat: 24.92,  lng: 55.36,   region: "Middle East",  auth: "UAE GCAA",      url: "https://www.eftacademy.com",            note: "Emirates' own academy at Dubai South — cadet & international students." },
  { name: "Etihad Aviation Training",       city: "Al Ain, UAE",               lat: 24.26,  lng: 55.61,   region: "Middle East",  auth: "UAE GCAA + EASA", url: "https://www.etihadaviationtraining.com", note: "Ab initio + type rating; Etihad cadet pipeline." },
  { name: "Fujairah Aviation Academy",      city: "Fujairah, UAE",             lat: 25.11,  lng: 56.32,   region: "Middle East",  auth: "UAE GCAA",      url: "https://www.fujaa.ae",                  note: "Established Gulf academy — fixed wing & helicopter." },
  { name: "Qatar Aeronautical Academy",     city: "Doha, Qatar",               lat: 25.26,  lng: 51.56,   region: "Middle East",  auth: "Qatar QCAA",    url: "https://qaa.edu.qa",                    note: "Qatar Airways-linked MPL/cadet training." },
  { name: "43 Air School",                  city: "Port Alfred, South Africa", lat: -33.59, lng: 26.89,   region: "Africa",       auth: "SACAA (EASA-aligned)", url: "https://www.43airschool.com",      note: "Africa's best-known ATO." },
  { name: "Ethiopian Aviation Academy",     city: "Addis Ababa, Ethiopia",     lat: 8.98,   lng: 38.80,   region: "Africa",       auth: "ECAA (ICAO)",   url: "https://corporate.ethiopianairlines.com/eaa", note: "Ethiopian Airlines' academy — trainee pilot intakes for ET and other African carriers." },

  /* ---- Asia-Pacific ---- */
  { name: "Singapore Flying College",       city: "Singapore (Seletar)",       lat: 1.42,   lng: 103.87,  region: "Asia-Pacific", auth: "CAAS",          url: "https://www.singaporeflyingcollege.com", note: "Singapore Airlines' cadet college (with overseas flying campuses)." },
  { name: "Flight Training Adelaide",       city: "Adelaide, Australia",       lat: -34.80, lng: 138.52,  region: "Asia-Pacific", auth: "CASA",          url: "https://fta.edu.au",                    note: "Cadet contracts with major Asian & Australian carriers." },
  { name: "Basair Aviation College",        city: "Sydney, Australia",         lat: -33.93, lng: 150.99,  region: "Asia-Pacific", auth: "CASA",          url: "https://www.basair.com.au",             note: "Large Australian CPL/IR provider, airline diploma pathways." },
  { name: "CAE Melbourne",                  city: "Melbourne, Australia",      lat: -37.97, lng: 145.10,  region: "Asia-Pacific", auth: "CASA + airline programmes", url: "https://www.cae.com",          note: "Ab initio academy, Asia-Pacific cadet contracts." },
  { name: "Int'l Aviation Academy of NZ",   city: "Christchurch, NZ",          lat: -43.49, lng: 172.53,  region: "Asia-Pacific", auth: "NZ CAA",        url: "https://www.iaanz.co.nz",               note: "Established NZ academy; domestic + international cadets." },
  { name: "IGRUA",                          city: "Amethi, India",             lat: 26.15,  lng: 81.81,   region: "Asia-Pacific", auth: "DGCA (India)",  url: "https://igrua.gov.in",                  note: "India's national flying academy; airline tie-ups incl. IndiGo cadet route." },
  { name: "NFTI (CAE Gondia)",              city: "Gondia, India",             lat: 21.46,  lng: 80.22,   region: "Asia-Pacific", auth: "DGCA (India)",  url: "https://www.nfti.co.in",                note: "CAE joint-venture academy feeding Indian carriers." },
  { name: "BAA Training Vietnam",           city: "Ho Chi Minh City, Vietnam", lat: 10.82,  lng: 106.63,  region: "Asia-Pacific", auth: "CAAV + EASA pathway", url: "https://www.baatraining.com",     note: "Growing SE-Asia campus serving Vietnamese carriers." }
];

const MEDICAL = [
  /* ---- Europe ---- */
  { name: "Heathrow Medical Services (AeMC)",      city: "London Heathrow, UK",  lat: 51.47, lng: -0.45,  region: "Europe",       auth: "UK CAA — initial & revalidation", url: "https://www.heathrowmedical.com",      note: "One of the UK's main initial Class 1 centres." },
  { name: "Centreline AeMC",                        city: "Bristol, UK",          lat: 51.38, lng: -2.72,  region: "Europe",       auth: "UK CAA — initial & revalidation", url: "https://www.centrelineaviationmedicine.co.uk", note: "UK CAA initial Class 1." },
  { name: "Mater Private AeMC",                     city: "Dublin, Ireland",      lat: 53.36, lng: -6.25,  region: "Europe",       auth: "EASA (IAA) — initial & revalidation", url: "https://www.materprivate.ie",      note: "Ireland's initial Class 1 centre." },
  { name: "DLR Aeromedical Center",                 city: "Hamburg, Germany",     lat: 53.50, lng: 10.10,  region: "Europe",       auth: "EASA (LBA) — initial & revalidation", url: "https://www.dlr.de",               note: "Initial Class 1 + DLR airline selection testing under one roof." },
  { name: "Lufthansa Aeromedical Center",           city: "Frankfurt, Germany",   lat: 50.05, lng: 8.57,   region: "Europe",       auth: "EASA (LBA) — initial & revalidation", url: "https://www.lufthansa-aeromedical-center.de", note: "EASA initial Class 1." },
  { name: "CEMPN — Percy",                          city: "Paris (Clamart), France", lat: 48.79, lng: 2.25, region: "Europe",      auth: "EASA (DGAC) — initial & revalidation", url: "https://www.ecologie.gouv.fr",    note: "French initial Class 1 centre (also Toulouse)." },
  { name: "KLM Health Services",                    city: "Amsterdam Schiphol, NL", lat: 52.31, lng: 4.76, region: "Europe",       auth: "EASA (ILT) — initial & revalidation", url: "https://klmhealthservices.com",    note: "EASA initial Class 1 at Schiphol." },
  { name: "AMC Swiss (Dübendorf)",                  city: "Zurich, Switzerland",  lat: 47.39, lng: 8.64,   region: "Europe",       auth: "EASA (FOCA) — initial & revalidation", url: "https://www.aeromedicalcenter.ch", note: "Swiss initial Class 1." },
  { name: "CIMA",                                   city: "Madrid, Spain",        lat: 40.49, lng: -3.57,  region: "Europe",       auth: "EASA (AESA) — initial & revalidation", url: "https://www.defensa.gob.es",      note: "Spanish initial Class 1 (Centro de Instrucción de Medicina Aeroespacial)." },
  { name: "Austro Control AeMC",                    city: "Vienna, Austria",      lat: 48.12, lng: 16.56,  region: "Europe",       auth: "EASA (Austro Control) — initial & revalidation", url: "https://www.austrocontrol.at", note: "Austrian initial Class 1." },
  { name: "WIML — Military Inst. of Aviation Medicine", city: "Warsaw, Poland",   lat: 52.20, lng: 20.96,  region: "Europe",       auth: "EASA (ULC) — initial & revalidation", url: "https://wiml.waw.pl",              note: "Poland's main aeromedical institute." },
  { name: "ÚLZ — Institute of Aviation Medicine",   city: "Prague, Czechia",      lat: 50.08, lng: 14.39,  region: "Europe",       auth: "EASA (CAA CZ) — initial & revalidation", url: "https://www.ulz.cz",            note: "Czech initial Class 1." },
  { name: "Istituto di Medicina Aerospaziale",      city: "Rome, Italy",          lat: 41.86, lng: 12.46,  region: "Europe",       auth: "EASA (ENAC) — initial & revalidation", url: "https://www.aeronautica.difesa.it", note: "Italian initial Class 1 (also Milan)." },
  { name: "Flymedisinsk Institutt",                 city: "Oslo, Norway",         lat: 59.94, lng: 10.72,  region: "Europe",       auth: "EASA (CAA Norway) — initial & revalidation", url: "https://flymed.no",         note: "Norway's aeromedical institute." },

  /* ---- Middle East / Asia-Pacific / Africa ---- */
  { name: "GCAA / airline aeromedical centres",     city: "Dubai & Abu Dhabi, UAE", lat: 25.10, lng: 55.17, region: "Middle East", auth: "UAE GCAA — initial & renewal", url: "https://www.gcaa.gov.ae",              note: "UAE Class 1 via GCAA-approved AeMCs in Dubai & Abu Dhabi." },
  { name: "Institute of Aerospace Medicine (IAM)",  city: "Bengaluru, India",     lat: 12.95, lng: 77.66,  region: "Asia-Pacific", auth: "DGCA — initial Class 1",       url: "https://www.dgca.gov.in",              note: "Indian initial Class 1 (also AFCME New Delhi); renewals via DGCA-empanelled examiners." },
  { name: "Singapore Aeromedical Centre",           city: "Singapore",            lat: 1.34,  lng: 103.84, region: "Asia-Pacific", auth: "CAAS — initial & renewal",     url: "https://www.caas.gov.sg",              note: "CAAS Class 1 examinations." },
  { name: "Institute for Aviation Medicine",        city: "Pretoria, South Africa", lat: -25.80, lng: 28.20, region: "Africa",     auth: "SACAA — initial & renewal",    url: "https://www.caa.co.za",                note: "South African initial Class 1." }
];

/* Regulators using a distributed examiner network — no single centre to pin */
const REGULATOR_LOCATORS = [
  { name: "USA — FAA",            url: "https://designee.faa.gov/designeeLocator", note: "Find an Aviation Medical Examiner (AME) near you — first-class medicals (initial AND renewal) are done by local AMEs, not a central AeMC." },
  { name: "Canada — Transport Canada", url: "https://tc.canada.ca/en/aviation/medical-fitness-aviation/find-civil-aviation-medical-examiner", note: "CAME locator for Category 1 medicals, initial and renewal." },
  { name: "Australia — CASA",     url: "https://www.casa.gov.au/licences-and-certificates/medical-professionals/find-dame", note: "DAME locator for Class 1 medicals, initial and renewal." },
  { name: "New Zealand — CAA NZ", url: "https://www.aviation.govt.nz/licensing-and-certification/medical-certification/", note: "Medical examiner directory for Class 1." },
  { name: "EASA states",          url: "https://www.easa.europa.eu/en/domains/aircrew-and-medical/aeromedical-centres", note: "Initial Class 1 must be at an AeMC (pins on the map); REVALIDATIONS can be done by any authorised AME in your state — see your authority's list." }
];
