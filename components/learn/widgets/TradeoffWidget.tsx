'use client';

import { useState } from 'react';

type Key = 'a11y' | 'brand' | 'effort' | 'legal';

const DIMENSIONS: { key: Key; label: string; hint: string; bar: string }[] = [
  { key: 'a11y', label: 'Accessibility depth', hint: 'How far past the minimum you go', bar: 'bg-emerald-600' },
  { key: 'brand', label: 'Brand expression', hint: 'Distinctive look, custom components', bar: 'bg-purple' },
  { key: 'effort', label: 'Speed / low effort', hint: 'Shipping sooner, spending less', bar: 'bg-sky-600' },
  { key: 'legal', label: 'Legal certainty', hint: 'Documented, audited, defensible', bar: 'bg-amber-600' },
];

const TOTAL = 100;

export function TradeoffWidget() {
  const [v, setV] = useState<Record<Key, number>>({
    a11y: 25,
    brand: 25,
    effort: 25,
    legal: 25,
  });

  /** Raising one dimension takes the difference out of the other three. */
  const setDim = (key: Key, next: number) => {
    setV((cur) => {
      const target = Math.max(0, Math.min(TOTAL, next));
      const others = DIMENSIONS.map((d) => d.key).filter((k) => k !== key);
      const remaining = TOTAL - target;
      const otherSum = others.reduce((s, k) => s + cur[k], 0);

      const out = { ...cur, [key]: target } as Record<Key, number>;
      others.forEach((k, i) => {
        out[k] =
          otherSum === 0
            ? Math.round(remaining / others.length)
            : Math.round((cur[k] / otherSum) * remaining);
        // absorb rounding drift in the last one
        if (i === others.length - 1) {
          out[k] = remaining - others.slice(0, -1).reduce((s, kk) => s + out[kk], 0);
        }
      });
      return out;
    });
  };

  const verdict = () => {
    if (v.a11y >= 45) return 'You are buying real inclusion. Something else is paying for it — check that you can defend which.';
    if (v.a11y <= 12 && v.legal <= 20) return 'Cheap, on-brand and fast — and unusable for a slice of your audience, with no paper trail when someone complains.';
    if (v.brand >= 45) return 'A striking product. Distinctive components are exactly where contrast, focus and keyboard support quietly go missing.';
    if (v.effort >= 45) return 'You will ship early. Accessibility retrofitted later routinely costs several times what it costs now.';
    if (v.legal >= 45) return 'Audit-proof. Note that “compliant” and “actually usable” are not the same finish line.';
    return 'A balanced mix. Every point you add to one column comes out of the other three — that is the whole point of this exercise.';
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {DIMENSIONS.map((d) => (
          <div key={d.key} className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)_2.5rem] items-center gap-3">
            <label htmlFor={`tw-${d.key}`} className="text-xs font-semibold leading-tight text-navy">
              {d.label}
              <span className="block font-normal text-[10px] text-navy/50">{d.hint}</span>
            </label>
            <div className="space-y-1">
              <input
                id={`tw-${d.key}`}
                type="range"
                min={0}
                max={100}
                value={v[d.key]}
                onChange={(e) => setDim(d.key, Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-purple"
              />
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-lilac">
                <div
                  className={`h-full rounded-full transition-all duration-200 ${d.bar}`}
                  style={{ width: `${v[d.key]}%` }}
                />
              </div>
            </div>
            <span className="text-right text-xs font-bold tabular-nums text-navy">
              {v[d.key]}
            </span>
          </div>
        ))}
      </div>

      <p
        aria-live="polite"
        className="rounded-lg border-l-4 border-purple bg-lilac px-3 py-2 text-xs leading-relaxed text-navy/80"
      >
        {verdict()}
      </p>

      <p className="text-[11px] text-navy/55">
        The budget is fixed at 100 on purpose. Real projects do not get to max
        all four, and &ldquo;we&rsquo;ll do accessibility later&rdquo; is a
        slider position, not a plan.
      </p>
    </div>
  );
}
