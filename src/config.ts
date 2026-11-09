// Brend və default əlaqə məlumatları.
// Supabase-dəki `site_settings` cədvəli varsa, oradakı dəyərlər bunları əvəz edir.
// Supabase qoşulmayıbsa, saytda bu dəyərlər istifadə olunur.

export const BRAND = {
  name: "Kənd Diyarı",
  tagline: "Təbii və təzə kənd məhsulları",
  about:
    "Biz kənddən birbaşa süfrənizə təbii məhsullar çatdırırıq — süd, qatıq, bal, " +
    "yağ, kənd yumurtası, toyuq və ördək əti. Konservant yoxdur, sadəcə təmiz kənd dadı.",
};

// Telefon nömrəsini öz nömrənizlə əvəz edin.
// phone: "tel:" üçün (+ işarəli), whatsapp: yalnız rəqəmlər (ölkə kodu ilə, + və 0 olmadan).
export const DEFAULT_CONTACT = {
  phone: "+994500000000",
  whatsapp: "994500000000",
  address: "Bakı, Azərbaycan",
  instagram: "",
  email: "",
};

export const CURRENCY = "₼"; // Azərbaycan manatı
