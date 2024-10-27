"use client";

// Styles:
import "./page.css";

// Components:

import Hero from "../../components/Hero/Hero";
import Categories from "../../components/categories/Categories";
import { useEffect } from "react";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import LookingForCustom from "@/components/LookingForCustom/LookingForCustom";
import Features from "@/components/features/Features";

export default function Home({ params: { lng } }) {
  useEffect(() => {
    document.title = "GoldenBrand: Home";
  }, []);

  return (
    <main>
      <Hero lng={lng} />
      <Categories lng={lng} />
      <LookingForCustom lng={lng} />
      <FeaturedProducts lng={lng} />
      <Features lng={lng} />
    </main>
  );
}
