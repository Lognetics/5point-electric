import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "leaf" | "ink" | "white" | "glass" | "outline";
  className?: string;
};

export function ArrowRoll() {
  return (
    <span className="btn-ic" aria-hidden="true">
      <ArrowUpRight size={18} />
      <ArrowUpRight size={18} />
    </span>
  );
}

export function Cta({ href, children, variant = "ink", className = "" }: Props) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      {children}
      <ArrowRoll />
    </Link>
  );
}
