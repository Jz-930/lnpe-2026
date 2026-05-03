import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PROJECT_CASES, getProjectBySlug } from "../project-data";

export function generateStaticParams() {
  return PROJECT_CASES.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const relatedProjects = PROJECT_CASES.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
      <div className="absolute left-0 right-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" />
      <Navbar />

      <div className="flex-1">
        <section className="border-b border-[#dbe3ee] bg-[#eef3f8]">
          <div className="container mx-auto px-6 py-10 md:py-16">
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#536276] transition-colors hover:text-[#174a7c]"
            >
              <ChevronLeft size={17} />
              Back to Projects
            </Link>

            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="min-w-0">
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="border border-[#dbe3ee] bg-white px-2.5 py-1 text-xs font-semibold text-[#536276]">
                    {project.date}
                  </span>
                  <span className="border border-[#f26522]/30 bg-[#fff4ee] px-2.5 py-1 text-xs font-semibold text-[#f26522]">
                    {project.focus}
                  </span>
                  <span className="border border-[#dbe3ee] bg-white px-2.5 py-1 text-xs font-semibold text-[#536276]">
                    {project.system}
                  </span>
                </div>
                <h1 className="font-display text-4xl font-semibold tracking-tight text-[#142033] md:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-6 text-base leading-7 text-[#536276] md:text-lg md:leading-8">{project.description}</p>
              </div>

              <div className="overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.1)]">
                <div className="relative aspect-[16/11] bg-[#edf3f9]">
                  <Image
                    src={project.image}
                    alt={`${project.title} cover`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#dbe3ee] bg-white">
          <div className="container mx-auto grid gap-4 px-6 py-8 md:grid-cols-3">
            {project.evidence.map((item) => (
              <div key={item} className="border-l-2 border-[#f26522] bg-[#f8fafc] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7b8f]">Evidence marker</p>
                <p className="mt-2 text-sm font-semibold leading-5 text-[#142033]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f6f8fb] py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">Project image record</h2>
                <p className="mt-2 text-sm leading-6 text-[#62748a]">
                  Existing project media is presented with a consistent technical case-study crop.
                </p>
              </div>
              <Link href="/contact-us" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c] hover:text-[#f26522]">
                Discuss a Similar System
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {project.gallery.map((image, index) => (
                <div key={image} className="overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
                  <div className="relative aspect-[4/3] bg-[#edf3f9]">
                    <Image
                      src={image}
                      alt={`${project.title} content image ${index + 1}`}
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="border-t border-[#e5eaf2] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#536276]">
                    Case image {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 md:py-18">
          <div className="container mx-auto px-6">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">Related cases</h2>
                <p className="mt-2 text-sm text-[#62748a]">Compare other LNPE projects by process role and application focus.</p>
              </div>
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c] hover:text-[#f26522]">
                All Projects
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedProjects.map((related) => (
                <Link
                  key={related.slug}
                  href={`/projects/${related.slug}`}
                  className="group overflow-hidden border border-[#dbe3ee] bg-white transition hover:-translate-y-1 hover:border-[#b5c6dc] hover:shadow-[0_20px_44px_rgba(15,23,42,0.1)]"
                >
                  <div className="relative aspect-[16/10] bg-[#edf3f9]">
                    <Image
                      src={related.image}
                      alt={`${related.title} related project`}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f26522]">{related.focus}</p>
                    <h3 className="font-display text-xl font-semibold text-[#142033]">{related.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
