'use client';

import { useState } from 'react';

const FIELDS = [
  { id: 'fo-first', label: 'First name', type: 'text' },
  { id: 'fo-last', label: 'Last name', type: 'text' },
  { id: 'fo-postcode', label: 'Postcode', type: 'text' },
  { id: 'fo-email', label: 'Email', type: 'email' },
];

/**
 * DOM order never changes — only the CSS `order` does. That is exactly how
 * broken tab order happens in real projects: the layout gets rearranged
 * visually and nobody re-checks the keyboard path.
 */
const SCRAMBLED = [3, 1, 4, 2];

export function FocusOrderWidget() {
  const [broken, setBroken] = useState(false);
  const [trail, setTrail] = useState<number[]>([]);

  const readingPos = (i: number) => (broken ? SCRAMBLED[i] : i + 1);

  const visit = (i: number) =>
    setTrail((t) => {
      const pos = readingPos(i);
      return t[t.length - 1] === pos ? t : [...t, pos].slice(-8);
    });

  const toggle = () => {
    setBroken((b) => !b);
    setTrail([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={broken}
          onClick={toggle}
          className={`aion-btn ${
            broken
              ? 'bg-rose-700 text-white hover:bg-rose-800'
              : 'aion-btn-ghost'
          }`}
        >
          {broken ? '💥 Focus order is broken' : '✓ Focus order is correct'}
        </button>
        <p className="text-xs text-navy/60">
          Click a field, then press <kbd className="rounded border border-lilac-edge bg-lilac px-1.5 py-0.5 font-mono text-[10px]">Tab</kbd>{' '}
          repeatedly. Watch the numbers.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_170px]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2.5 rounded-xl border border-lilac-edge bg-lilac-soft p-3"
        >
          {FIELDS.map((f, i) => (
            <div
              key={f.id}
              style={{ order: readingPos(i) }}
              className="flex items-center gap-2.5"
            >
              <span
                aria-hidden="true"
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold text-white"
              >
                {readingPos(i)}
              </span>
              <label htmlFor={f.id} className="w-24 shrink-0 text-xs font-semibold text-navy">
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type}
                onFocus={() => visit(i)}
                className="min-w-0 flex-1 rounded-lg border border-lilac-edge bg-white px-2.5 py-1.5 text-sm
                           focus:outline focus:outline-[3px] focus:outline-offset-2 focus:outline-purple"
              />
            </div>
          ))}
          <button
            type="submit"
            style={{ order: 5 }}
            className="aion-btn-primary self-start !py-1.5 !text-xs"
          >
            Submit
          </button>
        </form>

        <div className="rounded-xl border border-lilac-edge bg-white p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            Your tab path
          </p>
          <p className="mt-2 min-h-[3rem] text-lg font-bold tabular-nums text-navy">
            {trail.length ? trail.join(' → ') : '—'}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-navy/65">
            {broken
              ? 'Jumping. A sighted mouse user sees nothing wrong; a keyboard user loses their place completely.'
              : 'Straight down the form, the way it reads. That is what correct feels like.'}
          </p>
          {trail.length > 0 && (
            <button
              type="button"
              onClick={() => setTrail([])}
              className="mt-2 text-[11px] font-semibold text-purple underline underline-offset-2"
            >
              Clear path
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
