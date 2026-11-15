import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";
import { CarCard } from "@/components/CarCard";
import { CarGallery } from "@/components/CarGallery";
import { ArrowRoll } from "@/components/Cta";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Reveal } from "@/components/Reveal";
import { getCars, getSettings } from "@/lib/content";
import { bodyTypeLabel, formatPrice, powertrainLabel } from "@/lib/cars";
import { SITE_URL, whatsappHref } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => getCars().find((c) => c.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return getCars().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = find((await params).slug);
  if (!car) return {};
  const title = `${car.title} | ${car.headline}`;
  return {
    title,
    description: `${car.summary} ${formatPrice(car.price)}. Available in Nigeria from 5Point Electric Technology.`,
    alternates: { canonical: `/cars/${car.slug}` },
    openGraph: { title, description: car.summary, images: [car.images[0].src] },
  };
}

export default async function CarPage({ params }: Props) {
  const car = find((await params).slug);
  if (!car) notFound();
  const s = getSettings();
  const whatsapp = whatsappHref(s.whatsappNumber, `Hello 5Point Electric Technology, I'm interested in the ${car.title}.`);
  const related = getCars()
    .filter((c) => c.slug !== car.slug)
    .sort((a, b) => Number(b.powertrain === car.powertrain) - Number(a.powertrain === car.powertrain))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: car.title,
    brand: { "@type": "Brand", name: car.make },
    model: car.model,
    vehicleModelDate: String(car.year),
    description: car.summary,
    image: car.images.slice(0, 5).map((i) => `${SITE_URL}${i.src}`),
    ...(car.price && {
      offers: {
        "@type": "Offer",
        price: car.price,
        priceCurrency: "NGN",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/cars/${car.slug}`,
        seller: { "@type": "Organization", name: s.companyName },
      },
    }),
  };

  return (
    <>
      <section className="bg-ink pt-28 pb-16 text-white lg:pt-36 lg:pb-24">
        <div className="wrap">
          <Link href="/cars" className="link-arrow">
            <ArrowLeft size={16} aria-hidden="true" /> All cars
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <CarGallery images={car.images} title={car.title} />
            </div>
            <div className="min-w-0 lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="label text-leaf">
                  {powertrainLabel(car.powertrain)} · {bodyTypeLabel(car.bodyType)}
                </p>
                <h1 className="d-2 mt-4">{car.title}</h1>
                <p className="mt-2 text-white/60">{car.headline}</p>
                <p className="mt-7 text-[1.8rem] font-medium tracking-[-0.03em]">{formatPrice(car.price)}</p>
                <p className="lead mt-5 text-white/75">{car.summary}</p>

                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[12px] bg-white/12">
                  {car.highlights.map((h) => (
                    <div key={h.label} className="bg-ink p-4">
                      <dt className="label text-white/50">{h.label}</dt>
                      <dd className="mt-1.5 text-[1.2rem] tracking-[-0.02em]">{h.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                  <a href="#enquiry" className="btn btn-leaf">
                    Enquire about this car
                    <ArrowRoll />
                  </a>
                  {whatsapp && (
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-glass">
                      Ask on WhatsApp
                      <span className="btn-ic grid place-items-center" aria-hidden="true">
                        <MessageCircle size={17} className="!static" />
                      </span>
                    </a>
                  )}
                </div>
                {car.availability && (
                  <p className="mt-6 flex gap-2.5 text-[0.85rem] text-white/75">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
                    {car.availability}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label mb-4 text-deep">Specifications</p>
            <h2 className="d-3 max-w-[12ch]">{car.make} {car.model} at a glance</h2>
          </div>
          <Reveal className="lg:col-span-8">
            <dl className="border-t border-ink/15">
              {car.specifications.map((spec) => (
                <div key={spec.label} className="grid gap-1 border-b border-ink/15 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="label pt-0.5 text-stone">{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="enquiry" className="bg-white">
        <div className="wrap section grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="d-3 max-w-[14ch]">Interested in the {car.make} {car.model}?</h2>
            <p className="mt-5 max-w-md text-stone">
              Send us your details and our team will confirm price, availability, and pickup or delivery. Your enquiry will
              reference the <strong className="font-medium text-ink">{car.title}</strong>.
            </p>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm
              type="product"
              product={car.title}
              defaultService="Electric Vehicles"
              submitLabel="Send Enquiry"
              messagePlaceholder={`I'd like to know more about the ${car.title}.`}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="d-3">More cars</h2>
            <Link href="/cars" className="link-arrow shrink-0">View all cars</Link>
          </div>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((c) => (
              <li key={c.slug}>
                <CarCard car={c} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
