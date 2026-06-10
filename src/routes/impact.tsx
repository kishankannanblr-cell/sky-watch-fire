import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { StatCounter } from "../components/StatCounter";
import heroDrone from "../assets/hero-drone.jpg";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "05 — Societal impact | Aero/Fire" },
      {
        name: "description",
        content:
          "Firefighter safety, faster detection, environmental tradeoffs and the policy questions raised by drone-assisted wildfire response.",
      },
      { property: "og:title", content: "Societal impact of firefighting drones" },
      {
        property: "og:description",
        content: "What changes when wildfire response becomes partly unmanned.",
      },
      { property: "og:image", content: heroDrone },
      { name: "twitter:image", content: heroDrone },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        chapter="Chapter 05 / Impact"
        title="What changes when the line flies itself."
        lede="Drones don't put firefighters out of work — there are not nearly enough of them. What drones change is who has to stand inside the burn, who gets warned before the fire reaches town, and how fast a forest can be re-monitored after the smoke clears."
        meta={
          <div className="space-y-1 text-right">
            <div>Reading time 3 min</div>
            <div>End of manual</div>
          </div>
        }
      />

      <section className="border-b border-rule bg-secondary/40">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-4">
          <StatCounter value={60} suffix="%" label="Drop in scout-crew exposure on early IA" />
          <StatCounter value={3} suffix=" min" label="Avg. drone time-to-air vs. ~30 min helitack" />
          <StatCounter value={24} suffix=" hr" label="Continuous overwatch (vs. daylight-only)" />
          <StatCounter value={1200} suffix="+" label="US public-safety UAS programs (2024)" />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-medium md:text-3xl">Where it helps</h2>
          <ul className="mt-6 space-y-5 text-[15px] text-muted-foreground">
            <li>
              <strong className="text-foreground">Firefighter safety.</strong>{" "}
              Scout missions, size-up and hot-spot tracking — the jobs that
              historically killed people — move off the line and into a pilot
              seat at the truck.
            </li>
            <li>
              <strong className="text-foreground">Faster detection.</strong>{" "}
              Thermal patrols and autonomous response stations close the gap
              between ignition and first water from hours to minutes, the
              window where most fires can still be stopped.
            </li>
            <li>
              <strong className="text-foreground">Night operations.</strong>{" "}
              Drones fly the hours when fires lay down and crews go home —
              the calm window where the perimeter could have been held but
              wasn't, historically, fought.
            </li>
            <li>
              <strong className="text-foreground">Better prescribed burns.</strong>{" "}
              IGNIS-style aerial ignition makes fuel-treatment burns cheaper
              and safer, so more of them happen — the only known way to
              actually reduce megafire risk at landscape scale.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-medium md:text-3xl">Where it's hard</h2>
          <ul className="mt-6 space-y-5 text-[15px] text-muted-foreground">
            <li>
              <strong className="text-foreground">Airspace deconfliction.</strong>{" "}
              Civilian drones flown by onlookers have grounded crewed
              firefighting aircraft on real incidents. Drone integration
              cuts both ways.
            </li>
            <li>
              <strong className="text-foreground">Privacy &amp; surveillance.</strong>{" "}
              The same thermal and high-zoom sensors that find a smoldering
              stump can find a person in their backyard. Public-safety drone
              policy is still being written.
            </li>
            <li>
              <strong className="text-foreground">Payload physics.</strong>{" "}
              A drone will never out-deliver a Very Large Air Tanker on
              gallons of retardant. Drones augment — they don't replace —
              crewed aerial firefighting.
            </li>
            <li>
              <strong className="text-foreground">Procurement &amp; supply chain.</strong>{" "}
              Most affordable airframes are still Chinese-built; US and EU
              agencies are now navigating restrictions while domestic
              alternatives ramp.
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="mb-6 border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Further reading
          </div>
          <ul className="grid gap-3 text-sm md:grid-cols-2">
            {[
              ["U.S. Forest Service — UAS Program", "https://www.fs.usda.gov/managing-land/fire/uas"],
              ["National Interagency Fire Center", "https://www.nifc.gov/"],
              ["FAA — Public Safety & First Responders", "https://www.faa.gov/uas/public_safety_gov"],
              ["Drone Amplified — IGNIS", "https://droneamplified.com/"],
              ["Rain — autonomous wildfire response", "https://rain.aero/"],
              ["Skydio — public safety", "https://www.skydio.com/public-safety"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-rule py-3 transition hover:text-signal"
                >
                  <span>{label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition group-hover:text-signal">
                    open ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 pb-16 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl text-muted-foreground">
          End of sheet. Return to the index to re-read any chapter.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 self-start rounded-sm border border-rule px-4 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-secondary"
        >
          ← Back to index
        </Link>
      </section>
    </>
  );
}
