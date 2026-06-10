import { createFileRoute, Link } from "@tanstack/react-router";
import thermal from "../assets/thermal-frame.jpg";
import swarm from "../assets/swarm.jpg";
import { PageHeader } from "../components/PageHeader";
import { DroneDiagram } from "../components/DroneDiagram";
import { MissionStepper } from "../components/MissionStepper";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "03 — How firefighting drones work | Aero/Fire" },
      {
        name: "description",
        content:
          "Interactive teardown: thermal imaging, LiDAR, RTK GPS, mesh radios, payloads and the four-phase mission profile of a wildfire drone.",
      },
      { property: "og:title", content: "How firefighting drones work — Aero/Fire" },
      {
        property: "og:description",
        content: "An interactive teardown of a firefighting UAS and its mission profile.",
      },
      { property: "og:image", content: thermal },
      { name: "twitter:image", content: thermal },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        chapter="Chapter 03 / Teardown"
        title="What's actually on the drone."
        lede="Strip away the buzzword stack and a firefighting UAS is six interlocking systems: a thermal eye, a centimeter-accurate GPS, a smoke-aware autopilot, a mesh radio, a modular payload and a propulsion system tuned for hot, ash-laden air."
        meta={
          <div className="space-y-1 text-right">
            <div>Reading time 5 min</div>
            <div>Interactive · click markers</div>
          </div>
        }
      />

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <DroneDiagram />
      </section>

      <section className="border-y border-rule bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-rule pb-3">
            <h2 className="text-2xl font-medium md:text-3xl">
              The four-phase mission
            </h2>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Fig. 03.2 — mission profile
            </div>
          </div>
          <MissionStepper />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Fig. 03.3 — Thermal IR frame, false-color
          </div>
          <div className="mt-2 overflow-hidden border border-rule">
            <img
              src={thermal}
              alt="Thermal IR aerial frame of a forest fire"
              width={1280}
              height={896}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <h3 className="mt-6 text-xl font-medium">Seeing through smoke</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Thermal cameras detect long-wave infrared (7.5–13.5 μm). Smoke
            particles, which scatter visible light heavily, are nearly
            transparent at those wavelengths. That's why a $2,000 thermal core
            outperforms a million-dollar spotter plane the moment the column
            goes black.
          </p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Fig. 03.4 — Coordinated swarm, dusk
          </div>
          <div className="mt-2 overflow-hidden border border-rule">
            <img
              src={swarm}
              alt="Swarm of drones flying in coordinated formation at dusk"
              width={1280}
              height={896}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <h3 className="mt-6 text-xl font-medium">Swarming and tethering</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            One operator can supervise dozens of drones via a shared mesh and
            a planner that auto-deconflicts flight paths. For continuous
            overwatch on a single incident, tethered drones draw power and
            data through a microcable — flight time becomes hours, not
            minutes.
          </p>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="mb-6 flex items-end justify-between gap-6 border-b border-rule pb-3">
            <h2 className="text-2xl font-medium md:text-3xl">Payload taxonomy</h2>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Tbl. 03.1
            </div>
          </div>
          <div className="grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Water / foam", "10–40 L canisters. Targeted dousing of spot fires and rekindles."],
              ["Long-term retardant", "Ammonium phosphate slurry. Heavy-lift only; mostly for line-prep."],
              ["Ignition spheres", "Potassium-permanganate spheres dropped to start safe backfires."],
              ["Sensors only", "Thermal + LiDAR + RGB. The most common payload — situational awareness."],
            ].map(([title, body]) => (
              <div key={title} className="bg-background p-6">
                <h3 className="text-base font-medium">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-16 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl text-muted-foreground">
          Now: who's actually shipping this, and where it's flying.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 self-start rounded-sm bg-primary px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
        >
          Continue → 04 / Projects
        </Link>
      </section>
    </>
  );
}
