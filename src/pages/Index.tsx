import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Award, ChevronRight, Headphones, ShieldCheck, Truck } from "lucide-react";
import BrandLogo from "@/components/brand-logo.tsx";
import LiquidGlass from "@/components/liquid-glass.tsx";
import ProductCard from "@/components/product-card.tsx";
import { BRANDS, PRODUCTS, type Brand } from "@/lib/products.ts";

const FEATURED = PRODUCTS.filter((p) => p.featured).slice(0, 6);
const STATS = [
  { value: "15+", label: "Annees d'experience" },
  { value: "500+", label: "Produits references" },
  { value: "3", label: "Marques partenaires" },
  { value: "1000+", label: "Clients satisfaits" },
];
const WHY_US = [
  { icon: ShieldCheck, title: "Produits Certifies", desc: "Tous nos produits sont originaux et selectionnes pour les professionnels." },
  { icon: Truck, title: "Livraison Rapide", desc: "Livraison sur chantier dans toute l'Algerie selon disponibilite." },
  { icon: Award, title: "Distributeur Officiel", desc: "Partenaire Sika, Terraco et Lafarge pour les besoins chantier." },
  { icon: Headphones, title: "Support Technique", desc: "Une equipe disponible pour orienter le choix produit et le devis." },
];

export default function Index() {
  return (
    <div className="bg-background">
      <section className="relative flex min-h-[86vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1766866810631-51e505cb784e?auto=format&fit=crop&w=1920&q=80" alt="Chantier construction" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/35" />
        </div>
        <div className="absolute inset-y-0 right-0 hidden w-1/3 lg:block">
          <div className="absolute inset-0 translate-x-20 skew-x-[-6deg] bg-secondary/20" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded border border-secondary/30 bg-secondary/20 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Distributeur Officiel Agree
            </span>
            <h1 className="text-balance font-display text-5xl font-black leading-none text-white md:text-7xl">
              LES MEILLEURS
              <br />
              <span className="text-secondary">MATERIAUX</span>
              <br />
              DE CONSTRUCTION
            </h1>
            <p className="mb-8 mt-6 max-w-lg text-lg leading-relaxed text-white/82">NAF Factory, votre distributeur Sika, Terraco et Lafarge. Des solutions professionnelles pour vos projets de construction et de renovation.</p>
            <div className="flex flex-wrap gap-3">
              <LiquidGlass borderRadius={14} blur={24} refraction={12}><Link to="/produits" className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white">Voir le Catalogue <ArrowRight className="h-4 w-4" /></Link></LiquidGlass>
              <LiquidGlass borderRadius={14} blur={24} refraction={12}><Link to="/contact" className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white">Demander un Devis</Link></LiquidGlass>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative overflow-hidden border-y-2 border-secondary/40 bg-primary py-4">
        <motion.div className="flex whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {STATS.map((stat) => (
                <div key={`${dup}-${stat.label}`} className="flex items-center gap-6 px-12">
                  <span className="font-display text-3xl font-black leading-none text-secondary">{stat.value}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">{stat.label}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary/50" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Header eyebrow="Nos Partenaires" title="3 MARQUES MONDIALES" text="Des fabricants leaders dans leurs domaines, presentes avec leurs codes visuels reels." />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {(Object.entries(BRANDS) as [Brand, (typeof BRANDS)[Brand]][]).map(([key, brand], i) => (
              <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                <Link to={`/produits?marque=${key}`} className="group block overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative flex h-56 items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${brand.color}18, ${brand.accent}30)` }}>
                    <BrandLogo brand={key} />
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">{brand.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-secondary transition-all group-hover:gap-2">Voir les produits <ChevronRight className="h-4 w-4" /></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div><span className="text-xs font-bold uppercase tracking-widest text-secondary">Selection</span><h2 className="mt-1 font-display text-4xl font-black text-foreground">PRODUITS VEDETTES</h2></div>
            <Link to="/produits" className="hidden items-center gap-1 text-sm font-semibold text-secondary transition-all hover:gap-2 md:flex">Tout voir <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{FEATURED.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Header eyebrow="Pourquoi nous choisir" title="L'EXCELLENCE A VOTRE SERVICE" light />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-lg border border-white/10 bg-white/5 p-6 text-center transition-colors hover:bg-white/10">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-lg bg-secondary/20"><item.icon className="h-6 w-6 text-secondary" /></div>
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-display text-4xl font-black text-white md:text-5xl">BESOIN D'UN DEVIS ?</h2>
          <p className="mx-auto mb-8 mt-4 max-w-xl text-lg text-white/90">Contactez notre equipe commerciale pour obtenir les meilleures offres sur vos projets.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <LiquidGlass borderRadius={14} blur={24} refraction={12}><Link to="/contact" className="block px-8 py-3 font-bold text-white">Nous Contacter</Link></LiquidGlass>
            <LiquidGlass borderRadius={14} blur={24} refraction={12}><Link to="/produits" className="block px-8 py-3 font-bold text-white">Voir le Catalogue</Link></LiquidGlass>
          </div>
        </div>
      </section>
    </div>
  );
}

function Header({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="mb-12 text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-secondary">{eyebrow}</span>
      <h2 className={`mt-2 font-display text-4xl font-black ${light ? "text-white" : "text-foreground"}`}>{title}</h2>
      {text && <p className={`mx-auto mt-3 max-w-xl ${light ? "text-white/70" : "text-muted-foreground"}`}>{text}</p>}
    </div>
  );
}
