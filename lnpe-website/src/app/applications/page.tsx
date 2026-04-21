import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChamferCard } from "@/components/ui/ChamferCard";
import Image from "next/image";

const MATERIALS = {
  "Battery Materials": [
    "Artificial graphite", "Asphalt", "Boehmite", "Hard carbon", "Iron phosphate", 
    "Layered oxide", "Lithium Iron Phosphate", "Lithium carbonate", "Lithium hydroxide", 
    "Lithium manganese iron phosphate", "Lithium nickel cobalt aluminate", 
    "Lithium nickel cobalt manganese oxide", "Natural graphite", "Porous carbon", 
    "Silicon carbon (SiC)", "Silicon oxygen (SiOC)", "Sodium iron phosphate", 
    "Sodium vanadium phosphate", "Special carbon"
  ],
  "Chemicals": [
    "Alumina", "Aluminum hydroxide", "Black carbon black", "Calcium phosphate", "Cellulose", 
    "Foaming agent", "Low melting point glass powder", "Magnesium hydroxide", "Magnesium oxide", 
    "Precipitated barium sulfate", "Silica gel", "Strontium carbonate", "White carbon black", 
    "Yttrium oxide", "Zinc oxide"
  ],
  "Pharma & Food": [
    "Angelica", "Bee pollen", "Ciwujia", "Cordyceps sinensis", "Danshen", "Ganoderma powder", 
    "Ganoderma spores", "Ginseng", "Green tea", "Konjac powder", "Lentinus edodes", 
    "Pine pollen", "Sanqi", "Sheep placenta", "Tianqi", "Xiqingguo"
  ],
  "Abrasives": [
    "Boron carbide", "Brown corundum", "Chromium carbide", "Chromium oxide", "Grinding wheel material", 
    "Pink fused alumina", "Rare earth polishing materials", "Silicon carbide", "Silicon nitride", 
    "Tungsten carbide", "White corundum", "Zircon sand", "Zirconia", "Diamond"
  ]
};

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px] relative bg-lnpe-bg">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none z-[-1]" />
      <Navbar />

      <div className="flex-1 pb-24">
        {/* Header */}
        <section className="py-20 border-b border-lnpe-border bg-lnpe-bg/80 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 z-[-1]">
            <Image 
              src="/images/backgrounds/LRadjusted-193.webp" 
              alt="Material Applications" 
              fill 
              priority
              className="object-cover opacity-30 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-lnpe-bg via-transparent to-lnpe-bg" />
            <div className="absolute inset-0 bg-gradient-to-r from-lnpe-bg via-lnpe-bg/60 to-transparent" />
          </div>
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-8">
              Material Applications<span className="text-lnpe-kinetic">.</span>
            </h1>
            <p className="text-lnpe-text text-lg max-w-3xl leading-relaxed border-l-2 border-lnpe-kinetic pl-6">
              Enhanced precision in grinding and classification processes enables the full realization of advanced materials&apos; industrial potential, paving the way for high-performance applications across diverse sectors.
            </p>
          </div>
        </section>

        {/* Categories as a Data Dashboard */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {Object.entries(MATERIALS).map(([category, items]) => (
                <ChamferCard key={category} variant="tl-br" className="p-8 group hover:border-lnpe-kinetic/30 transition-colors">
                  <div className="flex items-center justify-between mb-8 border-b border-lnpe-border pb-4">
                    <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wide">
                      {category}
                    </h2>
                    <span className="font-mono text-xs text-lnpe-kinetic bg-lnpe-kinetic/10 px-3 py-1 rounded-full">
                      {items.length} SPECIMENS
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {items.map((item, idx) => (
                      <div key={item} className="flex items-center gap-3 font-mono text-sm group/item">
                        <span className="text-lnpe-border group-hover/item:text-lnpe-kinetic transition-colors">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-lnpe-text group-hover/item:text-white transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </ChamferCard>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
