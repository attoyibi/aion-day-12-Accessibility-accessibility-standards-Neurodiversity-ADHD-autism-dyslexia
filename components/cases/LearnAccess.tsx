'use client';

import { useEffect, useState } from 'react';

/**
 * ── ASSESSMENT CASE — TASK 2 ────────────────────────────────────────────────
 *
 * Three variants of the same fictional learning platform. The learner is meant
 * to EXPERIENCE the trade-offs by using all three, so every variant is real:
 * real text sizes, real contrast values, real focus behaviour, real controls.
 *
 * DO NOT mark a "best" variant, add reveals, or annotate the differences.
 * Each variant is a defensible choice with a cost attached — naming that cost
 * is the learner's job.
 *
 *   A — strongly branded, reduced contrast, small text.
 *   B — high contrast, plain language, strong focus, plainer brand.
 *   C — accessible baseline plus working adjustment controls, heavier UI.
 */

type Variant = 'A' | 'B' | 'C';
type Page = 'home' | 'course';

const COURSES = [
  { id: 'c1', title: 'Data protection basics', meta: '4 modules · 2 h 10 min' },
  { id: 'c2', title: 'Writing for the web', meta: '6 modules · 3 h 40 min' },
  { id: 'c3', title: 'Project finance essentials', meta: '5 modules · 2 h 55 min' },
];

export function LearnAccess() {
  const [variant, setVariant] = useState<Variant>('A');
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="space-y-4">
      <div className="aion-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-bold text-navy">🎓 LearnAccess</h2>
          <span className="aion-chip border-navy bg-navy text-white">Task 2</span>
          <span className="aion-chip border-lilac-edge bg-lilac text-navy">
            No hints · no reveals
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-navy/70">
          The same learning platform, built three ways. Switch between them and
          actually use each one — read the course text, Tab through the buttons,
          open a course. The differences are meant to be felt, not listed.
        </p>
      </div>

      {/* Switchers */}
      <div className="aion-card flex flex-wrap items-center gap-4 p-3">
        <div role="group" aria-label="Variant" className="flex items-center gap-2">
          <span className="text-xs font-semibold text-navy">Variant</span>
          <div className="inline-flex gap-1 rounded-xl border border-lilac-edge bg-lilac-soft p-1">
            {(['A', 'B', 'C'] as Variant[]).map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={variant === v}
                onClick={() => setVariant(v)}
                className={`rounded-lg px-4 py-1.5 text-sm font-bold transition-colors ${
                  variant === v
                    ? 'bg-purple text-white'
                    : 'text-navy/70 hover:bg-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div role="group" aria-label="Page" className="flex items-center gap-2">
          <span className="text-xs font-semibold text-navy">Page</span>
          <div className="inline-flex gap-1 rounded-xl border border-lilac-edge bg-lilac-soft p-1">
            {(
              [
                ['home', 'Homepage'],
                ['course', 'Course page'],
              ] as [Page, string][]
            ).map(([p, label]) => (
              <button
                key={p}
                type="button"
                aria-pressed={page === p}
                onClick={() => setPage(p)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  page === p ? 'bg-navy text-white' : 'text-navy/70 hover:bg-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {variant === 'A' && <VariantA page={page} onOpen={() => setPage('course')} />}
      {variant === 'B' && <VariantB page={page} onOpen={() => setPage('course')} />}
      {variant === 'C' && <VariantC page={page} onOpen={() => setPage('course')} />}
    </div>
  );
}

/* ───────────────────────── Variant A ───────────────────────────────────── */
/* Strongly branded. Reduced contrast, small type, thin weights.             */

function VariantA({ page, onOpen }: { page: Page; onOpen: () => void }) {
  return (
    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-[#171033] via-[#2A1560] to-[#120C26] shadow-card">
      <div className="flex items-center justify-between px-5 py-4">
        <p className="text-base font-black tracking-tight text-white/70">
          learnaccess<span className="text-[#7B5BE0]">.</span>
        </p>
        <div className="flex gap-4 text-[10px] font-light text-white/25">
          <span>Catalogue</span>
          <span>Paths</span>
          <span>My learning</span>
        </div>
      </div>

      {page === 'home' ? (
        <div className="px-5 pb-6">
          <p className="text-2xl font-black leading-tight tracking-tight text-white/55">
            Learn what moves you forward.
          </p>
          <p className="mt-2 max-w-md text-[10px] font-light leading-relaxed text-white/30">
            Curated micro-courses from practitioners. Adaptive pathways,
            certificates on completion, and a library that grows every week.
          </p>
          <button
            type="button"
            onClick={onOpen}
            className="mt-4 rounded-full border border-white/15 px-5 py-2 text-[11px] font-light text-white/40 hover:border-white/25"
          >
            Explore the catalogue
          </button>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {COURSES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={onOpen}
                className="rounded-xl bg-white/[0.04] p-3 text-left hover:bg-white/[0.07]"
              >
                <p className="text-[11px] font-medium text-white/45">{c.title}</p>
                <p className="mt-1 text-[9px] font-light text-white/20">{c.meta}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-5 pb-6">
          <p className="text-[9px] font-light uppercase tracking-[0.2em] text-white/25">
            Course
          </p>
          <p className="mt-1 text-xl font-black tracking-tight text-white/55">
            Data protection basics
          </p>
          <p className="mt-3 max-w-lg text-[10px] font-light leading-relaxed text-white/30">
            Over four modules you will work through the legal basis for
            processing, the rights of data subjects, and the practical documents
            your team is expected to keep. Each module closes with a short
            scenario exercise.
          </p>

          <div className="mt-4 space-y-1.5">
            {['Legal basis', 'Data subject rights', 'Records of processing', 'Incident response'].map(
              (m, i) => (
                <div
                  key={m}
                  className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2"
                >
                  <span className="text-[10px] font-light text-white/40">
                    {i + 1}. {m}
                  </span>
                  <span className="text-[9px] font-light text-white/20">
                    {i === 0 ? 'completed' : 'not started'}
                  </span>
                </div>
              ),
            )}
          </div>

          <button
            type="button"
            className="mt-4 rounded-full bg-[#4A2BB5] px-5 py-2 text-[11px] font-light text-white/60"
          >
            Continue module 2
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Variant B ───────────────────────────────────── */
/* High contrast, plain language, obvious focus. Visually unremarkable.      */

function VariantB({ page, onOpen }: { page: Page; onOpen: () => void }) {
  const btn =
    'rounded-md bg-[#1A1A1A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-black focus-visible:outline focus-visible:outline-[4px] focus-visible:outline-offset-2 focus-visible:outline-[#0047AB]';

  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#1A1A1A] bg-white shadow-card">
      <div className="flex items-center justify-between border-b-2 border-[#1A1A1A] px-5 py-3">
        <p className="text-base font-bold text-[#1A1A1A]">LearnAccess</p>
        <div className="flex gap-3">
          {['Courses', 'My learning', 'Help'].map((l) => (
            <button
              key={l}
              type="button"
              className="rounded px-2 py-1 text-sm font-semibold text-[#1A1A1A] underline underline-offset-2 focus-visible:outline focus-visible:outline-[4px] focus-visible:outline-offset-2 focus-visible:outline-[#0047AB]"
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {page === 'home' ? (
        <div className="space-y-4 px-5 py-5">
          <h3 className="text-2xl font-bold text-[#1A1A1A]">Find a course</h3>
          <p className="max-w-xl text-base leading-relaxed text-[#1A1A1A]">
            Every course is split into short modules. You can stop at any point
            and carry on later. Most people finish a module in about 25 minutes.
          </p>
          <button type="button" onClick={onOpen} className={btn}>
            Browse all courses
          </button>

          <ul className="space-y-2">
            {COURSES.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={onOpen}
                  className="w-full rounded-md border-2 border-[#1A1A1A] p-3 text-left hover:bg-[#F0F0F0] focus-visible:outline focus-visible:outline-[4px] focus-visible:outline-offset-2 focus-visible:outline-[#0047AB]"
                >
                  <span className="block text-base font-bold text-[#1A1A1A]">
                    {c.title}
                  </span>
                  <span className="block text-sm text-[#1A1A1A]">{c.meta}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="space-y-4 px-5 py-5">
          <p className="text-sm font-bold uppercase tracking-wide text-[#1A1A1A]">
            Course
          </p>
          <h3 className="text-2xl font-bold text-[#1A1A1A]">
            Data protection basics
          </h3>
          <p className="max-w-xl text-base leading-relaxed text-[#1A1A1A]">
            This course has four modules. You will learn when you are allowed to
            use personal data, what people can ask you to do with their data,
            and which records you must keep. Each module ends with one short
            exercise.
          </p>

          <ol className="space-y-2">
            {[
              ['When you may use personal data', 'Done'],
              ['What people can ask you to do', 'Not started'],
              ['Records you must keep', 'Not started'],
              ['What to do after a data breach', 'Not started'],
            ].map(([m, s], i) => (
              <li
                key={m}
                className="flex items-center justify-between gap-3 rounded-md border-2 border-[#1A1A1A] px-3 py-2.5"
              >
                <span className="text-base font-semibold text-[#1A1A1A]">
                  {i + 1}. {m}
                </span>
                <span
                  className={`shrink-0 rounded px-2 py-0.5 text-sm font-bold ${
                    s === 'Done'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'border-2 border-[#1A1A1A] text-[#1A1A1A]'
                  }`}
                >
                  {s === 'Done' ? '✓ Done' : s}
                </span>
              </li>
            ))}
          </ol>

          <button type="button" className={btn}>
            Start module 2
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Variant C ───────────────────────────────────── */
/* Accessible baseline plus real adjustment controls — and a heavier shell.  */

function VariantC({ page, onOpen }: { page: Page; onOpen: () => void }) {
  const [scale, setScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [loading, setLoading] = useState(false);

  // Every navigation runs through the platform's loading pipeline.
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [page]);

  const shell = highContrast
    ? 'bg-black text-white'
    : 'bg-white text-[#232323]';
  const panel = highContrast
    ? 'border-white bg-black text-white'
    : 'border-[#D5D8E0] bg-[#FAFAFC] text-[#232323]';
  const cta = highContrast
    ? 'bg-[#FFE500] text-black hover:bg-yellow-300'
    : 'bg-[#2B3A67] text-white hover:bg-[#1F2B4D]';

  return (
    <div className={`overflow-hidden rounded-xl border shadow-card ${panel}`}>
      {/* Utility bar */}
      <div className={`border-b px-3 py-2 ${highContrast ? 'border-white' : 'border-[#D5D8E0]'}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold">Text size</span>
            {[
              [90, 'A−'],
              [100, 'A'],
              [125, 'A+'],
              [150, 'A++'],
            ].map(([v, l]) => (
              <button
                key={String(v)}
                type="button"
                aria-pressed={scale === v}
                onClick={() => setScale(v as number)}
                className={`rounded border px-2 py-0.5 text-[11px] font-bold ${
                  scale === v
                    ? highContrast
                      ? 'border-white bg-white text-black'
                      : 'border-[#2B3A67] bg-[#2B3A67] text-white'
                    : highContrast
                      ? 'border-white'
                      : 'border-[#D5D8E0] bg-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-pressed={highContrast}
            onClick={() => setHighContrast((h) => !h)}
            className={`rounded border px-2.5 py-0.5 text-[11px] font-bold ${
              highContrast ? 'border-white bg-[#FFE500] text-black' : 'border-[#D5D8E0] bg-white'
            }`}
          >
            ◐ Contrast mode: {highContrast ? 'on' : 'off'}
          </button>

          <span className="text-[10px] opacity-60">
            Settings apply to this preview only
          </span>
        </div>
      </div>

      {/* Breadcrumb + toolbar layers */}
      <div className={`border-b px-3 py-1.5 text-[11px] ${highContrast ? 'border-white' : 'border-[#D5D8E0]'}`}>
        Home <span aria-hidden="true">›</span> Catalogue{' '}
        <span aria-hidden="true">›</span>{' '}
        {page === 'home' ? 'All courses' : 'Data protection basics'}
      </div>
      <div className={`flex flex-wrap gap-1.5 border-b px-3 py-1.5 ${highContrast ? 'border-white' : 'border-[#D5D8E0]'}`}>
        {['Filter', 'Sort', 'Saved', 'Print view', 'Share'].map((t) => (
          <span
            key={t}
            className={`rounded border px-2 py-0.5 text-[10px] ${
              highContrast ? 'border-white' : 'border-[#D5D8E0] bg-white'
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className={`p-4 ${shell}`} style={{ fontSize: `${scale}%` }}>
        {loading ? (
          <div className="space-y-2" aria-live="polite">
            <p className="text-[0.8em] opacity-70">Loading content…</p>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-4 animate-pulse rounded ${
                  highContrast ? 'bg-white/25' : 'bg-[#E6E8EF]'
                }`}
                style={{ width: `${90 - i * 12}%` }}
              />
            ))}
          </div>
        ) : page === 'home' ? (
          <div className="space-y-3">
            <h3 className="text-[1.4em] font-bold">All courses</h3>
            <p className="max-w-xl text-[0.95em] leading-relaxed">
              Choose a course to see its modules. You can change the text size
              and turn on contrast mode at any time using the bar above.
            </p>
            <div className="space-y-2">
              {COURSES.map((c) => (
                <div
                  key={c.id}
                  className={`rounded border p-2 ${highContrast ? 'border-white' : 'border-[#D5D8E0]'}`}
                >
                  <div className={`rounded border p-2 ${highContrast ? 'border-white/60' : 'border-[#E6E8EF]'}`}>
                    <p className="text-[0.95em] font-bold">{c.title}</p>
                    <p className="text-[0.8em] opacity-75">{c.meta}</p>
                    <button
                      type="button"
                      onClick={onOpen}
                      className={`mt-1.5 rounded px-3 py-1.5 text-[0.8em] font-semibold ${cta}`}
                    >
                      Open course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-[1.4em] font-bold">Data protection basics</h3>
            <p className="max-w-xl text-[0.95em] leading-relaxed">
              Four modules. You can stop after any module and come back later —
              your progress is saved automatically.
            </p>
            <div className="space-y-2">
              {[
                ['When you may use personal data', true],
                ['What people can ask you to do', false],
                ['Records you must keep', false],
                ['What to do after a data breach', false],
              ].map(([m, done], i) => (
                <div
                  key={String(m)}
                  className={`rounded border p-1.5 ${highContrast ? 'border-white' : 'border-[#D5D8E0]'}`}
                >
                  <div className={`flex items-center justify-between gap-2 rounded border px-2 py-1.5 ${highContrast ? 'border-white/60' : 'border-[#E6E8EF]'}`}>
                    <span className="text-[0.9em] font-semibold">
                      {i + 1}. {String(m)}
                    </span>
                    <span className="shrink-0 text-[0.75em] font-bold">
                      {done ? '✓ Completed' : 'Not started'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className={`rounded px-4 py-2 text-[0.85em] font-semibold ${cta}`}>
              Start module 2
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
