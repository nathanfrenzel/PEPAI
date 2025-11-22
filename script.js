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

function generateRecommendations(res) {
  const rooming = buildRoomingRecommendation(res);
  const service = buildServiceRecommendation(res);
  const local = buildLocalRecommendation(res);

  return [rooming, service, local].sort((a, b) => b.confidence - a.confidence);
}

function computeConfidence(base, adjustments = []) {
  let score = base;
  adjustments.forEach((value) => {
    score += value;
  });
  return Math.max(55, Math.min(Math.round(score), 98));
}

function buildRoomingRecommendation(res) {
  const quietBonus = res.preferences.noise === "quiet" ? 8 : 2;
  const complaintBonus = res.complaints.length ? 6 : 0;
  const arrivalBonus = res.preferences.arrival === "early" ? 4 : res.preferences.arrival === "late" ? 2 : 0;

  const confidence = computeConfidence(78, [quietBonus, complaintBonus, arrivalBonus]);

  return {
    id: "rooming",
    label: `${capitalize(res.preferences.view || "Preferred")} view ${res.roomType.toLowerCase()} · quieter corridor`,
    description: `Assign a ${res.roomType.toLowerCase()} near the ${res.preferences.view || "preferred"} exposure and add a housekeeping task to pre-set ${res.preferences.pillows} pillows, ${res.preferences.towels} towels, and ${res.preferences.blankets} blanket(s).`,
    action: "Select room & send staging task",
    drivers: [
      `${res.preferences.noise} noise`,
      `${res.preferences.pillows} pillows`,
      `${res.preferences.view || "balanced"} view`,
    ],
    locality: `Prep linens: ${res.preferences.towels} towels · ${res.preferences.blankets} blanket(s) · ${res.preferences.pillowCount} pillows`,
    dataPoints: [
      `Arrival ${res.rawData.arrivalWindow}; checkout ${res.rawData.checkoutHabit}`,
      `Complaints to avoid: ${res.complaints.join(" & ") || "none flagged"}`,
      `Prefers ${res.preferences.noise} hallways and ${res.preferences.pillows} pillows`,
    ],
    rationale: `Aligns the room with the guest’s ${res.preferences.noise} hallway preference and ${res.preferences.view} view while staging linens before arrival to avoid repeat issues like ${res.complaints[0] || "noise"}.`,
    confidence,
  };
}

function buildServiceRecommendation(res) {
  const earlyArrival = res.preferences.arrival === "early" ? 6 : 0;
  const upsellBonus = res.roomType === "Suite" ? 4 : 2;
  const complaintPenalty = res.complaints.length ? -2 : 0;
  const confidence = computeConfidence(74, [earlyArrival, upsellBonus, complaintPenalty]);

  return {
    id: "service",
    label: "Check-in cadence & amenity walk-through",
    description: `Match the welcome to a ${res.rawData.arrivalWindow} arrival, verify checkout habit, and walk the guest toward coffee/tea, pool, or computer stations while the room is finalized.`,
    action: "Confirm timing & walk amenities",
    drivers: [
      `${res.preferences.arrival || "flex"} arrival`,
      `${res.rawData.checkoutHabit} checkout`,
      res.rawData.poolInterest !== "low" ? "pool interest" : "coffee/tea direction",
    ],
    locality: `Trip purpose: ${res.stayPurpose.toLowerCase()} — ${res.rawData.tripPurposeDetail}`,
    dataPoints: [
      `Prep mobile key; coordinate early/late readiness with housekeeping`,
      `Point to pool/computer/coffee on property map based on interest`,
      res.rawData.workspaceNeed ? `Desk need: ${res.rawData.workspaceNeed}` : "Standard desk is fine",
    ],
    rationale: `Keeps check-in tight for a ${res.rawData.checkoutHabit} checkout guest while providing amenity directions tied to their trip purpose without over-promising readiness.`,
    confidence,
  };
}

function buildLocalRecommendation(res) {
  const loyaltyBonus = res.honorsStatus === "Diamond" ? 6 : res.honorsStatus === "Gold" ? 4 : 2;
  const purposeBonus = res.stayPurpose.toLowerCase().includes("leisure") ? 5 : 3;
  const confidence = computeConfidence(76, [loyaltyBonus, purposeBonus]);

  return {
    id: "local",
    label: `Local trio + optional upgrade (${res.location})`,
    description: `Provide three nearby dining/outing ideas that match ${res.stayPurpose.toLowerCase()} and their transport, and only offer a paid upgrade if inventory and guest cues support it.`,
    action: "Share local picks & note upgrade option",
    drivers: [
      `${res.stayPurpose.toLowerCase()}`,
      `${res.rawData.transport} arrival`,
      `${res.honorsStatus} status`,
    ],
    locality: buildLocalList(res.location),
    dataPoints: [
      `Purpose detail: ${res.rawData.tripPurposeDetail}`,
      `Favorite sip: ${res.rawData.coffee || res.rawData.beverage || "standard"}`,
      `Transit: ${res.rawData.transport}; pace recs for that mode`,
    ],
    rationale: `Balances ${res.location} dining/outing picks with ${res.stayPurpose.toLowerCase()} context and ${res.honorsStatus} perks; any upgrade offer is optional and documented.`,
    confidence,
  };
}

function buildLocalList(location) {
  const city = location.split(",")[0].trim();
  const recs = {
    Austin: "Try Moonlight Brunch, Rainey Street tacos, Lady Bird Lake walk",
    Boston: "Recommend Seaport cafes, North End pasta, Charles River run",
    "New York": "Point to Bryant Park stroll, Midtown ramen, High Line sunset",
    "San Francisco": "Share Embarcadero walk, Chinatown dim sum, Ferry Building coffee",
    Chicago: "Suggest Riverwalk, West Loop bites, Millennium Park jog",
  };
  return recs[city] || "Curate nearby coffee, dinner, and transit-friendly options";
}

function buildSummary(res) {
  const complaint = res.complaints.length ? `Flag ${res.complaints.join(" & ")}` : "No active complaints";
  const sleep = res.preferences.noise === "quiet" ? "prioritizes quiet rest" : "okay with moderate noise";
  const arrival = res.preferences.arrival ? `${res.preferences.arrival} arrival` : "flexible arrival";
  return `${res.guest} is a ${res.honorsStatus} Honors guest traveling for ${res.stayPurpose}. They ${sleep}, favor ${res.preferences.pillows} pillows with a ${res.preferences.view} view, and expect a ${arrival}. ${complaint} noted for check-in coaching.`;
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
                <div class="rec-top">
                  <div class="rec-main">
                    <div class="rec-chip">${idx === 0 ? "Primary" : `Alternate ${idx}`}</div>
                    <div>
                      <p class="rec-title">${rec.label}</p>
                      <p class="muted">${rec.description}</p>
                      <div class="res-meta" style="margin-top:6px;">${rec.drivers
                        .map((d) => `<span class="pill subtle">${d}</span>`)
                        .join("")}</div>
                      <p class="muted locality">${rec.locality}</p>
                    </div>
                  </div>
                  ${renderConfidenceStack(rec.confidence)}
                </div>
                <div class="rec-body">
                  <div class="rec-column">
                    <p class="eyebrow">Action</p>
                    <p class="rec-note"><strong>${rec.action}</strong></p>
                    <p class="muted">${rec.rationale || "Balanced fit"}</p>
                  </div>
                  <div class="rec-column">
                    <p class="eyebrow">Key signals</p>
                    <ul class="data-points compact">${rec.dataPoints.map((p) => `<li>${p}</li>`).join("")}</ul>
                  </div>
                </div>
                <div class="rec-actions">
                  <button class="btn btn-primary action-button" data-rec="${rec.label}" data-action="${rec.action}" data-outcome="accepted">Accept</button>
                  <button class="btn btn-ghost action-button" data-rec="${rec.label}" data-action="${rec.action}" data-outcome="rejected">Reject</button>
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
      const confirmed = window.confirm("Are you sure?");
      if (!confirmed) return;
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
    { label: "Sleep kit", value: `${res.preferences.pillows} pillows · ${res.preferences.pillowCount} on cart` },
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

function capitalize(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function renderConfidenceStack(score) {
  const tone = confidenceClass(score);
  return `
    <div class="confidence-stack">
      <div class="confidence-chip">${score}% fit</div>
      <div class="confidence-bar" aria-label="Confidence ${score}%">
        <div class="confidence-fill ${tone}" style="width:${score}%"></div>
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
