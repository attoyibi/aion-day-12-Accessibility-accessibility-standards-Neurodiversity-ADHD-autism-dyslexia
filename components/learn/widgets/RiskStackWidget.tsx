'use client';

import { useState } from 'react';

const RISKS = [
  {
    key: 'exclusion',
    icon: '🚷',
    label: 'Exclusion',
    weight: 30,
    detail: 'People who cannot complete the task simply leave — and rarely tell you why.',
    bar: 'bg-purple',
  },
  {
    key: 'legal',
    icon: '⚖️',
    label: 'Legal exposure',
    weight: 25,
    detail: 'Complaints, enforcement, procurement disqualification. It arrives on someone else’s timetable.',
    bar: 'bg-rose-700',
  },
  {
    key: 'reputation',
    icon: '📰',
    label: 'Reputation',
    weight: 20,
    detail: 'One screenshot of an unusable form outlives the campaign that paid for the site.',
    bar: 'bg-amber-600',
  },
  {
    key: 'support',
    icon: '☎️',
    label: 'Support cost',
    weight: 15,
    detail: 'Every barrier converts into phone calls, counter visits and paper forms — permanently staffed.',
    bar: 'bg-sky-700',
  },
  {
    key: 'rework',
    icon: '🔁',
    label: 'Rework',
    weight: 10,
    detail: 'Retrofitting accessibility into a shipped product costs a multiple of building it in.',
    bar: 'bg-emerald-700',
  },
];

const TOTAL = RISKS.reduce((s, r) => s + r.weight, 0);

export function RiskStackWidget() {
  const [on, setOn] = useState<string[]>([]);

  const toggle = (k: string) =>
    setOn((cur) => (cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k]));

  const score = RISKS.filter((r) => on.includes(r.key)).reduce((s, r) => s + r.weight, 0);
  const pct = Math.round((score / TOTAL) * 100);

  const band =
    pct === 0
      ? { label: 'Nothing counted yet', tone: 'text-navy/50' }
      : pct < 35
        ? { label: 'Absorbable', tone: 'text-emerald-800' }
        : pct < 70
          ? { label: 'Uncomfortable', tone: 'text-amber-800' }
          : { label: 'Board-level', tone: 'text-rose-800' };

  return (
    <div className="space-y-4">
      <p className="text-xs text-navy/60">
        Click each risk to add it to the stack. Nobody signs off on
        &ldquo;we skipped accessibility&rdquo; — they sign off on one of these at
        a time.
      </p>

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-wrap content-start gap-2">
          {RISKS.map((r) => {
            const active = on.includes(r.key);
            return (
              <button
                key={r.key}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(r.key)}
                className={`aion-chip !px-3 !py-1.5 ${
                  active
                    ? 'border-navy bg-navy text-white'
                    : 'border-lilac-edge bg-white text-navy hover:bg-lilac'
                }`}
              >
                <span aria-hidden="true">{r.icon}</span>
                {r.label}
              </button>
            );
          })}
        </div>

        {/* The stack itself */}
        <div className="rounded-xl border border-lilac-edge bg-lilac-soft p-3">
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
              Cost of neglect
            </p>
            <p className={`text-xs font-bold ${band.tone}`} aria-live="polite">
              {band.label}
            </p>
          </div>

          <div className="mt-2 flex min-h-[7rem] flex-col-reverse gap-1">
            {RISKS.filter((r) => on.includes(r.key)).map((r) => (
              <div
                key={r.key}
                className={`animate-flip-in rounded px-2 py-1.5 text-[11px] font-semibold text-white ${r.bar}`}
                style={{ minHeight: `${r.weight * 0.9}px` }}
              >
                {r.icon} {r.label}
              </div>
            ))}
            {on.length === 0 && (
              <p className="text-[11px] text-navy/45">Empty stack.</p>
            )}
          </div>

          <div
            className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white"
            role="meter"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Accumulated impact"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-700 transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1 text-right text-[11px] font-bold tabular-nums text-navy">
            {pct}% impact
          </p>
        </div>
      </div>

      {on.length > 0 && (
        <ul className="space-y-1">
          {RISKS.filter((r) => on.includes(r.key)).map((r) => (
            <li key={r.key} className="text-[11px] leading-relaxed text-navy/70">
              <span className="font-semibold text-navy">{r.label}:</span> {r.detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
