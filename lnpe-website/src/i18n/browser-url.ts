/** Notify language links when local filters update the URL without a navigation. */
export const browserUrlChanged = 'lnpe:url-changed';

export function replaceQueryValues(values: Record<string, string | null>) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(values)) {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  window.dispatchEvent(new Event(browserUrlChanged));
}
