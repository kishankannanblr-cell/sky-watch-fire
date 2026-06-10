import { createFileRoute, Link } from "@tanstack/react-router";
import droneDusk from "../assets/drone-dusk.jpg";
import { PageHeader } from "../components/PageHeader";

export const Route = createFileRoute("/drones")({
  head: () => ({
    meta: [
      { title: "02 — Why drones, why now | Aero/Fire" },
      {
        name: "description",
        content:
          "Cheaper sensors, better autonomy, longer fire seasons. Why unmanned aircraft moved from novelty to operational wildfire asset.",
      },
      { property: "og:title", content: "Why drones, why now — Aero/Fire" },
      {
        property: "og:description",
        content: "The forces that pushed firefighting drones from demo to deployment.",
      },
      { property: "og:image", content: droneDusk },
      { name: "twitter:image", content: droneDusk },
    ],
  }),
  component: Page,
});

const drivers = [
  ["D.01", "Sensor cost", "Uncooled microbolometers (thermal cameras) dropped ~10× in a decade. A 640×512 thermal core is now under $2k."],
  ["D.02", "Autonomy", "RTK GPS, visual-inertial odometry and on-board planners let drones fly defined missions in smoke, GPS-degraded canyons, and at night."],
  ["D.03", "Comms", "Mesh radios and LTE-in-a-suitcase relays push live video back to Incident Command in seconds, not hours."],
  ["D.04", "Regulation", "BVLOS waivers and Public Safety COAs in the US, plus EASA's Specific category in the EU, made night and beyond-line-of-sight ops possible."],
  ["D.05", "Climate", "Fire seasons have roughly doubled in length since 1980. Crews and tanker fleets are saturated; drones absorb the overflow."],
];

const rows = [
  ["Detection lag", "Lookout / 911 call", "Persistent thermal patrol", "Minutes vs. hours"],
  ["Risk to crew", "Inside the burn", "Operator at the truck", "Personnel removed from the fire"],
  ["Night ops", "Grounded (most aircraft)", "Routine", "24-hour coverage"],
  ["Smoke penetration", "Visual only", "Thermal / IR", "Sees through smoke"],
  ["Payload per sortie", "1,000–19,000 L (tanker)", "10–200 L (heavy UAS)", "Tankers still win on mass"],
  ["Mapping latency", "Post-flight, hours", "Live, on-deck", "Real-time perimeter"],
];

function Page() {
  return (
    <>
      <PageHeader
        chapter="Chapter 02 / Inflection"
        title="The drones got cheap. The fires got bigger."
        lede="UAS have been demoed over wildfires since the early 2000s. What changed in the last five years is not the idea — it's that every input got better at once, and the fire problem got worse."
        meta={
          <div className="space-y-1 text-right">
            <div>Reading time 3 min</div>
            <div>Fig. 02.1 — 02.2</div>
          </div>
        }
      />

      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Fig. 02.1 — Type-2 quadcopter on prescribed burn
          </div>
          <div className="mt-2 overflow-hidden border border-rule">
            <img
              src={droneDusk}
              alt="Firefighting drone hovering over a controlled burn at dusk"
              width={1280}
              height={896}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6 text-[15px] leading-relaxed text-foreground/90">
          <p>
            The drone is not the breakthrough. The breakthrough is what
            happens when you bolt a $2,000 thermal camera, an RTK GPS, a
            mesh radio and an autonomy stack to a $5,000 airframe — and then
            give twenty of them to one operator.
          </p>
          <p>
            Suddenly the Incident Commander has a tool that didn't exist
            before: a persistent, all-weather, smoke-penetrating eye over
            the fire, with no crew at risk inside the perimeter, that runs
            through the night.
          </p>
          <p>
            That's the shift. The chapter below catalogs the five forces
            that made it possible.
          </p>
        </div>
      </section>

      <section className="border-y border-rule bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-rule pb-3">
            <h2 className="text-2xl font-medium md:text-3xl">Five drivers</h2>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Stack converged ~2020–2024
            </div>
          </div>
          <div className="grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-5">
            {drivers.map(([id, title, body]) => (
              <div key={id} className="bg-background p-6">
                <div className="font-mono text-xs uppercase tracking-widest text-signal">
                  {id}
                </div>
                <h3 className="mt-4 text-base font-medium">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="mb-6 flex items-end justify-between gap-6 border-b border-rule pb-3">
          <h2 className="text-2xl font-medium md:text-3xl">
            Traditional vs. drone-assisted
          </h2>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Tbl. 02.1
          </div>
        </div>
        <div className="overflow-x-auto border border-rule">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="bg-secondary/60 text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="border-b border-rule px-4 py-3">Dimension</th>
                <th className="border-b border-l border-rule px-4 py-3">Traditional</th>
                <th className="border-b border-l border-rule px-4 py-3">Drone-assisted</th>
                <th className="border-b border-l border-rule px-4 py-3">Delta</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="odd:bg-background even:bg-secondary/30">
                  <td className="border-b border-rule px-4 py-3 font-medium">{r[0]}</td>
                  <td className="border-b border-l border-rule px-4 py-3 text-muted-foreground">{r[1]}</td>
                  <td className="border-b border-l border-rule px-4 py-3 text-muted-foreground">{r[2]}</td>
                  <td className="border-b border-l border-rule px-4 py-3 text-signal">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 pb-16 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl text-muted-foreground">
          Next: take the airframe apart and see what's actually inside.
        </p>
        <Link
          to="/how-it-works"
          className="inline-flex items-center gap-2 self-start rounded-sm bg-primary px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
        >
          Continue → 03 / How it works
        </Link>
      </section>
    </>
  );
}
