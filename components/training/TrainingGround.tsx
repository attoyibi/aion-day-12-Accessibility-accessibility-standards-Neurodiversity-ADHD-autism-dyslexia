'use client';

import { useMemo, useState } from 'react';
import { CATEGORIES, PORTAL_CATEGORY_IDS } from '@/lib/categories';
import { usePersistentState } from '@/lib/storage';
import { MockClubPage } from './MockClubPage';
import { RevealCard } from './RevealCard';
import { getSpot, SPOTS, TOTAL_SPOTS } from './spots';
import type { TabId } from '@/lib/tabs';

interface Progress {
  /** spot id → the call the learner made */
  calls: Record<string, 'barrier' | 'good'>;
  streak: number;
  bestStreak: number;
}

const EMPTY: Progress = { calls: {}, streak: 0, bestStreak: 0 };

const LEVELS = [
  { min: 0, name: 'Rookie', icon: '🌱', line: 'Just getting your eye in.' },
  { min: 40, name: 'Sharp Eye', icon: '🔍', line: 'You are catching things at a glance now.' },
  { min: 80, name: 'Inclusive Pro', icon: '🏅', line: 'You can walk into a review and name what is wrong.' },
];

export function TrainingGround({ onNavigate }: { onNavigate: (t: TabId) => void }) {
  const { value: progress, setValue: setProgress, reset } = usePersistentState<Progress>(
    'training',
    EMPTY,
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [fixed, setFixed] = useState<string[]>([]);

  const found = useMemo(() => Object.keys(progress.calls), [progress.calls]);
  const xp = Math.round((found.length / TOTAL_SPOTS) * 100);

  const earnedBadges = useMemo(() => {
    const set = new Set<string>();
    found.forEach((id) => {
      const s = getSpot(id);
      if (progress.calls[id] === s.verdict) set.add(s.category);
    });
    return set;
  }, [found, progress.calls]);

  const level =
    [...LEVELS].reverse().find((l) => xp >= l.min) ?? LEVELS[0];

  const call = (verdict: 'barrier' | 'good') => {
    if (!selected) return;
    const spot = getSpot(selected);
    const correct = verdict === spot.verdict;
    setProgress((p) => {
      if (p.calls[selected]) return p;
      const streak = correct ? p.streak + 1 : 0;
      return {
        calls: { ...p.calls, [selected]: verdict },
        streak,
        bestStreak: Math.max(p.bestStreak, streak),
      };
    });
  };

  const toggleFix = () => {
    if (!selected) return;
    setFixed((f) =>
      f.includes(selected) ? f.filter((x) => x !== selected) : [...f, selected],
    );
  };

  const hardReset = () => {
    reset();
    setSelected(null);
    setFixed([]);
  };

  const selectedSpot = selected ? getSpot(selected) : null;
  const complete = found.length === TOTAL_SPOTS;

  return (
    <div className="space-y-4">
      <div className="aion-card p-4">
        <h2 className="text-lg font-bold text-navy">🎯 Training Ground</h2>
        <p className="mt-1 text-sm leading-relaxed text-navy/70">
          A warm-up hunt on a fictional practice page. Find the barriers, call
          each one, and read why it matters. This is the only tab with hints and
          reveals — and none of these elements appear in the graded cases.
        </p>
      </div>

      {/* ── Scoreboard ─────────────────────────────────────────── */}
      <div className="aion-card space-y-3 p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
              Level
            </p>
            <p className="text-lg font-black text-navy">
              <span aria-hidden="true">{level.icon}</span> {level.name}
            </p>
            <p className="text-[11px] text-navy/60">{level.line}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
                Streak
              </p>
              <p className="text-lg font-black text-purple">
                {progress.streak > 0 ? `🔥 ${progress.streak}` : '—'}
              </p>
              <p className="text-[10px] text-navy/45">best {progress.bestStreak}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
                Found
              </p>
              <p className="text-lg font-black text-navy tabular-nums">
                {found.length}/{TOTAL_SPOTS}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div
            className="h-3 w-full overflow-hidden rounded-full bg-lilac"
            role="progressbar"
            aria-valuenow={xp}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Experience"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple to-purple-bright transition-all duration-500"
              style={{ width: `${xp}%` }}
            />
          </div>
          <p className="mt-1 text-right text-[11px] font-bold tabular-nums text-navy/60">
            {xp}% XP
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            Category badges
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {PORTAL_CATEGORY_IDS.map((id) => {
              const c = CATEGORIES[id];
              const earned = earnedBadges.has(id);
              return (
                <span
                  key={id}
                  className={`aion-chip ${
                    earned ? c.chipActive : 'border-lilac-edge bg-lilac-soft text-navy/35'
                  }`}
                  title={
                    earned
                      ? `${c.label} badge earned`
                      : `Call a ${c.label} spot correctly to earn this`
                  }
                >
                  <span aria-hidden="true">{earned ? c.icon : '🔒'}</span>
                  {c.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-lilac-edge pt-3">
          <button type="button" onClick={hardReset} className="aion-btn-ghost !py-1.5 !text-xs">
            ↺ Reset progress
          </button>
          <p className="text-[11px] text-navy/50">
            Saved in this browser only. No timer, no leaderboard, nothing to fail.
          </p>
        </div>
      </div>

      {/* ── The hunt ───────────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
        <div className="max-h-[36rem] overflow-y-auto rounded-xl bg-lilac-soft p-1">
          <MockClubPage
            onSelect={(id) => setSelected(id)}
            selected={selected}
            found={found}
            fixed={fixed}
          />
        </div>

        <div className="lg:sticky lg:top-4">
          <RevealCard
            spot={selectedSpot}
            call={selected ? (progress.calls[selected] ?? null) : null}
            onCall={call}
            fixedOn={selected ? fixed.includes(selected) : false}
            onToggleFix={toggleFix}
          />
        </div>
      </div>

      {/* ── Bridge to the assessment ───────────────────────────── */}
      <div
        className={`aion-card overflow-hidden ${complete ? 'ring-2 ring-purple' : ''}`}
      >
        <div className="bg-navy px-4 py-2.5">
          <p className="text-sm font-bold text-white">
            {complete ? '🎉 All spots found — next step' : '→ Where this is going'}
          </p>
        </div>
        <div className="p-4">
          <p className="text-sm leading-relaxed text-navy/80">
            You practiced spotting barriers. In <strong>Task 1</strong>{' '}
            you&apos;ll do this on the real PublicAccess portal — but there
            you&apos;ll also categorize, describe user impact, and prioritize.{' '}
            <strong>No reveals there.</strong>
          </p>
          <button
            type="button"
            onClick={() => onNavigate('publicaccess')}
            className="aion-btn-primary mt-3"
          >
            Go to PublicAccess →
          </button>
        </div>
      </div>

      <details className="aion-card p-4">
        <summary className="cursor-pointer text-xs font-semibold text-navy">
          What was on this page? ({SPOTS.filter((s) => s.verdict === 'barrier').length}{' '}
          barriers, {SPOTS.filter((s) => s.verdict === 'good').length} good patterns)
        </summary>
        <p className="mt-2 text-[11px] leading-relaxed text-navy/60">
          Colour-only status, low contrast, missing alt text, a control that
          isn&apos;t keyboard operable, jargon and long nested sentences, a vague
          error, and inconsistent action naming — against a visible focus ring, a
          clearly labelled error, sufficient contrast, and a self-service route.
          The graded cases contain different elements; nothing here is an answer
          key for them.
        </p>
      </details>
    </div>
  );
}
