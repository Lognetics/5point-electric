// Placeholder mark until the official 5Point logo is supplied: five points, one energised.
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="4" fill="currentColor" />
      <g fill="var(--logo-dots,#fff)">
        <circle cx="9" cy="9" r="2.6" />
        <circle cx="23" cy="9" r="2.6" />
        <circle cx="9" cy="23" r="2.6" />
        <circle cx="23" cy="23" r="2.6" />
      </g>
      <circle cx="16" cy="16" r="3.4" fill="#35B96B" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={light ? "text-white [--logo-dots:#101D2C]" : "text-navy [--logo-dots:#FFFFFF]"}
      >
        <LogoMark className="h-8 w-8" />
      </span>
      <span
        className={`font-display text-[1.0625rem] leading-none font-bold tracking-[-0.02em] ${light ? "text-white" : "text-navy"}`}
      >
        5Point <span className="font-medium">Electric</span>
      </span>
    </span>
  );
}
