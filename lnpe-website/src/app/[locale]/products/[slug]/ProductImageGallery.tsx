"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import InteractiveImage from "@/components/content/InteractiveImage";
import { useLocale } from "@/i18n/LocaleProvider";
import { catalogUi, formatCatalogMessage } from "@/i18n/messages/catalog";

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

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden border border-[#dbe3ee] bg-gradient-to-br from-white via-[#f2f6fa] to-[#e7edf5] shadow-[0_18px_44px_rgba(15,23,42,0.09)]">
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

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => {
            const selected = image === selectedImage;
            return (
              <button
                key={image}
                type="button"
                aria-label={formatCatalogMessage(ui.showImage, { title, number: index + 1 })}
                aria-pressed={selected}
                onClick={() => setSelectedImage(image)}
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
