import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChamferCard } from "@/components/ui/ChamferCard";
import { notFound } from "next/navigation";
import Image from "next/image";

// Explicit mapping: slug -> { folder, prefix, galleryCount }
const PRODUCT_IMAGES: Record<string, { folder: string; prefix: string; galleryCount: number }> = {
  "jet-mill":              { folder: "product_01_jet-mill",              prefix: "product_01", galleryCount: 4 },
  "impact-mill":           { folder: "product_02_impact-mill",           prefix: "product_02", galleryCount: 3 },
  "jet-pulverizer":        { folder: "product_03_jet-pulverizer",        prefix: "product_03", galleryCount: 4 },
  "turnkey-epc":           { folder: "product_04_turnkey-epc",           prefix: "product_04", galleryCount: 4 },
  "shaping-mill":          { folder: "product_05_shaping-mill",          prefix: "product_05", galleryCount: 0 },
  "air-classifier":        { folder: "product_06_air-classifier",        prefix: "product_06", galleryCount: 4 },
  "laboratory-equipment":  { folder: "product_07_laboratory-equipment",  prefix: "product_07", galleryCount: 4 },
};

// Define the static product data based on the content master file
const PRODUCT_DATA: Record<string, { title: string; principle?: string; features: string[]; applications?: string[] }> = {
  "jet-mill": {
    title: "Jet Mill",
    principle: "The LNJ Jet Mill utilizes multiple nozzles to generate high-velocity, sonic-speed airflow, enabling ultrafine pulverization of materials through particle-on-particle collisions. The finely ground particles are then carried into a high-efficiency turbine classifier, where oversized particles are separated and returned to the grinding chamber for further processing.",
    features: [
      "Low energy consumption",
      "Materials collision each other without contamination, effective for Mohs 1-10 hard Material",
      "Fully automatic control, easy to operate",
      "Omniseal negative pressure operation, no contamination."
    ]
  },
  "impact-mill": {
    title: "Impact Mill",
    principle: "The LNPE Impact Mill combines two size-reduction mechanisms—high-speed hammer impact and hammer-to-liner compression—to achieve ultrafine grinding in a single continuous process. After comminution, material enters the built-in turbine classifier.",
    features: [
      "High-capacity throughput with exceptionally low specific energy consumption",
      "Optional full-ceramic process lining to virtually eliminate ferromagnetic contamination"
    ]
  },
  "jet-pulverizer": {
    title: "Jet Pulverizer",
    principle: "The Jet Pulverizer is a patented, next-generation grinding-and-classification system designed for processes that demand narrow particle-size distributions at high throughput with minimal energy draw. Immediate Classification, Single-Collision Milling, and Ultra-Short Residence Time.",
    features: [
      "Controlled grinding, high yield, stable particle size, low energy consumption, and large output",
      "The milling strength is easy to control, high yield, low fine powder content",
      "Minimal impact on particle surface morphology, with little damage to the shape of particles"
    ]
  },
  "turnkey-epc": {
    title: "Turnkey EPC",
    principle: "Turn-key Powder-Processing Solutions: Leveraging decades of process-engineering expertise, we deliver turnkey EPC solutions for a broad spectrum of powders. Our one-stop approach covers Process Design, Equipment Manufacturing & Supply, Installation & Commissioning, and Training & Lifecycle Service.",
    features: [
      "Custom-built powder-processing lines tuned to each client’s material and throughput targets",
      "Full in-house equipment suite—crushers, mills, classifiers, mixers, conveyors, and more",
      "Rapid on-site install & commissioning by dedicated field engineers",
      "End-to-end technical support with operator training and 24 / 7 service",
      "Proven EPC track record spanning hundreds of projects worldwide"
    ]
  },
  "shaping-mill": {
    title: "Shaping Mill",
    principle: "The LNPE Shaping Mill employs a high-speed rotor–stator assembly inside a precisely engineered airflow field. Feed powder is accelerated into the shaping zone, where controlled particle–particle and particle–wall collisions round sharp edges, smooth surfaces, or accentuate aspect ratios as required.",
    features: [
      "Morphology on demand – spheroidal, prismatic, or high-aspect shapes",
      "One-pass shaping + sizing",
      "Modular rotor for diverse powders",
      "High yield, near-zero contamination",
      "Low energy, minimal OPEX"
    ]
  },
  "air-classifier": {
    title: "Air Classifier",
    principle: "LNPE air classifier separates powder exclusively by particle size and density. The high-speed rotation of the classifying wheel generates a strong centrifugal field, while the carrier airflow supplies an opposing drag force.",
    features: [
      "Precision separation by particle size, density, and morphology",
      "CFD-optimised airflow, solids concentration, and pressure profile for each design",
      "High cut accuracy with classification efficiency of 70 – 93 %",
      "Multiple interchangeable classifier-wheel geometries for efficient handling of diverse powders"
    ]
  },
  "laboratory-equipment": {
    title: "Laboratory Equipment",
    principle: "Drawing on years of industry experience and technical expertise, we supply a full suite of high-performance laboratory systems purpose-built for powder-processing R&D. Because every project has its own nuances, each unit features a modular design that can be customised to meet precise experimental requirements.",
    features: [
      "Custom-engineered lab mills deliver rapid, energy-efficient powder processing with tight size control.",
      "Modular, user-friendly design streamlines setup, operation, and maintenance for any R&D workflow.",
      "Proven worldwide—deployed in the U.S., France, Russia, and beyond for consistently reliable results."
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(PRODUCT_DATA).map((slug) => ({ slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCT_DATA[slug];

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col pt-[88px] relative bg-lnpe-bg">
      <Navbar />

      <div className="flex-1">
        {/* Product Hero */}
        <section className="relative py-24 border-b border-lnpe-border overflow-hidden">
          <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="font-mono text-lnpe-kinetic tracking-widest text-sm mb-4">
                SYS // {slug.toUpperCase()}
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-8 leading-tight">
                {product.title}
              </h1>
              {product.principle && (
                <div className="prose prose-invert prose-p:text-lnpe-text max-w-none">
                  <h3 className="font-mono text-white text-lg tracking-widest uppercase mb-4 border-l-2 border-lnpe-kinetic pl-4">
                    Working Principle
                  </h3>
                  <p className="text-lnpe-text leading-relaxed text-lg">
                    {product.principle}
                  </p>
                </div>
              )}
            </div>

            {/* Real Product Cover Image */}
            <div className="relative aspect-[4/3] w-full border border-lnpe-border bg-lnpe-bg-light clip-chamfer overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-lnpe-bg to-transparent z-10 opacity-60" />
              <Image 
                src={`/images/04_products/${PRODUCT_IMAGES[slug]?.folder}/${PRODUCT_IMAGES[slug]?.prefix}_cover.webp`}
                alt={`${product.title} cover`}
                fill
                className="object-cover mix-blend-lighten transition-transform duration-700 group-hover:scale-105"
              />
              {/* Simulated edge lighting */}
              <div className="absolute -left-full top-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-45 group-hover:translate-x-full transition-transform duration-1000 z-20 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {(PRODUCT_IMAGES[slug]?.galleryCount ?? 0) > 0 && (
        <section className="py-16 bg-lnpe-bg">
          <div className="container mx-auto px-6">
            <h3 className="font-mono text-lnpe-kinetic tracking-widest text-sm mb-8">
              VISUAL ASSETS // GALLERY
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: PRODUCT_IMAGES[slug]!.galleryCount }, (_, i) => i + 1).map((num) => (
                <div key={num} className="relative aspect-square border border-lnpe-border bg-lnpe-surface overflow-hidden group">
                  <Image
                    src={`/images/04_products/${PRODUCT_IMAGES[slug]!.folder}/${PRODUCT_IMAGES[slug]!.prefix}_gallery_0${num}.webp`}
                    alt={`${product.title} detail ${num}`}
                    fill
                    className="object-cover opacity-60 mix-blend-screen group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Features Section */}
        <section className="py-24 bg-lnpe-bg-light">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wide mb-12 text-center">
              Core Specifications & Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {product.features.map((feature, idx) => (
                <ChamferCard key={idx} variant="br" className="p-8">
                  <div className="flex gap-4 items-start">
                    <div className="font-mono text-lnpe-border font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <p className="text-sm text-white font-medium leading-relaxed">
                      {feature}
                    </p>
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
