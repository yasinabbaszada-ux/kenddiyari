import { NavLink } from "react-router-dom";
import { Home, ShoppingBasket, Phone } from "lucide-react";

const items = [
  { to: "/", label: "Ana səhifə", icon: Home, end: true },
  { to: "/mehsullar", label: "Məhsullar", icon: ShoppingBasket, end: false },
  { to: "/elaqe", label: "Əlaqə", icon: Phone, end: false },
];

// Mobil üçün tətbiq tərzi alt naviqasiya (telefonda görünür).
export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-cream-200 bg-white pb-safe sm:hidden">
      <div className="mx-auto flex max-w-md items-stretch">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-bold transition ${
                isActive ? "text-brand-600" : "text-brand-900/50"
              }`
            }
          >
            <Icon size={22} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
