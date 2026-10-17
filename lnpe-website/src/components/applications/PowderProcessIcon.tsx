import type { ReactNode } from "react";

export const powderProcessSteps = ["feed", "grinding", "classification", "shaping", "collection"] as const;

type PowderProcessStep = (typeof powderProcessSteps)[number];

const accent = "var(--powder-icon-accent, #f26522)";
const wash = "var(--powder-icon-wash, #e8eff6)";

// Illustrate the material transformation, rather than a specific machine model.
const drawings: Record<PowderProcessStep, ReactNode> = {
  feed: (
    <>
      <path d="M10 23h44L39 42v8H25v-8Z" fill={wash} />
      <path d="M8 23h48M25 42h14" />
      <g fill={accent} stroke="none">
        <path d="m17 10 5-3 4 5-3 5-6-1Z" />
        <circle cx="37" cy="11" r="3" />
        <circle cx="44" cy="18" r="2" />
        <circle cx="31" cy="19" r="2" />
      </g>
      <path d="M32 49v11m-4-4 4 4 4-4" stroke={accent} />
    </>
  ),
  grinding: (
    <>
      <path d="m25 8 12 2 6 12-10 9-12-7-1-9Z" fill={wash} />
      <path d="m33 10-5 9 8 3-3 9" />
      <path d="M6 22h9m-4-4 4 4-4 4m47-4h-9m4-4-4 4 4 4" stroke={accent} />
      <path d="m18 40 6-3 5 6-4 6-7-2Zm19-3 7 2-1 7-7 1-3-5Z" fill={wash} />
      <g fill={accent} stroke="none">
        <path d="m28 53 4-4 5 4-2 6-6-1Z" />
        <circle cx="14" cy="55" r="2.5" />
        <circle cx="47" cy="54" r="3" />
      </g>
    </>
  ),
  classification: (
    <>
      <circle cx="20" cy="13" r="5" fill={wash} />
      <circle cx="42" cy="17" r="3.5" fill={wash} />
      <circle cx="33" cy="10" r="2" fill={accent} stroke="none" />
      <path d="M32 23v8m0 0c-10 0-17 4-17 12m17-12c10 0 17 4 17 12" />
      <path d="m11 39 4 4 4-4m26 0 4 4 4-4" stroke={accent} />
      <circle cx="10" cy="53" r="4.5" fill={wash} />
      <circle cx="24" cy="55" r="4.5" fill={wash} />
      <g fill={accent} stroke="none">
        <circle cx="43" cy="51" r="2" />
        <circle cx="54" cy="51" r="2" />
        <circle cx="46" cy="58" r="2" />
        <circle cx="57" cy="58" r="2" />
      </g>
    </>
  ),
  shaping: (
    <>
      <path d="m6 26 7-5 9 3 3 9-4 9-10 1-6-8Z" fill={wash} />
      <path d="m10 28 5-3 5 2" />
      <path d="M29 32h8m-4-4 4 4-4 4" stroke={accent} />
      <circle cx="51" cy="32" r="9.5" fill="var(--powder-icon-warm-wash, #fff0e7)" stroke={accent} />
      <path d="M47 29a5 5 0 0 1 5-2" stroke={accent} />
    </>
  ),
  collection: (
    <>
      <path d="M28 7v12m8-12v12M26 7h12" />
      <path d="M15 24v27c0 8 34 8 34 0V24" fill={wash} />
      <ellipse cx="32" cy="24" rx="17" ry="5" fill={wash} />
      <path d="M32 30v9m-4-4 4 4 4-4" stroke={accent} />
      <g fill={accent} stroke="none">
        <circle cx="24" cy="48" r="2" />
        <circle cx="32" cy="46" r="2" />
        <circle cx="40" cy="48" r="2" />
        <circle cx="28" cy="53" r="2" />
        <circle cx="36" cy="53" r="2" />
      </g>
    </>
  ),
};

export function PowderProcessIcon({ step, className }: { step: PowderProcessStep; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="64"
      height="64"
      fill="none"
      stroke="var(--powder-icon-stroke, #174a7c)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {drawings[step]}
    </svg>
  );
}
