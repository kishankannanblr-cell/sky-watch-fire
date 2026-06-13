import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import detectionFrame from "../assets/detection-frame.jpg";

type Box = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  conf: number;
  label: string;
  trackId: string;
  tempC: number;
  posture: string;
  rangeM: number;
};

const BOXES: Box[] = [
  { id: "p1", x: 21, y: 58, w: 11, h: 18, conf: 0.94, label: "person", trackId: "trk_0427", tempC: 34.8, posture: "prone", rangeM: 18 },
  { id: "p2", x: 45, y: 63, w: 10, h: 16, conf: 0.88, label: "person", trackId: "trk_0431", tempC: 33.1, posture: "crawling", rangeM: 22 },
  { id: "p3", x: 70, y: 55, w: 11, h: 20, conf: 0.91, label: "person", trackId: "trk_0435", tempC: 35.6, posture: "prone", rangeM: 16 },
];

export function YoloDetectionDemo() {
  const [shown, setShown] = useState<string[]>([]);
  const [fps, setFps] = useState(46);
  const [confs, setConfs] = useState<Record<string, number>>(
    Object.fromEntries(BOXES.map((b) => [b.id, b.conf])),
  );
  const [temps, setTemps] = useState<Record<string, number>>(
    Object.fromEntries(BOXES.map((b) => [b.id, b.tempC])),
  );
  const [ambient, setAmbient] = useState(62);
  const [hotSpots, setHotSpots] = useState(2);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i < BOXES.length) {
        const id = BOXES[i].id;
        setShown((s) => (s.includes(id) ? s : [...s, id]));
        i++;
      } else {
        clearInterval(t);
      }
    }, 700);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      // Smoothed FPS drift around 47
      setFps((f) => Math.round((f * 0.6 + (45 + Math.random() * 4) * 0.4) * 10) / 10);
      // Confidence + temp jitter per target
      setConfs((c) => {
        const next: Record<string, number> = {};
        for (const b of BOXES) {
          const cur = c[b.id] ?? b.conf;
          const drift = (Math.random() - 0.5) * 0.02;
          next[b.id] = Math.max(0.78, Math.min(0.98, cur + drift));
        }
        return next;
      });
      setTemps((tm) => {
        const next: Record<string, number> = {};
        for (const b of BOXES) {
          const cur = tm[b.id] ?? b.tempC;
          const drift = (Math.random() - 0.5) * 0.4;
          next[b.id] = Math.round((cur + drift) * 10) / 10;
        }
        return next;
      });
      setAmbient((a) => Math.round((a * 0.7 + (60 + Math.random() * 6) * 0.3) * 10) / 10);
      setHotSpots(2 + Math.round(Math.random()));
    }, 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
      <img
        src={detectionFrame}
        alt="Thermal aerial frame from a firefighting drone, three partial human heat signatures visible through smoke"
        width={1280}
        height={896}
        loading="lazy"
        className="block aspect-[4/3] w-full object-cover"
      />
      {/* scanline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ice/80 shadow-[0_0_18px_2px] shadow-ice/60 animate-scanline" />

      {/* HUD overlay */}
      <div className="pointer-events-none absolute inset-0">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <AnimatePresence>
            {BOXES.filter((b) => shown.includes(b.id)).map((b) => {
              const cx = b.x + b.w / 2;
              const cy = b.y + b.h / 2;
              return (
                <motion.g
                  key={b.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="text-ember"
                >
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.2"
                  />
                  {/* corner ticks */}
                  {[
                    [b.x, b.y],
                    [b.x + b.w, b.y],
                    [b.x, b.y + b.h],
                    [b.x + b.w, b.y + b.h],
                  ].map(([tx, ty], idx) => (
                    <circle key={idx} cx={tx} cy={ty} r="0.5" className="fill-ember" />
                  ))}
                  {/* centroid crosshair — temperature sample point */}
                  <line x1={cx - 1.2} y1={cy} x2={cx + 1.2} y2={cy} stroke="currentColor" strokeWidth="0.15" />
                  <line x1={cx} y1={cy - 1.2} x2={cx} y2={cy + 1.2} stroke="currentColor" strokeWidth="0.15" />
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>

        {/* labels positioned over image */}
        {BOXES.filter((b) => shown.includes(b.id)).map((b) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -translate-y-full"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
          >
            <div className="mb-1 inline-block rounded-sm bg-ember px-2 py-1 font-mono text-[9px] uppercase leading-tight tracking-widest text-black">
              <div>
                {b.label} · {(confs[b.id] ?? b.conf).toFixed(2)} · {b.trackId}
              </div>
              <div className="opacity-80">
                {(temps[b.id] ?? b.tempC).toFixed(1)}°C · {b.posture} · {b.rangeM} m
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* HUD chrome — top */}
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ice">
        <span className="pulse-dot" />
        YOLOv8-Thermal · {fps.toFixed(1)} fps · conf ≥ 0.60
      </div>
      <div className="pointer-events-none absolute right-3 top-3 flex flex-col items-end gap-1">
        <div className="rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          FLIR Boson 640×512 · LWIR
        </div>
        <div className="rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Palette: White-Hot · AGC on
        </div>
      </div>

      {/* Scene analysis panel — bottom left */}
      <div className="pointer-events-none absolute bottom-3 left-3 w-[260px] rounded-md border border-white/10 bg-black/70 p-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-1.5 text-ember">
          <span>Scene analysis</span>
          <span className="pulse-dot" />
        </div>
        <dl className="space-y-1">
          <div className="flex justify-between gap-2">
            <dt>Humans detected</dt>
            <dd className="text-foreground">{shown.length}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Ambient (LWIR avg)</dt>
            <dd className="text-foreground">{ambient.toFixed(1)}°C</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Hot spots &gt;400°C</dt>
            <dd className="text-ember">{hotSpots} · active fire</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Structural debris</dt>
            <dd className="text-foreground">NW quadrant</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Smoke opacity</dt>
            <dd className="text-foreground">87% · vis ≪ 2 m</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Egress (S corridor)</dt>
            <dd className="text-ember">blocked</dd>
          </div>
        </dl>
      </div>

      {/* Bottom right — flight telemetry */}
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-md border border-white/10 bg-black/70 p-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
        <div className="space-y-1 text-right">
          <div>AGL 42 m · gimbal −38°</div>
          <div>RTK fix · mesh −71 dBm</div>
          <div className="text-ice">yolov8s-thermal · v3.2 · 9f1c</div>
        </div>
      </div>
    </div>
  );
}
