import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      // Routes from the previous mdwarish.com build that no longer exist.
      { source: "/skills", destination: "/about", permanent: true },
      { source: "/projects/limra-hearing-clinic-crm", destination: "/projects/limra-crm", permanent: true },
      { source: "/projects/limra-hearing-care-crm", destination: "/projects/limra-crm", permanent: true },
      { source: "/projects/inventorypro", destination: "/projects/limra-crm", permanent: true },
      { source: "/projects/futurex-trade", destination: "/projects/futurex-group-corporate-website", permanent: true },
      { source: "/projects/nepal-wood-expo", destination: "/projects/nepal-wood-international-expo", permanent: true },
      { source: "/projects/nepal-buildcon", destination: "/projects/nepal-buildcon-expo", permanent: true },
      { source: "/projects/nepal-power-electric", destination: "/projects/nepal-electric-power-lights-expo", permanent: true },
      { source: "/projects/propack-odisha", destination: "/projects/propack-odisha-expo", permanent: true },
      { source: "/projects/:slug(khilat-ecommerce|kenya-buildcon|india-solar-show|fusionpos)", destination: "/projects", permanent: false },
    ];
  },
};

export default nextConfig;
