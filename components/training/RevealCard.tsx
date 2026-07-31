'use client';

import { CATEGORIES } from '@/lib/categories';
import type { Spot } from './spots';

export function RevealCard({
  spot,
  call,
  onCall,
  fixedOn,
  onToggleFix,
}: {
  spot: Spot | null;
  /** The learner's own call, once made. */
  call: 'barrier' | 'good' | null;
  onCall: (v: 'barrier' | 'good') => void;
  fixedOn: boolean;
  onToggleFix: () => void;
}) {
  if (!spot) {
    return (
      <div className="aion-card p-4">
        <p className="text-sm font-bold text-navy">Pick a spot</p>
        <p className="mt-1 text-xs leading-relaxed text-navy/65">
          Click anything on the practice page. You&apos;ll be asked for your call
          first — barrier or good practice — then the card opens up. Wrong calls
          cost you nothing, so guess freely.
        </p>
      </div>
    );
  }

  // Stage 1: make your call.
  if (!call) {
    return (
      <div className="aion-card animate-flip-in p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
          Your call
        </p>
        <p className="mt-1 text-sm font-bold leading-snug text-navy">
          Is this a barrier, or a good pattern?
        </p>
        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onCall('barrier')}
            className="aion-btn border-2 border-rose-200 bg-rose-50 text-rose-900 hover:bg-rose-100"
          >
            ❌ Barrier
          </button>
          <button
            type="button"
            onClick={() => onCall('good')}
            className="aion-btn border-2 border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
          >
            ✅ Good practice
          </button>
        </div>
        <p className="mt-2 text-[11px] text-navy/50">
          No timer, no penalty. This is just to make you commit before you read
          the answer.
        </p>
      </div>
    );
  }

  // Stage 2: the reveal.
  const correct = call === spot.verdict;
  const isBarrier = spot.verdict === 'barrier';
  const cat = CATEGORIES[spot.category];

  return (
    <div className="aion-card animate-flip-in overflow-hidden">
      <div
        className={`px-4 py-2.5 ${
          isBarrier ? 'bg-rose-700 text-white' : 'bg-emerald-700 text-white'
        }`}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-75">
          Verdict
        </p>
        <p className="text-sm font-black">
          {isBarrier ? '❌ Barrier' : '✅ Good practice'}
        </p>
      </div>

      <p
        className={`px-4 py-2 text-xs font-semibold ${
          correct ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'
        }`}
      >
        {correct
          ? '🎯 You called it right.'
          : '↔ Not this time — read on, that is what the round is for.'}
      </p>

      <dl className="space-y-3 p-4">
        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            What
          </dt>
          <dd className="mt-0.5 text-xs leading-relaxed text-navy/85">{spot.what}</dd>
        </div>

        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            Why it matters
          </dt>
          <dd className="mt-0.5 text-xs leading-relaxed text-navy/85">{spot.why}</dd>
        </div>

        <div>
          <dt className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            Category
          </dt>
          <dd className="mt-1">
            <span className={`aion-chip ${cat.chipActive}`}>
              <span aria-hidden="true">{cat.icon}</span>
              {cat.label}
              <span className="font-normal opacity-75">({cat.de})</span>
            </span>
          </dd>
        </div>

        {isBarrier && (
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
              Fix preview
            </dt>
            <dd className="mt-1.5 space-y-1.5">
              <button
                type="button"
                aria-pressed={fixedOn}
                onClick={onToggleFix}
                className={
                  fixedOn
                    ? 'aion-btn w-full bg-emerald-700 text-white hover:bg-emerald-800'
                    : 'aion-btn-ghost w-full'
                }
              >
                {fixedOn ? '◀ Show it broken again' : '▶ Apply the fix on the page'}
              </button>
              <p className="text-[11px] leading-relaxed text-navy/65">
                {fixedOn ? spot.fixNote : spot.fixLabel}
              </p>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
