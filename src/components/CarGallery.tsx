"use client";

import Image from "@/components/Img";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteImage } from "@/lib/content";

/** Main photo with previous/next controls and a thumbnail strip. */
export function CarGallery({ images, title }: { images: SiteImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const go = (step: number) => setIndex((i) => (i + step + images.length) % images.length);
  const current = images[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} photos`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      className="min-w-0 outline-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-moss">
        <Image key={current.src} src={current.src} alt={current.alt} fill priority={index === 0} sizes="(min-width: 1024px) 50vw, 100vw" className="page-enter object-cover" />
        <div className="absolute inset-x-3.5 bottom-3.5 flex items-center justify-between">
          <span className="rounded-full bg-ink/60 px-3 py-1.5 font-mono text-[0.6rem] text-white backdrop-blur-md" aria-live="polite">
            {index + 1} / {images.length}
          </span>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink backdrop-blur transition-colors hover:bg-white">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink backdrop-blur transition-colors hover:bg-white">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <li key={img.src} className="shrink-0">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1}: ${img.alt}`}
              aria-current={i === index}
              className={`relative block h-[4.5rem] w-[3.6rem] overflow-hidden rounded-[8px] transition-opacity ${i === index ? "ring-2 ring-leaf" : "opacity-55 hover:opacity-100"}`}
            >
              <Image src={img.src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
