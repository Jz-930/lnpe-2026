"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";
import { PROJECT_CASES, PROJECT_FILTERS } from "./project-data";

export function ProjectsWallClient() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return PROJECT_CASES;
    return PROJECT_CASES.filter((project) => project.focus === activeFilter);
  }, [activeFilter]);

  return (
    <section className="bg-[#f6f8fb] py-14 md:py-20">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">Project evidence wall</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#62748a]">
              Filter documented LNPE equipment deployments by application focus and process role.
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
                  {filter === "All" && <Filter size={14} />}
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {visibleProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group grid overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_14px_42px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#b5c6dc] hover:shadow-[0_24px_56px_rgba(15,23,42,0.12)] md:grid-cols-[240px_1fr]"
            >
              <div className="relative min-h-[240px] bg-[#edf3f9]">
                <Image
                  src={project.image}
                  alt={`${project.title} cover`}
                  fill
                  sizes="(min-width: 1024px) 240px, 90vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
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

                <h3 className="font-display text-2xl font-semibold tracking-tight text-[#142033]">{project.title}</h3>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#536276]">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.evidence.slice(0, 2).map((item) => (
                    <span key={item} className="bg-[#f6f8fb] px-2.5 py-1 text-xs text-[#5f6f84]">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-[#174a7c] transition-colors group-hover:text-[#f26522]">
                  View case
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
