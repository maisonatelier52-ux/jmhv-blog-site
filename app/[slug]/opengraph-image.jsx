import { getPage, PAGE_SLUGS } from "../components/pages-data";
import { renderCard } from "../og-card";

export const alt = "Julio Herrera Velutini";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PAGE_SLUGS.map((slug) => ({ slug }));
}

// One link-preview card per content page: its label and headline from pages-data.js.
export default async function Image({ params }) {
  const { slug } = await params;
  const page = getPage(slug);
  return renderCard({
    kicker: page ? `${page.number} — ${page.label}`.toUpperCase() : "JULIO HERRERA VELUTINI",
    title: page ? page.headline.toUpperCase() : "JULIO HERRERA VELUTINI",
    titleSize: 42,
    footer: "JULIO HERRERA VELUTINI",
  });
}
