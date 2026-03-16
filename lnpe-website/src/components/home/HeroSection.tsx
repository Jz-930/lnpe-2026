import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/01_shared/background_01_hero-bg.webp" 
          alt="Technical Background" 
          fill 
          priority
          className="object-cover opacity-30 select-none mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lnpe-bg to-transparent" />
      </div>

      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none z-0" />
      
      {/* 3D Model Placeholder Glow */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lnpe-kinetic/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tight leading-[1.1] mb-6">
            Advancing Powder <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-lnpe-text">Technology.</span>
          </h1>
          
          <p className="font-mono text-lnpe-text text-lg md:text-xl mb-10 uppercase tracking-[0.2em] border-l-2 border-lnpe-kinetic pl-4">
            Delivering Smart Solutions.
          </p>
          
          <p className="text-lnpe-text text-lg mb-12 max-w-lg leading-relaxed">
            A globally recognized powder equipment expert, specializing in grinding, conveying, and particle modification, delivering high-performance solutions to over 20 countries.
          </p>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/contact-us"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-lnpe-bg font-bold uppercase tracking-wider text-sm clip-chamfer overflow-hidden transition-all hover:bg-transparent hover:text-white hover:border hover:border-white w-[200px]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Us
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            
            <Link 
              href="/about"
              className="text-sm font-mono tracking-widest text-white uppercase hover:text-lnpe-kinetic transition-colors flex items-center gap-2"
            >
              <span className="w-8 h-[1px] bg-lnpe-border inline-block" />
              Discover LNPE
            </Link>
          </div>
        </div>

        {/* 3D Equipment Visual (Placeholder) */}
        <div className="relative h-[600px] w-full hidden lg:block">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Minimalist 3D representation structure */}
            <div className="relative w-80 h-[500px] border border-lnpe-border bg-lnpe-surface backdrop-blur-sm clip-chamfer flex items-center justify-center">
              {/* Internal glowing fluid simulation */}
              <div className="absolute inset-2 border border-lnpe-kinetic/30 clip-chamfer overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-64 bg-lnpe-kinetic/20 blur-xl animate-pulse" />
                
                {/* Simulated Data Points */}
                <div className="absolute top-8 left-8 font-mono text-xs text-lnpe-kinetic flex flex-col gap-1">
                  <span>VEL: 320 M/S</span>
                  <span>TMP: 25.4 °C</span>
                  <span>D50: ≤ 1.5μm</span>
                </div>
              </div>
              
              <div className="font-mono text-lnpe-border rotate-90 tracking-widest text-2xl absolute right-[-40px]">
                JET MILL // 01
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
