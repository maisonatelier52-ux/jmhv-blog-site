import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
