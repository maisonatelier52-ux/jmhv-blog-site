/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Browsers keep the optimised portrait for a day (Next's default is only a few hours).
    // If you swap public/person.png, visitors get the new one within that window.
    minimumCacheTTL: 86400
  }
};

export default nextConfig;
