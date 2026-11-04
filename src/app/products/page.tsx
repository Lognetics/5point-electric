import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Cta } from "@/components/Cta";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { getProducts } from "@/lib/content";
import { PRODUCT_CATEGORIES } from "@/lib/taxonomy";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products: EV Chargers, Solar Systems & AC and DC Cables in Nigeria",
  description:
    "Browse electric vehicles, EV charging equipment, AC and DC electrical cables, solar panels, inverters, and battery energy storage from 5Point Electric Technology in Nigeria.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const products = getProducts();
  const hasSamples = products.some((p) => p.sample);
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Products for electric mobility and clean energy."
        lead="Browse our catalogue by category and request information on anything you need for your project."
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-20">
          <nav aria-label="Product categories" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="label mb-4 text-stone">Categories</h2>
            <ul className="flex flex-wrap gap-2 lg:block lg:space-y-0 lg:border-t lg:border-ink/15">
              {PRODUCT_CATEGORIES.map((c) => (
                <li key={c.id} className="lg:border-b lg:border-ink/15">
                  <a
                    href={`#${c.id}`}
                    className="inline-block rounded-full border border-ink/20 px-3.5 py-2 text-[0.725rem] leading-snug transition-colors hover:border-ink lg:block lg:rounded-none lg:border-0 lg:px-0 lg:py-3 lg:hover:text-deep"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            {hasSamples && (
              <p className="mb-14 rounded-[10px] bg-white px-5 py-4 text-[0.775rem] text-stone">
                Listings marked &ldquo;Sample listing&rdquo; show how the catalogue will look. They are not real products,
                and verified details will replace them.
              </p>
            )}
            <div className="space-y-20 lg:space-y-28">
              {PRODUCT_CATEGORIES.map((category, n) => {
                const items = products.filter((p) => p.category === category.id);
                return (
                  <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`}>
                    <p className="label mb-4 text-deep">{String(n + 1).padStart(2, "0")} / {String(PRODUCT_CATEGORIES.length).padStart(2, "0")}</p>
                    <h2 id={`${category.id}-title`} className="d-3">{category.label}</h2>
                    <p className="mt-3 max-w-2xl text-stone">{category.blurb}</p>
                    {items.length > 0 ? (
                      <ul className={`mt-9 grid gap-x-7 gap-y-12 ${items.length > 1 ? "sm:grid-cols-2" : ""}`}>
                        {items.map((product) => (
                          <Reveal as="li" key={product.slug}>
                            <Link
                              href={`/products/${product.slug}`}
                              className={`group grid h-full overflow-hidden rounded-[14px] bg-white ${items.length === 1 ? "md:grid-cols-2" : ""}`}
                            >
                              <div className={`relative overflow-hidden bg-moss ${items.length === 1 ? "aspect-[16/11] md:aspect-auto md:min-h-[22rem]" : "aspect-[16/11]"}`}>
                                <Image
                                  src={product.image}
                                  alt={product.imageAlt}
                                  fill
                                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw"
                                  className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.04]"
                                />
                                {product.sample && <span className="demo-tag absolute top-3.5 left-3.5">Sample listing</span>}
                              </div>
                              <div className="flex flex-col p-6 lg:p-8">
                                <h3 className="text-[1.2rem] leading-tight">{product.title}</h3>
                                <p className="mt-3 flex-1 text-[0.775rem] text-stone">{product.summary}</p>
                                <span className="link-arrow mt-7 self-start">
                                  Request Product Information <ArrowUpRight size={16} aria-hidden="true" />
                                </span>
                              </div>
                            </Link>
                          </Reveal>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-9 flex flex-col items-start justify-between gap-5 rounded-[14px] bg-white p-6 sm:flex-row sm:items-center lg:p-8">
                        <p className="text-stone">Verified listings are coming soon. Ask us about availability in this category.</p>
                        <Cta href={contactHref(category.service)} className="shrink-0">Request Product Information</Cta>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
