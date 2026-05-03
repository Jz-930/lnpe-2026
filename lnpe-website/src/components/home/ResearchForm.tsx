"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, CheckCircle2, ClipboardCheck, Gauge, Layers3, Route as RouteIcon, SlidersHorizontal } from 'lucide-react';

const ROUTES = [
  {
    name: 'Grinding',
    summary: 'Micronization route for hardness, heat sensitivity and target D50 control.',
    recommendation: 'Jet Pulverizer or Jet Mill with closed-loop classifier.',
    modules: ['Feeder', 'Mill Body', 'Classifier', 'Cyclone'],
  },
  {
    name: 'Classifying',
    summary: 'Separation route for narrow particle distribution and oversize return.',
    recommendation: 'Air Classifier with cyclone collection and filter system.',
    modules: ['Air Classifier', 'Cyclone', 'Filter', 'Return Line'],
  },
  {
    name: 'Modification',
    summary: 'Surface and morphology route for downstream flowability and compatibility.',
    recommendation: 'Shaping Mill plus modification module and test validation.',
    modules: ['Shaping Mill', 'Modifier', 'Mixer', 'Lab Test'],
  },
  {
    name: 'Full Line',
    summary: 'Integrated process route from dosing to packaged powder output.',
    recommendation: 'Turnkey EPC line with grinding, classifying and collection stages.',
    modules: ['Dosing', 'Grinding', 'Classifying', 'Collection'],
  },
] as const;

type RouteName = (typeof ROUTES)[number]['name'];

const PARTICLE_OPTIONS = ['D50 1-5 um', 'D50 5-20 um', 'D90 Controlled', 'Custom target'];
const INDUSTRIES = ['Battery Materials', 'Chemicals', 'Minerals', 'Pharma and Food', 'Solid Waste'];

export function ResearchForm() {
  const [route, setRoute] = useState<RouteName>('Full Line');
  const [material, setMaterial] = useState('');
  const [particleSize, setParticleSize] = useState(PARTICLE_OPTIONS[0]);
  const [capacity, setCapacity] = useState('');
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [submitted, setSubmitted] = useState(false);

  const selectedRoute = useMemo(() => ROUTES.find((item) => item.name === route) ?? ROUTES[0], [route]);

  return (
    <section className="relative overflow-hidden border-t border-[#cfd8e1] bg-[#f4f7f9] py-24 text-[#111827]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.04)_1px,transparent_1px)] bg-[length:48px_48px]" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <h2 className="mb-6 font-display text-3xl font-bold uppercase tracking-tight text-[#0f172a] sm:text-4xl md:text-6xl">
              <span className="block sm:inline">Process &</span>
              <span className="block sm:inline sm:ml-[0.22em]">Equipment</span>
              <br />
              <span className="text-[#64748b]">Configurator.</span>
            </h2>
            <p className="max-w-xl text-base leading-8 text-[#4b5563] md:text-lg">
              Build a route from material, target particle size and capacity. The preview below changes as the selected route changes.
            </p>
          </div>
          <div className="hidden justify-self-end border border-[#c7d1da] bg-white/75 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#64748b] shadow-[0_12px_28px_rgba(15,23,42,0.06)] md:block">
            Route / Material / Particle / Capacity
          </div>
        </div>

        <div className="overflow-hidden border border-[#c8d2dc] bg-white shadow-[0_28px_86px_rgba(15,23,42,0.10)]">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="preserve-white relative overflow-hidden bg-[#111827] p-6 text-white md:p-8">
              <Image
                src="/images/backgrounds/LRadjusted-1.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover opacity-25 grayscale"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.70),rgba(17,24,39,0.96))]" />
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <span className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(242,101,34,0.16),transparent)] [animation:factory-scan_7.2s_linear_infinite] motion-reduce:animate-none" />
              </div>

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-5">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">Active Route</div>
                    <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight">{selectedRoute.name}</h3>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center border border-white/20 bg-white/10 text-[#F26522] animate-glow motion-reduce:animate-none">
                    <RouteIcon size={25} />
                  </div>
                </div>

                <p className="mb-8 text-sm leading-7 text-white/70">{selectedRoute.summary}</p>

                <div className="mb-8 space-y-2">
                  {ROUTES.map((item) => {
                    const active = route === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          setRoute(item.name);
                          setSubmitted(false);
                        }}
                        className={`relative flex w-full items-center justify-between overflow-hidden border px-4 py-3 text-left transition-colors ${
                          active
                            ? 'border-[#F26522] bg-[#F26522] text-white'
                            : 'border-white/10 bg-white/10 text-white/70 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        <span className="relative z-10 text-sm font-bold">{item.name}</span>
                        {active ? <Check size={16} className="relative z-10" /> : <ArrowRight size={15} className="relative z-10" />}
                        {active && (
                          <span className="absolute inset-x-0 bottom-0 h-1 bg-white/45 [animation:route-step-pulse_5.8s_ease-in-out_infinite] motion-reduce:animate-none" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="border border-white/10 bg-white/10 p-4">
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Route Modules</div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRoute.modules.map((module, index) => (
                      <div key={module} className="relative overflow-hidden border border-white/10 px-3 py-2 text-xs font-semibold text-white/75">
                        {module}
                        <span
                          className="absolute inset-x-0 bottom-0 h-px bg-[#F26522] [animation:spec-signal_4.4s_linear_infinite] motion-reduce:animate-none"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="p-6 md:p-8">
              <div className="mb-8 flex flex-col gap-4 border-b border-[#e0e7ee] pb-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#0f172a]">Parameter Panel</h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748b]">Material Specs for Analysis</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center bg-[#111827] text-white">
                  <SlidersHorizontal size={20} />
                </div>
              </div>

              <form
                className="space-y-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748b]">Material</span>
                    <input
                      type="text"
                      required
                      value={material}
                      onChange={(event) => {
                        setMaterial(event.target.value);
                        setSubmitted(false);
                      }}
                      placeholder="e.g. LFP, silica, alumina"
                      className="w-full border border-[#cfd8e1] bg-[#f7f9fb] px-4 py-3 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#F26522] focus:bg-white"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748b]">Target Particle Size</span>
                    <select
                      value={particleSize}
                      onChange={(event) => {
                        setParticleSize(event.target.value);
                        setSubmitted(false);
                      }}
                      className="w-full border border-[#cfd8e1] bg-[#f7f9fb] px-4 py-3 text-sm text-[#111827] outline-none transition-colors focus:border-[#F26522] focus:bg-white"
                    >
                      {PARTICLE_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748b]">Capacity</span>
                    <input
                      type="text"
                      value={capacity}
                      onChange={(event) => {
                        setCapacity(event.target.value);
                        setSubmitted(false);
                      }}
                      placeholder="kg/h or t/h"
                      className="w-full border border-[#cfd8e1] bg-[#f7f9fb] px-4 py-3 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#F26522] focus:bg-white"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748b]">Application Industry</span>
                    <select
                      value={industry}
                      onChange={(event) => {
                        setIndustry(event.target.value);
                        setSubmitted(false);
                      }}
                      className="w-full border border-[#cfd8e1] bg-[#f7f9fb] px-4 py-3 text-sm text-[#111827] outline-none transition-colors focus:border-[#F26522] focus:bg-white"
                    >
                      {INDUSTRIES.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#64748b]">Contact Information</span>
                  <textarea
                    required
                    rows={3}
                    placeholder="Name, company, email, and process notes"
                    className="w-full resize-none border border-[#cfd8e1] bg-[#f7f9fb] px-4 py-3 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#F26522] focus:bg-white"
                  />
                </label>

                <div className="relative grid gap-4 overflow-hidden border border-[#d6dee6] bg-[#f3f6f8] p-5 md:grid-cols-[0.78fr_1.22fr]">
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(242,101,34,0.82),transparent)] [animation:catalog-glide_4.6s_ease-in-out_infinite] motion-reduce:animate-none" />
                  <div>
                    <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748b]">
                      <ClipboardCheck size={14} className="text-[#F26522]" />
                      Recommendation Preview
                    </div>
                    <div className="font-display text-xl font-bold uppercase tracking-tight text-[#0f172a]">{route}</div>
                  </div>
                  <div className="space-y-2 text-sm leading-6 text-[#566272]">
                    <p>{selectedRoute.recommendation}</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      <div className="border border-[#d8e0e7] bg-white px-3 py-2">
                        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#8a95a1]">Material</div>
                        <div className="mt-1 font-semibold text-[#111827]">{material || 'Pending'}</div>
                      </div>
                      <div className="border border-[#d8e0e7] bg-white px-3 py-2">
                        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#8a95a1]">Target</div>
                        <div className="mt-1 font-semibold text-[#111827]">{particleSize}</div>
                      </div>
                      <div className="border border-[#d8e0e7] bg-white px-3 py-2">
                        <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#8a95a1]">Industry</div>
                        <div className="mt-1 font-semibold text-[#111827]">{industry}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {submitted && (
                  <div className="border border-[#F26522]/50 bg-[#fff7f2] p-5">
                    <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#a44619]">
                      <CheckCircle2 size={17} />
                      Staged Recommendation
                    </div>
                    <p className="text-sm leading-7 text-[#5a4438]">
                      LNPE should review a {route.toLowerCase()} route for {material || 'the submitted material'}, targeting {particleSize}
                      {capacity ? ` at ${capacity}` : ''}. First pass: {selectedRoute.recommendation}
                    </p>
                  </div>
                )}

                <button type="submit" className="group relative flex w-full items-center justify-between overflow-hidden bg-[#111827] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#F26522]">
                  <span className="absolute inset-y-0 left-0 w-12 -skew-x-12 bg-white/14 [animation:trust-sweep_4.6s_linear_infinite] motion-reduce:animate-none" />
                  <span className="relative z-10">{submitted ? 'Recommendation Staged' : 'Stage Recommendation'}</span>
                  <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-2" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: Gauge, title: 'Testing & Analysis', text: 'Laser particle analysis and electron microscopy support route validation.' },
            { icon: Layers3, title: 'R&D Capability', text: '20+ PhDs and professors support national projects and patent-backed process development.' },
            { icon: CheckCircle2, title: 'Industrial Delivery', text: 'Equipment selection connects lab trials with deployable production systems.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="border border-[#d3dce5] bg-white/75 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[#111827] text-[#F26522]">
                  <Icon size={18} />
                </div>
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#111827]">{item.title}</h4>
                <p className="mt-3 text-sm leading-6 text-[#64748b]">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
