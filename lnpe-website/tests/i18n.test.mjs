import test from 'node:test';
import assert from 'node:assert/strict';
import { localizeHref, stripLocale } from '../src/i18n/routing.ts';

test('English public URLs remain unchanged and Chinese gets one prefix', () => {
  for (const path of ['/', '/products', '/products/jet-mill', '/projects/lfp', '/portal/assistant']) {
    const chinese = localizeHref(path, 'zh');
    assert.equal(localizeHref(chinese, 'en'), path);
    assert.equal(localizeHref(chinese, 'zh'), chinese);
    assert.equal(localizeHref(path, 'en'), path);
  }
});

test('Language changes preserve repeated query parameters and anchors', () => {
  assert.equal(localizeHref('/products/jet-mill?q=a&q=b#gallery', 'zh'), '/zh/products/jet-mill?q=a&q=b#gallery');
  assert.equal(localizeHref('/zh?material=石墨#research-form', 'en'), '/?material=石墨#research-form');
  assert.equal(localizeHref('/en/products?x=1#details', 'zh'), '/zh/products?x=1#details');
});

test('External, fragment, API and shared asset links are never translated', () => {
  for (const href of ['https://lnpe.net/', '//example.com/test', 'mailto:test@example.com', 'tel:+8612345', '#gallery', '/images/logo.webp', '/favicon.ico', '/_next/image?url=a', '/api/contact', '/documents/catalog.pdf?download=1']) {
    assert.equal(localizeHref(href, 'zh'), href);
  }
});

test('Only a complete supported locale segment is removed', () => {
  assert.equal(stripLocale('/zh'), '/');
  assert.equal(stripLocale('/en/products'), '/products');
  assert.equal(stripLocale('/zhang/products'), '/zhang/products');
  assert.equal(stripLocale('/english'), '/english');
});
