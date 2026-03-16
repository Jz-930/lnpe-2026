import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px] relative bg-lnpe-bg">
      <div className="absolute inset-0 z-[-1]">
        <Image 
          src="/images/backgrounds/LRadjusted-138.webp" 
          alt="LNPE Factory" 
          fill 
          priority
          className="object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-lnpe-bg via-transparent to-lnpe-bg" />
      </div>
      <Navbar />

      <div className="flex-1 pb-24">
        {/* Header */}
        <section className="py-24 border-b border-lnpe-border bg-lnpe-bg/80 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-lnpe-kinetic/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-8">
              Focusing on Ultra-Fine Powder Grinding & Classification<span className="text-lnpe-kinetic">.</span>
            </h1>
            <p className="text-lnpe-text text-xl max-w-3xl leading-relaxed border-l-2 border-lnpe-kinetic pl-6 font-mono uppercase tracking-wide">
              LNPE is committed to solving difficulties in the ultra-fine powder industry for customers.
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-lnpe-surface border border-lnpe-border p-8 md:p-16 clip-chamfer backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 border border-lnpe-kinetic/0 group-hover:border-lnpe-kinetic/30 transition-colors duration-500 clip-chamfer pointer-events-none" />
              
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide mb-12 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-lnpe-kinetic inline-block" />
                Group Introduction
              </h2>
              
              <div className="prose prose-invert prose-p:text-lnpe-text prose-p:leading-loose prose-p:text-lg max-w-none space-y-8">
                <p>
                  LNPE Group, headquartered in Mianyang, Sichuan Province, China, is an industry-leading provider of comprehensive powder equipment solutions. Adhering to an international development philosophy, the group offers innovative and efficient solutions with high-end and comprehensive powder processing technologies to global customers.
                </p>
                
                <p>
                  Over the years, LNPE Group has focused on the R&D and manufacturing of ultrafine grinding, classification technologies, and related equipment. With outstanding technical innovation and strong R&D capabilities, the group has become a global leader in technology and equipment, specializing in powder grinding and classification equipment.
                </p>
                
                <p>
                  Equipped with advanced industrial laboratories, numerical simulation design software, and precision testing instruments, LNPE Group customizes the most suitable and cost-effective high-quality powder equipment to ensure that product performance always maintains an industry-leading position. The group is committed to continuous technological innovation and product quality improvement, places a high value on expanding its international market, and establishes a global business network.
                </p>
              </div>

              {/* World Map Image */}
              <div className="mt-16 border-t border-lnpe-border pt-12 relative w-full h-[400px]">
                <Image 
                  src="/images/03_about/about_01_world-map.webp" 
                  alt="LNPE Global Network" 
                  fill
                  className="object-contain opacity-70"
                />
              </div>
            </div>
            
            {/* Spotlight Equipment */}
            <div className="mt-16 bg-lnpe-surface border border-lnpe-border p-8 clip-chamfer backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide mb-4">
                  Jet Pulverizer Innovation
                </h3>
                <p className="text-lnpe-text leading-relaxed mb-6">
                  Delivering high-yield, precise particle sizing with low energy by preventing over-grinding through its unique single-impact milling and pre-sorting process.
                </p>
              </div>
              <div className="relative aspect-square w-full max-w-sm mx-auto border border-lnpe-border clip-chamfer">
                <Image 
                  src="/images/03_about/about_02_jet-pulverizer.webp" 
                  alt="Jet Pulverizer" 
                  fill
                  className="object-cover mix-blend-lighten opacity-80"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
