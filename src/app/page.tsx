import type { Metadata } from "next";
import { Cpu, HardHat, Headset, Leaf, Lightbulb, ShieldCheck } from "lucide-react";
import { Cta } from "@/components/Cta";
import { ExpandingImage } from "@/components/ExpandingImage";
import { HomeHero } from "@/components/HomeHero";
import { HorizontalShowcase } from "@/components/HorizontalShowcase";
import { ApertureOutline } from "@/components/Logo";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ReachMap } from "@/components/ReachMap";
import { Reveal } from "@/components/Reveal";
import { ScrubSpin } from "@/components/ScrubSpin";
import { SplitReveal } from "@/components/SplitReveal";
import { StackedSolutions } from "@/components/StackedSolutions";
import { WordScrub } from "@/components/WordScrub";
import { CarCard } from "@/components/CarCard";
import { getCars, getHero, getImages } from "@/lib/content";
import { formatPrice, POWERTRAINS } from "@/lib/cars";
import { SOLUTIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "EV Charging & Solar Energy Solutions in Nigeria | 5Points Electric Technology" },
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

export default function HomePage() {
  const img = getImages();
  const cars = getCars();
  const featured = cars.filter((c) => c.featured).slice(0, 4);
  const hero = getHero();
  const slides = hero.slides.map((slide) => {
    const car = slide.car ? cars.find((c) => c.slug === slide.car) : undefined;
    return {
      eyebrow: slide.eyebrow,
      title: slide.title,
      tab: slide.tab,
      image: slide.image,
      primary: slide.primary,
      secondary: slide.secondary,
      text: slide.text || car?.summary || "",
      price: car ? formatPrice(car.price) : undefined,
      stats: car?.highlights.slice(0, 3),
    };
  });

  return (
    <>
      <HomeHero slides={slides} interval={hero.interval} marquee={SOLUTIONS.map((s) => s.cardTitle)} />

      {/* Company introduction */}
      <section className="section">
        <div className="wrap">
          <p className="label mb-7 text-deep">About 5Points</p>
          <SplitReveal className="d-2 max-w-[16ch]">Engineering a Cleaner, Smarter Energy Future.</SplitReveal>

          <div className="mt-14 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
            <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
              <ParallaxImage
                src={img("introSecondary").src}
                alt={img("introSecondary").alt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/5]"
              />
            </div>
            <div className="flex flex-col justify-between gap-12 lg:col-span-6 lg:col-start-7">
              <div className="space-y-7">
                <WordScrub
                  className="d-3"
                  text="5Points Electric Technology Limited is an electric mobility and clean energy solutions provider committed to advancing sustainable transportation and energy infrastructure in Nigeria."
                />
                <Reveal>
                  <p className="lead text-stone">
                    Through innovative EV charging solutions, solar-powered charging stations, high-grade electrical
                    cables, and industrial solar systems, we deliver reliable technologies that support the evolving
                    energy needs of individuals, businesses, and industries.
                  </p>
                  <div className="mt-8">
                    <Cta href="/about">Learn More About Us</Cta>
                  </div>
                </Reveal>
              </div>
              <ParallaxImage src={img("intro").src} alt={img("intro").alt} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10]" />
            </div>
          </div>
        </div>
      </section>

      {/* Cars for sale */}
      <section className="section bg-white">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label mb-7 text-deep">Shop Cars</p>
              <SplitReveal className="d-2 max-w-[14ch]">Electric vehicles, available now.</SplitReveal>
            </div>
            <Reveal className="lg:col-span-4 lg:col-start-9">
              <p className="lead text-stone">
                Fully electric and plug-in hybrid cars from Xiaomi, ZEEKR, AVATR, Geely, and BYD, ready for pickup and
                delivery nationwide.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {POWERTRAINS.map((p) => (
                  <a key={p.id} href={`/cars?type=${p.id}`} className="rounded-full border border-ink/20 px-4 py-2 text-[0.775rem] transition-colors hover:border-ink">
                    {p.label} <span className="ml-1 text-stone">{cars.filter((c) => c.powertrain === p.id).length}</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
          <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 xl:grid-cols-4">
            {featured.map((car, i) => (
              <Reveal as="li" key={car.slug} delay={i * 80}>
                <CarCard car={car} />
              </Reveal>
            ))}
          </ul>
          <div className="mt-14 flex justify-center">
            <Cta href="/cars">Shop all {cars.length} cars</Cta>
          </div>
        </div>
      </section>

      {/* Core solutions */}
      <section aria-label="Our Core Solutions" className="bg-ink text-white">
        <div className="wrap flex flex-col justify-between gap-6 pt-24 pb-16 md:flex-row md:items-end lg:pt-36 lg:pb-24">
          <div>
            <p className="label mb-7 text-leaf">What we do</p>
            <SplitReveal className="d-2">Our Core Solutions</SplitReveal>
          </div>
          <Reveal>
            <Cta href="/solutions" variant="glass">View all solutions</Cta>
          </Reveal>
        </div>
        <StackedSolutions
          panels={SOLUTIONS.map((s) => ({ id: s.id, title: s.cardTitle, text: s.cardText, image: img(s.imageKey) }))}
        />
      </section>

      {/* Why choose */}
      <section className="section relative overflow-hidden bg-ink text-white">
        <ScrubSpin className="pointer-events-none absolute -top-[12vw] -right-[18vw] w-[62vw] text-leaf/40">
          <ApertureOutline strokeWidth={0.22} />
        </ScrubSpin>
        <div className="wrap relative">
          <p className="label mb-7 text-leaf">Why Choose 5Points Electric Technology?</p>
          <SplitReveal className="d-1 max-w-[17ch]">Built on Engineering. Driven by Innovation. Powered by Sustainability.</SplitReveal>
          <ul className="mt-16 grid border-t border-l border-white/12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3">
            {ADVANTAGES.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                as="li"
                key={title}
                delay={i * 60}
                className="border-r border-b border-white/12 p-7 backdrop-blur-[2px] transition-colors duration-500 hover:bg-white/[0.04] lg:p-10"
              >
                <div className="flex items-start justify-between">
                  <Icon size={30} strokeWidth={1.25} className="text-leaf" aria-hidden="true" />
                  <span className="label text-white/35">0{i + 1}</span>
                </div>
                <h3 className="mt-14 text-[1.2rem] leading-tight lg:mt-20">{title}</h3>
                <p className="mt-3 text-white/60">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Reach */}
      <section className="section bg-forest text-white">
        <div className="wrap">
          <p className="label mb-7 text-leaf">Our Impact and Reach</p>
          <div className="grid gap-8 lg:grid-cols-12">
            <SplitReveal className="d-2 lg:col-span-8">Bringing Clean Energy Solutions Closer to You.</SplitReveal>
            <Reveal className="flex items-end lg:col-span-4">
              <p className="lead text-white/70">
                We operate across three major Nigerian commercial cities, supporting customers with EV charging, solar,
                and electrical infrastructure solutions.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 lg:mt-20">
            <ReachMap />
          </div>
        </div>
      </section>

      {/* Showcase */}
      <HorizontalShowcase
        intro="The kinds of infrastructure we work with. These are demonstration images, and verified 5Points projects will be published as they are documented."
        items={[
          { title: "Solar-powered EV charging infrastructure", href: "/solutions#solar-ev-charging", image: img("showcaseCharging") },
          { title: "Electric vehicle charging installations", href: "/solutions#electric-mobility", image: img("showcaseEv") },
          { title: "Industrial solar energy installations", href: "/solutions#industrial-solar", image: img("showcaseSolar") },
          { title: "Electrical cable and power infrastructure", href: "/solutions#cables", image: img("showcaseCables") },
        ]}
      />

      {/* Sustainability */}
      <ExpandingImage image={img("sustainability")}>
        <div className="wrap flex min-h-[115svh] flex-col justify-between gap-16 py-28 lg:py-36">
          <div className="max-w-5xl">
            <SplitReveal className="d-1">Accelerating the Transition to Sustainable Energy.</SplitReveal>
            <Reveal delay={150}>
              <p className="lead mt-8 max-w-2xl text-white/90">
                We believe the future of transportation and energy must be cleaner, more efficient, and more sustainable.
                Our solutions bring together electric mobility and renewable energy technologies to support a more
                resilient energy future.
              </p>
            </Reveal>
          </div>
          <ul className="grid gap-5 sm:grid-cols-3">
            {[
              { key: "intro", label: "Solar panels" },
              { key: "solarCharging", label: "EV charging stations" },
              { key: "electricVehicles", label: "Electric vehicles" },
            ].map((tile, i) => (
              <Reveal as="li" key={tile.label} delay={i * 90}>
                <ParallaxImage src={img(tile.key).src} alt={img(tile.key).alt} sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[3/2]" />
                <p className="label mt-3">{tile.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </ExpandingImage>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-deep text-white">
        <ScrubSpin className="pointer-events-none absolute top-1/2 -right-[14vw] w-[58vw] -translate-y-1/2 text-white/30" turn={150}>
          <ApertureOutline strokeWidth={0.22} />
        </ScrubSpin>
        <div className="wrap relative py-24 lg:py-40">
          <SplitReveal className="d-1 max-w-[14ch]">Let&apos;s Build the Future of Energy Together.</SplitReveal>
          <Reveal delay={150}>
            <p className="lead mt-8 max-w-2xl text-white/90">
              Whether you&apos;re exploring electric mobility, planning an EV charging station, or seeking reliable
              industrial solar solutions, our team is ready to help.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Cta href="/quote" variant="white">Request a Consultation</Cta>
              <Cta href="/contact" variant="glass">Contact Us</Cta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
