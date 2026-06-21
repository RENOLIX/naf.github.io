import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";

await copyFile("dist/index.html", "dist/404.html");

const sikaTitle = "Produits Sika en Algérie | Distributeur agréé – NAF Factory";
const sikaDescription =
  "Découvrez les produits Sika disponibles en Algérie chez NAF Factory : étanchéité, mortiers, colles, résines, scellement et solutions pour béton. Demandez un devis.";
const sikaCanonical = "https://naf-factory.com/produits-sika/";
const sikaStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      url: sikaCanonical,
      name: sikaTitle,
      description: sikaDescription,
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
          item: sikaCanonical,
        },
      ],
    },
  ],
};

const indexHtml = await readFile("dist/index.html", "utf8");
await mkdir("dist/produits", { recursive: true });
await writeFile("dist/produits/index.html", indexHtml, "utf8");

const sikaHtml = indexHtml
  .replace(/<title>.*?<\/title>/s, `<title>${sikaTitle}</title>`)
  .replace(
    /<meta name="description" content=".*?" \/>/s,
    `<meta name="description" content="${sikaDescription}" />`,
  )
  .replace(
    /<meta property="og:title" content=".*?" \/>/s,
    `<meta property="og:title" content="${sikaTitle}" />`,
  )
  .replace(
    /<meta property="og:description" content=".*?" \/>/s,
    `<meta property="og:description" content="${sikaDescription}" />`,
  )
  .replace(
    "</head>",
    `    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta property="og:url" content="${sikaCanonical}" />
    <meta property="og:locale" content="fr_DZ" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${sikaTitle}" />
    <meta name="twitter:description" content="${sikaDescription}" />
    <link rel="canonical" href="${sikaCanonical}" />
    <link rel="alternate" hreflang="fr-DZ" href="${sikaCanonical}" />
    <script id="page-structured-data" type="application/ld+json">${JSON.stringify(sikaStructuredData).replace(/</g, "\\u003c")}</script>
  </head>`,
  );

await mkdir("dist/produits-sika", { recursive: true });
await writeFile("dist/produits-sika/index.html", sikaHtml, "utf8");
