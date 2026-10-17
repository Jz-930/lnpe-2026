'use client';

import { useRef, type TouchEvent } from 'react';

/** Horizontal gestures leave vertical page scrolling and two-finger zoom to the browser. */
export function useSwipe(onStep: (direction: number) => void) {
  const origin = useRef<{ x: number; y: number; time: number } | null>(null);
  return {
    onTouchStart(event: TouchEvent<HTMLElement>) {
      const touch = event.touches[0];
      origin.current = event.touches.length === 1
        ? { x: touch.clientX, y: touch.clientY, time: Date.now() }
        : null;
    },
    onTouchMove(event: TouchEvent<HTMLElement>) {
      if (event.touches.length !== 1) origin.current = null;
    },
    onTouchCancel() { origin.current = null; },
    onTouchEnd(event: TouchEvent<HTMLElement>) {
      const start = origin.current;
      origin.current = null;
      const touch = event.changedTouches[0];
      if (!start || !touch || event.touches.length || Date.now() - start.time > 900) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.5) onStep(dx < 0 ? 1 : -1);
    },
  };
}
