"use client";

import React, { useRef } from "react";
import DashMenu from "../DashMenu/DashMenu";
import { cn } from "@/lib/utils";
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
import DashHeader from "../DashHeader/DashHeader";

const DashNav = () => {
  const closeButton = useRef(null);

  return (
    <div>
      {/* MOBILE SIDE NAV BELOW  */}

      <div className="mb-10 flex w-full items-center border-b border-[#2c2d33] bg-transparent p-5 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <i className="fa-solid fa-bars-staggered text-2xl text-white"></i>
          </SheetTrigger>
          <SheetContent className="w-[250px] border-transparent bg-[var(--dash-theme)]">
            <SheetTitle></SheetTitle>
            <div
              className={cn(
                "flex flex-col items-center gap-8 bg-transparent py-4",
              )}
            >
              <DashHeader />
              <DashMenu closeButton={closeButton} />
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

      {/* DESKTOP SIDE NAV BELOW */}

      <div
        className={cn(
          "mr-10 hidden min-h-[100vh] w-[250px] flex-col items-center gap-8 border-r border-[#2c2d33] bg-transparent px-5 py-8 md:flex",
        )}
      >
        <DashHeader />
        <DashMenu closeButton={closeButton} />
      </div>
    </div>
  );
};

export default DashNav;
