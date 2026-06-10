import { useState } from "react";
import { motion } from "motion/react";

type Spec = { id: string; label: string; x: number; y: number; spec: string };

const SPECS: Spec[] = [
  {
    id: "thermal",
    label: "Thermal / IR core",
    x: 50,
    y: 70,
    spec: "640×512 uncooled microbolometer, 7.5–13.5 μm. Sees through smoke and at night.",
  },
  {
    id: "rgb",
    label: "EO gimbal",
    x: 50,
    y: 80,
    spec: "Stabilized 4K visual camera, 3-axis gimbal, ±0.005° jitter.",
  },
  {
    id: "lidar",
    label: "LiDAR",
    x: 35,
    y: 62,
    spec: "32-channel time-of-flight scanner. Builds 3D fuel maps even through smoke and canopy.",
  },
  {
    id: "rtk",
    label: "RTK GPS",
    x: 50,
    y: 30,
    spec: "Real-Time Kinematic GNSS with base station — 2 cm horizontal accuracy.",
  },
  {
    id: "comms",
    label: "Mesh radio",
    x: 68,
    y: 36,
    spec: "Encrypted mesh + LTE failover. Drones relay video for each other beyond line of sight.",
  },
  {
    id: "payload",
    label: "Payload bay",
    x: 50,
    y: 88,
    spec: "Modular: water/foam canister, retardant, or ignition sphere dispenser (IGNIS).",
  },
  {
    id: "props",
    label: "Propulsion",
    x: 18,
    y: 42,
    spec: "Brushless DC motors, 18–28\" carbon props. Smoke-resistant intakes on industrial models.",
  },
];

export function DroneDiagram() {
  const [active, setActive] = useState<string>("thermal");
  const current = SPECS.find((s) => s.id === active)!;

  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-stretch">
      <div className="relative overflow-hidden border border-rule bg-secondary/30">
        <div className="absolute inset-0 bg-blueprint-grid-sm opacity-60" />
        <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Fig. 03.1 — UAS / cutaway plan
        </div>
        <svg
          viewBox="0 0 100 100"
          className="relative block aspect-[4/3] w-full"
          role="img"
          aria-label="Interactive diagram of a firefighting drone"
        >
          {/* drone body */}
          <g stroke="currentColor" fill="none" strokeWidth="0.4" className="text-foreground/80">
            {/* arms */}
            <line x1="50" y1="50" x2="18" y2="42" />
            <line x1="50" y1="50" x2="82" y2="42" />
            <line x1="50" y1="50" x2="22" y2="72" />
            <line x1="50" y1="50" x2="78" y2="72" />
            {/* rotors */}
            {[
              [18, 42],
              [82, 42],
              [22, 72],
              [78, 72],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="6" />
                <line x1={cx - 5} y1={cy} x2={cx + 5} y2={cy} />
                <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} />
              </g>
            ))}
            {/* body */}
            <rect x="42" y="44" width="16" height="14" rx="1.5" />
            {/* gimbal */}
            <rect x="46" y="62" width="8" height="6" rx="1" />
            <circle cx="50" cy="68" r="3" />
            {/* payload bay */}
            <rect x="44" y="82" width="12" height="8" rx="1" />
            {/* antenna */}
            <line x1="58" y1="44" x2="68" y2="34" />
            <circle cx="68" cy="34" r="1.4" fill="currentColor" />
            {/* RTK */}
            <rect x="48" y="28" width="4" height="4" />
          </g>

          {/* hotspots */}
          {SPECS.map((s) => {
            const isActive = s.id === active;
            return (
              <g
                key={s.id}
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                onClick={() => setActive(s.id)}
                tabIndex={0}
                role="button"
                aria-label={s.label}
                className="cursor-pointer outline-none"
              >
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={isActive ? 2.6 : 1.6}
                  className={isActive ? "fill-signal" : "fill-foreground/40"}
                />
                {isActive && (
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={5}
                    className="fill-none stroke-signal"
                    strokeWidth="0.3"
                  >
                    <animate
                      attributeName="r"
                      values="3;7;3"
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="1;0;1"
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {/* invisible bigger hit area */}
                <circle cx={s.x} cy={s.y} r="5" fill="transparent" />
              </g>
            );
          })}
        </svg>
        <div className="border-t border-rule px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Hover or tap a marker · {SPECS.length} systems
        </div>
      </div>

      <div className="flex flex-col border border-rule bg-background">
        <div className="border-b border-rule px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Spec sheet
        </div>
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="px-5 py-6"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-signal">
            {current.id.toUpperCase()}
          </div>
          <h3 className="mt-3 text-xl font-medium">{current.label}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {current.spec}
          </p>
        </motion.div>
        <div className="mt-auto grid grid-cols-2 gap-px border-t border-rule bg-rule">
          {SPECS.map((s) => (
            <button
              key={s.id}
              onMouseEnter={() => setActive(s.id)}
              onFocus={() => setActive(s.id)}
              onClick={() => setActive(s.id)}
              className={`bg-background px-3 py-2 text-left font-mono text-[10px] uppercase tracking-widest transition ${
                active === s.id ? "text-signal" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
