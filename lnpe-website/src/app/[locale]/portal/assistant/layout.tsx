import type { Locale } from '@/i18n/config';
import { createPageMetadata } from '@/i18n/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return createPageMetadata((await params).locale, '/portal/assistant', {
    en: { title: 'LNPE | Engineering Assistant' },
    zh: { title: 'LNPE | 工程助手' },
  });
}

export default function AssistantLayout({ children }: { children: React.ReactNode }) {
  return children;
}
