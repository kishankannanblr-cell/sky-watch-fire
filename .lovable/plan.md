
# Pivot: AI-driven firefighting drones, thermal + YOLO human detection

Re-skin the site from "blueprint field manual" to a dark, cinematic SaaS-style product page (like the reference upload) and refocus the content from generic firefighting drone history to **AI vision systems that find people in smoke and debris**.

## Visual direction (matches reference)

- Deep near-black background (`#0a0a0b`), large rounded outer panel, soft radial light blooms (cool white / faint ember), star/particle dust.
- Floating top nav pill (Home, Detection, Thermal AI, Missions, Projects, FAQ) + a "Live Feed" status pill with a pulsing red dot.
- Big light/dim two-tone hero headline (e.g. *"One model. Every life found."*), sub-lede, two pill buttons ("Open Console", "See How It Works"), small "Unlock thermal vision" badge above.
- Corner "node" callouts (Cortex / Quant / Aelf / Meeton in the ref) replaced with live AI telemetry tags: `YOLOv8-Thermal · 47 FPS`, `Humans detected · 3`, `Confidence · 0.92`, `Smoke opacity · 87%`.
- Bottom-left "02/03 . Scroll down" indicator, bottom-right slide pagination, bottom logo strip becomes "Trusted detection stack" (PyTorch, ONNX, NVIDIA Jetson, FLIR, ROS 2, OpenCV).
- Typography: Space Grotesk display + JetBrains Mono micro-labels (kept), but on dark; ember-orange accent (`#ff6a3d`) and ice-blue accent (`#7cc4ff`) for thermal palette.

## Information architecture (slim, AI-first)

Reduce from 6 pages to 5, all reframed:

1. `/` — **Hero + product-style overview** (reference layout). Sections under hero: "Why AI on the drone", AI capability triad (Detect / Communicate / Stream), thermal sample strip, CTA.
2. `/detection` — **YOLO human detection deep-dive**. How YOLOv8 / thermal-tuned variants work, training on FLIR ADAS + thermal-person datasets, why thermal+CNN beats RGB in smoke, bounding-box + confidence demo (animated SVG over a thermal still), edge inference on Jetson Orin, latency budget.
3. `/thermal` — **Thermal imaging & smoke physics**. LWIR 7.5–13.5 μm, why smoke is transparent to IR, false-color palettes (White-Hot / Iron / Rainbow toggle on a sample frame), sensor specs, fusion with RGB and LiDAR for debris scenes.
4. `/missions` — **Scenarios**: (a) Wildfire — locate trapped hikers in smoke column; (b) Structure fire — find occupants behind walls of smoke; (c) Building collapse / debris — heat-signature triage. Each scenario as an interactive card with a step-through: *Ingest → Detect → Classify → Geo-tag → Relay to IC*.
5. `/command` — **Incident Commander relay**: how detections become alerts. Mock IC dashboard panel (video tile + detection list + map pin + audio-callout transcript "Two humans, 40m NE, low motion"), comms stack (mesh radio + LTE failover + MQTT/ROS 2 topics), human-in-the-loop confirmation.

Cut the old `/traditional`, `/drones`, `/how-it-works`, `/projects`, `/impact` routes. Real-world projects fold into a compact "Used in the field" strip on `/missions` (Skydio X10, Parrot Anafi USA Thermal, DJI M30T + custom YOLO, Rain autonomous stations) — no separate Projects page.

## Key new/changed components

- `HeroFuturistic.tsx` — reference-style hero (panel, blooms, corner telemetry nodes, dual-tone headline, pill CTAs, scroll indicator, slide pager).
- `TopNavPill.tsx` — floating glass nav with status pill.
- `LogoStrip.tsx` — "Trusted detection stack" row.
- `YoloDetectionDemo.tsx` — thermal frame with animated bounding boxes, labels (`person 0.94`), scanning line, FPS counter. Pure SVG/CSS over a generated thermal still.
- `ThermalPaletteToggle.tsx` — switch between White-Hot / Black-Hot / Iron / Rainbow CSS filter presets on a thermal sample.
- `ScenarioStepper.tsx` — replaces MissionStepper, with the 5-stage AI pipeline.
- `CommanderConsole.tsx` — fake IC dashboard (video tile, detection list with confidences, mini-map with pulsing pin, alert log).
- `TelemetryTag.tsx` — small corner callouts used in hero.
- Keep `StatCounter`, replace its numbers with AI-relevant stats (detection latency, recall in smoke, lives-found case studies).
- `SiteHeader` / `SiteFooter` / `BlueprintBackground` rewritten dark; blueprint grid swapped for subtle dotted starfield + radial blooms.

## Design tokens (`src/styles.css`)

- `--background: oklch(0.13 0.01 260)` (near-black with cool tint)
- `--foreground: oklch(0.96 0 0)`
- `--muted-foreground: oklch(0.65 0.01 260)`
- `--primary: oklch(0.72 0.18 45)` (ember orange `#ff6a3d`)
- `--accent: oklch(0.78 0.12 230)` (ice blue, thermal)
- `--signal: oklch(0.7 0.22 25)` (alert red for live dot)
- `--rule: oklch(1 0 0 / 0.08)`
- New: `--gradient-bloom`, `--shadow-glow-ember`, `--shadow-glow-ice`, `--bg-starfield` (radial-gradient dust).
- Drop blueprint grid utilities; add `.glass-panel`, `.bloom`, `.telemetry-tag`.

## Images (regenerate)

Replace existing JPGs with dark, cinematic, AI-themed art (premium tier for the hero only):
- `hero-thermal.jpg` — drone POV thermal frame, smoke column, two human heat signatures highlighted.
- `thermal-smoke.jpg` — dense smoke with faint human silhouettes in LWIR false-color.
- `thermal-debris.jpg` — collapsed building, heat blooms under rubble.
- `detection-frame.jpg` — base plate for the YoloDetectionDemo (thermal scene, no boxes — boxes drawn in SVG).
- `commander-bg.jpg` — moody command-post environment for the IC section.
- `drone-night.jpg` — drone hovering over fire at night, cinematic.

Old `traditional-crew.jpg`, `project-*.jpg`, `swarm.jpg` deleted.

## Technical notes

- Pure presentation; no backend, no auth, no DB.
- All animation via existing `motion` package (Framer Motion). YOLO demo uses `AnimatePresence` + `motion.rect` to "scan and lock" bounding boxes; not a real model.
- `__root.tsx` updated to dark theme + new starfield background.
- `routeTree.gen.ts` regenerated automatically by Vite plugin when route files are added/removed.
- Each route still uses `createFileRoute` with `head()` for unique title/description/og.
- Accessibility: maintain focus rings on dark bg, ensure contrast on muted text, reduce-motion variants for the scanning line.

## Out of scope

- No real ML inference, no live video, no real map, no backend, no telemetry feed — all visuals are crafted mocks.
- No 3D / WebGL.
- No payments, auth, or storage.

