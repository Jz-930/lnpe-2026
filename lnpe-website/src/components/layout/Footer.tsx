import Link from 'next/link';
import Image from 'next/image';

const footerBackgroundImages = [
  '/images/backgrounds/LRadjusted-1.webp',
  '/images/backgrounds/LRadjusted-22.webp',
  '/images/backgrounds/LRadjusted-59.webp',
  '/images/backgrounds/LRadjusted-138.webp',
  '/images/backgrounds/LRadjusted-193.webp',
  '/images/backgrounds/LRadjusted-250.webp',
  '/images/backgrounds/LRadjusted-287.webp',
];

function FooterBackgroundSlideshow() {
  return (
    <>
      {footerBackgroundImages.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 opacity-0 [animation:footer-image-fade_168s_ease-in-out_infinite] motion-reduce:animate-none"
          style={{ animationDelay: `${index * 24}s` }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.14] mix-blend-multiply brightness-[0.82] contrast-[1.24] saturate-[0.72]"
          />
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="footer-alpha-scan object-cover opacity-[0.2] mix-blend-multiply brightness-[0.92] contrast-[1.28] saturate-[0.76]"
            style={{ animationDelay: `${index * 24}s` }}
          />
        </div>
      ))}
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-slate-800 bg-[#111a26] py-12 text-slate-300 md:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#d7dde6]/42" />
        <FooterBackgroundSlideshow />
        <div className="absolute inset-0 bg-[#08111d]/26 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,29,0.82)_0%,rgba(8,17,29,0.42)_42%,rgba(8,17,29,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,29,0.24),rgba(8,17,29,0.48)_48%,rgba(8,17,29,0.8)_100%)]" />
      </div>
      <div className="absolute left-0 top-0 z-20 h-[3px] w-full bg-gradient-to-r from-lnpe-kinetic via-lnpe-blue to-transparent" />
      <div className="container relative z-10 mx-auto grid grid-cols-1 gap-12 px-6 md:grid-cols-4">
        {/* Brand Col */}
        <div className="md:col-span-2">
          <Link href="/" className="relative mb-6 inline-block">
            <Image
              src="/images/00_brand/logo_01_lnpe-logo.webp"
              alt="LNPE Logo"
              width={160}
              height={50}
              className="h-12 w-auto brightness-0 invert opacity-90 transition-opacity duration-200 hover:opacity-100"
            />
          </Link>
          <p className="mb-6 max-w-sm text-sm leading-7 text-slate-300">
            Focusing on Ultra-Fine Powder Grinding & Classification. Solving difficulties in the ultra-fine powder industry for customers globally.
          </p>
          <div className="mt-6 flex flex-col gap-2 font-mono text-sm text-slate-400">
            <span>2025 LNPE, Inc. All rights reserved.</span>
            <Link href="/portal/assistant" className="w-fit text-xs tracking-widest text-lnpe-kinetic transition-colors duration-200 hover:text-white">
              Internal Portal
            </Link>
          </div>
        </div>

        {/* Products Links */}
        <div>
          <h4 className="mb-6 font-display text-sm font-semibold uppercase tracking-wide text-white">Products</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/products/jet-mill" className="transition-colors duration-200 hover:text-lnpe-kinetic">Jet Mill</Link></li>
            <li><Link href="/products/impact-mill" className="transition-colors duration-200 hover:text-lnpe-kinetic">Impact Mill</Link></li>
            <li><Link href="/products/jet-pulverizer" className="transition-colors duration-200 hover:text-lnpe-kinetic">Jet Pulverizer</Link></li>
            <li><Link href="/products/turnkey-epc" className="transition-colors duration-200 hover:text-lnpe-kinetic">Turnkey EPC</Link></li>
            <li><Link href="/products/shaping-mill" className="transition-colors duration-200 hover:text-lnpe-kinetic">Shaping Mill</Link></li>
            <li><Link href="/products/air-classifier" className="transition-colors duration-200 hover:text-lnpe-kinetic">Air Classifier</Link></li>
            <li><Link href="/products/laboratory-equipment" className="transition-colors duration-200 hover:text-lnpe-kinetic">Laboratory Equip.</Link></li>
          </ul>
        </div>

        {/* Company Links & Contact */}
        <div>
          <h4 className="mb-6 font-display text-sm font-semibold uppercase tracking-wide text-white">Company</h4>
          <ul className="mb-8 space-y-4 text-sm font-medium">
            <li><Link href="/about" className="transition-colors duration-200 hover:text-lnpe-kinetic">About Us</Link></li>
            <li><Link href="/news" className="transition-colors duration-200 hover:text-lnpe-kinetic">News</Link></li>
            <li><Link href="/projects" className="transition-colors duration-200 hover:text-lnpe-kinetic">Projects</Link></li>
            <li><Link href="/contact-us" className="transition-colors duration-200 hover:text-lnpe-kinetic">Contact Us</Link></li>
          </ul>

          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-[6px] bg-white px-6 py-3 text-sm font-semibold text-lnpe-dark transition-colors duration-200 hover:bg-lnpe-kinetic hover:text-white"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </footer>
  );
}
