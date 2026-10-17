import Link from "@/components/i18n/LocalizedLink";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContentDisclosure } from "@/components/content/ContentDisclosure";
import { technicalUi } from "@/components/products/ProductTechnicalContent";
import TechnologyPreview from "@/components/products/TechnologyPreview";
import { getProductTechnologies, productTechnologyPath } from "@/content/product-technology";
import { productNames } from "@/i18n/messages/product-names";
import { createPageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/config";
import type { ProductSlug } from "@/i18n/messages/catalog";

type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, "/products/technologies", {
    zh: { title: `${technicalUi.zh.directory} | LNPE`, description: technicalUi.zh.directoryIntro },
    en: { title: `${technicalUi.en.directory} | LNPE`, description: technicalUi.en.directoryIntro },
  });
}

export default async function TechnologiesPage({ params }: Props) {
  const { locale } = await params;
  const ui = technicalUi[locale];
  const parents: ProductSlug[] = ["jet-mill", "impact-mill", "jet-pulverizer", "air-classifier", "shaping-mill", "laboratory-equipment", "turnkey-epc"];
  return <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
    <div className="absolute inset-x-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" /><Navbar />
    <div className="container mx-auto flex-1 px-6 py-10 md:py-14">
      <Link href="/products" className="mb-6 inline-flex items-center gap-2 text-sm text-[#536276] hover:text-[#174a7c]"><ChevronLeft size={15} />{ui.back}</Link>
      <h1 className="max-w-4xl font-display text-3xl font-semibold tracking-tight md:text-4xl">{ui.directory}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-[#62748a]">{ui.directoryIntro}</p>
      <div className="mt-8 max-w-5xl">{parents.map((parent) => <ContentDisclosure key={parent} title={productNames[locale][parent]} id={parent}>
        <div className="grid gap-4 md:grid-cols-2">{getProductTechnologies(locale, parent).filter((entry) => entry.slug !== "powder-terminology").map((entry) => <TechnologyPreview key={entry.slug} entry={entry} locale={locale} />)}</div>
      </ContentDisclosure>)}</div>
      <Link href={productTechnologyPath("powder-terminology")} className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#3b526c] hover:text-[#174a7c]">{ui.terms}<ArrowRight size={15} /></Link>
    </div><Footer />
  </main>;
}
