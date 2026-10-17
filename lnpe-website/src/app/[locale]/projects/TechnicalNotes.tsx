import Link from "@/components/i18n/LocalizedLink";
import { ContentDisclosure } from "@/components/content/ContentDisclosure";
import type { Locale } from "@/i18n/config";
import { projectDetailLabels, technicalNotes } from "@/content/projects";
import { getNewsArticle } from "@/i18n/messages/news";

export function TechnicalNotes({ locale }: { locale: Locale }) {
  const t = projectDetailLabels[locale];
  const historic = ["natural-graphite-shaping-line-2018", "industrial-waste-heat-steam-milling-2018", "lfp-integrated-grinding-drying-2023"].map((slug) => getNewsArticle(locale, slug));
  return <section className="container mx-auto px-6 pb-14">
    <ContentDisclosure title={`${t.technical} · ${technicalNotes.length} ${t.records}`} intro={t.technicalIntro} id="technical-notes">
      <div className="grid gap-x-10 md:grid-cols-2">
        {technicalNotes.map((note) => {
          const text = note.copy[locale];
          return <ContentDisclosure key={note.id} title={text.title} id={`technical-${note.id.toLowerCase()}`}>
            <p>{text.body}</p><p className="mt-3">{text.evaluation}</p>
            <Link href={`/products/${note.product}`} className="mt-3 inline-block text-xs text-lnpe-blue hover:underline">{t.product} →</Link>
          </ContentDisclosure>;
        })}
      </div>
      <div className="mt-8 border-t border-lnpe-border pt-5"><p className="mb-3 text-xs font-medium">{t.archive}</p><div className="space-y-3">{historic.map((article) => article && <Link className="block text-sm text-lnpe-blue hover:underline" key={article.slug} href={`/news/${article.slug}`}>{article.date} · {article.title}</Link>)}</div></div>
    </ContentDisclosure>
  </section>;
}
