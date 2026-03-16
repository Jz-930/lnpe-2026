import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResearchForm } from "@/components/home/ResearchForm";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px] relative bg-lnpe-bg">
      <Navbar />

      <div className="flex-1">
        {/* Header */}
        <section className="py-20 border-b border-lnpe-border bg-lnpe-bg/80 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
          <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6">
              Contact Us
            </h1>
            <p className="text-lnpe-text text-lg max-w-2xl mx-auto leading-relaxed font-mono tracking-widest uppercase">
              7×24 Standby Professionally.
            </p>
          </div>
        </section>

        {/* Global Locations / Contact Info Grid */}
        <section className="py-16 bg-lnpe-bg">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="border border-lnpe-border p-8 bg-lnpe-surface backdrop-blur-sm text-center group hover:border-lnpe-kinetic transition-colors">
                <div className="font-mono text-lnpe-kinetic text-sm uppercase tracking-widest mb-4">Pre Sales Consultation</div>
                <div className="text-white font-medium">Professional purchasing consultation</div>
              </div>
              <div className="border border-lnpe-border p-8 bg-lnpe-surface backdrop-blur-sm text-center group hover:border-lnpe-kinetic transition-colors">
                <div className="font-mono text-lnpe-kinetic text-sm uppercase tracking-widest mb-4">Scheme Customization</div>
                <div className="text-white font-medium">Tailor-made design solutions</div>
              </div>
              <div className="border border-lnpe-border p-8 bg-lnpe-surface backdrop-blur-sm text-center group hover:border-lnpe-kinetic transition-colors">
                <div className="font-mono text-lnpe-kinetic text-sm uppercase tracking-widest mb-4">Product Selection</div>
                <div className="text-white font-medium">Reasonable Configuration & Consulting</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-block border border-lnpe-kinetic bg-lnpe-kinetic/10 px-8 py-4 clip-chamfer">
                <div className="font-mono text-lnpe-text uppercase tracking-widest text-xs mb-2">Global Support Hotline</div>
                <div className="text-3xl font-display font-bold text-white">123-456-7890</div>
              </div>
            </div>
          </div>
        </section>

        {/* Reuse the Research Form for booking a trial/visit */}
        <ResearchForm />
      </div>

      <Footer />
    </main>
  );
}
