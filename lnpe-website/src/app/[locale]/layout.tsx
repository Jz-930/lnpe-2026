import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import AiAssistantWidget from "@/components/ai-assistant/AiAssistantWidget";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { isLocale, locales } from "@/i18n/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const chinese = Noto_Sans_SC({
  variable: "--font-chinese",
  display: "swap",
  preload: false,
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL("https://lnpe-2026.vercel.app"),
    title: locale === 'zh' ? 'LNPE | 先进粉体技术' : 'LNPE | Advanced Powder Technology',
    description: locale === 'zh'
      ? '专注粉碎、输送与颗粒改性，为不同物料与生产需求提供粉体装备和工艺解决方案。'
      : 'A globally recognized powder equipment expert, specializing in grinding, conveying, and particle modification.',
    other: { generator: 'jiackey-studio/lnpe-v1.0' },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'}>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${locale === 'zh' ? chinese.variable : ''} font-sans antialiased text-lnpe-text bg-lnpe-bg selection:bg-lnpe-kinetic/20 selection:text-lnpe-dark`}
        data-build-id="jiackey-2025"
      >
        <LocaleProvider locale={locale}>
          {children}
          <AiAssistantWidget key={locale} />
        </LocaleProvider>
      </body>
    </html>
  );
}
