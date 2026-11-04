import { LOGO_BLADES, LOGO_CORE, LOGO_GREEN, LOGO_RING } from "@/lib/logo-paths";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="-3 -1 104 102" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="49" fill="#fff" />
      <path fill={LOGO_GREEN} fillRule="evenodd" d={LOGO_RING} />
      {LOGO_BLADES.map((d) => (
        <path key={d} fill={LOGO_GREEN} d={d} />
      ))}
      <path fill={LOGO_GREEN} d={LOGO_CORE} />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="leading-none">
        <span className="block text-[0.85rem] font-medium tracking-[-0.02em]">5Point Electric</span>
        <span className="mt-1 block font-mono text-[0.475rem] tracking-[0.1em] uppercase opacity-70">Technology Limited</span>
      </span>
    </span>
  );
}

/** Outline of the logo's aperture, used as a large background graphic. */
export function ApertureOutline({ className = "", strokeWidth = 0.18 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true">
      {LOGO_BLADES.map((d) => (
        <path key={d} d={d} />
      ))}
      <path d={LOGO_CORE} />
    </svg>
  );
}
