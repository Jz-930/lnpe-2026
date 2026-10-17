'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { homeMessages } from '@/i18n/messages/home';
import Link from '@/components/i18n/LocalizedLink';

const TRUST_VALUES = ['5,000+', '30+', '20+', '20+'];

export function TrustBar() {
  const t = homeMessages[useLocale()].trust;
  return (
    <section className="relative overflow-hidden border-y border-[#d5dee7] bg-[#f2f5f7] text-[#111827]">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.72),transparent)] [animation:trust-sweep_7.5s_linear_infinite] motion-reduce:animate-none" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {TRUST_VALUES.map((value, index) => (
            <Link key={index} href={['/about#credentials', '/about#credentials', '/research#institute', '/about#credentials'][index]} className="relative py-6 md:py-7 hover:bg-white/40 transition-colors">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
