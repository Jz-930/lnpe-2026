"use client";

import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/i18n/LocaleProvider";
import { stripLocale } from "@/i18n/routing";
import { editorialVisuals } from "@/content/editorial-visuals";
import InteractiveImage from "./InteractiveImage";
import styles from "./ReferencePresentation.module.css";

type Props = { title: string; intro: string; eyebrow: string; back: { href: string; label: string }; children: ReactNode };

/** Route-based presentation keeps the shared shell independent of each page's interactive content. */
export default function ReferencePresentation({ title, intro, eyebrow, back, children }: Props) {
  const locale = useLocale();
  const route = stripLocale(usePathname() ?? "");
  const visual = editorialVisuals[route];
  const sceneLabel = locale === "zh" ? "场景示意" : "Illustrative scene";

  if (!visual) return <>
    <header className="border-b border-lnpe-border bg-lnpe-bg-light">
      <div className="container mx-auto max-w-6xl px-6 py-14 md:py-20">
        <Link href={back.href} className="text-xs text-lnpe-muted transition-colors hover:text-lnpe-blue">← {back.label}</Link>
        <p className="spec-label mb-4 mt-8">{eyebrow}</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-lnpe-dark md:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-lnpe-muted">{intro}</p>
      </div>
    </header>
    <div className="container mx-auto max-w-6xl px-6 py-12 md:py-16">{children}</div>
  </>;

  const gallery = [visual.primary, visual.detail, visual.closing].map((item) => ({
    src: item.src, alt: item.alt[locale], caption: `${item.label[locale]} · ${sceneLabel}`,
  }));

  return <div className={styles.presentation} data-editorial-page={route.slice(1)}>
    <header className={styles.masthead}>
      <div className={styles.container}>
        <div className={styles.topline}>
          <Link href={back.href} className={styles.back}><ArrowUpLeft size={14} aria-hidden="true" />{back.label}</Link>
          <span className={styles.code} aria-hidden="true">LNPE / {visual.number}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.introduction}>
            <p className={styles.eyebrow}><span aria-hidden="true" />{eyebrow}</p>
            <h1 className={styles.title}>{title}<span className={styles.period}>.</span></h1>
            <p className={styles.intro}>{intro}</p>
            <p className={styles.processNote}>{visual.note[locale]}</p>
            <a href="#content-topics" className={styles.readLink}>{locale === "zh" ? "深入了解" : "Explore this topic"}<ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <div className={styles.composition}>
            <span className={styles.imageCode} aria-hidden="true">{visual.code}</span>
            <figure className={styles.primaryFigure}>
              <div className={styles.primaryImage}>
                <InteractiveImage {...gallery[0]} images={gallery} initialIndex={0} fill priority sizes="(min-width: 1280px) 580px, (min-width: 900px) 49vw, 90vw" className={styles.photo} />
              </div>
              <figcaption className={styles.primaryCaption}><span>{visual.primary.label[locale]}</span><span>{sceneLabel}</span></figcaption>
            </figure>
            <figure className={styles.detailFigure}>
              <div className={styles.detailImage}>
                <InteractiveImage {...gallery[1]} images={gallery} initialIndex={1} fill sizes="(min-width: 900px) 240px, 42vw" className={styles.photo} />
              </div>
              <figcaption>{visual.detail.label[locale]}</figcaption>
            </figure>
            <div className={styles.compositionNote} aria-hidden="true"><span>LNPE</span><span>{locale === "zh" ? "粉体工程 · 技术与实践" : "POWDER ENGINEERING"}</span></div>
          </div>
        </div>
        <nav aria-label={locale === "zh" ? "本页阅读导航" : "On this page"} className={styles.chapterNav}>
          <span className={styles.chapterLabel}>{locale === "zh" ? "本页内容" : "IN THIS CHAPTER"}</span>
          <div className={styles.chapterLinks}>{visual.chapters.map((chapter, index) => <a key={chapter.href} href={chapter.href}>
            <span className={styles.chapterNumber}>{String(index + 1).padStart(2, "0")}</span><span>{chapter.label[locale]}</span><ArrowDown size={13} aria-hidden="true" />
          </a>)}</div>
        </nav>
      </div>
    </header>

    <div id="content-topics" className={`${styles.container} ${styles.body}`}>{children}</div>

    <section className={styles.closing} aria-labelledby="editorial-closing-title">
      <div className={styles.container}>
        <div className={`${styles.closingLayout} ${route === "/research" ? styles.panoramaLayout : ""}`}>
          <figure className={styles.closingFigure}>
            <div className={styles.closingImage}>
              <InteractiveImage {...gallery[2]} images={gallery} initialIndex={2} fill sizes={route === "/research" ? "(min-width: 1280px) 1100px, 90vw" : "(min-width: 1280px) 600px, (min-width: 900px) 49vw, 90vw"} className={styles.photo} />
            </div>
            <figcaption><span>{visual.closing.label[locale]}</span><span>{sceneLabel}</span></figcaption>
          </figure>
          <div className={styles.closingCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" />{locale === "zh" ? "连接技术与需求" : "FROM INSIGHT TO ACTION"}</p>
            <h2 id="editorial-closing-title">{visual.closingTitle[locale]}</h2>
            <p>{visual.closingText[locale]}</p>
            <Link href={visual.action.href} className={styles.action}>{visual.action.label[locale]}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  </div>;
}
