import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductBentoBox } from "@/components/home/ProductBentoBox";
import { FactoryCapability } from "@/components/home/FactoryCapability";
import { ProcessFlow } from "@/components/home/ProcessFlow";
import { ResearchForm } from "@/components/home/ResearchForm";

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
