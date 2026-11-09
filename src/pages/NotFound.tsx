import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-x py-20 text-center">
      <p className="text-6xl font-extrabold text-brand-200">404</p>
      <h1 className="mt-2 text-xl font-bold text-brand-800">Səhifə tapılmadı</h1>
      <Link to="/" className="btn-primary mt-6">
        Ana səhifəyə qayıt
      </Link>
    </div>
  );
}
