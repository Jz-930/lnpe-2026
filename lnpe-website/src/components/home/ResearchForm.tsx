"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function ResearchForm() {
  return (
    <section className="py-24 bg-lnpe-bg-light relative border-t border-lnpe-border overflow-hidden">
      {/* Background decoration & Image */}
      <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-20 hidden lg:block">
        <Image 
          src="/images/backgrounds/LRadjusted-1.webp" 
          alt="Research Institute" 
          fill
          className="object-cover object-right mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-lnpe-bg-light/80 to-lnpe-bg-light" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Institute Info */}
        <div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight mb-8">
            LNPE Research <br />
            <span className="text-lnpe-text">Institute.</span>
          </h2>
          
          <div className="space-y-8 font-mono text-sm">
            <div className="border-l border-lnpe-kinetic pl-6">
              <h4 className="text-white font-bold mb-2 uppercase tracking-wide">Strong R&D Capabilities</h4>
              <p className="text-lnpe-text leading-relaxed">
                Partnering with SWUST, our high-level team of 20+ PhDs and professors handles national research projects, holding 30+ patents.
              </p>
            </div>
            
            <div className="border-l border-lnpe-border pl-6 transition-colors hover:border-lnpe-text">
              <h4 className="text-white font-bold mb-2 uppercase tracking-wide">Advanced Testing & Analysis</h4>
              <p className="text-lnpe-text leading-relaxed">
                State-of-the-art ultrafine powder laboratory equipped with laser particle analyzers and electron microscopes.
              </p>
            </div>
            
            <div className="border-l border-lnpe-border pl-6 transition-colors hover:border-lnpe-text">
              <h4 className="text-white font-bold mb-2 uppercase tracking-wide">Innovative Simulation</h4>
              <p className="text-lnpe-text leading-relaxed">
                Pioneering fluent fluid dynamics software to simulate gas-solid two-phase flow with scientific precision.
              </p>
            </div>
          </div>
        </div>

        {/* Right: The "Lab Request Form" */}
        <div className="bg-lnpe-bg p-8 md:p-12 border border-lnpe-border clip-chamfer relative group">
          <div className="absolute inset-0 pointer-events-none border border-lnpe-kinetic/0 group-hover:border-lnpe-kinetic/20 transition-colors duration-500 clip-chamfer" />
          
          <div className="mb-10">
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide mb-2">Book a Trial</h3>
            <p className="font-mono text-xs text-lnpe-text uppercase tracking-widest">Submit Material Specs for Analysis</p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group/input">
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent border-0 border-b border-lnpe-border py-2 text-white font-mono text-sm focus:outline-none focus:ring-0 peer placeholder-transparent" 
                  placeholder="First Name"
                />
                <label className="absolute left-0 top-2 text-lnpe-text/50 font-mono text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-lnpe-kinetic peer-valid:-top-5 peer-valid:text-xs peer-valid:text-lnpe-text pointer-events-none">FIRST_NAME</label>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-lnpe-kinetic transition-all duration-300 peer-focus:w-full" />
              </div>
              
              <div className="relative group/input">
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent border-0 border-b border-lnpe-border py-2 text-white font-mono text-sm focus:outline-none focus:ring-0 peer placeholder-transparent" 
                  placeholder="Last Name"
                />
                <label className="absolute left-0 top-2 text-lnpe-text/50 font-mono text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-lnpe-kinetic peer-valid:-top-5 peer-valid:text-xs peer-valid:text-lnpe-text pointer-events-none">LAST_NAME</label>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-lnpe-kinetic transition-all duration-300 peer-focus:w-full" />
              </div>
            </div>

            <div className="relative group/input">
              <input 
                type="text" 
                required
                className="w-full bg-transparent border-0 border-b border-lnpe-border py-2 text-white font-mono text-sm focus:outline-none focus:ring-0 peer placeholder-transparent" 
                placeholder="Company / Institute"
              />
              <label className="absolute left-0 top-2 text-lnpe-text/50 font-mono text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-lnpe-kinetic peer-valid:-top-5 peer-valid:text-xs peer-valid:text-lnpe-text pointer-events-none">COMPANY_NAME</label>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-lnpe-kinetic transition-all duration-300 peer-focus:w-full" />
            </div>

            <div className="relative group/input">
              <textarea 
                required
                rows={3}
                className="w-full bg-transparent border-0 border-b border-lnpe-border py-2 text-white font-mono text-sm focus:outline-none focus:ring-0 peer placeholder-transparent resize-none" 
                placeholder="Material Spec / Data"
              />
              <label className="absolute left-0 top-2 text-lnpe-text/50 font-mono text-sm transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-lnpe-kinetic peer-valid:-top-5 peer-valid:text-xs peer-valid:text-lnpe-text pointer-events-none">MATERIAL_SPECS_AND_TARGETS</label>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-lnpe-kinetic transition-all duration-300 peer-focus:w-full" />
            </div>

            <button type="submit" className="w-full flex items-center justify-between px-6 py-4 bg-white text-lnpe-bg font-bold uppercase tracking-wider text-sm clip-chamfer hover:bg-lnpe-kinetic transition-colors group/btn">
              <span>Submit Request</span>
              <ArrowRight size={18} className="transform transition-transform group-hover/btn:translate-x-2" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
