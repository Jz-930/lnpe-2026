'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from '@/components/i18n/LocalizedLink';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/components/ui/ChamferCard';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import { useLocale } from '@/i18n/LocaleProvider';
import { stripLocale } from '@/i18n/routing';
import { navigation } from '@/i18n/messages/navigation';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { name: 'products', href: '/products' },
  { name: 'applications', href: '/applications' },
  { name: 'projects', href: '/projects' },
  { name: 'about', href: '/about' },
  { name: 'news', href: '/news' },
] as const;

export function Navbar() {
  const pathname = stripLocale(usePathname() ?? '');
  const locale = useLocale();
  const copy = navigation[locale];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreScrollRef = useRef<(() => void) | null>(null);
  const zh = locale === 'zh';
  const secondaryLinks = [
    { href: '/products/technologies', label: zh ? '工艺与技术' : 'Process technologies' },
    { href: '/applications/materials', label: zh ? '物料目录' : 'Material directory' },
    { href: '/research', label: zh ? '研究与实验' : 'Research & testing' },
    { href: '/support', label: zh ? '服务与支持' : 'Service & support' },
    { href: '/resources', label: zh ? '资料与常见问题' : 'Resources & FAQ' },
    { href: '/portal/assistant', label: zh ? '技术资料工作台' : 'Technical reference desk' },
  ];

  const closeMenu = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
    restoreScrollRef.current?.();
    restoreScrollRef.current = null;
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    // A fixed body also prevents background scrolling on iOS. Restore before
    // navigation so Next can apply the destination's normal scroll position.
    const scrollY = window.scrollY;
    const body = document.body;
    const original = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    restoreScrollRef.current = () => {
      Object.assign(body.style, original);
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
    dialog.showModal();
    setMobileMenuOpen(true);
    closeButtonRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const handleResize = () => {
      if (desktop.matches && dialogRef.current?.open) closeMenu();
    };
    const handleHistoryChange = () => {
      if (dialogRef.current?.open) closeMenu();
    };
    desktop.addEventListener('change', handleResize);
    window.addEventListener('popstate', handleHistoryChange);
    return () => {
      desktop.removeEventListener('change', handleResize);
      window.removeEventListener('popstate', handleHistoryChange);
      restoreScrollRef.current?.();
    };
  }, [closeMenu]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-200',
        styles.header,
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-lnpe-border shadow-[0_10px_28px_rgba(17,24,39,0.07)] py-3'
          : 'bg-white/90 backdrop-blur-sm border-white/70 py-5'
      )}
    >
      <div className={cn('mx-auto flex h-full w-full max-w-[1240px] items-center justify-between px-6', styles.headerInner)}>
        {/* Logo */}
        <Link href="/" className={cn('flex items-center gap-2 group', styles.logoLink)}>
          <Image 
            src="/images/00_brand/logo_01_lnpe-logo.webp" 
            alt={copy.logo}
            width={120} 
            height={40} 
            className="w-auto h-8 opacity-95 transition-opacity duration-200 hover:opacity-100"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label={copy.label} className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-lnpe-dark focus-visible:outline-offset-6',
                  isActive ? 'text-lnpe-dark' : 'text-lnpe-steel'
                )}
              >
                {copy[link.name]}
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
        <div className="flex items-center gap-2 lg:gap-4">
          <Link
            href="/contact-us"
            className="group relative hidden items-center justify-center overflow-hidden rounded-[6px] border border-lnpe-dark bg-lnpe-dark px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-lnpe-kinetic hover:bg-lnpe-kinetic focus-visible:outline-offset-4 lg:flex"
          >
            <span className="relative z-10">{copy.contact}</span>
          </Link>
          <LanguageSwitcher />
          
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileMenuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-haspopup="dialog"
            className={cn('inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-lnpe-border bg-white text-lnpe-dark transition-colors duration-200 hover:border-lnpe-kinetic hover:text-lnpe-kinetic lg:hidden', styles.menuToggle)}
            onClick={openMenu}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-label={copy.label}
        className={styles.dialog}
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onClose={closeMenu}
      >
        <div className={styles.dialogHeader}>
          <Link href="/" className={styles.logoLink} onClick={closeMenu} aria-label={zh ? 'LNPE 首页' : 'LNPE home'}>
            <Image src="/images/00_brand/logo_01_lnpe-logo.webp" alt={copy.logo} width={120} height={40} className="h-8 w-auto" />
          </Link>
          <div className={styles.dialogActions}>
            <LanguageSwitcher />
            <button ref={closeButtonRef} type="button" className={styles.closeButton} aria-label={copy.closeMenu} onClick={closeMenu}>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className={styles.dialogScroll}>
          <div className={styles.menuGrid}>
            <nav aria-label={copy.label} className={styles.primaryNav}>
              <p className={styles.eyebrow}>{zh ? '探索 LNPE' : 'Explore LNPE'}</p>
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link key={link.name} href={link.href} aria-current={isActive ? 'page' : undefined} className={styles.primaryLink} onClick={closeMenu}>
                    <span className={styles.linkNumber} aria-hidden="true">0{index + 1}</span>
                    <span>{copy[link.name]}</span>
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </Link>
                );
              })}
            </nav>
            <div className={styles.menuResources}>
              <nav aria-label={zh ? '资料与服务' : 'Resources and services'}>
                <p className={styles.eyebrow}>{zh ? '资料与服务' : 'Resources & services'}</p>
                <div className={styles.secondaryGrid}>
                  {secondaryLinks.map((link) => (
                    <Link key={link.href} href={link.href} className={styles.secondaryLink} aria-current={pathname === link.href ? 'page' : undefined} onClick={closeMenu}>
                      <span>{link.label}</span><ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </nav>
              <div className={styles.menuContact}>
                <p>{zh ? '从物料到工艺，一起找到答案。' : 'Let’s find the right process for your material.'}</p>
                <Link href="/contact-us" className={styles.contactLink} onClick={closeMenu}>
                  {copy.contact}<ArrowRight size={19} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
          <p className={styles.menuSignature}>{zh ? '超细粉体 · 精密分级 · 系统工程' : 'Fine grinding · Precision classification · Complete systems'}</p>
        </div>
      </dialog>
    </header>
  );
}
