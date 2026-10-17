import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import InteractiveImage from "@/components/content/InteractiveImage";
import Link from "@/components/i18n/LocalizedLink";
import { ArrowLeft } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getNews, getNewsArticle, newsMessages } from "@/i18n/messages/news";
import { createPageMetadata } from "@/i18n/metadata";
import { ContentDisclosure } from "@/components/content/ContentDisclosure";
import { productCopy, type ProductSlug } from "@/i18n/messages/catalog";

type PageProps = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return getNews("en").flatMap(({ slug, aliases }) => [slug, ...(aliases ?? [])].map((value) => ({ slug: value })));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const en = getNewsArticle("en", slug);
  const zh = getNewsArticle("zh", slug);
  if (!en || !zh) notFound();
  return createPageMetadata(locale, `/news/${en.slug}`, {
    en: { title: en.title, description: en.desc },
    zh: { title: zh.title, description: zh.desc },
  });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = getNewsArticle(locale, slug);
  const t = newsMessages[locale];

  if (!article) notFound();
  const media = [...(article.image ? [{ src: article.image, alt: article.title, caption: article.title }] : []), ...article.gallery.map((src, index) => ({ src, alt: `${article.title} · ${index + 1}`, caption: article.title }))];

  return (
    <main className="min-h-screen flex flex-col pt-[88px] bg-lnpe-bg text-lnpe-text">
      <Navbar />

      <div className="flex-1">
        <section className="border-b border-lnpe-border bg-lnpe-bg-light">
          <div className="container mx-auto max-w-4xl px-6 py-12">
            <Link
              href="/news"
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-lnpe-blue transition-colors hover:text-lnpe-kinetic"
            >
              <ArrowLeft size={16} />
              {t.back}
            </Link>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="bg-lnpe-kinetic/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-lnpe-kinetic">{article.tag}</span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-lnpe-steel">{article.date}</span>
              <span className="text-xs text-lnpe-muted">{article.brief ? t.brief : t.historical}</span>
            </div>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-lnpe-dark md:text-5xl">
              {article.title}
            </h1>
            {article.eventPeriod && <p className="mt-5 text-sm text-lnpe-muted">{t.eventDate}: {article.eventPeriod}</p>}
          </div>
        </section>

        <article className="container mx-auto max-w-4xl px-6 py-14">
          {article.image && (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden border border-lnpe-border bg-lnpe-bg-light clip-chamfer">
              <InteractiveImage images={media} src={article.image} alt={`${article.title} ${t.featuredImage}`} fill sizes="(min-width: 1024px) 900px, 90vw" className="object-cover" priority />
            </div>
          )}

          <div className="border border-lnpe-border bg-lnpe-paper p-7 md:p-10 clip-chamfer">
            <div className="max-w-none space-y-6 text-base leading-8 text-lnpe-muted">
              {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          {article.gallery.length > 0 && <ContentDisclosure title={t.gallery} id="photographs" className="mt-8">
            <div className="grid gap-5 sm:grid-cols-2">{article.gallery.map((image, index) => <div key={image} className="relative aspect-[4/3] overflow-hidden border border-lnpe-border bg-white"><InteractiveImage images={media} initialIndex={index + (article.image ? 1 : 0)} src={image} alt={`${article.title} · ${index + 1}`} fill sizes="(min-width: 640px) 40vw, 90vw" className="object-contain" /></div>)}</div>
          </ContentDisclosure>}
          {article.related && <div className="mt-8 border-t border-lnpe-border pt-5 text-sm text-lnpe-muted"><p className="mb-3">{t.related}</p><div className="flex flex-wrap gap-x-5 gap-y-3">{article.related.map((slug) => <Link className="text-lnpe-blue hover:underline" key={slug} href={`/products/${slug}`}>{productCopy[locale][slug as ProductSlug]?.title ?? (slug === "technologies/steam-jet-mill" ? (locale === "zh" ? "蒸汽动能磨" : "Steam jet mill") : slug === "technologies/graphite-production-line" ? (locale === "zh" ? "石墨粉碎整形产线" : "Graphite processing line") : slug)}</Link>)}</div></div>}
          {article.sources.length > 0 && <ContentDisclosure title={t.sources} className="mt-6"><div className="flex flex-wrap gap-5">{article.sources.map((source, i) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="text-xs text-lnpe-blue underline underline-offset-4">{source.label} {article.sources.length > 1 ? i + 1 : ""}</a>)}</div></ContentDisclosure>}
        </article>
      </div>

      <Footer />
    </main>
  );
}
