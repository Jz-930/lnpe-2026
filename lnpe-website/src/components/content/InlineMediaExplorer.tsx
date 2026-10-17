'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';
import MediaLightbox from './MediaLightbox';

export type ExplorerItem = {
  id: string; title: string; description: string; image?: string; imageAlt?: string;
  details?: string[]; icon?: ReactNode; content?: ReactNode;
};

export function InlineMediaExplorer({ items, label, initialId, autoPlay = false, layout = 'compact' }: {
  items: ExplorerItem[]; label: string; initialId?: string; autoPlay?: boolean; layout?: 'cards' | 'compact';
}) {
  const [selected, setSelected] = useState(initialId ?? items[0]?.id);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const zh = useLocale() === 'zh';
  const id = useId();
  const index = Math.max(0, items.findIndex((item) => item.id === selected));
  const active = items[index];
  const ids = items.map((item) => item.id).join('|');

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!autoPlay || paused || hovered || focused || lightbox || expanded || reducedMotion) return;
    const keys = ids.split('|');
    if (keys.length < 2) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setSelected((current) => keys[(Math.max(0, keys.indexOf(current ?? '')) + 1) % keys.length]);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [autoPlay, paused, hovered, focused, lightbox, expanded, reducedMotion, ids]);

  if (!active) return null;
  const select = (itemId: string, reveal = false) => { setSelected(itemId); setExpanded(reveal); };
  const step = (offset: number) => { select(items[(index + offset + items.length) % items.length].id); setPaused(true); };
  const hasDetails = Boolean(active.details?.length || active.content);

  return <section aria-label={label} className="min-w-0" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}>
    <div role="tablist" aria-label={label} className={layout === 'cards' ? 'grid gap-3 sm:grid-cols-2 xl:grid-cols-4' : 'mb-4 flex flex-wrap gap-2'}>
      {items.map((item) => <button key={item.id} id={`${id}-${item.id}`} type="button" role="tab" aria-selected={active.id === item.id} aria-controls={`${id}-panel`} tabIndex={active.id === item.id ? 0 : -1}
        onPointerEnter={(event) => { if (event.pointerType === 'mouse' && item.id !== active.id) select(item.id); }}
        onFocus={() => { if (item.id !== active.id) select(item.id); }}
        onClick={() => { select(item.id, true); setPaused(true); }}
        onKeyDown={(event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (items.indexOf(item) + (event.key === 'ArrowLeft' ? -1 : 1) + items.length) % items.length;
          select(items[next].id); setPaused(true); document.getElementById(`${id}-${items[next].id}`)?.focus();
        }}
        className={`${layout === 'cards' ? 'flex min-h-24 items-start gap-3 p-4 text-left' : 'inline-flex min-h-11 items-center gap-2 px-4 py-2.5'} border text-sm font-semibold transition-colors ${active.id === item.id ? 'border-lnpe-blue bg-[#edf4f9] text-lnpe-blue' : 'border-lnpe-border bg-white text-lnpe-muted hover:border-lnpe-blue hover:text-lnpe-blue'}`}>
        {item.icon && <span aria-hidden="true" className="shrink-0 text-lnpe-blue">{item.icon}</span>}
        <span className="min-w-0">{item.title}{layout === 'cards' && <span className="mt-2 block text-[11px] font-normal text-lnpe-steel">{zh ? '悬停预览 · 点击展开' : 'Hover to preview · Click to explore'}</span>}</span>
      </button>)}
    </div>
    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${active.id}`} tabIndex={0} className={`${layout === 'cards' ? 'mt-4' : ''} overflow-hidden border border-lnpe-border bg-white`}>
      <div className={`grid ${active.image ? 'lg:grid-cols-[1.05fr_1fr]' : ''}`}>
        {active.image && <button type="button" onClick={() => setLightbox(true)} aria-label={`${zh ? '放大图片：' : 'Enlarge image: '}${active.imageAlt ?? active.title}`} className="group relative aspect-[16/10] min-w-0 cursor-zoom-in overflow-hidden bg-[#e8edf2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lnpe-blue lg:aspect-auto lg:min-h-72">
          <Image key={active.image} src={active.image} alt={active.imageAlt ?? active.title} fill sizes="(max-width: 1024px) 90vw, 650px" className="object-cover transition-transform duration-500 motion-safe:animate-[lnpe-content-reveal_260ms_ease-out] motion-safe:group-hover:scale-[1.025] motion-safe:group-focus-visible:scale-[1.025] motion-reduce:transition-none" />
        </button>}
        <div className="flex min-w-0 flex-col p-5 sm:p-7">
          <p className="mb-3 text-[11px] font-semibold text-lnpe-kinetic">{label} <span className="ml-2 font-mono">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span></p>
          <h3 key={`${active.id}-title`} className="text-xl font-semibold text-lnpe-dark motion-safe:animate-[lnpe-content-reveal_260ms_ease-out] sm:text-2xl">{active.title}</h3>
          <p key={`${active.id}-description`} className="mt-4 text-sm leading-7 text-lnpe-muted motion-safe:animate-[lnpe-content-reveal_260ms_ease-out]">{active.description}</p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
            {hasDetails && <button type="button" onClick={() => { setExpanded(!expanded); setPaused(true); }} aria-expanded={expanded} aria-controls={`${id}-details`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-lnpe-blue">{expanded ? (zh ? '收起说明' : 'Collapse details') : (zh ? '展开详细内容' : 'Explore details')}<ChevronDown size={17} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} /></button>}
            <div className="flex items-center gap-2">
              {items.length > 1 && <>
                <button type="button" onClick={() => step(-1)} aria-label={zh ? '上一项内容' : 'Previous topic'} className="grid h-10 w-10 place-items-center border border-lnpe-border hover:border-lnpe-blue"><ChevronLeft size={17} /></button>
                <button type="button" onClick={() => step(1)} aria-label={zh ? '下一项内容' : 'Next topic'} className="grid h-10 w-10 place-items-center border border-lnpe-border hover:border-lnpe-blue"><ChevronRight size={17} /></button>
              </>}
              {autoPlay && !reducedMotion && <button type="button" onClick={() => { setPaused(!paused); if (paused) setExpanded(false); }} aria-label={paused ? (zh ? '开始自动轮播' : 'Start slideshow') : (zh ? '暂停自动轮播' : 'Pause slideshow')} aria-pressed={!paused} className="grid h-10 w-10 place-items-center border border-lnpe-border hover:border-lnpe-blue">{paused ? <Play size={15} /> : <Pause size={15} />}</button>}
            </div>
          </div>
        </div>
      </div>
      {hasDetails && <div id={`${id}-details`} hidden={!expanded} className="border-t border-lnpe-border p-5 motion-safe:animate-[lnpe-content-reveal_260ms_ease-out] sm:p-7">
        {active.details?.length ? <div className="mb-4 grid gap-4 text-sm leading-7 text-lnpe-muted md:grid-cols-2">{active.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : null}
        {active.content}
      </div>}
    </div>
    {lightbox && active.image && <MediaLightbox images={[{ src: active.image, alt: active.imageAlt ?? active.title, caption: active.description }]} onClose={() => setLightbox(false)} />}
  </section>;
}
