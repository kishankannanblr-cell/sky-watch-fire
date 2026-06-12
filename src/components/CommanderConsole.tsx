import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import detectionFrame from "../assets/detection-frame.jpg";

type Detection = {
  id: string;
  conf: number;
  bearing: string;
  dist: string;
  motion: "low" | "moving" | "still";
  ts: string;
};

const SEED: Detection[] = [
  { id: "H-018", conf: 0.94, bearing: "041°", dist: "38 m",  motion: "low",    ts: "00:00:02" },
  { id: "H-019", conf: 0.88, bearing: "065°", dist: "52 m",  motion: "still",  ts: "00:00:05" },
  { id: "H-020", conf: 0.91, bearing: "118°", dist: "71 m",  motion: "moving", ts: "00:00:09" },
];

const ALERTS = [
  "Two humans confirmed, 40 m NE of drone, low motion. IC notified.",
  "New heat signature, sector C. Classifier confidence 0.91.",
  "Mesh link 92% — LTE standby. Detection latency 740 ms.",
];

export function CommanderConsole() {
  const [alert, setAlert] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAlert((a) => (a + 1) % ALERTS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass-panel grid gap-px overflow-hidden rounded-2xl bg-white/[0.04] lg:grid-cols-[1.4fr_1fr]">
      {/* Live tile */}
      <div className="relative bg-black">
        <img
          src={detectionFrame}
          alt="Incident commander live drone feed"
          width={1280}
          height={896}
          loading="lazy"
          className="block aspect-[4/3] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ember/40" />
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-signal">
          <span className="pulse-dot" /> Live · UAS-04
        </div>
        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          740 ms · mesh 92%
        </div>
        {/* alert callout */}
        <div className="absolute inset-x-3 bottom-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={alert}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass-panel flex items-center gap-3 rounded-xl px-3 py-2"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ember text-black">!</span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  IC callout
                </div>
                <div className="text-sm">{ALERTS[alert]}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Detection list + mini map */}
      <div className="flex flex-col bg-black/40">
        <div className="border-b border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Detections · auto-relayed
        </div>
        <ul className="divide-y divide-white/5">
          {SEED.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ember/15 text-ember">
                  ◉
                </span>
                <div>
                  <div className="text-sm">
                    {d.id} <span className="text-muted-foreground">· person</span>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {d.bearing} · {d.dist} · {d.motion}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs text-ice">{d.conf.toFixed(2)}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {d.ts}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* mini map */}
        <div className="relative mt-auto h-44 border-t border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,oklch(1_0_0_/_0.08)_1px,transparent_0)] [background-size:14px_14px]" />
          <div className="absolute inset-x-0 top-3 px-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Sector map · WGS-84
          </div>
          {/* drone */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-ice/20 text-ice">▲</div>
          </div>
          {/* pings */}
          {[
            { x: "62%", y: "38%" },
            { x: "70%", y: "52%" },
            { x: "78%", y: "30%" },
          ].map((p, i) => (
            <div key={i} className="absolute" style={{ left: p.x, top: p.y }}>
              <span className="relative grid h-3 w-3 place-items-center">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-ember/40" />
                <span className="relative h-2 w-2 rounded-full bg-ember" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
