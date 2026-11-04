import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
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
      <PageHero
        eyebrow="About Us"
        title="An electric mobility and clean energy company for Nigeria."
        image={img("sustainability")}
      />

      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <h2 className="display-2 text-navy">Who We Are</h2>
            <p className="mt-7 text-slate lg:text-lg">{company.whoWeAre}</p>
          </Reveal>
          <Reveal delay={120} className="relative aspect-[4/3] overflow-hidden lg:col-span-6">
            <Image src={img("about").src} alt={img("about").alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <span className="demo-tag absolute top-3 left-3">Demonstration image</span>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="wrap grid lg:grid-cols-2">
          <Reveal className="border-white/20 py-16 lg:border-r lg:py-24 lg:pr-16">
            <p className="eyebrow mb-6 text-white/80">Our Vision</p>
            <p className="font-display text-2xl leading-snug font-medium tracking-tight lg:text-[2rem]">{company.vision}</p>
          </Reveal>
          <Reveal delay={100} className="border-t border-white/20 py-16 lg:border-t-0 lg:py-24 lg:pl-16">
            <p className="eyebrow mb-6 text-white/80">Our Mission</p>
            <p className="font-display text-2xl leading-snug font-medium tracking-tight lg:text-[2rem]">{company.mission}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <h2 className="display-2 text-navy">Our Core Values</h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {company.values.map((v) => (
              <li key={v.title} className="border-b border-line py-8">
                <h3 className="text-xl text-navy">{v.title}</h3>
                <p className="mt-2 text-slate">{v.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mist section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative aspect-[4/3] overflow-hidden lg:col-span-6">
            <Image src={img("commitment").src} alt={img("commitment").alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <span className="demo-tag absolute top-3 left-3">Demonstration image</span>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6">
            <h2 className="display-2 text-navy">Our Commitment</h2>
            <p className="mt-7 text-slate lg:text-lg">{company.commitment}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/solutions" className="btn btn-primary">Explore Our Solutions</Link>
              <Link href="/contact" className="btn btn-ghost-dark">Contact Our Team</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
