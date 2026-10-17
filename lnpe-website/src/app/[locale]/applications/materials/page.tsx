import Link from '@/components/i18n/LocalizedLink';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getMaterialPreviews } from '@/content/material-previews';
import MaterialDirectory from '@/components/applications/MaterialDirectory';
import { materialEntries, materialCategories, applicationCategoryIds } from '@/content/materials';
import type { Locale } from '@/i18n/config';
import { createPageMetadata } from '@/i18n/metadata';

type Props = { params: Promise<{ locale: Locale }>; searchParams: Promise<{ q?: string | string[]; category?: string | string[] }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, '/applications/materials', {
    zh: { title: '物料与加工说明', description: '按材料名称、别名和应用领域查找粉体介绍、加工目标、工艺选择与试验输入。' },
    en: { title: 'Material & Processing Library', description: 'Find powder introductions, processing goals, route-selection considerations and trial inputs by material name, alias or application.' },
  });
}
export default async function MaterialsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q, category } = await searchParams;
  const initialQuery = typeof q === 'string' ? q : '';
  const initialCategory = applicationCategoryIds.find((id) => id === category) ?? 'all';
  const zh = locale === 'zh';
  const items = getMaterialPreviews(locale);
  return <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
    <div className="absolute inset-x-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" /><Navbar />
    <div className="container mx-auto flex-1 px-6 py-12 md:py-16">
      <Link href="/applications" className="inline-flex items-center gap-2 text-xs text-[#62748a] hover:text-[#174a7c]"><ArrowLeft size={14} />{zh ? '返回材料应用' : 'Back to applications'}</Link>
      <div className="mb-10 mt-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#62748a]">{zh ? '应用资料' : 'Application reference'}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{zh ? '物料与加工说明' : 'Material & Processing Library'}</h1>
        <p className="mt-5 text-sm leading-7 text-[#536276]">{zh ? '从材料自身特性出发，了解粉碎、解聚、分级或整形的选择条件。每项说明都提供加工重点与试验输入，具体参数由来料和目标要求确定。' : 'Explore grinding, deagglomeration, classification and shaping according to material properties. Each guide explains processing priorities and trial inputs; parameters depend on the actual feed and targets.'}</p>
        <p className="mt-3 text-xs leading-6 text-[#62748a]">{zh ? `${materialEntries.length} 个分类条目，归并为 ${items.length} 项材料说明；别名及跨行业条目共用详情，数量不代表已完成试验的样品数。` : `${materialEntries.length} category entries link to ${items.length} material guides. Aliases and cross-industry entries share details; this is not a count of tested samples.`}</p>
      </div>
      <MaterialDirectory key={`${locale}:${initialQuery}:${initialCategory}`} locale={locale} items={items} categories={applicationCategoryIds.map((id) => ({ id, name: materialCategories[id][locale] }))} initialQuery={initialQuery} initialCategory={initialCategory} syncUrl />
      <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-[#dbe3ee] pt-7 text-xs text-[#62748a]">
        <Link href="/products/technologies/powder-terminology" className="inline-flex items-center gap-2 hover:text-[#174a7c]">{zh ? '粒度、形貌与收率术语' : 'Particle size, morphology and yield terms'}<ArrowRight size={13} /></Link>
        <Link href="/contact-us?service=trial" className="inline-flex items-center gap-2 hover:text-[#174a7c]">{zh ? '提交来料试验需求' : 'Request a material trial'}<ArrowRight size={13} /></Link>
      </div>
    </div><Footer />
  </main>;
}
