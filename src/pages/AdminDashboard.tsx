import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Upload, Star, Package } from "lucide-react";
import {
  getProducts,
  getCategories,
  getSettings,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  saveSettings,
  type ProductInput,
} from "../lib/api";
import type { Product, Category, SiteSettings } from "../types";
import { formatPrice } from "../lib/format";
import Spinner from "../components/Spinner";

type Tab = "products" | "settings";

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("products");

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-4 flex gap-2">
        <TabBtn active={tab === "products"} onClick={() => setTab("products")}>
          <Package size={18} /> Məhsullar
        </TabBtn>
        <TabBtn active={tab === "settings"} onClick={() => setTab("settings")}>
          Parametrlər
        </TabBtn>
      </div>
      {tab === "products" ? <ProductsManager /> : <SettingsManager />}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-bold transition ${
        active ? "bg-brand-500 text-white" : "bg-white text-brand-700"
      }`}
    >
      {children}
    </button>
  );
}

const emptyForm: ProductInput = {
  name: "",
  description: "",
  price: 0,
  unit: "kq",
  category_id: "",
  image_url: "",
  in_stock: true,
  featured: false,
};

function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    const [p, c] = await Promise.all([getProducts(), getCategories()]);
    setProducts(p);
    setCategories(c);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Bu məhsulu silmək istədiyinizə əminsiniz?")) return;
    await deleteProduct(id);
    load();
  }

  function openNew() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setShowForm(true);
  }

  if (loading) return <Spinner />;

  return (
    <div>
      {showForm ? (
        <ProductForm
          categories={categories}
          product={editing}
          onDone={() => {
            setShowForm(false);
            load();
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          <button onClick={openNew} className="btn-primary mb-4">
            <Plus size={18} /> Yeni məhsul
          </button>
          <div className="space-y-2">
            {products.map((p) => {
              const cat = categories.find((c) => c.id === p.category_id);
              return (
                <div key={p.id} className="card flex items-center gap-3 p-3">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1 truncate font-bold text-brand-800">
                      {p.featured && <Star size={14} className="text-honey-500" />}
                      {p.name}
                    </p>
                    <p className="text-sm text-brand-900/60">
                      {formatPrice(p.price, p.unit)} · {cat?.name || "—"} ·{" "}
                      {p.in_stock ? "stokda" : "bitib"}
                    </p>
                  </div>
                  <button onClick={() => openEdit(p)} className="btn-outline px-3 py-2">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function ProductForm({
  categories,
  product,
  onDone,
  onCancel,
}: {
  categories: Category[];
  product: Product | null;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ProductInput>(
    product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          unit: product.unit,
          category_id: product.category_id,
          image_url: product.image_url,
          in_stock: product.in_stock,
          featured: product.featured,
        }
      : { ...emptyForm, category_id: categories[0]?.id || "" },
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof ProductInput>(key: K, value: ProductInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadProductImage(file);
      set("image_url", url);
    } catch (err) {
      setError("Şəkil yüklənmədi. Storage bucket-i yoxlayın.");
    } finally {
      setUploading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (product) await updateProduct(product.id, form);
      else await createProduct(form);
      onDone();
    } catch (err) {
      setError("Yadda saxlanmadı: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const input =
    "mt-1 w-full rounded-xl border border-cream-200 px-3 py-2 outline-none focus:border-brand-400";

  return (
    <form onSubmit={submit} className="card space-y-4 p-5">
      <h2 className="text-lg font-extrabold text-brand-800">
        {product ? "Məhsulu redaktə et" : "Yeni məhsul"}
      </h2>
      {error && <p className="text-sm font-bold text-red-600">{error}</p>}

      <div>
        <label className="text-sm font-bold text-brand-800">Ad</label>
        <input
          className={input}
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-sm font-bold text-brand-800">Təsvir</label>
        <textarea
          className={input}
          rows={3}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-bold text-brand-800">Qiymət (₼)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            className={input}
            value={form.price}
            onChange={(e) => set("price", parseFloat(e.target.value) || 0)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-bold text-brand-800">Ölçü</label>
          <select
            className={input}
            value={form.unit}
            onChange={(e) => set("unit", e.target.value)}
          >
            {["kq", "litr", "ədəd", "banka", "dəst"].map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-brand-800">Kateqoriya</label>
        <select
          className={input}
          value={form.category_id}
          onChange={(e) => set("category_id", e.target.value)}
          required
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-bold text-brand-800">Şəkil</label>
        <div className="mt-1 flex items-center gap-3">
          {form.image_url && (
            <img
              src={form.image_url}
              alt=""
              className="h-16 w-16 rounded-lg object-cover"
            />
          )}
          <label className="btn-outline cursor-pointer py-2">
            <Upload size={16} /> {uploading ? "Yüklənir..." : "Şəkil yüklə"}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>
        <input
          className={input}
          placeholder="və ya şəkil linki (URL)"
          value={form.image_url}
          onChange={(e) => set("image_url", e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 font-bold text-brand-800">
          <input
            type="checkbox"
            checked={form.in_stock}
            onChange={(e) => set("in_stock", e.target.checked)}
          />
          Stokda var
        </label>
        <label className="flex items-center gap-2 font-bold text-brand-800">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
          />
          Seçilmiş
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-primary flex-1">
          {saving ? "Saxlanılır..." : "Yadda saxla"}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline">
          Ləğv et
        </button>
      </div>
    </form>
  );
}

function SettingsManager() {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getSettings().then(setForm);
  }, []);

  if (!form) return <Spinner />;

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMsg("");
    try {
      await saveSettings(form);
      setMsg("Yadda saxlanıldı ✓");
    } catch (err) {
      setMsg("Xəta: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const input =
    "mt-1 w-full rounded-xl border border-cream-200 px-3 py-2 outline-none focus:border-brand-400";
  const fields: { key: keyof SiteSettings; label: string; textarea?: boolean }[] = [
    { key: "phone", label: "Telefon (məs. +994501234567)" },
    { key: "whatsapp", label: "WhatsApp nömrəsi (məs. 994501234567)" },
    { key: "address", label: "Ünvan" },
    { key: "instagram", label: "Instagram (@istifadəçi)" },
    { key: "email", label: "E-poçt" },
    { key: "about_text", label: "Haqqımızda mətni", textarea: true },
  ];

  return (
    <form onSubmit={submit} className="card space-y-4 p-5">
      <h2 className="text-lg font-extrabold text-brand-800">Əlaqə parametrləri</h2>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="text-sm font-bold text-brand-800">{f.label}</label>
          {f.textarea ? (
            <textarea
              className={input}
              rows={3}
              value={form[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
            />
          ) : (
            <input
              className={input}
              value={form[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
            />
          )}
        </div>
      ))}
      {msg && <p className="text-sm font-bold text-brand-600">{msg}</p>}
      <button type="submit" disabled={saving} className="btn-primary">
        {saving ? "Saxlanılır..." : "Yadda saxla"}
      </button>
    </form>
  );
}
