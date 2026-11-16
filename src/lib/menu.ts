import { getCars, getImages, getSettings } from "./content";
import { formatPrice } from "./cars";
import { PRODUCT_CATEGORIES, PROJECT_CATEGORIES } from "./taxonomy";

export type MenuLink = { label: string; href: string; text?: string; icon?: string };
export type MenuFeature =
  | { kind: "image"; src: string; alt: string; title: string; href: string; demo: boolean }
  | { kind: "cars"; cars: { title: string; href: string; src: string; price: string; headline: string }[] }
  | { kind: "contact"; address: string; phone: string; email: string; whatsapp: string };
export type MenuSection = {
  label: string;
  href: string;
  intro?: string;
  overview?: string;
  links?: MenuLink[];
  feature?: MenuFeature;
};

/** The site menu, built on the server so it can include live car prices and CMS images. */
export function getMenu(): MenuSection[] {
  const img = getImages();
  const s = getSettings();
  const cars = getCars();
  const feature = (key: string, title: string, href: string): MenuFeature => {
    const i = img(key);
    return { kind: "image", src: i.src, alt: i.alt, title, href, demo: i.demo !== false };
  };

  return [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      intro: "An electric mobility and clean energy technology company serving Abuja, Lagos, and Port Harcourt.",
      overview: "About 5Points",
      links: [
        { label: "Who We Are", href: "/about#who-we-are", text: "Our company and what we do", icon: "building" },
        { label: "Vision & Mission", href: "/about#vision-mission", text: "Where we are heading and why", icon: "target" },
        { label: "Core Values", href: "/about#values", text: "The principles behind our work", icon: "gem" },
        { label: "Our Commitment", href: "/about#commitment", text: "Dependable energy infrastructure", icon: "handshake" },
      ],
      feature: feature("about", "Engineering a cleaner energy future", "/about"),
    },
    {
      label: "Solutions",
      href: "/solutions",
      intro: "Four connected business areas, from generating clean power to charging the vehicles that use it.",
      overview: "All solutions",
      links: [
        { label: "Electric Vehicles", href: "/solutions#electric-mobility", text: "Electric mobility solutions", icon: "car" },
        { label: "Solar EV Charging", href: "/solutions#solar-ev-charging", text: "Solar-powered charging stations", icon: "sun" },
        { label: "AC & DC Cables", href: "/solutions#cables", text: "High-grade power cables", icon: "cable" },
        { label: "Industrial Solar", href: "/solutions#industrial-solar", text: "Commercial and industrial systems", icon: "factory" },
        { label: "How Solar Charging Works", href: "/solutions#how-it-works", text: "From sunlight to a charged car", icon: "zap" },
      ],
      feature: feature("sustainability", "Accelerating the transition to sustainable energy", "/solutions"),
    },
    {
      label: "Shop Cars",
      href: "/cars",
      intro: "Fully electric and plug-in hybrid cars, ready for pickup and delivery nationwide.",
      overview: `Shop all ${cars.length} cars`,
      links: [
        { label: "Fully Electric", href: "/cars?type=electric", text: `${cars.filter((c) => c.powertrain === "electric").length} cars that run on electricity alone`, icon: "battery" },
        { label: "Plug-In Hybrid", href: "/cars?type=hybrid", text: `${cars.filter((c) => c.powertrain === "hybrid").length} cars with electric and petrol power`, icon: "fuel" },
        { label: "Enquire About a Car", href: "/contact?service=Electric%20Vehicles#enquiry", text: "Ask about price and availability", icon: "message" },
      ],
      feature: {
        kind: "cars",
        cars: cars
          .filter((c) => c.featured)
          .slice(0, 2)
          .map((c) => ({ title: c.title, href: `/cars/${c.slug}`, src: c.images[0].src, price: formatPrice(c.price), headline: c.headline })),
      },
    },
    {
      label: "Products",
      href: "/products",
      intro: "Equipment for electric mobility and clean energy, by category.",
      overview: "All products",
      links: PRODUCT_CATEGORIES.map((c) => ({ label: c.label, href: c.id === "electric-vehicles" ? "/cars" : `/products#${c.id}` })),
      feature: feature("industrialSolar", "Industrial-grade solar systems", "/products#solar-panels"),
    },
    {
      label: "Projects",
      href: "/projects",
      intro: "Our portfolio across charging, solar, industrial energy, and electrical infrastructure.",
      overview: "All projects",
      links: PROJECT_CATEGORIES.map((c) => ({ label: c.label, href: `/projects?category=${c.id}` })),
      feature: feature("showcaseSolar", "Infrastructure for a cleaner energy future", "/projects"),
    },
    {
      label: "Contact",
      href: "/contact",
      intro: "Tell us about your project, and we'll help you find the right solution.",
      overview: "Contact us",
      links: [
        { label: "Send an Enquiry", href: "/contact#enquiry", text: "We'll get back to you", icon: "mail" },
        { label: "Get a Quote", href: "/quote", text: "Request a quote or consultation", icon: "file" },
        { label: "Our Abuja Office", href: "/contact#office", text: "Find us on the map", icon: "pin" },
      ],
      feature: { kind: "contact", address: s.address, phone: s.phone, email: s.email, whatsapp: s.whatsappNumber },
    },
  ];
}
