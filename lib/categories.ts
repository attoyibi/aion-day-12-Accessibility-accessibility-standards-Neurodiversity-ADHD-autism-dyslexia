/**
 * THE curriculum category taxonomy.
 *
 * These are the labels the worksheets grade against, so they are the ONLY
 * labels used for tagging anywhere in the app (Learn widgets, Training Ground
 * reveal cards, Task Map).
 *
 * WCAG's POUR model is mentioned exactly once, as a reference note in
 * Learn Level 1 — see `POUR_REFERENCE_NOTE`. Do not spread it further.
 */

export type CategoryId =
  | 'perceivability'
  | 'operability'
  | 'understandability'
  | 'errorTolerance'
  | 'participation'
  | 'consistency';

export interface Category {
  id: CategoryId;
  /** Curriculum label — the one shown to learners. */
  label: string;
  /** German curriculum term. */
  de: string;
  icon: string;
  /** One-line plain description. */
  blurb: string;
  /** Tailwind classes for the chip in its resting state. */
  chip: string;
  /** Tailwind classes for the chip when active/selected. */
  chipActive: string;
  /** Accent colour used for highlights in mini-UIs. */
  accent: string;
}

export const CATEGORIES: Record<CategoryId, Category> = {
  perceivability: {
    id: 'perceivability',
    label: 'Perceivability',
    de: 'Wahrnehmbarkeit',
    icon: '👁',
    blurb: 'Can everyone take the information in — see it, hear it, or have it read aloud?',
    chip: 'border-sky-200 bg-sky-50 text-sky-900',
    chipActive: 'border-sky-600 bg-sky-600 text-white',
    accent: '#0369a1',
  },
  operability: {
    id: 'operability',
    label: 'Operability',
    de: 'Bedienbarkeit',
    icon: '⌨',
    blurb: 'Can everyone actually work it — by keyboard, by touch, without a mouse?',
    chip: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    chipActive: 'border-emerald-700 bg-emerald-700 text-white',
    accent: '#047857',
  },
  understandability: {
    id: 'understandability',
    label: 'Understandability',
    de: 'Verständlichkeit',
    icon: '💡',
    blurb: 'Is it clear what this means and what happens next?',
    chip: 'border-amber-200 bg-amber-50 text-amber-900',
    chipActive: 'border-amber-700 bg-amber-700 text-white',
    accent: '#b45309',
  },
  errorTolerance: {
    id: 'errorTolerance',
    label: 'Error tolerance',
    de: 'Fehlertoleranz',
    icon: '🛟',
    blurb: 'When something goes wrong, does the system help you recover?',
    chip: 'border-rose-200 bg-rose-50 text-rose-900',
    chipActive: 'border-rose-700 bg-rose-700 text-white',
    accent: '#be123c',
  },
  participation: {
    id: 'participation',
    label: 'Participation',
    de: 'Teilhabe',
    icon: '🤝',
    blurb: 'Can people complete the task independently, without asking for help?',
    chip: 'border-violet-200 bg-violet-50 text-violet-900',
    chipActive: 'border-violet-700 bg-violet-700 text-white',
    accent: '#6d28d9',
  },
  consistency: {
    id: 'consistency',
    label: 'Consistency',
    de: 'Konsistenz',
    icon: '🧭',
    blurb: 'Do the same things look and behave the same way across page types?',
    chip: 'border-teal-200 bg-teal-50 text-teal-900',
    chipActive: 'border-teal-700 bg-teal-700 text-white',
    accent: '#0f766e',
  },
};

/**
 * The five categories used for portal-usage tasks (Task 1 / Training Ground).
 * The 5th slot is Participation here.
 */
export const PORTAL_CATEGORY_IDS: CategoryId[] = [
  'perceivability',
  'operability',
  'understandability',
  'errorTolerance',
  'participation',
];

/**
 * The five categories used for structure tasks (Task 3 / CitizenConnect).
 * The 5th slot is Consistency here.
 */
export const STRUCTURE_CATEGORY_IDS: CategoryId[] = [
  'perceivability',
  'operability',
  'understandability',
  'errorTolerance',
  'consistency',
];

/** Shown exactly once, in Learn Level 1. */
export const POUR_REFERENCE_NOTE =
  'These map roughly to the WCAG POUR standard (Perceivable / Operable / Understandable / Robust). ' +
  'POUR is the industry term — but you practise and get graded on the categories above.';

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES[id].label;
}
