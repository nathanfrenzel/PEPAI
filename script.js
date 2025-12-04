const reservations = [
  {
    id: "RES-1450",
    guest: "Jessica Smith",
    honorsStatus: "Gold",
    arrival: "2024-09-02",
    nights: 2,
    roomType: "Queen + sofa",
    lastStay: "Graduate Nashville",
    stayScore: 86,
    location: "Orlando, FL",
    stayPurpose: "Family weekend",
    complaints: ["missing couch bed on arrival"],
    preferences: {
      noise: "quiet",
      view: "pool",
      arrival: "afternoon",
      towels: 6,
      blankets: 2,
      pillowCount: 4,
      couchBed: "requested for child",
      fitness: "checks gym within 30 mins of arrival",
    },
    behaviors: [
      "checks gym on arrival",
      "likely requests extra towels",
      "used rideshare to hotel",
      "likely requests late checkout",
    ],
    rawData: {
      arrivalWindow: "2:45pm",
      checkoutHabit: "often late checkout",
      tripPurposeDetail: "Weekend with husband and child",
      poolInterest: "medium",
      workspaceNeed: "none",
      coffee: "drip + to-go cups",
      transport: "rideshare",
      paymentSource: "Amex with recent rideshare charges",
      partySize: 3,
    },
  },
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
      paymentSource: "Amex on file with Uber credits",
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
      paymentSource: "Corporate Amex on file",
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
      paymentSource: "Amex with recent Uber charge",
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
      paymentSource: "Amex on file",
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
      paymentSource: "Amex with local rideshare charges",
    },
  },
];

const roomMap = [
  {
    floor: 3,
    rooms: [
      { id: "302", status: "available", type: "King", view: "river", noise: "quiet", note: "Near elevators" },
      { id: "314", status: "occupied", type: "Suite", view: "city", noise: "standard" },
      { id: "321", status: "available", type: "Queen", view: "park", noise: "standard", note: "Close to stairs" },
      { id: "335", status: "reserved", type: "Suite", view: "courtyard", noise: "quiet" },
    ],
  },
  {
    floor: 2,
    rooms: [
      { id: "205", status: "reserved", type: "Queen", view: "city", noise: "standard" },
      { id: "218", status: "available", type: "King", view: "park", noise: "quiet", note: "Away from ice" },
      { id: "224", status: "cleaning", type: "Queen", view: "courtyard", noise: "quiet" },
      { id: "239", status: "available", type: "King", view: "river", noise: "quiet" },
    ],
  },
  {
    floor: 1,
    rooms: [
      { id: "103", status: "available", type: "Queen", view: "courtyard", noise: "quiet", note: "Near lobby" },
      { id: "112", status: "occupied", type: "King", view: "city", noise: "standard" },
      { id: "128", status: "available", type: "King", view: "city", noise: "standard" },
      { id: "141", status: "cleaning", type: "Queen", view: "park", noise: "quiet" },
    ],
  },
];

function generateRecommendations(res) {
  const welcome = buildWelcomeRecommendation(res);
  const comfort = buildComfortRecommendation(res);
  const local = buildLocalRecommendation(res);
  const lateCheckout = buildLateCheckoutUpsell(res);

  return [welcome, comfort, local, lateCheckout].sort((a, b) => b.confidence - a.confidence);
}

function computeConfidence(base, adjustments = []) {
  let score = base;
  adjustments.forEach((value) => {
    score += value;
  });
  return Math.max(55, Math.min(Math.round(score), 98));
}

const savedPreferenceKeys = ["noise", "view", "arrival", "couchBed"];

function buildWelcomeRecommendation(res) {
  const arrivalWeight = res.preferences.arrival === "early" ? 8 : 4;
  const transportWeight = res.rawData.transport === "rideshare" ? 7 : 3;
  const confidence = computeConfidence(78, [arrivalWeight, transportWeight]);

  return {
    id: "welcome",
    label: "Arrival & transit help",
    description: `Payment on file shows ${res.rawData.paymentSource}; AI predicts they likely arrived via rideshare and may want quick next-steps. Offer water, confirm mobile key, and point them to a nearby rental car desk while sharing lobby coffee/tea and elevator locations.`,
    action: "Check-in, hand rental-car directions, and orient to lobby",
    drivers: [
      `${res.rawData.arrivalWindow} arrival (saved)`,
      `${res.rawData.transport} traveler`,
      `${res.rawData.checkoutHabit} checkout habit`,
    ],
    locality: `${res.location.split(",")[0]}: Hertz on Orange Ave (0.3 mi) · rideshare pickup at front drive · lobby coffee/tea by elevators`,
    dataPoints: [
      `Saved payment source suggests rideshare drop-off`,
      `Likely wants wheels soon — share rental car option (AI)`,
      res.rawData.poolInterest !== "low" ? "Pool interest medium — share hours" : "Share coffee/tea and business center locations",
    ],
    rationale: `Keeps the arrival talk short while giving a realistic rental-car pointer and lobby navigation without over-promising services.`,
    confidence,
  };
}

function buildComfortRecommendation(res) {
  const linenWeight = res.preferences.towels >= 4 ? 7 : 4;
  const complaintWeight = res.complaints.length ? 6 : 2;
  const confidence = computeConfidence(74, [linenWeight, complaintWeight]);

  return {
    id: "comfort",
    label: "Family in-room setup",
    description: `AI predicts they likely want the sofa bed confirmed for the child and extra towels for ${res.rawData.partySize} guests given gym use on arrival. Stage ${res.preferences.towels} towels and ${res.preferences.blankets} blanket(s), and add two waters.`,
    action: "Confirm sofa bed, send linens, add waters",
    drivers: [
      `${res.rawData.partySize} guests (saved)`,
      `${res.preferences.towels} towels likely preferred`,
      `${res.complaints.length ? "Prior complaint: couch bed" : "No active complaints"}`,
    ],
    locality: `Deliver to assigned room after keying; note quiet hours for a likely quiet-preference guest`,
    dataPoints: [
      `Saved request: ${res.preferences.couchBed}`,
      `Likely needs extra linens for gym + 3 guests (AI)`,
      `Noise preference saved: ${res.preferences.noise}`,
    ],
    rationale: `Keeps the move practical for housekeeping: sofa bed, towels, and a simple water drop for a family arrival.`,
    confidence,
  };
}

function buildLocalRecommendation(res) {
  const loyaltyBonus = res.honorsStatus === "Diamond" ? 6 : res.honorsStatus === "Gold" ? 4 : 2;
  const purposeBonus = res.stayPurpose.toLowerCase().includes("leisure") ? 5 : 3;
  const confidence = computeConfidence(78, [loyaltyBonus, purposeBonus]);

  return {
    id: "local",
    label: "Walkable food & activities",
    description: `AI suggests nearby food and family-friendly activities based on likely rideshare use and ${res.stayPurpose.toLowerCase()} context. Share verbally and print a quick map if requested.`,
    action: "Share dining + activity trio with map print option",
    drivers: [
      `${res.rawData.transport} / Amex on file`,
      `${res.stayPurpose.toLowerCase()}`,
      `${res.honorsStatus} status`,
    ],
    locality: buildLocalList(res.location),
    dataPoints: [
      `Saved payment source suggests rideshare/walking`,
      `Trip detail: ${res.rawData.tripPurposeDetail}`,
      `Likely prefers nearby options to avoid extra transit`,
    ],
    rationale: `Keeps recommendations realistic to Hilton data (payment + purpose) and favors nearby options they can likely walk to from drop-off.`,
    confidence,
  };
}

function buildLateCheckoutUpsell(res) {
  const habitWeight = res.rawData.checkoutHabit?.includes("late") ? 9 : 3;
  const partyWeight = res.rawData.partySize && res.rawData.partySize > 1 ? 5 : 3;
  const loyaltyWeight = res.honorsStatus === "Diamond" ? 9 : res.honorsStatus === "Gold" ? 7 : 4;
  const confidence = computeConfidence(74, [habitWeight, partyWeight, loyaltyWeight]);

  return {
    id: "late-checkout",
    label: "Dining + late checkout perk",
    description: `Saved checkout notes show they likely depart later; extend a Hilton Honors thank-you with 20% off the on-site restaurant and a 50% discount on 2pm late checkout (likely preferred).`,
    action: "Apply 20% dining perk and offer 2pm late checkout at 50% off",
    drivers: [
      `${res.rawData.checkoutHabit} (saved)`,
      `${res.rawData.arrivalWindow} arrival`,
      `${res.rawData.partySize || 2} guests likely`,
      `${res.honorsStatus} loyalty tier`,
    ],
    locality: `Confirm availability in PMS, flag housekeeping for 2pm, and apply dining code to folio.`,
    dataPoints: [
      `Checkout behavior suggests later departures (saved)`,
      `Family trip likely benefits from slower exit (AI)`,
      `Loyalty tier supports 50% off late checkout + 20% dining`,
    ],
    rationale: `Keeps the offer realistic: pair a small dining perk with a loyalty-aligned late-checkout discount for a likely late departure without overpromising.`,
    confidence,
  };
}

function buildLocalList(location) {
  const city = location.split(",")[0].trim();
  const recs = {
    Orlando: "Point to Eola Market walk-up, Thornton Park eateries, Lake Eola play area",
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
  const arrival = res.preferences.arrival ? `saved ${res.preferences.arrival} arrival` : "flexible arrival";
  const transit = res.rawData.transport
    ? `Payment and arrival show ${res.rawData.transport}; AI predicts they likely stay car-light until after check-in.`
    : "";
  const fitness = res.preferences.fitness
    ? `Hilton profile shows she ${res.preferences.fitness}, so AI predicts she likely appreciates fast towel access.`
    : "";
  const viewPref = res.preferences.view ? `${res.preferences.view} view` : "standard view";
  const party = res.rawData.partySize ? `${res.rawData.partySize} guests noted` : "";

  return `${res.guest} is a ${res.honorsStatus} Honors guest traveling for ${res.stayPurpose}. Saved preferences: ${viewPref}, ${arrival}, ${party}. ${transit} ${fitness} ${complaint} noted for check-in coaching.`;
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
  const roomCandidates = pickRoomCandidates(res, 3);
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
          <div class="key-point"><span class="dot"></span><div><strong>Likely behaviors (AI)</strong>: likely ${res.behaviors.join(", ")}</div></div>
        </div>
      </div>

      ${renderRoomMapCard(res, roomCandidates)}
    </div>

    <div class="divider"></div>

    <div class="card">
      <div class="recommendations-header">
        <div>
          <p class="eyebrow">AI recommendations</p>
          <h3>Amenities &amp; nearby picks</h3>
        </div>
        <p class="muted">Click Accept or Reject to confirm the action for this guest.</p>
      </div>
        ${recommendations
          .map(
            (rec, idx) => {
                const signalList = rec.dataPoints.slice(0, 4);

              return `
              <div class="recommendation">
                <div class="rec-top">
                  <div class="rec-main">
                    <div class="rec-chip ${idx === 0 ? "primary-chip" : "alt-chip"}">${idx === 0 ? "Primary" : `Alternate ${idx}`}</div>
                    <div>
                      <p class="rec-title">${rec.label}</p>
                      <p class="rec-desc">${rec.description}</p>
                      <div class="rec-tags">${rec.drivers
                        .map((d) => `<span class="pill subtle">${d}</span>`)
                        .join("")}</div>
                    </div>
                  </div>
                  ${renderConfidenceStack(rec.confidence)}
                </div>
                <div class="rec-body refined">
                  <div class="rec-column">
                    <p class="eyebrow">Action</p>
                    <p class="rec-note"><strong>${rec.action}</strong></p>
                    <p class="muted">${rec.rationale || "Balanced fit"}</p>
                  </div>
                  <div class="rec-column">
                    <p class="eyebrow">Why this guest</p>
                    <ul class="data-points compact">${signalList.map((p) => `<li>${p}</li>`).join("")}</ul>
                    <p class="rec-locality">${rec.locality}</p>
                  </div>
                </div>
                <div class="rec-actions">
                  <button class="btn btn-primary action-button" data-rec="${rec.label}" data-action="${rec.action}" data-outcome="accepted">Accept</button>
                  <button class="btn btn-ghost action-button" data-rec="${rec.label}" data-action="${rec.action}" data-outcome="rejected">Reject</button>
                </div>
            </div>
          `;
            }
          )
        .join("")}
    </div>

    <div class="card action-log" id="action-log">No actions taken yet. Accept or reject a recommendation to log it.</div>
  `;

  attachActionHandlers(res);
  attachDataWindow(res, analytics);
}

function renderRoomMapCard(res, roomCandidates) {
  const highlightMap = buildRoomHighlights(roomCandidates || []);
  const primary = roomCandidates[0];
  const alternates = roomCandidates.slice(1);
  return `
      <div class="card room-map">
        <div class="room-map-top">
          <div>
            <h3>Room map</h3>
            <p class="muted">Preview of open inventory</p>
          </div>
          <div class="room-legend">
            <span class="legend-chip available">Available</span>
            <span class="legend-chip reserved">Reserved</span>
            <span class="legend-chip cleaning">Cleaning</span>
            <span class="legend-chip ooos">OOS</span>
          </div>
        </div>
        <div class="room-grid">
          ${roomMap
            .map(
              (floor) => `
              <div class="floor-row">
                <div class="floor-label">Fl ${floor.floor}</div>
                <div class="room-row">
                  ${floor.rooms
                    .map((room) => renderRoomTile(room, highlightMap[room.id] || []))
                    .join("")}
                </div>
              </div>
            `
            )
            .join("")}
        </div>
        <p class="muted suggestion">${primary ? `Primary: ${primary.room.id} (${primary.room.view} view, ${primary.room.type})${alternates
    .map((alt, idx) => ` · Alt ${idx + 1}: ${alt.room.id}`)
    .join("")}` : "No matching open rooms"}</p>
      </div>`;
}

function renderPreferences(preferences) {
  return preferences
    .map(
      ([key, value]) => `
        <div class="key-point">
          <span class="dot"></span>
          <div><strong>${savedPreferenceKeys.includes(key) ? "Saved" : "Likely"} ${formatKey(key)}</strong>: ${savedPreferenceKeys.includes(key) ? value : `likely ${value}`}</div>
        </div>`
    )
    .join("");
}

function pickTopPreferences(preferences) {
  const priority = [
    "noise",
    "couchBed",
    "pillows",
    "view",
    "arrival",
    "towels",
    "blankets",
    "pillowCount",
    "fitness",
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

function pickRoomCandidates(res, limit = 3) {
  const preferredNoise = res.preferences.noise === "quiet" ? "quiet" : "standard";
  const preferredView = res.preferences.view || "city";
  const preferredType = res.roomType.toLowerCase().includes("suite") ? "Suite" : res.roomType;

  const matches = [];

  roomMap.forEach((floor) => {
    floor.rooms.forEach((room) => {
      if (room.status !== "available") return;
      let score = 0;
      if (room.view === preferredView) score += 3;
      if (room.noise === preferredNoise) score += 2;
      if (room.type === preferredType) score += 2;
      matches.push({ room, floor: floor.floor, score });
    });
  });

  return matches.sort((a, b) => b.score - a.score).slice(0, limit);
}

function renderRoomTile(room, tags = []) {
  const statusClass = `status-${room.status}`;
  const isSuggested = tags.length > 0;
  return `
    <div class="room-tile ${statusClass} ${isSuggested ? "suggested" : ""}" aria-label="Room ${room.id} ${room.status}">
      <div class="room-tags">${tags.map((tag) => `<span class="room-tag">${tag}</span>`).join("")}</div>
      <div class="room-id">${room.id}</div>
      <div class="room-meta">${room.type} · ${room.view}</div>
      <div class="room-note">${room.note || `${room.noise} hall`}</div>
    </div>
  `;
}

function buildRoomHighlights(roomCandidates) {
  const map = {};
  roomCandidates.forEach((candidate, idx) => {
    if (!candidate || !candidate.room) return;
    const tag = idx === 0 ? "Primary" : `Alt ${idx}`;
    const roomId = candidate.room.id;
    if (!map[roomId]) map[roomId] = [];
    map[roomId].push(tag);
  });
  return map;
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
    { label: "Arrival vs checkout", value: `Saved ${res.rawData.arrivalWindow} arrival · ${res.rawData.checkoutHabit} checkout` },
    { label: "Trip purpose", value: `${res.stayPurpose} — ${res.rawData.tripPurposeDetail}` },
    { label: "Sleep kit", value: `AI predicts they likely want ${res.preferences.pillows} pillows · ${res.preferences.pillowCount} staged` },
    { label: "Linen counts", value: `Likely ${res.preferences.towels} towels · ${res.preferences.blankets} blankets · ${res.preferences.pillowCount} pillows` },
    { label: "Amenity guidance", value: `Likely to appreciate pool/computer/coffee direction based on ${res.rawData.poolInterest} interest` },
    { label: "Workspace", value: res.rawData.workspaceNeed ? `Saved: ${res.rawData.workspaceNeed}` : res.preferences.desk ? `Likely desk need: ${res.preferences.desk}` : "Standard desk (assumed)" },
    { label: "Upsell", value: "Optional upgrade surfaced only if inventory fits likely interest" },
    { label: "Local recs", value: `AI predicts ${res.location} tips aligned to trip purpose and transit` },
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
