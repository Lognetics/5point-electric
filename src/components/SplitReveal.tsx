"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "./motion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Play on load rather than on scroll, for text at the top of a page. */
  immediate?: boolean;
};

/** Headline whose lines rise into place from behind a mask. */
export function SplitReveal({ children, as: Tag = "h2", className, delay = 0, immediate = false }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { visibility: "visible" });
      if (prefersReducedMotion()) return;
      const introDelay = immediate && document.documentElement.classList.contains("intro-on") ? 1.15 : 0;
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "sl",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 118,
            duration: 1.25,
            stagger: 0.09,
            ease: "expo.out",
            delay: delay + introDelay,
            scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
          }),
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-split="" className={className}>
      {children}
    </Tag>
  );
}
