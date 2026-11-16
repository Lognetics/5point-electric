"use client";

import Image from "@/components/Img";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  Building2,
  Cable,
  Car,
  ChevronDown,
  Factory,
  FileText,
  Fuel,
  Gem,
  Handshake,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sun,
  Target,
  X,
  Zap,
} from "lucide-react";
import type { MenuFeature, MenuSection } from "@/lib/menu";
import { ArrowRoll } from "./Cta";
import { Logo } from "./Logo";
import { pauseScroll } from "./SmoothScroll";

const ICONS: Record<string, typeof Car> = {
  building: Building2,
  target: Target,
  gem: Gem,
  handshake: Handshake,
  car: Car,
  sun: Sun,
  cable: Cable,
  factory: Factory,
  zap: Zap,
  battery: BatteryCharging,
  fuel: Fuel,
  message: MessageCircle,
  mail: Mail,
  file: FileText,
  pin: MapPin,
};

const OPEN_DELAY = 80;
const CLOSE_DELAY = 160;

export function Header({ menu }: { menu: MenuSection[] }) {
  const pathname = usePathname();
  const [mobileFor, setMobileFor] = useState<string | null>(null);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const headerRef = useRef<HTMLElement>(null);
  const mobileOpen = mobileFor === pathname;

  const closePanel = useCallback(() => {
    clearTimeout(timer.current);
    setOpenPanel(null);
  }, []);

  // Any navigation closes the menus.
  useEffect(() => {
    closePanel();
  }, [pathname, closePanel]);

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
    if (!openPanel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const button = document.getElementById(`menu-button-${openPanel}`);
      closePanel();
      button?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openPanel, closePanel]);

  useEffect(() => {
    if (!mobileOpen) return;
    pauseScroll(true);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileFor(null);
    window.addEventListener("keydown", onKey);
    return () => {
      pauseScroll(false);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const hoverOpen = (label: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenPanel(label), openPanel ? 0 : OPEN_DELAY);
  };
  const hoverClose = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenPanel(null), CLOSE_DELAY);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const active = menu.find((m) => m.label === openPanel);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      onPointerLeave={(e) => e.pointerType === "mouse" && hoverClose()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) closePanel();
      }}
    >
      {/* Dims the page while a dropdown is open */}
      <div
        aria-hidden="true"
        onClick={closePanel}
        onPointerEnter={(e) => e.pointerType === "mouse" && hoverClose()}
        className={`fixed inset-0 -z-10 bg-ink/45 backdrop-blur-[3px] transition-opacity duration-300 ${
          active ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`mx-auto mt-3 max-w-[1560px] px-3 transition-transform duration-500 ease-out-soft sm:px-5 ${
          hidden && !mobileOpen && !active ? "-translate-y-[130%]" : ""
        }`}
      >
        <div className="relative flex h-[66px] items-center justify-between gap-6 rounded-full border border-white/10 bg-ink/70 pr-2 pl-3 text-white backdrop-blur-xl">
          <Link href="/" aria-label="5Points Electric Technology home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden h-full items-center xl:flex">
            <ul className="flex items-center gap-0.5">
              {menu.map((item) =>
                item.links ? (
                  <li key={item.label} onPointerEnter={(e) => e.pointerType === "mouse" && hoverOpen(item.label)}>
                    <button
                      type="button"
                      id={`menu-button-${item.label}`}
                      aria-expanded={openPanel === item.label}
                      aria-controls="menu-panel"
                      onClick={() => setOpenPanel(openPanel === item.label ? null : item.label)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpenPanel(item.label);
                          setTimeout(() => document.querySelector<HTMLElement>("#menu-panel a")?.focus(), 30);
                        }
                      }}
                      className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.75rem] transition-colors hover:bg-white/10 hover:text-white ${
                        openPanel === item.label || isActive(item.href) ? "bg-white/10 text-white" : "text-white/80"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${openPanel === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                  </li>
                ) : (
                  <li key={item.label} onPointerEnter={(e) => e.pointerType === "mouse" && hoverClose()}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="rounded-full px-3.5 py-2 text-[0.75rem] text-white/80 transition-colors hover:bg-white/10 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <Link href="/quote" className="btn btn-leaf hidden !min-h-[3.125rem] sm:inline-flex">
              Get a Quote
              <ArrowRoll />
            </Link>
            <button
              type="button"
              className="grid h-[3.125rem] w-[3.125rem] place-items-center rounded-full bg-white/10 xl:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileFor(mobileOpen ? null : pathname)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Desktop dropdown */}
        {active?.links && (
          <div
            id="menu-panel"
            role="region"
            aria-label={`${active.label} menu`}
            onPointerEnter={(e) => e.pointerType === "mouse" && clearTimeout(timer.current)}
            className="absolute inset-x-3 top-[calc(100%+0.5rem)] hidden sm:inset-x-5 xl:block"
          >
            <div key={active.label} className="menu-in mx-auto max-w-[1520px] overflow-hidden rounded-[24px] border border-white/10 bg-ink/95 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl">
              <div className="grid grid-cols-12 gap-8 p-8">
                <div className="col-span-3 flex flex-col justify-between gap-6 border-r border-white/10 pr-8">
                  <div>
                    <p className="label text-leaf">{active.label}</p>
                    <p className="mt-4 text-[1.2rem] leading-snug tracking-[-0.02em] text-white/90">{active.intro}</p>
                  </div>
                  <Link href={active.href} onClick={closePanel} className="link-arrow self-start text-leaf">
                    {active.overview} <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>

                <ul className={`col-span-6 grid content-start gap-1 ${active.links.length > 4 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {active.links.map((link) => {
                    const Icon = link.icon ? ICONS[link.icon] : null;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closePanel}
                          className="group flex items-center gap-3.5 rounded-[14px] p-3 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
                        >
                          {Icon ? (
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-white/[0.06] text-leaf transition-colors group-hover:bg-leaf group-hover:text-ink">
                              <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                            </span>
                          ) : (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-leaf/60 transition-colors group-hover:bg-leaf" aria-hidden="true" />
                          )}
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.85rem] text-white">{link.label}</span>
                            {link.text && <span className="mt-0.5 block text-[0.7rem] text-white/50">{link.text}</span>}
                          </span>
                          <ArrowUpRight
                            size={15}
                            aria-hidden="true"
                            className="shrink-0 text-white/0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-leaf"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="col-span-3">{active.feature && <Feature feature={active.feature} onNavigate={closePanel} />}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {mobileOpen && <MobileMenu menu={menu} isActive={isActive} onNavigate={() => setMobileFor(null)} />}
    </header>
  );
}

function Feature({ feature, onNavigate }: { feature: MenuFeature; onNavigate: () => void }) {
  if (feature.kind === "image") {
    return (
      <Link href={feature.href} onClick={onNavigate} className="group relative block aspect-[4/3.4] overflow-hidden rounded-[16px] bg-moss">
        <Image src={feature.src} alt={feature.alt} fill sizes="22vw" className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(10_21_16/0.9),transparent_60%)]" />
        {feature.demo && <span className="demo-tag absolute top-3 left-3">Demonstration image</span>}
        <p className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-[0.85rem] leading-snug">
          {feature.title}
          <ArrowUpRight size={16} className="shrink-0 text-leaf" aria-hidden="true" />
        </p>
      </Link>
    );
  }
  if (feature.kind === "cars") {
    return (
      <div>
        <p className="label mb-3 text-white/45">Featured cars</p>
        <ul className="space-y-2">
          {feature.cars.map((car) => (
            <li key={car.href}>
              <Link href={car.href} onClick={onNavigate} className="group flex items-center gap-3.5 rounded-[14px] p-2 transition-colors hover:bg-white/[0.06]">
                <span className="relative h-[4.6rem] w-[3.7rem] shrink-0 overflow-hidden rounded-[10px] bg-moss">
                  <Image src={car.src} alt="" fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.85rem]">{car.title}</span>
                  <span className="block text-[0.65rem] text-white/50">{car.headline}</span>
                  <span className="mt-1 block text-[0.75rem] text-leaf">{car.price}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const row = "flex gap-3 text-[0.75rem] text-white/75";
  return (
    <div className="rounded-[16px] bg-white/[0.04] p-5">
      <p className="label mb-4 text-white/45">Head office</p>
      <ul className="space-y-3.5">
        <li className={row}>
          <MapPin size={16} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
          {feature.address}
        </li>
        <li className={row}>
          <Phone size={16} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
          {feature.phone ? <a href={`tel:${feature.phone.replace(/\s/g, "")}`} className="hover:text-white">{feature.phone}</a> : "Phone number to be confirmed"}
        </li>
        <li className={row}>
          <Mail size={16} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
          {feature.email ? <a href={`mailto:${feature.email}`} className="hover:text-white">{feature.email}</a> : "Email address to be confirmed"}
        </li>
      </ul>
    </div>
  );
}

function MobileMenu({ menu, isActive, onNavigate }: { menu: MenuSection[]; isActive: (href: string) => boolean; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const row = "flex w-full items-center justify-between py-4 text-left text-[1.6rem] leading-tight font-medium tracking-[-0.035em]";

  return (
    <nav id="mobile-menu" aria-label="Mobile" data-lenis-prevent="" className="page-enter fixed inset-0 -z-10 overflow-y-auto bg-ink pt-24 pb-10 text-white xl:hidden">
      <ul className="wrap">
        {menu.map((item, i) => (
          <li key={item.label} className="border-b border-white/10">
            {item.links ? (
              <>
                <button
                  type="button"
                  aria-expanded={expanded === item.label}
                  aria-controls={`mobile-sub-${i}`}
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  className={`${row} ${isActive(item.href) ? "text-leaf" : ""}`}
                >
                  {item.label}
                  <span className={`grid h-9 w-9 place-items-center rounded-full bg-white/[0.07] transition-transform duration-300 ${expanded === item.label ? "rotate-180" : ""}`}>
                    <ChevronDown size={18} aria-hidden="true" />
                  </span>
                </button>
                <Collapse open={expanded === item.label} id={`mobile-sub-${i}`}>
                  <ul className="space-y-0.5 pb-5">
                    <li>
                      <Link href={item.href} onClick={onNavigate} className="flex items-center justify-between rounded-[12px] px-3 py-2.5 text-[0.85rem] text-leaf">
                        {item.overview}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </li>
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} onClick={onNavigate} className="block rounded-[12px] px-3 py-2.5 text-[0.85rem] text-white/80 active:bg-white/[0.06]">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </>
            ) : (
              <Link href={item.href} onClick={onNavigate} aria-current={isActive(item.href) ? "page" : undefined} className={`${row} aria-[current=page]:text-leaf`}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
        <li className="pt-7">
          <Link href="/quote" onClick={onNavigate} className="btn btn-leaf w-full">
            Get a Quote
            <ArrowRoll />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

/** Height-animated disclosure that stays out of the tab order while closed. */
function Collapse({ open, id, children }: { open: boolean; id: string; children: ReactNode }) {
  return (
    <div id={id} inert={!open} className={`grid transition-[grid-template-rows] duration-400 ease-out-soft ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
