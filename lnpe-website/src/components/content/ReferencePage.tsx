import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ReferencePresentation from "./ReferencePresentation";

export default function ReferencePage({ title, intro, eyebrow, back, children }: { title: string; intro: string; eyebrow: string; back: { href: string; label: string }; children: ReactNode }) {
  return <main className="flex min-h-screen flex-col bg-lnpe-bg pt-[88px] text-lnpe-text">
    <Navbar />
    <div className="flex-1">
      <ReferencePresentation title={title} intro={intro} eyebrow={eyebrow} back={back}>{children}</ReferencePresentation>
    </div>
    <Footer />
  </main>;
}
