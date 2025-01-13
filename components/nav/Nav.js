"use client";

import "./Nav.css";

import Menu from "../menu/Menu";
import Image from "next/image";
import { useEffect, useState, useRef, useContext } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SideCartItem from "../CartItem/SideCartItem";
import Cookies from "js-cookie";
import { UserAuthContext } from "@/contexts/AuthContext";

const Nav = () => {
  const pathname = usePathname();
  const {
    isUserSigned,
    loadingUser,
    userData,
    ChangeUrl,
    setLoadingPage,
    items,
  } = useContext(UserAuthContext);

  const closeButton = useRef(null);
  const closeCartButton = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (productVariant, quantity) => {
    return productVariant.price * quantity;
  };

  const fetchProductById = async (productId) => {
    try {
      console.log(productId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/productsVariants/byid/${productId}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const UpdatePriceFunction = async () => {
    const updatedPrices = {};
    for (let id of Object.keys(items)) {
      const productVariant = await fetchProductById(id);
      updatedPrices[id] = calculateTotalPrice(productVariant, items[id]);
    }
    setTotalPrice(updatedPrices);
  };

  const logout = () => {
    Cookies.remove("access_token");
    setLoadingPage(true);
    location.href = "/sign-in";
  };

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

  useEffect(() => {
    UpdatePriceFunction();
  }, [items]);

  useEffect(() => {
    if (closeButton.current) {
      closeButton.current.click();
    }
    if (closeCartButton.current) {
      closeCartButton.current.click();
    }
    if (closeCartButton.current) {
      closeCartButton.current.click();
    }
  });

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
            ChangeUrl("./");
          }}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="menu mx-auto">
        <Menu />
      </div>
      <div className="right flex flex-row gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => {
                  if (!loadingUser) {
                    if (isUserSigned) {
                      ChangeUrl("/profile");
                    } else {
                      ChangeUrl("/sign-in");
                    }
                  }
                }}
                className={cn(
                  "login hover:cursor-pointer",
                  "flex flex-row items-center gap-2 rounded-lg p-2 text-lg transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-zinc-100",
                  loadingUser && "hover:cursor-not-allowed",
                )}
              >
                <i className="fa-regular fa-user text-2xl min-[500px]:text-xl"></i>
                <span className="hidden min-[800px]:block">
                  {loadingUser ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black"></div>
                    </div>
                  ) : isUserSigned ? (
                    userData.full_name
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")
                  ) : (
                    "Sign In / Sign Up"
                  )}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {loadingUser ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black"></div>
                </div>
              ) : isUserSigned ? (
                "Profile"
              ) : (
                "Login / Register"
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Sheet>
          <SheetTrigger className="cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#404040"
              className="bi bi-handbag"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z" />
            </svg>

            <div className="total-number">{Object.keys(items).length}</div>
          </SheetTrigger>
          <SheetContent className="w-[300px] bg-[var(--tertiary)] p-0">
            <SheetTitle />
            <div className="flex h-full flex-col justify-between">
              <div className="border-b-[1px] border-neutral-300 py-3 text-center">
                <span className="font-lato text-2xl font-semibold text-neutral-800">
                  Shopping Cart
                </span>
              </div>
              <div className="cart-items-scrollbar relative flex w-full flex-1 flex-col overflow-auto">
                {Object.keys(items).map((id, index) => (
                  <SideCartItem
                    key={index}
                    productVariantId={id}
                    quantity={items[id]}
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
                    {sumValues(totalPrice)} QR
                  </span>
                </div>
                <button
                  type="button"
                  className="bg-zinc-200 py-3 text-sm font-bold text-neutral-700 transition-colors duration-200 hover:bg-zinc-300"
                  onClick={() => {
                    ChangeUrl("/cart");
                  }}
                >
                  VIEW CART
                </button>
                <button
                  type="button"
                  className="bg-[var(--theme2)] py-3 text-sm font-bold text-[#ffffff] transition-colors duration-200 hover:bg-[var(--theme)]"
                  onClick={() => {
                    ChangeUrl("/checkout");
                  }}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
            <SheetClose className="hidden" ref={closeCartButton} />
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger className="hamburger-menu ml-2 hidden flex-col items-center justify-center">
            <span
              className={cn(
                "block h-0.5 w-6 rounded-sm bg-[var(--theme2)] transition-all duration-300 ease-out",
              )}
            ></span>
            <span
              className={cn(
                "my-0.5 block h-0.5 w-6 rounded-sm bg-[var(--theme2)] transition-all duration-300 ease-out",
              )}
            ></span>
            <span
              className={cn(
                "block h-0.5 w-6 rounded-sm bg-[var(--theme2)] transition-all duration-300 ease-out",
              )}
            ></span>
          </SheetTrigger>
          <SheetContent className="w-[230px] bg-[var(--tertiary)]">
            <SheetTitle />
            <div className="menu flex flex-col">
              <div className={cn("link", pathname === `/en` && "active")}>
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    ChangeUrl("/");
                  }}
                >
                  Home
                </a>
              </div>
              <div
                className={`link ${
                  pathname === `/en/products` ? "active" : ""
                }`}
              >
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    ChangeUrl("/products");
                  }}
                >
                  Products
                </a>
              </div>
              <div
                className={`link ${
                  pathname === `/en/services` ? "active" : ""
                }`}
              >
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    ChangeUrl("/services");
                  }}
                >
                  Our Services
                </a>
              </div>
              <div
                className={`link ${pathname === `/en/about` ? "active" : ""}`}
              >
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    ChangeUrl("/about");
                  }}
                >
                  About
                </a>
              </div>
              <div
                className={`link ${pathname === `/en/contact` ? "active" : ""}`}
              >
                <a
                  className="hover:cursor-pointer"
                  onClick={() => {
                    ChangeUrl("/contact");
                  }}
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

        {isUserSigned && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => {
                    logout();
                  }}
                  className="flex items-center justify-center rounded-full bg-transparent transition-all duration-200 hover:cursor-pointer md:py-1 md:pl-3 md:hover:scale-110 md:hover:bg-zinc-100"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket text-2xl text-neutral-600"></i>
                </div>
              </TooltipTrigger>
              <TooltipContent>Log out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </nav>
  );
};

export default Nav;
