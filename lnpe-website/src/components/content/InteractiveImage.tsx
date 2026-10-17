"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "@/i18n/LocaleProvider";
import MediaLightbox from "./MediaLightbox";
import { Expand } from "lucide-react";

type Media = { src: string; alt: string; caption?: string };
type Props = Media & {
  images?: Media[];
  initialIndex?: number;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  wrapperClassName?: string;
};

/** A small image trigger; keyboard, focus and full-screen viewing live in MediaLightbox. */
export default function InteractiveImage({ images, initialIndex, caption, wrapperClassName = "", ...image }: Props) {
  const [open, setOpen] = useState(false);
  const zh = useLocale() === "zh";
  const gallery = images?.length ? images : [{ src: image.src, alt: image.alt, caption }];
  const selected = initialIndex ?? Math.max(0, gallery.findIndex((entry) => entry.src === image.src));
  const label = zh ? "放大查看图片" : "Enlarge image";
  return <>
    <button
      type="button"
      aria-label={`${label}: ${image.alt}`}
      aria-haspopup="dialog"
      onClick={() => setOpen(true)}
      className={`${image.fill ? "absolute inset-0 h-full w-full" : "relative block"} group/zoom cursor-zoom-in overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lnpe-blue ${wrapperClassName}`}
    >
      <Image {...image} alt={image.alt} className={`${image.className ?? ""} transition-transform duration-300 motion-safe:group-hover/zoom:scale-[1.025] motion-safe:group-focus-visible/zoom:scale-[1.025] motion-reduce:transition-none`} />
      <span aria-hidden="true" className="touch-only absolute bottom-2 right-2 z-10 rounded-full border border-white/60 bg-white/90 p-2 text-lnpe-blue shadow-sm"><Expand size={15} /></span>
    </button>
    {open && <MediaLightbox images={gallery} initialIndex={selected} onClose={() => setOpen(false)} />}
  </>;
}
