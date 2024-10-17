"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ProductHeader = ({ cat, product }) => {
  const router = useRouter();
  const { lng } = useParams();
  return (
    <div className="flex flex-row gap-2 text-center">
      <div
        onClick={() => router.push("/")}
        className="font-lato font-semibold self-center text-base text-neutral-400  hover:text-neutral-500  hover:cursor-pointer transition-all duration-300"
      >
        Home
      </div>
      <span className="text-neutral-400">
        <i className="fa-solid fa-chevron-right"></i>
      </span>
      <div
        onClick={() =>
          router.push(
            `/${lng}/products?selectedCategories=${encodeURIComponent(
              JSON.stringify(cat)
            )}`
          )
        }
        className="font-lato font-semibold self-center text-base text-neutral-400  hover:text-neutral-500 hover:cursor-pointer transition-all duration-300"
      >
        {product.category}
      </div>
      <span className="text-neutral-400">
        <i className="fa-solid fa-chevron-right"></i>
      </span>
      <div className="font-lato font-semibold self-center text-base text-neutral-800">
        {product.name}
      </div>
    </div>
  );
};

export default ProductHeader;
