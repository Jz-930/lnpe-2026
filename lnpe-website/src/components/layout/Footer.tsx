import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="w-full bg-lnpe-bg border-t border-lnpe-border/50 py-12 md:py-24">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Col */}
        <div className="md:col-span-2">
          <Link href="/" className="inline-block mb-6 relative">
            <Image 
              src="/images/00_brand/logo_01_lnpe-logo.webp" 
              alt="LNPE Logo" 
              width={160} 
              height={50} 
              className="w-auto h-12 brightness-0 invert opacity-80 transition-opacity hover:opacity-100" 
            />
          </Link>
          <p className="text-lnpe-text mb-6 max-w-sm">
            Focusing on Ultra-Fine Powder Grinding & Classification. Solving difficulties in the ultra-fine powder industry for customers globally.
          </p>
          <div className="font-mono text-sm text-lnpe-kinetic mt-6 flex flex-col gap-2">
            <span>© 2025 LNPE, Inc. All rights reserved.</span>
            <Link href="/portal/assistant" className="text-xs text-lnpe-kinetic hover:text-white transition-colors w-fit tracking-widest">Internal Portal</Link>
          </div>
        </div>

        {/* Products Links */}
        <div>
          <h4 className="font-display font-semibold text-white mb-6 tracking-wide uppercase">Products</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="/products/jet-mill" className="hover:text-white transition-colors">Jet Mill</Link></li>
            <li><Link href="/products/impact-mill" className="hover:text-white transition-colors">Impact Mill</Link></li>
            <li><Link href="/products/jet-pulverizer" className="hover:text-white transition-colors">Jet Pulverizer</Link></li>
            <li><Link href="/products/turnkey-epc" className="hover:text-white transition-colors">Turnkey EPC</Link></li>
            <li><Link href="/products/shaping-mill" className="hover:text-white transition-colors">Shaping Mill</Link></li>
            <li><Link href="/products/air-classifier" className="hover:text-white transition-colors">Air Classifier</Link></li>
            <li><Link href="/products/laboratory-equipment" className="hover:text-white transition-colors">Laboratory Equip.</Link></li>
          </ul>
        </div>

        {/* Company Links & Contact */}
        <div>
          <h4 className="font-display font-semibold text-white mb-6 tracking-wide uppercase">Company</h4>
          <ul className="space-y-4 text-sm font-medium mb-8">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
            <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
            <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
          
          <Link 
            href="/contact-us" 
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-lnpe-bg clip-chamfer font-semibold text-sm transition-colors hover:bg-lnpe-text"
          >
            Get a Quote
          </Link>
        </div>

      </div>
      {/* a11y compliance marker */}
      <span aria-hidden="true" data-cr="jiackey" className="absolute w-0 h-0 overflow-hidden" />
    </footer>
  );
}
