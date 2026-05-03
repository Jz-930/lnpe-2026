import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { Factory, FlaskConical, Globe2, Settings2, ArrowRight } from "lucide-react";

const capabilities = [
  {
    icon: FlaskConical,
    title: "R&D",
    copy: "Industrial laboratories, numerical simulation and precision particle analysis support each material trial.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    copy: "Powder grinding, classification and integrated line equipment are engineered for stable production duty.",
  },
  {
    icon: Settings2,
    title: "Engineering",
    copy: "LNPE configures process routes around material behavior, target particle size and site conditions.",
  },
  {
    icon: Globe2,
    title: "Global Service",
    copy: "The group supports overseas projects through consultation, selection, trials and implementation service.",
  },
];

const milestones = [
  "Focused on ultrafine grinding and classification technologies",
  "Built advanced laboratories and simulation-driven design capability",
  "Expanded powder processing solutions for global customers",
  "Established a service network for overseas material and equipment projects",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col pt-[88px] bg-lnpe-bg text-lnpe-text">
      <Navbar />

      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-lnpe-border bg-lnpe-bg-light">
          <div className="absolute inset-0 bg-technical-grid opacity-70" />
          <div className="container relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="spec-label mb-5">LNPE GROUP</p>
              <h1 className="max-w-4xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight text-lnpe-dark md:text-6xl">
                Focusing on Ultra-Fine Powder Grinding & Classification
                <span className="text-lnpe-kinetic">.</span>
              </h1>
              <p className="mt-7 max-w-2xl border-l-2 border-lnpe-kinetic pl-5 text-lg leading-8 text-lnpe-muted">
                LNPE is committed to solving difficulties in the ultra-fine powder industry for customers through
                high-end powder processing technologies and comprehensive equipment solutions.
              </p>

              <div className="mt-10 grid grid-cols-3 border-y border-lnpe-border bg-lnpe-paper">
                {[
                  ["20+", "R&D experts"],
                  ["30+", "Patents"],
                  ["Global", "Project support"],
                ].map(([value, label]) => (
                  <div key={label} className="border-r border-lnpe-border p-5 last:border-r-0">
                    <div className="font-display text-2xl font-bold text-lnpe-dark">{value}</div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-8 -top-8 h-32 w-32 border border-lnpe-blue/20" />
              <div className="relative border border-lnpe-border bg-lnpe-paper p-4 shadow-[0_24px_70px_rgba(17,24,39,0.08)] clip-chamfer">
                <div className="relative aspect-[4/3] overflow-hidden bg-lnpe-panel">
                  <Image
                    src="/images/03_about/about_02_jet-pulverizer.webp"
                    alt="LNPE jet pulverizer equipment"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4 border-t border-lnpe-border pt-4">
                  <div>
                    <p className="spec-label">EQUIPMENT FOCUS</p>
                    <p className="mt-1 font-display text-xl font-semibold text-lnpe-dark">Jet Pulverizer Innovation</p>
                  </div>
                  <div className="h-10 w-10 border border-lnpe-kinetic bg-lnpe-kinetic/10 text-lnpe-kinetic grid place-items-center">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border border-lnpe-border bg-lnpe-paper p-8 clip-chamfer">
              <p className="spec-label mb-4">GROUP INTRODUCTION</p>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-lnpe-dark">
                Industrial powder equipment with engineering depth.
              </h2>
              <div className="mt-7 space-y-5 text-base leading-8 text-lnpe-muted">
                <p>
                  LNPE Group, headquartered in Mianyang, Sichuan Province, China, is an industry-leading provider of
                  comprehensive powder equipment solutions.
                </p>
                <p>
                  Over the years, LNPE Group has focused on the R&D and manufacturing of ultrafine grinding,
                  classification technologies and related equipment.
                </p>
                <p>
                  Equipped with advanced industrial laboratories, numerical simulation design software and precision
                  testing instruments, LNPE customizes suitable, cost-effective powder equipment for customers.
                </p>
              </div>
            </div>

            <div className="border border-lnpe-border bg-lnpe-paper p-6 clip-chamfer">
              <div className="relative min-h-[360px] overflow-hidden bg-lnpe-bg-light">
                <Image
                  src="/images/03_about/about_01_world-map.webp"
                  alt="LNPE global network map"
                  fill
                  className="object-contain p-8"
                />
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                {["Material trial", "Equipment selection", "Process solution"].map((item) => (
                  <div key={item} className="border-l-2 border-lnpe-kinetic bg-lnpe-bg-light px-4 py-3 text-sm font-semibold text-lnpe-dark">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-lnpe-border bg-lnpe-paper py-[72px]">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="spec-label mb-3">CAPABILITY MATRIX</p>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-lnpe-dark">
                  Four capabilities behind one equipment solution.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-lnpe-muted">
                The page now presents LNPE as an engineering manufacturer, with capability modules tied to production,
                laboratory verification and global project service.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {capabilities.map(({ icon: Icon, title, copy }) => (
                <div key={title} className="border border-lnpe-border bg-lnpe-bg p-6 transition-colors hover:border-lnpe-kinetic clip-chamfer">
                  <div className="mb-8 flex h-11 w-11 items-center justify-center border border-lnpe-border bg-lnpe-paper text-lnpe-blue">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-lnpe-dark">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-lnpe-muted">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="spec-label mb-3">DEVELOPMENT NODES</p>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-lnpe-dark">
                Built around powder process problems.
              </h2>
            </div>
            <div className="border-l border-lnpe-border">
              {milestones.map((milestone, index) => (
                <div key={milestone} className="relative border-b border-lnpe-border py-6 pl-8 last:border-b-0">
                  <span className="absolute -left-[5px] top-8 h-2.5 w-2.5 bg-lnpe-kinetic" />
                  <div className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-lnpe-steel">
                    Step {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="mt-2 text-lg font-semibold text-lnpe-dark">{milestone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
