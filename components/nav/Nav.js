"use client";

import "./Nav.css";

import Menu from "../menu/Menu";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
import { Separator } from "../ui/separator";
import SideCartItem from "../SideCartItem/SideCartItem";

const Nav = ({ lng }) => {
  const router = useRouter();
  const closeButton = useRef(null);
  const closeCartButton = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const items = [
    {
      name: "Work Table",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      id: "123456",
    },
    {
      name: "Work Table",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      id: "123456",
    },
    {
      name: "Work Table",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      id: "123456",
    },
    {
      name: "Work Table",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      id: "123456",
    },
    {
      name: "Work Table",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      id: "123456",
    },
    {
      name: "Work Table",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      id: "123456",
    },
    {
      name: "Work Table",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      id: "123456",
    },
    {
      name: "Work Table",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      id: "123456",
    },
  ];

  
  //Handles the opening and closing of our nav
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={cn("max-h-[120px]")}>
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
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#404040"
                class="bi bi-bag"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#404040"
                class="bi bi-handbag"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z" />
              </svg>
              
              <div className="total-number">0</div>
            </button>
          </SheetTrigger>
          <SheetContent className="w-[300px] bg-[var(--tertiary)] p-0">
            <SheetTitle></SheetTitle>
            <div className="flex h-full flex-col justify-between">
              <div className="border-b-[1px] border-neutral-300 py-3 text-center">
                <span className="font-lato text-2xl font-semibold text-neutral-800">
                  Shopping Cart
                </span>
              </div>
              <div className="cart-items-scrollbar relative flex w-full flex-1 flex-col overflow-auto">
                {items.map((item, index) => (
                  <SideCartItem
                    key={index}
                    name={item.name}
                    dimension={item.dimension}
                    price={item.price}
                    id={item.id}
                    closeButton={closeCartButton}
                    index={index}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2 border-t-[1px] border-neutral-300 p-4">
                <div className="flex flex-row justify-between">
                  <span className="font-lato text-xl font-semibold text-neutral-700">
                    Total:
                  </span>
                  <span className="font-lato text-xl font-semibold text-[var(--theme2)]">
                    6000 QR
                  </span>
                </div>
                <button
                  type="button"
                  className="bg-zinc-200 py-3 text-sm font-bold text-neutral-700 transition-colors duration-200 hover:bg-zinc-300"
                  onClick={() => {
                    setTimeout(() => closeCartButton.current.click(), 500);
                    router.push("/cart");
                  }}
                >
                  VIEW CART
                </button>
                <button
                  type="button"
                  className="bg-[var(--theme2)] py-3 text-sm font-bold text-[#ffffff] transition-colors duration-200 hover:bg-[var(--theme)]"
                  onClick={() => {
                    setTimeout(() => closeCartButton.current.click(), 500);
                    router.push("/checkout");
                  }}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
            <SheetClose>
              <button
                type="button"
                className="hidden"
                ref={closeCartButton}
              ></button>
            </SheetClose>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <button className="hamburger-menu ml-2 hidden flex-col items-center justify-center">
              <span
                className={`block h-0.5 w-6 rounded-sm bg-[var(--theme2)] transition-all duration-300 ease-out ${
                  isMenuOpen ? "translate-y-1 rotate-45" : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`my-0.5 block h-0.5 w-6 rounded-sm bg-[var(--theme2)] transition-all duration-300 ease-out ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 rounded-sm bg-[var(--theme2)] transition-all duration-300 ease-out ${
                  isMenuOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"
                }`}
              ></span>
            </button>
          </SheetTrigger>
          <SheetContent className="w-[230px] bg-[var(--tertiary)]">
            <SheetTitle></SheetTitle>
            <div className="menu flex flex-col">
              <div className={`link ${pathname === `/${lng}` ? "active" : ""}`}>
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    router.push("/");
                    setTimeout(() => {
                      closeButton.current.click();
                    }, 1000);
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
                    }, 1000);
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
                    }, 1000);
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
                    }, 1000);
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
                    }, 1000);
                  }}
                  // href="/contact"
                >
                  Contact
                </a>
              </div>
            </div>
            <SheetClose>
              <button
                type="button"
                className="hidden"
                ref={closeButton}
              ></button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Nav;
