'use client';

import { useState } from 'react';
import { CATEGORIES, STRUCTURE_CATEGORY_IDS } from '@/lib/categories';
import { usePersistentState } from '@/lib/storage';

/**
 * ── CASE STUDY — TASK 3 ─────────────────────────────────────────────────────
 *
 * Placeholder slot for the existing, already-built CitizenConnect artifact.
 *
 * To plug it in, either:
 *   a) drop the artifact's URL into the field below (kept in localStorage,
 *      so it survives reloads without a rebuild), or
 *   b) set CITIZEN_CONNECT_URL to a fixed value and the field disappears from
 *      the trainer's way, or
 *   c) replace <CitizenConnectSlot /> with the artifact's own component.
 *
 * DO NOT add hints, reveals or annotations here either — Task 3 is graded.
 */
const CITIZEN_CONNECT_URL = '';

export function CitizenConnect() {
  return (
    <div className="space-y-4">
      <div className="aion-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-bold text-navy">🏢 CitizenConnect</h2>
          <span className="aion-chip border-navy bg-navy text-white">Task 3</span>
          <span className="aion-chip border-lilac-edge bg-lilac text-navy">
            No hints · no reveals
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-navy/70">
          The case study for Task 3. Work through the artifact below, collect the
          barriers, group them by category, and turn the list into a
          recommendation — what you would fix first, and what you would argue can
          wait.
        </p>
      </div>

      {/* Category set reminder — this case swaps Participation for Consistency */}
      <div className="aion-card p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
          Category set for this case
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {STRUCTURE_CATEGORY_IDS.map((id) => {
            const c = CATEGORIES[id];
            return (
              <span
                key={id}
                className={`aion-chip ${
                  id === 'consistency' ? c.chipActive : c.chip
                }`}
              >
                <span aria-hidden="true">{c.icon}</span>
                {c.label}
                <span className="font-normal opacity-70">({c.de})</span>
              </span>
            );
          })}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-navy/65">
          Note the fifth slot: this is a <strong>structure</strong> case, so it
          uses <strong>Consistency (Konsistenz)</strong> — not Participation.
          Same first four categories as Task 1.
        </p>
      </div>

      <CitizenConnectSlot />
    </div>
  );
}

function CitizenConnectSlot() {
  const { value: savedUrl, setValue: setSavedUrl } = usePersistentState(
    'citizenconnect-url',
    '',
  );
  const [draft, setDraft] = useState('');
  const url = CITIZEN_CONNECT_URL || savedUrl;

  if (url) {
    return (
      <div className="space-y-2">
        <div className="overflow-hidden rounded-xl border border-lilac-edge bg-white shadow-card">
          <iframe
            src={url}
            title="CitizenConnect case study"
            className="h-[42rem] w-full border-0"
          />
        </div>
        {!CITIZEN_CONNECT_URL && (
          <button
            type="button"
            onClick={() => setSavedUrl('')}
            className="text-[11px] font-semibold text-purple underline underline-offset-2"
          >
            Change the embedded artifact
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-dashed border-purple/50 bg-white p-6">
      <div className="mx-auto max-w-xl space-y-4 text-center">
        <p className="text-3xl" aria-hidden="true">
          🏢
        </p>
        <div>
          <p className="text-sm font-bold text-navy">
            CitizenConnect artifact goes here
          </p>
          <p className="mt-1 text-xs leading-relaxed text-navy/65">
            This is a placeholder slot. Point it at the CitizenConnect artifact
            that was already built for this module — paste its URL below, or set{' '}
            <code className="rounded bg-lilac px-1 py-0.5 text-[10px]">
              CITIZEN_CONNECT_URL
            </code>{' '}
            in{' '}
            <code className="rounded bg-lilac px-1 py-0.5 text-[10px]">
              components/cases/CitizenConnect.tsx
            </code>
            , or swap this component for the artifact&apos;s own.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (draft.trim()) setSavedUrl(draft.trim());
          }}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <label htmlFor="cc-url" className="sr-only">
            CitizenConnect artifact URL
          </label>
          <input
            id="cc-url"
            type="url"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="https://…"
            className="min-w-0 flex-1 rounded-lg border border-lilac-edge px-3 py-2 text-sm"
          />
          <button type="submit" className="aion-btn-primary shrink-0">
            Embed
          </button>
        </form>

        <p className="text-[11px] text-navy/45">
          The URL is stored in this browser only. Some hosts refuse to be framed;
          if the embed stays blank, open the artifact in its own tab instead.
        </p>
      </div>
    </div>
  );
}
