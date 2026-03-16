import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { HeroParticles } from './HeroParticles';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/backgrounds/LRadjusted-287.webp" 
          alt="LNPE Factory Layout" 
          fill 
          priority
          className="object-cover object-[80%_center] opacity-60 select-none mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lnpe-bg via-lnpe-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-lnpe-bg/80 via-lnpe-bg/40 to-transparent md:w-2/3 right-0 ml-auto" />
      </div>

      {/* Particle Effect Layer */}
      <HeroParticles />

      <div className="container mx-auto px-6 relative z-10 flex justify-end items-center">
        {/* Text Content */}
        <div className="max-w-xl mt-12 md:mt-0 lg:mr-[2%] xl:mr-[4%]">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tight leading-[1.1] mb-6">
            Advancing Powder <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-lnpe-text">Technology.</span>
          </h1>
          
          <p className="font-mono text-lnpe-text text-lg md:text-xl mb-10 uppercase tracking-[0.2em] border-l-2 border-lnpe-kinetic pl-4">
            Delivering Smart Solutions.
          </p>
          
          <p className="text-lnpe-text text-lg mb-12 max-w-lg leading-relaxed mix-blend-lighten">
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
      </div>
    </section>
  );
}
