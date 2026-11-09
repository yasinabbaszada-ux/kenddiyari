import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import WhatsAppFab from "./WhatsAppFab";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-20 sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <BottomNav />
    </div>
  );
}
