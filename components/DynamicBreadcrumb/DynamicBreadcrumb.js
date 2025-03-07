"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const staticRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/products",
  "/about",
  "/contact",
  "/gallery",
  "/reset-password",
  "/services",
  "/terms-and-conditions",
];

const routeNames = {
  "/": "Home",
  "/sign-in": "Sign In",
  "/sign-up": "Sign Up",
  "/products": "Products",
  "/about": "About",
  "/contact": "Contact",
  "/gallery": "Gallery",
  "/reset-password": "Reset Password",
  "/services": "Services",
  "/terms-and-conditions": "Terms and Conditions",
};

export default function DynamicBreadcrumb({ locale }) {
  const pathname = usePathname();

  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment, index, arr) => {
      const pathSoFar = `/${arr.slice(0, index + 1).join("/")}`;
      return staticRoutes.includes(pathSoFar) ? pathSoFar : null;
    })
    .filter((path) => path !== null);

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `https://goldenbrandqa.com${locale === "en" ? "" : "/ar"}`,
    },
    ...pathSegments.map((path, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: routeNames[path] || path.replace("/", ""),
      item: `https://goldenbrandqa.com${locale === "en" ? "" : "/ar"}${path}`,
    })),
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
  );
}
