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
        "menu mt-4 hidden flex-row items-center gap-8 min-[1260px]:flex",
        orientation == "col" && "flex flex-col items-start gap-7 text-lg",
      )}
    >
      <div>
        <div
          className={cn("link text-neutral-700", pathname === "/" && "active")}
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
            pathname.includes("about") && "active",
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
