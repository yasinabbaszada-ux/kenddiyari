-- ============================================================
--  Kənd Diyarı — Supabase sxemi
--  Supabase panelində: SQL Editor > New query > bu faylı yapışdır > Run
-- ============================================================

-- 1) KATEQORIYALAR -------------------------------------------
create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  sort_order int not null default 0
);

-- 2) MƏHSULLAR -----------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text default '',
  price numeric not null default 0,
  unit text not null default 'kq',
  category_id text references public.categories(id) on delete set null,
  image_url text default '',
  in_stock boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- 3) SAYT PARAMETRLƏRI (tək sətir) ---------------------------
create table if not exists public.site_settings (
  id int primary key default 1,
  phone text default '',
  whatsapp text default '',
  address text default '',
  instagram text default '',
  email text default '',
  about_text text default '',
  constraint single_row check (id = 1)
);

-- ============================================================
--  RLS (Row Level Security)
--  Oxumaq: hamıya açıq. Yazmaq/silmək: yalnız daxil olmuş admin.
-- ============================================================
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.site_settings enable row level security;

-- Oxuma (public)
drop policy if exists "read categories" on public.categories;
create policy "read categories" on public.categories for select using (true);

drop policy if exists "read products" on public.products;
create policy "read products" on public.products for select using (true);

drop policy if exists "read settings" on public.site_settings;
create policy "read settings" on public.site_settings for select using (true);

-- Yazma (yalnız authenticated = admin)
drop policy if exists "write categories" on public.categories;
create policy "write categories" on public.categories for all
  to authenticated using (true) with check (true);

drop policy if exists "write products" on public.products;
create policy "write products" on public.products for all
  to authenticated using (true) with check (true);

drop policy if exists "write settings" on public.site_settings;
create policy "write settings" on public.site_settings for all
  to authenticated using (true) with check (true);

-- ============================================================
--  BAŞLANĞIC MƏLUMATLAR
-- ============================================================
insert into public.categories (id, name, slug, sort_order) values
  ('sud', 'Süd məhsulları', 'sud', 1),
  ('bal', 'Bal və mürəbbə', 'bal', 2),
  ('yumurta', 'Kənd yumurtası', 'yumurta', 3),
  ('et', 'Ət və quş', 'et', 4)
on conflict (id) do nothing;

insert into public.site_settings (id, phone, whatsapp, address, about_text) values
  (1, '+994500000000', '994500000000', 'Bakı, Azərbaycan',
   'Kənddən birbaşa süfrənizə təbii məhsullar çatdırırıq.')
on conflict (id) do nothing;

-- ============================================================
--  STORAGE (şəkillər üçün)
--  Qeyd: 'product-images' bucket-ını Supabase panelindən
--  Storage > New bucket > ad: product-images, Public: ON ilə yaradın.
--  Aşağıdakı siyasətlər yükləməyə icazə verir.
-- ============================================================
-- Public oxuma
drop policy if exists "public read images" on storage.objects;
create policy "public read images" on storage.objects for select
  using (bucket_id = 'product-images');

-- Authenticated yükləmə/silmə
drop policy if exists "admin upload images" on storage.objects;
create policy "admin upload images" on storage.objects for insert
  to authenticated with check (bucket_id = 'product-images');

drop policy if exists "admin delete images" on storage.objects;
create policy "admin delete images" on storage.objects for delete
  to authenticated using (bucket_id = 'product-images');
