"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import type { SiteImage } from "@/lib/content";
import { gsap, prefersReducedMotion, useGSAP } from "./motion";

/** A framed image that grows to fill the screen as the visitor scrolls into it. */
export function ExpandingImage({ image, children }: { image: SiteImage; children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        frame.current,
        { clipPath: "inset(9% 11% 9% 11% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 92%", end: "top 12%", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate bg-paper">
      <div ref={frame} className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(10_21_16/0.82),rgb(10_21_16/0.5)_50%,rgb(10_21_16/0.72))]" />
        {children}
      </div>
    </section>
  );
}
