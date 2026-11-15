"use client";

import { HeroSlider, type HeroSlide } from "./HeroSlider";
import { LogoMark } from "./Logo";

export function HomeHero({ slides, interval, marquee }: { slides: HeroSlide[]; interval: number; marquee: string[] }) {
  const row = [...marquee, ...marquee];

  return (
    <>
      <HeroSlider slides={slides} interval={interval} />

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
