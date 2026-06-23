import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";

await copyFile("dist/index.html", "dist/404.html");

const sikaTitle = "Produits Sika Algérie | Distributeur agréé NAF Factory";
const sikaDescription =
  "Découvrez les produits Sika en Algérie chez NAF Factory, distributeur agréé : étanchéité, mortiers, colles, résines et béton. Demandez un devis.";
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

const sikaFallbackContent = `
    <main id="sika-seo-fallback" style="max-width:80rem;margin:0 auto;padding:3rem 1rem;font-family:Arial,sans-serif;color:#07152f">
      <h1 style="font-size:2.5rem;line-height:1.15;margin:0 0 1rem">${sikaTitle}</h1>
      <p style="font-size:1.1rem;line-height:1.7;max-width:58rem">
        NAF Factory est votre distributeur agréé de produits Sika en Algérie. Découvrez notre catalogue
        de produits Sika pour l'étanchéité, les mortiers, les colles, les résines, le scellement et les solutions béton.
      </p>
      <section>
        <h2>Catalogue de produits Sika disponibles en Algérie</h2>
        <p>
          Les produits Sika proposés par NAF Factory répondent aux besoins des entreprises, artisans et responsables
          de chantier algériens. Retrouvez des solutions Sika pour la pose de carrelage, l'imperméabilisation,
          la réparation du béton, le collage, les mastics, les primaires et les adjuvants.
        </p>
        <h2>Pourquoi choisir un distributeur agréé Sika ?</h2>
        <p>
          En tant que distributeur agréé, NAF Factory vous aide à sélectionner les produits Sika adaptés à votre projet
          en Algérie, à consulter leurs fiches techniques et à préparer une demande de devis claire.
        </p>
        <h2>Demandez votre devis produits Sika à NAF Factory</h2>
        <p>
          Consultez les produits Sika disponibles, choisissez les références nécessaires et contactez NAF Factory
          pour obtenir un devis adapté à votre chantier en Algérie.
        </p>
      </section>
    </main>`;

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
  )
  .replace('<div id="root"></div>', `<div id="root">${sikaFallbackContent}</div>`);

await mkdir("dist/produits-sika", { recursive: true });
await writeFile("dist/produits-sika/index.html", sikaHtml, "utf8");
