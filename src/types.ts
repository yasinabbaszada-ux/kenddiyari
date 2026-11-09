export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string; // "kq", "litr", "ədəd", "banka" və s.
  category_id: string;
  image_url: string;
  in_stock: boolean;
  featured: boolean;
  created_at?: string;
}

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  address: string;
  instagram: string;
  email: string;
  about_text: string;
}
