import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        <div className="wrap grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <nav aria-label="Product categories" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="mb-3 text-sm font-medium text-slate">Categories</h2>
            <ul className="flex flex-wrap gap-2 lg:block lg:space-y-1">
              {PRODUCT_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="inline-block rounded-[3px] border border-line px-3 py-2 text-[0.9063rem] leading-snug transition-colors hover:border-navy lg:block lg:border-0 lg:px-0 lg:py-1.5 lg:hover:text-blue-ink"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            {hasSamples && (
              <p className="mb-12 border-l-2 border-green bg-mist px-5 py-4 text-[0.9688rem]">
                Listings marked &ldquo;Sample listing&rdquo; show how the catalogue will look. They are not real products,
                and verified details will replace them.
              </p>
            )}
            <div className="space-y-16 lg:space-y-20">
              {PRODUCT_CATEGORIES.map((category) => {
                const items = products.filter((p) => p.category === category.id);
                return (
                  <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`}>
                    <div className="border-b border-line pb-5">
                      <h2 id={`${category.id}-title`} className="text-[clamp(1.5rem,2.4vw,2.125rem)] text-navy">
                        {category.label}
                      </h2>
                      <p className="mt-2 max-w-2xl text-slate">{category.blurb}</p>
                    </div>
                    {items.length > 0 ? (
                      <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
                        {items.map((product) => (
                          <li key={product.slug} className="flex flex-col">
                            <Link href={`/products/${product.slug}`} className="group block">
                              <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                                <Image
                                  src={product.image}
                                  alt={product.imageAlt}
                                  fill
                                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw"
                                  className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                                />
                                {product.sample && <span className="demo-tag absolute top-3 left-3">Sample listing</span>}
                              </div>
                              <h3 className="mt-5 text-xl text-navy group-hover:text-blue-ink">{product.title}</h3>
                            </Link>
                            <p className="mt-2 flex-1 text-[0.9688rem] text-slate">{product.summary}</p>
                            <Link href={`/products/${product.slug}#enquiry`} className="text-link mt-4">
                              Request Product Information <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-8 flex flex-col items-start justify-between gap-4 bg-mist p-6 sm:flex-row sm:items-center">
                        <p className="text-slate">Verified listings are coming soon. Ask us about availability in this category.</p>
                        <Link href={contactHref(category.service)} className="btn btn-sm btn-ghost-dark shrink-0">
                          Request Product Information
                        </Link>
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
