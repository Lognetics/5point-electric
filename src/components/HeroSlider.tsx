"use client";

import Image from "next/image";
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
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  price?: string;
  stats?: { label: string; value: string }[];
};

/** Full-screen hero carousel. Rotates on its own, pauses on hover, focus, or the pause button, and swipes on touch. */
export function HeroSlider({ slides, interval = 7 }: { slides: HeroSlide[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [cycle, setCycle] = useState(0);
  const touchX = useRef<number | null>(null);
  const paused = userPaused || hovering;

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
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHovering(false)}
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
              {/* Background: the photo itself on phones, a soft colour wash of it on large screens */}
              <div className="absolute inset-x-0 top-0 -z-20 h-[68%] overflow-hidden lg:h-full">
                <Image
                  src={slide.image.src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="hs-zoom object-cover lg:scale-125 lg:blur-[60px] lg:brightness-[0.45] lg:saturate-150"
                />
              </div>
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-ink)_32%,rgb(10_21_16/0.55)_58%,rgb(10_21_16/0.15)_80%,rgb(10_21_16/0.45))] lg:bg-[linear-gradient(100deg,rgb(10_21_16/0.92)_20%,rgb(10_21_16/0.55)_60%,rgb(10_21_16/0.25))]" />

              <div className="wrap grid h-full items-end gap-10 pt-32 pb-36 lg:grid-cols-12 lg:items-center lg:pb-28">
                <div className="lg:col-span-6 xl:col-span-6">
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

                {/* Sharp photo card on large screens */}
                <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
                  <div className="hs-card relative mx-auto aspect-[4/5] h-[min(68svh,44rem)] max-w-full overflow-hidden rounded-[18px] shadow-2xl shadow-black/40">
                    <Image src={slide.image.src} alt={slide.image.alt} fill priority={i === 0} sizes="40vw" className="hs-zoom object-cover" />
                    {slide.image.demo !== false && <span className="demo-tag absolute top-3.5 left-3.5">Demonstration image</span>}
                  </div>
                </div>
              </div>
              {/* On phones the background is the photo itself, so it carries the label */}
              {slide.image.demo !== false && <span className="demo-tag absolute top-24 right-5 lg:hidden">Demonstration image</span>}
              <span className="sr-only lg:hidden">{slide.image.alt}</span>
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

const prefersReducedMotionSafe = () => typeof window !== "undefined" && prefersReducedMotion();
