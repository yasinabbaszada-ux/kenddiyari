import { Phone, MessageCircle, MapPin, Instagram, Mail } from "lucide-react";
import { useSettings } from "../lib/SettingsContext";
import { BRAND } from "../config";
import { telLink, whatsappLink } from "../lib/format";

export default function Contact() {
  const s = useSettings();
  const waHref = whatsappLink(s.whatsapp, "Salam! Sizinlə əlaqə saxlamaq istəyirəm.");

  return (
    <div className="container-x py-6">
      <h1 className="text-2xl font-extrabold text-brand-800">Əlaqə</h1>
      <p className="mt-2 max-w-2xl text-brand-900/75">{s.about_text || BRAND.about}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a href={waHref} target="_blank" rel="noreferrer" className="card flex items-center gap-3 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
            <MessageCircle size={22} />
          </span>
          <div>
            <p className="text-sm text-brand-900/60">WhatsApp</p>
            <p className="font-bold text-brand-800">Mesaj yaz</p>
          </div>
        </a>

        <a href={telLink(s.phone)} className="card flex items-center gap-3 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <Phone size={22} />
          </span>
          <div>
            <p className="text-sm text-brand-900/60">Telefon</p>
            <p className="font-bold text-brand-800">{s.phone}</p>
          </div>
        </a>

        <div className="card flex items-center gap-3 p-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <MapPin size={22} />
          </span>
          <div>
            <p className="text-sm text-brand-900/60">Ünvan</p>
            <p className="font-bold text-brand-800">{s.address}</p>
          </div>
        </div>

        {s.instagram && (
          <a
            href={`https://instagram.com/${s.instagram.replace("@", "")}`}
            target="_blank"
            rel="noreferrer"
            className="card flex items-center gap-3 p-4"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
              <Instagram size={22} />
            </span>
            <div>
              <p className="text-sm text-brand-900/60">Instagram</p>
              <p className="font-bold text-brand-800">{s.instagram}</p>
            </div>
          </a>
        )}

        {s.email && (
          <a href={`mailto:${s.email}`} className="card flex items-center gap-3 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Mail size={22} />
            </span>
            <div>
              <p className="text-sm text-brand-900/60">E-poçt</p>
              <p className="font-bold text-brand-800">{s.email}</p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
