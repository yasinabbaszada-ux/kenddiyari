import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { getProducts, getCategories } from "../lib/api";
import type { Product, Category } from "../types";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [params, setParams] = useSearchParams();

  const activeSlug = params.get("kateqoriya") || "hamisi";

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([p, c]) => {
        setProducts(p);
        setCategories(c);
      })
      .finally(() => setLoading(false));
  }, []);

  const activeCategory = categories.find((c) => c.slug === activeSlug);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const byCat = activeSlug === "hamisi" || p.category_id === activeCategory?.id;
      const byText = p.name.toLowerCase().includes(query.trim().toLowerCase());
      return byCat && byText;
    });
  }, [products, activeSlug, activeCategory, query]);

  function selectCategory(slug: string) {
    if (slug === "hamisi") setParams({});
    else setParams({ kateqoriya: slug });
  }

  return (
    <div className="container-x py-6">
      <h1 className="text-2xl font-extrabold text-brand-800">Məhsullar</h1>

      {/* Axtarış */}
      <div className="relative mt-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-900/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Məhsul axtar..."
          className="w-full rounded-xl border border-cream-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-brand-400"
        />
      </div>

      {/* Kateqoriya filtri */}
      <div className="mt-4 flex flex-wrap gap-2">
        <FilterChip active={activeSlug === "hamisi"} onClick={() => selectCategory("hamisi")}>
          Hamısı
        </FilterChip>
        {categories.map((c) => (
          <FilterChip
            key={c.id}
            active={activeSlug === c.slug}
            onClick={() => selectCategory(c.slug)}
          >
            {c.name}
          </FilterChip>
        ))}
      </div>

      {/* Nəticələr */}
      {loading ? (
        <Spinner />
      ) : filtered.length === 0 ? (
        <p className="py-16 text-center text-brand-900/60">Məhsul tapılmadı.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
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
      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
        active ? "bg-brand-500 text-white" : "bg-white text-brand-700 hover:bg-brand-50"
      }`}
    >
      {children}
    </button>
  );
}
