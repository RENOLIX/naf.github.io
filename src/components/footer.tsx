import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Share2 } from "lucide-react";
import BrandLogo from "@/components/brand-logo.tsx";
import SiteLogo from "@/components/site-logo.tsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="border-b border-white/10 py-7">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-white/60">Distributeur Officiel</p>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10">
            <BrandLogo brand="sika" className="scale-75" />
            <BrandLogo brand="terraco" className="scale-75" />
            <BrandLogo brand="lafarge" className="scale-75" />
            <BrandLogo brand="basf" className="scale-75" />
            <BrandLogo brand="decor-boya" className="scale-75" />
            <BrandLogo brand="proseal" className="scale-75" />
            <BrandLogo brand="victo" className="scale-75" />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div>
          <SiteLogo className="mb-4" markClassName="h-16" textClassName="text-2xl md:text-3xl" />
          <p className="text-sm leading-relaxed text-white/70">Votre partenaire de confiance pour tous vos besoins en materiaux de construction professionnels.</p>
          <div className="mt-4 flex gap-3">
            {[1, 2, 3].map((item) => (
              <a key={item} href="#" className="grid h-8 w-8 place-items-center rounded bg-white/10 transition-colors hover:bg-white/20" aria-label="reseau social">
                <Share2 className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterLinks title="Navigation" links={[["Accueil", "/"], ["Produits", "/produits"], ["A Propos", "/a-propos"], ["Contact", "/contact"], ["Mon Panier", "/panier"]]} />
        <FooterLinks title="Nos Marques" links={[["Produits Sika", "/produits?marque=sika"], ["Produits Terraco", "/produits?marque=terraco"], ["Produits Lafarge", "/produits?marque=lafarge"], ["Produits BASF", "/produits?marque=basf"], ["Produits Decor Boya", "/produits?marque=decor-boya"], ["Produits Proseal", "/produits?marque=proseal"], ["Produits Victo", "/produits?marque=victo"]]} />

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/50">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Zone Industrielle, Alger, Algerie</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> 0665 12 98 95</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> contact@naf-factory.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-white/50 md:flex-row md:px-6">
          <span>© {year} NAF Factory. Tous droits reserves.</span>
          <span>Distributeur Officiel Sika - Terraco - Lafarge - BASF - Decor Boya - Proseal - Victo</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/50">{title}</h4>
      <ul className="space-y-2">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link to={href} className="text-sm text-white/70 transition-colors hover:text-white">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
