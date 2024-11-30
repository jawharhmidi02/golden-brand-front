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

import { useState } from "react";

const Categories = ({ lng, ChangeUrl }) => {
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
      <div className="categories-container flex w-full items-center justify-center">
        <div className="categories-cards w-full max-w-screen-xl px-10">
          <Carousel className="">
            <CarouselContent className="-ml-1">
              {categories.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="flex pl-1 md:basis-1/2 lg:basis-1/5"
                >
                  <div className="flex flex-1 p-2">
                    <Card
                      className="categorie-card flex flex-1 flex-col border-[1px] border-neutral-200 shadow-md drop-shadow-md"
                      onClick={() => {
                        cats[item.name] = true;
                        ChangeUrl(
                          `/${lng}/products?selectedCategories=${encodeURIComponent(
                            JSON.stringify(cats),
                          )}`,
                        );
                      }}
                    >
                      <CardContent className="flex items-center justify-center p-1">
                        <Image
                          src={item.img}
                          width={200}
                          height={200}
                          alt="Category"
                        />
                      </CardContent>
                      <CardFooter className="m-auto flex flex-col items-center justify-center">
                        <p className="first-family fifth-color-primary text-center text-lg font-bold">
                          {item.name.toUpperCase()}
                        </p>
                        <p className="text-center font-lato font-semibold text-neutral-600">
                          {item.products_number + " "}Products
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-8 border-0 text-xl" />
            <CarouselNext className="-right-8 border-0 text-xl" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Categories;
