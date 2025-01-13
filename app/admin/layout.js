import "/public/assets/fontawesome/css/fontawesome.css";
import "/public/assets/fontawesome/css/brands.css";
import "/public/assets/fontawesome/css/solid.css";
import "/public/assets/fontawesome/css/all.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../animations.css";
import "../globals.css";

import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "GoldenBrand: Admin",
  description:
    "GoldenBrand specializes in premium stainless steel kitchens, handrails, and high-quality aluminum products. Offering durable, sleek designs for residential and commercial spaces, we bring precision craftsmanship to every project.",
};

import { Toaster } from "@/components/ui/toaster";
import AdminLayout from "./AdminLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
        <link rel="icon" href="/images/icon.png" />
      </head>
      <body className="bg-[var(--primary)]">
        <AdminLayout>{children}</AdminLayout>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
