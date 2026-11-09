import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { getProducts } from "../lib/api";
import type { Product } from "../types";
import { useSettings } from "../lib/SettingsContext";
import { formatPrice, telLink, whatsappLink, orderMessage } from "../lib/format";
import Spinner from "../components/Spinner";

export default function ProductDetail() {
  const { id } = useParams();
  const s = useSettings();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((all) => setProduct(all.find((p) => p.id === id) || null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;

  if (!product) {
    return (
      <div className="container-x py-16 text-center">
        <p className="text-brand-900/70">Məhsul tapılmadı.</p>
        <Link to="/mehsullar" className="btn-primary mt-4">
          Məhsullara qayıt
        </Link>
      </div>
    );
  }

  const waHref = whatsappLink(s.whatsapp, orderMessage(product.name));

  return (
    <div className="container-x py-6">
      <Link to="/mehsullar" className="inline-flex items-center gap-1 font-bold text-brand-600">
        <ArrowLeft size={18} /> Geri
      </Link>

      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div className="card overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold text-brand-800">{product.name}</h1>
          <p className="mt-2 text-2xl font-extrabold text-brand-600">
            {formatPrice(product.price, product.unit)}
          </p>
          <span
            className={`mt-2 inline-flex w-fit rounded-full px-3 py-1 text-sm font-bold ${
              product.in_stock
                ? "bg-brand-100 text-brand-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.in_stock ? "Stokda var" : "Hal-hazırda bitib"}
          </span>

          <p className="mt-4 leading-relaxed text-brand-900/80">{product.description}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp flex-1"
            >
              <MessageCircle size={20} /> WhatsApp-la sifariş et
            </a>
            <a href={telLink(s.phone)} className="btn-outline flex-1">
              <Phone size={20} /> Zəng et
            </a>
          </div>

          <p className="mt-3 text-sm text-brand-900/60">
            Sifariş üçün WhatsApp və ya telefonla əlaqə saxlayın — çatdırılma ilə bağlı
            məlumat verəcəyik.
          </p>
        </div>
      </div>
    </div>
  );
}
