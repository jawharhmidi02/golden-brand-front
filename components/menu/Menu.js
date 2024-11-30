"use client";

import { cn } from "@/lib/utils";
import "./Menu.css";

import { usePathname } from "next/navigation";

const Menu = ({ lng, ChangeUrl }) => {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-row items-center justify-center p-0")}>
      <div
        className={cn(
          "flex flex-row gap-5 font-montserrat text-[var(--fourth-color-primary)]",
        )}
      >
        <div className={`link ${pathname === `/${lng}` ? "active" : ""}`}>
          <a
            onClick={() => {
              ChangeUrl("/");
            }}
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
              ChangeUrl("/services");
            }}
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
              ChangeUrl("/products");
            }}
            className="hover:cursor-pointer"
          >
            Products
          </a>
        </div>
        <div className={`link ${pathname === `/${lng}/about` ? "active" : ""}`}>
          <a
            onClick={() => {
              ChangeUrl("/about");
            }}
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
              ChangeUrl("/contact");
            }}
            className="hover:cursor-pointer"
          >
            Contact
          </a>
        </div>
      </div>

      {/* <div className="lang">
        {lng !== "en" ? (
            <abbr title="Change to English">English</abbr>
          </a>
        ) : (
            <abbr title="Change to Arabic">العربية</abbr>
          </a>
        )}
      </div> */}
    </div>
  );
};

export default Menu;
