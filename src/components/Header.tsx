"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { ArrowRoll } from "./Cta";
import { Logo } from "./Logo";
import { pauseScroll } from "./SmoothScroll";

export function Header() {
  const pathname = usePathname();
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const open = menuFor === pathname;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) < 6) return;
      setHidden(y > lastY.current && y > 160);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    pauseScroll(true);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuFor(null);
    window.addEventListener("keydown", onKey);
    return () => {
      pauseScroll(false);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto mt-3 max-w-[1560px] px-3 transition-transform duration-500 ease-out-soft sm:px-5 ${
          hidden && !open ? "-translate-y-[130%]" : ""
        }`}
      >
        <div className="flex h-[66px] items-center justify-between gap-6 rounded-full border border-white/10 bg-ink/65 pr-2 pl-3 text-white backdrop-blur-xl">
          <Link href="/" aria-label="5Point Electric Technology home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="rounded-full px-4 py-2 text-[0.75rem] text-white/80 transition-colors hover:bg-white/10 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link href="/quote" className="btn btn-leaf hidden !min-h-[3.125rem] sm:inline-flex">
              Get a Quote
              <ArrowRoll />
            </Link>
            <button
              type="button"
              className="grid h-[3.125rem] w-[3.125rem] place-items-center rounded-full bg-white/10 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setMenuFor(open ? null : pathname)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          data-lenis-prevent=""
          className="page-enter fixed inset-0 -z-10 overflow-y-auto bg-ink pt-28 text-white lg:hidden"
        >
          <ul className="wrap">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="border-b border-white/12">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setMenuFor(null)}
                  className="flex items-baseline justify-between py-4 text-[1.8rem] leading-tight font-medium tracking-[-0.035em] aria-[current=page]:text-leaf"
                >
                  {link.label}
                  <span className="label text-white/45">0{i + 1}</span>
                </Link>
              </li>
            ))}
            <li className="py-7">
              <Link href="/quote" onClick={() => setMenuFor(null)} className="btn btn-leaf w-full">
                Get a Quote
                <ArrowRoll />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
