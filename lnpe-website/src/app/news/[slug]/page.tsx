import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const NEWS_DATA: Record<string, { title: string; date: string; content?: string; image?: string }> = {
  "lnpe-participated-in-the-advanced-ceramics-exhibition-and-concluded-successfully": { 
    title: "LNPE participated in the Advanced Ceramics Exhibition and concluded successfully", 
    date: "6/1/2025",
    image: "/images/07_news/news_01_lnpe-participated-in-the-advanced-ceramics-exhibition-and-concluded-successfully/news_01_cover.jpg"
  },
  "lnpe-appeared-at-the-interbattery-2025-in-seoul-south-korea": { 
    title: "LNPE appeared at the INTERBATTERY 2025 in Seoul, South Korea", 
    date: "3/8/2025",
    image: "/images/07_news/news_02_lnpe-appeared-at-the-interbattery-2025-in-seoul-south-korea/news_02_cover.png"
  },
  "lnpe-embarks-on-a-new-journey-see-you-in-seoul": { 
    title: "LNPE embarks on a new journey, see you in Seoul!", 
    date: "2/8/2025",
    image: "/images/07_news/news_03_lnpe-embarks-on-a-new-journey-see-you-in-seoul/news_03_cover.png"
  },
  "lnpe-and-new-district-map-out-the-2025-development-blueprint": { 
    title: "LNPE and New District map out the 2025 development blueprint", 
    date: "1/25/2025",
    image: "/images/07_news/news_04_lnpe-and-new-district-map-out-the-2025-development-blueprint/news_04_cover.png"
  },
  "lnpe-debuts-at-north-american-battery-show": { 
    title: "LNPE debuts at North American Battery Show", 
    date: "10/12/2024",
    image: "/images/07_news/news_05_lnpe-debuts-at-north-american-battery-show/news_05_cover.png"
  }
};

export function generateStaticParams() {
  return Object.keys(NEWS_DATA).map((slug) => ({ slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = NEWS_DATA[slug];

  if (!article) notFound();

  return (
    <main className="min-h-screen flex flex-col pt-[88px] bg-lnpe-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
      <Navbar />

      <div className="flex-1 container mx-auto px-6 py-24 relative z-10 max-w-4xl">
        <Link 
          href="/news" 
          className="inline-flex items-center gap-2 text-lnpe-text hover:text-white font-mono text-sm tracking-widest uppercase mb-12 transition-colors group"
        >
          <ArrowLeft size={16} className="transform transition-transform group-hover:-translate-x-1" />
          Back to News
        </Link>
        
        <article className="border border-lnpe-border bg-lnpe-surface backdrop-blur-md clip-chamfer p-8 md:p-16">
          <div className="font-mono text-lnpe-kinetic tracking-widest text-sm mb-6 border-l border-lnpe-kinetic pl-4">
            PRESS RELEASE // {article.date}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight mb-12">
            {article.title}
          </h1>
          
          {article.image && (
            <div className="relative w-full aspect-[16/9] mb-12 border border-lnpe-border bg-lnpe-bg-light clip-chamfer overflow-hidden">
              <Image 
                src={article.image}
                alt={`${article.title} featured image`}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none text-lnpe-text leading-relaxed">
            <p>
              To stay informed about the latest industry developments and technological advancements related to LNPE, you can visit their official news section, which offers updates on company activities, industry trends, and powder processing technologies.
            </p>
            <p>
             Full article contents are provided via our primary CRM systems.
            </p>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
