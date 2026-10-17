import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://127.0.0.1:3000';
const checks = [
  ['/zh/applications', '169'],
  ['/applications', '169'],
  ['/zh/applications/materials?q=LFP', 'value="LFP"'],
  ['/applications/materials/sanqi', 'Panax notoginseng'],
  ['/zh/products/technologies/steam-jet-mill', '蒸汽'],
  ['/products/technologies/steam-jet-mill', 'Steam'],
  ['/zh/research', 'FLUENT'],
  ['/support', 'OEM'],
  ['/zh/resources', '/video/15913.html'],
  ['/zh/contact-us?service=trial&material=LFP', 'value="LFP"'],
  ['/zh/contact-us?project=shaping-mill-project', '参考项目'],
  ['/contact-us?service=careers', 'Careers'],
  ['/downloads/lnpe-enquiry-zh.txt', 'LNPE'],
  ['/downloads/lnpe-enquiry-en.txt', 'LNPE'],
];
for (const [route, expected] of checks) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  assert.ok((await response.text()).includes(expected), `${route}: missing expected content`);
}
for (const route of ['/zh/applications/materials/does-not-exist', '/products/technologies/does-not-exist']) {
  assert.equal((await fetch(base + route)).status, 404, `Unknown detail should 404: ${route}`);
}
for (const [q, lang, expected] of [['LFP', 'en', '/applications/materials/lithium-iron-phosphate'], ['SiC', 'zh', '/applications/materials/silicon-carbide'], ['设备视频', 'zh', '/resources#videos'], ['蜡', 'zh', '/applications/materials/wax']]) {
  const response = await fetch(base + '/api/content-search?' + new URLSearchParams({ q, lang }));
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.ok(body.results.some(item => item.href === expected), `${q}: expected ${expected}`);
  if (q === 'SiC') assert.ok(!body.results.some(item => item.href.endsWith('/silicon-carbon-composite')), 'SiC must not refer to a Si/C composite');
  assert.ok(!JSON.stringify(body).includes('provenance'));
}
console.log(`HTTP content checks passed: ${checks.length} pages/files, 2 missing routes and 4 bilingual searches.`);
