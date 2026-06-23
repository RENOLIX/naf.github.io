import Produits from "@/pages/produits/page.tsx";
import { PRODUCTS } from "@/lib/products.ts";
import { usePageSeo } from "@/hooks/use-page-seo.ts";

const TITLE = "Produits Sika Algérie | Distributeur agréé NAF Factory";
const DESCRIPTION =
  "Découvrez les produits Sika en Algérie chez NAF Factory, distributeur agréé : étanchéité, mortiers, colles, résines et béton. Demandez un devis.";
const CANONICAL = "https://naf-factory.com/produits-sika/";

const sikaProducts = PRODUCTS.filter((product) => product.brand === "sika");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${CANONICAL}#page`,
      url: CANONICAL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "fr-DZ",
      isPartOf: {
        "@type": "WebSite",
        name: "NAF Factory",
        url: "https://naf-factory.com/",
      },
      about: {
        "@type": "Brand",
        name: "Sika",
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: sikaProducts.length,
        itemListElement: sikaProducts.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://naf-factory.com/produits/${product.id}`,
          name: product.name,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://naf-factory.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Produits Sika",
          item: CANONICAL,
        },
      ],
    },
  ],
};

export default function SikaProductsPage() {
  usePageSeo({
    title: TITLE,
    description: DESCRIPTION,
    canonical: CANONICAL,
    jsonLd: structuredData,
  });

  return <Produits forcedBrand="sika" />;
}
