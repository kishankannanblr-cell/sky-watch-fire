import type { ReactNode } from "react";

export function PageHeader({
  chapter,
  title,
  lede,
  meta,
}: {
  chapter: string;
  title: string;
  lede: string;
  meta?: ReactNode;
}) {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1400px] px-6 pt-14 pb-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
          {chapter}
        </div>
        <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.05] md:text-6xl">
          {title}
        </h1>
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{lede}</p>
          {meta ? (
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {meta}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
