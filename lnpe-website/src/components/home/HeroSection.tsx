import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, MoveDown, RadioTower } from 'lucide-react';

const SPEC_RAIL = [
  { label: 'Lab Trial', value: 'Material testing' },
  { label: 'Scale Up', value: 'Pilot to line' },
  { label: 'Core Routes', value: 'Grind / Classify' },
  { label: 'Delivery', value: '20+ countries' },
];

export function HeroSection() {
  return (
    <section className="preserve-white relative isolate min-h-[calc(100svh-88px)] overflow-hidden bg-[#0b0f14] text-white">
      <Image
        src="/images/backgrounds/LRadjusted-287.webp"
        alt="LNPE factory exterior and company signage"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover object-[18%_52%] opacity-95 [animation:hero-photo-drift_28s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
      />

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_74%_42%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(90deg,rgba(7,10,14,0.82)_0%,rgba(7,10,14,0.54)_32%,rgba(7,10,14,0.28)_55%,rgba(7,10,14,0.74)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(7,10,14,0.28),rgba(7,10,14,0.08)_35%,rgba(7,10,14,0.84)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:64px_64px] opacity-45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-white/30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[#0b0f14] to-transparent" />
      <div
        aria-hidden="true"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 24,
          width: 'min(86vw, 1080px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 'clamp(34px, 7vw, 112px)',
            width: 1,
            height: '54vh',
            minHeight: 320,
            maxHeight: 560,
            borderRadius: 999,
            background:
              'linear-gradient(180deg, transparent, rgba(242,101,34,0.10), rgba(242,101,34,0.82), rgba(255,255,255,0.62), rgba(242,101,34,0.18), transparent)',
            boxShadow: '0 0 10px rgba(242,101,34,0.62), 0 0 28px rgba(242,101,34,0.24)',
            animation: 'hero-orange-scan-motion 5.8s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 'clamp(230px, 29vw, 520px)',
            width: 1,
            height: '50vh',
            minHeight: 300,
            maxHeight: 520,
            borderRadius: 999,
            background:
              'linear-gradient(180deg, transparent, rgba(242,101,34,0.08), rgba(242,101,34,0.68), rgba(255,255,255,0.46), rgba(242,101,34,0.14), transparent)',
            boxShadow: '0 0 9px rgba(242,101,34,0.48), 0 0 24px rgba(242,101,34,0.18)',
            animation: 'hero-orange-scan-motion 6.6s linear infinite',
            animationDelay: '-2.4s',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '22%',
            left: 'clamp(34px, 7vw, 112px)',
            height: 1,
            width: 'min(56vw, 620px)',
            overflow: 'hidden',
            background: 'linear-gradient(90deg, rgba(242,101,34,0.16), rgba(242,101,34,0.05), transparent)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              inset: 0,
              width: '42%',
              background: 'linear-gradient(90deg, transparent, rgba(242,101,34,0.78), rgba(255,255,255,0.52), transparent)',
              boxShadow: '0 0 12px rgba(242,101,34,0.28)',
              animation: 'hero-orange-horizontal-scan 5.2s linear infinite',
            }}
          />
        </span>
        <span
          style={{
            position: 'absolute',
            top: '43%',
            left: 'clamp(120px, 16vw, 260px)',
            height: 1,
            width: 'min(38vw, 420px)',
            overflow: 'hidden',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(242,101,34,0.08), transparent)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              inset: 0,
              width: '46%',
              background: 'linear-gradient(90deg, transparent, rgba(242,101,34,0.54), rgba(255,255,255,0.34), transparent)',
              boxShadow: '0 0 10px rgba(242,101,34,0.18)',
              animation: 'hero-orange-horizontal-scan 6.1s linear infinite',
              animationDelay: '-1.8s',
            }}
          />
        </span>
        <span
          style={{
            position: 'absolute',
            top: '67%',
            left: 'clamp(72px, 11vw, 190px)',
            height: 1,
            width: 'min(66vw, 760px)',
            overflow: 'hidden',
            background: 'linear-gradient(90deg, rgba(242,101,34,0.10), rgba(242,101,34,0.04), transparent)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              inset: 0,
              width: '36%',
              background: 'linear-gradient(90deg, transparent, rgba(242,101,34,0.64), rgba(255,255,255,0.38), transparent)',
              boxShadow: '0 0 11px rgba(242,101,34,0.22)',
              animation: 'hero-orange-horizontal-scan 6.8s linear infinite',
              animationDelay: '-3.1s',
            }}
          />
        </span>
      </div>

      <div className="relative z-20 mx-auto flex min-h-[calc(100svh-88px)] w-full max-w-[1440px] flex-col justify-between px-6 pb-8 pt-12 sm:pt-16 lg:pb-10 lg:pt-20">
        <div className="ml-auto min-w-0 w-full max-w-full pt-4 text-right sm:max-w-[860px] sm:pt-8 lg:w-[660px] lg:max-w-[660px] lg:pt-10">
          <div className="mb-6 ml-auto h-px w-20 bg-[#F26522]" aria-hidden="true" />

          <h1 className="ml-auto max-w-[11ch] font-display text-5xl font-bold uppercase leading-[0.96] tracking-normal text-white drop-shadow-[0_10px_34px_rgba(0,0,0,0.42)] sm:text-6xl md:text-7xl">
            <span className="block">Powder</span>
            <span className="block">Systems</span>
            <span className="block">Engineered</span>
            <span className="block">for Scale</span>
          </h1>

          <p className="ml-auto mt-7 max-w-full break-words text-base leading-7 text-white/78 sm:max-w-[690px] sm:text-lg md:text-xl md:leading-9">
            From lab trial to production line, LNPE builds grinding, classifying and particle modification systems for demanding powder materials.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Link
              href="/contact-us"
              className="group relative inline-flex w-full max-w-full items-center justify-center gap-3 overflow-hidden bg-[#F26522] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_18px_42px_rgba(242,101,34,0.28)] transition-colors hover:bg-white hover:text-[#111827] sm:w-auto"
            >
              <span className="absolute inset-y-0 left-0 w-12 -skew-x-12 bg-white/18 [animation:trust-sweep_4.2s_linear_infinite] motion-reduce:animate-none" />
              <span className="relative z-10 inline-flex items-center gap-3">
                Configure a Route
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/products"
              className="group inline-flex w-full max-w-full items-center justify-center gap-3 border border-white/30 bg-white/10 px-6 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-[#111827] sm:w-auto"
            >
              View Systems
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="ml-auto mt-10 grid w-full max-w-[980px] grid-cols-2 border border-white/18 bg-[#0d1218]/72 text-right shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-md sm:grid-cols-4 lg:w-[980px]">
          {SPEC_RAIL.map((item, index) => (
            <div key={item.label} className="relative overflow-hidden px-4 py-4 sm:px-5 sm:py-5">
              {index > 0 && <div className="absolute left-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-white/14 sm:block" />}
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">{item.label}</div>
              <div className="mt-2 text-sm font-bold uppercase tracking-[0.04em] text-white">{item.value}</div>
              <span className="absolute inset-x-4 bottom-0 h-px overflow-hidden bg-white/8">
                <span
                  className="absolute inset-y-0 right-0 w-1/2 bg-[#F26522] [animation:spec-signal_3.6s_linear_infinite] motion-reduce:animate-none"
                  style={{ animationDelay: `${index * 0.22}s` }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-7 right-6 z-20 hidden items-center gap-2 text-white/52 md:flex">
        <RadioTower size={15} className="text-[#F26522]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em]">Scroll for system route</span>
        <MoveDown size={15} className="animate-bounce motion-reduce:animate-none" />
      </div>
    </section>
  );
}
