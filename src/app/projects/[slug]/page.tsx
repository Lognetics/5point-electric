import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, Quote } from "lucide-react";
import { Cta } from "@/components/Cta";
import { ParallaxImage } from "@/components/ParallaxImage";
import { SplitReveal } from "@/components/SplitReveal";
import { StationVideo } from "@/components/StationVideo";
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
  // Projects with video show the lead photo and two clips side by side at the top.
  const heroVideos = project.videos.slice(0, 2);
  const moreVideos = project.videos.slice(2);
  const keyFigures = project.technicalDetails.slice(0, 3);

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
          {heroVideos.length > 0 ? (
            <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:gap-6">
              <ParallaxImage priority src={lead.src} alt={lead.alt} position={lead.position} sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[3/4]" />
              {heroVideos.map((v) => (
                <StationVideo key={v.src} src={v.src} poster={v.poster} label={v.alt} className="aspect-[3/4]" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-6">
              <ParallaxImage
                priority
                src={lead.src}
                alt={lead.alt}
                position={lead.position}
                sizes="(min-width: 1024px) 40vw, 100vw"
                demo={project.sample ? "Sample content, demonstration image" : undefined}
                className="aspect-[4/5] lg:col-span-5"
              />
              <div className="flex flex-col justify-between gap-10 rounded-[14px] bg-forest p-7 ring-1 ring-white/10 lg:col-span-7 lg:p-12">
                <p className="lead text-white/85">{project.summary}</p>
                {keyFigures.length > 0 && (
                  <dl className="grid gap-px overflow-hidden rounded-[10px] bg-white/12 sm:grid-cols-3">
                    {keyFigures.map((d) => (
                      <div key={d.label} className="bg-forest p-5 lg:py-7">
                        <dd className="text-[1.5rem] leading-none font-medium tracking-[-0.03em] text-leaf lg:text-[1.8rem]">{d.value}</dd>
                        <dt className="label mt-3 text-white/55">{d.label}</dt>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section !pt-16 lg:!pt-24">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {project.sections.length > 0 ? (
                <div className="space-y-12 lg:space-y-14">
                  {project.sections.map((section) => (
                    <div key={section.heading}>
                      <h2 className="text-[1.45rem] leading-tight tracking-[-0.02em]">{section.heading}</h2>
                      <Body text={section.body} />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <h2 className="label text-deep">Project description</h2>
                  <p className="lead mt-5 whitespace-pre-line">{project.description}</p>
                </>
              )}
              {project.quote && (
                <figure className="mt-14 rounded-[14px] bg-ink p-7 text-white lg:p-10">
                  <Quote size={26} className="text-leaf" aria-hidden="true" />
                  <blockquote className="mt-5 text-[1.15rem] leading-relaxed tracking-[-0.01em]">&ldquo;{project.quote}&rdquo;</blockquote>
                  <figcaption className="label mt-6 text-white/50">Customer experience</figcaption>
                </figure>
              )}
            </div>
            {project.technicalDetails.length > 0 && (
              <div className="lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9 lg:self-start">
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

          {moreVideos.length > 0 && (
            <ul className="mt-16 grid gap-7 sm:grid-cols-2">
              {moreVideos.map((v) => (
                <li key={v.src}>
                  <StationVideo src={v.src} poster={v.poster} label={v.alt} className="aspect-[4/5]" />
                </li>
              ))}
            </ul>
          )}

          {rest.length > 0 && (
            <ul className="mt-16 grid gap-7 sm:grid-cols-2">
              {rest.map((image) => (
                <li key={image.src}>
                  <ParallaxImage src={image.src} alt={image.alt} position={image.position} sizes="(min-width: 640px) 50vw, 100vw" demo={project.sample ? "Demonstration image" : undefined} className="aspect-[5/4]" />
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

/** Paragraphs separated by blank lines; a block of "- " lines becomes a ticked list. */
function Body({ text }: { text: string }) {
  return (
    <div className="mt-4 space-y-4 text-stone">
      {text.split(/\n\s*\n/).map((block, i) => {
        const lines = block.split("\n").filter(Boolean);
        if (lines.length && lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="border-t border-ink/15">
              {lines.map((l) => (
                <li key={l} className="flex gap-3 border-b border-ink/15 py-3 text-ink">
                  <Check size={18} className="mt-0.5 shrink-0 text-deep" aria-hidden="true" />
                  <span>{l.slice(2)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{block}</p>;
      })}
    </div>
  );
}
