import { notFound } from "next/navigation";
import JsonLd from "../components/JsonLd";
import { getPage, PAGE_SLUGS } from "../components/pages-data";
import { SITE, getSiteUrl } from "../site-config";

// Only the pages listed in pages-data.js exist. Anything else is a real 404 (see app/not-found.jsx),
// not a redirect to the homepage — search engines treat those redirects as "soft 404" errors.
export const dynamicParams = false;

// Pre-build every content page at build time.
export function generateStaticParams() {
  return PAGE_SLUGS.map((slug) => ({ slug }));
}

// Each page gets its own title, description, canonical address and link-preview card, all taken
// from pages-data.js. (Setting openGraph / twitter here replaces the layout's, so they are complete.)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  const path = `/${page.slug}`;
  const title = page.label;
  return {
    title,
    description: page.headline,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url: path,
      title: `${title} | ${SITE.name}`,
      description: page.headline,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description: page.headline,
    },
  };
}

// The visible text is rendered by the persistent <ContentLayer /> in layout.jsx.
// This route supplies the real URL, the metadata above and the page's structured data.
export default async function ContentRoute({ params }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  const url = getSiteUrl();
  return (
    <JsonLd
      graph={[
        {
          "@type": "WebPage",
          "@id": `${url}/${page.slug}#webpage`,
          url: `${url}/${page.slug}`,
          name: `${page.label} | ${SITE.name}`,
          description: page.headline,
          inLanguage: SITE.language,
          isPartOf: { "@id": `${url}/#website` },
          about: { "@id": `${url}/#person` },
          breadcrumb: { "@id": `${url}/${page.slug}#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}/${page.slug}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: url },
            { "@type": "ListItem", position: 2, name: page.label, item: `${url}/${page.slug}` },
          ],
        },
      ]}
    />
  );
}
