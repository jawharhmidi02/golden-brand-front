"use client";

// Styles:
import "./page.css";

// Components:

import Hero from "../../components/Hero/Hero";
import Categories from "../../components/categories/Categories";

export default function Home({ params: { lng } }) {
  return (
    <main>
      <Hero lng={lng} />
      <Categories lng={lng} />
    </main>
  );
}
