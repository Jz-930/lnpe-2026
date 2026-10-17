import type { Locale } from "@/i18n/config";
import { contactMessages } from "@/i18n/messages/pages";
import { createPageMetadata } from "@/i18n/metadata";
import ContactUsClient from "./ContactUsClient";
import { projectCopy, type ProjectSlug } from "@/i18n/messages/catalog";

type PageProps = { params: Promise<{ locale: Locale }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createPageMetadata(locale, "/contact-us", {
    en: { title: "Contact LNPE", description: contactMessages.en.intro },
    zh: { title: "联系 LNPE", description: contactMessages.zh.intro },
  });
}

export default async function ContactUsPage({ searchParams, params }: PageProps) {
  const query = await searchParams;
  const { locale } = await params;
  const initial = Object.fromEntries(["material", "equipment", "service", "capacity", "particleSize", "application", "message"].map(key => [key, typeof query[key] === "string" ? query[key].slice(0, 2000) : ""]));
  if (typeof query.project === "string" && Object.hasOwn(projectCopy[locale], query.project)) initial.project = projectCopy[locale][query.project as ProjectSlug].title;
  return <ContactUsClient key={JSON.stringify(initial)} initial={initial} />;
}
