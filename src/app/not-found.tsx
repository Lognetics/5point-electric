import { Cta } from "@/components/Cta";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <PageHero eyebrow="Page not found" title="We couldn't find that page." lead="It may have moved, or the link may be out of date.">
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Cta href="/" variant="leaf">Back to Home</Cta>
        <Cta href="/contact" variant="glass">Contact Us</Cta>
      </div>
    </PageHero>
  );
}
