import Image from "next/image";
import Link from "next/link";
import type { Promo } from "@/lib/content";
import { Cta } from "./Cta";
import { PromoBadge, PromoCountdown, PromoGate, PromoPhones } from "./Promo";
import { Reveal } from "./Reveal";

/** Limited-time offer shown straight after the home hero. */
export function PromoBanner({ promo }: { promo: Promo }) {
  return (
    <PromoGate endsAt={promo.endsAt}>
      <section id="promo" aria-labelledby="promo-title" className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-[20%] h-[34rem] w-[34rem] rounded-full bg-promo/25 blur-[140px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-56 right-[5%] h-[30rem] w-[30rem] rounded-full bg-green/25 blur-[140px]" />
        <div className="wrap relative grid gap-10 py-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-28">
          <Reveal className="lg:col-span-7">
            <Link
              href={promo.primary.href}
              className="group block overflow-hidden rounded-[16px] shadow-[0_30px_80px_-30px_rgba(227,38,47,0.45)] ring-1 ring-white/10"
            >
              <Image
                src={promo.image.src}
                alt={promo.image.alt}
                width={1280}
                height={720}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="block h-auto w-full transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.025]"
              />
            </Link>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <PromoBadge>{promo.eyebrow} · Limited time</PromoBadge>
            <h2 id="promo-title" className="d-3 mt-6 max-w-[18ch]">
              {promo.title}
            </h2>
            <p className="lead mt-5 text-white/70">{promo.text}</p>
            <p className="label mt-8 mb-3 text-white/55">Offer ends {promo.endsLabel}</p>
            <PromoCountdown endsAt={promo.endsAt} />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Cta href={promo.primary.href} variant="leaf">{promo.primary.label}</Cta>
              {promo.secondary && <Cta href={promo.secondary.href} variant="glass">{promo.secondary.label}</Cta>}
            </div>
            <PromoPhones phones={promo.phones} className="mt-6" />
          </Reveal>
        </div>
      </section>
    </PromoGate>
  );
}
