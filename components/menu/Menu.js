"use client";

import { cn } from "@/lib/utils";
import "./Menu.css";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Menu = ({ lng }) => {
  const pathname = usePathname();
  const router = useRouter();

  

  return (
    <div className={cn("flex flex-row p-0 justify-center items-center")}>
      <div className={cn("flex flex-row gap-5 text-[var(--fourth-color-primary)] font-montserrat")}>
        <div className={`link ${pathname === `/${lng}` ? "active" : ""}`}>
          <a
            onClick={() => {
              router.push("/");
            }}
            // href="/"
            className="hover:cursor-pointer"
          >
            Home
          </a>
        </div>
        <div
          className={`link ${pathname === `/${lng}/services` ? "active" : ""}`}
        >
          <a
            onClick={() => {
              router.push("/services");
            }}
            // href="/services"
            className="hover:cursor-pointer"
          >
            Our Services
          </a>
        </div>
        <div
          className={`link ${pathname === `/${lng}/products` ? "active" : ""}`}
        >
          <a
            onClick={() => {
              router.push("/products");
            }}
            // href="/products"
            className="hover:cursor-pointer"
          >
            Products
          </a>
        </div>
        <div className={`link ${pathname === `/${lng}/about` ? "active" : ""}`}>
          <a
            onClick={() => {
              router.push("/about");
            }}
            // href="/about"
            className="hover:cursor-pointer"
          >
            About
          </a>
        </div>
        <div
          className={`link ${pathname === `/${lng}/contact` ? "active" : ""}`}
        >
          <a
            onClick={() => {
              router.push("/contact");
            }}
            // href="/contact"
            className="hover:cursor-pointer"
          >
            Contact
          </a>
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
