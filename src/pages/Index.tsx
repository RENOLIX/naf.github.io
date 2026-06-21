import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  Factory,
  FileText,
  Headphones,
  MapPin,
  Navigation,
  ShieldCheck,
  Truck,
} from "lucide-react";
import BrandLogo from "@/components/brand-logo.tsx";
import LiquidGlass from "@/components/liquid-glass.tsx";
import ProductCard from "@/components/product-card.tsx";
import { BRANDS, PRODUCTS, type Brand } from "@/lib/products.ts";

const BEST_SELLERS = PRODUCTS.filter((p) => p.bestSeller).slice(0, 4);

const HERO_SLIDES = [
  { src: "/hero-storefront.png", alt: "Facade du magasin NAF Factory" },
  { src: "/hero-store-interior.png", alt: "Rayons professionnels du magasin NAF Factory" },
  { src: "/hero-store-products.png", alt: "Produits de construction disponibles chez NAF Factory" },
];

const KPIS = [
  { value: "15+", label: "annees terrain" },
  { value: "500+", label: "references chantier" },
  { value: "24h", label: "reponse devis" },
  { value: "3", label: "marques officielles" },
];

const SERVICES = [
  { icon: ClipboardCheck, title: "Selection technique", desc: "Nous orientons le bon produit selon support, usage et contraintes chantier." },
  { icon: FileText, title: "Devis clair", desc: "Demandes structurees, quantites lisibles et suivi commercial rapide." },
  { icon: Truck, title: "Logistique chantier", desc: "Preparation et livraison selon disponibilite, wilaya et urgence projet." },
];

const TRUST = [
  { icon: ShieldCheck, title: "Origine verifiee", desc: "Produits conformes aux gammes fabricants." },
  { icon: Boxes, title: "Stock multi-marques", desc: "Sika, Terraco et Lafarge dans un meme catalogue." },
  { icon: Headphones, title: "Support pro", desc: "Une equipe qui parle chantier, pas seulement catalogue." },
];

export default function Index() {
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % HERO_SLIDES.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="bg-background">
      <section className="relative min-h-[88vh] overflow-hidden bg-primary text-white">
        {HERO_SLIDES.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              heroSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,21,47,.98)_0%,rgba(7,21,47,.94)_34%,rgba(7,21,47,.68)_66%,rgba(7,21,47,.42)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative flex min-h-[88vh] items-center px-4 py-20 md:px-8 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="w-full max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-white shadow-2xl backdrop-blur-xl">
              <BadgeCheck className="h-4 w-4 text-secondary" />
              Distributeur officiel Sika - Terraco - Lafarge
            </div>
            <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-7xl">
              Materiaux certifies pour chantiers ambitieux.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 md:text-lg">
              NAF Factory centralise vos besoins professionnels: etancheite, colles, enduits, mortiers,
              ciment, beton et solutions de finition avec un parcours de devis simple et rapide.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/produits"
                style={{ color: "#07152f" }}
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-extrabold shadow-xl transition hover:-translate-y-0.5 hover:bg-white/92"
              >
                Explorer le catalogue <ArrowRight className="h-4 w-4 text-[#07152f]" />
              </Link>
              <LiquidGlass borderRadius={8} blur={18} variant="dark">
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-extrabold text-white">
                  Demander un devis
                </Link>
              </LiquidGlass>
            </div>
          </motion.div>
        </div>

        <div className="absolute right-4 top-5 z-20 flex items-center gap-1.5 rounded-md border border-white/18 bg-slate-950/30 p-1.5 shadow-lg backdrop-blur-xl md:right-8 lg:right-14">
          <button
            type="button"
            aria-label="Image precedente"
            onClick={() => setHeroSlide((current) => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="grid h-8 w-8 place-items-center rounded text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5 px-1">
            {HERO_SLIDES.map((slide, index) => (
              <button
                type="button"
                key={slide.src}
                aria-label={`Afficher l'image ${index + 1}`}
                onClick={() => setHeroSlide(index)}
                className={`h-1.5 rounded-full transition-all ${heroSlide === index ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/80"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Image suivante"
            onClick={() => setHeroSlide((current) => (current + 1) % HERO_SLIDES.length)}
            className="grid h-8 w-8 place-items-center rounded text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-4 md:px-8 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <LiquidGlass borderRadius={10} blur={18} variant="light" className="text-primary">
            <div className="grid gap-px overflow-hidden rounded-[10px] bg-slate-200/60 md:grid-cols-4">
              {KPIS.map((kpi) => (
                <div key={kpi.label} className="bg-white/64 p-6">
                  <p className="font-display text-3xl font-extrabold text-primary">{kpi.value}</p>
                  <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">{kpi.label}</p>
                </div>
              ))}
            </div>
          </LiquidGlass>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8 lg:px-14">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <SectionLabel>Plateforme pro</SectionLabel>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
              Un parcours de commande pense pour les entreprises.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              Le site met en avant les produits, prepare votre panier de devis et garde le contact commercial
              au centre. L'objectif: moins d'aller-retour, plus de precision.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {SERVICES.map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <item.icon className="h-7 w-7 text-secondary" />
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 md:px-8 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel>Marques officielles</SectionLabel>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl">
                Les vrais univers de vos fournisseurs.
              </h2>
            </div>
            <Link to="/produits" className="inline-flex items-center gap-2 text-sm font-extrabold text-secondary">
              Tout le catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {(Object.entries(BRANDS) as [Brand, (typeof BRANDS)[Brand]][]).map(([key, brand]) => (
              <Link
                key={key}
                to={key === "sika" ? "/produits-sika/" : `/produits?marque=${key}`}
                className="group relative min-h-[330px] overflow-hidden rounded-lg border border-border bg-slate-950 p-7 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <img src={brand.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-32 transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${brand.dark} 0%, ${brand.color}c0 54%, transparent 100%)` }} />
                <div className="relative flex h-full flex-col">
                  <BrandLogo brand={key} className="mb-8 max-w-fit" />
                  <h3 className="font-display text-2xl font-extrabold">{brand.name}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">{brand.description}</p>
                  <div className="mt-auto inline-flex items-center gap-2 pt-10 text-sm font-extrabold">
                    Voir les produits <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <SectionLabel>Plus vendus</SectionLabel>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl">
                Les adjuvants Sika les plus demandes.
              </h2>
            </div>
            <Link to="/produits-sika/" className="inline-flex items-center gap-2 text-sm font-extrabold text-secondary">
              Voir les produits Sika <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BEST_SELLERS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-20 text-white md:px-8 lg:px-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionLabel light>Service NAF Factory</SectionLabel>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">
              Un fournisseur unique pour avancer plus vite.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {TRUST.map((item) => (
              <div key={item.title} className="rounded-lg border border-white/12 bg-white/7 p-6">
                <item.icon className="h-7 w-7 text-white" />
                <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/68">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 md:px-8 lg:px-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-lg border border-border bg-primary p-8 text-white shadow-sm">
            <div>
              <SectionLabel light>Localisation</SectionLabel>
              <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-4xl">
                Sika Ouled Fayet
                <br />
                <span className="text-white/72">(NAF FACTORY)</span>
              </h2>
              <p className="mt-5 leading-7 text-white/76">
                Retrouvez notre point de repere directement sur Google Maps pour preparer votre visite ou partager l'adresse avec votre equipe.
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/j3NhY9vV7qWe49np6"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-extrabold text-primary"
            >
              Ouvrir dans Maps <Navigation className="h-4 w-4" />
            </a>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-secondary/10 text-secondary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-extrabold text-foreground">Sika Ouled Fayet (NAF FACTORY)</p>
                  <p className="text-sm text-muted-foreground">Google Maps integre</p>
                </div>
              </div>
            </div>
            <iframe
              title="Sika Ouled Fayet NAF Factory Google Maps"
              src="https://www.google.com/maps?q=Sika%20Ouled%20Fayet%20(NAF%20FACTORY)&output=embed"
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-4 py-20 md:px-8 lg:px-14">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(135deg,rgba(31,94,255,.10),rgba(7,21,47,.04))] lg:block" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <SectionLabel>Demande commerciale</SectionLabel>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-5xl">
              Construisez votre panier, nous faisons le devis.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              Ajoutez vos produits, renseignez vos coordonnees, et l'equipe NAF Factory revient vers vous avec une proposition adaptee.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/produits" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-extrabold text-white">
                Commencer <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-6 py-3 text-sm font-extrabold text-primary">
                Contact direct
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[Factory, Building2].map((Icon, index) => (
              <div key={index} className="rounded-lg border border-border bg-card p-7 shadow-sm">
                <Icon className="h-8 w-8 text-secondary" />
                <p className="mt-8 font-display text-2xl font-extrabold text-foreground">{index === 0 ? "Chantiers" : "Entreprises"}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{index === 0 ? "Solutions pour renovation, gros oeuvre et finitions." : "Un flux de devis clair pour achats professionnels."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`text-xs font-extrabold uppercase tracking-[0.18em] ${light ? "text-white/62" : "text-secondary"}`}>
      {children}
    </span>
  );
}
