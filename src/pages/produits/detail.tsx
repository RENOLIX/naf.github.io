import { ArrowLeft, CheckCircle2, Download, ExternalLink, FileText, Package, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BrandLogo from "@/components/brand-logo.tsx";
import ProductCard from "@/components/product-card.tsx";
import { useCart } from "@/hooks/use-cart.ts";
import { BRANDS, PRODUCTS } from "@/lib/products.ts";

export default function ProductDetail() {
  const { id } = useParams();
  const addItem = useCart((s) => s.addItem);
  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-background px-4 text-center">
        <div>
          <h1 className="text-3xl font-black text-foreground">PRODUIT INTROUVABLE</h1>
          <Link to="/produits" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary">
            <ArrowLeft className="h-4 w-4" /> Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const related = PRODUCTS.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const hasTechnicalSheet = Boolean(product.technicalSheet);
  const sheetIsPdf = hasTechnicalSheet && product.technicalSheet.toLowerCase().includes(".pdf");
  const brand = BRANDS[product.brand];

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-primary px-4 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <Link to={product.brand === "sika" ? "/produits-sika/" : `/produits?marque=${product.brand}`} className="inline-flex items-center gap-2 text-sm font-bold text-white">
            <ArrowLeft className="h-4 w-4" /> Retour aux produits {brand.name}
          </Link>
          <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">{product.category}</p>
              <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">{product.name}</h1>
            </div>
            <div className="scale-75 origin-bottom-right rounded-md bg-white p-3">
              <BrandLogo brand={product.brand} />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,.9fr)]">
          <div className="overflow-hidden rounded-lg border border-border bg-white">
            <div className="grid min-h-[410px] place-items-center p-8">
              <img src={product.image} alt={product.name} className="max-h-[390px] w-full object-contain" />
            </div>
            {product.imageNote && <p className="border-t border-border bg-muted/50 px-5 py-3 text-xs text-muted-foreground">{product.imageNote}</p>}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Fiche produit officielle</p>
            <h2 className="mt-2 text-3xl font-black text-foreground">{product.name}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-6 rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-foreground">
                <Package className="h-4 w-4 text-secondary" /> Formats disponibles
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.formats.map((format) => <span key={format} className="rounded bg-muted px-3 py-1.5 text-sm font-bold text-foreground">{format}</span>)}
              </div>
              {product.colors && (
                <>
                  <p className="mt-5 text-xs font-black uppercase tracking-wide text-foreground">Couleurs disponibles</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.colors.map((color) => <span key={color} className="rounded border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground">{color}</span>)}
                  </div>
                </>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => addItem(product)} className="inline-flex items-center gap-2 rounded bg-secondary px-5 py-3 text-sm font-black text-white transition-colors hover:bg-secondary/90">
                <ShoppingCart className="h-4 w-4" /> Ajouter au panier
              </button>
              {hasTechnicalSheet && (
                <a href={product.technicalSheet} target="_blank" rel="noreferrer" style={{ color: "#07152f" }} className="inline-flex items-center gap-2 rounded border border-border bg-white px-5 py-3 text-sm font-black shadow-sm transition-colors hover:bg-muted">
                  {sheetIsPdf ? <Download className="h-4 w-4" /> : <FileText className="h-4 w-4" />} {sheetIsPdf ? "Fiche technique PDF" : "Fiche officielle"}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-black text-foreground">POINTS CLES</h2>
            <ul className="mt-4 space-y-3">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" /> {highlight}
                </li>
              ))}
            </ul>
          </section>
          <section className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-xl font-black text-foreground">DONNEES TECHNIQUES</h2>
            </div>
            <dl>
              {product.specifications.map((item) => (
                <div key={item.label} className="grid grid-cols-[140px_1fr] gap-3 border-b border-border px-6 py-3 text-sm last:border-b-0">
                  <dt className="font-bold text-foreground">{item.label}</dt>
                  <dd className="text-muted-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <a href={product.sourceUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline">
          <ExternalLink className="h-4 w-4" /> Consulter la page officielle {brand.name}
        </a>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Dans la meme categorie</p>
            <h2 className="mt-2 text-3xl font-black text-foreground">PRODUITS ASSOCIES</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => <ProductCard key={item.id} product={item} compact />)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
