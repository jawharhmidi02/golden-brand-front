"use client";
import Card from "@/components/Card/Card";
import React, { useState } from "react";
import FilterInterface from "@/components/FilterInterface/FilterInterface";
import PaginationComp from "@/components/PaginationComp/PaginationComp";
import InputInterface from "@/components/InputInterface/InputInterface";


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
      category: 'Work Tables',
      id: 123456,
      codes: ['TBL39B - 7', 'TBL47B - 7', 'TBL55B - 7', 'TBL63B - 7', 'TBL70B - 7', 'TBL78B - 7', 'TBL86B - 7', 'TBL94B - 7'],
      dimensions: ['1000 x 700 x 850 + 100mm', '1200 x 700 x 850 + 100mm', '1400 x 700 x 850 + 100mm', '1600 x 700 x 850 + 100mm', '1800 x 700 x 850 + 100mm', '2000 x 700 x 850 + 100mm', '2200 x 700 x 850 + 100mm', '2300 x 700 x 850 + 100mm'],
      legs: ['4', '4', '4', '4', '4', '4', '6', '6'],
      prices: ['1000', '1200', '1400', '1600', '1800', '2000', '2200', '2300'],
    },
    // {
    //   img: "/images/products/image2.png",
    //   name: "S. STEEL MOBILE TABLE WITH TWO SHELF",
    //   desc: [
    //     "1.0mmTHK., GR.304, #4 FINISH TOP PLATE, STIFFENER",
    //     "1.2mm THK., GR.304, #4 FINISH BASE PLATE",
    //     "1.0mm THK., GR.304, #4 FINISH MID & UNDERSHELF",
    //     "40 x 40mm S. STEEL SQUARE TUBE LEGS AND BRACING",
    //     "4 RUBBER CASTER WHEEL, ALL SWIVEL, 2 WITH BRAKES",
    //   ],
    //   category: 'Mobile Tables',
    //   price: 2000,
    //   dimension: "50 x 50mm",
    //   id: 654321
    // },
    // {
    //   img: "/images/products/image3.png",
    //   name: "S. STEEL SINGLE BOWL SINK TABLE",
    //   desc: [
    //     "1.2mmTHK., GR.304, #4 FINISH TOP PLATE, BACKSPLASH",
    //     "1.0mmTHK., GR.304, #4 FINISH, STIFFENERS",
    //     "40 x 40mm S. STEEL SQUARE TUBE FOR BRACE AND LEG SUPPORT WITH ADJUSTABLE BULLET TYPE FEET",
    //     "500 x 500 x 300mm S. STEEL SINK",
    //   ],
    //   category: 'Sink Tables',
    //   price: 3000,
    //   dimension: "60 x 60mm",
    //   id: 456789
    // },
    // {
    //   img: "/images/products/image4.png",
    //   name: "S. STEEL BASE CABINET WITH 3 LAYER DRAWER",
    //   desc: ["1.2mmTHK., GR.304, #4 FINISH TOP PLATE, BACKSPLASH, STIFFENERS"],
    //   category: "Cabinets",
    //   price: 4000,
    //   dimension: "70 x 70mm",
    //   id: 987654
    // },
    // {
    //   img: "/images/products/image2.png",
    //   name: "S. STEEL MOBILE TABLE WITH TWO SHELF",
    //   desc: [
    //     "1.0mmTHK., GR.304, #4 FINISH TOP PLATE, STIFFENER",
    //     "1.2mm THK., GR.304, #4 FINISH BASE PLATE",
    //     "1.0mm THK., GR.304, #4 FINISH MID & UNDERSHELF",
    //     "40 x 40mm S. STEEL SQUARE TUBE LEGS AND BRACING",
    //     "4 RUBBER CASTER WHEEL, ALL SWIVEL, 2 WITH BRAKES",
    //   ],
    //   category: "Mobile Tables",
    //   price: 5000,
    //   dimension: "80 x 80mm",
    //   id: 2345
    // },
    // {
    //   img: "/images/products/image3.png",
    //   name: "S. STEEL SINGLE BOWL SINK TABLE",
    //   desc: [
    //     "1.2mmTHK., GR.304, #4 FINISH TOP PLATE, BACKSPLASH",
    //     "1.0mmTHK., GR.304, #4 FINISH, STIFFENERS",
    //     "40 x 40mm S. STEEL SQUARE TUBE FOR BRACE AND LEG SUPPORT WITH ADJUSTABLE BULLET TYPE FEET",
    //     "500 x 500 x 300mm S. STEEL SINK",
    //   ],
    //   category: "Sink Tables",
    //   price: 3000,
    //   dimension: "90 x 90mm",
    //   id: 5432
    // },
  ]);

  return (
    <div className=" px-10 pt-4 justify-center flex flex-row  gap-20">
      <FilterInterface></FilterInterface>
      <div className="flex flex-col max-w-screen-lg gap-4">
        <InputInterface/>
        <div className="gap-4 grid grid-cols-3">
          {products?.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
        <PaginationComp/>
      </div>
    </div>
  );
};

export default ProductPage;
