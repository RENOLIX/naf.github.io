import { Link, useLocation } from "react-router-dom";
import { Mail, Menu, Phone, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import LiquidGlass from "@/components/liquid-glass.tsx";
import SiteLogo from "@/components/site-logo.tsx";
import { useCart } from "@/hooks/use-cart.ts";
import { cn } from "@/lib/utils.ts";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/produits" },
  { label: "Sika", href: "/produits-sika/" },
  { label: "Terraco", href: "/produits?marque=terraco" },
  { label: "Lafarge", href: "/produits?marque=lafarge" },
  { label: "A Propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCart((s) => s.totalItems());

  return (
    <>
      <div className="hidden items-center justify-between bg-primary px-4 py-2 text-sm text-white md:flex">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> 0665 12 98 95</span>
          <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> contact@naf-factory.com</span>
        </div>
        <span className="font-medium tracking-wide">Distributeur Officiel SIKA - TERRACO - LAFARGE - BASF - PROSEAL</span>
      </div>

      <header className="sticky top-0 z-50">
        <LiquidGlass borderRadius={0} blur={22} refraction={14} variant="dark" className="w-full">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
            <SiteLogo markClassName="h-10 sm:h-11" textClassName="hidden lg:block" />

            <nav className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => {
                const [path, query] = link.href.split("?");
                const active = query
                  ? location.pathname === path && location.search === `?${query}`
                  : link.href === "/"
                    ? location.pathname === "/"
                    : location.pathname === path && !location.search;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn("rounded-md px-3 py-1.5 text-sm font-bold text-white drop-shadow-sm transition-colors hover:bg-white/12", active && "bg-white/20 shadow-sm")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <div className="relative">
                <LiquidGlass borderRadius={8} blur={18} refraction={10} variant="dark">
                  <Link to="/panier" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden sm:inline">Panier</span>
                  </Link>
                </LiquidGlass>
                {totalItems > 0 && <span className="absolute -right-2 -top-2 z-20 grid h-5 min-w-5 place-items-center rounded-full bg-secondary px-1 text-xs font-bold text-white shadow-md">{totalItems}</span>}
              </div>
              <button className="rounded-xl p-2 text-white transition-colors hover:bg-white/10 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </LiquidGlass>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden">
              <LiquidGlass borderRadius={0} blur={28} refraction={8} variant="dark" className="w-full">
                <nav className="flex flex-col gap-1 p-4">
                  {NAV_LINKS.map((link) => (
                    <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-bold text-white transition-all hover:bg-white/10">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </LiquidGlass>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
