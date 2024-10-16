"use client";

// Styles:
import "./page.css";

// Components:

import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import { useEffect } from "react";

export default function Home({ params: { lng } }) {
  useEffect(() => {
    document.title = "GoldenBrand: Home";
  }, []);
  return (
    <main>
      <Hero lng={lng} />
      <Categories lng={lng} />
    </main>
  );
}
