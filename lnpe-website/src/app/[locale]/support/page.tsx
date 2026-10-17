import type { Locale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { supportDetails } from "@/content/company";
import EditorialSections from "@/components/content/EditorialSections";
import ReferencePage from "@/components/content/ReferencePage";
import Link from "@/components/i18n/LocalizedLink";
import EditorialExplorer from "@/components/content/EditorialExplorer";

const copy = {
  zh: { title: "服务与支持", description: "从物料试验、设备选型到安装调试、维护与备件，按项目阶段组织技术支持。" },
  en: { title: "Service & support", description: "Technical support through material trials, equipment selection, commissioning, maintenance and spare parts, organised around each project stage." },
};
type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) { return createPageMetadata((await params).locale, "/support", copy); }
export default async function SupportPage({ params }: Props) {
  const { locale } = await params; const zh = locale === "zh";
  return <ReferencePage title={copy[locale].title} intro={copy[locale].description} eyebrow={zh ? "全周期工程服务" : "LIFECYCLE SERVICES"} back={{ href: "/contact-us", label: zh ? "联系流能" : "Contact LNPE" }}>
    <EditorialExplorer sections={supportDetails[locale]} scenes={["engineering", "training", "quality", "components", "production", "factory"]} locale={locale} label={zh ? "按项目阶段了解服务" : "Explore services by project stage"} />
    <div className="mb-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-lnpe-blue">
      {[["trial", zh ? "咨询来料试验" : "Discuss a material trial"], ["oem", zh ? "咨询OEM加工" : "Discuss OEM processing"], ["maintenance", zh ? "咨询维保与售后" : "Discuss maintenance & service"]].map(([service, label]) => <Link key={service} href={`/contact-us?service=${service}`} className="hover:underline">{label} →</Link>)}
    </div>
    <EditorialSections sections={supportDetails[locale]} />
    <p className="mt-8 text-sm text-lnpe-muted"><Link href="/resources" className="underline underline-offset-4">{zh ? "查看需求准备清单与常见问题" : "View enquiry checklists and frequently asked questions"}</Link></p>
  </ReferencePage>;
}
