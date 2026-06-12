import { useState } from "react";
import thermalSmoke from "../assets/thermal-smoke.jpg";

const palettes = [
  { id: "white", label: "White-Hot", filter: "grayscale(1) contrast(1.15) brightness(1.05)" },
  { id: "black", label: "Black-Hot", filter: "grayscale(1) invert(1) contrast(1.2)" },
  { id: "iron",  label: "Iron",      filter: "sepia(1) hue-rotate(-25deg) saturate(3.2) contrast(1.15)" },
  { id: "rainbow", label: "Rainbow", filter: "saturate(2.8) hue-rotate(200deg) contrast(1.2)" },
];

export function ThermalPaletteToggle() {
  const [active, setActive] = useState("iron");
  const current = palettes.find((p) => p.id === active)!;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="relative">
        <img
          src={thermalSmoke}
          alt="Thermal infrared frame of humans through dense smoke"
          width={1280}
          height={896}
          loading="lazy"
          className="block aspect-[4/3] w-full object-cover transition-[filter] duration-500"
          style={{ filter: current.filter }}
        />
        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ice">
          LWIR 7.5–13.5 μm · {current.label}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 border-t border-white/10 bg-black/40 p-2">
        {palettes.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition ${
              active === p.id
                ? "bg-ember text-black"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
