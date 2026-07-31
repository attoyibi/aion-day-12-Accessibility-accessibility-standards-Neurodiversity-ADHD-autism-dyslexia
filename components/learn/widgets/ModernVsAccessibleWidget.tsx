'use client';

import { useState } from 'react';
import { Segmented } from '@/components/ui/Segmented';

const GROUPS = [
  { key: 'mouse', label: 'Mouse users, good eyesight', modern: true },
  { key: 'lowvision', label: 'Low vision / older eyes', modern: false },
  { key: 'keyboard', label: 'Keyboard-only users', modern: false },
  { key: 'sr', label: 'Screen-reader users', modern: false },
  { key: 'cognitive', label: 'ADHD, autism, dyslexia', modern: false },
  { key: 'mobile', label: 'Small screen / bright sunlight', modern: false },
];

export function ModernVsAccessibleWidget() {
  const [mode, setMode] = useState<'modern' | 'accessible'>('modern');
  const modern = mode === 'modern';
  const canUse = GROUPS.filter((g) => (modern ? g.modern : true)).length;

  return (
    <div className="space-y-4">
      <Segmented
        label="Design approach"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'modern', label: 'Modern, but inaccessible' },
          { value: 'accessible', label: 'Plain, but accessible' },
        ]}
      />

      <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* The same screen, both ways */}
        <div
          className={`space-y-3 rounded-xl p-4 transition-colors ${
            modern
              ? 'bg-gradient-to-br from-navy via-purple-deep to-navy'
              : 'border border-lilac-edge bg-white'
          }`}
        >
          <p
            className={
              modern
                ? 'text-lg font-black tracking-tight text-white/40'
                : 'text-lg font-bold text-navy'
            }
          >
            Book an appointment
          </p>
          <p className={modern ? 'text-[10px] leading-tight text-white/30' : 'text-sm leading-relaxed text-navy/80'}>
            Choose a service, then pick a time. It takes about three minutes.
          </p>
          <div className="flex gap-2">
            <span
              className={
                modern
                  ? 'rounded-full border border-white/15 px-3 py-1.5 text-[10px] text-white/35'
                  : 'rounded-lg bg-purple px-4 py-2 text-sm font-semibold text-white'
              }
            >
              Continue
            </span>
            <span
              className={
                modern
                  ? 'rounded-full border border-white/15 px-3 py-1.5 text-[10px] text-white/35'
                  : 'rounded-lg border border-lilac-edge px-4 py-2 text-sm font-semibold text-navy'
              }
            >
              Cancel
            </span>
          </div>
          <p className={modern ? 'text-[9px] text-white/25' : 'text-xs text-navy/60'}>
            {modern
              ? 'Ultra-light type, 9px labels, colour-only states, custom controls'
              : 'System type, 16px minimum, labelled states, native controls'}
          </p>
        </div>

        {/* People counter */}
        <div className="rounded-xl border border-lilac-edge bg-lilac-soft p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            Who can use this?
          </p>
          <p className="mt-1 text-3xl font-black tabular-nums text-navy" aria-live="polite">
            {canUse}
            <span className="text-lg font-bold text-navy/40"> / {GROUPS.length}</span>
          </p>
          <ul className="mt-2 space-y-1">
            {GROUPS.map((g) => {
              const ok = modern ? g.modern : true;
              return (
                <li
                  key={g.key}
                  className={`flex items-center gap-2 rounded px-1.5 py-1 text-[11px] transition-colors ${
                    ok ? 'text-navy' : 'bg-rose-50 text-rose-800 line-through decoration-rose-400'
                  }`}
                >
                  <span aria-hidden="true">{ok ? '✅' : '🚫'}</span>
                  {g.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-navy/60">
        The plain version is not the exciting one. It is the one that works for
        six groups instead of one — and nothing about it forbids good design,
        it just forbids design that only serves the designer.
      </p>
    </div>
  );
}
