import type { ReactNode } from "react";
import type { SiteImage } from "@/lib/content";
import { ApertureOutline } from "./Logo";
import { ParallaxImage } from "./ParallaxImage";
import { Reveal } from "./Reveal";
import { ScrubSpin } from "./ScrubSpin";
import { SplitReveal } from "./SplitReveal";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: SiteImage;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, image, children }: Props) {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: image
          ? "linear-gradient(to bottom, var(--color-ink) calc(100% - clamp(5rem, 14vw, 13rem)), var(--color-paper) 0)"
          : "var(--color-ink)",
      }}
    >
      {!image && (
        <ScrubSpin className="pointer-events-none absolute -top-[6vw] -right-[12vw] w-[52vw] min-w-[28rem] text-leaf/40">
          <ApertureOutline strokeWidth={0.22} />
        </ScrubSpin>
      )}
      <div className={`wrap relative pt-40 lg:pt-52 ${image ? "" : "pb-16 lg:pb-24"}`}>
        <p className="label mb-6 text-leaf">{eyebrow}</p>
        <SplitReveal as="h1" immediate className="d-1 max-w-[15ch]">
          {title}
        </SplitReveal>
        {(lead || children) && (
          <div className="mt-9 grid lg:mt-12 lg:grid-cols-12">
            <Reveal delay={350} className="lg:col-span-6 lg:col-start-7">
              {lead && <p className="lead text-white/75">{lead}</p>}
              {children}
            </Reveal>
          </div>
        )}
        {image && (
          <div className="mt-12 lg:mt-16">
            <ParallaxImage
              priority
              src={image.src}
              alt={image.alt}
              sizes="100vw"
              demo="Demonstration image"
              className="aspect-[4/3] sm:aspect-[21/10]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
