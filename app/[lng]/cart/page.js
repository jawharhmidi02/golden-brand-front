"use client";
import CartItem from "@/components/CartItem.js/CartItem";
import { useRouter } from "next/navigation";
import React from "react";
import "./page.css";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const page = () => {
  const router = useRouter();
  const items = [
    {
      image: "/images/products/image1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
    },
    {
      image: "/images/products/image1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
    },
    {
      image: "/images/products/image1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
    },
  ];
  return items.length == 0 ? (
    <div className="flex flex-col mx-auto w-full justify-center items-center mt-6">
      <div className="flex flex-col"></div>
      <div className="grid grid-cols-1 gap-5 place-items-center mx-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="180"
          height="180"
          fill="var(--theme2)"
          className="bi bi-cart-x"
          viewBox="0 0 16 16"
        >
          <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z" />
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
        </svg>
        <span className="font-lato font-bold text-3xl md:text-5xl text-center text-neutral-800">
          Your cart is currently empty.
        </span>
        <span className="font-lato font-semibold text-neutral-400 md:text-lg max-w-[500px] text-center">
          Before proceeding to checkout you must add some products to your
          shopping cart. You will find a lot of interesting products on our
          Products page.
        </span>
        <button
          onClick={() => {
            router.push("/products");
          }}
          type="button"
          className="py-3 px-6 font-lato font-semibold text-white  bg-[var(--theme2)] transition-colors duration-200 hover:bg-[var(--theme)] hover:cursor-pointer"
        >
          RETURN TO SHOP
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col mx-auto w-full justify-center items-center mt-6">
      <div className="flex flex-col w-full max-w-[1300px]">
        <div className="flex flex-row md:gap-10 gap-0 mx-5">
          <div>
          <table>
            <tbody>
              <tr className="border-b-2 border-neutral-200 font-lato font-bold text-lg">
                <td></td>
                <td></td>
                <td>PRODUCT</td>
                <td>DIMENSION</td>
                <td>PRICE</td>
                <td>QUANTITY</td>
                <td>SUBTOTAL</td>
              </tr>
            </tbody>

            {items.map((item, index) => (
              <tbody key={index}>
                <tr className="border-b-[1px] border-neutral-200">
                  <td>
                    <i className="fa-solid fa-x text-[11px] text-neutral-500 hover:cursor-pointer transition-colors duration-200 hover:text-neutral-400"></i>
                  </td>
                  <td>
                    <Image
                      width={80}
                      height={0}
                      alt={item.name}
                      src={item.image}
                      className="hover:cursor-pointer"
                    />
                  </td>
                  <td>
                    <span className="font-lato font-semibold text-neutral-800">
                      {item.name}
                    </span>
                  </td>
                  <td>
                    <span className=" text-neutral-500"> {item.dimension}</span>
                  </td>
                  <td>
                    <span className=" text-neutral-500">
                      {" "}
                      {`${item.price} QR`}
                    </span>
                  </td>
                  <td>
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
                        {item.quantity}
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
                  </td>
                  <td>
                    <span className="font-bold text-lg text-[var(--theme2)]">
                      {" "}
                      {`${item.price * item.quantity} QR`}
                    </span>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          </div>

          <div className="flex flex-col gap-3 justify-between p-7 border-[1px] border-neutral-200 shadow-md drop-shadow-md w-full h-fit max-w-[350px]">
            <span className="text-xl font-bold font-lato text-[var(--theme2)]">
              CART TOTALS
            </span>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between px-2 py-4">
                <span className="font-semibold font-lato text-lg text-neutral-800">Subtotal</span>
                <span className=" text-lg text-neutral-500">145000 QR</span>
              </div>
              <div className="w-full h-[1px] bg-neutral-300 border-mask"></div>
              <div className="flex flex-row gap-5 justify-between items-center px-2 py-4">
                <span className="font-semibold font-lato text-lg text-neutral-800">Shipping</span>
                <div className="flex flex-col text-right gap-4 text-neutral-600">
                
                    <div><label htmlFor="weight">Shipping cost depends on weight: <span>750 QR</span></label><input type="radio" id="weight" name="shipping" defaultChecked/></div>
                    <div><label htmlFor="hq">Receipt from the company's headquarters (QATAR) </label><input type="radio" id="hq" name="shipping"/></div>
                    <div><label htmlFor="truck">A shipping truck for several products (from 500 to 2000 QR) contact customer service after ordering for shipping cost.</label><input type="radio" id="truck" name="shipping"/></div>

                </div>

              </div>
              <div className="w-full h-[1px] bg-neutral-300 border-mask"></div>

              <div className="flex flex-row justify-between items-center px-2 py-4">
                <span className="font-semibold font-lato text-lg text-neutral-800">Total</span>
                <div className="flex flex-col justify-between">
                  <span className="font-bold font-lato text-2xl text-[var(--theme2)]">146750 QR</span>
                  <span className="text-sm font-lato text-neutral-400">(includes <span className="text-[var(--theme2)]">1000 QR</span> Tax)</span>
                </div>
              </div>


            </div>
            <button
              type="button"
              className="py-2 w-full bg-[var(--theme2)] text-white font-lato font-semibold transition-colors duration-200 hover:bg-[var(--theme)]"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
