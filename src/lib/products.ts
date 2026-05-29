import type { ComponentType } from "react";
import { Droplets, Layers, Paintbrush, Shield, Sparkles, Waves } from "lucide-react";

export type Brand = "sika" | "terraco" | "lafarge";

export type Product = {
  id: string;
  brand: Brand;
  name: string;
  category: string;
  description: string;
  unit: string;
  image: string;
  badge?: string;
  featured?: boolean;
};

export type BrandProfile = {
  name: string;
  color: string;
  accent: string;
  dark: string;
  tagline: string;
  description: string;
  mood: string;
  heroImage: string;
  icon: ComponentType<{ className?: string }>;
};

export const BRANDS: Record<Brand, BrandProfile> = {
  sika: {
    name: "Sika",
    color: "#D8282F",
    accent: "#F5B325",
    dark: "#381411",
    tagline: "Building Trust depuis plus d'un siecle.",
    description: "Chimie de construction, etancheite, collage, scellement et protection du beton.",
    mood: "Rouge chantier, jaune signaletique et cartes techniques tres directes.",
    heroImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80",
    icon: Shield,
  },
  terraco: {
    name: "Terraco",
    color: "#0A35A5",
    accent: "#2F6DFF",
    dark: "#071B5C",
    tagline: "Finitions scandinaves pour facades et interieurs.",
    description: "Enduits decoratifs, facades, ETICS, coatings et solutions de finition eco-responsables.",
    mood: "Bleu technique, lignes franches et presentation corporate.",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    icon: Paintbrush,
  },
  lafarge: {
    name: "Lafarge",
    color: "#16A34A",
    accent: "#111111",
    dark: "#0F1F19",
    tagline: "Ciments, betons et granulats pour ouvrages solides.",
    description: "Solutions cimentaires, mortiers et materiaux lourds pour chantiers structurants.",
    mood: "Vert industriel, noir graphique, blocs robustes et donnees lisibles.",
    heroImage: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=1600&q=80",
    icon: Layers,
  },
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "sikaflex-11fc",
    brand: "sika",
    name: "Sikaflex-11 FC+",
    category: "Collage & Jointoiement",
    description: "Mastic-colle polyurethane multi-usage pour joints elastiques et collages exigeants.",
    unit: "Cartouche 300 ml",
    image: img("photo-1581092160607-ee22621dd758"),
    badge: "Best-seller",
    featured: true,
  },
  {
    id: "sikalatex",
    brand: "sika",
    name: "SikaLatex",
    category: "Adjuvants",
    description: "Resine d'accrochage pour mortiers, reprises de beton et barbotines d'adherence.",
    unit: "Bidon 5 L",
    image: img("photo-1581092918056-0c4c3acd3789"),
    featured: true,
  },
  {
    id: "sikatop-seal",
    brand: "sika",
    name: "SikaTop Seal-107",
    category: "Etancheite",
    description: "Mortier flexible bi-composant pour impermeabilisation des ouvrages beton.",
    unit: "Kit 25 kg",
    image: img("photo-1621905252507-b35492cc74b4"),
  },
  {
    id: "sikadur-31",
    brand: "sika",
    name: "Sikadur-31 CF",
    category: "Reparation",
    description: "Colle epoxy structurale pour scellement, collage et reparation technique.",
    unit: "Kit 1.2 kg",
    image: img("photo-1589939705384-5185137a7f0f"),
  },
  {
    id: "terraco-handycoat",
    brand: "terraco",
    name: "Handycoat Interior",
    category: "Enduits Interieurs",
    description: "Enduit pret a l'emploi pour murs interieurs, finition fine et application rapide.",
    unit: "Seau 25 kg",
    image: img("photo-1618221195710-dd6b41faaea6"),
    badge: "Finition",
    featured: true,
  },
  {
    id: "terracoat-excel",
    brand: "terraco",
    name: "Terracoat Excel",
    category: "Facade",
    description: "Revetement decoratif haute resistance pour facades exposees.",
    unit: "Seau 25 kg",
    image: img("photo-1600566753151-384129cf4e3e"),
    featured: true,
  },
  {
    id: "terrafix-w11",
    brand: "terraco",
    name: "Terrafix W11",
    category: "Colles Carrelage",
    description: "Colle cimentaire polyvalente pour carrelage interieur et exterieur.",
    unit: "Sac 25 kg",
    image: img("photo-1503387762-592deb58ef4e"),
  },
  {
    id: "terraco-flexicoat",
    brand: "terraco",
    name: "Flexicoat",
    category: "Etancheite",
    description: "Membrane liquide elastique pour toitures, terrasses et zones humides.",
    unit: "Seau 20 kg",
    image: img("photo-1600585154340-be6161a56a0c"),
  },
  {
    id: "lafarge-ciment",
    brand: "lafarge",
    name: "Ciment Portland CPJ",
    category: "Ciment",
    description: "Ciment performant pour beton arme, fondations et travaux courants.",
    unit: "Sac 50 kg",
    image: img("photo-1590496793929-36417d3117de"),
    badge: "Chantier",
    featured: true,
  },
  {
    id: "lafarge-mortier",
    brand: "lafarge",
    name: "Mortier Pret a Gacher",
    category: "Mortiers",
    description: "Mortier sec industriel pour maconnerie, scellement et petits travaux.",
    unit: "Sac 25 kg",
    image: img("photo-1541888946425-d81bb19240f5"),
    featured: true,
  },
  {
    id: "lafarge-beton",
    brand: "lafarge",
    name: "Beton Pret a l'Emploi",
    category: "Beton",
    description: "Formulation adaptee aux dalles, poteaux, ouvrages et coulage sur chantier.",
    unit: "m3 sur devis",
    image: img("photo-1504307651254-35680f356dfd"),
  },
  {
    id: "lafarge-granulats",
    brand: "lafarge",
    name: "Granulats Concasses",
    category: "Granulats",
    description: "Granulats calibres pour beton, routes, drainage et amenagements exterieurs.",
    unit: "Tonne",
    image: img("photo-1572981779307-38b8cabb2407"),
  },
];

export const CATEGORY_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "Collage & Jointoiement": Sparkles,
  Adjuvants: Droplets,
  Etancheite: Waves,
  Reparation: Shield,
  "Enduits Interieurs": Paintbrush,
  Facade: Paintbrush,
  "Colles Carrelage": Layers,
  Ciment: Layers,
  Mortiers: Layers,
  Beton: Layers,
  Granulats: Layers,
};
