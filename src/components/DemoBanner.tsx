import { Info } from "lucide-react";
import { isSupabaseConfigured } from "../lib/supabase";

// Supabase qoşulmayıbsa, saytın demo rejimində olduğunu bildirir.
export default function DemoBanner() {
  if (isSupabaseConfigured) return null;
  return (
    <div className="container-x mt-4">
      <div className="flex items-start gap-2 rounded-xl border border-honey-400/40 bg-honey-400/10 px-4 py-3 text-sm text-brand-800">
        <Info size={18} className="mt-0.5 shrink-0 text-honey-500" />
        <span>
          <b>Demo rejimi:</b> Supabase hələ qoşulmayıb, nümunə məhsullar göstərilir.
          Real məhsullar üçün <code>.env.local</code> faylına Supabase açarlarını əlavə edin.
        </span>
      </div>
    </div>
  );
}
