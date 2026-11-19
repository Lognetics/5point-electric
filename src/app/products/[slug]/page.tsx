import type { Metadata } from "next";
import Image from "@/components/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { CarGallery } from "@/components/CarGallery";
import { EnquiryForm } from "@/components/EnquiryForm";
import { StationVideo } from "@/components/StationVideo";
import { ArrowRoll } from "@/components/Cta";
import { getProducts } from "@/lib/content";
import { productCategory } from "@/lib/taxonomy";
import { formatPrice } from "@/lib/cars";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => getProducts().find((p) => p.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = find((await params).slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    robots: product.sample ? { index: false, follow: true } : undefined,
    openGraph: { title: product.title, description: product.summary, images: [product.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = find((await params).slug);
  if (!product) notFound();
  const category = productCategory(product.category)!;
  const contain = product.imageFit === "contain";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    category: category.label,
    image: [product.image, ...product.gallery.map((g) => g.src)].map((src) => `${SITE_URL}${src}`),
    ...(["Deye", "Solis"].includes(product.title.split(" ")[0]) ? { brand: { "@type": "Brand", name: product.title.split(" ")[0] } } : {}),
    ...(product.price
      ? { offers: { "@type": "Offer", price: product.price, priceCurrency: "NGN", availability: "https://schema.org/InStock", url: `${SITE_URL}/products/${product.slug}` } }
      : {}),
  };

  return (
    <>
      {!product.sample && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      )}
      <section className="bg-ink pt-32 pb-16 text-white lg:pt-44 lg:pb-24">
        <div className="wrap">
          <Link href={`/products#${category.id}`} className="link-arrow">
            <ArrowLeft size={16} aria-hidden="true" /> {category.label}
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            {product.gallery.length > 1 ? (
              <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
                <CarGallery images={product.gallery} title={product.title} />
              </div>
            ) : (
              <div className={`relative aspect-[4/3] overflow-hidden rounded-[14px] lg:aspect-auto lg:min-h-[34rem] ${contain ? "bg-white" : "bg-moss"}`}>
                <Image src={product.image} alt={product.imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className={contain ? "object-contain p-10" : "object-cover"} />
                {product.sample && <span className="demo-tag absolute top-3.5 left-3.5">Sample listing, demonstration image</span>}
              </div>
            )}
            <div className="min-w-0">
              <p className="label text-leaf">{category.label}</p>
              <h1 className="d-2 mt-4">{product.title}</h1>
              <p className="lead mt-6 text-white/75">{product.summary}</p>
              {product.price && (
                <p className="mt-7">
                  <span className="label block text-white/50">Price</span>
                  <span className="mt-1 block text-[1.9rem] leading-none font-medium tracking-[-0.03em] text-leaf">{formatPrice(product.price)}</span>
                </p>
              )}
              {product.description && <p className="mt-6 text-white/65">{product.description}</p>}

              {product.specifications.length > 0 && (
                <div className="mt-10">
                  <h2 className="label text-white/50">Technical specifications</h2>
                  <dl className="mt-3 border-t border-white/15">
                    {product.specifications.map((spec) => (
                      <div key={spec.label} className="grid grid-cols-2 gap-4 border-b border-white/15 py-3 text-[0.775rem]">
                        <dt className="text-white/60">{spec.label}</dt>
                        <dd>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {product.included.length > 0 && (
                <div className="mt-10">
                  <h2 className="label text-white/50">What is included</h2>
                  <ul className="mt-3 border-t border-white/15">
                    {product.included.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-white/15 py-3 text-[0.775rem]">
                        <Check size={17} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.ratedFor.length > 0 && (
                <div className="mt-10">
                  <h2 className="label text-white/50">Rated appliances</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.ratedFor.map((a) => (
                      <li key={a} className="rounded-full bg-white/[0.07] px-3.5 py-1.5 text-[0.725rem] ring-1 ring-white/12">{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.warranty.length > 0 && (
                <div className="mt-10 rounded-[12px] bg-white/[0.05] p-5 ring-1 ring-white/12">
                  <h2 className="label flex items-center gap-2 text-leaf"><ShieldCheck size={16} aria-hidden="true" /> Warranty and support</h2>
                  <ul className="mt-3 grid gap-2 text-[0.775rem] text-white/80 sm:grid-cols-2">
                    {product.warranty.map((w) => <li key={w}>{w}</li>)}
                  </ul>
                </div>
              )}

              {product.applications.length > 0 && (
                <div className="mt-10">
                  <h2 className="label text-white/50">Application areas</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.applications.map((a) => (
                      <li key={a} className="rounded-full border border-white/20 px-3.5 py-1.5 text-[0.725rem]">{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              <a href="#enquiry" className="btn btn-leaf mt-10">
                Request Product Information
                <ArrowRoll />
              </a>
            </div>
          </div>
        </div>
      </section>

      {product.videos.length > 0 && (
        <section aria-labelledby="videos-title" className="section !pb-0">
          <div className="wrap">
            <h2 id="videos-title" className="d-3">See it up close</h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {product.videos.map((v) => (
                <li key={v.src}>
                  <StationVideo src={v.src} poster={v.poster} label={v.alt} className="aspect-[9/16]" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="enquiry" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="d-3 max-w-[14ch]">Request Product Information</h2>
            <p className="mt-5 max-w-md text-stone">
              Tell us what you need and where it is for. Your enquiry will reference <strong className="font-medium text-ink">{product.title}</strong>.
            </p>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm type="product" product={product.title} defaultService={category.service} submitLabel="Request Product Information" />
          </div>
        </div>
      </section>
    </>
  );
}
