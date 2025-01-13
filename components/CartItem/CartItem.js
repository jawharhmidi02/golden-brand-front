import { useState, useEffect, useContext } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { UserAuthContext } from "@/contexts/AuthContext";

import { Skeleton } from "../ui/skeleton";

const CartItem = ({
  productVariantID,
  quantity,
  setTotalPrice,
  index,
  items,
  setItems,
}) => {
  const { ChangeUrl, updateCart } = useContext(UserAuthContext);
  const [productVariant, setProductVariant] = useState({});
  const [loadingProductVariant, setLoadingProductVariant] = useState(true);

  const fetchProductVariant = async () => {
    setLoadingProductVariant(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/productsVariants/byid/${productVariantID}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setProductVariant(data.data);

      setTotalPrice((prev) => {
        const returnObject = { ...prev };
        returnObject[data.data.id] = data.data.price * quantity;
        return returnObject;
      });

      setLoadingProductVariant(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });
    }
  };

  const increaseProductNumber = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    cart[productVariantID] = cart[productVariantID]
      ? 1 + cart[productVariantID]
      : 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    setTotalPrice((prev) => {
      const returnObject = { ...prev };
      returnObject[productVariantID] = productVariant.price * (quantity + 1);
      return returnObject;
    });

    setItems(cart);

    updateCart();
  };

  const decreaseProductNumber = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    if (cart[productVariantID] > 1) {
      cart[productVariantID] = cart[productVariantID] - 1;
    } else {
      delete cart[productVariantID];
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setTotalPrice((prev) => {
      const returnObject = { ...prev };
      if (quantity == 1) {
        delete returnObject[productVariantID];
        return returnObject;
      }
      returnObject[productVariantID] = productVariant.price * (quantity - 1);
      return returnObject;
    });

    setItems(cart);

    updateCart();
  };

  const removeItem = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    delete cart[productVariantID];

    localStorage.setItem("cart", JSON.stringify(cart));

    setTotalPrice((prev) => {
      const returnObject = { ...prev };
      delete returnObject[productVariantID];
      return returnObject;
    });

    setItems((prev) => {
      const returnObject = { ...prev };
      delete returnObject[productVariantID];
      return returnObject;
    });

    updateCart();
  };

  useEffect(() => {
    fetchProductVariant();
  }, []);

  return (
    <tbody key={index}>
      <tr
        className={cn(
          "hidden border-neutral-200 md:table-row",
          index == Object.keys(items).length - 1 ? "" : "border-b",
        )}
      >
        <td className="p-[10px]">
          <i
            onClick={() => removeItem()}
            className="fa-solid fa-x text-[11px] text-neutral-500 transition-all duration-200 hover:cursor-pointer hover:text-emerald-700"
          />
        </td>
        <td className="p-[10px]">
          {loadingProductVariant ? (
            <Skeleton className="h-[80px] w-[80px] rounded-lg bg-neutral-300 shadow-lg hover:cursor-pointer" />
          ) : (
            <Image
              width={80}
              height={0}
              alt={productVariant.product.name}
              src={productVariant.product.img}
              className="max-w-[80px] hover:cursor-pointer"
              onClick={() => {
                ChangeUrl(`/products/${productVariant.product.id}`);
              }}
            />
          )}
        </td>
        <td className="p-[10px]">
          <div
            onClick={() => {
              ChangeUrl(`/products/${productVariant.product.id}`);
            }}
            className="font-lato text-[17px] font-bold text-neutral-800 transition-colors duration-200 hover:cursor-pointer hover:text-emerald-600"
          >
            {loadingProductVariant ? (
              <Skeleton className={"my-1 h-7 w-[250px] bg-neutral-300"} />
            ) : (
              productVariant.product.name
            )}
          </div>
        </td>
        <td className="p-[10px]">
          <span className="text-neutral-500">
            {" "}
            {loadingProductVariant ? (
              <Skeleton className={"my-1 h-6 w-[150px] bg-neutral-300"} />
            ) : (
              productVariant.dimension
            )}
          </span>
        </td>
        <td className="p-[10px]">
          <span className="text-neutral-500">
            {" "}
            {loadingProductVariant ? (
              <Skeleton className={"my-1 h-6 w-[50px] bg-neutral-300"} />
            ) : (
              `${productVariant.price} QR`
            )}
          </span>
        </td>
        <td className="p-[10px]">
          <div className="flex flex-row items-center justify-center gap-2 rounded-md border-[1px] border-neutral-300">
            <button
              type="button"
              onClick={() => {
                decreaseProductNumber();
              }}
              disabled={loadingProductVariant}
              className="rounded-l-md border-r-[1px] border-neutral-300 px-2.5 py-2 font-semibold transition-all duration-200 hover:bg-[var(--theme)] hover:text-white"
            >
              {loadingProductVariant ? (
                <div className="flex items-center justify-center">
                  <div className="h-2 w-2 animate-spin rounded-full border-b-2 border-neutral-700" />
                </div>
              ) : (
                "-"
              )}
            </button>
            <span className="px-1 font-lato font-semibold">{quantity}</span>
            <button
              type="button"
              disabled={loadingProductVariant}
              onClick={() => {
                increaseProductNumber();
              }}
              className="rounded-r-md border-l-[1px] border-neutral-300 px-2 py-2 font-semibold transition-all duration-200 hover:bg-[var(--theme)] hover:text-white"
            >
              {loadingProductVariant ? (
                <div className="flex items-center justify-center">
                  <div className="h-2 w-2 animate-spin rounded-full border-b-2 border-neutral-700" />
                </div>
              ) : (
                "+"
              )}
            </button>
          </div>
        </td>
        <td className="p-[10px]">
          <span className="text-lg font-bold text-[var(--theme2)]">
            {" "}
            {`${loadingProductVariant ? 0 : productVariant.price * quantity} QR`}
          </span>
        </td>
      </tr>

      <tr className="contents md:hidden">
        <td colSpan={7}>
          <div className="flex w-full flex-row border-b border-neutral-200 py-4 min-[420px]:gap-4 sm:gap-8">
            <div>
              {loadingProductVariant ? (
                <Skeleton
                  className={
                    "h-[110px] w-[125px] rounded-lg bg-neutral-300 object-cover shadow-lg hover:cursor-pointer"
                  }
                />
              ) : (
                <Image
                  width={100}
                  height={0}
                  alt={productVariant.product.name}
                  src={productVariant.product.img}
                  className="h-[110px] w-[125px] hover:cursor-pointer"
                  onClick={() => {
                    ChangeUrl(`/products/${productVariant.product.id}`);
                  }}
                />
              )}
            </div>
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-row justify-between pb-2">
                <div
                  className="text-lg font-bold text-neutral-800"
                  onClick={() => {
                    ChangeUrl(`/products/${productVariant.product.id}`);
                  }}
                >
                  {loadingProductVariant ? (
                    <Skeleton className={"mx-1 h-7 w-[160px] bg-neutral-300"} />
                  ) : (
                    productVariant.product.name
                  )}
                </div>
                <i className="fa-solid fa-x self-center text-[12px] text-neutral-500 transition-all duration-200 hover:cursor-pointer hover:text-emerald-700" />
              </div>
              <div className="flex w-full flex-row justify-between gap-1 py-2 min-[400px]:gap-0">
                <div className="my-auto font-lato text-[17px] font-semibold text-neutral-800">
                  Dimension
                </div>
                <div className="text-end font-medium text-neutral-500">
                  {loadingProductVariant ? (
                    <Skeleton className={"mx-1 h-6 w-[120px] bg-neutral-300"} />
                  ) : (
                    productVariant.dimension
                  )}
                </div>
              </div>
              <div className="border-mask h-[1px] w-full bg-neutral-200"></div>
              <div className="flex w-full flex-row justify-between py-2">
                <div className="my-auto font-lato text-[17px] font-semibold text-neutral-800">
                  Price
                </div>
                <div className="font-medium text-[var(--theme2)]">{`${productVariant.price || 0} QR`}</div>
              </div>
              <div className="border-mask h-[1px] w-full bg-neutral-200"></div>
              <div className="flex w-full flex-row justify-between py-2">
                <div className="my-auto font-lato text-[17px] font-semibold text-neutral-800">
                  Quantity
                </div>
                <div className="flex flex-row items-center justify-center gap-2 rounded-md border-[1px] border-neutral-300">
                  <button
                    type="button"
                    onClick={() => {
                      decreaseProductNumber();
                    }}
                    disabled={loadingProductVariant}
                    className="rounded-l-md border-r-[1px] border-neutral-300 px-2.5 py-1 font-semibold transition-all duration-200 hover:bg-[var(--theme)] hover:text-white"
                  >
                    {loadingProductVariant ? (
                      <div className="flex items-center justify-center">
                        <div className="h-2 w-2 animate-spin rounded-full border-b-2 border-neutral-700" />
                      </div>
                    ) : (
                      "-"
                    )}
                  </button>
                  <span className="px-1 font-lato font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      increaseProductNumber();
                    }}
                    disabled={loadingProductVariant}
                    className="rounded-r-md border-l-[1px] border-neutral-300 px-2 py-1 font-semibold transition-all duration-200 hover:bg-[var(--theme)] hover:text-white"
                  >
                    {loadingProductVariant ? (
                      <div className="flex items-center justify-center">
                        <div className="h-2 w-2 animate-spin rounded-full border-b-2 border-neutral-700" />
                      </div>
                    ) : (
                      "+"
                    )}
                  </button>
                </div>
              </div>
              <div className="border-mask h-[1px] w-full bg-neutral-200"></div>
              <div className="flex w-full flex-row justify-between py-2">
                <div className="my-auto font-lato text-[17px] font-semibold text-neutral-800">
                  Subtotal
                </div>
                <div className="font-medium text-[var(--theme2)]">{`${(productVariant.price || 0) * quantity} QR`}</div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default CartItem;
