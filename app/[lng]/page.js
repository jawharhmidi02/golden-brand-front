// Styles:
import "./page.css";

// Components:

import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";

export default function Home({ params: { lng } }) {
  return (
    <main>
      <Hero lng={lng} />
      <Categories lng={lng} />
    </main>
  );
}
