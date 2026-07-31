'use client';

import type { TabId } from '@/lib/tabs';

const ROWS: {
  task: string;
  level: string;
  tab: string;
  tabId: TabId;
  learn: string;
  categories: string;
}[] = [
  {
    task: '1',
    level: 'L1 Knowledge',
    tab: '🏛 PublicAccess',
    tabId: 'publicaccess',
    learn: 'Level 1',
    categories:
      'Perceivability / Operability / Understandability / Error tolerance / Participation',
  },
  {
    task: '2',
    level: 'L1 → L2',
    tab: '🎓 LearnAccess (A/B/C)',
    tabId: 'learnaccess',
    learn: 'Level 1 + 2',
    categories: 'measurable items = objective; variant choice = rubric',
  },
  {
    task: '3',
    level: 'L2 Application',
    tab: '🏢 CitizenConnect',
    tabId: 'citizenconnect',
    learn: 'Level 2',
    categories:
      'Perceivability / Operability / Understandability / Error tolerance / Consistency',
  },
  {
    task: '4',
    level: 'L3 Management',
    tab: 'all above',
    tabId: 'learn',
    learn: 'Level 3',
    categories: 'strategic — rubric on internal consistency',
  },
];

export function TaskMap({ onNavigate }: { onNavigate: (t: TabId) => void }) {
  return (
    <div className="space-y-4">
      <div className="aion-card p-4">
        <h2 className="text-lg font-bold text-navy">🗺 Task Map</h2>
        <p className="mt-1 text-sm leading-relaxed text-navy/70">
          A small reference card: which tab belongs to which task, which Learn
          section prepares it, and which categories it is graded on.
        </p>
      </div>

      <div className="aion-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              Mapping of tasks to levels, tabs, Learn sections and categories
            </caption>
            <thead>
              <tr className="bg-navy text-white">
                {['Task', 'Level', 'Use this tab', 'Learn section', 'Categories used'].map(
                  (h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr
                  key={r.task}
                  className={i % 2 ? 'bg-lilac-soft' : 'bg-white'}
                >
                  <th
                    scope="row"
                    className="px-3 py-3 align-top text-sm font-black text-purple"
                  >
                    {r.task}
                  </th>
                  <td className="px-3 py-3 align-top text-xs font-semibold text-navy">
                    {r.level}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <button
                      type="button"
                      onClick={() => onNavigate(r.tabId)}
                      className="text-xs font-semibold text-purple underline underline-offset-2 hover:text-purple-deep"
                    >
                      {r.tab}
                    </button>
                  </td>
                  <td className="px-3 py-3 align-top text-xs text-navy/75">
                    {r.learn}
                  </td>
                  <td className="px-3 py-3 align-top text-xs leading-relaxed text-navy/75">
                    {r.categories}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-lilac-edge bg-white px-4 py-3 text-xs leading-relaxed text-navy/70">
          Study in 📖 Learn, warm up in 🎯 Training Ground (with hints), then do
          the tasks in the Assessment tabs (no hints).
        </p>
      </div>

      <div className="aion-card p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
          The fifth category
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-navy/75">
          The first four categories never change:{' '}
          <strong>Perceivability</strong> (Wahrnehmbarkeit),{' '}
          <strong>Operability</strong> (Bedienbarkeit),{' '}
          <strong>Understandability</strong> (Verständlichkeit),{' '}
          <strong>Error tolerance</strong> (Fehlertoleranz). The fifth depends on
          the task: <strong>Participation</strong> (Teilhabe) for portal-usage
          tasks, <strong>Consistency</strong> (Konsistenz) for structure tasks.
        </p>
      </div>
    </div>
  );
}
