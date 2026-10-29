import { getSiteUrl } from "./site-config";

// /robots.txt — open to all crawlers on the live site; preview deployments (e.g. Vercel previews)
// are kept out of search results.
export default function robots() {
  const url = getSiteUrl();
  const isPreview = Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== "production";
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${url}/sitemap.xml`,
  };
}
