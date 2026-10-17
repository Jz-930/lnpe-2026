"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MediaLightbox from "@/components/content/MediaLightbox";
import { assistantMessages } from "@/i18n/messages/assistant";
import type { Locale } from "@/i18n/config";

interface ImageGalleryProps {
  images: { url: string; tag: string }[];
  lang: Locale;
}

export default function ImageGallery({ images, lang }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const viewLabel = lang === 'zh' ? '查看大图' : 'View larger image';
  return (
    <div className="mt-2 flex w-full flex-col gap-3 py-3">
      {images.map((img, index) => (
        <motion.button
          type="button"
          key={img.url}
          onClick={() => setSelectedIndex(index)}
          aria-label={`${viewLabel}: ${img.tag}`}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.12, type: "spring", stiffness: 260, damping: 22 }}
          className="group relative h-[170px] w-full cursor-zoom-in overflow-hidden border border-lnpe-border bg-lnpe-bg-light text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lnpe-kinetic"
        >
          <div
            className="absolute inset-0 bg-cover bg-center motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.025]"
            style={{ backgroundImage: `url(${img.url})` }}
          />
          <div className="absolute inset-x-0 bottom-0 border-t border-lnpe-border bg-lnpe-paper/95 px-3 py-2 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-lnpe-blue">{img.tag}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{assistantMessages[lang].plantRecord}</span>
            </div>
          </div>
        </motion.button>
      ))}
      {selectedIndex !== null && <MediaLightbox images={images.map((image) => ({ src: image.url, alt: image.tag, caption: image.tag }))} initialIndex={selectedIndex} onClose={() => setSelectedIndex(null)} />}
    </div>
  );
}
