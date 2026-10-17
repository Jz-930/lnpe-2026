"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Props = { title: string; intro?: string; id?: string; children: ReactNode; className?: string };

/** Secondary information stays available without competing with the page's main story. */
export function ContentDisclosure({ title, intro, id, children, className = "" }: Props) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const reveal = (hash = window.location.hash) => {
      const target = document.getElementById(hash.slice(1));
      if (target && ref.current && (target === ref.current || ref.current.contains(target))) {
        ref.current.open = true;
        if (target === ref.current) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      }
    };
    const onHashChange = () => reveal();
    const onLinkClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!anchor || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const url = new URL(anchor.getAttribute("href")!, window.location.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname && url.hash) reveal(url.hash);
    };
    reveal();
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    document.addEventListener("click", onLinkClick, true);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
      document.removeEventListener("click", onLinkClick, true);
    };
  }, [id]);
  return (
    <details ref={ref} id={id} className={`content-disclosure group scroll-mt-28 border-b border-lnpe-border ${className}`}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm font-medium text-lnpe-muted transition-colors hover:text-lnpe-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lnpe-blue [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <ChevronDown aria-hidden="true" size={16} className="content-disclosure-chevron shrink-0 transition-transform duration-200 motion-reduce:transition-none" />
      </summary>
      <div className="content-disclosure-body pb-6 text-sm leading-7 text-lnpe-muted">
        {intro && <p className="mb-5 max-w-3xl">{intro}</p>}
        {children}
      </div>
    </details>
  );
}

export default ContentDisclosure;
