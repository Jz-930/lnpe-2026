import Link from "@/components/i18n/LocalizedLink";
import { ContentDisclosure } from "@/components/content/ContentDisclosure";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getProductTechnologies, productTechnologyPath } from "@/content/product-technology";
import { productNames } from "@/i18n/messages/product-names";
import type { ProductSlug } from "@/i18n/messages/catalog";

export const technicalUi = {
  zh: {
    directory: "配置、配套与工艺资料", directoryIntro: "按加工任务查看设备变型、整线单元和选型说明。",
    details: "阅读工艺说明", configurations: "配置与工艺说明", specifications: "系列名称与选型数据", specificationIntro: "设备规格需要与物料和系统工况一起确定。下列信息用于形成可比较的试验方案和技术配置。",
    models: "系列与配置名称", modelNote: "具体规格、组合及供货范围按选型方案确认。",
    field: "资料项目", purpose: "用于确定", terms: "粒度、形貌与能耗指标说明", termsIntro: "了解D10/D50/D90、切割粒径、收率、振实密度、比表面积及系统能耗边界。",
    videos: "原理与设备视频", videoNote: "以下链接打开原官网的视频页面，可对照设备系列阅读；现场布置和配置以具体方案为准。", externalVideo: "原站视频 · 外部页面",
    all: "查看全部工艺资料", consult: "提供选型信息", reference: "工艺资料", back: "返回产品目录",
    principle: "工作方式与工艺目标", process: "参考工艺步骤", options: "配置选择与适用条件", selection: "选型需要哪些信息", verification: "试验与验收关注点", parent: "所属产品", sources: "公开参考资料", sourcePage: "原站技术页面", related: "继续了解",
  },
  en: {
    directory: "Configurations, supporting systems and process notes", directoryIntro: "Explore equipment variants, line modules and selection guidance by processing task.",
    details: "Read process notes", configurations: "Configurations and process notes", specifications: "Series references and specification inputs", specificationIntro: "Equipment specifications depend on the feed and system conditions. These inputs establish a comparable trial plan and technical configuration.",
    models: "Series and configuration references", modelNote: "The selection proposal defines specifications, combinations and supply scope.",
    field: "Input", purpose: "Used to establish", terms: "Particle-size, morphology and energy metrics", termsIntro: "Understand D10/D50/D90, cut size, yield, tap density, specific surface area and system-energy boundaries.",
    videos: "Principle and equipment videos", videoNote: "These links open video pages on the original website. Read them alongside the equipment series; layout and configuration follow the project proposal.", externalVideo: "Original-site video · external page",
    all: "Browse all process notes", consult: "Discuss selection inputs", reference: "Process notes", back: "Back to products",
    principle: "How it works and what it targets", process: "Reference process steps", options: "Configuration and operating conditions", selection: "Information needed for selection", verification: "Trial and acceptance considerations", parent: "Product family", sources: "Public references", sourcePage: "Original technical page", related: "Explore further",
  },
};

const specificationInputs = {
  zh: [
    ["原料身份、组成、粒度与含水", "粉碎/分散难度、前处理及给料方式"],
    ["目标D10/D50/D90及粒级上下限", "粉碎强度、分级切割与细粉控制"],
    ["要求产量、批次及运行时数", "机型、缓存、连续运行与产线节拍"],
    ["纯度、磁性物、温度与形貌指标", "接触材质、气氛和检测项目"],
    ["气源/蒸汽压力、温度、流量及品质", "公用工程匹配、气体处理与保护回路"],
    ["电力、场地、安装尺寸及维护空间", "整线布置、接口与可维护性"],
    ["各股收率、能耗边界与检测方法", "试验质量平衡和验收条件"],
    ["上游出料与下游收集/输送/包装", "系统供货范围及衔接条件"],
  ],
  en: [
    ["Feed identity, composition, size and moisture", "Milling/dispersion difficulty, pretreatment and feeding"],
    ["Target D10/D50/D90 and upper/lower limits", "Milling intensity, classifier cuts and fines control"],
    ["Output, batches and operating hours", "Equipment size, buffers, continuous duty and line rate"],
    ["Purity, magnetic impurities, temperature and morphology", "Contact materials, atmosphere and tests"],
    ["Gas/steam pressure, temperature, flow and quality", "Utilities, conditioning and protective circuits"],
    ["Power, footprint and maintenance access", "Layout, interfaces and serviceability"],
    ["Stream yields, energy boundaries and test methods", "Trial mass balance and acceptance conditions"],
    ["Upstream discharge and downstream collection/packing", "Supply scope and process handoff"],
  ],
};

type Video = { id: string; title: Record<Locale, string>; parents: ProductSlug[] };
const videos: Video[] = [
  { id: "15913", title: { zh: "LNJ-6A结构设计", en: "LNJ-6A structure design" }, parents: ["jet-mill", "laboratory-equipment"] },
  { id: "15914", title: { zh: "LNJ-6A工作原理", en: "LNJ-6A working principle" }, parents: ["jet-mill", "laboratory-equipment"] },
  { id: "16024", title: { zh: "机械磨工作原理", en: "Impact-mill working principle" }, parents: ["impact-mill"] },
  { id: "16026", title: { zh: "脉冲除尘系统", en: "Pulse-jet dust collection" }, parents: ["turnkey-epc"] },
  { id: "16028", title: { zh: "密相气力输送系统", en: "Dense-phase pneumatic conveying" }, parents: ["turnkey-epc"] },
  { id: "16029", title: { zh: "LNJ-18A-2设备介绍", en: "LNJ-18A-2 introduction" }, parents: ["laboratory-equipment"] },
  { id: "16064", title: { zh: "气流分级机", en: "Air classifiers" }, parents: ["air-classifier"] },
  { id: "16155", title: { zh: "硫磺粉碎系统", en: "Sulfur grinding system" }, parents: ["impact-mill"] },
  { id: "16256", title: { zh: "LNSE-120HT节能气流磨", en: "LNSE-120HT energy-saving jet mill" }, parents: ["jet-mill"] },
  { id: "23329", title: { zh: "金属粉气流分级", en: "Metal-powder air classification" }, parents: ["air-classifier"] },
  { id: "28710", title: { zh: "LNP-18A整形机", en: "LNP-18A shaping mill" }, parents: ["shaping-mill", "laboratory-equipment"] },
  { id: "32427", title: { zh: "石墨粉碎与整形产线", en: "Graphite milling and shaping line" }, parents: ["shaping-mill", "turnkey-epc"] },
  { id: "42654", title: { zh: "LNP-1200A设备展示", en: "LNP-1200A equipment" }, parents: ["shaping-mill"] },
  { id: "53726", title: { zh: "机械磨设备展示", en: "Impact mill" }, parents: ["impact-mill"] },
  { id: "54055", title: { zh: "气流磨设备展示", en: "Jet mill" }, parents: ["jet-mill"] },
];

export function ProductTechnicalContent({ locale, slug }: { locale: Locale; slug: ProductSlug }) {
  const ui = technicalUi[locale];
  const entries = getProductTechnologies(locale, slug).filter((item) => item.slug !== "powder-terminology");
  const series = [...new Set(entries.flatMap((entry) => entry.models ?? []))];
  const productVideos = videos.filter((video) => video.parents.includes(slug));
  return (
    <section className="border-y border-[#dbe3ee] bg-[#f6f8fb]" aria-label={ui.configurations}>
      <div className="container mx-auto px-6 py-5 md:py-8">
        <ContentDisclosure title={ui.configurations} intro={ui.directoryIntro} id="technical-configurations">
          <div className="grid gap-x-10 md:grid-cols-2">
            {entries.map((entry) => <div key={entry.slug} className="border-t border-[#dbe3ee] py-4">
              <Link href={productTechnologyPath(entry.slug)} className="inline-flex items-center gap-2 font-medium text-[#3b526c] transition-colors hover:text-[#174a7c]">
                {entry.title}<ArrowRight size={14} aria-hidden="true" className="shrink-0" />
              </Link>
              <p className="mt-1.5 text-sm leading-6 text-[#62748a]">{entry.summary}</p>
            </div>)}
          </div>
        </ContentDisclosure>
        <ContentDisclosure title={ui.specifications} intro={ui.specificationIntro} id="specification-inputs">
          {series.length > 0 && <div className="mb-5">
            <p className="font-medium text-[#3b526c]">{ui.models}</p>
            <p className="mt-1 font-mono text-sm">{series.join(" · ")}</p>
            <p className="mt-1 text-xs text-[#62748a]">{ui.modelNote}</p>
          </div>}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <thead><tr className="border-b border-[#cbd7e6]"><th className="py-3 pr-6 font-medium text-[#3b526c]">{ui.field}</th><th className="py-3 font-medium text-[#3b526c]">{ui.purpose}</th></tr></thead>
              <tbody>{specificationInputs[locale].map(([field, purpose]) => <tr key={field} className="border-b border-[#e1e7ef]"><th scope="row" className="py-3 pr-6 align-top font-normal">{field}</th><td className="py-3 align-top">{purpose}</td></tr>)}</tbody>
            </table>
          </div>
          <Link href={`/contact-us?equipment=${slug}&service=selection`} className="mt-5 inline-flex items-center gap-2 font-medium text-[#3b526c] hover:text-[#174a7c]">{ui.consult}<ArrowRight size={14} /></Link>
        </ContentDisclosure>
        <ContentDisclosure title={ui.terms} intro={ui.termsIntro} id="performance-metrics">
          <Link href={productTechnologyPath("powder-terminology")} className="inline-flex items-center gap-2 font-medium text-[#3b526c] hover:text-[#174a7c]">{ui.details}<ArrowRight size={14} /></Link>
        </ContentDisclosure>
        {productVideos.length > 0 && <ContentDisclosure title={ui.videos} intro={ui.videoNote} id="product-videos">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {productVideos.map((video) => <a key={video.id} href={`https://www.lnpepowder.com/video/${video.id}.html`} target="_blank" rel="noopener noreferrer" className="border border-[#dbe3ee] px-4 py-3 transition-colors hover:border-[#b6c5d7] hover:bg-white">
              <span className="flex items-center justify-between gap-3 font-medium text-[#3b526c]">{video.title[locale]}<ArrowUpRight size={15} className="shrink-0" aria-hidden="true" /></span>
              <span className="mt-1 block text-xs text-[#62748a]">{ui.externalVideo}</span>
            </a>)}
          </div>
        </ContentDisclosure>}
      </div>
    </section>
  );
}

export function ProductTechnologyDirectory({ locale }: { locale: Locale }) {
  const ui = technicalUi[locale];
  const parents: ProductSlug[] = ["jet-mill", "impact-mill", "jet-pulverizer", "air-classifier", "shaping-mill", "laboratory-equipment", "turnkey-epc"];
  return <section className="border-t border-[#dbe3ee] bg-[#f6f8fb]">
    <div className="container mx-auto px-6 py-6">
      <ContentDisclosure title={ui.directory} intro={ui.directoryIntro} id="process-directory">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {parents.map((parent) => <div key={parent}>
            <h3 className="mb-3 text-sm font-medium text-[#3b526c]">{productNames[locale][parent]}</h3>
            <ul className="space-y-2">{getProductTechnologies(locale, parent).filter((entry) => entry.slug !== "powder-terminology").map((entry) => <li key={entry.slug}><Link href={productTechnologyPath(entry.slug)} className="text-sm text-[#62748a] transition-colors hover:text-[#174a7c]">{entry.title}</Link></li>)}</ul>
          </div>)}
        </div>
        <Link href="/products/technologies" className="mt-6 inline-flex items-center gap-2 font-medium text-[#3b526c] hover:text-[#174a7c]">{ui.all}<ArrowRight size={14} /></Link>
      </ContentDisclosure>
    </div>
  </section>;
}
