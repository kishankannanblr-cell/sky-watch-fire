import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import heroDrone from "../assets/hero-drone.jpg";
import { BlueprintBackground } from "../components/BlueprintBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aero/Fire — Firefighting drones, redrawn from above" },
      {
        name: "description",
        content:
          "An interactive field manual on drone-assisted wildfire response: technology, real projects, and societal impact.",
      },
      { property: "og:title", content: "Aero/Fire — Firefighting drones" },
      {
        property: "og:description",
        content: "Interactive primer on drone-assisted wildfire response.",
      },
      { property: "og:image", content: heroDrone },
      { name: "twitter:image", content: heroDrone },
    ],
  }),
  component: Index,
});

const chapters = [
  {
    n: "01",
    to: "/traditional",
    title: "Traditional firefighting",
    body: "Engines, hotshot crews, helitack and air tankers — the human and machine line that has held wildfire for a century.",
  },
  {
    n: "02",
    to: "/drones",
    title: "Why drones, why now",
    body: "Cheaper sensors, better autonomy and longer fire seasons have pushed UAS from novelty to operational asset.",
  },
  {
    n: "03",
    to: "/how-it-works",
    title: "How it works",
    body: "Interactive teardown of a firefighting UAS: thermal imaging, LiDAR, RTK GPS, payloads and swarm coordination.",
  },
  {
    n: "04",
    to: "/projects",
    title: "Real-world projects",
    body: "From IGNIS ignition spheres to autonomous response stations — eight projects shipping today.",
  },
  {
    n: "05",
    to: "/impact",
    title: "Societal impact",
    body: "Firefighter safety, faster detection, environmental tradeoffs and the policy questions that come with it.",
  },
] as const;

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-rule">
        <BlueprintBackground />
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-6 pt-14 pb-20 md:grid-cols-[1.05fr_1fr] md:items-end md:pt-20 md:pb-28">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
              <span className="inline-block h-2 w-2 bg-signal" />
              Sheet 00 — Cover
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="mt-6 text-[44px] font-medium leading-[0.98] md:text-[88px]"
            >
              Firefighting,
              <br />
              <span className="text-signal">redrawn</span> from above.
            </motion.h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              A short, interactive field manual on how unmanned aircraft are
              quietly rewriting wildfire response — from a hundred years of
              ground-and-tanker doctrine to thermal-eyed swarms that fly the
              fire at night.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/traditional"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-primary-foreground transition hover:bg-primary/90"
              >
                Begin reading →
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-sm border border-rule px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition hover:bg-secondary"
              >
                Jump to the teardown
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-4 -top-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Fig. 00.1 — UAS over active head fire
            </div>
            <div className="overflow-hidden border border-rule">
              <img
                src={heroDrone}
                alt="Firefighting drone silhouetted against wildfire smoke"
                width={1792}
                height={1024}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <div>Lat 39.7392°N</div>
              <div>Lon 104.9903°W</div>
              <div>Alt 120 m AGL</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat ribbon */}
      <section className="border-b border-rule bg-secondary/60">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {[
            ["7.1M ha", "Avg. annual area burned, US (2015–2024)"],
            ["≤ 3 min", "UAS time-to-air vs. ~30 min for a helitack"],
            ["−60%", "Reduction in scout-crew exposure on early IA"],
            ["1,200+", "US public-safety UAS programs in 2024"],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="font-display text-2xl text-signal md:text-3xl">{num}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-rule pb-4">
          <h2 className="text-2xl font-medium md:text-3xl">Chapters</h2>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            05 sections / approx. 12 min read
          </div>
        </div>
        <div className="grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c) => (
            <Link
              key={c.n}
              to={c.to}
              className="group relative flex flex-col bg-background p-6 transition hover:bg-secondary/60"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-signal">
                  {c.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition group-hover:text-foreground">
                  Read →
                </span>
              </div>
              <h3 className="mt-6 text-xl font-medium">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
              <div className="mt-8 h-px w-full bg-rule" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
