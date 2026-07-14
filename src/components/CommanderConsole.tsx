import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import detectionFrame from "../assets/detection-frame.jpg";

type Status = "pending" | "confirmed" | "dismissed";

type Detection = {
  id: string;
  conf: number;
  bearing: number; // degrees from north
  dist: number; // meters
  motion: "low" | "moving" | "still";
  arriveAt: number; // ms after cycle start
};

const SEED: Detection[] = [
  { id: "H-018", conf: 0.94, bearing: 41,  dist: 38, motion: "low",    arriveAt: 400 },
  { id: "H-019", conf: 0.88, bearing: 65,  dist: 52, motion: "still",  arriveAt: 2800 },
  { id: "H-020", conf: 0.91, bearing: 118, dist: 71, motion: "moving", arriveAt: 5200 },
];

const CYCLE_MS = 16000;

function fmtTime(ms: number) {
  const total = Math.floor(ms / 1000);
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `00:${m}:${s}`;
}

function bearingToXY(bearing: number, dist: number) {
  // Map drone at (100,100) in a 200x200 viewBox; 1m ≈ 1.0 svg units (scale to fit ~90m).
  const rad = (bearing * Math.PI) / 180;
  return {
    x: 100 + Math.sin(rad) * dist,
    y: 100 - Math.cos(rad) * dist,
  };
}

export function CommanderConsole() {
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [visible, setVisible] = useState<string[]>([]);
  const [confirmedAt, setConfirmedAt] = useState<Record<string, string>>({});
  const [callout, setCallout] = useState<{ key: number; tone: "alert" | "ok" | "muted"; text: string }>({
    key: 0,
    tone: "alert",
    text: "Awaiting first detection from UAS-04…",
  });
  const [hoverId, setHoverId] = useState<string | null>(null);
  const calloutKey = useRef(0);
  const cycleStart = useRef(Date.now());

  const pushCallout = (tone: "alert" | "ok" | "muted", text: string) => {
    calloutKey.current += 1;
    setCallout({ key: calloutKey.current, tone, text });
  };

  // Cycle: stream detections in, then reset 4s after the last action.
  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    const startCycle = () => {
      cycleStart.current = Date.now();
      setStatuses({});
      setVisible([]);
      setConfirmedAt({});
      pushCallout("muted", "Sweep in progress · UAS-04 advancing on sector C");
      SEED.forEach((d) => {
        timers.push(
          setTimeout(() => {
            setVisible((v) => (v.includes(d.id) ? v : [...v, d.id]));
            setStatuses((s) => ({ ...s, [d.id]: "pending" }));
            pushCallout(
              "alert",
              `New detection ${d.id} · bearing ${String(d.bearing).padStart(3, "0")}° · conf ${d.conf.toFixed(2)} — awaiting confirmation`,
            );
          }, d.arriveAt),
        );
      });
    };
    startCycle();
    const loop = setInterval(startCycle, CYCLE_MS);
    return () => {
      clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, []);

  const decide = (id: string, next: Status) => {
    setStatuses((s) => ({ ...s, [id]: next }));
    if (next === "confirmed") {
      setConfirmedAt((c) => ({ ...c, [id]: fmtTime(Date.now() - cycleStart.current) }));
      pushCallout("ok", `${id} confirmed by IC. Relayed to ground crews — Eng-3, Truck-1.`);
    } else {
      pushCallout("muted", `${id} dismissed — flagged for retraining queue.`);
    }
  };

  const counts = useMemo(() => {
    const all = visible.length;
    let c = 0, d = 0, p = 0;
    visible.forEach((id) => {
      const s = statuses[id];
      if (s === "confirmed") c++;
      else if (s === "dismissed") d++;
      else p++;
    });
    return { all, c, d, p };
  }, [visible, statuses]);

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
        <div className="absolute inset-x-3 bottom-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={callout.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass-panel flex items-center gap-3 rounded-xl px-3 py-2"
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-full text-black ${
                  callout.tone === "alert"
                    ? "bg-ember"
                    : callout.tone === "ok"
                    ? "bg-ice"
                    : "bg-white/30"
                }`}
              >
                {callout.tone === "alert" ? "!" : callout.tone === "ok" ? "✓" : "·"}
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  IC callout
                </div>
                <div className="text-sm">{callout.text}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Detection queue + map */}
      <div className="flex flex-col bg-black/40">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Detection queue · human-in-the-loop</span>
          <span className="text-ember">{counts.p} pending</span>
        </div>
        <ul className="divide-y divide-white/5">
          <AnimatePresence initial={false}>
            {SEED.filter((d) => visible.includes(d.id)).map((d) => {
              const status = statuses[d.id] ?? "pending";
              const isHover = hoverId === d.id;
              return (
                <motion.li
                  key={d.id}
                  initial={{ opacity: 0, x: 16, backgroundColor: "rgba(255,106,61,0.18)" }}
                  animate={{
                    opacity: status === "dismissed" ? 0.4 : 1,
                    x: 0,
                    backgroundColor: isHover ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.5 }}
                  onMouseEnter={() => setHoverId(d.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className="px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-full ${
                          status === "confirmed"
                            ? "bg-ice/15 text-ice"
                            : status === "dismissed"
                            ? "bg-white/10 text-muted-foreground"
                            : "bg-ember/15 text-ember"
                        }`}
                      >
                        {status === "pending" ? (
                          <span className="relative grid h-2.5 w-2.5 place-items-center">
                            <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-ember/60" />
                            <span className="relative h-2 w-2 rounded-full bg-ember" />
                          </span>
                        ) : status === "confirmed" ? (
                          "✓"
                        ) : (
                          "×"
                        )}
                      </span>
                      <div>
                        <div
                          className={`text-sm ${
                            status === "dismissed" ? "text-muted-foreground line-through" : ""
                          }`}
                        >
                          {d.id} <span className="text-muted-foreground">· person</span>
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {String(d.bearing).padStart(3, "0")}° · {d.dist} m · {d.motion}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs text-ice">{d.conf.toFixed(2)}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {confirmedAt[d.id] ?? fmtTime(d.arriveAt)}
                      </div>
                    </div>
                  </div>
                  {status === "pending" && (
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => decide(d.id, "confirmed")}
                        className="flex-1 rounded-md border border-ice/40 bg-ice/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ice transition hover:bg-ice/20"
                      >
                        ✓ Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => decide(d.id, "dismissed")}
                        className="flex-1 rounded-md border border-white/15 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition hover:bg-white/10"
                      >
                        × Dismiss
                      </button>
                    </div>
                  )}
                  {status === "confirmed" && (
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ice">
                      ✓ Confirmed by IC · {confirmedAt[d.id]} · relayed
                    </div>
                  )}
                  {status === "dismissed" && (
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      × Dismissed · sent to retraining queue
                    </div>
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {/* Queue footer */}
        <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {counts.all} detected · <span className="text-ice">{counts.c} confirmed</span> ·{" "}
          {counts.d} dismissed · <span className="text-ember">{counts.p} pending</span>
        </div>

        {/* Sector map */}
        <div className="relative mt-auto h-64 border-t border-white/10 bg-black/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,oklch(1_0_0_/_0.07)_1px,transparent_0)] [background-size:14px_14px]" />
          <div className="absolute inset-x-0 top-3 flex items-center justify-between px-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Sector map · WGS-84</span>
            <span className="text-ice">N ↑</span>
          </div>

          <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id="droneGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(124,196,255)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="rgb(124,196,255)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="fireGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(255,106,61)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="rgb(255,106,61)" stopOpacity="0.02" />
              </radialGradient>
            </defs>

            {/* topographic contours */}
            {[35, 55, 75].map((r) => (
              <circle
                key={r}
                cx="100"
                cy="100"
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.6"
                strokeDasharray="2 3"
              />
            ))}

            {/* fire perimeter — organic blob, breathing */}
            <motion.g
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "150px 70px" } as React.CSSProperties}
            >
              <path
                d="M 130 40 Q 165 35 175 60 Q 188 80 170 100 Q 155 115 135 105 Q 115 95 118 75 Q 120 50 130 40 Z"
                fill="url(#fireGrad)"
                stroke="rgb(255,106,61)"
                strokeOpacity="0.55"
                strokeWidth="0.8"
                strokeDasharray="3 2"
              />
            </motion.g>

            {/* drone FOV cone — 60° pointing N-NE */}
            <g transform="rotate(30 100 100)">
              <path
                d="M 100 100 L 70 30 A 70 70 0 0 1 130 30 Z"
                fill="url(#droneGlow)"
                opacity="0.55"
              />
            </g>

            {/* drone glyph — slow drift */}
            <motion.g
              animate={{ x: [0, 3, -2, 0], y: [0, -2, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="100" cy="100" r="6" fill="rgba(124,196,255,0.15)" stroke="rgb(124,196,255)" strokeWidth="0.6" />
              <polygon points="100,93 105,103 100,100 95,103" fill="rgb(124,196,255)" />
              <line x1="100" y1="100" x2="100" y2="78" stroke="rgb(124,196,255)" strokeWidth="0.4" strokeDasharray="1 2" />
            </motion.g>

            {/* survivor pins */}
            {SEED.filter((d) => visible.includes(d.id)).map((d) => {
              const { x, y } = bearingToXY(d.bearing, d.dist);
              const status = statuses[d.id] ?? "pending";
              if (status === "dismissed") return null;
              const color = status === "confirmed" ? "rgb(124,196,255)" : "rgb(255,106,61)";
              const isHover = hoverId === d.id;
              return (
                <g key={d.id}>
                  {status === "pending" && (
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill={color}
                      fillOpacity="0.35"
                      animate={{ r: [3, 8, 3], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHover ? 3 : 2.2}
                    fill={color}
                    stroke="white"
                    strokeOpacity={isHover ? 0.9 : 0.3}
                    strokeWidth="0.4"
                  />
                  <text
                    x={x + 4}
                    y={y - 3}
                    fill={color}
                    fontSize="4"
                    fontFamily="ui-monospace, monospace"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {d.id}
                  </text>
                </g>
              );
            })}

            {/* scale bar */}
            <g transform="translate(12 184)">
              <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
              <line x1="0" y1="-2" x2="0" y2="2" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
              <line x1="40" y1="-2" x2="40" y2="2" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
              <text x="0" y="-3" fill="rgba(255,255,255,0.55)" fontSize="3.5" fontFamily="ui-monospace, monospace">
                0 — 40 m
              </text>
            </g>
          </svg>

          {/* legend */}
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1"><span className="text-ice">▲</span> UAS-04</span>
            <span className="flex items-center gap-1"><span className="text-ember">◉</span> Survivor</span>
            <span className="flex items-center gap-1"><span className="text-ember/70">░</span> Fire perimeter</span>
          </div>
        </div>
      </div>
    </div>
  );
}
