export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-12 font-mono text-[11px] uppercase tracking-wider text-muted-foreground md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-foreground">
            <span className="inline-block h-2 w-2 bg-signal" />
            Aero/Fire Field Manual
          </div>
          <p className="normal-case tracking-normal">
            A short interactive primer on drone-assisted wildfire response.
            Educational. Imagery generated for illustration.
          </p>
        </div>
        <div>
          <div className="mb-3 text-foreground">Sources</div>
          <ul className="space-y-1 normal-case tracking-normal">
            <li>USFS — Unmanned Aircraft Systems</li>
            <li>NIFC Interagency Standards</li>
            <li>Manufacturer technical briefs</li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-foreground">Sheet</div>
          <ul className="space-y-1">
            <li>Scale 1 : 1</li>
            <li>Datum WGS-84</li>
            <li>Units SI</li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-foreground">Revision</div>
          <ul className="space-y-1">
            <li>2026.06 — A</li>
            <li>Drafted by Aero/Fire</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule px-6 py-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        End of sheet — © 2026
      </div>
    </footer>
  );
}
