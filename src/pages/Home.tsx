import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { getProducts, getCategories } from "../lib/api";
import type { Product, Category } from "../types";
import { BRAND } from "../config";
import ProductCard from "../components/ProductCard";
import DemoBanner from "../components/DemoBanner";
import Spinner from "../components/Spinner";
import FarmScene from "../components/FarmScene";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([p, c]) => {
        setProducts(p);
        setCategories(c);
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = products.filter((p) => p.featured && p.in_stock).slice(0, 6);
  const toShow = featured.length ? featured : products.slice(0, 6);

  return (
    <div>
      {/* Hero — animasiyalı kənd mənzərəsi fonu */}
      <section className="relative overflow-hidden">
        <FarmScene className="absolute inset-0 h-full w-full" />
        {/* Mətnin oxunması üçün yüngül parıltı + aşağıya keçid */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream-50/80 via-cream-50/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream-50 to-transparent" />

        <div className="container-x relative z-10 flex min-h-[380px] flex-col justify-center py-14 sm:min-h-[460px] sm:py-20">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-brand-700 shadow-sm backdrop-blur">
            <Leaf size={16} className="text-brand-600" /> 100% təbii
          </span>
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight text-brand-800 drop-shadow-sm sm:text-5xl">
            Kənddən birbaşa süfrənizə
          </h1>
          <p className="mt-3 max-w-md text-brand-900/75 sm:text-lg">{BRAND.tagline}.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/mehsullar" className="btn-primary shadow-md">
              Məhsullara bax <ArrowRight size={18} />
            </Link>
            <Link to="/elaqe" className="btn-outline bg-white/70 backdrop-blur">
              Əlaqə
            </Link>
          </div>
        </div>
      </section>

      <DemoBanner />

      {/* Üstünlüklər */}
      <section className="container-x grid gap-4 py-8 sm:grid-cols-3">
        {[
          { icon: Leaf, title: "Təbii", text: "Konservant və kimyəvi əlavə yoxdur." },
          { icon: Truck, title: "Təzə çatdırılma", text: "Sifarişiniz təzə-təzə yola düşür." },
          { icon: ShieldCheck, title: "Keyfiyyət zəmanəti", text: "Kənddən seçilmiş məhsullar." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="card flex items-start gap-3 p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Icon size={22} />
            </span>
            <div>
              <h3 className="font-bold text-brand-800">{title}</h3>
              <p className="text-sm text-brand-900/70">{text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Kateqoriyalar */}
      <section className="container-x py-4">
        <h2 className="mb-4 text-xl font-extrabold text-brand-800">Kateqoriyalar</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/mehsullar?kateqoriya=${c.slug}`}
              className="card flex items-center justify-center p-6 text-center font-bold text-brand-700 transition hover:bg-brand-50"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Seçilmiş məhsullar */}
      <section className="container-x py-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-brand-800">Seçilmiş məhsullar</h2>
          <Link to="/mehsullar" className="text-sm font-bold text-brand-600 hover:underline">
            Hamısı →
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {toShow.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
