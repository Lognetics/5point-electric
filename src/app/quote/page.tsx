import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Get a Quote: EV Charging, Solar Systems & Cables in Nigeria",
  description:
    "Request a quotation or consultation from 5Point Electric Technology for EV charging stations, industrial solar systems, electric vehicles, and AC and DC cables in Nigeria.",
  alternates: { canonical: "/quote" },
};

const STEPS = [
  { title: "Share your requirements", text: "Tell us what you need, where it is, and any details you already have." },
  { title: "We review the details", text: "Our team looks at your request and follows up if we need more information." },
  { title: "Receive our response", text: "We get back to you to discuss your quotation or arrange a consultation." },
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title="Request a quote or consultation."
        lead="Whether you're planning a charging station or sourcing cables, share the details and our team will take it from there."
      />
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-2xl text-navy">What happens next</h2>
            <ol className="mt-6 border-t border-line">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4 border-b border-line py-5">
                  <span className="font-display font-semibold text-blue-ink">{i + 1}</span>
                  <div>
                    <h3 className="text-base text-navy">{step.title}</h3>
                    <p className="mt-1 text-[0.9688rem] text-slate">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-8">
            <EnquiryForm
              type="quote"
              submitLabel="Request Quote"
              messageLabel="Project Requirements"
              messagePlaceholder="What do you need, in what quantity, and by when?"
            />
          </div>
        </div>
      </section>
    </>
  );
}
