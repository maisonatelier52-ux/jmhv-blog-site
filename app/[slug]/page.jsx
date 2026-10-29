import { redirect } from "next/navigation";
import { getPage, PAGE_SLUGS } from "../components/pages-data";

// Pre-build every content page at build time. Before, this route was rendered on the
// server on every visit and on every client-side navigation.
export function generateStaticParams() {
  return PAGE_SLUGS.map((slug) => ({ slug }));
}

// Each page gets its own browser-tab title and search description, taken from pages-data.js.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return {
    title: `${page.title} — Julio Herrera Velutini`,
    description: page.headline,
  };
}

// The visible content is rendered by the persistent <ContentLayer /> in layout.jsx.
export default async function ContentRoute({ params }) {
  const { slug } = await params;
  if (!getPage(slug)) redirect("/");
  return null;
}
