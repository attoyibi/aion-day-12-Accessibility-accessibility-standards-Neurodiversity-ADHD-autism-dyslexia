'use client';

import { useState } from 'react';

const SAMPLES = [
  {
    key: 'chart',
    art: (
      <svg viewBox="0 0 120 80" className="h-full w-full" role="presentation">
        <rect width="120" height="80" fill="#EEE9F9" />
        <rect x="14" y="42" width="16" height="26" fill="#5624D0" />
        <rect x="38" y="30" width="16" height="38" fill="#5624D0" />
        <rect x="62" y="18" width="16" height="50" fill="#5624D0" />
        <rect x="86" y="10" width="16" height="58" fill="#231A45" />
        <rect x="10" y="68" width="100" height="2" fill="#231A45" />
      </svg>
    ),
    alt: 'Bar chart: online applications rose from 1,200 in 2021 to 4,800 in 2024.',
    quality: 'good' as const,
  },
  {
    key: 'photo',
    art: (
      <svg viewBox="0 0 120 80" className="h-full w-full" role="presentation">
        <rect width="120" height="80" fill="#DDD3F4" />
        <circle cx="60" cy="30" r="14" fill="#5624D0" />
        <path d="M28 72c0-18 14-28 32-28s32 10 32 28z" fill="#231A45" />
      </svg>
    ),
    alt: null,
    quality: 'missing' as const,
  },
  {
    key: 'icon',
    art: (
      <svg viewBox="0 0 120 80" className="h-full w-full" role="presentation">
        <rect width="120" height="80" fill="#F6F3FC" />
        <path
          d="M40 24h40v34H56l-10 8v-8h-6z"
          fill="none"
          stroke="#5624D0"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    ),
    alt: 'image_2024_final_v3.png',
    quality: 'meaningless' as const,
  },
];

const QUALITY_NOTE = {
  good: { tone: 'text-emerald-800', text: 'Useful — it carries the information the picture carried.' },
  missing: { tone: 'text-rose-800', text: 'Nothing announced. The content simply is not there for this user.' },
  meaningless: { tone: 'text-amber-800', text: 'Announced, but worthless. A filename is not a description.' },
};

export function AltTextWidget() {
  const [srView, setSrView] = useState(false);

  return (
    <div className="space-y-4">
      <button
        type="button"
        aria-pressed={srView}
        onClick={() => setSrView((s) => !s)}
        className={srView ? 'aion-btn bg-navy text-white hover:bg-navy-soft' : 'aion-btn-ghost'}
      >
        {srView ? '🔊 Screen-reader view: ON' : '👁 Screen-reader view: OFF'}
      </button>

      <div className="grid gap-3 sm:grid-cols-3">
        {SAMPLES.map((s) => {
          const note = QUALITY_NOTE[s.quality];
          return (
            <figure
              key={s.key}
              className="overflow-hidden rounded-xl border border-lilac-edge bg-white"
            >
              <div className="grid h-24 place-items-center overflow-hidden bg-lilac-soft p-0">
                {srView ? (
                  <p
                    className={`px-3 py-2 text-center text-[11px] font-semibold leading-snug ${
                      s.alt ? 'text-navy' : 'text-rose-700'
                    }`}
                  >
                    {s.alt ? `“${s.alt}”` : '[ no alt text ]'}
                  </p>
                ) : (
                  s.art
                )}
              </div>
              <figcaption className={`px-3 py-2 text-[11px] leading-relaxed ${note.tone}`}>
                {srView ? note.text : 'Looks fine, doesn’t it?'}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <p className="text-[11px] leading-relaxed text-navy/60">
        Flip the toggle a few times. Sighted users see three perfectly good
        images; a screen-reader user gets one description, one silence and one
        filename.
      </p>
    </div>
  );
}
