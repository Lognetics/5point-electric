import type { Car } from "./content";

export const POWERTRAINS = [
  { id: "electric", label: "Fully Electric", blurb: "Battery electric vehicles that run on electricity alone." },
  { id: "hybrid", label: "Plug-In Hybrid", blurb: "Charge and drive on electric power, with a petrol engine for longer journeys." },
] as const;

export const BODY_TYPES = [
  { id: "suv", label: "SUV" },
  { id: "hatchback", label: "Hatchback" },
  { id: "shooting-brake", label: "Shooting Brake" },
  { id: "pickup", label: "Pickup" },
  { id: "sedan", label: "Sedan" },
] as const;

export const powertrainLabel = (id: Car["powertrain"]) => POWERTRAINS.find((p) => p.id === id)!.label;
export const bodyTypeLabel = (id: Car["bodyType"]) => BODY_TYPES.find((b) => b.id === id)!.label;

const naira = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

export function formatPrice(price: Car["price"]) {
  return price ? naira.format(price) : "Price on request";
}
