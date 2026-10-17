import InteractiveImage from "@/components/content/InteractiveImage";
import InlineFactList from "@/components/content/InlineFactList";
import ApplicationProcess from "@/components/applications/ApplicationProcess";
import ApplicationHighlights from "@/components/applications/ApplicationHighlights";
import { getMaterialPreviews } from "@/content/material-previews";
import { materialFact, getEquipmentFacts } from "@/content/inline-previews";
import Link from "@/components/i18n/LocalizedLink";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import type { Locale } from "@/i18n/config";
import { applicationMessages, getApplications } from "@/i18n/messages/applications";
import { createPageMetadata } from "@/i18n/metadata";
import { ContentDisclosure } from "@/components/content/ContentDisclosure";
import { materials, materialEntries } from "@/content/materials";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createPageMetadata(locale, "/applications", {
    en: { title: applicationMessages.en.title, description: applicationMessages.en.intro },
    zh: { title: "材料应用", description: applicationMessages.zh.intro },
  });
}

export default async function ApplicationsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = applicationMessages[locale];
  const applications = getApplications(locale);
  const zh = locale === "zh";
  const previews = getMaterialPreviews(locale);
  const equipmentFacts = getEquipmentFacts(locale);
  const factsFor = (slugs: string[]) => previews.filter((item) => slugs.includes(item.slug)).map(materialFact);

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
      <div className="absolute left-0 right-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" />
      <Navbar />

      <div className="flex-1">
        <section className="border-b border-[#dbe3ee] bg-[#eef3f8]">
          <div className="container mx-auto grid gap-10 px-6 py-14 md:py-20 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
            <div className="min-w-0 xl:pt-12">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-[#142033] md:text-6xl">
                {t.title}
              </h1>
              <p className="mt-6 max-w-3xl border-l-2 border-[#f26522] pl-5 text-base leading-7 text-[#536276] md:text-lg md:leading-8">
                {t.intro}
              </p>
            </div>

            <div className="@container min-w-0 border border-[#dbe3ee] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] sm:p-7">
              <div className="mb-6">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a26849]">{t.routeLabel}</p>
                <h2 className="font-display text-xl font-semibold tracking-tight text-[#142033] sm:text-2xl">{t.routeTitle}</h2>
              </div>
              <ApplicationProcess labels={t.steps} />
            </div>
          </div>
        </section>

        <section className="bg-white py-8">
          <div className="container mx-auto px-6"><ApplicationHighlights locale={locale} /></div>
        </section>

        <section id="application-groups" className="scroll-mt-28 bg-[#f6f8fb] py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">{t.solutionsTitle}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#62748a]">
                  {t.solutionsIntro}
                </p>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c] hover:text-[#f26522]">
                {t.match}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {applications.map((category) => (
                <article id={category.id} key={category.name} className="scroll-mt-28 overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_14px_42px_rgba(15,23,42,0.06)]">
                  <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
                    <div className="grid grid-cols-2 border-b border-[#e5eaf2] bg-[#edf3f9] sm:block sm:border-b-0 sm:border-r">
                      {category.images.map((image, index) => (
                        <div key={image} className="relative aspect-square">
                          <InteractiveImage
                            src={image}
                            images={category.images.map((src, position) => ({ src, alt: `${category.name} ${t.sample} ${position + 1}` }))}
                            alt={`${category.name} ${t.sample} ${index + 1}`}
                            fill
                            sizes="180px"
                            className="object-cover p-4"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="p-6">
                      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f26522]">
                            {t.group}
                          </p>
                          <h3 className="font-display text-2xl font-semibold text-[#142033]">{category.name}</h3>
                        </div>
                        <span className="w-fit border border-[#dbe3ee] bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#536276]">
                          {category.items.length} {t.materials}
                        </span>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b7b8f]">{t.problem}</p>
                          <p className="mt-2 text-sm leading-6 text-[#536276]">{category.challenge}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b7b8f]">{t.process}</p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-[#174a7c]">{category.route}</p>
                        </div>
                      </div>

                      <div className="mt-5 border-t border-[#e8edf4] pt-5">
                        <InlineFactList label={zh ? '相关设备' : 'Related equipment'} items={equipmentFacts.filter((item) => category.relatedEquipment.some((entry) => entry.href === item.href))} />
                      </div>
                      <div className="mt-5">
                        <InlineFactList label={zh ? '典型物料' : 'Featured materials'} items={factsFor(category.materials.filter((item) => item.legacy).map((item) => item.slug))} />
                      </div>
                      {category.materials.some((item) => !item.legacy) && <details className="mt-4 border-t border-[#e8edf4] pt-3 text-xs text-[#62748a]">
                        <summary className="cursor-pointer py-2 hover:text-[#174a7c]">{zh ? '更多相关物料' : 'More related materials'} · {category.materials.filter((item) => !item.legacy).length}</summary>
                        <div className="mt-2"><InlineFactList label={zh ? '更多相关物料' : 'More related materials'} items={factsFor(category.materials.filter((item) => !item.legacy).map((item) => item.slug))} /></div>
                      </details>}
                      <ContentDisclosure id={`${category.id}-processing`} title={zh ? '行业加工说明' : 'Industry processing notes'} className="mt-4 border-t border-[#e8edf4] [&_summary]:py-3 [&_summary]:text-xs">
                        <div className="space-y-3 text-xs leading-6 text-[#62748a]">
                          {category.industryGuide.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">{category.industryGuide.links.map((link) => <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 text-[#536276] underline decoration-[#c7d5e4] underline-offset-4 hover:text-[#174a7c]">{link.label}<ArrowRight size={12} aria-hidden="true" /></Link>)}</div>
                        </div>
                      </ContentDisclosure>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="border-t border-[#dbe3ee] bg-white py-10 md:py-14">
          <div className="container mx-auto space-y-3 px-6">
            <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
              <div><h2 className="text-lg font-semibold text-[#314155]">{zh ? '进一步了解材料与工艺' : 'Explore materials and process choices'}</h2>
                <p className="mt-2 max-w-3xl text-xs leading-6 text-[#62748a]">{zh ? `${materialEntries.length} 个分类条目对应 ${materials.length} 项材料说明，别名及跨行业条目共用详情。目录数量不代表已完成试验的样品数。` : `${materialEntries.length} category entries correspond to ${materials.length} material guides, with shared details for aliases and cross-industry entries. The count does not represent completed material trials.`}</p></div>
              <Link href="/applications/materials" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c]">{zh ? '搜索全部物料' : 'Search all materials'}<ArrowRight size={15} /></Link>
            </div>
            <ContentDisclosure id="process-notes" title={zh ? '粉碎、解聚、分级、整形分别解决什么' : 'What grinding, deagglomeration, classification and shaping do'} intro={zh ? '主图展示常见工序，每条路线按目标选用所需步骤。' : 'The process map shows common operations. Each route uses the steps required by its target.'}>
              <div className="grid gap-5 md:grid-cols-2">
                <p>{zh ? '进料与调质：确认身份、尺寸和含水，去除异物，使进料连续稳定。粉碎缩小实体颗粒；解聚则以拆开团聚体、尽量保持原颗粒为目标。' : 'Feeding and conditioning establish identity, size and moisture, remove foreign matter and stabilize flow. Grinding reduces solid particle size; deagglomeration separates clusters while seeking to retain the original particles.'}</p>
                <p>{zh ? '分级：按颗粒在气流中的行为分离粗细部分，并按需返回粗料。其结果受到粒径、密度与形状共同影响，不能直接等同于化学提纯。' : 'Classification separates fractions by their behaviour in airflow and can return coarse material. Size, density and shape all affect the result; classification is not equivalent to chemical purification.'}</p>
                <p>{zh ? '整形：为目标应用调整颗粒形貌，例如石墨球化或棱角整理。片状和针状填料可能需要保形，不能把整形当作所有物料的固定步骤。' : 'Shaping adjusts morphology for an application, such as graphite spheroidization or edge conditioning. Plate-like and needle-like fillers may need shape retention, so shaping is not universal.'}</p>
                <p>{zh ? '收集与转移：通过旋风、过滤及密闭转移回收粉体，结合材料选择气氛、防潮、清洁和粉尘控制。成品、细粉与残留均应纳入质量平衡。' : 'Collection and transfer recover powder through cyclones, filters and enclosed transfer, with material-specific atmosphere, moisture, cleaning and dust control. Product, fines and residues belong in the mass balance.'}</p>
              </div>
            </ContentDisclosure>
            <ContentDisclosure id="equipment-notes" title={zh ? '设备推荐的选择依据' : 'How equipment recommendations are selected'}>
              <p>{zh ? '先明确目标是粉碎、解聚、分级还是整形，再比较原料硬度、脆性、延展性、热敏性、吸湿和形貌要求。页面上的设备是可比较的设备家族，具体型号与参数需通过实际来料、目标粒度和处理量确认。' : 'First establish whether the task is grinding, deagglomeration, classification or shaping, then compare hardness, brittleness, ductility, heat sensitivity, moisture uptake and shape requirements. Linked equipment families are candidates; models and settings depend on the actual feed, target size and throughput.'}</p>
              <div className="mt-4 flex flex-wrap gap-5"><Link href="/products/technologies/powder-terminology" className="text-xs text-[#174a7c]">{zh ? '查看粒度与形貌术语 →' : 'Read size and morphology terms →'}</Link><Link href="/contact-us?service=trial" className="text-xs text-[#174a7c]">{zh ? '了解来料试验 →' : 'Discuss a material trial →'}</Link></div>
            </ContentDisclosure>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
