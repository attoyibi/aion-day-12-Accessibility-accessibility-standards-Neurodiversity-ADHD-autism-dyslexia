'use client';

import { PANEL_CONTENT, TABS, type TabId } from '@/lib/tabs';

export function SidePanel({
  tab,
  open,
  onToggle,
}: {
  tab: TabId;
  open: boolean;
  onToggle: () => void;
}) {
  const content = PANEL_CONTENT[tab];
  const def = TABS.find((t) => t.id === tab)!;

  if (!open) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={false}
        aria-controls="side-panel"
        className="sticky top-4 h-fit rounded-xl border border-lilac-edge bg-white px-2 py-4 shadow-card hover:bg-lilac-soft"
        title="Open the notes panel"
      >
        <span className="flex flex-col items-center gap-1.5 text-[11px] font-bold text-purple">
          <span aria-hidden="true">📌</span>
          <span className="hidden lg:inline [writing-mode:vertical-rl]">
            Notes
          </span>
          <span className="lg:hidden">Notes</span>
        </span>
      </button>
    );
  }

  return (
    <aside
      id="side-panel"
      aria-label="Notes for the current tab"
      className="sticky top-4 h-fit space-y-3 rounded-xl border border-lilac-edge bg-white p-4 shadow-card"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
            {def.icon} {def.label}
          </p>
          <h3 className="text-sm font-bold text-navy">{content.heading}</h3>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded
          aria-controls="side-panel"
          className="shrink-0 rounded-lg border border-lilac-edge px-2 py-1 text-[11px] font-bold text-navy/60 hover:bg-lilac"
          title="Collapse the notes panel"
        >
          ✕
        </button>
      </div>

      {content.supports && (
        <span className="aion-chip border-purple bg-purple text-white">
          This supports → {content.supports}
        </span>
      )}

      <ul className="space-y-2">
        {content.bullets.map((b) => (
          <li
            key={b}
            className="flex gap-2 text-xs leading-relaxed text-navy/75"
          >
            <span aria-hidden="true" className="text-purple">
              •
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {content.note && (
        <p
          className={`rounded-lg px-3 py-2 text-[11px] font-semibold leading-relaxed ${
            def.reveals
              ? 'bg-emerald-50 text-emerald-900'
              : 'bg-amber-50 text-amber-900'
          }`}
        >
          {def.reveals ? '💡 ' : '🔒 '}
          {content.note}
        </p>
      )}
    </aside>
  );
}
