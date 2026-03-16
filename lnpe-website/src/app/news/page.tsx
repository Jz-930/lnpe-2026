import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChamferCard } from "@/components/ui/ChamferCard";
import Image from "next/image";
import Link from "next/link";

const NEWS_DATA = [
  {
    title: "LNPE participated in the Advanced Ceramics Exhibition and concluded successfully",
    date: "6/1/2025",
    slug: "lnpe-participated-in-the-advanced-ceramics-exhibition-and-concluded-successfully",
    desc: "LNPE made a wonderful appearance at the 17th China International Advanced Ceramics Exhibition (IACE CHINA 2025).",
    image: "/images/07_news/news_01_lnpe-participated-in-the-advanced-ceramics-exhibition-and-concluded-successfully/news_01_cover.jpg"
  },
  {
    title: "LNPE appeared at the INTERBATTERY 2025 in Seoul, South Korea",
    date: "3/8/2025",
    slug: "lnpe-appeared-at-the-interbattery-2025-in-seoul-south-korea",
    desc: "At Seoul’s 13th InterBattery expo, LNPE’s display of high-efficiency, eco-friendly powder equipment for lithium-battery production drew strong visitor interest.",
    image: "/images/07_news/news_02_lnpe-appeared-at-the-interbattery-2025-in-seoul-south-korea/news_02_cover.png"
  },
  {
    title: "LNPE embarks on a new journey, see you in Seoul!",
    date: "2/8/2025",
    slug: "lnpe-embarks-on-a-new-journey-see-you-in-seoul",
    desc: "LNPE welcomes global partners to explore its latest powder-technology innovations at the 2025 Seoul Battery Show this spring.",
    image: "/images/07_news/news_03_lnpe-embarks-on-a-new-journey-see-you-in-seoul/news_03_cover.png"
  },
  {
    title: "LNPE and New District map out the 2025 development blueprint",
    date: "1/25/2025",
    slug: "lnpe-and-new-district-map-out-the-2025-development-blueprint",
    desc: "The Mianyang Science and Technology City New District held a grand conference on economic work and made comprehensive arrangements for 2025.",
    image: "/images/07_news/news_04_lnpe-and-new-district-map-out-the-2025-development-blueprint/news_04_cover.png"
  },
  {
    title: "LNPE debuts at North American Battery Show",
    date: "10/12/2024",
    slug: "lnpe-debuts-at-north-american-battery-show",
    desc: "LNPE recently made a splendid appearance at the 2024 North American Battery Show held at the Huntington Square Convention Center in Detroit.",
    image: "/images/07_news/news_05_lnpe-debuts-at-north-american-battery-show/news_05_cover.png"
  }
];

export default function NewsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px] relative bg-lnpe-bg">
      <Navbar />

      <div className="flex-1 pb-24">
        <section className="py-20 border-b border-lnpe-border bg-lnpe-bg/80 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none z-[-1]" />
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-8">
              News & Events<span className="text-lnpe-kinetic">.</span>
            </h1>
            <p className="text-lnpe-text text-lg max-w-3xl leading-relaxed border-l-2 border-lnpe-text pl-6">
              Stay informed about the latest industry developments and technological advancements related to LNPE, covering company activities, industry trends, and powder processing technologies.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="space-y-8">
              {NEWS_DATA.map((article) => (
                <Link key={article.slug} href={`/news/${article.slug}`} className="block group">
                  <ChamferCard variant="br" className="p-8 transition-colors group-hover:bg-lnpe-bg-light relative overflow-hidden">
                    {article.image && (
                      <div className="absolute top-0 right-0 w-1/3 h-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0">
                        <Image 
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover object-center mix-blend-screen mask-image-linear-gradient"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-lnpe-bg to-transparent" />
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between relative z-10">
                      <div className="flex-1">
                        <div className="font-mono text-xs text-lnpe-text mb-3 uppercase tracking-widest group-hover:text-lnpe-kinetic transition-colors">
                          RELEASED // {article.date}
                        </div>
                        <h2 className="text-2xl font-display font-bold text-white leading-snug mb-3 uppercase tracking-wide group-hover:text-lnpe-kinetic transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-lnpe-text text-sm leading-relaxed max-w-2xl">
                          {article.desc}
                        </p>
                      </div>
                      <div className="hidden md:flex font-mono text-xs text-white uppercase tracking-wider py-2 px-4 border border-lnpe-border rounded-full group-hover:border-lnpe-kinetic transition-colors whitespace-nowrap">
                        Read Story
                      </div>
                    </div>
                  </ChamferCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
