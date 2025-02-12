"use client";

import "./page.css";

import { useContext, useState } from "react";

import { UserAuthContext } from "@/contexts/AuthContext";
import CartItem from "@/components/CartItem/CartItem";
import { useTranslations } from "next-intl";

const page = () => {
  const tCommon = useTranslations("common");
  const tCart = useTranslations("cart");
  const { ChangeUrl, items, setItems, Link } = useContext(UserAuthContext);
  const [totalPrice, setTotalPrice] = useState({});

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

  return (
    <div>
      {Object.keys(items).length == 0 ? (
        <div className="mx-auto mt-6 flex w-full flex-col items-center justify-center">
          <div className="flex flex-col"></div>
          <div className="mx-5 grid grid-cols-1 place-items-center gap-5">
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
            <span className="text-center font-lato text-3xl font-bold text-neutral-800 md:text-5xl">
              {tCart("empty.text")}
            </span>
            <span className="max-w-[500px] text-center font-lato font-semibold text-neutral-400 md:text-lg">
              {tCart("empty.description")}
            </span>
            <Link href="/products" passHref legacyBehavior>
              <a
                onClick={() => {
                  ChangeUrl("/products");
                }}
                className="bg-[var(--theme2)] px-6 py-3 font-lato font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-[var(--theme)]"
              >
                {tCart("empty.buttonText")}
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-6 flex w-full flex-col items-center justify-center">
          <div className="flex w-full max-w-[1500px] flex-col items-center justify-center">
            <div className="mx-2 flex flex-col gap-10 md:mx-10 lg:flex-row">
              <div>
                <table className="w-full">
                  <tbody className="hidden md:contents">
                    <tr className="border-b-2 border-neutral-200 font-lato text-lg font-bold">
                      <td className="p-[10px]"></td>
                      <td className="p-[10px]"></td>
                      <td className="p-[10px]">{tCart("table.PRODUCT")}</td>
                      <td className="p-[10px]">{tCart("table.DIMENSION")}</td>
                      <td className="p-[10px]">{tCart("table.PRICE")}</td>
                      <td className="p-[10px]">{tCart("table.QUANTITY")}</td>
                      <td className="p-[10px]">{tCart("table.SUBTOTAL")}</td>
                    </tr>
                  </tbody>

                  {Object.keys(items).map((productVariantID, index) => (
                    <CartItem
                      key={index}
                      productVariantID={productVariantID}
                      quantity={items[productVariantID]}
                      setTotalPrice={setTotalPrice}
                      index={index}
                      items={items}
                      setItems={setItems}
                    />
                  ))}
                </table>
              </div>

              <div className="flex h-fit w-full flex-col justify-between gap-3 border-[1px] border-neutral-200 p-7 shadow-md drop-shadow-md lg:max-w-[400px]">
                <span className="font-lato text-xl font-bold text-[var(--theme2)]">
                  {tCart("cartTotals")}
                </span>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between px-2 py-4">
                    <span className="font-lato text-lg font-semibold text-neutral-800">
                      {tCart("subtotal")}
                    </span>
                    <span className="text-lg text-neutral-500">
                      {sumValues(totalPrice)} {tCommon("currency")}
                    </span>
                  </div>
                  <div className="border-mask h-[1px] w-full bg-neutral-300"></div>
                  <div className="flex flex-row items-center justify-between gap-5 px-2 py-4">
                    <span className="font-lato text-lg font-semibold text-neutral-800">
                      {tCart("shipping")}
                    </span>
                    <div className="flex flex-col gap-4 text-right text-neutral-600">
                      <div>
                        <label htmlFor="hq" className="hover:cursor-pointer">
                          <input
                            type="radio"
                            id="hq"
                            name="shipping"
                            defaultChecked
                            className="relative left-[2px] top-2 float-end accent-emerald-700 hover:cursor-pointer"
                          />
                          {tCart("receipt")}{" "}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="truck" className="hover:cursor-pointer">
                          <input
                            type="radio"
                            id="truck"
                            name="shipping"
                            className="relative left-[2px] top-2 float-end accent-emerald-700 hover:cursor-pointer"
                          />
                          {tCart("delivery.part1")}{" "}
                          <font className="font-bold text-[var(--theme2)]">
                            100
                          </font>{" "}
                          {tCart("delivery.part2")}{" "}
                          <font className="font-bold text-[var(--theme2)]">
                            500 {tCommon("currency")}
                          </font>
                          {tCart("delivery.part3")}{" "}
                        </label>
                        {sumValues(totalPrice) >= 10000 && (
                          <div className="font-lato text-sm text-neutral-400">
                            ({tCart("delivery.free")})
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="border-mask h-[1px] w-full bg-neutral-300"></div>

                  <div className="flex flex-row items-center justify-between px-2 py-4">
                    <span className="font-lato text-lg font-semibold text-neutral-800">
                      {tCart("total")}
                    </span>
                    <div className="flex flex-col justify-between">
                      <span className="font-lato text-2xl font-bold text-[var(--theme2)]">
                        {sumValues(totalPrice)} {tCommon("currency")}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="flex w-full items-center justify-center bg-[var(--theme2)] py-2 font-lato font-semibold text-white transition-colors duration-200 hover:bg-[var(--theme)]"
                  onClick={() => {
                    ChangeUrl("/checkout");
                  }}
                >
                  {tCart("proceedToCheckout")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
