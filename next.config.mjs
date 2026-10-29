/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Browsers keep the optimised portrait for a day (Next's default is only a few hours).
    // If you swap public/person.png, visitors get the new one within that window.
    minimumCacheTTL: 86400
  },
  // One address only: juliohv.com (no www) is permanently redirected to https://www.juliohv.com,
  // matching the canonical links, sitemap and structured data (see app/site-config.js).
  // http -> https is handled by the host (automatic on Vercel / Netlify / Cloudflare).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "juliohv.com" }],
        destination: "https://www.juliohv.com/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
