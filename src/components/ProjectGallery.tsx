"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/content";
import { PROJECT_CATEGORIES, projectCategory } from "@/lib/taxonomy";

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
            className={`min-h-11 rounded-[3px] border px-4 py-2 text-[0.9375rem] font-medium transition-colors ${
              filter === f.id
                ? "border-navy bg-navy text-white"
                : "border-line bg-white text-charcoal hover:border-navy"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {visible.map((project) => (
            <li key={project.slug} className="page-enter">
              <Link href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                  />
                  {project.sample && (
                    <span className="demo-tag absolute top-3 left-3">Sample content, demonstration image</span>
                  )}
                </div>
                <p className="mt-5 text-sm text-slate">{projectCategory(project.category)?.label}</p>
                <h3 className="mt-1.5 text-2xl text-navy">{project.title}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-[0.9375rem] text-slate">
                  <MapPin size={15} aria-hidden="true" /> {project.location}
                </p>
                <p className="mt-3 max-w-xl text-slate">{project.summary}</p>
                <span className="text-link mt-3">
                  View project <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 border border-line bg-mist px-6 py-14 text-center lg:py-20">
          <h3 className="text-2xl text-navy">
            {projects.length === 0 ? "Verified projects will be published here." : "No projects in this category yet."}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-slate">
            We only publish work we can verify. In the meantime, our team can talk you through what we can do for your site.
          </p>
          <Link href="/contact#enquiry" className="btn btn-primary mt-6">
            Discuss Your Project
          </Link>
        </div>
      )}
    </div>
  );
}
