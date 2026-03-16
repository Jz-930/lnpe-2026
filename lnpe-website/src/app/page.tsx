import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductBentoBox } from "@/components/home/ProductBentoBox";
import { ResearchForm } from "@/components/home/ResearchForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px]">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        <HeroSection />
        <TrustBar />
        <ProductBentoBox />
        <ResearchForm />
      </div>

      <Footer />
    </main>
  );
}
