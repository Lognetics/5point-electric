// Keep these lists in sync with the select options in public/admin/config.yml.
export const PRODUCT_CATEGORIES = [
  { id: "electric-vehicles", label: "Electric Vehicles", service: "Electric Vehicles", blurb: "Electric vehicle options for cleaner personal, corporate, and institutional transportation." },
  { id: "ev-charging-equipment", label: "EV Charging Equipment", service: "Solar-Powered EV Charging Stations", blurb: "Charging hardware for commercial sites, fleets, and solar-powered charging stations." },
  { id: "ac-cables", label: "AC Electrical Cables", service: "AC & DC Cables", blurb: "AC cables for electrical installations and power distribution." },
  { id: "dc-cables", label: "DC Electrical Cables", service: "AC & DC Cables", blurb: "DC cables for solar arrays, charging systems, and demanding energy applications." },
  { id: "solar-panels", label: "Solar Panels", service: "Industrial Solar Systems", blurb: "Solar modules for commercial, industrial, and institutional systems." },
  { id: "solar-inverters", label: "Solar Inverters", service: "Industrial Solar Systems", blurb: "Inverters that convert solar generation into usable power." },
  { id: "battery-storage", label: "Battery Energy Storage Systems", service: "Industrial Solar Systems", blurb: "Storage that holds solar energy for use when it is needed." },
  { id: "industrial-solar-components", label: "Industrial Solar Components", service: "Industrial Solar Systems", blurb: "Supporting components for complete industrial solar installations." },
] as const;

export const PROJECT_CATEGORIES = [
  { id: "ev-charging", label: "EV Charging Infrastructure" },
  { id: "solar-installations", label: "Solar Energy Installations" },
  { id: "industrial-energy", label: "Industrial Energy Systems" },
  { id: "electrical-infrastructure", label: "Electrical Infrastructure" },
] as const;

export const SERVICES = [
  "Electric Vehicles",
  "Solar-Powered EV Charging Stations",
  "AC & DC Cables",
  "Industrial Solar Systems",
  "Other Enquiries",
] as const;

export type ProductCategoryId = (typeof PRODUCT_CATEGORIES)[number]["id"];
export type ProjectCategoryId = (typeof PROJECT_CATEGORIES)[number]["id"];

export const productCategory = (id: string) => PRODUCT_CATEGORIES.find((c) => c.id === id);
export const projectCategory = (id: string) => PROJECT_CATEGORIES.find((c) => c.id === id);
