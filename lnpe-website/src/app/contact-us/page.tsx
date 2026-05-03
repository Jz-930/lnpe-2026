"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Mail, MapPin, Phone, Settings2 } from "lucide-react";

const serviceCards = [
  ["Pre Sales Consultation", "Professional purchasing consultation"],
  ["Scheme Customization", "Tailor-made design solutions"],
  ["Product Selection", "Reasonable configuration and consulting"],
];

const offices = [
  {
    title: "North American Subsidiary",
    lines: ["7030 Woodbine Avenue Suite 500, Markham", "Ontario, L3R 6G2, Canada", "21 Kingstreet west, 5th Floor, Hamilton"],
    tel: "+1 (519) 4977426",
    email: "sales@lnpe.ca",
  },
  {
    title: "Mian Yang Factory",
    lines: ["No.5, Caiyuan Road, Kechuangyuan District", "Mianyang, Sichuan, China"],
    tel: "+86 134 5808 3506",
    email: "pengwei@lnpe.com.cn",
  },
  {
    title: "International Business",
    lines: ["Powder equipment consultation", "Overseas project and material trial support"],
    tel: "+86 18140373970",
    email: "ally@lnpe.com.cn",
  },
];

const inputClass =
  "h-12 w-full border border-lnpe-border bg-lnpe-bg-light px-4 text-sm text-lnpe-dark outline-none transition-colors placeholder:text-lnpe-steel focus:border-lnpe-kinetic focus:bg-lnpe-paper";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px] bg-lnpe-bg text-lnpe-text">
      <Navbar />

      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-lnpe-border bg-lnpe-bg-light">
          <div className="absolute inset-0 bg-technical-grid opacity-70" />
          <div className="container relative mx-auto max-w-6xl px-6 py-[72px]">
            <div className="max-w-4xl">
              <p className="spec-label mb-5">CONTACT LNPE</p>
              <h1 className="font-display text-4xl font-bold uppercase leading-[1.04] tracking-tight text-lnpe-dark md:text-6xl">
                Start a professional engineering inquiry.
              </h1>
              <p className="mt-6 max-w-2xl border-l-2 border-lnpe-kinetic pl-5 text-lg leading-8 text-lnpe-muted">
                We provide OEM processing services for various powders and cooperate with customers in the development
                of new materials, equipment selection and production line planning.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {serviceCards.map(([title, copy]) => (
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
                <p className="spec-label mb-4">SERVICE RANGE</p>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-lnpe-dark">
                  Material trial, line selection and global response.
                </h2>
                <p className="mt-5 text-sm leading-7 text-lnpe-muted">
                  Share your material, target particle size and capacity target. LNPE will use the inquiry as an
                  engineering brief rather than a generic contact form.
                </p>
              </div>

              {offices.map((office) => (
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
                  <p className="spec-label mb-3">PROJECT REQUIREMENTS</p>
                  <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-lnpe-dark">Send inquiry</h2>
                </div>
                <p className="text-sm text-lnpe-muted">Fields marked with * are required.</p>
              </div>

              <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">First name *</span>
                    <input className={inputClass} type="text" required placeholder="First name" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Last name *</span>
                    <input className={inputClass} type="text" required placeholder="Last name" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Company *</span>
                    <input className={inputClass} type="text" required placeholder="Company / institute" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Email *</span>
                    <input className={inputClass} type="email" required placeholder="name@company.com" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Phone number</span>
                    <input className={inputClass} type="tel" placeholder="+1 000 000 0000" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Material *</span>
                    <input className={inputClass} type="text" required placeholder="LFP, alumina, graphite..." />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Capacity</span>
                    <input className={inputClass} type="text" placeholder="kg/h or t/year" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Target particle size</span>
                    <input className={inputClass} type="text" placeholder="D50 / D90 target" />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Application</span>
                  <input className={inputClass} type="text" placeholder="Battery material, ceramic, mineral, chemical..." />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">Message</span>
                  <textarea
                    className="min-h-32 w-full resize-y border border-lnpe-border bg-lnpe-bg-light px-4 py-3 text-sm leading-7 text-lnpe-dark outline-none transition-colors placeholder:text-lnpe-steel focus:border-lnpe-kinetic focus:bg-lnpe-paper"
                    placeholder="Describe your material, process target, current challenge or site requirement."
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-between bg-lnpe-dark px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-lnpe-paper transition-colors hover:bg-lnpe-kinetic md:w-auto md:min-w-64 clip-chamfer"
                >
                  <span>Contact Us</span>
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
