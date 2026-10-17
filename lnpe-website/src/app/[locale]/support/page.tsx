import type { Locale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { supportDetails } from "@/content/company";
import EditorialSections from "@/components/content/EditorialSections";
import ReferencePage from "@/components/content/ReferencePage";
import Link from "@/components/i18n/LocalizedLink";

const copy = {
  zh: { title: "服务与支持", description: "从物料试验、设备选型到安装调试、维护与备件，按项目阶段组织技术支持。" },
  en: { title: "Service & support", description: "Technical support through material trials, equipment selection, commissioning, maintenance and spare parts, organised around each project stage." },
};
type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) { return createPageMetadata((await params).locale, "/support", copy); }
export default async function SupportPage({ params }: Props) {
  const { locale } = await params; const zh = locale === "zh";
  return <ReferencePage title={copy[locale].title} intro={copy[locale].description} eyebrow={zh ? "全周期工程服务" : "LIFECYCLE SERVICES"} back={{ href: "/contact-us", label: zh ? "联系流能" : "Contact LNPE" }}>
    <div className="mb-10 grid gap-3 sm:grid-cols-3">
      {[["trial", zh ? "来料试验" : "Material trial"], ["oem", zh ? "OEM加工" : "OEM processing"], ["maintenance", zh ? "维保与售后" : "Maintenance & service"]].map(([service, label]) => <Link key={service} href={`/contact-us?service=${service}`} className="border border-lnpe-border px-5 py-4 text-sm text-lnpe-muted transition-colors hover:border-lnpe-blue hover:text-lnpe-blue">{label} →</Link>)}
    </div>
    <EditorialSections sections={supportDetails[locale]} />
    <p className="mt-8 text-sm text-lnpe-muted"><Link href="/resources" className="underline underline-offset-4">{zh ? "查看需求准备清单与常见问题" : "View enquiry checklists and frequently asked questions"}</Link></p>
  </ReferencePage>;
}
