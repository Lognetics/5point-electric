"use client";

import { useRef } from "react";
import { LOGO_BLADES, LOGO_CORE, LOGO_GREEN } from "@/lib/logo-paths";
import { gsap, useGSAP } from "./motion";

// Each blade flies outward along its own direction as the aperture opens.
const EXIT = [
  { x: 40, y: -130 },
  { x: 130, y: 30 },
  { x: 40, y: 130 },
  { x: -120, y: 80 },
  { x: -130, y: -70 },
];

/** Opening shot on a visitor's first page load: the logo's aperture opens onto the hero. */
export function ApertureIntro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.classList.contains("intro-on") || !root.current) return;
      const blades = gsap.utils.toArray<SVGPathElement>("[data-blade]", root.current);
      const finish = () => {
        html.classList.remove("intro-on");
        try {
          sessionStorage.setItem("5p-intro", "1");
        } catch {}
      };
      const radius = Math.hypot(window.innerWidth, window.innerHeight);
      gsap
        .timeline({ onComplete: finish })
        .fromTo("[data-mark]", { rotate: -70, scale: 0.72 }, { rotate: 0, scale: 1, duration: 0.8, ease: "expo.out" })
        .fromTo("[data-core]", { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }, 0.15)
        .to(blades, {
          x: (i) => EXIT[i].x,
          y: (i) => EXIT[i].y,
          rotate: 55,
          transformOrigin: "50% 50%",
          opacity: 0,
          duration: 0.95,
          ease: "power3.inOut",
        }, 0.72)
        .to("[data-core]", { scale: 0, opacity: 0, duration: 0.45, ease: "power3.in" }, 0.72)
        .to("[data-hole]", { "--r": `${radius}px`, duration: 0.95, ease: "power3.inOut" }, 0.82);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="intro fixed inset-0 z-[100]" aria-hidden="true">
      <div data-hole="" className="intro-hole absolute inset-0" />
      <div className="absolute inset-0 grid place-items-center">
        <svg data-mark="" viewBox="0 0 100 100" className="h-44 w-44 overflow-visible sm:h-56 sm:w-56">
          {LOGO_BLADES.map((d) => (
            <path key={d} data-blade="" d={d} fill={LOGO_GREEN} />
          ))}
          <path data-core="" d={LOGO_CORE} fill={LOGO_GREEN} />
        </svg>
      </div>
    </div>
  );
}
