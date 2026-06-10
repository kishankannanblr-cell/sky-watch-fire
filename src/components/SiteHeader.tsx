import { Link } from "@tanstack/react-router";

const nav: { to: string; label: string; exact?: boolean }[] = [
  { to: "/", label: "00 / Index", exact: true },
  { to: "/traditional", label: "01 / Traditional" },
  { to: "/drones", label: "02 / Drones" },
  { to: "/how-it-works", label: "03 / How it works" },
  { to: "/projects", label: "04 / Projects" },
  { to: "/impact", label: "05 / Impact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="flex items-center gap-2 font-mono text-xs tracking-wider">
          <span className="inline-block h-2 w-2 bg-signal" />
          <span className="uppercase">Aero/Fire — Field Manual</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.exact }}
              activeProps={{ className: "text-signal" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-sm px-2 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground lg:block">
          Rev. 2026.06 / Sheet A
        </div>
      </div>
      <div className="overflow-x-auto border-t border-rule md:hidden">
        <div className="flex gap-1 px-4 py-2">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.exact }}
              activeProps={{ className: "text-signal" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="whitespace-nowrap font-mono text-[11px] uppercase tracking-wider"
            >
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
