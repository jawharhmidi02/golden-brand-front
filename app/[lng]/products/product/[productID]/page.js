"use client";
import ProductHeader from "@/components/ProductHeader/ProductHeader";
import React from "react";
import "./page.css";

const page = () => {
  const product = {
    img: "/images/products/image1.png",
    name: "Stainless Steel Work Table Without Undershelf",
    description: [
      "1.0mmTHK., GR.304 #4 FINISH TOP PLATE, BACKSPLASH",
      "1.0MMTHK., GR.304, #4 FINISH, STIFFENERS",
      "40 x 40mm S. STEEL SQUARE TUBE LEG SUPPORT ON ADJUSTABLE BULLET TYPE FEET",
    ],
    category: "Work Tables",
    id: 123456,
    codes: [
      "TBL39B - 7",
      "TBL47B - 7",
      "TBL55B - 7",
      "TBL63B - 7",
      "TBL70B - 7",
      "TBL78B - 7",
      "TBL86B - 7",
      "TBL94B - 7",
    ],
    dimensions: [
      "1000 x 700 x 850 + 100mm",
      "1200 x 700 x 850 + 100mm",
      "1400 x 700 x 850 + 100mm",
      "1600 x 700 x 850 + 100mm",
      "1800 x 700 x 850 + 100mm",
      "2000 x 700 x 850 + 100mm",
      "2200 x 700 x 850 + 100mm",
      "2300 x 700 x 850 + 100mm",
    ],
    legs: ["4", "4", "4", "4", "4", "4", "6", "6"],
    prices: ["1000", "1200", "1400", "1600", "1800", "2000", "2200", "2300"],
  };
  const cat = {};
  cat[product.category] = true;
  return (
    <div className="flex flex-col gap-4 w-[1000px] mx-auto mt-2">
      <ProductHeader cat={cat} product={product} />
      <div className="flex flex-row gap-12">
        <div className="w-[800px] h-[600px] sticky top-10 left-0 border-1 border-neutral-200 rounded-sm shadow-md drop-shadow-md flex justify-center items-center">
          <img src={product.img} className="h-96 w-96 rounded-md my-1" />
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-3xl text-neutral-900 font-lato font-bold">
            {product.name}
          </span>

          <table>
            <tbody className="text-xl header text-center font-lato font-semibold text-neutral-100 bg-blue-500">
              <tr>
                <th>Materials Description</th>
              </tr>
            </tbody>
            {product.description.map((desc, index) => (
              <tbody
                className="even:bg-[#eeeeee] text-lg text-center font-lato font-semibold text-neutral-800  hover:cursor-pointer"
                key={index}
              >
                <tr>
                  <td>{desc}</td>
                </tr>
              </tbody>
            ))}
          </table>

          <span className="text-xl text-neutral-900 font-lato font-semibold">
            Choose a dimension below:
          </span>

          <table>
            <tbody>
              <tr className="text-xl header text-center font-lato font-semibold text-neutral-100 bg-blue-500">
                <td></td>
                <td>Dimensions</td>
                {product.legs && <td>Legs</td>}
                {product.doors && <td>Doors</td>}
                {product.doors && <td>Doors</td>}
                {product.drainer && <td>Drainer</td>}
                {product.doors && <td>Doors</td>}
                <td>Price</td>
              </tr>
            </tbody>
            {product.dimensions.map((dimension, index) => (
              <tbody
                className="even:bg-[#eeeeee] text-xl text-center font-lato font-semibold text-neutral-800  hover:cursor-pointer"
                key={index}
              >
                <tr className="hover:cursor-pointer">
                  <td>
                    <label className="radio-wrapper-8">
                      <input
                        id={`radio-${index}`}
                        defaultChecked={index === 0}
                        type="radio"
                        name="radio-examples"
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
                  {product.legs && (
                    <td>
                      <label
                        className="hover:cursor-pointer"
                        htmlFor={`radio-${index}`}
                      >
                        {product.legs[index]}
                      </label>
                    </td>
                  )}
                  {product.doors && (
                    <td>
                      <label
                        className="hover:cursor-pointer"
                        htmlFor={`radio-${index}`}
                      >
                        {product.doors[index]}
                      </label>
                    </td>
                  )}
                  {product.drainer && (
                    <td>
                      <label
                        className="hover:cursor-pointer"
                        htmlFor={`radio-${index}`}
                      >
                        {product.drainer[index]}
                      </label>
                    </td>
                  )}
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

          <span className="text-xl text-neutral-900 font-lato font-semibold">
            Delivery
          </span>
          <span className="text-lg text-neutral-600 font-montserrat">
            Free standard shipping on orders over{" "}
            <span className="font-semibold">10000 QR</span> before tax.
          </span>
          
          <table className="-mt-2">
            <tbody className="text-neutral-400 text-start">
              <tr>
                <td>TYPE</td>
                <td>HOW LONG</td>
                <td>HOW MUCH</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="p-0 bg-neutral-300 h-[1px] border-mask-left"></td>
                <td className="p-0 bg-neutral-300 h-[1px]"></td>
                <td className="p-0 bg-neutral-300 h-[1px] border-mask-right"></td>
              </tr>
            </tbody>
            <tbody className="text-start">
              <tr>
                <td>Standard delivery</td>
                <td>1-4 business days</td>
                <td>4.50 QR</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="p-0 bg-neutral-300 h-[1px] border-mask-left"></td>
                <td className="p-0 bg-neutral-300 h-[1px]"></td>
                <td className="p-0 bg-neutral-300 h-[1px] border-mask-right"></td>
              </tr>
            </tbody>
            <tbody className="text-start">
              <tr>
                <td>Express delivery</td>
                <td>1 business day</td>
                <td>10.00 QR</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="p-0 bg-neutral-300 h-[1px] border-mask-left"></td>
                <td className="p-0 bg-neutral-300 h-[1px]"></td>
                <td className="p-0 bg-neutral-300 h-[1px] border-mask-right"></td>
              </tr>
            </tbody>
            <tbody className="text-start">
              <tr>
                <td>Pick up in store</td>
                <td>1-3 business days</td>
                <td>Free</td>
              </tr>
            </tbody>
          </table>

          <div className="w-full h-[1px] bg-neutral-300 border-mask"></div>

          <div className="flex flex-row gap-2 justify-evenly items-center">
            <div className="flex flex-row gap-2 border-1 border-neutral-300 rounded-md justify-center items-center">
              <button type="button" className="px-2 py-2 border-r-[1px] border-neutral-300 hover:bg-blue-500 hover:text-white rounded-l-md transition-all duration-200">-</button>
              <span className="px-1">1</span>
              <button type="button" className="px-2 py-2 border-l-[1px] border-neutral-300 hover:bg-blue-500 hover:text-white rounded-r-md transition-all duration-200">+</button>
            </div>
            <div>
              <span className="font-semibold">2000 QR</span>
            </div>
            <button type="button" className="font-bold text-neutral-50 bg-blue-500 px-3.5 py-2 font-lato border-2 border-neutral-50 hover:text-blue-500 hover:border-blue-500 hover:bg-white transition-colors duration-300">ADD TO CART</button>
            <button type="button" className="font-bold text-neutral-50 bg-blue-500 px-3.5 py-2 font-lato border-2 border-neutral-50 hover:text-blue-500 hover:border-blue-500 hover:bg-white transition-colors duration-300">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
