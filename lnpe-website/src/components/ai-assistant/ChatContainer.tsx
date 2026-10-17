"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import Link from "next/link";
import { localizeHref } from "@/i18n/routing";
import { assistantMessages } from "@/i18n/messages/assistant";

type Result = { title: string; summary: string; href: string; kind: string };
type Message = { id: string; role: "user" | "assistant"; text: string; results?: Result[] };

export default function ChatContainer({ lang = "en" }: { isInternalMode?: boolean; lang?: "en" | "zh" }) {
  return <ChatSession key={lang} lang={lang} />;
}

function ChatSession({ lang }: { lang: "en" | "zh" }) {
  const copy = assistantMessages[lang];
  const zh = lang === "zh";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);
  const validQuery = (query: string) => query.length >= 2 || /\p{Script=Han}/u.test(query);
  const suggestions = zh ? ["磷酸铁锂", "气流磨", "设备视频", "来料试验"] : ["Lithium iron phosphate", "Jet mill", "Equipment videos", "Material trial"];
  useEffect(() => { endRef.current?.scrollIntoView({ block: "nearest" }); }, [messages, busy]);
  useEffect(() => () => controller.current?.abort(), []);

  async function search(override?: string) {
    const query = (override ?? input).trim();
    if (busy || !validQuery(query)) return;
    setInput(""); setBusy(true);
    setMessages(previous => [...previous, { id: crypto.randomUUID(), role: "user", text: query }]);
    controller.current = new AbortController();
    const signal = controller.current.signal;
    try {
      const response = await fetch("/api/content-search?" + new URLSearchParams({ q: query, lang }), { signal });
      if (!response.ok) throw new Error("Search unavailable");
      const { results } = await response.json() as { results: Result[] };
      if (signal.aborted) return;
      setMessages(previous => [...previous, { id: crypto.randomUUID(), role: "assistant", text: results.length ? (zh ? "以下资料与您的关键词相关，可进入详情查看工艺条件与选型说明。" : "These references match your keywords. Open a detail page for process conditions and selection guidance.") : (zh ? "没有找到直接匹配的条目。可换用材料名、设备名或缩写检索，也可将具体需求交给工程师。" : "No direct match found. Try a material name, equipment name or abbreviation, or share your requirements with an engineer."), results }]);
    } catch {
      if (!signal.aborted) setMessages(previous => [...previous, { id: crypto.randomUUID(), role: "assistant", text: zh ? "资料检索暂时不可用，您仍可浏览物料目录或联系工程师。" : "Search is temporarily unavailable. You can still browse the material directory or contact an engineer." }]);
    } finally { if (!signal.aborted) setBusy(false); }
  }

  return <div className="relative z-10 flex h-full min-h-0 flex-col bg-transparent">
    <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-5 py-5" role="log" aria-live="polite" aria-label={zh ? "资料检索记录" : "Reference search history"}>
      {messages.length === 0 && <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
        <div className="mb-4 grid h-12 w-12 place-items-center border border-lnpe-border bg-lnpe-paper"><Image src="/images/00_brand/favicon_01.ico" alt={copy.imageAlt} width={24} height={24} /></div>
        <p className="max-w-[280px] text-sm leading-7 text-lnpe-muted">{zh ? "输入材料、设备或服务关键词，查阅网站中的双语技术资料。" : "Enter a material, equipment or service keyword to explore the website's technical references."}</p>
      </div>}
      <div className="space-y-5">{messages.map(message => <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
        <div className={message.role === "user" ? "max-w-[85%] bg-lnpe-blue px-4 py-3 text-sm leading-6 text-white" : "w-full space-y-4 border border-lnpe-border bg-lnpe-paper p-4 text-sm leading-7 text-lnpe-muted"}>
          <p>{message.text}</p>
          {message.results?.map(result => <Link key={result.href} href={localizeHref(result.href, lang)} className="block border-t border-lnpe-border pt-3 hover:text-lnpe-blue"><span className="block text-[11px] text-lnpe-steel">{result.kind}</span><span className="font-medium text-lnpe-blue">{result.title} →</span><span className="mt-1 block text-xs leading-6">{result.summary}</span></Link>)}
          {message.role === "assistant" && <div className="flex flex-wrap gap-4 border-t border-lnpe-border pt-3 text-xs text-lnpe-blue"><Link href={localizeHref("/applications/materials", lang)}>{zh ? "物料目录" : "Material directory"}</Link><Link href={localizeHref("/contact-us?service=selection", lang)}>{zh ? "联系工程师" : "Contact an engineer"}</Link></div>}
        </div>
      </div>)}{busy && <p className="text-xs text-lnpe-steel">{zh ? "正在检索资料…" : "Searching references…"}</p>}<div ref={endRef} /></div>
    </div>
    <div className="space-y-3 border-t border-lnpe-border bg-lnpe-paper p-4">
      <div className="flex flex-wrap gap-2">{suggestions.map(suggestion => <button key={suggestion} disabled={busy} onClick={() => search(suggestion)} className="border border-lnpe-border px-3 py-1.5 text-xs text-lnpe-blue hover:border-lnpe-blue disabled:opacity-50">{suggestion}</button>)}</div>
      <form onSubmit={event => { event.preventDefault(); void search(); }} className="flex items-end border border-lnpe-border bg-lnpe-bg-light p-1 focus-within:border-lnpe-kinetic">
        <textarea value={input} maxLength={300} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void search(); } }} placeholder={zh ? "材料、设备或服务关键词…" : "Material, equipment or service keywords…"} aria-label={zh ? "资料检索关键词" : "Reference search keywords"} rows={1} className="min-h-11 min-w-0 flex-1 resize-none bg-transparent px-3 py-3 text-sm outline-none" />
        <button type="submit" disabled={busy || !validQuery(input.trim())} aria-label={copy.send} className="m-1 grid h-9 w-9 shrink-0 place-items-center bg-lnpe-dark text-white disabled:opacity-40"><Send size={16} /></button>
      </form>
      <p className="text-center text-[10px] leading-5 text-lnpe-steel">{zh ? "网站资料检索 · 工艺与报价请联系工程师确认" : "Website references · Confirm process and pricing with an engineer"}</p>
    </div>
  </div>;
}
