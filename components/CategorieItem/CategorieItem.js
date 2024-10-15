"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const CategorieItem = ({ item, changeSelectedCategorie }) => {
  const searchParams = useSearchParams();
  const selectedCategories = searchParams.get("selectedCategories")
    ? JSON.parse(decodeURIComponent(searchParams.get("selectedCategories")))
    : {};
  const [active, setActive] = useState(selectedCategories[item] == true);


  useEffect(() => {
    setActive(selectedCategories[item] == true);
  }, [selectedCategories[item]]);


  return (
    <label
      className={cn(
        "border-2 border-neutral-300 duration-500 transition-colors  hover:bg-neutral-100 text-center font-semibold text-neutral-300 hover:cursor-pointer rounded-md text-xl py-1",
        active
          ? "border-[var(--blue)] text-[var(--blue)] bg-indigo-100 hover:bg-indigo-100"
          : ""
      )}
      onClick={(e) => {
        e.preventDefault();
        setActive(!active);
        changeSelectedCategorie(item);
      }}
    >
      <input type="radio" style={{ display: "none" }} />
      {item}
    </label>
  );
};

export default CategorieItem;
