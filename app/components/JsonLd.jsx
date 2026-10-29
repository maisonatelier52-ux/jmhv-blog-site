/**
 * Renders schema.org structured data (JSON-LD). Server component — the markup is in the HTML
 * that search engines receive. "<" is escaped so the data can never close the script tag.
 */
export default function JsonLd({ graph }) {
  const data = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
