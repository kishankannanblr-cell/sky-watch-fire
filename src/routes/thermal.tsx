import { createFileRoute, Link } from "@tanstack/react-router";
import thermalSmoke from "../assets/thermal-smoke.jpg";
import thermalDebris from "../assets/thermal-debris.jpg";
import { PageHero } from "../components/PageHero";
import { ThermalPaletteToggle } from "../components/ThermalPaletteToggle";

export const Route = createFileRoute("/thermal")({
  head: () => ({
    meta: [
      { title: "Thermal AI — LWIR + smoke physics | PYRA Vision" },
      {
        name: "description",
        content:
          "Why long-wave infrared cuts through smoke, how false-color palettes change what the model sees, and how thermal fuses with RGB and LiDAR in debris scenes.",
      },
      { property: "og:title", content: "Thermal AI — LWIR + smoke physics" },
      {
        property: "og:description",
        content: "How thermal imaging makes humans visible through wildfire smoke.",
      },
      { property: "og:image", content: thermalSmoke },
      { name: "twitter:image", content: thermalSmoke },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        chapter="02 / Thermal AI"
        title={
          <>
            Smoke is opaque to your eye.{" "}
            <span className="text-foreground/40">It's nearly transparent at 10 μm.</span>
          </>
        }
        lede="A firefighting drone's primary sensor isn't a 4K camera — it's a long-wave infrared core. The wavelengths it captures pass through smoke particles that scatter visible light, so a human at 37 °C lights up like a flare against a 600 °C background."
      />

      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        <ThermalPaletteToggle />
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ember">
            False-color palettes
          </div>
          <h2 className="mt-3 text-2xl font-medium md:text-3xl">
            Same scene, four interpretations.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A thermal sensor returns a single-channel image of apparent
            temperature. False-color palettes are how humans (and our
            datasets) read it. <strong className="text-foreground">White-Hot</strong>{" "}
            is the operator default; <strong className="text-foreground">Iron</strong>{" "}
            is what most YOLO thermal training sets normalize against;{" "}
            <strong className="text-foreground">Rainbow</strong> exaggerates
            mid-range deltas useful for triage on debris fields.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>• Sensor: FLIR Boson 640×512, 50° HFOV, 60 Hz</li>
            <li>• Spectral band: 7.5 – 13.5 μm (LWIR)</li>
            <li>• NETD: &lt;50 mK — sub-tenth-degree sensitivity</li>
            <li>• Frame fused with RGB at the model input layer (early fusion)</li>
          </ul>
        </div>
      </section>

      {/* Why smoke is transparent */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ember">
              03 / Physics
            </div>
            <h2 className="mt-3 text-2xl font-medium md:text-3xl">
              Mie scattering, in one paragraph.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Smoke particles are roughly 0.1 – 1 μm — comparable to the
              wavelength of visible light (0.4 – 0.7 μm), which is exactly
              the size regime that scatters most violently. At 7.5 – 13.5 μm
              the same particles are an order of magnitude smaller than the
              wavelength, so they barely interact. The drone's thermal core
              looks through smoke the way your eyes look through clean glass.
              The model gets a clean signal even when the visible feed is
              opaque black.
            </p>
            <p className="mt-4 text-muted-foreground">
              That's why a $2,000 thermal sensor and a YOLO weight file beat
              a $4M spotter aircraft the moment the column goes black.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img
              src={thermalSmoke}
              alt="Thermal aerial view of two humans through dense smoke"
              width={1280}
              height={896}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Debris fusion */}
      <section className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img
            src={thermalDebris}
            alt="Thermal view of heat signatures under collapsed building debris"
            width={1280}
            height={896}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ember">
            04 / Debris scenes
          </div>
          <h2 className="mt-3 text-2xl font-medium md:text-3xl">
            Thermal + LiDAR for collapses and rubble.
          </h2>
          <p className="mt-4 text-muted-foreground">
            In a structure collapse, the human heat signature is partially
            occluded by concrete and metal. The drone fuses LiDAR point
            clouds with thermal frames: the model now sees both the body
            heat <em>and</em> the void it's trapped in. That dramatically
            cuts false positives from hot rebar and burning insulation,
            which would otherwise pull rescue effort to the wrong spot.
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 pb-16 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl text-muted-foreground">
          Next: the three scenarios where this stack actually saves people.
        </p>
        <Link
          to="/missions"
          className="inline-flex items-center gap-2 self-start rounded-full bg-foreground px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-background hover:bg-foreground/90"
        >
          Continue → Missions
        </Link>
      </section>
    </>
  );
}
