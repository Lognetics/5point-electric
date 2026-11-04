import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Cta } from "@/components/Cta";
import { PageHero } from "@/components/PageHero";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
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
        image={img("sustainability")}
      >
        <ul className="mt-7 space-y-2 text-[0.9688rem]">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="group inline-flex gap-3">
                <span className="label pt-1 text-leaf">0{i + 1}</span>
                <span className="underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-white">{s.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {SECTIONS.map((s, i) => (
        <section key={s.id} id={s.id} className="section border-b border-ink/10 last:border-0">
          <div className="wrap">
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <p className="label text-deep lg:col-span-2">0{i + 1} / 04</p>
              <SplitReveal className="d-2 lg:col-span-10">{s.title}</SplitReveal>
            </div>
            <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <ParallaxImage src={img(s.imageKey).src} alt={img(s.imageKey).alt} sizes="(min-width: 1024px) 58vw, 100vw" demo="Demonstration image" className="aspect-[4/3]" />
              </div>
              <Reveal className={`flex flex-col justify-end lg:col-span-4 ${i % 2 === 1 ? "lg:order-1" : "lg:col-start-9"}`}>
                <p className="lead text-stone">{s.text}</p>
                <ul className="mt-8 border-t border-ink/15">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 border-b border-ink/15 py-3.5 text-[0.9844rem]">
                      <Check size={19} className="mt-0.5 shrink-0 text-deep" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  <Cta href={contactHref(s.service)}>Discuss Your Project</Cta>
                </div>
              </Reveal>
            </div>

            {s.id === "solar-ev-charging" && (
              <div className="mt-20 rounded-[14px] bg-ink p-7 text-white lg:mt-32 lg:p-16">
                <p className="label mb-6 text-leaf">How it works</p>
                <SplitReveal as="h3" className="d-2 max-w-[16ch]">How solar-powered EV charging works</SplitReveal>
                <ol className="mt-12 grid gap-px overflow-hidden rounded-[10px] bg-white/12 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
                  {STEPS.map((step, n) => (
                    <Reveal as="li" key={step.title} delay={n * 90} className="bg-ink p-6 lg:p-8">
                      <span className="block text-[3.5rem] leading-none font-medium tracking-[-0.05em] text-leaf">{n + 1}</span>
                      <h4 className="mt-10 text-[1.375rem] lg:mt-16">{step.title}</h4>
                      <p className="mt-3 text-[0.9688rem] text-white/65">{step.text}</p>
                    </Reveal>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
