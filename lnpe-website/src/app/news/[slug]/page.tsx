import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NEWS_DATA: Record<string, { title: string; date: string; tag: string; image?: string }> = {
  "lnpe-participated-in-the-advanced-ceramics-exhibition-and-concluded-successfully": {
    title: "LNPE participated in the Advanced Ceramics Exhibition and concluded successfully",
    date: "6/1/2025",
    tag: "Application",
    image: "/images/07_news/news_01_lnpe-participated-in-the-advanced-ceramics-exhibition-and-concluded-successfully/news_01_cover.jpg",
  },
  "lnpe-appeared-at-the-interbattery-2025-in-seoul-south-korea": {
    title: "LNPE appeared at the INTERBATTERY 2025 in Seoul, South Korea",
    date: "3/8/2025",
    tag: "Technology",
    image: "/images/07_news/news_02_lnpe-appeared-at-the-interbattery-2025-in-seoul-south-korea/news_02_cover.png",
  },
  "lnpe-embarks-on-a-new-journey-see-you-in-seoul": {
    title: "LNPE embarks on a new journey, see you in Seoul!",
    date: "2/8/2025",
    tag: "Company",
    image: "/images/07_news/news_03_lnpe-embarks-on-a-new-journey-see-you-in-seoul/news_03_cover.png",
  },
  "lnpe-and-new-district-map-out-the-2025-development-blueprint": {
    title: "LNPE and New District map out the 2025 development blueprint",
    date: "1/25/2025",
    tag: "Company",
    image: "/images/07_news/news_04_lnpe-and-new-district-map-out-the-2025-development-blueprint/news_04_cover.png",
  },
  "lnpe-debuts-at-north-american-battery-show": {
    title: "LNPE debuts at North American Battery Show",
    date: "10/12/2024",
    tag: "Project",
    image: "/images/07_news/news_05_lnpe-debuts-at-north-american-battery-show/news_05_cover.png",
  },
};

export function generateStaticParams() {
  return Object.keys(NEWS_DATA).map((slug) => ({ slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = NEWS_DATA[slug];

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
              Back to News
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
              <Image src={article.image} alt={`${article.title} featured image`} fill className="object-cover" priority />
            </div>
          )}

          <div className="border border-lnpe-border bg-lnpe-paper p-7 md:p-10 clip-chamfer">
            <div className="max-w-none space-y-6 text-lg leading-9 text-lnpe-muted">
              <p>
                To stay informed about the latest industry developments and technological advancements related to
                LNPE, you can visit the official news section, which offers updates on company activities, industry
                trends and powder processing technologies.
              </p>
              <p>
                Full article contents are provided via LNPE primary content and customer relationship systems.
              </p>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
