'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale } from '@/i18n/LocaleProvider';
import { homeMessages } from '@/i18n/messages/home';
import { getHomeInsights } from '@/content/home-insights';
import MediaLightbox from '@/components/content/MediaLightbox';
import { HomeInsightPanel } from './HomeInsightPanel';
import { ArrowLeft, ArrowRight, Beaker, Factory, PackageCheck, Pause, Play } from 'lucide-react';
import styles from './HomeMobile.module.css';
import { useCompactHome, useTouchHome } from './useCompactHome';

const CAPABILITIES = [
  { name: 'Manufacturing', icon: Factory, image: '/images/backgrounds/LRadjusted-1.webp' },
  { name: 'R&D Validation', icon: Beaker, image: '/images/backgrounds/LRadjusted-59.webp' },
  { name: 'Delivery', icon: PackageCheck, image: '/images/backgrounds/LRadjusted-193.webp' },
] as const;

type CapabilityName = (typeof CAPABILITIES)[number]['name'];

export function FactoryCapability() {
  const locale = useLocale();
  const t = homeMessages[locale].factory;
  const interaction = homeMessages[locale].interactions;
  const insights = useMemo(() => getHomeInsights(locale).factory, [locale]);
  const [active, setActive] = useState<CapabilityName>('Manufacturing');
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const compact = useCompactHome();
  const touch = useTouchHome();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (compact || touch || reducedMotion || paused || hovered || focused || expanded || lightbox) return;

    const interval = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setActive((current) => {
        const currentIndex = CAPABILITIES.findIndex((item) => item.name === current);
        return CAPABILITIES[(currentIndex + 1) % CAPABILITIES.length].name;
      });
    }, 6200);

    return () => window.clearInterval(interval);
  }, [compact, touch, paused, hovered, focused, expanded, lightbox]);

  const capability = useMemo(
    () => CAPABILITIES.find((item) => item.name === active) ?? CAPABILITIES[0],
    [active]
  );
  const ActiveIcon = capability.icon;
  const content = t.capabilities[capability.name];
  const preview = (name: CapabilityName) => { if (name !== active) { setActive(name); setExpanded(false); } };
  const select = (name: CapabilityName) => { setActive(name); setPaused(true); setExpanded(!compact); };
  const move = (direction: number) => {
    const index = CAPABILITIES.findIndex((item) => item.name === active);
    select(CAPABILITIES[(index + direction + CAPABILITIES.length) % CAPABILITIES.length].name);
  };

  return (
    <section className={`${styles.section} preserve-white relative overflow-hidden bg-[#0b0f14] py-24 text-white`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_14%,rgba(242,101,34,0.14),transparent_28%),linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:auto,54px_54px,54px_54px]" />

      <div className="container relative z-10 mx-auto px-6" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className={`${styles.sectionHeading} mb-10 grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end`}>
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-normal text-white sm:text-4xl md:text-6xl">
              {t.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
              {t.description}
            </p>
          </div>

          <div className={`${styles.factoryTabs} grid gap-2 sm:grid-cols-3 lg:justify-self-end`}>
            {CAPABILITIES.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => select(item.name)}
                  onPointerEnter={(event) => { if (event.pointerType === 'mouse') preview(item.name); }}
                  onFocus={() => preview(item.name)}
                  className={`relative flex items-center justify-between overflow-hidden border px-4 py-3 text-left transition-colors ${
                    isActive
                      ? 'border-[#F26522] bg-[#F26522] text-white'
                      : 'border-white/14 bg-white/8 text-white/66 hover:border-white/35 hover:text-white'
                  }`}
                  aria-pressed={isActive}
                  aria-expanded={compact ? undefined : isActive && expanded}
                  aria-controls={compact ? 'factory-active-summary' : 'factory-capability-detail'}
                >
                  <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.18em]">{t.capabilities[item.name].name}</span>
                  <Icon size={16} className="relative z-10" />
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-white/45 [animation:route-step-pulse_6.2s_ease-in-out_infinite] motion-reduce:animate-none" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`${styles.desktopControls} mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60`}>
          <span className={styles.hoverHint}>{interaction.previewHint}</span>
          <span className={styles.touchHint}>{locale === 'zh' ? '点按切换能力，点按图片放大' : 'Tap to switch capability. Tap the photo to enlarge.'}</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => move(-1)} aria-label={interaction.previous} className="border border-white/20 p-2 hover:text-[#F26522] focus-visible:outline-2 focus-visible:outline-[#F26522]"><ArrowLeft size={16} /></button>
            <button type="button" onClick={() => { setPaused(!paused); if (paused) setExpanded(false); }} aria-pressed={paused} className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 hover:text-[#F26522] focus-visible:outline-2 focus-visible:outline-[#F26522]">{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? interaction.resume : interaction.pause}</button>
            <button type="button" onClick={() => move(1)} aria-label={interaction.next} className="border border-white/20 p-2 hover:text-[#F26522] focus-visible:outline-2 focus-visible:outline-[#F26522]"><ArrowRight size={16} /></button>
          </div>
        </div>

        <div className="grid overflow-hidden border border-white/14 bg-white/[0.04] shadow-[0_34px_110px_rgba(0,0,0,0.34)] lg:grid-cols-[1.18fr_0.82fr]">
          <div className={`${styles.factoryPhoto} group/factory-photo relative min-h-[430px] overflow-hidden md:min-h-[560px]`}>
            <div className={styles.factoryMedia}>
            <Image
              key={capability.image}
              src={capability.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover opacity-[0.84] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/factory-photo:scale-[1.02] [animation:factory-photo-drift_22s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,15,20,0.22),rgba(11,15,20,0.04)_48%,rgba(11,15,20,0.62)),linear-gradient(180deg,transparent,rgba(11,15,20,0.82))]" />
            <button type="button" onClick={() => setLightbox(true)} aria-label={`${interaction.enlarge}: ${content.name}`} className="absolute inset-0 z-[1] cursor-zoom-in focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#F26522]" />
            <span className={styles.factoryZoomHint} aria-hidden="true">{locale === 'zh' ? '点按放大 ↗' : 'Tap to enlarge ↗'}</span>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(242,101,34,0.18),transparent)] [animation:factory-scan_6.4s_linear_infinite] motion-reduce:animate-none" />
            </div>
            <div className={`${styles.factoryView} pointer-events-none absolute left-6 top-20 z-[2] border border-white/20 bg-black/28 px-4 py-3 backdrop-blur-md sm:top-6`}>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/58">{t.activeView}</div>
              <div className="mt-2 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.08em] text-white">
                <ActiveIcon size={17} className="text-[#F26522]" />
                {content.name}
              </div>
            </div>
            </div>
            <div className={`${styles.factoryMetrics} pointer-events-none absolute bottom-6 left-6 right-6 z-[2] grid gap-3 sm:grid-cols-3`}>
              {content.metrics.map((metric) => (
                <div key={metric.label} className="border border-white/16 bg-black/34 px-4 py-3 backdrop-blur-md">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/46">{metric.label}</div>
                  <div className="mt-2 text-sm font-bold uppercase tracking-[0.05em] text-white">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="factory-active-summary" className={`${styles.factoryText} flex flex-col justify-between bg-[#101722] p-6 md:p-9`}>
            <div>
              <div className="mb-6 h-px w-20 bg-[#F26522]" />
              <h3 className="font-display text-3xl font-bold uppercase tracking-normal text-white md:text-5xl">
                {content.headline}
              </h3>
              <p className="mt-6 text-sm leading-7 text-white/68 md:text-base md:leading-8">
                {content.body}
              </p>
              <button type="button" onClick={() => { setExpanded(!expanded); setPaused(true); }} aria-expanded={expanded} aria-controls="factory-capability-detail" className="mt-5 inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:border-[#F26522] hover:text-[#F26522] focus-visible:outline-2 focus-visible:outline-[#F26522]">{expanded ? interaction.closeDetails : interaction.capabilityDetails}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
            </div>

            <div className="mt-10 border-t border-white/12 pt-6">
              <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/44">
                {t.capabilityRoute}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white/72">
                <span className="border border-white/12 bg-white/8 px-3 py-2">{t.routeStages[0]}</span>
                <ArrowRight size={15} className="text-[#F26522]" />
                <span className="border border-white/12 bg-white/8 px-3 py-2">{t.routeStages[1]}</span>
                <ArrowRight size={15} className="text-[#F26522]" />
                <span className="border border-white/12 bg-white/8 px-3 py-2">{t.routeStages[2]}</span>
              </div>
            </div>
          </div>
        </div>
        {expanded && <HomeInsightPanel key={active} id="factory-capability-detail" insight={insights[active]} dark onClose={() => setExpanded(false)} />}
        {lightbox && <MediaLightbox images={[{ src: capability.image, alt: content.name }, ...insights[active].images]} onClose={() => setLightbox(false)} />}
      </div>
    </section>
  );
}
