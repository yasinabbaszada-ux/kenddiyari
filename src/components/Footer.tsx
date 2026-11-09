import { Link } from "react-router-dom";
import { Phone, MapPin, Instagram } from "lucide-react";
import { BRAND } from "../config";
import Logo from "./Logo";
import { useSettings } from "../lib/SettingsContext";
import { telLink } from "../lib/format";

export default function Footer() {
  const s = useSettings();
  return (
    <footer className="mt-12 border-t border-cream-200 bg-brand-700 text-cream-50">
      <div className="container-x grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <Logo size={36} />
            <span className="text-lg font-extrabold">{BRAND.name}</span>
          </div>
          <p className="mt-3 text-sm text-cream-100/90">{BRAND.tagline}</p>
        </div>

        <div>
          <h3 className="font-bold">Keçidlər</h3>
          <ul className="mt-3 space-y-2 text-sm text-cream-100/90">
            <li><Link to="/" className="hover:underline">Ana səhifə</Link></li>
            <li><Link to="/mehsullar" className="hover:underline">Məhsullar</Link></li>
            <li><Link to="/elaqe" className="hover:underline">Əlaqə</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">Əlaqə</h3>
          <ul className="mt-3 space-y-2 text-sm text-cream-100/90">
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a href={telLink(s.phone)} className="hover:underline">{s.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> {s.address}
            </li>
            {s.instagram && (
              <li className="flex items-center gap-2">
                <Instagram size={16} />
                <a
                  href={`https://instagram.com/${s.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {s.instagram}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-600 py-4 text-center text-xs text-cream-100/70">
        © {new Date().getFullYear()} {BRAND.name}. Bütün hüquqlar qorunur.
      </div>
    </footer>
  );
}
