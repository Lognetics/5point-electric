import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { Cta } from "@/components/Cta";
import { ParallaxImage } from "@/components/ParallaxImage";
import { SplitReveal } from "@/components/SplitReveal";
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
      <section className="pt-32 text-white lg:pt-44" style={{ background: "linear-gradient(to bottom, var(--color-ink) calc(100% - clamp(5rem, 14vw, 13rem)), var(--color-paper) 0)" }}>
        <div className="wrap">
          <Link href="/projects" className="link-arrow">
            <ArrowLeft size={16} aria-hidden="true" /> All projects
          </Link>
          <p className="label mt-12 text-leaf">{projectCategory(project.category)?.label}</p>
          <SplitReveal as="h1" immediate className="d-1 mt-5 max-w-[17ch]">{project.title}</SplitReveal>
          <p className="mt-6 flex items-center gap-1.5 text-white/70">
            <MapPin size={16} aria-hidden="true" /> {project.location}
          </p>
          <ParallaxImage
            priority
            src={lead.src}
            alt={lead.alt}
            sizes="100vw"
            demo={project.sample ? "Sample content, demonstration image" : undefined}
            className="mt-12 aspect-[4/3] sm:aspect-[21/10]"
          />
        </div>
      </section>

      <section className="section !pt-16 lg:!pt-24">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="label text-deep">Project description</h2>
              <p className="lead mt-5 whitespace-pre-line">{project.description}</p>
            </div>
            {project.technicalDetails.length > 0 && (
              <div className="lg:col-span-4 lg:col-start-9">
                <h2 className="label text-deep">Technical details</h2>
                <dl className="mt-5 border-t border-ink/15">
                  {project.technicalDetails.map((d) => (
                    <div key={d.label} className="grid grid-cols-2 gap-4 border-b border-ink/15 py-3 text-[0.775rem]">
                      <dt className="text-stone">{d.label}</dt>
                      <dd>{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {rest.length > 0 && (
            <ul className="mt-16 grid gap-7 sm:grid-cols-2">
              {rest.map((image) => (
                <li key={image.src}>
                  <ParallaxImage src={image.src} alt={image.alt} sizes="(min-width: 640px) 50vw, 100vw" demo={project.sample ? "Demonstration image" : undefined} className="aspect-[5/4]" />
                </li>
              ))}
            </ul>
          )}

          <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[14px] bg-ink p-7 text-white md:flex-row md:items-center lg:p-12">
            <h2 className="d-3">Planning something similar?</h2>
            <Cta href={contactHref()} variant="leaf" className="shrink-0">Discuss Your Project</Cta>
          </div>
        </div>
      </section>
    </>
  );
}
