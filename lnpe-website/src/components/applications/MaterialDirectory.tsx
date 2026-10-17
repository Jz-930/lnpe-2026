'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import Link from '@/components/i18n/LocalizedLink';
import type { Locale } from '@/i18n/config';

type Item = { slug: string; name: string; categoryIds: string[]; searchText: string; summary: string };
type Category = { id: string; name: string };
export default function MaterialDirectory({ locale, items, categories, initialQuery = '' }: { locale: Locale; items: Item[]; categories: Category[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('all');
  const zh = locale === 'zh';
  const normalized = query.trim().toLocaleLowerCase();
  const results = useMemo(() => items.filter((item) => (category === 'all' || item.categoryIds.includes(category)) && (!normalized || item.searchText.includes(normalized))), [items, category, normalized]);
  return <div>
    <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
      <div className="relative">
        <label htmlFor="material-search" className="sr-only">{zh ? '搜索材料名称或别名' : 'Search material names or aliases'}</label>
        <Search aria-hidden="true" className="absolute left-4 top-3.5 h-4 w-4 text-[#62748a]" />
        <input id="material-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={zh ? '搜索中文、英文名称或别名…' : 'Search English, Chinese or aliases…'} className="w-full rounded-sm border border-[#dbe3ee] bg-white py-3 pl-11 pr-12 text-sm text-[#314155] outline-none focus:border-[#174a7c] focus:ring-1 focus:ring-[#174a7c]" />
        {query && <button type="button" onClick={() => setQuery('')} aria-label={zh ? '清空搜索' : 'Clear search'} className="absolute right-2 top-1.5 rounded p-2.5 text-[#62748a] hover:text-[#174a7c]"><X size={16} /></button>}
      </div>
      <div>
        <label htmlFor="material-category" className="sr-only">{zh ? '筛选应用领域' : 'Filter application group'}</label>
        <select id="material-category" value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-sm border border-[#dbe3ee] bg-white px-3 py-3 text-sm text-[#314155] focus:border-[#174a7c]">
          <option value="all">{zh ? '全部应用领域' : 'All application groups'}</option>
          {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>
    </div>
    <p aria-live="polite" className="my-5 text-xs leading-6 text-[#62748a]">{zh ? `找到 ${results.length} 项材料说明` : `${results.length} material guides found`}</p>
    {results.length ? <ul className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">
      {results.map((item) => <li key={item.slug} className="border-t border-[#dbe3ee]">
        <Link href={`/applications/materials/${item.slug}`} className="group block py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174a7c]">
          <span className="flex items-start justify-between gap-3 text-sm font-semibold text-[#314155] transition-colors group-hover:text-[#174a7c]">{item.name}<ArrowRight size={15} className="mt-0.5 shrink-0 text-[#8794a5] transition-transform motion-safe:group-hover:translate-x-1" /></span>
          <p className="mt-2 text-xs leading-6 text-[#62748a]">{item.summary}</p>
        </Link>
      </li>)}
    </ul> : <div className="border border-dashed border-[#dbe3ee] px-5 py-10 text-sm leading-7 text-[#62748a]">
      <p>{zh ? '没有找到匹配的材料。可以更换名称、使用英文名称或清除分类筛选。' : 'No matching material. Try another name, a Chinese name, or clear the category filter.'}</p>
      <Link href={`/contact-us?service=trial&material=${encodeURIComponent(query)}`} className="mt-3 inline-flex items-center gap-2 text-[#174a7c]">{zh ? '提交其他物料进行评估' : 'Request assessment for another material'}<ArrowRight size={14} /></Link>
    </div>}
  </div>;
}
