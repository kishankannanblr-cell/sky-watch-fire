import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type Project = {
  id: string;
  name: string;
  org: string;
  country: string;
  tag: string;
  image: string;
  short: string;
  detail: string;
  specs: [string, string][];
};

export function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex flex-col bg-background text-left transition hover:bg-secondary/40"
      >
        <div className="relative overflow-hidden border-b border-rule">
          <img
            src={p.image}
            alt={`${p.name} — illustrative image`}
            width={1024}
            height={768}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3 bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
            {p.tag}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-medium">{p.name}</h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {p.country}
            </span>
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {p.org}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{p.short}</p>
          <div className="mt-5 font-mono text-[10px] uppercase tracking-widest text-signal">
            Open file →
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 md:items-center md:p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-rule bg-background"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 rounded-sm bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-secondary"
              >
                Close ✕
              </button>
              <img
                src={p.image}
                alt=""
                width={1024}
                height={768}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-6 md:p-8">
                <div className="font-mono text-[11px] uppercase tracking-widest text-signal">
                  {p.tag} · {p.country}
                </div>
                <h2 className="mt-3 text-3xl font-medium">{p.name}</h2>
                <div className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {p.org}
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                  {p.detail}
                </p>
                <div className="mt-6 grid gap-px border border-rule bg-rule md:grid-cols-2">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="bg-background px-4 py-3">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {k}
                      </div>
                      <div className="mt-1 text-sm">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
