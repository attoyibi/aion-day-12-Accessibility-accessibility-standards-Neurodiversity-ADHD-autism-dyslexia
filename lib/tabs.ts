export type TabId =
  | 'learn'
  | 'training'
  | 'publicaccess'
  | 'learnaccess'
  | 'citizenconnect'
  | 'taskmap';

export interface TabDef {
  id: TabId;
  icon: string;
  label: string;
  /** Short line under the tab strip. */
  tagline: string;
  /** Whether hints / reveals exist in this tab. */
  reveals: boolean;
}

export const TABS: TabDef[] = [
  {
    id: 'learn',
    icon: '📖',
    label: 'Learn',
    tagline: 'Study the material — every concept comes with something to play with.',
    reveals: false,
  },
  {
    id: 'training',
    icon: '🎯',
    label: 'Training Ground',
    tagline: 'Warm-up hunt with hints and reveals. Practice examples only.',
    reveals: true,
  },
  {
    id: 'publicaccess',
    icon: '🏛',
    label: 'PublicAccess',
    tagline: 'Assessment case for Task 1. No hints, no reveals.',
    reveals: false,
  },
  {
    id: 'learnaccess',
    icon: '🎓',
    label: 'LearnAccess',
    tagline: 'Assessment case for Task 2. Three variants — no "best" answer shown.',
    reveals: false,
  },
  {
    id: 'citizenconnect',
    icon: '🏢',
    label: 'CitizenConnect',
    tagline: 'Case study for Task 3. No hints, no reveals.',
    reveals: false,
  },
  {
    id: 'taskmap',
    icon: '🗺',
    label: 'Task Map',
    tagline: 'Which tab belongs to which task.',
    reveals: false,
  },
];

/** Right-hand side panel: relevant Learn bullets per tab + task badge. */
export interface PanelContent {
  supports: string | null;
  heading: string;
  bullets: string[];
  /** Optional footnote, e.g. a reminder that reveals are off. */
  note?: string;
}

export const PANEL_CONTENT: Record<TabId, PanelContent> = {
  learn: {
    supports: 'Tasks 1–4',
    heading: 'How to use Learn',
    bullets: [
      'Three accordion sections = the three curriculum levels.',
      'Level 1 Knowledge → Task 1. Level 2 Application → Task 2 & 3. Level 3 Management → Task 4.',
      'Read the caption, then actually drag / toggle / Tab through the widget. The widget is the lesson.',
      'Widgets teach the concept generically — they never point at the graded cases.',
    ],
  },
  training: {
    supports: 'Warm-up for Task 1',
    heading: 'What you are practising',
    bullets: [
      'Spotting a barrier and naming its category, fast.',
      'Category = Perceivability, Operability, Understandability, Error tolerance, Participation.',
      'Every reveal names the affected group — that is the "user impact" muscle Task 1 asks for.',
      'No timer, no fail state. Click everything, including the good patterns.',
    ],
    note: 'This is the only tab with reveals.',
  },
  publicaccess: {
    supports: 'Task 1',
    heading: 'Bring these from Level 1',
    bullets: [
      'Perceivability: contrast, alt text, information carried by colour alone.',
      'Operability: keyboard reach, tab order, skip links, focus visibility.',
      'Understandability: plain language, sentence length, jargon.',
      'Error tolerance: does the error say what went wrong and how to fix it?',
      'Participation: could someone finish this alone, without phoning the office?',
    ],
    note: 'No reveals here. Find, categorize, describe the impact, prioritize.',
  },
  learnaccess: {
    supports: 'Task 2',
    heading: 'Bring these from Level 1 + 2',
    bullets: [
      'Use all three variants for real — switch, Tab through, resize the text.',
      'Measurable items (contrast, text size, focus, labels) are graded objectively.',
      'Your variant choice is graded on the reasoning, not on picking a "right" one.',
      'Name the trade-off you accept: brand, effort, or legal certainty.',
    ],
    note: 'No reveals here. There is no marked "best" variant.',
  },
  citizenconnect: {
    supports: 'Task 3',
    heading: 'Bring these from Level 2',
    bullets: [
      'Analyse the interface for barriers, then group them by category.',
      'This case uses Consistency as the 5th category instead of Participation.',
      'Consistency: same patterns, same places, across different page types.',
      'Weigh effort against impact — you are recommending, not just listing.',
    ],
    note: 'No reveals here.',
  },
  taskmap: {
    supports: 'All tasks',
    heading: 'Orientation',
    bullets: [
      'Study in Learn, warm up in Training Ground, then work in the assessment tabs.',
      'Hints exist in exactly one place: Training Ground.',
      'The 5th category changes with the task: Participation for portal usage, Consistency for structure.',
    ],
  },
};
