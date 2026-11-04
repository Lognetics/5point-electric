import type { Metadata } from "next";
import { Cta } from "@/components/Cta";
import { ApertureOutline } from "@/components/Logo";
import { PageHero } from "@/components/PageHero";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { ScrubSpin } from "@/components/ScrubSpin";
import { SplitReveal } from "@/components/SplitReveal";
import { WordScrub } from "@/components/WordScrub";
import { getCompany, getImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us: Renewable Energy & Electric Mobility Company in Nigeria",
  description:
    "5Point Electric Technology Limited is an electric mobility and clean energy technology company operating in Abuja, Lagos, and Port Harcourt. Our vision, mission, and values.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const company = getCompany();
  const img = getImages();
  return (
    <>
      <PageHero eyebrow="About Us" title="An electric mobility and clean energy company for Nigeria." image={img("sustainability")} />

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <p className="label text-deep lg:col-span-3">Who We Are</p>
          <div className="lg:col-span-9">
            <WordScrub className="d-3" text={company.whoWeAre} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <ScrubSpin className="pointer-events-none absolute top-1/2 left-1/2 w-[70vw] -translate-x-1/2 -translate-y-1/2 text-leaf/15" turn={130}>
          <ApertureOutline />
        </ScrubSpin>
        <div className="wrap relative">
          <div className="grid gap-5 border-b border-white/12 py-20 lg:grid-cols-12 lg:py-32">
            <p className="label text-leaf lg:col-span-3">Our Vision</p>
            <SplitReveal as="p" className="d-3 lg:col-span-9">{company.vision}</SplitReveal>
          </div>
          <div className="grid gap-5 py-20 lg:grid-cols-12 lg:py-32">
            <p className="label text-leaf lg:col-span-3">Our Mission</p>
            <SplitReveal as="p" className="d-3 lg:col-span-9">{company.mission}</SplitReveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="label mb-7 text-deep">What guides us</p>
          <SplitReveal className="d-2">Our Core Values</SplitReveal>
          <ul className="mt-14 border-t border-ink/15 lg:mt-20">
            {company.values.map((v, i) => (
              <Reveal as="li" key={v.title} className="group grid gap-2 border-b border-ink/15 py-7 transition-colors duration-500 lg:grid-cols-12 lg:items-baseline lg:py-9">
                <span className="label text-stone lg:col-span-1">0{i + 1}</span>
                <h3 className="d-3 transition-transform duration-700 ease-out-soft group-hover:translate-x-3 lg:col-span-6">{v.title}</h3>
                <p className="text-stone lg:col-span-5">{v.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-24 lg:pb-44">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <ParallaxImage src={img("commitment").src} alt={img("commitment").alt} sizes="(min-width: 1024px) 58vw, 100vw" demo="Demonstration image" className="aspect-[5/4]" />
          </div>
          <div className="flex flex-col justify-center lg:col-span-4 lg:col-start-9">
            <SplitReveal className="d-2">Our Commitment</SplitReveal>
            <Reveal>
              <p className="lead mt-7 text-stone">{company.commitment}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
                <Cta href="/solutions">Explore Our Solutions</Cta>
                <Cta href="/contact" variant="outline">Contact Our Team</Cta>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
