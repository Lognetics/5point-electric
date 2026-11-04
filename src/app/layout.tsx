import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

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

export const viewport: Viewport = { themeColor: "#101D2C" };

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
    <html lang="en-NG" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="btn btn-primary fixed top-3 left-3 z-[60] -translate-y-24 focus:translate-y-0"
        >
          Skip to content
        </a>
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
