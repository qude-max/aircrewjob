/* AirCrew Jobs — flight schools & Class 1 medical directory.
   Curated starter set of well-known, long-established organisations.
   Coordinates are CITY-LEVEL approximations for the map.
   Always confirm details with the organisation and your regulator
   before booking anything. */

const SCHOOLS = [
  /* ---- Europe ---- */
  { name: "L3Harris Flight Academy",        city: "Crawley (Gatwick), UK",     lat: 51.15,  lng: -0.18,   region: "Europe",       url: "https://www.l3harrisairlineacademy.com", note: "Integrated & modular ATPL, airline partnerships (incl. easyJet pathways)." },
  { name: "Skyborne Airline Academy",       city: "Gloucestershire, UK",       lat: 51.89,  lng: -2.16,   region: "Europe",       url: "https://skyborne.com",                  note: "UK + Vero Beach campuses. Integrated ATPL, airline-mentored routes." },
  { name: "Leading Edge Aviation",          city: "Oxford, UK",                lat: 51.84,  lng: -1.32,   region: "Europe",       url: "https://www.leadingedgeaviation.com",   note: "Integrated & modular at Oxford (London Oxford Airport)." },
  { name: "FTEJerez",                       city: "Jerez, Spain",              lat: 36.74,  lng: -6.06,   region: "Europe",       url: "https://www.ftejerez.com",              note: "Integrated ATPL with strong airline placement record (BA, easyJet…)." },
  { name: "FlyBy Aviation Academy",         city: "Burgos, Spain",             lat: 42.36,  lng: -3.62,   region: "Europe",       url: "https://flybyschool.com",               note: "Integrated ATPL, competitive pricing, EASA." },
  { name: "One Air Aviation",               city: "Málaga, Spain",             lat: 36.67,  lng: -4.49,   region: "Europe",       url: "https://www.oneair.es",                 note: "Integrated/modular EASA training on the Costa del Sol." },
  { name: "BAA Training",                   city: "Vilnius, Lithuania",        lat: 54.64,  lng: 25.28,   region: "Europe",       url: "https://www.baatraining.com",           note: "Ab initio + type ratings; cadet programmes with European carriers." },
  { name: "Pilot Flight Academy",           city: "Sandefjord, Norway",        lat: 59.18,  lng: 10.25,   region: "Europe",       url: "https://www.pilot.no",                  note: "Norway's largest; integrated programme, Scandinavian airline links." },
  { name: "Lufthansa Aviation Training (EFA)", city: "Bremen, Germany",        lat: 53.05,  lng: 8.79,    region: "Europe",       url: "https://www.european-flight-academy.com", note: "Lufthansa Group's academy — cadet routes into LH Group airlines." },
  { name: "AFTA — Atlantic Flight Training", city: "Cork, Ireland",            lat: 51.84,  lng: -8.49,   region: "Europe",       url: "https://www.afta.ie",                   note: "Modular & integrated, Ryanair/Aer Lingus feeder history." },
  { name: "Egnatia Aviation",               city: "Kavala, Greece",            lat: 40.91,  lng: 24.62,   region: "Europe",       url: "https://www.egnatia-aviation.aero",     note: "Integrated ATPL, 300+ flying days/year climate." },

  /* ---- Americas ---- */
  { name: "ATP Flight School (HQ)",         city: "Jacksonville, FL, USA",     lat: 30.34,  lng: -81.66,  region: "Americas",     url: "https://atpflightschool.com",           note: "USA's largest — 70+ locations, airline-direct pathways (incl. United Aviate)." },
  { name: "Embry-Riddle Aeronautical Univ.", city: "Daytona Beach, FL, USA",   lat: 29.19,  lng: -81.05,  region: "Americas",     url: "https://erau.edu",                      note: "Degree + R-ATP route (1,000-hr minimums for graduates)." },
  { name: "UND Aerospace",                  city: "Grand Forks, ND, USA",      lat: 47.94,  lng: -97.18,  region: "Americas",     url: "https://aero.und.edu",                  note: "Major university programme, R-ATP eligible." },
  { name: "Epic Flight Academy",            city: "New Smyrna Beach, FL, USA", lat: 29.05,  lng: -80.95,  region: "Americas",     url: "https://epicflightacademy.com",         note: "International students welcome; zero-to-CPL fast track." },
  { name: "AeroGuard Flight Training",      city: "Phoenix, AZ, USA",          lat: 33.69,  lng: -112.08, region: "Americas",     url: "https://www.flyaeroguard.com",          note: "Cadet pipeline with US regional partnerships." },
  { name: "Hillsboro Aero Academy",         city: "Portland, OR, USA",         lat: 45.53,  lng: -122.95, region: "Americas",     url: "https://www.flyhaa.com",                note: "Fixed-wing + helicopter, strong international cohort." },
  { name: "CAE Phoenix Aviation Academy",   city: "Phoenix-Mesa, AZ, USA",     lat: 33.31,  lng: -111.65, region: "Americas",     url: "https://www.cae.com",                   note: "CAE's US ab initio academy; global airline cadet contracts." },
  { name: "Moncton Flight College",         city: "Moncton, NB, Canada",       lat: 46.12,  lng: -64.69,  region: "Americas",     url: "https://mfc.nb.ca",                     note: "One of Canada's largest; airline cadet programmes." },

  /* ---- Middle East & Africa ---- */
  { name: "Emirates Flight Training Academy", city: "Dubai, UAE",              lat: 24.92,  lng: 55.36,   region: "Middle East",  url: "https://www.eftacademy.com",            note: "Emirates' own academy at Dubai South — cadet & international students." },
  { name: "Etihad Aviation Training",       city: "Al Ain, UAE",               lat: 24.26,  lng: 55.61,   region: "Middle East",  url: "https://www.etihadaviationtraining.com", note: "Ab initio + type rating; Etihad cadet pipeline." },
  { name: "Qatar Aeronautical Academy",     city: "Doha, Qatar",               lat: 25.26,  lng: 51.56,   region: "Middle East",  url: "https://qaa.edu.qa",                    note: "Qatar Airways-linked MPL/cadet training." },
  { name: "43 Air School",                  city: "Port Alfred, South Africa", lat: -33.59, lng: 26.89,   region: "Africa",       url: "https://www.43airschool.com",           note: "Africa's best-known ATO; SACAA + EASA-aligned programmes." },
  { name: "Ethiopian Aviation Academy",     city: "Addis Ababa, Ethiopia",     lat: 8.98,   lng: 38.80,   region: "Africa",       url: "https://corporate.ethiopianairlines.com/eaa", note: "Ethiopian Airlines' academy — trainee pilot intakes for ET and other African carriers." },

  /* ---- Asia-Pacific ---- */
  { name: "Singapore Flying College",       city: "Singapore (Seletar)",       lat: 1.42,   lng: 103.87,  region: "Asia-Pacific", url: "https://www.singaporeflyingcollege.com", note: "Singapore Airlines' cadet college (with overseas flying campuses)." },
  { name: "Flight Training Adelaide",       city: "Adelaide, Australia",       lat: -34.80, lng: 138.52,  region: "Asia-Pacific", url: "https://fta.edu.au",                    note: "Cadet contracts with major Asian & Australian carriers." },
  { name: "CAE Melbourne",                  city: "Melbourne, Australia",      lat: -37.97, lng: 145.10,  region: "Asia-Pacific", url: "https://www.cae.com",                   note: "Ab initio academy, Asia-Pacific cadet contracts." },
  { name: "IGRUA",                          city: "Amethi, India",             lat: 26.15,  lng: 81.81,   region: "Asia-Pacific", url: "https://igrua.gov.in",                  note: "India's national flying academy; airline tie-ups incl. IndiGo cadet route." },
  { name: "BAA Training Vietnam",           city: "Ho Chi Minh City, Vietnam", lat: 10.82,  lng: 106.63,  region: "Asia-Pacific", url: "https://www.baatraining.com",           note: "Growing SE-Asia campus serving Vietnamese carriers." }
];

const MEDICAL = [
  { name: "Heathrow Medical Services (AeMC)",      city: "London Heathrow, UK",  lat: 51.47, lng: -0.45,  region: "Europe",       url: "https://www.heathrowmedical.com",      note: "UK CAA initial Class 1 examinations." },
  { name: "Centreline AeMC",                        city: "Bristol, UK",          lat: 51.38, lng: -2.72,  region: "Europe",       url: "https://www.centrelineaviationmedicine.co.uk", note: "UK CAA initial Class 1." },
  { name: "Mater Private AeMC",                     city: "Dublin, Ireland",      lat: 53.36, lng: -6.25,  region: "Europe",       url: "https://www.materprivate.ie",          note: "IAA initial Class 1 examinations." },
  { name: "DLR Aeromedical Center",                 city: "Hamburg, Germany",     lat: 53.50, lng: 10.10,  region: "Europe",       url: "https://www.dlr.de",                   note: "Initial Class 1 + DLR airline selection testing under one roof." },
  { name: "Lufthansa Aeromedical Center",           city: "Frankfurt, Germany",   lat: 50.05, lng: 8.57,   region: "Europe",       url: "https://www.lufthansa-aeromedical-center.de", note: "EASA initial Class 1." },
  { name: "CEMPN — Percy",                          city: "Paris (Clamart), France", lat: 48.79, lng: 2.25, region: "Europe",      url: "https://www.ecologie.gouv.fr",         note: "French initial Class 1 centre (also Toulouse)." },
  { name: "KLM Health Services",                    city: "Amsterdam Schiphol, NL", lat: 52.31, lng: 4.76, region: "Europe",       url: "https://klmhealthservices.com",        note: "EASA initial Class 1 at Schiphol." },
  { name: "AMC Swiss (Dübendorf)",                  city: "Zurich, Switzerland",  lat: 47.39, lng: 8.64,   region: "Europe",       url: "https://www.aeromedicalcenter.ch",     note: "Swiss initial Class 1." },
  { name: "CIMA",                                   city: "Madrid, Spain",        lat: 40.49, lng: -3.57,  region: "Europe",       url: "https://www.defensa.gob.es",           note: "Spanish initial Class 1 (Centro de Instrucción de Medicina Aeroespacial)." },
  { name: "Austro Control AeMC",                    city: "Vienna, Austria",      lat: 48.12, lng: 16.56,  region: "Europe",       url: "https://www.austrocontrol.at",         note: "Austrian initial Class 1." },
  { name: "GCAA / airline aeromedical centres",     city: "Dubai & Abu Dhabi, UAE", lat: 25.10, lng: 55.17, region: "Middle East", url: "https://www.gcaa.gov.ae",              note: "UAE GCAA Class 1 via approved AeMCs in Dubai & Abu Dhabi." },
  { name: "Institute of Aerospace Medicine (IAM)",  city: "Bengaluru, India",     lat: 12.95, lng: 77.66,  region: "Asia-Pacific", url: "https://www.dgca.gov.in",              note: "DGCA initial Class 1 (also AFCME New Delhi)." },
  { name: "Singapore Aeromedical Centre",           city: "Singapore",            lat: 1.34,  lng: 103.84, region: "Asia-Pacific", url: "https://www.caas.gov.sg",              note: "CAAS Class 1 examinations." },
  { name: "Institute for Aviation Medicine",        city: "Pretoria, South Africa", lat: -25.80, lng: 28.20, region: "Africa",     url: "https://www.caa.co.za",                note: "SACAA initial Class 1." }
];

/* Regulators using a distributed examiner network — no single centre to pin */
const REGULATOR_LOCATORS = [
  { name: "USA — FAA",            url: "https://designee.faa.gov/designeeLocator", note: "Find an Aviation Medical Examiner (AME) near you — first-class medicals are done by local AMEs, not a central AeMC." },
  { name: "Canada — Transport Canada", url: "https://tc.canada.ca/en/aviation/medical-fitness-aviation/find-civil-aviation-medical-examiner", note: "CAME locator for Category 1 medicals." },
  { name: "Australia — CASA",     url: "https://www.casa.gov.au/licences-and-certificates/medical-professionals/find-dame", note: "DAME locator for Class 1 medicals." },
  { name: "New Zealand — CAA NZ", url: "https://www.aviation.govt.nz/licensing-and-certification/medical-certification/", note: "Medical examiner directory for Class 1." },
  { name: "EASA states",          url: "https://www.easa.europa.eu/en/domains/aircrew-and-medical/aeromedical-centres", note: "Each EASA member state publishes its approved AeMC list — check your national authority." }
];
