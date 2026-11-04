import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  HardHat,
  Headset,
  Leaf,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { NigeriaMap } from "@/components/NigeriaMap";
import { Reveal } from "@/components/Reveal";
import { getImages } from "@/lib/content";
import { SOLUTIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "EV Charging & Solar Energy Solutions in Nigeria | 5Point Electric Technology" },
  description:
    "Electric vehicle charging stations, solar-powered EV charging, AC and DC electrical cables, and industrial solar systems in Nigeria. Serving Abuja, Lagos, and Port Harcourt.",
  alternates: { canonical: "/" },
};

const ADVANTAGES = [
  { icon: Cpu, title: "Advanced Energy Technology", text: "Modern EV charging and solar technologies, selected for the way they will be used." },
  { icon: HardHat, title: "Reliable Engineering Solutions", text: "Systems planned around dependable day-to-day performance." },
  { icon: ShieldCheck, title: "Quality-Assured Products", text: "A focus on product quality, from electrical cables to complete solar systems." },
  { icon: Leaf, title: "Sustainable Energy Infrastructure", text: "Infrastructure that brings electric mobility and renewable energy together." },
  { icon: Headset, title: "Customer-Focused Service Delivery", text: "Clear communication and support shaped around your requirements." },
  { icon: Lightbulb, title: "Commitment to Innovation", text: "A forward-looking approach to Nigeria's evolving energy needs." },
];

const LOCATIONS = [
  { name: "Abuja", note: "Office and operations" },
  { name: "Lagos", note: "Operational location" },
  { name: "Port Harcourt", note: "Operational location" },
];

export default function HomePage() {
  const img = getImages();
  const showcase = [
    { key: "showcaseCharging", title: "Solar-powered EV charging infrastructure", className: "lg:col-span-7", aspect: "aspect-[16/10] lg:aspect-auto lg:h-[27rem]", href: "/solutions#solar-ev-charging" },
    { key: "showcaseEv", title: "Electric vehicle charging installations", className: "lg:col-span-5", aspect: "aspect-[16/10] lg:aspect-auto lg:h-[27rem]", href: "/solutions#electric-mobility" },
    { key: "showcaseCables", title: "Electrical cable and power infrastructure", className: "lg:col-span-5", aspect: "aspect-[16/10] lg:aspect-auto lg:h-[27rem]", href: "/solutions#cables" },
    { key: "showcaseSolar", title: "Industrial solar energy installations", className: "lg:col-span-7", aspect: "aspect-[16/10] lg:aspect-auto lg:h-[27rem]", href: "/solutions#industrial-solar" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy text-white">
        <Image
          src={img("hero").src}
          alt={img("hero").alt}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="hero-settle -z-20 object-cover object-[60%_70%]"
        />
        <div className="absolute inset-0 -z-10 bg-navy/75 md:bg-transparent md:bg-[linear-gradient(90deg,rgb(16_29_44/0.9)_0%,rgb(16_29_44/0.72)_45%,rgb(16_29_44/0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-[linear-gradient(0deg,rgb(16_29_44/0.85),transparent)]" />

        <div className="wrap flex flex-1 flex-col justify-end pt-32 pb-10 lg:pb-14">
          <p className="eyebrow mb-6 text-white/90">Advancing Clean Energy Across Nigeria.</p>
          <h1 className="display-1 max-w-4xl">Powering the Future of Mobility and Clean Energy.</h1>
          <p className="lead mt-6 max-w-2xl text-white/85">
            Driving the transition to sustainable transportation and intelligent energy solutions through advanced
            electric vehicle charging infrastructure, high-performance electrical systems, and industrial-grade solar
            technology.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/solutions" className="btn btn-primary">
              Explore Our Solutions <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Contact Our Team
            </Link>
          </div>
        </div>

        <div className="border-t border-white/20">
          <div className="wrap flex items-center justify-between gap-6 py-4">
            <ul className="hidden flex-1 grid-cols-4 gap-6 text-sm text-white/85 md:grid">
              {SOLUTIONS.map((s) => (
                <li key={s.id}>
                  <Link href={`/solutions#${s.id}`} className="transition-colors hover:text-white">
                    {s.cardTitle}
                  </Link>
                </li>
              ))}
            </ul>
            <span className="demo-tag ml-auto shrink-0">Demonstration image</span>
          </div>
        </div>
      </section>

      {/* Company introduction */}
      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <h2 className="display-2 text-navy">Engineering a Cleaner, Smarter Energy Future.</h2>
            <div className="mt-7 space-y-5 text-slate lg:text-lg">
              <p>
                5Point Electric Technology Limited is an electric mobility and clean energy solutions provider committed
                to advancing sustainable transportation and energy infrastructure in Nigeria.
              </p>
              <p>
                Through innovative EV charging solutions, solar-powered charging stations, high-grade electrical cables,
                and industrial solar systems, we deliver reliable technologies that support the evolving energy needs of
                individuals, businesses, and industries.
              </p>
            </div>
            <Link href="/about" className="text-link mt-7">
              Learn More About Us <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={120} className="relative aspect-[4/3] overflow-hidden lg:col-span-6">
            <Image
              src={img("intro").src}
              alt={img("intro").alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Core solutions */}
      <section className="bg-mist section">
        <div className="wrap">
          <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end lg:mb-16">
            <h2 className="display-2 text-navy">Our Core Solutions</h2>
            <Link href="/solutions" className="text-link shrink-0">
              View all solutions <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
          <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
            {SOLUTIONS.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 80}>
                <Link href={`/solutions#${s.id}`} className="group flex h-full flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden bg-line">
                    <Image
                      src={img(s.imageKey).src}
                      alt={img(s.imageKey).alt}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-6 text-[1.375rem] text-navy">{s.cardTitle}</h3>
                  <p className="mt-3 flex-1 text-[0.9844rem] text-slate">{s.cardText}</p>
                  <span className="text-link mt-5">
                    Explore Solution <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Why choose */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow mb-5 text-slate">Why Choose 5Point Electric Technology?</p>
              <h2 className="display-2 text-navy">
                Built on Engineering. Driven by Innovation. Powered by Sustainability.
              </h2>
            </div>
          </Reveal>
          <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {ADVANTAGES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-white p-7 lg:p-8">
                <Icon size={26} strokeWidth={1.5} className="text-blue-ink" aria-hidden="true" />
                <h3 className="mt-5 text-lg text-navy">{title}</h3>
                <p className="mt-2 text-[0.9688rem] text-slate">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reach */}
      <section className="bg-navy section overflow-hidden text-white">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5 text-white/80">Our Impact and Reach</p>
            <h2 className="display-2">Bringing Clean Energy Solutions Closer to You.</h2>
            <p className="lead mt-6 text-white/75">
              We operate across three major Nigerian commercial cities, supporting customers with EV charging, solar, and
              electrical infrastructure solutions.
            </p>
            <ul className="mt-9 border-t border-white/20">
              {LOCATIONS.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between gap-4 border-b border-white/20 py-4">
                  <span className="font-display text-xl font-semibold">{l.name}</span>
                  <span className="text-sm text-white/65">{l.note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <NigeriaMap />
          </Reveal>
        </div>
      </section>

      {/* Showcase */}
      <section className="section">
        <div className="wrap">
          <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end lg:mb-16">
            <div>
              <h2 className="display-2 max-w-3xl text-navy">Featured Solutions</h2>
              <p className="lead mt-5 max-w-2xl text-slate">
                The kinds of infrastructure we work with. These are demonstration images, and verified 5Point projects
                will be published as they are documented.
              </p>
            </div>
            <Link href="/projects" className="text-link shrink-0">
              View projects <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
          <ul className="grid gap-x-6 gap-y-9 lg:grid-cols-12">
            {showcase.map((item) => (
              <Reveal as="li" key={item.key} className={item.className}>
                <Link href={item.href} className="group flex h-full flex-col">
                  <div className={`relative overflow-hidden bg-mist ${item.aspect}`}>
                    <Image
                      src={img(item.key).src}
                      alt={img(item.key).alt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                    />
                    <span className="demo-tag absolute top-3 left-3">Demonstration image</span>
                  </div>
                  <h3 className="mt-4 flex items-center justify-between gap-3 text-lg text-navy">
                    {item.title}
                    <ArrowRight size={18} className="shrink-0 text-blue-ink" aria-hidden="true" />
                  </h3>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Sustainability */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <Image
          src={img("sustainability").src}
          alt={img("sustainability").alt}
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy/70" />
        <div className="wrap py-24 lg:py-32">
          <Reveal className="max-w-3xl">
            <h2 className="display-2">Accelerating the Transition to Sustainable Energy.</h2>
            <p className="lead mt-6 text-white/85">
              We believe the future of transportation and energy must be cleaner, more efficient, and more sustainable.
              Our solutions bring together electric mobility and renewable energy technologies to support a more resilient
              energy future.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-3 lg:mt-20">
            {[
              { key: "industrialSolar", label: "Solar panels" },
              { key: "solarCharging", label: "EV charging stations" },
              { key: "electricVehicles", label: "Electric vehicles" },
            ].map((tile, i) => (
              <Reveal as="li" key={tile.key} delay={i * 90}>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image src={img(tile.key).src} alt={img(tile.key).alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <p className="font-display mt-3 font-medium">{tile.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-ink text-white">
        <div className="wrap grid items-end gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <Reveal className="lg:col-span-8">
            <h2 className="display-2">Let&apos;s Build the Future of Energy Together.</h2>
            <p className="lead mt-5 max-w-2xl text-white/90">
              Whether you&apos;re exploring electric mobility, planning an EV charging station, or seeking reliable
              industrial solar solutions, our team is ready to help.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
            <Link href="/quote" className="btn btn-light">
              Request a Consultation
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
