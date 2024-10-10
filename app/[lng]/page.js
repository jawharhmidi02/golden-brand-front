"use client";

// Styles:
import "./page.css";

// Components:
import TopHeader from "./home/topHeader/TopHeader";
import Menu from "./home/menu/Menu";
import Nav from "./home/nav/Nav";
import Hero from "./home/Hero/Hero";
import Categories from "./home/categories/Categories";

export default function Home({ params: { lng } }) {
  return (
    <main>
      <TopHeader lng={lng} />
      <Menu lng={lng} />
      <Nav lng={lng} />
      <Hero lng={lng} />
      <Categories lng={lng} />
    </main>
  );
}
