import { useEffect } from "react";

const DEFAULT_TITLE = "NAF Factory | Distributeur Sika Terraco Lafarge";
const DEFAULT_DESCRIPTION =
  "NAF Factory, distributeur professionnel Sika, Terraco et Lafarge en Algerie.";

type PageSeo = {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: Record<string, unknown>;
};

function setMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    const [name, property] = attribute.split("=");
    element.setAttribute(name, property);
    document.head.appendChild(element);
  }

  element.content = value;
}

export function usePageSeo({ title, description, canonical, jsonLd }: PageSeo) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "name=description", description);
    setMeta('meta[property="og:title"]', "property=og:title", title);
    setMeta('meta[property="og:description"]', "property=og:description", description);
    setMeta('meta[property="og:url"]', "property=og:url", canonical);
    setMeta('meta[name="twitter:title"]', "name=twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name=twitter:description", description);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    if (jsonLd) {
      let structuredData = document.head.querySelector<HTMLScriptElement>("#page-structured-data");
      if (!structuredData) {
        structuredData = document.createElement("script");
        structuredData.id = "page-structured-data";
        structuredData.type = "application/ld+json";
        document.head.appendChild(structuredData);
      }
      structuredData.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('meta[name="description"]', "name=description", DEFAULT_DESCRIPTION);
      setMeta('meta[property="og:title"]', "property=og:title", "NAF Factory");
      setMeta(
        'meta[property="og:description"]',
        "property=og:description",
        "Materiaux de construction professionnels en Algerie.",
      );
      document.head.querySelector('meta[property="og:url"]')?.remove();
      document.head.querySelector('meta[name="twitter:title"]')?.remove();
      document.head.querySelector('meta[name="twitter:description"]')?.remove();
      document.head.querySelector('link[rel="canonical"]')?.remove();
      document.head.querySelector("#page-structured-data")?.remove();
    };
  }, [canonical, description, jsonLd, title]);
}
