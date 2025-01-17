"use client";

import "./page.css";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { UserAuthContext } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

import { Skeleton } from "@/components/ui/skeleton";
import ProductHeader from "@/components/ProductHeader/ProductHeader";
import SkeletonProductHeader from "@/components/ProductHeader/SkeletonProductHeader";

const page = () => {
  const tCommon = useTranslations("common");
  const tProduct = useTranslations("product");
  const searchParams = useParams();
  const id = searchParams.productID;
  const { ChangeUrl, updateCart } = useContext(UserAuthContext);
  const [product, setproduct] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [productNumber, setProductNumber] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({
    price: 0,
  });

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

  const fetchProduct = async () => {
    setLoadingProduct(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/byid/${id}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setproduct(data.data);
      if (data.data.productsVariants.length !== 0) {
        setSelectedVariant(data.data.productsVariants[0]);
      }

      setLoadingProduct(false);
    } catch (error) {
      console.error(error);
      toast({
        title: tProduct("toast.error.tile"),
        description: tProduct("toast.error.generic"),
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = async () => {
    if (Object.keys(selectedVariant).length < 2) {
      toast({
        title: tProduct("toast.error.tile"),
        description: tProduct("toast.error.selectVariant"),
        variant: "destructive",
      });
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    cart[selectedVariant.id] = cart[selectedVariant.id]
      ? productNumber + cart[selectedVariant.id]
      : productNumber;

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

    toast({
      title: tProduct("toast.item.success.title"),
      description: tProduct("toast.item.success.description"),
      variant: "success",
      duration: 3000,
    });
    setProductNumber(1);
  };

  const handleBuyDirectly = () => {
    handleAddToCart();
    ChangeUrl("/cart");
  };

  useEffect(() => {
    document.title = `GoldenBrand: ${product.name ? product.name : "Loading..."}`;
  }, [product]);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="mx-auto mt-5 flex w-full items-center justify-center">
      <div className="mx-8 flex w-full max-w-[1200px] flex-col gap-4 sm:mx-16 md:mx-32 lg:mx-20">
        {loadingProduct ? (
          <SkeletonProductHeader />
        ) : (
          <ProductHeader
            cat={{ [product.category?.name]: true }}
            product={product}
          />
        )}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex h-[85vh] w-full flex-col justify-between gap-4 lg:sticky lg:left-0 lg:top-10">
            <div className="flex h-full w-full items-center justify-center rounded-sm border-[1px] border-neutral-200 shadow-md drop-shadow-md">
              {loadingProduct ? (
                <Skeleton className="my-1 h-60 w-60 rounded-md bg-neutral-200 xxsm:h-80 xxsm:w-80 xsm:h-96 xsm:w-96" />
              ) : (
                <img
                  src={product.img}
                  className="my-1 h-60 w-60 rounded-md xxsm:h-80 xxsm:w-80 xsm:h-96 xsm:w-96"
                />
              )}
            </div>

            {/* Buy / add to cart Interface */}
            <div className="flex flex-col items-center justify-center gap-2 xsm:flex-row xsm:justify-between">
              <div className="grid grid-cols-2 gap-14 xsm:gap-4">
                <div className="flex flex-row items-center justify-center gap-2 rounded-md border-[1px] border-neutral-300">
                  <button
                    type="button"
                    onClick={() => {
                      if (!loadingProduct) {
                        decreaseProductNumber();
                      }
                    }}
                    className="rounded-l-md border-r-[1px] border-neutral-300 px-2.5 py-2 font-semibold transition-all duration-200 hover:bg-[var(--theme)] hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-1 font-lato font-semibold">
                    {productNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!loadingProduct) {
                        increaseProductNumber();
                      }
                    }}
                    className="rounded-r-md border-l-[1px] border-neutral-300 px-2 py-2 font-semibold transition-all duration-200 hover:bg-[var(--theme)] hover:text-white"
                  >
                    +
                  </button>
                </div>
                <span className="flex flex-row items-center gap-2 self-center text-xl font-semibold xsm:text-base">
                  {loadingProduct ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-black"></div>
                  ) : (
                    `${selectedVariant && productNumber * selectedVariant.price}`
                  )}{" "}
                  {tCommon("currency")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="border-2 border-neutral-50 bg-[var(--theme)] px-3.5 py-2 font-lato font-bold text-neutral-50 transition-all duration-300 hover:border-[var(--theme)] hover:bg-white hover:text-[var(--theme)] active:scale-90"
                >
                  {loadingProduct ? (
                    <div className="flex h-6 w-14 items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    </div>
                  ) : (
                    tProduct("button.addToCart")
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleBuyDirectly}
                  className="border-2 border-neutral-50 bg-[var(--theme)] px-3.5 py-2 font-lato font-bold text-neutral-50 transition-all duration-300 hover:border-[var(--theme)] hover:bg-white hover:text-[var(--theme)] active:scale-90"
                >
                  {loadingProduct ? (
                    <div className="flex h-6 w-14 items-center justify-center">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    </div>
                  ) : (
                    tProduct("button.buyNow")
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-center font-lato text-2xl font-bold text-neutral-900">
              {loadingProduct ? (
                <Skeleton className={"mx-auto h-10 w-[250px] bg-neutral-200"} />
              ) : (
                product.name
              )}
            </span>

            {/* Product Description table */}
            <table>
              <tbody className="header bg-[var(--theme)] text-center font-lato text-xl font-semibold text-neutral-100 sm:text-2xl">
                <tr>
                  <th>{tProduct("table.th.materialsDescription")}</th>
                </tr>
              </tbody>
              {loadingProduct
                ? Array.from({ length: 3 }).map((_, index) => (
                    <tbody
                      className="text-center font-lato font-semibold text-neutral-800 even:bg-[#eeeeee] hover:cursor-pointer xsm:text-lg sm:text-xl"
                      key={index}
                    >
                      <tr>
                        <td>
                          <Skeleton
                            className={"mx-auto h-8 w-[300px] bg-neutral-300"}
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))
                : product.description?.map((desc, index) => (
                    <tbody
                      className="text-center font-lato font-semibold text-neutral-800 even:bg-[#eeeeee] hover:cursor-pointer xsm:text-lg sm:text-xl"
                      key={index}
                    >
                      <tr>
                        <td>{desc}</td>
                      </tr>
                    </tbody>
                  ))}
            </table>

            <span className="text-center font-lato text-xl font-semibold text-neutral-900 xxsm:text-2xl">
              {tProduct("table.th.chooseDimensionBelow")}
            </span>

            {/* Product Dimension / information table  */}
            {loadingProduct ? (
              <div className="flex h-[400px] w-full items-center justify-center bg-neutral-200">
                <div className="h-8 w-8 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
              </div>
            ) : (
              <table>
                <tbody>
                  <tr className="header bg-[var(--theme)] text-center font-lato font-semibold text-neutral-100 xsm:text-xl">
                    <td></td>
                    <td>{tProduct("table.td.dimensions")}</td>
                    {product.productsVariants.length !== 0 &&
                      Object.keys(
                        product.productsVariants[0].additionalFeatures,
                      ).map((additionalItem, index) => (
                        <td key={index}>{additionalItem}</td>
                      ))}

                    <td>{tProduct("table.td.price")}</td>
                  </tr>
                </tbody>
                {product.productsVariants.map((item, index) => (
                  <tbody
                    className="text-center font-lato font-semibold text-neutral-800 even:bg-[#eeeeee] hover:cursor-pointer xsm:text-xl"
                    key={index}
                  >
                    <tr className="hover:cursor-pointer">
                      <td>
                        <label className="radio-wrapper-8">
                          <input
                            id={`radio-${index}`}
                            defaultChecked={index === 0}
                            onChange={() => {
                              setSelectedVariant(item);
                            }}
                            type="radio"
                            name="radio-examples"
                            value={item.id}
                          />
                          <span></span>
                        </label>
                      </td>
                      <td>
                        <label
                          className="hover:cursor-pointer"
                          htmlFor={`radio-${index}`}
                          dir="ltr"
                        >
                          {item.dimension}
                        </label>
                      </td>
                      {Object.keys(item.additionalFeatures).map(
                        (additionalItem, ind) => (
                          <td key={ind}>
                            <label
                              className="hover:cursor-pointer"
                              htmlFor={`radio-${index}`}
                            >
                              {item.additionalFeatures[additionalItem]}
                            </label>
                          </td>
                        ),
                      )}
                      <td>
                        <label
                          className="hover:cursor-pointer"
                          htmlFor={`radio-${index}`}
                        >{`${item.price} ${tCommon("currency")}`}</label>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            )}

            {/* Delivery Guide Interface */}
            <span className="text-center font-lato text-xl font-semibold text-neutral-900">
              {tProduct("delivery.title")}
            </span>
            <span className="text-center font-montserrat text-lg text-neutral-600">
              {tProduct("delivery.free")}{" "}
              <span className="font-semibold">
                10000 {tCommon("currency")}.
              </span>{" "}
            </span>

            <div className="flex justify-center">
              <table className="-mt-2 w-full text-sm xsm:text-base md:text-lg xl:text-xl">
                <tbody className="text-neutral-400">
                  <tr>
                    <td>{tProduct("delivery.table.type.title")}</td>
                    <td className="text-center">
                      {tProduct("delivery.table.type.howLong")}
                    </td>
                    <td className="text-end">
                      {tProduct("delivery.table.type.howMuch")}
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="border-mask-left h-[1px] bg-neutral-300 p-0"></td>
                    <td className="h-[1px] bg-neutral-300 p-0"></td>
                    <td className="border-mask-right h-[1px] bg-neutral-300 p-0"></td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>{tProduct("delivery.table.type.standardDelivery")}</td>
                    <td className="text-center">
                      1-4 {tProduct("delivery.businessDays")}
                    </td>
                    <td className="text-end">4.50 {tCommon("currency")}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="border-mask-left h-[1px] bg-neutral-300 p-0"></td>
                    <td className="h-[1px] bg-neutral-300 p-0"></td>
                    <td className="border-mask-right h-[1px] bg-neutral-300 p-0"></td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>{tProduct("delivery.table.type.expressDelivery")}</td>
                    <td className="text-center">
                      1 {tProduct("delivery.businessDay")}
                    </td>
                    <td className="text-end">10.00 {tCommon("currency")}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="border-mask-left h-[1px] bg-neutral-300 p-0"></td>
                    <td className="h-[1px] bg-neutral-300 p-0"></td>
                    <td className="border-mask-right h-[1px] bg-neutral-300 p-0"></td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>{tProduct("delivery.table.type.pickStore")}</td>
                    <td className="text-center">
                      1-3 {tProduct("delivery.businessDays")}
                    </td>
                    <td className="text-end">
                      {tProduct("delivery.table.type.free")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border-mask h-[1px] w-full bg-neutral-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
