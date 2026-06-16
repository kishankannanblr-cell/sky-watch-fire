
## Goal
Stop *describing* the product's most interesting capabilities and start *demonstrating* them. Three targeted interactive upgrades — `/detection` HUD, `/command` sector map, `/command` IC console — with no copy or routing changes elsewhere.

---

## 1. `/detection` — make the YOLO HUD feel live

File: `src/components/YoloDetectionDemo.tsx` (already has FPS jitter, per-target metadata, scene panel).

What's missing is *motion*. Add:

- **Sweeping scan line.** A horizontal 1px ember/cyan gradient bar that travels top→bottom over the thermal frame on a ~2.4s loop (CSS `@keyframes` or `motion.div animate={{ y: ['0%','100%'] }}` with `repeat: Infinity`). Soft glow + 30% opacity so it reads as a sensor sweep, not a progress bar.
- **Staggered box appearance.** Boxes currently render all at once. On mount and on every "re-acquire" tick (every ~6s), boxes fade/scale in one by one (150ms stagger) as the scan line passes their y-coordinate. Confidence number counts up from 0.00 → target value over 400ms when a box appears.
- **Live "Humans detected" counter** in the top-left HUD chrome that increments as each box materializes (0 → 1 → 2 → 3), then holds. Resets on the re-acquire cycle so the viewer sees the count climb.
- **Acquisition pulse** on each new box: a brief ember ring that scales from box size to 1.4× and fades, drawing the eye to detection events.

No new components; all changes inside `YoloDetectionDemo.tsx`. The existing scene-analysis panel, per-target labels, and FPS ticker stay.

---

## 2. `/command` — real sector map canvas

File: `src/components/CommanderConsole.tsx`, replacing the current `▲`-on-dot-grid block (bottom of the right column).

Build a proper SVG sector map (~h-64, full width of the right column):

- **Background**: existing dot-grid + a subtle topographic contour (3–4 concentric irregular SVG paths in `oklch(... / 0.06)`) so it reads as terrain, not a placeholder.
- **Fire perimeter**: a closed, organic SVG `<path>` filled with `ember/15` and stroked with `ember/60` dashed. Add a slow "breathing" animation (scale 1 → 1.02 → 1) on a 4s loop to suggest active spread.
- **Drone**: a small rotated triangle glyph (SVG, not text) at center with a thin heading line and a faint 60° FOV cone in `ice/20`. Drifts ±4px on a 6s loop so it doesn't feel frozen.
- **Survivor pins**: the three detections (H-018/019/020) plotted at bearings/distances consistent with their list entries (041°/38m, 065°/52m, 118°/71m — convert to x/y from the drone origin). Each pin is an ember dot with an `animate-ping` halo. Hovering a list row highlights its corresponding pin (shared `selectedId` state).
- **Compass rose + scale bar** in two corners (`N` glyph, `0 — 50 m` tick) in mono uppercase muted.
- **Legend** strip at the bottom: `▲ UAS-04   ◉ Survivor   ░ Fire perimeter`.

Pure SVG, no map library. All coordinates derived from the existing `SEED` array so the map and list stay in sync.

---

## 3. `/command` — human-in-the-loop interactive console

Same file: `src/components/CommanderConsole.tsx`. Turn the static detection list into a live queue.

- **Streamed arrivals**: detections appear one-by-one on a timer (`H-018` at t=0, `H-019` at t≈2.5s, `H-020` at t≈5s). Each row enters with the existing motion fade/slide and a one-shot ember pulse on its status dot.
- **Per-row status state**: `pending | confirmed | dismissed`. New rows arrive as `pending` with a soft ember ring + blinking dot.
- **Confirm / Dismiss buttons** on each `pending` row:
  - `Confirm` → status → `confirmed`, dot turns `signal` (green-cyan), buttons replaced by `✓ Confirmed · HH:MM:SS` timestamp, and the matching map pin switches from ember to `signal` with a steady ring (no more ping).
  - `Dismiss` → status → `dismissed`, row dims to 40% opacity, label gets strikethrough, map pin fades out.
- **IC callout banner** (the existing rotating banner over the live tile) is now *driven* by queue events: a new arrival pushes "New heat signature H-0XX, sector C, conf 0.91 — awaiting confirmation"; a confirm pushes "H-0XX confirmed by IC. Relayed to ground crews."; a dismiss pushes "H-0XX dismissed — flagged for retraining." This makes the AI-suggests / human-decides loop legible in five seconds.
- **Queue footer**: small mono line `3 detected · 2 confirmed · 1 dismissed · 0 pending` that updates live — the receipt of the human-in-the-loop story.
- After all three are resolved, a 4s pause then the queue resets and replays, so the interaction is always visible to a scrolling visitor.

State lives in `CommanderConsole.tsx` (single `useReducer` or a couple of `useState`s). No new files, no route changes, no copy changes elsewhere on the page.

---

## Files touched
- `src/components/YoloDetectionDemo.tsx` — scan line, staggered box reveal, live counter, acquisition pulse.
- `src/components/CommanderConsole.tsx` — SVG sector map; streamed detections with Confirm/Dismiss; map ↔ list sync; queue-driven IC callout; queue footer.

Nothing else changes. No route additions, no copy edits, no design-token changes.

## Verification
1. `/detection`: scan line sweeps continuously; on load (and every ~6s) the 3 boxes appear staggered with confidence counting up; "Humans detected" pill climbs 0 → 3.
2. `/command`: sector map renders as SVG with fire perimeter, drone glyph + FOV cone, 3 survivor pins at bearings matching the list, compass + scale bar.
3. `/command`: detections stream in one at a time; each shows Confirm/Dismiss; clicking either updates row, map pin, callout banner, and footer counters; queue replays after all three resolved.
4. Console clean, no error fallback, FPS stays smooth.
