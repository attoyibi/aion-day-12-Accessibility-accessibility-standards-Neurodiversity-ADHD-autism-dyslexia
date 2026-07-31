'use client';

import { useState } from 'react';
import { Segmented } from '@/components/ui/Segmented';

type Framing = 'checkbox' | 'strategic';

const ROADMAP: Record<Framing, { phase: string; items: string[] }[]> = {
  checkbox: [
    { phase: 'Q1', items: ['Book external audit', 'Collect the findings list'] },
    { phase: 'Q2', items: ['Fix flagged issues', 'Publish accessibility statement'] },
    { phase: 'Q3', items: ['Sign off — done'] },
    { phase: 'Q4', items: ['—'] },
    { phase: 'Next year', items: ['Rediscover the same issues in new features'] },
  ],
  strategic: [
    { phase: 'Q1', items: ['Audit + name an owner', 'Accessible component library started'] },
    { phase: 'Q2', items: ['Definition of done includes a11y', 'Team training, all disciplines'] },
    { phase: 'Q3', items: ['Testing with disabled users', 'Keyboard + contrast checks in CI'] },
    { phase: 'Q4', items: ['Procurement rules updated', 'Reported alongside quality metrics'] },
    { phase: 'Next year', items: ['New features accessible by default'] },
  ],
};

const SUMMARY: Record<Framing, { headline: string; body: string; tone: string }> = {
  checkbox: {
    headline: 'A project with an end date',
    tone: 'border-amber-500 bg-amber-50 text-amber-900',
    body: 'Accessibility becomes something you survive once a year. The findings list gets shorter; the organisation learns nothing, so the next release rebuilds the same barriers.',
  },
  strategic: {
    headline: 'A property of how you build',
    tone: 'border-emerald-600 bg-emerald-50 text-emerald-900',
    body: 'Slower to start and it touches hiring, procurement and process. In exchange the cost curve flattens: quality is produced rather than inspected in afterwards.',
  },
};

export function ComplianceFramingWidget() {
  const [framing, setFraming] = useState<Framing>('checkbox');
  const s = SUMMARY[framing];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-navy">Treat accessibility as:</span>
        <Segmented
          label="Framing"
          size="sm"
          value={framing}
          onChange={setFraming}
          options={[
            { value: 'checkbox', label: 'Checkbox compliance' },
            { value: 'strategic', label: 'Strategic quality' },
          ]}
        />
      </div>

      <ol className="grid gap-2 sm:grid-cols-5">
        {ROADMAP[framing].map((p) => (
          <li
            key={p.phase}
            className="animate-flip-in rounded-lg border border-lilac-edge bg-white p-2.5"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple">
              {p.phase}
            </p>
            <ul className="mt-1.5 space-y-1">
              {p.items.map((i) => (
                <li key={i} className="text-[11px] leading-snug text-navy/75">
                  {i}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className={`rounded-lg border-l-4 px-3 py-2 ${s.tone}`} aria-live="polite">
        <p className="text-xs font-bold">{s.headline}</p>
        <p className="mt-0.5 text-[11px] leading-relaxed">{s.body}</p>
      </div>
    </div>
  );
}
