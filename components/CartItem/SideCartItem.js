import "./SideCartItem.css";

import { useContext, useState, useEffect } from "react";
import Image from "next/image";

import { UserAuthContext } from "@/contexts/AuthContext";

import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const SideCartItem = ({ productVariantId, quantity, index }) => {
  const { ChangeUrl, updateCart } = useContext(UserAuthContext);
  const [productVariant, setProductVariant] = useState({});
  const [loadingProductVariant, setLoadingProductVariant] = useState(true);

  const fetchProductVariant = async () => {
    setLoadingProductVariant(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/productsVariants/byid/${productVariantId}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setProductVariant(data.data);

      setLoadingProductVariant(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const removeItem = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    delete cart[productVariantId];

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
  };

  useEffect(() => {
    fetchProductVariant();
  }, []);

  return (
    <div
      onClick={() => {
        ChangeUrl(`/products/${productVariant.product?.id}`);
      }}
      className="flex flex-col"
    >
      {index != 0 ? <Separator className="bg-neutral-300" /> : <></>}
      <div className="relative flex flex-row items-center gap-3 p-3 transition-colors duration-200 hover:cursor-pointer hover:bg-neutral-200">
        <div
          onClick={(e) => {
            removeItem();
          }}
          className="group absolute right-2 top-1 grid size-6 place-items-center rounded-full border-[2px] border-transparent transition-colors duration-200 hover:cursor-pointer hover:border-emerald-700 hover:bg-zinc-100"
        >
          <i className="fa-solid fa-x text-[10px] text-neutral-500 transition-colors duration-200 group-hover:text-emerald-700" />
        </div>

        {loadingProductVariant ? (
          <Skeleton className="my-1 h-[80px] w-[110px] rounded-lg bg-neutral-300 object-cover shadow-lg" />
        ) : (
          <Image
            width={60}
            height={0}
            src={productVariant.product.img}
            alt="product"
          />
        )}
        <div className="flex flex-col justify-between">
          <span className="font-lato font-semibold text-neutral-700">
            {loadingProductVariant ? (
              <Skeleton className={"my-1 h-5 w-[150px] bg-neutral-300"} />
            ) : (
              productVariant.product.name
            )}
          </span>
          {/* <span className="font-lato text-sm text-neutral-500">
            {loadingProductVariant ? (
              <Skeleton className={"my-1 h-5 w-[90px] bg-neutral-300"} />
            ) : (
              productVariant.product?.category?.name
            )}
          </span> */}
          <div>
            <span className="font-lato font-semibold text-neutral-700">
              Dimension:{" "}
            </span>
            <span className="font-lato text-sm text-neutral-500">
              {productVariant.dimension}
            </span>
          </div>
          <div>
            <span className="font-lato font-semibold text-neutral-400">
              {quantity} x
            </span>
            <span className="font-lato font-semibold text-[var(--theme2)]">
              {loadingProductVariant ? (
                <Skeleton className={"my-1 h-5 w-[60px] bg-neutral-300"} />
              ) : (
                ` ${productVariant.price} QR`
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCartItem;
