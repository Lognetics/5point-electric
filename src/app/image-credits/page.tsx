import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getCredits } from "@/lib/content";

export const metadata: Metadata = {
  title: "Image Credits",
  description: "Sources and licences for photography used on this website.",
  alternates: { canonical: "/image-credits" },
  robots: { index: false, follow: true },
};

export default function ImageCreditsPage() {
  return (
    <>
      <PageHero
        eyebrow="Image Credits"
        title="Photography sources and licences."
        lead="These demonstration images come from Pexels and Wikimedia Commons. They do not depict 5Point projects, and the people and sites shown have no connection with the company."
      />
      <section className="section">
        <div className="wrap max-w-4xl">
          <p className="text-stone">
            Images have been cropped and colour adjusted, and vehicle badges, number plates, and product labels have been
            obscured where visible. Adaptations of CC BY-SA images are shared under the same licence.
          </p>
          <ul className="mt-8 border-t border-ink/15">
            {getCredits().map((c) => (
              <li key={c.source} className="border-b border-ink/15 py-4 text-[0.775rem]">
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="font-medium text-deep hover:underline">
                  {c.title}
                </a>
                <span className="text-stone">
                  {" "}by {c.author},{" "}
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{c.license}</a>
                  ) : (
                    c.license
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
