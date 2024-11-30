"use client";

import Card from "@/components/Card/Card";
import React, { Suspense, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import FilterInterface from "@/components/FilterInterface/FilterInterface";
import PaginationComp from "@/components/PaginationComp/PaginationComp";
import "./page.css";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProductPage = ({ searchParams }) => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, { ...options });
    });
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  function OpenFilter() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-center rounded-lg bg-[var(--theme)] px-2 lg:hidden"
          >
            <i className="fa-solid fa-filter text-xl text-neutral-100"></i>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[280px] overflow-scroll">
          <SheetTitle></SheetTitle>
          <FilterInterface />
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    );
  }

  const [products, setProducts] = useState([
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
    document.title = "GoldenBrand: Products";
  }, []);
  return (
    <div className="mx-auto mt-6 flex w-full flex-row items-center justify-center gap-20">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
        </div>
      )}
      <div className="mx-5 flex flex-row gap-10 xsm:mx-8 sm:mx-10">
        <div className="hidden lg:flex">
          <Suspense>
            <FilterInterface
              ChangeUr={(url, options = {}) => {
                ChangeUrl(url, options);
              }}
            />
          </Suspense>
        </div>
        <div className="flex max-w-screen-lg flex-col gap-4">
          {/* input interface */}
          <div className="flex min-w-full flex-row gap-1 rounded-xl border-2 border-neutral-200 py-1 pl-3 pr-3 xsm:pl-0">
            <div className="hidden min-w-10 items-center justify-center xsm:flex">
              <i className="fa-solid fa-magnifying-glass text-neutral-100"></i>
            </div>
            <input
              placeholder="Work table, Bowl sink..."
              type="text"
              className="min-h-full flex-1 focus:outline-none"
            ></input>
            <button className="rounded-lg bg-[var(--theme)] px-2.5 py-1 font-raleway text-lg text-neutral-100 transition-all duration-300 hover:scale-95">
              <span className="hidden xsm:block">Search</span>
              <i className="fa-solid fa-magnifying-glass text-neutral-100 xsm:hidden"></i>
            </button>
            <OpenFilter />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products?.map((product, index) => (
              <Card
                key={index}
                product={product}
                ChangeUrl={(url) => {
                  ChangeUrl(url);
                }}
              />
            ))}
          </div>
          {/* <PaginationComp /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
