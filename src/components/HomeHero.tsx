"use client";

import Image from "next/image";
import { useRef } from "react";
import type { SiteImage } from "@/lib/content";
import { Cta } from "./Cta";
import { LogoMark } from "./Logo";
import { gsap, prefersReducedMotion, useGSAP } from "./motion";
import { Reveal } from "./Reveal";
import { SplitReveal } from "./SplitReveal";

export function HomeHero({ image, marquee }: { image: SiteImage; marquee: string[] }) {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const delay = document.documentElement.classList.contains("intro-on") ? 0.75 : 0;
      gsap.fromTo(photo.current, { scale: 1.14 }, { scale: 1, duration: 2.4, ease: "expo.out", delay });
      gsap.to(photo.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(copy.current, {
        yPercent: -8,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "35% top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  const row = [...marquee, ...marquee];

  return (
    <>
      <section ref={root} className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-white">
        <div ref={photo} className="absolute inset-0 -z-20">
          <Image src={image.src} alt={image.alt} fill priority quality={85} sizes="100vw" className="object-cover object-[50%_45%]" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(10_21_16/0.97)_0%,rgb(10_21_16/0.72)_38%,rgb(10_21_16/0.18)_72%,rgb(10_21_16/0.45)_100%)]" />

        <div ref={copy} className="wrap flex flex-1 flex-col justify-end pt-36 pb-9 lg:pb-12">
          <SplitReveal as="h1" immediate delay={0.05} className="d-1 max-w-[17ch]">
            Powering the Future of Mobility and Clean Energy.
          </SplitReveal>

          <div className="mt-9 grid gap-7 lg:mt-12 lg:grid-cols-12 lg:items-end">
            <Reveal delay={600} className="lg:col-span-4">
              <p className="flex items-center gap-2.5 text-[0.775rem]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                Advancing Clean Energy Across Nigeria.
              </p>
            </Reveal>
            <Reveal delay={700} className="lg:col-span-5">
              <p className="text-white/80 lg:text-[0.85rem]">
                Driving the transition to sustainable transportation and intelligent energy solutions through advanced
                electric vehicle charging infrastructure, high-performance electrical systems, and industrial-grade solar
                technology.
              </p>
            </Reveal>
            <Reveal delay={800} className="flex flex-col gap-2.5 sm:flex-row lg:col-span-3 lg:flex-col lg:items-end">
              <Cta href="/solutions" variant="leaf" className="w-full sm:w-auto lg:w-[15.5rem]">Explore Our Solutions</Cta>
              <Cta href="/contact" variant="glass" className="w-full sm:w-auto lg:w-[15.5rem]">Contact Our Team</Cta>
            </Reveal>
          </div>
        </div>

        <span className="demo-tag absolute top-24 right-5 lg:top-28 lg:right-14">Demonstration image</span>
      </section>

      <div className="overflow-hidden border-t border-white/10 bg-ink py-5 text-white" aria-hidden="true">
        <div className="marquee-track flex w-max items-center gap-10">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-[1.4rem] tracking-[-0.03em] whitespace-nowrap lg:text-[2rem]">
              {item}
              <LogoMark className="h-8 w-8 shrink-0 lg:h-10 lg:w-10" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
