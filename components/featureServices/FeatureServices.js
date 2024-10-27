"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { useState } from "react";

const FeaturedServices = () => {
  const [selectedService, setselectedService] = useState(0);
  return (
    <div className="my-[70px] py-[50px] bg-white">
      <ul className="flex flex-wrap px-6 gap-y-3 max-w-screen-2xl m-auto">
        <li className="w-full sm:w-1/4 px-2">
          <button
            onClick={() => {
              setselectedService(0);
            }}
            className={cn(
              "flex flex-col w-full text-center min-h-[45px] rounded transition-all duration-200 hover:text-[var(--theme)] group",
              selectedService === 0 ? "text-[var(--theme)]" : "text-neutral-400"
            )}
          >
            <h4 className="text-lg font-semibold m-auto">
              Counseling Services
            </h4>
            <hr
              className={cn(
                "mt-auto border-0 h-[2.5px] w-full group-hover:bg-[var(--theme)] transition-all duration-200",
                selectedService === 0 ? "bg-[var(--theme)]" : "bg-neutral-300"
              )}
            />
          </button>
        </li>

        <li className="w-full sm:w-1/4 px-2">
          <button
            onClick={() => {
              setselectedService(1);
            }}
            className={cn(
              "flex flex-col w-full text-center min-h-[45px] rounded transition-all duration-200 hover:text-[var(--theme)] group",
              selectedService === 1 ? "text-[var(--theme)]" : "text-neutral-400"
            )}
          >
            <h4 className="text-lg font-semibold m-auto">
              Engineering Services
            </h4>
            <hr
              className={cn(
                "mt-auto border-0 h-[2.5px] w-full group-hover:bg-[var(--theme)] transition-all duration-200",
                selectedService === 1 ? "bg-[var(--theme)]" : "bg-neutral-300"
              )}
            />
          </button>
        </li>
        <li className="w-full sm:w-1/4 px-2">
          <button
            onClick={() => {
              setselectedService(2);
            }}
            className={cn(
              "flex flex-col w-full text-center min-h-[45px] rounded transition-all duration-200 hover:text-[var(--theme)] group",
              selectedService === 2 ? "text-[var(--theme)]" : "text-neutral-400"
            )}
          >
            <h4 className="text-lg font-semibold m-auto">
              Manufacture and Supply of Equipment
            </h4>
            <hr
              className={cn(
                "mt-auto border-0 h-[2.5px] w-full group-hover:bg-[var(--theme)] transition-all duration-200",
                selectedService === 2 ? "bg-[var(--theme)]" : "bg-neutral-300"
              )}
            />
          </button>
        </li>
        <li className="w-full sm:w-1/4 px-2">
          <button
            onClick={() => {
              setselectedService(3);
            }}
            className={cn(
              "flex flex-col w-full text-center min-h-[45px] rounded transition-all duration-200 hover:text-[var(--theme)] group",
              selectedService === 3 ? "text-[var(--theme)]" : "text-neutral-400"
            )}
          >
            <h4 className="text-lg font-semibold m-auto">
              After Sale Services
            </h4>
            <hr
              className={cn(
                "mt-auto border-0 h-[2.5px] w-full group-hover:bg-[var(--theme)] transition-all duration-200",
                selectedService === 3 ? "bg-[var(--theme)]" : "bg-neutral-300"
              )}
            />
          </button>
        </li>
      </ul>

      <div className="md:mt-10 space-y-10 max-w-screen-xl mx-auto">
        <div
          className={cn(
            "flex-col p-3 gap-y-0 md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 animate-fadeinup opacity-0",
            selectedService === 0 ? "flex" : "hidden"
          )}
        >
          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold text-[var(--blue)]">
              Counseling Services
            </h3>
            <p className="italic mt-4 text-slate-500">
              At Golden Brand Stainless Steel, we understand that every project
              is unique, and selecting the right products and designs can be a
              complex process. Our expert counseling services are here to guide
              you through every step of your project, offering professional
              advice on selecting the best stainless steel and aluminum products
              for your specific needs. Whether you're working on a commercial
              kitchen, handrails, or custom solutions, our team helps you make
              informed decisions that align with your project goals, budget, and
              long-term vision.
            </p>
          </div>
          <div className="md:w-1/2 text-center">
            <Image
              width={500}
              height={500}
              src="/images/goldenbrand_stainlesssteel_1725566521572(1).jpeg"
              alt="Service"
              className="w-full rounded shadow-2xl drop-shadow-2xl"
            />
          </div>
        </div>

        <div
          className={cn(
            "flex-col p-3 gap-y-0 md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 animate-fadeinup opacity-0",
            selectedService === 1 ? "flex" : "hidden"
          )}
        >
          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold text-[var(--blue)]">
              Engineering Services
            </h3>
            <p className="italic mt-4 text-slate-500">
              Our engineering services at Golden Brand Stainless Steel are
              designed to bring your vision to life with precision and
              innovation. Our experienced engineers work closely with clients to
              develop detailed plans and technical drawings that meet exact
              specifications. Whether you're creating custom stainless steel
              structures, kitchens, or industrial installations, our engineering
              team provides solutions that enhance functionality, durability,
              and aesthetics. We use the latest technology to ensure that every
              design is both practical and efficient, meeting industry standards
              and exceeding client expectations.
            </p>
          </div>
          <div className="md:w-1/2 text-center">
            <Image
              width={500}
              height={500}
              src="/images/goldenbrand_stainlesssteel_1725566555084.jpeg"
              alt="Tinteggiature e Service"
              className="w-full rounded shadow-2xl drop-shadow-2xl"
            />
          </div>
        </div>

        <div
          className={cn(
            "flex-col p-3 gap-y-0 md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 animate-fadeinup opacity-0",
            selectedService === 2 ? "flex" : "hidden"
          )}
        >
          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold text-[var(--blue)]">
              Manufacture and Supply of Equipment
            </h3>
            <p className="italic mt-4 text-slate-500">
              Golden Brand Stainless Steel takes pride in manufacturing and
              supplying top-quality equipment for a wide range of industries.
              Our products are made from the finest stainless steel and aluminum
              materials, ensuring durability, hygiene, and resistance to
              corrosion. From commercial kitchen equipment to custom-made
              industrial solutions, we offer a broad range of products tailored
              to meet the specific needs of our clients. Our advanced
              manufacturing processes and stringent quality control standards
              guarantee that every piece of equipment we supply meets the
              highest performance expectations.
            </p>
          </div>
          <div className="md:w-1/2 text-center">
            <Image
              width={500}
              height={500}
              src="/images/hero2.jpeg"
              alt="Lavori in Service"
              className="w-full rounded shadow-2xl drop-shadow-2xl"
            />
          </div>
        </div>

        <div
          className={cn(
            "flex-col p-3 gap-y-0 md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 animate-fadeinup opacity-0",
            selectedService === 3 ? "flex" : "hidden"
          )}
        >
          <div className="md:w-1/2">
            <h3 className="text-3xl font-semibold text-[var(--blue)]">
              After Sale Services
            </h3>
            <p className="italic mt-4 text-slate-500">
              At Golden Brand Stainless Steel, our commitment to customers
              doesn’t end with the sale. We offer comprehensive after-sale
              services to ensure the continued performance and maintenance of
              our products. Whether you need regular maintenance, repairs, or
              technical support, our dedicated team is always ready to assist
              you. We aim to build long-lasting relationships with our clients
              by providing reliable service that keeps your equipment in optimal
              condition for years to come.
            </p>
          </div>
          <div className="md:w-1/2 text-center">
            <Image
              width={500}
              height={500}
              src="/images/goldenbrand_stainlesssteel_1725566531903.jpeg"
              alt="Lavori in Service"
              className="w-full rounded shadow-2xl drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;
