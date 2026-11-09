import { Link } from "react-router-dom";
import type { Product } from "../types";
import { formatPrice } from "../lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/mehsul/${product.id}`}
      className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {!product.in_stock && (
          <span className="absolute left-2 top-2 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
            Bitib
          </span>
        )}
        {product.featured && product.in_stock && (
          <span className="absolute left-2 top-2 rounded-full bg-honey-500 px-3 py-1 text-xs font-bold text-white">
            Seçilmiş
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 font-bold text-brand-800">{product.name}</h3>
        <p className="mt-1 font-extrabold text-brand-600">
          {formatPrice(product.price, product.unit)}
        </p>
      </div>
    </Link>
  );
}
