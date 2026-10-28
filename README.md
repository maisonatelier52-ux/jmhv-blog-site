# Julio Herrera Velutini — Pixel Editorial Homepage

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
