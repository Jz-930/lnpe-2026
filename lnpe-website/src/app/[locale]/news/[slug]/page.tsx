import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "@/components/i18n/LocalizedLink";
import { ArrowLeft } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getNews, getNewsArticle, newsMessages } from "@/i18n/messages/news";
import { createPageMetadata } from "@/i18n/metadata";

type PageProps = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return getNews("en").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const en = getNewsArticle("en", slug);
  const zh = getNewsArticle("zh", slug);
  if (!en || !zh) notFound();
  return createPageMetadata(locale, `/news/${slug}`, {
    en: { title: en.title, description: en.desc },
    zh: { title: zh.title, description: zh.desc },
  });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = getNewsArticle(locale, slug);
  const t = newsMessages[locale];

  if (!article) notFound();

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
            </div>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-lnpe-dark md:text-5xl">
              {article.title}
            </h1>
          </div>
        </section>

        <article className="container mx-auto max-w-4xl px-6 py-14">
          {article.image && (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden border border-lnpe-border bg-lnpe-bg-light clip-chamfer">
              <Image src={article.image} alt={`${article.title} ${t.featuredImage}`} fill className="object-cover" priority />
            </div>
          )}

          <div className="border border-lnpe-border bg-lnpe-paper p-7 md:p-10 clip-chamfer">
            <div className="max-w-none space-y-6 text-lg leading-9 text-lnpe-muted">
              {t.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
