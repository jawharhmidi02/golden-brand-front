import "/public/assets/fontawesome/css/fontawesome.css";
import "/public/assets/fontawesome/css/brands.css";
import "/public/assets/fontawesome/css/solid.css";
import "/public/assets/fontawesome/css/all.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../animations.css";
import "../globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { dir } from "i18next";

import { Toaster } from "@/components/ui/toaster";
import ClientLayout from "./ClientLayout";
import { setRequestLocale } from "next-intl/server";
import Script from "next/script";

export const metadata = {
  title: "GoldenBrand",
  description:
    "GoldenBrand specializes in premium stainless steel kitchens, handrails, and high-quality aluminum products. Offering durable, sleek designs for residential and commercial spaces, we bring precision craftsmanship to every project.",
  keywords:
    "stainless steel fabrication, custom metal work, commercial kitchen equipment, stainless steel kitchens, metal railings, aluminum fabrication, industrial metal solutions",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ManufacturingBusiness",
  name: "GoldenBrand",
  description: metadata.description,
  image: "https://goldenbrandqa.com/images/dash-icon.png",
  url: "https://goldenbrandqa.com",
  areaServed: "Qatar",
  address: {
    "@type": "PostalAddress",
    streetAddress: "910",
    addressLocality: "Birkat Al Awamer",
    addressCountry: "QA",
  },
  serviceType: [
    "Stainless Steel Fabrication",
    "Commercial Kitchen Equipment",
    "Metal Railings",
    "Custom Metal Work",
    "Aluminum Products",
    "counselingServices",
    "engineeringServices",
    "manufactureAndSupply",
    "afterSaleServices",
  ],
  telephone: "+97477480070",
  email: "sales@goldenbrandqa.com",
  sameAs: [
    "https://www.facebook.com/profile.php?id=100090249531663",
    "https://www.tiktok.com/@golden.brand52",
    "https://www.instagram.com/goldenbrand_stainlesssteel/",
    "https://wa.me/97477480070",
  ],
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function RootLayout({ children, params: { locale } }) {
  setRequestLocale(locale);
  const locales = ["en", "ar"];

  if (!locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    if (locale !== "en") {
      try {
        messages = (await import(`../../messages/en.json`)).default;
      } catch (fallbackError) {
        notFound();
      }
    } else {
      notFound();
    }
  }

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lora:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/dash-icon.png" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[var(--primary)]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
