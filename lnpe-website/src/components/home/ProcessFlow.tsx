'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Boxes, Fan, FlaskConical, Gauge, PackageCheck, Route as RouteIcon } from 'lucide-react';
import { ParticleFlow } from './ParticleFlow';

const ROUTES = [
  {
    name: 'Battery Materials',
    note: 'Strict D50 control and closed-loop classification for cathode and anode routes.',
    boost: 1.18,
  },
  {
    name: 'Mineral Powders',
    note: 'High-throughput grinding and separation for minerals, ceramics and inorganic materials.',
    boost: 0.96,
  },
  {
    name: 'Surface Modification',
    note: 'Morphology and coating modules for powder compatibility and downstream flowability.',
    boost: 1.05,
  },
] as const;

const STEPS = [
  {
    name: 'Feeding',
    detail: 'Metered input and dosing stability',
    body: 'Raw material is buffered and fed into the route at a controlled rate so downstream grinding remains stable.',
    output: 'Stable feed rate',
    icon: Boxes,
    intensity: 0.8,
  },
  {
    name: 'Grinding',
    detail: 'Micronization and impact control',
    body: 'Jet or mechanical energy is selected around material hardness, heat sensitivity and target particle size.',
    output: 'D50 target path',
    icon: Fan,
    intensity: 1.35,
  },
  {
    name: 'Classifying',
    detail: 'Particle size separation',
    body: 'Oversize particles return through the loop while qualified powder advances toward collection.',
    output: 'Cut point locked',
    icon: Gauge,
    intensity: 1.15,
  },
  {
    name: 'Modification',
    detail: 'Surface and morphology tuning',
    body: 'Optional modification modules tune surface behavior, shape and downstream material compatibility.',
    output: 'Surface tuned',
    icon: FlaskConical,
    intensity: 1,
  },
  {
    name: 'Collection',
    detail: 'Cyclone, filter and package flow',
    body: 'Cyclone, filter and packaging stages keep the system closed while preserving collection efficiency.',
    output: 'Closed discharge',
    icon: PackageCheck,
    intensity: 0.9,
  },
];

type RouteName = (typeof ROUTES)[number]['name'];

export function ProcessFlow() {
  const [routeName, setRouteName] = useState<RouteName>('Battery Materials');
  const [activeIndex, setActiveIndex] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || isInteracting) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % STEPS.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [isInteracting]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || isInteracting) return;

    const interval = window.setInterval(() => {
      setRouteName((current) => {
        const currentIndex = ROUTES.findIndex((route) => route.name === current);
        return ROUTES[(currentIndex + 1) % ROUTES.length].name;
      });
    }, 14000);

    return () => window.clearInterval(interval);
  }, [isInteracting]);

  const activeRoute = useMemo(() => ROUTES.find((route) => route.name === routeName) ?? ROUTES[0], [routeName]);
  const activeStep = STEPS[activeIndex];
  const ActiveIcon = activeStep.icon;
  const intensity = activeStep.intensity * activeRoute.boost;

  return (
    <section className="preserve-white relative overflow-hidden bg-[#0b0f14] py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/backgrounds/LRadjusted-59.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18] grayscale"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,20,0.94),rgba(11,15,20,0.86)_44%,rgba(11,15,20,0.96))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:56px_56px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-normal text-white sm:text-4xl md:text-6xl">
              Process Route Diagram
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-white/68 lg:justify-self-end">
            Particle flow is now the core technical module: route tabs, active nodes and a live step panel describe how LNPE connects feeding, grinding, classifying, modification and collection.
          </p>
        </div>

        <div
          className="overflow-hidden border border-white/14 bg-[#0f151d]/94 shadow-[0_34px_120px_rgba(0,0,0,0.36)] backdrop-blur"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          <div className="grid border-b border-white/12 bg-white/[0.045] md:grid-cols-[0.92fr_1.08fr]">
            <div className="flex items-center gap-3 border-b border-white/12 px-5 py-4 md:border-b-0 md:border-r md:px-7">
              <RouteIcon size={17} className="text-[#F26522]" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/44">Route selector</div>
                <div className="mt-1 text-sm font-bold uppercase tracking-[0.06em] text-white">{activeRoute.name}</div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto px-5 py-4 md:px-7">
              {ROUTES.map((route) => {
                const active = route.name === routeName;
                return (
                <button
                  key={route.name}
                  type="button"
                  onClick={() => setRouteName(route.name)}
                  className={`relative shrink-0 overflow-hidden border px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                      active
                        ? 'border-[#F26522] bg-[#F26522] text-white'
                        : 'border-white/12 bg-white/[0.055] text-white/58 hover:border-white/30 hover:text-white'
                    }`}
                    aria-pressed={active}
                  >
                    <span className="relative z-10">{route.name}</span>
                    {active && (
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-white/42 [animation:route-step-pulse_4.8s_ease-in-out_infinite] motion-reduce:animate-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.38fr_0.62fr]">
            <div className="overflow-x-auto border-b border-white/12 lg:overflow-visible lg:border-b-0 lg:border-r">
              <div className="relative min-h-[500px] min-w-[880px] overflow-hidden px-8 py-10 lg:min-w-0">
                <ParticleFlow activeIndex={activeIndex} intensity={intensity} theme="dark" />

                <div className="absolute inset-8 border border-white/8" />
                <div className="absolute left-10 right-10 top-[52%] h-px bg-white/12" />
                <div className="absolute left-10 right-10 top-[52%] h-px overflow-hidden">
                  <span className="absolute inset-y-0 left-0 w-1/2 origin-left bg-[linear-gradient(90deg,transparent,rgba(242,101,34,0.96),transparent)] [animation:route-beam_2.8s_linear_infinite] motion-reduce:animate-none" />
                </div>

                <div className="relative z-10 grid grid-cols-5 gap-4 pt-28">
                  {STEPS.map((step, index) => {
                    const Icon = step.icon;
                    const active = activeIndex === index;
                    return (
                      <button
                        key={step.name}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        className={`group relative min-h-[188px] overflow-hidden border p-4 text-left transition-colors ${
                          active
                            ? 'border-[#F26522] bg-white text-[#111827] shadow-[0_18px_38px_rgba(242,101,34,0.16)]'
                            : 'border-white/12 bg-white/[0.075] text-white/66 hover:border-[#F26522] hover:text-white'
                        }`}
                        aria-pressed={active}
                      >
                        <div className="mb-5 flex items-center justify-between">
                          <span
                            className={`flex h-11 w-11 items-center justify-center border ${
                              active ? 'border-[#F26522] bg-[#F26522] text-white' : 'border-white/14 bg-white/[0.06] text-[#F26522]'
                            }`}
                          >
                            <Icon size={21} />
                          </span>
                          <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${active ? 'text-[#8a95a1]' : 'text-white/38'}`}>
                            0{index + 1}
                          </span>
                        </div>
                        <div className={`font-display text-lg font-bold uppercase tracking-normal ${active ? 'text-[#0f172a]' : 'text-white'}`}>
                          {step.name}
                        </div>
                        <div className={`mt-3 text-xs leading-5 ${active ? 'text-[#64748b]' : 'text-white/52'}`}>
                          {step.detail}
                        </div>
                        {active && (
                          <span className="absolute inset-x-0 bottom-0 h-1 origin-right bg-[#F26522] [animation:route-step-pulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="absolute bottom-8 left-8 right-8 z-10 flex items-center justify-between border-t border-white/12 pt-5">
                  <span className="max-w-xl font-mono text-[11px] uppercase tracking-[0.2em] text-white/48">
                    {activeRoute.note}
                  </span>
                  <span className="relative h-2 w-40 overflow-hidden bg-white/12" aria-hidden="true">
                    <span className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#F26522] via-[#1E5F8A] to-white/60 [animation:route-progress_2.8s_linear_infinite] motion-reduce:animate-none" />
                  </span>
                </div>
              </div>
            </div>

            <aside className="bg-[#111827] p-6 text-white md:p-8">
              <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">Active Step</div>
                  <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-normal">{activeStep.name}</h3>
                </div>
                <div className="flex h-14 w-14 items-center justify-center border border-white/20 bg-white/10 text-[#F26522] animate-glow motion-reduce:animate-none">
                  <ActiveIcon size={25} />
                </div>
              </div>

              <p className="text-sm leading-7 text-white/70">{activeStep.body}</p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between border border-white/10 bg-white/10 px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Output</span>
                  <span className="text-sm font-bold">{activeStep.output}</span>
                </div>
                <div className="flex items-center justify-between border border-white/10 bg-white/10 px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Particle Load</span>
                  <span className="text-sm font-bold">{Math.round(intensity * 100)}%</span>
                </div>
                <div className="flex items-center justify-between border border-white/10 bg-white/10 px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Route</span>
                  <span className="text-sm font-bold">{activeRoute.name}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
