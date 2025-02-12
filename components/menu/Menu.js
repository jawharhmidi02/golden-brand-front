"use client";

import "./Menu.css";

import { useContext } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { UserAuthContext } from "@/contexts/AuthContext";

const Menu = ({ orientation }) => {
  const tCommon = useTranslations("common");
  const { ChangeUrl, Link, pathname } = useContext(UserAuthContext);

  return (
    <div
      className={cn(
        "menu flex flex-row items-center gap-8",
        orientation == "col" && "mt-4 flex flex-col items-start gap-7 text-lg",
      )}
    >
      <div>
        <div
          className={cn(
            "link text-neutral-700",
            pathname === "/" && "active",
            tCommon("language.lng"),
          )}
        >
          <Link
            href="/"
            onClick={() => {
              ChangeUrl("/");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.home")}
          </Link>
        </div>
      </div>
      <div>
        <div
          className={cn(
            "link text-neutral-700",
            pathname.includes("products") && "active",
            tCommon("language.lng"),
          )}
        >
          <Link
            href="/products"
            onClick={() => {
              ChangeUrl("/products");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.products")}
          </Link>
        </div>
      </div>
      <div>
        <div
          className={cn(
            "link text-neutral-700",
            pathname.includes("services") && "active",
            tCommon("language.lng"),
          )}
        >
          <Link
            href="/services"
            onClick={() => {
              ChangeUrl("/services");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.services")}
          </Link>
        </div>
      </div>
      <div>
        <div
          className={cn(
            "link text-neutral-700",
            pathname.includes("gallery") && "active",
            tCommon("language.lng"),
          )}
        >
          <Link
            href="/gallery"
            onClick={() => {
              ChangeUrl("/gallery");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.gallery")}
          </Link>
        </div>
      </div>
      <div>
        <div
          className={cn(
            "link text-neutral-700",
            pathname.includes("about") && "active",
            tCommon("language.lng"),
          )}
        >
          <Link
            href="/about"
            onClick={() => {
              ChangeUrl("/about");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.about")}
          </Link>
        </div>
      </div>
      <div>
        <div
          className={cn(
            "link text-neutral-700",
            pathname.includes("contact") && "active",
            tCommon("language.lng"),
          )}
        >
          <Link
            href="/contact"
            onClick={() => {
              ChangeUrl("/contact");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.contact")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
