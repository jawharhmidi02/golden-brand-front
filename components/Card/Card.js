import React from "react";
import Image from "next/image";
import { Separator } from "../ui/separator";

const Card = ({ product }) => {
  return (
    <div className="flex text-wrap drop-shadow-sm hover:scale-105  shadow-sm flex-wrap rounded-md hover:cursor-pointer hover:bg-neutral-100 transition-all duration-200  border-neutral-200 flex-row justify-start gap-2 p-[35px] border-2">
      <Image
        src={product.img}
        height={0}
        width={100}
        className="rounded-sm w-full"
        alt="product"
      />
      <div className="flex flex-col text-center">
        <span className="font-extrabold font-lato text-xl mb-3 text-[var(--fifth-color-primary)]">
          {product.name}
        </span>
        <span className="font-semibold font-lato text-lg text-neutral-600">{product.category}</span>
        <span className="font-semibold font-lato text-neutral-500">{product.dimension}</span>
        <span className="font-semibold font-lato text-lg text-[var(--blue)]">{`${product.price} QR`}</span>
        {/* <Separator className="bg-neutral-300" /> */}
        {/* <ul className="list-disc list-inside mt-3">
          {product.desc.map((description, index) => (
            <li className="font-lato mb-1" key={index}>
              {description}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Card;
