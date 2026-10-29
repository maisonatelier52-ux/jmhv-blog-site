import JsonLd from "./components/JsonLd";
import { SITE, getSiteUrl } from "./site-config";

// The portrait, background, header and big name banner are drawn by the persistent
// components in layout.jsx, so they can animate smoothly between pages. This route adds the
// (visually hidden) page heading and intro for screen readers and search engines, plus the
// homepage's structured data.
export default function Home() {
  const url = getSiteUrl();
  return (
    <>
      <h1 className="sr-only">{SITE.name}</h1>
      <p className="sr-only">
        Dive into a career of international banking, finance and leadership, built on long-term
        relationships.
      </p>
      <JsonLd
        graph={[
          {
            "@type": "ProfilePage",
            "@id": `${url}/#webpage`,
            url,
            name: SITE.titleDefault,
            description: SITE.description,
            inLanguage: SITE.language,
            isPartOf: { "@id": `${url}/#website` },
            about: { "@id": `${url}/#person` },
            mainEntity: { "@id": `${url}/#person` },
          },
        ]}
      />
    </>
  );
}
