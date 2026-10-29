import { renderCard } from "./og-card";

export const alt = "Julio Herrera Velutini — international banker and financier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link-preview card for the homepage (also the fallback for X / Twitter).
export default function Image() {
  return renderCard({
    kicker: "BANKING · FINANCE · LEADERSHIP",
    title: "JULIO HERRERA VELUTINI",
    titleSize: 88,
    sub: "A career built on long-term relationships.",
  });
}
