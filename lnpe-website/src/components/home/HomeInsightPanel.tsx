'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Link from '@/components/i18n/LocalizedLink';
import MediaLightbox from '@/components/content/MediaLightbox';
import { useLocale } from '@/i18n/LocaleProvider';
import { homeMessages } from '@/i18n/messages/home';
import type { HomeInsight } from '@/content/home-insights';

export function HomeInsightPanel({ id, insight, onClose, dark = false, compact = false }: {
  id: string;
  insight: HomeInsight;
  onClose: () => void;
  dark?: boolean;
  compact?: boolean;
}) {
  const t = homeMessages[useLocale()].interactions;
  const reducedMotion = useReducedMotion();
  const [imageIndex, setImageIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const currentIndex = imageIndex % insight.images.length;
  const photo = insight.images[currentIndex];
  const close = () => {
    const trigger = document.querySelector<HTMLButtonElement>(`[aria-controls="${id}"][aria-expanded="true"]`);
    onClose();
    trigger?.focus();
  };

  return (
    <motion.div
      id={id}
      role="region"
      aria-labelledby={`${id}-title`}
      onKeyDown={(event) => { if (event.key === 'Escape' && !lightbox) { event.stopPropagation(); close(); } }}
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative mt-4 min-w-0 border p-4 text-left sm:p-5 ${dark ? 'border-white/20 bg-[#111b27] text-white' : 'border-[#cbd5df] bg-white text-[#111827]'}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={`mb-2 text-xs font-semibold ${dark ? 'text-white/55' : 'text-[#64748b]'}`}>{t.inDepth}</p>
          <h4 id={`${id}-title`} className="text-lg font-bold leading-snug">{insight.title}</h4>
        </div>
        <button type="button" onClick={close} aria-label={t.closeDetails} className="shrink-0 border border-current/20 p-2 transition-colors hover:bg-[#F26522] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26522]">
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <div className={`grid min-w-0 gap-5 ${compact ? '' : 'md:grid-cols-[0.9fr_1.1fr]'}`}>
        <figure className="min-w-0">
          <button type="button" onClick={() => setLightbox(true)} aria-label={`${t.enlarge}: ${photo.alt}`} className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26522]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={photo.src} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="absolute inset-0">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.025]" />
              </motion.div>
            </AnimatePresence>
          </button>
          <div className="mt-3 flex items-center justify-between gap-3">
            <figcaption className={`text-xs leading-6 ${dark ? 'text-white/65' : 'text-[#64748b]'}`}>{photo.caption}</figcaption>
            {insight.images.length > 1 && <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={() => setImageIndex((current) => (current + insight.images.length - 1) % insight.images.length)} aria-label={t.previousPhoto} className="border border-current/20 p-2 hover:text-[#F26522] focus-visible:outline-2 focus-visible:outline-[#F26522]"><ArrowLeft size={14} /></button>
              <span className="text-xs tabular-nums" aria-live="polite">{currentIndex + 1}/{insight.images.length}</span>
              <button type="button" onClick={() => setImageIndex((current) => (current + 1) % insight.images.length)} aria-label={t.nextPhoto} className="border border-current/20 p-2 hover:text-[#F26522] focus-visible:outline-2 focus-visible:outline-[#F26522]"><ArrowRight size={14} /></button>
            </div>}
          </div>
        </figure>
        <div className="min-w-0 space-y-4">
          <p className={`text-sm leading-7 ${dark ? 'text-white/75' : 'text-[#566272]'}`}>{insight.description}</p>
          {insight.details.map((detail) => <div key={detail.title} className="border-t border-current/15 pt-3">
            <h5 className="text-sm font-semibold leading-6">{detail.title}</h5>
            <p className={`mt-1 text-sm leading-7 ${dark ? 'text-white/65' : 'text-[#64748b]'}`}>{detail.text}</p>
          </div>)}
          {insight.href && <Link href={insight.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[#F26522] underline underline-offset-4">{t.fullReference}<ArrowRight size={14} aria-hidden="true" /></Link>}
        </div>
      </div>
      {lightbox && <MediaLightbox images={insight.images} initialIndex={currentIndex} onClose={() => setLightbox(false)} />}
    </motion.div>
  );
}
