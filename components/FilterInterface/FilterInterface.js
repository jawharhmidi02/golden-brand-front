import React, { useEffect, useState } from "react";
import SelectInterface from "../SelectInterface/SelectInterface";
import CategorieItem from "../CategorieItem/CategorieItem";
import MultiRangeSlider from "../multiRangeSlider/multiRangeSlider";
import { useSearchParams } from "next/navigation";

const FilterInterface = ({ ChangeUrl }) => {
  const searchParams = useSearchParams();

  const resetFilters = () => {
    ChangeUrl("?", { scroll: false });
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
  
  let selectedCategories = searchParams.get("selectedCategories")
    ? JSON.parse(decodeURIComponent(searchParams.get("selectedCategories")))
    : { ...cats };
  let sortOption = searchParams.get("sortOption") || "nameAsc";
  let minPrice = searchParams.get("minPrice") || 0;
  let maxPrice = searchParams.get("maxPrice") || 50000;
  const changeSelectedCategorie = (categorie) => {
    selectedCategories[categorie] = selectedCategories[categorie]
      ? false
      : true;
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
        <span className="mb-2 text-3xl font-bold text-neutral-600">
          Filters:
        </span>
        <span className="text-xl font-semibold text-neutral-800">Sort</span>
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
        <span className="mt-2 text-xl font-semibold text-neutral-800">
          Price
        </span>
        <MultiRangeSlider
          min={minPrice}
          changePrice={(MIN, MAX) => changePrice(MIN, MAX)}
          max={maxPrice}
        />
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <span className="text-xl font-semibold text-neutral-800">
          Categories
        </span>
        {categories.map((categorie, index) => (
          <CategorieItem
            key={index}
            active={selectedCategories[categorie]}
            changeSelectedCategorie={(categorie) =>
              changeSelectedCategorie(categorie)
            }
            item={categorie}
          ></CategorieItem>
        ))}
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <button
          type="button"
          className="duration-400 w-full rounded-md border-2 border-[var(--theme)] bg-[var(--theme)] py-2 text-xl font-semibold text-white transition-all active:scale-95"
          onClick={() => {
            ChangeUrl(
              `?sortOption=${sortOption}&minPrice=${minPrice}&maxPrice=${maxPrice}&selectedCategories=${encodeURIComponent(
                JSON.stringify(selectedCategories),
              )}`,
              { scroll: false },
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
          className="duration-400 w-full rounded-md border-2 border-[var(--theme)] py-2 text-xl font-semibold text-[var(--theme)] transition-all active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterInterface;
