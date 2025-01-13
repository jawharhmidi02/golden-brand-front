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
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { UserAuthContext } from "@/contexts/AuthContext";
import { Skeleton } from "../ui/skeleton";
import { toast } from "@/hooks/use-toast";

const ProductsByCategory = () => {
  const { ChangeUrl } = useContext(UserAuthContext);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [limitCategories, setLimitCategories] = useState(8);
  const [limitProducts, setLimitProducts] = useState(8);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category?page=1&limit=${limitCategories}`,
        {
          method: "GET",
        },
      );

      const data = await res.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setCategories(data.data.data);

      setLoadingCategories(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong, Please Try Again!",
        variant: "destructive",
      });
      setLoadingCategories(false);
    }
    setLoadingCategories(false);
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/search?categories=${categories[selectedCategory].name}&page=1&limit=${limitProducts}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setProducts(data.data.data);

      setLoadingProducts(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed!",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });

      setLoadingProducts(false);
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    if (!loadingCategories) {
      fetchProducts();
    }
  }, [loadingCategories, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="ProductsByCategory m-auto mt-[70px] flex max-w-screen-xl flex-col gap-6 overflow-hidden lg:flex-row lg:gap-0">
      <div className="flex-shrink-0 lg:w-[30%] lg:pl-6">
        <div className="text-center font-lato text-2xl font-semibold lg:text-left lg:text-3xl">
          Products By Category
        </div>
        <div className="mx-4 mt-5 flex flex-row gap-[20px] overflow-x-auto pb-3 min-[890px]:justify-center lg:mx-0 lg:mt-4 lg:flex-col lg:gap-2 lg:pl-2">
          {loadingCategories
            ? Array.from({ length: limitCategories }).map((_, index) => (
                <div
                  className={cn(
                    "flex-shrink-0 rounded-lg p-2 font-semibold transition-all duration-200 hover:cursor-pointer",
                  )}
                  key={index}
                >
                  <Skeleton className={"h-[35px] w-[100px] bg-neutral-300"} />
                </div>
              ))
            : categories.map((category, index) => (
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
            {products.map((product, index) => (
              <CarouselItem
                key={index}
                className="flex basis-1/2 p-0 pl-0 md:basis-1/4 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="flex w-full flex-col items-center gap-y-2 border-[1px] border-neutral-200 p-4 transition-all duration-300">
                  <Image
                    src={product.img}
                    height={80}
                    width={80}
                    alt="product"
                    className="w-[70%]"
                  />
                  <div className="flex flex-col items-center gap-y-1">
                    <div className="text-center text-sm font-semibold">
                      {product.name}
                    </div>
                    <div
                      className="text-center text-sm text-neutral-400 transition-all duration-200 hover:cursor-pointer hover:text-neutral-700"
                      onClick={() => {
                        var cats = {};
                        cats[product.category.name] = true;
                        ChangeUrl(
                          `/en/products?selectedCategories=${encodeURIComponent(
                            JSON.stringify(cats),
                          )}`,
                        );
                      }}
                    >
                      {product.category.name}
                    </div>
                  </div>
                  <div className="mt-auto w-full font-semibold text-[var(--theme)]">
                    ~{product.productsVariants[0].price} QAR{" "}
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <button
                      className="open-product w-full bg-[var(--theme2)] px-4 py-1 text-white transition-all duration-300"
                      onClick={() => {
                        ChangeUrl(`/en/products/${product.id}`);
                      }}
                    />
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
