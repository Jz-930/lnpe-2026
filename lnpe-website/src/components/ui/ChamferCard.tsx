import React from 'react';
import Link from 'next/link';
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
        "relative bg-lnpe-surface backdrop-blur-md border border-lnpe-border p-6",
        variantClass,
        interactive && "transition-all duration-300 hover:border-lnpe-kinetic/50 group",
        className
      )}
      {...props}
    >
      {/* Optional kinetic glow effect on hover */}
      {interactive && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-[1px] bg-lnpe-kinetic" />
          <div className="absolute top-0 left-0 w-[1px] h-8 bg-lnpe-kinetic" />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
