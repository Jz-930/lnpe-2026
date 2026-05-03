"use client";

import { motion } from "framer-motion";

interface ImageGalleryProps {
  images: { url: string; tag: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="mt-2 flex w-full flex-col gap-3 py-3">
      {images.map((img, index) => (
        <motion.div
          key={img.url}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.12, type: "spring", stiffness: 260, damping: 22 }}
          className="group relative h-[170px] w-full cursor-pointer overflow-hidden border border-lnpe-border bg-lnpe-bg-light"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${img.url})` }}
          />
          <div className="absolute inset-x-0 bottom-0 border-t border-lnpe-border bg-lnpe-paper/95 px-3 py-2 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-lnpe-blue">{img.tag}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Plant record</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
