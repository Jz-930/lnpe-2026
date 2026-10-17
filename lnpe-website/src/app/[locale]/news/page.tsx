import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "@/components/i18n/LocalizedLink";
import { ArrowRight } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getNews, newsMessages, newsTags } from "@/i18n/messages/news";
import { createPageMetadata } from "@/i18n/metadata";
import { NewsArchive } from "./NewsArchive";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createPageMetadata(locale, "/news", {
    en: { title: "News & Events", description: newsMessages.en.intro },
    zh: { title: "新闻与活动", description: newsMessages.zh.intro },
  });
}

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = newsMessages[locale];
  const allNews = getNews(locale);
  const news = allNews.filter((article) => article.featured);
  const tags = Object.values(newsTags[locale]);

  const featured = news[0];
  const articles = news.slice(1);

  return (
    <main className="min-h-screen flex flex-col pt-[88px] bg-lnpe-bg text-lnpe-text">
      <Navbar />

      <div className="flex-1 pb-20">
        <section className="relative overflow-hidden border-b border-lnpe-border bg-lnpe-bg-light">
          <div className="absolute inset-0 bg-technical-grid opacity-70" />
          <div className="container relative mx-auto max-w-6xl px-6 py-[72px]">
            <p className="spec-label mb-5">{t.eyebrow}</p>
            <h1 className="max-w-4xl font-display text-4xl font-bold uppercase leading-[1.04] tracking-tight text-lnpe-dark md:text-6xl">
              {t.title}
            </h1>
            <p className="mt-6 max-w-3xl border-l-2 border-lnpe-kinetic pl-5 text-lg leading-8 text-lnpe-muted">
              {t.intro}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="border border-lnpe-border bg-lnpe-paper px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-lnpe-steel">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <Link href={`/news/${featured.slug}`} className="group grid grid-cols-1 border border-lnpe-border bg-lnpe-paper transition-colors hover:border-lnpe-kinetic lg:grid-cols-[1.05fr_0.95fr] clip-chamfer">
              <div className="relative min-h-[280px] bg-lnpe-bg-light lg:min-h-[420px]">
                <Image src={featured.image} alt={featured.title} fill className="object-cover" priority />
              </div>
              <div className="flex flex-col justify-between p-7 md:p-10">
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="bg-lnpe-kinetic/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-lnpe-kinetic">{featured.tag}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-lnpe-steel">{featured.date}</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-lnpe-dark md:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-base leading-7 text-lnpe-muted">{featured.desc}</p>
                </div>
                <div className="mt-10 inline-flex items-center gap-2 font-semibold uppercase tracking-[0.12em] text-lnpe-blue transition-colors group-hover:text-lnpe-kinetic">
                  {t.read} <ArrowRight size={17} />
                </div>
              </div>
            </Link>

            <div className="mt-8 grid grid-cols-1 gap-5">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="group grid grid-cols-1 border border-lnpe-border bg-lnpe-paper transition-colors hover:border-lnpe-kinetic md:grid-cols-[220px_1fr_auto] clip-chamfer"
                >
                  <div className="relative min-h-[180px] bg-lnpe-bg-light md:min-h-0">
                    <Image src={article.image} alt={article.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-lnpe-kinetic">{article.tag}</span>
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-lnpe-steel">{article.date}</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold uppercase leading-snug tracking-tight text-lnpe-dark transition-colors group-hover:text-lnpe-blue">
                      {article.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-lnpe-muted">{article.desc}</p>
                  </div>
                  <div className="hidden items-center border-l border-lnpe-border px-6 text-lnpe-steel transition-colors group-hover:text-lnpe-kinetic md:flex">
                    <ArrowRight size={20} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <div className="container mx-auto max-w-6xl px-6">
          <NewsArchive locale={locale} articles={allNews.filter((article) => !article.featured).map(({ slug, title, desc, date, tag, tagId, brief }) => ({ slug, title, desc, date, tag, tagId, brief }))} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
