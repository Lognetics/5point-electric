import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ApertureIntro } from "@/components/ApertureIntro";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

// Runs before first paint: marks JavaScript as available and opts in to the intro once per session.
const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(location.pathname==='/'&&!sessionStorage.getItem('5p-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro-on')}}catch(e){}})()`;

const DESCRIPTION =
  "5Point Electric Technology Limited provides EV charging infrastructure, solar-powered EV charging stations, AC and DC electrical cables, and industrial solar systems in Abuja, Lagos, and Port Harcourt, Nigeria.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EV Charging & Solar Energy Solutions in Nigeria | 5Point Electric Technology",
    template: "%s | 5Point Electric Technology",
  },
  description: DESCRIPTION,
  applicationName: "5Point Electric Technology",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "5Point Electric Technology",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0A1510" };

function organizationJsonLd() {
  const s = getSettings();
  const sameAs = Object.values(s.socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.companyName,
    url: SITE_URL,
    description: DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: "The SilverBird Entertainment Center, By Musa Yar'Adua Center, Central Business District",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    areaServed: s.locations.map((name) => ({ "@type": "City", name })),
    ...(s.phone && { telephone: s.phone }),
    ...(s.email && { email: s.email }),
    ...(sameAs.length && { sameAs }),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="btn btn-leaf fixed top-3 left-3 z-[60] !pr-6 -translate-y-24 focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <ApertureIntro />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
