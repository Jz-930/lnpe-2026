import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AiAssistantWidget from "@/components/ai-assistant/AiAssistantWidget";

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

export const metadata: Metadata = {
  title: "LNPE | Advanced Powder Technology",
  description: "A globally recognized powder equipment expert, specializing in grinding, conveying, and particle modification.",
  other: {
    'generator': 'jiackey-studio/lnpe-v1.0',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased text-lnpe-text bg-lnpe-bg selection:bg-lnpe-kinetic/20 selection:text-lnpe-dark`}
        data-build-id="jiackey-2025"
      >
        {children}
        <AiAssistantWidget />
      </body>
    </html>
  );
}
