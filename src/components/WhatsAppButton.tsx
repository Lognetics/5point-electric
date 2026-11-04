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
      className="fixed right-5 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-leaf text-ink shadow-xl shadow-ink/30 transition-transform duration-300 hover:scale-105"
    >
      <MessageCircle size={24} aria-hidden="true" />
    </a>
  );
}
