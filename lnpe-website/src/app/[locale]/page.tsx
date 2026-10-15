import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductBentoBox } from "@/components/home/ProductBentoBox";
import { FactoryCapability } from "@/components/home/FactoryCapability";
import { ProcessFlow } from "@/components/home/ProcessFlow";
import { ResearchForm } from "@/components/home/ResearchForm";
import { createPageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  return createPageMetadata((await params).locale, '/', {
    en: { title: 'LNPE | Advanced Powder Technology', description: 'A globally recognized powder equipment expert, specializing in grinding, conveying, and particle modification.' },
    zh: { title: 'LNPE | 先进粉体技术', description: '专注粉碎、输送与颗粒改性，为不同物料与生产需求提供粉体装备和工艺解决方案。' },
  });
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px] bg-[#f1f4f6]">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        <HeroSection />
        <TrustBar />
        <ProductBentoBox />
        <FactoryCapability />
        <ProcessFlow />
        <ResearchForm />
      </div>

      <Footer />
    </main>
  );
}
