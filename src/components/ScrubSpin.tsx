"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./motion";

/** Rotates its contents with the scroll, like an aperture turning. */
export function ScrubSpin({ children, className, turn = 110 }: { children: ReactNode; className?: string; turn?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { rotate: -turn / 2 },
        {
          rotate: turn / 2,
          ease: "none",
          scrollTrigger: { trigger: ref.current.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
