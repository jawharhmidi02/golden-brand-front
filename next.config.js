const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./app/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/about",
        destination: "/",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol:
          process.env.NEXT_PUBLIC_FRONT_URL === "http://localhost:3000"
            ? "http"
            : "https",
        hostname: process.env.NEXT_PUBLIC_FRONT_URL || "goldenbrandqa.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],

    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ["image/webp"],
  },
};

module.exports = withNextIntl(nextConfig);
