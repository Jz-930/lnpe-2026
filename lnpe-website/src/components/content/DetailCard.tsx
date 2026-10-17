import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  title: ReactNode;
  description?: string;
  eyebrow?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Native details keeps card content reachable by keyboard and without JavaScript. */
export default function DetailCard({ title, description, eyebrow, icon, children, className = "" }: Props) {
  return <details className={`group/card self-start overflow-hidden border border-lnpe-border bg-lnpe-paper transition-colors open:border-lnpe-blue ${className}`}>
    <summary className="cursor-pointer list-none p-5 transition-colors hover:bg-lnpe-bg-light focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-lnpe-blue [&::-webkit-details-marker]:hidden">
      {icon && <span className="mb-5 inline-flex h-10 w-10 items-center justify-center border border-lnpe-border text-lnpe-blue">{icon}</span>}
      {eyebrow && <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-lnpe-steel">{eyebrow}</span>}
      <span className="flex items-start justify-between gap-4"><span className="text-base font-semibold leading-6 text-lnpe-dark">{title}</span><ChevronDown size={17} aria-hidden="true" className="mt-1 shrink-0 text-lnpe-blue transition-transform group-open/card:rotate-180" /></span>
      {description && <span className="mt-3 block text-sm leading-7 text-lnpe-muted">{description}</span>}
    </summary>
    <div className="space-y-4 border-t border-lnpe-border px-5 pb-5 pt-4 text-sm leading-7 text-lnpe-muted">{children}</div>
  </details>;
}
