import type { Locale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import ReferencePage from "@/components/content/ReferencePage";
import ContentDisclosure from "@/components/content/ContentDisclosure";
import Link from "@/components/i18n/LocalizedLink";
import { resourceFaq, resourceVideos } from "@/content/resources";

const copy = {
  zh: { title: "资料与常见问题", description: "查阅材料、工艺与服务说明，准备试验或设备咨询所需的信息。" },
  en: { title: "Resources & frequently asked questions", description: "Explore material, process and service references, and prepare the information needed for a trial or equipment enquiry." },
};
type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) { return createPageMetadata((await params).locale, "/resources", copy); }
export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params; const zh = locale === "zh";
  const entries = zh ? [["材料与加工", "/applications/materials", "按材料名称查阅用途、工艺考虑与试验准备。"], ["设备与配套", "/products", "7类设备及工艺、输送、收集和包装配置。"], ["实验与检测", "/research", "检测能力、来料试验与放大流程。"], ["服务与OEM", "/support", "安装、维护、备件和粉体代加工。"]] : [["Materials & processing", "/applications/materials", "Find material uses, process considerations and trial preparation."], ["Equipment & systems", "/products", "Seven equipment families, process configurations and auxiliary systems."], ["Trials & analysis", "/research", "Analytical capabilities, material trials and scale-up."], ["Services & OEM", "/support", "Installation, maintenance, spare parts and powder processing."]];
  return <ReferencePage title={copy[locale].title} intro={copy[locale].description} eyebrow={zh ? "技术资料" : "TECHNICAL REFERENCES"} back={{ href: "/products", label: zh ? "产品中心" : "Products" }}>
    <div className="mb-10 grid gap-5 sm:grid-cols-2">{entries.map(([title, href, text]) => <Link key={href} href={href} className="border border-lnpe-border bg-lnpe-paper p-6 transition-colors hover:border-lnpe-blue"><h2 className="text-base font-medium text-lnpe-dark">{title} →</h2><p className="mt-3 text-sm leading-7 text-lnpe-muted">{text}</p></Link>)}</div>
    <ContentDisclosure id="checklists" title={zh ? "需求清单与技术资料申请" : "Enquiry checklists and document requests"}>
      <p className="mb-5">{zh ? "可下载空白需求清单，填写后与工程人员交流。具体型号参数、操作手册与证书按设备版本提供。" : "Download a blank enquiry checklist for discussion with the engineering team. Model data, manuals and certificates are supplied for the relevant equipment version."}</p>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <a href={`/downloads/lnpe-enquiry-${locale}.txt`} download className="text-lnpe-blue underline underline-offset-4">{zh ? "下载设备与试验需求清单（TXT）" : "Download equipment & trial checklist (TXT)"}</a>
        <Link href="/contact-us?service=documents" className="text-lnpe-blue">{zh ? "申请设备资料 →" : "Request equipment documents →"}</Link>
      </div>
    </ContentDisclosure>
    <ContentDisclosure id="videos" title={zh ? "原理与设备视频 · 16项历史资料" : "Principle and equipment videos · 16 historical references"} intro={zh ? "以下链接前往LNPE海外网站的公开视频页。历史型号与展示配置供了解技术使用，具体供货方案在选型时确认。" : "These links open public video pages on LNPE's overseas website. Historical models and configurations illustrate the technology; current supply is confirmed during selection."}>
      <ul className="grid gap-x-8 sm:grid-cols-2">{resourceVideos.map(video => <li key={video.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-lnpe-border py-3"><a href={`https://www.lnpepowder.com/video/${video.id}.html`} target="_blank" rel="noopener noreferrer" className="hover:text-lnpe-blue">{video[locale]} ↗</a><Link href={video.group ? `/products/${video.group}` : "/about"} className="text-xs text-lnpe-blue">{zh ? "相关说明" : "Read more"}</Link></li>)}</ul>
    </ContentDisclosure>
    <h2 id="faq" className="mb-3 mt-12 text-lg font-medium text-lnpe-dark">{zh ? "常见问题" : "Frequently asked questions"}</h2>
    {resourceFaq[locale].map(([title, answer], index) => <ContentDisclosure key={title} id={`faq-${index + 1}`} title={title}><p className="max-w-4xl">{answer}</p></ContentDisclosure>)}
    <p className="mt-8 text-sm text-lnpe-muted"><Link href="/news" className="underline underline-offset-4">{zh ? "查阅公司新闻与历史动态" : "Browse company news and historical updates"}</Link></p>
  </ReferencePage>;
}
