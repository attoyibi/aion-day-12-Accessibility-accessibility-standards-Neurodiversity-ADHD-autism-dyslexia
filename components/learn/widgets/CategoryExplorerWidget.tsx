'use client';

import { useState } from 'react';
import {
  CATEGORIES,
  PORTAL_CATEGORY_IDS,
  POUR_REFERENCE_NOTE,
  type CategoryId,
} from '@/lib/categories';

/**
 * Five curriculum categories as chips; picking one highlights the matching
 * element in the live mini-UI beside it.
 */
export function CategoryExplorerWidget() {
  const [active, setActive] = useState<CategoryId | null>(null);

  const on = (id: CategoryId) => active === id;
  const dim = (id: CategoryId) => active !== null && active !== id;

  const zone = (id: CategoryId) =>
    [
      'relative rounded-lg border-2 p-2.5 transition-all',
      on(id)
        ? 'border-dashed bg-white shadow-sm'
        : 'border-transparent bg-white/60',
      dim(id) ? 'opacity-40' : 'opacity-100',
    ].join(' ');

  const zoneStyle = (id: CategoryId) =>
    on(id) ? { borderColor: CATEGORIES[id].accent } : undefined;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {PORTAL_CATEGORY_IDS.map((id) => {
          const c = CATEGORIES[id];
          const isOn = on(id);
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isOn}
              onClick={() => setActive(isOn ? null : id)}
              className={`aion-chip ${isOn ? c.chipActive : c.chip} hover:brightness-95`}
            >
              <span aria-hidden="true">{c.icon}</span>
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Live mini-UI */}
        <div className="space-y-2 rounded-xl border border-lilac-edge bg-lilac-soft p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            Mini service page
          </p>

          <div className={zone('perceivability')} style={zoneStyle('perceivability')}>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid h-9 w-12 shrink-0 place-items-center rounded bg-purple/15 text-base"
              >
                🖼
              </span>
              <p className="text-xs text-navy/80">
                Image, colour and contrast — everything you take in with your
                senses.
              </p>
            </div>
          </div>

          <div className={zone('operability')} style={zoneStyle('operability')}>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-purple px-2.5 py-1 text-[11px] font-semibold text-white">
                Start
              </span>
              <span className="rounded border border-lilac-edge bg-white px-2.5 py-1 text-[11px] text-navy/70">
                Back
              </span>
              <span className="ml-auto text-[11px] text-navy/60">
                buttons, links, tab order
              </span>
            </div>
          </div>

          <div className={zone('understandability')} style={zoneStyle('understandability')}>
            <p className="text-xs leading-relaxed text-navy/80">
              &ldquo;Upload your proof of residence.&rdquo; — wording, structure
              and labels that say what they mean.
            </p>
          </div>

          <div className={zone('errorTolerance')} style={zoneStyle('errorTolerance')}>
            <p className="rounded bg-rose-50 px-2 py-1.5 text-[11px] font-medium text-rose-900">
              ⚠ Date must be in the format DD.MM.YYYY — the recovery path when
              something goes wrong.
            </p>
          </div>

          <div className={zone('participation')} style={zoneStyle('participation')}>
            <p className="text-[11px] text-navy/80">
              🤝 Can this person finish and submit the whole thing alone — or do
              they need to bring someone along?
            </p>
          </div>
        </div>

        {/* Explanation */}
        <div className="space-y-3">
          {active ? (
            <div className="animate-flip-in rounded-xl border border-lilac-edge bg-white p-3">
              <p className="flex items-center gap-2 text-sm font-bold text-navy">
                <span aria-hidden="true">{CATEGORIES[active].icon}</span>
                {CATEGORIES[active].label}
                <span className="text-xs font-normal text-navy/50">
                  {CATEGORIES[active].de}
                </span>
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-navy/75">
                {CATEGORIES[active].blurb}
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-lilac-edge bg-white p-3 text-xs text-navy/60">
              Pick a category chip — the part of the page it governs lights up.
            </div>
          )}

          <p className="rounded-lg border-l-4 border-purple bg-lilac px-3 py-2 text-[11px] leading-relaxed text-navy/75">
            <span className="font-bold">Reference:</span> {POUR_REFERENCE_NOTE}
          </p>
        </div>
      </div>
    </div>
  );
}
