import { Loader2 } from "lucide-react";

export default function Spinner({ label = "Yüklənir..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-brand-600">
      <Loader2 className="animate-spin" size={32} />
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}
