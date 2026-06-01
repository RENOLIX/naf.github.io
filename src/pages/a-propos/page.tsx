import { motion } from "motion/react";
import { Award, CheckCircle, MapPin, Target, Users } from "lucide-react";
import BrandLogo from "@/components/brand-logo.tsx";

const TIMELINE = [
  { year: "2008", event: "Creation de NAF Factory a Alger" },
  { year: "2010", event: "Partenariat officiel avec Sika" },
  { year: "2014", event: "Expansion avec l'integration de Terraco" },
  { year: "2018", event: "Distribution Lafarge Algerie" },
  { year: "2023", event: "Ouverture du nouveau depot logistique" },
  { year: "2026", event: "Plateforme catalogue et devis en ligne" },
];
const VALUES = [
  { icon: Award, title: "Qualite", desc: "Produits originaux et selectionnes pour les chantiers exigeants" },
  { icon: Users, title: "Expertise", desc: "Une equipe proche des professionnels de la construction" },
  { icon: Target, title: "Engagement", desc: "Respect des delais et accompagnement jusqu'au devis" },
  { icon: MapPin, title: "Proximite", desc: "Service disponible pour les projets en Algerie" },
];

export default function APropos() {
  return (
    <div className="bg-background">
      <div className="relative overflow-hidden px-4 py-20" style={{ background: "linear-gradient(135deg, #18284b 60%, #2f66d8)" }}>
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white">Notre histoire</p>
          <h1 className="font-display text-5xl font-black text-white md:text-6xl">A PROPOS DE<br /><span className="text-secondary">NAF FACTORY</span></h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white">Depuis 2008, NAF Factory accompagne les professionnels avec des materiaux de construction fiables et un service commercial reactif.</p>
        </div>
      </div>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">Notre Mission</span>
            <h2 className="mb-4 mt-2 font-display text-4xl font-black text-foreground">CONSTRUIRE L'ALGERIE<br />DE DEMAIN</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">NAF Factory distribue des solutions Sika, Terraco et Lafarge pour les entrepreneurs, architectes, artisans et bureaux d'etudes.</p>
            <p className="leading-relaxed text-muted-foreground">Notre objectif est simple: rendre le choix produit plus clair, accelerer les demandes de devis et garder un niveau de service digne des grands chantiers.</p>
          </div>
          <div className="relative">
            <img src="/hero-storefront.png" alt="Facade du magasin NAF Factory" className="h-80 w-full rounded-lg object-cover shadow-xl" />
            <div className="absolute -bottom-4 -left-4 rounded-lg bg-secondary p-4 text-white shadow-lg"><p className="font-display text-3xl font-black">15+</p><p className="text-sm text-white/80">Annees d'expertise</p></div>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center"><span className="text-xs font-bold uppercase tracking-widest text-secondary">Ce qui nous definit</span><h2 className="mt-2 font-display text-4xl font-black text-foreground">NOS VALEURS</h2></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-lg border border-border bg-card p-6 text-center transition-shadow hover:shadow-md">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-lg bg-primary/10"><v.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="mb-2 font-bold text-foreground">{v.title}</h3><p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center"><span className="text-xs font-bold uppercase tracking-widest text-secondary">Notre parcours</span><h2 className="mt-2 font-display text-4xl font-black text-foreground">NOTRE HISTOIRE</h2></div>
          <div className="relative">
            <div className="absolute bottom-0 left-8 top-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="relative flex items-start gap-6 pl-16">
                  <div className="absolute left-4 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-4 border-background bg-primary"><CheckCircle className="h-4 w-4 text-white" /></div>
                  <div className="flex-1 rounded-lg border border-border bg-card p-4"><span className="font-display text-lg font-black text-secondary">{item.year}</span><p className="mt-0.5 font-medium text-foreground">{item.event}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 font-display text-4xl font-black">NOS PARTENAIRES OFFICIELS</h2>
          <p className="mx-auto mb-10 max-w-xl text-white/70">Des partenariats avec des acteurs reconnus des materiaux de construction.</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(["sika", "terraco", "lafarge", "basf", "decor-boya", "proseal", "victo"] as const).map((brand) => (
              <div key={brand} className="rounded-lg border border-white/10 bg-white/10 p-6 transition-colors hover:bg-white/15">
                <div className="mb-4 flex justify-center scale-75"><BrandLogo brand={brand} /></div>
                <p className="text-sm text-white/70">Partenaire produits pour chantiers professionnels</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
