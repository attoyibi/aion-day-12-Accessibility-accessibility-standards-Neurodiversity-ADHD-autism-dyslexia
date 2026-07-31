'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SidePanel } from '@/components/SidePanel';
import { LearnTab } from '@/components/learn/LearnTab';
import { TrainingGround } from '@/components/training/TrainingGround';
import { PublicAccess } from '@/components/cases/PublicAccess';
import { LearnAccess } from '@/components/cases/LearnAccess';
import { CitizenConnect } from '@/components/cases/CitizenConnect';
import { TaskMap } from '@/components/TaskMap';
import { TABS, type TabId } from '@/lib/tabs';
import { readJSON, writeJSON } from '@/lib/storage';

export default function Home() {
  const [tab, setTab] = useState<TabId>('learn');
  const [panelOpen, setPanelOpen] = useState(true);

  // Restore the last tab and panel state after mount (localStorage only).
  useEffect(() => {
    setTab(readJSON<TabId>('tab', 'learn'));
    setPanelOpen(readJSON<boolean>('panel-open', true));
  }, []);

  const go = (t: TabId) => {
    setTab(t);
    writeJSON('tab', t);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePanel = () => {
    setPanelOpen((o) => {
      writeJSON('panel-open', !o);
      return !o;
    });
  };

  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Header />

      {/* Tab strip */}
      <nav aria-label="Sections" className="border-b border-lilac-edge bg-white">
        <div className="mx-auto max-w-[1400px] px-2 sm:px-4">
          <div role="tablist" aria-label="Sections" className="flex gap-1 overflow-x-auto py-2">
            {TABS.map((t) => {
              const isActive = t.id === tab;
              return (
                <button
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={isActive}
                  aria-controls="main"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => go(t.id)}
                  onKeyDown={(e) => {
                    const i = TABS.findIndex((x) => x.id === tab);
                    if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      go(TABS[(i + 1) % TABS.length].id);
                    } else if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      go(TABS[(i - 1 + TABS.length) % TABS.length].id);
                    }
                  }}
                  className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-purple text-white'
                      : 'text-navy/70 hover:bg-lilac hover:text-navy'
                  }`}
                >
                  <span aria-hidden="true">{t.icon}</span> {t.label}
                </button>
              );
            })}
          </div>
          <p className="pb-2 text-xs text-navy/55">{active.tagline}</p>
        </div>
      </nav>

      <div className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-5 sm:px-6">
        <div
          className={`grid gap-5 ${
            panelOpen
              ? 'lg:grid-cols-[minmax(0,1fr)_20rem]'
              : 'lg:grid-cols-[minmax(0,1fr)_auto]'
          }`}
        >
          <main
            id="main"
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            tabIndex={-1}
            className="min-w-0"
          >
            {tab === 'learn' && <LearnTab />}
            {tab === 'training' && <TrainingGround onNavigate={go} />}
            {tab === 'publicaccess' && <PublicAccess />}
            {tab === 'learnaccess' && <LearnAccess />}
            {tab === 'citizenconnect' && <CitizenConnect />}
            {tab === 'taskmap' && <TaskMap onNavigate={go} />}
          </main>

          <SidePanel tab={tab} open={panelOpen} onToggle={togglePanel} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
