import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AppLayout from "@/pages/_layout/app-layout.tsx";
import APropos from "@/pages/a-propos/page.tsx";
import AuthCallback from "@/pages/auth/Callback.tsx";
import Contact from "@/pages/contact/page.tsx";
import Index from "@/pages/Index.tsx";
import NotFound from "@/pages/NotFound.tsx";
import Panier from "@/pages/panier/page.tsx";
import Produits from "@/pages/produits/page.tsx";

export default function App() {
  return (
    <>
      <BrowserRouter basename="/naf.github.io">
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/produits" element={<Produits />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </>
  );
}
