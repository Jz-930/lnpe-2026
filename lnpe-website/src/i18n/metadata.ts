import type { Metadata } from 'next';
import type { Locale } from './config';
import { localizeHref } from './routing';

type PageCopy = { title: string; description?: string };

export function createPageMetadata(locale: Locale, path: string, copy: Record<Locale, PageCopy>): Metadata {
  return {
    ...copy[locale],
    alternates: {
      canonical: localizeHref(path, locale),
      languages: { en: localizeHref(path, 'en'), 'zh-CN': localizeHref(path, 'zh'), 'x-default': localizeHref(path, 'en') },
    },
  };
}
