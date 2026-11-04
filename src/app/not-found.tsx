import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <PageHero eyebrow="Page not found" title="We couldn't find that page." lead="It may have moved, or the link may be out of date.">
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">Back to Home</Link>
        <Link href="/contact" className="btn btn-ghost-light">Contact Us</Link>
      </div>
    </PageHero>
  );
}
