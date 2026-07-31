'use client';

import { useState } from 'react';
import { CATEGORIES, type CategoryId } from '@/lib/categories';

/**
 * Generic practice screen — a fictional webshop, deliberately unrelated to the
 * graded assessment cases. Clicking a hotspot names the CATEGORY only, never
 * the fix: naming the category is the Level 2 skill.
 */
interface Hotspot {
  id: string;
  category: CategoryId;
  what: string;
}

const HOTSPOTS: Record<string, Hotspot> = {
  banner: {
    id: 'banner',
    category: 'perceivability',
    what: 'A promotional banner whose text sits on a busy photo.',
  },
  carousel: {
    id: 'carousel',
    category: 'operability',
    what: 'A carousel that only advances when you drag it with a mouse.',
  },
  terms: {
    id: 'terms',
    category: 'understandability',
    what: 'A shipping clause written as one 40-word sentence.',
  },
  checkout: {
    id: 'checkout',
    category: 'errorTolerance',
    what: 'A checkout step that clears the whole basket if payment fails.',
  },
  account: {
    id: 'account',
    category: 'participation',
    what: 'The only way to change a delivery address is to phone support during office hours.',
  },
};

export function BarrierScannerWidget() {
  const [open, setOpen] = useState<string | null>(null);
  const [found, setFound] = useState<string[]>([]);

  const click = (id: string) => {
    setOpen((cur) => (cur === id ? null : id));
    setFound((f) => (f.includes(id) ? f : [...f, id]));
  };

  const spot = (id: string, extra: string) =>
    [
      'group relative w-full rounded-lg border-2 border-dashed text-left transition-all',
      open === id
        ? 'border-purple bg-purple/10'
        : found.includes(id)
          ? 'border-lilac-edge bg-white hover:border-purple/60'
          : 'border-transparent hover:border-purple/60 hover:bg-purple/5',
      extra,
    ].join(' ');

  const active = open ? HOTSPOTS[open] : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-navy/60">
          Hover the mock screen — hotspots glow. Click one to name its category.
        </p>
        <p className="shrink-0 rounded-full bg-lilac px-2.5 py-1 text-[11px] font-bold text-navy">
          {found.length} / {Object.keys(HOTSPOTS).length} scanned
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {/* Mock screen */}
        <div className="space-y-2 rounded-xl border border-lilac-edge bg-lilac-soft p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            NordicMug.shop (practice screen)
          </p>

          <button type="button" onClick={() => click('banner')} className={spot('banner', 'p-2')}>
            <span className="block rounded bg-gradient-to-r from-purple/70 to-amber-300 px-3 py-3 text-center text-xs font-bold text-white/70">
              SUMMER SALE — up to 40% off
            </span>
          </button>

          <button type="button" onClick={() => click('carousel')} className={spot('carousel', 'p-2')}>
            <span className="flex items-center gap-1.5">
              <span className="h-12 flex-1 rounded bg-white" />
              <span className="h-12 flex-1 rounded bg-white" />
              <span className="h-12 w-8 rounded bg-white/50" />
              <span className="text-[10px] text-navy/50">drag →</span>
            </span>
          </button>

          <button type="button" onClick={() => click('terms')} className={spot('terms', 'p-2')}>
            <span className="block text-[11px] leading-snug text-navy/70">
              Notwithstanding the foregoing, dispatch of items designated as
              pre-order shall occur only once all constituent articles of the
              respective order have become available in the fulfilment centre.
            </span>
          </button>

          <div className="flex gap-2">
            <button type="button" onClick={() => click('checkout')} className={spot('checkout', 'flex-1 p-2')}>
              <span className="block rounded bg-white px-2 py-2 text-center text-[11px] font-semibold text-navy">
                🛒 Checkout
              </span>
            </button>
            <button type="button" onClick={() => click('account')} className={spot('account', 'flex-1 p-2')}>
              <span className="block rounded bg-white px-2 py-2 text-center text-[11px] font-semibold text-navy">
                👤 My address
              </span>
            </button>
          </div>
        </div>

        {/* Readout */}
        <div className="rounded-xl border border-lilac-edge bg-white p-3">
          {active ? (
            <div className="animate-flip-in space-y-2">
              <p className="text-xs leading-relaxed text-navy/80">{active.what}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
                Category
              </p>
              <span className={`aion-chip ${CATEGORIES[active.category].chipActive}`}>
                <span aria-hidden="true">{CATEGORIES[active.category].icon}</span>
                {CATEGORIES[active.category].label}
              </span>
              <p className="pt-1 text-[11px] italic leading-relaxed text-navy/55">
                No fix shown on purpose. In Level 2 the deliverable is the
                analysis: what is broken, for whom, and which category it falls
                under.
              </p>
            </div>
          ) : (
            <p className="text-xs text-navy/60">
              Nothing selected. Scanning an interface is a habit: sweep it
              once per category rather than hunting at random.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
