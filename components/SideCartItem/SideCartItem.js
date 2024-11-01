import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./SideCartItem.css";
import { Separator } from "../ui/separator";

const SideCartItem = ({ name, dimension, price, id, closeButton, index }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        setTimeout(() => {
          closeButton.current.click();
        }, 500);
        router.push(`/products/${id}`);
      }}
      className="flex flex-col"
    >
      { index != 0 ? ( <Separator className="bg-neutral-300" /> ) : (<></>)}
      <div className="p-3 flex flex-row gap-3 relative items-center hover:cursor-pointer hover:bg-neutral-200 transition-colors duration-200">
        <div className="absolute top-1 right-2 hover:cursor-pointer hover:bg-zinc-100 border-[2px] hover:border-emerald-700 border-transparent transition-colors duration-200 rounded-full group size-6 place-items-center grid">
          <i className="fa-solid fa-x text-[10px] text-neutral-500 group-hover:text-emerald-700 transition-colors duration-200"></i>
        </div>
        <Image
          width={60}
          height={0}
          alt="product"
          src="/images/products/image1.png"
        />
        <div className="flex flex-col justify-between">
          <span className="font-semibold font-lato  text-neutral-700">
            {name}
          </span>
          <div>
            <span className="font-semibold font-lato  text-neutral-700">
              Dimension:{" "}
            </span>
            <span className="text-neutral-500 text-sm font-lato ">
              {dimension}
            </span>
          </div>
          <div>
            <span className="font-lato font-semibold text-neutral-400">
              1 x
            </span>
            <span className="font-lato font-semibold text-[var(--theme2)]">
              {" "}
              {`${price} QR`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCartItem;
