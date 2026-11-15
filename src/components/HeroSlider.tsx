"use client";

import { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Cta } from "./Cta";
import { prefersReducedMotion } from "./motion";

export type HeroSlide = {
  eyebrow: string;
  title: string;
  text: string;
  tab: string;
  image: { src: string; alt: string; demo?: boolean };
  mobileImage?: { src: string; alt: string; demo?: boolean };
  position?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  price?: string;
  stats?: { label: string; value: string }[];
};

/** Full-screen hero carousel with background photos. Rotates on its own, pauses for keyboard focus or the pause button, and swipes on touch. */
export function HeroSlider({ slides, interval = 7 }: { slides: HeroSlide[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [cycle, setCycle] = useState(0);
  const touchX = useRef<number | null>(null);
  const paused = userPaused || keyboardFocus;

  useEffect(() => {
    if (prefersReducedMotion()) setUserPaused(true);
  }, []);

  const go = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
      setCycle((c) => c + 1);
    },
    [slides.length],
  );

  // Advances when the current slide's progress bar finishes, so pausing holds the slide exactly where it is.
  const onBarEnd = () => go(index + 1);

  if (slides.length === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative isolate h-svh min-h-[40rem] overflow-hidden bg-ink text-white"
      onFocus={(e) => setKeyboardFocus(e.target.matches(":focus-visible"))}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setKeyboardFocus(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
      data-paused={paused ? "" : undefined}
    >
      <div aria-live={userPaused ? "polite" : "off"}>
        {slides.map((slide, i) => {
          const active = i === index;
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={slide.tab}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${slide.tab}`}
              aria-hidden={!active}
              inert={!active}
              data-active={active ? "" : undefined}
              className="hs-slide absolute inset-0"
            >
              <SlideBackground slide={slide} priority={i === 0} />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-ink)_30%,rgb(10_21_16/0.5)_58%,rgb(10_21_16/0.1)_80%,rgb(10_21_16/0.5))] lg:bg-[linear-gradient(90deg,rgb(10_21_16/0.55)_30%,rgb(10_21_16/0.15)_60%,transparent_85%),linear-gradient(to_top,rgb(10_21_16/0.85),transparent_30%)]" />
              {slide.image.demo !== false && <span className="demo-tag absolute top-24 right-5 lg:top-28 lg:right-14">Demonstration image</span>}
              <span className="sr-only">{slide.image.alt}</span>

              <div className="wrap grid h-full items-end gap-10 pt-32 pb-36 lg:grid-cols-12 lg:items-center lg:pb-28">
                <div className="lg:col-span-7 xl:col-span-6">
                  {slide.eyebrow && (
                    <p className="hs-in flex items-center gap-2.5 text-[0.775rem]" style={{ "--d": 0 } as React.CSSProperties}>
                      <span className="h-2 w-2 shrink-0 rounded-full bg-leaf" aria-hidden="true" />
                      {slide.eyebrow}
                    </p>
                  )}
                  <Heading className="hs-in d-1 mt-5 max-w-[15ch]" style={{ "--d": 80 } as React.CSSProperties}>
                    {slide.title}
                  </Heading>
                  {slide.price && (
                    <p className="hs-in mt-5 text-[1.6rem] font-medium tracking-[-0.03em] text-leaf" style={{ "--d": 160 } as React.CSSProperties}>
                      {slide.price}
                    </p>
                  )}
                  <p
                    className={`hs-in mt-5 max-w-xl text-white/80 lg:text-[0.95rem] ${slide.stats?.length ? "hidden sm:block" : ""}`}
                    style={{ "--d": 220 } as React.CSSProperties}
                  >
                    {slide.text}
                  </p>
                  {slide.stats && slide.stats.length > 0 && (
                    <dl className="hs-in mt-6 flex flex-wrap gap-2" style={{ "--d": 280 } as React.CSSProperties}>
                      {slide.stats.map((s) => (
                        <div key={s.label} className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 backdrop-blur">
                          <dt className="sr-only">{s.label}</dt>
                          <dd className="text-[0.75rem]">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <div className="hs-in mt-8 flex flex-col gap-2.5 sm:flex-row" style={{ "--d": 340 } as React.CSSProperties}>
                    <Cta href={slide.primary.href} variant="leaf">{slide.primary.label}</Cta>
                    {slide.secondary && <Cta href={slide.secondary.href} variant="glass">{slide.secondary.label}</Cta>}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="wrap flex items-end gap-4 pb-6 lg:gap-8 lg:pb-9">
          <ol className="grid flex-1 grid-cols-4 gap-2 lg:gap-5" style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}>
            {slides.map((slide, i) => (
              <li key={slide.tab}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show slide ${i + 1}: ${slide.tab}`}
                  aria-current={i === index}
                  className="group block w-full pt-3 text-left"
                >
                  <span className="block h-0.5 overflow-hidden rounded-full bg-white/20">
                    <span
                      key={i === index ? `run-${cycle}` : "idle"}
                      className="hs-bar block h-full bg-leaf"
                      style={{ "--dur": `${interval}s` } as React.CSSProperties}
                      data-run={i === index && !(userPaused && prefersReducedMotionSafe()) ? "" : undefined}
                      data-done={i < index ? "" : undefined}
                      onAnimationEnd={i === index ? onBarEnd : undefined}
                    />
                  </span>
                  <span className={`mt-3 hidden text-[0.7rem] transition-colors md:block ${i === index ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                    <span className="mr-2 font-mono text-leaf">0{i + 1}</span>
                    {slide.tab}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex shrink-0 gap-1.5">
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={() => setUserPaused((p) => !p)} aria-label={userPaused ? "Play slideshow" : "Pause slideshow"} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10">
              {userPaused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The slide photo, with a portrait crop for phones when one is supplied. */
function SlideBackground({ slide, priority }: { slide: HeroSlide; priority: boolean }) {
  const common = { alt: "", fill: true, sizes: "100vw" } as const;
  const wide = getImageProps({ ...common, src: slide.image.src, sizes: "64vw" }).props;
  const { srcSet: phoneSrcSet, ...img } = getImageProps({ ...common, src: (slide.mobileImage ?? slide.image).src, priority, sizes: "(min-width: 1024px) 64vw, 100vw" }).props;
  return (
    // Phones: photo across the top of the screen. Large screens: photo bleeds in from the right and fades into the text side.
    <div className="absolute inset-x-0 top-0 -z-20 h-[68%] overflow-hidden lg:left-[36%] lg:h-full lg:[mask-image:linear-gradient(to_right,transparent,#000_34%)]">
      <picture>
        <source media="(min-width: 1024px)" srcSet={wide.srcSet} sizes="64vw" />
        <img
          {...img}
          srcSet={phoneSrcSet}
          alt=""
          className="hs-zoom object-cover"
          style={{ ...img.style, objectPosition: slide.position ?? "50% 50%" }}
        />
      </picture>
    </div>
  );
}

const prefersReducedMotionSafe = () => typeof window !== "undefined" && prefersReducedMotion();
