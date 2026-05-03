import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ClipboardCheck, Factory } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PROJECT_CASES } from "./project-data";
import { ProjectsWallClient } from "./ProjectsWallClient";

export default function ProjectsPage() {
  const featuredProject = PROJECT_CASES[0];

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
      <div className="absolute left-0 right-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" />
      <Navbar />

      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-[#dbe3ee] bg-[#eef3f8]">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.055)_1px,transparent_1px)] bg-[size:44px_44px]"
            aria-hidden="true"
          />
          <div className="container relative mx-auto grid gap-10 px-6 py-14 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="min-w-0">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-[#142033] md:text-6xl">
                Our Projects
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#536276] md:text-lg md:leading-8">
                Discover our latest equipment and projects - engineered for precision, performance, and industrial scale.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: ClipboardCheck, label: "Documented process benefits" },
                  { icon: Factory, label: "Equipment-led case evidence" },
                  { icon: Building2, label: "EPC and production systems" },
                ].map((item) => (
                  <div key={item.label} className="border border-[#dbe3ee] bg-white/80 p-4">
                    <item.icon className="mb-3 text-[#174a7c]" size={20} />
                    <p className="text-sm font-semibold leading-5 text-[#314155]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={`/projects/${featuredProject.slug}`}
              className="group overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
            >
              <div className="relative aspect-[16/10] bg-[#edf3f9]">
                <Image
                  src={featuredProject.image}
                  alt={`${featuredProject.title} featured project`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="border border-[#dbe3ee] px-2.5 py-1 text-xs font-semibold text-[#536276]">
                    {featuredProject.date}
                  </span>
                  <span className="border border-[#f26522]/30 bg-[#fff4ee] px-2.5 py-1 text-xs font-semibold text-[#f26522]">
                    {featuredProject.focus}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-semibold text-[#142033]">{featuredProject.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#536276]">{featuredProject.description}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c] group-hover:text-[#f26522]">
                  View featured case
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </div>
        </section>

        <ProjectsWallClient />
      </div>

      <Footer />
    </main>
  );
}
