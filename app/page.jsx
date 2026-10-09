const NAME = "Julio Herrera Velutini";

// The portrait, pixel background, header and big name banner are drawn by the
// persistent components in layout.jsx, so they can animate smoothly between pages.
// This route only contributes the (visually hidden) page heading.
export default function Home() {
  return <h1 className="sr-only">{NAME}</h1>;
}
