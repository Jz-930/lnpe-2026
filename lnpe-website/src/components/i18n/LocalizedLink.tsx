'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';
import { localizeHref } from '@/i18n/routing';

export default function LocalizedLink({ href, ...props }: ComponentProps<typeof Link>) {
  const locale = useLocale();
  const localizedHref = typeof href === 'string'
    ? localizeHref(href, locale)
    : { ...href, pathname: href.pathname ? localizeHref(href.pathname, locale) : href.pathname };
  return <Link {...props} href={localizedHref} />;
}
