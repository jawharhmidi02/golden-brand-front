import "./FeaturedProducts.css";

import { useContext, useState, useEffect } from "react";
import Image from "next/image";

import { UserAuthContext } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const FeaturedProducts = () => {
  const { ChangeUrl } = useContext(UserAuthContext);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [limitProducts, setLimitProducts] = useState(8);
  const [selectedType, setselectedType] = useState("mostpopular");

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      let sortBy = "";
      let sort_order = "";
      if (selectedType === "mostpopular") {
        sortBy = "orderProducts";
        sort_order = "desc";
      } else if (selectedType === "newest") {
        sortBy = "date";
        sort_order = "asc";
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/search?${sortBy && `sortBy=${sortBy}&`}${sort_order && `sortOrder=${sort_order}&`}page=1&limit=${limitProducts}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setProducts(data.data.data);
      setLoadingProducts(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed!",
        description: "Something went wrong, please try again!",
        variant: "destructive",
      });

      setLoadingProducts(false);
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedType]);

  return (
    <div className="featured-product flex flex-col items-center">
      <div className="flex w-full max-w-screen-xl flex-col items-center gap-y-4 px-5 lg:flex-row lg:justify-between">
        <div className="text-2xl font-semibold lg:text-3xl">
          Featured Products
        </div>
        <div className="flex flex-row justify-center gap-6">
          <div
            className={
              selectedType === "newest"
                ? "featured-product-link active scale-105 text-xl font-medium text-black transition-all duration-500 hover:cursor-pointer hover:text-black"
                : "featured-product-link text-xl font-medium text-neutral-400 transition-all duration-500 hover:scale-105 hover:cursor-pointer hover:text-black"
            }
            onClick={() => {
              setselectedType("newest");
            }}
          >
            Newest
          </div>
          <div
            className={
              selectedType === "mostpopular"
                ? "featured-product-link active scale-105 text-xl font-medium text-black transition-all duration-500 hover:cursor-pointer hover:text-black"
                : "featured-product-link text-xl font-medium text-neutral-400 transition-all duration-500 hover:scale-105 hover:cursor-pointer hover:text-black"
            }
            onClick={() => {
              setselectedType("mostpopular");
            }}
          >
            Most Popular
          </div>
        </div>
      </div>
      <div
        className={cn(
          "mx-3 mt-3 grid max-w-[1200px] grid-cols-2 delay-0 sm:grid-cols-3 lg:grid-cols-5",
          loadingProducts ? "animate-fadeoutdown" : "animate-fadeinup",
        )}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-y-2 border-[1px] border-neutral-200 p-4 transition-all duration-300"
          >
            <Image
              src={product.img}
              height={80}
              width={80}
              alt="product"
              className="w-[70%]"
            />
            <div className="flex flex-col items-center gap-y-1">
              <div className="text-center text-sm font-semibold">
                {product.name}
              </div>
              <div
                className="text-center text-sm text-neutral-400 transition-all duration-200 hover:cursor-pointer hover:text-neutral-700"
                onClick={() => {
                  var cats = {};
                  cats[product.category.name] = true;
                  ChangeUrl(
                    `/products?selectedCategories=${encodeURIComponent(
                      JSON.stringify(cats),
                    )}`,
                  );
                }}
              >
                {product.category.name}
              </div>
            </div>
            <div className="mt-auto w-full font-semibold text-[var(--theme)]">
              ~{product.productsVariants[0].price}.00 QAR{" "}
            </div>
            <div className="flex w-full flex-col items-center">
              <button
                className="w-full bg-[var(--theme2)] px-4 py-1 text-white transition-all duration-300"
                onClick={() => {
                  ChangeUrl(`/products/${product.id}`);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
