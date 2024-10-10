"use client";

import Image from "next/image";
import React, { useState } from "react";

const ProductPage = ({ searchParams }) => {
  const searchQuery = searchParams.search || "";
  const [products, setProducts] = useState([
    {
      img: "/images/products/image1.png",
      name: "name1",
      desc: "description1",
    },
    {
      img: "/images/products/image2.png",
      name: "name2",
      desc: "description2",
    },
    {
      img: "/images/products/image3.png",
      name: "name3",
      desc: "description3",
    },
    {
      img: "/images/products/image4.png",
      name: "name4",
      desc: "description4",
    },
  ]);

  return (
    <div>
      {products.map((item, index) => (
        <Image key={index} src={item.img} width={100} height={100} />
      ))}
    </div>
  );
};  

export default ProductPage;
