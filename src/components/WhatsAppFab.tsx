import { MessageCircle } from "lucide-react";
import { useSettings } from "../lib/SettingsContext";
import { whatsappLink } from "../lib/format";

// Hər səhifədə görünən üzən WhatsApp düyməsi.
export default function WhatsAppFab() {
  const s = useSettings();
  const href = whatsappLink(s.whatsapp, "Salam! Məhsullarınız haqqında məlumat almaq istəyirəm.");
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp ilə yaz"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:brightness-95 active:scale-95 sm:bottom-6"
    >
      <MessageCircle size={28} />
    </a>
  );
}
