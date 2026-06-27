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
    hints: ["Not a hardware question — they have your logbook. It's a self-awareness question", "One or two SPECIFIC differentiators with evidence, not a list of adjectives", "Land it with fit: why you + this airline specifically works"] },
  { cat: "Safety", q: "Tell me about a time you raised a safety concern when it would have been easier to stay quiet.",
    hints: ["This is the speak-up / assertiveness test — bring a real example", "Show graduated, professional escalation (PACE), not a one-off heroic shout", "End with the outcome — and that you'd do it again"] },
  { cat: "Adaptability", q: "Describe a time a plan changed at the last minute and how you adjusted.",
    hints: ["Flexibility without losing the safety/standards thread", "Concrete re-planning actions, not just 'I stayed calm'", "Tie it to ops reality — weather, slots, tech: every sector shifts"] },
  { cat: "Command potential", q: "What makes a good captain — and where do you already show those qualities?",
    hints: ["Decision-making, communication, setting tone, inviting input (authority gradient)", "Give evidence from your own life, even non-aviation", "Command is about the team's performance, not 'being the boss'"] },
  { cat: "Error management", q: "You spot a mistake you made that nobody else has noticed. What do you do?",
    hints: ["Immediate, voluntary disclosure — speed and honesty score highest", "Contain/fix it, tell the right person, log it if required", "Just culture: the lesson outranks the blame"] },
  { cat: "Customer & professionalism", q: "A nervous passenger is visibly distressed before pushback. How do you help?",
    hints: ["Empathy and calm reassurance without over-promising", "Practical steps, involving cabin crew per procedure", "Balance genuine care with keeping the operation moving"] },
  { cat: "Teamwork", q: "Tell me about a time you received tough feedback. How did you take it?",
    hints: ["Non-defensive listening — they're testing ego vs growth mindset", "What you actually changed afterwards (verifiable behaviour)", "A thank-the-messenger attitude is vital in a monitored cockpit"] },
  { cat: "Stress & workload", q: "When several things are urgent at once, how do you decide what to do first?",
    hints: ["A real model — aviate, navigate, communicate transfers anywhere", "Say what you'd DROP or delegate, and why that's safe", "Show you verbalise and bring the other crew member in"] },
  { cat: "Motivation", q: "What's the biggest challenge facing this airline right now, and why do you still want to join?",
    hints: ["Shows you research beyond the careers page", "Honest, balanced view — not naive cheerleading", "Connect the challenge to where you can contribute"] },
  { cat: "Decision making", q: "You're offered a shortcut that saves time but bends a minor procedure. What do you do?",
    hints: ["Procedures exist for reasons you may not see — comply", "Raise it through the right channel if the rule seems wrong", "Normalisation of deviance is the trap they're probing — name it"] },
  { cat: "Leadership", q: "Tell me about a time you motivated a reluctant or struggling team member.",
    hints: ["Empathy first — understand the 'why' before pushing", "Specific actions: support, clarity, a shared goal", "Outcome: both the task and the person improved"] },
  { cat: "Stress & workload", q: "Tell me about a time you were close to your personal limits. How did you recognise it, and what did you do?",
    hints: ["Self-awareness is the competency — name the early warning signs you actually notice", "Show the mitigation: slowing down, asking for help, off-loading a task", "End functional: you protected the outcome rather than pushing past the limit silently"] },
  { cat: "Teamwork", q: "You join an established crew or team as the new person. How do you integrate without overstepping?",
    hints: ["Listen and learn the local norms before changing things", "Contribute early in small, useful ways — earn trust before challenging", "But never let 'being new' stop you raising a genuine safety point"] },
  { cat: "Safety", q: "Describe a time you reported a hazard or near-miss knowing it would create extra work or scrutiny for you.",
    hints: ["Just culture in action — reporting matters more than looking good", "Show you did it promptly and factually, not defensively", "Outcome: the system got safer; would you do it again? Yes"] },
  { cat: "Adaptability", q: "Tell me about a time you had to learn something complex very quickly. How did you approach it?",
    hints: ["A repeatable method: chunk it, find the fundamentals, test yourself", "Show you sought the right source/mentor rather than guessing", "Tie it to type-rating reality: aviation is relentless, fast learning"] }
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
  },
  {
    id: "weather",
    title: "Weather closing in",
    intro: "Cruise, 30 minutes from destination. The latest ATIS shows a line of thunderstorms moving toward the field — vis is still good but deteriorating. You're carrying about 45 minutes of holding fuel above final reserve. Your nominated alternate is 20 minutes away, currently CAVOK, but the same system is forecast to reach it in roughly 90 minutes.",
    steps: [
      { text: "First action with this picture?",
        opts: [
          { t: "Press on — conditions at the field are still good right now", s: 3, fb: "Acting on the current snapshot ignores the trend. The skill is planning against the forecast, not the present moment." },
          { t: "Build the picture: pull the TAF/trend and radar, quantify holding vs divert fuel, brief the options with your FO", s: 10, fb: "Correct — gather, quantify, brief. You turn a vague worry into numbers and a shared plan before you need it." },
          { t: "Divert now to be safe", s: 3, fb: "Premature. You may burn the option you'll need later — and divert toward the same system. Decide on data, not reflex." }
        ]},
      { text: "On approach, the storm is now over the field; ATC offers holding. You still have ~45 min holding fuel above reserve; the alternate is CAVOK but the system reaches it in ~80 min.",
        opts: [
          { t: "Hold and wait for a gap — fields usually clear", s: 0, fb: "Hope is not fuel. Holding spends the very fuel that buys your alternate — and the alternate is closing." },
          { t: "Set a firm fuel/time bingo: a short bounded hold, then divert with enough fuel to reach the alternate before it deteriorates", s: 10, fb: "Disciplined. A planned bingo protects the alternate and makes the decision before the numbers force it on you." },
          { t: "Divert immediately, no holding", s: 6, fb: "Safe and defensible — though a short, briefed, bounded hold with a hard bingo can be legitimate. Open-ended holding is the trap." }
        ]},
      { text: "You elect to divert. The FO suggests requesting a shortcut through a gap in the weather line to save fuel.",
        opts: [
          { t: "Take the gap — fuel saved is options gained", s: 0, fb: "Penetrating a convective line for economy trades a known safe routing for thunderstorm risk. Never do it to save fuel." },
          { t: "Decline weather penetration; route around using the fuel you protected for exactly this", s: 10, fb: "Right priorities — you carried the fuel so you'd never have to gamble on a gap." },
          { t: "Ask for vectors and decide gap-by-gap as you go", s: 3, fb: "Vectors are fine, but 'gap-by-gap' near build-ups invites creeping commitment. Set your avoidance distance and hold to it." }
        ]},
      { text: "On the ground at the alternate, ops asks for a quick reason for the diversion for their report.",
        opts: [
          { t: "Keep it factual: forecast vs actual, the fuel logic, your decision points — and file the reports", s: 10, fb: "Clear, factual, documented. A good diversion is the normal output of good planning, not a failure to explain away." },
          { t: "Downplay it — diversions look bad on your record", s: 0, fb: "Defensive and wrong. A well-reasoned diversion is professionalism; obscuring the reasoning erodes just culture." },
          { t: "Blame the weather service for poor forecasts", s: 0, fb: "Blame-shifting. The decision and its rationale were yours — own them." }
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
    { q: "During a managed descent, the aircraft is above the computed profile. The FMGS will typically:", o: ["Add thrust to recapture from below", "Maintain idle and may increase speed toward the upper managed limit to regain the path", "Disconnect the autopilot", "Level off immediately"], c: 1, why: "In DES mode above path, the aircraft converges using speed within the managed range; crews may need speedbrakes if convergence is insufficient." },
    { q: "What is the main job of the FAC (Flight Augmentation Computer)?", o: ["Control the FADEC and thrust", "Rudder functions (yaw damping, rudder trim, travel limiting) plus flight-envelope and speed computations (VLS, alpha speeds)", "Manage cabin pressurisation", "Drive the THS in normal law"], c: 1, why: "The two FACs handle yaw (yaw damper, rudder trim, rudder travel limit) and compute characteristic speeds and flight-envelope data — independent of the ELACs/SECs." },
    { q: "Approaching VMO/MMO in normal law, high-speed protection:", o: ["Does nothing — only an aural warning", "Introduces a progressive nose-up pitch demand to resist exceeding the limit", "Deploys the speedbrakes automatically", "Disconnects the FADEC"], c: 1, why: "High-speed protection adds a positive (nose-up) demand as speed exceeds VMO/MMO, so the aircraft resists overspeed even with full forward sidestick." },
    { q: "On the A320, manual pitch trim with the trim wheel is normally required in:", o: ["Normal law", "Direct law and mechanical backup (autotrim is lost — 'USE MAN PITCH TRIM')", "Alternate law only", "All laws at all times"], c: 1, why: "Normal and alternate law autotrim the THS; in direct law and mechanical backup autotrim is unavailable, so the crew trims manually with the wheel." },
    { q: "On the ECAM, a RED message versus an AMBER message means:", o: ["No real difference", "Red = warning requiring immediate action (safety of flight); amber = caution, action required but less time-critical", "Amber is the most urgent", "Both are advisory only"], c: 1, why: "Red warnings (e.g. configuration, fire) demand immediate action; amber cautions are abnormal but lower urgency. Colour coding drives the priority you work them in." }
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
    { q: "Vortex generators on the 737 wing exist to:", o: ["Reduce cruise drag", "Re-energise the boundary layer, delaying separation and improving control effectiveness", "Generate lift at low speed", "Protect against icing"], c: 1, why: "Tiny vanes mix faster free-stream air into the boundary layer so flow stays attached longer — better handling near limits." },
    { q: "Normal wheel brakes run on system B. If system B fails, braking:", o: ["Is lost entirely", "Transfers automatically to alternate brakes on system A, with the brake accumulator as backup", "Reverts to the standby system", "Becomes manual"], c: 1, why: "Loss of B → automatic alternate braking on A; the pre-charged accumulator still gives several applications and parking-brake capability." },
    { q: "What does the Mach trim function do?", o: ["Limits speed to MMO", "Adds nose-up trim as Mach increases to counter the nose-down 'Mach tuck' tendency", "Trims the rudder for engine failure", "Nothing on modern jets"], c: 1, why: "At high Mach the centre of pressure moves aft, giving a nose-down tuck; Mach trim compensates automatically so stick force stays conventional." },
    { q: "The leading-edge slats and flaps are normally driven by:", o: ["Electric motors", "Hydraulic system B, with a standby source able to drive them to EXTEND as backup", "System A only", "Manual cranks"], c: 1, why: "LE devices operate on system B; the standby system can drive them to the extended position if normal power is lost. Always confirm against your variant's FCOM." },
    { q: "Why must the 737 stabiliser trim cutout switches be used in a runaway?", o: ["They restart the autopilot", "They electrically isolate the stabiliser trim so an uncommanded/runaway input stops — then the crew trims manually", "They lower the gear", "They reduce thrust"], c: 1, why: "After controlling the column and disengaging AP/AT, both STAB TRIM CUTOUT switches stop electric trim; the manual trim wheel is then the only stabiliser control." }
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
    { q: "Why do we use a transition altitude/level?", o: ["Fuel calculation", "To separate traffic on a common altimeter datum (1013) above, and local QNH terrain reference below", "Radio frequency changes", "RVSM entry"], c: 1, why: "Below TA: QNH for terrain clearance. Above TL: standard setting so all aircraft share one datum — flight levels." },
    { q: "When temperature and dew point converge, you should expect:", o: ["Improving visibility", "An increasing likelihood of cloud, mist or fog forming", "Rising surface pressure", "Nothing significant"], c: 1, why: "As the spread closes, relative humidity approaches saturation — the classic precursor to fog/low cloud, central to alternate planning." },
    { q: "Operating on the 'back of the power curve' (region of reversed command) means:", o: ["More speed needs less thrust", "More thrust is required to fly slower, because induced drag dominates at low speed", "Engines are at idle", "It only occurs supersonically"], c: 1, why: "Below the min-drag speed, slowing increases induced drag, so holding altitude needs MORE thrust — speed and thrust are inversely related, a real trap in the slow, dirty config." },
    { q: "The significance of the tropopause is that:", o: ["Engines stop working above it", "It caps most weather: below it temperature falls with height; above it the fall stops (roughly isothermal)", "Winds are always calm there", "It marks the RVSM ceiling"], c: 1, why: "Most convective weather and the steepest lapse rates are below the tropopause; jet streams sit near it. Its height/temperature vary with latitude and season." },
    { q: "Below VMCA with one engine out and the other at high thrust, the hazard is:", o: ["Excess speed", "Loss of directional control — the rudder can no longer counter the asymmetric thrust", "Flap overspeed", "Tailstrike"], c: 1, why: "VMCA is set by rudder authority against asymmetric thrust; below it the aircraft yaws and rolls toward the dead engine despite full rudder." }
  ]},
  general: { label: "General knowledge", icon: "🧠", note: "Principles of flight, weather, human factors and air law — the fundamentals every assessment assumes you know.", qs: [
    { q: "In steady straight-and-level flight:", o: ["Lift exceeds weight", "Thrust exceeds drag", "Lift = weight and thrust = drag", "Weight exceeds lift"], c: 2, why: "Unaccelerated level flight means the four forces are in balance." },
    { q: "An aerofoil stalls when:", o: ["A fixed airspeed is reached", "The critical angle of attack is exceeded", "Flaps are retracted", "The engine fails"], c: 1, why: "Stall is an angle-of-attack phenomenon — it can occur at any speed or attitude." },
    { q: "In a level 60° banked turn, the load factor is about:", o: ["1.0 g", "1.5 g", "2.0 g", "3.0 g"], c: 2, why: "Load factor = 1/cos(bank); 1/cos 60° = 2 g, and stall speed rises by √2 (~1.41×)." },
    { q: "Induced drag is greatest:", o: ["At high speed", "At low speed / high AoA", "In the cruise", "In a descent"], c: 1, why: "Induced drag rises as speed falls; parasite drag does the opposite — total drag is lowest where they cross (best L/D)." },
    { q: "Lowering flaps for landing:", o: ["Raises the stall speed", "Reduces lift", "Increases lift and drag, lowering the stall speed", "Has no aerodynamic effect"], c: 2, why: "A higher lift coefficient allows a slower, steeper, more controlled approach." },
    { q: "Transponder code 7700 indicates:", o: ["Radio failure", "Unlawful interference (hijack)", "A general emergency", "VFR squawk"], c: 2, why: "7500 = hijack, 7600 = comms failure, 7700 = emergency — worth knowing cold." },
    { q: "Wake turbulence is strongest behind an aircraft that is:", o: ["Heavy, slow and clean (gear/flaps up)", "Light and fast", "On the ground", "Descending quickly"], c: 0, why: "Vortex strength grows with weight and falls with speed/span — heavy + slow + clean is worst, hence extra spacing behind a 'Heavy'." },
    { q: "Under the ICAO semicircular rule, flying east (track 000–179°) you cruise at:", o: ["Even thousands of feet", "Odd thousands of feet", "Any available level", "QNH levels only"], c: 1, why: "East = odd, West (180–359°) = even — keeps opposite-direction traffic vertically separated." },
    { q: "An ILS provides:", o: ["Lateral guidance only", "Vertical guidance only", "Both lateral (localiser) and vertical (glideslope) guidance", "Distance information only"], c: 2, why: "Localiser gives centreline, glideslope gives the descent path — together a precision approach." },
    { q: "If you become spatially disorientated in cloud, you should:", o: ["Trust your inner-ear sensations", "Trust and fly the instruments", "Close your eyes briefly", "Increase speed"], c: 1, why: "Vestibular illusions lie; the instruments are the truth in IMC." },
    { q: "Time of Useful Consciousness after a rapid decompression at FL350 is roughly:", o: ["30–60 minutes", "5–10 minutes", "30–60 seconds", "Effectively unlimited"], c: 2, why: "Hence 'mask on first'. TUC shortens sharply with altitude and with rapid (vs slow) decompression." },
    { q: "A microburst encountered on short final is dangerous because it produces:", o: ["A steady tailwind only", "A performance-increasing headwind", "A rapid swing from headwind/updraft to downdraft/tailwind, sapping performance", "No significant effect"], c: 2, why: "The shear reverses through it — an initial gain masks the severe loss that follows. Escape with max thrust; don't chase the speed." },
    { q: "With QNH set, the altimeter reads:", o: ["Height above the airfield", "Altitude above mean sea level", "Flight level", "Height above the terrain"], c: 1, why: "QNH → altitude AMSL (airfield elevation on the ground). QFE → height above the field; 1013 → flight levels." },
    { q: "VMCA (air minimum control speed) is:", o: ["Best rate-of-climb speed", "The minimum speed to keep directional control with the critical engine inoperative", "Maximum flap speed", "Clean stall speed"], c: 1, why: "Below VMCA, with one engine out and the other at takeoff thrust, the rudder can no longer hold heading." },
    { q: "On a Mercator chart, the shortest distance between two points is:", o: ["The rhumb line drawn as a straight line", "The great-circle track, which appears curved", "Always due east", "Undefined"], c: 1, why: "A straight line on Mercator is a rhumb line (constant heading, longer); the great circle is shortest but curves on the chart." },
    { q: "A steady green light-gun signal to an aircraft in flight means:", o: ["Return to land", "Cleared to land", "Give way to other aircraft and continue circling", "Airport unsafe — do not land"], c: 1, why: "In flight: steady green = cleared to land; steady red = give way / keep circling; flashing green = return to land." },
    { q: "With QFE set, the altimeter reads:", o: ["Altitude above mean sea level", "Height above the airfield (zero on the runway)", "Flight level", "Height above the nearest terrain"], c: 1, why: "QFE references field elevation, so it shows height above the runway; QNH shows altitude AMSL; 1013 gives flight levels." },
    { q: "Roll, pitch and yaw occur about which axes?", o: ["Roll–vertical, pitch–longitudinal, yaw–lateral", "Roll–longitudinal, pitch–lateral, yaw–vertical", "All about the lateral axis", "Pitch–vertical, yaw–longitudinal"], c: 1, why: "Roll is about the longitudinal axis (ailerons), pitch about the lateral axis (elevator), yaw about the vertical axis (rudder)." },
    { q: "A standard rate (rate one) turn is:", o: ["1° per second", "3° per second — a 360° turn in two minutes", "6° per second", "Whatever 45° of bank gives"], c: 1, why: "Rate one = 3°/s, so a full circle takes two minutes; the bank needed rises with TAS (~10% of TAS + 7 as a rule of thumb)." },
    { q: "Class A airspace is:", o: ["Uncontrolled airspace", "Controlled and IFR-only, where ATC separates all traffic", "For VFR traffic only", "Anything below 1,000 ft AGL"], c: 1, why: "Class A is the most restrictive controlled airspace — IFR only, clearance required, ATC separates everyone (typically the upper airways/high-level structure)." }
  ]}
};
