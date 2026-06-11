/* AirCrew Jobs — Training Centre content.
   All questions written originally by AirCrew Jobs. Aircraft-system facts are
   public technical knowledge; wording, structure and explanations are ours.
   Always cross-check systems answers against your current FCOM — variants differ. */

/* ============ HR / COMPETENCY INTERVIEW QUESTIONS ============ */
const HR_QUESTIONS = [
  { cat: "Motivation", q: "Why do you want to fly for this airline specifically — and not one of our competitors?",
    hints: ["They're testing research depth: fleet, bases, network, culture — name specifics", "Connect THEIR facts to YOUR situation (base near family, fleet you're rated on, growth = command timeline)", "Avoid generic answers that fit any airline — that's the instant fail"] },
  { cat: "Motivation", q: "Where do you see your career in ten years?",
    hints: ["Show ambition aligned with their pipeline: command, then training or management roles", "Mention realistic timelines — assessors know their own upgrade times", "Loyalty signal: the ten years should plausibly be with them"] },
  { cat: "Motivation", q: "You've invested heavily in training. What would you do if you fail this assessment?",
    hints: ["Resilience question — show you'd seek feedback, train the weakness, reapply", "No catastrophising, no arrogance ('I won't fail')", "A real example of bouncing back from a past setback lands well"] },
  { cat: "Teamwork", q: "Tell me about a time you had a conflict with a colleague. How did you resolve it?",
    hints: ["STAR — and the Action must be YOURS ('I', not 'we')", "Show early, private, face-to-face resolution — not escalation or avoidance", "End with the relationship repaired and what you learned"] },
  { cat: "Teamwork", q: "Describe a situation where you had to work with someone whose working style was very different from yours.",
    hints: ["Adaptation, not judgement — show you flexed your style first", "Name the concrete adjustments you made", "Tie it to multi-crew flying: every sector is a new pairing"] },
  { cat: "Teamwork", q: "Give an example of when you supported a team member who was struggling.",
    hints: ["Empathy + workload sharing without taking over", "Discretion: did you protect their dignity?", "Outcome: the task AND the person both recovered"] },
  { cat: "Leadership", q: "Tell me about a time you had to take charge in a difficult situation.",
    hints: ["Calm authority, clear task allocation, communication loop", "Show you invited input before deciding (authority gradient awareness)", "If you're low-hours, a non-flying example with real stakes works fine"] },
  { cat: "Leadership", q: "Describe a time you disagreed with a decision made by someone senior to you.",
    hints: ["This is the speak-up / first-officer assertiveness test", "Show respectful, specific, persistent challenge — PACE-style escalation", "Critical: what happened next, and would you do it again? (Yes.)"] },
  { cat: "Leadership", q: "Have you ever had to deliver bad news or unpopular instructions to a group?",
    hints: ["Directness with empathy — no sugar-coating, no brutality", "Show you explained the WHY", "Demonstrate you absorbed the pushback without becoming defensive"] },
  { cat: "Error management", q: "Tell me about a mistake you made that had real consequences. What did you do?",
    hints: ["Pick a REAL mistake — assessors smell fake humility ('I work too hard')", "Immediate honesty: who did you tell, how fast?", "The learning must be specific and verifiable in your later behaviour"] },
  { cat: "Error management", q: "Describe a time you caught someone else's error. How did you handle it?",
    hints: ["Tact + directness: fix the error, not the blame", "Reference monitoring duties if it was a flying context", "Show the other person stayed an ally afterwards"] },
  { cat: "Error management", q: "What would you do if you saw your captain do something unsafe?",
    hints: ["Graduated assertiveness: hint → concern → challenge → emergency action", "Quote a framework naturally (PACE: Probe, Alert, Challenge, Emergency)", "Make clear safety outranks hierarchy — but professionally, not heroically"] },
  { cat: "Stress & workload", q: "Describe the most stressful situation you've experienced and how you managed it.",
    hints: ["Show your actual mechanism: prioritisation, breathing, verbalising, asking for help", "Aviate-Navigate-Communicate transfers to any story", "End state matters: you stayed functional and the task got done"] },
  { cat: "Stress & workload", q: "How do you manage fatigue, and what would you do if you felt unfit to fly?",
    hints: ["They want to hear you WOULD call unfit — say it explicitly", "Personal routines: sleep discipline, commuting buffer, nutrition", "Know the concept of fatigue reporting systems / just culture"] },
  { cat: "Stress & workload", q: "Tell me about a time you had to perform several important tasks at once under time pressure.",
    hints: ["Prioritisation logic out loud: what did you drop, and why was that safe?", "Delegation counts as a skill, not a weakness", "Link to the multitasking they'll test in the sim"] },
  { cat: "Customer & professionalism", q: "A passenger is filming you during boarding and being verbally abusive. What do you do?",
    hints: ["Stay calm, don't engage the camera, involve cabin crew / ground staff per procedure", "Safety of flight first: is this person fit to travel?", "Company reputation awareness without playing enforcer"] },
  { cat: "Customer & professionalism", q: "Your flight is delayed three hours and you're walking through the terminal in uniform. A passenger confronts you angrily.",
    hints: ["Empathy first, information second, never speculate or blame the company", "You ARE the airline while in uniform — they're testing that awareness", "De-escalate, redirect to people who can actually help"] },
  { cat: "Customer & professionalism", q: "What does professionalism mean to you as a pilot, outside the flight deck?",
    hints: ["Standards when nobody's watching: social media, layover conduct, uniform", "Reliability: being where you should be, prepared, on time", "Representing colleagues, not just yourself"] },
  { cat: "Decision making", q: "Tell me about a difficult decision you made with incomplete information.",
    hints: ["Show your model: gather what's available, set a decision deadline, choose the reversible option", "Acknowledge the discomfort — confidence without arrogance", "Review afterwards: was it right, and what did you learn?"] },
  { cat: "Decision making", q: "Describe a time you changed your mind after receiving new information.",
    hints: ["Flexibility is the competency — clinging to plan A kills people in aviation", "Show the trigger: what NEW information crossed your threshold?", "No ego: changing your mind was the strong move, frame it that way"] },
  { cat: "Decision making", q: "You're number one for departure, on-time performance is under pressure, and a cabin crew member reports a passenger 'acting strangely'. What do you do?",
    hints: ["Safety vs commercial pressure — safety wins, but show you UNDERSTAND the commercial cost", "Gather specifics fast: what exactly is 'strange'? Who can assess?", "Show a decision, not endless information-gathering — and own it"] },
  { cat: "Decision making", q: "How would you handle a situation where you and your captain disagree on a fuel decision before departure?",
    hints: ["Data first: weather, alternates, MELs, delays — make the case with numbers", "Captain has final authority; you have the duty to advocate clearly", "If still uncomfortable: know the escalation path (dispatch, fleet office) — but proportionate"] },
  { cat: "Teamwork", q: "What kind of crew member are you on a bad day?",
    hints: ["Honest self-awareness beats perfection — name your real failure mode", "Then show the mitigation: how do you catch yourself, what do you tell the other pilot?", "Bonus: invite monitoring — 'I brief my colleague to call it out'"] },
  { cat: "Motivation", q: "Why should we choose you over the hundreds of other applicants with similar hours?",
    hints: ["Not a hardware question — they have your logbook. It's a self-awareness question", "One or two SPECIFIC differentiators with evidence, not a list of adjectives", "Land it with fit: why you + this airline specifically works"] }
];

/* ============ GROUP / DECISION SCENARIOS ============ */
const SCENARIOS = [
  {
    id: "diversion",
    title: "Medical event over the mountains",
    intro: "You're the crew of a narrow-body at FL360, 40 minutes from destination, crossing a mountainous region at night. The purser reports a 60-year-old passenger with chest pain, pale and sweating. Weather at destination is good; the two nearest airports have marginal weather and short runways. Work the problem.",
    steps: [
      { text: "First priority?",
        opts: [
          { t: "Start an immediate descent towards the nearest airport", s: 0, fb: "Premature. You've made a decision before gathering any information — classic plan-rush. There may be a doctor aboard; 'nearest' may be unusable." },
          { t: "Gather information: medical assessment on board, ask ops/medlink, check airport options", s: 10, fb: "Correct. Decisions need inputs: severity (doctor aboard? medlink advice?), and real diversion options vs continuing." },
          { t: "Continue to destination — it's only 40 minutes and weather is good", s: 3, fb: "Possibly the right OUTCOME, but as a first action it's a conclusion without evidence. Assess first; 40 minutes can be fatal in cardiac events." }
        ]},
      { text: "A doctor on board says: suspected heart attack, condition unstable, land as soon as possible. Mountain Airport A is 15 min away — 2,200 m runway, scattered cloud, no medical jets based there. City Airport B is 25 min — full ILS, long runway, major hospital. Destination is 38 min.",
        opts: [
          { t: "Airport A — fastest to the ground", s: 3, fb: "10 extra minutes airborne may cost less than a short, marginal-weather mountain approach at night plus slow ground medical response. 'Fastest to land' isn't 'fastest to a cardiologist'." },
          { t: "Airport B — minutes matter, but so does what's waiting on the ground", s: 10, fb: "Strong reasoning. ASAP means soonest EFFECTIVE care: ILS, long runway, ambulance and cath-lab proximity. The doctor said 'as soon as possible', not 'anywhere'." },
          { t: "Destination — best company support and engineering", s: 0, fb: "Company convenience entered a medical-urgency decision. 13 extra minutes vs B with an unstable cardiac patient is hard to defend." }
        ]},
      { text: "You've chosen B. The first officer is flying. What's your task split for the next 10 minutes?",
        opts: [
          { t: "Take control yourself — it's an emergency, the captain should fly", s: 3, fb: "Taking controls mid-emergency adds a transfer risk and buries the captain in stick-and-rudder work. Often better: FO keeps flying, captain manages the problem." },
          { t: "FO continues flying; you handle declaration, cabin coordination, briefing and approach setup", s: 10, fb: "Textbook workload management: pilot flying flies, pilot monitoring manages. Declare (PAN/MAYDAY), brief, prepare." },
          { t: "Both pilots split the radio and flying duties flexibly as things come up", s: 0, fb: "'Flexible' task-sharing without explicit allocation is how things get dropped. Explicit roles, stated out loud." }
        ]},
      { text: "Approach is set up. The purser asks what to tell passengers; ops asks for your fuel state and intentions; ATC offers a shortcut that saves 3 minutes but means a rushed descent.",
        opts: [
          { t: "Accept the shortcut — 3 minutes matter for the patient", s: 3, fb: "Tempting, but a rushed, unstable approach at night risks a go-around that costs 10+ minutes — or worse. Stable beats short." },
          { t: "Decline the shortcut, give ops a brief data burst, delegate the passenger announcement to the purser", s: 10, fb: "Disciplined: protect the approach, communicate in priority order, delegate what others can do." },
          { t: "Ask ATC to stand by while you discuss the options as a crew", s: 0, fb: "Some decisions need crew discussion; an offered shortcut on final isn't one. Decision paralysis under time pressure reads badly." }
        ]},
      { text: "Debrief: the assessors ask what you'd review after this flight.",
        opts: [
          { t: "Nothing major — the outcome was good, the patient survived", s: 0, fb: "Outcome bias. Good outcomes can hide bad processes; assessors want to see review habits regardless of outcome." },
          { t: "Crew debrief: what info we missed, timing of decisions, what we'd do differently — and file the reports", s: 10, fb: "Just-culture behaviour: review process not outcome, capture lessons, complete the paperwork that makes the system safer." },
          { t: "Review only the FO's flying since they were pilot flying", s: 0, fb: "Singling out one crew member misses the point — and signals a blame-culture instinct. The crew performs as a system." }
        ]}
    ]
  },
  {
    id: "pressure",
    title: "Commercial pressure at the gate",
    intro: "Last rotation of the day. Boarding complete, slot in 20 minutes — miss it and the crew goes out of hours, cancelling the flight and stranding 180 passengers. The ground engineer shows you a small hydraulic stain under the right main gear: 'Probably historic. I can sign it off, or we open it up — that's 45 minutes minimum.'",
    steps: [
      { text: "Your first response to the engineer?",
        opts: [
          { t: "Ask precise questions: fluid type, fresh or dried, quantity, which system, MEL relief available?", s: 10, fb: "Information before decision. 'Probably historic' is an opinion — you need observables and what the book allows." },
          { t: "Accept the sign-off — engineers know their job and the slot is critical", s: 0, fb: "Delegating an airworthiness decision to time pressure. The engineer offered both options because they're genuinely unsure — that's a flag, not a clearance." },
          { t: "Order the panel opened immediately — safety first, always", s: 3, fb: "Safe but unexamined. If two questions could establish it's dried historic staining within limits, you cancelled 180 journeys for nothing. Rigor first, then the call." }
        ]},
      { text: "Engineer: fluid is fresh, quantity reservoir shows a small drop since yesterday's check but within limits, no MEL item applies to an unidentified leak. Slot in 14 minutes.",
        opts: [
          { t: "Fresh fluid + reservoir drop = open it up. Inform ops the slot is likely lost", s: 10, fb: "Correct. An active leak of unknown origin isn't dispatchable by any book. The slot was lost the moment the evidence said 'fresh' — accepting that fast is the skill." },
          { t: "Depart, monitor the hydraulic quantity in flight, divert if it drops", s: 0, fb: "Using flight as a troubleshooting environment with 180 passengers. Hydraulic failures cascade; 'monitor and see' is how incident reports start." },
          { t: "Call dispatch and ask them to make the call with maintenance control", s: 3, fb: "Consultation is good practice, but framing it as 'asking them to decide' offloads YOUR authority. Consult, recommend, decide." }
        ]},
      { text: "Ops calls: 'Are you SURE? The duty manager is asking why the engineer's sign-off isn't enough.'",
        opts: [
          { t: "Restate the facts calmly, your decision, and offer to put it in writing", s: 10, fb: "Professional spine: no anger, no wavering. Facts → decision → accountability in writing. Pressure-resistant and audit-proof." },
          { t: "Get angry — this is exactly the commercial interference the industry warns about", s: 0, fb: "Righteous but unprofessional. The duty manager is doing their job; yours is to hold the line without burning relationships." },
          { t: "Offer a compromise: depart now but file a report about being pressured", s: 0, fb: "A report doesn't make the aircraft airworthy. There is no compromise position on an active unidentified leak." }
        ]},
      { text: "The flight cancels. In the crew room, your FO says: 'It probably WAS historic staining, you know.'",
        opts: [
          { t: "'Maybe. With what we knew at decision time, same call every time.'", s: 10, fb: "Decision-quality vs outcome — exactly the distinction assessors (and accident investigators) care about. You decide on the information you HAVE." },
          { t: "'You may be right — next time I'll lean on the engineer's judgement more.'", s: 0, fb: "Learning the wrong lesson: letting hindsight erode a sound decision process. This answer haunts you in the sim debrief." },
          { t: "'It doesn't matter what it was.'", s: 3, fb: "Right instinct, dismissive delivery — it shuts down a teaching moment with your FO. Explain the reasoning; that's mentorship." }
        ]}
    ]
  }
];

/* ============ KNOWLEDGE MCQs (original wording — verify against your FCOM) ============ */
const MCQ = {
  a320: { label: "A320 family systems", icon: "🅰️", note: "CEO/NEO common knowledge — variants differ, check your FCOM.", qs: [
    { q: "In normal law, what protects the aircraft at high angle of attack?", o: ["Stick shaker activation", "Alpha protection — AoA limited to alpha-max regardless of stick input", "Autopilot disconnect and aural warning only", "Elevator authority is mechanically restricted"], c: 1, why: "Normal law provides alpha protection: beyond alpha-prot the sidestick commands AoA directly, limited to alpha-max. There is no stick shaker on the A320." },
    { q: "Both pilots move their sidesticks simultaneously without pressing the takeover button. What happens?", o: ["Captain's input has priority", "The inputs are algebraically summed", "The larger input wins", "The autopilot mediates between them"], c: 1, why: "Dual input sums both demands (with 'DUAL INPUT' callout). Priority requires holding the takeover pushbutton." },
    { q: "How many hydraulic systems does the A320 have, and what are they called?", o: ["Two: Left and Right", "Three: Green, Blue and Yellow", "Three: A, B and Standby", "Four: Green, Blue, Yellow and RAT"], c: 1, why: "Green (eng 1 pump), Blue (electric pump + RAT), Yellow (eng 2 pump + electric + hand pump). A/B/Standby is the B737 scheme." },
    { q: "What happens to flight control law after a typical dual hydraulic failure?", o: ["Nothing — laws are independent of hydraulics", "Reversion to alternate law", "Reversion to direct law immediately", "Mechanical backup only"], c: 1, why: "Loss of multiple systems/computers typically degrades normal → alternate law (with reduced protections). Direct law generally comes with gear extension after alternate." },
    { q: "The ECAM's primary purpose during an abnormal is to:", o: ["Replace the QRH entirely", "Display the failure, required actions, and system status in priority order", "Alert ATC automatically", "Record the failure for maintenance only"], c: 1, why: "ECAM presents warnings/cautions with action lines and status — crews 'work the ECAM', supplemented by QRH/OEB where applicable." },
    { q: "What does the RAT (ram air turbine) power on the A320?", o: ["The Green hydraulic system", "The Blue hydraulic system, which can drive the emergency generator", "Both engine-driven pumps", "Cabin pressurisation only"], c: 1, why: "The RAT pressurises Blue hydraulics; via the CSM/G it powers the emergency generator for essential electrics." },
    { q: "Engine thrust control on the A320 is best described as:", o: ["Cable-controlled with FADEC backup", "FADEC-controlled with fixed throttle detents (CL, FLX/MCT, TOGA)", "Hydromechanical with electronic trim", "Autothrottle-only — no manual mode"], c: 1, why: "Full-authority digital engine control with detent-based autothrust: levers normally sit in CL in flight; they do not move with autothrust." },
    { q: "In a two-engine taxi-out, when is the takeoff config warning checked?", o: ["It can't be tested by the crew", "By pressing the T.O CONFIG pushbutton, simulating takeoff power", "Automatically at 80 kt", "Only by maintenance"], c: 1, why: "T.O CONFIG TEST simulates the takeoff power condition to confirm no config warnings before departure." },
    { q: "What does 'alpha floor' do?", o: ["Limits bank angle at high AoA", "Commands TOGA thrust automatically when AoA exceeds a threshold", "Lowers the nose automatically at stall", "Deploys slats automatically"], c: 1, why: "Alpha floor is an autothrust protection: at excessive AoA it commands TOGA regardless of lever position (available in normal law, inhibited in some regimes)." },
    { q: "Loss of both engine generators and the APU generator in flight results in:", o: ["Total electrical failure", "Emergency electrical config: RAT/emergency generator powering essential buses, batteries as backup", "Automatic engine relight", "Normal operation from batteries for the rest of the flight"], c: 1, why: "Emergency elec config: RAT extends, emergency generator supplies AC ESS/DC ESS; batteries bridge gaps. Significant equipment loss follows." },
    { q: "Spoilers on the A320 are used for all of the following EXCEPT:", o: ["Roll augmentation", "Speedbrakes", "Ground spoilers / lift dumping", "High-speed protection pitch control"], c: 3, why: "Spoilers do roll, speedbrake and ground-spoiler duty. Pitch control is elevators/THS — not spoilers." },
    { q: "What characterises direct law?", o: ["Full protections with manual thrust", "Sidestick deflection commands surface deflection directly — no protections, conventional handling", "Autopilot-only control", "Pitch alternate with roll normal"], c: 1, why: "Direct law: stick position ≈ surface position, gains vary with config; no protections; manual pitch trim via wheel." },
    { q: "Green hydraulic system fails. Which notable services are lost or degraded?", o: ["Nothing significant — Blue covers everything", "Landing gear normal extension/retraction, among others", "All flight controls", "Brakes are lost entirely"], c: 1, why: "Green powers gear normal operation (gravity extension remains), one elevator/PTU partner etc. Alternate/accumulator braking remains via Yellow." },
    { q: "The PTU (power transfer unit) does what?", o: ["Transfers fuel between wings", "Transfers hydraulic POWER between Green and Yellow without transferring fluid", "Connects AC buses", "Drives the emergency generator"], c: 1, why: "The PTU is a mechanical motor-pump connecting Green↔Yellow hydraulics — pressure transfer, not fluid (the famous 'barking dog')." },
    { q: "During a managed descent, the aircraft is above the computed profile. The FMGS will typically:", o: ["Add thrust to recapture from below", "Maintain idle and may increase speed toward the upper managed limit to regain the path", "Disconnect the autopilot", "Level off immediately"], c: 1, why: "In DES mode above path, the aircraft converges using speed within the managed range; crews may need speedbrakes if convergence is insufficient." }
  ]},
  b737: { label: "B737 NG/MAX systems", icon: "🅱️", note: "NG baseline — MAX differences noted where critical. Check your FCOM.", qs: [
    { q: "The B737's hydraulic systems are:", o: ["Green, Blue and Yellow", "A, B and Standby", "Left, Right and Centre", "Primary and Secondary"], c: 1, why: "Systems A and B (each with engine-driven + electric pumps) plus a Standby system for rudder, leading-edge backup and thrust reverser backup." },
    { q: "If both A and B hydraulic systems fail, pitch and roll control is:", o: ["Lost completely", "Available through manual reversion — cables to elevator/aileron tabs and balance panels", "Electric actuator backup", "Standby system only"], c: 1, why: "The 737 retains mechanical reversion for elevator and aileron — heavy but flyable. Rudder runs on the standby system." },
    { q: "The Speed Trim System (STS) exists to:", o: ["Prevent overspeed in descent", "Augment speed stability at low speed/aft CG by trimming the stabiliser, mainly during manual flight after takeoff", "Trim automatically during autopilot cruise", "Reduce trim wheel noise"], c: 1, why: "STS applies stabiliser inputs to improve speed stability in low-speed, high-thrust manual flight — you'll see the wheel move on its own." },
    { q: "Runaway stabiliser memory items culminate in:", o: ["Autopilot ON to oppose the runaway", "STAB TRIM cutout switches to CUTOUT", "Pulling the trim circuit breakers as the first action", "Reducing thrust to idle"], c: 1, why: "Control column firmly, disengage AP/AT, oppose with electric trim if needed, then both STAB TRIM CUTOUT switches — then manual trim." },
    { q: "What does the standby hydraulic system power?", o: ["Landing gear extension", "Rudder, standby yaw damper, thrust-reverser backup and leading-edge devices backup extend", "Flaps and slats fully", "Wheel brakes only"], c: 1, why: "Standby (electric pump from system B reservoir) covers rudder and the listed backups — it's the third line of defence." },
    { q: "An engine-driven generator fails in flight. The 737's electrical system:", o: ["Automatically ties both AC transfer buses to the remaining generator", "Requires immediate APU start by memory item", "Sheds all galley and cabin power permanently", "Switches everything to battery"], c: 0, why: "The remaining generator picks up both transfer buses via the bus tie breakers automatically; APU start is available as backup, not a memory item." },
    { q: "Trailing edge flaps on the 737 are normally driven by:", o: ["Electric motors", "Hydraulic system B", "Hydraulic system A, with electric alternate drive", "Pneumatics"], c: 2, why: "Normal TE flap drive is hydraulic (system A in classics, B on NG — exam answer for NG: system B... verify variant!) with an electric alternate. Know YOUR variant — interviewers probe this." },
    { q: "The two engine bleed air systems normally supply:", o: ["Only engine anti-ice", "Air conditioning packs, wing anti-ice, engine starting and pressurisation", "Hydraulic pressurisation", "Cabin equipment cooling only"], c: 1, why: "Bleed air feeds packs/pressurisation, wing and engine anti-ice and cross-engine starting; the APU can substitute on the ground and below altitude limits." },
    { q: "What is the purpose of the yaw damper?", o: ["Turn coordination only", "Counter Dutch roll by automatic rudder inputs", "Steer the nosewheel", "Trim the rudder for engine failure"], c: 1, why: "Swept-wing jets are prone to Dutch roll; the yaw damper senses yaw oscillation and applies corrective rudder without moving the pedals." },
    { q: "On the MAX, MCAS was added to:", o: ["Improve cruise efficiency", "Provide stall protection in all phases", "Match pitch handling at high AoA to the NG's certified characteristics, via stabiliser inputs", "Replace the speed trim system"], c: 2, why: "MCAS adjusts stabiliser at elevated AoA (flaps up) so column-force gradient meets certification, due to the larger forward-mounted engines. Post-grounding it uses both AoA sensors with strict authority limits." },
    { q: "Loss of both engine bleeds at FL370 means:", o: ["Immediate fuel imbalance", "Loss of pressurisation source — emergency descent territory after cabin altitude rises", "Loss of all electrics", "Nothing — recirc fans maintain pressure"], c: 1, why: "No bleeds = no pack inflow; cabin altitude climbs and the crew must descend (memory items at cabin altitude warning) to 10,000 ft or MEA." },
    { q: "The 737's autobrake uses which hydraulic system?", o: ["A", "B", "Standby", "Accumulator only"], c: 1, why: "Normal brakes (and autobrake) are powered by system B; alternate brakes by A; accumulator provides parking/emergency capacity. Variant-check this in interviews." },
    { q: "Why does the 737 have manual gear extension via floor-hatch handles?", o: ["Weight saving — there is no alternate gear system", "Releases uplocks so gear free-falls if hydraulic system A is unavailable", "It hydraulically pumps the gear down", "Only for maintenance towing"], c: 1, why: "The manual extension handles mechanically release the uplocks; gravity and airloads do the rest. Gear normal operation is system A." },
    { q: "Vortex generators on the 737 wing exist to:", o: ["Reduce cruise drag", "Re-energise the boundary layer, delaying separation and improving control effectiveness", "Generate lift at low speed", "Protect against icing"], c: 1, why: "Tiny vanes mix faster free-stream air into the boundary layer so flow stays attached longer — better handling near limits." }
  ]},
  atpl: { label: "ATPL / technical interview", icon: "📚", note: "The classics interviewers actually ask.", qs: [
    { q: "ISA sea-level conditions are:", o: ["15 °C, 1013.25 hPa, lapse ~2 °C/1000 ft", "20 °C, 1000 hPa, lapse 3 °C/1000 ft", "0 °C, 1013 hPa, no lapse", "15 °C, 29.92 hPa, lapse 1 °C/1000 ft"], c: 0, why: "ISA: +15 °C, 1013.25 hPa (29.92 inHg), ~1.98 °C/1000 ft lapse to the tropopause (~36,090 ft, −56.5 °C)." },
    { q: "Flying from warm air into cold air at constant indicated altitude, your true altitude:", o: ["Increases", "Decreases", "Stays the same", "Depends on wind"], c: 1, why: "'High to low (temp), look out below' — cold air is denser, pressure levels compress, true altitude is lower than indicated." },
    { q: "Why are jet transport wings swept?", o: ["Structural strength", "To delay the drag rise by reducing the effective Mach number over the wing", "Better low-speed handling", "Fuel volume"], c: 1, why: "Sweep means the chordwise velocity component is lower, raising critical Mach / delaying compressibility drag — at the cost of low-speed behaviour." },
    { q: "'Coffin corner' refers to:", o: ["The aft CG limit", "High altitude where low-speed stall and high-speed buffet margins converge", "Minimum turn radius", "Rear cargo limits"], c: 1, why: "At high altitude, stall speed (TAS) rises while Mach buffet speed falls — the envelope narrows until the two meet." },
    { q: "V1 is best defined as:", o: ["Rotation speed", "The decision speed: max speed to initiate a rejected takeoff / min speed to continue after engine failure", "Safe single-engine climb speed", "Max tyre speed"], c: 1, why: "At V1 the decision is made: above it, you go. V2 is the takeoff safety speed; VR is rotation." },
    { q: "Why does TAS increase with altitude at constant IAS?", o: ["It doesn't", "Lower air density means the same dynamic pressure corresponds to a higher true speed", "Temperature increases with altitude", "Instrument error"], c: 1, why: "IAS reflects dynamic pressure (½ρV²). As ρ falls with altitude, V must rise to give the same q — TAS > IAS." },
    { q: "Engine EGT rises and N1 stays constant during cruise. A classic cause is:", o: ["Nothing — normal behaviour", "Compressor or turbine deterioration/damage — efficiency loss requires more fuel/heat for the same thrust", "Fuel contamination always", "Generator load increase"], c: 1, why: "Rising EGT at constant thrust settings signals deteriorating core efficiency — a monitoring item and classic interview probe." },
    { q: "RVSM airspace requires, among other things:", o: ["Triple autopilots", "Two independent primary altimetry systems, an autopilot able to hold level, and an altitude alerter/transponder", "Only a single certified altimeter", "Radar contact at all times"], c: 1, why: "Reduced vertical separation (1,000 ft FL290–FL410) depends on tight altimetry: dual primary systems, altitude-keeping autopilot, alerter, monitoring." },
    { q: "The danger of hypoxia at altitude is amplified because:", o: ["It causes sharp pain", "Onset is insidious — euphoria and impaired judgement mask the deterioration", "It only affects passengers", "Oxygen masks worsen it"], c: 1, why: "Hypoxia degrades the very judgement needed to recognise it. Time of useful consciousness at FL350 can be under a minute." },
    { q: "Driftdown refers to:", o: ["Descent due to icing", "The scheduled descent profile after engine failure at high altitude to single-engine ceiling, critical for terrain clearance", "Autopilot altitude loss", "Fuel jettison procedure"], c: 1, why: "After OEI at cruise, the aircraft can't hold altitude; driftdown trades altitude for speed along a profile that must clear terrain — central to mountain route planning." },
    { q: "A stabilised approach typically requires, by 1000 ft IMC:", o: ["Gear down only", "Configured, on path and speed, correct thrust, checklists complete — or go around", "Within 20 kt of target speed", "Autopilot engaged"], c: 1, why: "Stabilised-approach gates: correct configuration, glidepath/track, speed within limits, appropriate thrust, briefings/checklists done — otherwise mandatory go-around." },
    { q: "Why is a go-around from low altitude with full thrust and low weight demanding?", o: ["It isn't", "Strong pitch-up tendency and rapid acceleration risk flap overspeed and altitude busts — somatogravic illusion at night adds false pitch-up sensation", "Engines respond too slowly", "Flaps retract automatically"], c: 1, why: "Modern twins go around HARD when light. Managing pitch, automation modes and acceleration — plus vestibular illusions — makes GA the most-fumbled normal manoeuvre." },
    { q: "METAR: 'TEMPO 0800 FG'. This means:", o: ["Fog certain for the whole period", "Temporary fluctuations: visibility 800 m in fog, periods lasting less than an hour, in total less than half the period", "Fog at 0800 UTC", "Forecast invalid"], c: 1, why: "TEMPO = temporary fluctuations <1 h each and <½ of the period in aggregate. (And it's a TAF/trend term — another probe: METARs report, TAFs forecast.)" },
    { q: "Mach number is the ratio of:", o: ["TAS to local speed of sound", "IAS to ground speed", "TAS to ground speed", "EAS to CAS"], c: 0, why: "M = TAS / a, where the local speed of sound depends on temperature only (a ≈ 38.95 √T(K) kt)." },
    { q: "Why do we use a transition altitude/level?", o: ["Fuel calculation", "To separate traffic on a common altimeter datum (1013) above, and local QNH terrain reference below", "Radio frequency changes", "RVSM entry"], c: 1, why: "Below TA: QNH for terrain clearance. Above TL: standard setting so all aircraft share one datum — flight levels." }
  ]}
};
