"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  // The menu is tied to the page it was opened on, so navigating closes it.
  const open = menuFor === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuFor(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-white" : "border-b border-white/15 bg-transparent"
      }`}
    >
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="5Point Electric Technology home" className="shrink-0">
          <Logo tone={solid ? "dark" : "light"} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative py-1 text-[0.9375rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 ${
                solid ? "text-charcoal hover:text-navy" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/quote" className="btn btn-sm btn-primary hidden sm:inline-flex">
            Get a Quote
          </Link>
          <button
            type="button"
            className={`-mr-2 grid h-11 w-11 place-items-center lg:hidden ${solid ? "text-navy" : "text-white"}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setMenuFor(open ? null : pathname)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="page-enter h-[calc(100dvh-77px)] overflow-y-auto bg-white lg:hidden"
        >
          <ul className="wrap py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setMenuFor(null)}
                  className="font-display block py-4 text-2xl font-semibold tracking-tight text-navy aria-[current=page]:text-blue-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link href="/quote" onClick={() => setMenuFor(null)} className="btn btn-primary w-full">
                Get a Quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
