import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import Link from '@/components/i18n/LocalizedLink';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContentDisclosure } from '@/components/content/ContentDisclosure';
import { getMaterial, getMaterialSlugs, getMaterialEquipment, getMaterialInquiryHref, materialGuidance, materialCategories, materials, type MaterialCategoryId } from '@/content/materials';
import type { Locale } from '@/i18n/config';
import { createPageMetadata } from '@/i18n/metadata';

type Props = { params: Promise<{ locale: Locale; slug: string }> };
export function generateStaticParams() { return getMaterialSlugs().map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const item = getMaterial(slug);
  if (!item) return {};
  return createPageMetadata(locale, `/applications/materials/${slug}`, {
    zh: { title: `${item.name.zh}｜材料与加工`, description: item.summary.zh },
    en: { title: `${item.name.en} | Material & Processing`, description: item.summary.en },
  });
}
export default async function MaterialPage({ params }: Props) {
  const { locale, slug } = await params;
  const material = getMaterial(slug);
  if (!material) notFound();
  const zh = locale === 'zh';
  const guidance = materialGuidance[material.profile];
  const equipment = getMaterialEquipment(material, locale);
  const related = materials.filter((item) => item.slug !== slug && item.categoryIds.some((id) => material.categoryIds.includes(id))).slice(0, 5);
  const technology = slug === 'sulfur' ? 'sulfur-pulverizer' : guidance.technology;
  return <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
    <div className="absolute inset-x-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" /><Navbar />
    <div className="container mx-auto flex-1 px-6 py-12 md:py-16">
      <nav aria-label={zh ? '当前位置' : 'Breadcrumb'} className="mb-9 flex flex-wrap items-center gap-2 text-xs leading-6 text-[#62748a]">
        <Link href="/applications" className="hover:text-[#174a7c]">{zh ? '材料应用' : 'Applications'}</Link><ChevronRight size={12} aria-hidden="true" />
        <Link href="/applications/materials" className="hover:text-[#174a7c]">{zh ? '物料目录' : 'Material library'}</Link><ChevronRight size={12} aria-hidden="true" />
        <span aria-current="page">{material.name[locale]}</span>
      </nav>
      <div className={`grid gap-8 ${material.images.length ? 'md:grid-cols-[1fr_240px] lg:gap-16' : ''}`}>
        <header className="max-w-4xl">
          <p className="text-xs font-semibold tracking-wide text-[#62748a]">{material.categoryIds.map((id) => materialCategories[id as MaterialCategoryId][locale]).join(' / ')}</p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{material.name[locale]}</h1>
          <p className="mt-5 text-base leading-8 text-[#536276]">{material.summary[locale]}</p>
          <div className="mt-6 border-l-2 border-[#c7d5e4] pl-5">
            <h2 className="text-xs font-semibold text-[#314155]">{zh ? '这项材料的加工重点' : 'Material-specific processing priorities'}</h2>
            <p className="mt-2 text-sm leading-7 text-[#536276]">{material.focus[locale]}</p>
          </div>
        </header>
        {material.images.length > 0 && <figure className="max-w-[240px]">
          <div className="relative aspect-square overflow-hidden border border-[#dbe3ee] bg-white"><Image src={material.images[0]} alt={zh ? `${material.name.zh}物料示意图` : `${material.name.en} material illustration`} fill sizes="240px" className="object-contain p-5" /></div>
          {material.images.length > 1 && <div className="mt-2 grid grid-cols-2 gap-2">{material.images.slice(1).map((image) => <div className="relative aspect-square border border-[#dbe3ee] bg-white" key={image}><Image src={image} alt={zh ? `${material.name.zh}补充物料图示` : `Additional ${material.name.en} illustration`} fill sizes="110px" className="object-contain p-2" /></div>)}</div>}
          <figcaption className="mt-2 text-[11px] leading-5 text-[#62748a]">{zh ? '物料图示；实际形貌以具体来料为准。' : 'Material illustration; actual morphology depends on the supplied feed.'}</figcaption>
        </figure>}
      </div>
      <section className="mt-12 max-w-5xl border-t border-[#dbe3ee] pt-8">
        <p className="text-xs font-semibold tracking-wide text-[#62748a]">{zh ? '工艺选择' : 'Process selection'}</p>
        <h2 className="mt-2 font-display text-xl font-semibold">{guidance.title[locale]}</h2>
        <p className="mt-3 text-xs leading-6 text-[#62748a]">{zh ? '以下是选型与试验的起点。各步骤按实际目标选用，不代表每项材料都需要完整经过所有工序。' : 'These are starting points for selection and trials. Choose steps for the actual target; not every material needs every operation.'}</p>
        <ol className="mt-6 grid gap-5 md:grid-cols-3">
          {guidance.steps.map((step, index) => <li key={index} className="border border-[#dbe3ee] bg-white/70 p-5"><span className="text-xs font-semibold tabular-nums text-[#8794a5]">0{index + 1}</span><p className="mt-3 text-sm leading-7 text-[#536276]">{step[locale]}</p></li>)}
        </ol>
      </section>
      <div className="mt-10 max-w-5xl space-y-3">
        <ContentDisclosure title={zh ? '设备选择依据与相关设备' : 'Selection rationale and related equipment'} intro={zh ? '按材料状态选择作用方式，再比较设备配置。' : 'Choose the processing action for the feed before comparing configurations.'}>
          <p>{guidance.selection[locale]}</p>
          <div className="mt-5 flex flex-wrap gap-2">{equipment.map((item) => <Link key={item.href} href={item.href} className="inline-flex items-center gap-2 rounded-sm border border-[#dbe3ee] bg-white px-3 py-2 text-xs text-[#314155] hover:border-[#174a7c] hover:text-[#174a7c]">{item.name}<ArrowRight size={13} /></Link>)}</div>
          <Link href={`/products/technologies/${technology}`} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#174a7c]">{zh ? '进一步了解工艺与系统选择' : 'Explore process and system choices'}<ArrowRight size={13} /></Link>
        </ContentDisclosure>
        <ContentDisclosure title={zh ? '送样前需要明确什么' : 'Information to prepare before a trial'}>
          <p>{guidance.inputs[locale]}</p>
          <p className="mt-4">{zh ? '同时提供计划处理量、连续或批次运行方式、目标应用、气源/热源及可提供样品量。D10/D50/D90应注明检测方法与分散条件，以便不同试验可比较。' : 'Also provide planned throughput, continuous or batch operation, intended use, gas/heat utilities and available sample quantity. State measurement methods and dispersion conditions for D10/D50/D90 so trials are comparable.'}</p>
        </ContentDisclosure>
        <ContentDisclosure title={zh ? '如何评价试验结果' : 'How to evaluate trial results'}>
          <p>{guidance.checks[locale]}</p>
          <p className="mt-4">{zh ? '试验记录应关联原料批次、进料状态、设备配置、运行条件、收集方式及检测方法。产量、能耗和成品指标以约定工况的来料试验为依据，跨材料或跨牌号不直接套用。' : 'Trial records should link feed batch and condition with configuration, operating conditions, collection and measurement methods. Throughput, energy and product specifications depend on tests under agreed conditions and should not be transferred across materials or grades.'}</p>
          <Link href="/products/technologies/powder-terminology" className="mt-4 inline-flex items-center gap-2 text-xs text-[#174a7c]">{zh ? '查看粒度、形貌与收率术语' : 'Read particle size, morphology and yield terms'}<ArrowRight size={13} /></Link>
        </ContentDisclosure>
      </div>
      <div className="mt-9 flex max-w-5xl flex-wrap items-center justify-between gap-5 border border-[#dbe3ee] bg-white px-6 py-5">
        <p className="max-w-2xl text-sm leading-7 text-[#62748a]">{zh ? '结合您的原料牌号和目标指标，比较适合的粉体处理路线。' : 'Compare suitable powder-processing routes for your feed grade and target specifications.'}</p>
        <Link href={getMaterialInquiryHref(material, locale)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c] hover:text-[#f26522]">{zh ? '咨询这项物料 / 来料试验' : 'Discuss this material / request a trial'}<ArrowRight size={16} /></Link>
      </div>
      <aside className="mt-10 max-w-5xl border-t border-[#dbe3ee] pt-6">
        <h2 className="text-xs font-semibold text-[#62748a]">{zh ? '同领域材料' : 'More in this application group'}</h2>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">{related.map((item) => <Link key={item.slug} href={`/applications/materials/${item.slug}`} className="text-xs text-[#536276] underline decoration-[#c7d5e4] underline-offset-4 hover:text-[#174a7c]">{item.name[locale]}</Link>)}</div>
        <Link href="/applications/materials" className="mt-6 inline-flex items-center gap-2 text-xs text-[#62748a] hover:text-[#174a7c]"><ArrowLeft size={13} />{zh ? '浏览全部物料' : 'Browse all materials'}</Link>
      </aside>
    </div><Footer />
  </main>;
}
