import type { Locale } from './config';

/** Public English URLs stay unprefixed; both languages share the same route. */
export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|zh)(?=\/|$)/, '') || '/';
}

export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const suffixIndex = href.search(/[?#]/);
  const pathname = suffixIndex === -1 ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : href.slice(suffixIndex);
  // Static assets are shared, regardless of the current language.
  if (/^\/(?:_next|api|images)(?:\/|$)/.test(pathname) || /\.[^/]+$/.test(pathname)) return href;
  const path = stripLocale(pathname);
  return (locale === 'zh' ? `/zh${path === '/' ? '' : path}` : path) + suffix;
}
