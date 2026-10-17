"use client";

import ChatContainer from "@/components/ai-assistant/ChatContainer";
import { useLocale } from "@/i18n/LocaleProvider";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import Link from "@/components/i18n/LocalizedLink";
import { useRef } from "react";
import { useVisualViewport } from "@/components/ai-assistant/useVisualViewport";

export default function AssistantPortalPage() {
  const locale = useLocale(); const zh = locale === "zh";
  const viewport = useRef<HTMLElement>(null);
  useVisualViewport(viewport);
  return <main ref={viewport} className="assistant-portal flex h-dvh min-h-[520px] flex-col bg-lnpe-bg text-lnpe-text">
    <header className="flex shrink-0 items-center justify-between gap-4 border-b border-lnpe-border bg-lnpe-paper px-6 py-5">
      <div><Link href="/" className="text-xs text-lnpe-muted">← {zh ? "返回网站" : "Back to website"}</Link><h1 className="assistant-workbench-title mt-2 font-display font-bold text-lnpe-dark">{zh ? "LNPE 技术资料工作台" : "LNPE Technical Reference Desk"}</h1></div>
      <LanguageSwitcher />
    </header>
    <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 gap-5 p-4 md:grid-cols-[240px_1fr] md:p-6">
      <aside className="hidden border border-lnpe-border bg-lnpe-paper p-6 md:block"><h2 className="mb-6 text-sm font-medium">{zh ? "资料入口" : "Reference library"}</h2><nav className="space-y-5 text-sm text-lnpe-muted">{[["/applications/materials", zh ? "材料与工艺" : "Materials & processes"], ["/products", zh ? "产品与系统" : "Equipment & systems"], ["/research", zh ? "研究与试验" : "Research & trials"], ["/support", zh ? "服务与OEM" : "Service & OEM"], ["/resources#videos", zh ? "原理与设备视频" : "Principle & equipment videos"]].map(([href, label]) => <Link key={href} href={href} className="block hover:text-lnpe-blue">{label} →</Link>)}</nav><p className="mt-10 border-t border-lnpe-border pt-5 text-xs leading-6 text-lnpe-steel">{zh ? "输入材料名、缩写或设备型号，查阅对应说明。" : "Search by material name, abbreviation or equipment model."}</p></aside>
      <section className="min-h-0 overflow-hidden border border-lnpe-border bg-lnpe-paper"><ChatContainer lang={locale} /></section>
    </div>
  </main>;
}
