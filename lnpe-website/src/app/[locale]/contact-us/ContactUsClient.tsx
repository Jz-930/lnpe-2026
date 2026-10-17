"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Mail, MapPin, Phone, Settings2 } from "lucide-react";

import { useLocale } from "@/i18n/LocaleProvider";
import { contactMessages } from "@/i18n/messages/pages";
import { useState, type FormEvent } from "react";
import Link from "@/components/i18n/LocalizedLink";
import ContentDisclosure from "@/components/content/ContentDisclosure";
import DetailCard from "@/components/content/DetailCard";
import { supportDetails } from "@/content/company";

const inputClass =
  "h-12 w-full border border-lnpe-border bg-lnpe-bg-light px-4 text-sm text-lnpe-dark outline-none transition-colors placeholder:text-lnpe-steel focus:border-lnpe-kinetic focus:bg-lnpe-paper";

export default function ContactUsClient({ initial = {} }: { initial?: Record<string, string> }) {
  const locale = useLocale();
  const zh = locale === "zh";
  const t = contactMessages[locale];
  const services = zh ? { selection: "设备与整线选型", trial: "来料试验", oem: "OEM代加工", visit: "工厂考察", maintenance: "维护与售后", spares: "备件咨询", documents: "技术资料", careers: "人才与合作" } : { selection: "Equipment & line selection", trial: "Material trial", oem: "OEM processing", visit: "Factory visit", maintenance: "Maintenance & service", spares: "Spare parts", documents: "Technical documents", careers: "Careers & collaboration" };
  const [brief, setBrief] = useState("");
  const [service, setService] = useState(initial.service in services ? initial.service : "selection");
  const materialRequired = ["selection", "trial", "oem"].includes(service);
  const [recipient, setRecipient] = useState(locale === "zh" ? "ally@lnpe.com.cn" : "sales@lnpe.ca");
  const [copyStatus, setCopyStatus] = useState("");
  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [zh ? "LNPE 工程咨询需求" : "LNPE engineering enquiry", `${zh ? "咨询类型" : "Service"}: ${services[data.get("service") as keyof typeof services]}`];
    for (const [key, label] of Object.entries(t.fields)) lines.push(`${label[0].replace(" *", "")}: ${String(data.get(key) || "—")}`);
    lines.push(`${zh ? "设备 / 型号" : "Equipment / model"}: ${String(data.get("equipment") || "—")}`);
    if (initial.project) lines.push(`${zh ? "参考项目" : "Reference project"}: ${initial.project}`);
    setBrief(lines.join("\n")); setCopyStatus("");
  }
  async function copyBrief() {
    try { await navigator.clipboard.writeText(brief); setCopyStatus(zh ? "需求已复制。" : "Brief copied."); }
    catch { setCopyStatus(zh ? "请在下方文本框中选择并复制需求。" : "Select and copy the brief in the text box below."); }
  }
  return (
    <main className="contact-page min-h-screen flex flex-col pt-[88px] bg-lnpe-bg text-lnpe-text">
      <Navbar />

      <div className="flex-1">
        <section className="relative overflow-hidden border-b border-lnpe-border bg-lnpe-bg-light">
          <div className="absolute inset-0 bg-technical-grid opacity-70" />
          <div className="contact-hero container relative mx-auto max-w-6xl px-6 py-[72px]">
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
              {t.serviceCards.map(([title, copy], index) => (
                <DetailCard key={title} title={title} description={copy} icon={<Settings2 size={18} />}>
                  <p>{supportDetails[locale][0].items[index].text}</p>
                  <button type="button" className="inline-flex min-h-11 items-center gap-2 font-semibold text-lnpe-blue hover:underline" onClick={() => { setService("selection"); setBrief(""); document.getElementById("enquiry-form")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" }); document.getElementById("enquiry-type")?.focus({ preventScroll: true }); }}>{zh ? "整理这项咨询需求" : "Prepare this enquiry"}<ArrowRight size={15} /></button>
                </DetailCard>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-body py-20">
          <div className="contact-layout container mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
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
                      <a href={`tel:${office.tel.replace(/[^+\d]/g, "")}`} className="hover:text-lnpe-blue">{office.tel}</a>
                    </p>
                    <p className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-lnpe-kinetic" />
                      <a href={`mailto:${office.email}`} className="hover:text-lnpe-blue">{office.email}</a>
                    </p>
                  </div>
                </div>
              ))}
              <div className="px-2">
                <ContentDisclosure title={zh ? "德阳加工基地与工厂联系" : "Deyang processing base & factory contacts"}>
                  <p className="font-medium text-lnpe-dark">{zh ? "四川流能微纳技术有限公司 · 德阳工厂" : "Sichuan Liuneng Micro-Nano Technology · Deyang"}</p>
                  <p className="mt-2">{zh ? "四川省德阳市罗江区金山工业园，青红路与光明路交汇处。" : "Intersection of Qinghong Road and Guangming Road, Jinshan Industrial Park, Luojiang District, Deyang, Sichuan, China."}</p>
                  <p className="mt-3">{zh ? "来料加工：" : "Powder processing: "}<a href="tel:+8618281555237" className="text-lnpe-blue">+86 182 8155 5237</a></p>
                  <p>{zh ? "德阳工厂联系：" : "Deyang factory contact: "}<a href="tel:+868162280306" className="text-lnpe-blue">+86 816 2280306</a></p>
                  <p className="mt-3">{zh ? "绵阳工厂座机：" : "Mianyang factory telephone: "}<a href="tel:+868162280206" className="text-lnpe-blue">+86 816 2280206</a> / <a href="tel:+868162280306" className="text-lnpe-blue">2280306</a></p>
                  <p>{zh ? "传真：+86 816 2280206。来访与寄样请提前确认接收安排。" : "Fax: +86 816 2280206. Confirm receiving arrangements before visiting or sending samples."}</p>
                </ContentDisclosure>
                <ContentDisclosure title={zh ? "来料试验、OEM与售后准备什么？" : "Preparing for trials, OEM and service"}>
                  <p>{zh ? "试验与OEM：材料成分、来料状态、目标粒度、批量和检测方法。维保与备件：设备型号、编号、使用物料、故障或部件照片。考察：基地、日期、人员与技术议题。" : "Trials and OEM: composition, feed condition, target size, batch quantity and test methods. Maintenance and spares: model, equipment number, processed material and fault or part photographs. Visits: facility, dates, attendees and topics."}</p>
                  <Link href="/support" className="mt-3 inline-block text-lnpe-blue">{zh ? "服务流程与准备清单 →" : "Service process & checklists →"}</Link>
                </ContentDisclosure>
              </div>
            </aside>

            <div className="contact-form-panel border border-lnpe-border bg-lnpe-paper p-6 md:p-8 shadow-[0_20px_60px_rgba(17,24,39,0.06)] clip-chamfer">
              <div className="mb-8 flex flex-col justify-between gap-4 border-b border-lnpe-border pb-6 md:flex-row md:items-end">
                <div>
                  <p className="spec-label mb-3">{t.formLabel}</p>
                  <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-lnpe-dark">{t.formTitle}</h2>
                </div>
                <p className="text-sm text-lnpe-muted">{t.required}</p>
              </div>

              <form id="enquiry-form" className="scroll-mt-28 space-y-5" onSubmit={prepareBrief} onChange={() => setBrief("")}>
                {initial.project && <p className="border-l-2 border-lnpe-border pl-4 text-xs text-lnpe-muted">{zh ? "参考项目：" : "Reference project: "}{initial.project}</p>}
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold text-lnpe-steel">{zh ? "咨询类型" : "Enquiry type"}</span>
                  <select id="enquiry-type" name="service" value={service} onChange={event => setService(event.target.value)} className={inputClass}>
                    {Object.entries(services).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.firstName[0]}</span>
                    <input name="firstName" autoComplete="given-name" className={inputClass} type="text" required placeholder={t.fields.firstName[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.lastName[0]}</span>
                    <input name="lastName" autoComplete="family-name" className={inputClass} type="text" required placeholder={t.fields.lastName[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{service === "careers" ? t.fields.company[0].replace(" *", "") : t.fields.company[0]}</span>
                    <input name="company" autoComplete="organization" className={inputClass} type="text" required={service !== "careers"} placeholder={t.fields.company[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.email[0]}</span>
                    <input name="email" autoComplete="email" className={inputClass} type="email" required placeholder={t.fields.email[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.phone[0]}</span>
                    <input name="phone" autoComplete="tel" className={inputClass} type="tel" placeholder={t.fields.phone[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{materialRequired ? t.fields.material[0] : t.fields.material[0].replace(" *", "")}</span>
                    <input name="material" defaultValue={initial.material} className={inputClass} type="text" required={materialRequired} placeholder={t.fields.material[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.capacity[0]}</span>
                    <input name="capacity" defaultValue={initial.capacity} className={inputClass} type="text" placeholder={t.fields.capacity[1]} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.particleSize[0]}</span>
                    <input name="particleSize" defaultValue={initial.particleSize} className={inputClass} type="text" placeholder={t.fields.particleSize[1]} />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.application[0]}</span>
                  <input name="application" defaultValue={initial.application} className={inputClass} type="text" placeholder={t.fields.application[1]} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold text-lnpe-steel">{zh ? "设备 / 型号（如已选）" : "Equipment / model (if selected)"}</span>
                  <input name="equipment" defaultValue={initial.equipment} className={inputClass} type="text" />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-lnpe-steel">{t.fields.message[0]}</span>
                  <textarea
                    name="message"
                    defaultValue={initial.message}
                    className="min-h-32 w-full resize-y border border-lnpe-border bg-lnpe-bg-light px-4 py-3 text-sm leading-7 text-lnpe-dark outline-none transition-colors placeholder:text-lnpe-steel focus:border-lnpe-kinetic focus:bg-lnpe-paper"
                    placeholder={t.fields.message[1]}
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-between bg-lnpe-dark px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-lnpe-paper transition-colors hover:bg-lnpe-kinetic md:w-auto md:min-w-64 clip-chamfer"
                >
                  <span>{zh ? "整理咨询需求" : "Prepare enquiry"}</span>
                  <ArrowRight size={18} />
                </button>
                <p className="text-xs leading-6 text-lnpe-muted">{zh ? "整理后可复制需求或打开邮件草稿，由您确认发送。" : "Copy the prepared brief or open an email draft to review and send."} <Link href="/privacy" className="underline underline-offset-2">{zh ? "联系信息说明" : "Contact information"}</Link></p>
              </form>
              {brief && <div className="mt-6 space-y-4 border-t border-lnpe-border pt-6" aria-live="polite">
                <p className="text-sm text-lnpe-muted">{zh ? "需求已整理，请选择联系窗口并在邮件中发送。" : "Your brief is ready. Select a contact and send it from your email app."}</p>
                <label className="block text-xs text-lnpe-muted">{zh ? "联系窗口" : "Contact office"}<select value={recipient} onChange={event => setRecipient(event.target.value)} className={`${inputClass} mt-2`}>
                  {t.offices.map(office => <option key={office.email} value={office.email}>{office.title} · {office.email}</option>)}
                </select></label>
                <textarea aria-label={zh ? "整理后的咨询需求" : "Prepared enquiry brief"} readOnly value={brief} className="min-h-60 w-full border border-lnpe-border bg-lnpe-bg-light p-4 text-sm leading-6 text-lnpe-muted" />
                <div className="flex flex-wrap gap-5 text-sm">
                  <a className="text-lnpe-blue underline underline-offset-4" href={`mailto:${recipient}?subject=${encodeURIComponent(zh ? "LNPE 工程咨询" : "LNPE engineering enquiry")}&body=${encodeURIComponent(brief)}`}>{zh ? "打开邮件草稿 →" : "Open email draft →"}</a>
                  <button type="button" onClick={copyBrief} className="text-lnpe-muted underline underline-offset-4">{zh ? "复制需求" : "Copy brief"}</button>
                </div>
                {copyStatus && <p className="text-xs text-lnpe-muted">{copyStatus}</p>}
              </div>}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
