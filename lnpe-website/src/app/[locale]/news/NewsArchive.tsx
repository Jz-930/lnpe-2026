"use client";
import { useState } from "react";
import Link from "@/components/i18n/LocalizedLink";
import { ContentDisclosure } from "@/components/content/ContentDisclosure";
import type { Locale } from "@/i18n/config";
import { newsMessages, newsTags } from "@/i18n/messages/news";
import type { NewsTag } from "@/content/news";
import touchStyles from "@/components/applications/TouchCatalog.module.css";

type ArchiveArticle = { slug: string; title: string; desc: string; date: string; tag: string; tagId: NewsTag; brief?: boolean };
export function NewsArchive({ locale, articles }: { locale: Locale; articles: ArchiveArticle[] }) {
  const t = newsMessages[locale];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const filtered = [...articles].sort((a, b) => b.date.localeCompare(a.date)).filter((article) =>
    (category === "all" || article.tagId === category) && `${article.title} ${article.desc} ${article.date}`.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()));
  return (
    <ContentDisclosure id="archive" title={`${t.archive} · ${articles.length} ${t.count}`} intro={t.archiveIntro}>
      <div className={`${touchStyles.fields} mb-5 grid gap-3 sm:grid-cols-[1fr_220px]`}>
        <label className="min-w-0"><span className="sr-only max-lg:not-sr-only max-lg:mb-2 max-lg:block max-lg:text-xs max-lg:font-semibold">{t.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.searchPlaceholder} type="search" enterKeyHint="search" autoComplete="off" className="w-full border border-lnpe-border bg-white px-3 py-2 text-sm outline-offset-4 focus-visible:outline-lnpe-blue" /></label>
        <label className="min-w-0"><span className="sr-only max-lg:not-sr-only max-lg:mb-2 max-lg:block max-lg:text-xs max-lg:font-semibold">{locale === "zh" ? "内容分类" : "Category"}</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full border border-lnpe-border bg-white px-3 py-2 text-sm"><option value="all">{t.all}</option>{Object.entries(newsTags[locale]).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      </div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs" role="status" aria-atomic="true">{filtered.length} {t.count}</p>
        {(query || category !== "all") && <button type="button" onClick={() => { setQuery(""); setCategory("all"); }} className="min-h-11 px-1 text-xs font-semibold text-lnpe-blue underline underline-offset-4 lg:hidden">{locale === "zh" ? "重置筛选" : "Reset filters"}</button>}
      </div>
      <div className={`${touchStyles.newsList} max-h-[38rem] overflow-y-auto overscroll-contain pr-3`} tabIndex={0} aria-label={t.archive}>
        {filtered.length === 0 && <p className="py-8">{t.noResults}</p>}
        {filtered.map((article) => <Link key={article.slug} href={`/news/${article.slug}`} className="group block border-t border-lnpe-border py-4 hover:text-lnpe-blue">
          <div className="mb-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-lnpe-muted"><time dateTime={article.date}>{article.date}</time><span>{article.tag}</span>{article.brief && <span>{t.brief}</span>}</div>
          <h2 className="text-sm font-semibold text-lnpe-steel group-hover:text-lnpe-blue">{article.title}</h2>
          <p className="mt-1 text-xs leading-6 text-lnpe-muted">{article.desc}</p>
        </Link>)}
      </div>
    </ContentDisclosure>
  );
}
