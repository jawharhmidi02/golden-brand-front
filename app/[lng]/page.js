"use client";

// Styles:
import "./page.css";

// Components:
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/categories/Categories";
import { useEffect, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import LookingForCustom from "@/components/LookingForCustom/LookingForCustom";
import FeatureServices from "@/components/featureServices/FeatureServices";
import ProductsByCategory from "@/components/ProductsByCategory/ProductsByCategory";
import { toast } from "@/hooks/use-toast";

export default function Home({ params: { lng } }) {
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  useEffect(() => {
    document.title = "GoldenBrand: Home";
  }, []);

  return (
    <main>
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
        </div>
      )}
      <Hero
        lng={lng}
        ChangeUrl={(url) => {
          ChangeUrl(url);
        }}
      />
      <Categories
        lng={lng}
        ChangeUrl={(url) => {
          ChangeUrl(url);
        }}
      />
      <LookingForCustom
        lng={lng}
        ChangeUrl={(url) => {
          ChangeUrl(url);
        }}
      />
      <FeaturedProducts
        lng={lng}
        ChangeUrl={(url) => {
          ChangeUrl(url);
        }}
      />
      <FeatureServices lng={lng} />
      <ProductsByCategory
        lng={lng}
        ChangeUrl={(url) => {
          ChangeUrl(url);
        }}
      />
    </main>
  );
}
