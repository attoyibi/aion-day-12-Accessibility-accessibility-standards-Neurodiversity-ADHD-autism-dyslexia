'use client';

/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */

import { useState } from 'react';
import { usePersistentState } from '@/lib/storage';
import {
  ICON_HELP,
  ICON_PASSPORT,
  ICON_VEHICLE,
  ICON_WASTE,
  IMG_CREST,
  IMG_TOWNHALL,
} from './publicAccessAssets';

/**
 * ── ASSESSMENT CASE — TASK 1 ────────────────────────────────────────────────
 *
 * A functional mock civic-service portal with the barriers the curriculum
 * plants. Everything here is FROZEN: no randomness, no variation between
 * learners or reloads.
 *
 * DO NOT add reveals, hints, annotations, tooltips or auto-fixes to this
 * component. The learner's job is to find these unaided. The only affordance
 * allowed is the neutral "Try me" nudge, which points at *interaction*
 * (press Tab, submit the form) and never at a finding.
 *
 * The planted barriers, for maintainers only — never rendered:
 *   1. Main navigation is mouse-only (div + onClick, not focusable).
 *   2. Form field order: DOM order and visual order disagree, so the tab path
 *      jumps. No skip link anywhere on the page.
 *   3. Service-status notices are marked by colour alone — no text, no icon.
 *   4. Weak contrast on three specific elements (notice strip, form hint text,
 *      footer links).
 *   5. Form copy uses administrative terms and long nested sentences.
 *   6. Submitting an invalid form yields "Input invalid." with no guidance.
 *   7. Images and icons carry missing or meaningless alt text.
 */

type Page = 'home' | 'form';

const SERVICES = [
  { id: 'passport', icon: ICON_PASSPORT, title: 'Identity documents', body: 'Passports, identity cards, residence confirmation.' },
  { id: 'vehicle', icon: ICON_VEHICLE, title: 'Vehicle registration', body: 'Register, re-register or de-register a vehicle.' },
  { id: 'waste', icon: ICON_WASTE, title: 'Waste & recycling', body: 'Collection dates, bulky waste, container requests.' },
  { id: 'help', icon: ICON_HELP, title: 'Advice & support', body: 'Housing benefit, family services, general enquiries.' },
];

/** Colour-only status marks. No text, no icon, deliberately. */
const STATUS = [
  { id: 'a', label: 'Registration office, Marktplatz 4', colour: '#1F9D55' },
  { id: 'b', label: 'Vehicle office, Bahnhofstraße 12', colour: '#D33A3A' },
  { id: 'c', label: 'Citizens’ office, Ostpark', colour: '#E5A93B' },
  { id: 'd', label: 'Family services, Rathaus West', colour: '#1F9D55' },
];

export function PublicAccess() {
  const [page, setPage] = useState<Page>('home');
  const { value: nudgeSeen, setValue: setNudgeSeen } = usePersistentState(
    'publicaccess-nudge',
    false,
  );

  return (
    <div className="space-y-4">
      <CaseBanner />

      {!nudgeSeen && (
        <div className="animate-pulse-nudge rounded-xl border-2 border-purple bg-white p-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="text-sm text-navy">
              <span className="font-bold">Try me.</span> Use this portal the way
              a citizen would: press{' '}
              <kbd className="rounded border border-lilac-edge bg-lilac px-1.5 py-0.5 font-mono text-[10px]">
                Tab
              </kbd>{' '}
              through it, click around, open the application and submit it.
            </p>
            <button
              type="button"
              onClick={() => setNudgeSeen(true)}
              className="aion-btn-ghost !py-1 !text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* ── The portal itself ──────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-lilac-edge bg-white shadow-card">
        {/* Header — the crest carries a meaningless alt value */}
        <div className="flex items-center gap-3 bg-[#1B2A4A] px-4 py-3">
          <img src={IMG_CREST} alt="logo_final_2.svg" width={36} height={36} />
          <div>
            <p className="text-sm font-bold text-white">Stadt Norderfeld</p>
            <p className="text-[11px] text-white/60">PublicAccess service portal</p>
          </div>
        </div>

        {/* Navigation — mouse-only by design: divs with click handlers */}
        <nav className="flex flex-wrap gap-1 border-b border-lilac-edge bg-[#F4F5F8] px-3 py-2">
          {(
            [
              ['home', 'Home'],
              ['form', 'Applications'],
              ['home', 'Opening hours'],
              ['home', 'Contact'],
            ] as [Page, string][]
          ).map(([target, label], i) => (
            <div
              key={`${label}-${i}`}
              onClick={() => setPage(target)}
              className={`cursor-pointer select-none rounded px-3 py-1.5 text-[13px] font-medium ${
                (page === 'form' && label === 'Applications') ||
                (page === 'home' && label === 'Home')
                  ? 'bg-[#1B2A4A] text-white'
                  : 'text-[#3A4256] hover:bg-[#E4E7EE]'
              }`}
            >
              {label}
            </div>
          ))}
        </nav>

        {page === 'home' ? (
          <HomePage onStart={() => setPage('form')} />
        ) : (
          <FormPage onBack={() => setPage('home')} />
        )}

        {/* Footer — weak contrast on the links */}
        <div className="border-t border-lilac-edge bg-[#F4F5F8] px-4 py-3">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {['Imprint', 'Data protection', 'Accessibility statement', 'Sitemap'].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[11px] underline"
                  style={{ color: '#B9BDC8' }}
                >
                  {l}
                </a>
              ),
            )}
          </div>
          <p className="mt-1.5 text-[10px]" style={{ color: '#B9BDC8' }}>
            © Stadt Norderfeld · Amt für Digitalisierung und Bürgerservice
          </p>
        </div>
      </div>
    </div>
  );
}

function HomePage({ onStart }: { onStart: () => void }) {
  return (
    <div className="space-y-4 p-4">
      {/* Hero image with no alt at all */}
      <img
        src={IMG_TOWNHALL}
        alt=""
        width={320}
        height={120}
        className="h-28 w-full rounded object-cover"
      />

      <div>
        <h3 className="text-lg font-bold text-[#1B2A4A]">
          Welcome to the citizens&rsquo; service portal
        </h3>
        {/* Weak contrast #1 */}
        <p className="mt-1 text-sm leading-relaxed" style={{ color: '#AFB4C0' }}>
          Please note: applications transmitted subsequent to the respective
          cut-off date shall be allocated to the following processing cycle.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <div
            key={s.id}
            onClick={onStart}
            className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-[#E2E4EA] p-2.5 hover:bg-[#F4F5F8]"
          >
            {/* Service icons ship with no alt text */}
            <img src={s.icon} alt="" width={36} height={36} className="shrink-0 rounded" />
            <div>
              <p className="text-[13px] font-semibold text-[#1B2A4A]">{s.title}</p>
              <p className="text-[11px] text-[#5A6175]">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Colour-only status notices */}
      <div className="rounded-lg border border-[#E2E4EA] p-3">
        <p className="text-[13px] font-semibold text-[#1B2A4A]">
          Service point availability today
        </p>
        <ul className="mt-2 space-y-1.5">
          {STATUS.map((s) => (
            <li key={s.id} className="flex items-center gap-2.5">
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full"
                style={{ backgroundColor: s.colour }}
              />
              <span className="text-[12px] text-[#3A4256]">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="rounded bg-[#1B2A4A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#243759]"
      >
        Start an application
      </button>
    </div>
  );
}

function FormPage({ onBack }: { onBack: () => void }) {
  const [values, setValues] = useState({
    surname: '',
    given: '',
    born: '',
    postcode: '',
    reference: '',
    purpose: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof values, v: string | boolean) =>
    setValues((p) => ({ ...p, [k]: v }));

  const valid =
    values.surname.trim() !== '' &&
    values.given.trim() !== '' &&
    /^\d{2}\.\d{2}\.\d{4}$/.test(values.born.trim()) &&
    /^\d{5}$/.test(values.postcode.trim()) &&
    values.consent;

  /**
   * Visual order (CSS) deliberately disagrees with DOM order (tab order).
   * Reading order: surname, given names, date of birth, postcode, reference,
   * purpose. Tab order follows the DOM instead.
   */
  const VISUAL_ORDER: Record<string, number> = {
    surname: 1,
    given: 2,
    born: 3,
    postcode: 4,
    reference: 5,
    purpose: 6,
  };

  const field = (
    key: keyof typeof VISUAL_ORDER,
    label: string,
    hint?: string,
    type = 'text',
  ) => (
    <div style={{ order: VISUAL_ORDER[key] }} className="space-y-1">
      <label htmlFor={`pa-${key}`} className="block text-[12px] font-semibold text-[#1B2A4A]">
        {label}
      </label>
      {hint && (
        /* Weak contrast #2 — the hint text nobody can read */
        <p className="text-[11px]" style={{ color: '#C2C6D0' }}>
          {hint}
        </p>
      )}
      <input
        id={`pa-${key}`}
        type={type}
        value={values[key as keyof typeof values] as string}
        onChange={(e) => set(key as keyof typeof values, e.target.value)}
        className="w-full rounded border border-[#CFD3DC] px-2.5 py-1.5 text-sm"
      />
    </div>
  );

  return (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="text-lg font-bold text-[#1B2A4A]">
          Application for the issuance of a certified extract from the register
          of residents
        </h3>
        <p className="mt-1 text-[12px] leading-relaxed text-[#3A4256]">
          Insofar as the applicant is not personally identical with the person
          to whom the requested data pertains, evidence of a legitimate interest
          within the meaning of the applicable data protection provisions must
          be furnished together with this application, failing which the
          application shall be rejected without further examination and the fee
          shall nevertheless be retained.
        </p>
      </div>

      {submitted && !valid && (
        /* Unhelpful error — no field named, no guidance, not linked */
        <div className="rounded border border-[#E3B0B0] bg-[#FBEAEA] px-3 py-2">
          <p className="text-sm font-semibold text-[#9B2C2C]">Input invalid.</p>
        </div>
      )}

      {submitted && valid && (
        <div className="rounded border border-[#B7DDC4] bg-[#EAF7EE] px-3 py-2">
          <p className="text-sm font-semibold text-[#1F6B3A]">
            Application received. Reference will be sent by post.
          </p>
        </div>
      )}

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="flex flex-col gap-3"
      >
        {/* DOM order below is NOT the visual order — see VISUAL_ORDER above */}
        {field('postcode', 'Postal code of principal residence')}
        {field('surname', 'Family name (as per register entry)')}
        {field(
          'purpose',
          'Designation of the intended purpose of use',
          'Specify the purpose for which the extract is to be utilised, having regard to §34 of the applicable ordinance.',
        )}
        {field('given', 'Given name(s) in full')}
        {field(
          'born',
          'Date of birth',
          'To be entered in accordance with the customary national notation.',
        )}
        {field(
          'reference',
          'Prior file reference, if any',
          'Where a previously issued reference exists, reproduce it here in unaltered form.',
        )}

        <div style={{ order: 7 }} className="flex items-start gap-2">
          <input
            id="pa-consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set('consent', e.target.checked)}
            className="mt-0.5"
          />
          <label htmlFor="pa-consent" className="text-[11px] leading-relaxed text-[#3A4256]">
            I hereby declare that the particulars furnished above are complete
            and accurate and acknowledge that the transmission of the requested
            data to third parties is precluded save where a statutory basis
            therefor exists.
          </label>
        </div>

        <div style={{ order: 8 }} className="flex gap-2">
          <button
            type="submit"
            className="rounded bg-[#1B2A4A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#243759]"
          >
            Submit application
          </button>
          <button
            type="button"
            onClick={onBack}
            className="rounded border border-[#CFD3DC] px-4 py-2 text-sm font-semibold text-[#3A4256]"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

function CaseBanner() {
  return (
    <div className="aion-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-bold text-navy">🏛 PublicAccess</h2>
        <span className="aion-chip border-navy bg-navy text-white">Task 1</span>
        <span className="aion-chip border-lilac-edge bg-lilac text-navy">
          No hints · no reveals
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-navy/70">
        A working mock of a civic service portal — two pages, fully clickable,
        tabbable and submittable. Use it as a citizen would, then record what you
        find: the barrier, its category, who it affects, and how you would
        prioritise it.
      </p>
      <p className="mt-2 text-xs text-navy/50">
        This portal is identical for everyone and never changes between loads.
      </p>
    </div>
  );
}
