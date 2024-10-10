"use client";

import "./Menu.css";

import { usePathname } from "next/navigation";

const Menu = ({ lng }) => {
  const pathname = usePathname();

  return (
    <div className="menu-container">
      <div className="menu">
        <div className={`link ${pathname === `/${lng}` ? "active" : ""}`}>
          <a href="/">Home</a>
        </div>
        <div
          className={`link ${pathname === `/${lng}/services` ? "active" : ""}`}
        >
          <a href="/services">Our Services</a>
        </div>
        <div
          className={`link ${pathname === `/${lng}/products` ? "active" : ""}`}
        >
          <a href="/products">Products</a>
        </div>
        <div className={`link ${pathname === `/${lng}/blog` ? "active" : ""}`}>
          <a href="/blog">Blog</a>
        </div>
        <div className={`link ${pathname === `/${lng}/about` ? "active" : ""}`}>
          <a href="/about">About</a>
        </div>
        <div
          className={`link ${pathname === `/${lng}/contact` ? "active" : ""}`}
        >
          <a href="/contact">Contact</a>
        </div>
      </div>

      {/* <div className="lang">
        {lng !== "en" ? (
          <a href="#">
            <abbr title="Change to English">English</abbr>
          </a>
        ) : (
          <a href="#">
            <abbr title="Change to Arabic">العربية</abbr>
          </a>
        )}
      </div> */}
    </div>
  );
};

export default Menu;
