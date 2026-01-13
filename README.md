# Hilton Front Desk AI Pilot Demo

This lightweight, front-end-only demo shows how a PEP-style Hilton front desk assistant could surface AI-generated guest profiles, confidence-scored room/amenity recommendations, and human-in-the-loop actions for Graduate hotel pilots.

## Running the demo
1. From the repository root, start a simple static server (examples below) and open http://localhost:8000:
   - Python: `python -m http.server 8000`
   - Node: `npx serve .`
2. Click any reservation on the left. The app will generate a profile, show confidence bars for top recommendations, and list ready-to-log actions.

All data is fake and generated client-side for demonstration.
