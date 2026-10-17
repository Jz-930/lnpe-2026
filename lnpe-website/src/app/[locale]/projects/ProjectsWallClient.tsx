"use client";

import { useMemo, useState } from "react";
import InteractiveImage from "@/components/content/InteractiveImage";
import Link from "@/components/i18n/LocalizedLink";
import { ArrowRight, Filter } from "lucide-react";
import { getProjectCases, PROJECT_FILTERS, type ProjectFilter } from "./project-data";
import { useLocale } from "@/i18n/LocaleProvider";
import { catalogUi, projectFilterLabels, formatCatalogMessage } from "@/i18n/messages/catalog";
import { projectEngineering, projectDetailLabels } from "@/content/projects";

export function ProjectsWallClient() {
  const locale = useLocale();
  const ui = catalogUi[locale];
  const projects = useMemo(() => getProjectCases(locale), [locale]);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.focusId === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section className="bg-[#f6f8fb] py-14 md:py-20">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">{ui.projectWall}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#62748a]">
              {ui.projectWallIntro}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pb-0" style={{ maxWidth: 760 }}>
            {PROJECT_FILTERS.map((filter) => {
              const active = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter)}
                  className={`inline-flex shrink-0 items-center gap-2 border px-3 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "border-[#f26522] bg-[#f26522] text-white"
                      : "border-[#dbe3ee] bg-white text-[#536276] hover:border-[#174a7c] hover:text-[#174a7c]"
                  }`}
                >
                  {filter === "all" && <Filter size={14} />}
                  {projectFilterLabels[locale][filter]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {visibleProjects.map((project) => (
            <article
              key={project.slug}
              className="grid overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_14px_42px_rgba(15,23,42,0.06)] md:grid-cols-[240px_1fr]"
            >
              <div className="relative min-h-[240px] bg-[#edf3f9]">
                <InteractiveImage
                  images={[{ src: project.image, alt: project.title, caption: project.description }, ...project.gallery.map((src, index) => ({ src, alt: `${project.title} · ${index + 1}`, caption: project.title }))]}
                  src={project.image}
                  alt={formatCatalogMessage(ui.coverAlt, { title: project.title })}
                  fill
                  sizes="(min-width: 1024px) 240px, 90vw"
                  className="object-cover transition duration-500 motion-safe:group-hover/zoom:scale-[1.04]"
                />
              </div>

              <div className="flex flex-col p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="border border-[#dbe3ee] bg-[#f8fafc] px-2.5 py-1 text-xs font-semibold text-[#536276]">
                    {project.date}
                  </span>
                  <span className="border border-[#f26522]/30 bg-[#fff4ee] px-2.5 py-1 text-xs font-semibold text-[#f26522]">
                    {project.focus}
                  </span>
                  <span className="border border-[#dbe3ee] bg-[#f8fafc] px-2.5 py-1 text-xs font-semibold text-[#536276]">
                    {project.system}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-semibold tracking-tight text-[#142033]"><Link href={`/projects/${project.slug}`} className="hover:text-lnpe-blue">{project.title}</Link></h3>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#536276]">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.evidence.slice(0, 2).map((item) => (
                    <span key={item} className="bg-[#f6f8fb] px-2.5 py-1 text-xs text-[#5f6f84]">
                      {item}
                    </span>
                  ))}
                </div>

                <details className="mt-4 border-t border-[#dbe3ee] pt-3 text-sm leading-6 text-[#536276]">
                  <summary className="cursor-pointer font-medium text-[#174a7c]">{projectDetailLabels[locale].scope}</summary>
                  <div className="mt-3 space-y-3">{projectEngineering[project.slug].copy[locale].scope.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                </details>
                <Link href={`/projects/${project.slug}`} className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-[#174a7c] transition-colors hover:text-[#f26522]">
                  {ui.viewCase}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
