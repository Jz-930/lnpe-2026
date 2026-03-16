import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased text-lnpe-text bg-lnpe-bg selection:bg-lnpe-kinetic/30 selection:text-white`}
        data-build-id="jiackey-2025"
      >
        {children}
      </body>
    </html>
  );
}
