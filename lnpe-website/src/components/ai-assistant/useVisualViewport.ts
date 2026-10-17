'use client';

import { useEffect, type RefObject } from 'react';

/** iOS Safari's keyboard resizes the visual viewport, independently of 100dvh. */
export function useVisualViewport(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const viewport = window.visualViewport;
    const element = ref.current;
    if (!viewport || !element) return;
    const update = () => {
      // Preserve browser pinch zoom instead of resizing the UI around it.
      if (viewport.scale !== 1) return;
      element.style.setProperty('--visible-height', `${viewport.height}px`);
      element.style.setProperty('--visible-top', `${viewport.offsetTop}px`);
    };
    update();
    viewport.addEventListener('resize', update);
    viewport.addEventListener('scroll', update);
    return () => {
      viewport.removeEventListener('resize', update);
      viewport.removeEventListener('scroll', update);
      element.style.removeProperty('--visible-height');
      element.style.removeProperty('--visible-top');
    };
  }, [ref]);
}
