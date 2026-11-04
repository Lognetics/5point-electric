import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { getSettings } from "@/lib/content";
import { mapsDirectionsHref, mapsEmbedSrc, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us: EV Charging & Solar Solutions in Abuja, Lagos, Port Harcourt",
  description:
    "Contact 5Point Electric Technology Limited about EV charging stations, solar systems, and electrical cables. Office in the Central Business District, Abuja, Nigeria.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const s = getSettings();
  const whatsapp = whatsappHref(s.whatsappNumber, s.whatsappMessage);
  const row = "flex gap-4 border-b border-line py-5";
  const icon = "mt-1 shrink-0 text-blue-ink";
  const label = "text-sm text-slate";
  const pending = "text-slate";

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Talk to our team."
        lead="Tell us about your project, and we'll help you find the right electric mobility or clean energy solution."
      />

      <section id="enquiry" className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] text-navy">{s.companyName}</h2>
            <div className="mt-6 border-t border-line">
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
                  {s.phone ? <a className="mt-0.5 block hover:text-blue-ink" href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a> : <p className={`mt-0.5 ${pending}`}>To be confirmed</p>}
                </div>
              </div>
              <div className={row}>
                <Mail size={20} className={icon} aria-hidden="true" />
                <div>
                  <p className={label}>Email</p>
                  {s.email ? <a className="mt-0.5 block hover:text-blue-ink" href={`mailto:${s.email}`}>{s.email}</a> : <p className={`mt-0.5 ${pending}`}>To be confirmed</p>}
                </div>
              </div>
              {whatsapp && (
                <div className={row}>
                  <MessageCircle size={20} className={icon} aria-hidden="true" />
                  <div>
                    <p className={label}>WhatsApp</p>
                    <a className="mt-0.5 block hover:text-blue-ink" href={whatsapp} target="_blank" rel="noopener noreferrer">Chat with our team</a>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8">
              <h3 className="text-lg text-navy">Operational locations</h3>
              <p className="mt-1.5 text-slate">{s.locations.join(", ").replace(/, ([^,]*)$/, ", and $1")}.</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="mb-7 text-[clamp(1.75rem,3vw,2.5rem)] text-navy">Send us an enquiry</h2>
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="map-title" className="bg-mist">
        <div className="wrap flex flex-col justify-between gap-3 py-8 sm:flex-row sm:items-center">
          <h2 id="map-title" className="text-2xl text-navy">Our Abuja office</h2>
          <a href={mapsDirectionsHref(s.mapQuery)} target="_blank" rel="noopener noreferrer" className="text-link">
            Open in Google Maps <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
        <iframe
          title="Map showing the 5Point Electric Technology office in Abuja"
          src={mapsEmbedSrc(s.mapQuery)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[28rem] w-full border-0"
        />
      </section>
    </>
  );
}
