import { z } from "zod";
import { SERVICES } from "./taxonomy";

const text = (max: number) => z.string().trim().max(max);

export const enquirySchema = z.object({
  type: z.enum(["contact", "quote", "product"]),
  fullName: text(120).min(2, "Please enter your full name."),
  company: text(160).default(""),
  email: z.string().trim().max(200).pipe(z.email("Please enter a valid email address.")),
  phone: text(40)
    .refine((v) => /^\+?[\d\s()-]{7,}$/.test(v), "Please enter a valid phone number."),
  service: z.enum(SERVICES, { error: "Please choose a service." }),
  location: text(160).default(""),
  message: text(5000).min(10, "Please tell us a little more about your enquiry."),
  product: text(200).default(""),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export const TYPE_LABELS: Record<Enquiry["type"], string> = {
  contact: "General enquiry",
  quote: "Quotation request",
  product: "Product information request",
};
