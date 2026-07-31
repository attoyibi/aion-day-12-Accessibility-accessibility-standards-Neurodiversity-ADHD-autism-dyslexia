export function Header() {
  return (
    <header className="border-b border-purple-deep/40 bg-navy text-white">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-lg bg-purple text-sm font-black tracking-tight"
          >
            AI
          </span>
          <div className="leading-tight">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-lilac">
              AION
            </p>
            <p className="text-[11px] text-lilac/70">Day 12 · Accessibility</p>
          </div>
        </div>

        <div className="mx-1 hidden h-8 w-px bg-white/15 sm:block" />

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold sm:text-lg">
            Accessibility Playground
          </h1>
          <p className="truncate text-xs text-lilac/70">
            Accessibility standards · Neurodiversity: ADHD, autism, dyslexia
          </p>
        </div>

        <p className="hidden rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-lilac lg:block">
          ~20–25 min · self-paced
        </p>
      </div>
    </header>
  );
}
