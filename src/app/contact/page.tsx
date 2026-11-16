import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { StationVideo } from "@/components/StationVideo";
import { getSettings } from "@/lib/content";
import { mapsDirectionsHref, mapsEmbedSrc, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us: EV Charging & Solar Solutions in Abuja, Lagos, Port Harcourt",
  description:
    "Contact 5Points Electric Technology Limited about EV charging stations, solar systems, and electrical cables. Office in the Central Business District, Abuja, Nigeria.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const s = getSettings();
  const whatsapp = whatsappHref(s.whatsappNumber, s.whatsappMessage);
  const row = "flex gap-4 border-b border-ink/15 py-5";
  const icon = "mt-1 shrink-0 text-deep";
  const label = "label text-stone";
  const pending = "text-stone";

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Talk to our team."
        lead="Tell us about your project, and we'll help you find the right electric mobility or clean energy solution."
      />

      <section id="enquiry" className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="d-3 max-w-[14ch]">{s.companyName}</h2>
            <div className="mt-6 border-t border-ink/15">
              <div className={row}>
                <MapPin size={20} className={icon} aria-hidden="true" />
                <div>
                  <p className={label}>Office address</p>
                  <address className="mt-0.5 not-italic">{s.address}</address>
                </div>
              </div>
              <div className={row}>
                <Phone size={20} className={icon} aria-hidden="true" />
                <div>
                  <p className={label}>Phone</p>
                  {s.phone ? <a className="mt-0.5 block hover:text-deep" href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a> : <p className={`mt-0.5 ${pending}`}>To be confirmed</p>}
                </div>
              </div>
              <div className={row}>
                <Mail size={20} className={icon} aria-hidden="true" />
                <div>
                  <p className={label}>Email</p>
                  {s.email ? <a className="mt-0.5 block hover:text-deep" href={`mailto:${s.email}`}>{s.email}</a> : <p className={`mt-0.5 ${pending}`}>To be confirmed</p>}
                </div>
              </div>
              {whatsapp && (
                <div className={row}>
                  <MessageCircle size={20} className={icon} aria-hidden="true" />
                  <div>
                    <p className={label}>WhatsApp</p>
                    <a className="mt-0.5 block hover:text-deep" href={whatsapp} target="_blank" rel="noopener noreferrer">Chat with our team</a>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8">
              <h3 className="label text-stone">Operational locations</h3>
              <p className="mt-2">{s.locations.join(", ").replace(/, ([^,]*)$/, ", and $1")}.</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="d-3 mb-9">Send us an enquiry</h2>
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section id="office" aria-labelledby="map-title" className="wrap pb-20 lg:pb-32">
        <div className="flex flex-col justify-between gap-3 pb-7 sm:flex-row sm:items-end">
          <h2 id="map-title" className="d-3">Our Abuja office</h2>
          <a href={mapsDirectionsHref(s.mapQuery)} target="_blank" rel="noopener noreferrer" className="link-arrow">
            Open in Google Maps <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <iframe
            title="Map showing the 5Points Electric Technology office in Abuja"
            src={mapsEmbedSrc(s.mapQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[30rem] w-full rounded-[14px] border-0 lg:col-span-8 lg:h-[38rem]"
          />
          <div className="relative lg:col-span-4">
            <StationVideo
              src="/videos/station-canopy.mp4"
              poster="/images/station/poster-canopy.jpg"
              label="Electric cars parked under the 5Points solar charging canopy at the Silverbird Entertainment Centre"
              className="aspect-[4/5] lg:aspect-auto lg:h-full"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 rounded-t-[14px] bg-gradient-to-b from-ink/75 to-transparent p-5 pb-16 text-white">
              <p className="label text-leaf">Charge your EV here</p>
              <p className="mt-2 text-[0.85rem] leading-snug">Our solar-powered charging station is on site at the Silverbird Entertainment Centre.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
