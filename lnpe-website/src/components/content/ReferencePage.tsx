import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "@/components/i18n/LocalizedLink";

export default function ReferencePage({ title, intro, eyebrow, back, children }: { title: string; intro: string; eyebrow: string; back: { href: string; label: string }; children: ReactNode }) {
  return <main className="flex min-h-screen flex-col bg-lnpe-bg pt-[88px] text-lnpe-text">
    <Navbar />
    <div className="flex-1">
      <header className="border-b border-lnpe-border bg-lnpe-bg-light">
        <div className="container mx-auto max-w-6xl px-6 py-14 md:py-20">
          <Link href={back.href} className="text-xs text-lnpe-muted transition-colors hover:text-lnpe-blue">← {back.label}</Link>
          <p className="spec-label mb-4 mt-8">{eyebrow}</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-lnpe-dark md:text-5xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-lnpe-muted">{intro}</p>
        </div>
      </header>
      <div className="container mx-auto max-w-6xl px-6 py-12 md:py-16">{children}</div>
    </div>
    <Footer />
  </main>;
}
