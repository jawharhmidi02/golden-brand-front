import Image from "next/image";
import "./FeaturedProducts.css";

import React, { useState } from "react";

const FeaturedProducts = ({ lng }) => {
  const [product, setproduct] = useState([
    {
      img: "/images/products/image1.png",
      name: "S. STEEL WORK TABLE WITHOUT UNDERSHELF",
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
    },
    {
      img: "/images/products/image2.png",
      name: "S. STEEL MOBILE TABLE WITH TWO SHELF",
      description: [
        "1.0mmTHK., GR.304, #4 FINISH TOP PLATE, STIFFENER",
        "1.2mm THK., GR.304, #4 FINISH BASE PLATE",
        "1.0mm THK., GR.304, #4 FINISH MID & UNDERSHELF",
        "40 x 40mm S. STEEL SQUARE TUBE LEGS AND BRACING",
        "4 RUBBER CASTER WHEEL, ALL SWIVEL, 2 WITH BRAKES",
      ],
      category: "Mobile Tables",
      prices: ["1700", "2040", "2380", "2720", "3060", "3400", "3740", "3910"],
      dimensions: [
        "1000 x 700 x 850mm",
        "1200 x 700 x 850mm",
        "1400 x 700 x 850mm",
        "1600 x 700 x 850mm",
        "1800 x 700 x 850mm",
        "2000 x 700 x 850mm",
        "2200 x 700 x 850mm",
        "2300 x 700 x 850mm",
      ],
      id: 654321,
      codes: [
        "MTBL39MUS - 7",
        "MTBL47MUS - 7",
        "MTBL55MUS - 7",
        "MTBL63MUS - 7",
        "MTBL70MUS - 7",
        "MTBL78MUS - 7",
        "MTBL86MUS - 7",
        "MTBL94MUS - 7",
      ],
    },
    {
      img: "/images/products/image3.png",
      name: "S. STEEL SINGLE BOWL SINK TABLE",
      description: [
        "1.2mmTHK., GR.304, #4 FINISH TOP PLATE, BACKSPLASH",
        "1.0mmTHK., GR.304, #4 FINISH, STIFFENERS",
        "40 x 40mm S. STEEL SQUARE TUBE FOR BRACE AND LEG SUPPORT WITH ADJUSTABLE BULLET TYPE FEET",
        "500 x 500 x 300mm S. STEEL SINK",
      ],
      category: "Sink Tables",
      prices: ["1500", "1800", "2100", "2400", "2700", "3000", "3300", "3450"],
      dimensions: [
        "1000 x 700 x 850 + 100m",
        "1200 x 700 x 850 + 100m",
        "1400 x 700 x 850 + 100m",
        "1600 x 700 x 850 + 100m",
        "1800 x 700 x 850 + 100m",
        "2000 x 700 x 850 + 100m",
        "2200 x 700 x 850 +100m",
        "2300 x 700 x 850 + 100m",
      ],
      legs: ["4", "4", "4", "4", "4", "4", "6", "6"],
      drainer: [
        "LH , RH",
        "LH , RH",
        "LH , RH",
        "LH , RH",
        "LH , RH",
        "LH , RH",
        "LH , RH",
        "LH , RH",
      ],
      id: 456789,
      codes: [
        "SBS39B - 7 1",
        "SBS47B - 7 1",
        "SBS55B - 7 1",
        "SBS63B - 7 1",
        "SBS70B - 7 1",
        "SBS78B - 7 1",
        "SBS86B - 7 1",
        "SBS94B - 7 1",
      ],
    },
    {
      img: "/images/products/image4.png",
      name: "S. STEEL BASE CABINET WITH 3 LAYER DRAWER",
      description: [
        "1.2mmTHK., GR.304, #4 FINISH TOP PLATE, BACKSPLASH, STIFFENERS",
      ],
      category: "Cabinets",
      prices: ["1650", "1800", "2000"],
      dimensions: [
        "400 x 700 x 850mm ",
        "500 x 700 x 850mm ",
        "600 x 700 x 850mm ",
      ],
      legs: ["4", "4", "4"],
      codes: ["3DBC -16 -7", "3DBC -20 -7", "3DBC -24 -7"],
      id: 987654,
    },
    {
      img: "/images/products/image1.png",
      name: "S. STEEL WORK TABLE WITHOUT UNDERSHELF",
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
    },
    {
      img: "/images/products/image2.png",
      name: "S. STEEL MOBILE TABLE WITH TWO SHELF",
      description: [
        "1.0mmTHK., GR.304, #4 FINISH TOP PLATE, STIFFENER",
        "1.2mm THK., GR.304, #4 FINISH BASE PLATE",
        "1.0mm THK., GR.304, #4 FINISH MID & UNDERSHELF",
        "40 x 40mm S. STEEL SQUARE TUBE LEGS AND BRACING",
        "4 RUBBER CASTER WHEEL, ALL SWIVEL, 2 WITH BRAKES",
      ],
      category: "Mobile Tables",
      prices: ["1700", "2040", "2380", "2720", "3060", "3400", "3740", "3910"],
      dimensions: [
        "1000 x 700 x 850mm",
        "1200 x 700 x 850mm",
        "1400 x 700 x 850mm",
        "1600 x 700 x 850mm",
        "1800 x 700 x 850mm",
        "2000 x 700 x 850mm",
        "2200 x 700 x 850mm",
        "2300 x 700 x 850mm",
      ],
      id: 654321,
      codes: [
        "MTBL39MUS - 7",
        "MTBL47MUS - 7",
        "MTBL55MUS - 7",
        "MTBL63MUS - 7",
        "MTBL70MUS - 7",
        "MTBL78MUS - 7",
        "MTBL86MUS - 7",
        "MTBL94MUS - 7",
      ],
    },
    {
      img: "/images/products/image3.png",
      name: "S. STEEL SINGLE BOWL SINK TABLE",
      description: [
        "1.2mmTHK., GR.304, #4 FINISH TOP PLATE, BACKSPLASH",
        "1.0mmTHK., GR.304, #4 FINISH, STIFFENERS",
        "40 x 40mm S. STEEL SQUARE TUBE FOR BRACE AND LEG SUPPORT WITH ADJUSTABLE BULLET TYPE FEET",
        "500 x 500 x 300mm S. STEEL SINK",
      ],
      category: "Sink Tables",
      prices: ["1500", "1800", "2100", "2400", "2700", "3000", "3300", "3450"],
      dimensions: [
        "1000 x 700 x 850 + 100m",
        "1200 x 700 x 850 + 100m",
        "1400 x 700 x 850 + 100m",
        "1600 x 700 x 850 + 100m",
        "1800 x 700 x 850 + 100m",
        "2000 x 700 x 850 + 100m",
        "2200 x 700 x 850 +100m",
        "2300 x 700 x 850 + 100m",
      ],
      legs: ["4", "4", "4", "4", "4", "4", "6", "6"],
      drainer: [
        "LH , RH",
        "LH , RH",
        "LH , RH",
        "LH , RH",
        "LH , RH",
        "LH , RH",
        "LH , RH",
        "LH , RH",
      ],
      id: 456789,
      codes: [
        "SBS39B - 7 1",
        "SBS47B - 7 1",
        "SBS55B - 7 1",
        "SBS63B - 7 1",
        "SBS70B - 7 1",
        "SBS78B - 7 1",
        "SBS86B - 7 1",
        "SBS94B - 7 1",
      ],
    },
    {
      img: "/images/products/image4.png",
      name: "S. STEEL BASE CABINET WITH 3 LAYER DRAWER",
      description: [
        "1.2mmTHK., GR.304, #4 FINISH TOP PLATE, BACKSPLASH, STIFFENERS",
      ],
      category: "Cabinets",
      prices: ["1650", "1800", "2000"],
      dimensions: [
        "400 x 700 x 850mm ",
        "500 x 700 x 850mm ",
        "600 x 700 x 850mm ",
      ],
      legs: ["4", "4", "4"],
      codes: ["3DBC -16 -7", "3DBC -20 -7", "3DBC -24 -7"],
      id: 987654,
    },
  ]);

  const [selectedType, setselectedType] = useState("mostpopular");

  return (
    <div className="flex flex-col items-center featured-product">
      <div className="flex flex-col items-center gap-y-4 lg:flex-row lg:justify-between w-full  max-w-screen-xl">
        <div className="font-semibold text-2xl lg:text-3xl">
          Featured Products
        </div>
        <div className="flex flex-row justify-center gap-6">
          <div
            className={
              selectedType === "newest"
                ? "font-medium text-xl text-black hover:cursor-pointer duration-500 transition-all hover:text-black scale-105 featured-product-link active"
                : "font-medium text-xl text-neutral-400 hover:cursor-pointer duration-500 transition-all hover:text-black hover:scale-105 featured-product-link"
            }
            onClick={() => {
              setselectedType("newest");
            }}
          >
            Newest
          </div>
          <div
            className={
              selectedType === "mostpopular"
                ? "font-medium text-xl text-black hover:cursor-pointer duration-500 transition-all hover:text-black scale-105 featured-product-link active"
                : "font-medium text-xl text-neutral-400 hover:cursor-pointer duration-500 transition-all hover:text-black hover:scale-105 featured-product-link"
            }
            onClick={() => {
              setselectedType("mostpopular");
            }}
          >
            Most Popular
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-3 sm:grid-cols-3 lg:grid-cols-5 max-w-[1200px] mx-3 ">
        {product.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-y-2 p-4 border-neutral-200 border-[1px] transition-all duration-300"
          >
            <Image
              src={item.img}
              height={80}
              width={80}
              alt="product"
              className="w-[70%]"
            />
            <div className="flex flex-col items-center gap-y-1">
              <div className="font-semibold text-sm text-center">
                {item.name}
              </div>
              <div
                className="text-neutral-400 text-center text-sm hover:text-neutral-700 transition-all duration-200 hover:cursor-pointer "
                onClick={() => {
                  var cats = {};
                  cats[item.category] = true;
                  location.href = `/${lng}/products?selectedCategories=${encodeURIComponent(
                    JSON.stringify(cats)
                  )}`;
                }}
              >
                {item.category}
              </div>
            </div>
            <div className="mt-auto font-semibold text-[var(--theme)] w-full">
              ~{item.prices[0]}.00 QAR{" "}
              <span className="text-neutral-400 font-normal text-[12px]">
                VAT Inclusive
              </span>
            </div>
            <div className="flex flex-col items-center w-full">
              <button
                className=" bg-[var(--blue)] text-white px-4 py-1 transition-all duration-300 w-full"
                onClick={() => {
                  location.href = `/${lng}/products/${item.id}`;
                }}
              ></button>
              {/* <p className="text-sm text-neutral-400">ID: {item.id}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
