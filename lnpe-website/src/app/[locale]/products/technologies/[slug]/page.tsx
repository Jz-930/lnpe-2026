import Link from "@/components/i18n/LocalizedLink";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContentDisclosure } from "@/components/content/ContentDisclosure";
import { technicalUi } from "@/components/products/ProductTechnicalContent";
import { PRODUCT_TECHNOLOGIES, getProductTechnology, getProductTechnologies, productTechnologyPath } from "@/content/product-technology";
import { productNames } from "@/i18n/messages/product-names";
import { createPageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/config";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return PRODUCT_TECHNOLOGIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const item = PRODUCT_TECHNOLOGIES.find((entry) => entry.slug === slug);
  if (!item) notFound();
  return createPageMetadata(locale, productTechnologyPath(slug), {
    zh: { title: `${item.title.zh} | LNPE`, description: item.summary.zh },
    en: { title: `${item.title.en} | LNPE`, description: item.summary.en },
  });
}

export default async function ProductTechnologyPage({ params }: Props) {
  const { locale, slug } = await params;
  const item = getProductTechnology(slug, locale);
  if (!item) notFound();
  const ui = technicalUi[locale];
  const related = getProductTechnologies(locale, item.parents[0]).filter((entry) => entry.slug !== slug).slice(0, 4);
  const publicSources = item.sources.flatMap((entry) => entry.url ? [entry.url] : []);
  return <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
    <div className="absolute inset-x-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" />
    <Navbar />
    <div className="flex-1">
      <header className="border-b border-[#dbe3ee] bg-[#eef3f8]">
        <div className="container mx-auto px-6 py-10 md:py-14">
          <Link href={`/products/${item.parents[0]}#technical-configurations`} className="mb-6 inline-flex items-center gap-2 text-sm text-[#536276] hover:text-[#174a7c]"><ChevronLeft size={15} />{productNames[locale][item.parents[0]]}</Link>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-[#62748a]">{ui.reference}</p>
          <h1 className="max-w-4xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{item.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#536276]">{item.summary}</p>
        </div>
      </header>
      <div className="container mx-auto grid gap-10 px-6 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0 max-w-4xl">
          <section>
            <h2 className="font-display text-xl font-semibold">{ui.principle}</h2>
            <p className="mt-4 text-sm leading-7 text-[#536276] md:text-base md:leading-8">{item.principle}</p>
          </section>
          <section className="mt-9">
            <h2 className="font-display text-xl font-semibold">{ui.process}</h2>
            <ol className="mt-5 space-y-4">{item.process.map((step, index) => <li key={step} className="flex gap-4 text-sm leading-7 text-[#536276]"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-[#cbd7e6] bg-white font-mono text-xs text-[#62748a]">{index + 1}</span><span>{step}</span></li>)}</ol>
          </section>
          <section className="mt-10" aria-label={ui.options}>
            <h2 className="mb-2 font-display text-xl font-semibold">{ui.options}</h2>
            {item.configurations.map((entry, index) => <ContentDisclosure key={entry.title} title={entry.title} id={`configuration-${index + 1}`}><p>{entry.body}</p></ContentDisclosure>)}
          </section>
          <section className="mt-10 border border-[#dbe3ee] bg-white p-5 md:p-6">
            <h2 className="text-base font-semibold text-[#3b526c]">{ui.selection}</h2>
            <p className="mt-3 text-sm leading-7 text-[#536276]">{item.selection}</p>
            <Link href={`/contact-us?equipment=${encodeURIComponent(slug)}&service=selection`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#174a7c] hover:underline">{ui.consult}<ArrowRight size={15} /></Link>
          </section>
          <section className="mt-8">
            <h2 className="text-base font-semibold text-[#3b526c]">{ui.verification}</h2>
            <p className="mt-3 text-sm leading-7 text-[#62748a]">{item.verification}</p>
          </section>
          {publicSources.length > 0 && <ContentDisclosure title={ui.sources} id="public-references" className="mt-6">
            <ul className="space-y-2">{publicSources.map((url, index) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#536276] hover:text-[#174a7c]">{ui.sourcePage} {publicSources.length > 1 ? index + 1 : ""}<ArrowUpRight size={14} /></a></li>)}</ul>
          </ContentDisclosure>}
        </article>
        <aside className="border-t border-[#dbe3ee] pt-6 text-sm lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          <h2 className="font-medium text-[#3b526c]">{ui.parent}</h2>
          <ul className="mt-3 space-y-3">{item.parents.map((parent) => <li key={parent}><Link href={`/products/${parent}`} className="leading-6 text-[#62748a] hover:text-[#174a7c]">{productNames[locale][parent]}</Link></li>)}</ul>
          {item.models && <div className="mt-8 border-t border-[#dbe3ee] pt-5"><h2 className="font-medium text-[#3b526c]">{ui.models}</h2><p className="mt-3 font-mono text-xs leading-6 text-[#62748a]">{item.models.join(" · ")}</p><p className="mt-2 text-xs leading-6 text-[#62748a]">{ui.modelNote}</p></div>}
          <div className="mt-8 border-t border-[#dbe3ee] pt-5"><h2 className="font-medium text-[#3b526c]">{ui.related}</h2><ul className="mt-3 space-y-3">{related.map((entry) => <li key={entry.slug}><Link href={productTechnologyPath(entry.slug)} className="leading-6 text-[#62748a] hover:text-[#174a7c]">{entry.title}</Link></li>)}</ul></div>
          <Link href="/products/technologies" className="mt-7 inline-flex items-center gap-2 text-[#3b526c] hover:text-[#174a7c]">{ui.all}<ArrowRight size={14} className="shrink-0" /></Link>
        </aside>
      </div>
    </div>
    <Footer />
  </main>;
}
