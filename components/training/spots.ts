import type { CategoryId } from '@/lib/categories';

/**
 * Practice spots for the "Spot the Barrier" hunt.
 *
 * IMPORTANT: this is a fictional sports-club page, deliberately unrelated to
 * PublicAccess, LearnAccess and CitizenConnect. Nothing here may mirror the
 * planted barriers of a graded case — the Training Ground must never leak
 * assessment answers.
 *
 * Categories use the curriculum taxonomy (Participation as the fifth), never
 * POUR.
 */
export interface Spot {
  id: string;
  verdict: 'barrier' | 'good';
  /** One-line plain description of what this element does. */
  what: string;
  /** Affected group / user impact. */
  why: string;
  category: CategoryId;
  /** Label for the live before→after toggle. Barriers only. */
  fixLabel?: string;
  /** One line describing what the fix changed. Barriers only. */
  fixNote?: string;
}

export const SPOTS: Spot[] = [
  {
    id: 'status-colour',
    verdict: 'barrier',
    what: 'Membership status is communicated by a coloured dot alone — no text, no icon, no label.',
    why: 'Colour-blind members (roughly 1 in 12 men) and screen-reader users get no status at all. Anyone printing the page in greyscale loses it too.',
    category: 'perceivability',
    fixLabel: 'Add a text label and an icon',
    fixNote: 'The colour now reinforces a written status instead of being the only carrier of it.',
  },
  {
    id: 'low-contrast',
    verdict: 'barrier',
    what: 'Opening hours are set in a very light grey on white — roughly 1.9:1.',
    why: 'Fails for low-vision members, for older eyes, and for anyone reading outdoors on a phone. WCAG asks for at least 4.5:1 on body text.',
    category: 'perceivability',
    fixLabel: 'Darken the text to 4.5:1+',
    fixNote: 'Same layout, same size — only the ink got darker.',
  },
  {
    id: 'missing-alt',
    verdict: 'barrier',
    what: 'The coaching photo carries information but ships without alt text.',
    why: 'Screen-reader users hear silence, or worse, a filename. The instruction shown in the picture is simply not available to them.',
    category: 'perceivability',
    fixLabel: 'Write real alt text',
    fixNote: 'The description now carries what the picture carried — not what the file is called.',
  },
  {
    id: 'broken-focus',
    verdict: 'barrier',
    what: 'The "Book a court" control is a styled div with a click handler. It is not reachable by keyboard and shows no focus.',
    why: 'Keyboard-only users, switch-device users and screen-reader users cannot reach the main action of the page at all. Mouse users never notice.',
    category: 'operability',
    fixLabel: 'Make it a real button',
    fixNote: 'A native button: in the tab order, operable with Enter and Space, with a visible focus ring.',
  },
  {
    id: 'jargon',
    verdict: 'barrier',
    what: 'The membership rule is one 42-word sentence, three clauses deep, in administrative register.',
    why: 'Costs disproportionate effort for members with dyslexia or ADHD, for non-native speakers, and for anyone reading in a hurry. Most simply skip it — then miss the deadline.',
    category: 'understandability',
    fixLabel: 'Rewrite in plain language',
    fixNote: 'Short sentences, everyday words, the deadline stated once and clearly.',
  },
  {
    id: 'vague-error',
    verdict: 'barrier',
    what: 'The newsletter signup rejects input with "Error." and nothing else.',
    why: 'The user is told that something is wrong but not what or where. With more than one field this becomes trial and error — expensive for everyone, exhausting with a cognitive disability.',
    category: 'errorTolerance',
    fixLabel: 'Name the field and the fix',
    fixNote: 'The message identifies the field, states the rule and gives an example.',
  },
  {
    id: 'inconsistent',
    verdict: 'barrier',
    what: 'The same action is named and styled three different ways across three cards: "Book", "Reserve now →" and "Get a slot".',
    why: 'Every card must be re-learned. Autistic members and members with ADHD pay the largest orientation tax; everyone pays some.',
    category: 'understandability',
    fixLabel: 'Use one name, one style',
    fixNote: 'One label, one button style, one position. Predictable is a feature.',
  },
  {
    id: 'good-focus',
    verdict: 'good',
    what: 'The search field has a strong, clearly visible focus ring.',
    why: 'Keyboard users can always see where they are. Costs nothing and is the single cheapest accessibility win on any page.',
    category: 'operability',
  },
  {
    id: 'good-error',
    verdict: 'good',
    what: 'The court-booking date field states its format up front and names the field when it rejects input.',
    why: 'The user can recover without guessing or starting over — which is what error tolerance actually means.',
    category: 'errorTolerance',
  },
  {
    id: 'good-contrast',
    verdict: 'good',
    what: 'The membership price block sits at roughly 12:1 contrast, well past AAA.',
    why: 'Readable for low-vision members, on a dim laptop, and in direct sunlight. Note that it is also the nicest-looking block on the page.',
    category: 'perceivability',
  },
  {
    id: 'good-selfservice',
    verdict: 'good',
    what: 'Membership can be paused or cancelled online, at any hour, without phoning anyone.',
    why: 'Members who cannot use a phone — deaf and hard-of-hearing members, people with anxiety, anyone working during office hours — can still act independently.',
    category: 'participation',
  },
];

export const SPOT_IDS = SPOTS.map((s) => s.id);
export const TOTAL_SPOTS = SPOTS.length;

export function getSpot(id: string): Spot {
  const s = SPOTS.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown spot: ${id}`);
  return s;
}
