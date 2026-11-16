"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Phone, X } from "lucide-react";
import type { Promo } from "@/lib/content";
import { ArrowRoll } from "./Cta";
import { pauseScroll } from "./SmoothScroll";

const SEEN_KEY = "5p-promo";

const ended = (endsAt: string) => Date.now() >= Date.parse(endsAt);

/** "09113021010" -> "0911 302 1010" and "+2349113021010". */
export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const local = digits.startsWith("234") ? `0${digits.slice(3)}` : digits;
  return {
    display: local.length === 11 ? `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}` : phone,
    tel: `+234${local.replace(/^0/, "")}`,
  };
}

/** Removes its children the moment the promotion ends, even on a page built before then. */
export function PromoGate({ endsAt, children }: { endsAt: string; children: ReactNode }) {
  const [live, setLive] = useState(true);
  useEffect(() => {
    const left = Date.parse(endsAt) - Date.now();
    const timer = window.setTimeout(() => setLive(false), Math.max(0, Math.min(left, 2 ** 31 - 1)));
    return () => window.clearTimeout(timer);
  }, [endsAt]);
  return live ? children : null;
}

const UNITS = [
  { label: "Days", ms: 86_400_000 },
  { label: "Hours", ms: 3_600_000 },
  { label: "Mins", ms: 60_000 },
  { label: "Secs", ms: 1000 },
];

export function PromoCountdown({ endsAt, size = "lg" }: { endsAt: string; size?: "lg" | "sm" }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = Date.parse(endsAt);
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  let rest = left ?? 0;
  const parts = UNITS.map((u) => {
    const value = Math.floor(rest / u.ms);
    rest -= value * u.ms;
    return { label: u.label, value: left === null ? "--" : String(value).padStart(2, "0") };
  });

  return (
    <div role="timer" aria-label="Time left on the offer" className="flex gap-2">
      {parts.map((p) => (
        <div
          key={p.label}
          className={`flex flex-col items-center rounded-[10px] bg-white/[0.07] ring-1 ring-white/12 ${size === "lg" ? "min-w-[4.25rem] px-3 py-3" : "min-w-[3.4rem] px-2 py-2"}`}
        >
          <span className={`font-medium tabular-nums tracking-[-0.03em] ${size === "lg" ? "text-[1.6rem] leading-none" : "text-[1.15rem] leading-none"}`}>
            {p.value}
          </span>
          <span className="mt-1.5 text-[0.6rem] tracking-[0.12em] text-white/50 uppercase">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

export function PromoBadge({ children }: { children: ReactNode }) {
  return (
    <p className="label inline-flex items-center gap-2 rounded-full bg-promo px-3.5 py-1.5 text-white">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" aria-hidden="true" />
      {children}
    </p>
  );
}

export function PromoPhones({ phones, className = "" }: { phones: string[]; className?: string }) {
  if (!phones.length) return null;
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.775rem] text-white/65 ${className}`}>
      <Phone size={14} className="text-leaf" aria-hidden="true" />
      <span>Call or WhatsApp</span>
      {phones.map((phone, i) => {
        const { display, tel } = formatPhone(phone);
        return (
          <span key={phone}>
            {i > 0 && <span className="mr-2">or</span>}
            <a href={`tel:${tel}`} className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              {display}
            </a>
          </span>
        );
      })}
    </p>
  );
}

/** Opens once per visit, after the intro animation, until the promotion ends. */
export function PromoPopup({ promo }: { promo: Promo }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ended(promo.endsAt)) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {}

    const html = document.documentElement;
    let timer = 0;
    const open = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const el = dialog.current;
        if (!el || el.open || ended(promo.endsAt)) return;
        const active = document.activeElement;
        returnFocus.current = active instanceof HTMLElement && active !== document.body ? active : null;
        el.showModal();
        pauseScroll(true);
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
      }, 600);
    };

    if (!html.classList.contains("intro-on")) {
      open();
      return () => window.clearTimeout(timer);
    }
    // Wait for the logo intro to finish, with a fallback in case it never does.
    const observer = new MutationObserver(() => {
      if (!html.classList.contains("intro-on")) {
        observer.disconnect();
        open();
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    const fallback = window.setTimeout(() => {
      observer.disconnect();
      open();
    }, 4000);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      window.clearTimeout(timer);
    };
  }, [promo.endsAt]);

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      aria-labelledby="promo-popup-title"
      data-lenis-prevent=""
      onClose={() => {
        pauseScroll(false);
        // With nothing focused before it opened, the browser would hand focus to the skip link.
        if (returnFocus.current?.isConnected) returnFocus.current.focus({ preventScroll: true });
        else if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="promo-dialog m-auto max-h-[94svh] w-[min(92vw,44rem)] overflow-y-auto overscroll-contain rounded-[18px] bg-ink p-0 text-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close the promotion"
        className="absolute top-3 right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/60 text-white ring-1 ring-white/25 backdrop-blur-md transition-colors hover:bg-ink"
      >
        <X size={18} />
      </button>
      <Link href={promo.primary.href} onClick={close} className="block" tabIndex={-1}>
        <Image src={promo.image.src} alt={promo.image.alt} width={1280} height={720} sizes="(min-width: 768px) 44rem, 92vw" className="block h-auto w-full" />
      </Link>
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <PromoBadge>{promo.eyebrow}</PromoBadge>
          <span className="text-[0.7rem] text-white/55">Ends {promo.endsLabel}</span>
        </div>
        <h2 id="promo-popup-title" className="mt-4 text-[1.35rem] leading-[1.15] font-medium tracking-[-0.025em] sm:text-[1.6rem]">
          {promo.title}
        </h2>
        <div className="mt-5">
          <PromoCountdown endsAt={promo.endsAt} size="sm" />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={promo.primary.href} onClick={close} className="btn btn-leaf">
            {promo.primary.label}
            <ArrowRoll />
          </Link>
          {promo.secondary && (
            <Link href={promo.secondary.href} onClick={close} className="btn btn-glass">
              {promo.secondary.label}
              <ArrowRoll />
            </Link>
          )}
        </div>
        <PromoPhones phones={promo.phones} className="mt-5" />
      </div>
    </dialog>
  );
}
