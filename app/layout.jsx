import "./globals.css";
import Stage from "./components/Stage";
import Header from "./components/Header";
import ContentLayer from "./components/ContentLayer";

export const metadata = {
  title: "Julio Herrera Velutini",
  description: "An editorial portfolio experience with motion, typography and pixel-driven visuals."
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Persistent across routes: background, portrait and name banner */}
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
