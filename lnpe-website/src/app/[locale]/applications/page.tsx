import Image from "next/image";
import Link from "@/components/i18n/LocalizedLink";
import { ArrowRight, Beaker, Factory, GitBranch, Layers3 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PowderProcessIcon, powderProcessSteps } from "@/components/applications/PowderProcessIcon";

import type { Locale } from "@/i18n/config";
import { applicationMessages, getApplications } from "@/i18n/messages/applications";
import { createPageMetadata } from "@/i18n/metadata";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createPageMetadata(locale, "/applications", {
    en: { title: applicationMessages.en.title, description: applicationMessages.en.intro },
    zh: { title: "材料应用", description: applicationMessages.zh.intro },
  });
}

export default async function ApplicationsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = applicationMessages[locale];
  const applications = getApplications(locale);

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f8fb] pt-[88px] text-[#142033]">
      <div className="absolute left-0 right-0 top-0 h-[88px] bg-[#0b1220]" aria-hidden="true" />
      <Navbar />

      <div className="flex-1">
        <section className="border-b border-[#dbe3ee] bg-[#eef3f8]">
          <div className="container mx-auto grid gap-10 px-6 py-14 md:py-20 xl:grid-cols-[0.8fr_1.2fr] xl:items-center">
            <div className="min-w-0">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-[#142033] md:text-6xl">
                {t.title}
              </h1>
              <p className="mt-6 max-w-3xl border-l-2 border-[#f26522] pl-5 text-base leading-7 text-[#536276] md:text-lg md:leading-8">
                {t.intro}
              </p>
            </div>

            <div className="@container min-w-0 border border-[#dbe3ee] bg-white p-5 shadow-[0_22px_60px_rgba(15,23,42,0.1)]">
              <div className="mb-5 flex items-center justify-between border-b border-[#e5eaf2] pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f26522]">{t.routeLabel}</p>
                  <h2 className="font-display text-2xl font-semibold text-[#142033]">{t.routeTitle}</h2>
                </div>
                <GitBranch className="text-[#174a7c]" size={24} />
              </div>
              <ol className="grid gap-3 @min-[36rem]:grid-cols-5">
                {powderProcessSteps.map((step, index) => (
                  <li key={step} className="relative flex min-w-0 items-center gap-4 border border-[#dbe3ee] bg-[#f8fafc] p-3 @min-[36rem]:flex-col @min-[36rem]:items-start @min-[36rem]:gap-3 @min-[36rem]:px-2.5 @min-[36rem]:py-4">
                    <span className="absolute right-2 top-2 text-[10px] font-semibold tabular-nums tracking-wider text-[#62748a]" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <PowderProcessIcon step={step} className="h-14 w-14 shrink-0 @min-[36rem]:h-16 @min-[36rem]:w-16" />
                    <p className="min-w-0 text-sm font-semibold leading-5 text-[#142033] @min-[36rem]:text-xs">{t.steps[index]}</p>
                    {index < powderProcessSteps.length - 1 && (
                      <div className="absolute -bottom-3 left-10 h-3 w-px bg-[#f26522] @min-[36rem]:-right-3 @min-[36rem]:bottom-auto @min-[36rem]:left-auto @min-[36rem]:top-1/2 @min-[36rem]:h-px @min-[36rem]:w-3" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-white py-8">
          <div className="container mx-auto grid gap-4 px-6 md:grid-cols-4">
            {[
              { icon: Factory, label: t.stats[0] },
              { icon: Beaker, label: t.stats[1] },
              { icon: Layers3, label: t.stats[2] },
              { icon: GitBranch, label: t.stats[3] },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 border border-[#dbe3ee] bg-[#f8fafc] p-4">
                <item.icon size={20} className="text-[#174a7c]" />
                <span className="text-sm font-semibold text-[#314155]">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f6f8fb] py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-9 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#142033]">{t.solutionsTitle}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#62748a]">
                  {t.solutionsIntro}
                </p>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174a7c] hover:text-[#f26522]">
                {t.match}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {applications.map((category) => (
                <article key={category.name} className="overflow-hidden border border-[#dbe3ee] bg-white shadow-[0_14px_42px_rgba(15,23,42,0.06)]">
                  <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
                    <div className="grid grid-cols-2 border-b border-[#e5eaf2] bg-[#edf3f9] sm:block sm:border-b-0 sm:border-r">
                      {category.images.map((image, index) => (
                        <div key={image} className="relative aspect-square">
                          <Image
                            src={image}
                            alt={`${category.name} ${t.sample} ${index + 1}`}
                            fill
                            sizes="180px"
                            className="object-cover p-4"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="p-6">
                      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f26522]">
                            {t.group}
                          </p>
                          <h3 className="font-display text-2xl font-semibold text-[#142033]">{category.name}</h3>
                        </div>
                        <span className="w-fit border border-[#dbe3ee] bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#536276]">
                          {category.items.length} {t.materials}
                        </span>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b7b8f]">{t.problem}</p>
                          <p className="mt-2 text-sm leading-6 text-[#536276]">{category.challenge}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b7b8f]">{t.process}</p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-[#174a7c]">{category.route}</p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2 border-t border-[#e8edf4] pt-5">
                        {category.relatedEquipment.map((equipment) => (
                          <Link
                            key={equipment.href}
                            href={equipment.href}
                            className="inline-flex items-center gap-1 border border-[#dbe3ee] px-2.5 py-1.5 text-xs font-semibold text-[#142033] transition-colors hover:border-[#f26522] hover:text-[#f26522]"
                          >
                            {equipment.label}
                            <ArrowRight size={12} />
                          </Link>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <span key={item} className="bg-[#f6f8fb] px-2.5 py-1 text-xs text-[#5f6f84]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
