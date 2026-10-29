/**
 * One place for everything SEO-related that is the same across the site.
 * Page-specific titles / descriptions come from app/components/pages-data.js.
 */

export const SITE = {
  name: "Julio Herrera Velutini",
  // Used in the browser-tab title of every page: "<page> | Julio Herrera Velutini"
  titleDefault: "Julio Herrera Velutini | International Banker and Financier",
  description:
    "Julio Herrera Velutini: a career in international banking, finance and leadership, built on long-term relationships.",
  locale: "en_US",
  language: "en",
  themeColor: "#0a0a0a",
};

/**
 * Other official profiles of the same person (used as schema.org "sameAs").
 * Edit freely: add LinkedIn, an official company page, etc. Only list pages that are really his.
 */
export const SAME_AS = [
  "https://en.wikipedia.org/wiki/Julio_Herrera_Velutini",
  "https://www.houseofherrera.com/",
];

/**
 * The public address of the site, with no trailing slash: https + www. Canonical links, the
 * sitemap, Open Graph URLs and structured data are all built from it.
 *
 * To use another address (a staging domain, say), set NEXT_PUBLIC_SITE_URL where the site is built,
 * e.g. NEXT_PUBLIC_SITE_URL=https://staging.example.com
 */
export const DEFAULT_SITE_URL = "https://www.juliohv.com";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

/** schema.org graph shared by every page: the person and the website. */
export function siteGraph() {
  const url = getSiteUrl();
  return [
    {
      "@type": "Person",
      "@id": `${url}/#person`,
      name: SITE.name,
      alternateName: ["Julio M. Herrera Velutini"],
      url,
      image: `${url}/opengraph-image`,
      description: SITE.description,
      jobTitle: "Banker and financier",
      birthDate: "1971-12-15",
      birthPlace: { "@type": "Place", name: "Caracas, Venezuela" },
      nationality: [
        { "@type": "Country", name: "Venezuela" },
        { "@type": "Country", name: "Italy" },
      ],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Central University of Venezuela" },
      knowsAbout: ["International banking", "Finance", "Wealth management", "Brokerage"],
      sameAs: SAME_AS,
    },
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: SITE.language,
      publisher: { "@id": `${url}/#person` },
    },
  ];
}
