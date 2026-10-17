import type { Metadata } from 'next';
import type { Locale } from './config';
import { localizeHref } from './routing';

type PageCopy = { title: string; description?: string };

export const siteMetadata: Record<Locale, PageCopy> = {
  en: { title: 'LNPE | Advanced Powder Technology', description: 'Grinding, conveying and particle modification equipment and process solutions for diverse materials and production requirements.' },
  zh: { title: 'LNPE | 先进粉体技术', description: '专注粉碎、输送与颗粒改性，为不同物料与生产需求提供粉体装备和工艺解决方案。' },
};

export function createPageMetadata(locale: Locale, path: string, copy: Record<Locale, PageCopy>): Metadata {
  return {
    ...copy[locale],
    alternates: {
      canonical: localizeHref(path, locale),
      languages: { en: localizeHref(path, 'en'), 'zh-CN': localizeHref(path, 'zh'), 'x-default': localizeHref(path, 'en') },
    },
  };
}
