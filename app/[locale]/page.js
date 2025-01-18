"use client";

// Styles:
import "./page.css";

// Packages:
import { useEffect } from "react";

// Components:
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/categories/Categories";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import LookingForCustom from "@/components/LookingForCustom/LookingForCustom";
import FeatureServices from "@/components/featureServices/FeatureServices";
import ProductsByCategory from "@/components/ProductsByCategory/ProductsByCategory";
import SpecialPhotos from "@/components/SpecialPhotos/SpecialPhotos";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home({}) {
  useEffect(() => {
    document.title = "GoldenBrand: Home";
  }, []);

  return (
    <main>
      <Hero />
      <SpecialPhotos />
      <Categories />
      <LookingForCustom />
      <FeaturedProducts />
      <FeatureServices />
      <ProductsByCategory />
      <Testimonials />
    </main>
  );
}
