'use client';

import { useState } from 'react';
import { Segmented } from '@/components/ui/Segmented';

type Term = 'usability' | 'accessibility' | 'inclusive';

const COPY: Record<Term, { caption: string; note: string }> = {
  usability: {
    caption:
      'Usability asks: is this quick and pleasant for someone who can already use it? Tight, pretty, efficient.',
    note: 'Optimised for the average user. Small target, icon-only, no visible focus — fine for a mouse, hostile to everything else.',
  },
  accessibility: {
    caption:
      'Accessibility asks: can someone with a disability use it at all? Same button, now reachable and announced.',
    note: 'Text label, bigger target, visible focus ring, proper contrast. Nothing fancy — it just no longer excludes anyone.',
  },
  inclusive: {
    caption:
      'Inclusive design asks: who did we not think about? It designs for the whole range of people and situations up front.',
    note: 'Reachable AND offers another route. Someone on a shaky bus, on 3G, in a second language, or mid-migraine still gets through.',
  },
};

export function ThreeTermsWidget() {
  const [term, setTerm] = useState<Term>('usability');

  return (
    <div className="space-y-4">
      <Segmented
        label="Choose a term"
        value={term}
        onChange={setTerm}
        options={[
          { value: 'usability', label: 'Usability' },
          { value: 'accessibility', label: 'Accessibility' },
          { value: 'inclusive', label: 'Inclusive design' },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* The same button, morphing */}
        <div className="grid min-h-[132px] place-items-center rounded-xl border border-lilac-edge bg-lilac-soft p-4">
          {term === 'usability' && (
            <button
              type="button"
              title="Send"
              className="rounded bg-purple/80 px-2 py-1 text-[11px] text-white/90 outline-none"
            >
              ➤
            </button>
          )}

          {term === 'accessibility' && (
            <button
              type="button"
              className="rounded-lg bg-purple px-5 py-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              ➤ Send request
            </button>
          )}

          {term === 'inclusive' && (
            <div className="w-full max-w-[15rem] space-y-2 text-center">
              <button
                type="button"
                className="w-full rounded-lg bg-purple px-5 py-3 text-base font-semibold text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                ➤ Send request
              </button>
              <p className="text-xs text-navy/70">
                Takes about 2 minutes. You can save and finish later.
              </p>
              <p className="text-xs text-navy/70">
                Prefer to talk?{' '}
                <a
                  href="#three-terms-demo"
                  onClick={(e) => e.preventDefault()}
                  className="font-semibold text-purple underline underline-offset-2"
                >
                  Call the service desk
                </a>
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold leading-snug text-navy">
            {COPY[term].caption}
          </p>
          <p className="rounded-lg bg-lilac px-3 py-2 text-xs leading-relaxed text-navy/75">
            {COPY[term].note}
          </p>
        </div>
      </div>

      <p id="three-terms-demo" className="text-[11px] text-navy/50">
        Same job, same button. Only the definition changed — and with it, who
        gets to press it.
      </p>
    </div>
  );
}
