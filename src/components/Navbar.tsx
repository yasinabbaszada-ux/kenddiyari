import { Link, NavLink } from "react-router-dom";
import { BRAND } from "../config";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream-50/90 backdrop-blur pt-safe">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={40} />
          <span className="text-lg font-extrabold text-brand-700">{BRAND.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {[
            { to: "/", label: "Ana səhifə", end: true },
            { to: "/mehsullar", label: "Məhsullar" },
            { to: "/elaqe", label: "Əlaqə" },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 font-bold transition ${
                  isActive ? "bg-brand-100 text-brand-700" : "text-brand-800 hover:bg-brand-50"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
