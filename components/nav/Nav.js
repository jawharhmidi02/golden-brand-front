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
  ];

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
          <SheetContent className="bg-[var(--tertiary)] w-[300px] p-0">
            <div className="flex flex-col justify-between  h-full">
              <div className="py-3 border-b-[1px] text-center border-neutral-300">
                <span className="font-lato font-semibold text-2xl text-neutral-800">
                  Shopping Cart
                </span>
              </div>
              <div className="flex flex-col relative overflow-auto flex-1 cart-items-scrollbar w-full">
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
              <div className="flex flex-col gap-2 p-4 border-t-[1px] border-neutral-300">
                <div className="flex flex-row justify-between">
                  <span className="font-lato font-semibold text-xl text-neutral-700">
                    Total:
                  </span>
                  <span className="font-lato text-xl font-semibold text-[var(--theme2)]">
                    6000 QR
                  </span>
                </div>
                <button
                  type="button"
                  className="text-sm text-neutral-700 font-bold  py-3 bg-zinc-200 transition-colors duration-200 hover:bg-zinc-300"
                  onClick={() => {
                    setTimeout(() => closeCartButton.current.click() , 500)
                    router.push('/cart');
                  }}
                >
                  VIEW CART
                </button>
                <button
                  type="button"
                  className="text-sm font-bold py-3 bg-[var(--theme2)] text-[#ffffff] transition-colors duration-200 hover:bg-[var(--theme)] "
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
