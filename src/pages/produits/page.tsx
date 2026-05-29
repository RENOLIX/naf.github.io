import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import BrandLogo from "@/components/brand-logo.tsx";
import ProductCard from "@/components/product-card.tsx";
import { BRANDS, PRODUCTS, type Brand } from "@/lib/products.ts";

const ALL_BRANDS: { value: Brand | "all"; label: string }[] = [
  { value: "all", label: "Toutes les marques" },
  { value: "sika", label: "Sika" },
  { value: "terraco", label: "Terraco" },
  { value: "lafarge", label: "Lafarge" },
];

export default function Produits() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const selectedBrand = (searchParams.get("marque") as Brand | null) ?? "all";
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const currentBrand = selectedBrand !== "all" ? BRANDS[selectedBrand] : null;

  const categories = useMemo(() => {
    const cats = PRODUCTS.filter((p) => selectedBrand === "all" || p.brand === selectedBrand).map((p) => p.category);
    return ["Toutes", ...Array.from(new Set(cats))];
  }, [selectedBrand]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesBrand = selectedBrand === "all" || p.brand === selectedBrand;
      const matchesCat = selectedCategory === "Toutes" || p.category === selectedCategory;
      const needle = search.toLowerCase();
      const matchesSearch = !needle || p.name.toLowerCase().includes(needle) || p.description.toLowerCase().includes(needle);
      return matchesBrand && matchesCat && matchesSearch;
    });
  }, [selectedBrand, selectedCategory, search]);

  const setBrand = (brand: Brand | "all") => {
    setSelectedCategory("Toutes");
    setSearchParams(brand === "all" ? {} : { marque: brand });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden px-4 py-16 text-white" style={{ background: currentBrand ? `linear-gradient(135deg, ${currentBrand.dark}, ${currentBrand.color})` : "linear-gradient(135deg, #18284b, #2f66d8)" }}>
        {currentBrand && <img src={currentBrand.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-18 mix-blend-screen" />}
        <div className="relative mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white">{currentBrand ? `Univers ${currentBrand.name}` : "Catalogue"}</p>
            <h1 className="font-display text-5xl font-black text-white">{currentBrand ? currentBrand.name.toUpperCase() : "NOS PRODUITS"}</h1>
            <p className="mt-3 max-w-xl text-white">{currentBrand ? currentBrand.tagline : "Selection professionnelle Sika, Terraco et Lafarge pour chantiers algeriens."}</p>
            {currentBrand && <p className="mt-2 max-w-xl text-sm text-white/85">{currentBrand.mood}</p>}
          </div>
          {currentBrand && <BrandLogo brand={selectedBrand as Brand} className="hidden md:inline-flex" />}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Rechercher un produit..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-md border border-border bg-background py-2.5 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring" />
            {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="h-4 w-4 text-muted-foreground" /></button>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            {ALL_BRANDS.map((b) => {
              const active = selectedBrand === b.value;
              const color = b.value !== "all" ? BRANDS[b.value].color : "#18284b";
              return (
                <button key={b.value} onClick={() => setBrand(b.value)} className="rounded px-3 py-1.5 text-sm font-semibold transition-all" style={active ? { backgroundColor: color, color: "white" } : { border: "1px solid #dce4ee", color: "#64748b" }}>
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selectedCategory === cat ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {cat}
            </button>
          ))}
        </div>

        <p className="mb-6 text-sm text-muted-foreground">{filtered.length} produit{filtered.length !== 1 ? "s" : ""} trouve{filtered.length !== 1 ? "s" : ""}</p>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg font-semibold">Aucun produit trouve</p>
            <p className="mt-1 text-sm">Essayez de modifier vos filtres</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </div>
  );
}
