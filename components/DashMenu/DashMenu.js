"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DashMenu = () => {
  const [menuState, setMenuState] = useState(1);
  const router = useRouter();
  const menuTransition = (index, path) => {
    setMenuState(index);
    router.push(`/admin${path}`)
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div
        onClick={() => menuTransition(1, '/')}
        className={cn(
          "w-full rounded-md bg-transparent px-3 py-2.5 text-center text-lg font-semibold text-[var(--dash-theme3)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--dash-theme4)]",
          menuState == 1 &&
            "bg-[var(--dash-theme5)] text-[var(--dash-theme)] hover:bg-[var(--dash-theme6)]",
        )}
      >
        Dashboard
      </div>
      <div
        onClick={() => menuTransition(2, '/profile')}
        className={cn(
          "w-full rounded-md bg-transparent px-3 py-2.5 text-center text-lg font-semibold text-[var(--dash-theme3)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--dash-theme4)]",
          menuState == 2 &&
            "bg-[var(--dash-theme5)] text-[var(--dash-theme)] hover:bg-[var(--dash-theme6)]",
        )}
      >
        Profile
      </div>
      <div
        onClick={() => menuTransition(3, '/add-product')}
        className={cn(
          "w-full rounded-md bg-transparent px-3 py-2.5 text-center text-lg font-semibold text-[var(--dash-theme3)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--dash-theme4)]",
          menuState == 3 &&
            "bg-[var(--dash-theme5)] text-[var(--dash-theme)] hover:bg-[var(--dash-theme6)]",
        )}
      >
        Add Product
      </div>
      <div
        onClick={() => menuTransition(4, '/add-category')}
        className={cn(
          "w-full rounded-md bg-transparent px-3 py-2.5 text-center text-lg font-semibold text-[var(--dash-theme3)] transition-all duration-200 hover:cursor-pointer hover:bg-[var(--dash-theme4)]",
          menuState == 4 &&
            "bg-[var(--dash-theme5)] text-[var(--dash-theme)] hover:bg-[var(--dash-theme6)]",
        )}
      >
        Add Category
      </div>
    </div>
  );
};

export default DashMenu;
