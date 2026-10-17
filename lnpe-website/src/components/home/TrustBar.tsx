'use client';

import { useMemo, useState } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';
import { homeMessages } from '@/i18n/messages/home';
import { getHomeInsights } from '@/content/home-insights';
import { HomeInsightPanel } from './HomeInsightPanel';
import styles from './HomeMobile.module.css';

const TRUST_VALUES = ['5,000+', '30+', '20+', '20+'];

export function TrustBar() {
  const locale = useLocale();
  const t = homeMessages[locale].trust;
  const interaction = homeMessages[locale].interactions;
  const insights = useMemo(() => getHomeInsights(locale).trust, [locale]);
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className={`${styles.trust} relative overflow-hidden border-y border-[#d5dee7] bg-[#f2f5f7] text-[#111827]`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)] [animation:trust-sweep_7.5s_linear_infinite] motion-reduce:animate-none" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {TRUST_VALUES.map((value, index) => (
            <button key={index} type="button" aria-expanded={selected === index} aria-controls="trust-detail" onClick={() => setSelected(selected === index ? null : index)} className={`group relative py-6 text-left transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#F26522] md:py-7 ${selected === index ? 'bg-white/70' : ''}`}>
              {index > 0 && <div className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-[#cfd8e1] md:block" />}
              <div className="flex items-baseline gap-3 px-3 md:px-6">
                <span className="font-display text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">{value}</span>
                <span
                  className="hidden h-2 w-2 bg-[#F26522] [animation:trust-dot-pulse_2.6s_ease-in-out_infinite] motion-reduce:animate-none md:inline-block"
                  style={{ animationDelay: `${index * 0.18}s` }}
                  aria-hidden="true"
                />
              </div>
              <div className="mt-2 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748b] md:px-6">
                {t.labels[index]}
              </div>
              <div className="mt-2 px-3 text-[10px] text-[#64748b] group-hover:text-[#F26522] md:px-6">{selected === index ? interaction.closeDetails : interaction.openDetails} <span aria-hidden="true">{selected === index ? '−' : '+'}</span></div>
            </button>
          ))}
        </div>
        {selected !== null && <div className="pb-6"><HomeInsightPanel key={selected} id="trust-detail" insight={insights[selected]} onClose={() => setSelected(null)} /></div>}
      </div>
    </section>
  );
}
