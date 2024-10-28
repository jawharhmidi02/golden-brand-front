"use client";

import "./ProductsByCategory.css";

import React, { useState } from "react";

const ProductsByCategory = () => {
  const [categories, setcategories] = useState([
    {
      id: 1,
      img: "/images/products/image1.png",
      products_number: 10,
      name: "Work Tables",
    },
    {
      id: 2,
      img: "/images/products/image2.png",
      products_number: 20,
      name: "Sink Tables",
    },
    {
      id: 3,
      img: "/images/products/image3.png",
      products_number: 30,
      name: "Cabinets",
    },
    {
      id: 4,
      img: "/images/products/image4.png",
      products_number: 40,
      name: "Shelves & Racks",
    },
    {
      id: 5,
      img: "/images/products/image1.png",
      products_number: 50,
      name: "Hoods",
    },
    {
      id: 6,
      img: "/images/products/image2.png",
      products_number: 60,
      name: "Trolleys",
    },
    {
      id: 7,
      img: "/images/products/image3.png",
      products_number: 70,
      name: "Gratings & Traps",
    },
    {
      id: 8,
      img: "/images/products/image4.png",
      products_number: 80,
      name: "Waste Management",
    },
  ]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div>
        <div className="font-semibold text-2xl lg:text-3xl">
          Featured Products
        </div>
        <div className="">
          {" "}
          {categories.map((category, index) => (
            <div key={index}>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
