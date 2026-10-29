# jmhv-blog-dark — Julio Herrera Velutini

Next.js App Router homepage using JavaScript/JSX, Tailwind CSS, and ESLint.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Change the person manually

Replace this file:

```text
public/person.png
```

with your own transparent PNG. No upload UI is used on the page.

The included portrait is a dark monochrome cutout prepared from the supplied source image.

## Behavior

- The background is static black (`.site-bg` in `app/globals.css`). Nothing moves behind the page.
- The portrait has one position on every page, homepage included: right edge, standing on the bottom of
  the screen and lifted by `--person-lift` (in `app/globals.css`). It is a separate transparent PNG layer.
- The homepage shows the name large on the left (`app/components/HomeHero.jsx`). On load the letters rise
  one by one, a light sheen sweeps through them and a hairline draws underneath. Leaving the homepage fades it
  out; coming back plays the intro again. Timing is in `globals.css` under "Homepage hero".
- Content pages show their text on the left (`ContentLayer.jsx`) with the same flowing fade-in as before.
- Layout switches between two modes: "wide" (anything held sideways, width >= 540px) and the single-column
  phone / upright-tablet layout. Use the `wide:` class prefix exactly like Tailwind's `md:`.
- The cookie/upload controls and the scroll-to-explore button from earlier versions are gone.

## Content pages

The text of every content page (label, headline, body, URL) lives in one file:
`app/components/pages-data.js`. Add, remove or reorder entries there; the navigation, the sitemap, the
page titles and the link-preview images all follow it automatically.

## SEO

- **Domain.** The site's address is `https://www.juliohv.com` (https + www), set once in `app/site-config.js`.
  Canonical links, the sitemap, `robots.txt`, Open Graph URLs and structured data all use it, and
  `next.config.mjs` redirects `juliohv.com` (no www) to it permanently. In your host's domain settings, add
  both `www.juliohv.com` and `juliohv.com`, with `www.juliohv.com` as the main one. To build for another
  address (staging), set `NEXT_PUBLIC_SITE_URL=https://staging.example.com` before building.
- Site-wide defaults (title, description, language, `sameAs` profile links) are in `app/site-config.js`.
- Every page has its own title, description, canonical URL, Open Graph / X card and structured data
  (`Person` + `WebSite` on all pages, `ProfilePage` on the homepage, `WebPage` + `BreadcrumbList` on content pages).
- Link-preview images (1200 x 630) are generated at build time from `public/person.png` and the page text
  (`app/opengraph-image.jsx`, `app/[slug]/opengraph-image.jsx`, `app/og-card.jsx`).
- `/sitemap.xml`, `/robots.txt` and `/manifest.webmanifest` are generated. Preview deployments on Vercel are
  hidden from search engines.
- Unknown addresses return a real 404 (`app/not-found.jsx`) instead of redirecting to the homepage.
