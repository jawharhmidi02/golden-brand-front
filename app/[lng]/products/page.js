"use client";

import Card from "@/components/Card/Card";
import React, { useEffect, useState } from "react";
import FilterInterface from "@/components/FilterInterface/FilterInterface";
import PaginationComp from "@/components/PaginationComp/PaginationComp";
import InputInterface from "@/components/InputInterface/InputInterface";

const ProductPage = ({ searchParams }) => {
  useEffect(() => {
    document.title = "GoldenBrand: Products";
  }, []);
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
      category: "Work Tables",
      price: 1000,
      dimension: "40 x 40mm",
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
      category: "Mobile Tables",
      price: 2000,
      dimension: "50 x 50mm",
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
      category: "Sink Tables",
      price: 3000,
      dimension: "60 x 60mm",
    },
    {
      img: "/images/products/image4.png",
      name: "S. STEEL BASE CABINET WITH 3 LAYER DRAWER",
      desc: ["1.2mmTHK., GR.304, #4 FINISH TOP PLATE, BACKSPLASH, STIFFENERS"],
      category: "Cabinets",
      price: 4000,
      dimension: "70 x 70mm",
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
      category: "Mobile Tables",
      price: 5000,
      dimension: "80 x 80mm",
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
      category: "Sink Tables",
      price: 3000,
      dimension: "90 x 90mm",
    },
  ]);

  return (
    <div className=" px-10 pt-4 justify-center flex flex-row  gap-20">
      <FilterInterface></FilterInterface>
      <div className="flex flex-col max-w-screen-lg gap-4">
        <InputInterface />
        <div className="gap-4 grid grid-cols-3">
          {products?.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
        <PaginationComp />
      </div>
    </div>
  );
};

export default ProductPage;
