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

- The pixel-map background animates continuously on its own; mouse position does not drive it.
- The hero portrait is a separate transparent PNG layer.
- The name `Julio Herrera Velutini` flips smoothly every 3 seconds.
- Hovering the name triggers the same flip interaction immediately.
- The cookie/upload controls from the previous version are removed.
- There is no scroll-to-explore button.
- The lower large name banner also uses the 3-second flip animation instead of user scrolling.
