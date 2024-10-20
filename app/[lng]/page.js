"use client";

// Styles:
import "./page.css";

// Components:

import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import { useEffect, useRef } from "react";

export default function Home({ params: { lng } }) {
  const Go_Top = useRef(null);
  const handleScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const check = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      Go_Top.current.classList.add("showGoTop");
    } else {
      Go_Top.current.classList.remove("showGoTop");
    }
  };

  useEffect(() => {
    document.title = "GoldenBrand: Home";
    window.onscroll = function () {
      check();
    };
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
