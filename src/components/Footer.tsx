import Link from "next/link";
import { getSettings } from "@/lib/content";
import { NAV_LINKS, SOLUTIONS } from "@/lib/site";
import { Logo } from "./Logo";

const SOCIALS = [
  ["linkedin", "LinkedIn"],
  ["x", "X"],
  ["facebook", "Facebook"],
  ["instagram", "Instagram"],
] as const;

export function Footer() {
  const s = getSettings();
  const socials = SOCIALS.filter(([key]) => s.socials[key]);
  const heading = "mb-4 text-sm font-medium text-white/55";
  const link = "text-white/85 transition-colors hover:text-white";

  return (
    <footer className="bg-navy text-[0.9688rem] text-white">
      <div className="wrap py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.2fr_1.5fr]">
          <div>
            <Link href="/" aria-label="5Point Electric Technology home">
              <Logo tone="light" />
            </Link>
            <p className="mt-5 max-w-sm text-white/70">{s.description}</p>
            <p className="font-display mt-6 max-w-sm font-medium text-white">{s.brandMessage}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className={heading}>Quick links</h2>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quote" className={link}>
                  Get a Quote
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Our solutions</h2>
            <ul className="space-y-2.5">
              {SOLUTIONS.map((sol) => (
                <li key={sol.id}>
                  <Link href={`/solutions#${sol.id}`} className={link}>
                    {sol.cardTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>Contact</h2>
            <address className="not-italic text-white/85">{s.address}</address>
            <p className="mt-3 text-white">{s.locations.join(" | ")}</p>
            <ul className="mt-4 space-y-1.5">
              <li>
                {s.phone ? (
                  <a href={`tel:${s.phone.replace(/\s/g, "")}`} className={link}>
                    {s.phone}
                  </a>
                ) : (
                  <span className="text-white/50">Phone number to be confirmed</span>
                )}
              </li>
              <li>
                {s.email ? (
                  <a href={`mailto:${s.email}`} className={link}>
                    {s.email}
                  </a>
                ) : (
                  <span className="text-white/50">Email address to be confirmed</span>
                )}
              </li>
            </ul>
            <div className="mt-4">
              {socials.length ? (
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {socials.map(([key, label]) => (
                    <li key={key}>
                      <a href={s.socials[key]} target="_blank" rel="noopener noreferrer" className={link}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-white/50">Social media links to be added</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-7 text-sm text-white/55 md:flex-row md:items-start md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {s.companyName}. All rights reserved.
          </p>
          <p className="max-w-xl md:text-right">
            Photography is illustrative unless stated otherwise and does not depict 5Point projects.{" "}
            <Link href="/image-credits" className="underline underline-offset-2 hover:text-white">
              Image credits
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
