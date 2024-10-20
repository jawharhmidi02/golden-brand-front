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
      <div
        className="gotop"
        ref={Go_Top}
        onClick={() => {
          handleScroll();
        }}
      >
        <i className="fa-solid fa-chevron-up text-neutral-800"></i>
      </div>
      <Hero lng={lng} />
      <Categories lng={lng} />
    </main>
  );
}
