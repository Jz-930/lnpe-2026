import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

// Inspect the production HTML, including links inside closed disclosures.
const manifest = JSON.parse(fs.readFileSync('.next/prerender-manifest.json', 'utf8'));
const routes = new Set(Object.keys(manifest.routes));
const errors = [];
const assets = new Set();
const linkedRoutes = new Set();
let pages = 0;
let links = 0;
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"');
const routeFor = pathname => /^\/(en|zh)(\/|$)/.test(pathname) ? pathname.replace(/\/$/, '') : `/en${pathname === '/' ? '' : pathname.replace(/\/$/, '')}`;
const htmlFor = route => `.next/server/app${route}.html`;
const dynamic = route => /^\/(en|zh)\/(contact-us|applications\/materials)$/.test(route);
for (const route of routes) {
  if (!/^\/(en|zh)(\/|$)/.test(route)) continue;
  const file = htmlFor(route);
  if (!fs.existsSync(file)) { errors.push(`Missing HTML: ${route}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  pages++;
  if (/网站内容补充审阅_|LNPE资料\/|evidence_local|PPT逐页文字/.test(html)) errors.push(`Internal provenance leaked: ${route}`);
  const language = route.startsWith('/zh') ? 'zh-CN' : 'en';
  if (!html.includes(`<html lang="${language}"`)) errors.push(`Wrong document language: ${route}`);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/g)) {
    const href = decode(match[1]);
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    if (href.startsWith('//')) continue;
    links++;
    const url = new URL(href, `https://local.test${route}`);
    if (/\.[^/]+$/.test(url.pathname)) {
      const asset = decodeURIComponent(url.pathname);
      assets.add(asset);
      if (!fs.existsSync(path.join('public', asset))) errors.push(`Missing linked file: ${asset}`);
      continue;
    }
    const targetRoute = routeFor(url.pathname);
    linkedRoutes.add(targetRoute);
    if (!routes.has(targetRoute) && !dynamic(targetRoute)) errors.push(`Broken link: ${route} -> ${href}`);
    if (url.hash && routes.has(targetRoute)) {
      const targetHtml = targetRoute === route ? html : fs.readFileSync(htmlFor(targetRoute), 'utf8');
      if (!targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) errors.push(`Missing anchor: ${route} -> ${href}`);
    }
  }
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)) {
    const src = new URL(decode(match[1]), 'https://local.test');
    const asset = src.pathname === '/_next/image' ? src.searchParams.get('url') : src.pathname;
    if (!asset?.startsWith('/images/')) continue;
    assets.add(asset);
    if (!fs.existsSync(path.join('public', decodeURIComponent(asset)))) errors.push(`Missing image: ${asset}`);
  }
}
const uniqueErrors = [...new Set(errors)];
console.log(JSON.stringify({ pages, links, uniqueDestinations: linkedRoutes.size, localAssets: assets.size, errors: uniqueErrors }, null, 2));
assert.equal(uniqueErrors.length, 0, 'Production content links, assets and provenance must pass');
