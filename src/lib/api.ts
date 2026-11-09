import { supabase, isSupabaseConfigured, PRODUCT_IMAGES_BUCKET } from "./supabase";
import { DEFAULT_CONTACT, BRAND } from "../config";
import type { Category, Product, SiteSettings } from "../types";

// ---------- Oxuma (hamı üçün) ----------

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.warn("categories yüklənmədi:", error.message);
    return [];
  }
  return (data ?? []) as Category[];
}

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.warn("products yüklənmədi:", error.message);
    return [];
  }
  return (data ?? []) as Product[];
}

export async function getSettings(): Promise<SiteSettings> {
  const fallback: SiteSettings = {
    phone: DEFAULT_CONTACT.phone,
    whatsapp: DEFAULT_CONTACT.whatsapp,
    address: DEFAULT_CONTACT.address,
    instagram: DEFAULT_CONTACT.instagram,
    email: DEFAULT_CONTACT.email,
    about_text: BRAND.about,
  };
  if (!isSupabaseConfigured || !supabase) return fallback;
  const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
  if (error || !data) return fallback;
  return { ...fallback, ...data } as SiteSettings;
}

// ---------- Admin (giriş tələb olunur) ----------

export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error("Supabase qoşulmayıb.");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export type ProductInput = Omit<Product, "id" | "created_at">;

export async function createProduct(p: ProductInput) {
  if (!supabase) throw new Error("Supabase qoşulmayıb.");
  const { error } = await supabase.from("products").insert(p);
  if (error) throw error;
}

export async function updateProduct(id: string, p: Partial<ProductInput>) {
  if (!supabase) throw new Error("Supabase qoşulmayıb.");
  const { error } = await supabase.from("products").update(p).eq("id", id);
  if (error) throw error;
}

export async function deleteProduct(id: string) {
  if (!supabase) throw new Error("Supabase qoşulmayıb.");
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file: File): Promise<string> {
  if (!supabase) throw new Error("Supabase qoşulmayıb.");
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function saveSettings(s: SiteSettings) {
  if (!supabase) throw new Error("Supabase qoşulmayıb.");
  // Tək sətirli cədvəl: id=1 fiksə olunur.
  const { error } = await supabase.from("site_settings").upsert({ id: 1, ...s });
  if (error) throw error;
}
