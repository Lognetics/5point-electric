import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
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
      <div className="bg-navy pt-[76px]" />
      <section className="section !pt-10 lg:!pt-14">
        <div className="wrap">
          <Link href={`/products#${category.id}`} className="text-link">
            <ArrowLeft size={16} aria-hidden="true" /> {category.label}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden bg-mist">
              <Image src={product.image} alt={product.imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              {product.sample && <span className="demo-tag absolute top-3 left-3">Sample listing, demonstration image</span>}
            </div>
            <div>
              <p className="text-sm text-slate">{category.label}</p>
              <h1 className="mt-2 text-[clamp(2rem,3.6vw,3rem)] text-navy">{product.title}</h1>
              <p className="lead mt-5 text-slate">{product.summary}</p>
              {product.description && <p className="mt-4 text-slate">{product.description}</p>}

              {product.specifications.length > 0 && (
                <div className="mt-9">
                  <h2 className="text-lg text-navy">Technical specifications</h2>
                  <dl className="mt-3 border-t border-line">
                    {product.specifications.map((spec) => (
                      <div key={spec.label} className="grid grid-cols-2 gap-4 border-b border-line py-3 text-[0.9688rem]">
                        <dt className="text-slate">{spec.label}</dt>
                        <dd className="font-medium">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {product.applications.length > 0 && (
                <div className="mt-9">
                  <h2 className="text-lg text-navy">Application areas</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.applications.map((a) => (
                      <li key={a} className="rounded-[3px] bg-mist px-3 py-1.5 text-[0.9063rem]">{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              <a href="#enquiry" className="btn btn-primary mt-9">Request Product Information</a>
            </div>
          </div>
        </div>
      </section>

      <section id="enquiry" className="bg-mist section">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] text-navy">Request Product Information</h2>
            <p className="mt-4 text-slate">
              Tell us what you need and where it is for. Your enquiry will reference <strong className="font-semibold text-charcoal">{product.title}</strong>.
            </p>
          </div>
          <div className="bg-white p-6 lg:col-span-8 lg:p-10">
            <EnquiryForm type="product" product={product.title} defaultService={category.service} submitLabel="Request Product Information" />
          </div>
        </div>
      </section>
    </>
  );
}
