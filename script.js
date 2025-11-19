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
    },
    behaviors: ["mobile key", "late-night snack", "loves local tips"],
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
    },
    behaviors: ["prefers desk space", "early check-in requests", "prints agendas"],
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
    },
    behaviors: ["uses gym", "requests extra towels", "mobile key"],
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
    },
    behaviors: ["evening lounge", "remote work", "late checkout"],
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
    },
    behaviors: ["digital key", "late checkout", "requests dining recs"],
  },
];

const recommendationTemplates = [
  {
    id: "quiet-corner",
    label: "Assign quiet corner king · Stack 18",
    description: "Place guest on a high floor away from elevators; preset foam pillows and note quiet corridor request.",
    action: "Assign quiet stack & prep pillows",
    base: 82,
    drivers: ["noise: quiet", "foam pillows", "away from elevator"],
  },
  {
    id: "city-work",
    label: "City view work-ready room",
    description: "Prioritize strong desk setup, near elevators for quick access; deliver extra plush pillows pre-arrival.",
    action: "Flag desk setup & pillow refresh",
    base: 76,
    drivers: ["city view", "desk setup", "plush pillows"],
  },
  {
    id: "courtyard-gym",
    label: "Courtyard queen near fitness",
    description: "Select mid-floor room buffered from street noise with easy gym access; stock extra towels in closet.",
    action: "Assign mid floor + add towels",
    base: 70,
    drivers: ["gym access", "quiet wing", "extra towels"],
  },
  {
    id: "suite-lounge",
    label: "Suite + lounge & tea service",
    description: "Confirm lounge access, drop evening tea kit, and note late checkout flexibility for remote work blocks.",
    action: "Confirm lounge + tea setup",
    base: 80,
    drivers: ["lounge access", "tea service", "late checkout"],
  },
  {
    id: "romance-dining",
    label: "Romantic dining + late checkout",
    description: "Recommend three local restaurants with cozy ambience, hold late checkout, and arrange river view if open.",
    action: "Send dining picks & note late checkout",
    base: 78,
    drivers: ["romantic dining", "river view", "late checkout"],
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

function buildSummary(res) {
  const complaint = res.complaints.length ? `flagged ${res.complaints.join(" & ")}` : "no active complaints";
  const sleep = res.preferences.noise === "quiet" ? "prioritizes quiet rest" : "okay with moderate noise";
  const arrival = res.preferences.arrival ? `${res.preferences.arrival} arrival` : "flexible arrival";
  return `${res.guest} is a ${res.honorsStatus} Honors guest visiting for ${res.stayPurpose}. They ${sleep} and prefers ${res.preferences.pillows} pillows with a ${res.preferences.view} view. Expect ${arrival}; ${complaint} noted.`;
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
  const profileSummary = buildSummary(res);

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
      </div>
    </div>

    <div class="detail-grid">
      <div class="card">
        <h3>Raw preferences</h3>
        <div class="key-points">
          ${renderPreferences(res.preferences)}
          <div class="key-point"><span class="dot"></span><div><strong>Behaviors</strong>${res.behaviors.join(", ")}</div></div>
        </div>
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
                </div>
              </div>
              <div class="rec-side">
                <div class="confidence-bar"><div class="confidence-fill ${confidenceClass(rec.confidence)}" style="width:${rec.confidence}%"></div></div>
                <p class="muted" style="text-align:right; margin-top:6px;">Confidence ${rec.confidence}%</p>
                <p class="muted" style="text-align:right;">${rec.rationale || "Balanced fit"}</p>
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
}

function renderPreferences(preferences) {
  return Object.entries(preferences)
    .map(
      ([key, value]) => `
        <div class="key-point">
          <span class="dot"></span>
          <div><strong>${key}</strong>${value}</div>
        </div>`
    )
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

function confidenceClass(score) {
  if (score >= 85) return "";
  if (score >= 70) return "mid";
  return "low";
}

renderReservationList();
