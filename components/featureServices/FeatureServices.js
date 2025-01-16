"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useState } from "react";

const FeaturedServices = () => {
  const tFeaturedServices = useTranslations("featuredServices");
  const [selectedService, setselectedService] = useState(0);
  const services = [
    {
      title: tFeaturedServices("counselingServices.title"),
      desc: tFeaturedServices("counselingServices.description"),
      img: "/images/goldenbrand_stainlesssteel_1725566521572(1).jpeg",
    },
    {
      title: tFeaturedServices("engineeringServices.title"),
      desc: tFeaturedServices("engineeringServices.description"),
      img: "/images/goldenbrand_stainlesssteel_1725566555084.jpeg",
    },
    {
      title: tFeaturedServices("manufactureAndSupply.title"),
      desc: tFeaturedServices("manufactureAndSupply.description"),
      img: "/images/hero2.jpeg",
    },
    {
      title: tFeaturedServices("afterSaleServices.title"),
      desc: tFeaturedServices("afterSaleServices.description"),
      img: "/images/goldenbrand_stainlesssteel_1725566531903.jpeg",
    },
  ];
  return (
    <div className="mt-[70px] overflow-hidden bg-white py-[50px]">
      <ul className="m-auto flex max-w-[715px] flex-wrap gap-y-3 px-6 min-[915px]:max-w-screen-2xl">
        {services.map((item, index) => (
          <li className="w-full px-2 sm:w-1/4" key={index}>
            <button
              onClick={() => {
                setselectedService(index);
              }}
              className={cn(
                "group flex min-h-[45px] w-full flex-col rounded text-center transition-all duration-200 hover:text-[var(--theme)]",
                selectedService === index
                  ? "text-[var(--theme)]"
                  : "text-neutral-400",
              )}
            >
              <h4 className="m-auto text-lg font-semibold">{item.title}</h4>
              <hr
                className={cn(
                  "mt-auto h-[2.5px] w-full border-0 transition-all duration-200 group-hover:bg-[var(--theme)]",
                  selectedService === index
                    ? "bg-[var(--theme)]"
                    : "bg-neutral-300",
                )}
              />
            </button>
          </li>
        ))}
      </ul>

      {services.map((item, index) => (
        <div
          className="mx-auto mt-7 max-w-screen-xl space-y-10 md:mt-10"
          key={index}
        >
          <div
            className={cn(
              "flex-col items-center gap-y-0 space-y-6 p-3 md:flex-row md:space-x-6 md:space-y-0",
              selectedService === index ? "flex" : "hidden",
            )}
          >
            <div className="animate-fadeinleft space-y-10 opacity-0 md:w-1/2">
              <div className="relative mx-auto w-fit font-lato text-xl font-semibold before:absolute before:left-full before:top-0 before:h-10 before:w-10 before:border-b-2 before:border-r-2 before:border-[var(--theme)] before:content-[''] after:absolute after:-left-10 after:-top-2 after:h-10 after:w-10 after:border-l-2 after:border-t-2 after:border-[var(--theme)] after:bg-transparent after:transition-all after:content-[''] lg:text-4xl lg:before:top-3">
                {item.title}
              </div>
              <h3 className="text-3xl font-semibold text-[var(--theme2)]"></h3>
              <p className="mt-4 text-neutral-600">{item.desc}</p>
            </div>
            <div className="animate-fadeinright text-center opacity-0 md:w-1/2">
              <Image
                width={500}
                height={500}
                src={item.img}
                alt={item.title}
                className="w-full rounded shadow-2xl drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedServices;
