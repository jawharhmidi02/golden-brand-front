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
    <div className="flex flex-col gap-2 w-[800px] mx-auto mt-2">
      <ProductHeader cat={cat} product={product} />
      <div className="flex flex-row gap-12">
        <div className="w-[600px] h-[500px] sticky top-10 left-0 border-1 border-neutral-200 rounded-sm shadow-md drop-shadow-md flex justify-center items-center">
          <img src={product.img} className="h-72 w-72 rounded-md my-1" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xl mb-2 text-neutral-900 font-lato font-bold">
            {product.name}
          </span>
          <span className="font-semibold text-lg text-neutral-700 font-lato">
            Materials Description:
          </span>
          {product.description.map((item, index) => (
            <div className="flex flex-row gap-2" key={index}>
              <span>
                <i className="fa-solid fa-right-long text-neutral-600"></i>
              </span>
              <span className="font-montserrat font-medium text-sm text-start pt-[2px] text-neutral-600">
                {item}
              </span>
            </div>
          ))}
          <div className="flex flex-col gap-1 mt-4">
            <table>
              <tbody className="text-center font-lato font-black text-xl">
                <tr>
                  <th colSpan="100%">Choose a dimension</th>
                </tr>
              </tbody>
              <tbody>
                <tr className="text-xl text-center font-lato font-semibold text-neutral-400 hover:bg-neutral-200 transition-colors duration-100">
                  <td></td>
                  <td>Dimensions</td>
                  {product.legs && <td>Legs</td>}
                  {product.doors && <td>Doors</td>}
                  {product.drainer && <td>Drainer</td>}
                  <td>Price</td>
                </tr>
              </tbody>
              {product.dimensions.map((dimension, index) => (
                <tbody
                  className="text-xl text-center font-lato font-semibold text-neutral-500 hover:bg-neutral-200 transition-colors duration-100 hover:cursor-pointer"
                  key={index}
                >
                  <tr className="hover:cursor-pointer">
                    <td>
                      <label className="radio-wrapper-8">
                        <input
                          id={`radio-${index}`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
