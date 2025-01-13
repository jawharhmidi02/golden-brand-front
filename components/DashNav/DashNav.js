"use client";

import { useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashHeader from "../DashHeader/DashHeader";
import DashMenu from "../DashMenu/DashMenu";

const DashNav = () => {
  const closeButton = useRef(null);

  useEffect(() => {
    if (closeButton.current) {
      closeButton.current.click();
    }
  });

  return (
    <div className="relative">
      {/* MOBILE SIDE NAV BELOW  */}

      <div className="flex w-full items-center border-b border-[#2c2d33] bg-transparent p-5 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <i className="fa-solid fa-bars-staggered text-2xl text-white"></i>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[250px] border-transparent bg-[var(--dash-theme)]"
          >
            <SheetTitle></SheetTitle>
            <div
              className={cn(
                "flex flex-col items-center gap-8 bg-transparent py-4",
              )}
            >
              <DashHeader />
              <DashMenu />
            </div>

            <SheetClose className="hidden" ref={closeButton} />
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SIDE NAV BELOW */}

      <div
        className={cn(
          "sticky left-0 top-0 hidden min-h-[100vh] w-[250px] flex-col items-center gap-8 border-r border-[#2c2d33] bg-transparent px-5 py-8 md:flex mr-6",
        )}
      >
        <DashHeader />
        <DashMenu />
      </div>
    </div>
  );
};

export default DashNav;
