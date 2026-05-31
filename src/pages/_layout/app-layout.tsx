import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/footer.tsx";
import Navbar from "@/components/navbar.tsx";

export default function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.search]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
