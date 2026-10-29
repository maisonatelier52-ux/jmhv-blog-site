import { PAGES } from "./components/pages-data";
import { getSiteUrl } from "./site-config";

// /sitemap.xml — built from pages-data.js, so a new page is listed automatically.
export default function sitemap() {
  const url = getSiteUrl();
  return [{ url }, ...PAGES.map((page) => ({ url: `${url}/${page.slug}` }))];
}
