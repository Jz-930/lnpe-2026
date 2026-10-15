import type { Locale } from "@/i18n/config";
import { contactMessages } from "@/i18n/messages/pages";
import { createPageMetadata } from "@/i18n/metadata";
import ContactUsClient from "./ContactUsClient";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createPageMetadata(locale, "/contact-us", {
    en: { title: "Contact LNPE", description: contactMessages.en.intro },
    zh: { title: "联系 LNPE", description: contactMessages.zh.intro },
  });
}

export default function ContactUsPage() {
  return <ContactUsClient />;
}
