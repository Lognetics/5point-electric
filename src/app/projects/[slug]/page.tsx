import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { getProjects } from "@/lib/content";
import { projectCategory } from "@/lib/taxonomy";
import { contactHref } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => getProjects().find((p) => p.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = find((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    robots: project.sample ? { index: false, follow: true } : undefined,
    openGraph: { title: project.title, description: project.summary, images: [project.images[0].src] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = find((await params).slug);
  if (!project) notFound();
  const [lead, ...rest] = project.images;

  return (
    <>
      <div className="bg-navy pt-[76px]" />
      <section className="section !pt-10 lg:!pt-14">
        <div className="wrap">
          <Link href="/projects" className="text-link">
            <ArrowLeft size={16} aria-hidden="true" /> All projects
          </Link>
          <div className="mt-8 max-w-4xl">
            <p className="text-sm text-slate">{projectCategory(project.category)?.label}</p>
            <h1 className="mt-2 text-[clamp(2rem,4vw,3.5rem)] text-navy">{project.title}</h1>
            <p className="mt-4 flex items-center gap-1.5 text-slate">
              <MapPin size={16} aria-hidden="true" /> {project.location}
            </p>
          </div>

          <div className="relative mt-10 aspect-[16/8] overflow-hidden bg-mist">
            <Image src={lead.src} alt={lead.alt} fill priority sizes="100vw" className="object-cover" />
            {project.sample && <span className="demo-tag absolute top-3 left-3">Sample content, demonstration image</span>}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl text-navy">Project description</h2>
              <p className="mt-4 whitespace-pre-line text-slate lg:text-lg">{project.description}</p>
            </div>
            {project.technicalDetails.length > 0 && (
              <div className="lg:col-span-5">
                <h2 className="text-2xl text-navy">Technical details</h2>
                <dl className="mt-4 border-t border-line">
                  {project.technicalDetails.map((d) => (
                    <div key={d.label} className="grid grid-cols-2 gap-4 border-b border-line py-3 text-[0.9688rem]">
                      <dt className="text-slate">{d.label}</dt>
                      <dd className="font-medium">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {rest.length > 0 && (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {rest.map((image) => (
                <li key={image.src} className="relative aspect-[16/10] overflow-hidden bg-mist">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  {project.sample && <span className="demo-tag absolute top-3 left-3">Demonstration image</span>}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-line pt-10 md:flex-row md:items-center">
            <h2 className="text-2xl text-navy">Planning something similar?</h2>
            <Link href={contactHref()} className="btn btn-primary">Discuss Your Project</Link>
          </div>
        </div>
      </section>
    </>
  );
}
