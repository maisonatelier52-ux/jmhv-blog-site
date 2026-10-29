import { SITE } from "./site-config";

// /manifest.webmanifest — name, colours and icons for browsers and phones (home-screen shortcut).
export default function manifest() {
  return {
    name: SITE.name,
    short_name: "JHV",
    description: SITE.description,
    start_url: "/",
    background_color: SITE.themeColor,
    theme_color: SITE.themeColor,
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
