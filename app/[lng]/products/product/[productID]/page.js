"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  // const { productID } = useParams();
  const { lng } = useParams();
  const router = useRouter();
  const product = {
    img: "/images/products/image1.png",
    name: "Stainless Steel Work Table Without Undershelf",
    description: [
      "1.0mmTHK., GR.304 #4 FINISH TOP PLATE, BACKSPLASH",
      "1.0MMTHK., GR.304, #4 FINISH, STIFFENERS",
      "40 x 40mm S. STEEL SQUARE TUBE LEG SUPPORT ON ADJUSTABLE BULLET TYPE FEET",
    ],
    category: "Work Tables",
    id: 123456,
    codes: [
      "TBL39B - 7",
      "TBL47B - 7",
      "TBL55B - 7",
      "TBL63B - 7",
      "TBL70B - 7",
      "TBL78B - 7",
      "TBL86B - 7",
      "TBL94B - 7",
    ],
    dimensions: [
      "1000 x 700 x 850 + 100mm",
      "1200 x 700 x 850 + 100mm",
      "1400 x 700 x 850 + 100mm",
      "1600 x 700 x 850 + 100mm",
      "1800 x 700 x 850 + 100mm",
      "2000 x 700 x 850 + 100mm",
      "2200 x 700 x 850 + 100mm",
      "2300 x 700 x 850 + 100mm",
    ],
    legs: ["4", "4", "4", "4", "4", "4", "6", "6"],
    prices: ["1000", "1200", "1400", "1600", "1800", "2000", "2200", "2300"],
  };
  const cat = {};
  cat[product.category] = true;
  return (
    <div className="flex flex-col mx-10 mt-2 justify-center">
      <div className="flex flex-row gap-2 text-center justify-center">
        <div
          onClick={() => router.push("/")}
          className="font-lato text-lg pr-2 text-neutral-400 border-r-2 border-neutral-400 hover:text-neutral-500 hover:border-neutral-500 hover:cursor-pointer transition-all duration-300"
        >
          Home
        </div>
        <div
          onClick={() => router.push(`/${lng}/products?selectedCategories=${encodeURIComponent(JSON.stringify(cat))}`)}
          className="font-lato text-lg pr-2 text-neutral-400 border-r-2 border-neutral-400 hover:text-neutral-500 hover:border-neutral-500 hover:cursor-pointer transition-all duration-300"
        >
          {product.category}
        </div>
        <div className="font-lato font-semibold text-lg text-neutral-800">
          {product.name}
        </div>
      </div>
    </div>
  );
};

export default page;
