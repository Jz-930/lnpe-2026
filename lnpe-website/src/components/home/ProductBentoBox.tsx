import Link from 'next/link';
import Image from 'next/image';
import { ChamferCard } from '@/components/ui/ChamferCard';
import { ArrowRight } from 'lucide-react';

const PRODUCTS = [
  {
    title: 'Turnkey EPC',
    desc: 'As a supplier of cathode and anode materials, we have successfully delivered over a hundred EPC projects in the battery materials sector.',
    href: '/products/turnkey-epc',
    image: '/images/backgrounds/LRadjusted-22.webp',
    className: 'col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[400px]',
    variant: 'tl-br' as const,
    isHero: true,
  },
  {
    title: 'Jet Pulverizer',
    desc: 'A newly developed grinding and classification system designed for materials with strict particle size requirements and high yield demands.',
    href: '/products/jet-pulverizer',
    image: '/images/04_products/product_03_jet-pulverizer/product_03_listing.webp',
    className: 'col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2 min-h-[400px]',
    variant: 'br' as const,
  },
  {
    title: 'Jet Mill',
    desc: 'Optimized structural and flow field design significantly enhances energy efficiency.',
    href: '/products/jet-mill',
    image: '/images/04_products/product_01_jet-mill/product_01_listing.webp',
    className: 'col-span-1',
    variant: 'br' as const,
  },
  {
    title: 'Impact Mill',
    desc: 'High-speed hammer impact and compression for ultrafine grinding with precise control.',
    href: '/products/impact-mill',
    image: '/images/04_products/product_02_impact-mill/product_02_listing.webp',
    className: 'col-span-1',
    variant: 'br' as const,
  },
  {
    title: 'Shaping Mill',
    desc: 'Self-developed device for controlling powder morphology and particle size.',
    href: '/products/shaping-mill',
    image: '/images/04_products/product_05_shaping-mill/product_05_listing.webp',
    className: 'col-span-1',
    variant: 'br' as const,
  },
  {
    title: 'Air Classifier',
    desc: 'Dry state classification based on differences in particle size and density.',
    href: '/products/air-classifier',
    image: '/images/04_products/product_06_air-classifier/product_06_listing.webp',
    className: 'col-span-1',
    variant: 'br' as const,
  },
];

export function ProductBentoBox() {
  return (
    <section className="py-24 bg-lnpe-bg relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight mb-4">
              Precision Equipment <br />
              <span className="text-lnpe-text">Manufacturing.</span>
            </h2>
            <p className="font-mono text-lnpe-text uppercase tracking-widest text-sm">
              Dispersion // Grinding // Conveying
            </p>
          </div>
          <Link 
            href="/products" 
            className="group flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-white hover:text-lnpe-kinetic transition-colors"
          >
            View All Systems
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]">
          {PRODUCTS.map((product) => (
            <Link key={product.title} href={product.href} className={product.className}>
              <ChamferCard 
                variant={product.variant} 
                interactive 
                className="w-full h-full flex flex-col justify-end overflow-hidden group relative"
              >
                {/* Background Image */}
                {product.image && (
                  <Image 
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 mix-blend-screen group-hover:scale-105"
                  />
                )}

                {/* Gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-lnpe-bg via-lnpe-bg/60 to-transparent opacity-90" />

                {/* Background Isometric Blueprint effect for Turnkey EPC */}
                {product.isHero && (
                  <div className="absolute inset-0 bg-blueprint opacity-10 scale-150 rotate-12 pointer-events-none group-hover:opacity-20 transition-opacity duration-700" />
                )}

                <div className="relative z-10 flex flex-col h-full justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-3 uppercase tracking-wide group-hover:text-lnpe-kinetic transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-lnpe-text text-sm leading-relaxed max-w-md line-clamp-2">
                      {product.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-lnpe-border/50">
                    <span className="font-mono text-xs tracking-widest text-lnpe-border group-hover:text-lnpe-kinetic transition-colors">
                      SYS // {product.title.substring(0, 3).toUpperCase()}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-lnpe-border flex items-center justify-center group-hover:border-lnpe-kinetic group-hover:bg-lnpe-kinetic/10 transition-all">
                      <ArrowRight size={14} className="text-lnpe-text group-hover:text-lnpe-kinetic" />
                    </div>
                  </div>
                </div>
              </ChamferCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
