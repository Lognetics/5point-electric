"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/content";
import { PROJECT_CATEGORIES, projectCategory } from "@/lib/taxonomy";
import { Cta } from "./Cta";

const ALL = "all";

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>(ALL);
  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter);
  const filters = [{ id: ALL, label: "All projects" }, ...PROJECT_CATEGORIES];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`min-h-11 rounded-full border px-5 py-2 text-[0.9375rem] transition-colors ${
              filter === f.id ? "border-ink bg-ink text-white" : "border-ink/20 hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <ul className="mt-12 grid gap-x-7 gap-y-14 md:grid-cols-2">
          {visible.map((project, i) => (
            <li key={project.slug} className={`page-enter ${i % 2 === 1 ? "md:mt-20" : ""}`}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[14px] bg-moss">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.04]"
                  />
                  {project.sample && <span className="demo-tag absolute top-3.5 left-3.5">Sample content, demonstration image</span>}
                </div>
                <p className="label mt-5 text-deep">{projectCategory(project.category)?.label}</p>
                <h3 className="mt-2.5 flex items-start justify-between gap-4 text-[1.75rem] leading-tight">
                  {project.title}
                  <ArrowUpRight size={24} className="mt-1 shrink-0 transition-transform duration-500 ease-out-soft group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </h3>
                <p className="mt-2 flex items-center gap-1.5 text-[0.9375rem] text-stone">
                  <MapPin size={15} aria-hidden="true" /> {project.location}
                </p>
                <p className="mt-3 max-w-xl text-stone">{project.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 rounded-[14px] bg-ink px-6 py-20 text-center text-white lg:py-28">
          <h3 className="d-3">
            {projects.length === 0 ? "Verified projects will be published here." : "No projects in this category yet."}
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            We only publish work we can verify. In the meantime, our team can talk you through what we can do for your site.
          </p>
          <div className="mt-8">
            <Cta href="/contact#enquiry" variant="leaf">Discuss Your Project</Cta>
          </div>
        </div>
      )}
    </div>
  );
}
