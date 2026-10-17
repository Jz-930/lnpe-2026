import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(dir, '../..');
const data = JSON.parse(fs.readFileSync(path.join(dir, 'materials-data.json'), 'utf8'));
const index = JSON.parse(fs.readFileSync(path.join(dir, 'materials-search-index.json'), 'utf8'));
const guidance = fs.readFileSync(path.join(dir, 'materials.ts'), 'utf8');
const profiles = new Set([...guidance.matchAll(/^  (\w+): \{$/gm)].map((m) => m[1]));

test('all 133 original entries and 36 additions resolve to bilingual canonical records', () => {
  assert.equal(data.entries.length, 169);
  assert.equal(data.entries.filter((item) => item.legacy).length, 133);
  assert.equal(data.records.length, 167);
  assert.equal(new Set(data.records.map((item) => item.slug)).size, 167);
  const records = new Map(data.records.map((item) => [item.slug, item]));
  for (const entry of data.entries) {
    const record = records.get(entry.slug);
    assert.ok(record, `Missing record: ${entry.id}`);
    assert.ok(record.entryIds.includes(entry.id));
    assert.ok(record.categoryIds.includes(entry.categoryId));
    assert.match(record.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const lang of ['zh', 'en']) {
      assert.ok(record.name[lang].trim().length > 0);
      assert.ok(record.summary[lang].length >= (lang === 'zh' ? 25 : 70), `${entry.id}: short ${lang} summary`);
      assert.ok(record.focus[lang].length >= (lang === 'zh' ? 35 : 100), `${entry.id}: short ${lang} focus`);
    }
    assert.ok(profiles.has(record.profile), `Missing process profile: ${entry.id}`);
    assert.ok(record.sources.length);
  }
  for (const lang of ['zh', 'en']) {
    assert.equal(new Set(data.records.map((item) => item.summary[lang])).size, 167, `${lang}: duplicate summaries`);
    assert.equal(new Set(data.records.map((item) => item.focus[lang])).size, 167, `${lang}: duplicate processing focus`);
  }
});

test('every original image is attached and present locally', () => {
  const images = new Set(data.records.flatMap((item) => item.images));
  assert.equal(images.size, 133);
  for (const image of images) {
    assert.ok(image.startsWith('/images/05_applications/'));
    assert.ok(fs.existsSync(path.join(site, 'public', image)), `Missing image: ${image}`);
  }
});

test('aliases share details and corrected battery terminology stays distinct', () => {
  const byId = (id) => data.entries.find((item) => item.id === id);
  assert.equal(byId(63).slug, byId(65).slug);
  assert.equal(byId(34).slug, byId(133).slug);
  assert.notEqual(byId(15).slug, byId(74).slug);
  assert.match(byId(15).name.zh, /Si\/C/);
  assert.match(byId(16).name.zh, /SiO\/C/);
  const nca = data.records.find((item) => item.slug === 'nca');
  assert.match(nca.summary.en, /nickel, cobalt and aluminium/);
  assert.match(data.records.find((item) => item.entryIds.includes(18)).summary.en, /sodium-ion/);
});

test('public search index covers every detail without internal source metadata', () => {
  assert.deepEqual(index.map((item) => item.slug), data.records.map((item) => item.slug));
  for (const item of index) {
    assert.deepEqual(Object.keys(item).sort(), ['aliases', 'categoryIds', 'name', 'slug', 'summary']);
    assert.ok(!JSON.stringify(item).includes('source_docx'));
  }
});

test('public formula and abbreviation searches resolve to the correct material', () => {
  const searchNames = (query) => index.filter((item) => [item.name.zh, item.name.en, ...item.aliases].some((label) => label.toLocaleLowerCase().includes(query.toLocaleLowerCase()))).map((item) => item.slug);
  assert.deepEqual(searchNames('SiC'), ['silicon-carbide']);
  assert.deepEqual(searchNames('Si/C'), ['silicon-carbon-composite']);
  assert.deepEqual(searchNames('SiO/C'), ['silicon-oxide-carbon-composite']);
  assert.deepEqual(searchNames('SiOC'), []);
  assert.deepEqual(searchNames('LFP'), ['lithium-iron-phosphate']);
  const abbreviations = { LMFP: 'lithium-manganese-iron-phosphate', LTO: 'lithium-titanate', GCC: 'ground-calcium-carbonate', PCC: 'precipitated-calcium-carbonate', SAP: 'superabsorbent-polymer', PAM: 'polyacrylamide', PPS: 'polyphenylene-sulfide' };
  for (const [alias, slug] of Object.entries(abbreviations)) assert.deepEqual(searchNames(alias), [slug]);
  assert.ok(!index.find((item) => item.slug === 'cedar-bark').aliases.includes('杉树皮'));
  assert.ok(!index.find((item) => item.slug === 'recycled-plastic').aliases.includes('垃圾'));
  assert.ok(data.records.find((item) => item.slug === 'silicon-carbon-composite').sources.some((source) => source.originalLabels?.includes('硅碳（SiC）')));
});
