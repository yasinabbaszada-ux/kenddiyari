import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, LogOut, AlertTriangle } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { getSession, signIn, signOut } from "../lib/api";
import AdminDashboard from "./AdminDashboard";

export default function Admin() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setChecking(false);
      return;
    }
    getSession()
      .then((session) => setLoggedIn(Boolean(session)))
      .finally(() => setChecking(false));

    const sub = supabase?.auth.onAuthStateChange((_e, session) => {
      setLoggedIn(Boolean(session));
    });
    return () => sub?.data.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) return <NotConfigured />;
  if (checking) return <div className="p-10 text-center text-brand-600">Yoxlanılır...</div>;
  if (!loggedIn) return <Login />;

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="flex items-center justify-between border-b border-cream-200 bg-white px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-brand-700">
          <Leaf size={20} /> Admin panel
        </Link>
        <button onClick={() => signOut()} className="btn-outline py-2">
          <LogOut size={18} /> Çıxış
        </button>
      </header>
      <AdminDashboard />
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError("Giriş alınmadı. E-poçt və ya parol yanlışdır.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-4">
      <form onSubmit={submit} className="card w-full max-w-sm p-6">
        <div className="mb-4 flex items-center gap-2 text-brand-700">
          <Leaf size={24} />
          <h1 className="text-xl font-extrabold">Admin girişi</h1>
        </div>
        <label className="block text-sm font-bold text-brand-800">E-poçt</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded-xl border border-cream-200 px-3 py-2 outline-none focus:border-brand-400"
        />
        <label className="mt-4 block text-sm font-bold text-brand-800">Parol</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full rounded-xl border border-cream-200 px-3 py-2 outline-none focus:border-brand-400"
        />
        {error && <p className="mt-3 text-sm font-bold text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? "Daxil olunur..." : "Daxil ol"}
        </button>
        <Link to="/" className="mt-4 block text-center text-sm font-bold text-brand-600">
          ← Sayta qayıt
        </Link>
      </form>
    </div>
  );
}

function NotConfigured() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-4">
      <div className="card max-w-md p-6 text-center">
        <AlertTriangle size={40} className="mx-auto text-honey-500" />
        <h1 className="mt-3 text-xl font-extrabold text-brand-800">Supabase qoşulmayıb</h1>
        <p className="mt-2 text-brand-900/70">
          Admin panelini istifadə etmək üçün <code>.env.local</code> faylına Supabase
          açarlarını əlavə edin və <code>supabase/schema.sql</code> skriptini icra edin.
          Təlimat üçün <b>README.md</b> faylına baxın.
        </p>
        <Link to="/" className="btn-primary mt-6">
          Sayta qayıt
        </Link>
      </div>
    </div>
  );
}
