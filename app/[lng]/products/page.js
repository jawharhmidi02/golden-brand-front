"use client";
import { cn } from "@/lib/utils";
import CardPage from "@/components/Card/Card";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DualRangeSliderCustomLabel from "@/components/DualRangeSlider/dual-range-slider-custom-label";

const ProductPage = ({ searchParams }) => {
  const searchQuery = searchParams.search || "";
  const [products, setProducts] = useState([
    {
      img: "/images/products/image1.png",
      name: "S. STEEL WORK TABLE WITHOUT UNDERSHELF",
      desc: [
        "1.0mmTHK., GR.304 #4 FINISH TOP PLATE, BACKSPLASH",
        "1.0MMTHK., GR.304, #4 FINISH, STIFFENERS",
        "40 x 40mm S. STEEL SQUARE TUBE LEG SUPPORT ON ADJUSTABLE BULLET TYPE FEET",
      ],
    },
    {
      img: "/images/products/image2.png",
      name: "S. STEEL MOBILE TABLE WITH TWO SHELF",
      desc: [
        "1.0mmTHK., GR.304, #4 FINISH TOP PLATE, STIFFENER",
        "1.2mm THK., GR.304, #4 FINISH BASE PLATE",
        "1.0mm THK., GR.304, #4 FINISH MID & UNDERSHELF",
        "40 x 40mm S. STEEL SQUARE TUBE LEGS AND BRACING",
        "4 RUBBER CASTER WHEEL, ALL SWIVEL, 2 WITH BRAKES",
      ],
    },
    {
      img: "/images/products/image3.png",
      name: "S. STEEL SINGLE BOWL SINK TABLE",
      desc: [
        "1.2mmTHK., GR.304, #4 FINISH TOP PLATE, BACKSPLASH",
        "1.0mmTHK., GR.304, #4 FINISH, STIFFENERS",
        "40 x 40mm S. STEEL SQUARE TUBE FOR BRACE AND LEG SUPPORT WITH ADJUSTABLE BULLET TYPE FEET",
        "500 x 500 x 300mm S. STEEL SINK",
      ],
    },
    {
      img: "/images/products/image4.png",
      name: "S. STEEL BASE CABINET WITH 3 LAYER DRAWER",
      desc: ["1.2mmTHK., GR.304, #4 FINISH TOP PLATE, BACKSPLASH, STIFFENERS"],
    },
  ]);

  return (
    <div className=" px-10 pt-4 justify-center flex flex-row  gap-20  mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <span className="font-bold text-2xl mb-2 text-neutral-300">
            Filters:
          </span>
          <span className="font-semibold text-xl text-neutral-800">Sort</span>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Name: A-Z" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                <SelectItem value="date">Date: Newest</SelectItem>
                <SelectItem value="nameAsc">Name: A-Z</SelectItem>
                <SelectItem value="nameDesc">Name: Z-A</SelectItem>
                <SelectItem value="priceDesc">Price: High to low</SelectItem>
                <SelectItem value="priceAsc">Price: Low to high</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="font-semibold mt-2 text-xl text-neutral-800">Price</span>
          <DualRangeSliderCustomLabel />
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <span className="font-semibold text-xl text-neutral-800">
            Categories
          </span>
          <label
            className={cn(
              "border-2 border-neutral-300 duration-100 transition-colors  hover:bg-neutral-100 text-center font-semibold text-neutral-300 hover:cursor-pointer rounded-md text-xl py-1"
            )}
          >
            <input type="radio" style={{ display: "none" }} />
            Work Tables
          </label>
          <label
            className={cn(
              "border-2 border-[var(--blue)] bg-blue-50 text-center font-semibold text-[var(--blue)] hover:cursor-pointer rounded-md text-xl py-1"
            )}
          >
            <input type="radio" style={{ display: "none" }} />
            Sink Tables
          </label>
          <label
            className={cn(
              "border-2 border-neutral-300 duration-500 transition-colors  hover:bg-neutral-100 text-center font-semibold text-neutral-300 hover:cursor-pointer rounded-md text-xl py-1"
            )}
          >
            <input type="radio" style={{ display: "none" }} />
            Cabinets
          </label>
          <label
            className={cn(
              "border-2 border-neutral-300 duration-500 transition-colors  hover:bg-neutral-100 text-center font-semibold text-neutral-300 hover:cursor-pointer rounded-md text-xl py-1"
            )}
          >
            <input type="radio" style={{ display: "none" }} />
            Shelves & Racks
          </label>
          <label
            className={cn(
              "border-2 border-neutral-300 duration-500 transition-colors  hover:bg-neutral-100 text-center font-semibold text-neutral-300 hover:cursor-pointer rounded-md text-xl py-1"
            )}
          >
            <input type="radio" style={{ display: "none" }} />
            Hoods
          </label>
          <label
            className={cn(
              "border-2 border-neutral-300 duration-500 transition-colors  hover:bg-neutral-100 text-center font-semibold text-neutral-300 hover:cursor-pointer rounded-md text-xl py-1"
            )}
          >
            <input type="radio" style={{ display: "none" }} />
            Trolleys
          </label>
          <label
            className={cn(
              "border-2 border-neutral-300 duration-500 transition-colors  hover:bg-neutral-100 text-center font-semibold text-neutral-300 hover:cursor-pointer rounded-md text-xl py-1"
            )}
          >
            <input type="radio" style={{ display: "none" }} />
            Gratings & Traps
          </label>
          <label
            className={cn(
              "border-2  border-neutral-300 px-[10px] duration-500 transition-colors  hover:bg-neutral-100 text-center font-semibold text-neutral-300 hover:cursor-pointer rounded-md text-xl py-1"
            )}
          >
            <input type="radio" style={{ display: "none" }} />
            Waste Management
          </label>
          
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <button
            type="button"
            className="w-full bg-[var(--blue)] font-semibold rounded-md text-xl py-2 text-white"
          >
            Apply
          </button>
          <button
            type="button"
            className="w-full font-semibold rounded-md text-xl py-2 text-[var(--blue)]"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 max-w-[58vw]">
        <div className="flex py-1 pr-3 flex-row min-w-full h-[5vh] border-2 border-neutral-200 rounded-xl">
          <div className="flex min-w-10 justify-center items-center">
            <i class="fa-solid fa-magnifying-glass text-neutral-300"></i>
          </div>
          <input
            placeholder="Search: Work table, Bowl sink, Cabinet..."
            type="text"
            className=" focus:outline-none flex-grow-[20] min-h-full"
          ></input>
          <button className="flex-grow-[1] text-neutral-100 bg-[var(--blue)] rounded-lg">
            Search
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {products?.map((product, index) => (
            <CardPage key={index} product={product} />
          ))}
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
