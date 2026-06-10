
# Firefighting Drones — Interactive Site

A multi-page TanStack Start site with a clean technical "blueprint" aesthetic that walks visitors from traditional firefighting into modern drone-based firefighting, with technical detail, real projects, and societal impact.

## Visual direction

- Palette: paper `#f5f5f0`, deep navy `#0f1f3a`, signal red `#d72638`, blueprint blue `#3a86ff`.
- Typography: a technical mono (JetBrains Mono) for labels/specs + a clean grotesque (Space Grotesk) for headings and body.
- Treatment: blueprint grid backgrounds, callout lines, coordinate labels, diagram-style annotations on images, thin rules, monospaced figure captions.
- Motion: restrained — scroll-revealed diagrams, animated SVG lines tracing drone paths, hover states on project cards. Implemented with Motion (framer-motion).

## Routes

```
src/routes/
  __root.tsx              shared shell: top nav, blueprint background, footer
  index.tsx               /              Landing: hero + thesis + nav into chapters
  traditional.tsx         /traditional   Traditional firefighting context
  drones.tsx              /drones        Shift to drone firefighting + why now
  how-it-works.tsx        /how-it-works  Technical breakdown (interactive diagram)
  projects.tsx            /projects      Real-world projects gallery
  impact.tsx              /impact        Societal impact + stats
```

Each route gets its own `head()` with route-specific title, description, og:title, og:description. `og:image` only at leaf pages with a hero image.

## Page contents

### / (Landing)
- Full-bleed hero with blueprint grid, large display headline ("Firefighting, redrawn from above"), short standfirst, coordinate-style metadata.
- Hero image: drone silhouette over wildfire smoke (generated).
- Chapter index — six numbered cards (01 Traditional → 06 Impact) linking to each route.
- Footer strip with a quick stat ribbon.

### /traditional
- Brief history + how ground/aerial firefighting works today (engines, hotshot crews, air tankers, helicopters).
- 2-column editorial layout with a generated image of a wildland crew and an annotated diagram of a traditional response.
- "Limitations" callouts (visibility, crew risk, night ops, scale) — these set up the transition.

### /drones
- Transition page: "Why drones, why now." Key drivers (sensor cost, autonomy, swarm coordination, regulatory shifts).
- Side-by-side comparison table: traditional vs drone-assisted across detection time, risk to crews, night ops, payload, coverage.
- Generated image: drone over a controlled burn at dusk.

### /how-it-works (the interactive centerpiece)
- Interactive labeled diagram of a firefighting drone (SVG with hover hotspots: thermal/IR camera, LiDAR, GPS/RTK, comms, payload bay, propulsion). Hovering a hotspot reveals a spec panel.
- Mission phases stepper (Detect → Map → Suppress → Monitor) — clicking a step animates the diagram state and swaps the explanation panel.
- Technical context section covering: IR/thermal imaging, real-time wildfire mapping, swarm coordination, tethered drones for endurance, payload types (water, retardant, pyrotechnic ignition spheres for prescribed burns), comms/mesh networking, autonomy stack.
- Generated images: thermal-style false-color frame, swarm pattern diagram.

### /projects
- Card grid of real projects/companies (3 cols desktop, 1 mobile). Each card: generated hero image, name, country, one-paragraph description, role in firefighting.
- Featured: DJI wildfire response programs, Lockheed Martin Indago/Stalker, Parrot Anafi USA, Draganfly heavy-lift, Aerones firefighting drone, Drone Amplified IGNIS (ignition spheres for prescribed burns), Rain (autonomous wildfire response), Skydio public-safety deployments.
- Each card links to a modal/detail panel with more specs.

### /impact
- Societal impact: firefighter safety, faster detection, reduced burn area, cost, environmental tradeoffs, privacy/regulatory concerns.
- Animated counters for key stats (illustrative, sourced from public reporting).
- Closing CTA: "Read further" with external links to reputable sources (USFS, NIFC, manufacturer pages).

## Shared components

- `src/components/SiteHeader.tsx` — top nav with all 6 routes, active state.
- `src/components/SiteFooter.tsx` — minimal footer with credits/sources.
- `src/components/BlueprintBackground.tsx` — reusable grid SVG.
- `src/components/ChapterCard.tsx` — numbered chapter tile used on the landing page.
- `src/components/DroneDiagram.tsx` — interactive SVG diagram for /how-it-works.
- `src/components/MissionStepper.tsx` — phase stepper for /how-it-works.
- `src/components/ProjectCard.tsx` — project tile with modal.
- `src/components/ComparisonTable.tsx` — traditional vs drone table.
- `src/components/StatCounter.tsx` — animated counter for /impact.

## Design tokens

Update `src/styles.css`:
- Set `--background` to paper `#f5f5f0`, `--foreground` to navy `#0f1f3a`.
- Add `--primary` navy, `--accent` blueprint blue `#3a86ff`, `--destructive` signal red `#d72638`.
- Add custom tokens: `--grid-line`, `--rule`, `--mono-foreground`.
- Wire Space Grotesk + JetBrains Mono via `<link>` in `__root.tsx` head.

## Images

Generate ~8 images with `imagegen` saved under `src/assets/`:
- hero-drone.jpg (landing hero)
- traditional-crew.jpg (/traditional)
- drone-dusk.jpg (/drones)
- thermal-frame.jpg (/how-it-works)
- swarm-diagram.jpg (/how-it-works)
- 3–4 project hero images (generic drone-over-fire compositions; real company logos not generated).

Project logos are not used to avoid trademark issues; cards use generated illustrative imagery + text.

## Dependencies

- `motion` (framer-motion) for scroll/hover animations — install via `bun add motion`.

## Technical notes

- All routes are pure presentation — no server functions, no auth, no database needed.
- Each route file: `createFileRoute("/path")({ head: () => ({...}), component: PageName })`.
- Use TanStack `<Link>` for nav (never `<a href>` for internal routes).
- Keep `<Outlet />` in `__root.tsx`.
- Accessibility: alt text on every image, keyboard-focusable hotspots on the interactive diagram, sufficient contrast on red/navy.

## Out of scope

- No backend, no user accounts, no CMS.
- No real-time data, no maps integration.
- No game-like 3D scene; the diagram is SVG-based, not Three.js.
