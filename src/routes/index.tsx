import { createFileRoute, Link } from "@tanstack/react-router";
import heroThermal from "../assets/hero-thermal.jpg";
import { HeroFuturistic } from "../components/HeroFuturistic";
import { LogoStrip } from "../components/LogoStrip";
import { StatCounter } from "../components/StatCounter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PYRA / Vision — AI firefighting drones that find people through smoke" },
      {
        name: "description",
        content:
          "AI-assisted firefighting drones: thermal cameras and YOLO models detect humans through dense smoke and debris, relaying every find to the incident commander in under a second.",
      },
      { property: "og:title", content: "PYRA / Vision — AI firefighting drones" },
      {
        property: "og:description",
        content:
          "Thermal + YOLO human detection, live-relayed to the incident commander.",
      },
      { property: "og:image", content: heroThermal },
      { name: "twitter:image", content: heroThermal },
    ],
  }),
  component: Index,
});

const triad = [
  {
    code: "01",
    title: "Detect",
    body: "A thermal-tuned YOLO model finds humans through smoke at 45+ FPS on the drone's edge GPU. Recall stays above 90% where RGB collapses to noise.",
    accent: "text-ember",
  },
  {
    code: "02",
    title: "Communicate",
    body: "Every confirmed detection becomes a structured message: ID, GPS, bearing, confidence, motion. Pushed to the IC over an encrypted mesh with LTE failover.",
    accent: "text-ice",
  },
  {
    code: "03",
    title: "Stream",
    body: "The live thermal video tile keeps the commander in the loop — with bounding boxes, audible callouts and a moving sector map of every active heat signature.",
    accent: "text-signal",
  },
];

function Index() {
  return (
    <>
      <HeroFuturistic />

      {/* Why AI on the drone */}
      <section className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
              Why AI on the drone
            </div>
            <h2 className="mt-4 text-3xl font-medium md:text-5xl">
              A human eye can't see through a black smoke column. A model can.
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              Long-wave infrared sees right through smoke. A neural network
              trained on thermal frames of people — standing, crawling, prone,
              partly buried — converts that raw heat into a list of survivors
              with coordinates. Doing that inference on the drone, not in a
              datacenter, is what keeps the loop under one second.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/detection"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-background hover:bg-foreground/90"
              >
                YOLO detection →
              </Link>
              <Link
                to="/thermal"
                className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-white/10"
              >
                Thermal physics
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img
              src={heroThermal}
              alt="Thermal drone view of two humans through wildfire smoke"
              width={1600}
              height={1024}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Triad */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="text-2xl font-medium md:text-4xl">
            The AI loop: detect, communicate, stream.
          </h2>
          <div className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:block">
            Pipeline overview
          </div>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3">
          {triad.map((t) => (
            <div key={t.code} className="bg-background p-8">
              <div className={`font-mono text-xs uppercase tracking-widest ${t.accent}`}>
                {t.code} · {t.title}
              </div>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <StatCounter value={740} suffix=" ms" label="End-to-end detection latency" />
          <StatCounter value={92} suffix="%" label="Recall on humans in dense smoke" />
          <StatCounter value={47} suffix=" FPS" label="YOLOv8 on Jetson Orin, edge" />
          <StatCounter value={3} prefix="< " suffix=" min" label="UAS time-to-air on dispatch" />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-6 py-24">
        <div className="glass-panel flex flex-col items-start justify-between gap-6 rounded-2xl p-8 md:flex-row md:items-center md:p-12">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ember">
              Continue
            </div>
            <h3 className="mt-2 text-2xl font-medium md:text-3xl">
              See the YOLO model find people through smoke.
            </h3>
          </div>
          <Link
            to="/detection"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-background hover:bg-foreground/90"
          >
            Open detection →
          </Link>
        </div>
        <LogoStrip />
      </section>
    </>
  );
}
