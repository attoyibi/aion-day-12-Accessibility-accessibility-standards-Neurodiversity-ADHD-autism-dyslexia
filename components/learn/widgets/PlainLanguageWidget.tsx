'use client';

import { useMemo, useState } from 'react';

const JARGON =
  'Insofar as the aforementioned documentation, having been submitted in accordance with the applicable statutory provisions, is subsequently deemed incomplete by the responsible administrative body, a supplementary request shall be issued to the applicant, whereupon the processing period recommences in its entirety.';

const PLAIN =
  'If your documents are incomplete, we will write to you. We will tell you exactly what is missing. The processing time starts again when we receive it.';

/** Rough reading-effort estimate: sentence length plus share of long words. */
function readingEffort(text: string) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter(Boolean);
  const longWords = words.filter((w) => w.replace(/[^a-zA-Z]/g, '').length >= 10);
  const avgSentence = words.length / Math.max(sentences.length, 1);
  const longRatio = longWords.length / Math.max(words.length, 1);
  const index = 0.4 * (avgSentence + 100 * longRatio);
  return {
    sentences: sentences.length,
    words: words.length,
    avgSentence,
    longWords: longWords.length,
    index,
    pct: Math.max(4, Math.min(100, Math.round((index / 22) * 100))),
  };
}

function band(index: number) {
  if (index < 8) return { label: 'Easy', tone: 'bg-emerald-600', text: 'text-emerald-800' };
  if (index < 12) return { label: 'Moderate', tone: 'bg-lime-600', text: 'text-lime-800' };
  if (index < 17) return { label: 'Hard', tone: 'bg-amber-500', text: 'text-amber-800' };
  return { label: 'Very hard', tone: 'bg-rose-700', text: 'text-rose-800' };
}

export function PlainLanguageWidget() {
  const [plain, setPlain] = useState(false);
  const text = plain ? PLAIN : JARGON;
  const m = useMemo(() => readingEffort(text), [text]);
  const b = band(m.index);

  return (
    <div className="space-y-4">
      <button
        type="button"
        aria-pressed={plain}
        onClick={() => setPlain((p) => !p)}
        className={plain ? 'aion-btn bg-emerald-700 text-white hover:bg-emerald-800' : 'aion-btn-ghost'}
      >
        {plain ? '✨ Simplify: ON' : '✨ Simplify: OFF'}
      </button>

      <p className="rounded-xl border border-lilac-edge bg-white p-4 text-sm leading-relaxed text-navy">
        {text}
      </p>

      <div className="space-y-2 rounded-xl bg-lilac-soft p-3">
        <div className="flex items-baseline justify-between">
          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
            Reading effort
          </p>
          <p className={`text-sm font-bold ${b.text}`} aria-live="polite">
            {b.label}
          </p>
        </div>
        <div
          className="h-3 w-full overflow-hidden rounded-full bg-white"
          role="meter"
          aria-valuenow={m.pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading effort"
        >
          <div
            className={`h-full rounded-full transition-all duration-300 ${b.tone}`}
            style={{ width: `${m.pct}%` }}
          />
        </div>
        <dl className="grid grid-cols-3 gap-2 text-center text-[11px] text-navy/70">
          <div>
            <dt className="text-navy/45">Sentences</dt>
            <dd className="text-sm font-bold text-navy">{m.sentences}</dd>
          </div>
          <div>
            <dt className="text-navy/45">Words / sentence</dt>
            <dd className="text-sm font-bold text-navy">{m.avgSentence.toFixed(1)}</dd>
          </div>
          <div>
            <dt className="text-navy/45">Long words</dt>
            <dd className="text-sm font-bold text-navy">{m.longWords}</dd>
          </div>
        </dl>
      </div>

      <p className="text-[11px] leading-relaxed text-navy/60">
        Same legal meaning, same obligations. One version costs a reader with
        dyslexia, ADHD or a second language ten minutes and a phone call; the
        other costs eight seconds.
      </p>
    </div>
  );
}
