'use client';

import { useMemo, useState } from 'react';

/** Relative luminance of an sRGB grey value (0–255), per WCAG 2.x. */
function greyLuminance(v: number): number {
  const s = v / 255;
  const lin = s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  return lin; // R = G = B, and 0.2126 + 0.7152 + 0.0722 = 1
}

function contrastOnWhite(v: number): number {
  return 1.05 / (greyLuminance(v) + 0.05);
}

function verdict(ratio: number) {
  if (ratio >= 7)
    return {
      badge: 'AAA',
      tone: 'bg-emerald-700 text-white',
      line: 'Passes AAA — comfortable for low vision, tired eyes and bad screens.',
    };
  if (ratio >= 4.5)
    return {
      badge: 'AA',
      tone: 'bg-emerald-600 text-white',
      line: 'Passes AA — the legal baseline for normal body text.',
    };
  if (ratio >= 3)
    return {
      badge: 'AA large only',
      tone: 'bg-amber-500 text-navy',
      line: 'Only good enough for large or bold text. Fails as body text.',
    };
  return {
    badge: 'Fail',
    tone: 'bg-rose-700 text-white',
    line: 'Fails. Readable on your monitor, invisible in sunlight or with low vision.',
  };
}

export function ContrastSliderWidget() {
  // 0 = black text, 255 = white text (on a white card)
  const [grey, setGrey] = useState(168);

  const ratio = useMemo(() => contrastOnWhite(grey), [grey]);
  const v = verdict(ratio);
  const colour = `rgb(${grey},${grey},${grey})`;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-lilac-edge bg-white p-4">
        <p className="text-base leading-relaxed" style={{ color: colour }}>
          Applications submitted after 31 March are processed in the following
          quarter.
        </p>
        <p className="mt-1 text-xs" style={{ color: colour }}>
          Small print suffers first — same colour, half the size.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label
          htmlFor="contrast-slider"
          className="text-xs font-semibold text-navy sm:w-32"
        >
          Text lightness
        </label>
        <input
          id="contrast-slider"
          type="range"
          min={0}
          max={255}
          value={grey}
          onChange={(e) => setGrey(Number(e.target.value))}
          className="h-2 flex-1 cursor-pointer accent-purple"
          aria-describedby="contrast-readout"
        />
        <output
          id="contrast-readout"
          className="flex items-center gap-2 text-sm font-bold text-navy sm:w-44 sm:justify-end"
        >
          <span className="tabular-nums">{ratio.toFixed(2)} : 1</span>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${v.tone}`}
          >
            {v.badge}
          </span>
        </output>
      </div>

      <p
        aria-live="polite"
        className="rounded-lg bg-lilac px-3 py-2 text-xs leading-relaxed text-navy/80"
      >
        {v.line}
      </p>

      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Typical "soft grey" brand text', v: 168 },
          { label: 'AA threshold (4.5:1)', v: 118 },
          { label: 'AAA threshold (7:1)', v: 90 },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setGrey(p.v)}
            className="aion-btn-ghost !px-3 !py-1.5 !text-[11px]"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
