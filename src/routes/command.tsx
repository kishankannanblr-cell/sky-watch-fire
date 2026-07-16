import { createFileRoute, Link } from "@tanstack/react-router";
import detectionFrame from "../assets/detection-frame.jpg";
import { PageHero } from "../components/PageHero";
import { CommanderConsole } from "../components/CommanderConsole";
import { PriorityRankBoard } from "../components/PriorityRankBoard";
import { CommandTelemetry } from "../components/CommandTelemetry";

export const Route = createFileRoute("/command")({
  head: () => ({
    meta: [
      { title: "Command — IC relay & live console | PYRA Vision" },
      {
        name: "description",
        content:
          "How AI detections from a firefighting drone reach the incident commander: structured messages, audible callouts, a live video tile, and human-in-the-loop confirmation.",
      },
      { property: "og:title", content: "Incident commander relay" },
      {
        property: "og:description",
        content: "Live AI detections, in front of the person making the call.",
      },
      { property: "og:image", content: detectionFrame },
      { name: "twitter:image", content: detectionFrame },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        chapter="04 / Command"
        title={
          <>
            Detection without delivery is noise.{" "}
            <span className="text-foreground/40">This is the delivery.</span>
          </>
        }
        lede="The drone's job ends the moment a confirmed detection lands in front of the incident commander. The console below is what that delivery looks like — a live tile, a structured detection list, a sector pin, and a spoken callout the IC hears in their headset. Below that, the Priority Rank board turns each confirmed detection into an ordered dispatch call."
      />

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <CommanderConsole />
      </section>

      <section className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ember">
                04.1 / Telemetry
              </div>
              <h2 className="mt-3 text-2xl font-medium md:text-3xl">
                Live latency &amp; confidence.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Hover any bar or point for exact values. Toggle stages in the legend, or drag the brush on the confidence chart to zoom a time range.
              </p>
            </div>
          </div>
          <CommandTelemetry />
        </div>
      </section>

      {/* Priority Ranking */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ember">
                05 / Priority Rank
              </div>
              <h2 className="mt-3 text-2xl font-medium md:text-3xl">
                From confidence score to dispatch call.
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                A confirmed detection is not yet an action. Every detection is ranked P1 → P5 against
                the two variables a crew actually deploys against: <span className="text-foreground">is there fire</span>,
                and <span className="text-foreground">how many victims</span>. The board pairs each rank with the tactical team it dispatches.
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Fig. 04.2 — dispatch board
            </div>
          </div>
          <PriorityRankBoard />
        </div>
      </section>




      <section className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 pb-16 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl text-muted-foreground">
          End of brief. Go back to the top, or jump straight back to the detection model.
        </p>
        <div className="flex gap-3">
          <Link
            to="/"
            className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-widest hover:bg-white/10"
          >
            ← Home
          </Link>
          <Link
            to="/detection"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-background hover:bg-foreground/90"
          >
            Replay detection
          </Link>
        </div>
      </section>
    </>
  );
}
