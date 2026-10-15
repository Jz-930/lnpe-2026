"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Mail, MapPin, Phone, Settings2 } from "lucide-react";

import { useLocale } from "@/i18n/LocaleProvider";
import { contactMessages } from "@/i18n/messages/pages";

const inputClass =
  "h-12 w-full border border-lnpe-border bg-lnpe-bg-light px-4 text-sm text-lnpe-dark outline-none transition-colors placeholder:text-lnpe-steel focus:border-lnpe-kinetic focus:bg-lnpe-paper";

export default function ContactUsClient() {
  const t = contactMessages[useLocale()];
  return (
    <main className="min-h-screen flex flex-col pt-[88px] bg-lnpe-bg text-lnpe-text">
      <Navbar />

      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-lnpe-border bg-lnpe-bg-light">
          <div className="absolute inset-0 bg-technical-grid opacity-70" />
          <div className="container relative mx-auto max-w-6xl px-6 py-[72px]">
            <div className="max-w-4xl">
              <p className="spec-label mb-5">{t.eyebrow}</p>
              <h1 className="font-display text-4xl font-bold uppercase leading-[1.04] tracking-tight text-lnpe-dark md:text-6xl">
                {t.title}
              </h1>
              <p className="mt-6 max-w-2xl border-l-2 border-lnpe-kinetic pl-5 text-lg leading-8 text-lnpe-muted">
                {t.intro}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {t.serviceCards.map(([title, copy]) => (
                <div key={title} className="border border-lnpe-border bg-lnpe-paper p-6 transition-colors hover:border-lnpe-kinetic clip-chamfer">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center border border-lnpe-border text-lnpe-blue">
                    <Settings2 size={18} />
                  </div>
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide text-lnpe-dark">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-lnpe-muted">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="space-y-5">
              <div className="border border-lnpe-border bg-lnpe-paper p-7 clip-chamfer">
                <p className="spec-label mb-4">{t.serviceLabel}</p>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-lnpe-dark">
                  {t.serviceTitle}
                </h2>
                <p className="mt-5 text-sm leading-7 text-lnpe-muted">
                  {t.serviceIntro}
                </p>
              </div>

              {t.offices.map((office) => (
                <div key={office.title} className="border border-lnpe-border bg-lnpe-paper p-6 clip-chamfer">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-lnpe-dark">{office.title}</h3>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-lnpe-muted">
                    <div className="flex gap-3">
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-lnpe-kinetic" />
                      <div>{office.lines.map((line) => <p key={line}>{line}</p>)}</div>
                    </div>
                    <p className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-lnpe-kinetic" />
                      <span>{office.tel}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-lnpe-kinetic" />
                      <span>{office.email}</span>
                    </p>
                  </div>
                </div>
              ))}
            </aside>

            <div className="border border-lnpe-border bg-lnpe-paper p-6 md:p-8 shadow-[0_20px_60px_rgba(17,24,39,0.06)] clip-chamfer">
              <div className="mb-8 flex flex-col justify-between gap-4 border-b border-lnpe-border pb-6 md:flex-row md:items-end">
                <div>
                  <p className="spec-label mb-3">{t.formLabel}</p>
                  <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-lnpe-dark">{t.formTitle}</h2>
                </div>
                <p className="text-sm text-lnpe-muted">{t.required}</p>
              </div>

              <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.firstName[0]}</span>
                    <input className={inputClass} type="text" required placeholder={t.fields.firstName[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.lastName[0]}</span>
                    <input className={inputClass} type="text" required placeholder={t.fields.lastName[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.company[0]}</span>
                    <input className={inputClass} type="text" required placeholder={t.fields.company[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.email[0]}</span>
                    <input className={inputClass} type="email" required placeholder={t.fields.email[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.phone[0]}</span>
                    <input className={inputClass} type="tel" placeholder={t.fields.phone[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.material[0]}</span>
                    <input className={inputClass} type="text" required placeholder={t.fields.material[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.capacity[0]}</span>
                    <input className={inputClass} type="text" placeholder={t.fields.capacity[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.particleSize[0]}</span>
                    <input className={inputClass} type="text" placeholder={t.fields.particleSize[1]} />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.application[0]}</span>
                  <input className={inputClass} type="text" placeholder={t.fields.application[1]} />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.message[0]}</span>
                  <textarea
                    className="min-h-32 w-full resize-y border border-lnpe-border bg-lnpe-bg-light px-4 py-3 text-sm leading-7 text-lnpe-dark outline-none transition-colors placeholder:text-lnpe-steel focus:border-lnpe-kinetic focus:bg-lnpe-paper"
                    placeholder={t.fields.message[1]}
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-between bg-lnpe-dark px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-lnpe-paper transition-colors hover:bg-lnpe-kinetic md:w-auto md:min-w-64 clip-chamfer"
                >
                  <span>{t.submit}</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
