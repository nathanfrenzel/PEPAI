# Hilton Front Desk AI Pilot – Application Example

## Goal
Use an AI-driven assistant at the front desk to personalize guest check-in recommendations (room placement, amenities, and welcome gestures) while keeping humans in control and measuring guest satisfaction and operational efficiency.

## Core Idea
* **Input signals:** Honors profile data, past complaint history, stay patterns, current inventory (rooms/amenities), and contextual factors (noise patterns, view availability, pillow options).
* **AI outputs:** Ranked room/amenity pairings per guest, confidence scores, and a concise AI-generated guest summary highlighting rationale and risk flags.
* **Human-in-the-loop:** Front desk agent reviews suggestions, adjusts as needed, and confirms final allocation.

## Example Front Desk Flow
1. **Guest identified:** Scan reservation or Honors number.
2. **Data fetch:** Pull profile, recent stays, complaint topics, and stay score trends.
3. **Model inference:** 
   - Predict amenity preferences (e.g., quiet floor, hypoallergenic pillows, city view).
   - Recommend top 3 room placements with confidence per option and short reasoning.
4. **Agent console:** Display recommendations with badges (e.g., "High confidence: quiet room near elevator OK"), plus an AI-generated 2–3 sentence summary of guest expectations.
5. **Agent decision:** Accept, tweak room selection, or override; select amenity kit.
6. **Logging:** Store chosen option, overrides, and agent feedback for continuous model tuning.

## Pilot Scope (Graduate Hotels)
* **Properties:** Select amenity-rich Graduate hotels to maximize observable impact.
* **Cohort:** Split check-ins by shift/day into **AI-assisted** vs **control** to measure lift.
* **Data:** Stayscores, structured complaint categories, time-to-check-in metrics, and satisfaction survey responses.

## Measurement Plan
| Metric | Definition | Source | Target |
| --- | --- | --- | --- |
| Guest satisfaction lift | Δ in post-stay Stayscore vs control | Stayscore feed | +3–5 pts | 
| Complaint reduction | % drop in noise/pillow/view complaints | Complaint system | −15–25% |
| Check-in efficiency | Avg. handle time per check-in | PMS/operational logs | −10–15% |
| Adoption | % of check-ins where agent views and uses AI suggestions | Front desk app logs | ≥70% |
| Override quality | % of overrides that later align with positive satisfaction | Logs + Stayscore | Trending up |

## Interfaces
* **Front desk UI:** Dashboard card per guest with recommended room/amenity set, confidence scores, rationale bullet points, and quick-action buttons (Accept / Adjust / Override / Feedback).
* **Admin view:** Daily metrics (satisfaction, complaints, handle time, adoption), override insights, and model drift indicators.

## Governance & Safety
* Keep humans final decision-makers; never auto-assign without review.
* Show confidence scores and top features driving the recommendation.
* Provide one-tap feedback for agents to flag bad suggestions.
* Enforce data minimization: only use relevant profile/complaint signals; log access and actions.

## Rollout Steps
1. Integrate PMS and Honors data feeds; map complaint categories and Stayscores.
2. Build inference service and front desk UI module with confidence + rationale.
3. Train initial models on historical stays/complaints; add rule guards (e.g., ADA room eligibility).
4. Launch pilot in Graduate hotels with A/B split; monitor metrics weekly.
5. Iterate on model/rules using agent feedback and Stayscore outcomes.
6. Prepare go/no-go assessment after 6–8 weeks based on satisfaction and efficiency targets.

## Example Guest Card (UI Snapshot)
* **Summary:** "Returning Honors Gold, previously complained about hallway noise; prefers extra pillows."
* **Top recommendation:** Quiet corner king, 10th floor, feather alternative pillows — **92% confidence**.
* **Alternatives:** City view king near elevator (78%), standard king mid-floor (74%).
* **Actions:** Accept • Swap pillows • Reassign room • Flag recommendation

This example keeps staff empowered while using AI insights to improve guest experience and efficiency in a measurable, governable pilot.
