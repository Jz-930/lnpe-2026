'use client';

import Link from '@/components/i18n/LocalizedLink';
import { useLocale } from '@/i18n/LocaleProvider';

export default function NotFound() {
  const isZh = useLocale() === 'zh';
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="font-mono text-sm text-lnpe-steel">404</p>
      <h1 className="text-3xl font-bold">{isZh ? '页面未找到' : 'Page not found'}</h1>
      <p className="text-lnpe-muted">{isZh ? '您访问的页面不存在，或已更换地址。' : 'This page could not be found.'}</p>
      <Link href="/" className="rounded-md bg-lnpe-dark px-6 py-3 font-semibold text-white">{isZh ? '返回首页' : 'Back to home'}</Link>
    </main>
  );
}
