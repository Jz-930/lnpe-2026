'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { PowderProcessIcon, powderProcessSteps } from './PowderProcessIcon';
import { getProcessInsights } from '@/content/process-insights';
import { useLocale } from '@/i18n/LocaleProvider';
import InteractiveImage from '@/components/content/InteractiveImage';
import styles from './ApplicationProcess.module.css';

export default function ApplicationProcess({ labels }: { labels: string[] }) {
  const locale = useLocale();
  const zh = locale === 'zh';
  const items = getProcessInsights(locale);
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const steps = useRef<HTMLOListElement>(null);
  const active = items[selected];
  const compactLabels = zh ? ['进料', '粉碎', '分级', '整形', '收集'] : ['Feed', 'Grind', 'Classify', 'Shape', 'Collect'];
  const preview = (index: number) => {
    if (index !== selected) { setSelected(index); setExpanded(false); }
  };
  useEffect(() => {
    const rail = steps.current;
    const step = rail?.children[selected] as HTMLElement | undefined;
    if (!rail || !step || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: rail.scrollLeft + step.getBoundingClientRect().left - rail.getBoundingClientRect().left - (rail.clientWidth - step.clientWidth) / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [selected]);

  return <div className={styles.process}>
    <p className={styles.hint}>{zh ? '选择工序，了解作用与评价重点' : 'Select a stage to explore its role in the process'}<span className={styles.touchHint}>{zh ? '左右滑动浏览 · 点按展开' : 'Swipe to browse · Tap for details'} <span aria-hidden="true">↔</span></span></p>
    <ol ref={steps} className={styles.steps} aria-label={zh ? '粉体加工流程' : 'Powder processing steps'}>
      {powderProcessSteps.map((step, index) => <li key={step} className={styles.step}>
        <button
          type="button"
          aria-label={`${String(index + 1).padStart(2, '0')} · ${labels[index]}`}
          aria-pressed={index === selected}
          aria-expanded={index === selected && expanded}
          aria-controls={`${id}-notes`}
          data-selected={selected === index}
          onPointerEnter={(event) => { if (event.pointerType === 'mouse') preview(index); }}
          onClick={() => { setSelected(index); setExpanded(true); }}
          className={styles.stepButton}
        >
          <span className={styles.stepMark}><span className={styles.number}>0{index + 1}</span><PowderProcessIcon step={step} className={styles.icon} /></span>
          <span className={styles.label}>{labels[index]}</span>
          <span className={styles.compactLabel} aria-hidden="true">{compactLabels[index]}</span>
        </button>
      </li>)}
    </ol>
    <p className="sr-only" role="status">{zh ? `第 ${selected + 1} 道工序，共 ${items.length} 道：${active.title}` : `Stage ${selected + 1} of ${items.length}: ${active.title}`}</p>

    <div className={styles.preview} key={active.id}>
      <figure className={styles.figure}>
        <div className={styles.image}>
          <InteractiveImage src={active.image} alt={active.imageAlt} caption={active.description} fill className="object-cover" sizes="(min-width:1280px) 300px, (min-width:768px) 40vw, 90vw" />
          <span className={styles.imageLabel}>{zh ? '工艺场景示意' : 'Process illustration'}</span>
        </div>
      </figure>
      <div className={styles.copy}>
        <p className={styles.eyebrow}><span>0{selected + 1} / 0{items.length}</span><span>{zh ? '当前工序' : 'Selected stage'}</span></p>
        <h3 className={styles.title}>{active.title}</h3>
        <p className={styles.description}>{active.description}</p>
        <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={`${id}-notes`} className={styles.detailButton}>
          {expanded ? (zh ? '收起工艺说明' : 'Close process notes') : (zh ? '了解工艺与评价重点' : 'Explore process notes')}
          <ChevronDown size={15} aria-hidden="true" className={expanded ? styles.chevronOpen : ''} />
        </button>
      </div>
    </div>

    <div id={`${id}-notes`} hidden={!expanded} className={styles.notes}>
      {active.details.map((text, index) => <div key={`${active.id}-${index}`} className={styles.note}>
        <h4>{index === 0 ? (zh ? '工艺考量' : 'Process considerations') : (zh ? '评价重点' : 'Evaluation priorities')}</h4>
        <p>{text}</p>
      </div>)}
    </div>

    <div className={styles.footer}>
      <p>{zh ? '按材料与目标选择工序，无需全部配置。' : 'Select the stages your material and target require.'}</p>
      <div className={styles.controls}>
        <button type="button" onClick={() => preview((selected + items.length - 1) % items.length)} aria-label={zh ? '上一道工序' : 'Previous operation'}><ArrowLeft size={16} aria-hidden="true" /></button>
        <button type="button" onClick={() => preview((selected + 1) % items.length)} aria-label={zh ? '下一道工序' : 'Next operation'}><ArrowRight size={16} aria-hidden="true" /></button>
      </div>
    </div>
  </div>;
}
