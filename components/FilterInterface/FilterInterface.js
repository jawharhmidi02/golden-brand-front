import React, { useEffect, useState } from "react";
import SelectInterface from "../SelectInterface/SelectInterface";
import CategorieItem from "../CategorieItem/CategorieItem";
import MultiRangeSlider from "../multiRangeSlider/multiRangeSlider";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const FilterInterface = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resetFilters = () => {
    router.push("?", { scroll: false });
  };
  const [categories, setCategories] = useState([
    "Work Tables",
    "Sink Tables",
    "Cabinets",
    "Shelves & Racks",
    "Hoods",
    "Trolleys",
    "Gratings & Traps",
    "Waste Management",
  ]);
  const cats = {};
  categories.forEach((val) => {
    cats[val] = false;
  });
  let selectedCategories = searchParams.get('selectedCategories') ? JSON.parse(decodeURIComponent(searchParams.get('selectedCategories'))) : { ...cats }; 
  let sortOption = searchParams.get("sortOption") || "nameAsc";
  let minPrice = searchParams.get("minPrice") || 0;
  let maxPrice = searchParams.get("maxPrice") || 50000;
  const changeSelectedCategorie = (categorie) => {
    console.log(selectedCategories)
    selectedCategories[categorie] = !selectedCategories[categorie];
  };
  const changeSortOption = (option) => {
    sortOption = option;
  };
  const changePrice = (MIN, MAX) => {
    minPrice = MIN;
    maxPrice = MAX;
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <span className="font-bold text-2xl mb-2 text-neutral-400">
          Filters:
        </span>
        <span className="font-semibold text-xl text-neutral-800">Sort</span>
        <SelectInterface
          placeHolder="Name: A-Z"
          changeSortOption={(sortOption) => {
            changeSortOption(sortOption);
          }}
          values={[
            ["date", "Date: Newest"],
            ["nameAsc", "Name: A-Z"],
            ["nameDesc", "Name: Z-A"],
            ["priceAsc", "Price: Low to High"],
            ["priceDesc", "Price: High to Low"],
          ]}
        />
        <span className="font-semibold mt-2 text-xl text-neutral-800">
          Price
        </span>
        <MultiRangeSlider
          min={minPrice}
          changePrice={(MIN, MAX) => changePrice(MIN, MAX)}
          max={maxPrice}
        />
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <span className="font-semibold text-xl text-neutral-800">
          Categories
        </span>
        {categories.map((categorie, index) => (
          <CategorieItem
            key={index}
            active={selectedCategories[categorie]}
            changeSelectedCategorie={(categorie) => changeSelectedCategorie(categorie)}
            item={categorie}
          ></CategorieItem>
        ))}
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <button
          type="button"
          className="w-full bg-[var(--blue)] font-semibold rounded-md text-xl py-2 border-2 border-[var(--blue)] text-white transition-all duration-400  active:scale-95"
          onClick={() => {
            router.push(
              `?sortOption=${sortOption}&minPrice=${minPrice}&maxPrice=${maxPrice}&selectedCategories=${encodeURIComponent(JSON.stringify(selectedCategories))}`,
              { scroll: false }
            );
          }}
        >
          Apply
        </button>
        <button
          type="button"
          onClick={() => {
            resetFilters();
          }}
          className="w-full font-semibold rounded-md text-xl py-2 text-[var(--blue)] border-2 border-[var(--blue)] transition-all duration-400  active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterInterface;
