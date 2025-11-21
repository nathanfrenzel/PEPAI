const reservations = [
  {
    id: "RES-4821",
    guest: "Alex Morgan",
    honorsStatus: "Gold",
    arrival: "2024-08-12",
    nights: 3,
    roomType: "King",
    lastStay: "Graduate Nashville",
    stayScore: 82,
    location: "Austin, TX",
    stayPurpose: "Leisure weekend",
    complaints: ["hallway noise"],
    preferences: {
      noise: "quiet",
      pillows: "foam",
      view: "park",
      arrival: "late",
      dietary: "vegetarian",
      hobbies: "live music, pool time",
      pillowFirmness: "medium",
      towels: 3,
      blankets: 1,
      pillowCount: 2,
    },
    behaviors: ["mobile key", "late-night snack", "loves local tips"],
    rawData: {
      arrivalWindow: "9:30pm",
      checkoutHabit: "late",
      tripPurposeDetail: "Birthday weekend with friends",
      poolInterest: "high",
      workspaceNeed: "light",
      coffee: "prefers tea",
      transport: "rideshare",
    },
  },
  {
    id: "RES-2019",
    guest: "Priya Desai",
    honorsStatus: "Diamond",
    arrival: "2024-08-13",
    nights: 2,
    roomType: "Queen",
    lastStay: "Graduate Seattle",
    stayScore: 91,
    location: "Boston, MA",
    stayPurpose: "Conference travel",
    complaints: ["flat pillows", "slow check-in"],
    preferences: {
      noise: "mid",
      pillows: "plush",
      view: "city",
      arrival: "early",
      desk: "needs ergonomic chair",
      dietary: "no shellfish",
      pillowFirmness: "soft",
      towels: 4,
      blankets: 2,
      pillowCount: 4,
    },
    behaviors: ["prefers desk space", "early check-in requests", "prints agendas"],
    rawData: {
      arrivalWindow: "7:45am",
      checkoutHabit: "on-time",
      tripPurposeDetail: "Panel speaker, tech education",
      poolInterest: "low",
      workspaceNeed: "ergonomic chair",
      coffee: "double espresso",
      transport: "rental car",
    },
  },
  {
    id: "RES-7742",
    guest: "Marcus Lee",
    honorsStatus: "Silver",
    arrival: "2024-08-12",
    nights: 1,
    roomType: "Queen",
    lastStay: "Graduate Richmond",
    stayScore: 75,
    location: "New York, NY",
    stayPurpose: "Campus tour",
    complaints: ["street noise", "slow elevator"],
    preferences: {
      noise: "quiet",
      pillows: "feather-free",
      view: "courtyard",
      arrival: "evening",
      fitness: "6am gym session",
      pillowFirmness: "medium-firm",
      towels: 5,
      blankets: 1,
      pillowCount: 3,
    },
    behaviors: ["uses gym", "requests extra towels", "mobile key"],
    rawData: {
      arrivalWindow: "6:10pm",
      checkoutHabit: "early",
      tripPurposeDetail: "Touring campus with family",
      poolInterest: "medium",
      workspaceNeed: "none",
      coffee: "iced cold brew",
      transport: "rideshare",
    },
  },
  {
    id: "RES-9923",
    guest: "Jamie Chen",
    honorsStatus: "Platinum",
    arrival: "2024-08-14",
    nights: 4,
    roomType: "Suite",
    lastStay: "Graduate Providence",
    stayScore: 88,
    location: "San Francisco, CA",
    stayPurpose: "Remote work + leisure",
    complaints: ["AC noise"],
    preferences: {
      noise: "mid",
      pillows: "down",
      view: "city",
      arrival: "late",
      desk: "standing desk requested",
      beverage: "evening tea service",
      pillowFirmness: "soft",
      towels: 3,
      blankets: 1,
      pillowCount: 4,
    },
    behaviors: ["evening lounge", "remote work", "late checkout"],
    rawData: {
      arrivalWindow: "10:40pm",
      checkoutHabit: "late",
      tripPurposeDetail: "Remote work blocks + partner visit",
      poolInterest: "low",
      workspaceNeed: "standing desk",
      coffee: "loose leaf tea",
      transport: "rental car",
    },
  },
  {
    id: "RES-6645",
    guest: "Sofia Ramirez",
    honorsStatus: "Gold",
    arrival: "2024-08-13",
    nights: 2,
    roomType: "King",
    lastStay: "Graduate Knoxville",
    stayScore: 79,
    location: "Chicago, IL",
    stayPurpose: "Anniversary getaway",
    complaints: ["pillow scent"],
    preferences: {
      noise: "quiet",
      pillows: "hypoallergenic",
      view: "river",
      arrival: "afternoon",
      dining: "romantic dinner",
      amenity: "late checkout",
      pillowFirmness: "medium",
      towels: 4,
      blankets: 2,
      pillowCount: 4,
    },
    behaviors: ["digital key", "late checkout", "requests dining recs"],
    rawData: {
      arrivalWindow: "3:20pm",
      checkoutHabit: "late",
      tripPurposeDetail: "Anniversary with curated dining",
      poolInterest: "medium",
      workspaceNeed: "none",
      coffee: "cappuccino",
      transport: "rideshare",
    },
  },
];

const recommendationTemplates = [
  {
    id: "quiet-corner",
    label: "Quiet corner king · stack 18",
    description: "Assign high-floor corner near quiet corridor; pre-stage foam pillows and note noise sensitivity for housekeeping.",
    action: "Assign quiet stack & prep pillows",
    base: 82,
    drivers: ["noise: quiet", "foam pillows", "hallway buffer"],
    upsell: "Offer $25/night park-view premium if available",
  },
  {
    id: "courtyard-gym",
    label: "Courtyard queen near fitness",
    description: "Place near fitness corridor with courtyard exposure to reduce traffic; stage two extra towel sets and label 6am gym access.",
    action: "Assign mid floor + add towels",
    base: 70,
    drivers: ["gym access", "quiet wing", "extra towels"],
    upsell: "Offer $15 wellness pass with smoothie credit",
  },
  {
    id: "city-work",
    label: "City view work-ready room",
    description: "Guarantee desk-forward setup and plush pillows; keep near elevators for program access and confirm premium Wi‑Fi readiness.",
    action: "Flag desk setup & pillow refresh",
    base: 76,
    drivers: ["city view", "desk setup", "plush pillows"],
    upsell: "Offer premium Wi‑Fi or day-pass workspace",
  },
  {
    id: "suite-lounge",
    label: "Suite + lounge & tea service",
    description: "Confirm lounge wristbands, deliver evening tea kit, and flag late-checkout flexibility to protect remote work cadence.",
    action: "Confirm lounge + tea setup",
    base: 80,
    drivers: ["lounge access", "tea service", "late checkout"],
    upsell: "Offer paid late checkout to 2pm",
  },
  {
    id: "romance-dining",
    label: "Curated dining + late checkout",
    description: "Send three romantic dining holds, protect late checkout, and secure river view if inventory allows; note anniversary context.",
    action: "Send dining picks & note late checkout",
    base: 78,
    drivers: ["romantic dining", "river view", "late checkout"],
    upsell: "Upsell river-view upgrade if open",
  },
];

function weightedScore(template, res) {
  let score = template.base;

  if (template.id === "quiet-corner" && res.preferences.noise === "quiet") score += 10;
  if (template.id === "courtyard-gym" && res.preferences.view === "courtyard") score += 8;
  if (template.id === "city-work" && res.preferences.view === "city") score += 8;
  if (template.id === "suite-lounge" && res.roomType === "Suite") score += 6;
  if (template.id === "romance-dining" && res.preferences.view === "river") score += 5;
  if (res.complaints.includes("hallway noise") && template.id === "quiet-corner") score += 5;
  if (res.complaints.includes("flat pillows") && template.drivers.some((d) => d.includes("pillows"))) score += 5;
  if (res.behaviors.includes("remote work") && template.id === "suite-lounge") score += 4;
  if (res.behaviors.includes("uses gym") && template.id === "courtyard-gym") score += 4;
  if (res.behaviors.includes("requests dining recs") && template.id === "romance-dining") score += 5;

  score += Math.round(Math.random() * 6 - 3);
  return Math.max(55, Math.min(score, 98));
}

function generateRecommendations(res) {
  return recommendationTemplates
    .map((template) => ({
      ...template,
      confidence: weightedScore(template, res),
      rationale: buildRationale(template, res),
      locality: buildLocality(template, res),
      dataPoints: buildDataPoints(template, res),
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}

function buildRationale(template, res) {
  const factors = [];
  if (res.preferences.noise === "quiet" && template.drivers.some((d) => d.includes("quiet"))) {
    factors.push("Protects against past noise complaint");
  }
  if (res.preferences.view && template.label.toLowerCase().includes(res.preferences.view)) {
    factors.push(`Honors ${res.preferences.view} view request`);
  }
  if (res.complaints.length) {
    factors.push(`Considers last complaint: ${res.complaints[0]}`);
  }
  if (res.behaviors.includes("digital key")) {
    factors.push("Digital key ready");
  }
  if (!factors.length) factors.push("Balanced inventory & preference fit");
  return factors.slice(0, 3).join(" · ");
}

function buildLocality(template, res) {
  if (template.id === "romance-dining") {
    return "Recommend: Pearl & Pine Bistro, Scout Rooftop, Riverlight Tavern";
  }
  if (template.id === "courtyard-gym") {
    return "Add 2 extra towel sets + 6am gym readiness";
  }
  if (template.id === "quiet-corner") {
    return "Prep foam pillows + quiet corridor note";
  }
  if (template.id === "suite-lounge") {
    return "Deliver tea kit at 7pm + confirm lounge wristbands";
  }
  return "Provide desk-ready setup + city view if open";
}

function buildDataPoints(template, res) {
  const points = [];
  points.push(`Arrival: ${res.rawData.arrivalWindow} · Checkout: ${res.rawData.checkoutHabit}`);
  if (res.preferences.pillows) points.push(`Pillow type: ${res.preferences.pillows} (${res.preferences.pillowFirmness})`);
  points.push(`Towels/blankets/pillows: ${res.preferences.towels}/${res.preferences.blankets}/${res.preferences.pillowCount}`);
  if (res.rawData.poolInterest !== "low") points.push("Guide to pool + towel desk after check-in");
  points.push(`Trip: ${res.stayPurpose} — ${res.rawData.tripPurposeDetail}`);
  points.push(template.upsell);
  return points.slice(0, 5);
}

function buildSummary(res) {
  const complaint = res.complaints.length ? `Flag ${res.complaints.join(" & ")}` : "No active complaints";
  const sleep = res.preferences.noise === "quiet" ? "prioritizes quiet rest" : "okay with moderate noise";
  const arrival = res.preferences.arrival ? `${res.preferences.arrival} arrival` : "flexible arrival";
  const pillow = res.preferences.pillowFirmness ? `${res.preferences.pillowFirmness} feel` : res.preferences.pillows;
  return `${res.guest} is a ${res.honorsStatus} Honors guest traveling for ${res.stayPurpose}. They ${sleep}, favor ${res.preferences.pillows} pillows (${pillow}) with a ${res.preferences.view} view, and expect ${arrival}. ${complaint} noted for check-in coaching.`;
}

function renderReservationList() {
  const list = document.getElementById("reservation-list");
  list.innerHTML = "";

  reservations.forEach((res, index) => {
    const item = document.createElement("li");
    item.className = "reservation-item";
    item.innerHTML = `
      <div>
        <div class="res-meta"><span class="status-chip">${res.honorsStatus}</span><span>${res.id}</span><span>${res.roomType}</span></div>
        <h3>${res.guest}</h3>
        <div class="res-meta"><span>${res.arrival}</span><span>·</span><span>${res.nights} nights</span><span>·</span><span>${res.lastStay}</span></div>
      </div>
      <div class="stay-score"><span class="score-dot"></span>${res.stayScore}</div>
    `;
    item.onclick = () => selectReservation(index, item);
    list.appendChild(item);
  });
}

function selectReservation(index, element) {
  document.querySelectorAll(".reservation-item").forEach((el) => el.classList.remove("active"));
  element.classList.add("active");

  const res = reservations[index];
  const detailBody = document.getElementById("detail-body");
  const recommendations = generateRecommendations(res);
  const topPreferences = pickTopPreferences(res.preferences);
  const profileSummary = buildSummary(res);
  const analytics = buildPredictiveAnalytics(res);

  document.getElementById("selection-pill").textContent = `${res.guest} · ${res.arrival} · ${res.nights} nights`;

  detailBody.innerHTML = `
    <div class="summary-grid">
        <div class="card summary">
          <div class="summary-top">
            <div>
              <p class="eyebrow">AI-generated profile</p>
              <h3>${res.guest}</h3>
              <p class="summary-copy">${profileSummary}</p>
          </div>
          <div class="summary-badges">
            <span class="pill">${res.honorsStatus} Honors</span>
            <span class="pill">Stayscore ${res.stayScore}</span>
            <span class="pill">${res.stayPurpose}</span>
          </div>
        </div>
      </div>
        <div class="card metrics">
          <div class="metric-row">
            <div>
              <p class="muted">Arrival</p>
            <p class="metric">${res.arrival}</p>
          </div>
          <div>
            <p class="muted">Nights</p>
            <p class="metric">${res.nights}</p>
          </div>
          <div>
            <p class="muted">Room</p>
            <p class="metric">${res.roomType}</p>
          </div>
        </div>
        <div class="metric-row">
          <div>
            <p class="muted">Last stay</p>
            <p class="metric">${res.lastStay}</p>
          </div>
          <div>
            <p class="muted">Location</p>
            <p class="metric">${res.location}</p>
          </div>
          <div>
            <p class="muted">Complaints</p>
            <p class="metric">${res.complaints.length ? res.complaints.join(", ") : "None"}</p>
          </div>
        </div>
        <button class="btn btn-primary data-window-trigger" data-guest="${res.guest}" aria-label="Open data window">Raw data &amp; analytics</button>
      </div>
    </div>

    <div class="detail-grid">
      <div class="card">
        <h3>Raw preferences</h3>
        <p class="muted">AI-selected top four signals</p>
        <div class="key-points">
          ${renderPreferences(topPreferences)}
          <div class="key-point"><span class="dot"></span><div><strong>Behaviors</strong>${res.behaviors.join(", ")}</div></div>
        </div>
      </div>

      <div class="card">
        <h3>Raw data snapshot</h3>
        <p class="muted">Operational signals driving today’s fit</p>
        <ul class="data-points compact">${renderRawPreview(res.rawData)}</ul>
      </div>

      <div class="card">
        <h3>Risk &amp; guardrails</h3>
        <div class="pill pill-quiet">Human confirms final room</div>
        <div class="pill pill-risk">Flag if confidence < 70%</div>
        <p class="muted">Model suggests options with evidence; front desk team approves or rejects each recommendation.</p>
      </div>
    </div>

    <div class="divider"></div>

    <div class="card">
      <div class="recommendations-header">
        <div>
          <p class="eyebrow">AI recommendations</p>
          <h3>Rooming &amp; service moves</h3>
        </div>
        <p class="muted">Click Accept or Reject to confirm the action for this guest.</p>
      </div>
        ${recommendations
          .map(
            (rec, idx) => `
              <div class="recommendation">
                <div class="rec-main">
                  <div class="rec-chip">${idx === 0 ? "Top" : `Alt ${idx}`}</div>
                  <div>
                    <p><strong>${rec.label}</strong></p>
                    <p class="muted">${rec.description}</p>
                    <div class="res-meta" style="margin-top:6px;">${rec.drivers
                      .map((d) => `<span class="pill subtle">${d}</span>`)
                      .join("")}</div>
                    <p class="muted locality">${rec.locality}</p>
                    <ul class="data-points">${rec.dataPoints.map((p) => `<li>${p}</li>`).join("")}</ul>
                  </div>
                </div>
                <div class="rec-side">
                  ${renderConfidenceDonut(rec.confidence)}
                  <p class="muted" style="text-align:center;">${rec.rationale || "Balanced fit"}</p>
                  <div class="rec-actions">
                    <button class="btn btn-primary action-button" data-rec="${rec.label}" data-action="${rec.action}" data-outcome="accepted">Accept</button>
                    <button class="btn btn-ghost action-button" data-rec="${rec.label}" data-action="${rec.action}" data-outcome="rejected">Reject</button>
                  </div>
              </div>
            </div>
          `
        )
        .join("")}
    </div>

    <div class="card action-log" id="action-log">No actions taken yet. Accept or reject a recommendation to log it.</div>
  `;

  attachActionHandlers(res);
  attachDataWindow(res, analytics);
}

function renderPreferences(preferences) {
  return preferences
    .map(
      ([key, value]) => `
        <div class="key-point">
          <span class="dot"></span>
          <div><strong>${key}</strong>${value}</div>
        </div>`
    )
    .join("");
}

function pickTopPreferences(preferences) {
  const priority = [
    "noise",
    "pillows",
    "pillowFirmness",
    "view",
    "arrival",
    "towels",
    "blankets",
    "pillowCount",
    "desk",
    "dining",
    "amenity",
  ];

  const ordered = priority
    .filter((key) => preferences[key] !== undefined)
    .map((key) => [key, preferences[key]]);

  const remaining = Object.entries(preferences).filter(([key]) => !priority.includes(key));
  return [...ordered, ...remaining].slice(0, 4);
}

function renderRawPreview(rawData) {
  const previewKeys = ["arrivalWindow", "checkoutHabit", "tripPurposeDetail", "workspaceNeed", "poolInterest"];
  return previewKeys
    .filter((key) => rawData[key])
    .map((key) => `<li><strong>${formatKey(key)}:</strong> ${rawData[key]}</li>`)
    .join("");
}

function attachActionHandlers(res) {
  document.querySelectorAll(".action-button").forEach((btn) => {
    btn.onclick = () => {
      const actionLog = document.getElementById("action-log");
      const rec = btn.dataset.rec;
      const action = btn.dataset.action;
      const outcome = btn.dataset.outcome;
      actionLog.textContent = `${outcome === "accepted" ? "Accepted" : "Rejected"} — ${action} (${rec}) for ${res.guest}`;
      actionLog.classList.toggle("action-log-accepted", outcome === "accepted");
      actionLog.classList.toggle("action-log-rejected", outcome === "rejected");
    };
  });
}

function attachDataWindow(res, analytics) {
  const trigger = document.querySelector(".data-window-trigger");
  const windowEl = document.getElementById("data-window");
  const grid = document.getElementById("data-window-grid");
  const closeBtn = document.getElementById("data-window-close");

  if (!trigger) return;

  trigger.onclick = () => {
    grid.innerHTML = `
      <div class="data-card">
        <p class="eyebrow">Raw data</p>
        <h4>${res.guest}</h4>
        <ul class="data-list">
          ${renderRawData(res.rawData)}
        </ul>
      </div>
      <div class="data-card">
        <p class="eyebrow">Predictive analytics</p>
        <h4>Signals powering recs</h4>
        <ul class="data-list">
          ${analytics.map((item) => `<li><strong>${item.label}:</strong> ${item.value}</li>`).join("")}
        </ul>
      </div>
    `;

    windowEl.classList.remove("hidden");
  };

  closeBtn.onclick = () => windowEl.classList.add("hidden");
  windowEl.onclick = (e) => {
    if (e.target === windowEl) windowEl.classList.add("hidden");
  };
}

function renderRawData(rawData) {
  return Object.entries(rawData)
    .map(([key, value]) => `<li><strong>${formatKey(key)}:</strong> ${value}</li>`)
    .join("");
}

function buildPredictiveAnalytics(res) {
  return [
    { label: "Arrival vs checkout", value: `${res.rawData.arrivalWindow} arrival · ${res.rawData.checkoutHabit} checkout` },
    { label: "Trip purpose", value: `${res.stayPurpose} — ${res.rawData.tripPurposeDetail}` },
    { label: "Sleep kit", value: `${res.preferences.pillows} pillows · ${res.preferences.pillowFirmness} firmness` },
    { label: "Linen counts", value: `${res.preferences.towels} towels · ${res.preferences.blankets} blankets · ${res.preferences.pillowCount} pillows` },
    { label: "Amenity guidance", value: `Pool interest ${res.rawData.poolInterest}; suggest pool/computer/coffee direction at check-in` },
    { label: "Workspace", value: res.rawData.workspaceNeed || res.preferences.desk || "Standard desk" },
    { label: "Upsell", value: "Room upgrade and paid late checkout surfaced when available" },
    { label: "Local recs", value: `Food/travel/business tips tailored to ${res.location}` },
  ];
}

function formatKey(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

function renderConfidenceDonut(score) {
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (score / 100) * circumference;
  const tone = confidenceClass(score);
  const gradientId = `grad-${tone}-${Math.floor(Math.random() * 10000)}`;
  const [start, end] =
    tone === "mid"
      ? ["#f59e0b", "#fb923c"]
      : tone === "low"
      ? ["#94a3b8", "#64748b"]
      : ["#1b4ad8", "#22c55e"];
  return `
    <div class="confidence-donut ${tone}">
      <svg width="80" height="80" viewBox="0 0 72 72" aria-label="Confidence ${score}%">
        <defs>
          <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${start}" />
            <stop offset="100%" stop-color="${end}" />
          </linearGradient>
        </defs>
        <circle class="donut-bg" cx="36" cy="36" r="28" />
        <circle class="donut-ring" cx="36" cy="36" r="28" stroke="url(#${gradientId})" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" />
      </svg>
      <div class="donut-center">
        <span class="donut-score">${score}%</span>
        <span class="donut-label">confidence</span>
      </div>
    </div>
  `;
}

function confidenceClass(score) {
  if (score >= 85) return "";
  if (score >= 70) return "mid";
  return "low";
}

renderReservationList();
