import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import detectionFrame from "../assets/detection-frame.jpg";

type Box = { id: string; x: number; y: number; w: number; h: number; conf: number; label: string };

const BOXES: Box[] = [
  { id: "p1", x: 22, y: 58, w: 9, h: 18, conf: 0.94, label: "person" },
  { id: "p2", x: 46, y: 64, w: 8, h: 16, conf: 0.88, label: "person" },
  { id: "p3", x: 71, y: 55, w: 10, h: 20, conf: 0.91, label: "person" },
];

export function YoloDetectionDemo() {
  const [shown, setShown] = useState<string[]>([]);
  const [fps, setFps] = useState(46);

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
    const t = setInterval(() => setFps(44 + Math.round(Math.random() * 6)), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
      <img
        src={detectionFrame}
        alt="Thermal aerial frame from a firefighting drone"
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
            {BOXES.filter((b) => shown.includes(b.id)).map((b) => (
              <motion.g
                key={b.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.25"
                  className="text-ember"
                />
                {/* corner ticks */}
                {[
                  [b.x, b.y],
                  [b.x + b.w, b.y],
                  [b.x, b.y + b.h],
                  [b.x + b.w, b.y + b.h],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="0.5" className="fill-ember" />
                ))}
              </motion.g>
            ))}
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
            <div className="mb-1 inline-flex items-center gap-2 rounded-sm bg-ember px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-black">
              {b.label} · {b.conf.toFixed(2)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* HUD chrome */}
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ice">
        <span className="pulse-dot" />
        YOLOv8-Thermal · {fps} fps
      </div>
      <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        FLIR Boson 640×512 · LWIR
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ember">
        Humans detected · {shown.length}
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Smoke opacity · 87%
      </div>
    </div>
  );
}
