import Link from "next/link";
import { getSettings } from "@/lib/content";
import { NAV_LINKS, SOLUTIONS } from "@/lib/site";
import { LogoMark } from "./Logo";

const SOCIALS = [
  ["linkedin", "LinkedIn"],
  ["x", "X"],
  ["facebook", "Facebook"],
  ["instagram", "Instagram"],
] as const;

export function Footer() {
  const s = getSettings();
  const socials = SOCIALS.filter(([key]) => s.socials[key]);
  const heading = "label mb-5 text-white/45";
  const link = "text-white/85 transition-colors hover:text-leaf";

  return (
    <footer className="overflow-hidden bg-ink text-[0.775rem] text-white">
      <div className="wrap pt-20 lg:pt-28">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_1.2fr_1.5fr]">
          <div>
            <Link href="/" aria-label="5Point Electric Technology home" className="inline-block">
              <LogoMark className="h-14 w-14" />
            </Link>
            <p className="mt-6 max-w-sm text-white/65">{s.description}</p>
            <p className="mt-6 max-w-xs text-lg leading-snug tracking-[-0.015em] text-white">{s.brandMessage}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className={heading}>Explore</h2>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/quote" className={link}>Get a Quote</Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Our solutions</h2>
            <ul className="space-y-2.5">
              {SOLUTIONS.map((sol) => (
                <li key={sol.id}>
                  <Link href={`/solutions#${sol.id}`} className={link}>{sol.cardTitle}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={heading}>Contact</h2>
            <address className="text-white/85 not-italic">{s.address}</address>
            <p className="mt-3 text-white">{s.locations.join(" | ")}</p>
            <ul className="mt-4 space-y-1.5">
              <li>
                {s.phone ? (
                  <a href={`tel:${s.phone.replace(/\s/g, "")}`} className={link}>{s.phone}</a>
                ) : (
                  <span className="text-white/45">Phone number to be confirmed</span>
                )}
              </li>
              <li>
                {s.email ? (
                  <a href={`mailto:${s.email}`} className={link}>{s.email}</a>
                ) : (
                  <span className="text-white/45">Email address to be confirmed</span>
                )}
              </li>
            </ul>
            <div className="mt-4">
              {socials.length ? (
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {socials.map(([key, label]) => (
                    <li key={key}>
                      <a href={s.socials[key]} target="_blank" rel="noopener noreferrer" className={link}>{label}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-white/45">Social media links to be added</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/12 pt-6 text-sm text-white/50 md:flex-row md:items-start md:justify-between">
          <p>&copy; {new Date().getFullYear()} {s.companyName}. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            Photography is illustrative unless stated otherwise and does not depict 5Point projects.{" "}
            <Link href="/image-credits" className="underline underline-offset-2 hover:text-white">Image credits</Link>
          </p>
        </div>
      </div>

      <p aria-hidden="true" className="mt-10 text-center text-[11.68vw] leading-[0.76] font-medium tracking-[-0.06em] whitespace-nowrap text-white/[0.07] select-none">
        5Point Electric
      </p>
    </footer>
  );
}
