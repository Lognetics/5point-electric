import { MessageCircle } from "lucide-react";
import { getSettings } from "@/lib/content";
import { whatsappHref } from "@/lib/site";

// Renders nothing until a WhatsApp number is set in the CMS, so visitors never see a dead link.
export function WhatsAppButton() {
  const s = getSettings();
  const href = whatsappHref(s.whatsappNumber, s.whatsappMessage);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed right-5 bottom-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#128C4B] px-5 font-semibold text-white shadow-lg shadow-navy/25 transition-colors hover:bg-[#0E7540]"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span className="hidden text-[0.9375rem] sm:inline">WhatsApp</span>
    </a>
  );
}
