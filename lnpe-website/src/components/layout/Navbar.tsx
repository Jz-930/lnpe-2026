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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-lnpe-bg/80 backdrop-blur-md border-lnpe-border py-4'
          : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image 
            src="/images/00_brand/logo_01_lnpe-logo.webp" 
            alt="LNPE Logo" 
            width={120} 
            height={40} 
            className="w-auto h-8 brightness-0 invert opacity-90 transition-opacity hover:opacity-100" 
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
                  'text-sm tracking-wide font-medium transition-colors hover:text-white',
                  isActive ? 'text-white' : 'text-lnpe-text'
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact-us"
            className="hidden md:flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-lnpe-bg light border border-lnpe-border clip-chamfer transition-all hover:border-lnpe-kinetic hover:text-lnpe-kinetic group relative overflow-hidden"
          >
            <span className="relative z-10 transition-colors">Contact Us</span>
            <div className="absolute inset-0 bg-lnpe-kinetic/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
          
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-lnpe-bg/95 backdrop-blur-xl border-b border-lnpe-border py-4 px-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-white py-2 border-b border-lnpe-border/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center px-6 py-3 mt-4 text-sm font-semibold text-lnpe-bg bg-white clip-chamfer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
