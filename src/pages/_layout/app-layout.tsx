import { Outlet } from "react-router-dom";
import Footer from "@/components/footer.tsx";
import Navbar from "@/components/navbar.tsx";

export default function AppLayout() {
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
