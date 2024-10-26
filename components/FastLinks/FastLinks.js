"use client";

import "./FastLinks.css";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const FastLinks = () => {
  const Go_Top = useRef(null);

  const handleScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const check = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      Go_Top.current.classList.add("showGoTop");
    } else {
      Go_Top.current.classList.remove("showGoTop");
    }
  };

  useEffect(() => {
    document.title = "GoldenBrand: Product";
    window.onscroll = function () {
      check();
    };
  }, []);
  return (
    <div>
      <div
        onClick={() => window.open("https://wa.me/97477480070")}
        className={cn(
          " text-5xl z-10 fixed left-5 bottom-5  hover:cursor-pointer"
        )}
      >
        <Image
          src={"/images/icons/socials/whatsapp.png"}
          height={50}
          width={50}
          className="hover:scale-110 hover:opacity-100 transition-all duration-500 opacity-80"
          alt="whatsapp"
        />
      </div>
      <div
        className="gotop right-5 bottom-5 z-10"
        ref={Go_Top}
        onClick={() => {
          handleScroll();
        }}
      >
        <i className="fa-solid fa-chevron-up text-neutral-800"></i>
      </div>
    </div>
  );
};

export default FastLinks;
