import { Routes, Route } from "react-router-dom";
import { SettingsProvider } from "./lib/SettingsContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <SettingsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mehsullar" element={<Products />} />
          <Route path="/mehsul/:id" element={<ProductDetail />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </SettingsProvider>
  );
}
