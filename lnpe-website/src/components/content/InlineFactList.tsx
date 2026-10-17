'use client';

import { useId, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';
import Link from '@/components/i18n/LocalizedLink';
import InteractiveImage from './InteractiveImage';

export type InlineFact = { id: string; title: string; description: string; details?: string[]; image?: string; imageAlt?: string; href?: string };

export default function InlineFactList({ items, label }: { items: InlineFact[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);
  const regionId = useId();
  const zh = useLocale() === 'zh';
  const selected = items.find((item) => item.id === active);
  return <div className="inline-facts">
    <div className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => <button key={item.id} type="button" aria-expanded={item.id === active} aria-controls={regionId} title={item.description} onClick={() => setActive(item.id === active ? null : item.id)} className={`inline-flex min-h-9 items-center gap-1.5 border px-2.5 py-1.5 text-left text-xs leading-5 transition-colors ${item.id === active ? 'border-lnpe-blue bg-[#edf4f9] text-lnpe-blue' : 'border-lnpe-border bg-[#f8fafc] text-lnpe-muted hover:border-lnpe-blue hover:text-lnpe-blue'}`}>
        {item.title}<ChevronDown size={12} className={`shrink-0 transition-transform ${item.id === active ? 'rotate-180' : ''}`} />
      </button>)}
    </div>
    {selected && <div id={regionId} role="region" aria-label={selected.title} className={`mt-4 grid gap-4 border-l-2 border-lnpe-kinetic bg-[#f3f6f9] p-4 ${selected.image ? 'sm:grid-cols-[140px_1fr]' : ''}`}>
      {selected.image && <div className="relative aspect-square w-full max-w-[200px]"><InteractiveImage src={selected.image} alt={selected.imageAlt ?? selected.title} fill className="object-contain p-3" sizes="200px" /></div>}
      <div className="min-w-0">
        <h4 className="text-sm font-semibold text-lnpe-dark">{selected.title}</h4>
        <p className="mt-2 text-xs leading-6 text-lnpe-muted">{selected.description}</p>
        {selected.details?.map((text) => <p key={text} className="mt-3 text-xs leading-6 text-lnpe-muted">{text}</p>)}
        {selected.href && <Link href={selected.href} className="mt-4 inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-lnpe-blue">{zh ? '查看完整说明' : 'Read full guide'}<ArrowUpRight size={13} /></Link>}
      </div>
    </div>}
  </div>;
}
