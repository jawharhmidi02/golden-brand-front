import "./FastLinks.css";

import { useRef, useEffect } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

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
      Go_Top.current?.classList.add("showGoTop");
    } else {
      Go_Top.current?.classList.remove("showGoTop");
    }
  };

  useEffect(() => {
    window.onscroll = function () {
      check();
    };
  }, []);
  return (
    <div>
      <div
        onClick={() => window.open("https://wa.me/97477480070")}
        className={cn(
          "fixed bottom-5 left-5 z-10 text-5xl hover:cursor-pointer",
        )}
      >
        <Image
          src={"/images/icons/socials/whatsapp.png"}
          height={50}
          width={50}
          className="opacity-80 transition-all duration-500 hover:scale-110 hover:opacity-100"
          alt="whatsapp"
        />
      </div>
      <div
        className="gotop bottom-5 right-5 z-10"
        ref={Go_Top}
        onClick={() => {
          handleScroll();
        }}
      >
        <i className="fa-solid fa-chevron-up text-[var(--theme2)]"></i>
      </div>
    </div>
  );
};

export default FastLinks;
