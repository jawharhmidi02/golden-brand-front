"use client";

import { useEffect } from "react";
import AboutCard from "@/components/AboutCard/AboutCard";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const page = () => {
  const faqCards = [
    {
      question: "Question 1 ?",
      answer: "Answer 1 !",
    },
    {
      question: "Question 2 ?",
      answer: "Answer 2 !",
    },
    {
      question: "Question 3 ?",
      answer: "Answer 3 !",
    },
  ];
  const aboutCards = [
    {
      text: "Spare Parts",
      logo: (
        <i className="fa-solid fa-arrows-rotate text-[var(--theme)] text-7xl"></i>
      ),
    },
    {
      text: "Maintenance",
      logo: (
        <i className="fa-solid fa-screwdriver-wrench text-[var(--theme)] text-7xl"></i>
      ),
    },
    {
      text: "Technical Support",
      logo: (
        <i className="fa-solid fa-comments text-[var(--theme)] text-7xl"></i>
      ),
    },
    {
      text: "Warranty",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          fill="var(--theme)"
          className="bi bi-shield-check"
          viewBox="0 0 16 16"
        >
          <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
          <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    document.title = "GoldenBrand: About";
  }, []);
  return (
    <div className="flex flex-col mx-auto w-full justify-center items-center gap-10 m-6">
      <div className="flex w-full flex-col gap-2 self-center justify-center items-center">
        <div className="flex flex-row gap-3 w-full justify-center items-center">
          <div className="bg-[var(--theme)] w-10 xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24 h-[2px]"></div>
          <span className="font-bold font-lato text-neutral-800 text-center text-5xl sm:text-6xl md:text-7xl">
            About Us
          </span>
          <div className="bg-[var(--theme)] w-10 xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24 h-[2px]"></div>
        </div>
        <span className="font-lato text-lg sm:text-xl md:text-2xl lg:text-3xl text-center text-slate-700">
          Who We Are
        </span>
      </div>

      <div className="grid group grid-cols-1 lg:grid-cols-2 gap-10 mx-10">
        <div className="flex flex-col justify-evenly items-center">
          <div className="hidden relative lg:block text-4xl font-semibold font-lato after:content-[''] after:border-l-2 after:border-t-2 after:h-10 after:w-10 after:bg-transparent after:border-[var(--theme)] after:-top-2 after:-left-10 after:absolute  after:transition-all  before:content-[''] before:absolute before:border-r-2 before:border-b-2 before:border-[var(--theme)] before:top-3 before:left-full before:w-10 before:h-10">
            <span>Our Company</span>
          </div>

          <img
            src="/images/icon.png"
            className="max-w-[500px] max-h-[200px] w-72 min-[500px]:w-[340px] sm:w-[400px] md:w-[450px] lg:w-[500px]"
          ></img>
        </div>

        <div
          id="faqs"
          className="flex flex-col gap-4 bg-white shadow-md drop-shadow-md px-6 py-8 xsm:px-12 rounded-md border-[1px] border-neutral-200 max-w-[600px]"
        >
          <span className="font-semibold font-lato text-xl xxsm:text-2xl text-center text-emerald-600">
            About our online store
          </span>
          <span className="font-raleway text-neutral-800">
            At Golden Brand Stainless Steel, we are committed to delivering
            premium-quality stainless steel kitchens, handrails, and aluminum
            products tailored to meet the needs of our clients. With years of
            expertise in the industry, we pride ourselves on our craftsmanship,
            attention to detail, and innovative designs. Our products are built
            to last, ensuring both functionality and style for residential,
            commercial, and industrial projects. Whether you need customized
            stainless steel solutions or ready-made products, we offer a wide
            range of options to suit your specifications. At Golden Brand, our
            mission is to provide durable, high-quality materials backed by
            exceptional service and fast, reliable delivery.
          </span>
        </div>
      </div>

      <span className="text-center font-semibold font-lato text-4xl mt-5 border-b-2 pb-2 border-[var(--theme)]">
        FAQ
      </span>
      <div className="flex flex-col gap-3 mx-5 w-10/12 sm:max-w-[800px]">
        <Accordion type="single" collapsible className="w-full">
          {faqCards.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <span className="text-center font-semibold font-lato text-4xl mt-5 border-b-2 pb-2 border-[var(--theme)]">
        After Sale Services
      </span>

      <div className="grid grid-cols-1 w-full px-10 place-items-center min-[1550px]:px-28 min-[1700px]:px-36 min-[1900px]:px-48 md:grid-cols-2 min-[1360px]:grid-cols-4 gap-6">
        {aboutCards.map((item, index) => (
          <AboutCard key={index} text={item.text} logo={item.logo} />
        ))}
      </div>
    </div>
  );
};

export default page;
