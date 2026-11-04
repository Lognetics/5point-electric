import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects: EV Charging & Solar Energy Infrastructure in Nigeria",
  description:
    "Project portfolio for EV charging infrastructure, solar energy installations, industrial energy systems, and electrical infrastructure by 5Point Electric Technology.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();
  const hasSamples = projects.some((p) => p.sample);
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Infrastructure for a cleaner energy future."
        lead="Our portfolio covers EV charging infrastructure, solar energy installations, industrial energy systems, and electrical infrastructure."
      />
      <section className="section">
        <div className="wrap">
          {hasSamples && (
            <p className="mb-10 rounded-[10px] bg-white px-5 py-4 text-[0.9688rem] text-stone">
              The entries below are clearly labelled samples showing how the portfolio will look. They are not completed
              5Point projects, and verified projects will replace them.
            </p>
          )}
          <ProjectGallery projects={projects} />
        </div>
      </section>
    </>
  );
}
