import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/lib/content";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: SiteImage;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lead, image, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {image ? (
        <>
          <Image src={image.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-navy/75" />
        </>
      ) : (
        <div className="dot-field absolute inset-0 -z-10" />
      )}
      <div className="wrap flex min-h-[26rem] flex-col justify-end pt-36 pb-14 lg:min-h-[32rem] lg:pb-20">
        <p className="eyebrow mb-5 text-white/85">{eyebrow}</p>
        <h1 className="display-1 max-w-4xl">{title}</h1>
        {lead && <p className="lead mt-6 max-w-2xl text-white/80">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
