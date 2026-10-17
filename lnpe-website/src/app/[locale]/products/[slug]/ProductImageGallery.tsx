"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import InteractiveImage from "@/components/content/InteractiveImage";
import { useLocale } from "@/i18n/LocaleProvider";
import { catalogUi, formatCatalogMessage } from "@/i18n/messages/catalog";
import styles from "./ProductImageGallery.module.css";

type ProductImageGalleryProps = {
  title: string;
  coverImage: string;
  galleryImages: string[];
};

export function ProductImageGallery({
  title,
  coverImage,
  galleryImages,
}: ProductImageGalleryProps) {
  const locale = useLocale();
  const ui = catalogUi[locale];
  const images = useMemo(() => [...new Set([coverImage, ...galleryImages])], [coverImage, galleryImages]);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const slides = useRef<HTMLDivElement>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const selectedIndex = Math.max(0, images.indexOf(selectedImage));
  const selectImage = (index: number) => {
    setSelectedImage(images[index]);
    const rail = slides.current;
    if (rail?.clientWidth) rail.scrollTo({ left: index * rail.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  useEffect(() => {
    const rail = thumbnails.current;
    const thumb = rail?.children[selectedIndex] as HTMLElement | undefined;
    if (rail && thumb && rail.scrollWidth > rail.clientWidth) rail.scrollTo({ left: rail.scrollLeft + thumb.getBoundingClientRect().left - rail.getBoundingClientRect().left - (rail.clientWidth - thumb.clientWidth) / 2, behavior: "auto" });
  }, [selectedIndex]);

  return (
    <div className={`${styles.gallery} space-y-4`}>
      <div className={`${styles.desktopGallery} relative aspect-[4/3] overflow-hidden border border-[#dbe3ee] bg-gradient-to-br from-white via-[#f2f6fa] to-[#e7edf5] shadow-[0_18px_44px_rgba(15,23,42,0.09)]`}>
        <InteractiveImage
          images={images.map((src, index) => ({ src, alt: formatCatalogMessage(ui.thumbnailAlt, { title, number: index + 1 }), caption: title }))}
          src={selectedImage}
          alt={formatCatalogMessage(ui.selectedViewAlt, { title })}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-contain p-7"
        />
        <div className="pointer-events-none absolute bottom-5 left-5 border border-[#cbd7e6] bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#536276]">
          {ui.equipmentView}
        </div>
      </div>

      <div className={styles.touchGallery} role="region" aria-label={locale === "zh" ? `${title} 图片集` : `${title} image gallery`} aria-roledescription={locale === "zh" ? "轮播图" : "carousel"}>
        <div ref={slides} className={styles.slides} onScroll={(event) => {
          const rail = event.currentTarget;
          const index = Math.min(images.length - 1, Math.max(0, Math.round(rail.scrollLeft / rail.clientWidth)));
          if (images[index] !== selectedImage) setSelectedImage(images[index]);
        }}>
          {images.map((src, index) => <div key={src} className={styles.slide} role="group" aria-roledescription={locale === "zh" ? "图片" : "slide"} aria-label={`${index + 1} / ${images.length}`}>
            <InteractiveImage
              images={images.map((image, imageIndex) => ({ src: image, alt: formatCatalogMessage(ui.thumbnailAlt, { title, number: imageIndex + 1 }), caption: title }))}
              initialIndex={index}
              src={src}
              alt={formatCatalogMessage(ui.thumbnailAlt, { title, number: index + 1 })}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-contain p-5"
            />
          </div>)}
        </div>
        <div className={styles.toolbar}>
          <p className={styles.hint}>{images.length > 1 ? (locale === "zh" ? "左右滑动切换 · 轻点放大" : "Swipe to browse · Tap to enlarge") : (locale === "zh" ? "轻点图片放大查看" : "Tap image to enlarge")}</p>
          {images.length > 1 && <div className={styles.controls}>
            <button type="button" disabled={selectedIndex === 0} onClick={() => selectImage(selectedIndex - 1)} aria-label={locale === "zh" ? "上一张图片" : "Previous image"}><ArrowLeft size={17} aria-hidden="true" /></button>
            <span className={styles.count} aria-live="polite" aria-atomic="true">{selectedIndex + 1} / {images.length}</span>
            <button type="button" disabled={selectedIndex === images.length - 1} onClick={() => selectImage(selectedIndex + 1)} aria-label={locale === "zh" ? "下一张图片" : "Next image"}><ArrowRight size={17} aria-hidden="true" /></button>
          </div>}
        </div>
      </div>

      {images.length > 1 && (
        <div ref={thumbnails} className={`${styles.thumbs} relative grid grid-cols-4 gap-3`}>
          {images.map((image, index) => {
            const selected = image === selectedImage;
            return (
              <button
                key={image}
                type="button"
                aria-label={formatCatalogMessage(ui.showImage, { title, number: index + 1 })}
                aria-pressed={selected}
                onClick={() => selectImage(index)}
                className={`relative aspect-square overflow-hidden border bg-white transition ${
                  selected ? "border-[#f26522] ring-2 ring-[#f26522]/20" : "border-[#dbe3ee] hover:border-[#9bb7d7]"
                }`}
              >
                <Image
                  src={image}
                  alt={formatCatalogMessage(ui.thumbnailAlt, { title, number: index + 1 })}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
