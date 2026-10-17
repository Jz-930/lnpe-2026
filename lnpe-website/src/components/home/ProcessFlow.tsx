'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale } from '@/i18n/LocaleProvider';
import { homeMessages } from '@/i18n/messages/home';
import { getHomeInsights } from '@/content/home-insights';
import { ArrowLeft, ArrowRight, Boxes, Fan, FlaskConical, Gauge, PackageCheck, Pause, Play, Route as RouteIcon } from 'lucide-react';
import { ParticleFlow } from './ParticleFlow';
import { HomeInsightPanel } from './HomeInsightPanel';
import styles from './HomeMobile.module.css';
import { useCompactHome, useTouchHome } from './useCompactHome';

const ROUTES = [
  { name: 'Battery Materials', boost: 1.18 },
  { name: 'Mineral Powders', boost: 0.96 },
  { name: 'Surface Modification', boost: 1.05 },
] as const;

const STEPS = [
  { name: 'Feeding', icon: Boxes, intensity: 0.8 },
  { name: 'Grinding', icon: Fan, intensity: 1.35 },
  { name: 'Classifying', icon: Gauge, intensity: 1.15 },
  { name: 'Modification', icon: FlaskConical, intensity: 1 },
  { name: 'Collection', icon: PackageCheck, intensity: 0.9 },
] as const;

type RouteName = (typeof ROUTES)[number]['name'];

export function ProcessFlow() {
  const locale = useLocale();
  const t = homeMessages[locale].process;
  const interaction = homeMessages[locale].interactions;
  const insights = useMemo(() => getHomeInsights(locale).process, [locale]);
  const [routeName, setRouteName] = useState<RouteName>('Battery Materials');
  const [activeIndex, setActiveIndex] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const compact = useCompactHome();
  const touch = useTouchHome();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (compact || touch || reducedMotion || hovered || focused || paused || expanded) return;

    const interval = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setActiveIndex((current) => (current + 1) % STEPS.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [compact, touch, hovered, focused, paused, expanded]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (compact || touch || reducedMotion || hovered || focused || paused || expanded) return;

    const interval = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setRouteName((current) => {
        const currentIndex = ROUTES.findIndex((route) => route.name === current);
        return ROUTES[(currentIndex + 1) % ROUTES.length].name;
      });
    }, 14000);

    return () => window.clearInterval(interval);
  }, [compact, touch, hovered, focused, paused, expanded]);

  const activeRoute = useMemo(() => ROUTES.find((route) => route.name === routeName) ?? ROUTES[0], [routeName]);
  const activeStep = STEPS[activeIndex];
  const ActiveIcon = activeStep.icon;
  const routeContent = t.routes[activeRoute.name];
  const stepContent = t.steps[activeStep.name];
  const intensity = activeStep.intensity * activeRoute.boost;
  const insight = insights[activeStep.name];
  const previewStep = (index: number) => { if (index !== activeIndex) { setActiveIndex(index); setExpanded(false); } };
  const selectStep = (index: number) => { setActiveIndex(index); setPaused(true); setExpanded(true); };

  return (
    <section className={`${styles.section} preserve-white relative overflow-hidden bg-[#0b0f14] py-24 text-white`}>
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

      <div className="container relative z-10 mx-auto px-6" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className={`${styles.sectionHeading} mb-12 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end`}>
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-normal text-white sm:text-4xl md:text-6xl">
              {t.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-white/68 lg:justify-self-end">
            {t.description}
          </p>
        </div>

        <div
          className="overflow-hidden border border-white/14 bg-[#0f151d]/94 shadow-[0_34px_120px_rgba(0,0,0,0.36)] backdrop-blur"
        >
          <div className={`${styles.processHeader} grid border-b border-white/12 bg-white/[0.045] md:grid-cols-[0.92fr_1.08fr]`}>
            <div className="flex items-center gap-3 border-b border-white/12 px-5 py-4 md:border-b-0 md:border-r md:px-7">
              <RouteIcon size={17} className="text-[#F26522]" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/44">{t.routeSelector}</div>
                <div className="mt-1 text-sm font-bold uppercase tracking-[0.06em] text-white">{routeContent.name}</div>
              </div>
            </div>

            <div className={`${styles.scrollRail} ${styles.processRoutes} flex gap-2 overflow-x-auto px-5 py-4 md:px-7`}>
              {ROUTES.map((route) => {
                const active = route.name === routeName;
                return (
                <button
                  key={route.name}
                  type="button"
                  onClick={() => { setRouteName(route.name); setPaused(true); }}
                  className={`relative shrink-0 overflow-hidden border px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                      active
                        ? 'border-[#F26522] bg-[#F26522] text-white'
                        : 'border-white/12 bg-white/[0.055] text-white/58 hover:border-white/30 hover:text-white'
                    }`}
                    aria-pressed={active}
                    aria-controls={compact ? 'process-mobile-route-note' : 'process-route-note'}
                  >
                    <span className="relative z-10">{t.routes[route.name].name}</span>
                    {active && (
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-white/42 [animation:route-step-pulse_4.8s_ease-in-out_infinite] motion-reduce:animate-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div id="process-route-note" role="status" aria-live="polite" aria-atomic="true" className="hidden border-b border-white/12 bg-[#F26522]/[0.055] px-7 py-3 lg:block">
            <p className="border-l-2 border-[#F26522] pl-3 text-sm leading-7 text-white/75">{routeContent.note}</p>
          </div>

          <div className={styles.mobileSteps}>
            <p id="process-mobile-route-note">{routeContent.note}</p>
            <p>{locale === 'zh' ? '左右滑动工序，点按查看工艺' : 'Swipe the stages. Tap to explore a process.'}</p>
            <div className={`${styles.scrollRail} ${styles.mobileStepRail}`} aria-label={t.activeStep}>
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                return <button key={step.name} type="button" aria-pressed={activeIndex === index} aria-controls="process-active-summary" onClick={(event) => {
                  setActiveIndex(index);
                  setExpanded(false);
                  setPaused(true);
                  const rail = event.currentTarget.parentElement;
                  if (rail) rail.scrollTo({ left: event.currentTarget.offsetLeft - rail.offsetLeft - 16, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
                }}>
                  <span><Icon size={22} aria-hidden="true" /><small>0{index + 1}</small></span>
                  <strong>{t.steps[step.name].name}</strong>
                </button>;
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.38fr_0.62fr]">
            <div className={`${styles.desktopDiagram} overflow-x-auto border-b border-white/12 lg:overflow-visible lg:border-b-0 lg:border-r`}>
              <div className="relative min-h-[500px] min-w-[880px] overflow-hidden px-8 py-10 lg:min-w-0">
                {!compact && <ParticleFlow activeIndex={activeIndex} intensity={intensity} theme="dark" />}

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
                        onClick={() => selectStep(index)}
                        onPointerEnter={(event) => { if (event.pointerType === 'mouse') previewStep(index); }}
                        onFocus={() => previewStep(index)}
                        className={`group relative min-h-[188px] overflow-hidden border p-4 text-left transition-colors ${
                          active
                            ? 'border-[#F26522] bg-white text-[#111827] shadow-[0_18px_38px_rgba(242,101,34,0.16)]'
                            : 'border-white/12 bg-white/[0.075] text-white/66 hover:border-[#F26522] hover:text-white'
                        }`}
                        aria-pressed={active}
                        aria-expanded={active && expanded}
                        aria-controls="process-step-detail"
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
                        <div className={`font-display text-sm font-bold uppercase leading-snug tracking-normal [overflow-wrap:anywhere] ${active ? 'text-[#0f172a]' : 'text-white'}`}>
                          {t.steps[step.name].name}
                        </div>
                        <div className={`mt-3 text-xs leading-5 ${active ? 'text-[#64748b]' : 'text-white/52'}`}>
                          {t.steps[step.name].detail}
                        </div>
                        {active && (
                          <span className="absolute inset-x-0 bottom-0 h-1 origin-right bg-[#F26522] [animation:route-step-pulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="absolute bottom-8 left-8 right-8 z-10 flex items-center justify-end border-t border-white/12 pt-5">
                  <span className="relative h-2 w-40 overflow-hidden bg-white/12" aria-hidden="true">
                    <span className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#F26522] via-[#1E5F8A] to-white/60 [animation:route-progress_2.8s_linear_infinite] motion-reduce:animate-none" />
                  </span>
                </div>
              </div>
            </div>

            <aside id="process-active-summary" className={`${styles.processAside} bg-[#111827] p-6 text-white md:p-8`}>
              <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-5">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">{t.activeStep}</div>
                  <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-normal">{stepContent.name}</h3>
                </div>
                <div className="flex h-14 w-14 items-center justify-center border border-white/20 bg-white/10 text-[#F26522] animate-glow motion-reduce:animate-none">
                  <ActiveIcon size={25} />
                </div>
              </div>

              <p className="text-sm leading-7 text-white/70">{stepContent.body}</p>

              <button type="button" onClick={() => { setExpanded(!expanded); setPaused(true); }} aria-expanded={expanded} aria-controls="process-step-detail" className="group mt-5 block w-full overflow-hidden border border-white/20 text-left transition-colors hover:border-[#F26522] focus-visible:outline-2 focus-visible:outline-[#F26522]">
                <span className="relative block aspect-[16/9] overflow-hidden"><Image src={insight.images[0].src} alt={insight.images[0].alt} fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.025]" /></span>
                <span className="flex items-center justify-between gap-3 px-4 py-3 text-xs font-semibold">{expanded ? interaction.closeDetails : interaction.openDetails}<span aria-hidden="true">{expanded ? '−' : '+'}</span></span>
              </button>

              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between border border-white/10 bg-white/10 px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{t.output}</span>
                  <span className="text-sm font-bold">{stepContent.output}</span>
                </div>
                <div className="flex items-center justify-between border border-white/10 bg-white/10 px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{t.particleLoad}</span>
                  <span className="text-sm font-bold">{Math.round(intensity * 100)}%</span>
                </div>
                <div className="flex items-center justify-between border border-white/10 bg-white/10 px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{t.route}</span>
                  <span className="text-sm font-bold">{routeContent.name}</span>
                </div>
              </div>
            </aside>
          </div>
          <div className={`${styles.desktopControls} flex flex-wrap items-center justify-between gap-3 border-t border-white/12 px-5 py-4 text-xs text-white/60`}>
            <span className={styles.hoverHint}>{interaction.previewHint}</span>
            <span className={styles.touchHint}>{locale === 'zh' ? '点按工序查看详情，使用箭头切换' : 'Tap a stage for details, or use the arrows to explore.'}</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => selectStep((activeIndex + STEPS.length - 1) % STEPS.length)} aria-label={interaction.previous} className="border border-white/20 p-2 hover:text-[#F26522] focus-visible:outline-2 focus-visible:outline-[#F26522]"><ArrowLeft size={16} /></button>
              <button type="button" onClick={() => { setPaused(!paused); if (paused) setExpanded(false); }} aria-pressed={paused} className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 hover:text-[#F26522] focus-visible:outline-2 focus-visible:outline-[#F26522]">{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? interaction.resume : interaction.pause}</button>
              <button type="button" onClick={() => selectStep((activeIndex + 1) % STEPS.length)} aria-label={interaction.next} className="border border-white/20 p-2 hover:text-[#F26522] focus-visible:outline-2 focus-visible:outline-[#F26522]"><ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
        {expanded && <HomeInsightPanel key={activeStep.name} id="process-step-detail" insight={insight} dark onClose={() => setExpanded(false)} />}
      </div>
    </section>
  );
}
