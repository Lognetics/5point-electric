"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { SiteImage } from "@/lib/content";
import { Cta } from "./Cta";
import { gsap, prefersReducedMotion, useGSAP } from "./motion";

type Item = { title: string; href: string; image: SiteImage };

/** Gallery that travels sideways as you scroll on desktop, and swipes on touch screens. */
export function HorizontalShowcase({ items, intro }: { items: Item[]; intro: string }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 640px)", () => {
        const el = track.current!;
        gsap.to(el, {
          x: () => -(el.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.6,
            end: () => `+=${el.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden bg-paper py-20 lg:flex lg:h-svh lg:items-center lg:py-0">
      <ul ref={track} className="no-scrollbar flex w-full snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 lg:w-max lg:snap-none lg:gap-7 lg:overflow-visible lg:px-14">
        <li className="flex w-[84vw] shrink-0 snap-start flex-col justify-center pr-4 sm:w-[60vw] lg:w-[34vw]">
          <p className="label mb-6 text-deep">Project Showcase</p>
          <h2 className="d-2">Featured Solutions</h2>
          <p className="lead mt-6 text-stone">{intro}</p>
          <div className="mt-8">
            <Cta href="/projects">View projects</Cta>
          </div>
        </li>
        {items.map((item, i) => (
          <li key={item.title} className="w-[84vw] shrink-0 snap-start sm:w-[60vw] lg:w-[46vw]">
            <Link href={item.href} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-moss lg:aspect-auto lg:h-[66svh]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 84vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.04]"
                />
                <span className="demo-tag absolute top-3.5 left-3.5">Demonstration image</span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h3 className="text-xl tracking-[-0.02em] lg:text-2xl">
                  <span className="label mr-3 align-middle text-stone">0{i + 1}</span>
                  {item.title}
                </h3>
                <ArrowUpRight size={22} className="mt-1 shrink-0 text-deep transition-transform duration-500 ease-out-soft group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
