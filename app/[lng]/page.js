"use client";

// Styles:
import "./page.css";

// Components:

import Hero from "./home/Hero/Hero";
import Categories from "./home/categories/Categories";

export default function Home({ params: { lng } }) {
  return (
    <main>
      <Hero lng={lng} />
      <Categories lng={lng} />
    </main>
  );
}
