import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ArrowRoll } from "@/components/Cta";
import { getProducts } from "@/lib/content";
import { productCategory } from "@/lib/taxonomy";

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

  return (
    <>
      <section className="bg-ink pt-32 pb-16 text-white lg:pt-44 lg:pb-24">
        <div className="wrap">
          <Link href={`/products#${category.id}`} className="link-arrow">
            <ArrowLeft size={16} aria-hidden="true" /> {category.label}
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-moss lg:aspect-auto lg:min-h-[34rem]">
              <Image src={product.image} alt={product.imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              {product.sample && <span className="demo-tag absolute top-3.5 left-3.5">Sample listing, demonstration image</span>}
            </div>
            <div>
              <p className="label text-leaf">{category.label}</p>
              <h1 className="d-2 mt-4">{product.title}</h1>
              <p className="lead mt-6 text-white/75">{product.summary}</p>
              {product.description && <p className="mt-4 text-white/60">{product.description}</p>}

              {product.specifications.length > 0 && (
                <div className="mt-10">
                  <h2 className="label text-white/50">Technical specifications</h2>
                  <dl className="mt-3 border-t border-white/15">
                    {product.specifications.map((spec) => (
                      <div key={spec.label} className="grid grid-cols-2 gap-4 border-b border-white/15 py-3 text-[0.9688rem]">
                        <dt className="text-white/60">{spec.label}</dt>
                        <dd>{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {product.applications.length > 0 && (
                <div className="mt-10">
                  <h2 className="label text-white/50">Application areas</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.applications.map((a) => (
                      <li key={a} className="rounded-full border border-white/20 px-3.5 py-1.5 text-[0.9063rem]">{a}</li>
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
