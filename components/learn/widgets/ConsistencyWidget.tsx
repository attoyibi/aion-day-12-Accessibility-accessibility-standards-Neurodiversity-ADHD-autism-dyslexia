'use client';

import { useState } from 'react';
import { Segmented } from '@/components/ui/Segmented';

type Mode = 'inconsistent' | 'consistent';

interface PageSpec {
  name: string;
  /** Where the primary action sits, and what it is called. */
  cta: string;
  ctaPos: 'left' | 'right' | 'center';
  ctaStyle: string;
  nav: string[];
  navPos: 'top' | 'side';
  searchLabel: string;
}

const PAGES: Record<Mode, PageSpec[]> = {
  inconsistent: [
    {
      name: 'Homepage',
      cta: 'Get started',
      ctaPos: 'right',
      ctaStyle: 'rounded-full bg-purple text-white',
      nav: ['Home', 'Services', 'About'],
      navPos: 'top',
      searchLabel: 'Search',
    },
    {
      name: 'Service page',
      cta: 'Proceed',
      ctaPos: 'left',
      ctaStyle: 'rounded-none border-2 border-navy text-navy',
      nav: ['Overview', 'Details', 'Contact', 'Home'],
      navPos: 'side',
      searchLabel: 'Find',
    },
    {
      name: 'Form page',
      cta: 'Submit now →',
      ctaPos: 'center',
      ctaStyle: 'rounded bg-emerald-700 text-white',
      nav: ['Back'],
      navPos: 'top',
      searchLabel: 'Lookup',
    },
  ],
  consistent: [
    {
      name: 'Homepage',
      cta: 'Continue',
      ctaPos: 'right',
      ctaStyle: 'rounded-lg bg-purple text-white',
      nav: ['Home', 'Services', 'Contact'],
      navPos: 'top',
      searchLabel: 'Search',
    },
    {
      name: 'Service page',
      cta: 'Continue',
      ctaPos: 'right',
      ctaStyle: 'rounded-lg bg-purple text-white',
      nav: ['Home', 'Services', 'Contact'],
      navPos: 'top',
      searchLabel: 'Search',
    },
    {
      name: 'Form page',
      cta: 'Continue',
      ctaPos: 'right',
      ctaStyle: 'rounded-lg bg-purple text-white',
      nav: ['Home', 'Services', 'Contact'],
      navPos: 'top',
      searchLabel: 'Search',
    },
  ],
};

const justify = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
} as const;

export function ConsistencyWidget() {
  const [mode, setMode] = useState<Mode>('inconsistent');

  return (
    <div className="space-y-4">
      <Segmented
        label="Layout patterns across page types"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'inconsistent', label: 'Inconsistent' },
          { value: 'consistent', label: 'Consistent' },
        ]}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        {PAGES[mode].map((p) => (
          <div key={p.name} className="rounded-xl border border-lilac-edge bg-white p-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
              {p.name}
            </p>

            <div
              className={`mt-2 flex gap-2 ${
                p.navPos === 'side' ? 'flex-row' : 'flex-col'
              }`}
            >
              <div
                className={`flex gap-1 ${
                  p.navPos === 'side' ? 'w-16 flex-col' : 'flex-row flex-wrap'
                }`}
              >
                {p.nav.map((n) => (
                  <span
                    key={n}
                    className="rounded bg-lilac px-1.5 py-0.5 text-[9px] font-semibold text-navy/70"
                  >
                    {n}
                  </span>
                ))}
              </div>

              <div className="flex-1 space-y-1.5">
                <span className="block rounded border border-lilac-edge px-1.5 py-1 text-[9px] text-navy/50">
                  🔍 {p.searchLabel}
                </span>
                <span className="block h-1.5 w-full rounded bg-lilac" />
                <span className="block h-1.5 w-4/5 rounded bg-lilac" />
                <span className="block h-1.5 w-3/5 rounded bg-lilac" />
                <div className={`flex ${justify[p.ctaPos]} pt-1`}>
                  <span className={`px-2 py-1 text-[9px] font-bold ${p.ctaStyle}`}>
                    {p.cta}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p
        aria-live="polite"
        className="rounded-lg bg-lilac px-3 py-2 text-xs leading-relaxed text-navy/80"
      >
        {mode === 'inconsistent'
          ? 'Three page types, three navigation positions, three names for the same action and three words for search. Every page costs the user a fresh orientation pass — the tax lands hardest on autistic users, on people with ADHD, and on anyone tired, rushed or new.'
          : 'Same navigation, same position, same wording, same button. Orientation is paid once and reused. Nothing here is more expensive to build — it is only more expensive to agree on.'}
      </p>
    </div>
  );
}
