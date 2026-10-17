'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleProvider';
import { useSwipe } from './useSwipe';

export type LightboxImage = { src: string; alt: string; caption?: string };

export default function MediaLightbox({ images, initialIndex = 0, onClose }: {
  images: LightboxImage[]; initialIndex?: number; onClose: () => void;
}) {
  const [index, setIndex] = useState(() => Math.max(0, Math.min(initialIndex, images.length - 1)));
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const zh = useLocale() === 'zh';
  const active = images[index] ?? images[0];
  const step = (offset: number) => setIndex((current) => (current + offset + images.length) % images.length);
  const swipe = useSwipe((direction) => { if (images.length > 1) step(direction); });

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  if (!active) return null;
  return (
    <dialog ref={dialog} aria-labelledby={titleId}
      className="preserve-white fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-[#0b1220]/95 p-0 text-white backdrop:bg-black/60"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' && images.length > 1) { event.preventDefault(); step(-1); }
        if (event.key === 'ArrowRight' && images.length > 1) { event.preventDefault(); step(1); }
      }}>
      <div className="media-lightbox-content pointer-events-none mx-auto flex h-full max-w-[1600px] flex-col p-4 sm:p-7">
        <div className="pointer-events-auto flex shrink-0 items-center justify-between gap-4 pb-4">
          <p id={titleId} className="min-w-0 text-sm font-semibold">{zh ? '图片浏览' : 'Image viewer'} <span className="ml-3 font-mono text-white/60">{index + 1} / {images.length}</span></p>
          <button type="button" autoFocus onClick={onClose} aria-label={zh ? '关闭图片' : 'Close image viewer'} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-white"><X size={22} /></button>
        </div>
        <figure className="pointer-events-auto flex min-h-0 flex-1 flex-col">
          <div {...swipe} className="relative min-h-[160px] flex-1 [touch-action:pan-y_pinch-zoom]">
            <Image src={active.src} alt={active.alt} fill sizes="(max-width: 1600px) 95vw, 1500px" className="object-contain" priority />
          </div>
          <figcaption aria-live="polite" aria-atomic="true" className="mx-auto w-full max-w-4xl shrink-0 px-1 pt-4 text-center">
            <p className="text-sm font-semibold text-white">{active.alt}</p>
            {active.caption && <p className="mt-2 max-h-28 overflow-y-auto text-xs leading-6 text-white/75">{active.caption}</p>}
          </figcaption>
        </figure>
        {images.length > 1 && <p className="touch-only mt-3 text-center text-xs text-white/60">{zh ? '左右滑动切换图片' : 'Swipe left or right to browse'}</p>}
        {images.length > 1 && <div className="pointer-events-auto mt-4 flex shrink-0 items-center justify-center gap-5">
          <button type="button" onClick={() => step(-1)} aria-label={zh ? '上一张图片' : 'Previous image'} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-xs hover:bg-white/10"><ChevronLeft size={18} />{zh ? '上一张' : 'Previous'}</button>
          <p className="hidden text-xs text-white/60 sm:block">{zh ? '方向键切换 · Esc 关闭' : 'Arrow keys to browse · Esc to close'}</p>
          <button type="button" onClick={() => step(1)} aria-label={zh ? '下一张图片' : 'Next image'} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-xs hover:bg-white/10">{zh ? '下一张' : 'Next'}<ChevronRight size={18} /></button>
        </div>}
      </div>
    </dialog>
  );
}
