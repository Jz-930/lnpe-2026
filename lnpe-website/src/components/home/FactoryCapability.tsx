'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Beaker, Factory, PackageCheck } from 'lucide-react';

const CAPABILITIES = [
  {
    name: 'Manufacturing',
    icon: Factory,
    image: '/images/backgrounds/LRadjusted-1.webp',
    headline: 'Factory floor capacity for complete powder processing systems.',
    body: 'LNPE combines welding, assembly, mechanical finishing and system integration inside the same industrial workflow, reducing the gap between process design and delivery.',
    metrics: [
      { label: 'Core build', value: 'Mills / classifiers' },
      { label: 'Workshop mode', value: 'System assembly' },
      { label: 'Scale signal', value: 'Production lines' },
    ],
  },
  {
    name: 'R&D Validation',
    icon: Beaker,
    image: '/images/backgrounds/LRadjusted-59.webp',
    headline: 'Material trials before production commitments.',
    body: 'Particle target, material behavior and route selection can be validated through testing and analysis before the production route is locked.',
    metrics: [
      { label: 'Test focus', value: 'Particle size' },
      { label: 'Route logic', value: 'Trial to pilot' },
      { label: 'Analysis', value: 'SEM / laser' },
    ],
  },
  {
    name: 'Delivery',
    icon: PackageCheck,
    image: '/images/backgrounds/LRadjusted-193.webp',
    headline: 'Project delivery built around integrated routes, not loose machines.',
    body: 'A configured system can connect dosing, grinding, classification, collection and controls into a line that matches the material and throughput requirement.',
    metrics: [
      { label: 'Scope', value: 'Turnkey EPC' },
      { label: 'Controls', value: 'Closed route' },
      { label: 'Coverage', value: '20+ countries' },
    ],
  },
] as const;

type CapabilityName = (typeof CAPABILITIES)[number]['name'];

export function FactoryCapability() {
  const [active, setActive] = useState<CapabilityName>('Manufacturing');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      setActive((current) => {
        const currentIndex = CAPABILITIES.findIndex((item) => item.name === current);
        return CAPABILITIES[(currentIndex + 1) % CAPABILITIES.length].name;
      });
    }, 6200);

    return () => window.clearInterval(interval);
  }, []);

  const capability = useMemo(
    () => CAPABILITIES.find((item) => item.name === active) ?? CAPABILITIES[0],
    [active]
  );
  const ActiveIcon = capability.icon;

  return (
    <section className="preserve-white relative overflow-hidden bg-[#0b0f14] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_14%,rgba(242,101,34,0.14),transparent_28%),linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,54px_54px,54px_54px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-normal text-white sm:text-4xl md:text-6xl">
              Factory Capability
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
              A darker factory band gives the homepage industrial weight between the clean catalog and the technical route diagram.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 lg:justify-self-end">
            {CAPABILITIES.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(item.name)}
                  className={`relative flex items-center justify-between overflow-hidden border px-4 py-3 text-left transition-colors ${
                    isActive
                      ? 'border-[#F26522] bg-[#F26522] text-white'
                      : 'border-white/14 bg-white/8 text-white/66 hover:border-white/35 hover:text-white'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.18em]">{item.name}</span>
                  <Icon size={16} className="relative z-10" />
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-white/45 [animation:route-step-pulse_6.2s_ease-in-out_infinite] motion-reduce:animate-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid overflow-hidden border border-white/14 bg-white/[0.04] shadow-[0_34px_110px_rgba(0,0,0,0.34)] lg:grid-cols-[1.18fr_0.82fr]">
          <div className="relative min-h-[430px] overflow-hidden md:min-h-[560px]">
            <Image
              key={capability.image}
              src={capability.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover opacity-[0.84] transition-transform duration-500 [animation:factory-photo-drift_22s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,15,20,0.22),rgba(11,15,20,0.04)_48%,rgba(11,15,20,0.62)),linear-gradient(180deg,transparent,rgba(11,15,20,0.82))]" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(242,101,34,0.18),transparent)] [animation:factory-scan_6.4s_linear_infinite] motion-reduce:animate-none" />
            </div>
            <div className="absolute left-6 top-6 border border-white/20 bg-black/28 px-4 py-3 backdrop-blur-md">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/58">Active view</div>
              <div className="mt-2 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.08em] text-white">
                <ActiveIcon size={17} className="text-[#F26522]" />
                {capability.name}
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
              {capability.metrics.map((metric) => (
                <div key={metric.label} className="border border-white/16 bg-black/34 px-4 py-3 backdrop-blur-md">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/46">{metric.label}</div>
                  <div className="mt-2 text-sm font-bold uppercase tracking-[0.05em] text-white">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between bg-[#101722] p-6 md:p-9">
            <div>
              <div className="mb-6 h-px w-20 bg-[#F26522]" />
              <h3 className="font-display text-3xl font-bold uppercase tracking-normal text-white md:text-5xl">
                {capability.headline}
              </h3>
              <p className="mt-6 text-sm leading-7 text-white/68 md:text-base md:leading-8">
                {capability.body}
              </p>
            </div>

            <div className="mt-10 border-t border-white/12 pt-6">
              <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/44">
                Capability route
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/72">
                <span className="border border-white/12 bg-white/8 px-3 py-2">Trial</span>
                <ArrowRight size={15} className="text-[#F26522]" />
                <span className="border border-white/12 bg-white/8 px-3 py-2">Process Design</span>
                <ArrowRight size={15} className="text-[#F26522]" />
                <span className="border border-white/12 bg-white/8 px-3 py-2">Production System</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
