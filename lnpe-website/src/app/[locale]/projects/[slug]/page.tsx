import Image from "next/image";
import Link from "@/components/i18n/LocalizedLink";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PROJECT_CASES, getProjectBySlug, getProjectCases } from "../project-data";
import type { Locale } from "@/i18n/config";
import { createPageMetadata } from "@/i18n/metadata";
import { catalogUi, formatCatalogMessage } from "@/i18n/messages/catalog";
import { projectEngineering, projectDetailLabels } from "@/content/projects";
import { ContentDisclosure } from "@/components/content/ContentDisclosure";

export function generateStaticParams() {
  return PROJECT_CASES.map((project) => ({ slug: project.slug }));
}

type ProjectDetailPageProps = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, "zh");
  const english = getProjectBySlug(slug, "en");
  if (!project || !english) notFound();
  return createPageMetadata(locale, `/projects/${slug}`, {
    en: { title: english.title + " | LNPE", description: english.description },
    zh: { title: project.title + " | LNPE", description: project.description },
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  const ui = catalogUi[locale];
  const project = getProjectBySlug(slug, locale);

  if (!project) notFound();
  const engineering = projectEngineering[project.slug];
  const content = engineering.copy[locale];
  const labels = projectDetailLabels[locale];

  const relatedProjects = getProjectCases(locale).filter((item) => item.slug !== project.slug).slice(0, 3);

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
              {ui.backToProjects}
            </Link>

            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="min-w-0">
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="border border-[#dbe3ee] bg-white px-2.5 py-1 text-xs font-semibold text-[#536276]">
                    {locale === "zh" ? "发布于 " : "Published "}{project.date}
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
                    alt={formatCatalogMessage(ui.coverAlt, { title: project.title })}
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
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7b8f]">{ui.evidenceMarker}</p>
                <p className="mt-2 text-sm font-semibold leading-5 text-[#142033]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-[#dbe3ee] bg-white">
          <div className="container mx-auto px-6 py-8">
            <p className="mb-4 max-w-4xl text-xs leading-6 text-[#62748a]">{labels.note}</p>
            <ContentDisclosure title={labels.scope} id="engineering-scope"><div className="max-w-4xl space-y-3">{content.scope.map((text) => <p key={text}>{text}</p>)}</div></ContentDisclosure>
            <ContentDisclosure title={labels.process} id="process"><ol className="grid list-inside list-decimal gap-4 md:grid-cols-2">{content.process.map((text) => <li key={text} className="border-l border-[#dbe3ee] pl-4">{text}</li>)}</ol></ContentDisclosure>
            <ContentDisclosure title={labels.inputs} id="selection-inputs"><ul className="grid list-inside list-disc gap-2 md:grid-cols-2">{content.inputs.map((text) => <li key={text}>{text}</li>)}</ul><Link href={`/contact-us?project=${project.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm text-[#174a7c] hover:underline">{labels.enquiry}<ArrowRight size={15} /></Link></ContentDisclosure>
            <ContentDisclosure title={labels.validation} id="validation"><div className="max-w-4xl space-y-3">{content.validation.map((text) => <p key={text}>{text}</p>)}</div><Link className="mt-5 inline-flex text-sm text-[#174a7c] hover:underline" href={`/products/${engineering.product}`}>{labels.product}<ArrowRight size={15} className="ml-2" /></Link></ContentDisclosure>
          </div>
        </section>

        <section className="bg-[#f6f8fb] py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">{ui.projectImageRecord}</h2>
                <p className="mt-2 text-sm leading-6 text-[#62748a]">
                  {ui.projectImageIntro}
                </p>
              </div>
              <Link href={`/contact-us?project=${project.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c] hover:text-[#f26522]">
                {ui.discussSystem}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {project.gallery.map((image, index) => (
                <div key={image} className="overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
                  <div className="relative aspect-[4/3] bg-[#edf3f9]">
                    <Image
                      src={image}
                      alt={content.captions[index] ?? formatCatalogMessage(ui.projectContentAlt, { title: project.title, number: index + 1 })}
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="border-t border-[#e5eaf2] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#536276]">
                    {content.captions[index] ?? `${ui.caseImage} ${String(index + 1).padStart(2, "0")}`}
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
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">{ui.relatedCases}</h2>
                <p className="mt-2 text-sm text-[#62748a]">{ui.relatedCasesIntro}</p>
              </div>
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c] hover:text-[#f26522]">
                {ui.allProjects}
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
                      alt={formatCatalogMessage(ui.relatedProjectAlt, { title: related.title })}
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
