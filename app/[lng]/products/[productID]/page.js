"use client";

import ProductHeader from "@/components/ProductHeader/ProductHeader";
import React, { useState, useEffect } from "react";
import "./page.css";

const page = () => {
  const product = {
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
    titles: ["legs", "drainer"],
  };
  const cat = {};
  cat[product.category] = true;
  const [productNumber, setProductNumber] = useState(1);

  const [selectedPrice, setSelectedPrice] = useState(product.prices[0]);

  const increaseProductNumber = () => {
    if (productNumber < 99) {
      setProductNumber(productNumber + 1);
    }
  };

  const decreaseProductNumber = () => {
    if (productNumber > 1) {
      setProductNumber(productNumber - 1);
    }
  };

  useEffect(() => {
    document.title = `GoldenBrand: ${product.name}`;
  }, []);
  return (
    <div className="mx-auto w-full mt-5 flex justify-center items-center">
      <div className="flex flex-col gap-4 max-w-[1200px] w-full mx-8 sm:mx-16 md:mx-32 lg:mx-20">
        <ProductHeader cat={cat} product={product} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4 lg:sticky lg:top-10 lg:left-0 w-full h-[85vh] justify-between">
            <div className="border-[1px] h-full w-full border-neutral-200 rounded-sm shadow-md drop-shadow-md flex justify-center items-center">
              <img
                src={product.img}
                className="h-60 w-60 xxsm:h-80 xxsm:w-80 xsm:h-96 xsm:w-96 rounded-md my-1"
              />
            </div>

            {/* Buy / add to cart Interface */}
            <div className="flex flex-col xsm:flex-row gap-2 justify-center xsm:justify-between items-center">
              <div className="grid grid-cols-2 gap-14 xsm:gap-4">
                <div className="flex flex-row gap-2 border-[1px] border-neutral-300 rounded-md justify-center items-center">
                  <button
                    type="button"
                    onClick={() => {
                      decreaseProductNumber();
                    }}
                    className="px-2.5 py-2 font-semibold border-r-[1px] border-neutral-300 hover:bg-[var(--theme)] hover:text-white rounded-l-md transition-all duration-200"
                  >
                    -
                  </button>
                  <span className="px-1 font-semibold font-lato">
                    {productNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      increaseProductNumber();
                    }}
                    className="px-2 py-2 font-semibold  border-l-[1px] border-neutral-300 hover:bg-[var(--theme)] hover:text-white rounded-r-md transition-all duration-200"
                  >
                    +
                  </button>
                </div>
                <span className="font-semibold text-xl xsm:text-base self-center">{`${
                  productNumber * selectedPrice
                } QR`}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="font-bold text-neutral-50 bg-[var(--theme)] px-3.5 py-2 font-lato border-2 border-neutral-50 active:scale-90 hover:text-[var(--theme)] hover:border-[var(--theme)] hover:bg-white transition-all duration-300"
                >
                  ADD TO CART
                </button>
                <button
                  type="button"
                  className="font-bold text-neutral-50 bg-[var(--theme)] px-3.5 py-2 font-lato border-2 border-neutral-50 active:scale-90 hover:text-[var(--theme)] hover:border-[var(--theme)] hover:bg-white transition-all duration-300"
                >
                  BUY NOW
                </button>
              </div>
            </div>
            {/* 
          { productNumber * selectedPrice >= 10000 && (
            <span className="text-center font-bold text-green-500 font-lato">Free delivery acquired !</span>
          )} */}
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-2xl text-center text-neutral-900 font-lato font-bold">
              {product.name}
            </span>

            {/* Product Description table */}
            <table>
              <tbody className="text-xl sm:text-2xl header text-center font-lato font-semibold text-neutral-100 bg-[var(--theme)]">
                <tr>
                  <th>Materials Description</th>
                </tr>
              </tbody>
              {product.description.map((desc, index) => (
                <tbody
                  className="even:bg-[#eeeeee] xsm:text-lg sm:text-xl text-center font-lato font-semibold text-neutral-800  hover:cursor-pointer"
                  key={index}
                >
                  <tr>
                    <td>{desc}</td>
                  </tr>
                </tbody>
              ))}
            </table>

            <span className="text-xl xxsm:text-2xl text-center text-neutral-900 font-lato font-semibold">
              Choose a dimension below
            </span>

            {/* Product Dimension / information table  */}
            <table>
              <tbody>
                <tr className="xsm:text-xl header text-center font-lato font-semibold text-neutral-100 bg-[var(--theme)]">
                  <td></td>
                  <td>Dimensions</td>
                  {product.titles.map((item, index) => (
                    <td key={index}>{item}</td>
                  ))}

                  <td>Price</td>
                </tr>
              </tbody>
              {product.dimensions.map((dimension, index) => (
                <tbody
                  className="even:bg-[#eeeeee] xsm:text-xl text-center font-lato font-semibold text-neutral-800  hover:cursor-pointer"
                  key={index}
                >
                  <tr className="hover:cursor-pointer">
                    <td>
                      <label className="radio-wrapper-8">
                        <input
                          id={`radio-${index}`}
                          defaultChecked={index === 0}
                          onChange={() => {
                            setSelectedPrice(product.prices[index]);
                          }}
                          type="radio"
                          name="radio-examples"
                          value={product.codes[index]}
                        />
                        <span></span>
                      </label>
                    </td>
                    <td>
                      <label
                        className="hover:cursor-pointer"
                        htmlFor={`radio-${index}`}
                      >
                        {dimension}
                      </label>
                    </td>
                    {product.titles.map((item, index) => (
                      <td key={index}>
                        <label
                          className="hover:cursor-pointer"
                          htmlFor={`radio-${index}`}
                        >
                          {product[item][index]}
                        </label>
                      </td>
                    ))}
                    <td>
                      <label
                        className="hover:cursor-pointer"
                        htmlFor={`radio-${index}`}
                      >{`${product.prices[index]} QR`}</label>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>

            {/* Delivery Guide Interface */}
            <span className="text-xl text-center text-neutral-900 font-lato font-semibold">
              Delivery
            </span>
            <span className="text-lg text-center text-neutral-600 font-montserrat">
              Free standard shipping on orders over{" "}
              <span className="font-semibold">10000 QR</span> before tax.
            </span>

            <div className="flex justify-center">
              <table className="-mt-2 w-full text-sm xsm:text-base md:text-lg xl:text-xl">
                <tbody className="text-neutral-400">
                  <tr>
                    <td>TYPE</td>
                    <td className="text-center">HOW LONG</td>
                    <td className="text-end">HOW MUCH</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="p-0 bg-neutral-300 h-[1px] border-mask-left"></td>
                    <td className="p-0 bg-neutral-300 h-[1px]"></td>
                    <td className="p-0 bg-neutral-300 h-[1px] border-mask-right"></td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Standard delivery</td>
                    <td className="text-center">1-4 business days</td>
                    <td className="text-end">4.50 QR</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="p-0 bg-neutral-300 h-[1px] border-mask-left"></td>
                    <td className="p-0 bg-neutral-300 h-[1px]"></td>
                    <td className="p-0 bg-neutral-300 h-[1px] border-mask-right"></td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Express delivery</td>
                    <td className="text-center">1 business day</td>
                    <td className="text-end">10.00 QR</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="p-0 bg-neutral-300 h-[1px] border-mask-left"></td>
                    <td className="p-0 bg-neutral-300 h-[1px]"></td>
                    <td className="p-0 bg-neutral-300 h-[1px] border-mask-right"></td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Pick up in store</td>
                    <td className="text-center">1-3 business days</td>
                    <td className="text-end">Free</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full h-[1px] bg-neutral-300 border-mask"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
