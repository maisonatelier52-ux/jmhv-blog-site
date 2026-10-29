import "./globals.css";
import Stage from "./components/Stage";
import Header from "./components/Header";
import ContentLayer from "./components/ContentLayer";
import JsonLd from "./components/JsonLd";
import { SITE, getSiteUrl, siteGraph } from "./site-config";

// Site-wide SEO defaults. Pages override what they need (see app/[slug]/page.jsx).
// Images for link previews come from app/opengraph-image.jsx and app/[slug]/opengraph-image.jsx.
export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: SITE.titleDefault, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: SITE.titleDefault,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.titleDefault,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang={SITE.language}>
      <body>
        {/* Structured data: who the site is about + the website itself */}
        <JsonLd graph={siteGraph()} />
        {/* Persistent across routes: static background, homepage name and portrait */}
        <Stage />
        {/* Also persistent: header + content text, so changing page never re-mounts them */}
        <main className="body-font site-shell relative h-[100svh] max-h-[100svh] overflow-hidden text-[#f5f1e7]">
          <Header />
          <ContentLayer />
          {children}
        </main>
      </body>
    </html>
  );
}
