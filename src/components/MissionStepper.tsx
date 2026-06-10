import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PHASES = [
  {
    id: "detect",
    label: "Detect",
    body: "Thermal patrol drones fly programmed lattices over high-risk fuels. On-board ML flags hotspots within seconds; an alert with a GPS pin lands in dispatch before the smoke column is visible.",
  },
  {
    id: "map",
    label: "Map",
    body: "Once a fire is confirmed, larger UAS run continuous perimeter laps. LiDAR + thermal builds a live 3D model: active edge, spot fires, fuel breaks, terrain slope. The map refreshes every 60–120 seconds.",
  },
  {
    id: "suppress",
    label: "Suppress",
    body: "Heavy-lift airframes deliver targeted water, foam or retardant on the head of the fire — or, for prescribed burns, IGNIS-style ignition spheres lay a controlled backfire to starve the main run of fuel.",
  },
  {
    id: "monitor",
    label: "Monitor",
    body: "After containment, autonomous drones loiter for days. Thermal scans catch hidden smoldering stumps and root fires before they reignite — the failure mode that historically restarts most contained wildfires.",
  },
];

export function MissionStepper() {
  const [i, setI] = useState(0);
  const phase = PHASES[i];

  return (
    <div className="border border-rule">
      <div className="grid grid-cols-4 border-b border-rule">
        {PHASES.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setI(idx)}
            className={`relative px-3 py-4 text-left transition ${
              idx === i ? "bg-secondary/60" : "hover:bg-secondary/30"
            }`}
          >
            <div
              className={`font-mono text-[10px] uppercase tracking-widest ${
                idx === i ? "text-signal" : "text-muted-foreground"
              }`}
            >
              Phase 0{idx + 1}
            </div>
            <div className="mt-1 text-sm font-medium md:text-base">{p.label}</div>
            {idx === i && (
              <motion.div
                layoutId="phase-underline"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-signal"
              />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="grid gap-6 px-6 py-8 md:grid-cols-[auto_1fr] md:items-start"
        >
          <div className="font-mono text-5xl font-medium text-signal md:text-7xl">
            0{i + 1}
          </div>
          <div>
            <h3 className="text-xl font-medium md:text-2xl">{phase.label}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {phase.body}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
