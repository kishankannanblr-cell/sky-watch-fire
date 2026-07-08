
## Goal

Shift the project's center of gravity away from thermal AI / heat-signature physics and onto a **tactical Priority Ranking** system that turns raw detections into ordered dispatch categories a fire crew can actually act on (SAR vs. Suppression, single vs. multi-victim).

## 1. New: Priority Ranking on `/command`

Add a new section on `/command` (directly under the `CommanderConsole`) built around a new component `PriorityRankBoard.tsx`.

### 1a. Rank rubric (rendered as a legend)

A visible "Aspects to consider when giving a Priority Rank" panel, explaining that raw confidence scores (0.91 vs 0.63) are not enough — categorization comes from **fire state + victim count**:

| Rank | Category | Trigger | Tactical team |
|------|----------|---------|---------------|
| P1 | Critical — Multi-victim + Fire | 2+ trapped victims AND active fire | SAR (mass) + Suppression |
| P2 | Critical — Single-victim + Fire | 1 trapped victim AND active fire | SAR + Suppression |
| P3 | Lower A — Multi-victim, no fire | 2+ trapped victims, no visible fire | SAR (mass) |
| P4 | Lower A — Single-victim, no fire | 1 trapped victim, no visible fire | SAR |
| P5 | Lower B — Fire, no victims | Active fire, no victims spotted | Suppression |

Rendered as a color-coded stack (P1/P2 = ember, P3/P4 = signal-cyan, P5 = amber), each row with the trigger and the team it dispatches.

### 1b. Live ranked incident list

An ordered list of ~5 synthetic incidents (`INC-01` … `INC-05`), one per rank tier, each showing:
- Rank badge (P1–P5) with the tactical team chip (SAR / Suppression / SAR+Suppression)
- Grid coordinates + bearing (reused style from the console)
- Victim count and fire-state chips
- Short "why this rank" line pulled from the rubric
- A subtle pulse on P1/P2 rows only

The list is **sorted by rank** — the whole point is that P1 is always on top, regardless of when it was detected or its raw confidence.

Purely presentational — no backend, no interactivity beyond a hover state.

## 2. Reduce thermal / heat-signature emphasis

The user says the project is now less focused on thermal AI. Trim without deleting the page:

- **`/` (index):** replace the "Why AI on the drone" section's thermal-heavy copy with copy about **prioritized dispatch** — "detections without a rank are just noise." Swap the second CTA from "Thermal physics" to "Priority ranking" linking to `/command#priority`. Keep the hero image.
- **Triad cards:** replace card 03 ("Stream") with **"03 · Rank"** — "Every confirmed detection is scored against fire state and victim count, then queued P1 → P5 for the dispatch board." Keep 01 Detect / 02 Communicate.
- **Header nav (`SiteHeader.tsx`):** demote "Thermal AI" — either drop it from the primary nav or move it to a "More" position. Add "Priority" as a primary link to `/command#priority`.
- **`/command` hero lede:** append one sentence introducing the priority board as the delivery mechanism.
- **`/thermal`:** left in place, unchanged content, but no longer linked from the home hero CTA row.
- **`/detection` HUD copy:** remove the "heat signature" phrasing in the two paragraphs beside the demo; keep the demo itself.

No changes to `YoloDetectionDemo.tsx` or `CommanderConsole.tsx` internals. No changes to routing files beyond nav links.

## 3. Files touched

- **New:** `src/components/PriorityRankBoard.tsx`
- **Edit:** `src/routes/command.tsx` (mount the board, add `id="priority"` anchor, adjust lede)
- **Edit:** `src/routes/index.tsx` (reword "Why AI" section + triad card 03 + CTA)
- **Edit:** `src/components/SiteHeader.tsx` (nav reshuffle)
- **Edit:** `src/routes/detection.tsx` (soften two thermal-heavy sentences)

## Technical notes

- `PriorityRankBoard` is a pure presentational component, no props, no state beyond static data arrays. Uses the existing `glass-panel`, `ember`, `ice`, `signal` design tokens — no new tokens.
- Data lives as two top-level `const` arrays in the component (`RANK_RUBRIC`, `INCIDENTS`).
- Anchor id `#priority` on the section so the home CTA can deep-link.
- No new dependencies.
