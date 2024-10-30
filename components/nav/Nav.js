"use client";

import "./Nav.css";

import Menu from "../menu/Menu";
import Image from "next/image";
import React, { useRef, useState } from "react";
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
  const closeButton = useRef(null)
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
          width={220}
          height={0}
          alt="icon"
          loading="lazy"
          onClick={() => {
            // window.location.href = "./";
            router.push("./");
          }}
          className="hover:cursor-pointer"
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
          className="login hover:cursor-pointer"
          onClick={() => {
            // window.location.href = "./my-account";
            router.push("/sign-in");
          }}
        >
          <i className="fa-regular fa-user"></i>
          <span>Sign Up/Sign In</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <button className="cart">
              <span className="material-symbols-outlined">shopping_bag</span>
              <div className="total-number">0</div>
            </button>
          </SheetTrigger>
          <SheetContent className="bg-[var(--tertiary)] w-[230px]"></SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <button className="hidden flex-col justify-center items-center hamburger-menu ml-2">
              <span
                className={`bg-[var(--theme2)] block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isMenuOpen
                        ? "rotate-45 translate-y-1"
                        : "-translate-y-0.5"
                    }`}
              ></span>
              <span
                className={`bg-[var(--theme2)] block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
              ></span>
              <span
                className={`bg-[var(--theme2)] block transition-all duration-300 ease-out 
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
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    router.push("/");
                    setTimeout(() => {
                      closeButton.current.click();
                    }, 1000)
                  }}
                  // href="/"
                >
                  Home
                </a>
              </div>
              <div
                className={`link ${
                  pathname === `/${lng}/services` ? "active" : ""
                }`}
              >
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    router.push("/services");
                    setTimeout(() => {
                      closeButton.current.click();
                    }, 1000)
                  }}
                  // href="/services"
                >
                  Our Services
                </a>
              </div>
              <div
                className={`link ${
                  pathname === `/${lng}/products` ? "active" : ""
                }`}
              >
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    router.push("/products");
                    setTimeout(() => {
                      closeButton.current.click();
                    }, 1000)
                  }}
                  // href="/products"
                >
                  Products
                </a>
              </div>
              <div
                className={`link ${
                  pathname === `/${lng}/about` ? "active" : ""
                }`}
              >
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    router.push("/about");
                    setTimeout(() => {
                      closeButton.current.click();
                    }, 1000)
                  }}
                  // href="/about"
                >
                  About
                </a>
              </div>
              <div
                className={`link ${
                  pathname === `/${lng}/contact` ? "active" : ""
                }`}
              >
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    router.push("/contact");
                    setTimeout(() => {
                      closeButton.current.click();
                    }, 1000)
                  }}
                  // href="/contact"
                >
                  Contact
                </a>
              </div>
            </div>
            <SheetClose>
              <button type="button" className="hidden" ref={closeButton}></button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Nav;
