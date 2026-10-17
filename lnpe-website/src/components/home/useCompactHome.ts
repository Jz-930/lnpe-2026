'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(max-width: 1023px)';
const subscribe = (notify: () => void) => {
  const query = window.matchMedia(QUERY);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;
const subscribeTouch = (notify: () => void) => {
  const query = window.matchMedia('(pointer: coarse)');
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};
const getTouchSnapshot = () => window.matchMedia('(pointer: coarse)').matches;

/** Keeps touch layouts stable while someone reads; also responds to rotation. */
export function useCompactHome() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Large touch tablets retain their layout and get explicit, stable interaction. */
export function useTouchHome() {
  return useSyncExternalStore(subscribeTouch, getTouchSnapshot, getServerSnapshot);
}
