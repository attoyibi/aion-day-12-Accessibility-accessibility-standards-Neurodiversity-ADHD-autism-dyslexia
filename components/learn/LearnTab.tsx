'use client';

import { useState, type ReactNode } from 'react';
import { WidgetCard } from '@/components/ui/WidgetCard';
import { ThreeTermsWidget } from './widgets/ThreeTermsWidget';
import { CategoryExplorerWidget } from './widgets/CategoryExplorerWidget';
import { ContrastSliderWidget } from './widgets/ContrastSliderWidget';
import { FocusOrderWidget } from './widgets/FocusOrderWidget';
import { AltTextWidget } from './widgets/AltTextWidget';
import { PlainLanguageWidget } from './widgets/PlainLanguageWidget';
import { ErrorToleranceWidget } from './widgets/ErrorToleranceWidget';
import { BarrierScannerWidget } from './widgets/BarrierScannerWidget';
import { TradeoffWidget } from './widgets/TradeoffWidget';
import { ModernVsAccessibleWidget } from './widgets/ModernVsAccessibleWidget';
import { ComplianceFramingWidget } from './widgets/ComplianceFramingWidget';
import { RiskStackWidget } from './widgets/RiskStackWidget';
import { ConsistencyWidget } from './widgets/ConsistencyWidget';

type LevelId = 'l1' | 'l2' | 'l3';

function Level({
  id,
  badge,
  title,
  subtitle,
  supports,
  open,
  onToggle,
  children,
}: {
  id: LevelId;
  badge: string;
  title: string;
  subtitle: string;
  supports: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <section className="aion-card overflow-hidden">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`level-panel-${id}`}
          onClick={onToggle}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-lilac-soft"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy text-xs font-black text-white">
            {badge}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-navy">{title}</span>
            <span className="block text-xs text-navy/60">{subtitle}</span>
          </span>
          <span className="hidden shrink-0 rounded-full bg-lilac px-2.5 py-1 text-[11px] font-semibold text-purple-deep sm:block">
            supports {supports}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 text-navy/40 transition-transform ${open ? 'rotate-180' : ''}`}
          >
            ▾
          </span>
        </button>
      </h3>

      {open && (
        <div id={`level-panel-${id}`} className="space-y-4 border-t border-lilac-edge bg-lilac-soft/60 p-4">
          {children}
        </div>
      )}
    </section>
  );
}

export function LearnTab() {
  const [open, setOpen] = useState<Record<LevelId, boolean>>({
    l1: true,
    l2: false,
    l3: false,
  });

  const toggle = (id: LevelId) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <div className="space-y-4">
      <div className="aion-card p-4">
        <h2 className="text-lg font-bold text-navy">📖 Learn</h2>
        <p className="mt-1 text-sm leading-relaxed text-navy/70">
          All of the course material lives here. Every concept that can be
          demonstrated ships with a small interactive widget — the text is the
          caption, the widget is the lesson. Nothing here takes more than two or
          three minutes.
        </p>
      </div>

      <Level
        id="l1"
        badge="L1"
        title="Level 1 — Knowledge (Foundations)"
        subtitle="The vocabulary and the five categories you will be graded on."
        supports="Task 1"
        open={open.l1}
        onToggle={() => toggle('l1')}
      >
        <WidgetCard
          title="Accessibility vs Usability vs Inclusive design"
          caption="Three words people use interchangeably, three different questions. Click each term — the same button rebuilds itself."
        >
          <ThreeTermsWidget />
        </WidgetCard>

        <WidgetCard
          title="The five categories"
          caption="This is the taxonomy you will use in every task and every worksheet. Click a chip to see which part of a page it governs."
          footnote="Perceivability · Operability · Understandability · Error tolerance, plus a fifth that depends on the task: Participation for portal-usage tasks, Consistency for structure tasks."
        >
          <CategoryExplorerWidget />
        </WidgetCard>

        <WidgetCard
          title="Contrast matters"
          category="perceivability"
          caption="Drag the slider across a real sentence and watch the WCAG verdict flip. 4.5:1 is the line for body text."
        >
          <ContrastSliderWidget />
        </WidgetCard>

        <WidgetCard
          title="Keyboard operability & focus order"
          category="operability"
          caption="Tab through the form, then break the order and Tab again. This one has to be felt, not read."
        >
          <FocusOrderWidget />
        </WidgetCard>

        <WidgetCard
          title="Alt text"
          category="perceivability"
          caption="Flip to screen-reader view: the pictures disappear and only their descriptions remain."
        >
          <AltTextWidget />
        </WidgetCard>

        <WidgetCard
          title="Plain language"
          category="understandability"
          caption="Same legal content, two registers. The meter is a rough reading-effort estimate, not a certificate."
        >
          <PlainLanguageWidget />
        </WidgetCard>

        <WidgetCard
          title="Error tolerance"
          category="errorTolerance"
          caption="Submit the form empty in both modes. The failure is identical; only the recovery path differs."
        >
          <ErrorToleranceWidget />
        </WidgetCard>
      </Level>

      <Level
        id="l2"
        badge="L2"
        title="Level 2 — Application (Analysis & trade-offs)"
        subtitle="Reading an interface for barriers and arguing about what to spend."
        supports="Task 2 & 3"
        open={open.l2}
        onToggle={() => toggle('l2')}
      >
        <WidgetCard
          title="Analysing an interface for barriers"
          caption="A practice screen with five hotspots. Clicking one names its category — deliberately not the fix."
        >
          <BarrierScannerWidget />
        </WidgetCard>

        <WidgetCard
          title="Trade-off framing"
          caption="Accessibility vs brand vs effort vs legal certainty, on a fixed budget. Push one up and watch the rest pay for it."
        >
          <TradeoffWidget />
        </WidgetCard>

        <WidgetCard
          title="Modern-but-inaccessible vs plain-but-accessible"
          caption="The same screen, two philosophies, and a live count of who is left able to use it."
        >
          <ModernVsAccessibleWidget />
        </WidgetCard>
      </Level>

      <Level
        id="l3"
        badge="L3"
        title="Level 3 — Management decision (Strategy & governance)"
        subtitle="What changes when accessibility becomes a leadership question."
        supports="Task 3 & 4"
        open={open.l3}
        onToggle={() => toggle('l3')}
      >
        <WidgetCard
          title="Compliance vs responsibility"
          caption="Flip the framing and the roadmap rebuilds itself. Same budget, very different second year."
        >
          <ComplianceFramingWidget />
        </WidgetCard>

        <WidgetCard
          title="Cost of neglect"
          caption="Stack the risks that actually get quoted in a steering meeting and watch the impact meter climb."
        >
          <RiskStackWidget />
        </WidgetCard>

        <WidgetCard
          title="Consistency across page types"
          category="consistency"
          caption="Three page types, inconsistent then consistent. The cost of the left-hand version is paid in orientation, on every single page."
        >
          <ConsistencyWidget />
        </WidgetCard>

        <section className="aion-card p-4">
          <h4 className="text-sm font-bold text-navy">Reflection prompts</h4>
          <p className="mt-1 text-xs text-navy/60">
            No answers provided, and none expected here — bring your own to Task 4.
          </p>
          <ul className="mt-3 space-y-2">
            {[
              'When does missing accessibility stop being a technical debt and become a leadership failure?',
              'Who in your organisation currently owns accessibility — and who believes they own it?',
              'What would have to be true for an inaccessible release to be blocked, rather than noted?',
              'Which is the harder sell in your context: the cost, or the admission that the current product excludes people?',
            ].map((q) => (
              <li
                key={q}
                className="rounded-lg border-l-4 border-purple bg-lilac px-3 py-2 text-sm leading-relaxed text-navy/85"
              >
                {q}
              </li>
            ))}
          </ul>
        </section>
      </Level>
    </div>
  );
}
