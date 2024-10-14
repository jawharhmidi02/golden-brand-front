"use client";
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


import FilterInterface from "@/components/FilterInterface/FilterInterface";

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
      <FilterInterface></FilterInterface>
      <div className="flex flex-col gap-4">
        <div className="flex py-1 pr-3 flex-row min-w-full border-2 border-neutral-200 rounded-xl">
          <div className="flex min-w-10 justify-center items-center">
            <i className="fa-solid fa-magnifying-glass text-neutral-300"></i>
          </div>
          <input
            placeholder="Search: Work table, Bowl sink, Cabinet..."
            type="text"
            className="focus:outline-none  min-h-full flex-1"
          ></input>
          <button className="text-neutral-100 bg-[var(--blue)] rounded-lg py-1 px-2.5">
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
