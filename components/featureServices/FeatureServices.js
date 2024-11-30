"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { useState } from "react";

const FeaturedServices = () => {
  const [selectedService, setselectedService] = useState(0);
  const services = [
    {
      title: "Counseling Services",
      desc: "At Golden Brand Stainless Steel, we understand that every project is unique, and selecting the right products and designs can be a complex process. Our expert counseling services are here to guide you through every step of your project, offering professional advice on selecting the best stainless steel and aluminum products for your specific needs. Whether you're working on a commercial kitchen, handrails, or custom solutions, our team helps you make informed decisions that align with your project goals, budget, and long-term vision.",
      img: "/images/goldenbrand_stainlesssteel_1725566521572(1).jpeg",
    },
    {
      title: "Engineering Services",
      desc: "Our engineering services at Golden Brand Stainless Steel are designed to bring your vision to life with precision and innovation. Our experienced engineers work closely with clients to develop detailed plans and technical drawings that meet exact specifications. Whether you're creating custom stainless steel structures, kitchens, or industrial installations, our engineering team provides solutions that enhance functionality, durability, and aesthetics. We use the latest technology to ensure that every design is both practical and efficient, meeting industry standards and exceeding client expectations.",
      img: "/images/goldenbrand_stainlesssteel_1725566555084.jpeg",
    },
    {
      title: "Manufacture and Supply",
      desc: "Golden Brand Stainless Steel takes pride in manufacturing and supplying top-quality equipment for a wide range of industries. Our products are made from the finest stainless steel and aluminum materials, ensuring durability, hygiene, and resistance to corrosion. From commercial kitchen equipment to custom-made industrial solutions, we offer a broad range of products tailored to meet the specific needs of our clients. Our advanced manufacturing processes and stringent quality control standards guarantee that every piece of equipment we supply meets the highest performance expectations.",
      img: "/images/hero2.jpeg",
    },
    {
      title: "After Sale Services",
      desc: "At Golden Brand Stainless Steel, our commitment to customers doesn’t end with the sale. We offer comprehensive after-sale services to ensure the continued performance and maintenance of our products. Whether you need regular maintenance, repairs, or technical support, our dedicated team is always ready to assist you. We aim to build long-lasting relationships with our clients by providing reliable service that keeps your equipment in optimal condition for years to come.",
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
