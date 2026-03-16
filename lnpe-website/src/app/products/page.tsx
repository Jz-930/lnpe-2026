import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductBentoBox } from "@/components/home/ProductBentoBox";

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px] relative">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none z-[-1]" />
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        {/* Simple Header */}
        <section className="py-20 text-center border-b border-lnpe-border bg-lnpe-bg/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 max-w-4xl">
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
