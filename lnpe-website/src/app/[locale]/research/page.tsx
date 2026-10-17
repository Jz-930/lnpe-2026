import type { Locale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { researchDetails } from "@/content/company";
import EditorialSections from "@/components/content/EditorialSections";
import ReferencePage from "@/components/content/ReferencePage";
import Link from "@/components/i18n/LocalizedLink";

const copy = {
  zh: { title: "研究与实验中心", description: "从气固两相流研究、设备模拟到粒度与形貌检测，以来料试验连接加工目标与设备方案。" },
  en: { title: "Research & testing", description: "Gas–solid flow research, equipment simulation and particle analysis connect material trials with process and equipment decisions." },
};
type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) { return createPageMetadata((await params).locale, "/research", copy); }
export default async function ResearchPage({ params }: Props) {
  const { locale } = await params; const zh = locale === "zh";
  return <ReferencePage title={copy[locale].title} intro={copy[locale].description} eyebrow={zh ? "研发与验证" : "RESEARCH & VALIDATION"} back={{ href: "/about", label: zh ? "关于流能" : "About LNPE" }}>
    <div className="mb-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-lnpe-blue">
      <Link href="/contact-us?service=trial">{zh ? "预约来料试验 →" : "Arrange a material trial →"}</Link>
      <Link href="/products/laboratory-equipment">{zh ? "实验室设备 →" : "Laboratory equipment →"}</Link>
      <Link href="/applications">{zh ? "查阅材料与工艺 →" : "Explore materials and processes →"}</Link>
    </div>
    <EditorialSections sections={researchDetails[locale]} />
  </ReferencePage>;
}
