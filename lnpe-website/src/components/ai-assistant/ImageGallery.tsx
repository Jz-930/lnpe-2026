"use client";

import { motion } from "framer-motion";

interface ImageGalleryProps {
  images: { url: string; tag: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="flex flex-col gap-3 py-3 mt-2 w-full">
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: idx * 0.15, type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-full h-[180px] rounded-xl overflow-hidden group border border-white/10 cursor-pointer"
        >
          {/* Ken-burns effect on hover */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
            style={{ backgroundImage: `url(${img.url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          {/* Frosted tag */}
          <div className="absolute top-2 left-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] px-2 py-0.5 rounded-md font-medium tracking-wide">
            {img.tag}
          </div>
          
          <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <span className="text-white text-xs font-semibold drop-shadow-md">查看实景大图</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
