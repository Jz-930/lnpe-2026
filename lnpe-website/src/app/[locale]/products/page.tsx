import InteractiveImage from "@/components/content/InteractiveImage";
import Link from "@/components/i18n/LocalizedLink";
import { ArrowRight, Factory, Gauge, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductsCatalogClient } from "./ProductsCatalogClient";
import { ProductTechnologyDirectory } from "@/components/products/ProductTechnicalContent";
import { getProductCatalog, getProductCoverImage } from "./product-catalog";
import type { Locale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { catalogUi, formatCatalogMessage } from "@/i18n/messages/catalog";

type ProductsPageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: ProductsPageProps) {
  const { locale } = await params;
  return createPageMetadata(locale, "/products", {
    en: { title: catalogUi.en.productsTitle + " | LNPE", description: catalogUi.en.productsIntro },
    zh: { title: catalogUi.zh.productsTitle + " | LNPE", description: catalogUi.zh.productsIntro },
  });
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const ui = catalogUi[locale];
  const products = getProductCatalog(locale);
  const featuredProduct = products[3];

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
      <div className="absolute left-0 right-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" />
      <Navbar />

      <div className="flex flex-1 flex-col">
        <section className="relative overflow-hidden border-b border-[#dbe3ee] bg-[#eef3f8]">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.055)_1px,transparent_1px)] bg-[size:44px_44px]"
            aria-hidden="true"
          />
          <div className="container relative mx-auto grid gap-10 px-6 py-14 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="min-w-0 max-w-3xl">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-[#142033] md:text-6xl">
                {ui.productsTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#536276] md:text-lg md:leading-8">
                {ui.productsIntro}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#142033] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#f26522]"
                >
                  {ui.requestSolution}
                  <ArrowRight size={17} />
                </Link>
                <Link
                  href="/applications"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-[#cbd7e6] bg-white px-5 py-3 text-sm font-semibold text-[#142033] transition-colors hover:border-[#174a7c] hover:text-[#174a7c]"
                >
                  {ui.viewApplications}
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Factory, label: ui.productCapability1 },
                  { icon: ShieldCheck, label: ui.productCapability2 },
                  { icon: Gauge, label: ui.productCapability3 },
                ].map((item) => (
                  <div key={item.label} className="border border-[#dbe3ee] bg-white/80 p-4">
                    <item.icon className="mb-3 text-[#174a7c]" size={20} />
                    <p className="text-sm font-semibold leading-5 text-[#314155]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-10 bottom-0 h-12 bg-[#c8d6e6] blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
                <div className="flex items-center justify-between border-b border-[#e5eaf2] px-5 py-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f26522]">{ui.featuredSystem}</p>
                    <p className="font-display text-xl font-semibold text-[#142033]">{featuredProduct.title}</p>
                  </div>
                  <span className="border border-[#dbe3ee] px-3 py-1 text-xs font-semibold text-[#536276]">
                    {products.length} {ui.systems}
                  </span>
                </div>
                <div className="relative aspect-[16/11] bg-gradient-to-br from-[#f8fafc] via-[#edf3f9] to-[#e6edf5]">
                  <InteractiveImage
                    src={getProductCoverImage(featuredProduct)}
                    alt={formatCatalogMessage(ui.coverAlt, { title: featuredProduct.title })}
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-contain p-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductsCatalogClient />
        <ProductTechnologyDirectory locale={locale} />
      </div>

      <Footer />
    </main>
  );
}
