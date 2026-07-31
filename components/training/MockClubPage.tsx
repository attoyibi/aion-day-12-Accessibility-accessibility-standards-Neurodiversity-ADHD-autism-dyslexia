'use client';

import type { ReactNode } from 'react';

/**
 * The practice page for the barrier hunt: a fictional sports club.
 * Every hotspot is wrapped in a button so the hunt itself stays keyboard
 * operable — the *simulated* barriers live in the styling and copy inside.
 */
export function MockClubPage({
  onSelect,
  selected,
  found,
  fixed,
}: {
  onSelect: (id: string) => void;
  selected: string | null;
  found: string[];
  fixed: string[];
}) {
  const isFixed = (id: string) => fixed.includes(id);

  const Hot = ({ id, children }: { id: string; children: ReactNode }) => {
    const isSel = selected === id;
    const isFound = found.includes(id);
    return (
      <button
        type="button"
        onClick={() => onSelect(id)}
        aria-pressed={isSel}
        className={`relative block w-full rounded-lg border-2 p-2 text-left transition-all ${
          isSel
            ? 'border-purple bg-purple/5 ring-2 ring-purple/30'
            : isFound
              ? 'border-lilac-edge bg-white'
              : 'border-dashed border-navy/15 hover:border-purple hover:bg-purple/5'
        }`}
      >
        {isFound && (
          <span
            aria-hidden="true"
            className="absolute -right-1.5 -top-1.5 z-10 grid h-5 w-5 place-items-center rounded-full bg-purple text-[10px] text-white shadow"
          >
            ✓
          </span>
        )}
        {children}
      </button>
    );
  };

  return (
    <div className="space-y-2.5 rounded-xl border border-lilac-edge bg-white p-3">
      {/* ── Club header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-2 rounded-lg bg-navy px-3 py-2">
        <p className="text-sm font-black text-white">Meadowbrook Sports Club</p>
        <p className="text-[10px] text-lilac/70">Member area</p>
      </div>

      {/* Good: visible focus ring on search */}
      <Hot id="good-focus">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            Search
          </span>
          <span className="flex-1 rounded-lg border border-lilac-edge bg-lilac-soft px-2.5 py-1.5 text-xs text-navy/50 outline outline-[3px] outline-offset-2 outline-purple">
            court, class or coach…
          </span>
        </div>
      </Hot>

      {/* Barrier: colour-only status */}
      <Hot id="status-colour">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-navy">
            Your membership status:
          </span>
          {isFixed('status-colour') ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900">
              <span aria-hidden="true">✓</span> Active
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" aria-hidden="true" />
            </span>
          ) : (
            <span className="h-3.5 w-3.5 rounded-full bg-emerald-500" />
          )}
        </div>
      </Hot>

      {/* Barrier: low contrast */}
      <Hot id="low-contrast">
        <p
          className="text-xs leading-relaxed"
          style={{ color: isFixed('low-contrast') ? '#3B3560' : '#D9D6E4' }}
        >
          Opening hours: Mon–Fri 06:30–22:00 · Sat 08:00–20:00 · Sun 09:00–18:00.
          Last entry 45 minutes before closing.
        </p>
      </Hot>

      {/* Barrier: missing alt */}
      <Hot id="missing-alt">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 90 60" className="h-14 w-20 shrink-0 rounded" role="presentation">
            <rect width="90" height="60" fill="#EEE9F9" />
            <circle cx="45" cy="22" r="10" fill="#5624D0" />
            <path d="M22 54c0-13 10-20 23-20s23 7 23 20z" fill="#231A45" />
            <path d="M62 20l12-6v14z" fill="#5624D0" />
          </svg>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-navy">Grip technique</p>
            {isFixed('missing-alt') ? (
              <p className="mt-0.5 rounded bg-emerald-50 px-1.5 py-1 text-[10px] leading-snug text-emerald-900">
                alt=&ldquo;Coach holding a racket with the V-grip: thumb and
                index finger form a V along the handle edge.&rdquo;
              </p>
            ) : (
              <p className="mt-0.5 rounded bg-rose-50 px-1.5 py-1 text-[10px] text-rose-800">
                alt=&ldquo;&rdquo; &nbsp;·&nbsp; screen reader announces nothing
              </p>
            )}
          </div>
        </div>
      </Hot>

      {/* Barrier: not keyboard operable */}
      <Hot id="broken-focus">
        {isFixed('broken-focus') ? (
          <span className="inline-block rounded-lg bg-purple px-4 py-2 text-sm font-semibold text-white outline outline-[3px] outline-offset-2 outline-navy">
            Book a court
            <span className="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-bold">
              &lt;button&gt; · tabbable
            </span>
          </span>
        ) : (
          <span className="inline-block rounded-lg bg-purple px-4 py-2 text-sm font-semibold text-white">
            Book a court
            <span className="ml-2 rounded bg-rose-900/40 px-1.5 py-0.5 text-[9px] font-bold">
              &lt;div onclick&gt; · not tabbable
            </span>
          </span>
        )}
      </Hot>

      {/* Good: high contrast block */}
      <Hot id="good-contrast">
        <div className="rounded-lg bg-lilac px-3 py-2">
          <p className="text-sm font-black text-navy">£29 / month</p>
          <p className="text-[11px] font-medium text-navy">
            All courts, all classes, no joining fee.
          </p>
        </div>
      </Hot>

      {/* Barrier: jargon / long nested sentence */}
      <Hot id="jargon">
        {isFixed('jargon') ? (
          <div className="space-y-1 text-[11px] leading-relaxed text-navy/85">
            <p>You can pause your membership for up to three months a year.</p>
            <p>Tell us at least 14 days before the month you want to pause.</p>
            <p>We will confirm by email within two working days.</p>
          </div>
        ) : (
          <p className="text-[11px] leading-relaxed text-navy/85">
            Members wishing to avail themselves of the suspension provision set
            out in the membership terms shall, not less than fourteen days prior
            to the commencement of the calendar month in respect of which such
            suspension is sought, submit notification thereof, whereupon
            confirmation shall be issued in due course.
          </p>
        )}
      </Hot>

      {/* Barrier: inconsistent action naming/styling */}
      <Hot id="inconsistent">
        <div className="grid grid-cols-3 gap-1.5">
          {(isFixed('inconsistent')
            ? [
                { t: 'Tennis', c: 'Book', s: 'rounded-lg bg-purple text-white', j: 'justify-end' },
                { t: 'Squash', c: 'Book', s: 'rounded-lg bg-purple text-white', j: 'justify-end' },
                { t: 'Yoga', c: 'Book', s: 'rounded-lg bg-purple text-white', j: 'justify-end' },
              ]
            : [
                { t: 'Tennis', c: 'Book', s: 'rounded-lg bg-purple text-white', j: 'justify-end' },
                { t: 'Squash', c: 'Reserve now →', s: 'rounded-none border-2 border-navy text-navy', j: 'justify-start' },
                { t: 'Yoga', c: 'Get a slot', s: 'rounded-full bg-emerald-700 text-white', j: 'justify-center' },
              ]
          ).map((card) => (
            <div key={card.t} className="rounded border border-lilac-edge p-1.5">
              <p className="text-[10px] font-bold text-navy/60">{card.t}</p>
              <div className={`mt-2 flex ${card.j}`}>
                <span className={`px-1.5 py-1 text-[9px] font-bold ${card.s}`}>
                  {card.c}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Hot>

      {/* Barrier: vague error */}
      <Hot id="vague-error">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            Newsletter
          </p>
          <span className="block w-full rounded border border-lilac-edge bg-lilac-soft px-2 py-1.5 text-[11px] text-navy/50">
            nadia@@example
          </span>
          {isFixed('vague-error') ? (
            <p className="rounded border-l-4 border-rose-700 bg-rose-50 px-2 py-1.5 text-[11px] text-rose-900">
              <span className="font-bold">Email address:</span> this address has
              two @ signs. An address looks like name@example.com.
            </p>
          ) : (
            <p className="rounded bg-rose-100 px-2 py-1.5 text-[11px] font-bold text-rose-900">
              Error.
            </p>
          )}
        </div>
      </Hot>

      {/* Good: labelled error with format up front */}
      <Hot id="good-error">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-navy">
            Booking date{' '}
            <span className="font-normal text-navy/60">
              — DD/MM/YYYY, e.g. 14/09/2026
            </span>
          </p>
          <span className="block w-full rounded border border-rose-700 bg-white px-2 py-1.5 text-[11px] text-navy/60">
            14 Sept
          </span>
          <p className="text-[11px] font-semibold text-rose-800">
            ⚠ Booking date: use numbers only, like 14/09/2026.
          </p>
        </div>
      </Hot>

      {/* Good: self-service route */}
      <Hot id="good-selfservice">
        <p className="text-[11px] leading-relaxed text-navy/85">
          🤝 <span className="font-semibold">Pause or cancel online</span>, any
          time, from your account page. No phone call, no office hours, no
          waiting for someone to pick up.
        </p>
      </Hot>

      <p className="pt-1 text-center text-[10px] text-navy/35">
        Practice page — fictional club, invented content.
      </p>
    </div>
  );
}
