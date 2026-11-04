export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/solutions", label: "Solutions" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOLUTIONS = [
  {
    id: "electric-mobility",
    imageKey: "electricVehicles",
    service: "Electric Vehicles",
    cardTitle: "Electric Vehicles",
    cardText:
      "Supporting the transition to electric mobility through innovative electric vehicle solutions and technologies that promote efficient, cleaner transportation.",
  },
  {
    id: "solar-ev-charging",
    imageKey: "solarCharging",
    service: "Solar-Powered EV Charging Stations",
    cardTitle: "Solar-Powered EV Charging Stations",
    cardText:
      "Developing sustainable EV charging infrastructure powered by solar energy, helping reduce dependence on conventional electricity sources while supporting the growth of electric mobility.",
  },
  {
    id: "cables",
    imageKey: "cables",
    service: "AC & DC Cables",
    cardTitle: "High-Grade AC & DC Cables",
    cardText:
      "Providing high-quality AC and DC electrical cables engineered to support reliable power transmission, electrical installations, and demanding energy applications.",
  },
  {
    id: "industrial-solar",
    imageKey: "industrialSolar",
    service: "Industrial Solar Systems",
    cardTitle: "Industrial-Grade Solar Systems",
    cardText:
      "Delivering robust solar energy systems designed for commercial, industrial, and institutional applications, providing dependable and efficient energy solutions.",
  },
] as const;

export function contactHref(service?: string) {
  return service ? `/contact?service=${encodeURIComponent(service)}#enquiry` : "/contact#enquiry";
}

export function whatsappHref(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function mapsDirectionsHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbedSrc(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}
