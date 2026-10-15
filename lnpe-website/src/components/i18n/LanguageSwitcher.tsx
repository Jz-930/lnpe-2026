'use client';

import { Globe2 } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/i18n/LocaleProvider';
import { localizeHref } from '@/i18n/routing';

function subscribeToUrl(listener: () => void) {
  window.addEventListener('popstate', listener);
  window.addEventListener('hashchange', listener);
  return () => {
    window.removeEventListener('popstate', listener);
    window.removeEventListener('hashchange', listener);
  };
}

const getUrlSuffix = () => window.location.search + window.location.hash;
const getServerSuffix = () => '';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname() ?? '/';
  const suffix = useSyncExternalStore(subscribeToUrl, getUrlSuffix, getServerSuffix);
  const targetLocale = locale === 'en' ? 'zh' : 'en';
  return (
    <a
      href={localizeHref(pathname, targetLocale) + suffix}
      hrefLang={targetLocale === 'zh' ? 'zh-CN' : 'en'}
      lang={targetLocale === 'zh' ? 'zh-CN' : 'en'}
      aria-label={locale === 'en' ? '切换到中文' : 'Switch to English'}
      title={locale === 'en' ? '切换到中文' : 'Switch to English'}
      className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-[6px] border border-lnpe-border bg-white/70 px-3 text-xs font-semibold text-lnpe-dark transition-colors hover:border-lnpe-kinetic hover:text-lnpe-kinetic focus-visible:outline-offset-4"
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const current = new URL(window.location.href);
        window.location.assign(localizeHref(current.pathname, targetLocale) + current.search + current.hash);
      }}
    >
      <Globe2 size={15} aria-hidden="true" />
      <span>{locale === 'en' ? '中文' : 'EN'}</span>
    </a>
  );
}
