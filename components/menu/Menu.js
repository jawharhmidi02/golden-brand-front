"use client";

import "./Menu.css";

import { useContext } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { UserAuthContext } from "@/contexts/AuthContext";

const Menu = ({ orientation }) => {
  const tCommon = useTranslations("common");
  const { ChangeUrl, pathname } = useContext(UserAuthContext);

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
          <a
            onClick={() => {
              ChangeUrl("/");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.home")}
          </a>
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
          <a
            onClick={() => {
              ChangeUrl("/products");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.products")}
          </a>
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
          <a
            onClick={() => {
              ChangeUrl("/services");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.services")}
          </a>
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
          <a
            onClick={() => {
              ChangeUrl("/gallery");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.gallery")}
          </a>
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
          <a
            onClick={() => {
              ChangeUrl("/about");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.about")}
          </a>
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
          <a
            onClick={() => {
              ChangeUrl("/contact");
            }}
            className="hover:cursor-pointer"
          >
            {tCommon("navigation.contact")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
