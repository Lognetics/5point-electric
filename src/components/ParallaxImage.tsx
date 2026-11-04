"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./motion";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  demo?: string;
  radius?: string;
};

/** Image that wipes open on entry and drifts slightly against the scroll. */
export function ParallaxImage({ src, alt, sizes, className = "", priority, demo, radius = "14px" }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      gsap.fromTo(
        root.current,
        { clipPath: `inset(7% 5% 7% 5% round ${radius})` },
        {
          clipPath: `inset(0% 0% 0% 0% round ${radius})`,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 92%", once: true },
        },
      );
      gsap.fromTo(
        inner.current,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative overflow-hidden bg-moss ${className}`} style={{ borderRadius: radius }}>
      <div ref={inner} className="absolute -inset-y-[7%] inset-x-0">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
      {demo && <span className="demo-tag absolute top-3.5 left-3.5">{demo}</span>}
    </div>
  );
}
