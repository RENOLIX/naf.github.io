import { ArrowUpRight, Check, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/brand-logo.tsx";
import { useCart } from "@/hooks/use-cart.ts";
import { BRANDS, type Product } from "@/lib/products.ts";
import { cn } from "@/lib/utils.ts";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const brand = BRANDS[product.brand];

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className={cn("group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-xl", compact && "text-sm")}>
      <Link to={`/produits/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-white">
        <img src={product.image} alt={product.name} className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
        <div className="absolute left-2 top-2 scale-[.48] origin-top-left">
          <BrandLogo brand={product.brand} />
        </div>
        {product.badge && <span className="absolute right-2 top-2 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: brand.color }}>{product.badge}</span>}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.category}</p>
          <Link to={`/produits/${product.id}`} className="group/title mt-0.5 flex items-start gap-1 text-lg font-bold leading-snug text-foreground hover:text-secondary">
            <span className="line-clamp-2">{product.name}</span>
            <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/title:opacity-100" />
          </Link>
          {!compact && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="rounded bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">{product.unit}</span>
          <button
            onClick={handleAdd}
            className={cn("flex items-center gap-1.5 rounded px-3 py-2 text-xs font-semibold text-white transition-all", added ? "bg-green-600" : "bg-primary hover:bg-primary/90")}
          >
            {added ? <><Check className="h-3.5 w-3.5" /> Ajoute</> : <><ShoppingCart className="h-3.5 w-3.5" /> Ajouter</>}
          </button>
        </div>
      </div>
    </div>
  );
}
