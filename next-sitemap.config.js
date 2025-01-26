const staticRoutes = [
  "/",
  "/about",
  "/cart",
  "/checkout",
  "/checkout/success",
  "/contact",
  "/gallery",
  "/products",
  "/profile",
  "/reset-password",
  "/services",
  "/sign-in",
  "/sign-up",
  "/terms-and-conditions",
];

const getDynamicPaths = async () => {
  try {
    const productsData = require("./products.json");

    return productsData.flatMap((product) =>
      ["en", "ar"].map((locale) => ({
        loc: `/${locale}/products/${product.id}`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.8,
      })),
    );
  } catch (error) {
    console.error("Error generating dynamic paths:", error);
    return [];
  }
};

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONT_URL || "https://www.goldenbrandqa.com",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/api"] },
    ],
  },
  changefreq: "daily",
  priority: 0.7,
  generateSitemap: true,
  sitemapBaseFileName: "sitemap",
  transforms: {
    addDefaultChangefreq: false,
    addLastmod: true,
  },
  outDir: "./public",
  transform: async (config, path) => {
    const locales = ["en", "ar"];

    if (staticRoutes.includes(path)) {
      return locales.map((locale) => ({
        loc: `/${locale}${path}`,
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }));
    }

    return [];
  },
  additionalPaths: async () => {
    const staticLocalePaths = staticRoutes.flatMap((route) =>
      ["en", "ar"].map((locale) => ({
        loc: `/${locale}${route}`,
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })),
    );

    const dynamicPaths = await getDynamicPaths();

    return [...staticLocalePaths, ...dynamicPaths];
  },
};
