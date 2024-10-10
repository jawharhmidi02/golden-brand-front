import React from "react";
import Image from "next/image";
import { Separator } from "../ui/separator";

const CardPage = ({ product }) => {
  return (
    <div className="flex bg-neutral-100 border-neutral-300 flex-row justify-start gap-5 p-[35px] border-[1px]">
      <Image
        src={product.img}
        height={300}
        width={300}
        className="rounded-sm"
      />
      <div className="flex flex-col">
        <span className="font-bold font-lato text-3xl mb-4 text-[var(--fifth-color-primary)]">
          {product.name}
        </span>
        <Separator className="bg-neutral-300" />
        <ul className="list-disc list-inside mt-3">
          {product.desc.map((description, index) => (
            <li className="font-lato mb-1" key={index}>
              {description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardPage;
