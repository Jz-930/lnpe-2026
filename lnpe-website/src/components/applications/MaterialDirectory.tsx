'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Search, X } from 'lucide-react';
import Link from '@/components/i18n/LocalizedLink';
import type { Locale } from '@/i18n/config';
import { replaceQueryValues } from '@/i18n/browser-url';

import type { MaterialPreview } from '@/content/material-previews';
import InteractiveImage from '@/components/content/InteractiveImage';
import touchStyles from './TouchCatalog.module.css';
type Item = MaterialPreview;
type Category = { id: string; name: string };
export default function MaterialDirectory({ locale, items, categories, initialQuery = '', initialCategory = 'all', syncUrl = false, pageSize = 24 }: { locale: Locale; items: Item[]; categories: Category[]; initialQuery?: string; initialCategory?: string; syncUrl?: boolean; pageSize?: number }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [limit, setLimit] = useState(pageSize);
  const id = useId();
  const zh = locale === 'zh';
  const normalized = query.trim().toLocaleLowerCase();
  const results = useMemo(() => items.filter((item) => (category === 'all' || item.categoryIds.includes(category)) && (!normalized || item.searchText.includes(normalized))), [items, category, normalized]);
  const updateFilters = (nextQuery: string, nextCategory: string) => {
    setQuery(nextQuery);
    setCategory(nextCategory);
    setLimit(pageSize);
    if (syncUrl) replaceQueryValues({ q: nextQuery || null, category: nextCategory === 'all' ? null : nextCategory });
  };
  useEffect(() => {
    if (!syncUrl) return;
    const restoreFilters = () => {
      const params = new URLSearchParams(window.location.search);
      const value = params.get('category');
      setQuery(params.get('q') ?? '');
      setCategory(categories.some((entry) => entry.id === value) ? value! : 'all');
      setLimit(pageSize);
    };
    window.addEventListener('popstate', restoreFilters);
    return () => window.removeEventListener('popstate', restoreFilters);
  }, [syncUrl, categories, pageSize]);
  return <div className="min-w-0">
    <div className={`${touchStyles.fields} grid gap-3 sm:grid-cols-[1fr_220px]`}>
      <div className="min-w-0">
        <label htmlFor={`${id}-search`} className="sr-only max-lg:not-sr-only max-lg:mb-2 max-lg:block max-lg:text-xs max-lg:font-semibold max-lg:text-[#536276]">{zh ? '搜索材料名称或别名' : 'Search material names or aliases'}</label>
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-[#62748a] max-lg:top-1/2 max-lg:-translate-y-1/2" />
          <input id={`${id}-search`} type="search" enterKeyHint="search" autoComplete="off" value={query} onChange={(event) => updateFilters(event.target.value, category)} placeholder={zh ? '搜索中文、英文名称或别名…' : 'Search English, Chinese or aliases…'} className="w-full appearance-none rounded-sm border border-[#dbe3ee] bg-white py-3 pl-11 pr-12 text-sm text-[#314155] outline-none focus:border-[#174a7c] focus:ring-1 focus:ring-[#174a7c] [&::-webkit-search-cancel-button]:appearance-none" />
          {query && <button type="button" onClick={() => { updateFilters('', category); document.getElementById(`${id}-search`)?.focus(); }} aria-label={zh ? '清空搜索' : 'Clear search'} className="absolute right-2 top-1.5 rounded p-2.5 text-[#62748a] hover:text-[#174a7c] max-lg:right-0.5 max-lg:top-1/2 max-lg:flex max-lg:h-11 max-lg:w-11 max-lg:-translate-y-1/2 max-lg:items-center max-lg:justify-center"><X size={16} /></button>}
        </div>
      </div>
      <div className="min-w-0">
        <label htmlFor={`${id}-category`} className="sr-only max-lg:not-sr-only max-lg:mb-2 max-lg:block max-lg:text-xs max-lg:font-semibold max-lg:text-[#536276]">{zh ? '筛选应用领域' : 'Filter application group'}</label>
        <select id={`${id}-category`} value={category} onChange={(event) => updateFilters(query, event.target.value)} className="w-full rounded-sm border border-[#dbe3ee] bg-white px-3 py-3 text-sm text-[#314155] focus:border-[#174a7c]">
          <option value="all">{zh ? '全部应用领域' : 'All application groups'}</option>
          {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>
    </div>
    <div className="flex items-center justify-between gap-3">
      <p aria-live="polite" aria-atomic="true" className="my-5 text-xs leading-6 text-[#62748a]">{zh ? `找到 ${results.length} 项材料说明` : `${results.length} material ${results.length === 1 ? 'guide' : 'guides'} found`}</p>
      {(query || category !== 'all') && <button type="button" onClick={() => updateFilters('', 'all')} className="min-h-11 shrink-0 px-1 text-xs font-semibold text-lnpe-blue underline underline-offset-4 lg:hidden">{zh ? '重置筛选' : 'Reset filters'}</button>}
    </div>
    {results.length ? <ul className={`${touchStyles.materialList} grid items-start gap-x-8 md:grid-cols-2 xl:grid-cols-3`}>
      {results.slice(0, limit).map((item) => <li key={item.slug} className="border-t border-[#dbe3ee]">
        <details className="group/material">
          <summary className="block cursor-pointer list-none py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174a7c] [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-3 text-sm font-semibold text-[#314155] hover:text-[#174a7c]">{item.name}<ChevronDown size={15} className="mt-0.5 shrink-0 text-[#8794a5] transition-transform group-open/material:rotate-180" /></span>
            <span className="mt-2 block text-xs leading-6 text-[#62748a]">{item.summary}</span>
            <span className="mt-2 block text-[11px] font-semibold text-lnpe-blue"><span className="group-open/material:hidden">{zh ? '展开加工说明' : 'Explore processing notes'}</span><span className="hidden group-open/material:inline">{zh ? '收起加工说明' : 'Collapse processing notes'}</span></span>
          </summary>
          <div className="mb-5 space-y-3 border-l-2 border-lnpe-kinetic bg-[#f3f6f9] p-4 text-xs leading-6 text-lnpe-muted">
            {item.images[0] && <div className="relative aspect-square w-32"><InteractiveImage src={item.images[0]} alt={item.name} fill sizes="128px" className="object-contain p-2" /></div>}
            <p><strong className="block font-semibold text-lnpe-dark">{zh ? '加工重点' : 'Processing priorities'}</strong>{item.focus}</p>
            <p><strong className="block font-semibold text-lnpe-dark">{zh ? '设备与工艺选择' : 'Equipment and process selection'}</strong>{item.selection}</p>
            <p><strong className="block font-semibold text-lnpe-dark">{zh ? '试验输入' : 'Trial inputs'}</strong>{item.inputs}</p>
            <Link href={`/applications/materials/${item.slug}`} className="inline-flex min-h-9 items-center gap-2 font-semibold text-lnpe-blue">{zh ? '查看完整材料指南' : 'Read full material guide'}<ArrowRight size={13} /></Link>
          </div>
        </details>
      </li>)}
    </ul> : <div className="border border-dashed border-[#dbe3ee] px-5 py-10 text-sm leading-7 text-[#62748a]">
      <p>{zh ? '没有找到匹配的材料。可以更换名称、使用英文名称或清除分类筛选。' : 'No matching material. Try another name, a Chinese name, or clear the category filter.'}</p>
      <Link href={`/contact-us?service=trial&material=${encodeURIComponent(query)}`} className="mt-3 inline-flex items-center gap-2 text-[#174a7c]">{zh ? '提交其他物料进行评估' : 'Request assessment for another material'}<ArrowRight size={14} /></Link>
    </div>}
    {results.length > limit && <button type="button" onClick={() => setLimit((current) => current + pageSize)} className="mt-5 min-h-11 border border-lnpe-border bg-white px-5 py-3 text-xs font-semibold text-lnpe-blue hover:border-lnpe-blue max-lg:min-h-12 max-lg:w-full max-lg:text-sm">{zh ? `继续查看 · 还有 ${results.length - limit} 项` : `Show more · ${results.length - limit} remaining`}</button>}
  </div>;
}
