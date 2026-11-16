"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import imageLoader from "@/lib/image-loader";
import { prefersReducedMotion } from "./motion";

type Props = {
  src: string;
  poster: string;
  /** Describes what the clip shows, for screen readers. */
  label: string;
  caption?: string;
  className?: string;
};

/**
 * Silent looping clip that only downloads and plays while it is on screen.
 * It has a pause button, and stays paused for visitors who prefer reduced motion.
 */
export function StationVideo({ src, poster, label, caption, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (prefersReducedMotion()) {
      userPaused.current = true;
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    // Photos come first: clips start downloading only once the page itself has loaded.
    const start = () => observer.observe(video);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      observer.disconnect();
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <figure className={`relative overflow-hidden rounded-[14px] bg-moss ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={imageLoader({ src: poster, width: 640 })}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" />
      {caption && <figcaption className="label absolute bottom-4 left-4 right-14 text-white">{caption}</figcaption>}
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} video: ${label}`}
        className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-white/30"
      >
        {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="translate-x-px" />}
      </button>
    </figure>
  );
}
