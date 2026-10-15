export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'zh';
}
