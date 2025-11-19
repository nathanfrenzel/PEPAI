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
    complaints: ["hallway noise"],
    preferences: {
      noise: "quiet",
      pillows: "foam",
      view: "park",
      arrival: "late",
    },
    behaviors: ["mobile key", "late-night snack"],
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
    complaints: ["flat pillows", "slow check-in"],
    preferences: {
      noise: "mid",
      pillows: "plush",
      view: "city",
      arrival: "early",
    },
    behaviors: ["prefers desk space", "early check-in requests"],
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
    complaints: ["street noise", "slow elevator"],
    preferences: {
      noise: "quiet",
      pillows: "feather-free",
      view: "courtyard",
      arrival: "evening",
    },
    behaviors: ["uses gym", "requests extra towels"],
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
    complaints: ["AC noise"],
    preferences: {
      noise: "mid",
      pillows: "down",
      view: "city",
      arrival: "late",
    },
    behaviors: ["evening lounge", "remote work"],
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
    complaints: ["pillow scent"],
    preferences: {
      noise: "quiet",
      pillows: "hypoallergenic",
      view: "river",
      arrival: "afternoon",
    },
    behaviors: ["digital key", "late checkout"],
  },
];

const driversByPreference = {
  quiet: "Prior noise complaint; prefers quieter stacks",
  mid: "Typical noise tolerance with some sensitivity",
  pillows: "Pillow history referenced",
  view: "Prefers scenic or city view",
};

const recommendationTemplates = [
  {
    id: "quiet-corner",
    label: "Quiet corner king, high floor",
    base: 80,
    drivers: ["away from elevator", "foam or hypoallergenic pillows"],
  },
  {
    id: "view-elevator",
    label: "City view king near elevator",
    base: 72,
    drivers: ["city skyline view", "30s walk from elevator"],
  },
  {
    id: "courtyard-mid",
    label: "Courtyard queen, mid floor",
    base: 68,
    drivers: ["buffered from street noise", "easy access to lobby"],
  },
  {
    id: "accessible",
    label: "Accessible queen near lobby",
    base: 65,
    drivers: ["near elevator", "lower walk distance"],
  },
  {
    id: "suite-high",
    label: "High-floor suite with lounge access",
    base: 78,
    drivers: ["work-friendly layout", "priority turndown"],
  },
];

function weightedScore(template, res) {
  let score = template.base;

  if (template.id === "quiet-corner" && res.preferences.noise === "quiet") score += 12;
  if (template.id === "courtyard-mid" && res.preferences.view === "courtyard") score += 8;
  if (template.id === "view-elevator" && res.preferences.view === "city") score += 10;
  if (template.id === "suite-high" && res.roomType === "Suite") score += 6;
  if (res.complaints.includes("hallway noise") && template.id === "quiet-corner") score += 6;
  if (res.complaints.includes("street noise") && template.id !== "view-elevator") score += 4;
  if (res.complaints.includes("flat pillows") && template.drivers.some((d) => d.includes("pillows"))) score += 6;
  if (res.behaviors.includes("remote work") && template.id === "suite-high") score += 5;
  if (res.behaviors.includes("uses gym") && template.id === "courtyard-mid") score += 2;

  // add a small stochastic wiggle to keep the demo lively
  score += Math.round(Math.random() * 6 - 3);
  return Math.max(55, Math.min(score, 98));
}

function generateRecommendations(res) {
  return recommendationTemplates
    .map((template) => ({
      ...template,
      confidence: weightedScore(template, res),
      rationale: buildRationale(template, res),
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}

function buildRationale(template, res) {
  const factors = [];
  if (res.preferences.noise === "quiet" && template.drivers.some((d) => d.includes("quiet"))) {
    factors.push("Matches quiet preference");
  }
  if (res.preferences.view && template.label.toLowerCase().includes(res.preferences.view)) {
    factors.push(`Respects ${res.preferences.view} view request`);
  }
  if (res.complaints.length) {
    factors.push(`Considers last complaint: ${res.complaints[0]}`);
  }
  if (res.behaviors.includes("digital key")) {
    factors.push("Supports digital key readiness");
  }
  if (!factors.length) factors.push("Balances inventory and preference fit");
  return factors.slice(0, 2).join(" • ");
}

function buildSummary(res) {
  const details = [
    `${res.honorsStatus} Honors member`,
    `Stayscore ${res.stayScore}`,
    res.complaints.length ? `Recent complaint: ${res.complaints.join(", ")}` : "No open complaints",
    `Prefers ${res.preferences.pillows} pillows` + (res.preferences.noise === "quiet" ? ", quiet stacks" : ""),
  ];
  return `${res.guest} — ${details.join(" · ")}.`;
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
    <div class="detail-grid">
      <div class="card">
        <h3>AI-generated profile</h3>
        <p>${profileSummary}</p>
        <div class="key-points">
          ${res.complaints
            .map((c) => `<div class="key-point"><span class="dot"></span><div><strong>Complaint</strong>${c}</div></div>`)
            .join("")}
          <div class="key-point"><span class="dot"></span><div><strong>Behavior</strong>${res.behaviors.join(", ")}</div></div>
          <div class="key-point"><span class="dot"></span><div><strong>Pillows</strong>${res.preferences.pillows}</div></div>
          <div class="key-point"><span class="dot"></span><div><strong>Noise</strong>${res.preferences.noise}</div></div>
          <div class="key-point"><span class="dot"></span><div><strong>View</strong>${res.preferences.view}</div></div>
        </div>
      </div>

      <div class="card">
        <h3>Risk &amp; guardrails</h3>
        <div class="pill pill-quiet">Human confirms final room</div>
        <div class="pill pill-risk">Flag if confidence < 70%</div>
        <p class="muted">Front desk team keeps control; model suggests options with reasons so you can override quickly.</p>
      </div>
    </div>

    <div class="divider"></div>

    <div class="card">
      <h3>Recommendations</h3>
      ${recommendations
        .map(
          (rec, idx) => `
            <div class="recommendation">
              <div>
                <p><strong>${idx === 0 ? "Top" : `Alt ${idx}`}: ${rec.label}</strong></p>
                <p class="muted">${rec.rationale || "Balanced fit"}</p>
                <div class="res-meta" style="margin-top:6px;">${rec.drivers
                  .map((d) => `<span class="pill">${d}</span>`)
                  .join("")}</div>
              </div>
              <div>
                <div class="confidence-bar"><div class="confidence-fill ${confidenceClass(rec.confidence)}" style="width:${rec.confidence}%"></div></div>
                <p class="muted" style="text-align:right; margin-top:6px;">Confidence ${rec.confidence}%</p>
              </div>
            </div>
          `
        )
        .join("")}
    </div>

    <div class="card">
      <h3>Actions</h3>
      <div class="actions">
        <button class="btn btn-primary">Accept &amp; assign</button>
        <button class="btn">Swap pillows</button>
        <button class="btn">Reassign room</button>
        <button class="btn">Flag suggestion</button>
      </div>
      <p class="muted" style="margin-top:10px;">Log feedback to improve the AI and track override quality for this Graduate pilot.</p>
    </div>
  `;
}

function confidenceClass(score) {
  if (score >= 85) return "";
  if (score >= 70) return "mid";
  return "low";
}

renderReservationList();
