'use client';

import { useState } from 'react';
import { Segmented } from '@/components/ui/Segmented';

type Mode = 'vague' | 'specific';

export function ErrorToleranceWidget() {
  const [mode, setMode] = useState<Mode>('vague');
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const valid = /^\d{2}\.\d{2}\.\d{4}$/.test(date.trim());
  const showError = submitted && !valid;
  const showSuccess = submitted && valid;

  const reset = (m: Mode) => {
    setMode(m);
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      <Segmented
        label="Error message style"
        value={mode}
        onChange={reset}
        options={[
          { value: 'vague', label: 'Vague error' },
          { value: 'specific', label: 'Specific, labelled error' },
        ]}
      />

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-3 rounded-xl border border-lilac-edge bg-lilac-soft p-4"
      >
        {showError && mode === 'vague' && (
          <p className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-900">
            Input invalid.
          </p>
        )}

        {showError && mode === 'specific' && (
          <p
            role="alert"
            className="rounded-lg border-l-4 border-rose-700 bg-rose-50 px-3 py-2 text-sm text-rose-900"
          >
            <span className="font-bold">1 field needs your attention:</span>{' '}
            <a href="#et-date" className="underline underline-offset-2">
              Date of birth
            </a>
          </p>
        )}

        <div>
          <label htmlFor="et-date" className="block text-xs font-semibold text-navy">
            Date of birth
            {mode === 'specific' && (
              <span className="ml-1 font-normal text-navy/60">
                — format DD.MM.YYYY, for example 04.11.1986
              </span>
            )}
          </label>
          <input
            id="et-date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setSubmitted(false);
            }}
            aria-invalid={showError || undefined}
            aria-describedby={
              mode === 'specific'
                ? showError
                  ? 'et-date-error et-date-hint'
                  : 'et-date-hint'
                : undefined
            }
            className={`mt-1 w-full max-w-xs rounded-lg border bg-white px-3 py-2 text-sm ${
              showError && mode === 'specific'
                ? 'border-rose-700 ring-2 ring-rose-200'
                : 'border-lilac-edge'
            }`}
          />
          {mode === 'specific' && (
            <p id="et-date-hint" className="mt-1 text-[11px] text-navy/55">
              Numbers only, separated by dots.
            </p>
          )}
          {showError && mode === 'specific' && (
            <p id="et-date-error" className="mt-1 text-xs font-semibold text-rose-800">
              ⚠ This does not look like a date yet. Write it as DD.MM.YYYY —
              e.g. 04.11.1986.
            </p>
          )}
        </div>

        {showSuccess && (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900">
            ✓ Accepted. Nothing lost, nothing retyped.
          </p>
        )}

        <button type="submit" className="aion-btn-primary !py-1.5 !text-xs">
          Submit
        </button>
      </form>

      <p className="rounded-lg bg-lilac px-3 py-2 text-xs leading-relaxed text-navy/75">
        {mode === 'vague'
          ? 'Press Submit with the field empty or wrong. “Input invalid” tells you that something is wrong, not what or where. With several fields on screen it becomes a guessing game — and guessing is exactly what someone with ADHD, dyslexia or a screen reader cannot afford to do.'
          : 'Press Submit again. Now the message names the field, links to it, states the expected format and gives an example. Same failure, but the user can recover on their own.'}
      </p>
    </div>
  );
}
