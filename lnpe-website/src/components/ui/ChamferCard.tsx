import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ChamferCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'br' | 'tl-br';
  interactive?: boolean;
}

export function ChamferCard({
  children,
  className,
  variant = 'br',
  interactive = false,
  ...props
}: ChamferCardProps) {
  const variantClass = {
    'default': 'clip-chamfer',
    'br': 'clip-chamfer',
    'tl-br': 'clip-chamfer-tl-br'
  }[variant];

  return (
    <div
      className={cn(
        "relative border border-lnpe-border bg-lnpe-paper p-6 shadow-[0_14px_32px_rgba(17,24,39,0.055)]",
        variantClass,
        interactive && "group transition-all duration-200 hover:-translate-y-0.5 hover:border-lnpe-kinetic/50 hover:shadow-[0_18px_44px_rgba(17,24,39,0.09)]",
        className
      )}
      {...props}
    >
      {interactive && (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="absolute left-0 top-0 h-[2px] w-12 bg-lnpe-kinetic" />
          <div className="absolute left-0 top-0 h-12 w-[2px] bg-lnpe-kinetic" />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
