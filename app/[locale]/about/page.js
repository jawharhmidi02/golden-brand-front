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
import { useTranslations } from "next-intl";
import Testimonials from "@/components/Testimonials/Testimonials";

const page = () => {
  const tAbout = useTranslations("about");
  const faqCards = [
    {
      question: tAbout("faqCards.question1.question"),
      answer: tAbout("faqCards.question1.answer"),
    },
    {
      question: tAbout("faqCards.question2.question"),
      answer: tAbout("faqCards.question2.answer"),
    },
    {
      question: tAbout("faqCards.question3.question"),
      answer: tAbout("faqCards.question3.answer"),
    },
    {
      question: tAbout("faqCards.question4.question"),
      answer: tAbout("faqCards.question4.answer"),
    },
    {
      question: tAbout("faqCards.question5.question"),
      answer: tAbout("faqCards.question5.answer"),
    },
    {
      question: tAbout("faqCards.question6.question"),
      answer: tAbout("faqCards.question6.answer"),
    },
    {
      question: tAbout("faqCards.question7.question"),
      answer: tAbout("faqCards.question7.answer"),
    },
    {
      question: tAbout("faqCards.question8.question"),
      answer: tAbout("faqCards.question8.answer"),
    },
    {
      question: tAbout("faqCards.question9.question"),
      answer: tAbout("faqCards.question9.answer"),
    },
    {
      question: tAbout("faqCards.question10.question"),
      answer: tAbout("faqCards.question10.answer"),
    },
    {
      question: tAbout("faqCards.question11.question"),
      answer: tAbout("faqCards.question11.answer"),
    },
    {
      question: tAbout("faqCards.question12.question"),
      answer: tAbout("faqCards.question12.answer"),
    },
  ];
  const aboutCards = [
    {
      text: tAbout("aboutCards.spareParts"),
      logo: (
        <i className="fa-solid fa-arrows-rotate text-7xl text-[var(--theme)]"></i>
      ),
    },
    {
      text: tAbout("aboutCards.maintenance"),
      logo: (
        <i className="fa-solid fa-screwdriver-wrench text-7xl text-[var(--theme)]"></i>
      ),
    },
    {
      text: tAbout("aboutCards.technicalSupport"),
      logo: (
        <i className="fa-solid fa-comments text-7xl text-[var(--theme)]"></i>
      ),
    },
    {
      text: tAbout("aboutCards.warranty"),
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
    <div className="m-6 mx-auto flex w-full flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          <span className="text-center font-lato text-5xl font-bold text-neutral-800 sm:text-6xl md:text-7xl">
            {tAbout("title")}
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
        </div>
        <span className="text-center font-lato text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
          {tAbout("whoWeAre")}
        </span>
      </div>

      <div className="group mx-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-evenly">
          <div className="relative hidden font-lato text-4xl font-semibold before:absolute before:left-full before:top-3 before:h-10 before:w-10 before:border-b-2 before:border-r-2 before:border-[var(--theme)] before:content-[''] after:absolute after:-left-10 after:-top-2 after:h-10 after:w-10 after:border-l-2 after:border-t-2 after:border-[var(--theme)] after:bg-transparent after:transition-all after:content-[''] lg:block">
            <span>{tAbout("ourCompany")}</span>
          </div>

          <img
            src="/images/icon.png"
            className="max-h-[200px] w-72 max-w-[500px] min-[500px]:w-[340px] sm:w-[400px] md:w-[450px] lg:w-[500px]"
          />
        </div>

        <div
          id="faqs"
          className="flex max-w-[600px] flex-col gap-4 rounded-md border-[1px] border-neutral-200 bg-white px-6 py-8 shadow-md drop-shadow-md xsm:px-12"
        >
          <span className="text-center font-lato text-xl font-semibold text-[var(--theme)] xxsm:text-2xl">
            {tAbout("aboutOurOnlineStore")}
          </span>
          <span className="font-raleway text-neutral-800">
            {tAbout("description")}
          </span>
        </div>
      </div>

      <span className="mt-5 border-b-2 border-[var(--theme)] pb-2 text-center font-lato text-4xl font-semibold">
        {tAbout("FAQ")}
      </span>
      <div className="mx-5 flex w-10/12 flex-col gap-3 sm:max-w-[800px]">
        <Accordion type="single" collapsible className="w-full">
          {faqCards.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-neutral-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Testimonials />

      <span className="mt-5 border-b-2 border-[var(--theme)] pb-2 text-center font-lato text-4xl font-semibold">
        {tAbout("afterSaleServices")}
      </span>

      <div className="grid w-full grid-cols-1 place-items-center gap-6 px-10 md:grid-cols-2 min-[1360px]:grid-cols-4 min-[1550px]:px-28 min-[1700px]:px-36 min-[1900px]:px-48">
        {aboutCards.map((item, index) => (
          <AboutCard key={index} text={item.text} logo={item.logo} />
        ))}
      </div>
    </div>
  );
};

export default page;
