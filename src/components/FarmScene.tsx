// Ana səhifə hero fonu — zərif, yavaş hərəkətli kənd mənzərəsi.
// Yalnız dekorativdir (aria-hidden). Hərəkət CSS ilədir; reduced-motion-da dayanır.

export default function FarmScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="kdSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dff0f6" />
          <stop offset="55%" stopColor="#eef7ea" />
          <stop offset="100%" stopColor="#e4f2d8" />
        </linearGradient>
      </defs>

      {/* Göy */}
      <rect width="1200" height="520" fill="url(#kdSky)" />

      {/* Günəş + şüalar */}
      <g>
        <g className="anim-sun" stroke="#f3c33a" strokeWidth="6" strokeLinecap="round" opacity="0.55">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            const cx = 1040,
              cy = 110;
            return (
              <line
                key={i}
                x1={cx + Math.cos(a) * 58}
                y1={cy + Math.sin(a) * 58}
                x2={cx + Math.cos(a) * 80}
                y2={cy + Math.sin(a) * 80}
              />
            );
          })}
        </g>
        <circle cx="1040" cy="110" r="46" fill="#f6cf4e" />
      </g>

      {/* Buludlar */}
      <g className="anim-cloud-a" fill="#ffffff" opacity="0.92">
        <ellipse cx="240" cy="110" rx="46" ry="26" />
        <ellipse cx="285" cy="118" rx="38" ry="22" />
        <ellipse cx="195" cy="120" rx="34" ry="20" />
      </g>
      <g className="anim-cloud-b" fill="#ffffff" opacity="0.8">
        <ellipse cx="640" cy="80" rx="40" ry="22" />
        <ellipse cx="680" cy="88" rx="32" ry="18" />
        <ellipse cx="600" cy="90" rx="28" ry="16" />
      </g>

      {/* Uçan quşlar (dəstə) */}
      <g className="anim-flock" stroke="#3b4a41" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M0 60 q10 -9 20 0 q10 -9 20 0" />
        <path d="M46 78 q8 -7 16 0 q8 -7 16 0" />
        <path d="M24 96 q9 -8 18 0 q9 -8 18 0" />
      </g>

      {/* Təpələr */}
      <path d="M0 520 L0 360 Q300 300 620 350 Q900 390 1200 330 L1200 520 Z" fill="#bbdfc4" />
      <path d="M0 520 L0 430 Q320 385 650 430 Q950 468 1200 410 L1200 520 Z" fill="#8ec79e" />
      <path d="M0 520 L0 478 Q400 452 820 482 Q1050 500 1200 470 L1200 520 Z" fill="#5aa872" />

      {/* İnək (solda, otlayır) */}
      <g transform="translate(230 392)">
        <g fill="#3b4a41" stroke="none">
          <rect x="6" y="46" width="7" height="26" rx="3" />
          <rect x="24" y="46" width="7" height="26" rx="3" />
          <rect x="54" y="46" width="7" height="26" rx="3" />
          <rect x="72" y="46" width="7" height="26" rx="3" />
        </g>
        <ellipse cx="44" cy="34" rx="46" ry="28" fill="#f7f4ee" />
        <path d="M40 16 q18 -4 30 6 q-10 10 -26 6 q-10 -4 -4 -12 Z" fill="#c9b79a" opacity="0.7" />
        <ellipse cx="22" cy="44" rx="12" ry="9" fill="#cdb496" opacity="0.6" />
        {/* Baş (yavaş əyilir — otlayır) */}
        <g className="anim-cow-head">
          <ellipse cx="-6" cy="30" rx="18" ry="15" fill="#f7f4ee" />
          <ellipse cx="-16" cy="34" rx="9" ry="8" fill="#f0c9c9" />
          <path d="M-22 18 q-8 -6 -2 -12 q8 2 6 12 Z" fill="#f7f4ee" />
          <circle cx="-2" cy="24" r="2.4" fill="#3b4a41" />
          <circle cx="-20" cy="34" r="1.6" fill="#8a6d6d" />
        </g>
      </g>

      {/* Xoruz (sağda, kiçik təpədə) */}
      <g className="anim-rooster" transform="translate(905 404)">
        {/* Quyruq */}
        <path d="M44 6 Q74 -14 70 24 Q58 10 44 26 Z" fill="#246340" />
        <path d="M46 10 Q70 0 60 32 Q52 18 42 30 Z" fill="#f3c33a" opacity="0.9" />
        {/* Bədən */}
        <path d="M10 30 Q8 2 34 6 Q50 10 44 40 Q28 52 14 44 Q6 40 10 30 Z" fill="#2f7d4f" />
        {/* Ayaqlar */}
        <g stroke="#e8a317" strokeWidth="3" strokeLinecap="round">
          <line x1="24" y1="46" x2="24" y2="60" />
          <line x1="34" y1="46" x2="34" y2="60" />
        </g>
        {/* Baş */}
        <circle cx="16" cy="12" r="11" fill="#faf7f0" />
        {/* Pipik */}
        <g fill="#e05a4f">
          <circle cx="10" cy="2" r="3.2" />
          <circle cx="16" cy="-1" r="3.6" />
          <circle cx="22" cy="2" r="3.2" />
        </g>
        {/* Dimdik */}
        <path d="M6 11 L-3 14 L6 17 Z" fill="#e8a317" />
        {/* Sırğa */}
        <circle cx="7" cy="19" r="2.4" fill="#e05a4f" />
        {/* Göz */}
        <circle cx="18" cy="10" r="1.8" fill="#1e4f34" />
      </g>

      {/* Ördək (aşağıda gəzir) */}
      <g className="anim-duck" transform="translate(0 470)">
        <g>
          <path d="M14 -6 Q40 -14 44 6 Q46 20 20 22 Q2 22 4 8 Q6 -2 14 -6 Z" fill="#faf7f0" />
          <path d="M40 2 Q52 -14 58 -2 Q60 8 46 10 Q40 10 40 2 Z" fill="#faf7f0" />
          <path d="M57 0 L70 2 L57 8 Z" fill="#e8a317" />
          <circle cx="52" cy="-1" r="1.8" fill="#1e4f34" />
          <g stroke="#e8a317" strokeWidth="3" strokeLinecap="round">
            <line x1="20" y1="22" x2="20" y2="30" />
            <line x1="30" y1="22" x2="30" y2="30" />
          </g>
        </g>
      </g>

      {/* Otlar (öndə, yüngülcə yellənir) */}
      <g className="anim-grass" fill="#3f8f5c">
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 20 + i * 55;
          return (
            <path
              key={i}
              d={`M${x} 520 q-4 -22 2 -34 q6 14 2 34 q6 -18 10 -28 q0 20 -6 28 Z`}
              opacity="0.85"
            />
          );
        })}
      </g>
    </svg>
  );
}
