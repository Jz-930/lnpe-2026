import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductBentoBox } from "@/components/home/ProductBentoBox";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px] relative">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none z-[-1]" />
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        {/* Simple Header */}
        <section className="py-20 text-center border-b border-lnpe-border bg-lnpe-bg/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 z-[-1]">
            <Image 
              src="/images/backgrounds/LRadjusted-59.webp" 
              alt="LNPE Products" 
              fill 
              priority
              className="object-cover opacity-30 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lnpe-bg via-transparent to-lnpe-bg" />
          </div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight mb-6">
              Our Products
            </h1>
            <p className="text-lnpe-text text-lg max-w-2xl mx-auto leading-relaxed">
              Precision Equipment Manufacturing. Dispersion equipment, (nano) grinding equipment, Ingredient system, conveying system.
            </p>
          </div>
        </section>

        {/* Reuse the BentoBox component for the products list for now since it matches the design request */}
        <div className="py-12">
          <ProductBentoBox />
        </div>
      </div>

      <Footer />
    </main>
  );
}
