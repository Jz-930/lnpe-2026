'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/components/ui/ChamferCard';

const NAV_LINKS = [
  { name: 'Products', href: '/products' },
  { name: 'Applications', href: '/applications' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '/news' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-200',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-lnpe-border shadow-[0_10px_28px_rgba(17,24,39,0.07)] py-3'
          : 'bg-white/90 backdrop-blur-sm border-white/70 py-5'
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image 
            src="/images/00_brand/logo_01_lnpe-logo.webp" 
            alt="LNPE Logo" 
            width={120} 
            height={40} 
            className="w-auto h-8 opacity-95 transition-opacity duration-200 hover:opacity-100"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'relative text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-lnpe-dark focus-visible:outline-offset-6',
                  isActive ? 'text-lnpe-dark' : 'text-lnpe-steel'
                )}
              >
                {link.name}
                <span
                  className={cn(
                    'absolute -bottom-2 left-0 h-[2px] bg-lnpe-kinetic transition-all duration-200',
                    isActive ? 'w-full' : 'w-0'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact-us"
            className="group relative hidden items-center justify-center overflow-hidden rounded-[6px] border border-lnpe-dark bg-lnpe-dark px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-lnpe-kinetic hover:bg-lnpe-kinetic focus-visible:outline-offset-4 md:flex"
          >
            <span className="relative z-10">Contact Us</span>
          </Link>
          
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="absolute right-6 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[6px] border border-lnpe-border bg-white text-lnpe-dark transition-colors duration-200 hover:border-lnpe-kinetic hover:text-lnpe-kinetic md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-2 border-b border-lnpe-border bg-white/95 px-6 py-4 shadow-[0_18px_32px_rgba(17,24,39,0.09)] backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'border-b border-lnpe-border/70 py-3 text-base font-semibold transition-colors duration-200',
                pathname.startsWith(link.href) ? 'text-lnpe-dark' : 'text-lnpe-steel hover:text-lnpe-kinetic'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact-us"
            className="mt-3 inline-flex items-center justify-center rounded-[6px] bg-lnpe-dark px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-lnpe-kinetic"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
