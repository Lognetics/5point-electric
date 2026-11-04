"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { SiteImage } from "@/lib/content";
import { gsap, prefersReducedMotion, useGSAP } from "./motion";

type Panel = { id: string; title: string; text: string; image: SiteImage };

/** Full-screen panels that stack over one another as the visitor scrolls. */
export function StackedSolutions({ panels }: { panels: Panel[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-panel]", root.current);
      items.forEach((panel, i) => {
        const next = items[i + 1];
        if (!next) return;
        gsap.to(panel.querySelector("[data-panel-inner]"), {
          scale: 0.93,
          opacity: 0.35,
          borderRadius: 28,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="bg-ink">
      {panels.map((panel, i) => (
        <article key={panel.id} data-panel="" className="stack-panel">
          <Link
            href={`/solutions#${panel.id}`}
            data-panel-inner=""
            className="group relative flex h-full flex-col justify-end overflow-hidden text-white"
          >
            <Image
              src={panel.image.src}
              alt={panel.image.alt}
              fill
              sizes="100vw"
              className="-z-20 object-cover transition-transform duration-[1.6s] ease-out-soft group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(10_21_16/0.94)_6%,rgb(10_21_16/0.4)_48%,rgb(10_21_16/0.08))]" />
            <div className="wrap grid gap-6 pb-10 lg:grid-cols-12 lg:items-end lg:pb-16">
              <div className="lg:col-span-7">
                <p className="label mb-5 text-leaf">
                  {String(i + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
                </p>
                <h3 className="d-2">{panel.title}</h3>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="text-white/80 lg:text-lg">{panel.text}</p>
                <span className="link-arrow mt-5">
                  Explore Solution <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
