import { createFileRoute, Link } from "@tanstack/react-router";
import crewImg from "../assets/traditional-crew.jpg";
import { PageHeader } from "../components/PageHeader";

export const Route = createFileRoute("/traditional")({
  head: () => ({
    meta: [
      { title: "01 — Traditional firefighting | Aero/Fire" },
      {
        name: "description",
        content:
          "A century of ground crews, engines, helitack and air tankers — the human-and-machine doctrine that drone systems are now augmenting.",
      },
      { property: "og:title", content: "Traditional firefighting — Aero/Fire" },
      {
        property: "og:description",
        content: "How wildfire has been fought for the last hundred years, and where that doctrine breaks down.",
      },
      { property: "og:image", content: crewImg },
      { name: "twitter:image", content: crewImg },
    ],
  }),
  component: Page,
});

const limitations = [
  {
    title: "Visibility",
    body: "Heavy smoke columns hide the fire's edge. Crews and aircraft fly visually, so operations stop when smoke socks in the basin.",
  },
  {
    title: "Crew exposure",
    body: "Engine crews, hand crews and helitack operate inside the burn perimeter. The job is fatal often enough that the deaths have names.",
  },
  {
    title: "Night ops",
    body: "Most aerial assets cannot fly at night over rugged terrain. Fires that calm at night still go unfought, and grow at dawn.",
  },
  {
    title: "Scale",
    body: "A modern megafire can outpace the entire continental tanker fleet. There is simply not enough aircraft, water, or retardant.",
  },
];

function Page() {
  return (
    <>
      <PageHeader
        chapter="Chapter 01 / Baseline"
        title="A hundred years of holding the line."
        lede="Before we talk about drones, it's worth remembering what they are augmenting. Modern wildland firefighting is a remarkably stable doctrine built from four moving parts: ground crews, engines, helitack, and air tankers."
        meta={
          <div className="space-y-1 text-right">
            <div>Reading time 3 min</div>
            <div>Fig. 01.1 — 01.4</div>
          </div>
        }
      />

      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Fig. 01.1 — Hand crew on a flank
          </div>
          <div className="mt-2 overflow-hidden border border-rule">
            <img
              src={crewImg}
              alt="Wildland hotshot crew working a fire line at dusk"
              width={1280}
              height={896}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6 text-[15px] leading-relaxed text-foreground/90">
          <p>
            The basic recipe has barely changed since the U.S. Forest Service
            standardized fire suppression after the 1910 Big Burn. Find the
            fire. Cut a control line around it. Starve it of fuel. Hold the
            line until the weather changes or the fire runs out of country.
          </p>
          <p>
            On the ground that means <em>hotshot</em> and <em>hand crews</em> —
            twenty people with chainsaws, drip torches and Pulaskis cutting a
            band of bare dirt down to mineral soil. Engines push hose lays
            along roads. Helitack crews drop from rotor wash to attack the
            head before it gets into timber.
          </p>
          <p>
            Above them, Single-Engine Air Tankers (SEATs), Type-1 helicopters
            and Very Large Air Tankers (VLATs) drop water, foam and
            long-tailed plumes of red retardant — phosphate slurry that
            doesn't kill the fire so much as slow it down, buying ground
            crews time.
          </p>
          <p>
            The doctrine works. It is also brutally limited.
          </p>
        </div>
      </section>

      <section className="border-y border-rule bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-rule pb-3">
            <h2 className="text-2xl font-medium md:text-3xl">
              Where the line breaks
            </h2>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              04 known limitations
            </div>
          </div>
          <div className="grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-4">
            {limitations.map((l, i) => (
              <div key={l.title} className="bg-background p-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-signal">
                    L.{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    constraint
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-medium">{l.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-16 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium md:text-3xl">
            Drones don't replace this. They sit inside it.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every drone program that works in 2026 plugs into the existing
            Incident Command structure. The next chapter walks through why
            that integration finally clicked.
          </p>
        </div>
        <Link
          to="/drones"
          className="inline-flex items-center gap-2 self-start rounded-sm bg-primary px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-primary-foreground hover:bg-primary/90 md:self-end"
        >
          Continue → 02 / Drones
        </Link>
      </section>
    </>
  );
}
