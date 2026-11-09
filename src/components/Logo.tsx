// "Kənd Diyarı" loqosu — xoruz maskotu ağ dairəvi nişan içində.
// Şəkil public/logo.png. Ağ fon dairəyə qarışır, qara kontur xoruzu çərçivələyir.

export default function Logo({
  size = 44,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-brand-100 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/logo.png"
        alt="Kənd Diyarı"
        width={size}
        height={size}
        className="h-[84%] w-[84%] object-contain"
      />
    </span>
  );
}
