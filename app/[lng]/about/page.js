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
      question: "1. What products does Golden Brand specialize in?",
      answer:
        "Golden Brand specializes in high-quality stainless steel and aluminum products, including kitchens, handrails, work tables, cabinets, sink tables, shelves, trolleys, and custom hoods designed for both residential and commercial use.",
    },
    {
      question:
        "2. Why choose stainless steel for kitchen and handrail products?",
      answer:
        "Stainless steel is durable, resistant to rust and corrosion, and easy to clean, making it an ideal choice for kitchens and handrails. Its sleek, modern appearance also enhances any space, and it withstands high temperatures, ensuring long-lasting performance.",
    },
    {
      question: "3. Are Golden Brand’s products customizable?",
      answer:
        "Yes, we offer customization for most of our products. Our team can work with your specifications to create items tailored to your specific needs and space requirements. Contact us to discuss custom options.",
    },
    {
      question: "4. How do I place an order?",
      answer:
        "You can browse our product catalog on our website, add items to your cart, and complete the order through our checkout page. For custom orders or specific inquiries, please reach out through our contact form.",
    },
    {
      question: "5. What payment methods are accepted?",
      answer:
        "We accept various payment methods for your convenience, including Visa, Mastercard, Apple Pay, and cash on delivery for qualifying orders.",
    },
    {
      question: "6. What is the delivery time for orders?",
      answer:
        "Delivery times may vary depending on the item and your location. Standard orders are typically delivered within 7-10 business days. For custom or bulk orders, please allow additional time. We offer free delivery for orders over 10,000 QAR.",
    },
    {
      question: "7. Does Golden Brand ship internationally?",
      answer:
        "Currently, we primarily serve customers in Qatar. However, for large or special orders, please contact us directly, and we can discuss international shipping options.",
    },
    {
      question: "8. What is the return policy for Golden Brand products?",
      answer:
        "We offer a satisfaction guarantee for our products. If you are not satisfied with your purchase, please contact us within 7 days of delivery for returns or exchanges, following our return policy guidelines.",
    },
    {
      question:
        "9. How should I care for and maintain stainless steel products?",
      answer:
        "Stainless steel is low-maintenance but benefits from regular cleaning with mild soap and water or a stainless steel cleaner. Avoid abrasive materials to prevent scratches and keep the finish looking new.",
    },
    {
      question: "10. Do you offer installation services?",
      answer:
        "Yes, we offer professional installation services for our products to ensure they are securely fitted and meet quality standards. Installation details and fees can be discussed at the time of purchase.",
    },
    {
      question: "11. Are bulk order discounts available?",
      answer:
        "Yes, we offer special pricing for bulk orders. For large quantities, please contact our sales team to discuss potential discounts and lead times.",
    },
    {
      question: "12. What sets Golden Brand apart from other suppliers?",
      answer:
        "Golden Brand is committed to using high-grade stainless steel and aluminum, guaranteeing durability, aesthetic appeal, and hygiene in every product. We prioritize quality, customizability, and exceptional customer service for all our clients.F",
    },
  ];
  const aboutCards = [
    {
      text: "Spare Parts",
      logo: (
        <i className="fa-solid fa-arrows-rotate text-7xl text-[var(--theme)]"></i>
      ),
    },
    {
      text: "Maintenance",
      logo: (
        <i className="fa-solid fa-screwdriver-wrench text-7xl text-[var(--theme)]"></i>
      ),
    },
    {
      text: "Technical Support",
      logo: (
        <i className="fa-solid fa-comments text-7xl text-[var(--theme)]"></i>
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
    <div className="m-6 mx-auto flex w-full flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          <span className="text-center font-lato text-5xl font-bold text-neutral-800 sm:text-6xl md:text-7xl">
            About Us
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
        </div>
        <span className="text-center font-lato text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
          Who We Are
        </span>
      </div>

      <div className="group mx-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-evenly">
          <div className="relative hidden font-lato text-4xl font-semibold before:absolute before:left-full before:top-3 before:h-10 before:w-10 before:border-b-2 before:border-r-2 before:border-[var(--theme)] before:content-[''] after:absolute after:-left-10 after:-top-2 after:h-10 after:w-10 after:border-l-2 after:border-t-2 after:border-[var(--theme)] after:bg-transparent after:transition-all after:content-[''] lg:block">
            <span>Our Company</span>
          </div>

          <img
            src="/images/icon.png"
            className="max-h-[200px] w-72 max-w-[500px] min-[500px]:w-[340px] sm:w-[400px] md:w-[450px] lg:w-[500px]"
          ></img>
        </div>

        <div
          id="faqs"
          className="flex max-w-[600px] flex-col gap-4 rounded-md border-[1px] border-neutral-200 bg-white px-6 py-8 shadow-md drop-shadow-md xsm:px-12"
        >
          <span className="text-center font-lato text-xl font-semibold text-[var(--theme)] xxsm:text-2xl">
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

      <span className="mt-5 border-b-2 border-[var(--theme)] pb-2 text-center font-lato text-4xl font-semibold">
        FAQ
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

      <span className="mt-5 border-b-2 border-[var(--theme)] pb-2 text-center font-lato text-4xl font-semibold">
        After Sale Services
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

