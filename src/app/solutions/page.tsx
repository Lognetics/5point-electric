import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getImages } from "@/lib/content";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "EV Charging, Solar & Cable Solutions in Nigeria",
  description:
    "Electric mobility solutions, solar EV charging stations, AC and DC electrical cables, and industrial solar systems in Nigeria, including EV charging solutions in Abuja.",
  alternates: { canonical: "/solutions" },
};

const SECTIONS = [
  {
    id: "electric-mobility",
    imageKey: "electricVehicles",
    service: "Electric Vehicles",
    title: "Electric Mobility Solutions",
    text: "We support the move to cleaner transportation in Nigeria with electric mobility technologies, EV infrastructure, and the supporting solutions that make electric vehicles practical to adopt and run.",
    points: ["Electric vehicle solutions and technologies", "EV charging infrastructure planning", "Support for individuals, businesses, and institutions"],
  },
  {
    id: "solar-ev-charging",
    imageKey: "solarCharging",
    service: "Solar-Powered EV Charging Stations",
    title: "Solar-Powered EV Charging Infrastructure",
    text: "A solar-powered EV charging station generates clean electricity on site and uses it to charge vehicles. It is a practical way to build charging infrastructure in Nigeria while easing reliance on conventional power.",
    points: ["Renewable energy integration, with solar generation built into the charging site", "Reduced grid dependence, using on-site solar energy to power charging", "Sustainable charging infrastructure that supports the growth of electric mobility"],
  },
  {
    id: "cables",
    imageKey: "cables",
    service: "AC & DC Cables",
    title: "Electrical Cables and Power Infrastructure",
    text: "Reliable energy systems depend on the cables that connect them. We provide high-grade AC and DC electrical cables in Nigeria for electrical installations and power distribution applications.",
    points: ["AC cables for electrical installations and distribution", "DC cables for solar and charging applications", "Selected to suit the demands of each application"],
  },
  {
    id: "industrial-solar",
    imageKey: "industrialSolar",
    service: "Industrial Solar Systems",
    title: "Industrial Solar Energy Solutions",
    text: "We deliver industrial solar systems in Nigeria, designed for commercial, industrial, and institutional sites that need dependable and efficient energy.",
    points: ["Solar energy systems for commercial and industrial applications", "Solar panels, inverters, and battery energy storage", "Solutions shaped around how each site uses energy"],
  },
];

const STEPS = [
  { title: "Solar generation", text: "Solar panels, often on a canopy above the parking bays, convert sunlight into electricity." },
  { title: "Power conversion", text: "Inverters and control equipment condition that electricity and direct it where it is needed." },
  { title: "Energy storage", text: "Where a design includes batteries, surplus solar energy is stored for later use." },
  { title: "Vehicle charging", text: "The charger delivers power to the vehicle through its connector, and the driver plugs in and charges." },
];

export default function SolutionsPage() {
  const img = getImages();
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Connected solutions for mobility and clean energy."
        lead="From the solar panels that generate power to the cables that carry it and the chargers that deliver it, our four business areas work together."
        image={img("showcaseCharging")}
      >
        <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-2.5 text-[0.9375rem]">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {SECTIONS.map((s, i) => (
        <section key={s.id} id={s.id} className={`section ${i % 2 === 1 ? "bg-mist" : ""}`}>
          <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className={`relative aspect-[4/3] overflow-hidden lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <Image src={img(s.imageKey).src} alt={img(s.imageKey).alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
            </Reveal>
            <Reveal delay={100} className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <h2 className="text-[clamp(1.75rem,3vw,2.625rem)] text-navy">{s.title}</h2>
              <p className="mt-5 text-slate lg:text-lg">{s.text}</p>
              <ul className="mt-7 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.9844rem]">
                    <Check size={20} className="mt-0.5 shrink-0 text-[#1F8F4E]" aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link href={contactHref(s.service)} className="btn btn-primary mt-8">
                Discuss Your Project <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          {s.id === "solar-ev-charging" && (
            <div className="wrap mt-16 lg:mt-24">
              <div className="bg-navy p-8 text-white lg:p-14">
                <h3 className="text-[clamp(1.5rem,2.4vw,2.125rem)]">How solar-powered EV charging works</h3>
                <div className="energy-line mt-9 hidden h-0.5 md:block" aria-hidden="true" />
                <ol className="mt-8 grid gap-8 md:mt-7 md:grid-cols-4">
                  {STEPS.map((step, n) => (
                    <li key={step.title}>
                      <span className="font-display text-sm font-semibold text-green">Step {n + 1}</span>
                      <h4 className="mt-2 text-lg">{step.title}</h4>
                      <p className="mt-2 text-[0.9375rem] text-white/75">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </section>
      ))}
    </>
  );
}
