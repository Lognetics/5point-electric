"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "./motion";

let lenis: Lenis | null = null;

const HEADER_OFFSET = 100;

function scrollToSection(hash: string, immediate: boolean) {
  const target = document.querySelector(hash);
  if (!target || !lenis) return false;
  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  lenis.scrollTo(top, { immediate, force: true });
  return true;
}

export const pauseScroll = (paused: boolean) => (paused ? lenis?.stop() : lenis?.start());

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({ lerp: 0.11 });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Links to a section on the current page glide there.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!link || link.pathname !== window.location.pathname || !link.hash) return;
      if (scrollToSection(link.hash, false)) {
        event.preventDefault();
        history.pushState(null, "", link.hash);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // New page: honour a #section in the URL, otherwise start from the top.
  useEffect(() => {
    if (!scrollToSection(window.location.hash || "#main", true)) window.scrollTo(0, 0);
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
