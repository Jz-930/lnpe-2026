'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';

const CATEGORIES = ['All', 'Grinding', 'Classifying', 'Modification', 'Turnkey Line'] as const;

type Category = (typeof CATEGORIES)[number];

const PRODUCTS = [
  {
    title: 'Turnkey EPC',
    desc: 'Battery material production lines from process design to site delivery.',
    href: '/products/turnkey-epc',
    image: '/images/04_products/product_04_turnkey-epc/product_04_gallery_03.webp',
    category: 'Turnkey Line',
    specs: ['Cathode / Anode', 'Whole-line EPC', 'Lab to Production'],
    module: 'Integrated line',
    fit: 'cover',
  },
  {
    title: 'Jet Pulverizer',
    desc: 'Closed-loop grinding and classification for strict particle targets.',
    href: '/products/jet-pulverizer',
    image: '/images/04_products/product_03_jet-pulverizer/product_03_listing.webp',
    category: 'Grinding',
    specs: ['D50 1-5 um', 'High Yield', 'Integrated Classifier'],
    module: 'Grinding route',
    fit: 'contain',
  },
  {
    title: 'Jet Mill',
    desc: 'Fluidized bed jet grinding with optimized energy efficiency.',
    href: '/products/jet-mill',
    image: '/images/04_products/product_01_jet-mill/product_01_listing.webp',
    category: 'Grinding',
    specs: ['Dry Grinding', 'Low Wear', 'Energy Saving'],
    module: 'Micronization',
    fit: 'contain',
  },
  {
    title: 'Impact Mill',
    desc: 'Mechanical impact grinding for robust mineral and chemical routes.',
    href: '/products/impact-mill',
    image: '/images/04_products/product_02_impact-mill/product_02_listing.webp',
    category: 'Grinding',
    specs: ['Hammer Impact', 'Compression', 'High Throughput'],
    module: 'Mechanical route',
    fit: 'contain',
  },
  {
    title: 'Shaping Mill',
    desc: 'Particle morphology control for surface and flowability requirements.',
    href: '/products/shaping-mill',
    image: '/images/04_products/product_05_shaping-mill/product_05_listing.webp',
    category: 'Modification',
    specs: ['Morphology', 'Surface Tuning', 'Particle Control'],
    module: 'Surface tuning',
    fit: 'contain',
  },
  {
    title: 'Air Classifier',
    desc: 'Dry classification by particle size and density differences.',
    href: '/products/air-classifier',
    image: '/images/04_products/product_06_air-classifier/product_06_listing.webp',
    category: 'Classifying',
    specs: ['Cut Point', 'Dry Separation', 'Density Split'],
    module: 'Separation',
    fit: 'contain',
  },
] satisfies {
  title: string;
  desc: string;
  href: string;
  image: string;
  category: Exclude<Category, 'All'>;
  specs: string[];
  module: string;
  fit: 'cover' | 'contain';
}[];

function SpecDrawer({ specs }: { specs: string[] }) {
  return (
    <div className="grid gap-1.5 border border-[#c8d2dc] bg-white/92 p-3 shadow-[0_16px_28px_rgba(15,23,42,0.10)] backdrop-blur">
      {specs.map((spec) => (
        <div key={spec} className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#566272]">
          <span className="h-px flex-1 bg-[#d6dee6]" />
          <span>{spec}</span>
        </div>
      ))}
    </div>
  );
}

export function ProductBentoBox() {
  const [category, setCategory] = useState<Category>('All');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      setCategory((current) => {
        const currentIndex = CATEGORIES.indexOf(current);
        return CATEGORIES[(currentIndex + 1) % CATEGORIES.length];
      });
    }, 5400);

    return () => window.clearInterval(interval);
  }, []);

  const visibleProducts = useMemo(
    () => (category === 'All' ? PRODUCTS : PRODUCTS.filter((product) => product.category === category)),
    [category]
  );
  const featured = visibleProducts[0] ?? PRODUCTS[0];
  const supportingProducts = visibleProducts.slice(1, 5);

  return (
    <section className="relative overflow-hidden bg-[#f1f4f6] py-24 text-[#111827]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/95 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.035)_1px,transparent_1px)] bg-[length:52px_52px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="relative isolate mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold uppercase tracking-normal text-[#0f172a] sm:text-4xl md:text-6xl">
              Equipment Discovery
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#5b6673]">
              A clean product catalog surface with stronger equipment imagery, hard specs and a lighter conversion path.
            </p>
          </div>
          <Link
            href="/products"
            className="group relative z-10 inline-flex items-center gap-3 self-start border border-[#c4ced8] bg-white/86 px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#111827] shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition-colors hover:border-[#F26522] hover:text-[#F26522] md:self-auto"
          >
            View All Systems
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto border-y border-[#d4dde6] py-3">
          {CATEGORIES.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`relative shrink-0 overflow-hidden border px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? 'border-[#111827] bg-[#111827] text-white'
                    : 'border-[#cbd5df] bg-white/78 text-[#5f6b78] hover:border-[#F26522] hover:text-[#F26522]'
                }`}
              >
                <span className="relative z-10">{item}</span>
                {active && (
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-right bg-[#F26522] [animation:route-step-pulse_5.4s_ease-in-out_infinite] motion-reduce:animate-none" />
                )}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
          <Link
            href={featured.href}
            className="group relative min-h-[560px] overflow-hidden border border-[#c9d3dd] bg-[#f8fafb] shadow-[0_26px_80px_rgba(15,23,42,0.10)] transition-colors hover:border-[#aebbc7] hover:bg-white"
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(232,238,243,0.96))]" />
            <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between border-b border-[#d7e0e8] pb-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#64748b]">Featured equipment</div>
                <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-normal text-[#0f172a] md:text-5xl">
                  {featured.title}
                </h3>
              </div>
              <span className="hidden border border-[#c8d2dc] bg-white px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#52606f] sm:block">
                {featured.category}
              </span>
            </div>

            <div className="absolute inset-x-8 bottom-[150px] top-[142px] md:bottom-[138px]">
              <div className="absolute inset-x-[9%] bottom-8 h-14 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.28),transparent_72%)] blur-lg" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.09))]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.04)_1px,transparent_1px)] bg-[length:40px_40px]" />
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1280px) 52vw, 100vw"
                className={`drop-shadow-[0_26px_24px_rgba(15,23,42,0.20)] transition-transform duration-300 group-hover:scale-[1.025] ${
                  featured.fit === 'cover'
                    ? 'object-cover object-center p-0'
                    : 'object-contain object-center p-4'
                }`}
              />
              <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                <span className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(242,101,34,0.18),transparent)] [animation:catalog-scan_5.6s_linear_infinite] motion-reduce:animate-none" />
                <span className="absolute bottom-3 left-0 h-px w-2/3 bg-[linear-gradient(90deg,transparent,rgba(242,101,34,0.86),transparent)] [animation:catalog-glide_4.8s_ease-in-out_infinite] motion-reduce:animate-none" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 grid gap-5 md:grid-cols-[0.94fr_1.06fr] md:items-end">
              <p className="max-w-xl text-sm leading-7 text-[#586474] md:text-base">{featured.desc}</p>
              <div>
                <SpecDrawer specs={featured.specs} />
                <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[#8b96a3]">
                  <span>{featured.module}</span>
                  <span className="flex items-center gap-2 text-[#111827] group-hover:text-[#F26522]">
                    System Detail <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
            {supportingProducts.length === 0 ? (
              <div className="flex min-h-[260px] items-center border border-[#d1dae3] bg-white/72 p-6 text-sm leading-7 text-[#5f6b78]">
                The selected category has one primary system. Use All to compare related equipment routes.
              </div>
            ) : (
              supportingProducts.map((product, index) => (
                <Link
                  key={product.title}
                  href={product.href}
                  className="group grid min-h-[220px] overflow-hidden border border-[#d1dae3] bg-white/78 shadow-[0_14px_38px_rgba(15,23,42,0.06)] transition-colors hover:border-[#aebbc7] hover:bg-white sm:grid-cols-[0.92fr_1.08fr]"
                >
                  <div className="relative min-h-[180px] bg-[#e8eef3]">
                    <div className="absolute inset-x-[12%] bottom-5 h-9 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.24),transparent_72%)] blur-md" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(242,101,34,0.72),transparent)] [animation:catalog-glide_5.2s_ease-in-out_infinite] motion-reduce:animate-none" />
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 768px) 42vw, 100vw"
                      className="object-contain object-bottom p-4 drop-shadow-[0_16px_16px_rgba(15,23,42,0.16)] transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute left-3 top-3 border border-[#c8d2dc] bg-white/86 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#556170]">
                      {String(index + 2).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="flex flex-col p-5">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7b8794]">{product.category}</div>
                        <h3 className="font-display text-xl font-bold uppercase tracking-normal text-[#0f172a] transition-colors group-hover:text-[#F26522]">
                          {product.title}
                        </h3>
                      </div>
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-[#c5ced8] text-[#111827] transition-colors group-hover:border-[#F26522] group-hover:bg-[#F26522] group-hover:text-white">
                        <ChevronRight size={15} />
                      </span>
                    </div>

                    <p className="text-sm leading-6 text-[#5f6b78]">{product.desc}</p>

                    <div className="mt-auto pt-5 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                      <SpecDrawer specs={product.specs.slice(0, 2)} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
