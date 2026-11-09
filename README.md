# Kənd Diyarı 🌿

Kənd məhsulları (süd, qatıq, bal, yağ, kənd yumurtası, toyuq/ördək əti və s.) üçün
**vitrin saytı**. Müştərilər məhsullara baxır və **WhatsApp və ya zəng** ilə sifariş verir.
Məhsullar **admin paneldən** idarə olunur. Sayt sonradan **Play Market tətbiqinə** çevrilə bilər.

**Texnologiya:** Vite · React · TypeScript · Tailwind CSS · Supabase · PWA (+ Capacitor ilə Android).

---

## 1. Lokal işə salma

> Node.js tələb olunur (bu kompüterdə var: `C:\Program Files\nodejs`).
> Əgər `node` tapılmırsa, PowerShell-də PATH-ə əlavə edin:
> `$env:Path = "C:\Program Files\nodejs;" + $env:Path`

```bash
npm install
npm run dev
```

Brauzerdə açılır: **http://localhost:5173**

Supabase açarları olmadan sayt **demo rejimində** nümunə məhsullarla işləyir.

---

## 2. Supabase quraşdırılması (real məhsullar üçün)

1. [supabase.com](https://supabase.com) → pulsuz hesab aç → **New project** (kredit kartı lazım deyil).
2. **SQL Editor** → `supabase/schema.sql` faylının içindəkini yapışdır → **Run**.
   (Cədvəllər, RLS siyasətləri, kateqoriyalar və storage siyasətləri yaranır.)
3. **Storage** → **New bucket** → ad: `product-images`, **Public bucket: ON**.
4. **Authentication** → **Users** → **Add user** → özünüz üçün e-poçt + parol yaradın
   (bu, admin giriş hesabınızdır).
5. **Project Settings → API** bölməsindən `Project URL` və `anon public` açarını götürün.
6. `.env.local` faylını doldurun:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGci...
   ```
7. `npm run dev` yenidən işə salın. Artıq `/admin` ünvanından daxil olub məhsul əlavə edə bilərsiniz.

### Admin panel
- Ünvan: **`/admin`** (məs. http://localhost:5173/admin)
- Supabase-də yaratdığınız e-poçt/parol ilə daxil olun.
- Məhsul əlavə/redaktə/sil, şəkil yüklə, əlaqə məlumatlarını dəyiş.

---

## 3. Fərdiləşdirmə

- **Brend adı, şüar, əlaqə:** [src/config.ts](src/config.ts) (və ya admin paneldən parametrlər).
- **Rənglər / dizayn:** [tailwind.config.js](tailwind.config.js) — `brand`, `cream`, `honey` rəngləri.
- **Loqo / ikon:** [public/icon.svg](public/icon.svg) və [public/icons/](public/icons/) (PNG-ləri real loqo ilə əvəz edin).

---

## 4. Yayımlama (web)

```bash
npm run build      # dist/ qovluğu yaranır
npm run preview    # yerli yoxlama
```

`dist/` qovluğunu **Vercel**, **Netlify** və ya istənilən statik hostinqə yükləyin (pulsuz planlar mövcuddur).

---

## 5. Play Market tətbiqi (Capacitor)

Sayt hazır olandan sonra eyni kodu Android tətbiqinə çevirmək üçün:

```bash
# 1) Capacitor əlavə et
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli
npx cap init "Kənd Diyarı" az.kenddiyari.app --web-dir=dist

# 2) Web-i yığ və Android layihəsi əlavə et
npm run build
npx cap add android
npx cap sync

# 3) Android Studio-da aç
npx cap open android
```

Sonra **Android Studio**-da:
- İkon və splash ekranını təyin edin.
- **Build → Generate Signed Bundle / APK → Android App Bundle (.aab)** ilə imzalı `.aab` yaradın.
- [Google Play Console](https://play.google.com/console) (birdəfəlik $25 qeydiyyat haqqı) → yeni tətbiq → `.aab` yükləyin.

> Qeyd: `app_id` (az.kenddiyari.app) öz domen/brendinizə uyğun dəyişdirilə bilər.
> Hər kod dəyişikliyindən sonra `npm run build && npx cap sync` edin.

---

## Layihə strukturu

```
src/
  config.ts           # brend və default əlaqə
  types.ts            # TypeScript tipləri
  lib/                # supabase klient, api, format, parametrlər konteksti
  data/seed.ts        # demo məhsullar
  components/         # Navbar, Footer, ProductCard, və s.
  pages/              # Home, Products, ProductDetail, Contact, Admin
supabase/schema.sql   # baza sxemi + RLS + storage siyasətləri
public/               # ikonlar, manifest (PWA)
```
