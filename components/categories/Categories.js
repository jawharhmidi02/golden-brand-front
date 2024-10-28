"use client";

import "./Categories.css";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

const Categories = ({ lng }) => {
  const router = useRouter();
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

  const cats = {};
  categories.forEach((val) => {
    cats[val.name] = false;
  });

  return (
    <section className="categories">
      <h1 className="section-title text-3xl">Categories</h1>
      <div className="categories-container w-full flex justify-center items-center">
        <div className="categories-cards max-w-screen-xl w-full px-10">
          <Carousel className="">
            <CarouselContent className="-ml-1">
              {categories.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/5 flex"
                >
                  <div className="p-2 flex-1 flex">
                    <Card
                      className="categorie-card border-[1px] border-neutral-200 shadow-md drop-shadow-md flex-1 flex flex-col"
                      onClick={() => {
                        cats[item.name] = true;
                        // location.href = `/${lng}/products?selectedCategories=${encodeURIComponent(
                        //   JSON.stringify(cats)
                        // )}`;
                        router.push(
                          `/${lng}/products?selectedCategories=${encodeURIComponent(
                            JSON.stringify(cats)
                          )}`
                        );
                      }}
                    >
                      <CardContent className="flex  items-center justify-center p-1">
                        <Image
                          src={item.img}
                          width={200}
                          height={200}
                          alt="Category"
                        />
                      </CardContent>
                      <CardFooter className="flex items-center justify-center flex-col m-auto">
                        <p className="text-lg font-bold first-family fifth-color-primary text-center">
                          {item.name.toUpperCase()}
                        </p>
                        <p className="text-center text-neutral-600 font-semibold font-lato">
                          {item.products_number + " "}Products
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-0 text-xl -left-8" />
            <CarouselNext className="border-0 text-xl -right-8" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Categories;
