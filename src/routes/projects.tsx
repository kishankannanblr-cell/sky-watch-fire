import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";
import { ProjectCard, type Project } from "../components/ProjectCard";
import heavyLift from "../assets/project-heavylift.jpg";
import recon from "../assets/project-recon.jpg";
import ignis from "../assets/project-ignis.jpg";
import autonomous from "../assets/project-autonomous.jpg";
import droneDusk from "../assets/drone-dusk.jpg";
import swarm from "../assets/swarm.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "04 — Real-world firefighting drone projects | Aero/Fire" },
      {
        name: "description",
        content:
          "Eight production firefighting drone programs: IGNIS ignition spheres, autonomous response stations, heavy-lift suppression UAS, public-safety quadcopters and more.",
      },
      { property: "og:title", content: "Real-world firefighting drone projects" },
      {
        property: "og:description",
        content: "Eight production drone programs flying wildfires today.",
      },
      { property: "og:image", content: heavyLift },
      { name: "twitter:image", content: heavyLift },
    ],
  }),
  component: Page,
});

const PROJECTS: Project[] = [
  {
    id: "ignis",
    name: "IGNIS",
    org: "Drone Amplified",
    country: "USA",
    tag: "Aerial ignition",
    image: ignis,
    short:
      "Drone-mounted dispenser that drops potassium-permanganate spheres to start safe prescribed burns and tactical backfires.",
    detail:
      "IGNIS replaces helicopter-based plastic sphere dispensers that have been the workhorse of prescribed fire since the 1970s. Mounted under a DJI Matrice or similar industrial drone, it lets ground crews lay precise ignition patterns at a fraction of the cost — and without putting a pilot at low altitude in heavy smoke. It is now used by the U.S. Forest Service, BLM and a long list of state agencies.",
    specs: [
      ["Payload", "~450 spheres / sortie"],
      ["Host airframe", "DJI M300 / M350 RTK"],
      ["Operator", "Single ground operator"],
      ["First deployment", "2018, US Forest Service trials"],
    ],
  },
  {
    id: "rain",
    name: "Autonomous response",
    org: "Rain",
    country: "USA",
    tag: "Initial attack",
    image: autonomous,
    short:
      "Forward-deployed drone stations that launch autonomously the moment a lightning strike or hot-spot is detected nearby.",
    detail:
      "Rain pairs satellite-and-camera ignition detection with weatherized drone hangars staged in high-risk forest. When a new ignition is detected within range, the station opens, a heavy-lift drone launches, navigates to the strike, and begins suppression — often within minutes of ignition, the window where most wildfires can still be stopped. The company has partnered with state agencies, utilities and DoD for testing.",
    specs: [
      ["Mode", "Fully autonomous launch"],
      ["Detection", "Satellite + ground sensors"],
      ["Target", "<10 min to first suppression"],
      ["Partners", "Cal Fire, US DoD, utilities"],
    ],
  },
  {
    id: "parrot",
    name: "Anafi USA",
    org: "Parrot",
    country: "France / USA",
    tag: "Recon",
    image: recon,
    short:
      "NDAA-compliant small quadcopter widely used by US fire departments for size-up, search-and-rescue and incident mapping.",
    detail:
      "Built specifically for US public safety after Chinese-made drones were restricted from federal agencies. 32× zoom EO + FLIR Boson thermal in a 500 g airframe small enough to throw out of a battalion chief's truck. The Anafi USA is one of the most common firefighting drones in North America by sheer unit count.",
    specs: [
      ["Weight", "500 g"],
      ["Sensors", "32× EO + FLIR Boson thermal"],
      ["Flight time", "~32 min"],
      ["Use", "Recon, mapping, search-and-rescue"],
    ],
  },
  {
    id: "heavylift",
    name: "Heavy-lift suppression UAS",
    org: "Aerones / Draganfly",
    country: "Latvia / Canada",
    tag: "Suppression",
    image: heavyLift,
    short:
      "Octocopters carrying 20–200 L water and foam, used in structure fires and to attack the head of small wildland fires.",
    detail:
      "Heavy-lift firefighting drones are the most controversial category — physics caps how much water a battery-powered airframe can deliver. But on structure fires, high-rises and inaccessible wildland edges, a 50–200 L drone with a precision nozzle can hit a target faster and more cheaply than a helicopter. Aerones, Draganfly and several Chinese OEMs ship working systems today.",
    specs: [
      ["Payload", "20–200 L water / foam"],
      ["Endurance", "10–25 min with payload"],
      ["Power", "Battery or tethered"],
      ["Best use", "High-rises, precise spot suppression"],
    ],
  },
  {
    id: "skydio",
    name: "Skydio X10",
    org: "Skydio",
    country: "USA",
    tag: "Autonomous recon",
    image: droneDusk,
    short:
      "Self-flying public-safety drone that obstacle-avoids through smoke, canopy and structures using on-board vision AI.",
    detail:
      "Skydio's airframes are best known for visual-inertial autonomy — they can fly through forest, smoke and degraded GPS environments without constant pilot input. For wildfire, that translates into low-altitude perimeter mapping and post-incident damage assessment without losing the airframe to a tree it didn't see.",
    specs: [
      ["Autonomy", "Onboard VIO + 360° obstacle avoidance"],
      ["Sensors", "Color, low-light, thermal"],
      ["Customers", "US DoD, public safety, utilities"],
      ["Strength", "GPS-denied / smoky flight"],
    ],
  },
  {
    id: "swarm",
    name: "Coordinated swarm patrol",
    org: "Research consortia / DARPA OFFSET",
    country: "Multi-national",
    tag: "Swarm",
    image: swarm,
    short:
      "Programs developing one-operator-to-many UAS doctrine: persistent thermal patrol grids that cover whole watersheds.",
    detail:
      "Multiple research programs — DARPA's OFFSET, EU Horizon projects, university labs — are pushing toward swarms of 20–100 small drones that share a mesh, auto-deconflict and tile a region with thermal coverage. The end state is persistent fire detection over high-risk landscapes, with humans only making the suppression decisions. Operationally, swarms are still rare; doctrinally, they're where the field is heading.",
    specs: [
      ["Scale", "10–100 airframes / operator"],
      ["Comms", "Encrypted mesh + LTE failover"],
      ["Status", "Late-stage research / early ops"],
      ["Goal", "Persistent thermal coverage"],
    ],
  },
];

function Page() {
  return (
    <>
      <PageHeader
        chapter="Chapter 04 / Field deployments"
        title="Six programs flying today."
        lede="A snapshot of the drone systems actually used on wildfires in 2026 — from a $500 ignition-sphere dispenser to fully autonomous response stations. Tap a card to open its file."
        meta={
          <div className="space-y-1 text-right">
            <div>Reading time 4 min</div>
            <div>Click any card</div>
          </div>
        }
      />

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid gap-px bg-rule md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 pb-16 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl text-muted-foreground">
          Last chapter: what it all means for firefighters, communities and the
          ecosystems being fought over.
        </p>
        <Link
          to="/impact"
          className="inline-flex items-center gap-2 self-start rounded-sm bg-primary px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
        >
          Continue → 05 / Impact
        </Link>
      </section>
    </>
  );
}
