"use client";

import "./ProductsByCategory.css";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ProductsByCategory = ({ lng, ChangeUrl }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [loadingProducts, setloadingProducts] = useState(false);

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

  useEffect(() => {
    setloadingProducts(true);

    setTimeout(() => {
      setloadingProducts(false);
    }, 2000);
  }, [selectedCategory]);
  //
  return (
    <div className="ProductsByCategory m-auto mt-[70px] flex max-w-screen-xl flex-col gap-6 overflow-hidden lg:flex-row lg:gap-0">
      <div className="flex-shrink-0 lg:w-[30%] lg:pl-6">
        <div className="text-center font-lato text-2xl font-semibold lg:text-left lg:text-3xl">
          Products By Category
        </div>
        <div className="mx-4 mt-5 flex flex-row gap-[20px] overflow-x-auto pb-3 min-[890px]:justify-center lg:mx-0 lg:mt-4 lg:flex-col lg:gap-2 lg:pl-2">
          {categories.map((category, index) => (
            <div
              className={cn(
                "w-fit flex-shrink-0 font-lato font-semibold transition-all duration-200 hover:cursor-pointer",
                selectedCategory === index
                  ? "font-bold text-[var(--theme2)]"
                  : "text-neutral-400 hover:text-neutral-500",
              )}
              onClick={() => {
                setSelectedCategory(index);
              }}
              key={index}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "mt-4 w-full delay-0 lg:flex-grow",
          loadingProducts ? "animate-fadeoutdown" : "animate-fadeinup",
        )}
      >
        <Carousel className="w-full flex-1">
          <CarouselContent className="mx-2 w-full flex-1">
            {product.map((item, index) => (
              <CarouselItem
                key={index}
                className="flex basis-1/2 p-0 pl-0 md:basis-1/4 lg:basis-1/3 xl:basis-1/4"
              >
                <div
                  key={index}
                  className="flex w-full flex-col items-center gap-y-2 border-[1px] border-neutral-200 p-4 transition-all duration-300"
                >
                  <Image
                    src={item.img}
                    height={80}
                    width={80}
                    alt="product"
                    className="w-[70%]"
                  />
                  <div className="flex flex-col items-center gap-y-1">
                    <div className="text-center text-sm font-semibold">
                      {item.name}
                    </div>
                    <div
                      className="text-center text-sm text-neutral-400 transition-all duration-200 hover:cursor-pointer hover:text-neutral-700"
                      onClick={() => {
                        var cats = {};
                        cats[item.category] = true;
                        ChangeUrl(
                          `/${lng}/products?selectedCategories=${encodeURIComponent(
                            JSON.stringify(cats),
                          )}`,
                        );
                      }}
                    >
                      {item.category}
                    </div>
                  </div>
                  <div className="mt-auto w-full font-semibold text-[var(--theme)]">
                    ~{item.prices[0]}.00 QAR{" "}
                    <span className="text-[12px] font-normal text-neutral-400">
                      VAT Inclusive
                    </span>
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <button
                      className="open-product w-full bg-[var(--theme2)] px-4 py-1 text-white transition-all duration-300"
                      onClick={() => {
                        ChangeUrl(`/${lng}/products/${item.id}`);
                      }}
                    ></button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-0 border-0 text-xl shadow-lg" />
          <CarouselNext className="-right-0 border-0 text-xl shadow-lg" />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductsByCategory;
