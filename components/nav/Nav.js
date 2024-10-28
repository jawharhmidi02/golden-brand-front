"use client";

import "./Nav.css";

import Menu from "../menu/Menu";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Nav = ({ lng }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  //Handles the opening and closing of our nav
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="max-h-[120px]">
      <div className="left">
        <Image
          src="/images/icon.png"
          width={100}
          height={100}
          alt="icon"
          loading="lazy"
          onClick={() => {
            window.location.href = "./";
          }}
        />
      </div>
      <div>
        {/* <input type="text" placeholder="Search" />
        <div className="select-category">
          Select Category <i className="fa-solid fa-chevron-down"></i>
        </div>
        <button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button> */}
        <Menu lng={lng} />
      </div>
      <div className="right">
        <div
          className="login"
          onClick={() => {
            // window.location.href = "./my-account";
            router.push("./my-account");
          }}
        >
          <i className="fa-regular fa-user"></i>
          <span>Sign Up/Sign In</span>
        </div>
        <div className="cart">
          <span className="material-symbols-outlined">shopping_bag</span>
          <div className="total-number">0</div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <button className="hidden flex-col justify-center items-center hamburger-menu ml-2">
              <span
                className={`bg-[var(--blue)] block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isMenuOpen
                        ? "rotate-45 translate-y-1"
                        : "-translate-y-0.5"
                    }`}
              ></span>
              <span
                className={`bg-[var(--blue)] block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
              ></span>
              <span
                className={`bg-[var(--blue)] block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isMenuOpen
                        ? "-rotate-45 -translate-y-1"
                        : "translate-y-0.5"
                    }`}
              ></span>
            </button>
          </SheetTrigger>
          <SheetContent className="bg-[var(--tertiary)] w-[230px]">
            <div className="menu flex flex-col">
              <div className={`link ${pathname === `/${lng}` ? "active" : ""}`}>
                <a href="/">Home</a>
              </div>
              <div
                className={`link ${
                  pathname === `/${lng}/services` ? "active" : ""
                }`}
              >
                <a href="/services">Our Services</a>
              </div>
              <div
                className={`link ${
                  pathname === `/${lng}/products` ? "active" : ""
                }`}
              >
                <a href="/products">Products</a>
              </div>
              <div
                className={`link ${
                  pathname === `/${lng}/about` ? "active" : ""
                }`}
              >
                <a href="/about">About</a>
              </div>
              <div
                className={`link ${
                  pathname === `/${lng}/contact` ? "active" : ""
                }`}
              >
                <a href="/contact">Contact</a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Nav;
