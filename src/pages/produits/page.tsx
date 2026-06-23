import { useMemo, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { BadgeCheck, Search, SlidersHorizontal, X } from "lucide-react";
import BrandLogo from "@/components/brand-logo.tsx";
import ProductCard from "@/components/product-card.tsx";
import { BRANDS, PRODUCTS, type Brand } from "@/lib/products.ts";

const ALL_BRANDS: { value: Brand | "all"; label: string }[] = [
  { value: "all", label: "Toutes les marques" },
  { value: "sika", label: "Sika" },
  { value: "terraco", label: "Terraco" },
  { value: "lafarge", label: "Lafarge" },
  { value: "basf", label: "BASF" },
  { value: "decor-boya", label: "Decor Boya" },
  { value: "proseal", label: "Proseal" },
  { value: "victo", label: "Victo" },
];

type ProduitsProps = {
  forcedBrand?: Brand;
};

const SIKA_PRODUCTS_PATH =
  "/produits-sika-algerie-distributeur-agree-naf-factory/";

export default function Produits({ forcedBrand }: ProduitsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const queryBrand = (searchParams.get("marque") as Brand | null) ?? "all";
  const selectedBrand = forcedBrand ?? queryBrand;
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
    if (brand === "sika") {
      navigate(SIKA_PRODUCTS_PATH);
      return;
    }
    if (forcedBrand) {
      navigate(brand === "all" ? "/produits" : `/produits?marque=${brand}`);
      return;
    }
    setSearchParams(brand === "all" ? {} : { marque: brand });
  };

  if (!forcedBrand && queryBrand === "sika") {
    return <Navigate to={SIKA_PRODUCTS_PATH} replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden px-4 py-16 text-white" style={{ background: currentBrand ? `linear-gradient(135deg, ${currentBrand.dark}, ${currentBrand.color})` : "linear-gradient(135deg, #18284b, #2f66d8)" }}>
        {currentBrand && <img src={currentBrand.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-18 mix-blend-screen" />}
        <div className="relative mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white">{currentBrand ? `Univers ${currentBrand.name}` : "Catalogue"}</p>
            <h1 className="font-display text-5xl font-black text-white">
              {forcedBrand === "sika" ? "Produits Sika Algérie | Distributeur agréé NAF Factory" : currentBrand ? currentBrand.name.toUpperCase() : "NOS PRODUITS"}
            </h1>
            <p className="mt-3 max-w-2xl text-white">
              {forcedBrand === "sika"
                ? "NAF Factory est votre distributeur agréé de produits Sika en Algérie pour l'étanchéité, le collage, la réparation, le scellement et les solutions béton."
                : currentBrand
                  ? currentBrand.tagline
                  : "Selection professionnelle Sika, Terraco, Lafarge, BASF, Decor Boya, Proseal et Victo pour chantiers algeriens."}
            </p>
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

        {forcedBrand === "sika" && (
          <section className="mt-16 border-t border-border pt-12" aria-labelledby="sika-expertise-title">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Produits Sika disponibles en Algérie</p>
                <h2 id="sika-expertise-title" className="mt-3 font-display text-3xl font-black text-foreground md:text-4xl">
                  Catalogue de produits Sika pour les chantiers algériens
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
                  <p>
                    NAF Factory est un distributeur agréé de produits Sika en Algérie. Notre catalogue réunit des
                    solutions Sika pour l'étanchéité, la pose de carrelage, la réparation du béton, le scellement,
                    le collage et les adjuvants. Chaque produit Sika dispose d'une page détaillée avec ses formats,
                    ses usages et sa fiche technique officielle lorsqu'elle est disponible.
                  </p>
                  <p>
                    En choisissant NAF Factory pour vos produits Sika en Algérie, vous bénéficiez d'un accompagnement
                    commercial pour identifier la solution adaptée au support, aux contraintes du chantier et au
                    conditionnement recherché. Ajoutez les produits Sika au panier pour transmettre une demande de devis
                    claire à notre équipe.
                  </p>
                  <h3 className="pt-2 font-display text-xl font-black text-foreground">
                    Pourquoi choisir un distributeur agréé Sika en Algérie ?
                  </h3>
                  <p>
                    Un distributeur agréé vous aide à comparer les produits Sika, à consulter les informations techniques
                    et à préparer une commande cohérente. NAF Factory accompagne entreprises, artisans et responsables
                    de chantier en Algérie avec une sélection de produits Sika pour les travaux neufs et la rénovation.
                  </p>
                  <h3 className="pt-2 font-display text-xl font-black text-foreground">
                    Comment choisir le bon produit Sika ?
                  </h3>
                  <p>
                    Le choix dépend d'abord du support et du résultat attendu. Pour un mur ou un sol carrelé, vérifiez
                    le type de carreau, le lieu d'application, la porosité du support et les contraintes d'humidité.
                    Pour une réparation de béton, identifiez la profondeur de reprise, l'état des armatures et
                    l'exposition de l'ouvrage. Pour un scellement ou un collage, précisez les matériaux à assembler,
                    la charge, les mouvements possibles et les conditions de mise en œuvre. Ces informations permettent
                    à NAF Factory de vous orienter vers les produits Sika les plus cohérents avec votre chantier.
                  </p>
                  <h3 className="pt-2 font-display text-xl font-black text-foreground">
                    Produits Sika pour l'étanchéité et la protection
                  </h3>
                  <p>
                    Les travaux d'étanchéité concernent les terrasses, salles d'eau, réservoirs, façades et ouvrages
                    exposés à l'humidité. Le catalogue comprend notamment des hydrofuges, des revêtements cimentaires,
                    des solutions souples et des mastics. Avant de choisir, il faut contrôler la nature du support,
                    les fissures existantes, la pression d'eau et la finition souhaitée. Une préparation correcte reste
                    essentielle : nettoyage, réparation des défauts, traitement des angles et respect des consommations
                    indiquées dans la fiche technique du produit Sika.
                  </p>
                  <h3 className="pt-2 font-display text-xl font-black text-foreground">
                    Colles à carrelage, joints et primaires Sika
                  </h3>
                  <p>
                    Pour la pose de carrelage, les produits Sika couvrent plusieurs besoins : collage intérieur ou
                    extérieur, carreaux de différents formats, supports cimentaires et zones humides. Le primaire sert
                    à régulariser ou renforcer l'adhérence selon le support, tandis que le joint assure la finition et
                    contribue à la durabilité de l'ensemble. Comparez les formats, les couleurs disponibles, le temps
                    ouvert et les conditions d'application avant de commander. Les pages produits de NAF Factory
                    regroupent ces informations pour faciliter votre sélection.
                  </p>
                  <h3 className="pt-2 font-display text-xl font-black text-foreground">
                    Mortiers de réparation, scellement et solutions béton
                  </h3>
                  <p>
                    Les mortiers Sika sont utilisés pour réparer, reproﬁler ou protéger des éléments en béton. Les
                    produits de scellement répondent aux besoins d'ancrage, de calage et de fixation d'équipements.
                    Les adjuvants pour béton permettent d'agir sur l'ouvrabilité, la réduction d'eau, le maintien de
                    consistance ou l'imperméabilisation. Le dosage, le malaxage, la température et la préparation du
                    support doivent respecter la notice officielle. Pour les projets sensibles, transmettez à
                    NAF Factory les dimensions, quantités et contraintes afin d'obtenir une demande de devis précise.
                  </p>
                  <h3 className="pt-2 font-display text-xl font-black text-foreground">
                    Disponibilité, fiches techniques et devis en Algérie
                  </h3>
                  <p>
                    La disponibilité peut varier selon le conditionnement et la référence. Consultez le catalogue,
                    ouvrez la fiche du produit Sika recherché, vérifiez ses formats puis ajoutez-le au panier de devis.
                    Indiquez votre nom, votre société, votre wilaya, les quantités estimées et les délais souhaités.
                    L'équipe NAF Factory pourra alors vous répondre avec une proposition mieux structurée. Pour une
                    demande urgente, utilisez le bouton WhatsApp afin de communiquer directement les informations
                    principales de votre chantier en Algérie.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-foreground">
                  <BadgeCheck className="h-5 w-5 text-secondary" />
                  Gammes Sika disponibles
                </div>
                <ul className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-1">
                  <li>Colles à carrelage et joints</li>
                  <li>Étanchéité et hydrofuges</li>
                  <li>Mortiers de réparation</li>
                  <li>Résines, mastics et scellement</li>
                  <li>Adjuvants et solutions pour béton</li>
                  <li>Primaires et produits d'accrochage</li>
                </ul>
                <a
                  href="https://wa.me/213665129895?text=Bonjour%20NAF%20Factory%2C%20je%20souhaite%20un%20devis%20pour%20des%20produits%20Sika."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex rounded bg-secondary px-5 py-3 text-sm font-black text-white transition-colors hover:bg-secondary/90"
                >
                  Demander un devis Sika
                </a>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
